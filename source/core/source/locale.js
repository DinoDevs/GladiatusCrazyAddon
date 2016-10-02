/*
 * Addon Locale Script
 * Author: DarkThanos, GreatApo
 */

// Manage Locale
var gca_locale = {
	// Active Locale
	active : "en",
	// Get Locale
	get : function(x){
		// Check Language
		if(gca_languages[gca_locale.active] != undefined)
			// Check Translation
			if(gca_languages[gca_locale.active].locale[x] != undefined)
				// Get Translation
				return gca_languages[gca_locale.active].locale[x];

		// Get english locale
		if(gca_languages["en"].locale[x])
			return gca_languages["en"].locale[x];

		// Undefined Locale
		else
			return "Undefined_Locale["+x+"]";
	}
};

var gca_languages = gca_languages || {};
