#!/usr/bin/env bash
# Step 3: Git init, add, commit, push for each backend service
# Usage: ./step3-git-init-push.sh https://github.com/YOUR_USERNAME
# Run from: License Management System folder

set -e
cd "$(dirname "$0")"

if [ -z "$1" ]; then
  echo "Usage: $0 <GitHubBaseURL>"
  echo "Example: $0 https://github.com/yourusername"
  exit 1
fi

GITHUB_BASE="${1%/}"
BACKEND="backend"

if [ ! -d "$BACKEND" ]; then
  echo "ERROR: backend/ not found"
  exit 1
fi

services=(auth-service customer-service subscription-pack-service subscription-service assignment-service)

for svc in "${services[@]}"; do
  dir="$BACKEND/$svc"
  if [ ! -d "$dir" ]; then
    echo "SKIP: $svc - folder not found"
    continue
  fi

  echo ""
  echo "=== $svc ==="
  cd "$dir"

  if [ ! -d .git ]; then
    git init
  else
    echo "  .git exists, skipping init."
  fi

  git add .

  if [ -z "$(git status --porcelain)" ]; then
    echo "  Nothing to commit (clean)."
  else
    git commit -m "Initial commit: $svc"
    echo "  Committed."
  fi

  remote_url="$GITHUB_BASE/$svc.git"
  if git remote get-url origin &>/dev/null; then
    git remote set-url origin "$remote_url"
    echo "  Remote origin updated."
  else
    git remote add origin "$remote_url"
    echo "  Remote origin added."
  fi

  git branch -M main 2>/dev/null || true
  if ! git push -u origin main; then
    echo "  Push failed - create repo $GITHUB_BASE/$svc on GitHub first."
    exit 1
  fi
  echo "  Pushed to $svc"

  cd ../..
done

echo ""
echo "Step 3 complete. All services pushed."
