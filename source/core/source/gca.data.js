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
		var country, server;
		
		// TODO : Clean
		//var country = (url.match(/\.(\w*)\.gladiatus\.gameforge\.com/)[1])?url.match(/\.(\w*)\.gladiatus\.gameforge\.com/)[1]:null;
		//var server = (url.match(/s\d+\./i))?url.match(/s(\d+)\./i)[1]:null;

		// Old Url
		if(url.match(/s\d+\.\w+\.gladiatus\.gameforge\.com/)){
			country = (url.match(/\.(\w*)\.gladiatus\.gameforge\.com/))?url.match(/\.(\w*)\.gladiatus\.gameforge\.com/)[1]:null;
			server = (url.match(/s\d+\./i))?url.match(/s(\d+)\./i)[1]:null;
		}
		
		// New Url
		else{
			country = (url.match(/s\d+-(\w*)\.gladiatus\.gameforge\.com/))?url.match(/s\d+-(\w*)\.gladiatus\.gameforge\.com/)[1]:null;
			server = (url.match(/s\d+-/i))?url.match(/s(\d+)-/i)[1]:null;
		}

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
	},

	// TODO : DEPRECATED
	isOn : function(label){
		if(this.data[label])
			return true;
		return false;
	},
	// TODO : DEPRECATED
	load : function(label){
		return this.data[label];
	},
	// TODO : DEPRECATED
	save : function(label, value){
		this.data[label] = value;
		this.saveData();
	}
}

// Default Options
gca_options.data = {

	// Global Options
	"global" : {
		// Sounds
		"sound_notifications" : true,

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

		// Player Image
		"player_image" : true,

		// Notifications
		"notify_new_guild_application" : false,
		// Notifications Interal in minites
		"notify_new_guild_application_interval" : 60,
	
		// Enable x-scroll
		"x-scroll" : true,

		// Enable item's shadow
		"item_shadow" : true,

		// Enable pagination layout
		"pagination_layout" : true,
		
		// Underword
			// Pray Shorcut
			"pray_shorcut" : true
	},

	// Overview Options
	"overview" : {
		// Show the life gain a food gives
		"food_life_gain" : true,
		// Show block and avoid criticals values caps
		"block_avoid_caps" : true,
		// Drop items to see materials to repair feature
		"repair_materials_info" : true,
		// Show best food to consume
		"best_food" : true,
		// Trasparent food gives you more life than you need
		"overfeed_food" : true,
		// Daily Bonus Log
		"daily_bonus_log" : true,
		// Detailed buffs timer
		"buffs_detailed_time" : true,
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
		"missions_show_completed" : true
	},

	// Reports
	"reports" : {
		// Style change
		"style_change" : true,
		"load_loot_tooltips" : true,
		// Item found
		"found_items" : true
	},

	"training" : {
		// Show bacis in bars
		"show_basics_in_bars" : true,
		// Enable multiple train
		"multiple_train" : true
	},

	// Auction Options
	"auction" : {
		// TODO : need options
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
		// Library layout
		"library_layout" : true,
		// Bank Book Layout
		"bank_book_layout" : true
	},

	"events" : {
		// Craps Event Timer
		"craps_timer" : true,
		// Server Quest Event Timer
		"server_quest_timer" : true
	},

	// TODO : DEPRECATED below
	// Global Script Options
		"ENABLE_GLOBAL_EXTENDED_HP_XP_INFO" : true,
		"ENABLE_GLOBAL_BUTTON_BAR" : true,
		"ENABLE_GLOBAL_AUCTION_STATUS_BAR" : false,
		"ENABLE_GLOBAL_AUCTION_STATUS_NOTIFICATION" : false,
		"ENABLE_GLOBAL_TOP_FIXED_BAR" : true,
		"ENABLE_GLOBAL_ADVANCED_MAIN_MENU" : true,
		"ENABLE_GLOBAL_MERCHANTS_TIME" : true,
		"ENABLE_GLOBAL_MINITES_LEFT_FOR_FULL_LIFE" : true,
		"ENABLE_GLOBAL_REMEMBER_TABS" : true,
		"GLOBAL_LANGUAGE" : "en",
		"ENABLE_GLOBAL_QUESTS_TIMER" : true,
		"ENABLE_GLOBAL_ATTACKED_TIMERS" : true,
		"ENABLE_GLOBAL_WEAPON_DOWN_ALERT" : true,
		"ENABLE_GLOBAL_DISPLAY_CENTURIO_DAYS" : false,
		"ENABLE_GLOBAL_MAP_NAMES_LEVELS" : false,
		"ENABLE_GLOBAL_SOUND_NOTIFICATIONS" : true,

	// Overview Script Options
		// Main Player Options
		"ENABLE_OVERVIEW_ITEMS_ANALIZE" : true,
		"ENABLE_OVERVIEW_DISPLAY_SHARE_LINK" : true,
		"ENABLE_OVERVIEW_MERCENARIES_MANAGEMENT" : true,
		"ENABLE_OVERVIEW_SHOW_HEAL" : false,
		"ENABLE_PLAYER_IMAGE" : true,
		// Stats Options
		"ENABLE_OVERVIEW_PLAYER_STATS_MOD" : true,
		"ENABLE_OVERVIEW_BLOCK_AVOID_CAPS" : true,

	// Training Script Options
		"ENABLE_TRANING_DISPLAY_MOD" : true,
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
		// Messages Options
		"ENABLE_MESSAGES_STYLING" : false,
		"ENABLE_MESSAGES_CONVERT_LINKS" : false,
		"ENABLE_MESSAGES_FIX_SPACES" : false,
		// New Message Options
		"ENABLE_NEWMESSAGE_FOCUS" : true,
		"ENABLE_NEWMESSAGE_FRIENDLIST" : true,
		// Message Spam Block
		"ENABLE_MESSAGE_SPAM_BLOCK" : false,
		"SPAM_BLOCKED_PLAYERS" : ' ',

	// Packages Script Options
		"ENABLE_PACKAGES_NEW_LAYOUT" : true,
		"PACKAGES_MAX_PAGES_TO_LOAD" : 5,
		"ENABLE_PACKAGES_COLLECT_GOLD_BUTTON" : true,
		"ENABLE_PACKAGES_EXPIRED_PACKAGES" : false,
		"PACKAGES_EXPIRED_HOURS" : 12,

	// Reports Script Options
		// Report list Options
		"ENABLE_REPORT_LIST_STYLE" : true,

	// Chat Script Options
		// Chat list Options
		"ENABLE_CHAT_URL_MOD" : true,
		"ENABLE_CHAT_STYLE_MOD" : true,
		
	// Guild Script Options
		"ENABLE_GUILD_MESSAGE_INTERFACE" : true,
		"ENABLE_GUILD_JAIL_INTERFACE" : true,
		"ENABLE_GUILD_LIBRARY_INTERFACE" : true,
		"ENABLE_GUILD_BANK_INTERFACE" : true,
		"ENABLE_GUILD_BANKBOOK_INTERFACE" : true,
		"ENABLE_GUILD_MEDIC_INTERFACE" : true,
		"ENABLE_GUILD_LIFE_TAB" : true,
		"ENABLE_GUILD_IMAGES" : true,
		"ENABLE_GUILD_APPLICATION_ALERT" : false,
			"GUILD_APPLICATION_ALERT_INTERVAL" : 60,
		"ENABLE_GUILD_NAMES_LEVELS" : false,
	
	// Pantheon
		"ENABLE_PANTHEON_QUESTS_ORDER" : true,
		"ENABLE_PANTHEON_QUESTS_DETAILED_REWARDS" : true,
		"ENABLE_PANTHEON_GODS_RECOLOR" : true,
		
	// Arena
		"ENABLE_ARENA_SERVER_ARENA_ORDER" : true,
		
	// Player
		"ENABLE_PLAYER_SIMULATOR_BUTTON" : true,
		"ENABLE_PLAYER_MERCENARIES_FIGHT_TYPE" : true,
		
	// Premium
		"PREMIUM_KEY" : false,
		
	// Game Fixes
		"ENABLE_FIXES_RTL_TOOLTIP_FIX" : true
};

// Initiate Options
gca_options.init();
