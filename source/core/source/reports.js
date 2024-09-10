/*
 * Addon Reports Script
 * Author: DarkThanos, GreatApo
 */

// Reports
var gca_reports = {
	preinject : function() {
		// Resolve submod
		this.resolveSubmod();

		// Check event timers
		this.eventTimers();
	},
	inject : function(){
		// Check for errors
		if(!document.getElementById("content"))
			return;
		
		// Check getting out from underworld
		if(document.getElementById('content').getElementsByTagName('img')[0] && document.getElementById('content').getElementsByTagName('img')[0].src.match('/ceres.png'))
			return;

		// Combat reports
		if (this.submod == 'showCombatReport' && document.getElementById('reportHeader')) {
			
			// If Combat report
			if (this.combatReport == "reportExpedition") {
				// Log items found for statistics
				(gca_options.bool("reports", "found_items") &&
					this.report_found_items());
			}
			else if (this.combatReport == "reportDungeon") {
				// Dungeon battle analyzer
				(gca_options.bool("reports", "battle_analyzer") &&
					this.battle_analyzer.run());
			}
			else if (this.combatReport == "reportCircusTurma") {
				// Turma battle analyzer
				(gca_options.bool("reports", "battle_analyzer") &&
					this.battle_analyzer.run());
			}

			if (this.combatReport == "reportExpedition" || this.combatReport == "reportDungeon") {
				// Add shadow on items rewards
				(gca_options.bool("global","item_shadow") &&
					this.itemShadow());
			}

			if (this.combatReport != "reportCircusTurma" && this.combatReport != "reportDungeon") {
				// Save reports locale/translations
				this.saveReportsLocale();
			}

			// If arena attacked right now
			if (this.combatReport == "reportArena" && this.referrer.mod == "arena") {
				this.attacked.arena();
			}

			// Fire reports info updated
			gca_tools.event.fireOnce("arena-info-update");
		}
		
		// Report Lists
		else {
			// Save arena timer
			((this.submod == 'showArena' || this.submod == 'showCircusTurma') && gca_options.bool("global", "attacked_timers") &&
				this.save_reports_info());

			// Style changes
			(gca_options.bool("reports", "style_change") &&
				this.reports_style.change());
		}

		// Pagination layout
		(gca_options.bool("global", "pagination_layout") && 
			this.pagination());

		// Setting Link
		gca_tools.create.settingsLink("reports");
	},

	// Get Submod
	resolveSubmod : function(){
		// Get url submod
		this.submod = gca_section.submod;
		this.combatReport = null;
		this.reportId = gca_getPage.parameter('reportId') || false;
		this.referrer = gca_getPage.parameters(document.referrer);

		// If submod is null
		if (this.submod == null) {
			// Wanna be submod parse
			if (gca_getPage.parameter('showExpeditions') != undefined) {
				this.submod = "showExpeditions";
			}
			else {
				// Get type parameter
				let t = gca_getPage.parameter('t');

				// Expeditions type
				if (t === "-1") this.submod = "showExpeditions";
				// Arena type
				else if (t === "2") this.submod = "showArena";
				// CircusTurma type
				else if (t === "3") this.submod = "showCircusTurma";
				// Dungeons type
				else if (t === "1") this.submod = "showDungeons";

				else this.submod = "showExpeditions";
			}
		}

		// Combat Report
		else if (gca_section.submod === "showCombatReport") {
			// Get type parameter
			let t = gca_getPage.parameter('t');

			// Expeditions type
			if (t === "0") this.combatReport = "reportExpedition";
			// Arena type
			else if (t === "2") this.combatReport = "reportArena";
			// CircusTurma type
			else if (t === "3") this.combatReport = "reportCircusTurma";
			// Dungeons type
			else if (t === "1" || t === "4") this.combatReport = "reportDungeon";

			else this.combatReport = "reportExpedition";
		}
	},

	// Save Reports Locale/Translations
	saveReportsLocale : function(){
		
		let locale = gca_data.section.get('cache', 'reports_locale', null);
		if( locale && locale.all_translated == 1 )
			return;
		
		// Default values
		locale = {
			winner : document.getElementById("reportHeader").getElementsByTagName("td")[1].textContent.match(/([^:]+)+:/i)[1],
			stats : document.getElementsByTagName("h2")[1].textContent.match(/([^-]+)-/i)[1].trim(),
			battle_report : document.getElementsByTagName("h2")[2].textContent.match(/([^-]+)-/i)[1].trim(),
			name : document.getElementsByClassName("dungeon_report_statistic")[0].getElementsByTagName("td")[0].textContent,
			guild : document.getElementsByClassName("dungeon_report_statistic")[0].getElementsByTagName("td")[1].textContent,
			hitpoints : document.getElementsByClassName("dungeon_report_statistic")[0].getElementsByTagName("td")[2].textContent,
			life_points : document.getElementsByClassName("dungeon_report_statistic")[0].getElementsByTagName("td")[3].textContent,
			round : document.getElementsByClassName("table_border_bottom")[1].textContent.replace('1','').trim(),
			miss : "misses",
			block : "blocked",
			all_translated : 0
		};
		
		// Get values
		let report_table_rows = document.getElementsByClassName("table_border_bottom")[0].getElementsByTagName("tr");
		let translated = [false, false];
		for(let i = 0; i < report_table_rows.length; i++) {
			if( report_table_rows[i].style.backgroundColor != "rgb(181, 171, 131)" ){
				if ( report_table_rows[i].getElementsByTagName("td")[1].getElementsByTagName("font").length == 0 ){
					locale.miss = report_table_rows[i].getElementsByTagName("td")[1].textContent.trim();
					translated[0] = true;
				}else{
					if ( report_table_rows[i].getElementsByTagName("td")[1].getElementsByTagName("font")[0].color == "dimgray" && !report_table_rows[i].getElementsByTagName("td")[1].getElementsByTagName("font")[0].textContent.match(/\d+/i) ){
						locale.block = report_table_rows[i].getElementsByTagName("td")[1].getElementsByTagName("font")[0].textContent.trim();
						translated[1] = true;
					}
				}
			}
		}
		
		if ( translated[0] == true && translated[1] == true )
			locale.all_translated = 1;
		
		// Save
		gca_data.section.set('cache', 'reports_locale', locale);
	},

	// Log items found for statistics
	report_found_items : function(){
		// Check if this is new report
		let reportDate = document.getElementsByTagName('h2')[1].textContent.match(/(\d+).(\d+).(\d+) (\d+).(\d+).(\d+)/i);
		if (!reportDate) reportDate = document.getElementsByTagName('h2')[0].textContent.match(/(\d+).(\d+).(\d+) (\d+).(\d+).(\d+)/i);
		if (!reportDate) return;
		reportDate = new Date(reportDate[3], reportDate[2] - 1, reportDate[1], reportDate[4], reportDate[5], reportDate[6])
		let timePassed = (gca_tools.time.server() - reportDate.getTime())/1000;//in sec
		
		if (timePassed > 5) return;
			
		// Reward exist?
		let rewards = document.getElementsByClassName('reportReward');
		let data = gca_data.section.get('data', 'enemy_drops', []);//enemy,item
		// Fix wrong data type of previous versions
		if (data.constructor != Array) {
			data = [];
		}
		for (let i = 0; i < rewards.length; i++) {
			let reward = rewards[i].getElementsByTagName('div')[1];
			if (typeof reward !== 'undefined') {
				let forgingGood = reward.className.match(/item-i-(18-\d+)/)
				if (forgingGood) {
					let item = forgingGood[1];
					let image = document.getElementById('defenderAvatar11').getElementsByTagName('div')[2].style.backgroundImage;
					image = image.replace(/^url\(\"/,"").replace(/\"\)$/,""); // remove 'url("...")' if it exists
					// old enemy pictures, enemy[1] is the code to save in data
					//let enemy = image.match(/url\("\d+\/img\/npc\/(\d+\/[^.]+\.\w+)"\)/);
					//let cdn_enemy = image.match(/url\("(\/\/gf\d+\.geo\.gfsrv\.net\/cdn[0-9a-f]{2,2}\/[^.]+\.jpg)"\)/);
					let enemy = gca_tools.img.resolve(image);
					// convert cdn to old images
					if (enemy) {
						data.push([enemy.replace('/img/npc/','').replace('img/npc/',''), item]);
					}else if (document.getElementById('defenderAvatar11').getElementsByClassName('avatar').length>0) {
						// this is your avatar in underward
					}
					else console.error('Failed to detect enemy', image);
				}
			}
		}
		gca_data.section.set('data', 'enemy_drops', data);
	},
	
	// Report style
	reports_style : {
		// Change report style
		change : function(){
			// Load loot tooltips
			let load_loot = gca_options.bool("reports","load_loot_tooltips");

			// Date variable
			let last_date = null;
			let found_daily_divine_chest = false;
			let daily_gold = 0;
			let lastDateGoldTd = null;

			// Report lines
			let row = 1;
			let line = document.getElementById('content')?.getElementsByTagName('table')[0]?.getElementsByTagName('tr');
			let loot_translation = line?.[0]?.getElementsByTagName('th')[2]?.textContent;

			// Align stuff
			if (line[0].getElementsByTagName('th').length < 3) // There has been an error but none of the pages has less than 4...
				return;
			line[0].getElementsByTagName('th')[2].style.textAlign = "right";

			// If no reports
			if (line.length <= 2)
				// Kill it with fire
				return;

			// For every row
			while (line[row]) {
				// If a td exist
				if (line[row].getElementsByTagName('td').length > 0) {
					// Get date
					let date = line[row].getElementsByTagName('td')[0].textContent.match(/(\d+\.\d+\.\d+)/i)[1];
					let gold = parseInt(gca_tools.strings.removeDots(line[row].getElementsByTagName('td')[2].textContent), 10) || 0;
					// Check if fight lost
					if(line[row].getElementsByTagName('td')[1].getElementsByTagName('a').length>0 && line[row].getElementsByTagName('td')[1].getElementsByTagName('a')[0].style.color=='rgb(243, 7, 30)')
						gold = 0;
						
					// Populate gold
					if (last_date != date || row == line.length-1){
						// If last row, add last row gold
						if(row == line.length-1)
							daily_gold += gold;
						// Fill last date td
						if(lastDateGoldTd!=null){
							lastDateGoldTd.textContent = loot_translation + ": " +gca_tools.strings.insertDots(daily_gold);
							lastDateGoldTd.appendChild(document.createTextNode(" "));
							lastDateGoldTd.appendChild(gca_tools.create.goldIcon());
						}
						daily_gold = 0;
					}

					// If this is a new date
					if (last_date != date) {
						last_date = date;
						found_daily_divine_chest = false;
						// Insert a new line
						let tr = document.createElement("tr");
						tr.className = "reports_day_row";
						// Date td
						let td = document.createElement("td");
						td.textContent = last_date;
						td.setAttribute('colspan', 1);
						tr.appendChild(td);
						// Empty gold td
						let td2 = document.createElement("td");
						td2.setAttribute('colspan', line[row].getElementsByTagName('td').length-1);
						tr.appendChild(td2);
						lastDateGoldTd = td2;

						line[row].parentNode.insertBefore(tr, line[row]);
					}
					else {
						daily_gold += gold;

						// Remove style
						line[row].getElementsByTagName('td')[0].removeAttribute('style');
						// Leave only time
						line[row].getElementsByTagName('td')[0].textContent = line[row].getElementsByTagName('td')[0].textContent.match(/(\d+:\d+:*\d*)/i)[1];
						// Align Loot
						line[row].getElementsByTagName('td')[2].style.textAlign = "right";

						// Or search for divine chest
						if(gca_reports.submod == 'showArena' || gca_reports.submod == 'showCircusTurma'){
							// Check if player attacked
							let is_player_attacker = (line[row].getElementsByTagName('td')[1].getElementsByTagName('div')[0].className == 'icon_attack');
							let did_player_won = (line[row].getElementsByTagName('td')[1].getElementsByTagName('a')[0].style.color == 'rgb(36, 127, 42)');
							
							if (is_player_attacker && did_player_won && !found_daily_divine_chest){
								// Get report id
								let report_id = line[row].getElementsByTagName('td')[3].getElementsByTagName('a')[0].href.match(/reportId=(\d+)&/i)[1];
								// Get report t parm
								let report_t = line[row].getElementsByTagName('td')[3].getElementsByTagName('a')[0].href.match(/t=(\d+)&/i)[1];
								// Create drop icon
								let icon = document.createElement("img");
								icon.className = 'icon_itemreward'
								icon.id = 'report_reward_item_' + report_id;
								icon.setAttribute('align', "absmiddle");
								icon.setAttribute('src', '');
								icon.style.display = 'none'; // do not show by default
								line[row].getElementsByTagName('td')[2].appendChild(icon);
								// Load item
								let cashedItemFound = this.getLootItem(report_id, report_t, icon, null, true, true);
								if (cashedItemFound == true)
									found_daily_divine_chest = true;
							}
						}
						// If report has a reward
						else if (line[row].getElementsByTagName('td')[3].getElementsByTagName('div').length > 0 && line[row].getElementsByTagName('td')[3].getElementsByTagName('div')[0].className == "icon_itemreward") {
							// Get report id
							let report_id = line[row].getElementsByTagName('td')[4].getElementsByTagName('a')[0].href.match(/reportId=(\d+)&/i)[1];
							// Get report t parm
							let report_t = line[row].getElementsByTagName('td')[4].getElementsByTagName('a')[0].href.match(/t=(\d+)&/i)[1];
							// Load Loot
							if (load_loot) {
								// Set a loading tooltip
								let icon = line[row].getElementsByTagName('td')[3].getElementsByTagName('div')[0];
								icon.id = 'report_reward_item_' + report_id;
								let title = icon.getAttribute('title');
								icon.removeAttribute('title');
								icon.style.cursor = "pointer";
								gca_tools.setTooltip(icon, JSON.stringify([[[title+'<span class="loading"></span>',"#fdfdfd"]]]));
								// Load item
								this.getLootItem(report_id, report_t, icon, title);
							}
						}
						
						// Attack again link
						if(gca_reports.submod == 'showArena' || gca_reports.submod == 'showCircusTurma'){
							//let icon = (line[row].getElementsByTagName('div')[0].className=="icon_defense")? "⚔️" : "(↺)";
							let icon = "(↺)";
							
							// Create click icon
							let attack_again = document.createElement("span");
							attack_again.textContent = icon;
							attack_again.setAttribute('style', "float:right;font-weight:normal;cursor:pointer;");
							//attack_again.style.color = line[row].getElementsByTagName('a')[0].style.color; // color same as link
							
							// Get opponent id
							let opponent_id = line[row].getElementsByTagName('td')[1].getElementsByTagName('a')[0].href.match(/&p=(\d+)/i)[1];
							let server = line[row].getElementsByTagName('td')[1].getElementsByTagName('a')[0].href.match(/s(\d+)-(\w+)\./i);
							attack_again.setAttribute('onclick', "gca_reports.reports_style.startProvinciarumFight(this, "+ ((gca_reports.submod == 'showArena')?2:3) +", "+opponent_id+", "+server[1]+", '"+server[2]+"')");
							//gca_tools.setTooltip(attack_again, JSON.stringify([[['Attack back',"#fdfdfd"]]]));
							
							// Tooltip
							let name = line[row].getElementsByTagName('td')[1].getElementsByTagName('a')[0].textContent;
							//attack_again.dataset.tooltip = '[[["'+ gca_locale.get("arena", "attack_player", {name}) +'","#fff;font-size:12px;"]]]';
							gca_tools.setTooltip(attack_again, JSON.stringify([[[ gca_locale.get("arena", "attack_player", {name}), line[row].getElementsByTagName('a')[0].style.color+";font-size:12px;" ]]]));
							
							// Add click icon
							line[row].getElementsByTagName('td')[0].appendChild(attack_again);
						}
					}
				}
				row++;
			}
			
			// Add attack error box
			let error_box = document.createElement("div");
			error_box.id = "errorRow";
			error_box.setAttribute('style', "display:none;margin:10px;border:2px solid #bba86e;background-color: #eddac4;padding:10px");
			document.getElementById("content").insertBefore(error_box, document.getElementById("content").getElementsByTagName('div')[0]);
			let error_text = document.createElement("div");
			error_text.id = "errorText";
			document.getElementById("errorRow").appendChild(error_text);
		},

		// Gladiatus Attack code
		startProvinciarumFight :function(d, a, c, b, e) {
			jQuery("#errorRow").css({display: "none"});
			window.sendRequest("get", "ajax.php", "mod=arena&submod=confirmDoCombat&aType=" + a + "&opponentId=" + c + "&serverId=" + b + "&country=" + e, d)
		},

		// Get loot item
		getLootItem : function(id, t, icon, title, cacheNull = false, replaceGreenTooltipRow = true){
			// Check cache
			let cache = this.getLootItemFromCache(id);
			if (cache) {
				if (cache.q != null && cache.t != null){
					icon.style.display = ''; // show icon if hidden
					icon.className += ' reward-' + this.getStringFromColorNumber(cache.q);
					gca_tools.setTooltip(icon, cache.t);
					if (cacheNull)
						return true;
				}
				return;
			}
			
			// Get Report
			jQuery.get(gca_getPage.link({"mod":"reports","submod":"showCombatReport","reportId":id,"t":t}), (content) => {
				var tooltips = [];

				// Match Loot
				var match_tooltips = content.match(/<div class="reportReward">[^<]+(?:<br \/>[^<]*|)<div>(<div style="[^"]*" class="item-i-[^>]+>)/img);
				
				// If found tooltip
				if(match_tooltips){
					// For each tooltip
					for (var i = 0; i < match_tooltips.length; i++) {
						// Match loot tooltip
						tooltips.push(match_tooltips[i].match(/data-tooltip="([^"]+)"/im));
					}
				}

				// Check for tokens
				match_tooltips = content.match(/<div class="reportReward" (data-tooltip=[^>]+><img)/img);

				// If found token tooltip
				if(match_tooltips){
					// For each tooltip
					for (let i = 0; i < match_tooltips.length; i++) {
						// Match loot tooltip
						tooltips.push(match_tooltips[i].match(/data-tooltip="([^"]+)"/im));
					}
				}
			
				// Add title on tooltip
				let reward_tooltip = [[]];
				if (title != null)
					reward_tooltip[0].push([title, "#fdfdfd"]);

				// Error - not found loot
				if(tooltips.length == 0){
					// Cache no reward (used in arena/turma reports when searching for divine chests)
					if(cacheNull)
						this.setLootItemOnCache(id, null, null);
					// Display error message
					else
						gca_tools.setTooltip(icon, JSON.stringify(reward_tooltip));
				}
				// Tooltip replace
				else {
					// Init quality
					let quality_best = 0;
					// For each tooltip
					for (let i = 0; i < tooltips.length; i++) {
						// Parse tooltip
						let tooltip = JSON.parse(tooltips[i][1].replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>'));
						let quality = gca_tools.item.shadow.getColor(tooltip);
						switch(quality) {
							case 'white':  	if(quality_best < 0) quality_best = 0; break;
							case 'green': 	if(quality_best < 1) quality_best = 1; break;
							case 'blue': 	if(quality_best < 2) quality_best = 2; break;
							case 'purple': 	if(quality_best < 3) quality_best = 3; break;
							case 'orange': 	if(quality_best < 4) quality_best = 4; break;
							case 'red': 	if(quality_best < 5) quality_best = 5; break;
						}
						// Add space
						if(i != 0)
							reward_tooltip[0].push(["&nbsp;", "#fdfdfd"]);
						// Add tooltip rows
						for (let j = 0; j < tooltip[0].length; j++) {
							if (replaceGreenTooltipRow && tooltip[0][j][1] == '#00B712')
								continue;
							reward_tooltip[0].push(tooltip[0][j]);
						}
					}
					// Show tooltip
					reward_tooltip = JSON.stringify(reward_tooltip);
					icon.style.display = ''; // show icon if hidden
					icon.className += ' reward-' + this.getStringFromColorNumber(quality_best);
					gca_tools.setTooltip(icon, reward_tooltip);

					// Save in cache
					this.setLootItemOnCache(id, reward_tooltip, quality_best);
				}
			});
		},

		lootCache : false,
		initLootItemCache : function(){
			if (this.lootCache) return;
			this.lootCache = gca_data.section.get('cache', 'reports-loot', []);
			if (this.lootCache.length > 100) {
				this.lootCache = this.lootCache.slice(0, 100);
				gca_data.section.set('cache', 'reports-loot', this.lootCache);
			}
		},
		getLootItemFromCache : function(reportid){
			this.initLootItemCache();

			for (let i = 0; i < this.lootCache.length; i++) {
				if (this.lootCache[i].i == reportid) {
					return this.lootCache[i];
				}
			}
			return false;
		},
		setLootItemOnCache : function(reportid, tooltip, quality){
			this.initLootItemCache();
			this.lootCache.unshift({i:reportid, t:tooltip, q:quality});
			gca_data.section.set('cache', 'reports-loot', this.lootCache);
		},

		getStringFromColorNumber : function(quality) {
			switch(quality) {
				case 0: return 'white';
				case 1: return 'green';
				case 2: return 'blue';
				case 3: return 'purple';
				case 4: return 'orange';
				case 5: return 'red';
				default: return 'white';
			}
		}
	},

	// Save reports information
	save_reports_info : function(){
		// Check if section exist
		var section = document.getElementById('content').getElementsByTagName('section');
		if(section.length == 0) return;
		section = section[0];
		// Check if table exist
		var table = section.getElementsByTagName('table');
		if(table.length == 0) return;
		table = table[0];

		// Time variable
		var time = [false, false];

		// Reports
		if (table.getElementsByClassName('icon_defense').length > 0) {
			var reports = table.getElementsByTagName('tr');
			for (let i = 1; i < reports.length; i++) {
				// If defense attack
				if(reports[i].getElementsByClassName('icon_defense').length){
					// Cross server
					if (time[1] == false && reports[i].getElementsByTagName('a')[0].textContent.match(/\s+\(\d+\)/i)) {
						// Get time
						time[1] = gca_tools.time.parse(reports[i].getElementsByTagName('td')[0].textContent.trim());
					}
					// Same server
					else if (time[0] == false) {
						// Get time
						time[0] = gca_tools.time.parse(reports[i].getElementsByTagName('td')[0].textContent.trim());
					}
					// Both times found
					else if (time[0] != false && time[1] != false) {
						break;
					}
				}
			}
		}

		// Normal
		if (time[0]) {
			if (this.submod == 'showArena')
				gca_data.section.set("timers", 'arena_attacked', time[0]);
			else
				gca_data.section.set("timers", 'grouparena_attacked', time[0]);
		}

		// Cross
		if (time[1]) {
			if (this.submod == 'showArena')
				gca_data.section.set("timers", 'arena_xs_attacked', time[1]);
			else
				gca_data.section.set("timers", 'grouparena_xs_attacked', time[1]);
		}
		
		// Fire reports info updated
		gca_tools.event.fireOnce("arena-info-update");
	},


	// Pagination
	pagination : function(){
		// Get pagings
		var pagings = document.getElementsByClassName("paging");
		// Parse each
		for(let i = pagings.length - 1; i >= 0; i--){
			gca_tools.pagination.parse(pagings[i]);
		}
	},

	// Add shadow to items
	itemShadow : function(){
		// Get rewards wrapper
		var rewards = document.getElementById("content").getElementsByClassName("reportReward");
		if(rewards.length == 0) return;

		// For each reward
		for (let i = 0; i < rewards.length; i++) {
			// Get divs inside reward
			let divs = rewards[i].getElementsByTagName("div");
			if (divs.length > 1) {
				gca_tools.item.shadow.add(divs[1]);
			}
		}
	},

	// Attack was launched
	attacked : {

		// An arena attack
		arena : function() {
			// Get result
			let result = document.getElementById("reportHeader").className;

			if (result === "reportWin") {
				result = 1;		// Won
			}
			else if (result === "reportLose") {
				result = -1;	// Lost
			}
			else {
				result = 0;		// Draw
			}

			gca_tools.easter_eggs.check(
				gca_tools.easter_eggs.fight,
				[(result == 1)]
			);
		}

	},
	
	// Battle Analyzer (Turma & Dungeons)
	battle_analyzer : {
		run : function() {
			// Error counter
			this.errors = 0;

			// Initialize translations
			this.initTranslations();
			// Get players names
			this.initPlayers();
			
			// Parse each round
			jQuery('.dungeon_report_statistic:eq(1) table th.table_border_bottom').each((index, element) => {
				this.parseRound(element.parentNode, element, index);
			});
			
			// Show more stats
			this.moreStats();
		},
		
		moreStats : function() {
			
			let points_sum = 0;
			let points = null;
			// If winner points are shown (Turma fight and not dungeon)
			if ( document.getElementsByClassName("standalone").length > 0 )
				points = document.getElementsByClassName("standalone")[0].textContent.match(/\d+/gi);
			
			// Parse each player
			let team = 0
			jQuery('.dungeon_report_statistic:eq(0) table tr').each((index, element) => {
				
				// Get name
				let player_name = element.getElementsByTagName("th")[0].textContent.trim().replace(/\s\(\d+\)/i,"").trim();
				let array_index = -1;

				// Detect team change
				if( element.getElementsByTagName("th")[0].getElementsByTagName("a").length == 1)
					team += 1

				// Duplicate players across teams fix
				let duplicate_fix = '¹';
				if( team == 2 )
					duplicate_fix = '²';

				// Find in gathered stats
				let found = this.players.some(
					function (item, position) {
						if ( item[0].replace(duplicate_fix,'') === player_name ) {
							array_index = position;
							return true;
						}

						return false;
					}
				);
				
				// If player in stats
				if( found ){
					
					let hits = this.players[array_index][7];
					let heals = this.players[array_index][8];
					let misses = this.players[array_index][9];
					let got_hit = this.players[array_index][10];
					let dodge = this.players[array_index][11];
					let total_damage = parseInt( element.getElementsByTagName("td")[0].textContent );
					let total_heal = parseInt( element.getElementsByTagName("td")[2].textContent );
					let number_of_players = this.players[array_index][4];
					
					let font_style = "font-size: 0.8em;color: #717171;";
					// We can display stats only for non merged players
					if ( number_of_players > 1 )
						font_style += "text-decoration: line-through;";
					
					// Damage done
					let br = document.createElement("br");
					element.getElementsByTagName("td")[0].appendChild(br);
					let span = document.createElement("span");
					span.style = font_style;
					span.textContent = '⚔ '+hits+' / '+(hits+misses)+' ('+ ((hits+misses > 0) ? Math.round(hits/(hits+misses)*100) : '--')+'%)';
					span.dataset.tooltip = '[[["'+gca_locale.get("reports", "hits")+' / '+gca_locale.get("reports", "total_hits")+'","#fdfdfd"]]]';
					element.getElementsByTagName("td")[0].appendChild(span);
					br = document.createElement("br");
					element.getElementsByTagName("td")[0].appendChild(br);
					span = document.createElement("span");
					span.style = font_style;
					span.textContent = '⦰ '+ ((hits > 0) ? Math.round(total_damage/hits) : 0);
					span.dataset.tooltip = '[[["'+gca_locale.get("reports", "avg_damage")+'","#fdfdfd"]]]';
					element.getElementsByTagName("td")[0].appendChild(span);
					
					// Damage Taken
					/* // useless stat since the blocked/avoided attacks are shown below
					br = document.createElement("br");
					element.getElementsByTagName("td")[1].appendChild(br);
					span = document.createElement("span");
					span.style = font_style;
					span.textContent = '⚔ '+got_hit+' / '+(dodge+got_hit)+' ('+ ((dodge+got_hit>0) ? Math.round(got_hit/(dodge+got_hit)*100) : '--')+'%)';
					span.dataset.tooltip = '[[["'+gca_locale.get("reports", "hits")+' / '+gca_locale.get("reports", "total_hits")+'","#fdfdfd"]]]';
					element.getElementsByTagName("td")[1].appendChild(span);*/
					
					br = document.createElement("br");
					element.getElementsByTagName("td")[1].appendChild(br);
					span = document.createElement("span");
					span.style = font_style;
					span.textContent = '✖ '+dodge+' / '+(dodge+got_hit)+' ('+ ((dodge+got_hit>0) ? Math.round(dodge/(dodge+got_hit)*100) : '--')+'%)';
					span.dataset.tooltip = '[[["'+gca_locale.get("reports", "dodge")+' / '+gca_locale.get("reports", "total_hits")+'","#fdfdfd"]]]';
					element.getElementsByTagName("td")[1].appendChild(span);
					
					// Heal done
					br = document.createElement("br");
					element.getElementsByTagName("td")[2].appendChild(br);
					span = document.createElement("span");
					span.style = font_style;
					span.textContent = '⟳ '+heals;
					element.getElementsByTagName("td")[2].appendChild(span);
					br = document.createElement("br");
					element.getElementsByTagName("td")[2].appendChild(br);
					span = document.createElement("span");
					span.style = font_style;
					span.textContent = '⦰ '+ ((heals > 0) ? Math.round(total_heal/heals) : 0);
					span.dataset.tooltip = '[[["'+gca_locale.get("reports", "avg_heal")+'","#fdfdfd"]]]';
					element.getElementsByTagName("td")[2].appendChild(span);
					
					// Points
					if (points){
						let points_index = (points[0] > points_sum ? 0 : 1);
						points_sum += total_damage + total_heal / 2;
						let td = document.createElement("td");
						td.style = 'text-align:center;';
						if ( element.getElementsByTagName("td")[0].className == 'table_border_top' )
							td.className = 'table_border_top';
						td.textContent = ((points[points_index]>0) ? Math.round((total_damage + total_heal / 2)/points[points_index]*100) : '--')+'%';
						element.appendChild(td);
					}
				}else{
					// Points
					if ( points && element.getElementsByTagName("th")[0].getAttribute('rowspan') ){
						let th = document.createElement("th");
						th.setAttribute('rowspan',2);
						th.className = 'table_border_bottom';
						th.textContent = gca_locale.get("reports", "points");
						element.appendChild(th);
					}
				}
			});
		},
		
		// Parse round by index
		parseRound : function(round_row, round_title, index) {
			// Player life change on this round init
			for (let i = 0; i < this.players.length; i++) {
				this.players[i][3] = 0;
			}
			
			var rows = [round_row];
			var element = round_title.parentNode.nextElementSibling;
			while (element && element.getElementsByClassName('table_border_bottom').length == 0) {
				rows.push(element);
				
				// Get attacker or defender
				let isAttacker = (element.style.backgroundColor=="");
				

				// Hit / Heal
				let value = 0;
				if (element.getElementsByTagName('font').length > 0) {
					// Get action text
					let text = element.getElementsByTagName('font')[0].innerHTML.replace(/<\/*b>/g,'');
					// If there is a number on the action
					if ((/\d+/).test(text)) {
						// Check if action is a healing (green font)
						let isHealing = element.getElementsByTagName('font')[0].getAttribute('color') == 'green' ? true : false;
						// Get action number value
						value = parseInt(text.match(/\s\d+/)[0], 10);
						value = isHealing ? value : -1 * value;
						
						// Revert duplicate names
						let renameFix = ( !isAttacker )?"¹":"²";
						if (isHealing)
							renameFix = ( isAttacker )?"¹":"²";
							
				
						// Check for player
						let found = false;
						for (let i = 0; i < this.players.length; i++) {
							let player = this.players[i][0].replace(renameFix,"");
							if ( text.match(gca_tools.strings.escapeRegex(player)) ) {
								found = true;
								this.players[i][1] += value;
								this.players[i][3] += value;
								break;
							}
						}
						if (!found) {
							let error = document.createElement('span');
							error.style.cursor = 'default';
							error.style.color = '#ff0000';
							error.textContent = '⚠';
							error.title = 'Analyzer Error: Player was not found';
							element.getElementsByTagName('font')[0].parentNode.appendChild(document.createTextNode(' '));
							element.getElementsByTagName('font')[0].parentNode.appendChild(error);
							this.errors++;
							console.log('Analyzer Parsing Error:' + '"' + text + '"');
						}
					}
				}
				// Misses
				else{
					// nothing
				}
				
				// Who attacks/heals?
				if (element.getElementsByTagName('td').length > 0) {
					let text = element.getElementsByTagName('td')[0].textContent;
					
					// Revert duplicate names
					let renameFixA = (isAttacker)?"¹":"²";
					let renameFixD = (!isAttacker)?"¹":"²";
						
					// Check for player, 2 players are in the string, the first one is searched
					let foundA = -1;
					let n = text.length;
					let foundD = -1;
					let m = 0;
					for (let i = 0; i < this.players.length; i++) {
						// Find Attacker
						let playerI = this.players[i][0].replace(renameFixA,"");
						if ( text.match(gca_tools.strings.escapeRegex(playerI)) && n > text.indexOf(playerI) ){
							n = text.indexOf(playerI)
							foundA = i;
						}
						
						// Find Defender
						playerI = this.players[i][0].replace(renameFixD,"");
						if ( text.match(gca_tools.strings.escapeRegex(playerI)) && m < text.indexOf(playerI) ){
							m = text.indexOf(playerI)
							foundD = i;
						}
					}
					
					// Attacker
					if( foundA > -1){
						// Add hit, heal or miss
						if( value == 0 ) // Miss
							this.players[foundA][9] += 1;
						else if( value > 0 ){ // Heal
							this.players[foundA][8] += 1;
						}else{ // Hit
							this.players[foundA][7] += 1;
						}
						
						// Calculate current threat
						this.players[foundA][6] += 2 * this.players[foundA][5] + (value<0?-2:1) * value;
					}
					
					// Defender
					if( foundD > -1){
						// Add hit, heal or miss
						if( value < 0 ){ // Got hit
							this.players[foundD][10] += 1;
						}else if(value == 0){ // Dodge
							this.players[foundD][11] += 1;
							//this.players[foundD][6] += Math.round(this.players[foundA][5]*0.15);
						}
						
						//if( value <= 0 ){
						//}
					}
				}
				
				element = element.nextElementSibling;
			}

			// Create side table info
			let round_report = document.createElement('div');
			//round_report.id = "dungeon_life_report_" + index;
			round_report.className = 'title2_box analyzer_life_report';
			
			// Create side shadow from the main page body
			let sideShadow = document.createElement('div');
			sideShadow.className = 'analyzer_life_shadow';
			round_report.appendChild(sideShadow);

			// Create round report table
			let table = document.createElement('div');
			table.className = "charstats_nomargin analyzer_life_charstats";
			let table_top_border = document.createElement('div');
			table_top_border.className = 'analyzer_life_charstats_border';
			table_top_border.style.backgroundImage = document.querySelector('#charstatsCombat > div:first-child').style.backgroundImage;
			table.appendChild(table_top_border);
			let table_title = document.createElement('div');
			table_title.className = "charstats_bg2";
			table_title.style.textAlign = 'center';
			let table_title_span = document.createElement('span');
			table_title_span.textContent = round_title.textContent + ' - ' + this.translation_life_points;
			table_title.appendChild(table_title_span);
			table.appendChild(table_title);
			round_report.appendChild(table);
			
			this.addPlayerInfo(this.attackers, table, 'charstats_balken_misc');
			this.addPlayerInfo(this.defenders, table, 'charstats_balken_leben');
			this.addPlayerInfo(this.ignored, table, 'charstats_balken_xp', '⚠');
			
			let table_bottom_border = document.createElement('div');
			table_bottom_border.className = 'analyzer_life_charstats_border';
			table_bottom_border.style.backgroundImage = document.querySelector('#charstatsCombat > div:last-child').style.backgroundImage;
			table.appendChild(table_bottom_border);
			
			round_row.insertBefore(round_report, this.nextSibling);
			
			// Adds spacer if not enough height to fit info table
			let height = round_report.clientHeight + 10;
			for (let i = 0; i < rows.length; i++) {
				height -= rows[i].clientHeight;
			}
			if (height > 0) {
				let spacer = document.createElement('tr');
				spacer.style.height = height + 'px';
				rows[rows.length - 1].parentNode.insertBefore(spacer, rows[rows.length-1].nextSibling);
			}
		},

		// Add player info on table
		addPlayerInfo : function(players, table, bar_style, custom_text) {
			// Calculate total threat
			let totalThreat = 0;
			for (let i = 0; i < players.length; i++) {
				if( players[i][1] > 1 ) // if not dead
					totalThreat += players[i][6];
			}
			
			// Threat translation
			let threat_translation = document.getElementById("charstatsCombat").getElementsByClassName("charstats_value21")[8].textContent;
			
			// Create each player row
			for (let i = 0; i < players.length; i++) {
				
				// Name and life
				let row = document.createElement('div');
				row.className = 'charstats_bg2';

				let name = document.createElement('span');
				name.className = 'charstats_text';
				name.textContent = players[i][0] + (players[i][4] > 1 ? ' ×' + players[i][4]: '');
				name.style = "font-weight: bold;";
				if (players[i][3] != 0) {
					let change = document.createElement('span');
					change.style.color = (players[i][3] > 0 ? 'rgb(0, 100, 0)' : 'rgb(100, 0, 0)');
					change.textContent = (players[i][3] > 0 ? '+' : '') + players[i][3];
					name.appendChild(change);
				}
				row.appendChild(name);
				
				let bar_wrapper = document.createElement('div');
				bar_wrapper.className = 'charstats_balken';
				let bar_life = document.createElement('div');
				bar_life.className = bar_style;
				bar_life.style = 'width:' + (((players[i][1] > 0 ? players[i][1] : 0) / players[i][2]) * 100) + '%';
				bar_wrapper.appendChild(bar_life);
				row.appendChild(bar_wrapper);

				let life = document.createElement('span');
				life.className = 'charstats_value3';
				life.textContent = custom_text ? custom_text : players[i][1] + ' / ' + players[i][2];
				row.appendChild(life);

				table.appendChild(row);
				
				// Threat
				row = document.createElement('div');
				row.className = 'charstats_bg2';

				let threat_value = Math.round(((players[i][6] > 0 && players[i][1] > 1 ? players[i][6] : 0) / totalThreat) * 100) + '%';
				
				bar_wrapper = document.createElement('div');
				bar_wrapper.className = 'charstats_balken';
				bar_wrapper.style = "background-image: none;"; //margin-top: 2px
				let bar_threat = document.createElement('div');
				bar_threat.className = 'charstats_balken_xp';
				//bar_threat.style = 'margin-left:10px;position: absolute;width:' + threat_value;
				bar_threat.style = 'width:' + threat_value;
				bar_wrapper.appendChild(bar_threat);
				row.appendChild(bar_wrapper);

				let threat = document.createElement('span');
				threat.className = 'charstats_text';
				threat.textContent = threat_translation;
				threat.style = "font-size: .8em;margin-top: 8px;";
				row.appendChild(threat);
				
				let threatTxt = document.createElement('span');
				threatTxt.className = 'charstats_value3';
				threatTxt.textContent = threat_value;
				row.appendChild(threatTxt);

				table.appendChild(row);
			}
		},

		/*
		// Players variable structure
		this.players = [
			0: name,
			1: current life,
			2: total life,
			3: damage or heal taken,
			4: number of players (for when merged)
			5: base threat
			6: current threat to 0
			7: hits
			8: heals
			9: misses
			10: got hit
			11: dodge
		]
		*/

		// Initialize translations
		initTranslations : function() {
			// Get translation "Life Points"
			let stats = null;
			for (let i = 1; i <= 5; i++) {
				stats = document.getElementById('attackerCharStats1');
				if (stats) break;
			}
			this.translation_life_points = stats.getElementsByClassName('charstats_text')[0].innerHTML.trim();
		},

		// Get players names
		initPlayers : function() {
			// Get players
			this.attackers = this.getPlayers('attacker');
			this.defenders = this.getPlayers('defender');
			this.ignored = [];

			// Check if there are same names between the players
			for (let i = this.attackers.length - 1; i >= 0; i--) {
				for (let j = this.defenders.length - 1; j >= 0; j--) {
					// If the 2 players have the same name
					if (this.attackers[i][0] == this.defenders[j][0]) {
						//console.log('Analyzer Ignore Warning:' + '"' + this.attackers[i][0] + '"');
						
						/*
						// Old merge way
						this.ignored.push([
							this.attackers[i][0],
							this.attackers[i][1] + this.defenders[j][1],
							this.attackers[i][2] + this.defenders[j][2],
							0,
							this.attackers[i][4] + this.defenders[j][4]
						]);
						// Remove both
						this.attackers.splice(i, 1);
						this.defenders.splice(j, 1);
						*/
						
						// New rename way
						this.attackers[i][0] += "¹"
						this.defenders[j][0] += "²"
						
						break;
					}
				}
			}

			// Join players arrays
			this.players = this.attackers.concat(this.defenders).concat(this.ignored);
			// Sort by name length
			this.players.sort((a, b) => {
				if (a[0].length < b[0].length) return 1;
				if (a[0].length > b[0].length) return -1;
				return 0;
			});
		},

		// Get players of the battle
		getPlayers : function(type) {
			let players = [];

			// For each player
			for (let i = 1; i <= 5; i++) {
				// Find player, if exists
				let avatar = document.getElementById(type + 'Avatar' + i) || document.getElementById(type + 'Avatar1' + i);
				let stats = document.getElementById(type + 'CharStats' + i) || document.getElementById(type + 'CharStats1'+i);
				if (!avatar || !stats) continue;

				// Get player stats
				let name = avatar.getElementsByClassName('player_name_bg')[0].getElementsByTagName('div')[0].innerHTML.trim();
				let life = stats.getElementsByClassName('charstats_bg2')[1].getElementsByTagName('span')[1].innerHTML.match(/\/\s*([^ ]+)$/i)[1].replace(/\./g,'');
				let threat = stats.getElementsByClassName('charstats_bg2')[15].getElementsByTagName('span')[1].textContent.replace(/\./g,'');
				let isHealer = (stats.getElementsByClassName('charstats_bg2')[16].style.display=="");
				
				if (!name || !life ) continue;

				// Check if there is an player with the same name
				let found = -1;
				for (let j = 0; j < players.length; j++) {
					if (players[j][0] == name) {
						found = j;
						break;
					}
				}

				// Parse life points
				life = parseInt(life, 10);
				// Parse threat
				threat = parseInt(threat, 10);
				if(isHealer)
					threat = 0;

				// Unique name
				if (found == -1) {
					// name, life point, max life points, damage taken, number of players, base threat, current threat, hits, heals, misses, got hit, dodge
					players.push([name, life, life, 0, 1, threat, 0, 0, 0, 0, 0, 0]);
				}
				// Treat players with the same name as 1 player
				else {
					players[found][4] ++;
					players[found][1] += life;
					players[found][2] += life;
				}
			}

			return players;
		}
	},

	// Update event timers
	eventTimers: function() {
		let event = gca_data.section.get("timers", 'server_quest_attack', false);

		// If this is a report
		if (this.submod == 'showCombatReport' && this.reportId && event) {
			// Check referrer
			if (this.referrer.submod == 'serverQuest') {
				gca_data.section.set("timers", 'server_quest_available', event.available);
				gca_data.section.set("timers", 'server_quest_points', event.points);
				gca_data.section.set("timers", 'server_quest_last_date', event.last_date);
			}
		}

		if (event) gca_data.section.del("timers", 'server_quest_attack');

		// Fire server quest info updated
		gca_tools.event.fireOnce("server_quest-info-update");
	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_reports.inject();
	};
	gca_reports.preinject();
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_data, gca_getPage, gca_locale, gca_options, gca_section, gca_tools */
/* global jQuery */
