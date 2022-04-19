#!/usr/bin/env bash
set -euo pipefail

# Create a temporary directory for things we want to actually go live to the public.
TMPDIR="$(mktemp -d -t ci-XXXXXXXXXX)"
echo "======> Working inside ${TMPDIR}..."

# Copy the files we want to deploy over INTO that temporary directory.
cp -Rf ./dist "${TMPDIR}/dist"
cp -f package.json "${TMPDIR}/package.json"

# Move into the temporary directory.
cd "${TMPDIR}/"

tree
echo "---------------------------------------------------------------------"
echo "Do do you want to publish these files to npm?"
# shellcheck disable=SC2034,SC2162
read -p "Press any key to continue, or press Control+C to cancel. " x
echo " "

# Publish
echo "---------------------------------------------------------------------"
npm publish --otp "$(op item get "$OP_NPM" --fields type=otp --format json | jq -Mr '.totp')"
echo "---------------------------------------------------------------------"

# Cleanup
echo "======> Cleaning up ${TMPDIR}..."
rm -Rfv "${TMPDIR:?}"
