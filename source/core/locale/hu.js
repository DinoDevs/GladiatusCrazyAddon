/*
 * Gladiatus Crazy Addon Translation
 * Name : Magyar (Hungarian)
 * Code : [none]
 * Tag  : hu
 * Translator: Adamus23, Saiid, Gabooor, ArtyomCheeky
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages['hu'] = {

	// Language name
	name : 'Magyar (Hungarian)',
	// Translators (authors of this script)
	translators : ["Adamus23", "Saiid", "Gabooor, ArtyomCheeky"],

	// Translations object
	locale : {
		// Addon info
		info : {
			description : "A legjobb segédprogram Gladiatusra!"
		},

		// General
		general : {
			// Days
			days : "nap",
			// Minutes
			minutes : "perc",
			// Hours
			hours : "óra",
			// No data
			no_data : "Nincs adat",

			// Buttons
			confirm : "Megerősít",
			cancel : "Visszavon",
			close : "Bezár",
			error : "Hiba",
			yes : "Igen",
			no : "Nem",
			ok : "Oké"
		},

		// Global
		global : {
			// Use a life potion
			life_potion_use : "Elhasználni egy életerő italt",
			life_potion_used : "Egy életerő ital el lett használva",
			life_potion_left : "{{number}} életerő italod maradt",

			// Life/Expedition/Dungeon points recovery
			life_recover_full : "Összes életerő feltöltődik",
			expedition_recover_full : "Összes expedíciós pont feltöltődik",
			dungeon_recover_full : "Összes kazamata pont feltöltődik",

			// Button bar - Message
			message_private_write : "Privát üzenet írása",
			message_guild_write : "Egyesületi üzenet írása ",
			message_send : "Küldés",
			message_sent_success : "Üzenet sikeresen elküldve",
			message_sent_failed : "Sikertelen üzenetküldés",
			message_empty : "Az üzenet üres",
			message_exclude_me : "Számomra ne",

			// Button bar buttons
			guild_market_goto : "Ugrás az egyesületi piachoz",
			guild_storage_goto : "Ugrás a raktárépülethez",
			guild_bank_goto : "Ugrás a bankhoz",
			guild_baths_goto : "Ugrás a Vox Logusba",
			guild_warcamp_goto : "Ugrás a harcmesterek csarnokához",
			guild_arenareports_goto : "Ugrás az egyesület csatajelentéseihez",
			guild_jail_goto : "Ugrás a negotium x-hez",
			guild_library_goto : "Ugrás a könyvtárhoz",
			guild_templum_goto : "Ugrás a templomhoz",
			auction_food_goto : "Ugrás az élelmiszer aukciókhoz",
			guild_medic_goto : "Ugrás a villa medici-hez",
			simulator_goto : "Ugrás a szimulátorhoz",
			stats_display : "Statisztikám mutatása",
			online_display : "Aktív barátok mutatása",
			
			// Online friends
			online_friends : "Aktív barátok",
			guild_friends : "Egyesületi társak",
			family_friends : "Felvett barátok",

			// Guild donate
			donate_gold_confirm : "Biztos szeretnél {{number}} aranyat adományozni?",
			donate_gold_success : "Sikeres adományozás",
			donate_gold_failed : "Sikertelen adományozás",
			donate_gold_no_gold : "Nincs aranyad az adományozáshoz",
			donate_gold_all_gold : "Összes arany adományozása",

			// Quest timer
			quest_full : "Max",
			quest_new : "Új",

			// Pray icon
			pray_start : "Nyomd meg az ima elkezdéséhez",
			pray_stop : "Nyomd meg az ima befejezéséhez",
			heal : "gyógyít",

			// Notifications
			notification_guild_application : "Van egy függőben lévő egyesületi jelentkezés!",
			notification_guild_attack_ready : "Egyesületi csata időkorlátja lejárt!",
			low_durability_items : "{{number}} felszerelés van, melynek értéke {{percent}}% alatt van!",
			item_worth_rubies : "A tárgy rubinba kerül!",

			// Gold - Exp data
			gold_exp_data : "Arany és tapasztalat adatai",
			gold_exp_data_today : "Elmúlt 24 óra",
			gold_exp_data_week : "Elmúlt 7 nap",
			gold_exp_data_avg_day : "Átlagos érték naponta",
			gold_exp_data_to_level_up : "Nap van hátra a szintlépésig",
			gold_exp_data_package_tax : "Heti csomagolás díja",
			gold_exp_data_measurements : "Értékek",
			gold_exp_data_total_exp : "Összes tapasztalat",
			gold_exp_data_total_gold : "Összes arany",
			gold_exp_data_reset : "A statisztikák nullázódtak!",
			gold_exp_data_desc : "Az adatok 5 percenként kerülnek mentésre. Ha vásárolsz egy tárgyat és újra eladod, az mégegyszer felszámolódik.",

			// Items
			mercenary_type : "Írd: {{name}} ({{number}})",
			gains_with_full_stats : "Maximális statisztikákkal járó értékek:",

			// Misc
			base : "Alap",
			prefix : "Előtag",
			suffix : "Utótag",
			health_notification : "Az életerőd alacsonyabb, mint",
			welcome_addon : "Üdvözöljük a Gladiatus Crazy Addonban!",
			welcome_version : "A jelenleg telepített verzió",
			welcome_changelog : "Változási napló",
		},

		// Overview
		overview : {
			// Stats Difference
			stats_difference : "Különbség",
			// Drop items to see materials to repair feature
			drop_item_see_materials_repair : "Rakj ide egy tárgyat, hogy lásd a javításhoz szükséges anyagokat",
			workbench_6th_slot_empty : "A Munkaasztal 6. helyének üresnek kell lennie",

			// More player info
			more_player_info : "További infók a játékosról",
			can_use_max_item_level : "Maximum {{max}} szintű tárgyakat használhat.",
			can_see_market_max_item_level : "Maximum {{max}} szintű tárgyakat láthat a piacon.",
			can_see_auction_item_levels : "Minimum {{min}} és maximum {{max}} szintű tárgyakat láthat az Aukciós Házban."
		},

		// Pantheon section
		pantheon : {
			// Mystery box
			mysterybox_open_all : "Összes kinyitása",
			mysterybox_open_stop : "Állj",
			mysterybox_open_done : "Kész!"
		},

		// Guild section
		guild : {
			// Guild Bank
			bank_all_gold : "Összes arany",
			total_donations : "Összes adomány",
			min_upgrades_gold : "Fejlesztésekre elköltött arany (minimum)",
			max_stolen_gold : "Más egyesületektől rabolt arany (maximum)",

			// Library
			library_per_point_cost : "Ára pontonként",
			library_gold_left : "Egysület aranya aktiválás után",

			// Medic
			medic_lost_points : "Elvesztett életerő pontok",
			medic_points_to_heal : "Gyógyítható életerő pontok",
			medic_life_after_heal : "Életerő gyógyítás után",

			// Baths
			pinned_message : "Rögzített egyesületi üzenet",
			pin_unpin_message : "Üzenet rögzítése / rögzítés törlése",
			pinned_message_info : "A rögzített üzenetek mindenki számára az üzenetek tetején lesz látható",

			// Important ranks button
			important_ranks : "Fontos rangok"
		},

		// Expedition
		expedition : {
			material_drop_chance : "{{number}}% esély, hogy ezt a nyersanyagot kapod"
		},

		// Arena section
		arena : {
			global_arena_title : "Nemzetközi Aréna",
			global_arena_description : "Ez a végső aréna, ahol a gladiátorok a világ összes tájáról összegyűlnek. Ebben az arénában a gladiátorok nem aranyért vagy tapasztalati pontokért, hanem a világ toplistájának első helyéért harcolnak!",
			global_arena_load : "Ellenfelek listájának betöltése",
			global_highscore : "Nemzetközi toplista",
			country : "Ország",
			server : "Szerver",
			target_list : "Célpont lista",
			target_list_add : "Célpont felvétele a listára",
			target_list_remove : "Eltávolítás a listáról",
			error_sth_went_wrong : "Valami nem működik",
			error_response : "A szerver hibával válaszolt",
			error_blocked_access : "Valami blokkolja a GCA szervert ({{url}})",
			error_connection : "Csatlakozási hiba",
			attack_player : "Kattints “{{name}}” megtámadásához",
			fight_won : "Megnyerted a harcot!",
			fight_lost : "Elvesztetted a harcot...",
			player_tired : "Fáradt vagy; muszáj pihened.",
			player1_hits_player2 : "{{name1}} megütötte őt: {{name2}}",
			player_takes_x_damage :"{{name}} {{number}} sebzést szenvedett el",
			player_dies :"{{name}} meghalt"
		},

		// Training section
		training : {
			// Points analysis
			stats_points : "Képességek",
			points_breakdown : "Képességek elemzése",
			points_breakdown_damage : "Sebzés: +{{integer}} (+{{float}})",
			points_breakdown_block : "Blokkolás: +{{integer}}% (+{{float}}%)",
			points_breakdown_block_max : "Blokkolás: maximum érték",
			points_breakdown_block_short : "Blokkolás: +{{integer}}%",
			points_breakdown_normal_hit : "Esély a találatra: +{{integer}}% (+{{float}}‰) *",
			points_breakdown_critical_hit : "Esély a kritikus találatra: +{{integer}}% (+{{float}}‰)",
			points_breakdown_critical_hit_short : "Kritikus találat: +{{integer}}%",
			points_breakdown_double_hit : "Dupla találat: +{{integer}}% (+{{float}}‰) *",
			points_breakdown_double_hit_factor : "Dupla találati faktor: {{number}}",
			points_breakdown_avoid_double_hit_factor : "Dupla találat elkerülési faktor: {{number}}",
			points_breakdown_avoid : "Kritikus találat elkerülésének esélye: +{{integer}}% (+{{float}}‰)",
			points_breakdown_avoid_max : "Kritikus találat elkerülésének esélye: maximum érték",
			points_breakdown_avoid_short : "Kritikus találat elkerülésének esélye: +{{integer}}%",
			points_breakdown_enemy_normal_hit : "Ellenfél találatának esélye: {{integer}}% ({{float}}‰) *",
			points_breakdown_enemy_double_hit : "Ellenfél dupla találatának esélye: {{integer}}% ({{float}}‰) *",
			points_breakdown_life : "Életerő: +{{number}}",
			points_breakdown_regeneration : "Regeneráció óránként: +{{number}}",
			points_breakdown_threat : "Veszély: +{{integer}} (+{{float}})",
			points_breakdown_heal : "Gyógyítás: +{{integer}} (+{{float}})",
			points_breakdown_critical_heal : "Kritikus gyógyítás: +{{integer}}% (+{{float}}‰)",
			points_breakdown_critical_heal_max : "Kritikus gyógyítás: maximum érték",
			values_in_parenthesis_explanation : "A zárójelekben található érték a kerekítés előtti értéket mutatja.",
			stats_calculated_with_yourself_as_an_opponent : "* Az elemzést egy saját magad ellen folytatott harc alapján számolja",
			// Cost calculator
			total_cost : "Összköltség",
			// Discount show
			costs_discount : "Gyakorlás olcsóbb {{number}}%-kal"
		},

		// Auction section
		auction : {
			// Info
			items_info : "Tárgyak információi",
			// Number of items in the page
			number_of_items : "Tárgyak ezen az oldalon: {{number}}",
			// Number of items that have been bidden in the page
			number_of_bided_items : "Licitált tárgyak száma: {{number}}",
			// Message on items that you can buy and sell at the same price
			hide_your_gold_here : "Csomagold az aranyad itt",
			// Price of item equals to its value
			price_value_function : "Ár =Érték + {{number}}",
			// Levels you can see
			levels_you_can_see : "Minimum {{min}} és maximum {{max}} szintű tárgyakat láthatsz.",
			// Sort
			sort : "Csoportosítás",
			sort_by : "Csoportosítás: ",
			sort_order : "Sorrend",
			asc : "Növekvő",
			desc : "Csökkenő"
		},

		// Markets section
		markets : {
			// Warnings
			item_cost_only_x_gold : "Ez a tárgy csak {{number}} arany.",
			item_is_soulbound : "Ez a tárgy összetartozó lélek.",
			item_cant_buy_back : "Ezt a tárgyat nem fogod tudni visszavásárolni.",
			// Are you sure
			are_you_sure_you_want_to_buy : "Biztos meg akarod venni ezt a tárgyat?",
			click_enter_to_sell : "nyomj entert ⏎ az eladáshoz",
			// Tooltips
			add_fees_in_price : "Piaci díj hozzáadása az árhoz"
		},

		// Forge
		forge : {
			forge_ended : "Olvasztás befejeződött!",
			recraft_item : "Tárgy újrakovácsolása",
			show_hide_doll : "Mutasd/rejtsd el a játékos felszereléseit",
			horreum_material_change : "Csűr nyersanyag változás"
		},

		// Merchants
		merchants : {
			search_item_in_merchants : "Tágy keresése a kereskedőknél",
			no_such_item : "Sikertelen keresés."
		},

		// Packages
		packages : {
			event_items : "Event tárgyak",
			known_scroll : "Már tudod a tekercset",
			unknown_scroll : "Még nem tudod a tekercset",
			advance_filters : "Speciális szűrők",
			advance_filters_apply : "Szűrők elfogadása",
			advance_filters_clear : "Szűrők törlése",
			advance_filters_found : "({{items}} találása)"
		},

		// Report
		reports : {
			avg_damage : "Átlagos sebzés",
			avg_heal : "Átlagos gyógyulás",
			total_hits : "Összes találat",
			hits : "Találat",
			dodge : "Kitérés vagy Blokkolás",
			points : "Pontok"
		},

		// Cross-Browser Sync
		sync : {
			are_you_sure : "Biztos vagy benne, hogy be akarsz jelentkezni, mint {{name}}?",
			gladiatus_crazy_addon_dependency : "Telepítened kell a Gladiatus Crazy Addon-t a másik böngészőben is.",
			how_to_sync_info : "Másold ki a webcímet, majd illeszd be a másik böngészőnél, vagy szkenneld be a qr kódot."
		},

		// Settings
		settings : {
			// Settings
			settings : "Beállítások",
			// Description
			description : "A kiegészítő beállításainak engedélyezése vagy tiltása",
			description_click_button : "Kattints a gombra, hogy a kiegészítő beállításaihoz ugorj!",

			// Categories
			category_main_menu : "Főmenü",
			category_global : "Általános",
			category_overview : "Áttekintés",
			category_messages : "Üzenetek",
			category_packages : "Csomagok",
			category_pantheon : "Templom",
			category_reports : "Csatajelentések",
			category_training : "Gyakorlás",
			category_merchants : "Kereskedők",
			category_forge : "Kovácsolás",
			category_arena : "Aréna",
			category_magus : "Mágus",
			category_market : "Piac",
			category_expedition : "Expedíció",
			category_guild : "Egyesület",
			category_auction : "Aukció",
			category_accessibility : "Megjelenítés",
			category_events : "Eventek",
			category_sound : "Hangok",
			category_data : "Adatok",

			// Settings - Global
			category_global$language_select : "Segédprogram nyelvének kiválasztása",
			category_global$browser_notifications : "Böngésző értesítéseinek engedélyezése",
			category_global$health_warning : "Figyelmeztetés küldése, ha az életpontok alacsonyabbak, mint:",
			category_global$extended_hp_xp_info : "Életerő és tapasztalati pontok megjelenítése",
			category_global$extended_hp_xp_info_potion : "Életerő ital ikonjának megjelenítése",
			category_global$hp_timer_for_full_life : "Életerő feltöltődésének idejének megjelenítése",
			category_global$expedition_dungeon_points_recover_timer : "A teljes expedíció/kazamata feltöltődéséhez szükséges idő megjelenítése",
			category_global$shortcuts_bar : "Gyorskezelési eszköztár megjenítése",
			category_global$lock_section_visibility : "Az elrejthető szekciók jelenlegi állapotának zárolása",
			category_global$hide_language_flags : "Nyelvi zászlók elrejtése a játékosnevek alatt",
			category_global$gca_custom_scrollbar : "GCA egyedi görgetősáv használata",
			category_global$gladiatus_site_fixes : "A Gladiatus webhely stílusbeli hibáinak javítása és fejlesztése",
			category_global$show_mercenaries_real_name_and_combat_stats : "Zsoldosok valódi neveinek (típus) és harci statisztikáinak megjelenítése az eszköztippekben",
			category_global$check_guild_application_pinned_messages_interval : "Céhjelentkezések és kitűzött üzenetek ellenőrzése minden (percben)",
			category_global$shortcuts_bar_buttons : "Válasszon parancsikont az eszköztár sávjához",
			category_global$show_upgrade_values : "Buff értékek megjelenítése a megerősítéseknél és fejlesztéseknél",
			category_global$auction_status_bar : "Aukciós sáv megjelenítése",
			category_global$auction_status_notification : "Jelzés, ha az aukció állapota megváltozik",
			category_global$check_guild_pinned_message : "Mutassa a céh kitűzött üzeneteit az üzenetek között a fürdőkben",
			category_global$top_fixed_bar : "Felső rögzített sáv engedélyezése",
			category_global$remember_tabs : "Emlékezzen a kereskedő utoljára látogatott lapjára",
			category_global$attacked_timers : "Támadási időzítők megjelenítése",
			category_global$notify_new_guild_application : "Értesítés, ha új jelentkező van az egyesületbe",
			category_global$bar_hide_exp_btn : "Az Expedíciós gombok elrejtése",
			category_global$bar_hide_dun_btn : "A Kazamaták gombok elrejtése",
			category_global$bar_hide_are_btn : "Az Aréna gombok elrejtése",
			category_global$bar_hide_ct_btn : "A Circus Turma gombok elrejtése",
									
			//category_global$check_guild_application_pinned_messages_interval : "Ellenőrizze az applikációkat minden percben", // add pinned messages
			category_global$notify_guild_attack_ready : "Értesítés, ha újra lehet egyesületi támadást indítani",
			category_global$notify_guild_attack_ready_interval : "Ellenőrizze az egyesületi támadás korlátozásának idejét minden percben",
			category_global$x_scroll : "Engedélyezze a játék vízszintes görgetését",
			category_global$item_shadow : "Tárgyak árnyékának engedélyezése",
			category_global$inventory_options_group : "Felszerelés csoportos beállításai",
			category_global$inventory_gold_info : "Mutassa a tárgyak darabárát",
			category_global$pagination_layout : "Az oldalak dobozának elrendezésének megváltoztatása",
			category_global$gold_exp_data : "Mutassa az arany és tapasztalati pont adatokat",
			category_global$pray_shorcut : "Mutassa az imádkozási parancsikont az alvilágban",
			category_global$show_durability : "Állapot megjelenítése az elem bal alsó sarkában",
			category_global$min_durability : "Értesítés, ha egy tárgy állapota _% alá esik (állítsd 0-ra, hogy kikapcsold)",
			category_global$show_forge_info : "Jelenítse meg az tárgyak kovácsolási anyagát az eszköztippben",
			category_global$show_mercenaries_real_name : "Jelenítse meg a zsoldosok valódi nevét és típusát",
			category_global$global_arena_timer : "Jelenítse meg a Nemzetközi Aréna idejét",
			// Settings - Overview
			category_overview$analyze_items : "Felszerelés statisztikájának elemzése (gyakorláshoz szükséges)",
			category_overview$food_life_gain : "Mutassa az ételekből nyerhető életerőt",
			category_overview$block_avoid_caps : "Mutassa a blokkolás és rugalmasság elérhető maximumát",
			category_overview$best_food : "Jelezze ki a legideálisabb ételt",
			category_overview$overfeed_food : "Halványítsa el a túlgyógyító ételeket",
			category_overview$double_click_consume : "Engedélyezze a dupla kattintást a tárgyak felhasználásához",
			category_overview$daily_bonus_log : "Napi bónusz megjelenítése",
			category_overview$buffs_detailed_time : "Részletesebb idő mutatása az egyesületi bónuszoknál",
			category_overview$mercenaries_manager : "Mutassa a zsoldosok státuszait a fő karakter alatt",
			category_overview$mercenary_tooltip_show : "Mutassa a zsoldosok tekercseit a felszereléseik mellett",
			category_overview$more_statistics : "Mutasson több mindent a statisztikáim alatt alatt",
			category_overview$achivements_layout : "Eredményeim felületének javítása",
			category_overview$costumes_layout : "Kosztümök felületének javítása",
			category_overview$items_repair_overview : "Mutassa a javításhoz szükséges nyersanyagok ikonját",
			// Settings - Main menu
			category_main_menu$advance_main_menu : "Főmenü javítása",
			category_main_menu$submenu_click_to_change : "Almenü módosítása kattintással",
			category_main_menu$quest_timer : "A küldetések állapota vagy az időzítő megjelenítése",
			category_main_menu$centurio_powerups_timers : "Jelenítse meg a Centurió és a Megállapodások lejáratát a prémium gombnál",
			category_main_menu$forge_timers : "Mutassa a kovácsolás/olvasztás idejének mutatóját",
			category_main_menu$merchants_timer : "Kereskedők időzítőjének megjelenítése",	
			category_main_menu$menu_merge_merchants : "Minden kereskedő egyesítése egy menübpontba",
			category_main_menu$menu_merge_items : "A Kohó, Olvasztó, Műhely, Horreum és Magus egyesítése egy menüpontba",
			// Settings - Messages
			category_messages$messages_layout : "Üzenetek felületének javítása",
			category_messages$show_unread : "Emelje ki az olvasatlan üzeneteket",
			category_messages$separate_days : "Válassza szét naponként az üzeneteket",
			category_messages$more_guild_mate_info : "Mutasson több információt az egyesületi társaimról",
			category_messages$show_message_links : "Jelenítse meg a linkeket",
			category_messages$get_guild_battle_info : "Automatikusan töltse be az egyesületi háborúk eredményeit",
			category_messages$show_sidebar : "Oldalsáv mutatása",
			category_messages$fix_header_links : "Javítsa a hibát, amely az üzenetek tárgyában megjelenő linkeket érinti",
			category_messages$new_message_focus : "Fókuszáljon az üzenetek tartalmára",
			category_messages$new_message_friend_list : "Engedélyezze a barátlista ikonját üzenetírásnál",
			// Settings - Packages
			category_packages$filters_layout : "Szűrők felületének javítása",
			category_packages$compact_info_layout : "Tömörítse az információk elrendezését",
			category_packages$items_layout : "Tárgyak felületének javítása",
			category_packages$small_items_layout : "Kicsinyítse le a tárgyakat",
			category_packages$load_more_pages : "Több oldal betöltése",
			category_packages$pages_to_load : "Maximum oldalak számának betöltése",
			category_packages$item_price : "Mutassa a tárgyak értékét",
			category_packages$special_category_features : "Speciális funkciók engedélyezése kategóriánként\n•Mutassa, ha egy tekercs meg van/nincs megtanulva\n•Mutassa a tárgyaknál az elő/utótagot, ha az még nincs megtanulva",
			category_packages$double_click_open : "Dupla kattintás egy tárgya a behúzásához",
			category_packages$advance_filter : "Egy új, bővített keresési rendszer hozzáadása",
			category_packages$list_view_layout : "Csomagok listanézetként való megjelenítése",
			category_packages$pop_over_bag : "Táska megjelenítése görgetéskor",
			category_packages$packages_shortcuts : "Tárgykategória gyorsbillentyűk hozzáadása",
			// Settings - Pantheon
			category_pantheon$quests_reorder : "Feladatok csoportosításának engedélyezése",
			category_pantheon$quests_detailed_rewards : "Mutassa bővebben a feladatokért kapható jutalmakat",
			category_pantheon$missions_show_completed : "Rakja legfelülre a teljesítet küldetéseket",
			category_pantheon$gods_show_points_percent : "Mutassa az elérhető szívesség pontokat százalékban is az isteneknél",
			category_pantheon$open_many_mysteryboxes : "Több Isteni Végzet Ládájának kinyitása egyszerre",
			category_pantheon$show_mysterybox_rewards_rubies : "Mutassa az Isteni Végzet Ládájából kapott tárgy értékét rubinban",
			category_pantheon$show_mysterybox_rewards_owned : "Mutassa az Isteni Végzet Ládájából kapott tárgy darabszámát a raktárban",
			// Settings - Reports
			category_reports$style_change : "Csatajelentések felületének javítása",
			category_reports$load_loot_tooltips : "Jelenítse meg a különféle jutalmakat",
			category_reports$found_items : "Gyűjtsön adatokat a talált tárgyakról",
			category_reports$battle_analyzer : "Csatajelentések elemzése és az életstatisztika megjelenítése",
			// Settings - Training
			category_training$show_discount : "Mutassa a gyakorlás kedvezményét",
			category_training$show_basics_in_bars : "Mutassa az alapértékeket a sávokon",
			category_training$multiple_train : "Több érték egyidejű fejlesztésének engedélyezése",
			category_training$calculator_train : "Engedélyezze a gyakorlás kalkulátort",
			category_training$show_analyze_items_data : "Mutassa az értékek eloszlását",
			category_training$show_points_after_upgrade : "Mutassa a képességek értékét gyakorlás után",
			// Settings - Merchants
			category_merchants$fade_unaffordable_items : "Homályosítsa el a tárgyakat, amelyekre nincs elég aranyunk/rubinunk",
			category_merchants$ruby_icon_on_items : "Ikon hozzáadása azokhoz a tárgyakhoz amik rubinba kerülnek",
			category_merchants$show_shop_info : "Mutassa az oldal teljes árát (rubinban és aranyban)",
			category_merchants$double_click_actions : "Dupla kattintás egy tárgyra az eladáshoz/vásárláshoz",
			category_merchants$ruby_icon_on_items : "Rubint igénylő tárgyak ikonja",
			// Settings - Forge
			category_forge$material_links : "[Kovácsműhely/Munkaasztal] Mutassa a csomag/piac ikonokat a még szükséges anyagokhoz",
			category_forge$show_levels : "[Kovácsműhely] Mutassa az elő/utótag és az alap tárgy szintjét a neve mellett",
			category_forge$horreum_materials_names : "[Csűr] Mutassa a nyersanyagok nevét",
			category_forge$horreum_remember_options : "[Csűr] Emlékezzen a legutóbb használt tárolás beállítására",
			category_forge$horreum_select_meterials : "[Csűr] Nyersanyag kiválasztása kattintással",
			category_forge$double_click_select : "[Olvasztás/Javítás] Tárgy kiválasztása dupla kattintással",
			// Settings - Arena
			category_arena$ignore_attack_confirmations : "Hagyja figyelmen kívül a támadások megerősítését (5 támadás után)",
			category_arena$show_simulator_imagelink : "Mutasson egy linket a szimulátorhoz (simulator.dinodevs.com)",
			category_arena$sort_by_lvl : "Rendezze a provinciarum arénában lévő játékosokat szint szerint",
			category_arena$highlight_guild_members : "Emelje ki a csapattásaim nevét, akik más szerveren is játszanak",
			category_arena$target_list : "Célpontlista engedélyezése",
			category_arena$overhaul_tables : "A legjobb 5 és a személyes rangsor táblázatok szétválasztása és javítása",
			// Settings - Magus
			category_magus$fade_unimprovable_items : "Homályosítsa el a tárgyakat, amiket már nem lehet fejleszteni",
			// Settings - Market
			category_market$soulbound_warning : "Figyelmeztetés összetartozó lelkes tárgy vásárlásánál",
			category_market$one_gold_warning : "Figyelmeztetés 1 aranyba kerülő tárgy vásárlásánál",
			category_market$cancel_all_button : "Összes visszavétele gomb mutatása",
			category_market$remember_sell_duration : "Emlékezzen a legutóbb használt eladási időre",
			category_market$add_fees_button : "[+] gomb mutatása, amivel hozzáadhatjuk a piaci díjat az árhoz",
			category_market$sell_duration : "Eladási idő kiválasztása",
			category_market$one_gold_mode : "Mutassa az 1 aranyért eladás gombot",
			category_market$remember_sort : "Emlékezzen a legutóbb használt keresési sorrendre",
			category_market$double_click_select : "Tárgy kiválasztása dupla kattintással",
			category_market$sell_warning_icons : "Figyelmeztetés tárgy eladása előtt",
			category_market$sell_with_enter : "Tárgyak eladása ENTER ⏎ lenyomásával",
			category_market$add_fees_button : "[+] gomb megjelenítése, amely tartalmazza a díjakat az eladási árban",
			category_market$custom_prices : "Egyedi piaci árak, vesszővel elválasztva. Az ár százalékos értékének kiszámítása '%' hozzáadásával. (pl. '10000, 10.000, 200%')",
			// Settings - Expedition
			category_expedition$show_enemy_drops : "Mutassa a szerezhető nyersanyagokat ellenfelenként",
			category_expedition$underworld_layout : "Mutassa az alvilági ellenfelek elhelyezkedését úgy, mint az expedíción",
			// Settings - Guild
			category_guild$jail_layout : "Negotium X felületének javítása",
			category_guild$library_layout : "Könyvtár felületének javítása",
			category_guild$library_fade_non_scrolls : "Homályosítsa el azon tárgyakat a könyvtárban, amik nem receptek",
			category_guild$library_tooltip_data : "Több információ megjelenítése a könyvtárban",
			category_guild$bank_donate_layout : "Bank felületének javítása",
			category_guild$bank_book_layout : "Bank adományok könyvének javítása",
			category_guild$bank_book_show_changes : "Adományok megjelenítése a legutóbbi látogatás óta az adományok könyvénél",
			category_guild$medic_layout : "Villa Medici felületének javítása",
			// Settings - Auction
			category_auction$items_counters : "Talált és licitált tárgyak számának mutatása",
			category_auction$more_search_levels : "Mutasson több lehetőséget a szint szerinti keresésnél",
			category_auction$item_price_analyze : "Analizálja a tárgyak árát",
			category_auction$item_level : "Mutassa a tárgyak szintjét",
			category_auction$item_name : "Tárgyak nevének mutatása",
			category_auction$x3_items_per_line : "Rendezze a tárgyakat 3 oszlopba",
			category_auction$multi_bids : "Licitálás az oldal frissítése nélkül",
			category_auction$extra_item_stats : "További statisztikák megjelenítése a tárgyaknál",
			category_auction$save_last_state : "Legutóbb használt szűrő elmentése",
			// Settings - Accessibility
			category_accessibility$white_level_indicators : "Tárgy szintek jelzése fehér színnel",
			category_accessibility$qualty_symbols_indicators : "Tárgyak minőségét jelző szimbólumok mutatása",
			category_accessibility$tooltips_qualty_white : "Tárgyak nevének megjelenítése fehér színnel (tárgy információját mutató kis ablakban)",
			category_accessibility$tooltips_qualty_symbols : "Tárgyak minőgését jelző szimbólumok mutatása (tárgy információját mutató kis ablakban)",
			// Settings - Events
			category_events$craps_timer : "A kockadobás játék időzítőjének megjelenítése az oldal tetején",
			category_events$server_quest_timer : "Esemény időzítőjének megjelenítése az oldal tetején",
			// Settings - Sound
			category_sound$cooldown_sound_notifications : "Hangjelzések engedélyezése (expedíció, kazamata, aréna)",
			category_sound$muted : "Hangok némítása/visszahangosítása",
			category_sound$volume : "Hangerő",
			// Settings - Data
			category_data$export_settings : "Exportálja a beállítások adatait fájlba",
			category_data$import_settings : "Importálja a beállítások adatait fájlból",
			category_data$export_settings_to_notes : "Beállítások exportálása a feljegyzésekhez",
			category_data$import_settings_from_notes : "Beállítások importálása a feljegyzésekből",
			category_data$reset_settings : "Segédprogram beállításainak visszaállítása",
			category_data$clear_data : "A segédprogram adatainak törlése",
			category_data$clear_cache_data : "A segédprogram gyorsítótárának törlése",
			category_data$cross_browser_login : "A segédprogram szinkronizálása a különböző böngészők között",
			category_data$export_error_player_settings : "Exportálja a felhasználói hiba beállításainak adatait fájlba",

			// Buttons
			save : "Mentés",
			export : "Export",
			import : "Import",
			reset : "Visszaállít",
			clear : "Tisztít",
			do_not_show : "Ne mutassa",
			show_as : "Mutassa, mint",
			show_info : "Információk mutatása",
			each_category : "Futtassa a célkategórián",
			all_category : "Futtassa mindenhol",
			do_not_run : "Ne futtassa",
			default : "Alapértelmezett",

			// Info
			translated_percent : "Fordítás százaléka: {{number}}%",
			translated_by : "Fordítótta: {{string}}",
			reset_settings_confirm : "Biztos visszaállítod a segédprogram beállításait?",
			clear_data_confirm : "Biztos törlöd a segédprogram adatait?",
			data_exported_save_the_file : "Adatok exportálva. Mentse a fájlt.",
			missing_translations : "Hiányzó fordítás",

			// Notifications
			notification_reload : "Frissítsd az oldalt a változások aktiválásához",
		}
	}
}

gca_languages._active = "hu";
