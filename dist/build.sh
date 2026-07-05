#!/bin/bash

# --- Color Palette for Clear Reporting ---
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# --- Custom Reporting Functions ---
log_info()    { echo -e "${BLUE}[?]${NC} $1"; }
log_success() { echo -e "${GREEN}[✓]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[!]${NC} $1"; }
log_error()   { echo -e "${RED}[✗] ERROR:${NC} $1" >&2; }

# --- Command Availability Check ---
REQUIRED_CMDS=("rm" "zip" "zipnote" "mv" "date" "du")
for cmd in "${REQUIRED_CMDS[@]}"; do
    if ! command -v "$cmd" &> /dev/null; then
        log_error "Required tool '$cmd' is missing. Aborting build."
        exit 1
    fi
done

echo -e "${BLUE}==================================================${NC}"
echo -e "${BLUE}       STARTING GLADIATUS ADDON BUILD SYSTEM      ${NC}"
echo -e "${BLUE}==================================================${NC}"

# --- Clean Up Old Builds ---
log_info "Cleaning up previous build artifacts..."
rm -f build_date_* \
      GladiatusCrazyAddOn_Chrome.zip \
      GladiatusCrazyAddOn_Chrome_Manifest_v2.zip \
      GladiatusCrazyAddOn_Firefox.xpi \
      GladiatusCrazyAddOn_Edge.zip \
      GladiatusCrazyAddOn_Edge_Manifest_v2.zip
log_success "Workspace cleaned."

# --- Navigate to Source ---
log_info "Navigating to source directory..."
if ! cd ../source 2>/dev/null; then
    log_error "Could not find '../source' folder. Verify your script location."
    exit 1
fi

# --- Chrome Builds ---
log_info "Packaging Chrome (Manifest v3)..."
if zip -q -r ../dist/GladiatusCrazyAddOn_Chrome.zip core icons init.js manifest.json; then
    log_success "Chrome (v3) archive created."
else
    log_error "Chrome (v3) build failed."
    exit 1
fi

log_info "Packaging Chrome (Deprecated Manifest v2)..."
if zip -q -r ../dist/GladiatusCrazyAddOn_Chrome_Manifest_v2.zip core icons init.js manifest_v2.json && \
   printf "@ manifest_v2.json\n@=manifest.json\n" | zipnote -w ../dist/GladiatusCrazyAddOn_Chrome_Manifest_v2.zip &>/dev/null; then
    log_success "Chrome (v2) archive created and manifest mapped."
else
    log_error "Chrome (v2) mapping failed."
    exit 1
fi

# --- Firefox Build ---
log_info "Packaging Firefox (Manifest v2)..."
if zip -q -r ../dist/GladiatusCrazyAddOn_Firefox.zip core icons init.js manifest_v2.json && \
   printf "@ manifest_v2.json\n@=manifest.json\n" | zipnote -w ../dist/GladiatusCrazyAddOn_Firefox.zip &>/dev/null && \
   mv ../dist/GladiatusCrazyAddOn_Firefox.zip ../dist/GladiatusCrazyAddOn_Firefox.xpi; then
    log_success "Firefox .xpi package ready."
else
    log_error "Firefox build or conversion failed."
    exit 1
fi

# --- Edge Builds ---
log_info "Packaging Edge (Manifest v3)..."
if zip -q -r ../dist/GladiatusCrazyAddOn_Edge.zip core icons init.js manifest.json; then
    log_success "Edge (v3) archive created."
else
    log_error "Edge (v3) build failed."
    exit 1
fi

log_info "Packaging Edge (Deprecated Manifest v2)..."
if zip -q -r ../dist/GladiatusCrazyAddOn_Edge_Manifest_v2.zip core icons init.js manifest_v2.json && \
   printf "@ manifest_v2.json\n@=manifest.json\n" | zipnote -w ../dist/GladiatusCrazyAddOn_Edge_Manifest_v2.zip &>/dev/null; then
    log_success "Edge (v2) archive created and manifest mapped."
else
    log_error "Edge (v2) mapping failed."
    exit 1
fi

# --- Save Build Metadata ---
log_info "Generating build timestamp..."
BUILD_DATE=$(date +"%Y%m%d")
echo $(date +"%Y-%m-%dT%H:%M:%S%z") > "../dist/build_date_${BUILD_DATE}.txt"

# --- Final Build Report ---
echo -e "\n${GREEN}==================================================${NC}"
echo -e "${GREEN}          BUILD COMPLETED SUCCESSFULLY!           ${NC}"
echo -e "${GREEN}==================================================${NC}"
log_info "Generated Target Artifacts:"

# Display file size information for visual verification
du -sh ../dist/GladiatusCrazyAddOn_* ../dist/build_date_* 2>/dev/null | sed 's|../dist/||g'
echo ""
