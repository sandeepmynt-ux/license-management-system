#!/usr/bin/env bash
# Step 4: Set up main repo (license-management-system) - shared infra only, NO submodules
# Usage: ./step4-main-repo-only.sh https://github.com/sandeepmynt-ux
# Run from: License Management System folder (backend/ and frontend/ already there)

set -e
cd "$(dirname "$0")"

if [ -z "$1" ]; then
  echo "Usage: $0 <GitHubBaseURL>"
  echo "Example: $0 https://github.com/sandeepmynt-ux"
  exit 1
fi

GITHUB_BASE="${1%/}"

echo "Step 4: Main repo only (docker-compose, h2-server, docs) - no submodules"
echo ""

if [ ! -d backend ] || [ ! -f backend/docker-compose.yml ] || [ ! -d backend/h2-server ]; then
  echo "ERROR: backend/docker-compose.yml and backend/h2-server/ must exist."
  exit 1
fi

# Main repo: only shared files (NOT the service folders - those are separate repos)
if [ ! -d .git ]; then
  git init
  echo "  git init (main repo)"
fi

mkdir -p frontend
touch frontend/.gitkeep 2>/dev/null || true

# Main repo = only shared infra (no service code - each service is its own repo)
git add backend/docker-compose.yml backend/h2-server backend/README.md
git add frontend/
git add README.md .gitignore 2>/dev/null || true
git add GITHUB-REPOS-SETUP.md clone-backend-repos.sh step2-restructure.sh step3-git-init-push.sh step4-main-repo-only.sh 2>/dev/null || true

git status
if [ -n "$(git status --porcelain)" ]; then
  git commit -m "Main repo: docker-compose, h2-server, clone script - microservices in separate repos"
  echo "  Committed."
fi

if ! git remote get-url origin &>/dev/null; then
  git remote add origin "$GITHUB_BASE/license-management-system.git"
  echo "  Remote origin added."
fi
git branch -M main 2>/dev/null || true

echo ""
echo "  Pushing main repo..."
if git push -u origin main; then
  echo ""
  echo "Done. Main repo: $GITHUB_BASE/license-management-system"
  echo "To get all services on another machine: clone this repo, then run: ./clone-backend-repos.sh $GITHUB_BASE"
else
  echo "  Push failed. Create repo 'license-management-system' on GitHub first."
  exit 1
fi
