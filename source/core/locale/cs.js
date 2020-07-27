/*
 * Gladiatus Crazy Addon Translation
 * Name : Czech
 * Code : [none]
 * Tag  : cs
 * Translator: Nekros, WiLLsTeiN, marekrich@seznam.cz, Alutom, bleakill.3607@gmail.com, Yenicheri, JAMES, Drnda3 [jpmaster38@gmail.com]
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages['cs'] = {
	name : 'čeština (Czech)',
	translators : ["Nekros", "WiLLsTeiN", "marekrich", "Alutom", "bleakill", "Yenicheri", "JAMES", "Drnda3"],
	locale : {
		info : {
			description : "Nejbláznivější add-on pro Gladiatus"
		},
		
		// General
		general : {
			days : "dny",
			minutes : "minut",
			hours : "Hod.",
			no_data : "Nejsou vyplněny žádné hodnoty",
			
			// Buttons
			confirm : "Potvrdit",
			cancel : "Zrušit",
			close : "Zavřít",
			error : "Chyba",
			yes : "Ano",
			no : "Ne",
			ok : "OK"
		},
		
		// Global
		global : {
			// Use a life potion
			life_potion_use : "Použít lektvar života",
			life_potion_used : "Byl použit lektvar života",
			life_potion_left : "Nyní máš {{number}} léčivých lektvar(ů)",
			
			// Life/Expedition/Dungeon points recovery
			life_recover_full : "Plné životy se doplní",
			expedition_recover_full : "Úplná obnova výprav",
			dungeon_recover_full : "Úplná obnova bodů bludiště",
			
			// Button bar - Message
			message_private_write : "Napsat soukromou zprávu",
			message_guild_write : "Napsat gildovní zprávu",
			message_send : "Odeslat",
			message_sent_success : "Gildovní zpráva byla odeslána",
			message_sent_failed : "Odesílání gildovní zprávy SELHALO",
			message_empty : "Gildovní zprávy jsou prázdné",
			message_exclude_me : "Vyloučit mne",
			
			// Button bar buttons
			guild_market_goto : "Gildovní tržiště",
			guild_storage_goto : "Skladiště",
			guild_bank_goto : "Banka",
			guild_warcamp_goto : "Síň mistra války",
			guild_arenareports_goto : "Zprávy z boje gildovních bitev",
			guild_jail_goto : "Negotium X",
			guild_library_goto : "Knihovna",
			guild_templum_goto : "Templum",
			guild_medic_goto : "Vila Medici",
			simulator_goto : "Simulátor",
			stats_display : "Ukaž mé staty",
			online_display : "Online hráči",
			
			// Online friends
			online_friends : "Online přátelé",
			guild_friends : "Gildovní přátelé",
			family_friends : "Přátelé z Familie",
			
			// Guild donate
			donate_gold_confirm : "Opravdu chcete darovat {{number}} zlato?",
			donate_gold_success : "Tvé zlato bylo darováno",
			donate_gold_failed : "Darování tvého zlata SELHALO",
			donate_gold_no_gold : "Nemáš žádné zlato",
			donate_gold_all_gold : "Darovat všechno zlato",
			
			// Quest timer
			quest_full : "Plné",
			quest_new : "Nové",
			
			// Pray icon
			pray_start : "Stiskněte pro začátek modlitby",
			pray_stop : "Stisknutím tlačítka se přestanete modlit",
			heal : "Léčit",
			
			// Notifications
			notification_guild_application : "Nová gildovní přihláška!",
			notification_guild_attack_ready : "Čekání na gildovní bitvu je u konce!",
			low_durability_items : "Existují {{number}} položky s trvanlivostí pod {{percent}}%",
			item_worth_rubies : "Předmět s hodnotou rubínů!",
			
			// Gold - Exp data
			gold_exp_data : "Zlato a Zkušenosti",
			gold_exp_data_today : "Posledních 24 hodin",
			gold_exp_data_week : "Posledních 7 dní",
			gold_exp_data_avg_day : "Průměrné denní hodnoty",
			gold_exp_data_to_level_up : "Počet zbývajících dnů do dalšího levelu",
			gold_exp_data_package_tax : "Týdenní daň za ukádání do zásilek",
			gold_exp_data_measurements : "Měření",
			gold_exp_data_total_exp : "Celková zkušenost",
			gold_exp_data_total_gold : "Celkem zlato",
			
			// Items
			merchenary_type : "Typ: {{name}} ({{number}})"
		},
		
		// Overview
		overview : {
			// Stats Difference
			stats_difference : "Rozdíl",
			// Drop items to see materials to repair feature
			drop_item_see_materials_repair : "Položte položku a zobrazte materiály potřebné k její opravě",
			workbench_6th_slot_empty : "6. slot prac. stolu musí být prázdný",
			
			// More player info
			more_player_info : "Více informací o hráči",
			can_use_max_item_level : "Může používat předměty až pro {{max}} level.",
			can_see_market_max_item_level : "Může vidět předměty na trhu až pro {{max}} level.",
			can_see_auction_item_levels : "Může vidět předměty v aukci od {{min}} do {{max}} levelu."
		},
		
		// Pantheon section
		pantheon : {
			mysterybox_open_all : "Otevřít vše",
			mysterybox_open_stop : "Stop",
			mysterybox_open_done : "Hotovo!"
		},
		
		// Guild section
		guild : {
			// Guild Bank
			bank_all_gold : "Zvolit všechno zlato",
			
			// Library
			library_per_point_cost : "Cena za bod schopnosti",
			library_gold_left : "Zůstatek zlata po aktivaci",
			
			// Medic
			medic_lost_points : "Ztracené body",
			medic_points_to_heal : "Body k vyléčení",
			medic_life_after_heal : "Životy po vyléčení"
		},
		
		// Expedition
		expedition : {
			material_drop_chance : "{{number}}% šance, mezi získanými materiály"
		},
		
		// Arena section
		arena : {
			global_arena_title : "Globální Aréna",
			global_arena_description : "Toto je ultimátní aréna,zde se shromažďují všichni gladiátoři z celého světa! V aréně,gladiátoři nebojují pro zlato či zkušenosti,bojují pro místo na seznamu v celosvětovém top žebříčku!",
			global_arena_load : "Načíst seznam nepřátel",
			global_highscore : "Globální Highscore",
			country : "Země",
			server : "Server",
			target_list : "Seznam cílů",
			target_list_add : "Přidat na seznam cílů",
			target_list_remove : "Odstranit ze seznamu cílů",
			error_sth_went_wrong : "Něco se pokazilo",
			error_response : "Server odpověděl chybou",
			error_blocked_access : "Něco blokuje připojení ke GCA serveru ({{url}})",
			error_connection : "Chyba připojení",
			attack_player : "Klikni pro útok “{{name}}”",
			fight_won : "Vyhrál jsi souboj!",
			fight_lost : "Prohrál jsi souboj...",
			player_tired : "Jsi unavený.Musíš si odpočinout.",
			player1_hits_player2 : "{{name1}} zasáhl {{name2}}",
			player_takes_x_damage :"{{name}} utržil {{number}} poškození",
			player_dies :"{{name}} zemřel"
		},
		
		// Training section
		training : {
			// Points analysis
			stats_points : "Body vlastností",
			points_breakdown : "Rozdělení bodů",
			stats_calculated_with_yourself_as_an_opponent : "* Vlastnosti jsou vypočítány pomocí konceptu napadání sebe sama",
			// Cost calculator
			total_cost : "Celková cena",
			// Discount show
			costs_discount : "Sleva na cvičení: {{number}}%"
		},
		
		// Auction section
		auction : {
			// Info
			items_info : "Informace o předmětech",
			// Number of items in the page
			number_of_items : "Počet předmětů : {{number}}",
			// Number of items that have been bidden in the page
			number_of_bided_items : "Počet nabídnutých předmětů : {{number}}",
			// Message on items that you can buy and sell at the same price
			hide_your_gold_here : "Zde můžeš uložit zlato",
			// Price of item equals to its value
			price_value_function : "Cena = Hodnota + {{number}}",
			// Levels you can see
			levels_you_can_see : "Vidíš předměty od úrovně {{min}} do úrovně {{max}}.",
			// Sort
			sort : "Třídit",
			sort_by : "Třídit podle",
			sort_order : "Řazení",
			asc : "Vzestupně",
			desc : "Sestupně"
		},
		
		// Markets section
		markets : {
			// Warnings
			item_cost_only_x_gold : "Tento předmět stojí jen {{number}} zlata",
			item_is_soulbound : "Předmět má duševní pouto",
			item_cant_buy_back : "Nebudeš moci koupit tento předmět zpět.",
			// Are you sure
			are_you_sure_you_want_to_buy : "Vážně chceš koupit tento předmět?",
			click_enter_to_sell : "Stisknutím enter ⏎ prodejte"
		},
		
		// Forge
		forge : {
			forge_ended : "Kování skončilo!",
			recraft_item : "Znovu vykovat předmět",
			show_hide_doll : "Zobrazit/Skrýt postavy hráče"
		},
		
				// Merchants
		merchants : {
			search_item_in_merchants : "Hledat předmět v obchodě",
			no_such_item : "Předmět nenalezen."
		},
		
		// Packages
		packages : {
			event_items : "Eventový předmět",
			known_scroll : "Tento svitek už znáš",
			unknown_scroll : "Tento svitek ještě neznáš",
			advance_filters : "Pokročilé filtry",
			advance_filters_apply : "Použít filtry",
			advance_filters_clear : "Smazat filtry",
			advance_filters_found : "(nalezeno {{items}})"		
		},
		
		// Report
		reports : {
			avg_damage : "Průměrné poškození",
			avg_heal : "Průměrné léčení",
			total_hits : "Celkem zásahů",
			hits : "Zásahy",
			dodge : "Úhyb či Blok",
			points : "Body"
		},
		
		// Cross-Browser Sync
		sync : {
			are_you_sure : "Jsi si jistý, že se chceš přihlásit jako {{name}}?",
			gladiatus_crazy_addon_dependency : "Musíš mít Gladiatus Crazy Addon nainstalovaný v dalším prohlížeči.",
			how_to_sync_info : "Zkopíruj adresu url a vlož jí do dalšího prohlížeče,nebo naskenuj QR kód."
		},

		// Settings
		settings : {
			// Settings
			settings : "Nastavení",
			// Description
			description : "Zapnout nebo vypnout vymoženosti addonu.",
			description_click_button : "Klikni na tlačítko k nastavení addonu",
			
			// Categories
			category_global : "Hlavní nastavení",
			category_overview : "Nastavení přehledu",
			category_messages : "Nastavení zpráv",
			category_packages : "Nastavení zásilek",
			category_pantheon : "Pantheon",
			category_reports : "Nastavení zpráv z boje",
			category_training : "Nastavení cvičiště",
			category_merchants : "Nastavení obchodníků",
			category_forge : "Kovárna",
			category_arena : "Aréna",
			category_magus : "Magus Hermeticus",
			category_market : "Tržiště",
			category_expedition : "Výprava",
			category_guild : "Nastavení gildy",
			category_auction : "Nastavení aukce",
			category_events : "Události",
			category_sound : "Zvuky",
			category_data : "Data",
			
			// Settings - Global
			category_global$language_select : "Změň jazyk addonu",
			category_global$sound_notifications : "Povolit zvukové upozornění na výpravy, bludiště a arény",
			category_global$browser_notifications : "Povolit upozornění v prohlížeči",
			category_global$extended_hp_xp_info : "Zobraz rozšířené informace o HP a XP na liště",
			category_global$extended_hp_xp_info_potion : "Zobraz ikonu léčivého lektvaru",
			category_global$hp_timer_for_full_life : "Zobraz čas do plného uzdravení",
			category_global$expedition_dungeon_points_recover_timer : "Zobrazit zbylé minuty do doplnění výprav/bludišťových bodů",
			category_global$shortcuts_bar : "Zobraz lištu",
			category_global$shortcuts_bar_buttons : "Vyber ikony do rychlého menu",
			category_global$auction_status_bar : "Zobrazit stav aukce",
			category_global$auction_status_notification : "Upozornit na změnu stavu aukce",
			category_global$top_fixed_bar : "Aktivovat horní rolující lištu",
			category_global$advance_main_menu : "Zlepšit hlavní menu",
			category_global$submenu_click_to_change : "Změna podmenu na kliknutí",
			category_global$remember_tabs : "Pamatovat záložky u obchodníků a v inventáři",
			category_global$attacked_timers : "Zobrazit časovače napadnutí",
			category_global$quest_timer : "Zobrazit stav úkolů nebo časovač",
			category_global$merchants_timer : "Zobrazit čas obchodníků",
			category_global$forge_timers : "Zobrazit časový indikátor kovárny/tavírny",
			category_global$cooldown_sound_notifications : "Povolit upozornění zvukem (na výpravy, bludiště, arénu)",
			category_global$notify_new_guild_application : "Upozorni mě na novou přihlášku do gildy",
			category_global$notify_new_guild_application_interval : "Kontrolovat gildovní příhlášky každých (minut)",
			category_global$notify_guild_attack_ready : "Upozorni mě na dobu čeká na gildovní bitvu",
			category_global$notify_guild_attack_ready_interval : "Zkontroluj dobu čekání na gildovní bitvu každých (minut)",
			category_global$x_scroll : "Povolit horizontální posuv",
			category_global$item_shadow : "Povolit stínování předmětů",
			category_global$inventory_options_group : "Skupinové nastavení inventáře",
			category_global$inventory_gold_info : "Zobrazit cenu předmětů v inventáři",
			category_global$pagination_layout : "Změnit rozvržení rámečků stránek",
			category_global$gold_exp_data : "Zobrazit data o zlatě a zkušenostech",
			category_global$pray_shorcut : "Zobrazovat v Podzemí ikonu modlení ",
			category_global$centurio_powerups_timers : "Zobrazit odpočet Centuriona & Paktů na tlačítku Prémium",
			category_global$show_durability : "Zobrazit životnost předmětu v levém dolním rohu",
			category_global$min_durability : "Upozornění pro předměty s životností+zdokonalení pod _% (posuň na 0 pro vypnutí)",
			category_global$show_forge_info : "Zobrazit suroviny předmětu v popisku",
			category_global$show_mercenaries_real_name : "Zobrazit reálná jména žoldáků (typ) v popiscích",
			category_global$global_arena_timer : "Zobrazit časovač Globální Arény",
			// Settings - Overview
			category_overview$analyze_items : "Analyzuj hráčovo předměty",
			category_overview$food_life_gain : "Zobrazit počet životů obdržený z jídla",
			category_overview$best_food : "Zvýraznit nejlepší jídlo",
			category_overview$overfeed_food : "Nechat zblednout jídlo, léčící více než je potřeba",
			category_overview$daily_bonus_log : "Denní přihlašovací bonus",
			category_overview$more_statistics : "Rozšířené zobrazení statů",
			category_overview$block_avoid_caps : "Zobrazit blok a předejít caps",
			category_overview$double_click_consume : "Dvojité kliknutí na předměty pro jejich konzumaci",
			category_overview$buffs_detailed_time : "Zobrazit podrobné časovače bonusů gildy",
			category_overview$mercenaries_manager : "Zobrazit manažera žoldáků",
			category_overview$mercenary_tooltip_show : "Zobrazit popisky žoldáků",
			category_overview$achivements_layout : "Vylepšit rozložení úspěchů",
			category_overview$costumes_layout : "Vylepšit rozložení kostýmů",
			category_overview$items_repair_overview : "Zobrazit potřebné-materiály-k-opravě box",
			// Settings - Messages
			category_messages$messages_layout : "Rozšířené zobrazení zpráv",
			category_messages$show_unread : "Zvýraznit nepřečtené zprávy",
			category_messages$separate_days : "Rozdělit zprávy z jiných dní",
			category_messages$send_message_box : "Povolit box pro posílání zpráv",
			category_messages$more_guild_mate_info : "Zobrazit více infa o spoluhráči gildy",
			category_messages$show_message_links : "Zobrazit odkazy ve zprávách",
			category_messages$get_guild_battle_info : "Automaticky načíst info z gildovní bitvy",
			category_messages$show_sidebar : "Zobrazit postranní panel zpráv",
			category_messages$fix_header_links : "Opravit chybu odkazu pro nadpis zpráv při kliknutí",
			category_messages$new_message_focus : "Okamžité psaní zprávy (ignorovat předmět)",
			category_messages$new_message_friend_list : "Zobrazit seznam přátel ve zprávách",
			// Settings - Packages
			category_packages$filters_layout : "Vylepšit rozložení filtrů",
			category_packages$compact_info_layout : "Udělat kompaktní rozložení informací",
			category_packages$items_layout : "Vylepšit rozložení předmětů",
			category_packages$small_items_layout : "Zmenšit velikost předmětů",
			category_packages$load_more_pages : "Načíst více stránek",
			category_packages$pages_to_load : "Maximum načtených stránek",
			category_packages$item_price : "Zobrazit cenu předmětů",
			category_packages$special_category_features : "Zapnout speciální funkce podle kategorie",
			category_packages$double_click_open : "Dvojité kliknutí na zásilky pro jejich otevření",
			category_packages$advance_filter : "Pokročilé filtry zásilek",
			// Settings - Pantheon
			category_pantheon$quests_reorder : "Povolit seskupování úkolů",
			category_pantheon$quests_detailed_rewards : "Zobrazit podrobné odměny z úkolu",
			category_pantheon$missions_show_completed : "Zobrazit dokončené mise",
			category_pantheon$gods_show_points_percent : "Zobrazit procenta bodů přízně",
			category_pantheon$open_many_mysteryboxes : "Otevřít vícero Truhel božího osudu",
			category_pantheon$show_mysterybox_rewards_rubies : "Zobrazit cenu odměn Truhly božího osudu v rubínech",
			category_pantheon$show_mysterybox_rewards_owned : "Zobrazit počet vlastněných Truhel božího osudu",
			// Settings - Reports
			category_reports$style_change : "Vylepšit rozložení zpráv z boje",
			category_reports$load_loot_tooltips : "Načíst odměny ve zprávách z boje",
			category_reports$found_items : "Sbírat data o nalezených předmětech",
			category_reports$battle_analyzer : "Analyzovat zprávu a zobrazit statistiky života",
			// Settings - Training
			category_training$show_discount : "Zobrazit slevu cvičení",
			category_training$show_basics_in_bars : "Zobrazit základy v barech",
			category_training$multiple_train : "Povolit více tréninků",
			category_training$calculator_train : "Zapnout kalkulačku nákladů",
			category_training$show_analyze_items_data : "Zobrazit analýzu předmětů v popisu předmětů",
			category_training$show_points_after_upgrade : "Zobrazit staty bodů po vylepšení",
			// Settings - Merchants
			category_merchants$fade_unaffordable_items : "Nechat vyblednout předměty,na které nemám peníze",
			category_merchants$show_shop_info : "Zobrazit info obchodu (celkové zlato a rubíny)",
			category_merchants$double_click_actions : "Dvojklik pro prodat/koupit",
			// Settings - Forge
			category_forge$material_links : "[Kovárna/Pracovní stůl] Zobrazit zkratky zásilek & tržiště pro každý potřebný materiál",
			category_forge$show_levels : "[Kovárna] Zobrazit základní level Prefixu/Sufixu/Základního předmětů vedle názvů",
			category_forge$horreum_materials_names : "[Stodola] Zobrazit název suroviny",
			category_forge$horreum_remember_options : "[Stodola] Zapamatovat si poslední nastavení pro uložení surovin",
			category_forge$horreum_select_meterials : "[Stodola] Zvolit surovinu kliknutím",
			// Settings - Arena
			category_arena$ignore_attack_confirmations : "Ignorovat potvrzení pro útoky (přes 5 útoků zpráva apd.)",
			category_arena$show_simulator_imagelink : "Zobrazovat obrázkový odkaz do simulátoru (simulator.dinodevs.com)",
			category_arena$sort_by_lvl : "Třídit hráče podle levelu",
			category_arena$highlight_guild_members : "Zvýraznit hráče na jiných serverech kteří můžou být členové gildy",
			category_arena$target_list : "Hráčovo seznam cílů",

			// Settings - Magus
			category_magus$fade_unimprovable_items : "Nechat vyblednout předměty, které nelze zdokonalit",
			// Settings - Market
			category_market$soulbound_warning : "Potvrzení při koupi předmětů s duševním poutem",
			category_market$one_gold_warning : "Potvrzení při koupi předmětů, které stojí 1 zlaťák",
			category_market$cancel_all_button : "Zobrazit tlačítko pro zrušení všeho",
			category_market$remember_sell_duration : "Zapamatovat poslední zvolenou dobu prodeje",
			category_market$sell_duration : "Zvol výchozí dobu prodeje",
			category_market$one_gold_mode : "Nastavit výchozí cenu předmětu na 1 zlaťák",
			category_market$remember_sort : "Zapamatovat poslední zvolené seřazení",
			category_market$double_click_select : "Vybrat předmět dvojitým klikem",
			category_market$sell_warning_icons : "Ikona varování při prodávání předmětů",
			category_market$sell_with_enter : "Prodávat předměty stisknutím klávesy ENTER ⏎",
			// Settings - Expedition
			category_expedition$show_enemy_drops : "Zobrazit materiály padající z nepřátel",
			category_expedition$underworld_layout : "Zobrazit nepřátele v podzemí stejně jako u výprav",
			// Settings - Guild
			category_guild$jail_layout : "Zlepšit zobrazení Negotia X",
			category_guild$library_layout : "Zlepšit zobrazení knihovny",
			category_guild$library_fade_non_scrolls : "Nechat vyblednout předměty,které nejsou svitky v knihovně",
			category_guild$library_tooltip_data : "Zobrazit více tipů v knihovně",
			category_guild$bank_donate_layout : "Zlepšit zobrazení banky",
			category_guild$bank_book_layout : "Zlepšit zobrazení bankovní knihy darů",
			category_guild$bank_book_show_changes : "Zobrazit změny v darech od poslední návštěvy příspěvků banky",
			category_guild$medic_layout : "Zlepšit zobrazení medika",
			// Settings - Auction
			category_auction$items_counters : "Zobraz počet předmětů",
			category_auction$more_search_levels : "Zobrazit více levelů v možnostech vyhledávání",
			category_auction$item_price_analyze : "Analyzovat ceny předmětů",
			category_auction$item_level : "Zobraz level itemu",
			category_auction$x3_items_per_line : "Zobrazení 3 itemů na řádek",
			category_auction$multi_bids : "Přihazovat na více předmětu před znovu načtením stránky",
			category_auction$extra_item_stats : "Zobrazit extra staty na obrázcích předmětů",
			category_auction$save_last_state : "Zapamatuje si hledání v aukcích a pokaždé jej načte",
			// Settings - Events
			category_events$craps_timer : "Zobrazit odpočet eventu kostek navrchu",
			category_events$server_quest_timer : "Zobrazit odpočet eventu/události navrchu",
			// Settings - Sound
			category_sound$enabled : "Povolit zvukový systém",
			category_sound$muted : "Ztlumit/Zrušit ztlumení",
			category_sound$volume : "Hlasitost zvuků",
			// Settings - Data
			category_data$export_settings : "Exportovat nastavení do souboru",
			category_data$import_settings : "Importovat nastavení ze souboru",
			category_data$reset_settings : "Resetovat nastavení addonu",
			category_data$clear_data : "Vymazat veškerá data addonu",
			category_data$clear_cache_data : "Vyčistit data v mezipaměti addonu",
			category_data$cross_browser_login : "Synchronizace přihlášení skrze prohlížeče",
			category_data$export_error_player_settings : "Export uživatelských dat nastavení do souboru",
			
			// Buttons
			save : "Uložit",
			export : "Export",
			import : "Import",
			reset : "Reset",
			clear : "Vyčistit",
			do_not_show : "Nezobrazovat",
			show_as : "Zobrazit jako",
			show_info : "Zobrazit informace",
			each_category : "Na vybrané kategorii",
			all_category : "Na vybrané kategorii & všechny",
			do_not_run : "Nikoliv",
			
			// Info
			translated_percent : "Přeloženo: {{number}}%",
			translated_by : "Přeložil: {{string}}",
			reset_settings_confirm : "Opravdu chcete obnovit nastavení aplikace Addon?",
			clear_data_confirm : "Opravdu chcete vymazat všechna data addonu?",
			data_exported_save_the_file : "Data byla exportována. Soubor uložen.",
			missing_translations : "Chybějící překlady",
			
			// Notifications
			notification_reload : "Znovu načtěte stránku pro provedení změn"
		}
	}
}

gca_languages._active = "cs";
