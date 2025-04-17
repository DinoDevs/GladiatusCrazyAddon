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
		
		// Show guild battles statistics
		if (gca_section.submod == 'guild_combatreports' && gca_options.bool("guild", "show_battle_statistics") && !gca_getPage.parameter('gcid')) {
			// Run
			this.showBattleStatistics.inject();
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

	// Show guild battles statistics
	showBattleStatistics : {
		inject: function() {
			// Locales
			const headersText = {
				win: gca_locale.get("guild", "win"),
				loss: gca_locale.get("guild", "loss"),
				draw: gca_locale.get("guild", "draw"),
				winPercentage: gca_locale.get("guild", "win_percentage"),
				lossPercentage: gca_locale.get("guild", "loss_percentage"),
				drawPercentage: gca_locale.get("guild", "draw_percentage"),
				error: gca_locale.get("general", "error")
			};

			// Create wrapper for table
			const wrapper = document.createElement('div');
			wrapper.style.position = 'relative';
			wrapper.style.marginBottom = '20px';
			wrapper.style.maxWidth = '500px';
			wrapper.style.overflow = 'hidden';
			wrapper.style.whiteSpace = 'normal';
			wrapper.style.wordWrap = 'break-word';

			// Create table element
			const table = document.createElement('table');
			table.className = 'section-like';
			table.style.width = '100%';
			table.style.borderCollapse = 'collapse';
			table.style.tableLayout = 'fixed';

			// Create table header
			const headerRow = document.createElement('tr');
			const headers = [headersText.win, headersText.loss, headersText.draw, headersText.winPercentage, headersText.lossPercentage, headersText.drawPercentage];
			headers.forEach(headerText => {
				const th = document.createElement('th');
				th.style.padding = '8px';
				th.style.border = '1px solid #c3ab6f';
				th.style.textAlign = 'center';
				th.style.wordWrap = 'break-word';
				th.style.maxWidth = '100px';
				th.textContent = headerText;
				headerRow.appendChild(th);
			});
			table.appendChild(headerRow);

			// Initialize counters
			let wins = 0;
			let losses = 0;
			let draws = 0;

			// Expected image URLs with regex
			const resultRegex = /img\/guild\/combat\/(win|lose|draw)\.gif(?:\?[^"]*)?$/;
			
			// Find all tables
			const sectionTables = document.querySelectorAll('table.section-like');
			
			sectionTables.forEach(table => {
				const allImages = table.querySelectorAll('img[src*="combat/"]');
			
				const resultImages = Array.from(allImages).filter(img => {
					const src = img.getAttribute('src');
					return resultRegex.test(src);
				});
			
				// Loop through each image and count results
				resultImages.forEach(img => {
					const src = img.getAttribute('src');
					const match = src.match(resultRegex);
			
					if (match && match[1]) {
						const result = match[1]; // 'win', 'lose', 'draw'
						if (result === 'win') wins++;
						else if (result === 'lose') losses++;
						else if (result === 'draw') draws++;
					} else {
						gca_notifications.error(gca_locale.get('general', 'error'));
					}
				});
			});

			// Calculate percentages
			const totalMatches = wins + losses + draws;
			const winPercentage = totalMatches > 0 ? (wins / totalMatches * 100).toFixed(2) : 0;
			const lossPercentage = totalMatches > 0 ? (losses / totalMatches * 100).toFixed(2) : 0;
			const drawPercentage = totalMatches > 0 ? (draws / totalMatches * 100).toFixed(2) : 0;

			// Create table row
			const statsRow = document.createElement('tr');

			// Create cells for each result type and display the counts
			const winsCell = document.createElement('td');
			winsCell.style.padding = '8px';
			winsCell.style.textAlign = 'center';
			winsCell.textContent = wins;
			statsRow.appendChild(winsCell);

			const lossesCell = document.createElement('td');
			lossesCell.style.padding = '8px';
			lossesCell.style.textAlign = 'center';
			lossesCell.textContent = losses;
			statsRow.appendChild(lossesCell);

			const drawsCell = document.createElement('td');
			drawsCell.style.padding = '8px';
			drawsCell.style.textAlign = 'center';
			drawsCell.textContent = draws;
			statsRow.appendChild(drawsCell);

			// Add percentage columns with fallback to 0 if not available
			const winPercentageCell = document.createElement('td');
			winPercentageCell.style.padding = '8px';
			winPercentageCell.style.textAlign = 'center';
			winPercentageCell.textContent = winPercentage + '%';
			statsRow.appendChild(winPercentageCell);

			const lossPercentageCell = document.createElement('td');
			lossPercentageCell.style.padding = '8px';
			lossPercentageCell.style.textAlign = 'center';
			lossPercentageCell.textContent = lossPercentage + '%';
			statsRow.appendChild(lossPercentageCell);

			const drawPercentageCell = document.createElement('td');
			drawPercentageCell.style.padding = '8px';
			drawPercentageCell.style.textAlign = 'center';
			drawPercentageCell.textContent = drawPercentage + '%';
			statsRow.appendChild(drawPercentageCell);

			table.appendChild(statsRow);

			// Append table to wrapper
			wrapper.appendChild(table);

			// Find the <article> element and insert the wrapper above the existing table
			const articleElement = document.querySelector('article');
			const existingTable = articleElement.querySelector('table.section-like');
			if (articleElement && existingTable) {
				articleElement.insertBefore(wrapper, existingTable);
			} else {
				console.error('Element <article> or existing table not found.');
			}
		}
	},
	
	// Show guild battle rewards
	showAllRewards: {
		inject: function() {
			// Create rewards category
			jQuery('#content table.section-like > tbody > tr:first-child').append('<th style="text-align: center; padding-left: 3px;">' + gca_locale.get("guild", "rewards") + '</th>');
	
			// Look for battle links
			const battleLinks = jQuery('#content a[href*="guild_combatreports"]');
			const delay = 200; // Delay required
	
			battleLinks.each(function(index) {
				const combatReportUrl = jQuery(this).attr('href');
				const battleRow = jQuery(this).closest('tr');
	
				// Placeholder
				const rewardCell = jQuery('<td style="text-align: center; padding-left: 3px; float: right;">⌛</td>');
				battleRow.append(rewardCell);
	
				// Delay the AJAX request
				setTimeout(() => {
					// AJAX request
					gca_tools.ajax.get(combatReportUrl).then(function(response) {
						const parser = new DOMParser();
						const doc = parser.parseFromString(response, 'text/html');
	
						// Look for reward
						const sectionHeader = doc.querySelector('.section-header');
						if (sectionHeader) {
							// Extract full reward
							const match = sectionHeader.textContent.match(/[\d.,]+/);
							const result = match ? match[0].replace(/,/g, '') : "0";
	
							// Show reward and gold icon
							const rewardHtml = `${result} <img src="${gca_tools.img.cdn("img/res2.gif")}" alt="Gold" style="vertical-align: middle; height: 16px;">`;
	
							// Update
							rewardCell.html(rewardHtml);
						} else {
							// If not found, show zero
							rewardCell.html(`0 <img src="${gca_tools.img.cdn("img/res2.gif")}" alt="Gold" style="vertical-align: middle; height: 16px;">`);
						}
					}).catch(function() {
						// Show error if error
						rewardCell.html(`<span style="color: red;">❌</span>`);
					});
				}, index * delay);
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
