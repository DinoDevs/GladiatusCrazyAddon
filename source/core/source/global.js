/*
 * Addon Global Script
 * Author: DarkThanos, GreatApo
 */

// Global
var gca_global = {
	// Pre Inject code
	preinject : function(){
		// If Event bar was active
		(gca_data.section.get("cache", "event_bar_active", 0) && (gca_options.bool("global","shortcuts_bar") || gca_options.bool("global","auction_status_bar") || gca_options.bool("global","extended_hp_xp_info")) &&
			this.display.event_bar_move.preload());
		// If submenu click to change
		(gca_options.bool("global","submenu_click_to_change") && 
			this.display.advanced_main_menu.submenuClickToChangeTab.preload());
		// If x-scroll
		(gca_options.bool("global","x_scroll") && 
			this.display.xScrollFix());
		// If Item shadow
		(gca_options.bool("global","item_shadow") && 
			this.display.itemShadow.preload());
		// If Inventory options group
		(gca_options.bool("global","inventory_options_group") &&
			this.display.inventoryOptionsGroup.preload());
	},
	// Inject Code
	inject : function(){

		// Resolve Game Modes
		this.gameModeResolve();
		// Resolve Page direction
		this.pageDirectionResolve();

		// Display gca version on footer
		this.display.version();

		// Extended info on Health and Experience bars
		(gca_options.bool("global","extended_hp_xp_info") && 
			this.display.extended_hp_xp.info());
		// Minutes left for full life
		(gca_options.bool("global","hp_timer_for_full_life") && 
			this.display.extended_hp_xp.timerForFullLife());
		
		// Buttons' main bar
		(gca_options.bool("global","shortcuts_bar") &&
			this.display.shortcuts_bar.create());

		// Display auction status
		(!this.isTraveling && 
			this.display.auction_status_bar.create());

		// Event bar move
		((gca_options.bool("global","shortcuts_bar") || gca_options.bool("global","auction_status_bar") || gca_options.bool("global","extended_hp_xp_info")) &&
			this.display.event_bar_move.load());

		// Integrate top fixed bar
		(gca_options.bool("global","top_fixed_bar") && 
			this.display.top_fixed_bar.create());

		// Advance main menu
		(gca_options.bool("global","advance_main_menu") && 
			this.display.advanced_main_menu.create());
		// Advance main menu - submenu click to change
		(gca_options.bool("global","submenu_click_to_change") && 
			this.display.advanced_main_menu.submenuClickToChangeTab.apply());

		// Attacked Timers
		(gca_options.bool("global","attacked_timers") &&
			this.display.attacked_timers.inject());

		// Quests Timer
		(!this.isTraveling && gca_options.bool("global","quest_timer") &&
			this.display.quests_timer.inject());

		// Merchants Timer
		(gca_options.bool("global","merchants_timer") &&
			this.display.merchants_timer.inject(this));

		// Inventory options group
		(gca_options.bool("global","inventory_options_group") &&
			this.display.inventoryOptionsGroup.create());

		// Daily Bonus Log
		(gca_options.bool("overview", "daily_bonus_log") && 
			this.background.daily_bonus_log.inject());

		// If Item shadow
		if(gca_options.bool("global","item_shadow")) {
			this.display.itemShadow.inventory();
			this.display.itemShadow.shop();
		}

		// Event Craps Timer
		(!this.isTraveling && this.isEvent.craps && gca_options.bool("events","craps_timer") &&
			this.display.event.craps_timer.inject());

		// Event Server Quest
		(!this.isTraveling && this.isEvent.serverQuest && this.isEvent.bar && gca_options.bool("events","server_quest_timer") &&
			this.display.event.server_quest_timer.inject());

		// Remember merchants' and inventory tabs
		(!this.isTraveling && gca_options.bool("global","remember_tabs") && 
			this.background.remember_tabs.init());

		// Cooldown Sound Notification for missions, dungeons and arenas
		(!this.isTraveling && gca_options.bool("global","cooldown_sound_notifications") && 
			this.background.notify_me.cooldown_sounds.init());


		// Notification : Guild application alert
		(!this.isTraveling && gca_options.bool("global","notify_new_guild_application") && 
			this.background.notify_me.new_guild_application());

		
		// Pray Buf shortcut - TODO clean code
		(this.isInUnderworld && gca_options.bool("global","pray_shorcut") &&
			this.underworld.prayBufShortCut());

		// Browser notifications
		(gca_options.bool("global","browser_notifications") &&
			gca_notifications._browser.init());
		
		// Gold/Exp data TODO
		(gca_options.bool("global","gold_exp_data") &&
			this.background.gold_exp_data.inject());

		// Sound buttons
		(gca_options.bool("sound","enabled") &&
			this.sound.bar());
	},

	// Game Modes Check
	gameModeResolve : function(){
		// Default Values
		this.isTraveling = false;
		this.isInUnderworld = false;

		// Check if traveling
		if(document.getElementById('submenu1') == null){
			this.isTraveling = true;
		}
		// Otherwise Check if is Underwold
		else if(document.getElementById('wrapper_game').className == 'underworld'){
			this.isInUnderworld = true;
		}

		// Check for events
		this.isEvent = {
			craps : false,
			serverQuest : false,
			bar : false
		};

		if(!this.isTraveling){
			// Get first's submenu links
			let links = document.getElementById('submenu1').getElementsByTagName('a');
			// Check for "Dice roll" event
			if(links[0].className.match('glow') && links[0].href.match('mod=craps')){
				this.isEvent.craps = true;
			}
			// Get first's submenu links
			links = document.getElementById('submenu2').getElementsByTagName('a');
			// Check for "Server Bosses" event
			if(links[links.length-1].className.match('glow') && links[links.length-1].href.match('submod=serverQuest')){
				this.isEvent.serverQuest = true;
			}
		}

		if(document.getElementById("banner_event_link")){
			this.isEvent.bar = true;
		}
	},

	// Resolve page direction
	pageDirectionResolve : function(){
		// Check page direction ltr or rtl
		if(
			!document.querySelectorAll('link')[1].getAttribute("href").match("rtl_") && 
			!document.querySelectorAll('link')[2].getAttribute("href").match("rtl_")
		){
			window.gca_rtl = false;
			return;
		}
		// Else its a right to left server
		window.gca_rtl = true;
		document.documentElement.className += " gca_rtl";
	},

	// Display stuf
	display : {
		
		// Display the GCA version on the bottom of the page
		version : function(){
			// Add version on the <html> tag as a class-name
			if(document.documentElement.className.length>0)
				document.documentElement.className += " ";
			document.documentElement.className += gca.shortName + "_v" + gca.version;

			// Check if links on footer exist
			var footerLinks = document.getElementsByClassName("footer_links");
			if(footerLinks.length > 0){
				// Create a gca link
				var link = document.createElement("a");
				link.href = gca.homepage;
				link.setAttribute("target", "_blank");
				link.textContent = gca.shortName + ' v' + gca.version;
				
				// Create a link seperator
				footerLinks[0].appendChild(document.createTextNode(" | "));
				// Insert link
				footerLinks[0].appendChild(link);
			}
		},

		// Extended Health and Experience bars
		extended_hp_xp : {
			// Display More info
			info : function(){
				// Extend HP bar and XP bar, more info
				document.getElementById('header_values_hp').className = "header_values_hp_extend";
				document.getElementById('header_values_xp').className = "header_values_xp_extend";

				// Get HP and XP
				var hp = document.getElementById('header_values_hp_bar').dataset.tooltip.match(/"(\d+) \\\/ (\d+)"/i);
				var xp = document.getElementById('header_values_xp_bar').dataset.tooltip.match(/"(\d+) \\\/ (\d+)"/i);

				// Extend Background
				var div = document.createElement('div');
				div.id = "header_values_hp_xp_background";
				document.getElementById('header_game').appendChild(div);
				
				// Insert HP info
				div = document.createElement('div');
				div.id = "header_values_hp_points";
				var text = document.createElement('span');
				text.textContent = gca_tools.strings.insertDots(hp[1]);
				div.appendChild(text);
				text = document.createTextNode(" / " + gca_tools.strings.insertDots(hp[2]));
				div.appendChild(text);
				document.getElementById('header_values_hp').appendChild(div);
				
				// Insert XP info
				div = document.createElement('div');
				div.id = "header_values_xp_points";
				var text = document.createElement('span');
				text.textContent = gca_tools.strings.insertDots(xp[1]);
				div.appendChild(text);
				text = document.createTextNode(" / " + gca_tools.strings.insertDots(xp[2]));
				div.appendChild(text);
				document.getElementById('header_values_xp').appendChild(div);

				// Display Healing Pot
				(gca_options.bool("global","extended_hp_xp_info_potion") && 
					this.life_potion_shortcut.create());
			},

			// Life Potion Shortcut
			life_potion_shortcut : {
				// Create interface
				create : function(){
					// Create Healing Pot button
					var link = document.createElement('a');
					link.id = "header_life_pot";
					link.dataset.tooltip = JSON.stringify([[['<img style="width:20px;" align="absmiddle" src="img/premium/token/18.jpg"> ' + gca_locale.get("global", "life_potion_use"),"white"]]]);
					
					// On click callback
					var self = this;
					link.addEventListener('click', function(){
						// try to use a Healing Pot
						self.tryToUsePotion();
					}, false);
					
					// Insert button on page
					document.getElementById('header_values_hp').appendChild(link);
				},

				// Try to use a Potion
				using : false,
				tryToUsePotion : function(){
					// Atomicity check
					if(this.using) return;
					this.usageSet(true);

					// Get Potions Number
					var self = this;
					this.getPotionsNumber(function(potions, life){
						self.usePotion(potions, life);
					});
				},
				usageSet : function(lock){
					// Lock/Unlock
					this.using = lock;

					// Display usage
					var link = document.getElementById('header_life_pot');
					if(link)
						link.className = (lock)?"disabled":"";
				},

				usePotion : function(potions, life){
					// Check if life is full
					if(life[0]){
						this.usageSet(false);
						// Report Error
						gca_notifications.warning( JSON.parse(document.getElementById('header_values_hp_bar').dataset.tooltip)[0][0][0][0] + " 100%" );
						return;
					}
					if(potions == 0){
						this.usageSet(false);
						gca_notifications.error(
							gca_locale.get("global", "life_potion_left", {number:0})
						);
						return;
					}

					// Save scope
					var that = this;

					// Use Potion
					var self = this;
					jQuery.get(gca_getPage.link({"mod":"premium","submod":"inventoryActivate","feature":"18","token":potions}), function(content){
						// Get life info
						var life = that.parseLifeFromHtml(content);

						self.usageSet(false);

						// Report success
						gca_notifications.success(
							gca_locale.get("global", "life_potion_used") +
							" (" + (potions-1) + " " + gca_locale.get("global", "life_potion_left", {number: potions-1}) + ")"
						);
						// Update HP
						gca_global.display.extended_hp_xp.updateLife(life[1], life[2]);
					})
					// If Request Failed
					.fail(function(){
						self.usageSet(false);
						// Report Error
						gca_notifications.error(gca_locale.get("general", "error"));
					});
				},

				// Get Potion Number
				getPotionsNumber : function(callback){
					var that = this;
					// Load premium inventory page
					jQuery.get(gca_getPage.link({"mod":"premium","submod":"inventory"}), function(content){
						// Match potion number
						var potions = content.match(/document\.location\.href='index\.php\?mod=premium&submod=inventoryActivate&feature=18&token=(\d+)&sh=/);
						if(potions){
							potions = parseInt(potions[1]);
						}else{
							potions = 0;
						}

						// Get life info
						var life = that.parseLifeFromHtml(content);

						// Update HP
						gca_global.display.extended_hp_xp.updateLife(life[1],life[2]);

						// Return result
						callback(potions, life);
					});
				},

				parseLifeFromHtml : function(html){
					// Get life info
					var life = html.match(/<div\s+id="header_values_hp_bar"\s+class="header_values_bar"\s+data-max-value="(\d+)"\s+data-value="(\d+)"\s+data-regen-per-hour="(\d+)"/m);

					// If not found
					if(!life){
						life = [0, 0, 0];
					}

					var info = [parseInt(life[1]), parseInt(life[2]), parseInt(life[3])];
					// Push infrond true/false if life is full/notfull
					info.unshift( info[0] == info[1] );

					// Return life info
					return info;
				}
			},

			// Update HP
			updateLife : function(hp, maxhp){
				var div;
				// Update HP info
				if(document.getElementById('header_values_hp_points')){
					div = document.getElementById('header_values_hp_points');
					div.textContent = "";
					var text = document.createElement('span');
					text.textContent = hp;
					div.appendChild(text);
					text = document.createTextNode(" / " + maxhp);
					div.appendChild(text);
				}
				// Update HP bar
				document.getElementById('header_values_hp_bar_fill').style.width = Math.round((hp*100)/maxhp) + "%";
				// Update Tooltip
				div = document.getElementById('header_values_hp_bar');
				if(div){
					var lifeTooltip = JSON.parse(div.dataset.tooltip);
					lifeTooltip[0][0][0][1] = hp + " / " + maxhp;
					// Remove Timer for Full Life
					if(lifeTooltip[0].length >= 14){
						lifeTooltip[0].pop();
					}
					gca_tools.setTooltip(div, JSON.stringify(lifeTooltip));
					// Update Timer for Full Life
					if(gca_options.bool("global","hp_timer_for_full_life")){
						this.timerForFullLife();
					}
				}

				return;
			},

			// Timer for full life
			timerForFullLife : function(){
				// Life tooltip div
				var div = document.getElementById('header_values_hp_bar');
				// Get tooltip
				var lifeTooltip = JSON.parse(document.getElementById('header_values_hp_bar').dataset.tooltip);
				// Get Life Points
				var hp = lifeTooltip[0][0][0][1].match(/(\d+)\s+\/\s+(\d+)/);
				// Return if life is full
				if(hp[1] == hp[2]) return;
				// Get Life Points restore rate
				var restore = parseInt(lifeTooltip[0][5][0][1].match(/(\d+)/)[1]);

				// Calculate minites left to full life
				var minites_left = Math.ceil(((parseInt(hp[2]) - parseInt(hp[1])) * 60) / restore);
				// Return if 0 minites
				if(minites_left <= 0) return;
				// Add data on the tooltip
				lifeTooltip[0].push([[gca_locale.get("global", "life_recover_full"), minites_left + " " + gca_locale.get("general", "minutes")], ["#BA9700","#BA9700"]]);
				gca_tools.setTooltip(div, JSON.stringify(lifeTooltip));
			}
		},

		// Shortcuts Buttons Bar
		shortcuts_bar : {
			create : function(){
				// Make a button bar with icon-links
				var shortcutsBar = document.createElement('div');
				shortcutsBar.id = "gca_shortcuts_bar";

				// Move bar if there is a space
				if(!gca_options.bool("global","extended_hp_xp_info"))
					shortcutsBar.className = "noExtendedHpXpInfo";

				// Get active buttons (ex 'msg|gmd' means message and guild medic)
				var activeButtons = gca_options.get("global","shortcuts_bar_buttons");
				if(activeButtons){
					activeButtons.split('|');
				}
				else{
					activeButtons = [];
				}

				// Temporary Variables
				var button, link;

				// If player has no Guild
				if(false && !gca_data.section.get("guild", "inGuild", false)){
					// Create a "Sent Private message" button
					if(activeButtons.indexOf("msg") >= 0){
						button = document.createElement('div');
						button.className = "icon-out";
						link = document.createElement('a');
						link.className = "icon message-icon";
						link.href = gca_getPage.link({"mod":"messages","submod":"messageNew"});
						link.title = gca_locale.get("global", "message_private_write");
						button.appendChild(link);
						shortcutsBar.appendChild(button);
					}
				}

				// If player has Guild
				else{

					// Create "Sent guild message" button
					if(activeButtons.indexOf("msg") >= 0){
						let instant_message_div = document.createElement('div');
						instant_message_div.className = "instant_message_div instant";
						instant_message_div.style.display = "none";
						// Create Extended Layout to sent message
						{
							let div = document.createElement('div');
							div.className = "hover_box";

							let temp = document.createElement('i');
							temp.textContent = gca_locale.get("global", "message_guild_write") + ":";
							div.appendChild(temp);

							temp = document.createElement('br');
							div.appendChild(temp);

							let textareaDiv = document.createElement('div');
							textareaDiv.className = "textarea_wrapper";
							div.appendChild(textareaDiv);

							let loading = document.createElement('div');
							loading.className = "loading";
							textareaDiv.appendChild(loading);

							let instant_message_textarea = document.createElement('textarea');
							instant_message_textarea.dataset.sendGuildMessage = "true";
							textareaDiv.appendChild(instant_message_textarea);

							temp = document.createElement('input');
							temp.type = "button";
							temp.className = "button1";
							temp.value = gca_locale.get("global", "message_send");
							temp.addEventListener('click', function(){
								// Get message
								var msg = instant_message_textarea.value;
								// Get exclude me data
								var exclude_me = (document.getElementById('qgm_exclude_me').checked) ? true : false;

								// Dont send small messages
								if(msg.length == 0) return;

								// Disable message
								loading.style.display = "block";
								// Send message
								var send = gca_global.background.guildMessage.send(instant_message_textarea.value, exclude_me, function(ok){
									// Eanble messages
									loading.style.display = "none";
									if(ok){
										instant_message_textarea.value = "";
										gca_notifications.success(gca_locale.get("global", "message_sent_success"));
									}else{
										gca_notifications.error(gca_locale.get("global", "message_sent_failed"));
									}
								});
								if(!send){
									gca_notifications.error(gca_locale.get("global", "no_data"));
								}
							}, false);
							div.appendChild(temp);

							temp = document.createElement('input');
							temp.type = "checkbox";
							temp.id = "qgm_exclude_me";
							div.appendChild(temp);

							temp = document.createElement('label');
							temp.setAttribute("for", "qgm_exclude_me");
							temp.id = "qgm_exclude_me";
							temp.textContent = gca_locale.get("global", "message_exclude_me");
							div.appendChild(temp);
							
							instant_message_div.appendChild(div);
						}

						// Create Button layout
						button = document.createElement('div');
						button.className = 'icon-out';

						link = document.createElement('a');
						link.className = 'icon message-icon';
						link.href = gca_getPage.link({"mod":"guild","submod":"adminMail"});
						link.title = gca_locale.get("global", "message_guild_write");

						button.appendChild(link);
						button.appendChild(instant_message_div);
						shortcutsBar.appendChild(button);

						button.addEventListener('mouseover', function(){
							jQuery(instant_message_div).stop().fadeIn("fast");
						}, false);
						button.addEventListener('mouseout', function(){
							if(document.activeElement.dataset.sendGuildMessage != "true")
								jQuery(instant_message_div).stop().fadeOut("fast");
						}, false);
					}
					
					// Links not During traveling
					if( !gca_global.isTraveling ){

						// Create a Link to guild's medical center
						if(activeButtons.indexOf("gmd") >= 0){
							button = document.createElement('div');
							button.className = "icon-out";
							link = document.createElement('a');
							link.className = "icon cross-icon";
							link.href = gca_getPage.link({"mod":"guild_medic"});
							link.title = gca_locale.get("global", "message_guild_write");
							button.appendChild(link);
							shortcutsBar.appendChild(button);
						}
						
						// Create a Link to guild's market
						if(activeButtons.indexOf("gmr") >= 0){
							button = document.createElement('div');
							button.className = "icon-out";
							link = document.createElement('a');
							link.className = "icon market-icon";
							link.href = gca_getPage.link({"mod":"guildMarket"});
							link.title = gca_locale.get("global", "guild_market_goto");
							button.appendChild(link);
							shortcutsBar.appendChild(button);
						}
						
						// Create a Link to guild's storage
						if(activeButtons.indexOf("gst") >= 0){
							button = document.createElement('div');
							button.className = "icon-out";
							link = document.createElement('a');
							link.className = "icon box-icon";
							link.href = gca_getPage.link({"mod":"guildStorage"});
							link.title = gca_locale.get("global", "guild_storage_goto");
							button.appendChild(link);
							shortcutsBar.appendChild(button);
						}
						
						// Create a Link to guild's bank
						if(activeButtons.indexOf("gbn") >= 0){
							let instant_donate_gold = document.createElement('div');
							instant_donate_gold.className = "instant_message_div instant";
							instant_donate_gold.style.display = "none";
							let div = document.createElement('div');
							div.className = "hover_box";
							let input = document.createElement('input');
							input.type = "button";
							input.id = "donate_all_button";
							input.className = "button1";
							input.value = gca_locale.get("global", "donate_gold_all_gold");
							input.addEventListener('click', function(){
								gca_global.display.shortcuts_bar.donate_gold.check();
							}, false);
							div.appendChild(input);
							instant_donate_gold.appendChild(div);

							button = document.createElement('div');
							button.className = "icon-out";
							link = document.createElement('a');
							link.className = "icon gold-icon";
							link.href = gca_getPage.link({"mod":"guildBankingHouse"});
							link.title = gca_locale.get("global", "guild_bank_goto");
							button.appendChild(link);
							button.appendChild(instant_donate_gold);
							shortcutsBar.appendChild(button);

							button.addEventListener('mouseover', function(){
								jQuery(instant_donate_gold).stop().fadeIn("fast");
							}, false);
							button.addEventListener('mouseout', function(){
								jQuery(instant_donate_gold).stop().fadeOut("fast");
							}, false);
						}
						
						// Create a Link to guild's war camp
						if(activeButtons.indexOf("gwr") >= 0){
							button = document.createElement('div');
							button.className = "icon-out";
							link = document.createElement('a');
							link.className = "icon report-icon";
							link.href = gca_getPage.link({"mod":"guild_warcamp"});
							link.title = gca_locale.get("global", "guild_warcamp_goto");
							button.appendChild(link);
							shortcutsBar.appendChild(button);
						}
						
						// Create a Link to guild's jail
						if(activeButtons.indexOf("gjl") >= 0){
							button = document.createElement('div');
							button.className = "icon-out";
							link = document.createElement('a');
							link.className = "icon castle-icon";
							link.href = gca_getPage.link({"mod":"guild_jail"});
							link.title = gca_locale.get("global", "guild_jail_goto");
							button.appendChild(link);
							shortcutsBar.appendChild(button);
						}
						
						// Create a Link to guild's library
						if(activeButtons.indexOf("glb") >= 0){
							button = document.createElement('div');
							button.className = "icon-out";
							link = document.createElement('a');
							link.className = "icon notebook-icon";
							link.href = gca_getPage.link({"mod":"guildLibrary"});
							link.title = gca_locale.get("global", "guild_library_goto");
							button.appendChild(link);
							shortcutsBar.appendChild(button);
						}

					}
				}

				// Link to the simulator page
				if(activeButtons.indexOf("sim") >= 0){
					button = document.createElement('div');
					button.className = "icon-out";
					link = document.createElement('a');
					link.className = "icon swords-icon";
					link.href = 'http://gladiatussimulator.tk/';
					link.title = gca_locale.get("global", "simulator_goto");
					link.setAttribute("target", "_blank");
					button.appendChild(link);
					shortcutsBar.appendChild(button);
				}
				
				// Display your player stats
				if(activeButtons.indexOf("stt") >= 0){
					let table_wrapper = document.createElement("div");
					table_wrapper.className = "hover_box";
					let statsHtmlTable = document.createElement("table");
					statsHtmlTable.id = "gca_player_stats_table";

					let show_stats = document.createElement('div');
					show_stats.className = "instant";
					show_stats.id = "gca_player_stats";
					show_stats.style.display = "none";
					show_stats.appendChild(table_wrapper);
					table_wrapper.appendChild(statsHtmlTable);

					// Refresh button
					link = document.createElement('a');
					link.className = "gca-icon refresh-icon";
					link.addEventListener('click', function(){
						gca_global.display.shortcuts_bar.playerStats.refresh();
					}, false);
					table_wrapper.appendChild(link);
					// Refresh spacer
					let spacer = document.createElement('div');
					spacer.style.height = "26px";
					table_wrapper.appendChild(spacer);
					
					// Shotcut button
					button = document.createElement('div');
					button.className = "icon-out";
					link = document.createElement('a');
					link.className = "icon people-icon";
					link.title = gca_locale.get("global", "stats_display");
					button.appendChild(link);
					button.appendChild(show_stats);
					shortcutsBar.appendChild(button);

					link.addEventListener('click', function(){
						gca_global.display.shortcuts_bar.playerStats.create();
						jQuery(show_stats).fadeToggle();
					}, false);
				}
				
				// Display Online Players
				if(activeButtons.indexOf("onl") >= 0){
					button = document.createElement('div');
					button.className = "icon-out";
					link = document.createElement('a');
					link.className = "icon online-icon";
					link.title = gca_locale.get("global", "online_display");
					button.appendChild(link);
					shortcutsBar.appendChild(button);

					button.addEventListener('click', function(){
						gca_global.display.shortcuts_bar.online_friends.open();
					}, false);
				}

				document.getElementById('header_game').appendChild(shortcutsBar);
			},

			// Hide/Display Online Friends
			online_friends : {
				// Online Friends Dialog
				dialog : false,

				// Open Dialog
				open : function(){
					if(!this.dialog){
						// Create a dialog
						var dialog = new gca_build.dialog;
						dialog.smallHead(true);
						dialog.title.textContent = gca_locale.get("global", "online_friends");

						// Temp elements variables
						var table, tr, td, div, span;

						// Headers
						table = document.createElement('table');
						table.className = "online_friends_table";
						tr = document.createElement('tr');
						td = document.createElement('td');
						td.setAttribute("width", "50%");
						td.textContent = gca_locale.get("global", "guild_friends") + " ";
						span = document.createElement('span');
						span.id = "online_friends_guild_counter";
						td.appendChild(span);
						tr.appendChild(td);
						td = document.createElement('td');
						td.setAttribute("width", "50%");
						td.textContent = gca_locale.get("global", "family_friends") + " ";
						span = document.createElement('span');
						span.id = "online_friends_family_counter";
						td.appendChild(span);
						tr.appendChild(td);
						table.appendChild(tr);
						dialog.body.appendChild(table);

						// Loading
						table = document.createElement('table');
						table.className = "online_friends_table";
						tr = document.createElement('tr');
						td = document.createElement('td');
						td.setAttribute("width", "50%");
						div = document.createElement('div');
						div.id = "online_guild_friends";
						div.style.textAlign = "left";
						td.appendChild(div);
						tr.appendChild(td);
						td = document.createElement('td');
						td.setAttribute("width", "50%");
						div = document.createElement('div');
						div.id = "online_family_friends";
						div.style.textAlign = "left";
						td.appendChild(div);
						tr.appendChild(td);
						table.appendChild(tr);
						dialog.body.appendChild(table);

						// Add some space
						div = document.createElement('div');
						div.className = "space";
						dialog.body.appendChild(div);

						// Save dialog variable
						this.dialog = dialog;

						// Add refresh Button
						var button = document.createElement('a');
						button.className = "gca-icon refresh-icon";
						button.style.marginRight = "10px";
						dialog.body.appendChild(button);

						button.addEventListener('click', function(){
							gca_global.display.shortcuts_bar.online_friends.refresh();
						}, false);

						// Add close Button
						var button = document.createElement('input');
						button.className = "button3";
						button.type = "button";
						button.value = gca_locale.get("general", "close");
						dialog.body.appendChild(button);

						button.addEventListener('click', function(){
							dialog.close();
						}, false);
					}

					// Refresh Dialog
					this.refresh();
					// Display Dialog
					this.dialog.open();
				},

				// Refresh
				refresh : function(){
					// If dialog is open
					if(!this.dialog || !document.getElementById('online_guild_friends') || !document.getElementById('online_family_friends'))
						return;

					// Clear Lists
					document.getElementById('online_guild_friends').textContent = "";
					document.getElementById('online_family_friends').textContent = "";
					document.getElementById("online_friends_guild_counter").textContent = "";
					document.getElementById("online_friends_family_counter").textContent = "";
					// Display loading
					document.getElementById('online_guild_friends').className = "online_friends_loading_img loading";
					document.getElementById('online_family_friends').className = "online_friends_loading_img loading";

					// Get online guild memebers
					jQuery.get(gca_getPage.link({"mod":"guild","submod":"memberList","order":"o"}), function(content){
						// Match All active players
						var online_players = content.match(/<tr>\s*<td>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+">([^<]+)<\/a>\s*<\/td>\s*<td>([^<]+)<\/td>\s*<td>(\d+)<\/td>\s*<td align="right">\s*[^<]*(<span[^>]*>[^<]*<\/span>|)\s*<\/td>\s*<td align="right"><span style="color: (green|#406000|#804000);[^"]*" title="on">([^<]*)</mg);
						
						// Check if you are on a guild
						if(!online_players && content.match(/<form\s+action="index.php\?mod=guild&submod=create&sh=/i)){
							// Save that you are not on guild
							if(gca_data.section.get("guild", "inGuild", false)){
								gca_data.section.set("guild", "inGuild", false);
								gca_data.section.del("guild", "mates");
							}
						}
						// You are in a guild, so update guild data
						else{
							let guild_players_data = content.match(/<tr>\s*<td>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+">([^<]+)<\/a>\s*<\/td>\s*<td>([^<]+)<\/td>\s*<td>(\d+)<\/td>\s*<td align="right">\s*[^<]*(<span[^>]*>[^<]*<\/span>|)\s*<\/td>\s*<td align="right"><span style="color:[^>]+>([^<]*)</mg);
							let guild_players = [];

							// For each player
							for (let i = 0; i < guild_players_data.length; i++){
								// Match player's info
								let player = guild_players_data[i].match(/<tr>\s*<td>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+">([^<]+)<\/a>\s*<\/td>\s*<td>([^<]+)<\/td>\s*<td>(\d+)<\/td>\s*<td align="right">\s*[^<]*(<span[^>]*>[^<]*<\/span>|)\s*<\/td>\s*<td align="right"><span style="color:[^>]+>([^<]*)</mi);
								let player_info = {
									id : player[1],
									name : player[2],
									rank : player[3],
									level : player[4]
								};
								player_info.name = gca_tools.strings.trim(player_info.name);
								player_info.rank = gca_tools.strings.trim(player_info.rank);
								// Update guild players
								guild_players.push(player_info);
							}

							// If guild players, update them
							if(guild_players.length > 0){
								// Update guild data
								gca_data.section.set("guild", "inGuild", true);
								gca_data.section.set("guild", "mates", guild_players);
							}
						}

						// If no players found
						if(!online_players){
							online_players = [];
						}
						

						// List with parsed players info
						var player_list = [];
						// For each player
						for (let i = 0; i < online_players.length; i++){
							// Match player's info
							let player = online_players[i].match(/<tr>\s*<td>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+">([^<]+)<\/a>\s*<\/td>\s*<td>([^<]+)<\/td>\s*<td>(\d+)<\/td>\s*<td align="right">\s*[^<]*(<span[^>]*>[^<]*<\/span>|)\s*<\/td>\s*<td align="right"><span style="color: (green|#406000|#804000);[^"]*" title="on">([^<]*)</mi);
							let player_info = {
								id : player[1],
								name : player[2],
								rank : player[3],
								level : player[4],
								color : player[6],
								time : player[7]
							};
							player_info.name = gca_tools.strings.trim(player_info.name);
							player_info.rank = gca_tools.strings.trim(player_info.rank);

							// If not This player, add him to the list
							if(player_info.id != gca_section.playerId)
								player_list.push(player_info);
						}

						var parent = document.getElementById('online_guild_friends');
						var countElement = document.getElementById("online_friends_guild_counter");
						// Remove loading
						parent.removeAttribute('class');
						// If no players online
						if(player_list.length == 0){
							var noPlayers = document.createElement('div');
							noPlayers.style.textAlign = "center";
							noPlayers.textContent = "-";
							parent.appendChild(noPlayers);
							countElement.textContent = "";
							parent.parentNode.setAttribute('style','vertical-align:middle;');
						}
						// If many players found
						else{
							// If too many players found
							if(player_list.length >= 10){
								parent.setAttribute('style','text-align:left;overflow:auto;height:200px;');
							}else{
								parent.setAttribute('style','text-align:left;');

							}
							parent.parentNode.setAttribute('style','vertical-align:top;');
							// For each player
							for (let i = 0; i < player_list.length; i++){
								let sentMsg = document.createElement('a');
								sentMsg.className = "private-message-icon";
								sentMsg.href = gca_getPage.link({"mod":"messages","submod":"messageNew","profileName":player_list[i].name});
								parent.appendChild(sentMsg);
								let bull = document.createElement('font');
								bull.setAttribute("color", player_list[i].color);
								bull.textContent = "\u2022";
								parent.appendChild(bull);
								parent.appendChild( document.createTextNode(' ') );
								let name = document.createElement('a');
								name.href = gca_getPage.link({"mod":"player","p":player_list[i].id});
								name.style.color = "black";
								name.style.fontFamily = "century gothic";
								name.dataset.tooltip = '[[["Test","white"]]]';
								name.textContent = player_list[i].name;
								name.title = player_list[i].time;
								parent.appendChild(name);
								parent.appendChild( document.createTextNode(' ') );
								let info = document.createElement('span');
								info.style.fontSize = "0.8em";
								info.style.color = "#525252";
								info.textContent = "[lv" + player_list[i].level + " - " + player_list[i].rank + "]";
								parent.appendChild(info);
								parent.appendChild( document.createElement('br') );
							}
							countElement.textContent = "(" + player_list.length + ")";
						}
					});
					
					// Get online family memebers
					jQuery.get(gca_getPage.link({"mod":"overview","submod":"buddylist"}), function(content){
						// Match All active players
						var online_players = content.match(/<tr>\s*<td[^>]*>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+"[^>]*>([^<]+)<\/a>\s*<\/td>\s*<td><a href="index\.php\?mod=guild&i=(\d+)&sh=[^"]+"[^>]*>\s*\[([^\]]+)\]\s*<\/a><\/td>\s*<td>(\d+)<\/td>\s*<td><span style="color: (green|#406000|#804000);[^"]*" title="on">([^<]*)</mg);
						if(!online_players) online_players = [];
						// List with parsed players info
						var player_list = [];
						// For each player
						for (let i = 0; i < online_players.length; i++){
							// Match player's info
							let player = online_players[i].match(/<tr>\s*<td[^>]*>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+"[^>]*>([^<]+)<\/a>\s*<\/td>\s*<td><a href="index\.php\?mod=guild&i=(\d+)&sh=[^"]+"[^>]*>\s*\[([^\]]+)\]\s*<\/a><\/td>\s*<td>(\d+)<\/td>\s*<td><span style="color: (green|#406000|#804000);[^"]*" title="on">([^<]*)</mi);
							let player_info = {
								id : player[1],
								name : player[2],
								guild : {
									id : player[3],
									name : player[4]
								},
								level : player[5],
								color : player[6],
								time : player[7]
							};
							player_info.name = gca_tools.strings.trim(player_info.name);
							player_info.guild.name = gca_tools.strings.trim(player_info.guild.name);

							player_list.push(player_info);
						}

						var parent = document.getElementById('online_family_friends');
						var countElement = document.getElementById("online_friends_family_counter");
						// Remove loading
						parent.removeAttribute('class');
						// If no players online
						if(player_list.length == 0){
							var noPlayers = document.createElement('div');
							noPlayers.style.textAlign = "center";
							noPlayers.textContent = "-";
							parent.appendChild(noPlayers);
							countElement.textContent = "";
							parent.parentNode.setAttribute('style','vertical-align:middle;');
						}
						// If many players found
						else{
							// If too many players found
							if(player_list.length >= 10){
								parent.setAttribute('style','text-align:left;overflow:auto;height:200px;');
							}else{
								parent.setAttribute('style','text-align:left;');
							}
							parent.parentNode.setAttribute('style','vertical-align:top;');
							// For each player
							for (let i = 0; i < player_list.length; i++){
								let sentMsg = document.createElement('a');
								sentMsg.className = "private-message-icon";
								sentMsg.href = gca_getPage.link({"mod":"messages","submod":"messageNew","profileName":player_list[i].name});
								parent.appendChild(sentMsg);
								let bull = document.createElement('font');
								bull.setAttribute("color", player_list[i].color);
								bull.textContent = "\u2022";
								parent.appendChild(bull);
								parent.appendChild( document.createTextNode(' ') );
								let name = document.createElement('a');
								name.href = gca_getPage.link({"mod":"player","p":player_list[i].id});
								name.style.color = "black";
								name.style.fontFamily = "century gothic";
								name.dataset.tooltip = '[[["Test","white"]]]';
								name.textContent = player_list[i].name;
								name.title = player_list[i].time;
								parent.appendChild(name);
								parent.appendChild( document.createTextNode(' ') );
								let info = document.createElement('span');
								info.style.fontSize = "0.8em";
								info.style.color = "#525252";
								info.appendChild( document.createTextNode("[lv" + player_list[i].level + " - ") );
								let guild = document.createElement('a');
								guild.href = gca_getPage.link({"mod":"guild","submod":"forumGladiatorius","i":player_list[i].guild.id});
								guild.style.color = "#525252";
								guild.textContent = player_list[i].guild.name;
								info.appendChild(guild);
								info.appendChild( document.createTextNode("]") );
								parent.appendChild(info);
								parent.appendChild( document.createElement('br') );
							}
							countElement.textContent = "(" + player_list.length + ")";
						}
					});
				}
			},

			// Donate All button
			donate_gold : {

				// Create confirm modal
				check : function(){
					// Get gold with dots
					var gold_txt = gca_tools.strings.trim(document.getElementById('sstat_gold_val').textContent);
					// Parse gold in number
					var gold = parseInt(gca_tools.strings.removeDots(gold_txt));
					
					// If no gold or parse failed
					if(gold == 0 || isNaN(gold)){
						// Show warning
						gca_notifications.warning(gca_locale.get("global", "donate_gold_no_gold"));
						return;
					}

					var that = this;
					// Create confirm modal
					var modal = new gca_tools.Modal(
						gca_locale.get("global", "donate_gold_all_gold"),
						null,
						function(){
							that.donate(gold);
							modal.destroy();
						},
						function(){
							modal.destroy();
						}
					);
					modal.body(gca_locale.get("global", "donate_gold_confirm", {number : gold_txt}));
					modal.button(gca_locale.get("general", "confirm"), true);
					modal.button(gca_locale.get("general", "cancel"), false);
					modal.show();
				},

				// Donate gold
				donate : function(gold){
					if(gold == 0)
						gca_notifications.warning( gca_locale.get("global", "donate_gold_no_gold") );

					// Clear Gold
					document.getElementById('sstat_gold_val').textContent = "";
					// Display Loading
					var loading = document.createElement('div');
					loading.className = "loading";
					loading.marginTop = "6px";
					loading.opacity = "0.8";
					document.getElementById('sstat_gold_val').appendChild(loading);

					// Post to the server
					jQuery.ajax({
						type: "POST",
						url: gca_getPage.link({"mod":"guildBankingHouse","submod":"donate"}),
						data: 'donation=' + gold + '&doDonation=Donate All',
						success: function(){
							document.getElementById('sstat_gold_val').textContent = 0;
							gca_notifications.success(gca_locale.get("global", "donate_gold_success"));
						},
						error: function(){
							document.getElementById('sstat_gold_val').textContent = gca_tools.strings.insertDots(gold);
							gca_notifications.error(gca_locale.get("global", "donate_gold_failed"));
						}
					});
				}

			},

			// Player stats
			playerStats : {
				// Create table with stats
				create : function(){
					// Get stats
					var stats = gca_data.section.get("stats", "player", false);
					// Clear table
					var statsHtmlTable = document.getElementById("gca_player_stats_table");
					statsHtmlTable.innerHTML = "";

					var tr, td;
					// If stats are saved
					if(stats){
						let attributes = [
							"strength",
							"dexterity",
							"agility",
							"constitution",
							"charisma",
							"intelligence",
							"armour",
							"damage"
						];

						for(var i = 0; i < attributes.length; i++){
							tr = document.createElement("tr");
							td = document.createElement("td");
							td.textContent = stats[attributes[i]][0];
							tr.appendChild(td);
							td = document.createElement("td");
							td.textContent = ":";
							tr.appendChild(td);
							td = document.createElement("td");
							td.className = "cssAlign";
							td.textContent = stats[attributes[i]][1];
							tr.appendChild(td);
							statsHtmlTable.appendChild(tr);
						}
					}
					// Stats not saved
					else{
						tr = document.createElement("tr");
						td = document.createElement("td");
						td.textContent = gca_locale.get("general", "no_data");
						tr.appendChild(td);
						statsHtmlTable.appendChild(tr);
					}
				},
				// loading
				loading : false,
				// Refresh data
				refresh : function(){
					// Check if loading
					if(this.loading) return;
					this.loading = true;

					// Clear table
					var statsHtmlTable = document.getElementById("gca_player_stats_table");
					statsHtmlTable.innerHTML = "";

					// Display loading
					var tr = document.createElement("tr");
					var td = document.createElement("td");
					var span = document.createElement("span");
					span.className = "loading";
					td.appendChild(span);
					tr.appendChild(td);
					statsHtmlTable.appendChild(tr);

					// Save instance
					var self = this;

					// Get stats
					this.get(function(stats){
						// Stop loading
						self.loading = false;

						if(stats){
							// Save stats
							gca_data.section.set("stats", "player", {
								strength : [stats.strengthName, stats.strength],
								dexterity : [stats.dexterityName, stats.dexterity],
								agility : [stats.agilityName, stats.agility],
								constitution : [stats.constitutionName, stats.constitution],
								charisma : [stats.charismaName, stats.charisma],
								intelligence : [stats.intelligenceName, stats.intelligence],
								armour : [stats.armourName, stats.armour],
								damage : [stats.damageName, stats.damage],
							});
							// Show stats
							self.create();
						}
						
						else{
							// Error
							statsHtmlTable.innerHTML = "";
							var tr = document.createElement("tr");
							var td = document.createElement("td");
							var span = document.createElement("span");
							span.className = gca_locale.get("general", "error");
							td.appendChild(span);
							tr.appendChild(td);
							statsHtmlTable.appendChild(tr);
						}
					});
				},
				get : function(callback){
					// Get stats from overview
					jQuery.ajax({
						type: "GET",
						url: gca_getPage.link({"mod":"overview"}),
						success: function(content){
							var stats = {};

							var statNamesA = content.match(/<span\s+class="charstats_text"[^>]*>([^<]+)<\/span>/ig);
							var statNamesB = content.match(/<span\s+class="charstats_value21"[^>]*>([^<]+)<\/span>/ig);
							stats.strength = content.match(/<span\s+id="char_f0"[^>]*>(\d+)<\/span>/i);
							stats.dexterity = content.match(/<span\s+id="char_f1"[^>]*>(\d+)<\/span>/i);
							stats.agility = content.match(/<span\s+id="char_f2"[^>]*>(\d+)<\/span>/i);
							stats.constitution = content.match(/<span\s+id="char_f3"[^>]*>(\d+)<\/span>/i);
							stats.charisma = content.match(/<span\s+id="char_f4"[^>]*>(\d+)<\/span>/i);
							stats.intelligence = content.match(/<span\s+id="char_f5"[^>]*>(\d+)<\/span>/i);
							stats.armour = content.match(/<span\s+id="char_panzer"[^>]*>(\d+)<\/span>/i);
							stats.damage = content.match(/<span\s+id="char_schaden"[^>]*>(\d+\s*-\s*\d+)<\/span>/i);

							if(statNamesA.length < 8 || statNamesB.length < 4 || !stats.strength || !stats.dexterity || !stats.agility || !stats.constitution || !stats.charisma || !stats.intelligence || !stats.armour || !stats.damage){
								if(callback) callback(false);
							}
							
							stats.strengthName = statNamesA[2].match(/>([^<]+)</i)[1];
							stats.dexterityName = statNamesA[3].match(/>([^<]+)</i)[1];
							stats.agilityName = statNamesA[4].match(/>([^<]+)</i)[1];
							stats.constitutionName = statNamesA[5].match(/>([^<]+)</i)[1];
							stats.charismaName = statNamesA[6].match(/>([^<]+)</i)[1];
							stats.intelligenceName = statNamesA[7].match(/>([^<]+)</i)[1];
							stats.armourName = statNamesB[0].match(/>([^<]+)</i)[1];
							stats.damageName = statNamesB[1].match(/>([^<]+)</i)[1];

							stats.strength = stats.strength[1];
							stats.dexterity = stats.dexterity[1];
							stats.agility = stats.agility[1];
							stats.constitution = stats.constitution[1];
							stats.charisma = stats.charisma[1];
							stats.intelligence = stats.intelligence[1];
							stats.armour = stats.armour[1];
							stats.damage = stats.damage[1];

							if(callback) callback(stats);
						},
						error: function(){
							if(callback) callback(false);
						}
					});
				}
			}
		},

		// Auction Status bar create
		auction_status_bar : {
			// Create Bar
			create : function(){
				if(gca_options.bool("global","auction_status_bar")){
					// Auction status bar at the top-right corner
					let statusDiv = document.createElement("div");
					statusDiv.id = "AuctionStatusDiv";

					let table, tr, td;
					table = document.createElement("table");
					table.setAttribute("cellspacing","0");
					table.setAttribute("cellpadding","0");
					tr = document.createElement("tr");
					td = document.createElement("td");
					td.className = "auction_status_bg_left";
					table.appendChild(td);
					td = document.createElement("td");
					td.className = "auction_status_bg_center";

					let auctionStatus1 = document.createElement("div");
					auctionStatus1.id = "auction_status_gladiator";
					td.appendChild(auctionStatus1);

					let loading = document.createElement("div");
					loading.className = "auction_status_loading_img loading";
					auctionStatus1.appendChild(loading);

					let auctionStatus2 = document.createElement("div");
					auctionStatus2.id = "auction_status_mercenary";
					td.appendChild(auctionStatus2);

					loading = document.createElement("div");
					loading.className = "auction_status_loading_img loading";
					auctionStatus2.appendChild(loading);

					table.appendChild(td);
					td = document.createElement("td");
					td.className = "auction_status_bg_right";
					table.appendChild(td);

					statusDiv.appendChild(table);
					document.getElementById("header_game").appendChild(statusDiv);
				}
				
				if(gca_options.bool("global","auction_status_bar") || gca_options.bool("global","auction_status_notification")){
					this.getStatus();
				}
			},

			// Get Status
			getStatus : function(){
				// Get gladiator auction status
				jQuery.get(gca_getPage.link({"mod":"auction","itemLevel":"999"}), function(content){
					gca_global.display.auction_status_bar.parseStatus("gladiator", content);
				});

				// Get mercenary auction status
				jQuery.get(gca_getPage.link({"mod":"auction","ttype":"3","itemLevel":"999"}), function(content){
					gca_global.display.auction_status_bar.parseStatus("mercenary", content);
				});
			},

			parseStatus : function(type, content){
				// Get Auction Name
				var auctionName = content.match(/class="awesome-tabs current">([^<]+)<\/a>/);
				// Get Auction Status
				var auctionStatus = content.match(/<span\s*class="description_span_right"><b>([^<]+)<\/b><\/span>/);

				// Get ui
				var statusUI = document.getElementById("auction_status_"+type);

				// Check for error
				if(!auctionName || !auctionStatus){
					if(statusUI)
						statusUI.textContent = gca_locale.get("general", "error");
					return;
				}

				// Parse
				auctionName = auctionName[1];
				auctionStatus = auctionStatus[1];

				// If status ui
				if(statusUI){
					statusUI.textContent = auctionName + ": " + auctionStatus;
				}

				// Status changed notification
				if(gca_options.bool("global","auction_status_notification")){
					// Get old status
					var oldStatus = gca_data.section.get("cache", "auction_status_"+type, false);
					if(oldStatus && oldStatus != auctionStatus){
						// Display Message
						gca_notifications.info( auctionName + " : " + auctionStatus );
						// If sound notifications
						if(gca_options.bool("global","sound_notifications")){
							// Make a sound
							gca_audio.play("auction_notification");
						}
					}
				}
				// Save status
				gca_data.section.set("cache", "auction_status_" + type, auctionStatus);
			}
		},

		// Move event bar
		event_bar_move : {
			moved : false,
			preload : function(){
				// Insert it on html tag
				document.documentElement.className += " event_bar_moved";
				// Set moved
				this.moved = true;
			},
			load : function(){
				// Get banner
				var banner = document.getElementById("banner_top");
				var div = document.getElementById("banner_event");
				// Check if active
				if(banner && div && (banner.style.display == '' || banner.style.display == 'block')){
					if(!this.moved){
						gca_data.section.set("cache", "event_bar_active", 1);
						this.preload();
					}
				}
				// Remove class
				else if(this.moved){
					gca_data.section.set("cache", "event_bar_active", 0);
					document.documentElement.className = document.documentElement.className.replace(/\s*event_bar_moved\s*/i, " ");
				}
			}
		},

		// Implement a top fixed bar to show important info on scroll
		top_fixed_bar : {
			// Elements to be moved to the top bar
			elements : {
				bar : {dom : null, scroll : 74, className : "bar-fixed-bar"},
				icon_gold : {dom : null, scroll : 74, className : "icon_gold-fixed-bar"},
				gold_val : {dom : null, scroll : 74, className : "gold_val-fixed-bar"},
				icon_rubies : {dom : null, scroll : 74, className : "icon_rubies-fixed-bar"},
				ruby_val : {dom : null, scroll : 74, className : "ruby_val-fixed-bar"},
				icon_expeditionpoints : {dom : null, scroll : 105, className : "icon_expeditionpoints-fixed-bar"},
				expeditionpoints_value : {dom : null, scroll : 105, className : "expeditionpoints_value-fixed-bar"},
				icon_dungeonpoints : {dom : null, scroll : 105, className : "icon_dungeonpoints-fixed-bar"},
				dungeonpoints_value : {dom : null, scroll : 105, className : "dungeonpoints_value-fixed-bar"},
				header_values_ressources : {dom : null, scroll : 74, className : "header_values_ressources-fixed-bar"},
				header_values_general : {dom : null, scroll : 74, className : "header_values_general-fixed-bar"},
				icon_arena : {dom : null, scroll : 105, className : "icon_arena-fixed-bar"},
				icon_grouparena : {dom : null, scroll : 105, className : "icon_grouparena-fixed-bar"},
				show_premium_days : {dom : null, scroll : 74, className : "show_premium_days-fixed-bar"}
			},
			// Create Top Bar
			create : function(){
				// Set up the "Top Fixed Bar"
				var div = document.createElement("div");
				div.id = "topFixedBar";
				var link = document.createElement("a");
				link.href = "http://gladiatuscrazyaddon.tk/";
				link.setAttribute("target", "_blank");
				link.textContent = 'Gladiatus Crazy Addon v' + gca.version;
				div.appendChild(link);
				document.body.appendChild(div);
				
				// Bind document elements
				this.elements.bar.dom = document.getElementById('topFixedBar');
				this.elements.icon_gold.dom = document.getElementById('icon_gold');
				this.elements.gold_val.dom = document.getElementById('sstat_gold_val');
				this.elements.icon_rubies.dom = document.getElementById('icon_rubies');
				this.elements.ruby_val.dom = document.getElementById('sstat_ruby_val');
				this.elements.icon_expeditionpoints.dom = document.getElementById('icon_expeditionpoints');
				this.elements.expeditionpoints_value.dom = document.getElementById('expeditionpoints_value');
				this.elements.icon_dungeonpoints.dom = document.getElementById('icon_dungeonpoints');
				this.elements.dungeonpoints_value.dom = document.getElementById('dungeonpoints_value');
				this.elements.header_values_ressources.dom = document.getElementById('header_values_ressources');
				this.elements.header_values_general.dom = document.getElementById('header_values_general');
				this.elements.icon_arena.dom = document.getElementById('icon_arena').parentNode;
				this.elements.icon_grouparena.dom = document.getElementById('icon_grouparena').parentNode;
				this.elements.show_premium_days.dom = document.getElementById('show_premium_days');
				
				// Attack a scroll event
				window.addEventListener("scroll",function(){
					gca_global.display.top_fixed_bar.onscroll();
				}, false);
				// Fire scroll event
				this.onscroll();
			},

			// On Page Scroll
			onscroll : function(){
				// Get scroll offset
				var vscroll = parseInt((document.all ? document.scrollTop : window.pageYOffset));
				// For each element to be moved on the bar
				for(var i in this.elements){
					// If element exist
					if(this.elements[i].dom){
						// If scroll has passed the item
						if(vscroll>this.elements[i].scroll && this.elements[i].dom.name != "in-use"){
							this.elements[i].dom.className += " "+this.elements[i].className;
							this.elements[i].dom.name = "in-use";
						}
						// If scroll has not yet reached the item 
						else if(vscroll<=this.elements[i].scroll && this.elements[i].dom.name == "in-use"){
							this.elements[i].dom.name = "no-use";
							this.elements[i].dom.className = this.elements[i].dom.className.replace(this.elements[i].className,"").replace("  "," ");
						}
					}
				}
			}
		},

		// Improve Main Menu
		advanced_main_menu : {
			loaded : false,
			info : {},

			// Resolve menu
			resolve : function() {
				if (this.loaded)
					return;
				this.loaded = true;

				// Get main menu links list
				var main_links = document.getElementById("mainmenu").getElementsByTagName('a');
				// Get submenu1 links list
				var sub_links = [];
				if(!gca_global.isTraveling){
					sub_links = document.getElementById("submenu1").getElementsByTagName('a');
					// Flag Submenus
					document.getElementById("submenu1").className = "submenu advanced_sub_menu";
					document.getElementById("submenu2").className = "submenu advanced_sub_menu";
				}

				// Overview Link
				this.info.overview = main_links[0];
				this.info.overview_active = (this.info.overview.className.match('active')) ? '_active' : '';

				// Hightscore Link
				this.info.highscore = main_links[3];
				this.info.highscore_active = (this.info.highscore.className.match('active')) ? '_active' : '';

				// Pantheon Link
				this.info.pantheon = main_links[1];
				this.info.pantheon_active = (this.info.pantheon.className.match('active')) ? '_active' : '';
				this.info.guild = main_links[2];
				this.info.guild_active = (this.info.guild.className.match('active')) ? '_active' : '';


				// While not traveling
				if(!gca_global.isTraveling){
					// Submenu links
					this.info.sublink = {
						work : {active : false},
						arena : {active : false},
						training : {active : false},
						weaponSmith : {active : false},
						armourSmith : {active : false},
						generalGoods : {active : false},
						alchemist : {active : false},
						mercenaries : {active : false},
						forge : {active : false},
						malefica : {active : false},
						wizard : {active : false},
						auction : {active : false},
						market : {active : false},
						cityGate : {active : false}
					};
					
					// Resolve links
					for(let i = 0; i < sub_links.length; i++){
						if(!this.info.sublink.work.active && sub_links[i].href.match(/index.php\?mod=work(&|&amp;)sh=/i)){
							this.info.sublink.work.active = i + 1;
							this.info.sublink.work.link = sub_links[i];
						}
						else if(!this.info.sublink.arena.active && sub_links[i].href.match(/index.php\?mod=arena(&|&amp;)sh=/i)){
							this.info.sublink.arena.active = i + 1;
							this.info.sublink.arena.link = sub_links[i];
						}
						else if(!this.info.sublink.training.active && sub_links[i].href.match(/index.php\?mod=training(&|&amp;)sh=/i)){
							this.info.sublink.training.active = i + 1;
							this.info.sublink.training.link = sub_links[i];
						}
						else if(!this.info.sublink.weaponSmith.active && sub_links[i].href.match(/index.php\?mod=inventory(&|&amp;)sub=1(&|&amp;)sh=/i)){
							this.info.sublink.weaponSmith.active = i + 1;
							this.info.sublink.weaponSmith.link = sub_links[i];
						}
						else if(!this.info.sublink.armourSmith.active && sub_links[i].href.match(/index.php\?mod=inventory(&|&amp;)sub=2(&|&amp;)sh=/i)){
							this.info.sublink.armourSmith.active = i + 1;
							this.info.sublink.armourSmith.link = sub_links[i];
						}
						else if(!this.info.sublink.generalGoods.active && sub_links[i].href.match(/index.php\?mod=inventory(&|&amp;)sub=3(&|&amp;)sh=/i)){
							this.info.sublink.generalGoods.active = i + 1;
							this.info.sublink.generalGoods.link = sub_links[i];
						}
						else if(!this.info.sublink.alchemist.active && sub_links[i].href.match(/index.php\?mod=inventory(&|&amp;)sub=4(&|&amp;)sh=/i)){
							this.info.sublink.alchemist.active = i + 1;
							this.info.sublink.alchemist.link = sub_links[i];
						}
						else if(!this.info.sublink.mercenaries.active && sub_links[i].href.match(/index.php\?mod=inventory(&|&amp;)sub=5(&|&amp;)sh=/i)){
							this.info.sublink.mercenaries.active = i + 1;
							this.info.sublink.mercenaries.link = sub_links[i];
						}
						else if(!this.info.sublink.forge.active && sub_links[i].href.match(/index.php\?mod=forge(&|&amp;)sh=/i)){
							this.info.sublink.forge.active = i + 1;
							this.info.sublink.forge.link = sub_links[i];
						}
						else if(!this.info.sublink.malefica.active && sub_links[i].href.match(/index.php\?mod=inventory(&|&amp;)sub=6(&|&amp;)sh=/i)){
							this.info.sublink.malefica.active = i + 1;
							this.info.sublink.malefica.link = sub_links[i];
						}
						else if(!this.info.sublink.wizard.active && sub_links[i].href.match(/index.php\?mod=magus(&|&amp;)sh=/i)){
							this.info.sublink.wizard.active = i + 1;
							this.info.sublink.wizard.link = sub_links[i];
						}
						else if(!this.info.sublink.auction.active && sub_links[i].href.match(/index.php\?mod=auction(&|&amp;)sh=/i)){
							this.info.sublink.auction.active = i + 1;
							this.info.sublink.auction.link = sub_links[i];
						}
						else if(!this.info.sublink.market.active && sub_links[i].href.match(/index.php\?mod=market(&|&amp;)sh=/i)){
							this.info.sublink.market.active = i + 1;
							this.info.sublink.market.link = sub_links[i];
						}
					};

					// Arena
					if(this.info.sublink.arena.active){
						this.info.arena = this.info.sublink.arena.link;
						this.info.arena_active = (this.info.arena.className.match('active')) ? '_active' : '';
					}
					// Forge
					if(this.info.sublink.forge.active){
						this.info.forge = this.info.sublink.forge.link;
						this.info.forge_active = (this.info.forge.className.match('active')) ? '_active' : '';
					}
					// Auction
					if(this.info.sublink.auction.active){
						this.info.auction = this.info.sublink.auction.link;
						this.info.auction_active = (this.info.auction.className.match('active')) ? '_active' : '';
					}
					// Market
					if(this.info.sublink.market.active){
						this.info.market = this.info.sublink.market.link;
						this.info.market_active = (this.info.market.className.match('active')) ? '_active' : '';
					}
				}
			},

			// Tag main menu
			isTagged : false,
			tagMainMenu : function() {
				if (this.isTagged) return;
				this.isTagged = true;
				document.getElementById('mainmenu').className += " gca_advance_main_menu";
			},

			// Create Advance menu
			create : function(){
				// Resolve menu
				this.resolve();
				// Tag menu
				this.tagMainMenu();

				// Inject Overview Link
				this.convertMenu.addTabs("overview", this.info.overview, this.info.overview_active, [
					{text : 'P', href : gca_getPage.link({"mod":"overview","submod":"stats"})},
					{text : 'X', href : gca_getPage.link({"mod":"overview","doll":"2"})},
					{text : 'I', href : gca_getPage.link({"mod":"overview","doll":"3"})},
					{text : 'II', href : gca_getPage.link({"mod":"overview","doll":"4"})},
					{text : 'III', href : gca_getPage.link({"mod":"overview","doll":"5"})},
					{text : 'IV', href : gca_getPage.link({"mod":"overview","doll":"6"})}
				]);

				// Inject Highscore Link
				this.convertMenu.addPlus(this.info.highscore, this.info.highscore_active, {href : "http://gladiatuscrazyaddon.tk/index.php?mode=highscore", target : "_blank"});

				// Inject Pantheon Link
				this.convertMenu.addPlus(this.info.pantheon, this.info.pantheon_active, {href : gca_getPage.link({"mod":"gods"})});

				// Inject Guild Link
				this.convertMenu.addTabs("guild", this.info.guild, this.info.guild_active, [
					{text : '\u265C', href : gca_getPage.link({"mod":"guild"})},
					{text : '\uD83D\uDD27', href : gca_getPage.link({"mod":"guild","submod":"admin"})},
					{text : '\uD83C\uDFF0', href : gca_getPage.link({"mod":"guild","submod":"buildings"})},
					{text : '\uD83D\uDCB2', href : gca_getPage.link({"mod":"guildBankingHouse"})},
					{text : '\u27F0', href : gca_getPage.link({"mod":"guild_jail"})},
					{text : '\u2719', href : gca_getPage.link({"mod":"guild_medic"})}
				]);

				// While not traveling
				if(!gca_global.isTraveling){

					// Player Level
					var level = parseInt( document.getElementById('header_values_level').textContent );

					// If player over lv2
					if(level > 2){
						// Inject Arena link
						this.convertMenu.addPlus(this.info.arena, this.info.arena_active, {href : gca_getPage.link({"mod":"arena","submod":"grouparena"})});

						// Forge
						if(this.info.forge){
							this.convertMenu.addPlus(this.info.forge, this.info.forge_active, {href : gca_getPage.link({"mod":"forge","submod":"smeltery"})});
						}
						// Auction
						if(this.info.auction){
							this.convertMenu.addPlus(this.info.auction, this.info.auction_active, {href : gca_getPage.link({"mod":"auction","ttype":"3"})});
						}
						// Inject Market Link
						if(this.info.market){
							this.convertMenu.addTabs("market", this.info.market, this.info.market_active, [
								{href : gca_getPage.link({"mod":"market","f":"7","s":"p"}), img : {class : "item-i-7-2", style : "margin:-2px;"}},
								{href : gca_getPage.link({"mod":"market","f":"11","s":"p"}), img : {class : "item-i-12-8", style : "margin:-2px;"}},
								{href : gca_getPage.link({"mod":"market","f":"12","s":"p"}), img : {class : "item-i-11-7", style : "margin:-2px;"}},
								{href : gca_getPage.link({"mod":"market","f":"18","s":"p"}), img : {class : "item-i-18-49", style : "margin:-2px;"}},
								{href : gca_getPage.link({"mod":"market","f":"20","s":"p"}), img : {class : "item-i-20-11", style : "margin:-2px;"}}
							]);
						}
					}

					// lv2 player
					else if(level == 2){
						// Inject Arena link
						this.convertMenu.addPlus(this.info.arena, this.info.arena_active, {href : getPage.link({"mod":"arena","submod":"grouparena"})});
					}
				}
			},

			convertMenu : {
				// Add a + button
				addPlus : function(menu, active, options){
					// Inject parent wrapper
					var newMenu = document.createElement("div");
					newMenu.className = "advanced_menu_entry";
					menu.parentNode.insertBefore(newMenu, menu.nextSibling);
					newMenu.appendChild(menu);
					menu.className += " advanced_menu_link" + active;
					menu.dataset.hasWrapper = "true";
					// Plus Link
					var a = document.createElement("a");
					a.className = "advanced_menu_shift";
					a.textContent = ">";
					a.style.fontFamily = "Consolas, monaco, monospace";
					for(let i in options){
						a.setAttribute(i,options[i]);
					}
					newMenu.appendChild(a);
					return a;
				},

				// Add a back Tab
				addTabs : function(name, menu, active, links){
					// Front Tab
					var frontTab = document.createElement("div");
					frontTab.className = "advanced_menu_entry";
					menu.parentNode.insertBefore(frontTab, menu.nextSibling);
					menu.dataset.hasWrapper = "true";
					// Back Tab
					var backTab = document.createElement("div");
					backTab.className = "advanced_menu_back_links";
					backTab.style.display = "none";

					var backLinks = [];
					// Back Tab links
					for(let i = 0; i<links.length; i++){
						let a = document.createElement("a");
						if(links[i].img){
							let img = document.createElement("div");
							for(let j in links[i].img){
								img.setAttribute(j, links[i].img[j]);
							}
							a.appendChild(img);
							delete links[i].img;
						}
						if(links[i].text){
							a.textContent = links[i].text;
							delete links[i].text;
						}
						for(let j in links[i]){
							a.setAttribute(j, links[i][j]);
						}
						backTab.appendChild(a);
						backLinks.push(a);
					}
					frontTab.appendChild(menu);
					menu.className += " advanced_menu_link" + active;
					frontTab.appendChild(backTab);
					// Tab Toggle
					a = document.createElement("a");
					a.className = "advanced_menu_shift";
					a.textContent = "+";
					a.addEventListener('click',function(){
						if(backTab.style.display == 'none'){
							jQuery(menu).hide();
							jQuery(backTab).show();
							gca_data.section.set("advanced-menu", name + "-tab", true);
						}
						else{
							jQuery(backTab).hide();
							jQuery(menu).show();
							gca_data.section.set("advanced-menu", name + "-tab", false);
						}
					},false);
					frontTab.appendChild(a);
					backLinks.push(a);

					if(gca_data.section.get("advanced-menu", name + "-tab", false)){
						jQuery(menu).hide();
						jQuery(backTab).show();
					}

					return backLinks;
				},

				// Add a side icon
				addSideIcon : function(menu, active, icon){
					// Inject parent wrapper
					var menuWrapper
					if (!menu.dataset.hasWrapper) {
						menuWrapper = document.createElement("div");
						menuWrapper.className = "advanced_menu_entry";
						menu.parentNode.insertBefore(menuWrapper, menu.nextSibling);
						menuWrapper.appendChild(menu);
					} else {
						menuWrapper = menu.parentNode;
					}
					// Side icon
					var i = document.createElement("span");
					i.className = "advanced_menu_side_icon";
					if (icon) i.className += " " + icon;
					menuWrapper.appendChild(i);
					return i;
				},
			},
			
			// Convert mouseover submenu change event to click event
			submenuClickToChangeTab : {
				// Apply change
				apply : function(){
					// If you travel, return
					if(gca_global.isTraveling)
						return;

					// Town Menu Tab
					let tab = document.getElementById("submenuhead1").getElementsByTagName('div')[1];
					tab.removeAttribute("onmouseover");
					tab.setAttribute("onclick", "switchMenu(2)");
					tab.style.cursor = "pointer";
					tab.getElementsByTagName('a')[0].removeAttribute("href");
					// Expedition Menu Tab
					tab = document.getElementById("submenuhead2").getElementsByTagName('div')[0];
					tab.removeAttribute("onmouseover");
					tab.setAttribute("onclick", "switchMenu(1)");
					tab.style.cursor = "pointer";
					tab.getElementsByTagName('a')[0].removeAttribute("href");

					// Enable it
					document.documentElement.className = document.documentElement.className.replace(/\s*gca_submenu_change_disable/i,"");
				},
				// Css hack on preload
				preload : function(){
					// Add css rule on HTML
					document.documentElement.className += " gca_submenu_change_disable";
					// Not perfect, but the best we can do
				}
			}
		},

		// Attacked timers
		attacked_timers : {
			inject : function(){
				// if Quests wait for update event
				if(gca_section.mod == 'reports' && (gca_section.submod == 'showArena' || gca_section.submod == 'showCircusTurma' || gca_getPage.parameter('t') == '2' || gca_getPage.parameter('t') == '3') && document.getElementById('content').getElementsByClassName('report_statistic')){
					gca_tools.event.addListener("arena-info-update", function(){
						gca_global.display.attacked_timers.display();
					});
					return;
				}

				this.display();
			},

			// Arena Timer Elements
			arenaTimeElement : {
				arena : null,
				grouparena : null,
				arena_xs : null,
				grouparena_xs : null
			},
			// Arena Timer Values
			timer : {
				arena : null,
				grouparena : null,
				arena_xs : null,
				grouparena_xs : null
			},

			// Display timers
			display : function(){
				// Style fixes
				document.getElementById("header_menue").className = "attacked_timers_active";
				// Get Last arena attack
				var lastAttacked = {
					// Arena
					arena : parseInt(gca_data.section.get("timers", 'arena_attacked', 0)),
					// Grouparena
					grouparena : parseInt(gca_data.section.get("timers", 'grouparena_attacked', 0)),
					// Arena xs
					arena_xs : parseInt(gca_data.section.get("timers", 'arena_xs_attacked', 0)),
					// Grouparena xs
					grouparena_xs : parseInt(gca_data.section.get("timers", 'grouparena_xs_attacked', 0))
				};

				// Create timers UI
				this.createUI();

				// Calculate timers values
				this.timer.arena = gca_tools.time.server() - lastAttacked.arena;
				this.timer.grouparena = gca_tools.time.server() - lastAttacked.grouparena;
				this.timer.arena_xs = gca_tools.time.server() - lastAttacked.arena_xs;
				this.timer.grouparena_xs = gca_tools.time.server() - lastAttacked.grouparena_xs;

				this.countdown_interval = setInterval(function(){
					gca_global.display.attacked_timers.countdown();
				}, 1000);
				this.countdown();
			},

			// Count Down
			countdown_interval : null,
			countdown : function(){
				// Arena
				this.arenaTimeElement.arena.textContent = gca_tools.time.msToHMS_String((this.timer.arena > 0) ? this.timer.arena : 0);
				// Grouparena
				this.arenaTimeElement.grouparena.textContent = gca_tools.time.msToHMS_String((this.timer.grouparena > 0) ? this.timer.grouparena : 0);
				// Arena xs
				this.arenaTimeElement.arena_xs.textContent = gca_tools.time.msToHMS_String((this.timer.arena_xs > 0) ? this.timer.arena_xs : 0);
				// Grouparena xs
				this.arenaTimeElement.grouparena_xs.textContent = gca_tools.time.msToHMS_String((this.timer.grouparena_xs > 0) ? this.timer.grouparena_xs : 0);
				
				// 1 sec passed
				this.timer.arena = this.timer.arena + 1000;
				this.timer.grouparena = this.timer.grouparena + 1000;
				this.timer.arena_xs = this.timer.arena_xs + 1000;
				this.timer.grouparena_xs = this.timer.grouparena_xs + 1000;
			},

			// Create timers ui
			createUI : function(){
				// Variables
				var tr, td, icon, text;

				// Create timers container
				var container = document.createElement("div");
				container.className = "attacked_timers_back";
				// Insert timer table
				var table = document.createElement("table");
				table.id = "attacked_timers_table";
				table.className = "attacked_timers_table";
				tr = document.createElement("tr");

				// Arena Timer Cell
				td = document.createElement("td");
				icon = document.createElement("span");
				icon.className = "timer-icon timer-icon-arena";
				this.arenaTimeElement.arena = document.createElement("span");
				this.arenaTimeElement.arena.className = "timer";
				td.appendChild(icon);
				td.appendChild(this.arenaTimeElement.arena);
				tr.appendChild(td);
				
				// Grouparena Timer
				td = document.createElement("td");
				icon = document.createElement("span");
				icon.className = "timer-icon timer-icon-grouparena";
				this.arenaTimeElement.grouparena = document.createElement("span");
				this.arenaTimeElement.grouparena.className = "timer";
				td.appendChild(icon);
				td.appendChild(this.arenaTimeElement.grouparena);
				tr.appendChild(td);
				table.appendChild(tr);

				tr = document.createElement("tr");

				// Arena xs Timer
				td = document.createElement("td");
				icon = document.createElement("span");
				icon.className = "timer-icon timer-icon-arena";
				text = document.createElement("span");
				text.className = "attacked_timers_xs_text";
				text.textContent = "s";
				this.arenaTimeElement.arena_xs = document.createElement("span");
				this.arenaTimeElement.arena_xs.className = "timer";
				td.appendChild(icon);
				td.appendChild(text);
				td.appendChild(this.arenaTimeElement.arena_xs);
				tr.appendChild(td);

				// Grouparena xs Timer
				td = document.createElement("td");
				icon = document.createElement("span");
				icon.className = "timer-icon timer-icon-grouparena";
				text = document.createElement("span");
				text.className = "attacked_timers_xs_text";
				text.textContent = "s";
				this.arenaTimeElement.grouparena_xs = document.createElement("span");
				this.arenaTimeElement.grouparena_xs.className = "timer";
				td.appendChild(icon);
				td.appendChild(text);
				td.appendChild(this.arenaTimeElement.grouparena_xs);
				tr.appendChild(td);

				// Insert on page
				table.appendChild(tr);
				container.appendChild(table);
				document.getElementById("header_game").appendChild(container);
			}
		},

		// Timer for the Quests
		quests_timer : {
			inject : function(){
				// if Quests wait for update event
				if(gca_section.mod == 'quests'){
					gca_tools.event.addListener("quest-info-update", function(){
						gca_global.display.quests_timer.display();
					});
					return;
				}
				// Do not run while traveling
				else if (gca_global.isTraveling){
					return;
				}

				this.display();
			},

			// Display timers
			display : function(){
				// Time when quests will be refreshed
				var nextAvailable = parseInt(gca_data.section.get("timers", 'quest_available', 0));
				// Quest free slots
				this.quests_free_slots = parseInt(gca_data.section.get("timers", 'quests_free_slots','N/A'));

				// Get menu
				var menu;
				if(document.getElementsByClassName('advanced_menu_entry').length > 0){
					menu = document.getElementsByClassName('advanced_menu_entry')[1].getElementsByTagName('a')[0];
				}
				else{
					menu = document.getElementById('mainmenu').getElementsByTagName('a')[1];
				}

				// If quest completed
				var quest_completed = menu.textContent.match(/\s*\((\d+)\)/i);
				if(quest_completed){
					// Remove indicator
					menu.textContent = menu.textContent.replace(quest_completed[0],'');
					// Append a new indicator
					menu.appendChild(document.createTextNode("("));
					let font = document.createElement("font");
					font.setAttribute("color", "green");
					font.textContent = quest_completed[1];
					menu.appendChild(font);
					menu.appendChild(document.createTextNode(")"));
				}

				// Create timer
				this.questTimeElement = document.createElement("font");
				this.questTimeElement.id = "QuestTime";
				this.questTimeElement.style = "margin-left:5px;font-weight:bold;";
				this.questTimeElement.textContent = "(N/A)";
				menu.appendChild(this.questTimeElement);

				// Time difference
				this.timer = (nextAvailable - gca_tools.time.server());
				// Check if the time has finished
				if(this.timer < 0){
					// Can i take quests?
					if(this.quests_free_slots == 0){
						this.questTimeElement.textContent = "";
						this.questTimeElement.appendChild(document.createTextNode("("));
						let font = document.createElement("font");
						font.setAttribute("color", "red");
						font.textContent = gca_locale.get("global", "quest_full");
						this.questTimeElement.appendChild(font);
						this.questTimeElement.appendChild(document.createTextNode(")"));
					}
					// Do i have data saved? (N/A is the default value)
					else if(this.quests_free_slots != 'N/A'){
						this.questTimeElement.textContent = "";
						this.questTimeElement.appendChild(document.createTextNode("("));
						let font = document.createElement("font");
						font.setAttribute("color", "yellow");
						font.textContent = gca_locale.get("global", "quest_new");
						this.questTimeElement.appendChild(font);
						this.questTimeElement.appendChild(document.createTextNode(")"));
					}
				}
				// Time has NOT finished
				else{
					// Refresh the countdown
					this.countdown_interval = setInterval(function(){
						gca_global.display.quests_timer.countdown();
					}, 1000);
					this.countdown();
				}
			},

			// Count Down
			countdown_interval : null,
			countdown : function(){
				// If ready
				if(this.timer < 0){
					if(this.quests_free_slots == 0){
						this.questTimeElement.textContent = "(" + gca_locale.get("global", "quest_full") + ")";
					}else{
						this.questTimeElement.textContent = "(" + gca_locale.get("global", "quest_new") + ")";
					}
					this.questTimeElement.style.color = "yellow";

					// Clear timer
					clearInterval(this.countdown_interval);
					return;
				}

				// Convert milliseconds to Minutes:Seconds
				var date = new Date(this.timer);
				var minutes = date.getMinutes();
				var seconds = date.getSeconds();
				// Format to 01:04
				if(minutes < 10){minutes = '0'+minutes;}
				if(seconds < 10){seconds = '0'+seconds;}

				// Display the values
				this.questTimeElement.textContent = '(' + minutes + ':' + seconds + ')';
				
				// 1 sec passed
				this.timer = this.timer - 1000;
			}
		},

		// Events
		event : {
			// Craps Event Timer (Dice roll event)
			craps_timer : {
				inject : function(){
					// if Craps wait for update event
					if(gca_section.mod == 'craps'){
						gca_tools.event.addListener("craps-info-update", function(){
							gca_global.display.event.craps_timer.display();
						});
						return;
					}
					// Do not run while traveling
					else if (gca_global.isTraveling){
						return;
					}

					this.display();
				},

				// Display timers
				display : function(){
					// Already running
					if(this.crapsTimeElement)
						return;

					// Time when craps will be refreshed
					var nextAvailable = parseInt(gca_data.section.get("timers", 'craps_available', 0));
					// Craps free toss
					this.craps_free_toss = parseInt(gca_data.section.get("timers", 'craps_free_toss','N/A'));

					// Get link
					var link = document.getElementById('submenu1').getElementsByTagName('a')[0];

					// Create timer
					this.crapsTimeElement = document.createElement("font");
					this.crapsTimeElement.id = "CrapsTime";
					this.crapsTimeElement.style = "margin-left:5px;font-weight:bold;";
					this.crapsTimeElement.textContent = "(N/A)";
					link.appendChild(this.crapsTimeElement);

					// Time difference
					this.timer = (nextAvailable - gca_tools.time.server());
					// Check if the time has finished
					if(this.timer < 0){
						// Zero toss but new day
						if(this.craps_free_toss == 0 && gca_data.section.get("timers", 'craps_last_date', 0) != gca_tools.time.serverDateString()){
							this.crapsTimeElement.textContent = "(" + gca_locale.get("global", "quest_new") + ")";
						}
						// Do i have data saved?
						else if(this.craps_free_toss != 'N/A'){
							this.crapsTimeElement.textContent = "(" + this.craps_free_toss + ")";
						}
					}
					// Time has NOT finished
					else{
						// Refresh the countdown
						this.countdown_interval = setInterval(function(){
							gca_global.display.event.craps_timer.countdown();
						}, 1000);
						this.countdown();
					}
				},

				// Count Down
				countdown_interval : null,
				countdown : function(){
					// If ready
					if(this.timer < 0){
						if(this.craps_free_toss == 0 && gca_data.section.get("timers", 'craps_last_date', 0) == gca_tools.time.serverDateString()){
							this.crapsTimeElement.textContent = "(" + gca_locale.get("global", "quest_new") + ")";
						}
						else{
							this.crapsTimeElement.textContent = "(" + this.craps_free_toss + ")";
						}
						// Clear timer
						clearInterval(this.countdown_interval);
						return;
					}

					// Convert milliseconds to Minutes:Seconds
					var date = new Date(this.timer);
					var minutes = date.getMinutes();
					var seconds = date.getSeconds();
					// Format to 01:04
					if(minutes < 10){minutes = '0'+minutes;}
					if(seconds < 10){seconds = '0'+seconds;}

					// Display the values
					this.crapsTimeElement.textContent = '(' + minutes + ':' + seconds + ')';
					
					// 1 sec passed
					this.timer = this.timer - 1000;
				},

				restart : function(){
					// Clear interval
					clearInterval(this.countdown_interval);
					// If timer exist remove it :P
					if(this.crapsTimeElement){
						this.crapsTimeElement .parentNode.removeChild(this.crapsTimeElement );
					}
					this.crapsTimeElement = null;

					// Restart
					this.display();
				}
			},


			// Server Quest Event Timer
			server_quest_timer : {
				inject : function(){
					// if Craps wait for update event
					if(gca_section.mod == 'location' && gca_section.submod == 'serverQuest'){
						gca_tools.event.addListener("server_quest-info-update", function(){
							gca_global.display.event.server_quest_timer.display();
						});
						return;
					}
					// Do not run while traveling
					else if (gca_global.isTraveling){
						return;
					}

					this.display();
				},

				// Display timers
				display : function(){
					// Already running
					if(this.serverQuestTimeElement)
						return;
					// Get banner
					var banner = document.getElementById("banner_event_link");
					if(!banner) return;
					// Check banner link
					var banner_link = gca_getPage.parameters(banner.href);
					if(banner_link.mod != "location" || banner_link.submod != "serverQuest"){
						return;
					}

					// Time when server quest is available
					var nextAvailable = parseInt(gca_data.section.get("timers", 'server_quest_available', 0));
					// Server quest point
					this.points = gca_data.section.get("timers", 'server_quest_points','N/A');

					// Timer wrapper
					this.serverQuestWrapperElement = document.createElement("div");
					this.serverQuestWrapperElement.id = "ServerQuestTime";
					banner.parentNode.appendChild(this.serverQuestWrapperElement);

					// Icon
					let img = document.createElement("img");
					img.src = "img/ui/expedition_points2.png";
					this.serverQuestWrapperElement.appendChild(img);
					this.serverQuestWrapperElement.appendChild(document.createTextNode(" "));

					// Points
					this.serverQuestPointsElement = document.createElement("span");
					this.serverQuestPointsElement.textContent = "";
					this.serverQuestWrapperElement.appendChild(this.serverQuestPointsElement);
					this.serverQuestWrapperElement.appendChild(document.createTextNode(" "));

					// Timer
					this.serverQuestTimeElement = document.createElement("span");
					this.serverQuestTimeElement.textContent = "";
					this.serverQuestWrapperElement.appendChild(this.serverQuestTimeElement);

					// Time difference
					this.timer = (nextAvailable - gca_tools.time.server());
					// Check if the time has finished
					if(this.timer < 0){
						// No points but new day
						if(this.points == 0 && gca_data.section.get("timers", 'server_quest_last_date', 0) != gca_tools.time.serverDateString()){
							this.serverQuestPointsElement.textContent = "?";
							this.serverQuestTimeElement.textContent = "";
						}
						// Do i have data saved?
						else if(this.points != 'N/A'){
							this.serverQuestPointsElement.textContent = this.points;
							this.serverQuestTimeElement.textContent = "";
						}
						// No data
						else{
							this.serverQuestPointsElement.textContent = "?";
							this.serverQuestTimeElement.textContent = "";
						}
					}
					// Time has NOT finished
					else{
						// Refresh the countdown
						this.countdown_interval = setInterval(function(){
							gca_global.display.event.server_quest_timer.countdown();
						}, 1000);
						this.countdown();
					}
				},

				// Count Down
				countdown_interval : null,
				countdown : function(){
					// If ready
					if(this.timer < 0){
						this.serverQuestPointsElement.textContent = "";
						this.serverQuestTimeElement.textContent = "";
						// Clear timer
						clearInterval(this.countdown_interval);
						return;
					}
					if(this.points != 'N/A'){
						this.serverQuestPointsElement.textContent = this.points;
					}

					// Convert milliseconds to Minutes:Seconds
					var date = new Date(this.timer);
					var minutes = date.getMinutes();
					var seconds = date.getSeconds();
					// Format to 01:04
					if(minutes < 10){minutes = '0'+minutes;}
					if(seconds < 10){seconds = '0'+seconds;}

					// Display the values
					this.serverQuestTimeElement.textContent = '- ' + minutes + ':' + seconds + '';
					
					// 1 sec passed
					this.timer = this.timer - 1000;
				},

				restart : function(){
					// Clear interval
					clearInterval(this.countdown_interval);
					// If timer exist remove it :P
					if(this.serverQuestTimeElement){
						this.serverQuestTimeElement .parentNode.removeChild(this.serverQuestTimeElement );
					}
					this.serverQuestTimeElement = null;

					// Restart
					this.display();
				}
			}
		},

		merchants_timer : {
			preload : function(){
				// Resolve menu
				this.self.display.advanced_main_menu.resolve();
				// Tag menu
				this.self.display.advanced_main_menu.tagMainMenu();
				
				// Clear indicator
				this.icon = null;
			},


			inject : function(self){
				// Save instances
				this.self = self;
				var that = this;

				// Preload
				this.preload();

				// if merchant wait for update event
				if(gca_section.mod == 'inventory'){
					this.setIndicator('grey', false);
					gca_tools.event.addListener("merchants-timer-update", function(){
						that.display();
					});
					return;
				}
				// Do not run while traveling
				else if (gca_global.isTraveling){
					return;
				}

				this.display();
			},

			setIndicator : function(type, tooltip) {
				// Create indicator
				if (!this.icon) {
					// Get menu item
					var weaponSmith = this.self.display.advanced_main_menu.info.sublink.weaponSmith.link;
					var weaponSmith_active = (weaponSmith.className.match('active')) ? '_active' : '';

					// Add indicator
					this.icon = this.self.display.advanced_main_menu.convertMenu.addSideIcon(weaponSmith, weaponSmith_active, "indicator-" + type);
				}
				// Update indicator
				else {
					this.icon.className = this.icon.className.replace(/indicator-\S+/g, "indicator-" + type);
				}

				if (tooltip) {
					gca_tools.setTooltip(this.icon, JSON.stringify(tooltip));
				}
			},

			// Display timers
			display : function(){
				// Time when new items will arrive
				var itemsRefresh = parseInt(gca_data.section.get("timers", 'merchants_refresh', 0));
				this.text = gca_data.section.get("timers", 'merchants_refresh_text', " ");

				// Time difference
				this.timer = (itemsRefresh - gca_tools.time.server());

				// Check if the time has finished
				if(this.timer < 0){
					// New items arrived
					this.setIndicator('red', [[[this.text,"#BA9700"],["00:00:00","white;text-align:right;"]]]);
				}
				// Time has NOT finished
				else{
					// Save instance
					var that = this;
					// Refresh the countdown
					this.countdown_interval = setInterval(function(){
						that.countdown();
					}, 1000);
					this.countdown();
				}
			},

			// Count Down
			countdown_interval : null,
			countdown : function(){
				// If ready
				if(this.timer < 0){
					// New items arrived
					this.setIndicator('red', [[[this.text,"#BA9700"],["00:00:00","white;text-align:right;"]]]);

					// Clear timer
					clearInterval(this.countdown_interval);
					return;
				}
				
				// Wait items arrived
				this.setIndicator('yellow', [[[this.text,"#BA9700"],[gca_tools.time.msToString(this.timer),"white;text-align:right;"]]]);
				
				// 1 sec passed
				this.timer = this.timer - 1000;
			}
		},

		// X-Scroll enable
		xScrollFix : function(){
			document.documentElement.className += " gca_enable_xscroll";
		},

		// Items Shadow enable
		itemShadow : {

			// Preload shadow
			preload : function(){
				document.documentElement.className += " do-item-shadow";
			},

			// Inject shadow into inventory
			inventory : function(){
				// Exit if no inventory
				if(!document.getElementById("inv")) return;

				var that = this;

				// Add event
				gca_tools.event.bag.onBagOpen(function(tab){
					that.currentBag(tab);
				});

				// Wait first bag
				gca_tools.event.bag.waitBag(function(){
					that.currentBag(document.getElementById("inventory_nav").getElementsByClassName("current")[0]);
				});
			},

			// Inject the current bag
			currentBag : function(tab){
				if(tab.dataset.itemShadowed) return;

				// Get items
				var items = document.getElementById('inv').getElementsByClassName("ui-draggable");
				
				// For each
				for (var i = items.length - 1; i >= 0; i--) {
					gca_tools.item.shadow.add(items[i]);
				}

				// Success
				if(items.length)
					tab.dataset.itemShadowed = true;
			},

			// Inject shadow into shop
			shop : function() {
				// Exit if no shop
				if(!document.getElementById("shop")) return;

				// Get items
				var items = document.getElementById('shop').getElementsByClassName("ui-draggable");
				
				// For each
				for (var i = items.length - 1; i >= 0; i--) {
					gca_tools.item.shadow.add(items[i]);
				}
			}
		},

		// Group inventory options
		inventoryOptionsGroup : {
			// Preload before page load
			preload : function(){
				// Insert it on html tag
				document.documentElement.className += " inventory_options_group";
			},
			// Create group
			create : function(){
				if (!document.getElementById('inv')) return;

				// Get wrapper
				var wrapper = document.getElementById('inv').parentNode;
				// Create options button
				this.button = document.createElement('div');
				this.button.className = "gca-inv-group-options-button";
				var that = this;
				this.button.addEventListener('click', function(){
					that.toggle();
				}, false);
				wrapper.appendChild(this.button);
				// Create options box
				this.box = document.createElement('div');
				this.box.className = "gca-inv-group-options-box";
				wrapper.appendChild(this.box);
				
				var item;
				// Populate options box
				item = wrapper.getElementsByClassName("bag_buy_extend")[0];
				item.style.display = "block";
				this.box.appendChild(item);
				item = document.getElementById("itemOptions");
				item.style.display = "block";
				this.box.appendChild(item);
				item = document.getElementById("show-item-info");
				item.style.display = "block";
				this.box.appendChild(item);
			},
			// Show/Hide options
			hidden : true,
			toggle : function() {
				if (this.hidden) this.show();
				else this.hide(); 
			},
			show : function() {
				this.box.style.display = "block";
				this.hidden = false;
			},
			hide : function() {
				this.box.style.display = "none";
				this.hidden = true;
			}
		}
	},

	// Underworld related functions
	underworld : {

		// Pray Icon Shortcut
		prayBufShortCut : function(){
			// Get local buffs
			var localBuffs = document.getElementById('localBuffs');
			// Add gca class
			localBuffs.getElementsByClassName('buff-container')[0].className += ' gca-buff-container';

			// Check if player has the praying buff
			var praying = (gca_section.submod=='pray' && document.getElementById('content').getElementById('duration'))?true:false;
			
			if(gca_section.submod!='pray'){// skip if in pray page
				var buffs = localBuffs.getElementsByClassName('buff');
				for(let i=0;i<buffs.length;i++){
					if(
						buffs[i].dataset.image == "img/buff/healing.png" && 
						(
							(/\+5%/).test(buffs[i].getAttribute('title')) || 
							(/\+5%/).test(buffs[i].getAttribute('onmousemove'))
						)
					){
						praying = true;
					}
				}
			}
			
			// Create Shotcut
			var a = document.createElement('a');
			a.className = 'gca-pray-buff';
			if(praying){
				//"index.php?mod=underworld&submod=prayEnd&sh=" + gca_section.sh;
				a.href = gca_getPage.link({"mod":"underworld","submod":"prayEnd"});
				a.textContent = '╳';
				a.setAttribute('data-tooltip','[[["' + gca_locale.get("global", "pray_stop") + ' (-5% '+gca_locale.get("global", "heal") + ')","#fff"]]]');
			}else{
				a.href = "index.php?mod=underworld&submod=prayStart&sh=" + gca_section.sh;
				a.setAttribute('data-tooltip','[[["' + gca_locale.get("global", "pray_start") + ' (+5% '+gca_locale.get("global", "heal") + ')","#fff"]]]');
			}
			a.style = 'background-image: url(img/buff/healing.png);';
			localBuffs.getElementsByClassName('buff-container')[0].appendChild(a);
		}

	},

	// Background Functionality
	background : {

		// Log the Daily Bonus
		daily_bonus_log : {
			// Inject
			inject : function(){
				// If daily bonus
				if(document.getElementById('blackoutDialogLoginBonus') != null){
					// Save bonus data
					this.saveBonus();
					// If overview page
					if(gca_section.mod == 'overview'){
						gca_tools.event.fireOnce('loginBonusDataUpdated');
					}
				}
			},

			// Save bonus
			saveBonus : function(){
				// Get wrapper
				var wrapper = document.getElementById('blackoutDialogLoginBonus');
				
				// Get title
				var title = document.getElementById('header_LoginBonus').textContent;
				var description = wrapper.getElementsByClassName('loginbonus_description')[0].textContent;

				// Get bonus
				var bonus_box = wrapper.getElementsByClassName('loginbonus_bonus');
				var bonus = [];
				var daysleft = -1;

				// For each reward
				for (var i = bonus_box.length - 1; i >= 0; i--) {
					// Get reward data
					var bonus_item = {
						img : bonus_box[i].getElementsByTagName('img')[0].src,
						text : bonus_box[i].getElementsByClassName('loginbonus_text')[0].textContent,
						tooltip : false
					};
					// Check if reward is collected
					var icon = bonus_box[i].getElementsByClassName('loginbonus_icon')[0];
					if(icon.dataset.tooltip){
						bonus_item.tooltip = icon.dataset.tooltip;
					}
					// Not collected
					else{
						daysleft++;
					}
					
					// Store data
					bonus.unshift(bonus_item);
				}

				// Fix dates
				if(daysleft < 0)
					daysleft = 0;

				var day = 24*60*60*1000;
				var bonusEndDate = new Date(gca_tools.time.server() + daysleft * day);
				bonusEndDate = new Date(bonusEndDate.getFullYear(), bonusEndDate.getMonth(), bonusEndDate.getDate()).getTime() + day - 1;
				
				// Save expiration timestamp
				gca_data.section.set('overview', 'daily_bonus_ends', bonusEndDate);
				// Save data
				gca_data.section.set('overview', 'daily_bonus_data', bonus);
				// Save title/description
				gca_data.section.set('overview', 'daily_bonus', {
					title : title,
					description : description
				});
			}
		},

		// Remember Tabs
		remember_tabs : {
			// Initialize
			init : function(){
				// Catch page leave
				window.addEventListener('click', function(event){
					// Get Url
					var url = (event.target && (event.target.href || (event.target.parentNode && event.target.parentNode.href) || (event.target.parentNode && event.target.parentNode.parentNode && event.target.parentNode.parentNode.href) ) ) || false;
					// If it is a link
					if(url && url.substring(0,8) == "https://" && url.substring(8, 8 + gca_section.domain.length) == gca_section.domain){
						// Call event
						gca_global.background.remember_tabs.onLinkClick(event, url, gca_getPage.parameters(url));
					}
				}, false);
			},

			// Pages with inventory
			pagesWithInventory : [
				"overview",
				"inventory",
				"packages",
				"forge",
				"magus",
				"auction",
				"market",
				"guild_market",
				"guild_storage"
			],

			// On link click
			onLinkClick : function(event, url, page){
				// Check parameter mod
				if(!page.mod) return;
				// Parse submod
				var submod = null;
				if(page.submod) submod = page.submod;
				// Delete sh
				delete page.sh;

				// Get type of page
				var pageType = this.pagesWithInventory.indexOf(page.mod);
				// If no page of interest, return
				if(pageType < 0 || (pageType == 0 && page.submod != null)) return;

				// If destination is "inventory"
				if(pageType == 1){
					// If shop is defined, save it
					if(page.subsub){
						gca_data.section.set("cache", 'merchants_tab', page.subsub);
					}
					// Else, load it
					else{
						page.subsub = gca_data.section.get("cache", 'merchants_tab', 0);
					}
				}

				// Create link
				url = gca_getPage.fullLink(page);
				// Patch target's link
				if(event.target.href){
					event.target.href = url;
				}else if(event.target.parentNode.href){
					event.target.parentNode.href = url;
				}else{
					event.target.parentNode.parentNode.href = url;
				}
			}
		},

		// Guild message
		guildMessage : {
			// Message sending
			sending : false,
			// Sent guilde message
			send : function(message, exclude_me, callback){
				// Check 
				if(this.sending) return;
				this.sending = true;

				// Get Info
				var guild = {
					inGuild : gca_data.section.get('guild', "inGuild", false),
					mates : gca_data.section.get('guild', "mates", [])
				}
				
				// Check if valid data
				if(!guild.inGuild || guild.mates.length < 1){
					return false;
				}

				// Prepare post data
				var postData = {};
				for (var i = guild.mates.length - 1; i >= 0; i--){
					if(!exclude_me || guild.mates[i].id != gca_section.playerId)
						postData["qq"+guild.mates[i].id] = guild.mates[i].id;
				}
				// Message attach
				postData["mailText"] = message;
				// Button name
				postData["sendmails"] = "sendmails";

				// Save instance
				var self = this;
				// Sent message
				jQuery.ajax({
					type: "POST",
					url: gca_getPage.link({"mod":"guild","submod":"adminMail"}),
					data: postData,
					success: function(){
						self.sending = false;
						if(callback) callback(true);
					},
					error: function(){
						self.sending = false;
						if(callback) callback(false);
					}
				});
				return true;
			}
		},

		// Notifications Events
		notify_me : {

			// Cooldown Sound Notification for missions, dungeons and arenas
			cooldown_sounds : {
				init : function(){
					// If no sounds and no notifications
					if(!gca_options.bool("sound","enabled") && !gca_options.bool("global","browser_notifications")){
						// No way to notify the user
						return;
					}

					// Save instance
					var that = this;
					// Wait a sec
					setTimeout(function(){
						// Missions
						that.initActionCooldown("cooldown_bar_text_expedition", "expedition_notification", expeditionProgressBar.readyText, "expedition");
						// Dungeon
						that.initActionCooldown("cooldown_bar_text_dungeon", "dungeon_notification", dungeonProgressBar.readyText, "dungeon");
						// Arena
						that.initActionCooldown("cooldown_bar_text_arena", "arena_notification", arenaProgressBar.readyText, "arena");
						// Arena Turma
						that.initActionCooldown("cooldown_bar_text_ct", "turma_notification", ctProgressBar.readyText, "turma");
					}, 500);
				},

				initActionCooldown : function(id, sound, readyText, icon) {
					// Get button
					var button = document.getElementById(id);
					// Check no button
					if(!button) return;

					// Cooldown
					var cooldown = button.textContent.match(/(\d+):(\d+):(\d+)/);
					// Check id cooldown
					if(cooldown){
						// Calculate cooldown
						cooldown = (parseInt(cooldown[1], 10) * 60 * 60 + parseInt(cooldown[2], 10) * 60 + parseInt(cooldown[3], 10))*1000;
						// Setup a timeout
						setTimeout(function(){
							if(gca_options.bool("sound","enabled")){
								gca_audio.play(sound);
							}

							// If notifications enabled
							if(gca_options.bool("global","browser_notifications") && readyText && readyText.length > 0){
								// Browser notification
								gca_notifications.browser(false, readyText, "icons/icon_" + icon + ".png", function(){
									// Set focus on window
									window.focus();
									// Close notification
									this.close();
									// On click go to link
									var link = button.parentNode.getElementsByTagName("a");
									if(link.length > 0)
										window.location.href = link[0].href;
								});
							}
						}, cooldown);
					}
				}
			},

			// Check for guild application
			new_guild_application : function(){
				// Get saved data
				var lastTime = gca_data.section.get("timers", "notify_new_guild_application", 0);
				// If an application is pending
				if(lastTime == -1){
					gca_notifications.info(gca_locale.get("global", "notification_guild_application"));
				}
				// Else if it's time to check
				else if(gca_tools.time.server() - lastTime >= gca_options.int("global","notify_new_guild_application_interval") * 60000){
					// Save time
					gca_data.section.set("timers", "notify_new_guild_application", gca_tools.time.server());
					// Check gui ld for any application
					jQuery.get(gca_getPage.link({"mod":"guild","submod":"admin"}), function(content){
						// If application exist
						if(content.match('submod=adminApplication')){
							// Save
							gca_data.section.set("timers", "notify_new_guild_application", -1);
							// Notify
							gca_notifications.info(gca_locale.get("global", "notification_guild_application"));
						}
					});
				}
			}

		},
		
		// Gold/Exp data
		gold_exp_data : {
			inject : function(){
				// Collect data
				this.collect();
				// Show gold_exp_data button
				this.create_button();
			},
			
			collect : function(){
				// Get saved data
				var data = gca_data.section.get("data", "gold_exp_data", false);
				
				// Collect data every 10min = (600k ms)
				if (data && gca_tools.time.server() - data[data.length - 1][2] < 6e5){
					// Not yet 10 mins
					return;
				}
				
				// Go to achievements page and collect gathered gold data
				jQuery.get(gca_getPage.link({"mod":"overview","submod":"achievements"}), function(content){
					// Get server date
					var serverDate = gca_tools.time.ajaxServer(content);

					// Get saved data (again just to be sure)
					var data = gca_data.section.get("data", "gold_exp_data", []);
					
					
					/* Ο ΘΑΝΟΣ ΓΡΑΦΕΙ GTP ΚΩΔΙΚΑ
					// Collect data every 10min = (600k ms)
					if (!serverDate || !data.length || serverDate - data[data.length - 1][2] < 6e5){
						// Not yet 10 mins
						return;
					}
					*/

					// Get gold
					var gold = content.match(/([\d\.]+) \/ 50\.000\.000/i);
					// Get exp
					var exp = document.getElementById('header_values_xp_bar').dataset.tooltip.match(/"(\d+) \\\/ \d+"/i);
					// If gold or exp not found
					if(gold == null || exp == null){
						// Exit
						return;
					}

					// Calculate new data
					var newData = [
						// Current gold
						parseInt(gold[1].replace(/\./g,""), 10),
						// Current EXP
						parseInt(exp[1], 10),
						// Server time
						serverDate
					];

					// Get last saved data
					var lastData = false;
					if(data.length){
						lastData = data[data.length - 1];
					}
					// If no last data
					else{
						// Save data
						gca_data.section.set("data", "gold_exp_data", [newData]);
						// Exit
						return;
					}

					// Save data only if are different from the last time
					if(lastData[0] != newData[0] && lastData[1] != newData[1]){
						// Insert data
						data.push(newData);
						// Save data
						gca_data.section.set("data", "gold_exp_data", data);
					}
				});
			},
			
			// Create Gold & EXP data button
			create_button : function(){
				// Save instance
				var that = this;
				// Create stats icon
				var icon = document.createElement('div');
				icon.id = "exp_and_gold_stats_icon";
				// Insert on page
				document.getElementById("header_game").appendChild(icon);
				// On click handler
				icon.addEventListener('click', function(){
					// Open data
					that.open();
				}, false);
			},
			
			// Gold & EXP data Dialog
			dialog : false,
			// Canvas chart
			canvas : false,

			// Open Dialog
			open : function(){
				// If dialog exist
				if(this.dialog){
					// Open dialog
					this.dialog.open();
					// Exit
					return;
				}

				// Save instance
				var that = this;

				// Create a dialog
				var dialog = new gca_build.dialog;
				this.dialog = dialog;
				dialog.smallHead(true);
				dialog.title.textContent = gca_locale.get("global", "gold_exp_data");
				
				// Add description
				var div = document.createElement('div');
				div.id = "today_values";
				div.textContent = gca_locale.get("global", "gold_exp_data_today") + ":";
				dialog.body.appendChild(div);
				
				div = document.createElement('div');
				div.id = "days7_values";
				div.textContent = gca_locale.get("global", "gold_exp_data_week") + ":";
				dialog.body.appendChild(div);
				
				div = document.createElement('div');
				div.id = "average_per_day";
				div.textContent = gca_locale.get("global", "gold_exp_data_avg_day") + ":";
				dialog.body.appendChild(div);
				
				div = document.createElement('div');
				div.id = "days_left_to_level_up";
				div.textContent = gca_locale.get("global", "gold_exp_data_to_level_up") + ":";
				dialog.body.appendChild(div);
				
				// Add some space
				var div = document.createElement('div');
				div.className = "space";
				dialog.body.appendChild(div);
				
				// Add Canvas
				var canvas = document.createElement('canvas');
				canvas.id = "graph_canvas";
				canvas.width = 500;
				canvas.height = 200;
				this.canvas = canvas;
				dialog.body.appendChild(canvas);
				
				// Add description
				div = document.createElement('div');
				div.textContent = "Click on graph's legends to enable/disable data groups. Gold and Experience data are summed starting from 7 days ago."; // TODO : translations
				dialog.body.appendChild(div);
				
				// Add some space
				var div = document.createElement('div');
				div.className = "space";
				dialog.body.appendChild(div);
				
				// Add Chart Lib
				var scripts_loaded = 0;
				var script = document.createElement('script');
				script.src = gca_resources.folder + "libraries/Chart.min.js";
				script.addEventListener('load', function(){
					scripts_loaded++;
					// If all scripts loaded
					if(scripts_loaded == 2){
						// Render chart
						that.renderChart();
					}
				}, false);
				document.getElementsByTagName('head')[0].appendChild(script);
				script = document.createElement('script');
				script.src = gca_resources.folder + "libraries/moment.min.js";
				script.addEventListener('load', function(){
					scripts_loaded++;
					// If all scripts loaded
					if(scripts_loaded == 2){
						// Render chart
						that.renderChart();
					}
				}, false);
				document.getElementsByTagName('head')[0].appendChild(script);

				// Add close Button
				var button = document.createElement('input');
				button.className = "button3";
				button.type = "button";
				button.value = gca_locale.get("general", "close");
				dialog.body.appendChild(button);

				button.addEventListener('click', function(){
					dialog.close();
				}, false);

				// Open dialog
				this.dialog.open();
			},

			renderChart : function(){
				// Values for the Data Plot
				var data  = gca_data.section.get("data", "gold_exp_data", [[0,0,0]]);
				
				// Fix data
				var seventh_day = 0;
				var last_day = 0;
				var exp_levelup = 0;
				var Xdata = [];
				var Ydata = [];
				var XdataChange = [];
				var YdataChange = [];
				var labelsArr = [];

				// Server time - 7 days (7 days = 7*24*60*60*1000 = 604800000 ms)
				var seventh_day_timestamp = gca_tools.time.server() - 6048e5;
				var last_day_timestamp = gca_tools.time.server() - 864e5;
				
				// For every data
				for (var i = 0; i < data.length; i++) {
					// If time in the last 7 days
					if(data[i][2] >= seventh_day_timestamp){
						// Sum some of the lost EXP from levelup
						if(i>0 && data[i][1] < data[i-1][1]){
							exp_levelup = exp_levelup + data[i-1][1];
						}
						// Calculate last 7 days Gold Data
						Xdata[i - seventh_day] = {
							x : data[i][2],
							y : (data[i][0] - data[seventh_day][0])
						};
						XdataChange[i - seventh_day] = {
							x : data[i][2],
							y : ((i==0)?0:(data[i][0] - data[i-1][0]))
						};
						// Calculate last 7 days Exp Data
						Ydata[i - seventh_day] = {
							x : data[i][2],
							y : (data[i][1]-data[seventh_day][1]+exp_levelup)
						};
						YdataChange[i - seventh_day] = {
							x : data[i][2],
							y : ((i==0)?0:(data[i][1] - data[i-1][1]))
						};
						
						if(data[i][2] <= seventh_day_timestamp){
							last_day = i;
						}
					}else{
						seventh_day = i;
					}
				}
				
				// If there are no data
				if(Ydata.length<1 || Xdata.length<1){
					document.getElementById('today_values').textContent+= " N/A";
					document.getElementById('days7_values').textContent+= " N/A";
					document.getElementById('average_per_day').textContent+= " N/A";
					document.getElementById('days_left_to_level_up').textContent+= " N/A";
					document.getElementById('graph_canvas').style.display = "none";
				}else{
					// Experience translate
					var exp_tran = unescape(JSON.parse('"' +document.getElementById('header_values_xp_bar').dataset.tooltip.match(/"([^:]+):"/i)[1]+ '"'));
					// Gold translate
					var gold_tran = unescape(JSON.parse('"' +document.getElementById('icon_gold').dataset.tooltip.match(/"([^"]+)"/i)[1]+ '"'));
					
					// Write raw data - TODO needs a little styling + today_values=last 24h not today
					document.getElementById('today_values').textContent+= " "+(Ydata[Ydata.length-1].y-Ydata[last_day].y) +" "+exp_tran+" / "+(Xdata[Xdata.length-1].y-Xdata[last_day].y)+" ";
					var img = document.createElement('img');
					img.src = "img/res2.gif";
					img.align = "absmiddle";
					img.border = "0";
					document.getElementById('today_values').appendChild(img);
					
					document.getElementById('days7_values').textContent+= " "+Ydata[Ydata.length-1].y +" "+exp_tran+" / "+Xdata[Xdata.length-1].y+" ";
					var img = document.createElement('img');
					img.src = "img/res2.gif";
					img.align = "absmiddle";
					img.border = "0";
					document.getElementById('days7_values').appendChild(img);
					
					document.getElementById('average_per_day').textContent+= " "+ Math.round(Ydata[Ydata.length-1].y/7) +" "+exp_tran+" / "+Math.round(Xdata[Xdata.length-1].y/7)+" ";
					var img = document.createElement('img');
					img.src = "img/res2.gif";
					img.align = "absmiddle";
					img.border = "0";
					document.getElementById('average_per_day').appendChild(img);
					
					document.getElementById('days_left_to_level_up').textContent+= " "+ Math.round((document.getElementById('header_values_xp_bar').dataset.tooltip.match(/"\d+ \\\/ (\d+)"/i)[1]-document.getElementById('header_values_xp_bar').dataset.tooltip.match(/"(\d+) \\\/ \d+"/i)[1])/(Ydata[Ydata.length-1].y/7)*100)/100;
					
					// Populate graph
					new Chart(this.canvas, {
						type: 'line',
						data: {
							datasets: [
								{
									label: gold_tran,
									fill: true,
									backgroundColor: "rgba(255,193,7,0.3)",
									borderColor: "rgba(255,193,7,1)",
									data: Xdata
								},
								{
									label: 'Measurements', // TODO - translate
									type: 'bubble',
									backgroundColor: "rgba(255,193,7,0.3)",
									borderColor: "rgba(255,193,7,1)",
									data: XdataChange
								},
								{
									label: exp_tran,
									fill: true,
									backgroundColor: "rgba(75,192,192,0.3)",
									borderColor: "rgba(75,192,192,1)",
									data: Ydata
								},
								{
									label: 'Measurements', // TODO - translate
									type: 'bubble',
									backgroundColor: "rgba(75,192,192,0.3)",
									borderColor: "rgba(75,192,192,1)",
									data: YdataChange
								}
							]
						},
						options: {
							scales: {
								xAxes: [{
									type: 'time',
									time: {
										unit: 'day',
										displayFormats: {
											day: 'MMM D'
										},
										tooltipFormat: 'MMM D, h:mm:ss a'
									}
								}]
							},
							legend: {
								position : 'bottom'
							}
						}
					});
				}
			}
		}
	},

	// Sound stuf
	sound : {
		// Elements
		elements : {},

		// Create bar
		bar : function(){
			// Set up sound bar
			var bar = document.createElement('div');
			bar.className = "gca_sound_bar";
			// Toggle sound icon
			this.elements.toggleIcon = document.createElement('div');
			this.elements.toggleIcon.className = "sound-toggle";
			if(gca_audio.isMuted()){
				this.elements.toggleIcon.className += " mute";
			}
			// Save instance
			var that = this;
			this.elements.toggleIcon.addEventListener("click", function(){
				that.toggle();
			}, false);

			bar.appendChild(this.elements.toggleIcon);

			// Add on page
			document.body.appendChild(bar);
		},

		// Turn on or off audio
		toggle : function(){
			// If element not yet created
			if(!this.elements.toggleIcon)
				// return
				return;
			// Toggle
			if(gca_audio.isMuted()){
				// Unmute
				gca_audio.mute(false);
				this.elements.toggleIcon.className = "sound-toggle";
				gca_audio.play("sound_toggle");
			}
			else{
				// Mute
				gca_audio.mute(true);
				this.elements.toggleIcon.className = "sound-toggle mute";
			}
		}
	}
};

(function(){
	// Pre Inject
	gca_global.preinject();
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_global.inject();
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
