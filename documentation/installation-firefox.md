# Installation Documentation - Firefox

<img src="resources/browser-icons/firefox_16x16.png" align="right">

### How to install the addon on *Firefox* browser

- [Install using the *.xpi* extension file](#install-using-the-xpi-extension-file) <sub><sup>(easier)</sup></sub>
- [Install using the *.xpi* extension file (alternative)](#install-using-the-xpi-extension-file-alternative)
- [Install using the *.zip* extension file](#install-using-the-zip-extension-file) <sub><sup>(not recomended)</sup></sub>

---

### Install using the *.xpi* extension file

[*Step 1*] Drag'n'drop the *.xpi* file inside the firefox

![firefox-xpi-drag-n-drop-on-firefox](resources/installation/firefox-xpi-drag-n-drop-on-firefox.png)

[*Step 2*] Click on the "Install" button on the small popup notification

![firefox-extension-approve-install](resources/installation/firefox-extension-approve-install.png)

[*Step 3*] You successful installed the addon

![firefox-extension-approved](resources/installation/firefox-extension-approved.png)

---

### Install using the *.xpi* extension file (alternative)
[*Step 1*] Go to the Firefox’s addons page (about:addons)

![firefox-go-to-addons](resources/installation/firefox-go-to-addons.png)

[*Step 2*] Click on the gear icon on the top right corver and select the "Install Add-on From File..."

![firefox-addon-install-from-file](resources/installation/firefox-addon-install-from-file.png)

[*Step 3*] On the new window, find and open the *.xpi* file

![firefox-addon-install-from-file-open](resources/installation/firefox-addon-install-from-file-open.png)

---

### Install using the *.zip* extension file

This way of installing (loading) the addon is for developers. So it is not recomended for regular users.

[*Step 1*] Extract the *.zip* file somewhere on your computer

![extension-zip-extract](resources/installation/extension-zip-extract.png)

![extension-zip-extract-window](resources/installation/extension-zip-extract-window.png)

[*Step 2*] Go to the Firefox’s addon page (about:debugging#addons)

[*Step 3*] Click on the "*Load Temporary Add-on*" button

![firefox-addon-debug-load-temporary-addon](resources/installation/firefox-addon-debug-load-temporary-addon.png)

[*Step 4*] Find the unzipped extension folder and select the *manifest.json* file inside it

(if you get a manifest v3 error, delete manifest.json file and rename manifest_v2.json to manifest.json, then select it)

![firefox-addon-debug-load-manifest](resources/installation/firefox-addon-debug-load-manifest.png)

[*Step 5*] Now the addon is loaded into Firefox

---

<sub><sup>Last update on 14-Sep-2022</sup></sub>
