/*
 * Addon Markets Script
 * Author: DarkThanos, GreatApo
 */

// Markets
var gca_markets = {
	inject : function(){
		// Check for errors
		if(!document.getElementById("content"))
			return;
		
		// If Item shadow
		(gca_options.bool("global","item_shadow") &&
			this.itemShadow.market());
	},

	// Add shadow on items
	itemShadow : {
		market : function() {
			// Get items
			var items = document.getElementById('market_table').getElementsByTagName("div");
			
			// For each
			for (var i = items.length - 1; i >= 0; i--) {
				if (items[i].className.match("item-"))
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
		gca_markets.inject();
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
