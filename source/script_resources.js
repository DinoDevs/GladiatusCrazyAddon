/*
 * Addon Resources Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_resources = {
	// Addon files url (Firefox compatibility)
	addon_url : null,
	firefox_audio : null,
	
	// Get addon url
	getURL : function(path){
		// If Chrome Browser
		if(typeof chrome != 'undefined'){
			return chrome.extension.getURL(path);
		}
		else if(window.navigator.userAgent.indexOf("Edge") > -1){
			return browser.extension.getURL(path);
		}
		// If Firefox Browser
		else {
			if(this.addon_url == null)
				this.addon_url = self.options.path;
			return this.addon_url + path;
		};
	},
	
	// Load files
	load : function(preloader){
		// Preloader
		preloader = typeof preloader !== 'undefined' ? preloader : false;
		// Load Css
		this.loadCss();
		// Load Script
		if(!preloader){
			this.loadScript();
		}
	},
	
	// Css files load
	css : [
		"style_gca.css"
	],
	loadCss : function(){
		for(var i=0; i<this.css.length; i++){
			var link = document.createElement('link');
			link.href = this.getURL(this.css.pop())+"?v="+gca.version;
			link.type = 'text/css';
			link.rel = 'stylesheet';
			(document.head||document.getElementsByTagName('head')[0]||document.documentElement).appendChild(link);
		}
	},
	
	// Script files load
	script : [
		//"script_dd_improve.js"
	],
	loadScript : function(){
		for(var i=0; i<this.script.length; i++){
			var script = document.createElement('script');
			script.type = "text/javascript";
    		script.src = this.getURL(this.script.pop())+"?v="+gca.version;
			(document.head||document.getElementsByTagName('head')[0]||document.documentElement).appendChild(script);
		}
	}
}