#!/usr/bin/env bash
# Step 2: Restructure folders - backend/ and frontend/
# Run from: License Management System folder (same folder as this script)

set -e
cd "$(dirname "$0")"

echo "Step 2: Restructure..."

if [ -d "Backend" ]; then
  echo "  Renaming Backend -> backend"
  mv Backend backend
  echo "  Done."
elif [ -d "backend" ]; then
  echo "  backend/ already exists."
else
  echo "  WARNING: No Backend or backend folder. Creating backend/"
  mkdir -p backend
fi

if [ ! -d "frontend" ]; then
  echo "  Creating frontend/"
  mkdir -p frontend
  echo "  Done."
else
  echo "  frontend/ already exists."
fi

echo ""
echo "Step 2 complete. Structure:"
ls -la
echo "  backend contents:"
ls backend 2>/dev/null || true
