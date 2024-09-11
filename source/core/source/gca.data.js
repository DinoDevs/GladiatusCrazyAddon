/*
 * Addon Data-Options Script
 * Author: DarkThanos, GreatApo
 */

// Data
var gca_data = {
	//Welcome message
	data : {welcomeOnce: true},
	// Get a value
	get : function(name, defvalue){
		if(this.data[name] != undefined)
			return this.data[name];
		return defvalue;
	},
	set : function(name, value){
		if(value != undefined){
			gca_data_manager.loadData();
			this.data[name] = value;
			gca_data_manager.saveData();
			return true;
		}
		return false;
	},
	del : function(name){
		if(this.data[name] != undefined){
			gca_data_manager.loadData();
			delete this.data[name];
			gca_data_manager.saveData();
			return true;
		}
		return false;
	},

	/*
	// Sync
	_sync_last : new Date().getTime(),
	sync : function(){
		// Get timestamp
		var time = new Date().getTime();
		// Check if recently synced
		if(time - this._sync_last <= 100)
			return;
		// Load data
		gca_data_manager.loadData();
		this._sync_last = time;
	}
	*/

	// Section Data
	section : {
		// Section data
		data : {},
		get : function(section, name, defvalue){
			if(this.data[section] == undefined)
				gca_data_manager.loadSectionData(section);
			if(this.data[section][name] != undefined)
				return this.data[section][name];
			return defvalue;
		},
		set : function(section, name, value){
			if(value != undefined){
				gca_data_manager.loadSectionData(section);
				this.data[section][name] = value;
				gca_data_manager.saveSectionData(section);
				return true;
			}
			return false;
		},
		del : function(section, name){
			if(this.data[section][name] != undefined){
				gca_data_manager.loadSectionData(section);
				delete this.data[section][name];
				gca_data_manager.saveSectionData(section);
				return true;
			}
			return false;
		},

		sync : function(section){
			gca_data_manager.loadSectionData(section);
		},

		def : function(section){
			// Set section data shortcut
			gca_data[section] = {
				section : section,
				get : function(name, defvalue){
					return gca_data.section.get(this.section, name, defvalue);
				},
				set : function(name, value){
					return gca_data.section.set(this.section, name, value);
				},
				del : function(name){
					return gca_data.section.del(this.section, name);
				}
			};
		}
	}
}

// Data Manager
var gca_data_manager = {
	// Flag to show if player id loaded
	ready : false,
	// Storage Name
	mod : "gladiatusCrazyAddonData",
	name : "",

	// Init
	init : function(){
		if (this.ready) return;
		this.max_init_tries--;

		// Get Player Id
		var playerId = this.getPlayerId();
		this.ready = playerId ? true : false;
		// Save Player id
		this.savePlayer(playerId);
		// Patch Name
		this.name = this.mod + "_" + playerId;
		this.loadData();

		// Try again later
		if (this.max_init_tries > 0) {
			setTimeout(() => { this.init(); }, 100);
		}
	},
	max_init_tries : 10,
	
	// Get Player Id
	getPlayerId : function(){
		// If gca_section is available
		if (typeof gca_section !== 'undefined' && gca_section.playerId > 0) {
			return gca_section.playerId;
		}

		// Gather server info
		let section = {
			country: null,
			server: null,
			sh: null
		};
		let url = document.location.href;
		section.country = (url.match(/s\d+-(\w*)\.gladiatus\.gameforge\.com/))?url.match(/s\d+-(\w*)\.gladiatus\.gameforge\.com/)[1]:null;
		section.server = (url.match(/s\d+-/i))?url.match(/s(\d+)-/i)[1]:null;
		section.sh = (url.match(/sh=[0-9a-fA-F]+/i))?url.match(/sh=([0-9a-fA-F]+)/i)[1]:null;

		// Resolve Player Id from cookies
		let cookiePlayerId = (section.sh) ? document.cookie.match(new RegExp("Gca_" + section.country + "_" + section.server + "=(\\d+)_" + section.sh.substring(0, section.sh.length/4), "i")) : false;
		// If cookie exist
		if (cookiePlayerId && cookiePlayerId[1]){
			return cookiePlayerId[1];
		}

		// Is it on window variable
		if (typeof window.playerId === 'number' && window.playerId > 0) {
			return window.playerId;
		}

		// Not found
		return 0;
	},
	// Set Players
	savePlayer : function(id){
		if (!id) return;
		var players = {};
		if (localStorage.getItem(this.mod + "_players") !== null) {
			players = JSON.parse(localStorage.getItem(this.mod + "_players"));
		}
		if (!players.hasOwnProperty(id)) {
			players[id] = null;
			localStorage.setItem(this.mod + "_players", JSON.stringify(players));
		}
	},
	savePlayerName : function(id, name){
		if (!id || !name) return;
		var players = {};
		if (localStorage.getItem(this.mod + "_players") !== null) {
			players = JSON.parse(localStorage.getItem(this.mod + "_players"));
		}
		if (!players.hasOwnProperty(id) || (players[id] !== name)) {
			players[id] = name;
			localStorage.setItem(this.mod + "_players", JSON.stringify(players));
		}
	},

	// Load Data from storage
	loadData : function(){
		// If data exist
		if (this.ready && localStorage.getItem(this.name) !== null) {
			gca_data.data = JSON.parse(localStorage.getItem(this.name));
		}
		// No data
		else {
			gca_data.data = {firstRun : this.ready};
		}
	},
	// Load Data to storage
	saveData : function(){
		if (!this.ready) return;
		localStorage.setItem(this.name, JSON.stringify(gca_data.data));
	},
	// Reset Data on storage
	resetAll : function(){
		if (!this.ready) return;
		localStorage.setItem(this.name, JSON.stringify({firstRun : true}));
		this.loadData();
	},

	// Load Section Data from storage
	loadSectionData : function(section){
		// If data exist
		if (this.ready && localStorage.getItem(this.name + "_" + section) !== null) {
			gca_data.section.data[section] = JSON.parse(localStorage.getItem(this.name + "_" + section));
		}
		// No data
		else {
			gca_data.section.data[section] = {};
		}
	},
	// Load Section Data to storage
	saveSectionData : function(section){
		localStorage.setItem(this.name + "_" + section, JSON.stringify(gca_data.section.data[section]));
	},
	// Reset Section Data on storage
	resetSectionAll : function(section){
		localStorage.setItem(this.name + "_" + section, JSON.stringify({}));
		this.loadSectionData();
	}
};
// Init Manager
gca_data_manager.init();

// Options
var gca_options = {
	// Manage Functions

	init : function(){
		// Load Data
		this.loadData();
	},
	loadData : function(){
		var dataStorage = gca_data.section.get('settings', 'data', false);
		// If no data return
		if(!dataStorage)
			return;

		// Loop all categories
		for(let category in dataStorage){
			// Loop options in category
			for(let label in dataStorage[category]){
				// Check if option exist
				if(this.data.hasOwnProperty(category) && this.data[category].hasOwnProperty(label)){
					this.data[category][label] = dataStorage[category][label];
				}
			}
		}
	},
	saveData : function(){
		gca_data.section.set('settings', 'data', this.data);
	},

	// Get - Set functions

	// Get Boolean Setting
	bool : function(category, label){
		if(this.data.hasOwnProperty(category) && this.data[category].hasOwnProperty(label) && this.data[category][label])
			return true;
		return false;
	},
	
	// Get Integer Setting
	int : function(category, label){
		if(this.data.hasOwnProperty(category) && this.data[category].hasOwnProperty(label))
			return parseInt(this.data[category][label], 10);
		return NaN;
	},

	// Get Setting
	get : function(category, label){
		if(this.data.hasOwnProperty(category) && this.data[category].hasOwnProperty(label))
			return this.data[category][label];
		return null;
	},

	//  Set Setting
	set : function(category, label, value){
		if(!this.data.hasOwnProperty(category)){
			this.data[category] = {};
		}
		this.data[category][label] = value;
		this.saveData();
	}
};

// Default Options
gca_options.data = {

	// Global Options
	"global" : {
		// Browser notifications
		"browser_notifications" : true,

		// Extended Hp-Xp info
		"extended_hp_xp_info" : true,
		"extended_hp_xp_info_potion" : true,
		"hp_timer_for_full_life" : true,
		
		// Minimum health warning
		"health_warning" : 25,
		
		// Expedition/Dungeon Points Recover Timer
		"expedition_dungeon_points_recover_timer" : true,

		// Shortcuts bar
		"shortcuts_bar" : true,
			// msg : guild message / personal message
			// gmd : guild medic
			// gmr : guild market
			// gst : guild storge
			// gbn : guild bank
			// gwr : guild war room
			// gar : guild arena battle reports
			// gjl : guild jail
			// glb : guild library
			// gtm : guild templum
			// sim : battle simulator
			// stt : show my stats
			// onl : online friends
			// fau : food auctions
		"shortcuts_bar_buttons" : 'msg|gmd|gmr|gst|gbn|gwr|gjl|glb|fau|sim|stt|onl',
	
		// Auction Status
		"auction_status_bar" : false,
		"auction_status_notification" : false,

		// Top fixed bar
		"top_fixed_bar" : true,

		// Remember Tabs
		"remember_tabs" : true,

		// Attacked Timer
		"attacked_timers" : true,
		
		// Notifications
		"notify_new_guild_application" : false,
		"notify_guild_attack_ready" : false,
		// Notifications Interval in minutes
		"check_guild_application_pinned_messages_interval" : 60,
		"notify_guild_attack_ready_interval" : 15,
		// Check other data in guild
		"check_guild_pinned_message" : true,
	
		// Enable x-scroll
		"x_scroll" : true,

		// Enable item's shadow
		"item_shadow" : true,

		// Enable inventory group options
		"inventory_options_group" : true,
		// Enable inventory gold info
		"inventory_gold_info" : false,

		// Enable pagination layout
		"pagination_layout" : true,
		
		// Gold/Exp data
		"gold_exp_data" : true,
		
		// Underworld
			// Pray Shortcut
			"pray_shorcut" : true,						
		
		// Show item durability
		"show_durability" : 0,

		// Show item forge info
		"show_forge_info" : 0,
		
		// Minimum durability alert
		"min_durability" : 25,
					
		// Show mercenaries real name
		"show_mercenaries_real_name_and_combat_stats" : false,
		
		// Show upgrades value on items
		"show_upgrade_values" : false,
		
		// Global Arena timer
		"global_arena_timer" : true,
		
		// Gladiatus site fixes
		"gladiatus_site_fixes" : true,
		
		// Custom page scrollbar
		"gca_custom_scrollbar" : true,
		
		// Lock sections visibility
		"lock_section_visibility" : false,

		// Hide language flags
		"hide_language_flags" : false,

		// Hide expedition button
		"bar_hide_exp_btn" : false,
				
		// Hide dungeon button
		"bar_hide_dun_btn" : false,
				
		// Hide arena button
		"bar_hide_are_btn" : false,

		// Hide circus button
		"bar_hide_ct_btn" : false

	},

	// Overview Options
	"overview" : {
		// Analyze items
		"analyze_items" : true,
		// Show the life gain a food gives
		"food_life_gain" : true,
		// Show block and avoid critical values caps
		"block_avoid_caps" : true,
		// Show best food to consume
		"best_food" : true,
		// Transparent food gives you more life than you need
		"overfeed_food" : true,
		// Double click to consume item
		"double_click_consume" : false,
		// Daily Bonus Log
		"daily_bonus_log" : true,
		// Detailed buffs timer
		"buffs_detailed_time" : true,
		// Mercenaries manager
		"mercenaries_manager" : true,
		// Mercenary tooltip show
		"mercenary_tooltip_show" : true,
		// Show more statistics
		"more_statistics" : true,
		// new Achievements layout
		"achivements_layout" : true,
		// Costumes layout
		"costumes_layout" : true,
		// Items repair overview
		"items_repair_overview" : true
	},
	
	// Menu Options
	"main_menu" : {		
		// Advance main menu
		"advance_main_menu" : true,
		"submenu_click_to_change" : false,
		// Merge menu merchants
		"menu_merge_merchants" : false,				
		// Merge menu merchants
		"menu_merge_items" : false,
		// Quest Timer
		"quest_timer" : true,
		// Centurion & PowerUps timers
		"centurio_powerups_timers" : false,
		// Forge
		"forge_timers" : true,
		// Merchants
		"merchants_timer" : true,
		// Hide City Gate menu entry
		"menu_hide_citygate" : false
	},

	// Messages Options
	"messages" : {
		// Layout
		"messages_layout" : true,
		// Show Unread
		"show_unread" : true,
		// Separate days
		"separate_days" : true,
		// Show more guild mate info
		"more_guild_mate_info" : true,
		// Show message links
		"show_message_links" : true,
		// Get guild battle info
		"get_guild_battle_info" : true,
		// Show sidebar
		"show_sidebar" : true,
		// Fix header links
		"fix_header_links" : true,
		// New Message focus manage
		"new_message_focus" : true,
		// New Message friend list
		"new_message_friend_list" : true
	},

	// Packages Options
	"packages" : {
		// Improve filters layout
		"filters_layout" : true,
		// Small items layout
		"small_items_layout" : false,
		// Improve packets layout
		"items_layout" : 1,
		/*"items_layout" : true,
		// Improve info layout
		"compact_info_layout" : true,
		// List view layout
		"list_view_layout" : false,*/
		// Load more packages pages
		"load_more_pages" : true,
		// Number of pages to load
		"pages_to_load" : 2,
		// Show item's price
		"item_price" : false,
		// Special category features
		"special_category_features" : 0,
		// Open packets with double click
		"double_click_open" : true,
		// Advance packet filter
		"advance_filter" : false,
		// Pop Bag Over on scroll
		"pop_over_bag" : true,
		// Category shortcuts on packages page
		"packages_shortcuts" : true
	},

	// Pantheon Options
	"pantheon" : {
		// Reorder quests
		"quests_reorder" : true,
		// Insert more details on quests
		"quests_detailed_rewards" : true,
		// Show completed missions
		"missions_show_completed" : true,
		// Show gods points percent
		"gods_show_points_percent" : true,
		// Open many mystery boxes button
		"open_many_mysteryboxes" : true,
		// Show mystery box reward's value in rubies
		"show_mysterybox_rewards_rubies" : true,
		// Show mystery box reward's owned number
		"show_mysterybox_rewards_owned" : true
	},

	// Reports
	"reports" : {
		// Style change
		"style_change" : true,
		"load_loot_tooltips" : true,
		// Item found
		"found_items" : true,
		// Analyze battle reports
		"battle_analyzer" : true
	},


	// Training
	"training" : {
		// Show discount
		"show_discount" : true,
		// Show basics in bars
		"show_basics_in_bars" : true,
		// Enable multiple training
		"multiple_train" : true,
		// Enable calculator training
		"calculator_train" : true,
		// Show analyze data
		"show_analyze_items_data" : true,
		// Show points after upgrade
		"show_points_after_upgrade" : true
	},

	// Merchants
	"merchants" : {
		// Fade items that you can not afford
		"fade_unaffordable_items" : true,
		// Fade items for rubies
		"ruby_icon_on_items" : true,
		// Show shop info
		"show_shop_info" : false,
		// Double click items to sell or buy
		"double_click_actions" : true,
		// Alt + Click items to sell or buy
		"alt_click_actions" : false,
		// Hide floating prices when selling/buying
		"hide_prices" : false
	},

	// Forge
	"forge" : {
		// Packages & market shortcuts for each material need (forge/repair)
		"material_links" : true,
		// Show Prefix/Suffix/Base levels
		"show_levels" : true,
		// Show materials names
		"horreum_materials_names" : true,
		// Remember options
		"horreum_remember_options" : true,
		// Select material with click
		"horreum_select_meterials" : true,
		// Double click to select
		"double_click_select" : true,
		// Add a notepad
		"forge_notepad" : true
	},
	
	// Arena
	"arena" : {
		// Ignore attack confirmations
		"ignore_attack_confirmations" : false,
		// Show simulator's image-link
		"show_simulator_imagelink" : true,
		// Sort players by level
		"sort_by_lvl" : true,
		// Highlight guild members on other servers
		"highlight_guild_members" : true,
		// Players target list
		"target_list" : true,
		// Overhaul Arena and Circus tables
		"overhaul_tables" : false
	},
	
	// Magus
	"magus" : {
		// Fade items that you can not improve
		"fade_unimprovable_items" : true
	},
	
	// Market
	"market" : {
		// Soul-bound Buy-Confirmation
		"soulbound_warning" : true,
		"one_gold_warning" : true,
		// Show Cancel-all button
		"cancel_all_button" : true,
		// Remember sell duration
		"remember_sell_duration" : false,
		// Show add fees button
		"add_fees_button" : true,
		// Default sell duration
		"sell_duration" : 0,
		// 1 gold mode
		"one_gold_mode" : true,
		// Custom prices
		"custom_prices" : "",
		// Remember sorting
		"remember_sort" : false,
		// Double click to select
		"double_click_select" : true,
		// Item sell warning icons
		"sell_warning_icons" : true,
		// Sell with enter
		"sell_with_enter" : true
	},

	// Expedition Options
	"expedition" : {
		// Show that each enemy drops
		"show_enemy_drops" : true,
		// Underworld expedition layout
		"underworld_layout" : true
	},

	// Guild Options
	"guild" : {
		// Jail layout
		"jail_layout" : true,
		// Library options
		"library_layout" : true,
		"library_fade_non_scrolls" : true,
		"library_tooltip_data" : true,
		// Bank Layouts
		"bank_donate_layout" : true,
		"bank_book_layout" : true,
		"bank_book_show_changes" : true,
		// Medic Layout
		"medic_layout" : true
	},

	// Auction Options
	"auction" : {
		// Count page items
		"items_counters" : true,
		// More search levels
		"more_search_levels" : false,
		// Show price data
		"item_price_analyze" : true,
		// Show item level (disabled)
		/*"item_level" : false, */
		// Show item names
		"item_name" : false,
		// Show 3 items per line
		"x3_items_per_line" : false,
		// Enable multi bids
		"multi_bids" : true,
		// Show extra stats on items
		"extra_item_stats" : true,
		// Save auction last search
		"save_last_state" : true,
		// Show item sort functions
		"item_sort_functions" : true
	},

	// Accessibility
	"accessibility" : {
		// Make lvl number indicators white
		"white_level_indicators" : false,
		// Add quality symbols above level numbers
		"qualty_symbols_indicators" : false,
		// Make item title in tooltips white
		"tooltips_qualty_white" : false,
		// Add quality symbols on tooltips
		"tooltips_qualty_symbols" : false,
	},

	"events" : {
		// Craps Event Timer
		"craps_timer" : true,
		// Server Quest Event Timer
		"server_quest_timer" : true
	},

	"sound" : {
		// Cooldown Sound Notification
		"cooldown_sound_notifications" : true,
		// Sounds muted
		"muted" : false,
		// Volume scale
		"volume" : 0.8
	}
};

// If settings, save default values
if (new URLSearchParams(window.location.search).get('mod') == 'settings') {
	gca_options.defaultData = JSON.parse(JSON.stringify(gca_options.data));
}

// Load Stuff
(function(){
	// Initiate Options
	gca_options.init();

	// Try to load sound
	if (window.gca_audio_loader) window.gca_audio_loader();
})();
