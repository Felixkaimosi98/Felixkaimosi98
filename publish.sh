#!/bin/bash
# publish.sh - initialize git, create GitHub repo and push all files.
# USAGE OPTIONS:
# 1) Using GitHub CLI (recommended):
#    - Install GitHub CLI (gh) and authenticate: gh auth login
#    - Run: ./publish.sh gh YourRepoName
# 2) Using HTTPS + Personal Access Token:
#    - Create a GitHub repo 'YourRepoName' manually or use the API.
#    - Export GITHUB_PAT with a personal access token that has repo scope.
#    - Run: ./publish.sh token YourUserName YourRepoName
#
# This script will:
# - git init (if not already)
# - create a README if none
# - commit all files
# - create remote repo and push

set -e

MODE="$1"

if [ -z "$MODE" ]; then
  echo "Usage: ./publish.sh [gh|token] <user-or-repo-args>"
  exit 1
fi

if [ "$MODE" = "gh" ]; then
  REPO_NAME="$2"
  if [ -z "$REPO_NAME" ]; then
    echo "Usage: ./publish.sh gh <repo-name>"
    exit 1
  fi
  # Ensure git initialized
  git init >/dev/null 2>&1 || true
  git add .
  git commit -m "Initial commit - Deriv third-party site" || true
  # Create repo with gh
  gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
  echo "Pushed to GitHub repo: $(gh repo view --json url --jq .url)"
  exit 0
fi

if [ "$MODE" = "token" ]; then
  GITHUB_USER="$2"
  REPO_NAME="$3"
  if [ -z "$GITHUB_USER" ] || [ -z "$REPO_NAME" ]; then
    echo "Usage: ./publish.sh token <github-username> <repo-name>"
    exit 1
  fi
  if [ -z "$GITHUB_PAT" ]; then
    echo "Error: set GITHUB_PAT environment variable with a personal access token (repo scope)."
    exit 1
  fi
  git init >/dev/null 2>&1 || true
  git add .
  git commit -m "Initial commit - Deriv third-party site" || true
  # Create repo using GitHub API
  curl -H "Authorization: token $GITHUB_PAT" https://api.github.com/user/repos -d "{"name":"$REPO_NAME"}"
  # Push via HTTPS using token
  git remote add origin "https://$GITHUB_USER:$GITHUB_PAT@github.com/$GITHUB_USER/$REPO_NAME.git"
  git branch -M main
  git push -u origin main
  echo "Pushed to https://github.com/$GITHUB_USER/$REPO_NAME"
  exit 0
fi

echo "Unknown mode: $MODE"
exit 1
