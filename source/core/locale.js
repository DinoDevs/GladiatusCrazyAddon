/*
 * Locale Page
 * Gladiatus Crazy Add On
 */

// Locale Manage
var locale = {
	// Languages Language
	countries : {
		"gr" : "el"
	},
	// Languages Available
	languages : [
		"ar","bg","cs","de","el",
		"en","es","et","fa","fr",
		"he","hr","hu","lt","lv",
		"nb","nl","pl","pt","ro",
		"ru","sk","sl","sq","tr",
		"zh"
	],
	// Language loaded
	loaded : "en",

	// Load Language
	preload : function() {
		// Language to load
		var lang = this.find(
			(this.countries[info.page.country]) ? this.countries[info.page.country] : info.page.country,
			info.data.window.localStorage.getItem("gladiatusCrazyAddonData_" + info.page.playerId + "_lang", "en")
		);

		// Load translation script
		tools.preloadScript("source/gca.locale.js");

		// If not english
		if(lang != "en") {
			// Load english for any unsupported translation
			tools.preloadScript("locale/en.js");
		}

		// Load lang
		tools.preloadScript("locale/" + lang + ".js");
		this.loaded = lang;
	},

	// Find language
	find : function(country, lang) {
		// Check if lang available
		if(this.languages.indexOf(lang) != -1)
			return lang;

		// Check if country lang available
		if(this.languages.indexOf(country) != -1)
			return country;

		// Lang not available
		return "en";
	},

	// Load all languages
	loadAllLanguages : function(){
		// For each language
		for (var i = this.languages.length - 1; i >= 0; i--) {
			if (this.languages[i] != "en" && this.languages[i] != this.loaded){
				tools.loadScript("locale/" + this.languages[i] + ".js");
			}
		}
	}

};
