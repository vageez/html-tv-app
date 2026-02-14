#!/usr/bin/env bash
set -euo pipefail

echo "Creating targets/ + scripts/ for Samsung, LG, Hisense, Xbox, PS5..."

mkdir -p scripts

# Common helper: create target folders
mk_target () {
  local name="$1"
  mkdir -p "targets/${name}/app"
  mkdir -p "targets/${name}/config"
  mkdir -p "targets/${name}/scripts"
  mkdir -p "targets/${name}/notes"
}

mk_target "samsung-tizen"
mk_target "lg-webos"
mk_target "hisense-vidaa"
mk_target "xbox"
mk_target "ps5"

# Build script (only creates if missing)
if [ ! -f scripts/tv-build.sh ]; then
cat > scripts/tv-build.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

echo "Building Vite app..."
npm run build

if [ ! -d "dist" ]; then
  echo "ERROR: dist/ not found. Did the build fail?"
  exit 1
fi

echo "✅ Build complete: dist/"
EOF
chmod +x scripts/tv-build.sh
fi

# Sync script (overwrite-safe: we rewrite to include all platforms)
cat > scripts/tv-sync.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

PLATFORM="${1:-all}"

sync_one () {
  local target_dir="$1"
  echo "Sync -> ${target_dir}"

  rm -rf "${target_dir}"
  mkdir -p "${target_dir}"
  cp -R dist/* "${target_dir}/"
}

if [ ! -d "dist" ]; then
  echo "dist/ not found. Run: npm run build"
  exit 1
fi

case "${PLATFORM}" in
  samsung)
    sync_one "targets/samsung-tizen/app"
    ;;
  lg)
    sync_one "targets/lg-webos/app"
    ;;
  hisense|vidaa)
    sync_one "targets/hisense-vidaa/app"
    ;;
  xbox)
    sync_one "targets/xbox/app"
    ;;
  ps5|playstation)
    sync_one "targets/ps5/app"
    ;;
  all)
    sync_one "targets/samsung-tizen/app"
    sync_one "targets/lg-webos/app"
    sync_one "targets/hisense-vidaa/app"
    sync_one "targets/xbox/app"
    sync_one "targets/ps5/app"
    ;;
  *)
    echo "Usage: bash scripts/tv-sync.sh [samsung|lg|hisense|xbox|ps5|all]"
    exit 1
    ;;
esac

echo "✅ Sync complete"
EOF
chmod +x scripts/tv-sync.sh

# Per-platform sync wrappers
cat > targets/samsung-tizen/scripts/sync.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
bash ../../../scripts/tv-sync.sh samsung
EOF
chmod +x targets/samsung-tizen/scripts/sync.sh

cat > targets/lg-webos/scripts/sync.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
bash ../../../scripts/tv-sync.sh lg
EOF
chmod +x targets/lg-webos/scripts/sync.sh

cat > targets/hisense-vidaa/scripts/sync.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
bash ../../../scripts/tv-sync.sh hisense
EOF
chmod +x targets/hisense-vidaa/scripts/sync.sh

cat > targets/xbox/scripts/sync.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
bash ../../../scripts/tv-sync.sh xbox
EOF
chmod +x targets/xbox/scripts/sync.sh

cat > targets/ps5/scripts/sync.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
bash ../../../scripts/tv-sync.sh ps5
EOF
chmod +x targets/ps5/scripts/sync.sh

# Minimal LG webOS appinfo.json (only if missing)
if [ ! -f targets/lg-webos/config/appinfo.json ]; then
cat > targets/lg-webos/config/appinfo.json <<'EOF'
{
  "id": "com.example.tvapp",
  "version": "0.0.1",
  "vendor": "Example",
  "type": "web",
  "main": "index.html",
  "title": "TV App",
  "icon": "icon.png"
}
EOF
fi

# Minimal Samsung Tizen config.xml (only if missing)
if [ ! -f targets/samsung-tizen/config/config.xml ]; then
cat > targets/samsung-tizen/config/config.xml <<'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<widget xmlns="http://www.w3.org/ns/widgets"
  xmlns:tizen="http://tizen.org/ns/widgets"
  id="com.example.tvapp"
  version="0.0.1">
  <name>TV App</name>
  <content src="index.html"/>
  <tizen:application id="com.example.tvapp" package="comexampletvapp" required_version="2.3"/>
</widget>
EOF
fi

# Notes for “non-open” platforms (always write, safe to overwrite)
cat > targets/hisense-vidaa/notes/README.md <<'EOF'
# Hisense VIDAA target

This folder mirrors the built web app output into `app/`.

VIDAA distribution and packaging are often partner/SDK specific.
Use this target as:
- a place to keep VIDAA-specific config/assets
- a place to keep validation scripts and runtime notes

Next step (optional):
- add a `scripts/validate.sh` that checks required files exist (index.html, assets/)
- capture real device UA + any VIDAA global objects you detect
EOF

cat > targets/xbox/notes/README.md <<'EOF'
# Xbox target

This folder mirrors the built web app output into `app/`.

In many real Xbox app scenarios, you'll run this web experience inside a native shell (WebView).
Use this target as:
- a place to keep shell notes, constraints, and any integration contracts
- a place to keep test harnesses / compatibility notes
EOF

cat > targets/ps5/notes/README.md <<'EOF'
# PS5 target

This folder mirrors the built web app output into `app/`.

PS5 distribution/tooling is typically partner-program based.
Use this target as:
- a place to keep constraints/compat notes (video, input, performance)
- a place to keep any platform adapter requirements you discover
EOF

echo ""
echo "✅ Done!"
echo ""
echo "Run:"
echo "  npm run build"
echo "  bash scripts/tv-sync.sh all"
echo ""
echo "Targets created:"
echo "  targets/samsung-tizen"
echo "  targets/lg-webos"
echo "  targets/hisense-vidaa"
echo "  targets/xbox"
echo "  targets/ps5"
