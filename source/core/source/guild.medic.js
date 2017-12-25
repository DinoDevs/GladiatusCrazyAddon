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
			var healPercent = parseInt(document.getElementById('content').getElementsByTagName('p')[1].textContent.match(/(\d+)%/i)[1], 10);
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
			
			// Remove un-used stats
			var tmp = document.getElementById('charstats').getElementsByClassName('charstats_bg')[0];
			tmp.parentNode.removeChild(tmp);
			for(var i = 1; i < 7; i++){
				tmp = document.getElementById('charstats').getElementsByClassName('charstats_bg')[4];
				tmp.parentNode.removeChild(tmp);
			}
			
			// Change to life values
			document.getElementById('charstats').getElementsByClassName('charstats_text')[1].textContent = gca_locale.get("guild", "medic_lost_points");
			document.getElementById('charstats').getElementsByClassName('charstats_text')[2].textContent = gca_locale.get("guild", "medic_points_to_heal");
			document.getElementById('charstats').getElementsByClassName('charstats_text')[3].textContent = gca_locale.get("guild", "medic_life_after_heal");

			// Alter stats to show life stats
			tmp = document.getElementById('charstats').getElementsByClassName('charstats_balken')[0].getElementsByTagName('div')[0];
			tmp.className = 'charstats_balken_xp';
			tmp = document.getElementById('charstats').getElementsByClassName('charstats_balken')[1].getElementsByTagName('div')[0];
			tmp.className = 'charstats_balken_leben float_right';
			tmp.style.width = (100 - lifePercent) + '%';
			tmp = document.getElementById('charstats').getElementsByClassName('charstats_balken')[2].getElementsByTagName('div')[0];
			tmp.style.width = healPercent + '%';
			tmp.style.marginLeft = lifePercent + '%';
			tmp = document.getElementById('charstats').getElementsByClassName('charstats_balken')[3].getElementsByTagName('div')[0];
			tmp.style.width = afterPersent + '%';
			tmp = document.getElementById('charstats').getElementsByClassName('charstats_value')[1];
			tmp.style.color = "#B71C1C";
			tmp.textContent = (100 - lifePercent) + '%';
			tmp = document.getElementById('charstats').getElementsByClassName('charstats_value')[2];
			tmp.style.color = "#1B5E20";
			tmp.textContent = '+' + healPercent + '%';
			tmp = document.getElementById('charstats').getElementsByClassName('charstats_value')[3];
			tmp.textContent = afterPersent + '%';

			// Add tolltips
			gca_tools.setTooltip(
				document.getElementById('charstats').getElementsByClassName('charstats_bg')[0],
				JSON.stringify([[[
					[
						document.getElementById('char_leben_tt').getElementsByClassName('charstats_text')[0].textContent,
						currentPoints + ' / ' + maxPoints
					],
					["#BA9700", "#BA9700"]
				]]])
			);
			gca_tools.setTooltip(
				document.getElementById('charstats').getElementsByClassName('charstats_bg')[1],
				JSON.stringify([[[
					[
						gca_locale.get("guild", "medic_lost_points"),
						(maxPoints - currentPoints) + ' / ' + maxPoints
					],
					["#BA9700", "red"]
				]]])
			);
			gca_tools.setTooltip(
				document.getElementById('charstats').getElementsByClassName('charstats_bg')[2],
				JSON.stringify([[[
					[
						gca_locale.get("guild", "medic_points_to_heal"),
						'+' + medicPoints
					],
					["#BA9700", "lime"]
				]]])
			);
			gca_tools.setTooltip(
				document.getElementById('charstats').getElementsByClassName('charstats_bg')[3],
				JSON.stringify([[[
					[
						gca_locale.get("guild", "medic_life_after_heal"),
						afterHealPoints + ' / ' + maxPoints
					],
					["#BA9700", "white"]
				]]])
			);
		}
	}
};

(function(){
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_guild_medic.inject();
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