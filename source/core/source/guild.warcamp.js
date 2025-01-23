/*
 * Addon Guild Warcamp Script
 * Author: DarkThanos, GreatApo
 */

// Guild Warcamp
var gca_guild_warcamp = {
	inject : function(){
		
		// Show guild battle rewards
		if (gca_section.submod == 'guild_combatreports' && gca_options.bool("guild", "show_battle_rewards") && !gca_getPage.parameter('gcid')) {
			// Run
			this.showAllRewards.inject();
		}
				
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
	},
	
	// Show guild battle rewards
	showAllRewards : {
		inject : function() {
			// Create rewards category
			jQuery('#content table.section-like > tbody > tr:first-child').append('<th style="text-align: center; padding-left: 3px;">' + gca_locale.get("guild", "rewards") + '</th>');

			// Look for battle links
			jQuery('#content a[href*="guild_combatreports"]').each(function () {
				const combatReportUrl = jQuery(this).attr('href'); 
				const battleRow = jQuery(this).closest('tr'); 

				// Placeholder 
				const rewardCell = jQuery('<td style="text-align: center; padding-left: 3px;">⌛</td>');
				battleRow.append(rewardCell);

				// AJAX request
				jQuery.get(combatReportUrl, function (response) {
					const parser = new DOMParser();
					const doc = parser.parseFromString(response, 'text/html');

					// Look for reward
					const sectionHeader = doc.querySelector('.section-header');
					if (sectionHeader) {
						// Extract 
						const match = sectionHeader.textContent.match(/\d+/);
						const result = match ? parseInt(match[0], 10) : 0;

						// Show reward and gold icon
						const rewardHtml = `${result} <img src="${gca_tools.img.cdn("img/res2.gif")}" alt="Gold" style="vertical-align: middle; height: 16px;">`;

						// Update
						rewardCell.html(rewardHtml);
					} else {
						// If not found, show zero
						rewardCell.html(`0 <img src="${gca_tools.img.cdn("img/res2.gif")}" alt="Zlato" style="vertical-align: middle; height: 16px;">`);
					}
				}).fail(function () {
					// Show error if error
					rewardCell.html(`<span style="color: red;">❌</span>`);
				});
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
