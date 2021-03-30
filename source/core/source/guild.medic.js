/*
 * Addon Guild Library Script
 * Author: DarkThanos, GreatApo
 */

// Guild Medic
var gca_guild_medic = {
	inject : function(){
		// If Medic page
		if (gca_section.submod == null) {
			// Medic Layout improve
			(gca_options.bool("guild","medic_layout") && 
				this.layout.improve());
		}

		// Setting Link
		gca_tools.create.settingsLink("guild");
	},

	// Layout Improvements
	layout : {
		improve : function(){
			// If no char stats
			if(!document.getElementById('guild_medicus_charstats'))
				return;

			// Gather and calculate values
			var healPercent = parseInt(document.getElementById('content').getElementsByTagName('p')[1].textContent.match(/(\d+)\s*%/i)[1], 10);
			var healpoints = document.getElementById('char_leben_tt').dataset.tooltip.match(/(\d+) \\\/ (\d+)/i);
			var currentPoints = parseInt(healpoints[1], 10);
			var maxPoints = parseInt(healpoints[2], 10);
			var lifePercent = Math.round(currentPoints / maxPoints * 100);
			var medicPoints = Math.round(maxPoints * (healPercent / 100));
			var afterHealPoints = currentPoints + medicPoints;
			if(afterHealPoints > maxPoints){
				afterHealPoints = maxPoints;
			}
			var afterPersent = Math.round(afterHealPoints / maxPoints * 100);

			// Get various elements
			var charstats = document.getElementById('charstats');
			var charstats_bg = charstats.getElementsByClassName('charstats_bg');
			var charstats_text = charstats.getElementsByClassName('charstats_text');
			var charstats_balken = charstats.getElementsByClassName('charstats_balken');
			var charstats_value = charstats.getElementsByClassName('charstats_value');
			
			// Remove un-used stats
			var tmp = charstats_bg[0];
			tmp.parentNode.removeChild(tmp);
			for(var i = 1; i < 7; i++){
				tmp = charstats_bg[4];
				tmp.parentNode.removeChild(tmp);
			}
			
			// Change to life values
			charstats_text[1].textContent = gca_locale.get("guild", "medic_lost_points");
			charstats_text[2].textContent = gca_locale.get("guild", "medic_points_to_heal");
			charstats_text[3].textContent = gca_locale.get("guild", "medic_life_after_heal");

			// Alter stats to show life stats
			tmp = charstats_balken[0].getElementsByTagName('div')[0];
			tmp.className = 'charstats_balken_xp';
			tmp = charstats_balken[1].getElementsByTagName('div')[0];
			tmp.className = 'charstats_balken_leben float_right';
			tmp.style.width = (100 - lifePercent) + '%';
			tmp = charstats_balken[2].getElementsByTagName('div')[0];
			tmp.style.width = healPercent + '%';
			tmp.style.marginLeft = lifePercent + '%';
			tmp = charstats_balken[3].getElementsByTagName('div')[0];
			tmp.style.width = afterPersent + '%';
			tmp = charstats_value[1];
			tmp.style.color = "#B71C1C";
			tmp.textContent = (100 - lifePercent) + '%';
			tmp = charstats_value[2];
			tmp.style.color = "#1B5E20";
			tmp.textContent = '+' + healPercent + '%';
			tmp = charstats_value[3];
			tmp.textContent = afterPersent + '%';

			// Add tooltips
			gca_tools.setTooltip(charstats_bg[0], JSON.stringify([[[
				[
					document.getElementById('char_leben_tt').getElementsByClassName('charstats_text')[0].textContent,
					gca_tools.strings.insertDots(currentPoints) + ' / ' + gca_tools.strings.insertDots(maxPoints)
				],
				["#BA9700", "#BA9700"]
			]]]));
			gca_tools.setTooltip(charstats_bg[1], JSON.stringify([[[
				[
					gca_locale.get("guild", "medic_lost_points"),
					gca_tools.strings.insertDots(maxPoints - currentPoints) + ' / ' + gca_tools.strings.insertDots(maxPoints)
				],
				["#BA9700", "red"]
			]]]));
			gca_tools.setTooltip(charstats_bg[2], JSON.stringify([[[
				[
					gca_locale.get("guild", "medic_points_to_heal"),
					'+' + gca_tools.strings.insertDots(medicPoints)
				],
				["#BA9700", "lime"]
			]]]));
			gca_tools.setTooltip(charstats_bg[3], JSON.stringify([[[
				[
					gca_locale.get("guild", "medic_life_after_heal"),
					gca_tools.strings.insertDots(afterHealPoints) + ' / ' + gca_tools.strings.insertDots(maxPoints)
				],
				["#BA9700", "white"]
			]]]));
		}
	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_guild_medic.inject();
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
