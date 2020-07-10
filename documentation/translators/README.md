
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
	To easily find the missing translations:
	- a) Go to GCA settings in Gladiatus (Profile → Scroll down → Settings)
	- b) Select the language you want to translate
	- c) click the "Missing Translations" button
 4. Open an [issue](https://github.com/DinoDevs/GladiatusCrazyAddon/issues/new?template=translation.md) with the translation or better create a pull request

### Translation Create Steps

 1. Get the English translation, this would be the `en.js` file, [here](../../source/core/locale/en.js)
 2. Change the file name to your language code and update the info inside it
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
 3. Translate any text inside quotes ex. `dont_translate_me : "But translate me!"`.
	```
	// Change the line from English
	number_of_items : "Number of items : {{number}}",

	// Translate it to your language, ignore anything inside {{this}} brackets
	number_of_items : "Anzahl der Teile : {{number}}",

	// If you don't know how to translate a row, remove it
	```
 4. Open an [issue](https://github.com/DinoDevs/GladiatusCrazyAddon/issues/new?template=translation.md) with the translation or better create a pull request
