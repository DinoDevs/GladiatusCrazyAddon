# Steps to Release Version

This document provides information on the procedure that needs to be followed in order to publish a new release.

## 1. Preparation

### 1.1. Update versioning
Make sure that the correct version number is set on all the appropriate project files. Check the following files:

- `README.md`, update the versions on the main README file
- `package.json`, update the version on the project's package info file
- `source/manifest.json`, update the version on the browser plugin manifest v3 file
- `source/manifest_v2.json`, update the version on the browser plugin manifest v2 file
- `source/core/source/gca.info.js`, update the in-browser version number

Finaly conduct a search in all the project files to verify that the old verion number is not present.

## 1.2 Build Binaries

Run the build script inside the dist folder to prepare the latest binaries:
```
thanos@frutyx-pc:~/GladiatusCrazyAddon/dist$ ./build.sh
==================================================
       STARTING GLADIATUS ADDON BUILD SYSTEM
==================================================
[?] Cleaning up previous build artifacts...
[✓] Workspace cleaned.
[?] Navigating to source directory...
[?] Packaging Chrome (Manifest v3)...
[✓] Chrome (v3) archive created.
[?] Packaging Chrome (Deprecated Manifest v2)...
[✓] Chrome (v2) archive created and manifest mapped.
[?] Packaging Firefox (Manifest v2)...
[✓] Firefox .xpi package ready.
[?] Packaging Edge (Manifest v3)...
[✓] Edge (v3) archive created.
[?] Packaging Edge (Deprecated Manifest v2)...
[✓] Edge (v2) archive created and manifest mapped.
[?] Generating build timestamp...

==================================================
          BUILD COMPLETED SUCCESSFULLY!
==================================================
[?] Generated Target Artifacts:
4.8M    GladiatusCrazyAddOn_Chrome.zip
4.8M    GladiatusCrazyAddOn_Chrome_Manifest_v2.zip
4.8M    GladiatusCrazyAddOn_Edge.zip
4.8M    GladiatusCrazyAddOn_Edge_Manifest_v2.zip
4.8M    GladiatusCrazyAddOn_Firefox.xpi
0       build_date_20320101.txt
```

## 2. Release on Github, Website, Stores

### 2.1. Release on Github
Draft a new release on GitHub:
- Copy the [PROGRESS.md](https://github.com/DinoDevs/GladiatusCrazyAddon/blob/master/PROGRESS.md) file's contents
- Create a [new release](https://github.com/DinoDevs/GladiatusCrazyAddon/releases/new) on GitHub
  - Use a previous release to follow the same template an format (e.g. [v4.3.11 ](https://github.com/DinoDevs/GladiatusCrazyAddon/releases/tag/v4.3.11))
  - Tag: create new tag in `vX.Y.Z` format
  - Title: in `Release vX.Y.Z` format
  - Copy past content from the PROGRESS.md
    - Remove any `[X]` (makings of implementation status)
    - Update badges at the top (remove beta badge and add release and date badges, check older release for to copy past format)
  - Attach all the binary files generated on the previous step

### 2.2. Release on DinoDevs GCA website
Update dinodevs website with new version info:

- Update latest version on the config file
- Update version changelog file

### 2.3. Release on Stores

Upload versions on stores:
- Upload on [chrome store](https://chrome.google.com/u/3/webstore/devconsole)
  - Use the `GladiatusCrazyAddOn_Chrome.zip` binary
  - The version will be reviewed and release publicly
  - Users around the world will get the update automatically
- Upload on [edge store](https://partner.microsoft.com/en-us/dashboard/microsoftedge/overview)
  - Use the `GladiatusCrazyAddOn_Edge.zip` binary
  - The version will be reviewed and release publicly
  - Users around the world will get the update automatically
- Upload on [firefox store](https://addons.mozilla.org/en-US/developers/addons)
  - Use the `GladiatusCrazyAddOn_Firefox.xpi` binary
  - The version will be reviewed and release publicly
  - Users around the world will get the update automatically
- Generate self hosted version on [firefox store](https://addons.mozilla.org/en-US/developers/addons)
  - Use the `GladiatusCrazyAddOn_Firefox.xpi` binary
  - Download the signed version
  - Upload the signed version on the Github release page

## 3. Post-release actions

Prepare new developer version on project files:
- `PROGRESS.md`, clean progress file preparing the changelog for the next version


