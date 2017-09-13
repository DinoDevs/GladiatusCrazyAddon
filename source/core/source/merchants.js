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
		
		// Fade unadordable items
		(gca_options.bool("merchants","fade_unaffordable_items") &&
			this.fadeUnaffordableItems.inject());

		// Save merchants time
		(gca_options.bool("global","merchants_timer") &&
			this.save_merchants_info());
	},

	// Fade unaffordable items
	fadeUnaffordableItems : {
		inject : function() {
			// Save instance
			var that = this;
			// Recheck items on item move
			gca_tools.event.request.onAjaxResponce(function(){
				that.check();
			});
			// Run for the first time
			this.check();
		},
		// Do a check
		check : function(){
			// Get gold
			var gold = parseInt(gca_tools.strings.removeDots(document.getElementById('sstat_gold_val').textContent), 10);
			// Get rubies
			var rubies = parseInt(gca_tools.strings.removeDots(document.getElementById('sstat_ruby_val').textContent), 10);
			
			// Get shop items
			var items = document.getElementById('shop').getElementsByClassName("ui-draggable");
			// For each
			var t, g, r;
			for (var i = items.length - 1; i >= 0; i--) {
				// Parse tooltip
				t = items[i].dataset.tooltip.replace(/\./g, "").replace(/\\/g, "");
				// Get item's gold
				g = t.match(/(\d+) <div class="icon_gold">/);
				g = (g) ? g[1] : 0;
				// Get item's rubies
				r = t.match(/(\d+) <div class="icon_rubies">/);
				r = (r) ? r[1] : 0;

				// If cannot afford
				if(g > gold || r > rubies) {
					items[i].style.opacity = 0.6;
				}
				// If can afford
				else {
					items[i].style.opacity = 1;
				}
			}
		}
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
