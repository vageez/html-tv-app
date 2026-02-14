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
