
<p align="center"><img src="../resources/logo-icons/icon_64.png"/></p>
<h1 align="center">Gladiatus Crazy Addon - Translations</h1>
<h4 align="center">Translate the extension to your language</h4>

## Translations

You can find all the translations on the `GladiatusCrazyAddon/source/core/locale/` folder [here](../../source/core/locale/).

### Translation Update Steps

 1. Get the English translation, this would be the `en.js` file, [here](../../source/core/locale/en.js)
 2. Get your language's translation, for example the `de.js` file, [translations here](../../source/core/locale/)
 3. Insert the missing rows translated on your language file.
	```
	// Get the a line from the en.js
	number_of_items : "Number of items : {{number}}",

	// Paste it on the de.js file and translate it, ignore enything inside {{this}} brakets
	number_of_items : "Anzahl der Teile : {{number}}",
	```
 4. Open an [issue](https://github.com/DinoDevs/GladiatusCrazyAddon/issues/new?template=translation.md) with the translation or better create a pull request

### Translation Create Steps

 1. Get the English translation, this would be the `en.js` file, [here](../../source/core/locale/en.js)
 2. Change the file name to your language code and update the info iside it
	```
	/*
	 * Gladiatus Crazy Addon Translation
	 * Name : <full language name>
	 * Code : <language code>
	 * Tag  : <language tag>
	 * Translator: <your name here>
	 */
	 
	...
	
	// Set Language
	gca_languages[<language code>] = {
		// Language name
		name : "<full language name>",
		// Translators (authors of this script)
		translators : ["<your name here>"],
	```
 3. Insert the missing rows translated on your language file.
	```
	// Change the line from english
	number_of_items : "Number of items : {{number}}",

	// Tranlate it to your language, ignore enything inside {{this}} brakets
	number_of_items : "Anzahl der Teile : {{number}}",

	// If you don't know how to tranlate a row, remove it
	```
 4. Open an [issue](https://github.com/DinoDevs/GladiatusCrazyAddon/issues/new?template=translation.md) with the translation or better create a pull request
