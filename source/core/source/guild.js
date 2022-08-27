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
			// Important ranks button
			this.important_ranks();
		}
		// If guild buildings
		else if (gca_section.submod == 'buildings' || gca_section.submod == 'updateBuilding') {
			this.buildings.buildingsCostDifference.show();
			this.buildings.calculatorLink();
		}
		// If guild applications
		else if (gca_section.submod == 'adminApplication' || gca_section.submod == 'selectCandidate') {
			this.applications.showRank();
			this.applications.setRank();
		}
		// If guild map
		else if (gca_section.submod == null) {
			this.buildings.collectLevels();
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

	important_ranks : function() {
			let btn = document.createElement('input');
			btn.setAttribute("type", "button");
			btn.className = 'awesome-button';
			btn.setAttribute("value", gca_locale.get("guild", "important_ranks"));
			document.getElementById('quickFilter').appendChild(btn);
			btn.addEventListener('click', function() {
				jQuery('#mainbox').find('input[data-rank="1"], [data-rank="2"]').each(function(){
				jQuery(this).prop('checked', 1);
			});
		});
	},

	buildings : {
		buildingsCostDifference : {
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
				var difference = guildGold - cost;
				var div = document.createElement('div');
				div.textContent = '(' + (difference >= 0 ? '+' : '') + gca_tools.strings.insertDots(difference) + ')';
				div.className = 'gca_guild_buildings_cost_difference';
				div.style.color = difference >= 0 ? '#006300' : '#840900';
				element.parentNode.appendChild(div);
			}
		},
		calculatorLink : function() {
			// Generate server url
			this.url = gca_links.get('gladiatus-fansite') + '/calculator';

			// Create info box
			let info = document.createElement('div');
			info.id = 'gca_buildings_calculator';

			// Add links
			let link = document.createElement('a');
			link.setAttribute('target', '_blank');
			link.setAttribute('rel', 'noopener noreferrer');
			link.setAttribute('style', 'text-align: right;display: block;padding-right: 10px;')
			link.textContent = this.url;
			link.href = this.url;
			info.appendChild(link);

			let buildingsUpgrade = document.getElementById('mainbox');
			buildingsUpgrade.parentNode.insertBefore(info, buildingsUpgrade.nextSibling);
		},
		buildingsData : {
			levels : {
				guild : 0,
				temple : 0,
				warcamp : 0,
				market : 0,
				storage : 0,
				library : 0,
				medic : 0,
				bath : 0,
				bankinghouse : 0,
				jail : 0,
				training : 0
			},
			upgradeCostFactors : {
				guild : [1.2, 6.5],
				temple : [2, 4.5],
				warcamp : [2.3, 4.5],
				market : [2.7, 4.5],
				storage : [9, 4.5],
				library : [2.5, 4.5],
				medic : [4.1, 4.5],
				bath : [3.3, 4.5],
				bankinghouse : [4.8, 4.5],
				jail : [4.1, 4.5],
				training : [3.9, 4.5]
			}
		},
		collectLevels : function() {
			// If other guild, return
			let guildID = gca_getPage.parameter("i", gca_getPage.url());
			if (guildID != undefined)
				return;

			// Defaults
			let levels = this.buildingsData.levels;
			let upgradeCostFactors = this.buildingsData.upgradeCostFactors;
			
			// Get building levels
			let links = document.getElementsByClassName('map_label')
			for(let i = 0; i<links.length; i++){
				let level = parseInt(links[i].textContent.match(/\d+/))
				let building = links[i].href.match(/mod=(\w+)&/)[1]
				if (building!='guild')
					building = building.replace(/guild(_)*/,'').toLowerCase()
				
				levels[building] = level
			}
			
			// Save building levels
			//gca_data.section.set("guild", "buildings", levels); //not used
			
			// Calculate upgrade gold spend
			let totalGoldSpendOnUpgrades = 0;
			for (let [building, level] of Object.entries(levels)) {
				//console.log(building, level);
				let a = upgradeCostFactors[building][0];
				let b = upgradeCostFactors[building][1];
				for(let l_level = 1; l_level <= level; l_level++){
					totalGoldSpendOnUpgrades += Math.floor(Math.pow(l_level*a, b));
				}
			}
			
			// Save total gold spend on upgrades
			gca_data.section.set("guild", "upgradesCost", totalGoldSpendOnUpgrades);
		}
	},

	applications : {

		showRank : function() {
			let info = [];

			// Get all application forms
			let forms = document.querySelectorAll('#content .standalone form');

			// For each form
			forms.forEach((form) => {
				let box = form.querySelector('textarea');
				if (!box) return;
				box = box.parentNode;

				// Create drop-down for ranks
				let select = document.createElement('select');
				select.style.height = '24px';
				select.style.width = '175px';
				let option = document.createElement('option');
				option.textContent = '...';
				option.value = 0;
				select.appendChild(option);
				box.appendChild(select);

				// Save original action URL
				form.dataset.originalAction = form.getAttribute('action');

				// Save info
				info.push({
					player : form.candidateId.value,
					form : form,
					box : box,
					select : select,
					loading : option
				});
			});

			// Load ranks
			this.getRanks((ranks) => {
				info.forEach((application) => {
					// Clear loading
					application.select.removeChild(application.loading);
					delete application.loading;

					// Insert each rank
					ranks.forEach((rank) => {
						let option = document.createElement('option');
						option.textContent = rank.name;
						option.value = rank.index;
						application.select.appendChild(option);
					});
					application.select.addEventListener('change', () => {
						if (parseInt(application.select.value, 10) > 0) {
							let params = gca_getPage.parameters(application.form.dataset.originalAction);
							delete params.sh;
							params['gca-rank'] = application.select.value;
							params['gca-player'] = application.player;
							application.form.setAttribute('action', gca_getPage.link(params));
						}
						else {
							application.form.setAttribute('action', application.form.dataset.originalAction);
						}
					});
				});
			});
		},

		setRank : function() {
			// Check inputs
			let player = gca_getPage.parameter('gca-player');
			if (!player || !(/^[0-9]+$/).test(player)) return;
			let rank = gca_getPage.parameter('gca-rank');
			if (!rank || !(/^[0-9]+$/).test(rank)) return;

			// Parse inputs
			player = parseInt(player, 10);
			rank = parseInt(rank, 10);
			if (rank < 2) return;

			// Prepare data
			let data = {};
			data['zn' + player] = rank;

			// Apply rank
			jQuery.get(gca_getPage.link({"mod":"guild","submod":"saveMembersRank"}), data, (content) => {
				// Get player
				let player_name = content.match(new RegExp('<a href="index\\.php\\?mod=player&p=' + player + '&[^>]+>([^<]+)</a>'));
				// If not found, you may declined the application
				//if (!player_name) return gca_notifications.error(gca_locale.get('general', 'error'));
				if (!player_name) return;
				player_name = player_name[1].trim();

				// Check if rank was applied
				let rank_code = content.match(new RegExp('<select name="zn' + player + '" size="1">\\s*(?:\\s*<option value="\\d+"(?:\\s*selected="selected"|)>[^<]*</option>)+\\s*\\s*</select>'));
				if (!rank_code) return gca_notifications.error(gca_locale.get('general', 'error'));
				rank_code = rank_code[0].match(new RegExp('<option value="(\\d+)"\\s*selected="selected">([^<]+)</option>'));

				let rank_index = parseInt(rank_code[1], 10);
				let rank_name = rank_code[2].trim();
				if (rank_index === rank) {
					gca_notifications.success('[' + rank_name + '] ' + player_name);
				}
				else {
					gca_notifications.error('[' + rank_name + '] ' + player_name);
				}
			});
		},

		ranks : false,

		_getRanks_running : false,
		_getRanks_callbacks : [],
		getRanks : function (callback = false) {
			// If ranks exists
			if (this.ranks) {
				if (callback) (async () => {callback(this.ranks)})();
				return;
			}
			if (callback) this._getRanks_callbacks.push(callback);
			if (this._getRanks_running) return;
			this._getRanks_running = true;

			// Init ranks
			jQuery.get(gca_getPage.link({"mod":"guild","submod":"adminMembers"}), (content) => {
				this.ranks = [];

				// Get ranks
				let rule = /<th>([^<]+)<br>\s*<a href="index\.php\?mod=guild&submod=deleteRank&rankId=(\d+)&sh=/;
				let code = content.match(new RegExp(rule, 'g'));
				if (!code) return;

				// For each rank
				for (let i = code.length - 1; i >= 0; i--) {
					let rank = code[i].match(rule);
					this.ranks.unshift({
						name : rank[1].trim(),
						index : parseInt(rank[2], 10)
					});
				}

				// Get member locale
				code = content.match(/<th>([^<]+)<br>\s+<\/th>\s*<th><input type="checkbox" name="c3c1"/);
				if (!code) return;

				this.ranks.unshift({
					name : (!code) ? '-' : code[1],
					index : 0
				});

				// Fire callbacks
				var callbacks = this._getRanks_callbacks;
				this._getRanks_callbacks = false;
				callbacks.forEach((callback) => {
					(async () => {callback(this.ranks)})();
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
/* global gca_getPage, gca_section, gca_tools, gca_notifications, gca_locale */
/* global jQuery */
