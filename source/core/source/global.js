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
		(gca_options.bool("global","x-scroll") && 
			this.display.xScrollFix());
		// If Item shadow
		(gca_options.bool("global","item_shadow") && 
			this.display.itemShadow.preload());
	},
	// Inject Code
	inject : function(){

		// Resolve Game Modes
		this.gameModeResolve();
		// Resolve Page direction
		this.pageDirectionResolve();

		// Display gca version on footer
		this.display.version();
		// Show premium days
		this.display.show_premium_days();

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
		(gca_options.bool("global","quest_timer") &&
			this.display.quests_timer.inject());

		// Merchants Timer
		//(gca_options.bool("global","merchants_timer") &&
		//	this.display.merchants_time.inject());

		// If Item shadow
		(gca_options.bool("global","item_shadow") && 
			this.display.itemShadow.inventory());

		// Event Craps Timer
		(this.isEvent.craps && gca_options.bool("global","craps_timer") &&
			this.display.event.craps_timer.inject());

		// Remember merchants' and inventory tabs
		(gca_options.bool("global","remember_tabs") && 
			this.background.remember_tabs.init());

		// Notification : Guild application alert
		(!this.isTraveling && gca_options.bool("global","notify_new_guild_application") && 
			this.background.notify_me.new_guild_application());

		
		// Pray Buf shortcut - TODO clean code
		(this.isInUnderworld && 
			this.underworld.prayBufShortCut());

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
			serverBosses : false
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
				this.isEvent.serverBosses = true;
			}
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

		// Show Premium Days
		show_premium_days : function(){
			// Calculate Days left
			var prem_days = Math.ceil(( gca_data.section.get("timers", "premium_expiration", 0) - ((new Date()).getTime() / 1000) ) / 86400);

			// Create element
			var div = document.createElement("div");
			div.id = "show_premium_days";
			div.className = "show_prem_days";
			var h = document.createElement("h4");
			h.className = "show_prem_days_text";
			var link = document.createElement("a");
			link.setAttribute("target", "_blank");

			// TODO
			// We need some traslations here

			// If player have active premium
			if(prem_days > 0){
				link.href = "http://gladiatuscrazyaddon.tk/index.php?mode=donate";
				link.style.color = "#dcbb96";
				link.title = "By another premium key";
				link.textContent = 'GCA Premium: ' + prem_days + ' ' + gca_locale.get("days");
			}
			// If player do not have a premium
			else{
				link.href = "http://q.gs/1940284/free-gca-key";
				link.style = "color:yellow;font-weight:bold;";
				link.title = "Get 1 day FREE Key";
				link.textContent = "Get GCA premium FREE!";
			}
			
			// Insert elements on page
			h.appendChild(link);
			div.appendChild(h);
			document.body.appendChild(div);
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
					link.dataset.tooltip = JSON.stringify([[['<img style="width:20px;" align="absmiddle" src="img/premium/token/18.jpg"> ' + gca_locale.get('use_life_potion'),"white"]]]);
					
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
						gca_notifications.error( "0 " + gca_locale.get("life_potions_left") );
						return;
					}

					// Use Potion
					var self = this;
					jQuery.get(gca_getPage.link({"mod":"premium","submod":"inventoryActivate","feature":"18","token":potions}), function(content){
						// Match players life
						var life = content.match(/<div\s*id="header_values_hp_bar"\s*class="header_values_bar"\s*data-tooltip="\[\[\[\[[^,]+,&quot;(\d+)\s*\\\/\s*(\d+)&quot;\]/m);
						if(life){
							life = [parseInt(life[1]), parseInt(life[2])];
						}else{
							life = [0,0];
						}
						life.unshift( life[0] == life[1] );

						self.usageSet(false);

						// Report success
						gca_notifications.success( gca_locale.get("a_life_potion_was_used") + " (" + (potions-1) + " " + gca_locale.get("life_potions_left") + ")" );
						// Update HP
						gca_global.display.extended_hp_xp.updateLife(life[1], life[2]);
					})
					// If Request Failed
					.fail(function(){
						self.usageSet(false);
						// Report Error
						gca_notifications.error( gca_locale.get("error") );
					});
				},

				// Get Potion Number
				getPotionsNumber : function(callback){
					// Load premium inventory page
					jQuery.get(gca_getPage.link({"mod":"premium","submod":"inventoryActivate"}), function(content){
						// Match potion number
						var potions = content.match(/document\.location\.href='index\.php\?mod=premium&submod=inventoryActivate&feature=18&token=(\d+)&sh=/);
						if(potions){
							potions = parseInt(potions[1]);
						}else{
							potions = 0;
						}

						// Match players life
						var life = content.match(/<div\s*id="header_values_hp_bar"\s*class="header_values_bar"\s*data-tooltip="\[\[\[\[[^,]+,&quot;(\d+)\s*\\\/\s*(\d+)&quot;\]/m);
						if(life){
							life = [parseInt(life[1]), parseInt(life[2])];
						}else{
							life = [0,0];
						}
						// Push infrond true/false if life is full/notfull
						life.unshift( life[0] == life[1] );

						// Update HP
						gca_global.display.extended_hp_xp.updateLife(life[1],life[2]);

						// Return result
						callback(potions, life);
					});
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
				lifeTooltip[0].push([[gca_locale.get('full_life_recover_in'), minites_left + " " + gca_locale.get('minutes')], ["#BA9700","#BA9700"]]);
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
						link.title = gca_locale.get("write_private_message");
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
							div.className = "title2_box";

							let temp = document.createElement('i');
							temp.textContent = gca_locale.get("write_guild_message")+":";
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
							temp.value = gca_locale.get("send");
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
										gca_notifications.success( gca_locale.get("guild_message_was_sent") );
									}else{
										gca_notifications.error( gca_locale.get("guild_message_sent_failed") );
									}
								});
								if(!send){
									gca_notifications.error( gca_locale.get("there_are_no_data") );
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
							temp.textContent = gca_locale.get('exclude_me');
							div.appendChild(temp);
							
							instant_message_div.appendChild(div);
						}

						// Create Button layout
						button = document.createElement('div');
						button.className = 'icon-out';

						link = document.createElement('a');
						link.className = 'icon message-icon';
						link.href = gca_getPage.link({"mod":"guild","submod":"adminMail"});
						link.title = gca_locale.get("write_guild_message");

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
							link.title = gca_locale.get("go_to_guilds_medic_center");
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
							link.title = gca_locale.get("go_to_guilds_market");
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
							link.title = gca_locale.get("go_to_guilds_storage");
							button.appendChild(link);
							shortcutsBar.appendChild(button);
						}
						
						// Create a Link to guild's bank
						if(activeButtons.indexOf("gbn") >= 0){
							let instant_donate_gold = document.createElement('div');
							instant_donate_gold.className = "instant_message_div instant";
							instant_donate_gold.style.display = "none";
							let div = document.createElement('div');
							div.className = "title2_box";
							let input = document.createElement('input');
							input.type = "button";
							input.id = "donate_all_button";
							input.className = "button1";
							input.value = gca_locale.get("donate_all_your_gold");
							input.addEventListener('click', function(){
								gca_global.display.shortcuts_bar.donate_all_money();
							}, false);
							div.appendChild(input);
							instant_donate_gold.appendChild(div);

							button = document.createElement('div');
							button.className = "icon-out";
							link = document.createElement('a');
							link.className = "icon gold-icon";
							link.href = gca_getPage.link({"mod":"guildBankingHouse"});
							//link.title = gca_locale.get("go_to_guilds_bank");
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
							link.title = gca_locale.get("go_to_guilds_war_camp");
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
							link.title = gca_locale.get("go_to_guilds_jail");
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
							link.title = gca_locale.get("go_to_guilds_library");
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
					link.title = gca_locale.get("go_to_simulator");
					link.setAttribute("target", "_blank");
					button.appendChild(link);
					shortcutsBar.appendChild(button);
				}
				
				// Display your player stats
				if(activeButtons.indexOf("stt") >= 0){
					var table_wrapper = document.createElement("div");
					table_wrapper.className = "title2_box";
					var statsHtmlTable = document.createElement("table");
					statsHtmlTable.id = "gca_player_stats_table";

					var show_stats = document.createElement('div');
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
					
					// Shotcut button
					button = document.createElement('div');
					button.className = "icon-out";
					link = document.createElement('a');
					link.className = "icon people-icon";
					link.title = gca_locale.get("display_my_stats");
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
					link.title = gca_locale.get("display_online_players");
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
						dialog.title.textContent = gca_locale.get( "online_friends" );

						// Temp elements variables
						var table, tr, td, div, span;

						// Headers
						table = document.createElement('table');
						table.className = "online_friends_table";
						tr = document.createElement('tr');
						td = document.createElement('td');
						td.setAttribute("width", "50%");
						td.textContent = gca_locale.get( "guild_friends" ) + " ";
						span = document.createElement('span');
						span.id = "online_friends_guild_counter";
						td.appendChild(span);
						tr.appendChild(td);
						td = document.createElement('td');
						td.setAttribute("width", "50%");
						td.textContent = gca_locale.get( "family_friends" ) + " ";
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
						button.value = gca_locale.get("close");
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
			donate_all_money : function(){
				var gold = gca_tools.strings.removeDots(
					gca_tools.strings.trim(
						document.getElementById('sstat_gold_val').textContent
					)
				);
				
				if(gold == 0)
					gca_notifications.warning( gca_locale.get("no_gold") );

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
						gca_notifications.success( gca_locale.get("gold_donated") );
					},
					error: function(){
						document.getElementById('sstat_gold_val').textContent = gca_tools.strings.insertDots(gold);
						gca_notifications.error( gca_locale.get("gold_donation_failed") );
					}
				});
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
						td.textContent = gca_locale.get("there_are_no_data");
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
							span.className = gca_locale.get("error");
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
						statusUI.textContent = gca_locale.get("error");
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
				if(document.documentElement.className.length>0)
					document.documentElement.className += " ";
				document.documentElement.className += "event_bar_moved";
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
			// Create Advance menu
			create : function(){

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
				var overview = main_links[0];
				var overview_active = (overview.className.match('active')) ? '_active' : '';

				// Hightscore Link
				var highscore = main_links[3];
				var highscore_active = (highscore.className.match('active')) ? '_active' : '';

				// Pantheon Link
				var pantheon = main_links[1];
				var pantheon_active = (pantheon.className.match('active')) ? '_active' : '';
				var guild = main_links[2];
				var guild_active = (guild.className.match('active')) ? '_active' : '';


				// While not traveling
				if(!gca_global.isTraveling){
					// Submenu links
					var sublink = {
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
						if(!sublink.work.active && sub_links[i].href.match(/index.php\?mod=work(&|&amp;)sh=/i)){
							sublink.work.active = i;
						}
						else if(!sublink.arena.active && sub_links[i].href.match(/index.php\?mod=arena(&|&amp;)sh=/i)){
							sublink.arena.active = i;
						}
						else if(!sublink.training.active && sub_links[i].href.match(/index.php\?mod=training(&|&amp;)sh=/i)){
							sublink.training.active = i;
						}
						else if(!sublink.weaponSmith.active && sub_links[i].href.match(/index.php\?mod=inventory(&|&amp;)sub=1(&|&amp;)sh=/i)){
							sublink.weaponSmith.active = i;
						}
						else if(!sublink.armourSmith.active && sub_links[i].href.match(/index.php\?mod=inventory(&|&amp;)sub=2(&|&amp;)sh=/i)){
							sublink.armourSmith.active = i;
						}
						else if(!sublink.generalGoods.active && sub_links[i].href.match(/index.php\?mod=inventory(&|&amp;)sub=3(&|&amp;)sh=/i)){
							sublink.generalGoods.active = i;
						}
						else if(!sublink.alchemist.active && sub_links[i].href.match(/index.php\?mod=inventory(&|&amp;)sub=4(&|&amp;)sh=/i)){
							sublink.alchemist.active = i;
						}
						else if(!sublink.mercenaries.active && sub_links[i].href.match(/index.php\?mod=inventory(&|&amp;)sub=5(&|&amp;)sh=/i)){
							sublink.mercenaries.active = i;
						}
						else if(!sublink.forge.active && sub_links[i].href.match(/index.php\?mod=forge(&|&amp;)sh=/i)){
							sublink.forge.active = i;
						}
						else if(!sublink.malefica.active && sub_links[i].href.match(/index.php\?mod=inventory(&|&amp;)sub=6(&|&amp;)sh=/i)){
							sublink.malefica.active = i;
						}
						else if(!sublink.wizard.active && sub_links[i].href.match(/index.php\?mod=magus(&|&amp;)sh=/i)){
							sublink.wizard.active = i;
						}
						else if(!sublink.auction.active && sub_links[i].href.match(/index.php\?mod=auction(&|&amp;)sh=/i)){
							sublink.auction.active = i;
						}
						else if(!sublink.market.active && sub_links[i].href.match(/index.php\?mod=market(&|&amp;)sh=/i)){
							sublink.market.active = i;
						}
					};

					// Arena
					if(sublink.arena.active){
						var arena = sub_links[sublink.arena.active];
						var arena_active = (arena.className.match('active')) ? '_active' : '';
					}
					// Forge
					if(sublink.forge.active){
						var forge = sub_links[sublink.forge.active];
						var forge_active = (forge.className.match('active')) ? '_active' : '';
					}
					// Auction
					if(sublink.auction.active){
						var auction = sub_links[sublink.auction.active];
						var auction_active = (auction.className.match('active')) ? '_active' : '';
					}
					// Market
					if(sublink.market.active){
						var market = sub_links[sublink.market.active];
						var market_active = (market.className.match('active')) ? '_active' : '';
					}
				}

				// Inject Overview Link
				this.convertMenu.addTabs("overview", overview, overview_active, [
					{href : gca_getPage.link({"mod":"overview","submod":"stats"}), img : {style : 'background: center no-repeat url(img/ui/icon_highscore.gif);height: 26px;'}},
					{text : 'X', href : gca_getPage.link({"mod":"overview","doll":"2"})},
					{text : 'I', href : gca_getPage.link({"mod":"overview","doll":"3"})},
					{text : 'II', href : gca_getPage.link({"mod":"overview","doll":"4"})},
					{text : 'III', href : gca_getPage.link({"mod":"overview","doll":"5"})},
					{text : 'IV', href : gca_getPage.link({"mod":"overview","doll":"6"})}
				]);

				// Inject Highscore Link
				this.convertMenu.addPlus(highscore, highscore_active, {href : "http://gladiatuscrazyaddon.tk/index.php?mode=highscore", target : "_blank"});

				// Inject Pantheon Link
				this.convertMenu.addPlus(pantheon, pantheon_active, {href : gca_getPage.link({"mod":"gods"})});

				// Inject Guild Link
				this.convertMenu.addTabs("guild", guild, guild_active, [
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
						this.convertMenu.addPlus(arena, arena_active, {href : gca_getPage.link({"mod":"arena","submod":"grouparena"})});

						// Forge
						if(forge){
							this.convertMenu.addPlus(forge, forge_active, {href : gca_getPage.link({"mod":"forge","submod":"smeltery"})});
						}
						// Auction
						if(auction){
							this.convertMenu.addPlus(auction, auction_active, {href : gca_getPage.link({"mod":"auction","ttype":"3"})});
						}
						// Inject Market Link
						if(market){
							this.convertMenu.addTabs("market", market, market_active, [
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
						this.convertMenu.addPlus(arena, arena_active, {href : getPage.link({"mod":"arena","submod":"grouparena"})});
					}
				}
			},

			convertMenu : {
				// Add a + button
				addPlus : function(menu, active, options){
					// Inject Link
					var newMenu = document.createElement("div");
					newMenu.className = "advanced_menu_entry";
					menu.parentNode.insertBefore(newMenu, menu.nextSibling);
					newMenu.appendChild(menu);
					menu.className += " advanced_menu_link" + active;
					// Plus Link
					var a = document.createElement("a");
					a.className = "advanced_menu_shift";
					a.textContent = ">";
					a.style.fontFamily = "consolas";
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
				}
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
				var tr, td, img, text;

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
				img = document.createElement("img");
				img.setAttribute('align','absmiddle');
				img.src = "img/ui/icon_arena.gif";
				img.style.height = "18px";
				this.arenaTimeElement.arena = document.createElement("span");
				this.arenaTimeElement.arena.className = "timer";
				td.appendChild(img);
				td.appendChild(this.arenaTimeElement.arena);
				tr.appendChild(td);
				
				// Grouparena Timer
				td = document.createElement("td");
				img = document.createElement("img");
				img.setAttribute('align','absmiddle');
				img.src = "img/ui/icon_grouparena.gif";
				img.style.height = "18px";
				this.arenaTimeElement.grouparena = document.createElement("span");
				this.arenaTimeElement.grouparena.className = "timer";
				td.appendChild(img);
				td.appendChild(this.arenaTimeElement.grouparena);
				tr.appendChild(td);
				table.appendChild(tr);

				tr = document.createElement("tr");

				// Arena xs Timer
				td = document.createElement("td");
				img = document.createElement("img");
				img.setAttribute('align','absmiddle');
				img.src = "img/ui/icon_arena.gif";
				img.style.height = "18px";
				text = document.createElement("span");
				text.className = "attacked_timers_xs_text";
				text.textContent = "s";
				this.arenaTimeElement.arena_xs = document.createElement("span");
				this.arenaTimeElement.arena_xs.className = "timer";
				td.appendChild(img);
				td.appendChild(text);
				td.appendChild(this.arenaTimeElement.arena_xs);
				tr.appendChild(td);

				// Grouparena xs Timer
				td = document.createElement("td");
				img = document.createElement("img");
				img.setAttribute('align','absmiddle');
				img.src = "img/ui/icon_grouparena.gif";
				img.style.height = "18px";
				text = document.createElement("span");
				text.className = "attacked_timers_xs_text";
				text.textContent = "s";
				this.arenaTimeElement.grouparena_xs = document.createElement("span");
				this.arenaTimeElement.grouparena_xs.className = "timer";
				td.appendChild(img);
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
						font.textContent = gca_locale.get('quest_full');
						this.questTimeElement.appendChild(font);
						this.questTimeElement.appendChild(document.createTextNode(")"));
					}
					// Do i have data saved? (N/A is the default value)
					else if(this.quests_free_slots != 'N/A'){
						this.questTimeElement.textContent = "";
						this.questTimeElement.appendChild(document.createTextNode("("));
						let font = document.createElement("font");
						font.setAttribute("color", "yellow");
						font.textContent = gca_locale.get('quest_new');
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
						this.questTimeElement.textContent = "(" + gca_locale.get('quest_full') + ")";
					}else{
						this.questTimeElement.textContent = "(" + gca_locale.get('quest_new') + ")";
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
							this.crapsTimeElement.textContent = "(" + gca_locale.get('quest_new') + ")";
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
							this.crapsTimeElement.textContent = "(" + gca_locale.get('quest_new') + ")";
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
			}
		},

		merchants_time : {
			inject : function(){
				// Save time if merchant
				if(gca_section.mod == 'inventory'){
					gca_section_merchants.save_merchants_time();
				}
				
				// Variable because of the Advance menu changes
				var x = (document.getElementById('submenu1').getElementsByTagName('a').length.length > 12) ? 4 : 3;
				
				// Roll Dice Event
				if( document.getElementById('submenu1').getElementsByTagName('a')[0].className.match('glow') ){
					x++;
				}
				
				// Calculate time
				var date = gca_tools.time.server();
				var time = gca_data.section.get("timers", 'merchants_time', -1 );
				var remaining_time = time - date;
				
				if(remaining_time > 0){
					var percent_completed = Math.round( 100-( remaining_time/( 24*60*60*1000 ) )*100 );
					var remaining_h = Math.floor( remaining_time/(60*60*1000) );
					if(remaining_h<10){remaining_h='0'+remaining_h;}
					var remaining_m = Math.floor( ( remaining_time%(60*60*1000) )/(60*1000) );
					if(remaining_m<10){remaining_m='0'+remaining_m;}
					var remaining_s = Math.floor( ( remaining_time%(60*1000) )/1000 );
					if(remaining_s<10){remaining_s='0'+remaining_s;}
					var time_format = remaining_h +':'+ remaining_m +':'+ remaining_s;
					var color='#BFAE54';
				}else if( remaining_time == (-1 - date) ){
					var percent_completed = '?';
					var time_format = 'N/A';
					var color='white';
				}else{
					var percent_completed = 100;
					var time_format = gca_locale.get('new_goods');
					var color='yellow';
				}
				
				var level = parseInt( $dark('#header_values_level').html() );
				if(level==1){
					$dark('*div').id("merchants_time_tooltip_holder").html('<div id="merchants_time_box" style="color:'+color+';">'+time_format+'</div><div class="merchants_time_percent_out" style="background-image: url(img/energie_balken_grund.gif);"><div id="merchants_time_percent" class="charstats_balken_xp" style="width:'+percent_completed+'%"></div></div>').tooltip([gca_locale.get('merchants_new_goods_time')+' ( '+percent_completed+'% )']).beforeFrom( $dark('#submenu1 a['+(x-2)+']') );
					$dark('*div').style('height:10px;').afterFrom( $dark('#submenu1 a['+(x+1)+']') );
				}else if(level==2){
					$dark('*div').id("merchants_time_tooltip_holder").html('<div id="merchants_time_box" style="color:'+color+';">'+time_format+'</div><div class="merchants_time_percent_out" style="background-image: url(img/energie_balken_grund.gif);"><div id="merchants_time_percent" class="charstats_balken_xp" style="width:'+percent_completed+'%"></div></div>').tooltip([gca_locale.get('merchants_new_goods_time')+' ( '+percent_completed+'% )']).beforeFrom( $dark('#submenu1 a['+x+']') );
					$dark('*div').style('height:10px;').afterFrom( $dark('#submenu1 a['+(x+1)+']') );
				}else if(level==3 || level==4 || level==5 ){
					$dark('*div').id("merchants_time_tooltip_holder").html('<div id="merchants_time_box" style="color:'+color+';">'+time_format+'</div><div class="merchants_time_percent_out" style="background-image: url(img/energie_balken_grund.gif);"><div id="merchants_time_percent" class="charstats_balken_xp" style="width:'+percent_completed+'%"></div></div>').tooltip([gca_locale.get('merchants_new_goods_time')+' ( '+percent_completed+'% )']).beforeFrom( $dark('#submenu1 a['+(x+1)+']') );
					$dark('*div').style('height:10px;').afterFrom( $dark('#submenu1 a['+(x+4)+']') );
				}else{
					$dark('*div').id("merchants_time_tooltip_holder").html('<div id="merchants_time_box" style="color:'+color+';">'+time_format+'</div><div class="merchants_time_percent_out" style="background-image: url(img/energie_balken_grund.gif);"><div id="merchants_time_percent" class="charstats_balken_xp" style="width:'+percent_completed+'%"></div></div>').tooltip([gca_locale.get('merchants_new_goods_time')+' ( '+percent_completed+'% )']).beforeFrom( $dark('#submenu1 a['+x+']') );
					$dark('*div').style('height:10px;').afterFrom( $dark('#submenu1 a['+(x+4)+']') );
				}
				
				if(remaining_time>0){
					$dark('*script').html('\
					var time_left='+Math.floor(remaining_time/1000)+';\
					merchant_coutdown();\
					\
					function merchant_coutdown(){\
						var percent_completed = Math.round( 100-( time_left/( 24*60*60 ) )*100 );\
						document.getElementById("merchants_time_percent").style.width=percent_completed+"%";\
						\
						if((time_left-(time_left%3600))/3600<1){\
							document.getElementById("merchants_time_box").style.color="red";\
						}else{\
							document.getElementById("merchants_time_box").style.color="#C7B68A;";\
						}\
						\
						var h=(time_left-(time_left%3600))/3600;\
						var m=((time_left%3600)-(time_left%60))/60;\
						var s=time_left%60;\
						h=(h<10)?"0"+h:h;\
						m=(m<10)?"0"+m:m;\
						s=(s<10)?"0"+s:s;\
						\
						document.getElementById("merchants_time_box").innerHTML=""+h+":"+m+":"+s;\
						time_left=time_left-1;\
						if(time_left==-2){\
							document.getElementById("merchants_time_box").innerHTML="'+gca_locale.get('new_goods')+'";\
							document.getElementById("merchants_time_box").style.color="yellow";\
						}else{\
							setTimeout("merchant_coutdown()",999);\
						}\
					}\
					').appendTo('body');
				}
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
				this.firstBag();
			},

			// Inject the first bag
			firstBag : function(){
				var that = this;

				// Get tab
				var tab = document.getElementById("inventory_nav").getElementsByClassName("current")[0];

				// Not ready
				if(document.getElementById("inv").className.match("unavailable")){
					if(!tab.dataset.itemShadowed)
						setTimeout(function(){
							that.firstBag();
						}, 10);
					return;
				}

				// Ready
				this.currentBag(document.getElementById("inventory_nav").getElementsByClassName("current")[0]);
			},

			// Inject the current bag
			currentBag : function(tab){
				if(tab.dataset.itemShadowed) return;

				// Get items
				var items = document.getElementById('inv').getElementsByClassName("ui-draggable");
				
				// For each
				for (var i = items.length - 1; i >= 0; i--) {
					gca_tools.itemShadow.add(items[i]);
				}

				// Success
				if(items.length)
					tab.dataset.itemShadowed = true;
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
			var praying = false;
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
			
			// Create Shotcut
			var a = document.createElement('a');
			a.className = 'gca-pray-buff';
			if(praying){
				//"index.php?mod=underworld&submod=prayEnd&sh=" + gca_section.sh;
				a.href = gca_getPage.link({"mod":"underworld","submod":"prayEnd"});
				a.textContent = '╳';
				a.setAttribute('data-tooltip','[[["Stop praying (-5% heal)","#fff"]]]');
			}else{
				a.href = "index.php?mod=underworld&submod=prayStart&sh=" + gca_section.sh;
				a.setAttribute('data-tooltip','[[["Start praying (+5% heal)","#fff"]]]');
			}
			a.style = 'background-image: url(img/buff/healing.png);';
			localBuffs.getElementsByClassName('buff-container')[0].appendChild(a);
		}

	},

	// Background Functionality
	background : {

		// Remember Tabs
		remember_tabs : {
			// Initialize
			init : function(){
				// Catch page leave
				window.addEventListener('click', function(event){
					// Get Url
					var url = (event.target && (event.target.href || (event.target.parentNode && event.target.parentNode.href) || (event.target.parentNode && event.target.parentNode.parentNode && event.target.parentNode.parentNode.href) ) ) || false;
					// If it is a link
					if(url && url.substring(0,7) == "http://" && url.substring(7, 7+gca_section.domain.length) == gca_section.domain){
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

				// If inv is defined, save it
				if(page.inv){
					gca_data.section.set("cache", 'inventory_tab', page.inv);
				}
				// Else, load it
				else{
					page.inv = gca_data.section.get("cache", 'inventory_tab', 0);
				}

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
			// Check for guild application
			new_guild_application : function(){
				// Get saved data
				var lastTime = gca_data.section.get("timers", "notify_new_guild_application", 0);
				// If an application is pending
				if(lastTime == -1){
					gca_notifications.info(gca_locale.get("pending_guild_application"));
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
							gca_notifications.info(gca_locale.get("pending_guild_application"));
						}
					});
				}
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
