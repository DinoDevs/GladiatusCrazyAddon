/*
 * Gladiatus Crazy Addon Translation
 * Name : Engish (United States)
 * Code : US
 * Tag  : en-US
 * Translator: DarkThanos, GreatApo
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages["en"] = {

	// Language name
	name : "English (United States)",
	// Translators (authors of this script)
	translators : ["DarkThanos", "GreatApo"],
	
	// Language options
	options : {
		// Language formats
		formats : {
			// Short date format
			shortDate : "d/MM/yyyy",
			// Long date format
			longDate : "dddd, d, MMMM yyyy",
			// Number Separators
			number : {
				thousands : ",",
				decimal : "."
			}
		}
	},

	// Translations object
	locale : {
		// Addon info
		info : {
			description : "The craziest add-on for gladiatus ever!"
		},

		// General
		general : {

			// Days
			days : "day(s)",
			// Minites
			minutes : "minute(s)",
			// No data
			no_data : "No data",

			// Modal buttons
			confirm : "Confirm",
			cancel : "Cancel",
			close : "Close",
			error : "Error",
		},

		// Global
		global : {
			// Use a life potion
			life_potion_use : "Use a life potion",
			life_potion_used : "A life potion was used",
			life_potion_left : "You now have {{number}} life potion(s)",
			
			// Life points recovery
			life_recover_full : "Full life recover",

			// Button bar - Message
			message_private_write : "Write private message",
			message_guild_write : "Write guild message",
			message_send : "Send",
			message_sent_success : "Message was sent successfully",
			message_sent_failed : "Failed to sent message",
			message_empty : "The message is empty",
			message_exclude_me : "Exclude me",

			// Button bar buttons
			guild_market_goto : "Go to guild's market",
			guild_storage_goto : "Go to guild's storage",
			guild_bank_goto : "Go to guild's bank",
			guild_warcamp_goto : "Go to guild's war camp",
			guild_jail_goto : "Go to guild's jail",
			guild_library_goto : "Go to guild's library",
			guild_medic_goto : "Go to guild's medic center",
			simulator_goto : "Go to simulator",
			stats_display : "Display my stats",
			online_display : "Display online players",

			// Online friends
			online_friends : "Online Friends",
			guild_friends : "Guild Friends",
			family_friends : "Family Friends",

			// Guild donate
			donate_gold_confirm : "Are you sure you want to donate {{number}} gold?",
			donate_gold_success : "Gold donated successfully",
			donate_gold_failed : "Gold donation failed",
			donate_gold_no_gold : "There is no gold to donate",
			donate_gold_all_gold : "Donate all your gold",

			// Quest timer
			quest_full : "Full",
			quest_new : "New",

			// Pray icon
			pray_start : "Press to stop praying",
			pray_stop : "Press to start praying",
			heal : "heal",

			// Notifications
			notification_guild_application : "There is a pending guild application!",

			// Gold - Exp data
			gold_exp_data : "Gold and Experience Data",
			gold_exp_data_today : "Today's values",
			gold_exp_data_week : "7 days values",
			gold_exp_data_avg_day : "Average values per day",
			gold_exp_data_to_level_up : "Days left to level up",
		},

		// Overview
		overview : {
			// Stats Difference
			stats_difference : "Difference",
		},

		// Pantheon section
		pantheon : {
			// Mystery box
			mysterybox_open_all : "Open all",
			mysterybox_open_stop : "Stop",
			mysterybox_open_done : "Done!",
		},

		// Guild section
		guild : {
			// Guild Bank
			bank_all_gold : "All your gold",

			// Library
			library_per_point_cost : "Cost per stat point",
			library_gold_left : "Guild gold after activation",

			// Medic
			medic_lost_points : "Lost points",
			medic_points_to_heal : "Points to heal",
			medic_life_after_heal : "Life after heal"
		},

		// Training section
		training : {
			costs_discount : "Training costs discount: {{number}}%"
		},

		// Auction section
		auction : {
			// Info
			items_info : "Items information",
			// Number of items in the page
			number_of_items : "Number of items : {{number}}",
			// Number of items that have been bided in the page
			number_of_bided_items : "Number of bided items : {{number}}",
			// Message on items that you can buy and sell at the same price
			hide_your_gold_here : "Hide your gold here",
			// Price of item equals to its value
			price_value_function : "Price = Value + {{number}}",
		},

		// Settings
		settings : {
			// Settings
			settings : "Settings",
			// Description
			description : "Enable or disable the addon's features.",
			description_click_button : "Click the button below to go to addon's settings...",
			
			// Categories
			category_global : "Global",
			category_overview : "Overview",
			category_messages : "Messages",
			category_packages : "Packages",
			category_pantheon : "Pantheon",
			category_reports : "Reports",
			category_training : "Training",
			category_merchants : "Merchants",
			category_expedition : "Expedition",
			category_guild : "Guild",
			category_auction : "Auction",
			category_events : "Events",
			category_sound : "Sounds",

			// Settings - Global
			category_global$sound_notifications : "Enable sound notifications",
			category_global$browser_notifications : "Enable browser notifications",
			category_global$extended_hp_xp_info : "Display extended HP and XP header info",
			category_global$extended_hp_xp_info_potion : "Display life potion use icon",
			category_global$hp_timer_for_full_life : "Display minutes left to full heal",
			category_global$shortcuts_bar : "Enable the shortcuts bar",
			category_global$shortcuts_bar_buttons : "Select shortcuts for the shortcuts bar",
			category_global$auction_status_bar : "Display auction status bar",
			category_global$auction_status_notification : "Alert when auction status changes",
			category_global$top_fixed_bar : "Enable top fixed bar",
			category_global$advance_main_menu : "Improve main menu",
			category_global$submenu_click_to_change : "Submenu change on click",
			category_global$remember_tabs : "Remember merchands tabs",
			category_global$attacked_timers : "Show attacked timers",
			category_global$quest_timer : "Show quests status or timer",
			category_global$merchants_timer : "Show merchands timer indicator",
			category_global$player_image : "Enable players' images",
			category_global$cooldown_sound_notifications : "Enable cooldowns sounds notifications (expedition, dungeon, arena)",
			category_global$notify_new_guild_application : "Notify me when there is a new guild application",
			category_global$notify_new_guild_application_interval : "Check for applications every (seconds)",
			category_global$x_scroll : "Enable gladiatus' horizontal scroll",
			category_global$item_shadow : "Enable items shadows",
			category_global$inventory_options_group : "Group inventory options",
			category_global$pagination_layout : "Change paginations layout",
			category_global$gold_exp_data : "Show gold and exp data",
			category_global$pray_shorcut : "Display pray shorcut",
			// Settings - Overview
			category_overview$analyze_items : "Analyze items stats (needed for training)",
			category_overview$food_life_gain : "Show life gain from foods",
			category_overview$block_avoid_caps : "Show block and Avoid caps",
			category_overview$best_food : "Highlight best food",
			category_overview$overfeed_food : "Fade foods that will over-heal you",
			category_overview$daily_bonus_log : "Log daily bonus",
			category_overview$buffs_detailed_time : "Show detailed timers on guild buffs",
			category_overview$mercenaries_manager : "Show mercenaries manager",
			category_overview$mercenary_tooltip_show : "Show mercenaries tooltips",
			category_overview$more_statistics : "Show more stats on statistics tab",
			category_overview$achivements_layout : "Enhance achivements layout",
			category_overview$costumes_layout : "Enhance costumes layout",
			// Settings - Messages
			category_messages$messages_layout : "Improve messages layout",
			category_messages$show_unread : "Highlight unread messages",
			category_messages$separate_days : "Separate messages from different days",
			category_messages$send_message_box : "Enable send message box",
			category_messages$more_guild_mate_info : "Show more guild mates info",
			category_messages$show_message_links : "Show links included on messages",
			category_messages$get_guild_battle_info : "Auto load guild battle results",
			category_messages$show_sidebar : "Show messages sidebar",
			category_messages$fix_header_links : "Fix messages title link click bug",
			category_messages$new_message_focus : "Focus on message body",
			category_messages$new_message_friend_list : "Enable select friend from list button",
			// Settings - Packages
			category_packages$filters_layout : "Enhance filters layout",
			category_packages$compact_info_layout : "Make info layout compact",
			category_packages$items_layout : "Improve items layout",
			category_packages$load_more_pages : "Load more pages",
			category_packages$pages_to_load : "Number of pages to load",
			category_packages$special_category_features : "Enable special category features",
			// Settings - Pantheon
			category_pantheon$quests_reorder : "Enable quest grouping",
			category_pantheon$quests_detailed_rewards : "Show detailed quests rewards",
			category_pantheon$missions_show_completed : "Show completed missions",
			category_pantheon$gods_show_points_percent : "Show god points percent",
			category_pantheon$open_many_mysteryboxes : "Open multiple mystery boxes",
			// Settings - Reports
			category_reports$style_change : "Improve reports' list layout",
			category_reports$load_loot_tooltips : "Load report's reward",
			// Settings - Training
			category_training$show_discount : "Show training discount",
			category_training$show_basics_in_bars : "Show basics in bars",
			category_training$multiple_train : "Enable multiple training",
			category_training$show_analyze_items_data : "Show analyzed items data in tooltips",
			category_training$show_points_after_upgrade : "Show stat points after upgrade",
			// Settings - Expedition
			// Settings - Guild
			category_guild$jail_layout : "Improve jail's layout",
			category_guild$library_layout : "Improve library's layout",
			category_guild$library_fade_non_scrolls : "Fade items thet are not scrolls on library",
			category_guild$library_tooltip_data : "Add more data on library's tooltips",
			category_guild$bank_donate_layout : "Improve bank's donate layout",
			category_guild$bank_book_layout : "Improve bank's book layout",
			category_guild$medic_layout : "Improve medic's layout",
			// Settings - Auction
			category_auction$items_counters : "Count items and bidded items",
			category_auction$item_price_analyze : "Analyze items' prices",
			category_auction$item_level : "Show items level",
			category_auction$x3_items_per_line : "Change layout to 3 items per line",
			// Settings - Events
			// Settings - Sound
			category_sound$enabled : "Enable sounds",

			// Buttons
			save : "Save",

			// Notifications
			notification_reload : "Reload the page for the changes to take effect"
		}
	},

	// Old deprecated struct
	locale_deprecated : {
		/* Add on informations */
			description : "The craziest add-on for gladiatus ever!",

		/* Global */
			// No-guild-bar compose a new private message
			write_private_message : "Write private message",
			// Guild-bar compose a new guild message
			write_guild_message : "Write guild message",
			// Guild-bar sent new guild message
			send : "Send",
			// Guild-bar exclude me from guild message
			exclude_me : "Exclude me",
			// Guild-bar go to guild's medic center
			go_to_guilds_medic_center : "Go to guild's medic center",
			// Guild-bar go to guild's market
			go_to_guilds_market : "Go to guild's market",
			// Guild-bar go to guild's storage
			go_to_guilds_storage : "Go to guild's storage",
			// Guild-bar go to guild's bank
			go_to_guilds_bank : "Go to guild's bank",
			// Guild-bar donate all your gold
			donate_all_your_gold : "Donate all your gold",
			// Guild-bar go to guild's war camp
			go_to_guilds_war_camp : "Go to guild's war camp",
			// Guild-bar go to guild's jail
			go_to_guilds_jail : "Go to guild's jail",
			// Guild-bar go to guild's library
			go_to_guilds_library : "Go to guild's library",
			// Guild-bar go to simulator
			go_to_simulator : "Go to simulator",
			// Guild-bar display my stats
			display_my_stats : "Display my stats",
			// Guild-bar display online players
			display_online_players : "Display online players",
			// Quest timer new
			quest_new : "New",
			// Quest timer full
			quest_full : "Full",
			// Weapon down alert
			weapon_down : "Your weapon is removed!",
			//Levelling Stats
			gold_exp_data : "Gold and Experience Data",
			today_values : "Today's values",
			days7_values : "7 days values",
			average_per_day : "Average values per day",
			days_left_to_level_up : "Days left to level up",
			leveling_stats : "Experience Stats", //old
			today_experience : "Today's experience", //old
			days7_experience : "7 days experience", //old
			avarage_experiance_per_day : "Average experience per day", //old
			// Life
			use_life_potion : "Use a 100% life potion",
			a_life_potion_was_used : "A 100% life potion was used",
			life_potions_left : " life potion left",
			// dataUpdater
			dropped_items_reported : "Enemy dropped item info were collected!",
			// Underword
				// Pray Shorcut
				stop_praying : "Press to stop praying",
				start_praying : "Press to start praying",
				heal : "heal",
		
		/* Guild */
			// Library
				// Remaining gold after enable a recipe
				gold_after_enable : "Gold after enable",
			// Medic Center
				// Lost life points
				lost_points : "Lost points",
				// Points of life that are about to be healed
				points_to_heal : "Points to heal",
				// The number of life point you will have after healing
				life_after_heal : "Life after heal",
				// Life of your guild
				guild_life : "Guild Life",
			// Bank
				// Difference between the gold
				difference : "Difference",
				// The sum of the gold
				total : "Total",
				// Add all gold in bank
				add_all_gold : "Add all gold",
			// War Camp
				attacks : "Attacks",
				defences : "Defences",
				friendly : "Friendly",
				show_raided_gold : "Show raided gold",
			// Global
				pending_guild_application : "There is a pending guild application!",
			// Upgrade Calculator
				calculate_guild_upgrade : "Calculate Guild Upgrade",
				include : "Include",
				custom_amount : "Custom amount",
				gold_per_player : "Gold per player",
				target_gold : "Target gold",
				gold_in_bank : "Gold in bank",
				difference : "Difference",
				round_up : "Round Up",
				round_to : "Round to",
				results_to_text : "Results to text",
				calculate_cost : "Calculate Cost",
				multiplier : "Multiplier",
				enable_multiplier : "Enable multiplier",
			//Admin
				search_for_players : "Search for players",
				guild_status : "Guild status",
				any : "Any",
				in_guild : "In guild",
				no_guild : "No guild",
				search : 'Search',
		
		/* Overview */
			// General
				// Full life points recovery in (x minutes)
				full_life_recover_in : "Full life recover in",
				// Drop items to see materials to repair feature
				drop_item_see_materials_repair : "Drop an item to see the materials needed to repair it",
				workbench_6th_slot_empty : "Workbench\'s 6th slot needs to be empty",
			// Manage Mercenaries Box
				// Manage mercenaries title
				manage_mercenaries : "Manage Mercenaries",
				// Name of mercenaries
				name : "Name",
				// "Protect your self" mercenary command
				protect : "Protect",
				// "Leave behind" mercenary command
				leave : "Leave",
		
		/* Online Friends */
			// List of your in game friends
			friend_list : "Friend List",
			// List of your in game friends that are now online
			online_friends : "Online Friends",
			// List of your guild friends
			guild_friends : "Guild Friends",
			// List of your family friends
			family_friends : "Family Friends",
			
		/* Auction */
			// Number of items in the page
			number_of_items : "Number of items",
			// Number of items that have been bided in the page
			number_of_bided_items : "Number of bided items",
			// Message on items that you can buy and sell at the same price
			hide_your_gold_here : "Hide your gold here",
			// Price of item equals to its value
			price_eq_value : "Price = Value",
			// Item "Type"
			type : "Type",
			// Item
			item : "Item",
			// Select an item
			select : "Select",
			// Items that where found
			items_found : "Items Found",
			// Search items using a gold limit value
			gold_limit : "Gold Limit",
			// Search items using a max-damage value
			min_damage : "Minimum max-damage",
			// Search items using the duration of their use
			duration : "Duration",
			// Announce auction status to guild button
			announce_to_guild : "Announce to guild",
		
		/* Merchants */
			// Time
				// New merchants items/goods
				new_goods : "New goods",
				// Merchant's new items/goods time
				merchants_new_goods_time : "Merchant's new goods time",
			// Item Search
				// Search Results
				search_results : "Search Results",
				// Item Search
				item_search : "Item Search",
			// Storage info
				storage_info : "Storage Info",
				value : "Value",
				no_rubies : "rubies-free",
		
		/* Training */
			// Discount from the guild training grounds
			guild_discount : "Guild discount",
			training_cost_calculator : "Training Cost Calculator",
			stats : "Stats",
			from : "from",
			to : "to",
			cost : "Cost",
			training_camp_level : "Training Camp Level",
			reduction : "Reduction",
			total_cost : "Total Cost",
			calculate : "Calculate",
			reset : "Reset",
			spent : "spent",
		
		/* Market */
			// The number of the items you own
			number_of_my_items : "Number of my items",
			// Cancel all (items you sell)
			cancel_all : "Cancel all",
			// Levels you can see
			levels_you_can_see : "The item levels you can see are",
		
		/* Costumes */
			player_image : "Player's Image",
			change_player_image : "Change player's image",
			image_was_saved : "Image was saved",
			more_player_images: "More player images",
			made_by: "Made by",
		
		/* Alert Messages */
			// Guild message was sent
			guild_message_was_sent : "Guild message was sent",
			// Guild message sent failed
			guild_message_sent_failed : "Guild message sent failed",
			// Guild message is empty
			guild_message_empty : "Guild message is empty",
			// Your gold was donated
			gold_donated : "Your gold was donated",
			// Your gold donation failed
			gold_donation_failed : "Your gold donation failed",
			// There is no gold to donate
			no_gold : "There is no gold to donate",
			// There are packages expiring in ... hours
			packages_expiring_in : 'There are package(s) expiring in',
			hours : 'hour(s)',
		
		/* General */
			// Error
			error : "Error",
			// Loading...
			loading : "Loading",
			// Clear
			clear : "Clear",
			// Close
			close : "Close",
			// Check all
			check_all : "Check all",
			// Done / Finish
			done : "Done!",
			// Per point
			per_point: "per point",
			// Minutes
			minutes : "minutes",
			// Numbers' symbol for hundreds
			number_format_front : ",",
			// Numbers' symbol for decimal
			number_format_back : ".",
			// Bck button
			GENERAL_BACK : "Back",
			//There are no data message (for the alerts)
			there_are_no_data : "There are no data.",
		
		/* Packages */
			all_pages : "All pages",
			specific_pages : "Specific Pages",
			this_page : "This page",
			calculate_gold : "Calculate gold",
			calculate_item_values : "Calculate item values",
			collect_gold : "Collect Gold",
			
		/* Premium */
			days : "days",
			remaining : "remaining",
		
		/* Options */
			OPTIONS_DESCRIPTION : "Enable or disable whichever feature of the addon you want!",
			OPTIONS_BUTTON_BELOW : "Click the button below to go to addon's settings...",
			OPTIONS_SETTINGS : "Settings",
			OPTIONS_OPEN_ALL : "Open all",
			OPTIONS_CLOSE_ALL : "Close all",
			OPTIONS_SAVE_CATEGORY : "Save Category",
			OPTIONS_SAVE_ALL : "Save all",
			OPTIONS_SAVED : "Options were saved",
			OPTIONS_RELOAD : "Reload the page, for the options to take effect",
			OPTIONS_GLOBAL_OPTIONS : "General settings",
				OPTIONS_GLOBAL_EXTENDED_HP_XP_INFO : "Display extended HP and XP header info",
				OPTIONS_GLOBAL_BUTTON_BAR : "Display header button bar",
				OPTIONS_GLOBAL_AUCTION_STATUS_BAR : "Display auction status bar",
				OPTIONS_GLOBAL_AUCTION_STATUS_NOTIFICATION : "Alert when auction status changes",
				OPTIONS_GLOBAL_TOP_FIXED_BAR : "Enable top on-scroll bar",
				OPTIONS_GLOBAL_ADVANCED_MAIN_MENU : "Improve main menu",
				OPTIONS_GLOBAL_MERCHANTS_TIME : "Display merchants timer",
				OPTIONS_GLOBAL_MINITES_LEFT_FOR_FULL_LIFE : "Display minutes left to full heal",
				OPTIONS_GLOBAL_REMEMBER_TABS : "Remember merchants and inventory tabs",
				OPTIONS_GLOBAL_QUESTS_TIMER : "Show quest giver status/timer",
				OPTIONS_GLOBAL_ATTACKED_TIMERS : "Show the time passed from last attack on defence",
				OPTIONS_GLOBAL_WEAPON_DOWN_ALERT : "Alert when players weapon is down",
				OPTIONS_GLOBAL_DISPLAY_CENTURIO_DAYS : "Display centurion days left (on menu)",
				OPTIONS_GLOBAL_MAP_NAMES_LEVELS : "Hide building's names in city/country maps",
				OPTIONS_GLOBAL_SOUND_NOTIFICATIONS : "Enable sound notifications for missions, dungeons and arenas",
				OPTIONS_GLOBAL_LANGUAGE : "Change add on language",
			
			OPTIONS_OVERVIEW_OPTIONS : "Overview settings",
				OPTIONS_MAIN_PLAYER_OPTIONS : "Main player settings",
					OPTIONS_OVERVIEW_ITEMS_ANALIZE : "Analyse player's items",
					OPTIONS_OVERVIEW_DISPLAY_SHARE_LINK : "Display share player's link button",
				OPTIONS_STATS_OPTIONS : "Stats settings",
					OPTIONS_OVERVIEW_PLAYER_STATS_MOD : "Provide more player's stats",
					OPTIONS_OVERVIEW_BLOCK_AVOID_CAPS : "Show the cap values of Resilience and Block",

			OPTIONS_TRANING_OPTIONS : "Training settings",
				OPTIONS_TRANING_DISPLAY_MOD : "Display more info",
				OPTIONS_TRANING_DISPLAY_COST_CALCULATOR : "Display cost calculator",

			OPTIONS_AUCTION_OPTIONS : "Auction settings",
				OPTIONS_AUCTION_TABLE_MODIFICATIONS : "Enable interface modifications",
					OPTIONS_AUCTION_DISPLAY_ITEMS_NUM : "Display number of items",
					OPTIONS_AUCTION_DISPLAY_ITEMS_BGCOLOR : "Display item's quality on background",
					OPTIONS_AUCTION_AUTO_FILL_GOLD : "Auto-fill gold amount",
					OPTIONS_AUCTION_DISPLAY_ITEMS_LVL : "Display item's level",
					OPTIONS_AUCTION_DISPLAY_3_ITEMS_PER_ROW : "Display 3 items per line",
					OPTIONS_AUCTION_MULTIPLE_BIDS : "Enable multiple bids (no refresh)",
					OPTIONS_AUCTION_WARN_GUILD : "Enable the button that reports the auction status to guild",
				OPTIONS_AUCTION_SEARCH_MODIFICATIONS : "Enable search modifications",
					OPTIONS_AUCTION_EXPAND_ITEMS_LVL : "Expand items' levels",
					OPTIONS_AUCTION_IMPROVE_SEARCH_MENU : "Improve search menu",
				OPTIONS_AUCTION_TOOLTIP_MODIFICATIONS : "Enable tooltip modifications",
					OPTIONS_AUCTION_MERCENARIES_TOOLTIPS : "Display for each mercenary its tooltip when on Mercenaries",
					OPTIONS_AUCTION_HIDE_MERCENARIES_GUIDE_ROW : "Hide the guide/last row of mercenaries tooltips (better compare view)",

			OPTIONS_MARKET_OPTIONS : "Market settings",
				OPTIONS_MARKET_TABLE_MODIFICATIONS : "Enable interface modifications",
					OPTIONS_MARKET_LOAD_MORE_PAGES : "Auto load more pages",
					OPTIONS_MARKET_STYLE_CHANGES : "Enable style modifications",
					OPTIONS_MARKET_CANCEL_PACKETS_BUTTON : "Display cancel all packets button",
					OPTIONS_MARKET_DEFAULT_SELL_DURATION : "Select the default market sell duration",
				OPTIONS_MARKET_SEARCH_MODIFICATIONS : "Enable search modifications",
					OPTIONS_MARKET_EXPAND_ITEMS_LVL : "Expand items' levels",
					OPTIONS_MARKET_IMPROVE_SEARCH_MENU : "Improve search menu",

			OPTIONS_MERCHANTS_OPTIONS : "Merchants settings",
				OPTIONS_MERCHANTS_ITEM_SEARCH : "Enable merchants item search",
				OPTIONS_MERCHANTS_HIGHLIGHT_ITEMS : "Enable merchants highlight items you can buy",
				OPTIONS_MERCHANTS_INFOS : "Enable the information boxes under merchants",

			OPTIONS_MESSAGES_OPTIONS : "Messages settings",
				OPTIONS_MESSAGES_LIST_OPTIONS : "Messages list settings",
					OPTIONS_MESSAGES_STYLING : "Improve messages interface",
					OPTIONS_MESSAGES_CONVERT_LINKS : "Convert text URLs to links",
					OPTIONS_MESSAGES_FIX_SPACES : "Fix messages space problem",
				OPTIONS_NEW_MESSAGE_OPTIONS : "New message settings",
					OPTIONS_NEWMESSAGE_FOCUS : "Set instant focus on content",
					OPTIONS_NEWMESSAGE_FRIENDLIST : "Enable friends list button",
				OPTIONS_MESSAGE_SPAM_BLOCK_OPTIONS : "Messages spam block settings",
					OPTIONS_MESSAGE_SPAM_BLOCK : "Enable messages spam block",
					OPTIONS_SPAM_BLOCKED_PLAYERS : "Blocked players (separate with ,)",

			OPTIONS_PACKAGES_OPTIONS : "Packages settings",
				OPTIONS_PACKAGES_NEW_LAYOUT : "Enable new packages' layout",
				OPTIONS_PACKAGES_MAX_PAGES_TO_LOAD : "Maximum number of pages to load",
				OPTIONS_PACKAGES_COLLECT_GOLD_BUTTON : "Enable gold collect button",
				OPTIONS_PACKAGES_EXPIRED_PACKAGES : "Enable expired packages warning",
				OPTIONS_PACKAGES_EXPIRED_HOURS : "Packages expire warning under these expiration hours",

			OPTIONS_REPORTS_OPTIONS : "Reports settings",
				OPTIONS_REPORT_LIST_OPTIONS : "Report list settings",
					OPTIONS_REPORT_LIST_STYLE : "Improve report list interface",

			OPTIONS_CHAT_OPTIONS : "Chat settings",
				OPTIONS_CHAT_URL_MOD : "Enable chat URL modification",
				OPTIONS_CHAT_STYLE_MOD : "Improve chat's style",
					
			OPTIONS_GUILD_OPTIONS : "Guild settings",
				OPTIONS_GUILD_MESSAGE_INTERFACE : "Improve guild's message interface",
				OPTIONS_GUILD_JAIL_INTERFACE : "Improve jail's interface",
				OPTIONS_GUILD_LIBRARY_INTERFACE : "Improve library's interface",
				OPTIONS_GUILD_BANK_INTERFACE : "Improve bank's interface",
				OPTIONS_GUILD_BANKBOOK_INTERFACE : "Improve bank's handbook interface",
				OPTIONS_GUILD_MEDIC_INTERFACE : "Improve medic center's interface",
				OPTIONS_GUILD_LIFE_TAB : "Display guild life tab on medic center",
				OPTIONS_GUILD_APPLICATION_ALERT: "Alert when a new guild application is made (for guild Admins)",
				OPTIONS_GUILD_NAMES_LEVELS : "Hide guild building's names and levels (main guild page)",
			
			OPTIONS_PANTHEON_OPTIONS : "Pantheon settings",
				OPTIONS_PANTHEON_QUESTS_ORDER : "Enable Quests grouping",
				OPTIONS_PANTHEON_QUESTS_DETAILED_REWARDS : "Enable detailed rewards view",
				OPTIONS_PANTHEON_GODS_RECOLOR : "Recolor buttons based on the favor of each good",
				
			OPTIONS_ARENA_OPTIONS : "Arena settings",
				OPTIONS_ARENA_SERVER_ARENA_ORDER : "Order gladiators by level",
				
			OPTIONS_PLAYER_OPTIONS : "Player Overview settings",
				OPTIONS_PLAYER_SIMULATOR_BUTTON : "Enable the simulator button",
				OPTIONS_PLAYER_MERCENARIES_FIGHT_TYPE : "Display player's mercenaries fight type",
			
			OPTIONS_PREMIUM_OPTIONS : "GCA Premium settings",
				OPTIONS_PREMIUM_KEY : "Write your GCA premium key",
				OPTIONS_GET_PREMIUM : "Buy a Premium Key",
				
			OPTIONS_GAME_FIXES_OPTIONS : "Game fixes",
				OPTIONS_FIXES_RTL_TOOLTIP_FIX : "Fix the moving tooltip problem (for left to right servers, ex. Arabic)"
	}
}
