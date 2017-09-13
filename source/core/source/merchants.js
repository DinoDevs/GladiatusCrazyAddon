/*
 * Addon Merchants Script
 * Author: DarkThanos, GreatApo
 */

// Merchants
var gca_merchants = {
	inject : function(){
		// Check for errors
		if(!document.getElementById("content"))
			return;
		
		// Save merchants time
		(gca_options.bool("global","merchants_timer") &&
			this.save_merchants_info());

		// If Item shadow
		(gca_options.bool("global","item_shadow") && 
			this.itemShadow.shop());
	},

	// Save merchants infomations
	save_merchants_info : function(){
		// Check for errors
		if(!document.getElementById("shop") || !document.getElementById("shop_nav"))
			return;

		// Get cooldown timer
		var cooldown = document.getElementsByClassName("new_inventory_timer_text")[0].getElementsByTagName('span')[0];
		var cooldownText = document.getElementsByClassName("new_inventory_timer")[0].textContent;
		
		// Save time
		var availableIn = gca_tools.time.server() + parseInt(cooldown.dataset.tickerTimeLeft);
		
		// Update data
		gca_data.section.set("timers", 'merchants_refresh', availableIn);
		gca_data.section.set("timers", 'merchants_refresh_text', cooldownText);

		// Fire merchants info updated
		gca_tools.event.fireOnce("merchants-timer-update");
	},

	// Add shadow on items
	itemShadow : {
		shop : function() {
			// Get items
			var items = document.getElementById('shop').getElementsByClassName("ui-draggable");
			
			// For each
			for (var i = items.length - 1; i >= 0; i--) {
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
		gca_merchants.inject();
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
