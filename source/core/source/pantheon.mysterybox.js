/*
 * Addon Pantheon Mysterybox Script
 * Author: DarkThanos, GreatApo
 */

// Overview
var gca_pantheon_mysterybox = {
	inject : function(){
		// Show gods points percent
		(gca_options.bool("pantheon", "open_many_mysteryboxes") && 
			this.showPointsPercent());
	}

	// Open many mysteryboxes
	openManyMysteryboxes : {
		// Inject
		inject : function(){
			
		}
	}
};

(function(){
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_pantheon_mysterybox.inject();
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