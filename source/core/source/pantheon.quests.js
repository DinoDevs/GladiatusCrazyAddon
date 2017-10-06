/*
 * Addon Pantheon Quests Script
 * Author: DarkThanos, GreatApo
 */

// Quests
var gca_pantheon_quests = {
	inject : function(){
		// Check for errors
		if(!document.getElementById("content"))
			return;

		// Reorder quests
		(gca_options.bool("pantheon","quests_reorder") &&
			this.quests_reorder());

		// Detailed rewards on quests
		(gca_options.bool("pantheon","quests_detailed_rewards") &&
			this.detailed_rewards());
		
		// Save quest time
		(gca_options.bool("global","quest_timer") &&
			this.save_quest_info());
	},

	// Quests Categories
	quests_categories : ['items','work','dungeon','expedition','combat','grouparena','arena','restart','finished'],

	// Quests Reorder
	quests_reorder : function(){
		// Check if contentboard exist
		if(document.getElementsByClassName('contentboard_start').length != 1)
			return;

		// Quests divs
		var quests = document.getElementsByClassName('contentboard_slot');

		// Create div for each category
		var quest_categories = {};
		var qcontent = document.getElementsByClassName('contentboard_header_long')[0];

		// Fix height
		qcontent.style.minHeight = "55px";

		if(document.getElementById("quest_header_cooldown_cancel") == null)
			qcontent.style.height = "46px";

		for(var i=0; i<this.quests_categories.length; i++){
			// Create div
			let div = document.createElement('div');
			div.id = "qcategory_" + this.quests_categories[i];
			div.style.display = "none";
			let content = document.createElement('div');
			content.className = "contentboard_header_long quest_category_title";
			div.appendChild(content);
			// Icon
			let icon = document.createElement('div');
			icon.className = "quest_category_icon quest_category_icon_" + this.quests_categories[i];
			div.appendChild(icon);
			// Insert on page
			qcontent.parentNode.insertBefore(div, qcontent.nextSibling);
			// Save div
			quest_categories[this.quests_categories[i]] = div;
		}

		// For every quest
		for(var i=0;i<quests.length;i++){
			// Get quest button
			let a = quests[i].getElementsByTagName('a')[0];

			// Get quest category
			let category;
			if(a && a.className.match('quest_slot_button_finish')){
				category = 'finished';
			}
			else if(a && a.className.match('quest_slot_button_restart')){
				category = 'restart';
			}else{
				category = quests[i].getElementsByClassName("quest_slot_icon")[0].style.backgroundImage.match(/quest\/([^\.]+)\.jpg/)[1].replace(/(_inactive|_active|icon_)/g,'');
			}

			// Set category visible
			if(quest_categories[category].style.display == "none")
				quest_categories[category].style.display = "block";

			// Add quest on category
			quest_categories[category].appendChild(quests[i]);
		}
	},

	//Quest God Rewards
	detailed_rewards : function(){
		this.detailed_rewards_parse('god');
		this.detailed_rewards_parse('honor');
		this.detailed_rewards_parse('xp');
	},
	detailed_rewards_parse : function(type){
		// Get reward elements
		var reward_element = document.getElementsByClassName('quest_slot_reward_' + type);
		// For each reward
		for(var i = reward_element.length-1; i >= 0; i--){
			// Get element
			let reward_span = reward_element[i].getElementsByTagName('span');
			// If exist
			if(reward_span.length > 0){
				// Set style
				reward_element[i].className += ' quest_slot_reward_' + type + '_detailed';
				// Get reward
				let reward = reward_span[0].dataset.tooltip.replace(/\./g,'').match(/\d+/);
				// Display
				reward_span[0].insertBefore(
					document.createTextNode(gca_tools.strings.insertDots(reward)),
					reward_span[0].firstChild
				);
			}
		}
		
	},

	// Save quest infomations
	save_quest_info : function(){
		// Check if quest_header_accepted exist
		var quest_header = document.getElementById("quest_header_accepted")
		if(!quest_header)
			return;

		// Save time
		var availableIn = gca_tools.time.server();
		// Get cooldown timer
		var cooldown = document.getElementById("quest_header_cooldown");
		if(cooldown && cooldown.getElementsByTagName('span').length > 0){
			let ms = parseInt( cooldown.getElementsByTagName('span')[0].dataset.tickerTimeLeft );
			availableIn += ms;
			
			// Update data
			gca_data.section.set("timers", 'quest_available', availableIn);
		}
		// Is already available
		else{
			// If data are not valid
			if(gca_data.section.get("timers", 'quest_available', 0) >= availableIn){
				// Fix data
				gca_data.section.set("timers", 'quest_available', 0);
			}
		}

		
		// Get number of max quests
		var max_quests = parseInt(quest_header.textContent.match(/\d+\s*\/\s*(\d+)/)[1]);
		// Get number of taken quests
		var taken_quests = parseInt(quest_header.textContent.match(/(\d+)\s*\/\s*\d+/)[1]);
		
		// Save quest free slots
		gca_data.section.set("timers", 'quests_free_slots', max_quests - taken_quests);
		// Fire quest info updated
		gca_tools.event.fireOnce("quest-info-update");
	}
};

(function(){
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_pantheon_quests.inject();
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
