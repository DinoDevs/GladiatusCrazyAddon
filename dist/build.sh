#!/bin/bash

rm GladiatusCrazyAddOn_Chrome.zip
rm GladiatusCrazyAddOn_Chrome_Manifest_v2.zip

cd ../source

echo "Building for Chrome (Manifest v3)"
zip -q -r ../dist/GladiatusCrazyAddOn_Chrome.zip core icons init.js manifest_v3.json
printf "@ manifest_v3.json\n@=manifest.json\n" | zipnote -w ../dist/GladiatusCrazyAddOn_Chrome.zip

echo "Building for Chrome (Manifest v2)"
zip -q -r ../dist/GladiatusCrazyAddOn_Chrome_Manifest_v2.zip core icons init.js manifest.json

cd ../dist
