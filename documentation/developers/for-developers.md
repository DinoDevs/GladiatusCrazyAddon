## About
<img src="/documentation/resources/icon_128.png" align="right"/>

Gladiatus Crazy Addon is made in javascript and CSS.
 
Anyone can contribute to this project by creating their own repository/branch and creating a pull request in the end, the pull request will be inspected and tested, if it is relevant and works well, it will be added to the addon.

This is purely meant to be informational, taken directly from GCA developers.

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

