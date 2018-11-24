/*
 * Addon Guild Storage Script
 * Author: DarkThanos, GreatApo
 */

// Guild Storage
var gca_guild_storage = {
	inject : function(){
		// If Item shadow
		(gca_options.bool("global","item_shadow") && 
			this.itemShadow.inject());

		// Setting Link
		gca_tools.create.settingsLink("guild");
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
	},
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_guild_storage.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();
