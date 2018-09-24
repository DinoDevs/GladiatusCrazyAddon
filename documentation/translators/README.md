
<p align="center"><img src="../resources/logo-icons/icon_64.png"/></p>
<h1 align="center">Gladiatus Crazy Addon - Translations</h1>
<h4 align="center">Translate the extension to your language</h4>

## Translations

You can find all the translations on the `GladiatusCrazyAddon/source/core/locale/` folder [here](../../source/core/locale/).

### Translation Update Steps

 1. Get the English translation, this would be the `en.js` file, [here](../../source/core/locale/en.js)
 2. Get your language's translation, for example the `de.js` file, [here](../../source/core/locale/de.js)
 3. Insert the missing rows translated on your language file.
	```
		// Get the a line from the en.js
		number_of_items : "Number of items : {{number}}",

		// Paste it on the de.js file and translate it, ignore enything inside {{this}} brakets
		number_of_items : "Anzahl der Teile : {{number}}",
	```
 4. Open an issue with the translation or better create a pull request
