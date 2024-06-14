/*
 * Gladiatus Crazy Addon Translation
 * Name : Slovak
 * Code : [none]
 * Tag  : sk
 * Translator: TraiaN, Maximus, VolFinKo
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages['sk'] = {
	name : 'Slovenský (Slovak)',
	translators : ["TraiaN", "Maximus", "VolFinKo"],
	locale : {
		info : {
			description : "Gladiatus Crazy Addon!"
		},
		general : {
			days : "dní",
			minutes : "minút",
			hours : "hodiny",
			no_data : "Žiadne dáta",

			// Buttons
			confirm : "Potvrdiť",
			cancel : "Zrušiť",
			close : "Ukončiť",
			error : "Chyba",
			yes : "Ano",
			no : "Nie",
			ok : "OK"
		},
		global : {
			// Use a life potion
			life_potion_use : "Použiť nápoj zdravia",
			life_potion_used : "Bol použitý nápoj zdravia",
			life_potion_left : "Môžte ešte použiť {{number}} nápoj(e,ov) zdravia",

			// Life/Expedition/Dungeon points recovery
			life_recover_full : "Plná obnova života za",
			expedition_recover_full : "Plne obnovenie expedicnych bodov",
			dungeon_recover_full : "Plne obnovenie zalarovych bodov",

			// Button bar - Message
			message_private_write : "Napísať súkromnú správu",
			message_guild_write : "Napísať spolkovú správu",
			message_send : "Odoslať",
			message_sent_success : "Spolková správa bola odoslaná",
			message_sent_failed : "Odoslanie spolkovej správy zlyhalo",
			message_empty : "Spolkové správa je prázdna",
			message_exclude_me : "Vynechať ma",
			
			// Button bar buttons
			guild_market_goto : "Spolok - Trh",
			guild_storage_goto : "Spolok - Sklad",
			guild_bank_goto : "Spolok - Banka",
			guild_baths_goto : "Chod do kupelov (Vox I)",
			guild_warcamp_goto : "Spolok - Sídlo Domínia",
			guild_arenareports_goto : "Prejdi do reportov subojov spolku",
			guild_jail_goto : "Spolok - Negotium X",
			guild_library_goto : "Spolok - Knižnica",
			guild_templum_goto : "Prejdi do spolkoveho templum",
			auction_food_goto : "Prejdi na aukcie jedla",
			guild_medic_goto : "Spolok - Villa Medici",
			simulator_goto : "Simulátor boja",
			stats_display : "Zobraziť moje štatistiky",
			online_display : "Zobraziť online hráčov",

			// Online friends
			online_friends : "Online Priatelia",
			guild_friends : "Spolok",
			family_friends : "Rodina",

			// Guild donate
			donate_gold_confirm : "Naozaj chcete darovať {{number}} zlata?",
			donate_gold_success : "Tvoje zlato bolo darované",
			donate_gold_failed : "Darovanie tvojho zlata zlyhalo",
			donate_gold_no_gold : "Nie je zlato na darovanie",
			donate_gold_all_gold : "Spolok - Vložiť všetko zlato",
			
			// Quest timer
			quest_full : "Plný",
			quest_new : "Úloha",
			
			// Pray icon
			pray_start : "Stlačením tlačidla - začať modlenie",
			pray_stop : "Stlačením tlačidla - ukončiť modlenie",
			heal : "liečiť",
			
			// Notifications
			notification_guild_application : "Nová žiadosť do spolku!",
			notification_guild_attack_ready : "Casove obmedzenie na spolkovy utok vyprsalo!",
			low_durability_items : "{{number}} predmet(y,ov) s opotrebením pod {{percent}}%",
			item_worth_rubies : "Ten predmet je bezcenny",
			
			// Gold - Exp data
			gold_exp_data : "Zlato a Skúsenosti - Údaje",
			gold_exp_data_today : "za 24 hodín",
			gold_exp_data_week : "za 7 dní",
			gold_exp_data_avg_day : "Priemerné hodnoty za deň",
			gold_exp_data_to_level_up : "Nová úroveň za x/dní",
			gold_exp_data_package_tax : "Uložené zlato do balíkov za týždeň",
			gold_exp_data_measurements : "Meranie",
			gold_exp_data_total_exp : "Všetky skúsenosti",
			gold_exp_data_total_gold : "Všetko zlato",
			gold_exp_data_reset : "Statistiky vynulovane",
			gold_exp_data_desc : "Data su zbierane kazdych 5 minut. Predavanie itemov ktore si kupil ti zdvojnasobi zisk",
			
			// Items
			// Mercenaries
			mercenary_type : "Typ: {{meno}} ({{cislo}})",
			gains_with_full_stats : "Zisky s plnymi statmi:",
			// Item materials
			base : "Zakladna",
			prefix : "Pred menom",
			suffix : "Za menom"
		},
		overview : {
			// Stats Difference
			stats_difference : "Rozdiel",
			// Drop items to see materials to repair feature
			drop_item_see_materials_repair : "Presun predmetu k zobrazeniu potrebných surovín na jeho opravu",
			workbench_6th_slot_empty : "6 slot v opravovni musí byť prázdny",

			// More player info
			more_player_info : "Viac udajov o hracovi",
			can_use_max_item_level : "Moze pouzivat predmety do {{max}} urovne.",
			can_see_market_max_item_level : "Moze vidiet predmety do {{max}} urovne.",
			can_see_auction_item_levels : "Moze vidiet predmety na aukcii od {{min}} do {{max}} urovne."
		},
		pantheon : {
			// Mystery box
			mysterybox_open_all : "Otvoriť všetky",
			mysterybox_open_stop : "Stop",
			mysterybox_open_done : "Hotovo!"
		},
		guild : {
			// Guild Bank
			bank_all_gold : "Vložiť všetko zlato",
			total_donations : "Prispevky dokopy",
			min_upgrades_gold : "Zlato pouzite na vylepsenia (minimum)",
			max_stolen_gold : "Ukradnute zlato od inych spolkov (maximum)",
			
			// Library
			library_per_point_cost : "Cena za skúsenostný bod",
			library_gold_left : "Spolkové zlato na aktiváciu",

			// Medic
			medic_lost_points : "Stratené body života",
			medic_points_to_heal : "Body na vyliečenie",
			medic_life_after_heal : "Body života po liečení",

			// Baths
			pinned_message : "Pripnuta spolkova sprava",
			pin_unpin_message : "Pripni/zmaz tuto spravu",
			pinned_message_info : "Pripnute spravy su zobrazene na vrchu sprav pre vsetkych clenov spolku pouzitim tejto funkcie",

			// Important ranks button
			important_ranks : "Dolezite rebricky"
		},
		expedition : {
			material_drop_chance : "{{number}}% šanca na nájdenie suroviny"
		},
		training : {
			// Points analysis
			stats_points : "Vedomostné body",
			points_breakdown : "Body - Výpočet",
			points_breakdown_damage : "Utrpel: +{{integer}} (+{{float}})",
			points_breakdown_block : "Zablokovane: +{{integer}}% (+{{float}}%)",
			points_breakdown_block_max : "Zablokovane: maximálna hodnota",
			points_breakdown_block_short : "Zablokovane: +{{integer}}%",
			points_breakdown_normal_hit : "Sanca na uder: +{{integer}}% (+{{float}}‰) *",
			points_breakdown_critical_hit : "Sanca na kriticky uder: +{{integer}}% (+{{float}}‰)",
			points_breakdown_critical_hit_short : "Kriticky uder: +{{integer}}%",
			points_breakdown_double_hit : "Sanca na dvojity uder: +{{integer}}% (+{{float}}‰) *",
			points_breakdown_double_hit_factor : "Faktor dvojiteho uderu: {{number}}",
			points_breakdown_avoid_double_hit_factor : "Vyhnut sa faktoru dvojiteho uderu: {{number}}",
			points_breakdown_avoid : "Vyhnut sa sanci na kriticky uder: +{{integer}}% (+{{float}}‰)",
			points_breakdown_avoid_max : "Vyhnut sa sanci na kriticky uder: maximálna hodnota",
			points_breakdown_avoid_short : "Vyhnut sa kritickemu uderu: +{{integer}}%",
			points_breakdown_enemy_normal_hit : "Superova sanca na zasiahnutie: {{integer}}% ({{float}}‰) *",
			points_breakdown_enemy_double_hit : "Superova sanca na dvojity uder: {{integer}}% ({{float}}‰) ",
			points_breakdown_life : "Body zivota: +{{number}}",
			points_breakdown_regeneration : "Regeneracia za hodinu: +{{number}}",
			points_breakdown_threat : "Ohrozenie: +{{integer}} (+{{float}})",
			points_breakdown_heal : "Liecenie: +{{integer}} (+{{float}})",
			points_breakdown_critical_heal : "Kriticke liecenie: +{{integer}}% (+{{float}}‰)",
			points_breakdown_critical_heal_max : "Kriticke liecenie: maximálna hodnota",
			stats_calculated_with_yourself_as_an_opponent : "* Štatistiky sú počítané pri útoku sám na seba.",

			// Cost calculator
			total_cost : "Celková cena",
			// Discount show
			costs_discount : "Zľava na tréning: {{number}}%",

		},
		auction : {
			items_info : "Informácie o predmetoch",
			number_of_items : "Počet predmetov : {{number}}",
			number_of_bided_items : "Počet aktívnych ponúk : {{number}}",
			hide_your_gold_here : "Vložiť zlato",
			price_value_function : "Cena = Hodnota + {{number}}",
			levels_you_can_see : "Môžete vydieť predmety od úrovne {{min}} do úrovne {{max}}.",
			// Sort
			sort : "Zoradit",
			sort_by : "Zoradit podla",
			sort_order : "Poradia",
			asc : "Vzostupne",
			desc : "Zostupne"
		},
		markets : {
			// Warnings
			item_cost_only_x_gold : "Tento predmet stojí len {{number}} zlata.",
			item_is_soulbound : "Tento predmet je zviazaný s hráčom.",
			item_cant_buy_back : "Nebudes moct kupit tento predmet spät.",
			// Are you sure
			are_you_sure_you_want_to_buy : "Naozaj chcete tento predmet kúpiť?",
			click_enter_to_sell : "Stlac enter pre predanie",
			// Tooltips
			add_fees_in_price : "Pridane poplatky v cene"
		},
		forge : {
			forge_ended : "Kovanie ukončené!",
			recraft_item : "Znovu vytvoriť predmet",
			show_hide_doll : "Zobrazit/skryt dolls",
			horreum_material_change : "Horreum materialy na vymenu"
		},
		packages : {
			event_items : "Eventové predmety",
			known_scroll : "Tento návod už ovládaš",
			unknown_scroll : "Tento návod ešte neovládaš",
			advance_filters : "Rozsirenie filtrovanie",
			advance_filters_apply : "Potvrd filtrovanie",
			advance_filters_clear : "Zmaz filtrovanie",
			advance_filters_found : "(najdene {{items}})"
		},
		settings : {
			settings : "Nastavenie",
			// Description
			description : "Povolením alebo zakázaním položiek nastavte addon podľa seba!",
			description_click_button : "Kliknutím na tlačítko prejsť k nastaveniu addonu...",

			// Categories
			category_global : "Hlavné nastavenia",
			category_overview : "Prehľad",
			category_messages : "Správy",
			category_packages : "Balíky",
			category_pantheon : "Pantheón",
			category_reports : "Správy z boja",
			category_training : "Cvičisko",
			category_merchants : "Obchodníci",
			category_forge : "Vyhňa",
			category_arena : "Aréna",
			category_magus : "Veľký mág",
			category_market : "Trh",
			category_expedition : "Expedície",
			category_guild : "Spolok",
			category_auction : "Aukčná budova",
			category_accessibility : "Pristupnost",
			category_events : "Eventy",
			category_sound : "Zvuk",
			category_sound$cooldown_sound_notifications : "Zvukové oznámenie (expedícia, žalár, aréna)",
			category_data : "Údaje",
			
			// Settings - Global
			category_global$language_select : "Jazyk addonu",
			category_global$browser_notifications : "Upozornenia prehliadača",
			category_global$extended_hp_xp_info : "Rozšírené informácie o HP a XP na hlavnej lište",
			category_global$extended_hp_xp_info_potion : "Ikona Nápoj zdravia",
			category_global$hp_timer_for_full_life : "Zobraziť minúty do úplnej obnovy zdravia",

			category_global$expedition_dungeon_points_recover_timer : "Zobraz minuty ktore chybaju do obnovy expedicnych/zalarovych bodov",
			category_global$shortcuts_bar : "Hlavná lišta",
			category_global$shortcuts_bar_buttons : "Vyberte odkazy pre panel odkazov",
			category_global$auction_status_bar : "Informačná lišta aukcie",
			category_global$auction_status_notification : "Upozornenie na zmenu stavu aukcie",
			category_global$top_fixed_bar : "Horná rolovacia lišta",
			category_global$remember_tabs : "Pamätať si záložky v inventári a v obchode",
			category_global$attacked_timers : "Časovač útokov",
			category_global$notify_new_guild_application : "Informovať ma o novej žiadosti vstupu do spolku",
			category_global$check_guild_pinned_message : "Zobraz pripnute spolkove spravy z kupelov",
			category_global$check_guild_application_pinned_messages_interval : "Skontroluj spolkove aktivity a pripnute spravy kazdych (minutes)",
			category_global$notify_guild_attack_ready : "Upozorni ma, ked vyprsi odpocet na novy spolkovy utok",
			category_global$notify_guild_attack_ready_interval : "Skontroluj odpocet na spolkovy utok kazdych (minutes)",
			category_global$x_scroll : "Povoliť horizontálne rolovanie Gladiatus",
			category_global$item_shadow : "Tieňovanie predmetov",
			category_global$inventory_options_group : "Zoskupiť nastavenia inventára",
			category_global$inventory_gold_info : "Hodnota predmetov v inventári",
			category_global$pagination_layout : "Zmena rozhrania políčok inventára",
			category_global$gold_exp_data : "Údaje Zlato a Skúsenosti",
			category_global$pray_shorcut : "Čas pobytu v Podsvetí",
			category_global$show_durability : "Opotrebenie v ľavom dolnom rohu predmetu",
			category_global$min_durability : "Informovať o predmetoch s opotrebením pod _% (deaktivácia, presun na 0)",
			category_global$show_forge_info : "Zobraz materialy pre item na nastrojovej liste",
			category_global$show_mercenaries_real_name_and_combat_stats : "Zobraz realne mena otrokov (type) a statistiky z utoku na nastrojovej liste",
			category_global$show_upgrade_values : "Zobraz zvysene hodnoty na posilneniach & vylepseniach",
			category_global$global_arena_timer : "Zobraz casovac Globalnej areny",
			category_global$gladiatus_site_fixes : "Oprav a vylepsi chyby stranky Gladiatus",
			category_global$lock_section_visibility : "Uzamkni aktualny stav skryvatelnych sekcii",
			category_global$hide_language_flags : "Skry jazykove vlajky pod hracovymi menami",
			// Settings - Overview
			category_overview$analyze_items : "Analýza stavu predmetu (potrebné pre tréning)",
			category_overview$food_life_gain : "Zobraziť prírastok života z jedla",
			category_overview$block_avoid_caps : "Zobraziť Blokovanie a Odolnosť",
			category_overview$best_food : "Zvýrazniť najlepšie jedlo",
			category_overview$overfeed_food : "Stmaviť jedlo z nadmerným liečením",
			category_overview$double_click_consume : "Dvojity klik pre skonzumovanie predmetu",
			category_overview$daily_bonus_log : "Zaznamenať denný bonus",
			category_overview$buffs_detailed_time : "Podrobné časovače pre spolkové bonusy",
			category_overview$mercenaries_manager : "Správca otrokov",
			category_overview$mercenary_tooltip_show : "Zobraziť u otrokov popisy",
			category_overview$more_statistics : "Rozšírené zobrazenie vlastností hráča",
			category_overview$achivements_layout : "Vylepšiť rozhranie úspechov",
			category_overview$costumes_layout : "Vylepšiť rozhranie kostýmov",
			category_overview$items_repair_overview : "Identifikátor potrebných surovín na opravu",			
			// Settings - Main menu
			category_main_menu$advance_main_menu : "Vylepšiť hlavné menu",
			category_main_menu$submenu_click_to_change : "Zmeniť podmenu kliknutím",
			category_main_menu$quest_timer : "Stav úloh alebo časovač",	
			category_main_menu$centurio_powerups_timers : "Časovač Centurio na tlačítku Prémium",
			category_main_menu$forge_timers : "Časovač Vyhňa / Pec",
			category_main_menu$merchants_timer : "Čas obchodníkov",
			// Settings - Messages
			category_messages$messages_layout : "Rozšírené zobrazenie správ",
			category_messages$show_unread : "Zvýrazniť neprečítané správy",
			category_messages$separate_days : "Oddeliť správy z rôznych dní",
			category_messages$more_guild_mate_info : "Rozšírené info o spolkových hráčoch",
			category_messages$show_message_links : "Zobraziť odkazy obsiahnuté v správach",
			category_messages$get_guild_battle_info : "Automatické načítanie výsledkov spolkovej vojny",
			category_messages$show_sidebar : "Zobraziť bočný panel správ",
			category_messages$fix_header_links : "Opraviť chybu kliknutím na názov správy",
			category_messages$new_message_focus : "Nastavenie okamžitého písania obsahu správy",
			category_messages$new_message_friend_list : "Povoliť tlačítko Zoznam priateľov",
			// Settings - Packages
			category_packages$filters_layout : "Vylepšené rozhranie filtra",
			category_packages$small_items_layout : "Mensie zobrazenie predmetov",
			category_packages$items_layout : "Vylepšiť rozloženie predmetov",
			category_packages$compact_info_layout : "Kompaktné rozloženie informácií",
			category_packages$list_view_layout : "Zobraz baliky ako prehlad v liste",
			category_packages$load_more_pages : "Načítať viac stránok",
			category_packages$pages_to_load : "Počet stránok na načítanie",
			category_packages$item_price : "Zobraziť cenu predmetu",
			category_packages$special_category_features : "Povoliť špeciálne funkcie pre každú kategóriu",
			category_packages$double_click_open : "Dvojity klik pre otvorenie pakiet",
			category_packages$advance_filter : "Rozsirene filtrovanie balikov",
			category_packages$pop_over_bag : "Pop bag over on scroll",
			category_packages$packages_shortcuts : "Pridaj kategoriu predmetu medzi skratky",
			// Settings - Pantheon
			category_pantheon$quests_reorder : "Povoliť zoskupovanie úloh",
			category_pantheon$quests_detailed_rewards : "Zobraziť podrobné odmeny za úlohy",
			category_pantheon$missions_show_completed : "Zobraziť dokončené úlohy",
			category_pantheon$gods_show_points_percent : "Zobraziť percentá pri bodoch bohov",
			category_pantheon$open_many_mysteryboxes : "Viacnásobné otvorenie Truhlice božej priazne",
			category_pantheon$show_mysterybox_rewards_rubies : "Zobraziť pri odmene z truhlice hodnotu v rubínoch",
			category_pantheon$show_mysterybox_rewards_owned : "Ukaz mystery-box ciastku z odmien",
			// Settings - Reports
			category_reports$style_change : "Vylepšený vzhľad výpisu správ",
			category_reports$load_loot_tooltips : "Načítať každú odmenu v správach",
			category_reports$found_items : "Zhromažďovať údaje o nájdených predmetoch",
			category_reports$battle_analyzer : "Analyzuj hlasenia a ukaz zivotne statistiky",
			// Settings - Training
			category_training$show_discount : "Zobraziť zľavu na tréning",
			category_training$show_basics_in_bars : "Zobraziť základy v baroch",
			category_training$multiple_train : "Povoliť viacnásobné trénovanie",
			category_training$calculator_train : "Kalkulačka nákladov",
			category_training$show_analyze_items_data : "Zobraziť údaje analyzovaných predmetov v popisoch",
			category_training$show_points_after_upgrade : "Zobraziť vedomostné body po vylepšení",
			// Settings - Merchants
			category_merchants$fade_unaffordable_items : "Stmaviť predmety, ktoré nie je možné kúpiť",
			category_merchants$ruby_icon_on_items : "Pridaj ikonu na predmety ktore stoja rubiny",
			category_merchants$show_shop_info : "Ukaz informacie o obchode (celkova cena a rubiny)",
			category_merchants$double_click_actions : "Dvojity klik pre predanie/nakup predmetov",
			// Settings - Forge
			category_forge$material_links : "Odkazy Balíky/Trh na potrebné suroviny pre (Vyhňa/Opravovňa)",
			category_forge$show_levels : "Vyhňa - zobraziť úroveň pri Prefix/Sufix/Predmet",
			category_forge$horreum_materials_names : "[Horreum] Ukaz meno materialu",
			category_forge$horreum_remember_options : "[Horreum] Zapamätaj posledne zvolene nastavenia",
			category_forge$horreum_select_meterials : "[Horreum] Zvol material klikom",
			// Settings - Arena
			category_arena$ignore_attack_confirmations : "Ignorovať potvrdenie o útokoch (správa viac ako 5 útokov atď.)",
			category_arena$show_simulator_imagelink : "Zobraziť obrázok-odkaz na simulátor boja (simulator.dinodevs.com)",
			category_arena$sort_by_lvl : "Zorad hracov v arene podla urovne",
			category_arena$highlight_guild_members : "Vyznac hracov na druhych serveroch, ktori by mohli byt clenom spolku",
			category_arena$target_list : "Zoznam zazobanych hracov",
			// Settings - Magus
			category_magus$fade_unimprovable_items : "Stmaviť predmety ktoré nie je možné vylepšiť",
			// Settings - Market
			category_market$soulbound_warning : "Potvrdenie pri kúpe predmetov zviazaných s dušou.",
			category_market$one_gold_warning : "Potvrdenie pri kúpe predmetov za cenu 1 zlato",
			category_market$cancel_all_button : "Zobraziť tlačítko Zrušiť všetko",
			category_market$remember_sell_duration : "Zapamätať si čas posledného predaja",
			category_market$add_fees_button : "Ukaz [+] tlacitko, ktore zahrna poplatky v predajnej cene",
			category_market$sell_duration : "Vybrať predvolené trvanie predaja",
			category_market$one_gold_mode : "Tlačidlo zmeniť cenu predaja prepnúť vždy na 1 zlato",
			category_market$custom_prices : "Volitelne ceny na trhu, oddelene ciarkami. Vypocitaj zaklad na percentach ceny predmetu pridanim '%'. (napr., '10000, 10.000, 200%')",
			category_market$remember_sort : "Vybrať predvolené trvanie predaja",
			category_market$double_click_select : "Zvol predmet dvojitym klikom",
			category_market$sell_warning_icons : "Ikona upozornenia pri predavani predmetov",
			category_market$sell_with_enter : "Predaj predmety stlacenim ENTER ⏎",
			// Settings - Expedition
			category_expedition$show_enemy_drops : "Zobraziť suroviny padajúce z nepriateľov",
			category_expedition$underworld_layout : "Zobraziť v podsvetí rozhranie z výprav",
			// Settings - Guild
			category_guild$jail_layout : "Vylepšené zobrazenie Negotia X",
			category_guild$library_layout : "Vylepšené zobrazenie knižnice",
			category_guild$library_fade_non_scrolls : "Stmaviť predmety ktoré nie je možné pridať do knižnice",
			category_guild$library_tooltip_data : "Viac údajov v popisoch v knižnici",
			category_guild$bank_donate_layout : "Vylepšené zobrazenie banky",
			category_guild$bank_book_layout : "Vylepšené zobrazenie knihy príspevkov v banke",
			category_guild$bank_book_show_changes : "Ukaz pridane prispevky od poslednej navstevy bankovej knihy",
			category_guild$medic_layout : "Vylepšené zobrazenie vo Ville Medici",
			// Settings - Auction
			category_auction$items_counters : "Zobraziť počet predmetov",
			category_auction$more_search_levels : "Zobraziť ďalšie úrovne v možnostiach vyhľadávania",
			category_auction$item_price_analyze : "Analýza ceny predmetu",
			category_auction$item_level : "Zobraziť úroveň predmetu",
			category_auction$item_name : "Ukaz meno predmetu",
			category_auction$x3_items_per_line : "Zobraziť 3 predmety na riadok",
			category_auction$multi_bids : "Pridať viac ponúk bez obnovy stránky",
			category_auction$extra_item_stats : "Zobraziť ďalšie štatistiky o obrázku predmetov",
			category_auction$save_last_state : "Zabudovane ulozenie vyhladavania aukcie a nacitaj to bez neho",
			// Settings - Accessibility
			category_accessibility$white_level_indicators : "Zmen level indikatora cisla na predmete na bielo",
			category_accessibility$qualty_symbols_indicators : "Pridaj symbol kvality na indikator predmetov",
			category_accessibility$tooltips_qualty_white : "Zmen nazov predmetu v nastrojovej liste na bielo",
			category_accessibility$tooltips_qualty_symbols : "Pridaj symboly kvality na nastrojovu listu",
			// Settings - Events
			category_events$craps_timer : "Zobraziť časovač pre udalosť s kockami v hornej časti",
			category_events$server_quest_timer : "Zobraziť časovač pre serverové akcie a eventy v hornej časti",
			// Settings - Sound
			category_sound$muted : "Stlmiť / Zrušiť zvuk",
			category_sound$volume : "Hlasitosť zvuku",
			// Settings - Data
			category_data$export_settings : "Export údajov nastavení do súboru",
			category_data$import_settings : "Import údajov nastavení zo súboru",
			category_data$export_settings_to_notes : "Exportuj nastavenia do poznamok",
			category_data$import_settings_from_notes : "Importuj nastavenia z poznamok",
			category_data$reset_settings : "Reset nastavení addonu",
			category_data$clear_data : "Zmazať všetky údaje addonu",
			category_data$clear_cache_data : "Vycisti docasne subory addon-u (cache)",
			category_data$cross_browser_login : "Prepojenie internetovych vyhladavacov",
			category_data$export_error_player_settings : "Exportuj uzivatelove nezname data do suboru",

			// Buttons
			save : "Uložiť",
			export : "Export",
			import : "Import",
			reset : "Reset",
			clear : "Vymazať",
			do_not_show : "Nezobrazovať",
			show_as : "Zobraziť ako",
			show_info : "Zobraz informacie",
			each_category : "Spusti na vybranej kategorii",
			all_category : "Spusti na vybranej kategorii & vsetkych",
			do_not_run : "Nespustaj",
			default : "Predvolene",

			// Info
			translated_percent : "Preložené na: {{number}}%",
			translated_by : "Preklad: {{string}}",
			reset_settings_confirm : "Naozaj chcete resetovať nastavenia addonu?",
			clear_data_confirm : "Naozaj chcete vymazať všetky údaje addonu?",
			data_exported_save_the_file : "Data boli exporotvane. Uloz subor.",
			missing_translations : "Chybajuce preklady",

			// Notifications
			notification_reload : "Aby sa zmeny prejavili, znovu načítajte stránku"
		}
	}
}

gca_languages._active = "sk";
