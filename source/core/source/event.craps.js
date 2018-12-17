/*
 * Addon Craps Script
 * Author: DarkThanos, GreatApo
 */

// Craps
var gca_craps = {
	inject : function(){
		// Check for errors
		if(!document.getElementById("content"))
			return;

		// Save craps time
		if(gca_options.bool("events", "craps_timer")){
			this.save_craps_info();
			this.patch_craps_event();
		}
	},

	// Save craps infomations
	save_craps_info : function(){
		// Check if crapsCooldown exist
		var craps_cooldown = document.getElementById("crapsCooldown")
		if(!craps_cooldown)
			return;

		// Server time
		var availableIn = gca_tools.time.server();
		// Get cooldown timer
		var cooldown = document.getElementById("crapsCooldownTimer");
		if(cooldown && cooldown.getElementsByTagName('span').length > 0){
			availableIn += parseInt(cooldown.getElementsByTagName('span')[0].dataset.tickerTimeLeft);
			
			// Update data
			gca_data.section.set("timers", 'craps_available', availableIn);
		}
		// Is already available
		else{
			// If data are not valid
			if(gca_data.section.get("timers", 'craps_available', 0) >= availableIn){
				// Fix data
				gca_data.section.set("timers", 'craps_available', 0);
			}
		}
		
		// Get number of craps
		var freeToss = document.getElementById("tossAinfo_freeplay");
		var craps_number = 0;
		if (freeToss) {
			craps_number = freeToss.textContent.match(/(\d+)/);
			craps_number = craps_number ? craps_number[1] : 0;
		}
		
		// Save craps free toss
		gca_data.section.set("timers", 'craps_free_toss', craps_number);
		// Save date
		gca_data.section.set("timers", 'craps_last_date', gca_tools.time.serverDateString());
		// Fire craps info updated
		gca_tools.event.fireOnce("craps-info-update");
	},

	// Patched data
	patched : {
		showPopup_pointer : null,
		showPopup_wrapper : function(prizes){
			// Call original
			gca_craps.patched.showPopup_pointer(prizes);
			// Reset timer
			document.getElementById("crapsCooldownTimer").getElementsByTagName('span')[0].dataset.tickerTimeLeft = 600000;
			// Sync menu timer
			window.setTimeout(() => {
				gca_craps.save_craps_info();
				//gca_global.display.event.craps_timer.restart();
			}, 0);
		}
	},

	// Attack an event listener
	patch_craps_event : function(){
		// Check if crapsCooldown exist
		var craps_cooldown = document.getElementById("crapsCooldown");
		if (!craps_cooldown) return;

		// Save a pointer to the old function
		this.patched.showPopup_pointer = window.showPopup;
		// Patch function
		window.showPopup = this.patched.showPopup_wrapper;
	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_craps.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_data, gca_global, gca_options, gca_tools */
