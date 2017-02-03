/*
 * Addon Locale Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_locale = {
	load : function(x){
		if(gca_options.load("GLOBAL_LANGUAGE")==undefined)
			gca_options.save("GLOBAL_LANGUAGE",this.findLang());
	},
	get : function(x){
		if(gca_languages[gca_options.load("GLOBAL_LANGUAGE","en")]!=undefined)
			if(gca_languages[gca_options.load("GLOBAL_LANGUAGE","en")].locale[x]!=undefined)
				return gca_languages[gca_options.load("GLOBAL_LANGUAGE","en")].locale[x];
		return (gca_languages["en"].locale[x])?gca_languages["en"].locale[x]:"Undefined_Locale["+x+"]";
	},
	findLang : function(){
		var lang = getPage.url();
		if(lang.match(/s\d+\.\w+\.gladiatus\.gameforge\.com/)){
			lang = lang.match(/\.(\w+)\.gladiatus\.gameforge\.com/)[1];
		}else{
			lang = lang.match(/-(\w+)\.gladiatus\.gameforge\.com/)[1];
		}
		if(gca_languages[lang]==undefined)
			lang = "en";
		return lang;
	}
};

var gca_languages = {}