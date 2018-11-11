/*
 * Addon Sync Script
 * Author: DarkThanos, GreatApo
 */

// Sync
var gca_sync = {
	inject : function() {
		if (!gca_getPage.parameter('gcamod') == 'sync') return;
		if (!document.getElementById('avatar')) return;

		// Parse data
		let data = this.resolve();

		// Create confirm modal
		var modal = new gca_tools.Modal(
			gca_locale.get("settings", "category_data$cross_browser_login"),
			null,
			() => {
				let expire = new Date();
				expire.setTime(expire.getTime() + (15*24*60*60*1000));
				expire = expire.toUTCString();
				document.cookie = "Gladiatus_" + gca_section.country + "_" + gca_section.server + "=" + data.player + "%3B" + data.securehash + "; expires=" + expire + ";path=/";
				//document.cookie = "PHPSESSID=" + data.sessionid + "; expires=" + expire + ";path=/";
				document.location.href = 'index.php';
				modal.destroy();
			},
			() => {
				modal.destroy();
			}
		);
		modal.body(gca_locale.get("Sync", "are_you_sure"));
		modal.button(gca_locale.get("Sync", "yes"), true);
		modal.button(gca_locale.get("Sync", "no"), false);
		modal.show();
	},

	resolve : function() {
		let player = gca_getPage.parameter('p');
		if (!player.match(/^\d+$/)) return;
		let securehash = gca_getPage.parameter('s');
		if (!securehash.match(/^[0-9a-z]+$/)) return;
		//let sessionid = gca_getPage.parameter('i');
		//if (!sessionid.match(/^[0-9a-z]+$/)) return;

		return {
			player : player,
			securehash : securehash,
			//sessionid : sessionid
		};
	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_sync.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_getPage, gca_section, gca_tools */
