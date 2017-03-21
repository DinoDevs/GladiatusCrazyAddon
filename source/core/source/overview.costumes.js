/*
 * Addon OverviewAchievements Script
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
			var parts;
			for (var i = costumes_boxes.length - 1; i >= 0; i--) {
				// Get parts
				parts = this.parseCostume(costumes_boxes[i]);
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

(function(){
	// Pre Inject
	gca_overview_costumes.preinject();
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_overview_costumes.inject();
	}
	if(document.readyState == "complete" || document.readyState == "loaded"){
		fireLoadEvent();
	}else{
		window.addEventListener('DOMContentLoaded', function(){
			fireLoadEvent();
		}, true);
		window.addEventListener('load', function(){
			fireLoadEvent();
		}, true);
	}
})();
