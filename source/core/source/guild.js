/*
 * Addon Guild Script
 * Author: DarkThanos, GreatApo
 */

// Guild
var gca_guild = {
	inject : function(){
		// If message page
		if (gca_section.submod == 'adminMail') {
			// Default auto focus all
			this.adminMail.auto_focus_all();
		}
		// If guild buildings
		else if (gca_section.submod == 'buildings' || gca_section.submod == 'updateBuilding') {
			this.buildings.builingsCostDifference.show();
		}

		// Setting Link
		gca_tools.create.settingsLink("guild");
	},

	adminMail : {
		// Default auto focus all
		auto_focus_all : function(){
			jQuery('#mainbox').find('input[type="checkbox"]').each(function(){
				jQuery(this).prop('checked', 1);
			});
		}
	},

	buildings : {
		builingsCostDifference : {
			show : function() {
				// Get guild gold
				var guildGold = document.getElementById('mainbox').getElementsByTagName('section')[0].textContent.match(/[0-9.]+/)[0];
				guildGold = gca_tools.strings.parseGold(guildGold);

				// Show deference for each building
				var builingsGold = document.getElementsByClassName('guild_gold');
				for (var i = builingsGold.length - 1; i >= 0; i--) {
					this.perBuilding(builingsGold[i], guildGold);
				}
			},
			perBuilding : function(element, guildGold) {
				var cost = gca_tools.strings.parseGold(element.textContent);
				var differece = guildGold - cost;
				var div = document.createElement('div');
				div.textContent = '(' + (differece >= 0 ? '+' : '') + gca_tools.strings.insertDots(differece) + ')';
				div.className = 'gca_guild_buildings_cost_difference';
				div.style.color = differece >= 0 ? '#006300' : '#840900';
				element.parentNode.appendChild(div);
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
		gca_guild.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_section, gca_tools */
/* global jQuery */
