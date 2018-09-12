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
		else if (gca_section.submod == 'buildings') {
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

				// Show defference for each building
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

// Script Loader
(function(){
	var loaded = false;
	var load = function(){
		if(loaded) return;
		loaded = true;
		gca_guild.inject();
	}
	if (document.readyState == 'complete' || document.readyState == 'loaded') load();
	else {
		window.addEventListener('DOMContentLoaded', load, true);
		window.addEventListener('load', load, true);
	}
})();

// ESlint defs
/* global gca, gca_audio, gca_build, gca_data, gca_getPage, gca_locale, gca_notifications, gca_options, gca_resources, gca_section, gca_tools */
/* global jQuery, Chart, expeditionProgressBar, dungeonProgressBar, arenaProgressBar, ctProgressBar */
