/*
 * Addon Pantheon Missions Script
 * Author: DarkThanos, GreatApo
 */

// Missions
var gca_pantheon_missions = {
	inject : function(){
		// Check for errors
		if(!document.getElementById("content"))
			return;

		// Show Completed Missions
		(gca_options.bool("pantheon","missions_show_completed") &&
			this.show_completed());

		// Setting Link
		gca_tools.create.settingsLink("pantheon");
	},

	// Show Completed
	show_completed : function(){
		// Get Completed
		var completed = document.getElementsByClassName('quest_slot_button_finish');

		// If no completed, return
		if(completed.length == 0)
			return;

		// Get info of completed missions
		var info = [];
		// For each mission
		for (let i = 0; i < completed.length; i++) {
			// Get title
			var title = completed[i].parentNode.getElementsByClassName('missions_slot_title')[0].textContent;
			// Get Url parameters
			var parameters = gca_getPage.parameters(completed[i].href);
			// Add info on list
			info.push({
				title : gca_tools.strings.trim(title),
				id : parameters.missionId
			});
		}

		// Get Content
		var content = document.getElementById("content");

		// Create Wrapper
		var wrapper = document.createElement("div");
		wrapper.id = "gca_completed_mission";
		var board = document.createElement("div");
		board.className = "contentboard_start";
		var board_content = document.createElement("div");

		// Create Header
		var board_header = document.createElement("div");
		board_header.className = "contentboard_header_medium";
		board.appendChild(board_header);

		// Create List of completed missions
		var slot = document.createElement("div");
		slot.className = "contentboard_slot_active";
		slot.style.height = (Math.ceil(info.length/3)*63) + "px";

		// For each completed mission
		for(let i = 0; i < info.length; i++){
			var mission = document.createElement("div");
			mission.className = "slot_mission_completed";
			mission.style = "font-size: 13px; font-weight: bold;";
			mission.textContent = "✔ " + info[i].title;
			slot.appendChild(mission);
			info[i].element = mission;
		}

		board_content.appendChild(slot);
		board.appendChild(board_content);

		// Create footer
		var board_footer = document.createElement("div");
		board_footer.className = "contentboard_footer_short";
		board.appendChild(board_footer);

		wrapper.appendChild(board);
		content.insertBefore(wrapper, content.firstChild);

		// End all button
		var button = document.createElement("input");
		button.type = "button";
		button.className = "button2";
		button.style = "float: right;margin-top: 5px;margin-right: -2px;transform: scale(0.8);"
		button.value = completed[0].title;
		board_header.appendChild(button);

		// Attach event
		this.end_completed_quests(info, button);
	},

	end_completed_quests : function(info, button){
		var ended = 0;
		// Event
		button.addEventListener('click',function(){
			// Hide button
			this.style.display = "none";
			// For each quest
			for (var i = 0; i < info.length; i++) {
				// Ajax - end mission
				jQuery.get(gca_getPage.link({"mod":"missions","submod":"finishTask","missionId":info[i].id}).replace("index.php","ajax.php"), (function(data){
					return function(){
						// Show that mission ended
						data.element.style.color = "#007700";
						// Check to reload page
						ended++;
						if (ended >= info.length) {
							document.location.reload();
						}
					};
				})(info[i]));
			}
		}, false);
	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_pantheon_missions.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_getPage, gca_options, gca_tools */
/* global jQuery */
