/*
 * Addon Magus Script
 * Author: DarkThanos, GreatApo
 */

// Magus
var gca_magus = {
	inject : function(){
		// Check for errors
		if(!document.getElementById("content"))
			return;
		
		// Fade non improvable items
		(gca_options.bool("magus","fade_unimprovable_items") &&
			this.fadeUnimprovableItems.inject());

		// If Item shadow
		(gca_options.bool("global","item_shadow") && 
			this.itemShadow.inject());

		// Setting Link
		gca_tools.create.settingsLink("magus");
	},

	// Fade non affordable items
	fadeUnimprovableItems : {
		inject : function() {
			// Recheck items on item move
			gca_tools.event.request.onAjaxResponse(() => {
				this.check();
			});
			// Add event on bag open
			gca_tools.event.bag.onBagOpen(() => {
				// Find best food
				this.check();
			});
			gca_tools.event.bag.waitBag(() => {
				// Find best food
				this.check();
			});
			// Run for the first time
			this.check();
		},
		// Do a check
		check : function(){
			var items;

			// Get char items
			items = document.getElementById('char').getElementsByClassName("ui-draggable");
			// For each
			for (let i = items.length - 1; i >= 0; i--) {
				// If cannot improve
				if(parseInt(items[i].dataset.quality)>1) {
					items[i].style.opacity = 0.6;
				}else{
					items[i].style.opacity = 1;
				}
			}
			
			// Get inv items
			items = document.getElementById('inv').getElementsByClassName("ui-draggable");
			// For each
			for (let i = items.length - 1; i >= 0; i--) {
				// If cannot improve
				if(parseInt(items[i].dataset.quality)>1 || parseInt(items[i].dataset.contentType)>1024 || parseInt(items[i].dataset.contentType)==64 ) {
					items[i].style.opacity = 0.6;
				}else{
					items[i].style.opacity = 1;
				}
			}
		}
	},
	
	// Items Shadow Inject
	itemShadow : {
		inject : function(){
			this.dollItems();
		},

		// Add shadow to doll items
		dollItems : function(){
			// Get doll items
			var items = document.getElementById("char").getElementsByClassName("ui-draggable");

			// Add shadow to each item
			for(var i = items.length - 1; i >= 0; i--){
				gca_tools.item.shadow.add(items[i]);
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
		gca_magus.inject();
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
