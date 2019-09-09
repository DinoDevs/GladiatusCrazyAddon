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

		// Add color to free toss
		this.color_free_toss();
	},

	// Save craps infomation
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
		
		// Get number of free dice rolls
		var free_plays = ['A', 'B', 'C', 'D'];
		var free_tosses = 0;
		for (let i = 0; i < free_plays.length; i++) {
			free_plays[i] = document.getElementById('toss' + free_plays[i] + 'info_freeplay');
			if (free_plays[i]) {
				let free_toss = free_plays[i].textContent.match(/(\d+)/);
				if (free_toss) free_tosses += parseInt(free_toss[1], 10);
			}
		}
		
		// Save craps free toss
		gca_data.section.set("timers", 'craps_free_toss', free_tosses);
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
	},

	// Add color to the free toss text
	color_free_toss : function() {
		var free_plays = ['A', 'B', 'C', 'D'];
		for (let i = 0; i < free_plays.length; i++) {
			free_plays[i] = document.getElementById('toss' + free_plays[i] + 'info_freeplay');
			if (free_plays[i]) free_plays[i].style.color = 'green';
		}
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
/* global gca_data, gca_options, gca_tools */
