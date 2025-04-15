/*
 * Addon Overview Script
 * Author: DarkThanos, GreatApo
 */

// Overview
var gca_overview = {
	inject : function(){
		// Server Service wait screen
		if(document.getElementById('container_infobox'))
			return;

		// Resolve Page
		this.overviewResolve();

		// Update data
		this.updateData();

		// Analyze items
		(gca_options.bool("overview", "analyze_items") && 
			this.analyzeItems.show(this));

		// If underworld
		let isUnderworld = (document.getElementById('wrapper_game').className == 'underworld');
		if (isUnderworld) {
			(this.doll == 1 && 
				this.foodStuff.underworld.fadeFoods(this));
		}
		// If not underworld
		else {
			// Food life gain predict
			(this.doll == 1 && gca_options.bool("overview", "food_life_gain") && 
				this.foodStuff.lifeGain());

			// Highlight best food to consume
			(this.doll == 1 && gca_options.bool("overview", "best_food") && 
				this.foodStuff.bestFood());

			// Make foods that give more life transparent
			(this.doll == 1 && gca_options.bool("overview", "overfeed_food") && 
				this.foodStuff.overFeeding());
		}

		// Daily Bonus Log
		(gca_options.bool("overview", "daily_bonus_log") && 
			this.daily_bonus_log.inject());
		
		// Show Block / Avoid / Critical Hit / Critical Heal Caps
		(gca_options.bool("overview", "block_avoid_caps") && 
			this.blockAvoidCaps.calculateCaps());

		// If Item shadow
		(gca_options.bool("global","item_shadow") && 
			this.itemShadow.inject());
		
		// Display detailed timer in tooltips of the buffs
		(gca_options.bool("overview", "buffs_detailed_time") && 
			this.buffBar.inject());

		// Mercenaries manager interface
		(gca_options.bool("overview", "mercenaries_manager") && this.doll > 1 &&
			this.mercenaries.manager());
		
		// Mercenaries show tooltip
		(gca_options.bool("overview", "mercenary_tooltip_show") && this.doll > 2 &&
			this.mercenaries.showTooltip());
			
		// Repair overview
		(gca_options.bool("overview", "items_repair_overview") && this.doll == 1 &&
			this.repair_overview.inject());

		// Double click consume
		(!isUnderworld && this.doll == 1 && gca_options.bool("overview", "double_click_consume") && 
			this.doubleClickToConsume.init());

		// Dirty check
		this.dirtyCheck();

		// Setting Link
		gca_tools.create.settingsLink("overview");
	},

	// Resolve Page
	overviewResolve : function(){
		// Default Values
		this.doll = 1;

		var dolls = document.getElementsByClassName('charmercsel');
		for (var i = 0; i < dolls.length; i++) {
			if(dolls[i].className == "charmercsel active"){
				this.doll = i+1;
				break;
			}
		}
	},

	// Update data
	updateData : function(){
		// Get doll name
		let name = document.getElementsByClassName('playername');
		if (!name.length) name = document.getElementsByClassName('playername_achievement');
		if (!name.length) name = 'UnknownName';
		else name = name[0].textContent.trim();

		// Find player id
		if (gca_section.playerId == 0) {
			let player_id = 0;
			if (window.hasOwnProperty('playerId')) {
				player_id = window.playerId;
			}
			else if (this.doll == 1) {
				let getId = document.getElementById('content').innerHTML.match(/https:\/\/s\d+-\w+\.gladiatus\.gameforge\.com\/game\/index\.php\?mod=player(?:&|&amp;)p=(\d+)/i);
				if (getId) player_id = getId[1];
			}

			// If no secure hash on the URL on the url
			if (player_id > 0 && gca_section.sh == null && window.secureHash && document.getElementById('icon_rubies')) {
				gca_section.sh = window.secureHash;
				//console.log(player_id, window.secureHash);
			}

			if (player_id > 0 && gca_section.sh != null) {
				// after closing the chat, sh in not in the url

				// All cookies will expire if not used for some days
				let d = new Date();
				d.setTime(d.getTime() + (14 * 24*60*60*1000));
				let cookie_expires = "expires="+ d.toUTCString();

				// Create player id cookie
				let cookie_name = "Gca_" + gca_section.country + "_" + gca_section.server;
				let cookie_value = player_id + "_" + gca_section.sh.substring(0, gca_section.sh.length/4);
				let cookie_samesite = "SameSite=Strict; Secure"
				document.cookie = cookie_name + "=" + cookie_value + "; " + cookie_expires + "; path=/" + "; " + cookie_samesite;

				// Update player id
				gca_section.resolvePlayerId();
				gca_data_manager.init();
				gca_options.init();

				// Fire event
				gca_tools.event.fireOnce('player-id-updated');
			}
			else {
				console.error("Failed to detect player's id.");
			}
		}

		if (gca_section.playerId > 0 && this.doll == 1) {
			// All cookies will expire if not used for some days
			let d = new Date();
			d.setTime(d.getTime() + (14 * 24*60*60*1000));
			let cookie_expires = 'expires=' + d.toUTCString();
			let cookie_name = 'gca_players';
			let cookie_samesite = "SameSite=Strict; Secure"

			// Retrieve players list
			let players = (() => {
				let name = cookie_name + '=';
				let ca = decodeURIComponent(document.cookie);
				ca = ca.split(';');
				for(let i = 0; i < ca.length; i++) {
					let c = ca[i];
					while (c.charAt(0) == ' ') {
						c = c.substring(1);
					}
					if (c.indexOf(name) == 0) {
						let v = c.substring(name.length, c.length);
						return v.length ? v.split('|') : [];
					}
				}
				return [];
			})();
			// Update list of players
			let found = false;
			let changed = false;
			let entry = gca_section.country + '-' + gca_section.server + '-';
			let check = new RegExp('^' + entry, 'i');
			entry = entry + gca_section.playerId + '-' + gca_section.sh + '-' + name; // One per server
			for (let i = players.length - 1; i >= 0; i--) {
				if (check.test(players[i])) {
					changed = (players[i] != entry) ? true : false;
					players[i] = entry;
					found = true;
					break;
				}
			}
			if (!found) players.push(entry);
			if (!found || changed) {
				// Short players
				players = players.sort();
				// Set cookies
				document.cookie = cookie_name + '=' + encodeURIComponent(players.join('|')) + '; ' + cookie_expires + '; path=/; domain=gladiatus.gameforge.com' + "; " + cookie_samesite;
			}

			// Update player name
			gca_data_manager.savePlayerName(gca_section.playerId, name);
		}

		// Save costume
		if(this.doll == 1){
			// Get avatars
			let avatars = document.getElementsByClassName("avatar");
			// Get costume code
			let costume = avatars[0].style.backgroundImage.match(/\/img\/costumes\/sets\/\w+\/(\d+)(_\d+|_complete|)\./);
			
			// If costume not found
			if(!costume){
				// Set no costume
				costume = [0, 0];
			}

			// If costume found
			else{
				// Get costume code
				costume = [
					// Type
					parseInt(costume[1], 10),
					// Parts
					(costume[2] == "_complete")? 10 : 0
				];

				// If costume not full
				if(costume[1] != 10){
					let part;
					for (let i = avatars.length - 1; i > 0; i--) {
						part = avatars[i].style.backgroundImage.match(/\/img\/costumes\/sets\/\w+\/\d+_\d+\./);
						if(part) costume[1]++;
					}
				}
			}

			// Parse costume
			let player_costume = {
				code : costume[0],
				parts : costume[1]
			};
			switch(costume[0]) {

				// Vulcanus
				case 1:
					player_costume.name = "Vulcanus";
					if(costume[1] > 5){
						player_costume.parts = 5;
					}
					break;

				// Feronia
				case 2:
					player_costume.name = "Feronia";
					if(costume[1] > 5){
						player_costume.parts = 5;
					}
					break;

				// Neptune
				case 3:
					player_costume.name = "Neptune";
					if(costume[1] > 5){
						player_costume.parts = 5;
					}
					break;

				// Aeolus
				case 4:
					player_costume.name = "Aeolus";
					if(costume[1] > 5){
						player_costume.parts = 5;
					}
					break;

				// Pluto
				case 5:
					player_costume.name = "Pluto";
					if(costume[1] > 5){
						player_costume.parts = 5;
					}
					break;

				// Juno
				case 6:
					player_costume.name = "Juno";
					if(costume[1] > 5){
						player_costume.parts = 5;
					}
					break;

				// Wrath
				case 7:
					player_costume.name = "Wrath";
					if(costume[1] > 7){
						player_costume.parts = 7;
					}
					break;

				// Eagle
				case 8:
					player_costume.name = "Eagle";
					if(costume[1] > 5){
						player_costume.parts = 5;
					}
					break;

				// Underworld Normal
				case 11:
					player_costume.name = "Underworld Normal";
					player_costume.parts = 1;
					break;

				// Underworld Medium
				case 12:
					player_costume.name = "Underworld Medium";
					player_costume.parts = 1;
					break;

				// Underworld Hard
				case 13:
					player_costume.name = "Underworld Hard";
					player_costume.parts = 1;
					break;

				// Saturn
				case 9:
					player_costume.name = "Saturn";
					if(costume[1] > 5){
						player_costume.parts = 5;
					}
					break;

				// Bubona
				case 10:
					player_costume.name = "Bubona";
					if(costume[1] > 5){
						player_costume.parts = 5;
					}
					break;

				// Mercurius
				case 14:
					player_costume.name = "Mercurius";
					if(costume[1] > 5){
						player_costume.parts = 5;
					}
					break;

				// Ra
				case 15:
					player_costume.name = "Ra";
					if(costume[1] > 5){
						player_costume.parts = 5;
					}
					break;

				// Default
				default:
					player_costume.name = "None";
					player_costume.parts = 0;
					break;
			}

			// Save
			gca_data.section.set("overview", "costume", player_costume);
		}

		// Analyze items
		this.analyzeItemsData = {};
		var data = this.analyzeItemsData;
		var i;
		var statsNames = ["strength", "dexterity", "agility", "constitution", "charisma", "intelligence"];
		for (i = 0; i < statsNames.length; i++) {
			data[statsNames[i]] = {values : [], percents : [], sum : {values : 0, percents : 0}};
		}

		data.strength.id = "char_f0_tt";
		data.strength.name = document.getElementById("char_f0_tt").getElementsByClassName("charstats_text")[0].textContent;
		data.dexterity.id = "char_f1_tt";
		data.dexterity.name = document.getElementById("char_f1_tt").getElementsByClassName("charstats_text")[0].textContent;
		data.agility.id = "char_f2_tt";
		data.agility.name = document.getElementById("char_f2_tt").getElementsByClassName("charstats_text")[0].textContent;
		data.constitution.id = "char_f3_tt";
		data.constitution.name = document.getElementById("char_f3_tt").getElementsByClassName("charstats_text")[0].textContent;
		data.charisma.id = "char_f4_tt";
		data.charisma.name = document.getElementById("char_f4_tt").getElementsByClassName("charstats_text")[0].textContent;
		data.intelligence.id = "char_f5_tt";
		data.intelligence.name = document.getElementById("char_f5_tt").getElementsByClassName("charstats_text")[0].textContent;

		
		var charItems = document.getElementById("char").getElementsByClassName("ui-draggable");
		var tooltip, line, match, stat;
		var j, k;
		for (i = charItems.length - 1; i >= 0; i--) {
			tooltip = JSON.parse(charItems[i].dataset.tooltip)[0];
			for (j = 1; j < tooltip.length; j++) {
				if (typeof tooltip[j][0] == "string") {
					line = tooltip[j][0];
				}
				else {
					line = tooltip[j][0][0];
				}

				// For each power
				for (k = 0; k < statsNames.length; k++) {
					stat = data[statsNames[k]];

					// Items default stats
					match = line.match(new RegExp(stat.name + " ([\\+-]\\d+%?)", "i"));
					if (match) {
						match = match[1];
						if (match[match.length - 1] == "%"){
							stat.percents.push(parseInt(match, 10));
							stat.sum.percents += parseInt(match, 10);
						}
						else{
							stat.values.push(parseInt(match, 10));
							stat.sum.values += parseInt(match, 10);
						}
					}

					// Items enhanced stats
					else {
						match = line.match(new RegExp("([\\+-]\\d+) " + stat.name, "i"));
						if (match) {
							match = match[1];
							stat.values.push(parseInt(match, 10));
							stat.sum.values += parseInt(match, 10);
						}
					}
				}
			}
		}

		// Get Special Stats
			var specialJson = {};
			specialJson['avoid_critical'] = {item_points : parseInt(JSON.parse(document.getElementById("char_panzer_tt").dataset.tooltip)[0][3][0][1])};
			specialJson['block'] = {item_points : parseInt(JSON.parse(document.getElementById("char_panzer_tt").dataset.tooltip)[0][7][0][1])};
			specialJson['critical_hit'] = {item_points : parseInt(JSON.parse(document.getElementById("char_schaden_tt").dataset.tooltip)[0][6][0][1])};
			specialJson['critical_healing'] = {item_points : parseInt(JSON.parse(document.getElementById("char_healing_tt").dataset.tooltip)[0][4][0][1])};//should be taken from dungeon player

			
		// Save data if main player
		if (this.doll == 1) {
			var json = {};
			for (i = 0; i < statsNames.length; i++)
				json[statsNames[i]] = {
					values : data[statsNames[i]].values,
					percents : data[statsNames[i]].percents,
					sum : {
						values : data[statsNames[i]].sum.values,
						percents : data[statsNames[i]].sum.percents
					}
				};
			gca_data.section.set("overview", "stats", JSON.stringify(json));
			gca_data.section.set("overview", "special_stats", JSON.stringify(specialJson));
		}

		// Save stats locale names
		if (this.doll == 1) {
			let stats = gca_data.section.get("overview", "stats_locale", {});
			let spans = document.getElementById('charstats').getElementsByClassName('charstats_text');
			stats.life_points = spans[0].textContent.trim();
			stats.experience = spans[1].textContent.trim();
			stats.strength = spans[2].textContent.trim();
			stats.dexterity = spans[3].textContent.trim();
			stats.agility = spans[4].textContent.trim();
			stats.constitution = spans[5].textContent.trim();
			stats.charisma = spans[6].textContent.trim();
			stats.intelligence = spans[7].textContent.trim();
			spans = document.getElementById('charstats').getElementsByClassName('charstats_value21');
			stats.level = spans[0].textContent.trim();
			stats.armour = spans[1].textContent.trim();
			stats.damage = spans[2].textContent.trim();
			stats.healing = spans[3].textContent.trim();
			if ( !stats.threat )
				stats.threat = 'Threat'; // Set default value for threat
			gca_data.section.set("overview", "stats_locale", stats);
		}
		else if (this.doll >= 2) {
			let stats = gca_data.section.get("overview", "stats_locale", {});
			let spans = document.getElementById('charstats').getElementsByClassName('charstats_value21');
			stats.threat = spans[3].textContent.trim();
			gca_data.section.set("overview", "stats_locale", stats);
		}

		// Clear scroll cache data
		if (this.doll == 1) {
			gca_tools.event.request.onAjaxResponse(() => {
				gca_tools.ajax.cached.known_scrolls({clear:true});
			});
		}
	},
	
	// Items Repair Overview
	repair_overview : {
		// Inject
		inject : function(){
			// Get char element
			var char = document.getElementById("char");
			if(!char) return;

			// Create repair slot
			var slot = document.createElement("div");
			slot.className = "single_char_item_bg repair_slot_bg";
			char.appendChild(slot);

			// Create drop area
			var drop_area = document.createElement("div");
			drop_area.className = "ui-droppable quest_category_icon_work";
			drop_area.dataset.containerNumber = 384;
			drop_area.dataset.contentTypeAccept = 1855;
			slot.appendChild(drop_area);
			gca_tools.setTooltip(
				drop_area,
				JSON.stringify([
					[
						[gca_locale.get("overview","drop_item_see_materials_repair"), "#FF6A00"],
						[gca_locale.get("overview","workbench_6th_slot_empty"), "#808080"]
					]
				])
			);

			// Save element for later use
			this.drop_area = drop_area;

			// Add event
			var that = this;
			jQuery(function(){
				jQuery(drop_area).droppable({
					drop: function(event, ui) {
						var id = jQuery(ui.draggable).data('itemId');
						window.sendAjax(
							this,
							'ajax.php',
							'mod=forge&submod=getWorkbenchPreview&mode=workbench&slot=5&iid=' + id + '&amount=1',
							function (data){
								//that.showRepaireTooltip(data, id);
								that.getMaterialsAmounts(data, id);
							},
							function (elem, msg, delayDuration){
								//console.log(msg.responseText);
							}
						);

						/*
						// This is used by us (the developers) to easy print the item's forge data
						jQuery.ajax({
							type: "POST",
							url: 'ajax.php',
							crossDomain: true,
							data: {
								"mod":"forge",
								"submod":"getSmeltingPreview",
								"mode":"smelting",
								"slot":"5",
								"amount":"1",
								"iid":id,
								"a" : new Date().getTime(),
								"sh" : window.secureHash
							},
							success: function(data){
								that.logData(data);
							},
							error: function(){
							}
						});
						*/
					}
				});
			});
		},

		/*
		// This is used by us (the developers) to easy print the item's forge data
		logData : function(data) {
			data = JSON.parse(data);
			console.log(data);
			//console.log(data.slots[5].formula);

			let formula = data.slots[5].formula;

			let Prefix	=	[7, 9, 10, 11, 13, 15, 17, 18, 20, 21, 22, 26, 27, 29, 35, 36, 38, 40, 42, 45, 47, 49, 50];
			let Base	=	[1, 2, 3, 4, 48];
			let Suffix	=	[5, 6, 12, 14, 16, 19, 23, 24, 25, 28, 30, 31, 32, 33, 34, 37, 39, 41, 43, 44, 46, 48, 51, 52, 53, 55, 56, 59, 60];

			let mats = {
				prefix : {'l':-1},
				base : {},
				suffix : {'l':-1},
				other : {}
			};
			for (let mat in formula.needed) {
				if (formula.needed.hasOwnProperty(mat)) {
					let id = parseInt(mat, 10) - 18000;

					if (Prefix.indexOf(id) >= 0) {
						mats.prefix[id] = -1;//formula.needed[mat].amount;
					}
					else if (Base.indexOf(id) >= 0) {
						mats.base[id] = -1;//formula.needed[mat].amount;
					}
					else if (Suffix.indexOf(id) >= 0) {
						mats.suffix[id] = -1;//formula.needed[mat].amount;
					}
					else {
						mats.other[id] = -1;//formula.needed[mat].amount;
					}
				}
			}

			console.log(mats);

			let prefix = {};
			prefix[formula.prefix] = mats.prefix;
			console.log('prefix', JSON.stringify(prefix));

			let base = {};
			base['-'] = mats.base;
			console.log('base', JSON.stringify(base));

			let suffix = {};
			suffix[formula.suffix] = mats.suffix;
			console.log('suffix', JSON.stringify(suffix));

			console.log('other', JSON.stringify(mats.other));
		},
		*/

		getMaterialsAmounts : function(data, id) {
			// If already have materials data
			if (this.materialAmounts) {
				this.showRepaireTooltip(data, id);
				return;
			}

			// Load materials data
			gca_tools.ajax.get(gca_getPage.link({'mod':'forge','submod':'storage'})).then((content) => {
				// Get materials info
				var info = content.match(/<input id="resource-amount" type="number" title="[^"]+" min="[^"]+" max="[^"]+" value="[^"]+"\s+data-max="([^"]+)"\s*\/>/i);
				if (!info || !info[1]) {
					this.materialAmounts = false;
					this.showRepaireTooltip(data, id);
					return;
				}

				// Parse amounts
				info = JSON.parse(info[1].replace(/&quot;/g, '"'));
				this.materialAmounts = {};
				for (let mat in info) {
					if (info.hasOwnProperty(mat)) {
						this.materialAmounts[mat] = [0, 0, 0, 0, 0, 0];
						for (let quality in info[mat]) {
							if (info[mat].hasOwnProperty(quality)) {
								this.materialAmounts[mat][parseInt(quality, 10) + 1] = info[mat][quality];
							}
						}
					}
				}

				this.showRepaireTooltip(data, id);
			})
			// If Request Failed
			.catch(() => {
				this.materialAmounts = false;
				this.showRepaireTooltip(data, id);
			});
		},

		showRepaireTooltip : function(data, id){
			// Parse data string
			data = JSON.parse(data);
			// Tooltip variable
			var tooltip;
			
			// If data exist
			if(typeof data.slots[5].item !== 'undefined' || typeof data.slots[5].formula.needed !== 'undefined' && data.slots[5].item.data.itemId == id){
				// Get materials
				var materials = data.slots[5].formula.needed;

				// Get item data
				var item = {
					name : data.slots[5].item.name,
					text_css: data.slots[5].item.data.tooltip[0][0][1],
					color: data.slots[5].item.data.tooltip[0][0][1].match(/\s*([^;]+);/)[1]
				};

				// Create tooltip with the materials
				tooltip = [[]];
				// Add item name
				tooltip[0].push([item.name, item.text_css]);

				// For each material
				for (var key in materials) {
					if (materials.hasOwnProperty(key)) {
						// If needed
						if(materials[key].amount > 0){
							let mat_id = parseInt(key.match(/18(\d+)/)[1], 10);

							let mats_exists = '';
							let mats_info = '';
							if (this.materialAmounts && this.materialAmounts[mat_id]) {
								let sum = this.materialAmounts[mat_id][0] + this.materialAmounts[mat_id][1] + this.materialAmounts[mat_id][2] + this.materialAmounts[mat_id][3] + this.materialAmounts[mat_id][4] + this.materialAmounts[mat_id][5];
								mats_info = 
									' ' +
									'<div style="display:inline-block;margin-left:10px;color:#ddd;">[' +
									'<b style="color: white;">' + this.materialAmounts[mat_id][0] + '</b>+' + 
									'<b style="color: lime;">' + this.materialAmounts[mat_id][1] + '</b>+' + 
									'<b style="color: #5159F7;">' + this.materialAmounts[mat_id][2] + '</b>+' + 
									'<b style="color: #E303E0;">' + this.materialAmounts[mat_id][3] + '</b>+' + 
									'<b style="color: #FF6A00;">' + this.materialAmounts[mat_id][4] + '</b>+' + 
									'<b style="color: #FF0000;">' + this.materialAmounts[mat_id][5] + '</b>=' + 
									sum + ']</div>';
								mats_exists = (sum >= materials[key].amount ?'<b style="color: green;">✔</b>' : '<b style="color: red;">✖</b>');
							}

							tooltip[0].push([
								mats_exists + '<div class="item-i-18-' + mat_id + '" style="display:inline-block;transform: scale(0.8);margin:0 -5px -12px 0px;"></div> &times; ' + materials[key].amount + ' (' + this.checkForUtf8Bug(materials[key].name) + ')' + mats_info,
								"#cccccc"
							]);
						}
					}
				}
				// Show repair cost
				tooltip[0].push([
					'<span style="float:right;">' + this.getRepairCost() + ' <div class="icon_gold" style="display: inline-block;"></div></span>',
					"#cccccc"
				]);
				this.drop_area.style.filter = "drop-shadow(0px 0px 2px " + item.color + ")";
			}

			// Error
			else {
				tooltip = [[[gca_locale.get("general","error"), "#ff0000"]]];
				this.drop_area.style.filter = "none";
			}

			// Set tooltip
			gca_tools.setTooltip(this.drop_area, JSON.stringify(tooltip));
		},

		// Calculate repair costs
		getRepairCost : function() {
			return gca_tools.strings.insertDots(parseInt(document.getElementById('header_values_level').textContent) * 10 + 10, 10);
		},

		// Check and fix if utf8 bug
		checkForUtf8Bug : function(text){
			// Split on space
			var array = text.split(" ");
			for (var i = array.length - 1; i >= 0; i--) {
				array[i] = this.checkForUtf8BugWord(array[i]);
			}
			return array.join(" ");
		},
		checkForUtf8BugWord : function(text){
			// If not multiple of 5
			if (text.length % 5 != 0)
				return text;

			// Split on u
			var utf8 = text.split("u");

			// If not correct number of u
			if (utf8.length - 1 != text.length / 5)
				return text;

			// Join with \\u
			utf8 = utf8.join("%u");
			return unescape(utf8);
		}
	},
	
	// Food Life gain predict on mouse over
	blockAvoidCaps : {
		// Caps variables
		caps : [
			0, // Avoid Cap
			0, // Block Cap
			false, // Calculated
			0, // Critical hit Cap
			0, // Critical heal Cap
		],

		// Calculate Block and Avoid Caps
		calculateCaps : function(){
			if (!this.caps[2]){
				// Calculate Caps
				var player_level = parseInt(document.getElementById("header_values_level").textContent);
				this.caps[0] = Math.floor(24.5*4*(player_level-8)/52)+1;//Avoid Cap formula
				this.caps[1] = Math.floor(49.5*6*(player_level-8)/52)+1;//Block Cap formula
				this.caps[3] = Math.floor(49.5*5*(player_level-8)/52)+1;//Critical hit Cap formula
				this.caps[4] = Math.floor(89.5*7*(player_level-8)/52)+1;//Critical heal Cap formula
				this.caps[2] = true;
				
				// Attach event on request response
				gca_tools.event.request.onAjaxResponse(function(r){
					// If the response changes the tooltip
					if (r?.data?.status?.panzer?.tooltip){
						// Apply the new tooltip
						gca_tools.setTooltip(document.getElementById("char_panzer_tt"),JSON.stringify(r.data.status.panzer.tooltip));
						// Call this function
						gca_overview.blockAvoidCaps.calculateCaps();
					}
				});
			}
			
			// Show Avoid/Block caps
				var parseDataset = JSON.parse(document.getElementById("char_panzer_tt").dataset.tooltip);
				// Loop through the tooltip to find the proper rows
				var i = 1;
				var capNo = 0;
				while (parseDataset[0][i] && capNo<2){
					// If the color is golden
					if( parseDataset[0][i][1][1] == "#BA9700" ){
						// Change color
						parseDataset[0][i][1][1]=(parseDataset[0][i][0][1]>=this.caps[capNo])?"#00B712":"#ff0000";
						// Apply the /Cap
						parseDataset[0][i][0][1] = parseDataset[0][i][0][1] + "/" + this.caps[capNo];
						capNo++;
					}
					i++;
				}
				// Apply the changed tooltip
				gca_tools.setTooltip(document.getElementById("char_panzer_tt"),JSON.stringify(parseDataset));
			
			// Show Critical hit caps
				var parseDataset = JSON.parse(document.getElementById("char_schaden_tt").dataset.tooltip);
				// Loop through the tooltip to find the proper rows
				var i = 1;
				capNo++;
				while (parseDataset[0][i] && capNo<4){
					// If the color is golden
					if( parseDataset[0][i][1][1] == "#BA9700" ){
						// Change color
						parseDataset[0][i][1][1]=(parseDataset[0][i][0][1]>=this.caps[capNo])?"#00B712":"#ff0000";
						// Apply the /Cap
						parseDataset[0][i][0][1] = parseDataset[0][i][0][1] + "/" + this.caps[capNo];
						capNo++;
					}
					i++;
				}
				// Apply the changed tooltip
				gca_tools.setTooltip(document.getElementById("char_schaden_tt"),JSON.stringify(parseDataset));
			
			// Show Critical heal caps
				var parseDataset = JSON.parse(document.getElementById("char_healing_tt").dataset.tooltip);
				// Loop through the tooltip to find the proper rows
				var i = 1;
				while (parseDataset[0][i] && capNo<5){
					// If the color is golden
					if( parseDataset[0][i][1][1] == "#BA9700" ){
						// Change color
						parseDataset[0][i][1][1]=(parseDataset[0][i][0][1]>=this.caps[capNo])?"#00B712":"#ff0000";
						// Apply the /Cap
						parseDataset[0][i][0][1] = parseDataset[0][i][0][1] + "/" + this.caps[capNo];
						capNo++;
					}
					i++;
				}
				// Apply the changed tooltip
				gca_tools.setTooltip(document.getElementById("char_healing_tt"),JSON.stringify(parseDataset));
		}
	},
	
	// Food Life gain predict on mouse over
	foodStuff : {

		// Life variables
		life : [
			0, // Current life points
			0, // Max life points
			0  // Life percent
		],

		// Elements
		custom_elements : {
			info : null,
			bar : null,
			spaceBar : null
		},

		// Check if item is food
		isItemFood : function(item){
			// Check if food item-i-7-15
			if(item.dataset.contentType == "64" && item.className.match(/item-i-7-\d+/i)){
				// Is a food
				return true;
			}
			// Not a food
			return false;
		},

		// Init life
		initLifeData : function(){
			// Get Life
			if(this.life[1] == 0)
				this.parseLifeTooltip(document.getElementById("header_values_hp_bar").dataset.tooltip);
		},

		// Parse life tooltip
		parseLifeTooltip : function(tooltip){
			var getLife = JSON.parse(tooltip)[0][0][0][1].match(/(\d+)\s*\/\s*(\d+)/);
			this.life[0] = parseInt(getLife[1]);
			this.life[1] = parseInt(getLife[2]);
			this.life[2] = Math.round(parseInt(getLife[1]) * 100 / parseInt(getLife[2]));
		},

		// Parse life request
		parseLifeRequest : function(r){
			if(r.data.header && r.data.header.health){
				if(r.data.header.health.value && r.data.header.health.maxValue){
					this.life[0] = r.data.header.health.value;
					this.life[1] = r.data.header.health.maxValue;
					this.life[2] = Math.round(this.life[0] * 100 / this.life[1]);
				}
				else if(r.data.header.health.tooltip)
					this.parseLifeTooltip(r.data.header.health.tooltip);
			}
		},

		// Keep life data updated
		keepLifeDataUpdated_active : false,
		keepLifeDataUpdated : function(callback){
			// If callback exist
			if(callback && typeof callback == "function")
				gca_tools.event.addListener("overviewFoodLifeChange", callback);

			// If not already setup
			if(!this.keepLifeDataUpdated_active){
				// Set it done
				this.keepLifeDataUpdated_active = true;
				// Attach event on request response
				gca_tools.event.request.onAjaxResponse(function(r){
					// Parse life
					gca_overview.foodStuff.parseLifeRequest(r);
					// Fire event
					gca_tools.event.fire("overviewFoodLifeChange", r);
				});
			}
		},

		// Get Item's vitality
		getItemVitality : function(item){
			// If item is not food
			if(!this.isItemFood(item))
				return false;

			// Get tooltip
			let tooltip = JSON.parse(item.dataset.tooltip);

			// Initialize vitality to zero
			let vitality = 0;
			
			// Parse vitality (way 1)
			if(tooltip[0][2][0].match(/\+\d+/i)){
				vitality += parseInt(tooltip[0][1][0].match(/(\d+)/i)[0]);
			}
			// or Parse vitality (way 2)
			else if(tooltip[0][3][0].match(/\+\d+/i)){
				vitality += parseInt(tooltip[0][2][0].match(/(\d+)/i)[0]);
			}

			// Return results
			return vitality;
		},

		// Inject
		lifeGain : function(){
			// Get Life
			this.initLifeData();

			// Create info span
			this.custom_elements.info = document.createElement('span');
			this.custom_elements.info.className = "charstats_value gca_life_gain_info";
			document.getElementById('char_leben_tt').appendChild(this.custom_elements.info);
			// Create space bar
			this.custom_elements.spaceBar = document.createElement('div');
			this.custom_elements.spaceBar.className = "charstats_balken_leben gca_life_gain_bar";
			this.custom_elements.spaceBar.style = "width:0%;background-image:none;";
			document.getElementById("char_leben_balken").parentNode.insertBefore(this.custom_elements.spaceBar, document.getElementById("char_leben_balken"));
			// Create extend bar
			this.custom_elements.bar = document.createElement('div');
			this.custom_elements.bar.className = "charstats_balken_leben gca_life_gain_bar";
			this.custom_elements.bar.style = "width:0%;background-image:url(" + gca_tools.img.cdn('img/energie_gruen.gif') + ");";
			document.getElementById("char_leben_balken").parentNode.insertBefore(this.custom_elements.bar, document.getElementById("char_leben_balken"));

			// Add event on bag open
			gca_tools.event.bag.onBagOpen(function(tab){
				// Patch items
				gca_overview.foodStuff.patchItems();
			});
			gca_tools.event.bag.waitBag(function(){
				// Patch items
				gca_overview.foodStuff.patchItems();
			});
			
			// Attach on item drag event
			gca_tools.event.item.onDrag(function(item){
				// If is food
				if(gca_overview.foodStuff.isItemFood(item)){
					// Show life gain
					gca_overview.foodStuff.showVitalityGain(item);
				}
			});
			// Attach on item drop event
			gca_tools.event.item.onDrop(function(item){
				// If is food
				if(gca_overview.foodStuff.isItemFood(item)){
					// Hide life gain
					gca_overview.foodStuff.hideVitalityGain(item);
				}
			});

			// Track life changes
			this.keepLifeDataUpdated(function(r){
				// Update data
				gca_overview.foodStuff.refreshData(r.data);
			});
		},

		// Patch inventory items
		patchItems : function(){
			// Items
			var items = document.getElementById("inv").getElementsByTagName("div");
			// For each item
			for(var i = items.length-1; i>=0; i--){
				let vitality = this.getItemVitality(items[i]);
				// If item is food
				if(vitality != false){
					// If positive vitality
					if(vitality > 0){
						// Save vitality
						items[i].dataset.vitality = vitality;

						// Attach events
						if(!items[i].dataset.vitalityPatch){
							items[i].dataset.vitalityAttached = true;
							items[i].addEventListener('mouseover', function(){
								gca_overview.foodStuff.showVitalityGain(this);
							}, false);
							items[i].addEventListener('mouseout', function(){
								gca_overview.foodStuff.hideVitalityGain(this);
							}, false);
						}
					}

				}
			}
		},

		// Refresh data
		refreshData : function(json){
			// If item was moved
			if(json && json.to && json.to.data){
				// Get item data
				var item = json.to.data;

				// Search for element of this data
				var element = null;
				var items = document.getElementsByClassName('ui-draggable ui-droppable');
				for (var i = items.length - 1; i >= 0; i--) {
					// If items their match ids
					if(items[i].dataset && items[i].dataset && items[i].dataset.itemId == item.itemId){
						element = items[i];
						break;
					}
				}

				// Check if an item was found and is a food
				if(element && gca_overview.foodStuff.isItemFood(element)){
					// Hide the life gain
					element.addEventListener('mouseover', function(){
						gca_overview.foodStuff.showVitalityGain(this);
					}, false);
					element.addEventListener('mouseout', function(){
						gca_overview.foodStuff.hideVitalityGain(this);
					}, false);
				}
			}
		},

		// Show Item vitality
		showVitalityGain : function(item){
			// Calculate life gain in percent
			var gain = Math.floor((parseInt(item.dataset.vitality) * 100) / this.life[1]);
			// Show life gain
			this.custom_elements.info.textContent = "+" + gain + "%";
			// Calculate max healing
			var lifeLost = 100 - this.life[2];
			// Frame gain inside the possible
			gain = ((lifeLost > gain) ? gain : lifeLost);
			// Show gain bar
			this.custom_elements.bar.style.width = gain + "%";
			this.custom_elements.spaceBar.style.width = (lifeLost - gain) + "%";
		},

		// Hide Item vitality
		hideVitalityGain : function(item){
			// Clear text
			this.custom_elements.info.textContent = "";
			// Hide gain bar
			this.custom_elements.bar.style.width = "0%";
			this.custom_elements.spaceBar.style.width = "0%";
		},


		// Find the best food
		bestFood : function(){
			// Get Life
			this.initLifeData();

			// Add event on bag open
			gca_tools.event.bag.onBagOpen((tab) => {
				// Find best food
				this.findBestFood();
			});
			gca_tools.event.bag.waitBag(() => {
				// Find best food
				this.findBestFood();
			});

			// Track life changes
			this.keepLifeDataUpdated(() => {
				// Find best food
				this.findBestFood();
			});
		},

		// Find best food
		bestFoodElement : null,
		findBestFood : function(){
			// Remove old
			if(this.bestFoodElement){
				this.bestFoodElement.style.webkitFilter = 'none';
				this.bestFoodElement = null;
			}

			// If full life return
			if(this.life[2] == 100)
				return;

			// Set max distance
			var distance = this.life[1]+1;
			var food = null;

			// Items
			var items = document.getElementById("inv").getElementsByTagName("div");
			// For each item
			for(var i = items.length-1; i>=0; i--){
				// Get vitality
				let vitality = this.getItemVitality(items[i]);
				// If item is food
				if(vitality != false){
					// If positive vitality
					if(vitality > 0){
						// Calculate how close to 100% it is
						let thisDistance = Math.abs(this.life[1] - (this.life[0] + vitality));
						// If closer than the last one
						if(thisDistance < distance){
							// We have a new candidate
							distance = thisDistance;
							food = items[i];
						}
					}
				}
			}

			// Set new food
			this.bestFoodElement = food;
			// Add attribute if food exist
			if(food){
				food.style.webkitFilter = 'drop-shadow(black 0px 0px 1px) drop-shadow(yellow 0px 0px 3px) drop-shadow(yellow 0px 0px 3px)';
			}
		},

		// Make foods that give more life transparent
		overFeeding : function(){
			// Get Life
			this.initLifeData();

			// Add event on bag open
			gca_tools.event.bag.onBagOpen(() => {
				// Find best food
				this.findOverFeeding();
			});
			gca_tools.event.bag.waitBag(() => {
				// Find best food
				this.findOverFeeding();
			});

			// Track life changes
			this.keepLifeDataUpdated(() => {
				// Find overfeeding food
				this.findOverFeeding();
			});
		},

		// Find overfeeding food
		findOverFeeding : function(){
			// Items
			var items = document.getElementById("inv").getElementsByTagName("div");
			// For each item
			for(var i = items.length-1; i>=0; i--){
				// Get vitality
				let vitality = this.getItemVitality(items[i]);
				// If item is food
				if(vitality != false){
					// If positive vitality
					if(vitality > 0){
						// If overfeed
						if(this.life[1] - this.life[0] < vitality){
							items[i].style.opacity = 0.6;
						}
						// No overfeed
						else{
							items[i].style.opacity = 1;
						}

					}
				}
				// Next item
			}

			return;
		},

		// Underworld functions
		underworld : {
			// Fade foods on underworld
			fadeFoods : function (self) {
				// Add events
				gca_tools.event.bag.onBagOpen(() => {
					this.findAndFadeFoods(self);
				});
				gca_tools.event.bag.waitBag(() => {
					this.findAndFadeFoods(self);
				});
				this.findAndFadeFoods(self);
			},
			findAndFadeFoods : function (self) {
				// Items
				var items = document.getElementById("inv").getElementsByTagName("div");
				// For each item
				for(var i = items.length-1; i>=0; i--){
					// Get vitality
					let vitality = self.foodStuff.getItemVitality(items[i]);
					// If item is food
					if(vitality != false){
						// If positive vitality
						if(vitality > 0){
							items[i].style.opacity = 0.6;
							items[i].style.webkitFilter = 'drop-shadow(black 0px 0px 1px) drop-shadow(red 0px 0px 3px) drop-shadow(red 0px 0px 3px)';
						}
					}
					// Next item
				}

				return;
			}
		}
	},

	// Log the Daily Bonus
	daily_bonus_log : {
		// Inject
		inject : function(){
			// If daily bonus
			if(document.getElementById('blackoutDialogLoginBonus') != null){
				// Save instance
				var that = this;
				// Wait update event
				gca_tools.event.addListener("loginBonusDataUpdated", function(){
					// Display data
					that.showData();
				});
			}

			// No any new daily bonus
			else{
				// Display data
				this.showData();
			}
		},

		// Show daily bonus data
		showData : function(){
			// Get title/subtitle
			var bonus = gca_data.section.get('overview', 'daily_bonus', false);
			// If no data return
			if(!bonus) return;

			// Get Ends date
			var bonusEndDate = gca_data.section.get('overview', 'daily_bonus_ends', 0);
			// If bonus has expired, return
			if(bonusEndDate < gca_tools.time.server()) return;

			// Get data
			var data = gca_data.section.get('overview', 'daily_bonus_data', []);
			var collected = 0;

			// Create container
			var container = document.createElement("div");
			container.className = "contentItem daily_bonus_log";
			var title = document.createElement("h3");
			title.textContent = bonus.title;
			container.appendChild(title);

			var wrapper = document.createElement("div");
			wrapper.className = "contentItem_content";

			// For each bonus
			var boxes = [];
			for(var i = 0; i < data.length; i++){
				// Bonus box
				var box = document.createElement("div");
				box.className = "bonus-box";
				// Image of bonus
				var img = document.createElement("img");
				img.src = data[i].img;
				box.appendChild(img);
				// Display day of week
				var day = document.createElement("div");
				day.className = "bonus-day";
				day.textContent = data[i].text;
				box.appendChild(day);

				// If collected
				if(data[i].tooltip){
					// Show tooltip
					gca_tools.setTooltip(img, data[i].tooltip);
					collected++;
				}
				// If not
				else{
					// Set it as not collected
					img.className = "notcollected";
				}
				wrapper.appendChild(box);
				boxes.push(box);
			}
			container.appendChild(wrapper);

			// Title info
			var info = document.createElement("span");
			info.textContent = "(" + collected + "/" + data.length + ")";
			title.appendChild(info);

			// Mystery bonus info
			if(collected < 6){
				var mystery = document.createElement("div");
				mystery.className = "mystery-info";
				mystery.textContent = collected + "/6";
				boxes[boxes.length-1].appendChild(mystery);
				boxes[boxes.length-1].className += " mystery";
				gca_tools.setTooltip(boxes[boxes.length-1], JSON.stringify([[[bonus.description, "#fdfdfd"]]]));
			}

			// Next Bonus timer
			if(collected < 7){
				var nextBonusDate = new Date(gca_tools.time.server());
				nextBonusDate = new Date(nextBonusDate.getFullYear(), nextBonusDate.getMonth(), nextBonusDate.getDate()).getTime() + 24*60*60*1000 - 1;
				var nextDay = 6-Math.floor((bonusEndDate-gca_tools.time.server())/864e5)*864e5;
				if(nextDay != 6){
					this.nextBonusTimer(boxes[nextDay], nextBonusDate - gca_tools.time.server());
				}
			}

			document.getElementById("content").appendChild(container);
		},

		nextBonusTimer : function(box, time){
			// Create div
			var div = document.createElement("div");
			div.className = "timer-info";
			div.textContent = gca_tools.time.msToHMS_String(time);
			box.appendChild(div);

			// Count down
			var countDown = setInterval(function(){
				time -= 1000;
				if(time > 0){
					div.textContent = gca_tools.time.msToHMS_String(time);
				}
				else{
					clearInterval(countDown);
					div.textContent = gca_tools.time.msToHMS_String(0);
				}
			}, 1000);
		}
	},
	
	// Items Shadow Inject
	itemShadow : {
		inject : function(){
			this.dollItems();
		},

		// Add shadow to doll items
		dollItems : function(){
			// Get doll items
			var items = document.getElementById("char").getElementsByClassName("ui-draggable");

			// Add shadow to each item
			for(var i = items.length - 1; i >= 0; i--){
				gca_tools.item.shadow.add(items[i]);
			}

		}
	},

	// Buff bar
	buffBar : {
		inject : function(){
			// If there is a buff bar
			if(document.getElementById("buffbar_old")){
				this.addTimers();
			}
		},

		// Add timers on the buffs
		addTimers : function(){
			this.timer_started = new Date().getTime();
			// Get buffs
			var buffs = document.getElementsByClassName("buff_old");
			// For each buff
			for (var i = buffs.length - 1; i >= 0; i--) {
				// Get buff
				let buff = buffs[i].getElementsByClassName("buff_inner")[0];
				// Copy old timer
				buff.dataset.timeLeft = parseInt(buffs[i].getElementsByClassName("ticker")[0].dataset.tickerTimeLeft, 10);
				// Update buff
				this.initTimer(buff);
			}
		},

		initTimer : function(buff){
			// Create new line in tooltip
			var tooltip = JSON.parse(buff.dataset.tooltip);
			tooltip[0].push(["...", "#DDD;text-align:right;"]);
			gca_tools.setTooltip(buff, JSON.stringify(tooltip));

			// Interval variable
			var interval = setInterval(() => {
				this.updateTimer(buff, interval);
			}, 1000);
		},

		updateTimer : function(buff, interval){
			// Get time left
			var time_left = parseInt(buff.dataset.timeLeft, 10) - (new Date().getTime() - this.timer_started);

			// Get tooltip
			var tooltip = JSON.parse(buff.dataset.tooltip);
			tooltip[0][tooltip[0].length - 1] = [gca_tools.time.msToString(time_left), "#DDD;text-align:right;"];
			gca_tools.setTooltip(buff, JSON.stringify(tooltip));

			// If timer ended
			if (time_left <= 0) clearInterval(interval);
		}
	},

	// Mercenaries
	mercenaries : {
		// Informations
		list : false,
		types : {
			tank : "",
			dps : "",
			healer : "",
			elements : {}
		},

		// Mercenaries manager interface
		manager : function(){
			var that = this;

			// Get info
			this.getInfo();

			// Player table
			var player_table = document.getElementById("inv").parentNode.parentNode.parentNode.parentNode.parentNode;

			// Create wrappers
			var wrapper_row = document.createElement("tr");
			var wrapper = document.createElement("td");
			wrapper.style.paddingTop = "15px";
			wrapper.setAttribute("colspan", "2");
			wrapper_row.appendChild(wrapper);
			player_table.appendChild(wrapper_row);

			// Create manager
			var title = document.createElement("h2");
			title.className = "section-header";
			title.style.cursor = "pointer";
			title.textContent = this.list[0].name;
			wrapper.appendChild(title);
			var content = document.createElement("section");
			content.style.display = "block";

			// Mercenaries table
			var table = document.createElement("table");
			table.style.width = "100%";
			var tr, td, btn;
			for (var i = 0; i < this.list.length; i++) {
				// Elements data
				this.types.elements[this.list[i].id] = {};

				tr = document.createElement("tr");
				table.appendChild(tr);

				// Tank
				td = document.createElement("td");
				td.style.width = "30px";
				td.style.textAlign = "center";
				btn = document.createElement("a");
				btn.className = "icon_attack";
				btn.style.cursor = "pointer";
				if(this.list[i].type == 1){
					btn.style.backgroundPosition = "-1917px 0";
				}
				else{
					btn.style.backgroundPosition = "-1935px 0";
				}
				this.types.elements[this.list[i].id].tank = btn;
					btn.addEventListener('click', (function(id){
						return function(){
							that.selectTask(id, 1);
						};
					})(this.list[i].id), false);
				td.appendChild(btn);
				tr.appendChild(td);

				// Dps
				td = document.createElement("td");
				td.style.width = "30px";
				td.style.textAlign = "center";
				btn = document.createElement("a");
				btn.className = "icon_attack";
				btn.style.cursor = "pointer";
				if(this.list[i].type == 2){
					btn.style.backgroundPosition = "-1953px 0";
				}
				else{
					btn.style.backgroundPosition = "-1971px 0";
				}
				this.types.elements[this.list[i].id].dps = btn;
					btn.addEventListener('click', (function(id){
						return function(){
							that.selectTask(id, 2);
						};
					})(this.list[i].id), false);
				td.appendChild(btn);
				tr.appendChild(td);

				// Healer
				td = document.createElement("td");
				td.style.width = "30px";
				td.style.textAlign = "center";
				btn = document.createElement("a");
				btn.className = "icon_attack";
				btn.style.cursor = "pointer";
				if(this.list[i].type == 3){
					btn.style.backgroundPosition = "-1989px 0";
				}
				else{
					btn.style.backgroundPosition = "-2007px 0";
				}
				this.types.elements[this.list[i].id].healer = btn;
					btn.addEventListener('click', (function(id){
						return function(){
							that.selectTask(id, 3);
						};
					})(this.list[i].id), false);
				td.appendChild(btn);
				tr.appendChild(td);

				// Don't take with you
				td = document.createElement("td");
				td.style.width = "30px";
				td.style.textAlign = "center";
				if(i != 0){
					btn = document.createElement("a");
					btn.className = "icon_attack";
					btn.style.cursor = "pointer";
					if(this.list[i].type == 0){
						btn.style.backgroundPosition = "-2025px 0";
					}
					else{
						btn.style.backgroundPosition = "-2043px 0";
					}
					this.types.elements[this.list[i].id].ignore = btn;
					btn.addEventListener('click', (function(id){
						return function(){
							that.selectTask(id, 4);
						};
					})(this.list[i].id), false);
					td.appendChild(btn);
				}
				tr.appendChild(td);

				// Name
				td = document.createElement("td");
				td.textContent = this.list[i].name;
				tr.appendChild(td);
			}

			content.appendChild(table);
			wrapper.appendChild(content);
		},

		// Select info
		selectTask : function(id, type){
			if(type == 1) this.types.elements[id].tank.style.backgroundPosition = "-1917px 0";
			else this.types.elements[id].tank.style.backgroundPosition = "-1935px 0";

			if(type == 2) this.types.elements[id].dps.style.backgroundPosition = "-1953px 0";
			else this.types.elements[id].dps.style.backgroundPosition = "-1971px 0";

			if(type == 3) this.types.elements[id].healer.style.backgroundPosition = "-1989px 0";
			else this.types.elements[id].healer.style.backgroundPosition = "-2007px 0";

			if(this.types.elements[id].ignore){
				if(type == 4) this.types.elements[id].ignore.style.backgroundPosition = "-2025px 0";
				else this.types.elements[id].ignore.style.backgroundPosition = "-2043px 0";
			}

			// Apply
			window.selectTask(id + "", type + "");

			// Hide wrong changes
			if(gca_overview.doll != id){
				document.getElementById("task1").style.display = "none";
				document.getElementById("task2").style.display = "none";
				document.getElementById("task3").style.display = "none";
			}
		},

		// Get info
		getInfo : function(){
			// If already loaded
			if(this.list) return;

			// Get types
			this.types.tank = JSON.parse(document.getElementById("task1").dataset.tooltip)[0][0][0];
			this.types.dps = JSON.parse(document.getElementById("task2").dataset.tooltip)[0][0][0];
			this.types.healer = JSON.parse(document.getElementById("task3").dataset.tooltip)[0][0][0];

			// Dolls
			var dolls = document.getElementsByClassName("charmercsel");
			// Info list
			this.list = [];

			// For each doll
			for (let i = 1; i < dolls.length; i++) {
				// Mercenary
				let info = {};
				// Get pic
				let pic = dolls[i].getElementsByClassName("charmercpic")[0];
				// If player exist
				if(pic.className.match("doll") != null){
					// Get info
					info.id = parseInt(pic.className.match(/doll(\d+)/)[1], 10);
					info.tooltip = JSON.parse(pic.dataset.tooltip);
					info.name = info.tooltip[0][0][0].match(/([^<]*)</)[1];
					info.typeText = info.tooltip[0][0][0].match(/>([^<]*)<\/font>/)[1];

					if(info.typeText.match(this.types.tank) != null){
						info.type = 1;
					}
					else if(info.typeText.match(this.types.dps) != null){
						info.type = 2;
					}
					else if(info.typeText.match(this.types.healer) != null){
						info.type = 3;
					}
					else {
						info.type = 0;
					}

					this.list.push(info);
				}
			}
		},

		// Mercenaries show tooltip
		showTooltip : function(){
			var tooltip = [[]];

			// Name
			tooltip[0].push([
				document.getElementsByClassName("playername")[0].textContent.replace(/^\s*|\s*$/g,""),
				"white;width:120px;"
			]);
			// Life points
			tooltip[0].push([
				document.getElementById("char_leben_tt").getElementsByClassName("charstats_text")[0].textContent + ": " +
				JSON.parse(document.getElementById("char_leben_tt").dataset.tooltip)[0][0][0][1].match(/\d+ \/ (\d+)/)[1],
				"#BA9700"
			]);
			// Strength
			tooltip[0].push([
				document.getElementById("char_f0_tt").getElementsByClassName("charstats_text")[0].textContent + ": " +
				JSON.parse(document.getElementById("char_f0_tt").dataset.tooltip)[0][1][0][1],
				"#BA9700"
			]);
			// Dexterity
			tooltip[0].push([
				document.getElementById("char_f1_tt").getElementsByClassName("charstats_text")[0].textContent + ": " +
				JSON.parse(document.getElementById("char_f1_tt").dataset.tooltip)[0][1][0][1],
				"#BA9700"
			]);
			// Agility
			tooltip[0].push([
				document.getElementById("char_f2_tt").getElementsByClassName("charstats_text")[0].textContent + ": " +
				JSON.parse(document.getElementById("char_f2_tt").dataset.tooltip)[0][1][0][1],
				"#BA9700"
			]);
			// Constitution
			tooltip[0].push([
				document.getElementById("char_f3_tt").getElementsByClassName("charstats_text")[0].textContent + ": " +
				JSON.parse(document.getElementById("char_f3_tt").dataset.tooltip)[0][1][0][1],
				"#BA9700"
			]);
			// Charisma
			tooltip[0].push([
				document.getElementById("char_f4_tt").getElementsByClassName("charstats_text")[0].textContent + ": " +
				JSON.parse(document.getElementById("char_f4_tt").dataset.tooltip)[0][1][0][1],
				"#BA9700"
			]);
			// Intelligence
			tooltip[0].push([
				document.getElementById("char_f5_tt").getElementsByClassName("charstats_text")[0].textContent + ": " +
				JSON.parse(document.getElementById("char_f5_tt").dataset.tooltip)[0][1][0][1],
				"#BA9700"
			]);
			// Level
			tooltip[0].push([
				document.getElementById("char_level_tt").getElementsByClassName("charstats_value21")[0].textContent + ": " +
				document.getElementById("char_level").textContent,
				"#808080"
			]);

			// Create item icon
			var wrapper = document.createElement("div");
			wrapper.className = "single_char_item_bg mercenary_slot_bg";
			var item = document.createElement("div");
			item.className = "item-i-15-5";
			wrapper.appendChild(item);
			document.getElementById("char").appendChild(wrapper);

			// Apply tooltip
			gca_tools.setTooltip(item, JSON.stringify(tooltip));
		}

	},

	// Show analyzed items
	analyzeItems : {
		show : function(self) {
			var stats = self.analyzeItemsData;
			for (let name in stats) {
				if (stats.hasOwnProperty(name)) {
					this.statShow(stats[name]);
				}
			}
		},

		// Show data for stat
		statShow : function(stat){
			// Get tooltip
			var tooltip = document.getElementById(stat.id).dataset.tooltip;
			tooltip = JSON.parse(tooltip);

			// Get basics values
			var basics = tooltip[0][1][0][1];
			//var max = tooltip[0][2][0][1];

			// Calculate point from percents
			var percentsPoints = 0;
			for (var i = stat.percents.length - 1; i >= 0; i--) {
				percentsPoints += Math.round(basics * (stat.percents[i]/100));
			}
			var totalPoits = stat.sum.values + percentsPoints;

			// Create points string
			var points = "" +
				((stat.sum.values >= 0)?"+":"") + stat.sum.values + " " +
				((stat.sum.percents >= 0)?"+":"") + stat.sum.percents + "% " +
				"(" + ((percentsPoints >= 0)?"+":"") + percentsPoints + ")" + " " +
				"= " + ((totalPoits >= 0)?"+":"") + totalPoits;

			// Add data to the tooltip
			tooltip[0].splice(4, 0, [["","&#x27A4; " + points],["#DDDDDD","#DDDDDD"]]);

			// Set tooltip
			gca_tools.setTooltip(
				document.getElementById(stat.id),
				JSON.stringify(tooltip)
			);
		}
	},

	// On double click item to consume it
	doubleClickToConsume : {

		init : function(){
			// Add event
			gca_tools.event.bag.onBagOpen(() => {
				this.apply();
			});

			// If bag not already loaded
			if (document.getElementById('inv').className.match('unavailable')) {
				// Wait first bag
				gca_tools.event.bag.waitBag(() => {
					this.apply();
				});
			}
			else {
				this.apply();
			}
		},
		apply : function(){
			// For each
			jQuery("#inv .ui-draggable").each((i, item) => {
				// If already parsed
				if (item.dataset.gcaFlag_doubleClickConsumeEvent) return;
				// If not consumable
				let type = item.dataset.basis.split('-');
				if (!['7', '11', '21'].includes(type[0])) return;
				// Flag as parsed
				item.dataset.gcaFlag_doubleClickConsumeEvent = true;
				// Add event
				item.addListener('dblclick', this.handler);
			});
		},
		handler : function() {
			gca_tools.item.move(this, 'avatar');
		}
	},

	// Check if dirty player
	dirtyCheck : function() {
		if (gca_tools.easter_eggs.isDirty()) {
			let name = document.getElementsByClassName('playername');
			if (!name.length) name = document.getElementsByClassName('playername_achievement');
			if (name.length) name[0].textContent = [...name[0].textContent].reverse().join("");
		}
	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_overview.inject();
	};
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
