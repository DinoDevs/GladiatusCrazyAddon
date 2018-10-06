/*
 * Addon OverviewCostumes Script
 * Author: DarkThanos, GreatApo
 */

// OverviewCostumes
var gca_overview_costumes = {
	// Pre Inject code
	preinject : function(){
		// Check if style is active
		if(gca_options.bool("overview","costumes_layout"))
			// Add class tag
			document.documentElement.className += " gca_costumes_styling";
	},

	// Inject Code
	inject : function(){
		// Improve Layout
		(gca_options.bool("overview","costumes_layout") && 
			this.partsIndicators.show());
	},

	// Count costume parts
	partsIndicators : {

		// Show indicators
		show : function(){
			// Get costumes boxes
			var costumes_boxes = document.getElementsByClassName("costumes_box");
			// For each box
			for (let i = costumes_boxes.length - 1; i >= 0; i--) {
				// Get parts
				let parts = this.parseCostume(costumes_boxes[i]);
				// Create counter
				this.createIndicator(parts, costumes_boxes[i]);
			}
		},

		// Parse costume
		parseCostume : function(box){
			// Get costume
			var costume = box.getElementsByTagName("div")[0];
			// Get parts
			var parts = costume.dataset.tooltip.match(/\((\d+)\\\/(\d+)\)/);
			// Return info
			return [
				parseInt(parts[1], 10),
				parseInt(parts[2], 10)
			];
		},

		// Create indicator
		createIndicator : function(parts, box){
			// Create div
			var div = document.createElement("div");
			div.className = "parts_indicator";
			div.textContent = parts[0] + "/" + parts[1];
			box.appendChild(div);
		}
	}

};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_overview_costumes.inject();
	};
	gca_overview_costumes.preinject();
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_options */
