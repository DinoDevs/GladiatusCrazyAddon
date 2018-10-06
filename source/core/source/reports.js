/*
 * Addon Reports Script
 * Author: DarkThanos, GreatApo
 */

// Reports
var gca_reports = {
	inject : function(){
		// Check for errors
		if(!document.getElementById("content"))
			return;
		
		// Check getting out from underworld
		if(document.getElementById('content').getElementsByTagName('img')[0] && document.getElementById('content').getElementsByTagName('img')[0].src.match('/ceres.png'))
			return;

		// Resolve submod
		this.resolveSubmod();

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
				this.dungeon_analyzer();
			}

			if (this.combatReport == "reportExpedition" || this.combatReport == "reportDungeon") {
				// Add shadow on items rewards
				(gca_options.bool("global","item_shadow") &&
					this.itemShadow());
			}

			// If arena attacked right now
			let referrer = gca_getPage.parameters(document.referrer);
			if (this.combatReport == "reportArena" && referrer.mod == "arena") {
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

		// If submod is null
		if (gca_section.submod == null) {

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
		// Else
		else {
			this.combatReport = null;
		}
	},

	// Log items found for statistics
	report_found_items : function(){
		// Check if this is new report
		var reportDate = document.getElementsByTagName('h2')[1].textContent.match(/(\d+).(\d+).(\d+) (\d+).(\d+).(\d+)/i);
		if (!reportDate) reportDate = document.getElementsByTagName('h2')[0].textContent.match(/(\d+).(\d+).(\d+) (\d+).(\d+).(\d+)/i);
		if (!reportDate) return;
		reportDate = new Date(reportDate[3], reportDate[2] - 1, reportDate[1], reportDate[4], reportDate[5], reportDate[6])
		var timePassed = (gca_tools.time.server() - reportDate.getTime())/1000;//in sec
		
		if (timePassed > 5) return;
			
		// Reward exist?
		var rewards = document.getElementsByClassName('reportReward');
		var data = gca_data.section.get('data', 'enemy_drops', []);//enemy,item
		// Fix wrong data type of previous versions
		if (data.constructor != Array) {
			data = [];
		}
		for(let i = 0; i < rewards.length; i++) {
			if(typeof rewards[i].getElementsByTagName('div')[1]!=='undefined'){
				if(rewards[i].getElementsByTagName('div')[1].className.match(/item-i-18-\d+/)){
					let item = rewards[i].getElementsByTagName('div')[1].className.match(/item-i-(18-\d+)/)[1];
					let enemy = document.getElementById('defenderAvatar11').getElementsByTagName('div')[2].style.backgroundImage.match(/url\("\d+\/img\/npc\/(\d+\/\d+_\d+....")\)/)[1];
					data.push([enemy, item]);
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
			var load_loot = gca_options.bool("reports","load_loot_tooltips");

			// Date variable
			var last_date = null;

			// Report lines
			var row = 1;
			var line = document.getElementById('content').getElementsByTagName('table')[0].getElementsByTagName('tr');

			// Align stuff
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
					// If this is a new line
					if (last_date != date) {
						last_date = date;
						// Insert a new line
						let tr = document.createElement("tr");
						tr.className = "reports_day_row";
						let td = document.createElement("td");
						td.textContent = last_date;
						td.setAttribute('colspan', line[row].getElementsByTagName('td').length);
						tr.appendChild(td);
						line[row].parentNode.insertBefore(tr, line[row]);
					}
					else {
						// Remove style
						line[row].getElementsByTagName('td')[0].removeAttribute('style');
						// Leave only time
						line[row].getElementsByTagName('td')[0].textContent = line[row].getElementsByTagName('td')[0].textContent.match(/(\d+:\d+:*\d*)/i)[1];
						// Align Loot
						line[row].getElementsByTagName('td')[2].style.textAlign = "right";

						// If report has a reward
						if (line[row].getElementsByTagName('td')[3].getElementsByTagName('div').length > 0 && line[row].getElementsByTagName('td')[3].getElementsByTagName('div')[0].className == "icon_itemreward") {
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
								gca_tools.setTooltip(icon, JSON.stringify([[[title+'<span class="loading"></span>',"white"]]]));
								// Load item
								this.getLootItem(report_id, report_t, icon, title);
							}
						}
					}
				}
				row++;
			}
		},

		// Get loot item
		getLootItem : function(id, t, icon, title){
			// Get Report
			jQuery.get(gca_getPage.link({"mod":"reports","submod":"showCombatReport","reportId":id,"t":t}), function(content){
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
				
				// Error - not fould loot
				if(tooltips.length == 0){
					// Display error message
					gca_tools.setTooltip(icon, JSON.stringify([[[title, "white"], [gca_locale.get("general", "error"), "white"]]]));
				}
				// Tooltip replace
				else {
					// Add title on tooltip
					var reward_tooltip = [[[title, "white"]]];
					// For each tooltip
					for (let i = 0; i < tooltips.length; i++) {
						// Parse tooltip
						let tooltip = JSON.parse(tooltips[i][1].replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>'));
						// Add space
						if(i != 0)
							reward_tooltip[0].push(["&nbsp;", "white"]);
						// Add tooltip rows
						for (let j = 0; j < tooltip[0].length; j++) {
							reward_tooltip[0].push(tooltip[0][j]);
						}
					}
					// Show tooltip
					gca_tools.setTooltip(icon, JSON.stringify(reward_tooltip));
				}
			});
		}
	},

	// Save reports infomation
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
				// If defence attack
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

			if (Math.random()*1000 <= 1) {
				if (result == 1) {
					gca_notifications.success("Are you not Entertained?");
				}
				else {
					gca_notifications.warning("The force is strong with this one!");
				}
			}
		}

	},
	
	// Dungeon analyzer
	dungeon_analyzer : function() {
		var life_points = document.getElementById('attackerCharStats1').getElementsByClassName('charstats_text')[0].innerHTML;
		var enemies = [];
		var players = [];

		// Find enemies
		for (let i = 1; i <= 5; i++) {
			if (document.getElementById('defenderAvatar1'+i)) {
				let name = document.getElementById('defenderAvatar1'+i).getElementsByClassName('player_name_bg')[0].getElementsByTagName('div')[0].innerHTML.trim();
				let life = document.getElementById('defenderCharStats1'+i).getElementsByClassName('charstats_value3_mirrored')[0].innerHTML.match(/\/\s*([^ ]+)$/i)[1].replace(/\./g,'');
				let found = false;
				let index = 0;
				for (let j = 0; j < enemies.length; j++) {
					if (enemies[j][0] == name) {
						found = true;
						index = j;
						break;
					}
				}
				if (!found)
					enemies.push([name, parseInt(life), parseInt(life), 0, 1]);
				else {//else add him in the same name as 2 in 1
					enemies[index][4] ++;
					enemies[index][1] += life;
					enemies[index][2] += life;
				}
			}
		}

		// Find players
		for (let i = 1; i <= 5; i++) {
			if (document.getElementById('attackerAvatar'+i)) {
				let name = document.getElementById('attackerAvatar'+i).getElementsByClassName('player_name_bg')[0].getElementsByTagName('div')[0].innerHTML.trim();
				let life = parseInt(document.getElementById('attackerCharStats'+i).getElementsByClassName('charstats_value3')[0].innerHTML.match(/\/\s*([^ ]+)$/i)[1].replace(/\./g,''));
				let found = false;
				let index = 0;
				for (let j = 0; j < players.length; j++) {
					if (players[j][0] == name) {
						found = true;
						index = j;
						break;
					}
				}
				if (!found)
					players.push([name, parseInt(life), parseInt(life), 0, 1]);
				else {//else add him in the same name as 2 in 1
					players[index][4] ++;
					players[index][1] += life;
					players[index][2] += life;
				}
			}
		}

		jQuery('.dungeon_report_statistic:eq(1) table th.table_border_bottom').each(function(index){
			var div = document.createElement('div');
			div.id = "dungeon_life_report_"+index;
			div.className = "title2_box dungeon_life_report";
			
			div.setAttribute('style','position: absolute; left: 70px; padding: 2px 0px 2px 2px;overflow: hidden;');
			
			for (let i=0; i<enemies.length; i++){
				enemies[i][3] = 0;
			}
			for (let i=0; i<players.length; i++){
				players[i][3] = 0;
			}
			
			var rows = [this.parentNode];
			var element = this.parentNode.nextElementSibling;
			while(element && element.getElementsByClassName('table_border_bottom').length==0){
				rows.push(element);
				if(element.getElementsByTagName('font').length>0){
					let text = element.getElementsByTagName('font')[0].innerHTML.replace(/\*(Ο\/Η)*\s*/g,'').replace(/<\/*b>/g,'');
					if(text.match(/\d+/)) {
						let isHealing = (element.getElementsByTagName('font')[0].getAttribute('color')=='green')?true:false;
						let value = parseInt(text.match(/\d+/)[0]);
						let found = false;
						for(let j=0; j<enemies.length; j++){
							if(text.match(enemies[j][0]+' ')){
								found = true;
								if(isHealing){
									enemies[j][1] += value;
									enemies[j][3] += value;
								}else{
									enemies[j][1] -= value;
									enemies[j][3] -= value;
								}
								break;
							}
						}
						if(!found){
							for(let j=0; j<players.length; j++){
								if(text.match(players[j][0]+' ')){
									found = true;
									if(isHealing){
										players[j][1] += value;
										players[j][3] += value;
									}else{
										players[j][1] -= value;
										players[j][3] -= value;
									}
								}
							}
						}
						if(!found){
							element.getElementsByTagName('font')[0].innerHTML += "<br>[Analyzer Data Error]";
						}
					}
				}
				element = element.nextElementSibling;
			}
			
			var roundName = this.innerHTML;
			
			let temp_div = document.createElement('div');
			temp_div.style = "position: absolute;background-color: rgba(0,0,0,0.3);width: 1px;top: -1px;bottom: -1px;right: 0px;z-index: 1;box-shadow: 0px 0px 6px black;";
			div.appendChild(temp_div);
			temp_div = document.createElement('div');
			temp_div.style = "margin-top: 0px;width: 200px;overflow: hidden;";
			temp_div.className = "charstats_nomargin";
				let temp_div2 = document.createElement('div');
				temp_div2.style = "background-image:url(img/char_status_kopf_b.jpg);width:262px;height:5px;overflow:hidden";
				temp_div.appendChild(temp_div2);
				
				temp_div2 = document.createElement('div');
				temp_div2.style = "text-align: center; width: 200px;";
				temp_div2.className = "charstats_bg2";
					let temp_div3 = document.createElement('span');
					temp_div3.textContent = roundName + " - " + life_points;
					temp_div2.appendChild(temp_div3);
				temp_div.appendChild(temp_div2);
			div.appendChild(temp_div);
			
			let temp_div4;
			for (let i=0; i<enemies.length; i++){
				let persent = ((((enemies[i][1]>0)?enemies[i][1]:0)/enemies[i][2])*100);
				
				temp_div2 = document.createElement('div');
				temp_div2.style = "width: 200px;";
				temp_div2.className = "charstats_bg2";
					temp_div3 = document.createElement('span');
					temp_div3.className = 'charstats_text';
					temp_div3.textContent = ((enemies[i][4]>1)?'['+enemies[i][4]+'] ':'')+enemies[i][0];
					if(enemies[i][3]!=0){
						temp_div4 = document.createElement('span');
						temp_div4.style = 'color:'+((enemies[i][3]>0)?'rgb(0, 100, 0)':'rgb(100, 0, 0)')+';position: absolute;display: block;font-size: 11px;right: 80px;top: 0px;background: rgba(183, 153, 99, 0.5);';
						temp_div4.textContent = ((enemies[i][3]>0)?'+':'')+enemies[i][3]
						temp_div3.appendChild(temp_div4);
					}
					temp_div2.appendChild(temp_div3);
					temp_div3 = document.createElement('div');
					temp_div3.className = 'charstats_balken';
						temp_div4 = document.createElement('div');
						temp_div4.className = 'charstats_balken_leben';
						temp_div4.style = 'width:'+persent+'%';
						temp_div3.appendChild(temp_div4);
					temp_div2.appendChild(temp_div3);
					temp_div3 = document.createElement('span');
					temp_div3.className = 'charstats_value3';
					temp_div3.style = 'font-weight: normal;font-size: 11px;';
					temp_div3.textContent = enemies[i][1]+' / '+enemies[i][2];
					temp_div2.appendChild(temp_div3);
				temp_div.appendChild(temp_div2);
			}
			
			for (let i=0; i<players.length; i++){
				let persent = ((((players[i][1]>0)?players[i][1]:0)/players[i][2])*100);
				
				temp_div2 = document.createElement('div');
				temp_div2.style = "width: 200px;";
				temp_div2.className = "charstats_bg2";
					temp_div3 = document.createElement('span');
					temp_div3.className = 'charstats_text';
					temp_div3.textContent = ((players[i][4]>1)?'['+players[i][4]+'] ':'')+players[i][0];
					if(players[i][3]!=0){
						temp_div4 = document.createElement('span');
						temp_div4.style = 'color:'+((players[i][3]>0)?'rgb(0, 100, 0)':'rgb(100, 0, 0)')+';position: absolute;display: block;font-size: 11px;right: 80px;top: 0px;background: rgba(183, 153, 99, 0.5);';
						temp_div4.textContent = ((players[i][3]>0)?'+':'')+players[i][3]
						temp_div3.appendChild(temp_div4);
					}
					temp_div2.appendChild(temp_div3);
					temp_div3 = document.createElement('div');
					temp_div3.className = 'charstats_balken';
						temp_div4 = document.createElement('div');
						temp_div4.className = 'charstats_balken_misc';
						temp_div4.style = 'width:'+persent+'%';
						temp_div3.appendChild(temp_div4);
					temp_div2.appendChild(temp_div3);
					temp_div3 = document.createElement('span');
					temp_div3.className = 'charstats_value3';
					temp_div3.style = 'font-weight: normal;font-size: 11px;'+((persent<=10)?'font-weight:bold;':'');
					temp_div3.textContent = players[i][1]+' / '+players[i][2];
					temp_div2.appendChild(temp_div3);
				temp_div.appendChild(temp_div2);
			}
			
			temp_div2 = document.createElement('div');
			temp_div2.style = "clear:both;background-image:url(img/char_status_abschluss_b.jpg);width:262px;height:5px;overflow:hidden";
			temp_div.appendChild(temp_div2);
			
			this.parentNode.insertBefore(div, this.nextSibling);
			
			var height = div.clientHeight+10;
			for(var i=0; i<rows.length; i++){
				height -= rows[i].clientHeight;
			}
			if(height > 0){
				var tr = document.createElement('tr');
				tr.style.height = height+'px';
				rows[rows.length-1].parentNode.insertBefore(tr, rows[rows.length-1].nextSibling);
			}
		});
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
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_data, gca_getPage, gca_locale, gca_notifications, gca_options, gca_section, gca_tools */
/* global jQuery */
