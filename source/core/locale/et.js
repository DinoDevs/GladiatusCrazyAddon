/*
 * Gladiatus Crazy Addon Translation
 * Name : Estonian
 * Code : EE
 * Tag  : et-EE
 * Translator: 4Karl, Legend, Zuslik
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages["et"] = {

	// Language name
	name : "Eesti keel (Estonian)",
	translators : ["4Karl", "Legend", "Zuslik"],

	// Translations object
	locale : {
		// Addon info
		info : {
			description : "Vägevaim laiendus Gladiatusele!"
		},

		// General
		general : {
			// Days
			days : "päev(ad)",
			// Minutes
			minutes : "minutid",
			// Hours
			hours : "tunnid",
			// No data
			no_data : "Andmed puuduvad",

			// Buttons
			confirm : "Kinnita",
			cancel : "Tühista",
			close : "Sulge",
			error : "Viga",
			yes : "Jah",
			no : "Ei",
			ok : "Okei"
		},

		// Global
		global : {
			// Use a life potion
			life_potion_use : "Kasuta elueliksiiri!",
			life_potion_used : "Elueliksiir kasutatud!",
			life_potion_left : "Nüüd on sul {{number}} elupunkti!",

			// Life/Expedition/Dungeon points recovery
			life_recover_full : "Elupunktid täis!",
			expedition_recover_full : "Ekspeditsiooni punktid on taastunud",
			dungeon_recover_full : "Vangikoopa punktid on taastunud",

			// Button bar - Message
			message_private_write : "Kirjuta privaatsõnum",
			message_guild_write : "Kirjuta gildi sõnum",
			message_send : "Saada",
			message_sent_success : "Sõnud edukalt edastatud!",
			message_sent_failed : "Sõnumi edastamine ebaõnnestus!",
			message_empty : "Sõnum puudub!",
			message_exclude_me : "Jäta mind välja!",

			// Button bar buttons
			guild_market_goto : "Mine gildi turule",
			guild_storage_goto : "Mine gildi lattu",
			guild_bank_goto : "Mine gildi panka",
			guild_warcamp_goto : "Mine gildi sõjameistrite kotta",
			guild_arenareports_goto : "Vaata gildi lahinguraporteid",
			guild_jail_goto : "Mine gildi vanglasse",
			guild_library_goto : "Mine gildi raamatukokku",
			guild_templum_goto : "Mine gildi templisse",
			guild_medic_goto : "Mine gildi haiglasse",
			simulator_goto : "Mine simulaatorisse",
			stats_display : "Näita minu andmeid",
			online_display : "Näita online mängijaid",

			// Online friends
			online_friends : "Online sõbrad",
			guild_friends : "Gildi sõbrad",
			family_friends : "Perekonna sõbrad",

			// Guild donate
			donate_gold_confirm : "Oled sa kindel, et tahad annetada {{number}} kulda?",
			donate_gold_success : "Kuld annetatud!",
			donate_gold_failed : "Kulla annetus ebaõnnestus!",
			donate_gold_no_gold : "Pole kulda, mida annetada!",
			donate_gold_all_gold : "Anneta kogu kuld!",

			// Quest timer
			quest_full : "Täis",
			quest_new : "Uus",

			// Pray icon
			pray_start : "Vajuta palevatamiseks",
			pray_stop : "Vajuta palvetamise lõpetamiseks",
			heal : "Ravi",

			// Notifications
			notification_guild_application : "Uus gildi taotlus!",
			low_durability_items : "Sul on {{number}} asja, mille vastupidavus on alla {{percent}}%",
			item_worth_rubies : "See ese maksab rubiine!",

			// Gold - Exp data
			gold_exp_data : "Kulla ja kogemuse andmed",
			gold_exp_data_today : "Viimased 24 tundi",
			gold_exp_data_week : "Viimased 7 päeva",
			gold_exp_data_avg_day : "Keskmine päevas",
			gold_exp_data_to_level_up : "Päevi jäänud levelikss",
			gold_exp_data_package_tax : "Nädala kullapakkimise maksud",
			gold_exp_data_measurements : "Mõõdikud",
			gold_exp_data_total_exp : "Kogemust kokku",
			gold_exp_data_total_gold : "Kulda kokku"
		},

		// Overview
		overview : {
			// Stats Difference
			stats_difference : "Vahe",
			// Drop items to see materials to repair feature
			drop_item_see_materials_repair : "Lohist ese, et näha, mis materjale vaja parandamiseks.",
			workbench_6th_slot_empty : "Tööpingi kuues koht on vaja vabaks teha.",

			// More player info
			more_player_info : "Veel informatsiooni mängija kohta",
			can_use_max_item_level : "Saab kasutada esemeid kuni {{max}} levelini.",
			can_see_market_max_item_level : "Näeb esemeid kuni {max}} levelini.",
			can_see_auction_item_levels : "Näeb oksjonil esemeid levelist {{min}} kuni {{max}} levelini."
		},

		// Pantheon section
		pantheon : {
			// Mystery box
			mysterybox_open_all : "Ava kõik",
			mysterybox_open_stop : "Peata!",
			mysterybox_open_done : "Tehtud!"
		},

		// Guild section
		guild : {
			// Guild Bank
			bank_all_gold : "Kogu sinu kuld",

			// Library
			library_per_point_cost : "Maksumus iga stasi eest",
			library_gold_left : "Gildi kuld peale aktiveerimist!",

			// Medic
			medic_lost_points : "Kaotatud punktid",
			medic_points_to_heal : "Kui palju ravib",
			medic_life_after_heal : "Elud peale ravimist"
		},

		// Expedition
		expedition : {
			material_drop_chance : "{{number}}% võimalus, et leida materjal"
		},

		// Arena section
		arena : {
			global_arena_title : "Globaalne areen",
			global_arena_description : "See on ülim areen, kuhu kogunevad gladiaatorid kogu maailmast! Selles areenis ei võitle gladiaatorid kulla ega kogemuste pärast, nad võitlevad koha eest maailma edetabelis!",
			global_arena_load : "Lae vastaste nimekiri",
			global_highscore : "Globaalne edetabel",
			country : "Riik",
			server : "Server",
			target_list : "Sihtmärgid",
			target_list_add : "Lisa sihtmärgiks",
			target_list_remove : "Eemalda sihtmärkidest",
			error_sth_went_wrong : "Midagi läks valesti",
			error_response : "Ühendamisel tekkis viga",
			error_blocked_access : "Ühendus GCA serveriga puudub ({{url}})",
			error_connection : "Probleemid ühendusega",
			attack_player : "Vajuta, et rünnata “{{name}}”",
			fight_won : "Sa kaotasid võitluse!",
			fight_lost : "Sa kaotasid võitluse...",
			player_tired : "Sa oled väsinud. Sa pead puhkama."
		},

		// Training section
		training : {
			// Points analysis
			stats_points : "Statsid",
			points_breakdown : "Statside protsendiline tõus",
			stats_calculated_with_yourself_as_an_opponent : "Statsid on arvutatud, nagu ründaks iseennast.",
			// Cost calculator
			total_cost : "Kokku maksab",
			// Discount show
			costs_discount : "Treenimise allahindlus: {{number}}%"
		},

		// Auction section
		auction : {
			// Info
			items_info : "Esemete info",
			// Number of items in the page
			number_of_items : "Esemeid kokku : {{number}}",
			// Number of items that have been bidden in the page
			number_of_bided_items : "Oksjonil pakud esemed : {{number}}",
			// Message on items that you can buy and sell at the same price
			hide_your_gold_here : "Peida oma kuld siia",
			// Price of item equals to its value
			price_value_function : "Hind = Väärtus + {{number}}",
			// Levels you can see
			levels_you_can_see : "Sa näed esemeid levelist {{min}} kuni levelini {{max}}."
		},

		// Markets section
		markets : {
			// Warnings
			item_cost_only_x_gold : "Ese maksab ainult {{number}} kulda.",
			item_is_soulbound : "Ese on hingesugulusega.",
			item_cant_buy_back : "Seda eset ei saa tagasi osta.",
			// Are you sure
			are_you_sure_you_want_to_buy : "Kas oled kindel, et soovid eset osta?"
		},

		// Forge
		forge : {
			forge_ended : "Sulatamine lõpetatud!",
			recraft_item : "Proovi uuesti!",
			show_hide_doll : "Näita/Peida mängija varustus"
		},

		// Packages
		packages : {
			event_items : "Sündmuse esemed",
			known_scroll : "Kirjarull õpitud!",
			unknown_scroll : "Kirjarull õppimata!",
			advance_filters : "Täpsustavad filtrid",
			advance_filters_apply : "Kasuta filtrit",
			advance_filters_clear : "Kustuta filter",
			advance_filters_found : "(leitud {{items}})"
		},

		// Cross-Browser Sync
		sync : {
			are_you_sure : "Kas tohid sisse logida kasutajasse {{name}}?",
			gladiatus_crazy_addon_dependency : "Sul peab Gladiatus Crazy Addon olema installitud teisele brauserile.",
			how_to_sync_info : "Kopeeri url ja kleebi see teise brauserisse, või skänneeri qrcode."
		},

		// Settings
		settings : {
			// Settings
			settings : "Seaded",
			// Description
			description : "Aktiveeri või deaktiveeri laienduse lisasid.",
			description_click_button : "Vali milliseid laienduse seadeid soovid muuta...",

			// Categories
			category_global : "Üldine",
			category_overview : "Ülevaade",
			category_messages : "Sõnumid",
			category_packages : "Pakid",
			category_pantheon : "Pantheon",
			category_reports : "Rapordid",
			category_training : "Treening",
			category_merchants : "Kaupmehed",
			category_forge : "Sepikoda",
			category_arena : "Areen",
			category_magus : "Magus",
			category_market : "Turg",
			category_expedition : "Ekspeditsioonid",
			category_guild : "Gild",
			category_auction : "Oksjon",
			category_events : "Sündmused",
			category_sound : "Helid",
			category_data : "Andmed",

			// Settings - Global
			category_global$language_select : "Vali keel",
			category_global$browser_notifications : "Aktiveeri brauseri teated",
			category_global$extended_hp_xp_info : "Näita elupunktide ja xp infot üleval, kui leht alla keritud",
			category_global$extended_hp_xp_info_potion : "Näita elueliksiiri kasutamiseks ikooni",
			category_global$hp_timer_for_full_life : "Näita kui palju minuteid jäänud, et elupunktid täis saaksid",
			category_global$expedition_dungeon_points_recover_timer : "Näita kui palju minuteid jäänud, et ekspeditsiooni ja vangikoopa punktid taastuksid",
			category_global$shortcuts_bar : "Luba otseteede nupud",
			category_global$shortcuts_bar_buttons : "Vali otseteed, mida kuvada",
			category_global$auction_status_bar : "Näita okjonite staatuseid",
			category_global$auction_status_notification : "Anna teada, kui oksjoni staatus muutub",
			category_global$top_fixed_bar : "Luba ülemine fikseeritud riba",
			category_global$remember_tabs : "Mäleta kaupmehe laolehte",
			category_global$attacked_timers : "Näita ründamise taimerit",
			category_global$notify_new_guild_application : "Anna teada uuest gildi avaldusest",
			//category_global$check_guild_application_pinned_messages_interval : "Uue gildi avalduste kontrollimise aeg (minutites)", // add pinned messages
			category_global$x_scroll : "Aktiveeri horisontaalne kerimine",
			category_global$item_shadow : "Aktiveeri esemete varjud",
			category_global$inventory_options_group : "Grupeeri inventari valikud",
			category_global$inventory_gold_info : "Kuva esemete väärtused",
			category_global$pagination_layout : "Muuda lehekülje paigutust",
			category_global$gold_exp_data : "Näita kulla ja exp andmeid",
			category_global$pray_shorcut : "Kuva palvetamise ikoon Allmaailmas",
			category_global$show_durability : "Näita esemete vastupidavust",
			category_global$min_durability : "Teavita eseme vastupidavust _% (0 siis lõppeb)",
			category_global$show_forge_info : "Kuva sepikoja informatsiooni",
			// Settings - Overview
			category_overview$analyze_items : "Analüüsi esemete andmeid (treeningul vaja)",
			category_overview$food_life_gain : "Näita palju toit elupunkte taastab",
			category_overview$block_avoid_caps : "Näidake plokki ja vältige vahesid",
			category_overview$best_food : "Too esile sobivaim toit",
			category_overview$overfeed_food : "Peida toidud, mis annavad liiga palju elupunkte",
			category_overview$double_click_consume : "Topeltklikk, et toite süüa",
			category_overview$daily_bonus_log : "Sisse logimise boonus",
			category_overview$buffs_detailed_time : "Kuvage üksikasjalikke taimerid gildis",
			category_overview$mercenaries_manager : "Näita palgasõdurite haldurit",
			category_overview$mercenary_tooltip_show : "Kuva palgasõdurite näpunäiteid",
			category_overview$more_statistics : "Kuva statistika statistika vahekaardil rohkem statistikat",
			category_overview$achivements_layout : "Täiustage saavutuste paigutust",
			category_overview$costumes_layout : "Täiustage kostüümide paigutust",
			category_overview$items_repair_overview : "Näidake parandmiseks vajalikke materjalisid",
			// Settings - Main menu
			category_main_menu$advance_main_menu : "Uuenda peamenüüd",
			category_main_menu$submenu_click_to_change : "Menüü muutub klikiga",
			category_main_menu$quest_timer : "Näita ülesande taimerit",	
			category_main_menu$centurio_powerups_timers : "Kuva Tsentuurio & uuenduste taimerid",
			category_main_menu$forge_timers : "Näita sepikoja/sulatamise taimerit",
			category_main_menu$merchants_timer : "Näita kaupmeeste taimerit",
			// Settings - Messages
			category_messages$messages_layout : "Paranda sõnumite paigutust ",
			category_messages$show_unread : "Too esile lugemata kirjad",
			category_messages$separate_days : "Eralda sõnumid päevada kaupa",
			category_messages$more_guild_mate_info : "Näita rohkem gildi kaaslase andmeid",
			category_messages$show_message_links : "Kuva sõnumite lingid",
			category_messages$get_guild_battle_info : "Lae automaatselt võitluste tulemused",
			category_messages$show_sidebar : "Näita teateid kõrval ribal",
			category_messages$fix_header_links : "Fix messages title link click bug",
			category_messages$new_message_focus : "Näita uusi sõnumeid",
			category_messages$new_message_friend_list : "Aktiveeri sõbrade valimine sõnumites",
			// Settings - Packages
			category_packages$filters_layout : "Täiustage filtrite paigutust",
			category_packages$compact_info_layout : "Tee infopaigutus kompaktseks",
			category_packages$items_layout : "Paranda esemete paigutust",
			category_packages$small_items_layout : "Muuda esemed väiksemaks",
			category_packages$load_more_pages : "Lae rohkem lehti",
			category_packages$pages_to_load : "Loetud esemete arv",
			category_packages$item_price : "Näita esemete hinda",
			category_packages$special_category_features : "Aktiveeri spetsiaalse kategooria omadused",
			category_packages$double_click_open : "Topeltklikk, et avada pakke",
			category_packages$advance_filter : "Näita täpsemaid filtreid",
			// Settings - Pantheon
			category_pantheon$quests_reorder : "Aktiveeri ülesannete grupeerimine",
			category_pantheon$quests_detailed_rewards : "Näita ülesannete autasusid",
			category_pantheon$missions_show_completed : "Näita läbitud üleandeid",
			category_pantheon$gods_show_points_percent : "Näita jumalate punkte protsente",
			category_pantheon$open_many_mysteryboxes : "Ava mitu jumaliku saatuse kirstu korraga",
			category_pantheon$show_mysterybox_rewards_rubies : "Kuva Jumaliku saatuse kirstu autasude hindasid rubiinides",
			category_pantheon$show_mysterybox_rewards_owned : "Kuva mitu Jumaliku saatuse kirstu sul on",
			// Settings - Reports
			category_reports$style_change : "Paranda reportide paigutust",
			category_reports$load_loot_tooltips : "Lae iga raoporti vaevatasud",
			category_reports$found_items : "Kogu andmeid, mida ekspeditsioonidelt leidakse",
			category_reports$battle_analyzer : "Analüüsi raporteid",
			// Settings - Training
			category_training$show_discount : "Näita treeningu soodustust",
			category_training$show_basics_in_bars : "Näita algseid statse",
			category_training$multiple_train : "Aktiveeri mitme oskuse treenimine",
			category_training$calculator_train : "Aktiveeri maksumuse kalkulaator",
			category_training$show_analyze_items_data : "Kuva analüüsitud esemete andmed",
			category_training$show_points_after_upgrade : "Kuva oskuspunkte pärast täiendamist",
			// Settings - Merchants
			category_merchants$fade_unaffordable_items : "Peida esemeid, mida sa ei saa osta",
			category_merchants$show_shop_info : "Näita kaupmehe andmeid (kogu kuld ja rubiinid)",
			category_merchants$double_click_actions : "Topeltklikk, et müü/osta asju",
			// Settings - Forge
			category_forge$material_links : "[Sepikoda/Paranda] Näita materjalide otseteid (turule või pakidesse)",
			category_forge$show_levels : "[Sepikoda] Näita nimede kõrval esemete leveleid",
			category_forge$horreum_materials_names : "[Horreum] Näita materjalide nimesid",
			category_forge$horreum_remember_options : "[Horreum] Jäta meelde viimased valikud",
			category_forge$horreum_select_meterials : "[Horreum] Vali materjal klikkides",
			// Settings - Arena
			category_arena$ignore_attack_confirmations : "Ignoreeri liigründamise hoiatusi",
			category_arena$show_simulator_imagelink : "Näita areeni simulaatori pilt-linki (simulator.dinodevs.com)",
			category_arena$sort_by_lvl : "Sorteeri mängijad areenil leveli järgi",
			category_arena$highlight_guild_members : "Too esile mängijad, kes võivad olla sõbrad või gildi kaaslased teistes serverites",
			category_arena$target_list : "Mängijate sihtmärgid",
			// Settings - Magus
			category_magus$fade_unimprovable_items : "Peida esemeid, mida ei saa arendada",
			// Settings - Market
			category_market$soulbound_warning : "Küsi kinnitust, et osta hingesugulusega esemeid",
			category_market$one_gold_warning : "Küsi kinnitust, et osta esemeid 1 kulla eest",
			category_market$cancel_all_button : "Näita tühista kõik nuppu",
			category_market$remember_sell_duration : "Jäta meelde viimane müügiperioodi pikkus",
			category_market$sell_duration : "Vali vaikimise müügiperioodi pikkus",
			category_market$one_gold_mode : "Hoiatus esemetele, mille hind on 1 kuld",
			category_market$remember_sort : "Jäta meelde viimane sorteerimise järjekord",
			category_market$double_click_select : "Vali esemeid topeltklõpsuga",
			category_market$sell_warning_icons : "Hoiatus märk asjade müümisel",
			// Settings - Expedition
			category_expedition$show_enemy_drops : "Näita materjale, mida vastastelt saab",
			category_expedition$underworld_layout : "Näita Allmaailma vastaseid nagu ekspeditsiooni vastaseid",
			// Settings - Guild
			category_guild$jail_layout : "Paranda vangla paigutust",
			category_guild$library_layout : "Paranda raamatukogu paigutust",
			category_guild$library_fade_non_scrolls : "Peida esemed, mida raamatakogus ei saa kasutada",
			category_guild$library_tooltip_data : "Lisa rohkem andmeid raamatukogu kohtspikritele",
			category_guild$bank_donate_layout : "Paranda annetuste raamatu paigutust",
			category_guild$bank_book_layout : "Paranda panga paigutust",
			category_guild$medic_layout : "Paranda haigla paigutust",
			// Settings - Auction
			category_auction$items_counters : "Loenda esemed ja esemed, millele on panus tehtud",
			category_auction$more_search_levels : "Näita rohkem leveleid otsingu ribal",
			category_auction$item_price_analyze : "Analüüsi esemete hindasid",
			category_auction$item_level : "Näita eseme levelit",
			category_auction$x3_items_per_line : "Muuda paigutust 3 esemet ühes reas",
			category_auction$multi_bids : "Panusta mitmele esemele ilma lehte uuendamata",
			category_auction$extra_item_stats : "Näita lisa andmeid esemete piltidel",
			category_auction$save_last_state : "Oksjonil otsib viimast otsitut",
			// Settings - Events
			category_events$craps_timer : "Näita täringumängu timerit",
			category_events$server_quest_timer : "Näita sündmuste taimerit",
			// Settings - Sound
			category_sound$cooldown_sound_notifications : "Anna teada kui jahtumisaeg lõpeb",
			category_sound$muted : "Vaigista/Luba helid",
			category_sound$volume : "Heli tugevus",
			// Settings - Data
			category_data$export_settings : "Lae alla seadete andmed ",
			category_data$import_settings : "Lae üles seadete andmed",
			category_data$reset_settings : "Reseti seadete andmed",
			category_data$clear_data : "Kustuta andmed",
			category_data$cross_browser_login : "Andmed sünkroonimine",

			// Buttons
			save : "Salvesta",
			export : "Ekspordi",
			import : "Impordi",
			reset : "Reseti",
			clear : "Puhasta",
			do_not_show : "Ära näita",
			show_as : "Näita",
			show_info : "Näita informatsiooni",

			// Info
			translated_percent : "Palju on tõlgitud: {{number}}%",
			translated_by : "Tõlkijad: {{string}}",
			reset_settings_confirm : "Kas soovid seaded resettida?",
			clear_data_confirm : "Kas soovid andmed kustutada?",
			data_exported_save_the_file : "Andmed salvesatud.",

			// Notifications
			notification_reload : "Lae leht uuesti, et muutused toimuksid",
		}
	}
}

gca_languages._active = "et";
