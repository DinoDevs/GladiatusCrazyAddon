/*
 * Addon Server Quest Script
 * Copyright (C) Gladiatus Crazy Addon
 * Licensed under GNU GPLv3
 * https://github.com/DinoDevs/GladiatusCrazyAddon
 */

// Server Quest Script
var gca_server_quest = {
	inject : function(){
		// Check for errors
		if(!document.getElementById("content"))
			return;
		
		// Server Event highscore
		if (gca_section.submod == 'serverQuestHighscore') {
			this.highlightGuildMates();
		}
		// Server Event Enemies
		else if (gca_section.submod == 'serverQuest' || isNaN(gca_getPage.parameter('loc'))) {
			// Save server quest time
			if (gca_options.bool("events", "server_quest_timer")) {
				this.save_info();
				this.listen_attacks();
			}
		}
	},

	get_points : function(){
		const points_number = document.getElementById("content")?.getElementsByClassName("section-header")[0]?.parentNode.innerHTML.match(/(\d+)\s*<img/im) || null;
		if (!points_number) return -1;
		return parseInt(points_number[1], 10);
	},

	// Save server quest infomation
	save_info : function(){
		// Server time
		var availableIn = gca_tools.time.server();

		// Get cooldown timer
		const cooldown = document.getElementById("content").getElementsByTagName("span")[1];
		if (cooldown) {
			let timer = parseInt(cooldown.dataset.tickerTimeLeft, 10);
			availableIn += timer;
			
			// Update data
			gca_data.section.set("timers", 'server_quest_available', availableIn);
		}
		// Is already available
		else {
			// If data are not valid
			if (gca_data.section.get("timers", 'server_quest_available', 0) >= availableIn) {
				// Fix data
				gca_data.section.set("timers", 'server_quest_available', 0);
			}
		}
		
		// Get number of points
		var points_number = this.get_points();
		if (points_number < 0) points_number = 'N/A';
		
		// Save server quest points
		gca_data.section.set("timers", 'server_quest_points', points_number);
		// Save date
		gca_data.section.set("timers", 'server_quest_last_date', gca_tools.time.serverDateString());
		// Fire server quest info updated
		gca_tools.event.fireOnce("server_quest-info-update");
	},

	// Listen for any attacks
	listen_attacks : function(){
		// Attack buttons
		var buttons = document.getElementById("content").getElementsByClassName("expedition_button");
		for (let i = buttons.length - 1; i >= 0; i--) {
			if (!buttons[i].className.match("disabled")) {
				let btn = buttons[i];
				let cost = parseInt((btn?.parentNode?.innerHTML?.match(/\s*(\d+)\s*<img\s+/i) || [0, "-1"])[1], 10)
				btn.addEventListener('click', () => {
					this.handle_attack(cost);
				}, false);
			}
		}
	},

	// Handle an attack
	handle_attack_atomicity : false,
	handle_attack : function(cost){
		if (this.handle_attack_atomicity) return;
		this.handle_attack_atomicity = true;

		var points = this.get_points() - ((!isNaN(cost) && cost > 0) ? cost : 1);
		if (points < 0) return;

		// Server quests available in 5 mins (adapted to server speed)
		const availableIn = gca_tools.time.server() + gca_tools.time.speedvert(5*60*1000) + 1000;

		// Save data to be updated (report page will update them)
		gca_data.section.set("timers", 'server_quest_attack', {
			available : availableIn,
			points : points,
			last_date : gca_tools.time.serverDateString(),
			timestamp: gca_tools.time.getTime()
		});
	},

	// Highlight guild mates
	highlightGuildMates : function() {
		// Check if correct page
		if (!document.getElementById('highscore_range')) return;

		// Check if you are in a guild
		if(!gca_data.section.get("guild", "inGuild", false)) return;

		var mates = [];
		var matesInfo = gca_data.section.get("guild", "mates", {});
		for (let i in matesInfo){
			mates.push(matesInfo[i].id);
		}

		var players = document.querySelectorAll('#content table td a');
		for (let i = players.length - 1; i >= 0; i--) {
			let id = players[i].href.match(/&p=(\d+)&/i) || [0,'invalid'];
			if (mates.indexOf(id[1]) >= 0) {
				players[i].className += ' highlight_guildmember';
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
		gca_server_quest.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_data, gca_getPage, gca_options, gca_section, gca_tools */
