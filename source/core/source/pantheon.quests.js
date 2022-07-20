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

		// Setting Link
		gca_tools.create.settingsLink("pantheon");
	},

	// Quests Categories
	quests_categories : ['unknown','items','work','dungeon','expedition','combat','grouparena','arena','restart','finished'],
	quests_images_cdn_lookup : {
		'ff92c80be0d47423719891d1c70c7200' : '/img/ui/quest/icon_items_active.jpg',
		'2b5a358e0a030d8551a5a65d284c8730' : '/img/ui/quest/icon_items_inactive.jpg',
		'3acc151571bd182e5b55fa75238f18f3' : '/img/ui/quest/icon_work_active.jpg',
		'b4a8b91ecab5813f97708e0e86f35e06' : '/img/ui/quest/icon_work_inactive.jpg',
		'aac903cea2513b6a20e1e92500c2a279' : '/img/ui/quest/icon_dungeon_active.jpg',
		'b5dc366909fdfe69897d583583f6e446' : '/img/ui/quest/icon_dungeon_inactive.jpg',
		'b0a3d2065a1dac3029b15d5e64ce7a90' : '/img/ui/quest/icon_expedition_active.jpg',
		'fb4e41ab43222200aa024ee177efef8f' : '/img/ui/quest/icon_expedition_inactive.jpg',
		'e3cd7b70728e81ac4995e6a3e668a46e' : '/img/ui/quest/icon_combat_active.jpg',
		'5b8aada67d4c5601e009b9d2a88f478c' : '/img/ui/quest/icon_combat_inactive.jpg',
		'45c901c26d04e70cc3ecfb37b9632590' : '/img/ui/quest/icon_grouparena_active.jpg',
		'24586768e942030301c484347698bc5e' : '/img/ui/quest/icon_grouparena_inactive.jpg',
		'97234cdb450a257bf9c13e55ce0e7c74' : '/img/ui/quest/icon_arena_active.jpg',
		'1b00f1a594723515a77dcd6d66c918fb' : '/img/ui/quest/icon_arena_inactive.jpg',
	},

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
				url = gca_tools.cdn.revLookUp(url, this.quests_images_cdn_lookup);
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
				// Display
				if (type == 'item'){
					reward_span[0].parentNode.append(
						document.createTextNode(gca_tools.strings.insertDots(reward))
					);
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
