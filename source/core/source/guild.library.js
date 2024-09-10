/*
 * Addon Guild Library Script
 * Author: DarkThanos, GreatApo
 */

// Guild Library
var gca_guild_library = {
	inject : function(){
		// If Library page
		if (gca_section.submod == null) {
			// Library Layout improve
			(gca_options.bool("guild","library_layout") && 
				this.layout.improve());

			// Fade non scrolls items
			(gca_options.bool("guild","library_fade_non_scrolls") && 
				this.fadeNonScrolls.init());

			// More Tooltip data
			(gca_options.bool("guild","library_tooltip_data") && 
				this.tooltipData.init());
		}

		// Setting Link
		gca_tools.create.settingsLink("guild");
	},

	// Layout Improvements
	layout : {
		improve : function(){
			// If library container
			if(!document.getElementById('content').getElementsByTagName('section').length)
				return;
			
			// Save container
			var container = document.getElementById('content').getElementsByTagName('section')[0];
			// Add an id to it
			container.id = 'gca-library-container';

			// Get guild gold
			let guildGoldElement = container?.parentNode?.getElementsByClassName('span_right')[1];
			// Ensure the element exists and has text content, otherwise set a default value
			let guildGold = guildGoldElement ? guildGoldElement.textContent : '0';
			// Parse guild gold (using the default value if necessary)
			guildGold = gca_tools.strings.parseGold(guildGold);
			
			// Get recipes
			var recipes = container?.getElementsByTagName('tr') || [];

			// Check
			if (recipes.length > 0 && recipes[0].getElementsByTagName('td').length > 4) {
				recipes[0].getElementsByTagName('td')[4].style = 'width: 15%;';
			}
			
			// For each recipe
			for (var i = recipes.length - 1; i >= 1; i--) {
				// Fix buttons
				recipes[i].getElementsByTagName('td')[4].getElementsByTagName('input')[0].value = '';
				recipes[i].getElementsByTagName('td')[4].getElementsByTagName('input')[1].value = '';
				recipes[i].getElementsByTagName('td')[4].getElementsByTagName('input')[1].className = 'library_button_delete';

				// Get recipe gold
				let recepGold = gca_tools.strings.parseGold(recipes[i].getElementsByTagName('td')[1].textContent);

				// If not enough gold or is active
				if(parseInt(recipes[i].getElementsByTagName('td')[3].getElementsByTagName('span')[0].dataset.tickerTimeLeft, 10) >= 0 || recepGold > guildGold){
					// Disable recipe
					recipes[i].style = 'opacity:0.7;';
					recipes[i].getElementsByTagName('td')[4].getElementsByTagName('input')[0].className = 'library_button_disabled';

					// No gold
					if(recepGold > guildGold)
						recipes[i].getElementsByTagName('td')[1].style = 'color:red;';
				}

				// You can activate this recipe
				else{
					recipes[i].getElementsByTagName('td')[4].getElementsByTagName('input')[0].className = 'library_button_enable';
				}

				// Get recipe tooltip
				let tooltip = JSON.parse(recipes[i].getElementsByTagName('div')[1].dataset.tooltip)[0];

				// Get bonus
				let bonus = tooltip[1][0].match(/\+\d+.*/)[0];
				recipes[i].getElementsByTagName('td')[2].textContent = bonus +' ('+(recipes[i].getElementsByTagName('td')[2].textContent)+')';
				
				// Show level
				let div = document.createElement('div');
				div.className = 'library_level_number';
				div.style = 'background-image: url(' + gca_tools.img.cdn('img/premium/box/amount.png') + ');background-size: contain;';
				div.textContent = tooltip[3][0].match(/(\d+)\s*\//)[1];
				recipes[i].getElementsByTagName('div')[0].appendChild(div);
			}

		}
	},

	// Fade all the non scrolls items
	fadeNonScrolls : {

		init : function() {
			// Exit if no inventory
			if(!document.getElementById("inv")) return;

			// Add event
			gca_tools.event.bag.onBagOpen((tab) => {
				this.applyToBag(tab);
			});

			// Wait first bag
			gca_tools.event.bag.waitBag(() => {
				this.applyToBag(document.getElementById("inventory_nav").getElementsByClassName("current")[0]);
			});
		},

		applyToBag : function(tab) {
			if(tab.dataset.itemShadowed) return;

			// Get items
			var items = document.getElementById('inv').getElementsByClassName("ui-draggable");
			
			// For each
			for (var i = items.length - 1; i >= 0; i--) {
				if(!items[i].className.match(/item-i-13-\d+/i))
					items[i].style.opacity = "0.5";
			}

			// Success
			if(items.length)
				tab.dataset.itemShadowed = true;
		}
	},

	// Tooltip data
	tooltipData : {
		init : function(){
			// If library container
			if(!document.getElementById('content').getElementsByTagName('section').length)
				return;
			
			// Save container
			var container = document.getElementById('content').getElementsByTagName('section')[0];
			// Add an id to it
			container.id = 'gca-library-container';

			// Get guild gold
			let guildGoldElement = container?.parentNode?.getElementsByClassName('span_right')[1];
			// Ensure the element exists and has text content, otherwise set a default value
			let guildGold = guildGoldElement ? guildGoldElement.textContent : '0';
			// Parse guild gold
			guildGold = gca_tools.strings.parseGold(guildGold);
			// If guildGold is still null after parsing, return
			if (guildGold === null) return;
			
			// Get recipes
			var recipes = container.getElementsByTagName('tr');

			// For each recipe
			for (var i = recipes.length - 1; i >= 1; i--) {
				let recipe = recipes[i].getElementsByTagName('div')[1];
				let tooltip = JSON.parse(recipe.dataset.tooltip);
				let gold = gca_tools.strings.parseGold(recipes[i].getElementsByTagName('td')[1].textContent);
				let points = parseInt(tooltip[0][1][0].match(/\+\d+.*/)[0], 10); // Get bonus

				tooltip[0].push([gca_locale.get("guild", "library_per_point_cost") + ' ' + gca_tools.strings.insertDots(Math.round(gold/points)) + ' <div class="icon_gold"></div>', '#DDDDDD']);
				tooltip[0].push([gca_locale.get("guild", "library_gold_left") + ' ' + gca_tools.strings.insertDots(guildGold - gold) + ' <div class="icon_gold"></div>', '#DDDDDD']);

				gca_tools.setTooltip(recipe, JSON.stringify(tooltip));
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
		gca_guild_library.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_locale, gca_options, gca_section, gca_tools */
