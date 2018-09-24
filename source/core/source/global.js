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
		// If rtl server
		if (localStorage.getItem('gca_rtl')) {
			if (document.documentElement.className.length)
				document.documentElement.className += " ";
			document.documentElement.className += "gca_rtl";
		}
		// If x-scroll
		(gca_options.bool("global","x_scroll") && 
			this.display.xScrollFix());
		// If Item shadow
		(gca_options.bool("global","item_shadow") && 
			this.display.analyzeItems.itemShadow.preload());
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

		// Server Service wait screen
		if (!this.isLoggedIn) {
			return;
		}
		
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
		// Bind auction last seach
		(gca_options.bool("auction","save_last_state") && 
			this.display.auctionLoadLastState());

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
		// Inventory info box
		(gca_options.bool("global","inventory_gold_info") &&
			this.display.inventoryInfo.prepare());


		// Daily Bonus Log
		(gca_options.bool("overview", "daily_bonus_log") && 
			this.background.daily_bonus_log.inject());

		// If Item shadow
		if(gca_options.bool("global","item_shadow")) {
			this.display.analyzeItems.itemShadow.inventory();
			this.display.analyzeItems.itemShadow.shop();
		}

		// Event Craps Timer
		(!this.isTraveling && this.isEvent.craps && gca_options.bool("events","craps_timer") &&
			this.display.event.craps_timer.inject());

		// Event Server Quest
		(!this.isTraveling && (this.isEvent.serverQuest || this.isEvent.locationQuest) && this.isEvent.bar && gca_options.bool("events","server_quest_timer") &&
			this.display.event.server_quest_timer.inject());

		// Remember merchants' and inventory tabs
		(!this.isTraveling && (gca_options.bool("global","remember_tabs") || gca_options.bool("market","remember_sort")) && 
			this.background.targetLinkEditor.init());

		// Cooldown Sound Notification for missions, dungeons and arenas
		(!this.isTraveling && gca_options.bool("global","cooldown_sound_notifications") && 
			this.background.notify_me.cooldown_sounds.init());


		// Notification : Guild application alert
		(!this.isTraveling && gca_options.bool("global","notify_new_guild_application") && 
			this.background.notify_me.new_guild_application());

		
		// Pray Buf shortcut - TODO clean code
		//(this.isInUnderworld && gca_options.bool("global","pray_shorcut") &&
		//	this.underworld.prayBufShortCut());
		// Pray Buf shortcut
		(this.isInUnderworld && gca_options.bool("global","pray_shorcut") &&
			this.underworld.prayCounterBar.add());

		// Browser notifications
		(gca_options.bool("global","browser_notifications") &&
			gca_notifications._browser.init());
		
		// Gold/Exp data
		(gca_options.bool("global","gold_exp_data") &&
			this.background.gold_exp_data.inject());
			
		// Forge timer
		(!this.isTraveling && gca_options.bool("global","forge_timers") &&
			this.display.forge_timer());
		
		// Centurio & PowerUps timers
		(gca_options.bool("global","centurio_powerups_timers") &&
			this.centurio_days.init());
		
		// 48h GCA Window: links + posting data
		this.gcaWindow();
		
		// 24h guild info update
		this.update_guild_info();
		
		// Show durability or notifications
		((gca_data.section.get("global", "show_durability", 0) != 0 || gca_data.section.get("global", "min_durability", 25) > 0) && gca_section.mod!='auction' &&
			this.display.analyzeItems.itemDurability.init());

		// Show forge info
		this.display.analyzeItems.itemForgeInfo.init();
	},
	
	scripts : {
		chartScript : {
			load : 0, // 2 = ready
			create : function(render){
				// Load moment.js
				gca_tools.load.script('libraries/moment.js', () => {
					// Load chart.js
					gca_tools.load.script('libraries/Chart.min.js', () => {
						render();
					}, true);
				}, true);
			}
		}
	},

	// Game Modes Check
	gameModeResolve : function(){
		// Default Values
		this.isLoggedIn = true;
		this.isTraveling = false;
		this.isInUnderworld = false;

		// Check for events
		this.isEvent = {
			craps : false,
			serverQuest : false,
			locationQuest : false,
			bar : false
		};

		// Logged Out
		if (document.getElementById('container_infobox') || document.getElementById('login')){
			this.isLoggedIn = false;
			return;
		}
		// Check if traveling
		else if(document.getElementById('submenu1') == null){
			this.isTraveling = true;
		}
		// Otherwise Check if is Underwold
		else if(document.getElementById('wrapper_game').className == 'underworld'){
			this.isInUnderworld = true;
		}

		if(!this.isTraveling){
			// Get first's submenu links
			let links = document.getElementById('submenu1').getElementsByTagName('a');
			// Check for "Dice roll" event
			if(links[0].className.match('glow') && links[0].href.match('mod=craps')){
				this.isEvent.craps = true;
			}
			// Get first's submenu links
			links = document.getElementById('submenu2').getElementsByTagName('a');
			if(links[links.length-1].className.match('glow')){
				// Check for "Server Bosses" event
				if(links[links.length-1].href.match('submod=serverQuest')){
					this.isEvent.serverQuest = true;
				}else if(links[links.length-1].href.match(/loc=(\w+)&/)){
					this.isEvent.locationQuest = links[links.length-1].href.match(/loc=(\w+)&/)[1];
				}
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
		if (document.documentElement.className.length)
			document.documentElement.className += " ";
		document.documentElement.className += "gca_rtl";

		// Enable if disabled
		if (!localStorage.getItem('gca_rtl'))
			localStorage.setItem('gca_rtl', 'true');
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
				text = document.createElement('span');
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
					text.textContent = gca_tools.strings.insertDots(hp);
					div.appendChild(text);
					text = document.createTextNode(" / " + gca_tools.strings.insertDots(maxhp));
					div.appendChild(text);
				}
				// Get HP bar
				div = document.getElementById('header_values_hp_bar_fill');
				// Stop HP bar's animation
				jQuery(div).stop();
				// Update HP bar
				div.style.width = Math.round((hp*100)/maxhp) + "%";
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
				if(!gca_data.section.get("guild", "inGuild", false)){
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
										if (Math.random()*1000 <= 1) {
											let poem = [
												"Rubies are red,",
												"potions are blue,",
												"while you click,",
												"I work for you."
											];
											gca_notifications.error(poem[0]);
											gca_notifications.info(poem[1]);
											gca_notifications.warning(poem[2]);
											gca_notifications.success(poem[3]);
										}
										else {
											gca_notifications.success(gca_locale.get("global", "message_sent_success"));
										}
									}else{
										gca_notifications.error(gca_locale.get("global", "message_sent_failed"));
									}
								});
								if(!send){
									gca_notifications.error(gca_locale.get("general", "no_data"));
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
							link.title = gca_locale.get("global", "guild_medic_goto");
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
					
					// Add Canvas
					var canvas = document.createElement('canvas');
					canvas.id = "stats_canvas";
					canvas.style = "background-color:rgba(255,255,255,0.8);border-radius:5%";
					table_wrapper.appendChild(canvas);

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
						//div.style.textAlign = "left";
						td.appendChild(div);
						tr.appendChild(td);
						td = document.createElement('td');
						td.setAttribute("width", "50%");
						div = document.createElement('div');
						div.id = "online_family_friends";
						//div.style.textAlign = "left";
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
						button = document.createElement('input');
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

					// Get online guild members
					jQuery.get(gca_getPage.link({"mod":"guild","submod":"memberList","order":"o"}), function(content){
						// Match All active players
						var online_players = content.match(/<tr>\s*<td>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+">([^<]+)<\/a>\s*<\/td>\s*<td>([^<]+)<\/td>\s*<td>(\d+)<\/td>\s*<td align="right">\s*[^<]*(<span[^>]*>[^<]*<\/span>|)\s*<\/td>\s*<td align="right"><span style="color: (green|#406000|#804000);[^"]*" title="[^"]*">([^<]*)</mg);
						
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
							let player = online_players[i].match(/<tr>\s*<td>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+">([^<]+)<\/a>\s*<\/td>\s*<td>([^<]+)<\/td>\s*<td>(\d+)<\/td>\s*<td align="right">\s*[^<]*(<span[^>]*>[^<]*<\/span>|)\s*<\/td>\s*<td align="right"><span style="color: (green|#406000|#804000);[^"]*" title="[^"]*">([^<]*)</mi);
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
								parent.setAttribute('style','overflow:auto;height:200px;');
							}else{
								parent.removeAttribute('style');

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
								bull.textContent = "\u25cf";
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
								parent.setAttribute('style','overflow:auto;height:200px;');
							}else{
								parent.removeAttribute('style');
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
								bull.textContent = "\u25cf";
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
						
						var chartFunction = function(){
							new Chart(document.getElementById("stats_canvas"), {
								type: 'radar',
								data: {
									labels: [stats[attributes[0]][0], stats[attributes[1]][0], stats[attributes[2]][0], stats[attributes[3]][0], stats[attributes[4]][0], stats[attributes[5]][0]],
									datasets: [{
										label: "Stats",
										fill: true,
										backgroundColor: "rgba(179,181,198,0.2)",
										borderColor: "rgba(179,181,198,1)",
										pointBackgroundColor: "rgba(179,181,198,1)",
										pointBorderColor: "#fff",
										data: [stats[attributes[0]][1], stats[attributes[1]][1], stats[attributes[2]][1], stats[attributes[3]][1], stats[attributes[4]][1], stats[attributes[5]][1]]
									}]
								},
								options: {
									scale: {
										pointLabels: {
											fontSize: 8
										}
									},
									legend: {
										display: false
									}
								}
							});
						}
						
						gca_global.scripts.chartScript.create(chartFunction);
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
							stats.armourName = statNamesB[1].match(/>([^<]+)</i)[1];
							stats.damageName = statNamesB[2].match(/>([^<]+)</i)[1];

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
					tr.appendChild(td);
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

					tr.appendChild(td);
					td = document.createElement("td");
					td.className = "auction_status_bg_right";
					tr.appendChild(td);
					table.appendChild(tr);

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
				header_values_hp : {dom : null, scroll : 115, className : "header_values_hp-fixed-bar"},
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
				
				// Set up scroll to top button
				var scroll_top = document.createElement("div");
				scroll_top.className = "scroll-to-top";
				scroll_top.setAttribute("onclick", 'jQuery("html, body").animate({ scrollTop: 0 }, "fast");');//or: window.scrollTo(0, 0)
				scroll_top.textContent = '▲ top';
				div.appendChild(scroll_top);
				
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
				this.elements.header_values_hp.dom = document.getElementById('header_values_hp');
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
				
				// Guild Link
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
						else if(!this.info.sublink.forge.active && sub_links[i].href.match(/index.php\?mod=forge(&|&amp;)(submod=forge(&|&amp;))*sh=/i)){
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
					// Malefica
					if(this.info.sublink.malefica.active){
						this.info.malefica = this.info.sublink.malefica.link;
						this.info.malefica_active = (this.info.malefica.className.match('active')) ? '_active' : '';
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
				//this.convertMenu.addPlus(this.info.highscore, this.info.highscore_active, {href : "http://gladiatuscrazyaddon.tk/index.php?mode=highscore", target : "_blank"});

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

					// If player over lvl 2
					if(level > 2){
						// Inject Arena link
						this.convertMenu.addPlus(this.info.arena, this.info.arena_active, {href : gca_getPage.link({"mod":"arena","submod":"grouparena"})});

						// Forge
						if(this.info.forge){
							this.convertMenu.addPlus(this.info.forge, this.info.forge_active, {href : gca_getPage.link({"mod":"forge","submod":"smeltery"})});
						}
						// Malefica
						if(this.info.malefica){
							this.convertMenu.addPlus(this.info.malefica, this.info.malefica_active, {href : gca_getPage.link({"mod":"forge","submod":"workbench"})});
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
						this.convertMenu.addPlus(this.info.arena, this.info.arena_active, {href : gca_getPage.link({"mod":"arena","submod":"grouparena"})});
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
					var a = document.createElement("a");
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
				// if reports wait for update event
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
					menu.appendChild(document.createTextNode(" ("));
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
					if(gca_section.mod == 'location' && (gca_section.submod == 'serverQuest' || isNaN(gca_getPage.parameter('loc')))){
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
					if(banner_link.mod != "location" || (banner_link.submod != "serverQuest" && !isNaN(banner_link.loc))){
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
						if(this.points != 'N/A'){
							this.serverQuestPointsElement.textContent = this.points;
						}else{
							this.serverQuestPointsElement.textContent = "";
						}
						this.serverQuestTimeElement.textContent = "";
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

		forge_timer : function(){
			var smeltTimes = gca_data.section.get("timers", "smelt_times", {data:[]});
			var forgeTimes = gca_data.section.get("timers", "forge_times", {data:[]});
			
			if(smeltTimes.data.length>0 || forgeTimes.data.length>0){
				// Create indicator
				var forge = gca_global.display.advanced_main_menu.info.sublink.forge.link;
				var forge_active = (forge.className.match('active')) ? '_active' : '';
				
				var type = 'red';
				// PC time NOT SERVER time (for some unknown reason :P gladiatus gives this time in code)
				var current = new Date(); current = current.getTime();
				var tooltip = '[[';
				if(smeltTimes.data.length>0){
					tooltip += '[["'+smeltTimes.translation[0]+'","'+smeltTimes.translation[1]+'"],["#FF6A00; text-shadow: 0 0 2px #000, 0 0 2px #FF6A00","#FF6A00; text-shadow: 0 0 2px #000, 0 0 2px #FF6A00"]]';
					for(let i=0;i<smeltTimes.data.length;i++){
						if(smeltTimes.data[i][0]*1000<=current){
							type = 'green';
							gca_notifications.success(smeltTimes.translation[0]+': '+smeltTimes.data[i][1]+'\n'+smeltTimes.translation[2]);
							tooltip += ',[["'+smeltTimes.data[i][1]+'","'+smeltTimes.translation[2]+'"],["#DDD","#00ff00"]]';
						}else{
							tooltip += ',[["'+smeltTimes.data[i][1]+'","'+gca_tools.time.msToString(smeltTimes.data[i][0]*1000-current)+'"],["#DDD","#DDD"]]';
						}
					}
					if(forgeTimes.data.length>0){tooltip += ',';}
				}
				if(forgeTimes.data.length>0){
					tooltip += '[["'+forgeTimes.translation[0]+'","'+forgeTimes.translation[1]+'"],["#FF6A00; font-size:12px; text-shadow: 0 0 2px #000, 0 0 2px #FF6A00","#FF6A00; font-size:12px; text-shadow: 0 0 2px #000, 0 0 2px #FF6A00"]]';
					for(let i=0;i<forgeTimes.data.length;i++){
						if(forgeTimes.data[i][0]*1000<=current){
							type = 'green';
							gca_notifications.success(forgeTimes.translation[0]+': '+forgeTimes.data[i][1]+'\n'+forgeTimes.translation[2]);
							tooltip += ',[["'+forgeTimes.data[i][1]+'","'+forgeTimes.translation[2]+'"],["#DDD","#00ff00"]]';
						}else{
							tooltip += ',[["'+forgeTimes.data[i][1]+'","'+gca_tools.time.msToString(forgeTimes.data[i][0]*1000-current)+'"],["#DDD","#DDD"]]';
						}
					}
				}
				tooltip += ']]';
				
				// Add indicator
				this.icon = gca_global.display.advanced_main_menu.convertMenu.addSideIcon(forge, forge_active, "indicator-" + type);
				gca_tools.setTooltip(this.icon, tooltip);
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
					this.setIndicator('green', [[[this.text,"#BA9700"],["00:00:00","white;text-align:right;"]]]);
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
				this.setIndicator('red', [[[this.text,"#BA9700"],[gca_tools.time.msToString(this.timer),"white;text-align:right;"]]]);
				
				// 1 sec passed
				this.timer = this.timer - 1000;
			}
		},

		// X-Scroll enable
		xScrollFix : function(){
			document.documentElement.className += " gca_enable_xscroll";
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

				// Fix bug click
				var buy = wrapper.getElementsByClassName("bag_buy_extend")[0].getElementsByTagName("a")[0];
				buy.removeAttribute("href");
				buy.style.cursor = "pointer";
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
		},

		// Show inventory info
		inventoryInfo : {
			prepare : function () {
				// Exit if no inventory
				if(!document.getElementById("inv")) return;

				// Create UI
				this.infoBox = document.createElement("div");
				this.infoBox.className = "gca-bag-info";
				this.infoGold = document.createElement("span");
				this.infoBox.appendChild(this.infoGold);
				this.infoBox.appendChild(document.createTextNode(" "));
				this.infoBox.appendChild(gca_tools.create.goldIcon());
				document.getElementById("inv").parentNode.insertBefore(this.infoBox, document.getElementById("inv").nextSibling);

				// Add events
				gca_tools.event.bag.onBagOpen(() => {
					this.showInvInfo();
				});

				// If bag not already loaded
				if (document.getElementById("inv").className.match("unavailable")) {
					// Wait first bag
					gca_tools.event.bag.waitBag(() => {
						this.showInvInfo();
					});
				}
				// Else id already loaded
				else {
					// Add shadows
					this.showInvInfo();
				}

				// On item move
				gca_tools.event.request.onAjaxResponce((data) => {
					if (
						data.hasOwnProperty("data") && data.data &&
						data.data.hasOwnProperty("to") && data.data.to &&
						data.data.to.hasOwnProperty("data") && data.data.to.data &&
						data.elem.length === 1
					) {
						this.showInvInfo(data.elem[0]);
					}
				})
			},

			showInvInfo : function(item = {dataset:{amount:0,itemId:0,priceGold:0}}) {
				// Get items
				var items = document.getElementById('inv').getElementsByClassName("ui-draggable");
				// Count gold
				let gold = 0;

				// For each item
				for (var i = items.length - 1; i >= 0; i--) {
					let g = 0;
					// If item is the moved item
					if (item.dataset.itemId == items[i].dataset.itemId) {
						g = item.dataset.amount * item.dataset.priceGold;
					}
					// Normal items
					else {
						g = items[i].dataset.amount * items[i].dataset.priceGold;
					}
					if (!isNaN(g)) {
						gold += g;
					}
				}

				// Display
				this.infoGold.textContent = gca_tools.strings.insertDots(gold);
			}
		},

		// Load last auction state
		auctionLoadLastState : function() {
			let auction_gladiator = false;
			let auction_mercenary = false;
			let links, i;

			links = document.getElementById('submenu1').getElementsByClassName('menuitem');
			for (i = links.length - 1; i >= 0; i--) {
				if (links[i].href.match(/\?mod=auction&/)) {
					auction_gladiator = links[i];
					break;
				}
			}

			links = document.getElementById('submenu1').getElementsByClassName('advanced_menu_shift');
			for (i = links.length - 1; i >= 0; i--) {
				if (links[i].href.match(/\?mod=auction&/)) {
					auction_mercenary = links[i];
					break;
				}
			}

			// Update Auction links
			if (auction_gladiator)
				auction_gladiator.href = gca_getPage.link(gca_data.section.get('cache', 'auction_last_search_gladiator', {mod : 'auction'}));
			if (auction_mercenary)
				auction_mercenary.href = gca_getPage.link(gca_data.section.get('cache', 'auction_last_search_mercenary', {mod : 'auction', ttype : '3'}));
		},

		analyzeItems : {

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

					// Add event
					gca_tools.event.bag.onBagOpen((tab) => {
						this.currentBag(tab);
					});

					// If bag not already loaded
					if (document.getElementById("inv").className.match("unavailable")) {
						// Wait first bag
						gca_tools.event.bag.waitBag(() => {
							this.currentBag(document.getElementById("inventory_nav").getElementsByClassName("current")[0]);
						});
					}
					// Else id already loaded
					// (you can test it with ctrl+F5)
					else {
						// Add shadows
						this.currentBag(document.getElementById("inventory_nav").getElementsByClassName("current")[0]);
					}
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
			
			// Items durability enable
			itemDurability : {
				init : function(){
					// Show durability
					if (gca_data.section.get("global", "show_durability", 0) != 0)
						document.getElementById('content').className += ' show-item-durability';
					
					this.createDurability();
					
					// Exit if no inventory
					if(!document.getElementById("inv")) return;

					// Add event
					gca_tools.event.bag.onBagOpen(() => {
						this.createDurability(false);
					});

					// If bag not already loaded
					if (document.getElementById("inv").className.match("unavailable")) {
						// Wait first bag
						gca_tools.event.bag.waitBag(() => {
							this.createDurability(false);
						});
					}

					// If in packets
					if (gca_section.mod === "packages") {
						// On item get
						gca_tools.event.request.onAjaxResponce((responce) => {
							// If package load request
							if(responce.data.newPackages && responce.data.pagination && responce.data.worthTotal){
								this.createDurability(false);
							}
						});
						// On new packet page
						gca_tools.event.addListener("packages_page_loaded", () => {
							this.createDurability(false);
						});
					}
				},
				
				createDurability : function(notifications=true){
					// Get page Items
					var items = document.querySelectorAll('div[data-content-type]');
					var durability;
					var low_durability_items = [];
					let minimum_durability = (notifications)? gca_data.section.get("global", "min_durability", 25):0;
					let show_durability = gca_data.section.get("global", "show_durability", 0);
					// Loop page's Items
					for (let i = 0; i < items.length; i++){
						// If item
						if(!items[i].dataset.gca_durability && items[i].dataset.contentType.test(/^(1|2|4|8|48|256|512|1024)$/) && items[i].dataset.durability == null){
							items[i].dataset.gca_durability = true;
							// Get item's durability
							durability = items[i].dataset.tooltip.match(/\d+\\*\/\d+ \((\d+)%\)","([^"]+)"\],\["[^\/]+\/\d+ \((\d+)%\)/);
							// If item has durability
							if(durability){
								let durability_per_cent = durability[1];
								//let durability_color = durability[2]; //not used
								let conditioning = durability[3]; //=εξευγενισμός
								let total = (parseInt(durability_per_cent)+parseInt(conditioning));
								
								if (show_durability != 0){
									// If enabled: % or ●
									if(show_durability==1){
										items[i].dataset.durability = (conditioning > 0)? total + "%" : (durability_per_cent) + "%";
									}else{
										items[i].dataset.durability = '⚒';//●
									}
									// Colors
									if(conditioning > 0){
										items[i].dataset.durabilityColor = 1;
									}else if(durability_per_cent>=75){
										items[i].dataset.durabilityColor = 2;
									}else if(durability_per_cent>=50){
										items[i].dataset.durabilityColor = 3;
									}else if(durability_per_cent>=25){
										items[i].dataset.durabilityColor = 4;
									}else{
										items[i].dataset.durabilityColor = 5;
									}
								}
								
								// Notification (if you wear it)
								if(items[i].dataset.containerNumber <= 11 && total < minimum_durability){
									low_durability_items.push( {'name':JSON.parse('"'+items[i].dataset.tooltip.match(/"([^"]+)"/)[1]+'"'),'durability':total} );
								}
							}
						}
					}
					
					// Low durability notification 
					if (low_durability_items.length>0){
						let items_string = ':';
						for(let i = 0; i < low_durability_items.length; i++){
							items_string += '\n● ' + low_durability_items[i].name + ' (' +low_durability_items[i].durability + '%)';
						}
						gca_notifications.error(
							'⚒ ' + gca_locale.get("global", "low_durability_items", {number:low_durability_items.length, percent:minimum_durability}) + items_string
						);
					}
				}
			},

			// jQuery('.ui-draggable')
			itemForgeInfo : {

				init : function(){
					// Show durability
					//if (gca_data.section.get("global", "show_durability", 0) != 0)
					//	document.getElementById('content').className += ' show-item-durability';
					
					this.data = {
						prefix : {
							"1" : {35:21},
							"2" : null,
							"3" : {13:5,17:10,18:2},
							"4" : null,
							"5" : null,
							"6" : {9:4,15:4,17:10},
							"7" : {7:5,35:22},
							"8" : null,
							"9" : null,
							"10" : {9:12,13:1,17:3},
							"11" : null,
							"12" : null,
							"13" : {9:18,20:1},
							"14" : {9:4,13:2,17:12,18:2},
							"15" : null,
							"16" : {9:14,15:2},
							"17" : {13:1,15:2,17:14},
							"18" : null,
							"19" : null,
							"20" : null,
							"21" : {15:4,17:14,20:1},
							"22" : {9:9,13:2,15:2},
							"23" : {9:7,18:2,20:5},
							"24" : {13:2,15:5,17:8,18:2},
							"25" : null,
							"26" : null,
							"27" : {13:2,15:2,17:12,18:1},
							"28" : {9:19},
							"29" : {13:2,15:2,17:14,18:1},
							"30" : {9:8,15:11},
							"31" : {9:9,13:2,15:2},
							"32" : {15:3,17:7},
							"33" : {9:10,15:1,20:2},
							"34" : {13:1,17:14,18:1},
							"35" : {9:10},
							"36" : {13:1,17:8,18:1},
							"37" : {13:4,15:8,18:4},
							"38" : null,
							"39" : {9:1,15:1,17:11,18:1},
							"40" : {9:9,13:2,15:2,18:4,20:2},
							"41" : {9:1,17:9,20:7},
							"42" : {9:18,15:1},
							"43" : null,
							"44" : {13:2,15:2,17:13,18:2},
							"45" : {9:12,15:2,17:4,20:1},
							"46" : {29:1,35:20},
							"47" : {9:6,13:2,17:5,18:2,20:6},
							"48" : {9:5,13:5,20:5},
							"49" : {9:5,13:7,18:8},
							"50" : {7:4,21:3,35:13,40:4},
							"51" : {7:2,21:3,35:15,40:5},
							"52" : {7:5,21:6,35:9,40:10},
							"53" : {26:4,36:6,38:6,49:19},
							"54" : {26:8,36:18,38:2,42:2,49:12},
							"55" : {26:5,38:5,42:2,49:35},
							"56" : null,
							"57" : null,
							"58" : null,
							"59" : null,
							"60" : {15:3,20:7},
							"61" : {9:1,15:9,18:2},
							"62" : {9:1,15:2,18:4,20:5},
							"63" : null,
							"64" : {15:13,20:1},
							"65" : {9:2,13:11,15:1,20:1},
							"66" : null,
							"67" : null,
							"68" : {9:2,13:11,15:1,18:3,20:1},
							"69" : {15:1,18:12,20:4},
							"70" : {9:2,13:1,15:13,20:2},
							"71" : {9:1,13:15,15:1,20:4},
							"72" : null,
							"73" : {15:16,20:4},
							"74" : {7:16,29:3,40:2},
							"75" : {7:2,21:13,29:6,35:1},
							"76" : {35:1,40:22},
							"77" : {7:1,21:8,29:9,35:5,40:1},
							"78" : {7:24},
							"79" : {21:3,35:1,40:20},
							"80" : {7:12,29:2,35:1,40:9},
							"81" : {7:1,21:18,29:7,35:1,40:1},
							"82" : {21:5,40:22},
							"83" : {7:20,29:5,35:1,40:2},
							"84" : {7:3,21:17,29:7,35:1},
							"85" : {35:10,40:19},
							"86" : {7:21,29:5,35:3,40:1},
							"87" : null,
							"88" : null,
							"89" : {7:23,29:5,35:3},
							"90" : null,
							"91" : {11:2,26:31},
							"92" : {11:13,42:12,49:9},
							"93" : {11:11,26:1,36:3,38:20},
							"94" : {11:1,26:32,49:3},
							"95" : {11:1,26:3,42:30,49:3},
							"96" : {11:12,26:1,36:1,38:21,49:4},
							"97" : null,
							"98" : {11:13,26:6,38:10,49:9},
							"99" : {36:40},
							"100" : null,
							"101" : {11:17,38:13,49:11},
							"102" : {26:13,49:29},
							"103" : {26:29,38:10,42:1,49:1},
							"104" : {11:6,42:33,49:4},
							"105" : {11:21,36:23},
							"106" : {11:10,26:35},
							"107" : {11:7,42:34,49:4},
							"108" : {11:14,26:1,36:7,38:24},
							"109" : {11:6,26:20,38:9,49:12},
							"110" : null,
							"111" : null,
							"112" : null,
							"113" : null,
							"114" : {11:11,36:4,38:21,49:12},
							"115" : {26:48},
							"116" : {11:2,36:17,38:7,42:9,49:13},
							"117" : null,
							"118" : {10:1,22:22,45:31},
							"119" : null,
							"120" : {38:10,42:7,49:32},
							"121" : null,
							"122" : {11:3,26:1,36:4,38:27,42:12,49:2},
							"123" : null,
							"124" : {27:4,45:42,50:4},
							"125" : null,
							"126" : null,
							"127" : null,
							"128" : null,
							"129" : null,
							"130" : {10:8,22:31,27:4,45:8},
							"131" : {10:34,22:12,27:1,47:4,50:1},
							"132" : null,
							"133" : null,
							"134" : null,
							"135" : {22:48,27:2},
							"136" : null,
							"137" : null,
							"138" : {10:5,22:21,27:14,45:6,50:6},
							"139" : {10:1,27:52},
							"140" : null,
							"141" : null,
							"142" : {10:4,22:18,45:30,50:3},
							"143" : null,
							"144" : null,
							"145" : null,
							"146" : {22:36,27:3,45:17},
							"147" : null,
							"148" : {22:13,27:4,45:30,47:8},
							"149" : null,
							"150" : {10:23,22:14,27:2,45:17,50:2},
							"151" : {10:24,22:10,27:4,47:13,50:7},
							"152" : null,
							"153" : null,
							"154" : null,
							"155" : null,
							"156" : null,
							"157" : null,
							"158" : null,
							"159" : null,
							"160" : null,
						},
						base : {
							"1-1" : {1:2},
							"1-2" : {3:1,4:1},
							"1-3" : {3:1,4:1},
							"1-4" : {1:1,4:2},
							"1-5" : {3:1,4:3},
							"1-6" : {3:2,4:2},
							"1-7" : {2:2,3:1,4:3},
							"1-8" : {2:1,3:1,4:3},
							"1-9" : {1:3,3:1,4:2},
							"1-10" : {1:1,2:2,3:1,4:3},
							"1-11" : {1:3,3:1,4:3},
							"1-12" : {1:4,3:1,4:3},
							"1-13" : {3:1,4:2},
							"1-14" : {1:2,2:2,3:1,4:4},
							"1-15" : {2:3,4:7},
							"1-16" : {2:3,3:1,4:7},
							"1-17" : {2:5,4:5},
							"1-18" : {1:7,3:1,4:3},
							"1-19" : {1:3,4:4},
							"1-20" : {1:5,4:4},
							"2-1" : {1:2},
							"2-2" : {1:2,4:1},
							"2-3" : {1:2,4:2},
							"2-4" : {3:5},
							"2-5" : {2:3,4:4},
							"2-6" : {2:3,4:4,48:1},
							"2-7" : {2:2,3:2,4:5},
							"2-8" : {2:2,3:2,4:6},
							"2-9" : {2:3,3:3,4:6},
							"2-10" : {4:12},
							"2-11" : {1:2,4:2},
							"2-12" : {1:4,4:2},
							"3-1" : {3:2},
							"3-2" : {2:1,3:1},
							"3-3" : {2:1,3:2},
							"3-4" : {2:2,3:1,4:2},
							"3-5" : {4:5},
							"3-6" : {2:5,4:2},
							"3-7" : {2:3,4:5},
							"3-8" : {2:3,4:6},
							"3-9" : {2:2,3:2,4:7},
							"3-10" : {2:2,3:2,4:7},
							"3-11" : {3:12},
							"3-12" : {3:3,4:2},
							"4-1" : {3:2},
							"4-2" : {4:2},
							"4-3" : {2:1,4:2},
							"4-4" : {2:1,4:2},
							"4-5" : {2:1,4:3},
							"4-6" : {2:3,4:3},
							"4-7" : {3:3,4:4},
							"4-8" : {2:6,4:3},
							"4-9" : {2:7,4:5},
							"4-10" : {2:7,3:1,4:4},
							"4-11" : {2:5,3:1},
							"4-12" : {2:7,4:3},
							"4-13" : {4:9},
							"5-1" : {3:2},
							"5-2" : {2:2,3:1},
							"5-3" : {2:2,3:2},
							"5-4" : {3:5},
							"5-5" : {2:3,3:4},
							"5-6" : {3:5,4:3},
							"5-7" : {2:1,3:5,4:3},
							"5-8" : {3:6,4:4},
							"5-9" : {3:7,4:5},
							"6-1" : {2:2},
							"6-2" : {2:2},
							"6-3" : {2:2},
							"6-4" : {2:2},
							"6-5" : {2:2},
							"6-6" : {2:2},
							"6-7" : {2:2},
							"6-8" : {2:2},
							"8-1" : {1:1,3:1},
							"8-2" : {3:3},
							"8-3" : {3:4},
							"8-4" : {2:1,3:4},
							"8-5" : {2:3,3:3},
							"8-6" : {2:3,3:4},
							"8-7" : {3:9},
							"8-8" : {1:2,3:5,4:3},
							"8-9" : {2:5,3:6,4:1},
							"8-10" : {3:7,4:6},
							"9-1" : {2:2},
							"9-2" : {2:2},
							"9-3" : {2:2},
							"9-4" : {2:2},
							"9-5" : {2:2},
							"9-6" : {2:2},
							"9-7" : {2:2},
							"9-8" : {2:2},
							"9-9" : {2:2},
							"9-10" : {2:2}
						},
						suffix : {
							"1" : null,
							"2" : {25:3,31:3},
							"3" : {6:4,31:6},
							"4" : {6:9},
							"5" : {16:3,31:3},
							"6" : {5:4,16:2},
							"7" : null,
							"8" : null,
							"9" : {37:11,39:1},
							"10" : null,
							"11" : null,
							"12" : null,
							"13" : {5:4,6:2,25:2},
							"14" : null,
							"15" : {23:9,39:3},
							"16" : {5:6},
							"17" : {31:7},
							"18" : null,
							"19" : null,
							"20" : {6:6,16:3,31:1},
							"21" : {25:2,31:4},
							"22" : null,
							"23" : {23:15},
							"24" : null,
							"25" : null,
							"26" : {5:5,16:4},
							"27" : null,
							"28" : null,
							"29" : {16:3,25:3,31:4},
							"30" : {5:4,25:6},
							"31" : {6:12},
							"32" : {23:7,37:1,39:4},
							"33" : {37:12},
							"34" : null,
							"35" : {5:9,25:1},
							"36" : null,
							"37" : {16:6,31:5},
							"38" : {5:2,6:2,16:2,25:2,31:2},
							"39" : null,
							"40" : {25:4,31:4},
							"41" : null,
							"42" : null,
							"43" : null,
							"44" : {23:1,24:11},
							"45" : null,
							"46" : {23:2,24:11},
							"47" : {6:5,25:3,31:3},
							"48" : {16:4,25:4},
							"49" : {25:4,31:4},
							"50" : {6:6,16:2,31:1},
							"51" : {5:3,25:5},
							"52" : null,
							"53" : {16:3,25:2,31:2},
							"54" : null,
							"55" : {24:5,34:4,48:5},
							"56" : {23:1,24:1,39:12},
							"57" : null,
							"58" : {23:2,37:4,39:6},
							"59" : null,
							"60" : null,
							"61" : {6:9},
							"62" : null,
							"63" : {34:1,37:11},
							"64" : null,
							"65" : {37:6,39:6},
							"66" : {23:1,24:11},
							"67" : {5:7,6:2},
							"68" : null,
							"69" : {25:9},
							"70" : {23:4,24:8},
							"71" : null,
							"72" : {5:4,6:4,25:2},
							"73" : {6:6,14:2,16:2},
							"74" : {23:4,24:3,34:2,48:3},
							"75" : {23:2,24:4,37:7},
							"76" : {28:8,32:2,46:14},
							"77" : {19:7,30:12,41:2},
							"78" : {23:3,24:1,39:7},
							"79" : {5:2,14:5,31:2},
							"80" : {23:3,34:1,39:7,48:1},
							"81" : {5:1,6:4,14:3,25:1},
							"82" : null,
							"83" : {37:13},
							"84" : {5:1,6:6,16:1,25:1},
							"85" : null,
							"86" : {6:3,14:5,16:1,25:1},
							"87" : {23:1,34:1,37:10},
							"88" : {14:4,16:3,31:3},
							"89" : null,
							"90" : {37:9,39:4},
							"91" : {23:12},
							"92" : {39:11,48:1},
							"93" : {6:8,25:1},
							"94" : null,
							"95" : null,
							"96" : {23:3,34:4,37:1,48:5},
							"97" : {5:6,14:4,25:1},
							"98" : {33:20},
							"99" : {23:3,24:1,37:6,39:5},
							"100" : null,
							"101" : null,
							"102" : null,
							"103" : null,
							"104" : null,
							"105" : null,
							"106" : null,
							"107" : null,
							"108" : null,
							"109" : null,
							"110" : {6:6},
							"111" : {25:6},
							"112" : null,
							"113" : null,
							"114" : {25:7},
							"115" : {16:5,31:2},
							"116" : {5:1,14:1,31:5},
							"117" : {25:7},
							"118" : {6:7},
							"119" : null,
							"120" : {25:8},
							"121" : {5:2,16:6},
							"122" : {14:8},
							"123" : null,
							"124" : {5:6,6:3},
							"125" : null,
							"126" : {25:9},
							"127" : {5:7,6:1,16:1,31:1},
							"128" : {6:3,14:6},
							"129" : {25:10},
							"130" : {5:2,6:1,16:8},
							"131" : {14:10},
							"132" : {25:10},
							"133" : {5:2,16:7,25:1},
							"134" : {6:10},
							"135" : {6:1,25:9},
							"136" : {5:2,6:1,16:8,25:1},
							"137" : null,
							"138" : null,
							"139" : {6:5,31:7},
							"140" : null,
							"141" : null,
							"142" : {5:8,6:4},
							"143" : {39:12},
							"144" : {23:12},
							"145" : null,
							"146" : {23:1,24:3,48:10},
							"147" : {23:11,37:2},
							"148" : {23:2,24:1,34:2,37:7},
							"149" : {23:1,24:4,37:1,48:8},
							"150" : null,
							"151" : {23:2,37:10,48:2},
							"152" : null,
							"153" : {23:14},
							"154" : {23:4,24:9,37:1},
							"155" : {39:14},
							"156" : null,
							"157" : {23:1,24:2,34:11,37:1},
							"158" : null,
							"159" : {23:11,24:4},
							"160" : {23:1,37:1,48:12},
							"161" : null,
							"162" : {23:15},
							"163" : null,
							"164" : null,
							"165" : {23:16},
							"166" : null,
							"167" : {39:16},
							"168" : null,
							"169" : {24:10,37:6,48:2},
							"170" : {23:5,37:12},
							"171" : null,
							"172" : null,
							"173" : {37:1,39:16},
							"174" : {23:17},
							"175" : null,
							"176" : {33:9,41:9},
							"177" : null,
							"178" : null,
							"179" : null,
							"180" : null,
							"181" : null,
							"182" : null,
							"183" : null,
							"184" : null,
							"185" : {41:19},
							"186" : null,
							"187" : null,
							"188" : null,
							"189" : {41:20},
							"190" : {12:18,33:1,41:2},
							"191" : {30:20},
							"192" : {33:1,41:19},
							"193" : {19:11,33:9,52:1},
							"194" : null,
							"195" : null,
							"196" : {12:15,19:4,33:1,41:2},
							"197" : null,
							"198" : null,
							"199" : null,
							"200" : null,
							"201" : null,
							"202" : null,
							"203" : {19:7,30:1,33:1,41:2,52:14},
							"204" : null,
							"205" : {19:13,33:9,52:1},
							"206" : null,
							"207" : {41:23},
							"208" : null,
							"209" : null,
							"210" : {28:9,43:5,46:6,51:6},
							"211" : null,
							"212" : null,
							"213" : null,
							"214" : null,
							"215" : null,
							"216" : null,
							"217" : null,
							"218" : {32:7,43:6,46:7,51:7},
							"219" : null,
							"220" : null,
							"221" : {32:4,44:4,46:18},
							"222" : null,
							"223" : null,
							"224" : {32:30},
							"225" : null,
							"226" : null,
							"227" : null,
							"228" : null,
							"229" : null,
							"230" : null,
							"231" : null,
							"232" : {46:22,51:2},
							"233" : null,
							"234" : null,
							"235" : null,
							"236" : null,
							"237" : null,
							"238" : null,
							"239" : {32:1,43:13,44:2,46:4,51:6},
							"240" : {28:18,32:4,43:2,44:7},
							"241" : null,
							"242" : null,
							"243" : null,
							"244" : null,
							"245" : null,
							"246" : null,
							"247" : null,
							"248" : null,
							"249" : null,
							"250" : null,
							"251" : null,
							"252" : null,
							"253" : null,
							"254" : null,
							"255" : null,
							"256" : null,
							"257" : null,
							"258" : null,
							"259" : null,
							"260" : null,
							"261" : null,
							"262" : null,
							"263" : null,
							"264" : null,
							"265" : null,
							"266" : null,
							"267" : null,
							"268" : null,
							"269" : null,
							"270" : null,
							"271" : null,
							"272" : null,
							"273" : null,
							"274" : null,
							"275" : null,
							"276" : null,
							"277" : null,
							"278" : null,
							"279" : null,
							"280" : null,
							"281" : null,
							"282" : null,
							"283" : null,
							"284" : null,
							"285" : {32:6,43:2,44:27},
							"286" : null,
							"287" : null,
							"288" : null,
							"289" : null,
							"290" : {53:38},
							"291" : {53:27,56:6,59:8},
							"292" : null,
							"293" : {53:1,59:46},
							"294" : null,
							"295" : null,
							"296" : null,
							"297" : null,
							"298" : null,
							"299" : null,
							"300" : null
						}
					};

					var load = false;
					
					// If inventory exists
					if (document.getElementById('inv')) {
						load = true;
						// Add bag event
						gca_tools.event.bag.onBagOpen(() => {
							this.showInfo();
						});

						// If bag not already loaded
						if (document.getElementById('inv').className.match('unavailable')) {
							// Wait first bag
							gca_tools.event.bag.waitBag(() => {
								this.showInfo();
							});
						}
					}

					// If in packets
					if (gca_section.mod === 'packages') {
						load = true;
						// On item get
						gca_tools.event.request.onAjaxResponce((responce) => {
							// If package load request
							if(responce.data.newPackages && responce.data.pagination && responce.data.worthTotal){
								this.showInfo();
							}
						});
						// On new packet page
						gca_tools.event.addListener('packages_page_loaded', () => {
							this.showInfo();
						});
					}

					// If in auction
					else if (gca_section.mod === 'auction') {
						load = true;
					}

					if (load) {
						this.locale = gca_data.section.get('cache', 'resource_locale', false);
						this.showInfo();
					}
				},
				
				showInfo : function(){
					// Get page Items
					var items = document.querySelectorAll('div[data-content-type]');

					// Loop page's Items
					for (let i = 0; i < items.length; i++){
						if (items[i].dataset.hash) {
							this.showItemInfo(items[i]);
						}
					}
				},
				
				showItemInfo : function(item){
					if (item.dataset.forgeInfo) return;
					// Flag item
					item.dataset.forgeInfo = true;

					// Analyze hash
					let hash = item.dataset.hash.split('-');

					// Get type (sword, helmet ...)
					//let type = this.hashDecode(hash[1]);

					// Stats info
					let base = this.hashDecode(hash[1]) + '-' + this.hashDecode(hash[2]);
					let prefix = this.hashDecode(hash[5]);
					let suffix = this.hashDecode(hash[6]);

					// If not an craftable item
					if (!this.data.base[base]) return;

					// Tooltip info list
					var info = [];

					// Seperator
					info.push(['<div style="border-bottom:1px solid #555555"></div>', '#aaaaaa']);

					// Prefix
					if (prefix > 0) {
						info.push(['[Prefix]', '#ffffff']);
						if (this.data.prefix[prefix]) {
							for (let mat in this.data.prefix[prefix]) {
								if (this.data.prefix[prefix].hasOwnProperty(mat))
									info.push(this.getInfoRow(mat, this.data.prefix[prefix][mat]));
							}
						}
						else {
							info.push(['? &times; ?', '#cccccc']);
						}
					}

					// Base
					info.push(['[Base]' + ' ' + base, '#ffffff']);
					if (this.data.base[base]) {
						for (let mat in this.data.base[base]) {
							if (this.data.base[base].hasOwnProperty(mat))
								info.push(this.getInfoRow(mat, this.data.base[base][mat]));
						}
					}
					else {
						info.push(['? &times; ?', '#cccccc']);
					}

					// Suffix
					if (suffix > 0) {
						info.push(['[Suffix]', '#ffffff']);
						if (this.data.suffix[suffix]) {
							for (let mat in this.data.suffix[suffix]) {
								if (this.data.suffix[suffix].hasOwnProperty(mat))
									info.push(this.getInfoRow(mat, this.data.suffix[suffix][mat]));
							}
						}
						else {
							info.push(['? &times; ?', '#cccccc']);
						}
					}

					// Base margin
					info.push(['<div style="heigth:8px"></div>', '#000000']);

					// Add on tooltip
					var tooltip = JSON.parse(item.dataset.tooltip);
					for (let i = 0; i < info.length; i++) {
						tooltip[0].push(info[i]);
					}
					gca_tools.setTooltip(item, JSON.stringify(tooltip));
				},

				getInfoRow : function(material, amount) {
					let img = '<div class="item-i-18-' + material + '" style="display:inline-block;transform: scale(0.7);margin:-12px -6px -12px -6px;"></div>';
					let name = (this.locale) ? ' (' + this.locale[material] + ')' : '';
					return [img + ' &times; ' + amount + name, '#cccccc'];
				},

				hashDecode : function(hash) {
					var key = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
					var code = 0;
					for (var i = hash.length - 1; i >= 0; i--) {
						code += key.indexOf(hash[i]) * Math.pow(key.length, hash.length - i - 1);
					}
					return code;
				}
			}
		}
	},

	// Underworld related functions
	underworld : {

		// Add a prey counter bar on the header
		prayCounterBar : {
			isPraying : false,

			add : function() {
				var wrapper = document.createElement('div');
				wrapper.id = 'gca_praybuff_header_values';

				var icon = document.createElement('div');
				icon.className = 'headericon_big';
				icon.style.backgroundImage = 'url("img/buff/healing.png")';
				wrapper.appendChild(icon);

				var timer_text = document.createElement('div');
				timer_text.className = 'headervalue_big';
				wrapper.appendChild(timer_text);
				document.getElementById('header_values_pve').appendChild(wrapper);

				var bar = document.createElement('div');
				bar.className = 'cooldown_bar';
				bar.id = 'gca_praybuff_header_cooldown_bar';

				var bar_fill = document.createElement('div');
				bar_fill.className = 'cooldown_bar_fill cooldown_bar_fill_ready';
				bar.appendChild(bar_fill);

				var bar_text = document.createElement('div');
				bar_text.className = 'cooldown_bar_text';
				bar_text.textContent = '';
				bar.appendChild(bar_text);

				var action = document.createElement('a');
				action.className = 'cooldown_bar_link';
				action.addEventListener('click', () => {this.toggle();}, false);
				bar.appendChild(action);

				document.getElementById('header_game').appendChild(bar);

				// Save variables
				this.timer_text = timer_text;
				this.bar_text = bar_text;
				this.bar_fill = bar_fill;

				// Check if player has the praying buff
				var isPraying = false;
				if (gca_section.submod == 'pray' || gca_section.submod == 'prayStart') {
					if (document.getElementById('content').getElementById('duration')) {
						isPraying = true;
						// Save pray stop locale
						gca_data.section.set('cache', 'underworld_pray_stop_locale', document.getElementById('content').getElementsByTagName('a')[0].textContent.trim());
						// Save pray duration
						setTimeout(() => {
							console.log((new Date().getTime() - window.duration * 1000));
							gca_data.section.set('cache', 'underworld_pray_started', (new Date().getTime() - window.duration * 1000));
							this.update();
						}, 500);
					}
					else {
						gca_data.section.del('cache', 'underworld_pray_started');
					}
					// Save pray locale
					gca_data.section.set('cache', 'underworld_pray_locale', document.getElementById('content').getElementsByTagName('h1')[0].textContent.trim());
				}
				else {
					let buffs = document.getElementById('localBuffs').getElementsByClassName('buff');
					for (let i = buffs.length - 1; i >= 0; i--) {
						if(
							buffs[i].dataset.image == 'img/buff/healing.png' && 
							buffs[i].dataset.buffType == '2' && 
							(
								(/\+5%/).test(buffs[i].getAttribute('title')) || 
								(/\+5%/).test(buffs[i].getAttribute('onmousemove'))
							)
						){
							isPraying = true;
							break;
						}
					}
				}
				this.isPraying = isPraying;

				// Update bars
				this.update();
				if (this.isPraying) {
					setInterval(() => {this.updateTime();}, 1000);
				}
			},

			update : function() {
				this.updateTime();
				this.bar_fill.className = 'cooldown_bar_fill ' + (this.isPraying ? 'cooldown_bar_fill_progress' : 'cooldown_bar_fill_ready');
				this.bar_text.textContent = (this.isPraying ? gca_data.section.get('cache', 'underworld_pray_stop_locale', '×') : gca_data.section.get('cache', 'underworld_pray_locale', '→'));
			},

			updateTime : function () {
				if (this.isPraying) {
					let started = gca_data.section.get('cache', 'underworld_pray_started', -1);
					this.timer_text.textContent = started < 0 ? '? : ? : ?' : gca_tools.time.msToHMS_String(new Date().getTime() - started, 99);
				}
				else {
					this.timer_text.textContent = '-- : -- : --';
				}
			},

			toggle : function() {
				document.location.href = gca_getPage.link({'mod': 'underworld', 'submod': (this.isPraying ? 'prayEnd' : 'prayStart')});
			}
		},

		// Pray Icon Shortcut
		/*
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
						break;
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
		*/

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
				var daysleft = 0;

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
						daysleft = 0;
					}
					// Not collected
					else{
						daysleft++;
					}
					
					// Store data
					bonus.unshift(bonus_item);
				}
				daysleft++;

				var day = 24*60*60*1000;
				var bonusEndDate = new Date(Math.floor(gca_tools.time.server()/day)*day + daysleft * day).getTime();

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

		// Link Editor
		targetLinkEditor : {
			// Initialize
			init : function(){
				// Catch page leave
				window.addEventListener('click', function(event){
					// Get Url
					var url = (event.target && (event.target.href || (event.target.parentNode && event.target.parentNode.href) || (event.target.parentNode && event.target.parentNode.parentNode && event.target.parentNode.parentNode.href) ) ) || false;
					// If it is a link
					if(url && url.substring(0,8) == "https://" && url.substring(8, 8 + gca_section.domain.length) == gca_section.domain){
						// Call event
						gca_global.background.targetLinkEditor.onLinkClick(event, url, gca_getPage.parameters(url));
					}
				}, false);
			},

			// On link click
			onLinkClick : function(event, url, page){
				// Check parameter mod
				if(!page.mod) return;
				// Delete sh
				delete page.sh;
				// Set flag
				page._not_changed = true;

				if (gca_options.bool("global","remember_tabs")){
					this.editor_rememberTabs(page);
				}
				if (gca_options.bool("market","remember_sort")) {
					this.editor_rememberMarketSort(page);
				}

				// Check if not changed
				if (page._not_changed) {
					return;
				}
				delete page._not_changed;

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

			editor_rememberTabs : function (page){
				// Get type of page
				let pageType = this.pagesWithInventory.indexOf(page.mod);
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
						page._not_changed = false;
					}
				}
			},

			// Pages with market
			pagesWithMarket : [
				"market",
				"guildMarket"
			],

			editor_rememberMarketSort : function (page) {
				// Get type of page
				let pageType = this.pagesWithMarket.indexOf(page.mod);
				// If no page of interest, return
				if(pageType < 0) return;

				// If shop is defined, save it
				if(page.s){
					gca_data.section.set("cache", 'market_sort', page.s);
				}
				// Else, load it
				else {
					let cachedValue = gca_data.section.get("cache", 'market_sort', false);
					if (cachedValue === false) return;
					page.s = cachedValue;
					page._not_changed = false;
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

					// Wait a sec
					setTimeout(() => {
						// Missions
						this.initActionCooldown("cooldown_bar_text_expedition", "expedition_notification", expeditionProgressBar.readyText, "expedition");
						// Dungeon
						this.initActionCooldown("cooldown_bar_text_dungeon", "dungeon_notification", dungeonProgressBar.readyText, "dungeon");
						// Arena
						this.initActionCooldown("cooldown_bar_text_arena", "arena_notification", arenaProgressBar.readyText, "arena");
						// Arena Turma
						this.initActionCooldown("cooldown_bar_text_ct", "turma_notification", ctProgressBar.readyText, "turma");
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
					// Save time
					gca_data.section.set("timers", "notify_new_guild_application", gca_tools.time.server());
				}
				// Else if it's time to check
				else if(gca_tools.time.server() - lastTime >= gca_options.int("global","notify_new_guild_application_interval") * 60000){
					// Save time
					gca_data.section.set("timers", "notify_new_guild_application", gca_tools.time.server());
					// Check guild for any application
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
				//var data = gca_data.section.get("data", "gold_exp_data", false);
				
				// Collect data every 15min = (600k ms)
				// TODO - Apo fix this
				//if (false && data && gca_tools.time.server() - data[data.length - 1][2] < 6e5*3){
				//	return;
				//}

				// If last time failed to get data (last 5 mins)
				if (new Date().getTime() - gca_data.section.get("cache", "gold_exp_data_failed", 0) < 3e5) {
					return;
				}
				
				// Go to achievements page and collect gathered gold data
				jQuery.get(gca_getPage.link({"mod":"overview","submod":"achievements"}), function(content){
					// Get server date
					var serverDate = gca_tools.time.ajaxServer(content);

					// Get saved data (again just to be sure)
					var data = gca_data.section.get("data", "gold_exp_data", []);

					// Get gold
					var gold = content.match(/<section class="achievement_detail_box" id="cat0"[^>]*>\s*<[^>]+>\s*<div class="achievement_name">[^<]*<\/div>\s*<div class="achievement_detail_current">\s*([\d\.]+)/);
					
					// Get exp
					var exp = document.getElementById('header_values_xp_bar').dataset.tooltip.match(/"(\d+) \\\/ \d+"/i);
					// If gold or exp not found
					if(gold == null || exp == null){
						gca_data.section.set("cache", "gold_exp_data_failed", new Date().getTime());
						console.log("GCA: Could not get gold or exp data.");
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
				// Create stats icon
				var icon = document.createElement('div');
				icon.id = "exp_and_gold_stats_icon";
				// Insert on page
				document.getElementById("header_game").appendChild(icon);
				// On click handler
				icon.addEventListener('click', () => {
					// Open data
					this.open();
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

				// Create a dialog
				var dialog = new gca_build.dialog;
				this.dialog = dialog;
				dialog.smallHead(true);
				dialog.title.textContent = gca_locale.get("global", "gold_exp_data");
				
				var table = document.createElement('table');
				table.style = "width: 100%;text-align: center;";
				dialog.body.appendChild(table);
				var tr = document.createElement('tr');
				tr.style = "font-weight: bold;";
				tr.appendChild(document.createElement('td'));
				tr.appendChild(document.createElement('td'));
				tr.appendChild(document.createElement('td'));
				table.appendChild(tr);
				tr = document.createElement('tr');
				tr.appendChild(document.createElement('td'));
				tr.appendChild(document.createElement('td'));
				tr.appendChild(document.createElement('td'));
				table.appendChild(tr);
				tr = document.createElement('tr');
				tr.appendChild(document.createElement('td'));
				tr.appendChild(document.createElement('td'));
				tr.appendChild(document.createElement('td'));
				table.appendChild(tr);
				tr = document.createElement('tr');
				tr.appendChild(document.createElement('td'));
				tr.appendChild(document.createElement('td'));
				tr.appendChild(document.createElement('td'));
				table.appendChild(tr);
				tr = document.createElement('tr');
				tr.appendChild(document.createElement('td'));
				tr.appendChild(document.createElement('td'));
				tr.appendChild(document.createElement('td'));
				table.appendChild(tr);
				tr = document.createElement('tr');
				tr.appendChild(document.createElement('td'));
				tr.appendChild(document.createElement('td'));
				tr.appendChild(document.createElement('td'));
				table.appendChild(tr);
				table.getElementsByTagName("tr")[0].getElementsByTagName("td")[0].style = "width: 40%;";
				table.getElementsByTagName("tr")[0].getElementsByTagName("td")[1].textContent = unescape(JSON.parse('"' +document.getElementById('header_values_xp_bar').dataset.tooltip.match(/"([^:]+):"/i)[1]+ '"'));
				table.getElementsByTagName("tr")[0].getElementsByTagName("td")[2].textContent = unescape(JSON.parse('"' +document.getElementById('icon_gold').dataset.tooltip.match(/"([^"]+)"/i)[1]+ '"'));
				table.getElementsByTagName("tr")[1].getElementsByTagName("td")[0].textContent = gca_locale.get("global", "gold_exp_data_today") + ":";
				table.getElementsByTagName("tr")[2].getElementsByTagName("td")[0].textContent = gca_locale.get("global", "gold_exp_data_week") + ":";
				table.getElementsByTagName("tr")[3].getElementsByTagName("td")[0].textContent = gca_locale.get("global", "gold_exp_data_avg_day") + ":";
				table.getElementsByTagName("tr")[4].getElementsByTagName("td")[0].textContent = gca_locale.get("global", "gold_exp_data_to_level_up") + ":";
				table.getElementsByTagName("tr")[5].getElementsByTagName("td")[0].textContent = gca_locale.get("global", "gold_exp_data_package_tax") + ":";
				table.getElementsByTagName("tr")[1].getElementsByTagName("td")[0].style = "font-weight: bold;";
				table.getElementsByTagName("tr")[2].getElementsByTagName("td")[0].style = "font-weight: bold;";
				table.getElementsByTagName("tr")[3].getElementsByTagName("td")[0].style = "font-weight: bold;";
				table.getElementsByTagName("tr")[4].getElementsByTagName("td")[0].style = "font-weight: bold;";
				table.getElementsByTagName("tr")[5].getElementsByTagName("td")[0].style = "font-weight: bold;";
				table.getElementsByTagName("tr")[1].id = "today_values";
				table.getElementsByTagName("tr")[2].id = "days7_values";
				table.getElementsByTagName("tr")[3].id = "average_per_day";
				table.getElementsByTagName("tr")[4].id = "days_left_to_level_up";
				table.getElementsByTagName("tr")[5].id = "gold_package_tax_estimation";
				
				// Add some space
				var div = document.createElement('div');
				div.className = "space";
				dialog.body.appendChild(div);
				
				// Add Canvas
				var canvas = document.createElement('canvas');
				canvas.id = "graph_canvas";
				canvas.width = 500;
				canvas.height = 200;
				canvas.style = "padding: 10px;margin: -10px;background: rgba(255,255,255,0.7);border-radius: 5px;"
				this.canvas = canvas;
				dialog.body.appendChild(canvas);
				
				// Add description
				//div = document.createElement('div');
				//div.textContent = "Click on graph's legends to enable/disable data groups. Gold and Experience data are summed starting from 7 days ago.";
				//dialog.body.appendChild(div);
				
				// Add some space
				div = document.createElement('div');
				div.className = "space";
				dialog.body.appendChild(div);
				
				var renderChart = function(){
					// Values for the Data Plot
					var data  = gca_data.section.get("data", "gold_exp_data", [[0,0,0]]);
					
					// Fix data
					var seventh_day = -1;
					var last_day = 0;
					var exp_levelup = 0;
					var goldData = [];
					var expData = [];
					var goldDataChange = [];
					var expDataChange = [];
					var goldDataAverage = [];
					var expDataAverage = [];
					var lastAverage = 0;
					var countAverage = 1;

					// Server time - 7 days (7 days = 7*24*60*60*1000 = 604800000 ms)
					var seventh_day_timestamp = gca_tools.time.server() - 6048e5;
					var last_day_timestamp = gca_tools.time.server() - 864e5;
					var newdata=[];
					
					// For every data
					data[-1]=[0,0,0];
					for (var i = 0; i < data.length-1; i++) {
						// If time is in the last 7 days
						if(data[i][2] >= seventh_day_timestamp){
							newdata.push(data[i-1]);
							
							// Sum some of the lost EXP from levelup
							if(i>0 && data[i][1] < data[i-1][1]){
								exp_levelup = exp_levelup + data[i-1][1];
							}
							// Calculate last 7 days Gold Data
								goldData[i - seventh_day-1] = {
									x : data[i][2],
									y : (data[i][0] - data[seventh_day][0])
								};
								goldDataChange[i - seventh_day-1] = {
									x : data[i][2],
									y : ((i==0)?0:(data[i][0] - data[i-1][0]))
								};
							// Calculate last 7 days Exp Data
								expData[i - seventh_day-1] = {
									x : data[i][2],
									y : (data[i][1]-data[seventh_day][1]+exp_levelup)
								};
								expDataChange[i - seventh_day-1] = {
									x : data[i][2],
									y : ((i==0)?0:(data[i][1] - data[i-1][1]))
								};
							
							// Calculate average
								var ratio = 0;
								if(goldDataAverage.length==0){
									lastAverage=seventh_day+1;
									ratio = (data[i][2] - data[seventh_day][2]) / 864e5;
									
									goldDataAverage[0] = {
										x : data[i][2],
										y : Math.round((data[i][0] - data[seventh_day][0])/ratio)
									};
									expDataAverage[0] = {
										x : data[i][2],
										y : Math.round((data[i][1] - data[seventh_day][1])/ratio)
									};
								}else if( data[i][2]-data[lastAverage][2]>=864e5/2 ){
									ratio = (data[i][2] - data[lastAverage][2]) / 864e5 ;
									goldDataAverage[countAverage] = {
										x : data[i][2],
										y : Math.round((data[i][0] - data[lastAverage][0])/ratio)
									};
									expDataAverage[countAverage] = {
										x : data[i][2],
										y : Math.round((expData[i - seventh_day-1].y-expData[lastAverage-seventh_day-1].y)/ratio)
									};
									
									lastAverage=i;
									countAverage++;
								}
							
							if(last_day==0 && data[i][2] >= last_day_timestamp){
								last_day = i - seventh_day-1;
							}
						}else{
							seventh_day = i;
						}
					}
					newdata.push(data[i-1]);
					
					// Save only last 7 days data
					gca_data.section.set("data", "gold_exp_data", newdata);
					
					// If there are no data
					if(expData.length<1 || goldData.length<1){
						document.getElementById('today_values').textContent+= " N/A";
						document.getElementById('days7_values').textContent+= " N/A";
						document.getElementById('average_per_day').textContent+= " N/A";
						document.getElementById('days_left_to_level_up').textContent+= " N/A";
						document.getElementById('graph_canvas').style.display = "none";
					} else {
						// Experience translate
						var exp_tran = unescape(JSON.parse('"' +document.getElementById('header_values_xp_bar').dataset.tooltip.match(/"([^:]+):"/i)[1]+ '"'));
						// Gold translate
						var gold_tran = unescape(JSON.parse('"' +document.getElementById('icon_gold').dataset.tooltip.match(/"([^"]+)"/i)[1]+ '"'));
						
						// Write data
						document.getElementById('today_values').getElementsByTagName("td")[1].textContent = gca_tools.strings.insertDots(expData[expData.length-1].y-expData[last_day].y)+" ";
						document.getElementById('today_values').getElementsByTagName("td")[2].textContent = gca_tools.strings.insertDots(goldData[goldData.length-1].y-goldData[last_day].y)+" ";
						var img = document.createElement('img');
						img.src = "img/ui/icon_level_small.gif";
						img.border = "0";
						document.getElementById('today_values').getElementsByTagName("td")[1].appendChild(img);
						img = document.createElement('img');
						img.src = "img/res2.gif";
						img.align = "absmiddle";
						img.border = "0";
						document.getElementById('today_values').getElementsByTagName("td")[2].appendChild(img);
						
						document.getElementById('days7_values').getElementsByTagName("td")[1].textContent = gca_tools.strings.insertDots(expData[expData.length-1].y)+" ";
						document.getElementById('days7_values').getElementsByTagName("td")[2].textContent = gca_tools.strings.insertDots(goldData[goldData.length-1].y)+" ";
						img = document.createElement('img');
						img.src = "img/ui/icon_level_small.gif";
						img.border = "0";
						document.getElementById('days7_values').getElementsByTagName("td")[1].appendChild(img);
						img = document.createElement('img');
						img.src = "img/res2.gif";
						img.align = "absmiddle";
						img.border = "0";
						document.getElementById('days7_values').getElementsByTagName("td")[2].appendChild(img);
						
						document.getElementById('average_per_day').getElementsByTagName("td")[1].textContent = gca_tools.strings.insertDots(Math.round(expData[expData.length-1].y/7))+" ";
						document.getElementById('average_per_day').getElementsByTagName("td")[2].textContent = gca_tools.strings.insertDots(Math.round(goldData[goldData.length-1].y/7))+" ";
						img = document.createElement('img');
						img.src = "img/ui/icon_level_small.gif";
						img.border = "0";
						document.getElementById('average_per_day').getElementsByTagName("td")[1].appendChild(img);
						img = document.createElement('img');
						img.src = "img/res2.gif";
						img.align = "absmiddle";
						img.border = "0";
						document.getElementById('average_per_day').getElementsByTagName("td")[2].appendChild(img);
						
						document.getElementById('days_left_to_level_up').getElementsByTagName("td")[1].textContent = Math.round((document.getElementById('header_values_xp_bar').dataset.tooltip.match(/"\d+ \\\/ (\d+)"/i)[1]-document.getElementById('header_values_xp_bar').dataset.tooltip.match(/"(\d+) \\\/ \d+"/i)[1])/(expData[expData.length-1].y/7));
						document.getElementById('gold_package_tax_estimation').getElementsByTagName("td")[2].textContent = gca_tools.strings.insertDots( Math.round(goldData[goldData.length-1].y/50) );
						img = document.createElement('img');
						img.src = "img/res2.gif";
						img.align = "absmiddle";
						img.border = "0";
						document.getElementById('gold_package_tax_estimation').getElementsByTagName("td")[2].appendChild(img);
						
						// Populate graph
						new Chart(document.getElementById('graph_canvas'), {
							type: 'line',
							data: {
								datasets: [
									{
										label: gold_tran,
										fill: true,
										backgroundColor: "rgba(255,193,7,0.3)",
										borderColor: "rgba(255,193,7,1)",
										data: goldDataAverage
									},
									{
										label: gca_locale.get("global","gold_exp_data_total_gold"),
										fill: true,
										backgroundColor: "rgba(255,193,7,0.3)",
										borderColor: "rgba(255,193,7,1)",
										data: goldData,
										hidden: true
									},
									{
										label: gca_locale.get("global","gold_exp_data_measurements"), 
										type: 'line',
										backgroundColor: "rgba(255,193,7,0.3)",
										borderColor: "rgba(255,193,7,1)",
										data: goldDataChange,
										hidden: true,
										pointStyle: "crossRot",
										showLine: false
									},
									{
										label: exp_tran,
										fill: true,
										backgroundColor: "rgba(75,192,192,0.3)",
										borderColor: "rgba(75,192,192,1)",
										data: expDataAverage,
										hidden: true
									},
									{
										label: gca_locale.get("global","gold_exp_data_total_exp"),
										fill: true,
										backgroundColor: "rgba(75,192,192,0.3)",
										borderColor: "rgba(75,192,192,1)",
										data: expData,
										hidden: true
									},
									{
										label: gca_locale.get("global","gold_exp_data_measurements"),
										type: 'line',
										backgroundColor: "rgba(75,192,192,0.3)",
										borderColor: "rgba(75,192,192,1)",
										data: expDataChange,
										hidden: true,
										pointStyle: "cross",
										showLine: false
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
									}],
									yAxes: [{
										ticks: {
											min: 0
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
				gca_global.scripts.chartScript.create(renderChart);
				
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
			}
		}
	},
	
	//Display Centurio & PowerUps days every 12h
	centurio_days : {
		init : function(){
			// Create the dataset
			document.getElementById('mainmenu').getElementsByClassName('premium')[0].dataset.centurio_days = 0;
			
			// Get timers
			let now = new Date().getTime();
			
			// CENTURIO
			let last_time_check = gca_data.section.get("cache", "gca_centurio", null);
			let centurio_days = gca_data.section.get("timers", "gca_centurio", null);
			
			// When on centurio page
			if(gca_section.mod=='premium' && gca_section.submod=='centurio'){
				let end_time = now;
				if(document.getElementById('premium_duration')){
					if(document.getElementById('premium_duration').getElementsByClassName('ticker').length>0){
						end_time += parseInt(document.getElementById('premium_duration').getElementsByClassName('ticker')[0].dataset.tickerTimeLeft);
					}else{
						end_time += parseInt(document.getElementById('premium_duration').textContent.match(/\d+/i))*24*60*60*1000;
					}
				}
				//let end_time = (document.getElementById('premium_duration'))? now + parseInt(document.getElementById('premium_duration').getElementsByClassName('ticker')[0].dataset.tickerTimeLeft) : now;
				gca_data.section.set("cache", "gca_centurio", now);
				gca_data.section.set("timers", "gca_centurio", end_time);
				// Fill UI
				this.display();
				
			// If checked on the last x hours return
			}else if(last_time_check !== null && centurio_days !== null && (last_time_check + (12*60*60*1000)) > now){
				// Already checked
				// Fill UI
				this.display();
			
			// Request page
			}else{
				jQuery.get(gca_getPage.link({"mod":"premium","submod":"centurio"}), function(content){
					now = new Date().getTime();
					gca_data.section.set("cache", "gca_centurio", now);
					if( content.match(/<div id="premium_duration">/) ){
						let end_time = now + parseInt(content.match(/<div id="premium_duration">[^<]+<span>[^<]+<span data-ticker-time-left="(\d+)"/)[1]);
						gca_data.section.set("timers", "gca_centurio", end_time);
					}else{
						gca_data.section.set("timers", "gca_centurio", 0);
					}
					// Fill UI
					gca_global.centurio_days.display();
				});
			}
			
			// POWERUPS
			last_time_check = gca_data.section.get("cache", "gca_powerups", null);
			let powerups_status = gca_data.section.get("timers", "gca_powerups", [
				{enabled : 0, reload : 0, type : [null,null]},
				{enabled : 0, reload : 0, type : [null,null]},
				{enabled : 0, reload : 0, type : [null,null]},
				{enabled : 0, reload : 0, type : [null,null]}
			]);
			
			// When on powerups page
			if(gca_section.mod=='powerups'){
				let powerups = document.getElementsByClassName('powerup_duration');
				let imgs = [
					document.getElementsByClassName('powerUpImg1'),
					document.getElementsByClassName('powerUpImg2'),
					document.getElementsByClassName('powerUpImg3'),
					document.getElementsByClassName('powerUpImg4'),
					document.getElementsByClassName('powerUpImg5')
				];
				for(let i=0;i<powerups.length;i++){
					// if enabled
					if(powerups[i].style.color=='green'){
						let time = powerups[i].textContent.match(/\d+/g);
						if(time.length == 3){
							powerups_status[i].enabled = now + (time[0]*24*60*60+time[1]*60*60+time[2]*60)*1000;
						}else if(time.length == 2){
							powerups_status[i].enabled = now + (time[0]*60*60+time[1]*60)*1000;
						}else if(time.length == 1){
							powerups_status[i].enabled = now + time[0]*60*1000;
						}
						// if reload wait time
						if(powerups[i].parentNode.getElementsByClassName('powerup_cooldown').length>0)
							powerups_status[i].reload = now + parseInt(powerups[i].parentNode.getElementsByClassName('powerup_cooldown')[0].getElementsByTagName('span')[0].dataset.tickerTimeLeft);
						// find type
						for(let j=0;j<5;j++){
							if(imgs[j][i].style.backgroundImage.match('_border')){
								powerups_status[i].type = [
									document.getElementById('rune'+(i+1)+'_'+(j+1)).dataset.tooltip,
									document.getElementById('rune'+(i+1)+'_'+(j+1)).style.backgroundImage
								];
							}
						}
					}
				}
				gca_data.section.set("cache", "gca_powerups", now);
				gca_data.section.set("timers", "gca_powerups", powerups_status);
				// Fill UI
				this.display();
			}
			// If checked on the last x hours return
			// TODO - Apo check this
			//else if(last_time_check !== null && (last_time_check + (12*60*60*1000)) > now && false){
			//	// Already checked
			//	// Fill UI
			//	this.display();
			//}
			// Request page
			else{
				jQuery.get(gca_getPage.link({"mod":"powerups"}), function(content){
					now = new Date().getTime();
					let found = content.match(/id="rune\d_\d"\s+class="powerUpImg\d"\s+data-tooltip="[^"]+"\s+style="background-image: [^;]+;"/gi);
					let found2 = content.match(/<span class="powerup_duration" style="color: green;">[^<]+<\/span>/gi);
					let found3 = content.match(/id="runeTitle\d" class="rune_title">[^<]+<\/span>\s*<\/h2>\s*<section>\s*<span class="powerup_cooldown">[^<]+<span data-ticker-time-left="\d+"/gi);
					
					let powerups_status = [
						{enabled : 0, reload : 0, type : [null,null]},
						{enabled : 0, reload : 0, type : [null,null]},
						{enabled : 0, reload : 0, type : [null,null]},
						{enabled : 0, reload : 0, type : [null,null]}
					];
					
					if( found ){
						for(let i=0;i<found.length;i++){
							let temp = found[i].match(/id="rune(1|2|3|4)_\d"\s+class="powerUpImg\d"\s+data-tooltip="([^"]+)"\s+style="background-image: ([^;]+);"/i);
							let position = parseInt(temp[1])-1;
							powerups_status[position].type = [temp[2].replace(/&quot;/g,'"').replace(/&lt;br\\\/&gt;/g,'<br/>').replace(/&amp;nbsp;/g,' '),temp[3]];
							temp = found2[i].match(/\d+/g);
							if(temp.length == 3){
								powerups_status[position].enabled = now + (temp[0]*24*60*60+temp[1]*60*60+temp[2]*60)*1000;
							}else if(temp.length == 2){
								powerups_status[position].enabled = now + (temp[0]*60*60+temp[1]*60)*1000;
							}else if(temp.length == 1){
								powerups_status[position].enabled = now + temp[0]*60*1000;
							}
							//powerups_status[position].reload = 0;
						}
						if(found3){//Cooldown
							for(let i=0;i<found3.length;i++){
								let temp = found3[i].match(/id="runeTitle(\d+)" class="rune_title">[^<]+<\/span>\s*<\/h2>\s*<section>\s*<span class="powerup_cooldown">[^<]+<span data-ticker-time-left="(\d+)"/i);
								let position = parseInt(temp[1])-1;
								powerups_status[position].reload = now + parseInt(temp[2]);
							}
						}
					}
					gca_data.section.set("cache", "gca_powerups", now);
					gca_data.section.set("timers", "gca_powerups", powerups_status);
					// Fill UI
					gca_global.centurio_days.display();
				});
			}
		},
		display : function(){
			let now = new Date().getTime();
			let tooltip = [];
			let unencode = function(str){
				str = JSON.parse('"'+str+'"');
				return str;
			}
			let premium_button = document.getElementById('mainmenu').getElementsByClassName('premium')[0];
			
			
			let centurio_days = gca_data.section.get("timers", "gca_centurio", null);
			if((centurio_days-now) > 0){
				if(centurio_days != null && centurio_days != premium_button.dataset.centurio_days ){
					premium_button.dataset.centurio_days = centurio_days;
					
					let minutes = Math.round( (centurio_days-now)/(60*1000) );
					let string;
					if(minutes<=60){
						string = minutes+'m';
					}else if(minutes<=60*24){
						string = Math.round(minutes/60)+'h';
					}else{
						string = Math.round(minutes/60/24)+'d';
					}
					
					if(!premium_button.textContent.match(/\(/)){
						premium_button.textContent += ' ('+string+')';
					}else{
						premium_button.textContent.replace(/\([^\)]+\)/i,'('+string+')');
					}
				}
				let days = Math.floor( (centurio_days-now)/(24*60*60*1000) );
				tooltip.push([[premium_button.textContent.replace(/\([^\)]+\)/i,''),days+' '+gca_locale.get("general", "days")+', '+gca_tools.time.msToHMS_String(centurio_days-now-days*24*60*60*1000)],['#FF6A00; font-size:12px; text-shadow: 0 0 2px #000, 0 0 2px #FF6A00','#fff; font-size:12px;']]);
			}
			
			let powerups_status = gca_data.section.get("timers", "gca_powerups", [
				{enabled : 0, reload : 0, type : [null,null]},
				{enabled : 0, reload : 0, type : [null,null]},
				{enabled : 0, reload : 0, type : [null,null]},
				{enabled : 0, reload : 0, type : [null,null]}
			]);
			for(let i=0;i<powerups_status.length;i++){
				if(powerups_status[i].enabled-now > 0){
					let days = Math.floor( (powerups_status[i].enabled-now)/(24*60*60*1000) );
					tooltip.push([[unencode(powerups_status[i].type[0].match(/"([^"]+)"/i)[1]),days+' '+gca_locale.get("general", "days")+', '+gca_tools.time.msToHMS_String(powerups_status[i].enabled-now-days*24*60*60*1000)],['#FF6A00; font-size:12px; text-shadow: 0 0 2px #000, 0 0 2px #FF6A00','#fff; font-size:12px;']]);
					if(powerups_status[i].reload-now > 0){
						tooltip.push([[unencode(powerups_status[i].type[0].match(/"([^"]+)","#00B712"/i)[1]),'↺ '+gca_tools.time.msToHMS_String(powerups_status[i].reload-now)],['green','red']]);
					}else{
						tooltip.push([unencode(powerups_status[i].type[0].match(/"([^"]+)","#00B712"/i)[1]),'green']);
					}
				}
			}
			
			if(tooltip.length>0){
				premium_button.dataset.tooltip = JSON.stringify([tooltip]);
			}
		}
	},
	
	gcaWindow : function(){
		// Get timers
		let now = new Date().getTime();
		let last_time_shown = gca_data.section.get("timers", "gca_window", null);
		
		// If window was displayed on the last x hours return
		if(last_time_shown !== null && (last_time_shown + (48*60*60*1000)) > now){
			return;
		}

		// Save time shown
		gca_data.section.set("timers", "gca_window", now);
		
		// Create a dialog
		let dialog = new gca_build.dialog;
		this.dialog = dialog;
		dialog.smallHead(true);
		dialog.title.textContent = "Gladiatus Crazy Addon v" + gca.version;
		dialog.body.style.fontStyle = "16px";

		// Subtitle
		let suptitle = document.createElement("div");
		suptitle.style.fontStyle = "italic";
		suptitle.style.fontSize = "14px";
		suptitle.style.textAlign = "center";
		suptitle.textContent = "Making gladiatus great since 2010!";
		dialog.body.appendChild(suptitle);

		// Create letter
		let letter = document.createElement("div");
		letter.style.fontSize = "16px";
		letter.style.fontStyle = "italic";
		letter.style.padding = "10px 30px";


		let p, icon, a;

		// Letter start
		let start = document.createElement("div");
		start.appendChild(document.createTextNode("Ave Gladiator,"));

		// Letter body
		let body = document.createElement("div");
		body.style.marginLeft = "40px";
		body.style.paddingTop = "10px";
		body.style.textAlign = "justify";
		body.style.textJustify = "inter-word";

		p = document.createElement("div");
		p.style.paddingBottom = "10px";
		p.appendChild(document.createTextNode("Thank you for using Gladiatus Crazy Addon."));
		body.appendChild(p);

		p = document.createElement("div");
		p.style.paddingBottom = "10px";
		p.appendChild(document.createTextNode("If you find a "));
		icon = document.createElement("div");
		icon.className = "gca_windows_icon gca_windows_icon-bug";
		p.appendChild(icon);
		p.appendChild(document.createTextNode(" "));
		a = document.createElement("a");
		a.setAttribute("href", "https://github.com/DinoDevs/GladiatusCrazyAddon/issues");
		a.setAttribute("target", "_blank");
		a.setAttribute("rel", "noreferrer");
		a.style.color = "#b50604";
		a.style.textDecoration = "underline";
		a.textContent = "bug";
		p.appendChild(a);
		p.appendChild(document.createTextNode(" or you have a nice "));
		icon = document.createElement("div");
		icon.className = "gca_windows_icon gca_windows_icon-idea";
		p.appendChild(icon);
		p.appendChild(document.createTextNode(" "));
		a = document.createElement("a");
		a.setAttribute("href", "https://github.com/DinoDevs/GladiatusCrazyAddon/issues");
		a.setAttribute("target", "_blank");
		a.setAttribute("rel", "noreferrer");
		a.style.color = "#545454";
		a.style.textDecoration = "underline";
		a.textContent = "idea";
		p.appendChild(a);
		p.appendChild(document.createTextNode(" for a new feature, you can open an issue on our "));
		icon = document.createElement("div");
		icon.className = "gca_windows_icon gca_windows_icon-github";
		p.appendChild(icon);
		p.appendChild(document.createTextNode(" "));
		a = document.createElement("a");
		a.setAttribute("href", "https://github.com/DinoDevs/GladiatusCrazyAddon/issues");
		a.setAttribute("target", "_blank");
		a.setAttribute("rel", "noreferrer");
		a.style.color = "#000";
		a.style.textDecoration = "underline";
		a.textContent = "Github page";
		p.appendChild(a);
		p.appendChild(document.createTextNode(" or send us a "));
		icon = document.createElement("div");
		icon.className = "gca_windows_icon gca_windows_icon-facebook";
		p.appendChild(icon);
		p.appendChild(document.createTextNode(" "));
		a = document.createElement("a");
		a.setAttribute("href", "https://www.facebook.com/GladiatusCrazyAddOn/");
		a.setAttribute("target", "_blank");
		a.setAttribute("rel", "noreferrer");
		a.style.color = "#3c5b9b";
		a.style.textDecoration = "underline";
		a.textContent = "Facebook message";
		p.appendChild(a);
		p.appendChild(document.createTextNode("."));
		body.appendChild(p);

		p = document.createElement("div");
		p.style.paddingBottom = "10px";
		p.appendChild(document.createTextNode("We need your support! Buy us a "));
		icon = document.createElement("div");
		icon.className = "gca_windows_icon gca_windows_icon-beer";
		p.appendChild(icon);
		p.appendChild(document.createTextNode(" "));
		a = document.createElement("a");
		a.setAttribute("href", "https://paypal.me/gcadonation/5");
		a.setAttribute("target", "_blank");
		a.setAttribute("rel", "noreferrer");
		a.style.color = "#af790f";
		a.style.textDecoration = "underline";
		a.textContent = "beer";
		p.appendChild(a);
		p.appendChild(document.createTextNode(" by donating and also help us by "));
		icon = document.createElement("div");
		icon.className = "gca_windows_icon gca_windows_icon-translation";
		p.appendChild(icon);
		p.appendChild(document.createTextNode(" "));
		a = document.createElement("a");
		a.setAttribute("href", "http://gladiatuscrazyaddon.tk/TransSystem/trans.php");
		a.setAttribute("target", "_blank");
		a.setAttribute("rel", "noreferrer");
		a.style.color = "#3278ee";
		a.style.textDecoration = "underline";
		a.textContent = "translating the addon";
		p.appendChild(a);
		p.appendChild(document.createTextNode(" in your language!"));
		body.appendChild(p);

		p = document.createElement("div");
		p.style.paddingBottom = "10px";
		p.appendChild(document.createTextNode("Do not forget to visit the addon's "));
		a = document.createElement("a");
		a.setAttribute("href", gca_getPage.link({"mod":"settings","gcamod":"settings"}));
		a.setAttribute("target", "_blank");
		a.style.color = "#000";
		a.style.textDecoration = "underline";
		a.textContent = "settings";
		p.appendChild(a);
		p.appendChild(document.createTextNode(", so that you can enable or disable any feature you want."));
		body.appendChild(p);

		// Letter end
		let end = document.createElement("div");
		end.appendChild(document.createTextNode("Yours,"));
		end.appendChild(document.createElement("br"));
		end.appendChild(document.createTextNode("GreatApo & DarkThanos"));

		// Build letter
		letter.appendChild(start);
		letter.appendChild(body);
		letter.appendChild(end);
		dialog.body.appendChild(letter);
		
		// Add close Button
		var button = document.createElement('input');
		button.className = "button3";
		button.type = "button";
		button.style = "float: right;";
		button.value = gca_locale.get("general", "close");
		dialog.body.appendChild(button);
		button.addEventListener('click', function(){dialog.close();}, false);

		let div = document.createElement("div");
		div.style.clear = "both";
		dialog.body.appendChild(div);
		
		dialog.open();
	},
	
	update_guild_info : function(){
		// Get timers
		let now = new Date().getTime();
		let last_time = gca_data.section.get("timers", "guild_info_update", null);
		
		// If updated the last x hours return
		if(last_time !== null && (last_time + (24*60*60*1000)) > now)
			return;

		// Save time shown
		gca_data.section.set("timers", "guild_info_update", now);
		
		// Get online guild members
		jQuery.get(gca_getPage.link({"mod":"guild","submod":"memberList","order":"o"}), function(content){
			// Match All active players
			let guild_players_data = content.match(/<tr>\s*<td>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+">([^<]+)<\/a>\s*<\/td>\s*<td>([^<]+)<\/td>\s*<td>(\d+)<\/td>\s*<td align="right">\s*[^<]*(<span[^>]*>[^<]*<\/span>|)\s*<\/td>\s*<td align="right"><span style="color:[^>]+>([^<]*)</mg);
				
			// Check if you are on a guild
			if(!guild_players_data && content.match(/<form\s+action="index.php\?mod=guild&submod=create&sh=/i)){
				// Save that you are not on guild
				if(gca_data.section.get("guild", "inGuild", false)){
					gca_data.section.set("guild", "inGuild", false);
					gca_data.section.del("guild", "mates");
				}
			}
			// You are in a guild, so update guild data
			else{
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
		});
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

// ESlint defs
/* global gca, gca_audio, gca_build, gca_data, gca_getPage, gca_locale, gca_notifications, gca_options, gca_resources, gca_section, gca_tools */
/* global jQuery, Chart, expeditionProgressBar, dungeonProgressBar, arenaProgressBar, ctProgressBar */
