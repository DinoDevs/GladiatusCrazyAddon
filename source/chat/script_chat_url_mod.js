/*
 * Addon Chat Url Mod Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_chat_url_mod = {
	// Make a functional - responsive url system
	run: function() {
		// Set write enable
		history_write = true;
		history_overwrite = false;

		// Game frame
		var gameFrame = document.getElementsByTagName("iframe")[0];

		// Read url and paraments
		var mainUrl = document.location.href.match(/(https*:\/\/[^\/]+\/game\/)main.php/i)[1];
		var paraments = document.location.href.match(/\/main.php\?*(.*)/i)[1];
		
		// Apply url
		if( paraments.length>1 ){
			history_write = false;
			history_overwrite = true;
			gameFrame.contentWindow.location.replace( mainUrl+'index.php?'+paraments );
		}

		// Attach onload event
		gameFrame.addEventListener('load', function(){
			if(history_write){
				history.pushState( null, null, gameFrame.contentWindow.location.href.match(/index.php(.+)/i)[1] );
			}else if(history_overwrite){
				history.replaceState( null, null, gameFrame.contentWindow.location.href.match(/index.php(.+)/i)[1] );
			}
			history_write = true;
			history_overwrite = true;
		}, false);

		// On history move
		window.addEventListener("popstate", function(e){
			paraments = document.location.href.match(/\/main.php\?*(.*)/i)[1];
			if( paraments.length>1 ){
				history_write = false;
				history_overwrite = false;
				gameFrame.contentWindow.location.replace( mainUrl+'index.php?'+paraments );
			}
		}, false);
	}
}