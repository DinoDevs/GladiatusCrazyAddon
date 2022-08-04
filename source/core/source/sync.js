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

		// Create loading layer
		var loading = document.createElement('div');
		loading.className = 'loading';
		loading.style = 'position: fixed;top: 0;bottom: 0;left: 0;right: 0;width: auto;height: auto;background-position: center center;background-color: rgba(0,0,0,0.5);z-index: 9999;';
		loading.style.display = 'none';
		document.body.appendChild(loading);

		// Create confirm modal
		var modal = new gca_tools.Modal(
			gca_locale.get('settings', 'category_data$cross_browser_login'),
			null,

			// On login
			() => {
				// Calculate expiration date
				let expire = new Date();
				expire.setTime(expire.getTime() + (14 * 24*60*60*1000));
				expire = expire.toUTCString();
				
				// Create cookies
				document.cookie = "Gladiatus_" + gca_section.country + "_" + gca_section.server + "=" + data.player + "%3B" + data.securehash + "; expires=" + expire + "; domain=.s" + gca_section.server + "-" + gca_section.country + ".gladiatus.gameforge.com; path=/; SameSite=Strict; Secure";
				document.cookie = "Gca_" + gca_section.country + "_" + gca_section.server + "=" + data.player + "_" + data.securehash.substring(0, data.securehash.length/4) + "; expires=" + expire + "; domain=.s" + gca_section.server + "-" + gca_section.country + ".gladiatus.gameforge.com; path=/; SameSite=Strict; Secure";
				
				// Show loading
				loading.style.display = 'block';

				// Close modal
				modal.destroy();

				// Get secure hash
				//window.jQuery.get('main.php').success((html) => {
				window.jQuery.get('index.php?mod=overview').success((html) => {
					// Get hash
					let match = html.match(/index\.php\?mod=overview&sh=([0-9a-f]+)"/);

					// If found
					if (match) {
						// Redirect
						document.location.href = 'index.php?mod=overview&sh=' + match[1];
					}

					// If not found
					else {
						gca_notifications.error(gca_locale.get('general', 'error'));
						loading.style.display = 'none';
					}
				}).error(() => {
					gca_notifications.error(gca_locale.get('general', 'error'));
					loading.style.display = 'none';
				});
			},

			// On cancel
			() => {
				modal.destroy();
			}
		);
		modal.body(gca_locale.get('sync', 'are_you_sure', {name : data.name}));
		modal.button(gca_locale.get('general', 'yes'), true);
		modal.button(gca_locale.get('general', 'no'), false);
		modal.show();
	},

	resolve : function() {
		let player = gca_getPage.parameter('p');
		if (!player.match(/^\d+$/)) return false;
		let securehash = gca_getPage.parameter('s');
		if (!securehash.match(/^[0-9a-z]+$/)) return false;
		let name = document.getElementsByClassName('playername');
		if (!name.length) name = document.getElementsByClassName('playername_achievement');
		if (!name.length) return false;
		name = name[0].textContent.trim();

		return {
			player : player,
			name : name,
			securehash : securehash
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
/* global gca_getPage, gca_locale, gca_notifications, gca_section, gca_tools */
