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

		// Resolve submod
		this.resolveSubmod();

		// Combat reports
		if(this.submod == 'showCombatReport' && document.getElementById('reportHeader')){
			// Change player image
			//(gca_options.bool("global","player_image") &&
			//	// Attach custom image on reports
			//	this.player_images_in_reports()); // TODO
			
			// If Combat report
			if (this.combatReport == "reportExpedition") {
				// Log items found for statistics
				//(gca_options.bool("reports", "found_items") &&
					this.report_found_items();//);
			}


			if (this.combatReport == "reportExpedition" || this.combatReport == "reportDungeon") {
				// Add shadow on items rewards
				(gca_options.bool("global","item_shadow") &&
					this.itemShadow());
			}

		}
		
		// Report Lists
		else{
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
	},

	// Get Submod
	resolveSubmod : function(){
		// Get url submod
		this.submod = gca_section.submod;

		// If submod is null
		if(gca_section.submod == null){

			// Wanna be submod parse
			if(gca_getPage.parameter('showExpeditions') != undefined){
				this.submod = "showExpeditions";
			}
			else{
				// Get type parameter
				let t = gca_getPage.parameter('t');

				// Expeditions type
				if(t === "-1") this.submod = "showExpeditions";
				// Arena type
				else if(t === "2") this.submod = "showArena";
				// CircusTurma type
				else if(t === "3") this.submod = "showCircusTurma";
				// Dungeons type
				else if(t === "1") this.submod = "showDungeons";

				else this.submod = "showExpeditions";
			}
		}
		// Combat Report
		else if(gca_section.submod === "showCombatReport"){
			// Get type parameter
			let t = gca_getPage.parameter('t');

			// Expeditions type
			if(t === "0") this.combatReport = "reportExpedition";
			// Arena type
			else if(t === "2") this.combatReport = "reportArena";
			// CircusTurma type
			else if(t === "3") this.combatReport = "reportCircusTurma";
			// Dungeons type
			else if(t === "1") this.combatReport = "reportDungeon";

			else this.combatReport = "reportExpedition";
		}
		// Else
		else{
			this.combatReport = null;
		}
	},

	// Attach custom image on reports
	player_images_in_reports : function(){
		// TODO : obviously there is no code here
	},
	// Log items found for statistics
	report_found_items : function(){
		// New report?
		var reportDate = document.getElementsByTagName('h2')[1].textContent.match(/(\d+).(\d+).(\d+) (\d+).(\d+).(\d+)/i);
		reportDate = new Date(reportDate[3], reportDate[2] - 1, reportDate[1], reportDate[4], reportDate[5], reportDate[6])
		var timePassed = (gca_tools.time.server() - reportDate.getTime())/1000;//in sec
		
		if( timePassed>5 )
			return;
			
		// Reward exist?
		var rewards = document.getElementsByClassName('reportReward');
		var data = gca_data.section.set('data', 'enemy_drops', []);//enemy,item
		var item, enemy;
		for(var i=0;i<rewards.length;i++){
			if(typeof rewards[i].getElementsByTagName('div')[1]!=='undefined'){
				if(rewards[i].getElementsByTagName('div')[1].className.match(/item-i-18-\d+/)){
					item = rewards[i].getElementsByTagName('div')[1].className.match(/item-i-(18-\d+)/)[1];
					enemy = document.getElementById('defenderAvatar11').getElementsByTagName('div')[2].style.backgroundImage.match(/url\("\d+\/img\/npc\/(\d+\/\d+_\d+....")\)/)[1];
					data.push([enemy,item]);
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
			if(line.length <= 2)
				// Kill it with fire
				return;

			// For every row
			while(line[row]){
				// If a td exist
				if(line[row].getElementsByTagName('td').length > 0){
					// Get date
					let date = line[row].getElementsByTagName('td')[0].textContent.match(/(\d+\.\d+\.\d+)/i)[1];
					// If this is a new line
					if(last_date != date){
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
					else{
						// Remove style
						line[row].getElementsByTagName('td')[0].removeAttribute('style');
						// Leave only time
						line[row].getElementsByTagName('td')[0].textContent = line[row].getElementsByTagName('td')[0].textContent.match(/(\d+:\d+:*\d*)/i)[1];
						// Align Loot
						line[row].getElementsByTagName('td')[2].style.textAlign = "right";

						// If report has a reward
						if(line[row].getElementsByTagName('td')[3].getElementsByTagName('div').length > 0 && line[row].getElementsByTagName('td')[3].getElementsByTagName('div')[0].className == "icon_itemreward"){
							// Get report id
							let report_id = line[row].getElementsByTagName('td')[4].getElementsByTagName('a')[0].href.match(/reportId=(\d+)&/i)[1];
							// Get report t parm
							let report_t = line[row].getElementsByTagName('td')[4].getElementsByTagName('a')[0].href.match(/t=(\d+)&/i)[1];
							// Load Loot
							if(load_loot){
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
				
				// Error - not fould loot
				if(tooltips.length == 0){
					// Display error message
					gca_tools.setTooltip(icon, JSON.stringify([[[title, "white"], [gca_locale.get("general", "error"), "white"]]]));
				}
				// Tooltip replace
				else{
					// Add title on tooltip
					var reward_tooltip = [[[title, "white"]]];
					// For each tooltip
					var i, j, tooltip;
					for (i = 0; i < tooltips.length; i++) {
						// Parse tooltip
						tooltip = JSON.parse(tooltips[i][1].replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>'));
						// Add space
						if(i != 0)
							reward_tooltip[0].push(["&nbsp;", "white"]);
						// Add tooltip rows
						for (j = 0; j < tooltip[0].length; j++) {
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
		if(section.length == 0)
			return;
		section = section[0];
		// Check if table exist
		var table = section.getElementsByTagName('table');
		if(table.length == 0)
			return;
		table = table[0];

		// Time variable
		var time = [false, false];

		// Reports
		if(table.getElementsByClassName('icon_defense').length > 0){
			var reports = table.getElementsByTagName('tr');
			for(var i = 1; i < reports.length; i++){
				// If defence attack
				if(reports[i].getElementsByClassName('icon_defense').length){
					// Cross server
					if(time[1] == false && reports[i].getElementsByTagName('a')[0].textContent.match(/\s+\(\d+\)/i)){
						// Get time
						time[1] = gca_tools.time.parse(reports[i].getElementsByTagName('td')[0].textContent.trim());
					}
					// Same server
					else if(time[0] == false){
						// Get time
						time[0] = gca_tools.time.parse(reports[i].getElementsByTagName('td')[0].textContent.trim());
					}
					// Both times found
					else if(time[0] != false && time[1] != false){
						break;
					}
				}
			}
		}

		// Normal
		if(time[0]){
			if(this.submod == 'showArena')
				gca_data.section.set("timers", 'arena_attacked', time[0]);
			else
				gca_data.section.set("timers", 'grouparena_attacked', time[0]);
		}

		// Cross
		if(time[1]){
			if(this.submod == 'showArena')
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
		for(var i = pagings.length - 1; i >= 0; i--){
			gca_tools.pagination.parse(pagings[i]);
		}
	},

	// Add shadow to items
	itemShadow : function(){
		// Get rewards wrapper
		var rewards = document.getElementById("content").getElementsByClassName("reportReward");
		if(rewards.length == 0) return;

		// For each reward
		for (var i = 0; i < rewards.length; i++) {
			// Get divs inside reward
			var divs = rewards[i].getElementsByTagName("div");
			if(divs.length > 1){
				gca_tools.item.shadow.add(divs[1]);
			}
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
		gca_reports.inject();
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

