# Steps to Release Version

## Preparation

Make sure that the correct version number is set on project files:

- README.md
- package.json
- source/manifest.json
- source/manifest_v2.json
- source/core/source/gca.info.js

## Build Binaries

Run build script to prepare binaries:
```
thanos@frutyx-pc:~/GladiatusCrazyAddon/dist$ ./build.sh
Building for Chrome (Manifest v3)
Building for Chrome (Deprecated Manifest v2)
Building for Firefox (Manifest v2)
Building for Edge (Manifest v3)
Building for Edge (Deprecated Manifest v2)
Saving date
```

## Release Versions

- Draft a [new release](https://github.com/DinoDevs/GladiatusCrazyAddon/releases/new) on GitHub
- Update dinodevs website with new version info:
	- Update latest version on the config file
	- Upload versions changelog file
- Upload versions on stores
	- Upload on [chrome store](https://chrome.google.com/u/3/webstore/devconsole)
	- Upload on [edge store](https://partner.microsoft.com/en-us/dashboard/microsoftedge/overview)
	- Uplaod on [firefox store](https://addons.mozilla.org/en-US/developers/addons)

## Post release changes

Update developer version on project files:
- README.md
- PROGRESS.md

