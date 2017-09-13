/*
 * Addon Data-Options Script
 * Author: DarkThanos, GreatApo
 */

// Data
var gca_data = {
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
	// Storage Name
	mod : "gladiatusCrazyAddonData",
	name : "",

	// Init
	init : function(){
		// Get Player Id
		var playerId = this.getPlayerId();
		// Save Player id
		this.savePlayer(playerId);
		// Patch Name
		this.name = this.mod + "_" + playerId;

		this.loadData();
	},
	// Get Player Id
	getPlayerId : function(){
		// Page info
		var url = document.location.href;
		
		// Get server info
		var country = (url.match(/s\d+-(\w*)\.gladiatus\.gameforge\.com/)) ? url.match(/s\d+-(\w*)\.gladiatus\.gameforge\.com/)[1] : null;
		var server = (url.match(/s\d+-/i)) ? url.match(/s(\d+)-/i)[1] : null;

		// Resolve Player Id from cookies
		var playerId = document.cookie.match(new RegExp("Gladiatus_" + country + "_" + server + "=(\\d+)","i"));
		// If cookie exist
		if(playerId && playerId[1]){
			return playerId[1];
		}
		// Else ... Error?
		else{
			return 0;
		}
	},
	// Set Players
	savePlayer : function(id){
		var players = {};
		if(localStorage.getItem(this.mod+"_players") !== null){
			players = JSON.parse(localStorage.getItem(this.mod + "_players"));
		}
		players[id] = id;
		localStorage.setItem(this.mod+"_players", JSON.stringify(players));
	},

	// Load Data from storage
	loadData : function(){
		// If data exist
		if(localStorage.getItem(this.name) !== null){
			gca_data.data = JSON.parse(localStorage.getItem(this.name));
		}
		// No data
		else{
			gca_data.data = {firstRun:true};
		}
	},
	// Load Data to storage
	saveData : function(){
		localStorage.setItem(this.name, JSON.stringify(gca_data.data));
	},
	// Reset Data on storage
	resetAll : function(){
		localStorage.setItem(this.name, JSON.stringify({firstRun:true}));
		this.loadData();
	},

	// Load Section Data from storage
	loadSectionData : function(section){
		// If data exist
		if(localStorage.getItem(this.name + "_" + section) !== null){
			gca_data.section.data[section] = JSON.parse(localStorage.getItem(this.name + "_" + section));
		}
		// No data
		else{
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
}
// Init Managet
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
		for(category in dataStorage){
			// Loop options in category
			for(label in dataStorage[category]){
				// Check if option exist
				if(this.data[category] != undefined && this.data[category][label] != undefined){
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
		if(this.data[category] && this.data[category][label])
			return true;
		return false;
	},
	
	// Get Integer Setting
	int : function(category, label){
		if(this.data[category] && this.data[category][label])
			return parseInt(this.data[category][label]);
		return NaN;
	},

	// Get Setting
	get : function(category, label){
		if(this.data[category] && this.data[category][label])
			return this.data[category][label];
		return null;
	},

	//  Set Setting
	set : function(category, label, value){
		if(!this.data[category]){
			this.data[category] = {};
		}
		this.data[category][label] = value;
		this.saveData();
	}
}

// Default Options
gca_options.data = {

	// Global Options
	"global" : {
		// Sounds
		"sound_notifications" : true,
		// Browser notifications
		"browser_notifications" : true,

		// Extended Hp-Xp info
		"extended_hp_xp_info" : true,
		"extended_hp_xp_info_potion" : true,
		"hp_timer_for_full_life" : true,

		// Shortcuts bar
		"shortcuts_bar" : true,
			// msg : guild message / personal message
			// gmd : guild medic
			// gmr : guild market
			// gst : guild storge
			// gbn : guild bank
			// gwr : guild war room
			// gjl : guild jail
			// glb : guild library
			// sim : battle simulator
			// stt : show my stats
			// onl : online friends
		"shortcuts_bar_buttons" : 'msg|gmd|gmr|gst|gbn|gwr|gjl|glb|sim|stt|onl',
	
		// Auction Status
		"auction_status_bar" : false,
		"auction_status_notification" : false,

		// Top fixed bar
		"top_fixed_bar" : true,

		// Advance main menu
		"advance_main_menu" : true,
		"submenu_click_to_change" : true,

		// Remember Tabs
		"remember_tabs" : true,

		// Attacked Timer
		"attacked_timers" : true,
		// Quest Timer
		"quest_timer" : true,
		// Merchants
		"merchants_timer" : true,

		// Player Image
		"player_image" : true,

		// Cooldown Sound Notification
		"cooldown_sound_notifications" : true,

		// Notifications
		"notify_new_guild_application" : false,
		// Notifications Interal in minites
		"notify_new_guild_application_interval" : 60,
	
		// Enable x-scroll
		"x_scroll" : true,

		// Enable item's shadow
		"item_shadow" : true,

		// Enable inventory group options
		"inventory_options_group" : true,

		// Enable pagination layout
		"pagination_layout" : true,
		
		// Gold/Exp data
		"gold_exp_data" : true,
		
		// Underword
			// Pray Shorcut
			"pray_shorcut" : true
	},

	// Overview Options
	"overview" : {
		// Analyze items
		"analyze_items" : true,
		// Show the life gain a food gives
		"food_life_gain" : true,
		// Show block and avoid criticals values caps
		"block_avoid_caps" : true,
		// Show best food to consume
		"best_food" : true,
		// Trasparent food gives you more life than you need
		"overfeed_food" : true,
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
		// new Achivements layout
		"achivements_layout" : true,
		// Costumes layout
		"costumes_layout" : true
	},

	// Messages Options
	"messages" : {
		// Layout
		"messages_layout" : true,
		// Show Unreaded
		"show_unread" : true,
		// Separate days
		"separate_days" : true,
		// Send Message Box
		"send_message_box" : true,
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
		// Improve info layout
		"compact_info_layout" : true,
		// Improve packets layout
		"items_layout" : true,
		// Load more packages pages
		"load_more_pages" : true,
		// Number of pages to load
		"pages_to_load" : 2,
		// Special category features
		"special_category_features" : true
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
		// Open many mysteryboxes button
		"open_many_mysteryboxes" : true
	},

	// Reports
	"reports" : {
		// Style change
		"style_change" : true,
		"load_loot_tooltips" : true,
		// Item found
		"found_items" : true
	},


	// Training
	"training" : {
		// Show discount
		"show_discount" : true,
		// Show bacis in bars
		"show_basics_in_bars" : true,
		// Enable multiple train
		"multiple_train" : true,
		// Show analyze data
		"show_analyze_items_data" : true,
		// Show points after upgrade
		"show_points_after_upgrade" : true,
	},

	// Merchants
	"merchants" : {
		// Fade items that you can not afford
		"fade_unaffordable_items" : true
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
		// Medic Layout
		"medic_layout" : true
	},

	// Auction Options
	"auction" : {
		// Count page items
		"items_counters" : true,
		// Show price data
		"item_price_analyze" : true,
		// Show item level
		"item_level" : true,
		// Show 3 items per line
		"x3_items_per_line" : false,
	},

	"events" : {
		// Craps Event Timer
		"craps_timer" : true,
		// Server Quest Event Timer
		"server_quest_timer" : true
	},

	"sound" : {
		// Sounds enabled
		"enabled" : true
	},

	// TODO : DEPRECATED below
	// Options only here for reference
	// Implemented is removed
	/*
	// Global Script Options
		"ENABLE_GLOBAL_MERCHANTS_TIME" : true,
		"ENABLE_GLOBAL_WEAPON_DOWN_ALERT" : true,
		"ENABLE_GLOBAL_DISPLAY_CENTURIO_DAYS" : false,
		"ENABLE_GLOBAL_MAP_NAMES_LEVELS" : false,

	// Overview Script Options
		// Main Player Options
		"ENABLE_OVERVIEW_ITEMS_ANALIZE" : true,
		"ENABLE_OVERVIEW_DISPLAY_SHARE_LINK" : true,
		"ENABLE_PLAYER_IMAGE" : true,

	// Training Script Options
		"ENABLE_TRANING_DISPLAY_COST_CALCULATOR" : true,

	// Auction Script Options
		// Table modifications
		"ENABLE_AUCTION_DISPLAY_ITEMS_NUM" : true,
		"ENABLE_AUCTION_DISPLAY_ITEMS_BGCOLOR" : true,
		"ENABLE_AUCTION_AUTO_FILL_GOLD" : true,
		"ENABLE_AUCTION_DISPLAY_ITEMS_LVL" : true,
		"ENABLE_AUCTION_DISPLAY_3_ITEMS_PER_ROW" : true,
		"ENABLE_AUCTION_MULTIPLE_BIDS" : false,
		"ENABLE_AUCTION_WARN_GUILD" : true,
		// Search modifications
		"ENABLE_AUCTION_EXPAND_ITEMS_LVL" : true,
		"ENABLE_AUCTION_IMPROVE_SEARCH_MENU" : true,
		// Mercenaries tooltips
		"ENABLE_AUCTION_MERCENARIES_TOOLTIPS" : true,
		"ENABLE_AUCTION_HIDE_MERCENARIES_GUIDE_ROW" : true,

	// Market Script Options
		// Table modifications
		"ENABLE_MARKET_LOAD_MORE_PAGES" : true,
		"ENABLE_MARKET_STYLE_CHANGES" : true,
		"ENABLE_MARKET_CANCEL_PACKETS_BUTTON" : true,
		"ENABLE_MARKET_DEFAULT_SELL_DURATION" : true,
		"MARKET_DEFAULT_SELL_DURATION" : 2,
		// Search modifications
		"ENABLE_MARKET_EXPAND_ITEMS_LVL" : true,
		"ENABLE_MARKET_IMPROVE_SEARCH_MENU" : true,

	// Merchants Script Options
		// On merchants page
		"ENABLE_MERCHANTS_ITEM_SEARCH" : true,
		"ENABLE_MERCHANTS_HIGHLIGHT_ITEMS" : true,
		"ENABLE_MERCHANTS_INFOS" : true,

	// Messages Script Options
		// Message Spam Block
		"ENABLE_MESSAGE_SPAM_BLOCK" : false,
		"SPAM_BLOCKED_PLAYERS" : ' ',

	// Packages Script Options
		"ENABLE_PACKAGES_COLLECT_GOLD_BUTTON" : true,
		"ENABLE_PACKAGES_EXPIRED_PACKAGES" : false,
		"PACKAGES_EXPIRED_HOURS" : 12,

	// Chat Script Options
		// Chat list Options
		"ENABLE_CHAT_URL_MOD" : true,
		"ENABLE_CHAT_STYLE_MOD" : true,
		
	// Guild Script Options
		"ENABLE_GUILD_MESSAGE_INTERFACE" : true,
		"ENABLE_GUILD_BANK_INTERFACE" : true,
		"ENABLE_GUILD_BANKBOOK_INTERFACE" : true,
		"ENABLE_GUILD_MEDIC_INTERFACE" : true,
		"ENABLE_GUILD_LIFE_TAB" : true,
		"ENABLE_GUILD_IMAGES" : true,
		"ENABLE_GUILD_NAMES_LEVELS" : false,
	
	// Pantheon
		"ENABLE_PANTHEON_GODS_RECOLOR" : true,
		
	// Arena
		"ENABLE_ARENA_SERVER_ARENA_ORDER" : true,
		
	// Player
		"ENABLE_PLAYER_SIMULATOR_BUTTON" : true,
		"ENABLE_PLAYER_MERCENARIES_FIGHT_TYPE" : true,
	*/
};

// Initiate Options
gca_options.init();
