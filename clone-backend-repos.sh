#!/usr/bin/env bash
# Clone all backend service repos into backend/ (microservices - separate repos, no submodules)
# Usage: ./clone-backend-repos.sh https://github.com/sandeepmynt-ux
# Run from: License Management System folder (after cloning license-management-system)

set -e
cd "$(dirname "$0")"

if [ -z "$1" ]; then
  echo "Usage: $0 <GitHubBaseURL>"
  echo "Example: $0 https://github.com/sandeepmynt-ux"
  exit 1
fi

GITHUB_BASE="${1%/}"
BACKEND="backend"

mkdir -p "$BACKEND"
cd "$BACKEND"

repos=(auth-service customer-service subscription-pack-service subscription-service assignment-service)

for repo in "${repos[@]}"; do
  if [ -d "$repo" ]; then
    echo "  $repo/ already exists, skip."
  else
    echo "  Cloning $repo..."
    git clone "$GITHUB_BASE/$repo.git" "$repo"
  fi
done

echo ""
echo "Done. Backend services are in backend/"
