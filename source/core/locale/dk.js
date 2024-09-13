/*
 * Gladiatus Crazy Addon Translation
 * Name : Danish
 * Code : DK
 * Tag  : dk
 * Translator: SyntaxViking
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages["dk"] = {

	// Language name
	name : "Dansk (Danish)",
	// Translators (authors of this script)
	translators : ["SyntaxViking"],

	// Translations object
	locale : {
		// Addon info
		info : {
			description : "Det vildeste addon til Gladiatus nogensinde!"
		},

		// General
        general: {
            // Days
            days: "dag(e)",
            // Minutes
            minutes: "minutter",
            // Hours
            hours: "timer",
            // No data
            no_data: "Ingen data",
    
            // Buttons
            confirm: "Bekræft",
            cancel: "Annuller",
            close: "Luk",
            error: "Fejl",
            yes: "Ja",
            no: "Nej",
            ok: "OK"
		},

		// Global
		global: {
            // Use a life potion
            life_potion_use: "Brug en livsdrik",
            life_potion_used: "En livsdrik blev brugt",
            life_potion_left: "Du har nu {{number}} livsdrik(ke)",
        
            // Life/Expedition/Dungeon points recovery
            life_recover_full: "Fuld livs gendannelse",
            expedition_recover_full: "Fuld ekspeditions point gendannelse",
            dungeon_recover_full: "Fuld fangehuls point gendannelse",
            health_notification: "Dit liv er under",
        
            // Button bar - Message
            message_private_write: "Skriv privat besked",
            message_guild_write: "Skriv ordensbesked",
            message_send: "Send",
            message_sent_success: "Beskeden blev sendt med succes",
            message_sent_failed: "Kunne ikke sende beskeden",
            message_empty: "Beskeden er tom",
            message_exclude_me: "Ekskluder mig",
        
            // Welcome message - text
            welcome_addon: "Velkommen til Gladiatus Crazy Addon!",
            welcome_version: "Den aktuelt installerede version er",
            welcome_changelog: "Ændringslog",
        
            // Button bar buttons
            guild_market_goto: "Gå til ordens marked",
            guild_storage_goto: "Gå til ordens lager",
            guild_bank_goto: "Gå til ordens bank",
            guild_baths_goto: "Gå til ordens bade (Vox I)",
            guild_warcamp_goto: "Gå til ordens krigslejr",
            guild_arenareports_goto: "Gå til ordens arenakamp rapporter",
            guild_jail_goto: "Gå til ordens fængsel",
            guild_library_goto: "Gå til ordens bibliotek",
            guild_templum_goto: "Gå til ordens tempel",
            auction_food_goto: "Gå til madauktioner",
            guild_medic_goto: "Gå til ordens behandlingsrum",
            simulator_goto: "Gå til simulator",
            stats_display: "Vis mine statistikker",
            online_display: "Vis online spillere",
        
            // Online friends
            online_friends: "Online Venner",
            guild_friends: "Ordens Venner",
            family_friends: "Familie Venner",
        
            // Guild donate
            donate_gold_confirm: "Er du sikker på, at du vil donere {{number}} guld?",
            donate_gold_success: "Guld blev doneret med succes",
            donate_gold_failed: "Gulddonation mislykkedes",
            donate_gold_no_gold: "Der er ingen guld at donere",
            donate_gold_all_gold: "Doner alt dit guld",
        
            // Quest timer
            quest_full: "Fuld",
            quest_new: "Ny",
        
            // Pray icon
            pray_start: "Tryk for at starte bøn",
            pray_stop: "Tryk for at stoppe bøn",
            heal: "helbredelse",
        
            // Notifications
            notification_guild_application: "Der er en ventende ordensansøgning!",
            notification_guild_attack_ready: "Ordenens angreb nedkøling er ovre!",
            low_durability_items: "Der er {{number}} genstand(e) med holdbarhed under {{percent}}%",
            item_worth_rubies: "Den genstand er rubiner værd!",
        
            // Gold - Exp data
            gold_exp_data: "Guld og Erfaring Data",
            gold_exp_data_today: "Sidste 24 timer",
            gold_exp_data_week: "Sidste 7 dage",
            gold_exp_data_avg_day: "Gennemsnitlige værdier per dag",
            gold_exp_data_to_level_up: "Dage tilbage til niveau op",
            gold_exp_data_package_tax: "Ugentlig guld-til-pakke skat",
            gold_exp_data_measurements: "Målinger",
            gold_exp_data_total_exp: "Total erfaring",
            gold_exp_data_total_gold: "Total guld",
            gold_exp_data_reset: "Statistikker er blevet nulstillet!",
            gold_exp_data_desc: "Data indsamles hver 5. minut. Salg af varer, du har købt, vil fordoble dine guldindtægter.",
        
            // Items
            // Mercenaries
            mercenary_type: "Type: {{name}} ({{number}})",
            gains_with_full_stats: "Gevinster med fulde statistikker:",
            // Item materials
            base: "Base",
            prefix: "Præfix",
            suffix: "Suffiks"
		},

		// Overview
		overview: {
            // Stats Difference
            stats_difference: "Forskel",
            // Drop items to see materials to repair feature
            drop_item_see_materials_repair: "Smid en genstand for at se de materialer, der kræves for at reparere den",
            workbench_6th_slot_empty: "Arbejdsbordets 6. plads skal være tomt",
        
            // More player info
            more_player_info: "Mere spiller information",
            can_use_max_item_level: "Kan bruge genstande op til niveau {{max}}.",
            can_see_market_max_item_level: "Kan se genstande på markedet op til niveau {{max}}.",
            can_see_auction_item_levels: "Kan se genstande på auktionen fra niveau {{min}} til {{max}}."
        },
        
        // Pantheon section
        pantheon: {
            // Mystery box
            mysterybox_open_all: "Åbn alle",
            mysterybox_open_stop: "Stop",
            mysterybox_open_done: "Færdig!"
        },
        
        // Guild section
        guild: {
            // Guild Bank
            bank_all_gold: "Alt dit guld",
            total_donations: "Samlede donationer",
            min_upgrades_gold: "Guld brugt på opgraderinger (minimum)",
            max_stolen_gold: "Stjålet guld fra andre ordner (maksimum)",
        
            // Library
            library_per_point_cost: "Omkostninger per statpoint",
            library_gold_left: "Ordens guld efter aktivering",
        
            // Medic
            medic_lost_points: "Tabte point",
            medic_points_to_heal: "Point til at helbrede",
            medic_life_after_heal: "Liv efter helbredelse",
        
            // Baths
            pinned_message: "Fastgjort ordens besked",
            pin_unpin_message: "Fastgør/Fjern fastgørelse af denne besked",
            pinned_message_info: "Fastgjorte beskeder vises øverst i beskederne for alle ordens medlemmer, der bruger denne funktion",
            
            // Important ranks button
            important_ranks: "Vigtige rangeringer"
        },
        
        // Expedition
        expedition: {
            material_drop_chance: "{{number}}% chance, mellem faldne materialer"
        },
        
        // Arena section
        arena: {
            global_arena_title: "Global Arena",
            global_arena_description: "Dette er den ultimative arena, der samler gladiatorer fra hele verden! I denne arena kæmper gladiatorer ikke for guld eller erfaring, de kæmper for en plads på verdens topliste!",
            global_arena_load: "Vis global liste",
            global_highscore: "Global Topscore",
            country: "Land",
            server: "Server",
            target_list: "Angrebsliste",
            target_list_add: "Tilføj til angrebsliste",
            target_list_remove: "Fjern fra angrebsliste",
            error_sth_went_wrong: "Noget gik galt",
            error_response: "Serveren svarede med en fejl",
            error_blocked_access: "Noget blokerer adgangen til GCA-serveren ({{url}})",
            error_connection: "Forbindelsesfejl",
            attack_player: "Klik for at angribe “{{name}}”",
            fight_won: "Du vandt kampen!",
            fight_lost: "Du tabte kampen...",
            player_tired: "Du er træt; du skal vente.",
            player1_hits_player2: "{{name1}} rammer {{name2}}",
            player_takes_x_damage: "{{name}} tager {{number}} skade",
            player_dies: "{{name}} dør"
        },
        
        // Training section
        training: {
            // Points analysis
            stats_points: "Træningsstatistik",
            points_breakdown: "Fordeling af point",
            points_breakdown_damage: "Skade: +{{integer}} (+{{float}})",
            points_breakdown_block: "Blok: +{{integer}}% (+{{float}}%)",
            points_breakdown_block_max: "Blok: maksimal værdi",
            points_breakdown_block_short: "Blok: +{{integer}}%",
            points_breakdown_normal_hit: "Træfchance: +{{integer}}% (+{{float}}‰) *",
            points_breakdown_critical_hit: "Kritisk træfchance: +{{integer}}% (+{{float}}‰)",
            points_breakdown_critical_hit_short: "Kritisk træf: +{{integer}}%",
            points_breakdown_double_hit: "Dobbelt træfchance: +{{integer}}% (+{{float}}‰) *",
            points_breakdown_double_hit_factor: "Dobbelt træf faktor: {{number}}",
            points_breakdown_avoid_double_hit_factor: "Undgå dobbelt træf faktor: {{number}}",
            points_breakdown_avoid: "Undgå kritisk træfchance: +{{integer}}% (+{{float}}‰)",
            points_breakdown_avoid_max: "Undgå kritisk træfchance: maksimal værdi",
            points_breakdown_avoid_short: "Undgå kritisk træf: +{{integer}}%",
            points_breakdown_enemy_normal_hit: "Modstander træfchance: {{integer}}% ({{float}}‰) *",
            points_breakdown_enemy_double_hit: "Modstander dobbelt træfchance: {{integer}}% ({{float}}‰) *",
            points_breakdown_life: "Livspoint: +{{number}}",
            points_breakdown_regeneration: "Regeneration pr. time: +{{number}}",
            points_breakdown_threat: "Trussel: +{{integer}} (+{{float}})",
            points_breakdown_heal: "Helbredelse: +{{integer}} (+{{float}})",
            points_breakdown_critical_heal: "Kritisk helbredelse: +{{integer}}% (+{{float}}‰)",
            points_breakdown_critical_heal_max: "Kritisk helbredelse: maksimal værdi",
            stats_calculated_with_yourself_as_an_opponent: "* Statistikerne beregnes med konceptet om at angribe dig selv.",
            values_in_parenthesis_explanation: "Værdierne i parentes viser de tilsvarende værdier før afrunding.",
            // Cost calculator
            total_cost: "Samlede omkostninger",
            // Discount show
            costs_discount: "Træningsomkostninger rabat: {{number}}%",
            // CTRL Hint 
            ctrl_hint: "Tip: Hold CTRL-tasten nede for at øge/formindske med 10"
        },

		// Auction section
		auction: {
			// Info
			items_info: "Genstands oplysninger",
			// Number of items in the page
			number_of_items: "Antal genstande: {{number}}",
			// Number of items that have been bidden in the page
			number_of_bided_items: "Antal budte genstande: {{number}}",
			// Message on items that you can buy and sell at the same price
			hide_your_gold_here: "Skjul dit guld her",
			// Price of item equals to its value
			price_value_function: "Pris = Værdi + {{number}}",
			// Levels you can see
			levels_you_can_see: "Du kan se genstande fra niveau {{min}} til niveau {{max}}.",
			// Sort
			sort: "Sortér",
			sort_by: "Sortér efter",
			sort_order: "Rækkefølge",
			asc: "Stigende",
			desc: "Faldende"
		},
		
		// Markets section
		markets: {
			// Warnings
			item_cost_only_x_gold: "Denne genstand koster kun {{number}} guld.",
			item_is_soulbound: "Denne genstand er sjælebundet.",
			item_cant_buy_back: "Du vil ikke kunne købe denne genstand tilbage.",
			// Are you sure
			are_you_sure_you_want_to_buy: "Vil du virkelig købe denne genstand?",
			click_enter_to_sell: "tryk enter ⏎ for at sælge",
			// Tooltips
			add_fees_in_price: "Tilføj gebyrer til prisen",
		},
		
		// Forge
		forge: {
			forge_ended: "Smedjen er afsluttet!",
			recraft_item: "Omsmed genstand",
			show_hide_doll: "Vis/skjul spillerdukker",
			horreum_material_change: "Ændring af horreum-materialer",
			unknown_scrolls_share_code: "Min ukendte rullers delingskode",
			use_share_code: "Brug delingskode",
			use_share_code_description: "Indsæt en gladiators delingskode for at se, hvilke ruller de kender:",
			invalid_share_code: "Ugyldig delingskode",
		},
		
		// Merchants
		merchants: {
			search_item_in_merchants: "Søg genstand hos købmændene",
			no_such_item: "Ingen sådan genstand fundet."
		},
		
		// Packages
		packages: {
			event_items: "Eventgenstande",
			known_scroll: "Du kender denne rulle",
			unknown_scroll: "Du kender ikke denne rulle",
			advance_filters: "Avancerede filtre",
			advance_filters_apply: "Anvend filtre",
			advance_filters_clear: "Ryd filtre",
			advance_filters_found: "(fundet {{items}})"
		},
		
		// Report
		reports: {
			avg_damage: "Gennemsnitlig skade",
			avg_heal: "Gennemsnitlig helbredelse",
			total_hits: "Samlede træf",
			hits: "Træf",
			dodge: "Undvigelser eller blokeringer",
			points: "Point"
		},
		
		// Cross-Browser Sync
		sync: {
			are_you_sure: "Er du sikker på, at du vil logge ind som spilleren {{name}}?",
			gladiatus_crazy_addon_dependency: "Du skal have Gladiatus Crazy Addon installeret i den anden browser.",
			how_to_sync_info: "Kopier URL'en og indsæt den i den anden browser, eller scan QR-koden."
		},
		
		// Settings
		settings: {
			// Settings
			settings: "Indstillinger",
			// Description
			description: "Aktiver eller deaktiver addon'ets funktioner.",
			description_click_button: "Klik på knappen nedenfor for at gå til addon'ets indstillinger...",
		
			// Categories
			category_global: "Global",
			category_overview: "Oversigt",
			category_main_menu: "Hovedmenu",
			category_messages: "Beskeder",
			category_packages: "Pakker",
			category_pantheon: "Pantheon",
			category_reports: "Rapporter",
			category_training: "Træning",
			category_merchants: "Købmænd",
			category_forge: "Smedje",
			category_arena: "Arena",
			category_magus: "Magus",
			category_market: "Marked",
			category_expedition: "Ekspedition",
			category_guild: "Orden",
			category_auction: "Auktion",
			category_accessibility: "Tilgængelighed",
			category_events: "Begivenheder",
			category_sound: "Lyde",
			category_data: "Data",
		},

			// Settings - Global
			category_global$language_select: "Vælg addon'ets sprog",
			category_global$browser_notifications: "Aktivér notifikationer i browseren",
			category_global$extended_hp_xp_info: "Vis udvidet Helbred og Erfarings information",
			category_global$extended_hp_xp_info_potion: "Vis livseliksir ikon",
			category_global$hp_timer_for_full_life: "Vis minutter tilbage til fuld helbredelse",
			category_global$health_warning: "Send en advarsel, hvis dit helbred er under:",
			category_global$expedition_dungeon_points_recover_timer: "Vis tid, der kræves for fuld ekspedition og fangehul-point",
			category_global$shortcuts_bar: "Aktivér genvejsbjælke",
			category_global$shortcuts_bar_buttons: "Vælg genveje til genvejsbjælken",
			category_global$auction_status_bar: "Vis auktionens statusbjælke",
			category_global$auction_status_notification: "Advar, når auktionsstatus ændres",
			category_global$top_fixed_bar: "Aktivér fast topbjælke",
			category_global$remember_tabs: "Husk købmænds faner",
			category_global$attacked_timers: "Vis angrebstidsmålere",
			category_global$notify_new_guild_application: "Giv besked, når der er en ny ordensansøgning",
			category_global$check_guild_pinned_message: "Vis ordens fastgjorte beskeder fra Vox'en i beskeder",
			category_global$check_guild_application_pinned_messages_interval: "Tjek for orden-ansøgninger og fastgjorte beskeder hver (minutter)",
			category_global$notify_guild_attack_ready: "Giv mig besked, når nedkølingsperioden for ordens angreb er slut",
			category_global$notify_guild_attack_ready_interval: "Tjek nedkøling af ordens angreb hver (minutter)",
			category_global$x_scroll: "Aktivér Gladiatus' vandrette rullepanel",
			category_global$item_shadow: "Aktivér skygger på genstande",
			category_global$inventory_options_group: "Gruppér lagerindstillinger",
			category_global$inventory_gold_info: "Vis guldpris for lagergenstande",
			category_global$pagination_layout: "Ændr pakkesidens layout",
			category_global$gold_exp_data: "Vis guld- og erfaringsdata",
			category_global$pray_shorcut: "Vis bede-genvej i Underverdenen",
			category_global$show_durability: "Vis holdbarhed i genstandens nederste venstre hjørne",
			category_global$min_durability: "Notifikation for genstande med holdbarhed+tilstand under _% (flyt til 0 for at deaktivere det)",
			category_global$show_forge_info: "Vis smedje-materialer i værktøjstips",
			category_global$show_mercenaries_real_name_and_combat_stats: "Vis lejesoldaters rigtige navne (type) og kampstatistikker i værktøjstips",
			category_global$show_upgrade_values: "Vis buff-værdier på forstærkninger og opgraderinger",
			category_global$global_arena_timer: "Vis Global Arena timer",
			category_global$gladiatus_site_fixes: "Ret og forbedr Gladiatus' sidestilsproblemer",
			category_global$gca_custom_scrollbar: "Brug GCA brugerdefineret side rullepanel",
			category_global$lock_section_visibility: "Lås den aktuelle tilstand af skjulbare sektioner",
			category_global$hide_language_flags: "Skjul sprogflag under spillernavne",
			category_global$bar_hide_exp_btn: "Skjul Ekspeditionsknapper",
			category_global$bar_hide_dun_btn: "Skjul Fangehulsknapper",
			category_global$bar_hide_are_btn: "Skjul Arenaknapper",
			category_global$bar_hide_ct_btn: "Skjul Circus Turma-knapper",
			// Settings - Overview
			category_overview$analyze_items : "Analyser genstandes statistikker (nødvendigt for træning)",
			category_overview$food_life_gain : "Vis livshelbredelse fra madvarer",
			category_overview$block_avoid_caps : "Vis blok- og undgåelsesgrænser",
			category_overview$best_food : "Fremhæv den bedste mad",
			category_overview$overfeed_food : "Gør madvarer, der overhelbreder dig, gennemsigtige",
			category_overview$double_click_consume : "Dobbeltklik på genstande for at forbruge dem",
			category_overview$daily_bonus_log : "Log daglige bonusser",
			category_overview$buffs_detailed_time : "Vis detaljerede tidspunkter på ordens buffs",
			category_overview$mercenaries_manager : "Vis lejesoldatstyring",
			category_overview$mercenary_tooltip_show : "Vis lejesoldater-værktøjstip",
			category_overview$more_statistics : "Vis flere statistikker på statistik-fanen",
			category_overview$achivements_layout : "Forbedr præstationernes layout",
			category_overview$costumes_layout : "Forbedr kostumernes layout",
			category_overview$items_repair_overview : "Vis boks for nødvendige materialer til reparation",
			// Settings - Main menu
			category_main_menu$advance_main_menu : "Forbedr hovedmenuen",
			category_main_menu$submenu_click_to_change : "Undermenu skift ved klik",
			category_main_menu$menu_merge_merchants : "Sammenflet alle købmænd i ét menupunkt",
			category_main_menu$menu_merge_items : "Sammenflet Smedje, Smelteovn, Arbejdsbord, Horreum og Magus i ét menupunkt",
			category_main_menu$quest_timer : "Vis opgavers status eller timer",
			category_main_menu$centurio_powerups_timers : "Vis Centurio & PowerUps timere på Premium-knappen",
			category_main_menu$forge_timers : "Vis tid-indikator for smedning/smelte",
			category_main_menu$merchants_timer : "Vis købmænds tid-indikator",
			category_main_menu$menu_hide_citygate : "Skjul byportens menupunkt",
			// Settings - Messages
			category_messages$messages_layout : "Forbedr beskedernes layout",
			category_messages$show_unread : "Fremhæv ulæste beskeder",
			category_messages$separate_days : "Adskil beskeder fra forskellige dage",
			category_messages$more_guild_mate_info : "Vis mere info om ordens medlemmer",
			category_messages$show_message_links : "Vis links inkluderet i beskeder",
			category_messages$get_guild_battle_info : "Hent automatisk ordens kampresultater",
			category_messages$show_sidebar : "Vis beskeder sidebjælken",
			category_messages$fix_header_links : "Ret fejl ved klik på beskedens titellink",
			category_messages$new_message_focus : "Fokusér på beskedens tekstfelt",
			category_messages$new_message_friend_list : "Aktiver valg af ven fra liste-knap",
			// Settings - Packages
			category_packages$filters_layout : "Forbedr filtrenes layout",
			category_packages$small_items_layout : "Gør genstande små",
			category_packages$items_layout : "Forbedr genstandenes layout:",
			category_packages$compact_info_layout : "Gør informationslayoutet kompakt",
			category_packages$list_view_layout : "Vis pakker som listevisning",
			category_packages$load_more_pages : "Indlæs flere sider",
			category_packages$pages_to_load : "Antal sider, der skal indlæses",
			category_packages$item_price : "Vis genstandes pris",
			category_packages$special_category_features : "Aktivér særlige funktioner pr. kategori\n•Vis om ruller er kendte/ukendte\n•Vis ikon for ukendt præfix/suffiks på genstande",
			category_packages$double_click_open : "Dobbeltklik på pakker for at åbne dem",
			category_packages$advance_filter : "Avancerede pakke-filtre",
			category_packages$pop_over_bag : "Hold tasken åben ved nedrulning",
			category_packages$packages_shortcuts : "Tilføj genveje til varekategorier",
			// Settings - Pantheon
			category_pantheon$quests_reorder : "Aktivér gruppering af opgaver",
			category_pantheon$quests_detailed_rewards : "Vis detaljerede belønninger for opgaver",
			category_pantheon$missions_show_completed : "Vis afsluttede missioner",
			category_pantheon$gods_show_points_percent : "Vis gudepoint i procent",
			category_pantheon$open_many_mysteryboxes : "Åbn flere skattekister",
			category_pantheon$show_mysterybox_rewards_rubies : "Vis skattekiste-belønnings værdi i rubiner",
			category_pantheon$show_mysterybox_rewards_owned : "Vis antal ejede skattekiste-belønninger",
			// Settings - Reports
			category_reports$style_change : "Forbedr rapporternes liste-layout",
			category_reports$load_loot_tooltips : "Indlæs belønning for hver rapport",
			category_reports$found_items : "Indsaml data om fundne genstande",
			category_reports$battle_analyzer : "Analyser rapport og vis livstatistik",
			// Settings - Training
			category_training$show_discount : "Vis træningsrabat",
			category_training$show_basics_in_bars : "Vis det grundlæggende i barer",
			category_training$multiple_train : "Gør det muligt at træne flere ting",
			category_training$calculator_train : "Aktivér udgiftsberegner",
			category_training$show_analyze_items_data : "Vis analyserede genstandes data i værktøjstip",
			category_training$show_points_after_upgrade : "Vis fanen med trænings indvirkning på dine kampstatistikker",
			// Settings - Merchants
			category_merchants$fade_unaffordable_items : "Gør genstande, du ikke har råd til, gennemsigtige",
			category_merchants$ruby_icon_on_items : "Tilføj ikon på genstande, der koster rubiner",
			category_merchants$show_shop_info : "Vis butiksinfo (samlet guld og rubiner)",
			category_merchants$double_click_actions : "Dobbeltklik på genstande for at sælge/købe",
			category_merchants$alt_click_actions : "(HOLD) Alt + Klik for at sælge/købe genstande",
			category_merchants$hide_prices : "Skjul svævende priser, når du sælger/køber",
			// Settings - Forge
			category_forge$material_links : "[Smedje/Reparation] Vis pakke- & markedsgenveje for hvert nødvendigt materiale",
			category_forge$show_levels : "[Smedje] Vis præfix/suffiks/basis vare-niveauer ved siden af navne",
			category_forge$horreum_materials_names : "[Horreum] Vis materialets navn",
			category_forge$horreum_remember_options : "[Horreum] Husk sidste valgte lagerindstillinger",
			category_forge$horreum_select_meterials : "[Horreum] Vælg materiale ved klik",
			category_forge$double_click_select : "[Smelt/Reparation] Vælg genstand ved dobbeltklik",
			category_forge$forge_notepad : "Tilføj et ekstra note felt",
			// Settings - Arena
			category_arena$ignore_attack_confirmations : "Ignorer angrebsbekræftelser (over 5 angreb besked osv.)",
			category_arena$show_simulator_imagelink : "Vis et billede-link til simulatoren (simulator.dinodevs.com)",
			category_arena$sort_by_lvl : "Sorter spillere i arena efter niveau",
			category_arena$highlight_guild_members : "Fremhæv spillere på andre servere, der kan være ordens medlemmer",
			category_arena$target_list : "Spiller angrebsliste",
			category_arena$overhaul_tables : "Adskil og forbedr de bedste 5 og personlige rangeringstabeller",
			// Settings - Magus
			category_magus$fade_unimprovable_items : "Gør genstande, du ikke kan forbedre, gennemsigtige",
			// Settings - Market
			category_market$soulbound_warning : "Bekræftelse ved køb af sjælebundne genstande",
			category_market$one_gold_warning : "Bekræftelse ved køb af genstande til 1 guld",
			category_market$cancel_all_button : "Vis annuller-alle knap",
			category_market$remember_sell_duration : "Husk sidste valgte salgsvarighed",
			category_market$add_fees_button : "Vis [+] knap der inkluderer gebyrer i salgsprisen",
			category_market$sell_duration : "Vælg standard salgsvarighed",
			category_market$one_gold_mode : "Tilføj knapper for genstandspriser (inkluderer brugerdefinerede priser)",
			category_market$custom_prices : "Brugerdefinerede markedspriser, adskilt med kommaer. Beregn baseret på procentdel af genstandens pris ved at tilføje en '%'. (f.eks., '10000, 10.000, 200%')",
			category_market$remember_sort : "Husk sidste sorteringsrækkefølge",
			category_market$double_click_select : "Vælg genstand ved dobbeltklik",
			category_market$sell_warning_icons : "Advarselsikon når du sælger genstande",
			category_market$sell_with_enter : "Sælg genstande ved at trykke på ENTER ⏎",
			// Settings - Expedition
			category_expedition$show_enemy_drops : "Vis materialer som fjender dropper",
			category_expedition$underworld_layout : "Vis underverdens fjenders layout som ekspeditionens",
			// Settings - Guild
			category_guild$jail_layout : "Forbedr fangekælderens layout",
			category_guild$library_layout : "Forbedr bibliotekets layout",
			category_guild$library_fade_non_scrolls : "Gør genstande utydelige i biblioteket der ikke er ruller",
			category_guild$library_tooltip_data : "Tilføj flere oplysninger i bibliotekets værktøjstips",
			category_guild$bank_donate_layout : "Forbedr bankens donationslayout",
			category_guild$bank_book_layout : "Forbedr bankens boglayout",
			category_guild$bank_book_show_changes : "Vis ændringer i donation siden sidste besøg i bankbogen",
			category_guild$medic_layout : "Forbedr behandlingsrummets layout",
			// Settings - Auction
			category_auction$items_counters : "Tæl genstande og budte genstande",
			category_auction$more_search_levels : "Vis flere niveauer i søgemuligheder",
			category_auction$item_price_analyze : "Analyser genstandenes priser",
			category_auction$item_level : "Vis genstandenes niveau",
			category_auction$item_name : "Vis genstandenes navn",
			category_auction$x3_items_per_line : "Skift layout til 3 genstande pr. linje",
			category_auction$multi_bids : "Byd på mange genstande uden sideopdatering",
			category_auction$extra_item_stats : "Vis ekstra statistik på genstandsbilleder",
			category_auction$save_last_state : "Implementer auktion søgnings husker der gemmer søgning og indlæser den som standard",
			// Settings - Accessibility
			category_accessibility$white_level_indicators : "Skift niveauindikatorerne på genstande til hvid",
			category_accessibility$qualty_symbols_indicators : "Tilføj kvalitets symboler på genstande",
			category_accessibility$tooltips_qualty_white : "Skift genstandstitel i værktøjstips til hvid",
			category_accessibility$tooltips_qualty_symbols : "Tilføj kvalitetssymboler i værktøjstips",
			// Settings - Events
			category_events$craps_timer : "Vis terninge-begivenhedens timer øverst",
			category_events$server_quest_timer : "Vis server-opgaver eller lokalitets-begivenhedens timer øverst",
			// Settings - Sound
			category_sound$cooldown_sound_notifications : "Aktiver lydnotifikationer for nedkølinger (ekspedition, fangehul, arena)",
			category_sound$muted : "Slå lyde fra/til",
			category_sound$volume : "Lydstyrke",
			// Settings - Data
			category_data$export_settings : "Eksporter indstillinger til fil",
			category_data$import_settings : "Importer indstillinger fra fil",
			category_data$export_settings_to_notes : "Eksporter indstillinger til noter",
			category_data$import_settings_from_notes : "Importer indstillinger fra noter",
			category_data$reset_settings : "Nulstil addon'ets indstillinger",
			category_data$clear_data : "Slet alle addon'ets data",
			category_data$clear_cache_data : "Slet addon'ets midlertidige data (cache)",
			category_data$cross_browser_login : "Synkroniser login på tværs af browsere",
			category_data$export_error_player_settings : "Eksporter ukendte-bruger data til fil", // TODO: This may be removed on the future

			// Buttons
			save : "Gem",
			export : "Eksportér",
			import : "Importér",
			reset : "Nulstil",
			clear : "Ryd",
			do_not_show : "Vis ikke",
			show_as : "Vis som",
			show_info : "Vis information",
			each_category : "Kør på mål-kategori",
			all_category : "Kør på mål-kategori & alle",
			do_not_run : "Kør ikke",
			default: "Standard",
			highlight: "Fremhæv",

			// Info
			translated_percent : "Oversat procent: {{number}}%",
			translated_by : "Oversat af: {{string}}",
			reset_settings_confirm : "Er du sikker på, at du vil nulstille addon'ets indstillinger?",
			clear_data_confirm : "Er du sikker på, at du vil rydde alle addon'ets data?",
			data_exported_save_the_file : "Data blev eksporteret. Gem filen.",
			missing_translations : "Manglende oversættelser",

			// Notifications
			notification_reload : "Genindlæs siden for at ændringerne træder i kraft",
	}
}

gca_languages._active = "dk";