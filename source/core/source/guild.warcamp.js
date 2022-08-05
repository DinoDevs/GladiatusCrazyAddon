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
					let th = document.createElement("th");
					th.textContent = "Gladiatorius";
					element.insertBefore(th, element.getElementsByTagName("th")[1]);
					return;
				}
				
				// Get info
				let guildName = element.getElementsByTagName("a")[0].textContent.trim();
				let guild_link = element.getElementsByTagName("a")[0].href;
				//let guildID = guild_link.trim().match(/i=(\d+)/i)[1];
				let attack_link = element.getElementsByTagName("a")[1].href;
				let life_points_translation = jQuery('#header_values_hp_bar').data("tooltip")[0][0][0][0].trim().replace(":","");
				
				// Add direct attack button
				let td = document.createElement("td");
				let form = document.createElement("form");
				form.action = attack_link;
				form.method = "POST";
				let input = document.createElement("input");
				input.type = "submit";
				input.name = "combat";
				input.className = "gca_guild_warcamp_direct_attack";
				input.style.backgroundImage = "url(" + gca_tools.img.cdn('img/fordern.gif') + ")";
				input.dataset.tooltip = '[[["'+ gca_locale.get("arena", "attack_player", {name:guildName}) +'","#fff;font-size:12px;"]]]';
				form.appendChild(input);
				td.appendChild(form);
				element.appendChild(td);
				
				// See life button
				let life_a = element.getElementsByTagName("a")[1];
				life_a.textContent = "";
				life_a.className = "gca_guild_warcamp_life";
				life_a.dataset.tooltip = '[[["'+ life_points_translation +'","#fff;font-size:12px;"]]]';
				
				// Add Gladiatorius link
				let td2 = document.createElement("td");
				td2.style.textAlign = "center";
				let gladiatorious_a = document.createElement("a");
				gladiatorious_a.href = guild_link+"&submod=forumGladiatorius";
				gladiatorious_a.textContent = "";
				gladiatorious_a.className = "gca_guild_warcamp_gladiatorius";
				td2.appendChild(gladiatorious_a);
				element.insertBefore(td2, element.getElementsByTagName("td")[1]);
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
