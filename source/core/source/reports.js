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
		if(this.submod == 'showCombatReport'){
			// Change player image
			(gca_options.bool("global","player_image") &&
				// Attach custom image on reports
				this.player_images_in_reports()); // TODO
			// Item found
			(this.combatReport == "reportExpedition" && gca_options.bool("reports", "found_items") &&
				// Log items found for statistics
				this.report_found_items()); // TODO
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
		// TODO : obviously there is no code here ... deja vu
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
			var line = document.getElementById('content').getElementsByTagName('tr');

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
				// Match Loot
				var tooltip = content.match(/<div\s+style="background-image:url\(\d*\/*img\/shop\/shop_zelle\.gif\);\s*width:\d+px;\s*height:\s*\d+p*x*;float:left;"\s*data-tooltip="([^"]+)">/im);
				if(!tooltip){
					// Match alternative loot
					tooltip = content.match(/<div\s+class="reportReward"\s+data-tooltip="([^"]+)">/im);
				}
				
				// Error
				if(!tooltip){
					// Display
					gca_tools.setTooltip(icon, JSON.stringify([[[title, "white"], [gca_locale.get("error"), "white"]]]));
				}
				// Tooltip replace
				else{
					tooltip = JSON.parse(tooltip[1].replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>'));
					tooltip[0].unshift([title, "white"]);
					gca_tools.setTooltip(icon, JSON.stringify(tooltip));
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
			var reports = document.getElementById('content').getElementsByTagName('tr');
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

