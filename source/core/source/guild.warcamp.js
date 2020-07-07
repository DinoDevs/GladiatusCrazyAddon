/*
 * Addon Guild Warcamp Script
 * Author: DarkThanos, GreatApo
 */

// Guild Warcamp
var gca_guild_warcamp = {
	inject : function(){
		// If attack guild page
		if (gca_section.submod == null) {
			// Add direct attack button
			this.guildAttack.directAttack();
		}
		
		// Setting Link
		gca_tools.create.settingsLink("guild");
	},

	// Guild attack page
	guildAttack : {
		// Add direct attack button
		directAttack : function(){
			
			// Parse each guild
			jQuery('.section-like:eq(0) tr').each((index, element) => {
				
				if (element.getElementsByTagName("a").length < 2){
					element.appendChild(document.createElement("th"));
					return;
				}
				
				// Get name
				let guildID = element.getElementsByTagName("a")[0].href.trim().match(/i=(\d+)/i)[1];
				let link = element.getElementsByTagName("a")[1].href;
				
				// Add direct attack button
				let td = document.createElement("td");
				let form = document.createElement("form");
				form.action = link;
				form.method = "POST";
				let input = document.createElement("input");
				input.type = "submit";
				input.name = "combat";
				input.className = "gca_guild_warcamp_direct_attack";
				input.style.backgroundImage = "url(/game/img/fordern.gif)";
				form.appendChild(input);
				td.appendChild(form);
				element.appendChild(td);
				
				// Change life button
				let life_a = element.getElementsByTagName("a")[1];
				life_a.textContent = "";
				life_a.className = "gca_guild_warcamp_life";
			});
		}
	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_guild_warcamp.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();
