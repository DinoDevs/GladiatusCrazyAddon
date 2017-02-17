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
			let timeString = cooldown.getElementsByTagName('span')[0].textContent;
			let hours = parseInt( timeString.match(/(\d+):\d+:\d+/)[1] );
			let minutes = parseInt( timeString.match(/\d+:(\d+):\d+/)[1] );
			let seconds = parseInt( timeString.match(/\d+:\d+:(\d+)/)[1] );
			availableIn += hours*60*60*1000 + minutes*60*1000 + seconds*1000;
			
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
		if(freeToss){
			craps_number = freeToss.textContent.match(/(\d+)/);
			if(craps_number)
				craps_number = craps_number[1];
			else
				craps_number = 0;
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
			gca_craps.patched.showPopup_pointer(prizes);

			// Stall a little
			window.setTimeout(function(){
				gca_craps.save_craps_info();
				gca_global.display.event.craps_timer.restart();
			}, 10);
		}
	},

	// Attack an event listener
	patch_craps_event : function(){
		// Check if crapsCooldown exist
		var craps_cooldown = document.getElementById("crapsCooldown");
		if(!craps_cooldown)
			return;

		// Save a pointer to the old function
		gca_craps.patched.showPopup_pointer = window.showPopup;
		// Patch function
		window.showPopup = gca_craps.patched.showPopup_wrapper;
	}
};

(function(){
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_craps.inject();
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
