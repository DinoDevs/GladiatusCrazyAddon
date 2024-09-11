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

	// Translations object
	locale : {
		// Addon info
		info : {
			description : "The craziest add-on for Gladiatus ever!"
		},

		// General
		general : {
			// Days
			days : "day(s)",
			// Minutes
			minutes : "minutes",
			// Hours
			hours : "hours",
			// No data
			no_data : "No data",

			// Buttons
			confirm : "Confirm",
			cancel : "Cancel",
			close : "Close",
			error : "Error",
			yes : "Yes",
			no : "No",
			ok : "OK"
		},

		// Global
		global : {
			// Use a life potion
			life_potion_use : "Use a life potion",
			life_potion_used : "A life potion was used",
			life_potion_left : "You now have {{number}} life potion(s)",
			
			// Life/Expedition/Dungeon points recovery
			life_recover_full : "Full life recover",
			expedition_recover_full : "Full expedition points recover",
			dungeon_recover_full : "Full dungeon points recover",
			health_notification: "Your health is below",

			// Button bar - Message
			message_private_write : "Write private message",
			message_guild_write : "Write guild message",
			message_send : "Send",
			message_sent_success : "Message was sent successfully",
			message_sent_failed : "Failed to sent message",
			message_empty : "The message is empty",
			message_exclude_me : "Exclude me",
			
			// Welcome message - text
			welcome_addon : "Welcome to Gladiatus Crazy Addon!",
			welcome_version : "The current installed version is",
			welcome_changelog : "Changelogs",

			// Button bar buttons
			guild_market_goto : "Go to guild's market",
			guild_storage_goto : "Go to guild's storage",
			guild_bank_goto : "Go to guild's bank",
			guild_baths_goto: "Go to guild's baths (Vox I)",
			guild_warcamp_goto : "Go to guild's war camp",
			guild_arenareports_goto : "Go to guild's arena battle reports",
			guild_jail_goto : "Go to guild's jail",
			guild_library_goto : "Go to guild's library",
			guild_templum_goto : "Go to guild's temple",
			auction_food_goto : "Go to food auctions",
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
			pray_start : "Press to start praying",
			pray_stop : "Press to stop praying",
			heal : "heal",

			// Notifications
			notification_guild_application : "There is a pending guild application!",
			notification_guild_attack_ready : "Guild war attack cooldown is over!",
			low_durability_items : "There are {{number}} item(s) with durability under {{percent}}%",
			item_worth_rubies : "That item worth rubies!",

			// Gold - Exp data
			gold_exp_data : "Gold and Experience Data",
			gold_exp_data_today : "Last 24 hours",
			gold_exp_data_week : "Last 7 days",
			gold_exp_data_avg_day : "Average values per day",
			gold_exp_data_to_level_up : "Days left to level up",
			gold_exp_data_package_tax : "Weekly gold-to-package tax",
			gold_exp_data_measurements : "Measurements",
			gold_exp_data_total_exp : "Total experience",
			gold_exp_data_total_gold : "Total gold",
			gold_exp_data_reset : "Stats have been reset!",
			gold_exp_data_desc: "Data are collected every 5 minutes. Selling items you have bought will double your gold earnings.",
			
			// Items
			// Mercenaries
			mercenary_type : "Type: {{name}} ({{number}})",
			gains_with_full_stats: "Gains with full stats:",
			// Item materials
			base : "Base",
			prefix : "Prefix",
			suffix : "Suffix"
		},

		// Overview
		overview : {
			// Stats Difference
			stats_difference : "Difference",
			// Drop items to see materials to repair feature
			drop_item_see_materials_repair : "Drop an item to see the materials needed to repair it",
			workbench_6th_slot_empty : "Workbench\'s 6th slot needs to be empty",

			// More player info
			more_player_info : "More player information",
			can_use_max_item_level : "Can use items up to {{max}} level.",
			can_see_market_max_item_level : "Can see items on the market up to {{max}} level.",
			can_see_auction_item_levels : "Can see items on the auction from {{min}} to {{max}} level."
		},

		// Pantheon section
		pantheon : {
			// Mystery box
			mysterybox_open_all : "Open all",
			mysterybox_open_stop : "Stop",
			mysterybox_open_done : "Done!"
		},

		// Guild section
		guild : {
			// Guild Bank
			bank_all_gold : "All your gold",
			total_donations: "Total donations",
			min_upgrades_gold: "Gold spend on upgrades (minimum)",
			max_stolen_gold: "Stolen gold from other guilds (maximum)",

			// Library
			library_per_point_cost : "Cost per stat point",
			library_gold_left : "Guild gold after activation",

			// Medic
			medic_lost_points : "Lost points",
			medic_points_to_heal : "Points to heal",
			medic_life_after_heal : "Life after heal",

			// Baths
			pinned_message : "Pinned guild message",
			pin_unpin_message : "Pin/Unpin this message",
			pinned_message_info : "Pinned messages are displayed at the top of the messages for all guild members using this feature",
			
			// Important ranks button
			important_ranks : "Important ranks"
		},

		// Expedition
		expedition : {
			material_drop_chance : "{{number}}% chance, between dropped materials"
		},

		// Arena section
		arena : {
			global_arena_title : "Global Arena",
			global_arena_description : "This is the ultimate arena, gathering gladiators from all around the world! In this arena, gladiators do not fight for gold or experience, they fight for a place on the world top list!",
			global_arena_load : "Load enemies list",
			global_highscore : "Global Highscore",
			country : "Country",
			server : "Server",
			target_list : "Target List",
			target_list_add : "Add to target list",
			target_list_remove : "Remove from target list",
			error_sth_went_wrong : "Something went wrong",
			error_response : "Server responded with an error",
			error_blocked_access : "Something blocks the access to GCA server ({{url}})",
			error_connection : "Connection error",
			attack_player : "Click to attack “{{name}}”",
			fight_won : "You won the fight!",
			fight_lost : "You lost the fight...",
			player_tired : "You are tired; you need to wait.",
			player1_hits_player2 : "{{name1}} hits {{name2}}",
			player_takes_x_damage :"{{name}} takes {{number}} damage",
			player_dies :"{{name}} dies"
		},

		// Training section
		training : {
			// Points analysis
			stats_points : "Stats Points",
			points_breakdown : "Points Breakdown",
			points_breakdown_damage : "Damage: +{{integer}} (+{{float}})",
			points_breakdown_block : "Block: +{{integer}}% (+{{float}}%)",
			points_breakdown_block_max : "Block: maximum value",
			points_breakdown_block_short : "Block: +{{integer}}%",
			points_breakdown_normal_hit : "Hit chance: +{{integer}}% (+{{float}}‰) *",
			points_breakdown_critical_hit : "Critical hit chance: +{{integer}}% (+{{float}}‰)",
			points_breakdown_critical_hit_short : "Critical hit: +{{integer}}%",
			points_breakdown_double_hit : "Double hit chance: +{{integer}}% (+{{float}}‰) *",
			points_breakdown_double_hit_factor : "Double hit factor: {{number}}",
			points_breakdown_avoid_double_hit_factor : "Avoid double hit factor: {{number}}",
			points_breakdown_avoid : "Avoid critical hit chance: +{{integer}}% (+{{float}}‰)",
			points_breakdown_avoid_max : "Avoid critical hit chance: maximum value",
			points_breakdown_avoid_short : "Avoid critical hit: +{{integer}}%",
			points_breakdown_enemy_normal_hit : "Opponent hit chance: {{integer}}% ({{float}}‰) *",
			points_breakdown_enemy_double_hit : "Opponent double hit chance: {{integer}}% ({{float}}‰) *",
			points_breakdown_life : "Life points: +{{number}}",
			points_breakdown_regeneration : "Regeneration per hour: +{{number}}",
			points_breakdown_threat : "Threat: +{{integer}} (+{{float}})",
			points_breakdown_heal : "Healing: +{{integer}} (+{{float}})",
			points_breakdown_critical_heal : "Critical healing: +{{integer}}% (+{{float}}‰)",
			points_breakdown_critical_heal_max : "Critical healing: maximum value",
			stats_calculated_with_yourself_as_an_opponent : "* Stats are calculated with the concept of attacking yourself.",
			values_in_parenthesis_explanation : "Values inside parentheses shows the corresponding values before rounding.",
			// Cost calculator
			total_cost : "Total cost",
			// Discount show
			costs_discount : "Training costs discount: {{number}}%",
			// CTRL Hint 
			ctrl_hint : "Hint: Hold down the CTRL key to increase/decrease by 10"
		},

		// Auction section
		auction : {
			// Info
			items_info : "Items information",
			// Number of items in the page
			number_of_items : "Number of items : {{number}}",
			// Number of items that have been bidden in the page
			number_of_bided_items : "Number of bidden items : {{number}}",
			// Message on items that you can buy and sell at the same price
			hide_your_gold_here : "Hide your gold here",
			// Price of item equals to its value
			price_value_function : "Price = Value + {{number}}",
			// Levels you can see
			levels_you_can_see : "You can see items from level {{min}} to level {{max}}.",
			// Sort
			sort : "Sort",
			sort_by : "Sort by",
			sort_order : "Order",
			asc : "Ascending",
			desc : "Descending"
		},

		// Markets section
		markets : {
			// Warnings
			item_cost_only_x_gold : "This item costs only {{number}} gold.",
			item_is_soulbound : "This item is soulbound.",
			item_cant_buy_back : "You will not be able to buy back this item.",
			// Are you sure
			are_you_sure_you_want_to_buy : "Do you really want to buy this item?",
			click_enter_to_sell : "press enter ⏎ to sell",
			// Tooltips
			add_fees_in_price : "Add fees in price",
		},
		
		// Forge
		forge : {
			forge_ended : "Forge ended!",
			recraft_item : "Re-craft item",
			show_hide_doll : "Show/Hide player dolls",
			horreum_material_change : "Horreum materials change",
			unknown_scrolls_share_code : "My unknown scrolls share code",
			use_share_code : "Use share code",
			use_share_code_description : "Paste a gladiator's share code to see which scrolls they know:",
			invalid_share_code : "Invalid share code",
		},
		
		// Merchants
		merchants : {
			search_item_in_merchants : "Search item in merchants",
			no_such_item : "No such item found."
		},
		
		// Packages
		packages : {
			event_items : "Event items",
			known_scroll : "You know this scroll",
			unknown_scroll : "You don't know this scroll",
			advance_filters : "Advanced filters",
			advance_filters_apply : "Apply filters",
			advance_filters_clear : "Clear filters",
			advance_filters_found : "(found {{items}})"
		},
		
		// Report
		reports : {
			avg_damage : "Average damage",
			avg_heal : "Average heal",
			total_hits : "Total hits",
			hits : "Hits",
			dodge : "Dodges or Blocks",
			points : "Points"
		},

		// Cross-Browser Sync
		sync : {
			are_you_sure : "Are you sure you want to login as the player {{name}}?",
			gladiatus_crazy_addon_dependency : "You must have Gladiatus Crazy Addon installed on the other browser.",
			how_to_sync_info : "Copy the url and paste it on the other browser, or scan the qrcode."
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
			category_main_menu : "Main menu",
			category_messages : "Messages",
			category_packages : "Packages",
			category_pantheon : "Pantheon",
			category_reports : "Reports",
			category_training : "Training",
			category_merchants : "Merchants",
			category_forge : "Forge",
			category_arena : "Arena",
			category_magus : "Magus",
			category_market : "Market",
			category_expedition : "Expedition",
			category_guild : "Guild",
			category_auction : "Auction",
			category_accessibility : "Accessibility",
			category_events : "Events",
			category_sound : "Sounds",
			category_data : "Data",

			// Settings - Global
			category_global$language_select : "Select addon's language",
			category_global$browser_notifications : "Enable browser notifications",
			category_global$extended_hp_xp_info : "Display extended HP and XP header info",
			category_global$extended_hp_xp_info_potion : "Display life potion use icon",
			category_global$hp_timer_for_full_life : "Display minutes left to full heal",
			category_global$health_warning : "Send a warning if your HP is below:",
			category_global$expedition_dungeon_points_recover_timer : "Display minutes left to full expedition/dungeon points recovery",
			category_global$shortcuts_bar : "Enable the shortcuts bar",
			category_global$shortcuts_bar_buttons : "Select shortcuts for the shortcuts bar",
			category_global$auction_status_bar : "Display auction status bar",
			category_global$auction_status_notification : "Alert when auction status changes",
			category_global$top_fixed_bar : "Enable top fixed bar",
			category_global$remember_tabs : "Remember merchants tabs",
			category_global$attacked_timers : "Show attacked timers",		
			category_global$notify_new_guild_application : "Notify me when there is a new guild application",
			category_global$check_guild_pinned_message : "Show guild pinned messages from the baths in messages",
			category_global$check_guild_application_pinned_messages_interval : "Check for guild applications and pinned messages every (minutes)",
			category_global$notify_guild_attack_ready : "Notify me when guild war attack cooldown",
			category_global$notify_guild_attack_ready_interval : "Check the guild war cooldown every (minutes)",
			category_global$x_scroll : "Enable gladiatus' horizontal scroll",
			category_global$item_shadow : "Enable items shadows",
			category_global$inventory_options_group : "Group inventory options",
			category_global$inventory_gold_info : "Show inventory items' gold price",
			category_global$pagination_layout : "Change pages-box's layout",
			category_global$gold_exp_data : "Show gold and exp data",
			category_global$pray_shorcut : "Display pray shortcut when in Underworld",			
			category_global$show_durability : "Display durability on item's bottom-left corner",
			category_global$min_durability : "Notification for items with durability+conditioning under _% (move to 0 to disable it)",
			category_global$show_forge_info : "Display item's forge materials on tooltips",
			category_global$show_mercenaries_real_name_and_combat_stats : "Display mercenaries real names (type) and combat stats on tooltips",
			category_global$show_upgrade_values : "Display buff values on reinforcements & upgrades",
			category_global$global_arena_timer : "Display Global Arena timer",
			category_global$gladiatus_site_fixes : "Fix and improve Gladiatus site style problems",
			category_global$gca_custom_scrollbar : "Use GCA custom page scrollbar",
			category_global$lock_section_visibility : "Lock the current state of hideable sections",
			category_global$hide_language_flags : "Hide language flags under player names",
			category_global$bar_hide_exp_btn : "Hide the Expedition buttons",
			category_global$bar_hide_dun_btn : "Hide the Dungeon buttons",
			category_global$bar_hide_are_btn : "Hide the Arena buttons",
			category_global$bar_hide_ct_btn : "Hide the Circus Turma buttons",
			// Settings - Overview
			category_overview$analyze_items : "Analyze items stats (needed for training)",
			category_overview$food_life_gain : "Show life gain from foods",
			category_overview$block_avoid_caps : "Show block and Avoid caps",
			category_overview$best_food : "Highlight best food",
			category_overview$overfeed_food : "Fade foods that will over-heal you",
			category_overview$double_click_consume : "Double click items to consume them",
			category_overview$daily_bonus_log : "Log daily bonus",
			category_overview$buffs_detailed_time : "Show detailed timers on guild buffs",
			category_overview$mercenaries_manager : "Show mercenaries manager",
			category_overview$mercenary_tooltip_show : "Show mercenaries tooltips",
			category_overview$more_statistics : "Show more stats on statistics tab",
			category_overview$achivements_layout : "Enhance achievements layout",
			category_overview$costumes_layout : "Enhance costumes layout",
			category_overview$items_repair_overview : "Show needed-materials-to-repair box",
			// Settings - Main menu
			category_main_menu$advance_main_menu : "Improve main menu",
			category_main_menu$submenu_click_to_change : "Submenu change on click",
			category_main_menu$menu_merge_merchants : "Merge all merchants into one menu entry",
			category_main_menu$menu_merge_items : "Merge Forge, Smelter, Workbench, Horreum and Magus into one menu entry",
			category_main_menu$quest_timer : "Show quests status or timer",
			category_main_menu$centurio_powerups_timers : "Display Centurio & PowerUps timers on Premium button",
			category_main_menu$forge_timers : "Show forge/smelt timer indicator",
			category_main_menu$merchants_timer : "Show merchants timer indicator",
			category_main_menu$menu_hide_citygate : "Hide the City gate menu entry",
			// Settings - Messages
			category_messages$messages_layout : "Improve messages layout",
			category_messages$show_unread : "Highlight unread messages",
			category_messages$separate_days : "Separate messages from different days",
			category_messages$more_guild_mate_info : "Show more guild mates info",
			category_messages$show_message_links : "Show links included on messages",
			category_messages$get_guild_battle_info : "Auto load guild battle results",
			category_messages$show_sidebar : "Show messages sidebar",
			category_messages$fix_header_links : "Fix messages title link click bug",
			category_messages$new_message_focus : "Focus on message body",
			category_messages$new_message_friend_list : "Enable select friend from list button",
			// Settings - Packages
			category_packages$filters_layout : "Enhance filters layout",
			category_packages$small_items_layout : "Make items small in size",
			category_packages$items_layout : "Improve items layout:",
			category_packages$compact_info_layout : "Make info layout compact",
			category_packages$list_view_layout : "Show packages as a list view",
			category_packages$load_more_pages : "Load more pages",
			category_packages$pages_to_load : "Number of pages to load",
			category_packages$item_price : "Show items' price",
			category_packages$special_category_features : "Enable special features per category\n•Show if scrolls are know/unknown\n•Show scroll icon item's prefix/suffix is unknown",
			category_packages$double_click_open : "Double click packets to open them",
			category_packages$advance_filter : "Advanced packages filters",
			category_packages$pop_over_bag : "Pop bag over on scroll",
			category_packages$packages_shortcuts : "Add item category shortcuts",
			// Settings - Pantheon
			category_pantheon$quests_reorder : "Enable quest grouping",
			category_pantheon$quests_detailed_rewards : "Show detailed quests rewards",
			category_pantheon$missions_show_completed : "Show completed missions",
			category_pantheon$gods_show_points_percent : "Show god points percent",
			category_pantheon$open_many_mysteryboxes : "Open multiple mystery boxes",
			category_pantheon$show_mysterybox_rewards_rubies : "Show mystery-box reward's value in rubies",
			category_pantheon$show_mysterybox_rewards_owned : "Show mystery-box reward's owned amount",
			// Settings - Reports
			category_reports$style_change : "Improve reports' list layout",
			category_reports$load_loot_tooltips : "Load each report's reward",
			category_reports$found_items : "Gather data about found items",
			category_reports$battle_analyzer : "Analyze report and show life stats",
			// Settings - Training
			category_training$show_discount : "Show training discount",
			category_training$show_basics_in_bars : "Show basics in bars",
			category_training$multiple_train : "Enable multiple training",
			category_training$calculator_train : "Enable cost calculator",
			category_training$show_analyze_items_data : "Show analyzed items data in tooltips",
			category_training$show_points_after_upgrade : "Show tab with trainings' impact on your combat stats",
			// Settings - Merchants
			category_merchants$fade_unaffordable_items : "Fade items that you can not afford",
			category_merchants$ruby_icon_on_items : "Add icon on items that cost rubies",
			category_merchants$show_shop_info : "Show shop info (total gold and rubies)",
			category_merchants$double_click_actions : "Double click items to sell/buy",
			category_merchants$alt_click_actions : "(HOLD) Alt + Click items to sell/buy",
			category_merchants$hide_prices : "Hide floating prices when selling/buying",
			// Settings - Forge
			category_forge$material_links : "[Forge/Repair] Show packages & market shortcuts for each material need",
			category_forge$show_levels : "[Forge] Show Prefix/Sufix/Base item levels next to names",
			category_forge$horreum_materials_names : "[Horreum] Show material name",
			category_forge$horreum_remember_options : "[Horreum] Remember last selected store settings",
			category_forge$horreum_select_meterials : "[Horreum] Select material on click",
			category_forge$double_click_select : "[Smelt/Repair] Select item with double click",
			category_forge$forge_notepad : "Add an extra notes field",			
			// Settings - Arena
			category_arena$ignore_attack_confirmations : "Ignore attack confirmations (over 5 attacks message etc)",
			category_arena$show_simulator_imagelink : "Show an image-link to the simulator (simulator.dinodevs.com)",
			category_arena$sort_by_lvl : "Sort players in arena by level",
			category_arena$highlight_guild_members : "Highlight players on other servers that may be guild members",
			category_arena$target_list : "Players target list",
			category_arena$overhaul_tables : "Separate & improve the best 5 and the personal ranking tables",
			// Settings - Magus
			category_magus$fade_unimprovable_items : "Fade items that you can not improve",
			// Settings - Market
			category_market$soulbound_warning : "Buy confirmation on soul-bound items",
			category_market$one_gold_warning : "Buy confirmation on items that cost 1 gold",
			category_market$cancel_all_button : "Show cancel-all button",
			category_market$remember_sell_duration : "Remember last chosen sell duration",
			category_market$add_fees_button : "Show [+] button that includes fees in selling price",
			category_market$sell_duration : "Select default sell duration",
			category_market$one_gold_mode : "Add toggleable buttons for item prices (custom prices included)",
			category_market$custom_prices : "Custom market prices, separated with commas. Calculate base on percentage of the item's price by adding an '%'. (e.g., '10000, 10.000, 200%')",
			category_market$remember_sort : "Remember last sort order",
			category_market$double_click_select : "Select item with double click",
			category_market$sell_warning_icons : "Warning icon when selling items",
			category_market$sell_with_enter : "Sell items by pressing ENTER ⏎",
			// Settings - Expedition
			category_expedition$show_enemy_drops : "Show crafting materials each enemy drops",
			category_expedition$underworld_layout : "Show underworld's enemies layout like expedition's",
			// Settings - Guild
			category_guild$jail_layout : "Improve jail's layout",
			category_guild$library_layout : "Improve library's layout",
			category_guild$library_fade_non_scrolls : "Fade items that are not scrolls on library",
			category_guild$library_tooltip_data : "Add more data on library's tooltips",
			category_guild$bank_donate_layout : "Improve bank's donate layout",
			category_guild$bank_book_layout : "Improve bank's book layout",
			category_guild$bank_book_show_changes : "Show donation variations since last visit on bank's book",
			category_guild$medic_layout : "Improve medic's layout",
			// Settings - Auction
			category_auction$items_counters : "Count items and bidden items",
			category_auction$more_search_levels : "Show more levels in search options",
			category_auction$item_price_analyze : "Analyze items' prices",
			category_auction$item_level : "Show items' level",
			category_auction$item_name : "Show items' name",
			category_auction$x3_items_per_line : "Change layout to 3 items per line",
			category_auction$multi_bids : "Bid many items without page refresh",
			category_auction$extra_item_stats : "Show extra stats on item images",
			category_auction$save_last_state : "Implemented auction save search and load it by default",
			// Settings - Accessibility
			category_accessibility$white_level_indicators : "Change level number indicators on items to white",
			category_accessibility$qualty_symbols_indicators : "Add quality symbols indicators on items",
			category_accessibility$tooltips_qualty_white : "Change item title in tooltips to white",
			category_accessibility$tooltips_qualty_symbols : "Add quality symbols on tooltips",
			// Settings - Events
			category_events$craps_timer : "Display dice event's timer at the top",
			category_events$server_quest_timer : "Display server-quest or location event's timer at the top",
			// Settings - Sound
			category_sound$cooldown_sound_notifications : "Enable cooldowns sounds notifications (expedition, dungeon, arena)",
			category_sound$muted : "Mute/Unmute sounds",
			category_sound$volume : "Sounds volume",
			// Settings - Data
			category_data$export_settings : "Export settings to file",
			category_data$import_settings : "Import settings from file",
			category_data$export_settings_to_notes : "Export settings to notes",
			category_data$import_settings_from_notes : "Import settings from notes",
			category_data$reset_settings : "Reset addon's settings",
			category_data$clear_data : "Clear all addon's data",
			category_data$clear_cache_data : "Clear addon's temporal data (cache)",
			category_data$cross_browser_login : "Cross browser login sync",
			category_data$export_error_player_settings : "Export unknown-user data to file", // TODO: This may be removed on the future

			// Buttons
			save : "Save",
			export : "Export",
			import : "Import",
			reset : "Reset",
			clear : "Clear",
			do_not_show : "Do not show",
			show_as : "Show as",
			show_info : "Show information",
			each_category : "Run on target category",
			all_category : "Run on target category & all",
			do_not_run : "Do not run",
			default: "Default",
			highlight: "Highlight",

			// Info
			translated_percent : "Translated percent: {{number}}%",
			translated_by : "Translated by: {{string}}",
			reset_settings_confirm : "Are you sure you want to reset addon's settings?",
			clear_data_confirm : "Are you sure you want to clear all the addon's data?",
			data_exported_save_the_file : "Data were exported. Save the file.",
			missing_translations : "Missing translations",

			// Notifications
			notification_reload : "Reload the page for the changes to take effect",
		}
	}
}
