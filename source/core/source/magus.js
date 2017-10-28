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
		
		// Fade unimprovable items
		(gca_options.bool("magus","fade_unimprovable_items") &&
			this.fadeUnimprovableItems.inject());

		// If Item shadow
		(gca_options.bool("global","item_shadow") && 
			this.itemShadow.inject());
	},

	// Fade unaffordable items
	fadeUnimprovableItems : {
		inject : function() {
			// Save instance
			var that = this;
			// Recheck items on item move
			gca_tools.event.request.onAjaxResponce(function(){
				that.check();
			});
			// Add event on bag open
			gca_tools.event.bag.onBagOpen(function(){
				// Find best food
				that.check();
			});
			gca_tools.event.bag.waitBag(function(){
				// Find best food
				that.check();
			});
			// Run for the first time
			this.check();
		},
		// Do a check
		check : function(){
			// Get char items
			var items = document.getElementById('char').getElementsByClassName("ui-draggable");
			// For each
			for (var i = items.length - 1; i >= 0; i--) {
				// If cannot improve
				if(parseInt(items[i].dataset.quality)>1) {
					items[i].style.opacity = 0.6;
				}else{
					items[i].style.opacity = 1;
				}
			}
			
			// Get inv items
			var items = document.getElementById('inv').getElementsByClassName("ui-draggable");
			// For each
			for (var i = items.length - 1; i >= 0; i--) {
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

(function(){
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_magus.inject();
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
