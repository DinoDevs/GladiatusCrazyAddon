/*
 * Addon Server Quest Script
 * Author: DarkThanos, GreatApo
 */

// Server Quest Script
var gca_server_quest = {
	inject : function(){
		// Check for errors
		if(!document.getElementById("content"))
			return;
		
		// Enemies
		if(gca_section.submod == 'serverQuest' || isNaN(gca_getPage.parameter('loc'))){
			// Save server quest time
			if(gca_options.bool("events", "server_quest_timer")){
				this.save_info();
				this.listen_attacks();
			}
		}
	},

	// Save server quest infomations
	save_info : function(){
		// Server time
		var availableIn = gca_tools.time.server();

		// Get cooldown timer
		var cooldown = document.getElementById("content").getElementsByTagName("span")[1];
		if(cooldown){
			let timer = parseInt( cooldown.dataset.tickerTimeLeft );
			availableIn += timer;
			
			// Update data
			gca_data.section.set("timers", 'server_quest_available', availableIn);
		}
		// Is already available
		else{
			// If data are not valid
			if(gca_data.section.get("timers", 'server_quest_available', 0) >= availableIn){
				// Fix data
				gca_data.section.set("timers", 'server_quest_available', 0);
			}
		}

		
		// Get number of points
		var points_number = document.getElementById("content").getElementsByTagName("img")[1].parentNode.innerHTML.match(/(\d+)\s*<img/im);
		if(points_number){
			points_number = parseInt(points_number[1]);
		}
		else{
			points_number = 'N/A';
		}
		
		
		// Save server quest points
		gca_data.section.set("timers", 'server_quest_points', points_number);
		// Save date
		gca_data.section.set("timers", 'server_quest_last_date', gca_tools.time.serverDateString());
		// Fire server quest info updated
		gca_tools.event.fireOnce("server_quest-info-update");
	},

	// Listen for any attacks
	listen_attacks : function(){
		var that = this;
		// Attack buttons
		var buttons = document.getElementById("content").getElementsByClassName("expedition_button");
		for(var i = buttons.length - 1; i >= 0; i--){
			if(!buttons[i].className.match("disabled")){
				buttons[i].addEventListener('click', (function(num){
					return function(){
						that.handle_attack(num);
					};
				})(i), false);
			}
		}
	},

	// Handle an attack
	handle_attack_atomicity : false,
	handle_attack : function(type){
		if(this.handle_attack_atomicity) return;
		this.handle_attack_atomicity = true;

		var points = parseInt(gca_data.section.get("timers", 'server_quest_points'));
		if(isNaN(points)) return;

		points --;
		//if(type == 3) points --;
		if(points < 0) points = 0;

		// Server quests availiable in 5 mins
		var availableIn = gca_tools.time.server() + 5*60*1000 + 1000;

		// Update data
		gca_data.section.set("timers", 'server_quest_available', availableIn);
		gca_data.section.set("timers", 'server_quest_points', points)
		gca_data.section.set("timers", 'server_quest_last_date', gca_tools.time.serverDateString());
	}
};

(function(){
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_server_quest.inject();
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