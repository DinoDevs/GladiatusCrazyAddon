/*
 * Addon Pantheon Gods Script
 * Author: DarkThanos, GreatApo
 */

// Overview
var gca_pantheon_gods = {
	inject : function(){
		// Show gods points percent
		(gca_options.bool("pantheon", "gods_show_points_percent") && 
			this.showPointsPercent());

		// Setting Link
		gca_tools.create.settingsLink("pantheon");
	},

	// Gods names
	names : ["vulcanus", "mars", "merkur", "diana", "apollo", "minerva"],

	// Show gods points percent
	showPointsPercent : function(){
		// If no gods elements
		if (!document.getElementById("gods")) return;
		
		// For each good
		for (let i = 0; i < this.names.length; i++) {
			// Get god info
			let info = document.getElementById(this.names[i]).getElementsByClassName("god_points")[0];
			// Get points
			let points = info.textContent.match(/(\d+) \/ (\d+)/i);
			// If points found
			if (points) {
				// If full points
				if (points[1] == points[2]) {
					info.style.color = "#D00000";
				}
				
				info.appendChild(document.createTextNode(" "));
				let span = document.createElement('span');
				span.style.fontSize = '0.75em';
				span.textContent = "(" + (Math.round(parseInt(points[1], 10) * 100 / Math.round(points[2], 10))) + "%)";
				info.appendChild(span);
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
		gca_pantheon_gods.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_options, gca_tools */
