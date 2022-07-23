#!/bin/bash

rm -f GladiatusCrazyAddOn_Chrome.zip
rm -f GladiatusCrazyAddOn_Chrome_Manifest_v2.zip
rm -f GladiatusCrazyAddOn_Firefox.xpi

cd ../source

echo "Building for Chrome (Manifest v3)"
zip -q -r ../dist/GladiatusCrazyAddOn_Chrome.zip core icons init.js manifest_v3.json
printf "@ manifest_v3.json\n@=manifest.json\n" | zipnote -w ../dist/GladiatusCrazyAddOn_Chrome.zip

echo "Building for Chrome (Deprecated Manifest v2)"
zip -q -r ../dist/GladiatusCrazyAddOn_Chrome_Manifest_v2.zip core icons init.js manifest.json

echo "Building for Firefox (Manifest v2)"
zip -q -r ../dist/GladiatusCrazyAddOn_Firefox.zip core icons init.js manifest.json
mv ../dist/GladiatusCrazyAddOn_Firefox.zip ../dist/GladiatusCrazyAddOn_Firefox.xpi

cd ../dist
