/*
 * Addon Highscore Script
 * Author: DarkThanos, GreatApo
 */

// Location
var gca_highscore = {
	inject : function(){
		if (gca_section.submod != 'suche') {
			if (document.getElementById('highscore_range'))
				this.highlight_targets();
		}
	},

	// Highlight targets
	highlight_targets : function() {
		let table = document.getElementById('content').getElementsByTagName('table');
		// If no players
		if (!table.length) return;
		table = table[0];

		// Get links
		let row = table.getElementsByTagName('tr');
		if (!row.length) return;

		// Get targets
		let targets = gca_data.section.get('arena', 'target-list', {});

		// Highlight players
		for (var i = row.length - 1; i >= 0; i--) {
			let link = row[i].getElementsByTagName('a')[0];
			let info = link.href.match(/\:\/\/s(\d+)-\w+\.gladiatus\.gameforge\.com\/game\/index\.php\?mod=player&p=(\d+)/i);
			if (info && targets.hasOwnProperty(info[2] + '@' + info[1])) {
				let id = info[2] + '@' + info[1];
				link.style.textShadow = '0px 0px 2px ' + targets[id][3];
			}
		}
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
/* global gca_data, gca_section */
