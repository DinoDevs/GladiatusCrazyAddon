#!/bin/bash

rm -f build_date_*
rm -f GladiatusCrazyAddOn_Chrome.zip
rm -f GladiatusCrazyAddOn_Chrome_Manifest_v2.zip
rm -f GladiatusCrazyAddOn_Firefox.xpi
rm -f GladiatusCrazyAddOn_Edge.zip

cd ../source

echo "Building for Chrome (Manifest v3)"
zip -q -r ../dist/GladiatusCrazyAddOn_Chrome.zip core icons init.js manifest.json

echo "Building for Chrome (Deprecated Manifest v2)"
zip -q -r ../dist/GladiatusCrazyAddOn_Chrome_Manifest_v2.zip core icons init.js manifest_v2.json
printf "@ manifest_v2.json\n@=manifest.json\n" | zipnote -w ../dist/GladiatusCrazyAddOn_Chrome_Manifest_v2.zip

echo "Building for Firefox (Manifest v2)"
zip -q -r ../dist/GladiatusCrazyAddOn_Firefox.zip core icons init.js manifest_v2.json
printf "@ manifest_v2.json\n@=manifest.json\n" | zipnote -w ../dist/GladiatusCrazyAddOn_Firefox.zip
mv ../dist/GladiatusCrazyAddOn_Firefox.zip ../dist/GladiatusCrazyAddOn_Firefox.xpi

echo "Building for Edge (Manifest v3)"
zip -q -r ../dist/GladiatusCrazyAddOn_Edge.zip core icons init.js manifest.json

echo "Building for Edge (Deprecated Manifest v2)"
zip -q -r ../dist/GladiatusCrazyAddOn_Edge_Manifest_v2.zip core icons init.js manifest_v2.json
printf "@ manifest_v2.json\n@=manifest.json\n" | zipnote -w ../dist/GladiatusCrazyAddOn_Edge_Manifest_v2.zip

echo "Saving date"
echo $(date +"%Y-%m-%dT%H:%M:%S%z") > "../dist/build_date_$(date +"%Y%m%d").txt"

cd ../dist
