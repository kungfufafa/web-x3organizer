#!/usr/bin/env bash
# Build & upload folder dist/ ke VPS (static)
# Usage:
#   VPS_HOST=user@your-vps-ip ./deploy/deploy-vps.sh
#   VPS_PATH=/var/www/x3organizer  (default)

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VPS_HOST="${VPS_HOST:?Set VPS_HOST=user@ip-vps}"
VPS_PATH="${VPS_PATH:-/www/sites/x3organizer.com/index}"

echo "→ Build production..."
cd "$ROOT"
npm run build

echo "→ Upload dist/ ke $VPS_HOST:$VPS_PATH ..."
ssh "$VPS_HOST" "mkdir -p '$VPS_PATH'"
rsync -avz --delete \
  "$ROOT/dist/" \
  "$VPS_HOST:$VPS_PATH/"

echo "✓ Deploy selesai. Root Nginx: $VPS_PATH"
echo "  Contoh config OpenResty: deploy/openresty-x3organizer.conf"
