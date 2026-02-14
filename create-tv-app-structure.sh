#!/usr/bin/env bash

set -e

echo "Creating TV app folder structure..."

# Root src folders
mkdir -p src/app
mkdir -p src/system/platforms
mkdir -p src/ui
mkdir -p src/nav

# Root files
touch src/main.ts

# App layer
touch src/app/startApp.ts

# System layer
touch src/system/types.ts
touch src/system/detect.ts
touch src/system/createSystem.ts

# Platform adapters
touch src/system/platforms/browser.ts
touch src/system/platforms/samsung_tizen.ts
touch src/system/platforms/lg_webos.ts
touch src/system/platforms/hisense_vidaa.ts
touch src/system/platforms/xbox.ts
touch src/system/platforms/ps5.ts

# UI + Navigation helpers
touch src/ui/debugOverlay.ts
touch src/nav/keys.ts

echo ""
echo "✅ Folder structure created!"
echo ""
echo "Created:"
echo "src/"
echo "  main.ts"
echo "  app/startApp.ts"
echo "  system/"
echo "    types.ts"
echo "    detect.ts"
echo "    createSystem.ts"
echo "    platforms/*"
echo "  ui/debugOverlay.ts"
echo "  nav/keys.ts"
echo ""
echo "Next step: paste the code files we generated into each file."
