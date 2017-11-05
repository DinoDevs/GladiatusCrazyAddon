/*
 * Addon Locale Script
 * Author: DarkThanos, GreatApo
 */

// Manage Locale
var gca_locale = {
	// Active Locale
	active : "en",

	// Load
	_loaded : false,
	_load : function(){
		// Clear
		this._loaded = true;
		// Get info
		var country = gca_section.country;
		var savedlang = this._getLang();

		// Check if saved lang available
		if(savedlang && gca_languages.hasOwnProperty(savedlang) != -1){
			this.active = savedlang;
		}
		// Check if country lang available
		else if(gca_languages.hasOwnProperty(country) != -1){
			this.active = country;
		}
		// Lang not available
		else {
			this.active = "en";
		}
	},

	// Get or Set lang
	_getLang : function(){
		return window.localStorage.getItem(gca_data_manager.mod + "_" + gca_section.playerId + "_lang");
	},
	_setLang : function(lang){
		window.localStorage.setItem(gca_data_manager.mod + "_" + gca_section.playerId + "_lang", lang);
	},


	// Get Locale
	get : function(section, code, variables){
		// TODO : call deprecated warning
		if(typeof code == "undefined"){
			// Deprecated Message
			console.log("Function \"" + arguments.callee.caller.name + "\" called gca_locale.get(\"" + section + "\") which is deprecated!");
		}

		// Get raw translation code
		var raw = this.getRaw(section, code);

		// If not found
		if(raw == false){
			// Undefined Locale
			console.log("Function \"" + arguments.callee.caller.name + "\" called gca_locale.get(\"" + section + "\", \"" + code + "\") which is undefined!");
			// Return undefined
			return "Undefined_Locale[" + section + "][" + code + "]";
		}

		// If no variables
		if(typeof variables == "undefined"){
			// Return raw traslation
			return raw;
		}

		// For each variable
		for(var name in variables){
			// Replace variable
			raw = raw.replace(new RegExp('{{' + name + '}}', 'g'), variables[name]);
		}
		// Return generated traslation
		return raw;
	},

	// Get Locale
	getRaw : function(section, code){
		// Load if not loaded
		if(!this._loaded) this._load();

		// TODO : call deprecated method if needed
		if(typeof code == "undefined"){
			return this.get_deprecated(section);
		}

		// Check Language
		if(gca_languages[gca_locale.active] != undefined){
			// Check Translation
			if(
				gca_languages[gca_locale.active].locale[section] != undefined &&
				gca_languages[gca_locale.active].locale[section][code] != undefined
			) {
				// Get Translation
				return gca_languages[gca_locale.active].locale[section][code];
			}
		}
		
		// If not found, fallback to english
		// Get english locale
		if(
			gca_languages["en"].locale[section] &&
			gca_languages["en"].locale[section][code]
		){
			return gca_languages["en"].locale[section][code];
		}

		// If not found
		// Undefined Locale
		else{
			return false;
		}
	},


	// Get Locale - TODO : Deprecated method
	get_deprecated : function(x){
		// Check Language
		if(gca_languages[gca_locale.active] != undefined)
			// Check Translation
			if(gca_languages[gca_locale.active].locale_deprecated && gca_languages[gca_locale.active].locale_deprecated[x] != undefined)
				// Get Translation
				return gca_languages[gca_locale.active].locale_deprecated[x];

		// Get english locale
		if(gca_languages["en"].locale_deprecated[x])
			return gca_languages["en"].locale_deprecated[x];

		// Undefined Locale
		else
			return "Undefined_Locale["+x+"]";
	}
};

// Gca languages object
var gca_languages = gca_languages || {};
