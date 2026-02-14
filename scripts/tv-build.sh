#!/usr/bin/env bash
set -euo pipefail

echo "Building Vite app..."
npm run build

if [ ! -d "dist" ]; then
  echo "ERROR: dist/ not found. Did the build fail?"
  exit 1
fi

echo "✅ Build complete: dist/"
