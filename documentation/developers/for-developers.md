## About GCA
<img src="/documentation/resources/icon_128.png" align="right"/>

Gladiatus Crazy Addon (GCA) is a browser extension, thus a piece of software acting as a browser plugin, extending the browser's functionalities.
GCA uses the modern [Web Extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions) format supported by most moder Web Browsers. This extension format was first introdused by Chromium and later adopted by Firefox. Thus, currently such extensions are supported by Chrome, Firefox, Opera, Edge (Basically all Firefox-based and Chromioum-based browsers).

Anyone can contribute to this project by creating their own repository/branch and creating a pull request in the end, the pull request will be inspected and tested, if it is relevant and works well, it will be added to the addon.

This is purely meant to be informational, taken directly from GCA developers.

## Folders Structure
The source code for the extension is the [source](https://github.com/DinoDevs/GladiatusCrazyAddon/tree/master/source) folder of the Github project.
The structure of it is the following:
```
- manifest.json                         // Extension's information
- init.js                               // The execution starting point of the extension (extension context)
- icons/                                // Folder with the extension's icon in various sizes
- core/
    - locale/
        - en.js                         // The english language translations script (this is used as a base and a fallback for all translations)
        - {country-or-language-code}.js // One script for each language with translations (website context)
    - resources/                        // Folder with images, sounds, styles, libraries etc. (basically resources that the GCA may load)
        - {assets}
        - style_gca.css                 // Main (single) CSS file that loads to apply changes to the game
    - source/
        - global.js                     // Main script running on all game pages (website context)
        - gca.info.js                   // Extension information (extension paths, current page ino, related links) script (website context)
        - gca.data.js                   // Data storage handling (including default values) script (website context)
        - gca.tools.js                  // Various helping functions script (website context)
        - gca.{other-scripts}.js
        - {section-based-script}.js     // Scripts that run only on specific pages of the game
    - background.js                     // Extension's page running in the background of the browser (extension context)
    - background.recipes.js             // Database with recipes that may be loaded by the background page (extension context)
    - inject.js                         // Script responsible for injecting scripts inside the gladiatus game (extension context)
    - info.js                           // Script with information about the extension and the current page (extension context)
    - locale.js                         // Script identifing which languages/translations to load (extension context)
    - manager.js                        // Script identifing which page specific scripts should be loaded (extension context)
```

## Used Contenxt

The initialisation code of the extension run on the extension context of the browser, having access to many Browser internal APIs and functionalities but as this extension focuses on imporving the game's experience and thus most of the changes are targeting the actual website of the game, most of the scripts are injected on the game page and run on the website context.

All the scripts under `/core/source/` are running at the website context and hold most of the extension's code and thus most of the features.

## Focusing on the right scripts

For developers: All webpage scripts under `/core/source/` and hold most of the extension's code and thus most of the features.
For translators: Translations as under `/core/locale/` and also runs at the webpage context.


## Introduction 

(**Quoted from @GramThanos**)

>The main idea is that each page has 1 script that contains the features targeting that page. Additionally, there is one script that runs on every page (name "global").
>All these script are located at "/source/core/source/". For example, the script named "overview.js" runs at player's overview web-page.
>
>These scripts are loaded by the "manager.js" located at "/source/core/". The manager script runs with "extensions rights", while the scripts it imports run with "web-page rights" (injected inside the page).
>
>At the bottom of each page script you will find a loader snippet that waits for the page to load. At the top of the code you will find the script's object. For example the overview script, defines the gca_overview object.
>
>As soon as the DOM is ready, the inject function of the script's object is fired (e.g. gca_overview.inject() ). Some scripts also feature a preinject function that runs as soon as possible, usually to apply CSS on the HTML tag, in order to avoid bad visual experience.
>
>Some scripts are special and are injected on the page before any other script. For example the gca_tools script, that holds functions need by many pages. Also, gca_data that is the local storage manager and of course the gca_info script that does the page url analysis, like gca_section.mod and gca_section.submod and also gca_getPage.link(parameters).
>
>**<p>Adding a feature:</p>**
>Lets say we want to make the player's title red (with javascript).
>First we define the code under gca_overview. If our code is more than one function, we add it under an object. In this example we just have 1 function so we can define it at
>
>gca_overview.makeTitleRed = function () {
>... // RED!
>}
>
>This function should then be called from gca_overview.inject. After debugging we enable an option to turn it on and off. We define the default value inside the gca_data.js script, at the gca_options.data.overview.red_title = false (default turned off)
>
>Now we can add it to the call code we added on inject with a (gca_options.bool('overview', 'red_tile' && this.makeTitleRed());
>
>Then we will have to place the options at the settings page, inside the settings.js (search for overview), the format there is like the gca_data.js but supports functions as values. It is automatic for known types like booleans.
>
>Lastly, you need to add at least the English translation of the item you just added on the settings page. To do so, you can go to the settings page (on browser) at the overview category, there will be an "undefined translation" id instead of a text, copy it and add it at the /source/core/locale/en.js (you will understand where it goes... all the settings related translations are together).

**Quoted from @GreatApo**

>If you are interested, I would suggest looking into the code. The code is written in Javascript which modifies the webpage (HTML, CSS). There is also a CSS file that is loaded >to help us style custom and existing objects. The file structure is relatively easy too, you will see a bunch of files under "source" folder each of which runs on a separate >page of gladiatus (eg. auction runs on auction).
>
>In terms of the workflow, load the extension as unpacked (follow the installation guide by getting the addon for github) and then you can modify the script files, save and just >reload the webpage. You can find the console by clicking f12 in you browser. We use pure javascript and some JQuery that Gladiatus also loads. The translations system along with >how we same data is custom but easy (you can see how it works in the code).

## Open sourcing the simulator

Now available at https://github.com/DinoDevs/GladiatusBattleSimulator.

## Work in progress

More information might be added in the future...

