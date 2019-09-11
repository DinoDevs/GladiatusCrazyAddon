/*
 * Addon Highscore Script
 * Author: DarkThanos, GreatApo
 */

// Location
var gca_highscore = {
	inject : function(){
		// On search
		if (gca_section.submod === 'suche') {
			this.highlight_search();
		}
		// On other lists
		else {
			this.highlight_targets();
		}
	},

	// Highlight targets
	highlight_targets : function() {
		// Don't run on guilds
		if (gca_getPage.parameter('t') === '1') return;

		// Get links
		let links = document.querySelectorAll('#content table td.ellipsis a');
		if (!links.length) return;

		// Get targets
		let targets = gca_data.section.get('arena', 'target-list', {});

		// Highlight players
		links.forEach((link) => {
			let info = link.href.match(/\:\/\/s(\d+)-\w+\.gladiatus\.gameforge\.com\/game\/index\.php\?mod=player&p=(\d+)/i);
			if (info && targets.hasOwnProperty(info[2] + '@' + info[1])) {
				let id = info[2] + '@' + info[1];
				link.style.textShadow = '0px 0px 2px ' + targets[id][3];
			}
		});
	},

	// Highlight players on search
	highlight_search : function() {
		// Get links
		let links = document.querySelectorAll('#content table td a');
		if (!links.length) return;

		// Get targets
		let targets = gca_data.section.get('arena', 'target-list', {});
		// Get guild mates
		let mates = gca_data.section.get('guild', 'mates');
		mates.forEach((mate) => {
			mates['id-' + mate.id] = mate;
		})

		// Highlight players
		links.forEach((link) => {
			let info = link.href.match(/\:\/\/s(\d+)-\w+\.gladiatus\.gameforge\.com\/game\/index\.php\?mod=player&p=(\d+)/i);
			if (info) {
				if (targets.hasOwnProperty(info[2] + '@' + info[1])) {
					let id = info[2] + '@' + info[1];
					link.style.textShadow = '0px 0px 2px ' + targets[id][3];
				}
				if (mates.hasOwnProperty('id-' + info[2])) {
					link.style.color = 'green';
					link.style.fontWeight = 'bold';
				}
			}
		});
	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_highscore.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_data, gca_getPage, gca_section */
