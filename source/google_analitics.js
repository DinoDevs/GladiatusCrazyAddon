/*
 * Google Analitics Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_google = {
	run : function(){
		if(navigator.userAgent.toLowerCase().match("chrome")){
			this.analitics("UA-31451966-4");
		}else if(navigator.userAgent.toLowerCase().match("opera")){
			this.analitics("UA-31451966-5");
		}else if(navigator.userAgent.toLowerCase().match("firefox")){
			this.analitics("UA-31451966-3");
		}else{
			this.analitics("UA-31451966-7");
		}
	},
	analitics : function(UA){
		var script=document.createElement('script');
		script.setAttribute("type","text/javascript");
		script.innerHTML=""+
			"var _gaq = _gaq || [];"+
			"_gaq.push(['_setAccount', '"+UA+"']);"+
			"_gaq.push(['_trackPageview']);"+
			"(function() {"+
			"	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;"+
			"	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';"+
			"	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);"+
			"})();";
		document.getElementsByTagName("head")[0].appendChild(script);
	}
}