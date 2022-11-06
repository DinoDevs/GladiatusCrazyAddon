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
		(gca_options.bool("main_menu","quest_timer") &&
			this.save_quest_info());

		// Setting Link
		gca_tools.create.settingsLink("pantheon");
	},

	// Quests Categories
	quests_categories : ['unknown','items','work','dungeon','expedition','combat','grouparena','arena','restart','finished'],

	// Quests Reorder
	quests_reorder : function(){
		// Check if content board exist
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

		for(let i = 0; i < this.quests_categories.length; i++){
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
		for(let i = 0; i < quests.length; i++){
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
				let url = quests[i].getElementsByClassName("quest_slot_icon")[0].style.backgroundImage.slice(4, -1).replace(/"/g, "");
				url = gca_tools.img.resolve(url);
				category = !url ? 'unknown' : url.match(/quest\/([^\.]+)\.jpg/)[1].replace(/(_inactive|_active|icon_)/g,'');
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
		this.detailed_rewards_parse('item');
	},
	detailed_rewards_parse : function(type){
		// Get reward elements
		var reward_element = document.getElementsByClassName('quest_slot_reward_' + type);
		// For each reward
		for(var i = reward_element.length-1; i >= 0; i--){
			// Get element
			let elementType = (type == 'item')? 'img' : 'span';
			let reward_span = reward_element[i].getElementsByTagName(elementType);
			// If exist
			if(reward_span.length > 0){
				// Set style
				reward_element[i].className += ' quest_slot_reward_' + type + '_detailed';
				// Get reward
				let regexp = (type == 'item')? /(\d+)\s</ : /(\d+)/;
				let reward = reward_span[0].dataset.tooltip.replace(/\./g,'').match(regexp)[1];
				let name = JSON.parse(reward_span[0].dataset.tooltip)[0][0][0];//.split(" ")[0];
				// Display
				if (type == 'item'){
					// Stretch quest box
					reward_span[0].parentNode.parentNode.parentNode.style = "background-size: 100% 100%;height:80px;"
					// Move item reward and add name and cost
					reward_span[0].parentNode.append(
						document.createTextNode(name + " - "),
						document.createTextNode(gca_tools.strings.insertDots(reward)+" "),
						gca_tools.create.goldIcon(),
					);
					reward_span[0].parentNode.classname = "quest_item_cost_name_reward"
					// Make text in aline
					reward_span[0].parentNode.style.width = "auto";
					reward_span[0].align = "absmiddle";
				}else{
					reward_span[0].insertBefore(
						document.createTextNode(gca_tools.strings.insertDots(reward)),
						reward_span[0].firstChild
					);
				}
			}
		}
		
	},

	// Save quest information
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

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_pantheon_quests.inject();
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
