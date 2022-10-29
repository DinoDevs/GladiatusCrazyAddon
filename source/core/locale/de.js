/*
 * Gladiatus Crazy Addon Translation
 * Name : German
 * Code : [none]
 * Tag  : de
 * Translator: DoonFreak, Sleeping*Shadow
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages['de'] = {

	// Language name
	name : 'Deutsch (German)',
	// Translators (authors of this script)
	translators : ["DoonFreak", "Sleeping*Shadow"],

	// Translations object
	locale : {
		// Addon info
		info : {
			description : "Das verrückteste Gladiatus Add-On aller Zeiten"
		},

		// General
		general : {
			// Days
			days : "Tag(e)",
			// Minutes
			minutes : "Minute(n)",
			// Hours
			hours : "Stunde(n)",
			// No data
			no_data : "Keine Daten vorhanden",

			// Buttons
			confirm : "bestätigen",
			cancel : "abbrechen",
			close : "schließen",
			error : "Fehler",
			yes : "Ja",
			no : "Nein",
			ok : "OK"
		},

		// Global
		global : {
			// Use a life potion
			life_potion_use : "benutze einen Heiltrank",
			life_potion_used : "ein Heiltrank wurde verwendet",
			life_potion_left : "Noch {{number}} Heiltränke vorhanden",
			
			// Life points recovery
			life_recover_full : "Gesamtes Leben wiederhergestellt in",
			expedition_recover_full : "Volle Expeditonspunkte wiederhergestellt in",
			dungeon_recover_full : "Volle Dungeonpunkte wiederhergestellt in",

			// Button bar - Message
			message_private_write : "Private Nachricht schreiben",
			message_guild_write : "Gildennachricht schreiben",
			message_send : "Senden",
			message_sent_success : "Gildennachricht wurde gesendet",
			message_sent_failed : "Gildennachricht ist fehlgeschlagen",
			message_empty : "Gildennachricht ist leer",
			message_exclude_me : "Mich ausgenommen",

			// Button bar buttons
			guild_market_goto : "Zum Gildenmarkt",
			guild_storage_goto : "Zum Lager",
			guild_bank_goto : "Zur Bank",
			guild_baths_goto : "Zum Badehaus (Vox I)",
			guild_warcamp_goto : "Zur Kriegsmeisterhalle",
			guild_arenareports_goto : "Zu Gilden Kampfberichte",
			guild_jail_goto : "Zum Negotium X",
			guild_library_goto : "Zur Bibliothek",
			guild_templum_goto : "Zum Templum",
			auction_food_goto : "Zum Auktionshaus - Nahrung",
			guild_medic_goto : "Zum Arzt",
			simulator_goto : "Zum Simulator",
			stats_display : "Zeige meine Werte",
			online_display : "Spieler die online sind anzeigen",

			// Online friends
			online_friends : "Online Freunde",
			guild_friends : "Gilden Freunde",
			family_friends : "Familien Freunde",

			// Guild donate
			donate_gold_confirm : "Bist du sicher, dass du {{number}} Gold spenden möchtest?",
			donate_gold_success : "Dein Gold wurde gespendet",
			donate_gold_failed : "Deine Goldspende schlug fehl",
			donate_gold_no_gold : "Kein Gold zum Spenden vorhanden",
			donate_gold_all_gold : "Gesamtes Gold spenden",

			// Quest timer
			quest_full : "Voll",
			quest_new : "Neu",

			// Pray icon
			pray_start : "beten beginnen",
			pray_stop : "beten beenden",
			heal : "Heilen",

			// Notifications
			notification_guild_application : "Gildenbewerbung vorhanden",
			notification_guild_attack_ready : "Die Abklingzeit für den Gildenkampf ist vorbei!",
			low_durability_items : "Es gibt {{number}} Gegenstand/Gegenstände mit einer Haltbarkeit von {{percent}}%",
			item_worth_rubies : "Der Gegenstand ist Rubinen wert!",

			// Gold - Exp data
			gold_exp_data : "Gold- und Erfahrungswerte",
			gold_exp_data_today : "Die letzten 24 Stunden",
			gold_exp_data_week : "Die letzten 7 Tage",
			gold_exp_data_avg_day : "Durchschnittswerte pro Tag",
			gold_exp_data_to_level_up : "Verbleibende Tage bis zum Level Aufstieg",
			gold_exp_data_package_tax : "Wöchentliche Marktgebühr der Pakete",
			gold_exp_data_measurements : "Messungen",
			gold_exp_data_total_exp : "gesamte Erfahrung",
			gold_exp_data_total_gold : "gesamtes Gold",
			gold_exp_data_reset : "Statistik wurde zurückgesetzt!",
			gold_exp_data_desc: "Die Daten werden alle 5 Minunten gesammelt. Der Verkauf von gekauften Gegenständen verdoppelt Deine Goldstatistik.",
			
			// Items
			mercenary_type : "Typ: {{name}} ({{number}})",
			gains_with_full_stats : "Gewinne mit vollen Statistiken:",
			base : "Basis",
			prefix : "Präfix",
			suffix : "Suffix"
		},

		// Overview
		overview : {
			// Stats Difference
			stats_difference : "Unterschied",
			// Drop items to see materials to repair feature
			drop_item_see_materials_repair : "ziehe hierher einen Gegenstand, um die Materialien zu sehen, die benötigt werden, um ihn zu reparieren",
			workbench_6th_slot_empty : "Der 6. Slot der Werkbank muss leer sein",

			// More player info
			more_player_info : "Weitere Informationen zum Spieler",
			can_use_max_item_level : "Kann Gegenstände bis zur Stufe {{max}} benutzen.",
			can_see_market_max_item_level : "Kann Gegenstände am Markt bis zur Stufe {{max}} sehen.",
			can_see_auction_item_levels : "Kann Gegenstände im Auktionshaus von Stufe {{min}} bis {{max}} sehen."
		},

		// Pantheon section
		pantheon : {
			// Mystery box
			mysterybox_open_all : "Alle öffnen",
			mysterybox_open_stop : "stop",
			mysterybox_open_done : "Erledigt!"
		},

		// Guild section
		guild : {
			// Guild Bank
			bank_all_gold : "Füge gesamtes Gold hinzu",
			total_donations : "Goldspende gesamt",
			min_upgrades_gold : "Investiert in Gebäudeausbau (minimum)",
			max_stolen_gold : "Erbeutet durch Gildenkämpfe (maximum)",

			// Library
			library_per_point_cost : "Gold pro Punkt",
			library_gold_left : "Gildengold nach der Aktivierung",

			// Medic
			medic_lost_points : "Verlorene Punkte",
			medic_points_to_heal : "Punkte zum Heilen",
			medic_life_after_heal : "Leben nach dem heilen",
			
			// Baths
			pinned_message : "Angeheftete Gildennachricht",
			pin_unpin_message : "Die Nachricht anheften / lösen",
			pinned_message_info : "Angeheftete Nachrichten werden allen Gildenmitgliedern, die diese Funktion verwenden, oben in den Nachrichten angezeigt"
		},

		// Expedition
		expedition : {
			material_drop_chance : "{{number}}% Chance das Schmiedematerial zu erhalten"
		},

		// Arena section
		arena : {
			global_arena_title : "Globale Arena",
			global_arena_description : "Das ist die ultimative Arena, in der Gladiatoren aus aller Welt zusammenkommen! In dieser Arena kämpfen Gladiatoren nicht um Gold oder Erfahrung, sondern um einen Platz auf der Weltspitzenliste!",
			global_arena_load : "Globale Angriffsliste anzeigen",
			global_highscore : "Globale Bestenliste",
			country : "Land",
			server : "Server",
			target_list : "Liste der Angriffsziele",
			target_list_add : "Angriffsziel hinzufügen",
			target_list_remove : "Angriffsziel löschen",
			error_sth_went_wrong : "Etwas ist schief gelaufen",
			error_response : "Die Antwort vom Server zeigt an, dass ein Fehler aufgetreten ist.",
			error_blocked_access : "Etwas blockiert den Zugang zum GCA Server ({{url}})",
			error_connection : "Verbindungsfehler",
			attack_player : "Klicke um “{{name}}” anzugreifen",
			fight_won : "Du hast den Kampf gewonnen!",
			fight_lost : "Du hast den Kampf verloren...",
			player_tired : "Du hast gerade einen Kampf in der Arena bestritten",
			player1_hits_player2 : "{{name1}} schlägt {{name2}}",
			player_takes_x_damage :"{{name}} erleidet {{number}} Schaden",
			player_dies :"{{name}} gestorben"
		},

		// Training section
		training : {
			// Points analysis
			stats_points : "Trainingsstatistik",
			points_breakdown : "Punkte Aufschlüsselung",
			
			// Cost calculator
			total_cost : "Gesamtkosten",
			// Discount show
			costs_discount : "Trainingskosten Ersparnis: {{number}}%",
			// points breakdown
			points_breakdown_damage : "Schaden: +{{integer}} (+{{float}})",
			points_breakdown_block : "Block: +{{integer}}% (+{{float}}%)",
			points_breakdown_block_max : "Block: max. Wert",
			points_breakdown_block_short : "Block: +{{integer}}%",
			points_breakdown_normal_hit : "Trefferchance: +{{integer}}% (+{{float}}‰) *",
			points_breakdown_critical_hit : "Kritische Trefferchance: +{{integer}}% (+{{float}}‰)",
			points_breakdown_critical_hit_short : "Kritische Trefferchance: +{{integer}}%",
			points_breakdown_double_hit : "Doppelschlag Chance: +{{integer}}% (+{{float}}‰) *",
			points_breakdown_double_hit_factor : "Doppelschlag Chance: {{number}}",
			points_breakdown_avoid : "Chance kritische Treffer zu vermeiden: +{{integer}}% (+{{float}}‰)",
			points_breakdown_avoid_max : "Chance kritische Treffer zu vermeiden: max. Wert",
			points_breakdown_avoid_short : "Chance kritische Treffer zu vermeiden: +{{integer}}%",
			points_breakdown_avoid_double_hit_factor : "Chance Doppelschlag zu vermeiden: {{number}}",
			points_breakdown_enemy_normal_hit : "Gegnerische Trefferchance: {{integer}}% ({{float}}‰) *",
			points_breakdown_enemy_double_hit : "Gegnerische Doppelschlag Chance: {{integer}}% ({{float}}‰) *",
			points_breakdown_life : "Lebenspunkte: +{{number}}",
			points_breakdown_regeneration : "Regeneration pro Stunde: +{{number}}",
			points_breakdown_threat : "Präsenz: +{{integer}} (+{{float}})",
			points_breakdown_heal : "Heilung: +{{integer}} (+{{float}})",
			points_breakdown_critical_heal : "Kritische Heilungswertung: +{{integer}}% (+{{float}}‰)",
			points_breakdown_critical_heal_max : "Kritische Heilungswertung: max. Wert",
			stats_calculated_with_yourself_as_an_opponent : "* Eigenschaften werden nach dem Konzept des Selbstangriffs berechnet.",
			values_in_parenthesis_explanation : "Werte in Klammern zeigen die entsprechenden Werte vor dem Runden.",
		},

		// Auction section
		auction : {
			// Info
			items_info : "Informationen zu Gegenstände",
			// Number of items in the page
			number_of_items : "Anzahl Gegenstände : {{number}}",
			// Number of items that have been bidden in the page
			number_of_bided_items : "Anzahl gebotener Gegenstände : {{number}}",
			// Message on items that you can buy and sell at the same price
			hide_your_gold_here : "Sichere dein Gold hier",
			// Price of item equals to its value
			price_value_function : "Preis = Wert + {{number}}",
			// Levels you can see
			levels_you_can_see : "Du kannst Gegenstände der Stufe {{min}} bis {{max}} sehen.",
			// Sort
			sort : "Sortieren",
			sort_by : "Sortieren nach",
			sort_order : "Reihenfolge",
			asc : "aufsteigend",
			desc : "absteigend"
		},

		// Markets section
		markets : {
			// Warnings
			item_cost_only_x_gold : "Dieser Gegenstand kostet nur {{number}} Gold.",
			item_is_soulbound : "Gegenstand ist seelengebunden",
			item_cant_buy_back : "Du kannst den Gegenstand nicht zurück kaufen.",
			// Are you sure
			are_you_sure_you_want_to_buy : "Willst du den Gegenstand wirklich kaufen?",
			click_enter_to_sell : "Drücke Enter ⏎ zum Verkaufen",
			add_fees_in_price : "Inkludiere Gebühr zum Marktpreis"
		},
		
		// Forge
		forge : {
			forge_ended : "Schmiede fertig!",
			recraft_item : "Gegenstand zerlegt",
			show_hide_doll : "Zeige / Verstecke Ausrüstung des Charakters",
			horreum_material_change : "Horreum - Rohstoff wurde aufgewertet / eingelagert / entnommen"
		},
		
		// Merchants
		merchants : {
			search_item_in_merchants : "Suche Gegenstand beim Händler",
			no_such_item : "Gesuchter Gegenstand nicht gefunden."
		},
		
		// Packages
		packages : {
			event_items : "Event Gegenstände",
			known_scroll : "Bereits gelernt",
			unknown_scroll : "noch nicht gelernt",
			advance_filters : "Erweiteter Filter",
			advance_filters_apply : "Filter anwenden",
			advance_filters_clear : "Filter zurücksetzen",
			advance_filters_found : "(Gefunden:{{items}})"
		},
		
		// Report
		reports : {
			avg_damage : "Ø-Schaden",
			avg_heal : "Ø-Heilung",
			total_hits : "Treffer gesamt",
			hits : "Treffer",
			dodge : "Ausgewichen oder Geblockt",
			points : "Punkte"
		},

		// Cross-Browser Sync
		sync : {
			are_you_sure : "Möchtest du dich als Spieler {{name}} anmelden?",
			gladiatus_crazy_addon_dependency : "Sie müssen Gladiatus Crazy Addon auf dem anderen Browser installiert haben.",
			how_to_sync_info : "Kopiere die URL und fügen diese in den anderen Browser ein oder scannen Sie den QR-Code."
		},

		// Settings
		settings : {
			// Settings
			settings : "Einstellungen",
			// Description
			description : "Aktiviere oder deaktiviere Funktionen des Add-On",
			description_click_button : "Drücke den unteren Button um zu den Add-On Einstellungen zu kommen",
			
			// Categories
			category_global : "Allgemein",
			category_overview : "Übersicht",
			category_messages : "Nachrichten",
			category_packages : "Pakete",
			category_pantheon : "Pantheon",
			category_reports : "Kampfberichte",
			category_training : "Training",
			category_merchants : "Händler",
			category_forge : "Schmiede",
			category_arena : "Arena",
			category_magus : "Magus",
			category_market : "Markt",
			category_expedition : "Expedition",
			category_guild : "Gilde",
			category_auction : "Auktionshaus",
			category_accessibility : "Bedienungshilfe",
			category_events : "Events",
			category_sound : "Sound",
			category_data : "Daten",

			// Settings - Global
			category_global$language_select : "Add-on Sprache ändern",
			category_global$browser_notifications : "Aktiviere Browser Benachrichtigungen",
			category_global$extended_hp_xp_info : "Zeige erweiterte HP und XP Infos",
			category_global$extended_hp_xp_info_potion : "Zeige den Heiltrank Button",
			category_global$hp_timer_for_full_life : "Zeige benötigte Zeit bis zur vollen Gesundheit",
			category_global$expedition_dungeon_points_recover_timer : "Zeige benötigte Zeit für volle Expeditons- und Dungeonpunkte",
			category_global$shortcuts_bar : "Zeige Shortcut-Leiste",
			category_global$shortcuts_bar_buttons : "Wähle die Optionen für die Shortcut-Leiste",
			category_global$auction_status_bar : "Zeige Status des Auktionshauses",
			category_global$auction_status_notification : "Benachrichtigen sobald sich der Status des Auktionshauses ändert",
			category_global$top_fixed_bar : "Fixiere die Navigationleiste beim Scrollen",
			category_global$remember_tabs : "Merke Händler und Inventar Tabs",
			category_global$attacked_timers : "Anzeige der letzten Arenen-Angriffe aktivieren",
			category_global$notify_new_guild_application : "Benachrichtige bei einer neuen Gildenbewerbung",
			category_global$check_guild_pinned_message : "Zeige angeheftete Nachrichten aus dem Vox als Gildennachricht an",
			category_global$check_guild_application_pinned_messages_interval : "Überprüfe auf neue Bewerbung und angeheftete Nachrichten (Minuten)",
			category_global$notify_guild_attack_ready : "Benachrichtige wenn Abklingzeit des Gildenkampfes vorüber ist",
			category_global$notify_guild_attack_ready_interval : "Überprüfe Abklingzeit des Gildenkampfes (Minuten)",
			category_global$x_scroll : "Horizontale Scrolleiste aktivieren",
			category_global$item_shadow : "Qualität der Gegenstände als Schatten anzeigen",
			category_global$inventory_options_group : "Inventar Optionen zusammenfassen",
			category_global$inventory_gold_info : "Zeige den Goldwert der Inventare",
			category_global$pagination_layout : "Ändere Layout der Seitennummerierung (Nachrichten, Pakete,...)",
			category_global$gold_exp_data : "Zeige die Übersicht Gold- und Erfahrungswerte",
			category_global$pray_shorcut : "Zeige die Beten-Taste in der Unterwelt",
			category_global$show_durability : "Zeige die Haltbarkeit der Gegenstände unten links",
			category_global$min_durability : "Benachrichtige sobald ein Gegenstand weniger als _% Haltbarkeit + Veredelung hat (\"0\" zum Deaktivieren)",
			category_global$show_forge_info : "Zeige Schmiederohstoff der Gegenstände im Tooltip",
			category_global$show_mercenaries_real_name_and_combat_stats : "Zeige den echten Söldner Namen (Typ) und ihre Kampfstatistik im Tooltip",
			category_global$show_upgrade_values : "Zeige die Werte von Verbesserungen und Verstärkungen",
			category_global$global_arena_timer : "Zeige Globale Arena",
			// Settings - Overview
			category_overview$analyze_items : "Analysiere Spielergegenstände",
			category_overview$food_life_gain : "Zeige gewonnene Lebenspunkte pro Nahrung",
			category_overview$block_avoid_caps : "Zeige maximale Block-, Widerstands- und kritische Schadenswerte an",
			category_overview$best_food : "Hebt die beste Nahrung hervor",
			category_overview$overfeed_food : "Blende Nahrung aus, welches zuviel heilt",
			category_overview$double_click_consume : "Durch Doppelklick Gegenstände konsumieren",
			category_overview$daily_bonus_log : "Tagesbonus protokollieren",
			category_overview$buffs_detailed_time : "Zeige detaillierte Timer für Buffs (Sekunden)",
			category_overview$mercenaries_manager : "Zeige den Söldnermanager",
			category_overview$mercenary_tooltip_show : "Zeige den Tooltip bei den Söldnern",
			category_overview$more_statistics : "Zeige mehr Details in der Kampfstatistik",
			category_overview$achivements_layout : "Verbessere das Layout der Erfolge",
			category_overview$costumes_layout : "Verbessere das Layout der Kostüme",
			category_overview$items_repair_overview : "Zeige die Reperatur-Box",
			// Settings - Main menu
			category_main_menu$advance_main_menu : "Zeige verbessertes Layout des Hauptmenüs",
			category_main_menu$submenu_click_to_change : "Wechsel das Untermenü per Klick",
			category_main_menu$quest_timer : "Zeige den Aufgaben-Timer/Status",	
			category_main_menu$centurio_powerups_timers : "Zeige Timer zu Centurio und Pakte an der Premium Schaltfläche",
			category_main_menu$forge_timers : "Zeige den Schmiede/Schmelzzeit-Indikator",
			category_main_menu$merchants_timer : "Zeige den Händlerzeit-Indikator",
			// Settings - Messages
			category_messages$messages_layout : "Zeige verbessertes Layout der Nachrichten",
			category_messages$show_unread : "Ungelesene Nachrichten hervorheben",
			category_messages$separate_days : "Teile Nachrichten auf verschiedene Tage auf",
			category_messages$more_guild_mate_info : "Zeige zusätzliche Mitgliederinformationen",
			category_messages$show_message_links : "Zeige Hyperlinks in den Nachrichten",
			category_messages$get_guild_battle_info : "Zeige Gildenkämpfe direkt an",
			category_messages$show_sidebar : "Zeige die Nachrichten-Sidebar",
			category_messages$fix_header_links : "Behebt den Fehler bei Klick auf Titellink von Nachrichten",
			category_messages$new_message_focus : "Konzentration auf den Nachrichtentext",
			category_messages$new_message_friend_list : "Zeige Shortcut zur Freundesliste",
			// Settings - Packages
			category_packages$filters_layout : "Zeige verbessertes Layout der Filter",
			category_packages$small_items_layout : "Zeige Gegenstände verkleinert",
			category_packages$items_layout : "Zeige verbessertes Layout von Gegenständen:",
			category_packages$compact_info_layout : "Zeige kompaktes Layout",
			category_packages$list_view_layout : "Zeige Pakete als Listen-Ansicht",
			category_packages$load_more_pages : "Lade mehrere Seiten",
			category_packages$pages_to_load : "Seitenanzahl die geladen werden soll:",
			category_packages$item_price : "Wert der Gegenstände anzeigen",
			category_packages$special_category_features : "Aktiviere spezielle Funktionen\n•Zeigt ob Schriftrollen bereits erlernt wurden\n•Zeigt nicht erlernte Suffix / Präfix via Symbol am Gegenstand an",
			category_packages$double_click_open : "Pakete durch Doppelklick öffnen",
			category_packages$advance_filter : "Zeige erweiteten Pakete Filter",
			category_packages$pop_over_bag : "Beim Scrollen Inventar hervorheben",
			// Settings - Pantheon
			category_pantheon$quests_reorder : "Zeige Aufgaben pro Gruppe",
			category_pantheon$quests_detailed_rewards : "Zeige detaillierte Aufgabenbelohnungen ",
			category_pantheon$missions_show_completed : "Zeige abgeschlossene Missionen",
			category_pantheon$gods_show_points_percent : "Zeige Götterpunkte in Prozent",
			category_pantheon$open_many_mysteryboxes : "Öffne mehrere Schatztruhen",
			category_pantheon$show_mysterybox_rewards_rubies : "Zeige den Wert der Schatztruhen-Belohnung in Rubinen",
			category_pantheon$show_mysterybox_rewards_owned : "Zeige in Schatzkammer den aktuellen Inventarbestand",
			// Settings - Reports
			category_reports$style_change : "Zeige verbessertes Layout der Kampfberichte",
			category_reports$load_loot_tooltips : "Beute der Kampfberichte direkt anzeigen",
			category_reports$found_items : "Daten der gefundenen Gegenstände sammeln",
			category_reports$battle_analyzer : "Zeige Berichtsanalyse und Lebensstatistik",
			// Settings - Training
			category_training$show_discount : "Zeige Trainingsrabatt",
			category_training$show_basics_in_bars : "Zeige Gundwerte als Balken",
			category_training$multiple_train : "Mehrere Punkte auf einmal trainieren",
			category_training$calculator_train : "Kostenrechner aktivieren",
			category_training$show_analyze_items_data : "Zeige weitere Informationen im Tooltip",
			category_training$show_points_after_upgrade : "Zeige Werte nach dem Training",
			// Settings - Merchants
			category_merchants$fade_unaffordable_items : "Verblasse Gegenstände, die Du dir nicht leisten kannst",
			category_merchants$ruby_icon_on_items : "Zeige ein Rubin-Symbol bei Gegenstände, die Rubine kosten",
			category_merchants$show_shop_info : "Zeige Infos pro Händler (Gesamtes Gold und Rubinen)",
			category_merchants$double_click_actions : "Gegenstände verkaufen / kaufen durch Doppelklick",
			// Settings - Forge
			category_forge$material_links : "[Werkbank, Schmiede] Erstelle Shurtcuts (Email, Pakete und Markt) für jedes Material",
			category_forge$show_levels : "[Schmiede] Zeige zusätzlich Präfix / Suffix - Stufe neben dem Namen ",
			category_forge$horreum_materials_names : "[Horreum] Zeige Rohstoff-Bezeichnung",
			category_forge$horreum_remember_options : "[Horreum] Merke gewählte Einstellungen zur Einlagerung",
			category_forge$horreum_select_meterials : "[Horreum] Rohstoff durch anklicken auswählen",
			// Settings - Arena
			category_arena$ignore_attack_confirmations : "Ignoriere Angriffsbestätigungen (größer 5 Angriffe)",
			category_arena$show_simulator_imagelink : "Zeige einen Link zum Simulator (simulator.dinodevs.com)",
			category_arena$sort_by_lvl : "Sortiere Spieler nach Level",
			category_arena$highlight_guild_members : "Markiere Gildenmitglieder auf anderen Servern (Namensgleichheit)",
			category_arena$target_list : "Liste der Angriffsziele",
			// Settings - Magus
			category_magus$fade_unimprovable_items : "Verblasse Gegenstände die sich nicht verbessern lassen",
			// Settings - Market
			category_market$soulbound_warning : "Kaufbestätigung für seelengebundene Gegenstände",
			category_market$one_gold_warning : "Kaufbestätigung für Gegenstände, die 1 Gold kosten",
			category_market$cancel_all_button : "Zeige Schaltfläche \"Alle-Abbrechen\"",
			category_market$remember_sell_duration : "Zuletzt gewählte Verkaufsdauer merken",
			category_market$add_fees_button : "Zeige Schaltfläche \"Inkludiere Gebühr zum Marktpreis\"",
			category_market$sell_duration : "Wähle die Standardverkaufsdauer aus",
			category_market$one_gold_mode : "Schaltfläche zum Ändern des Marktpreise immer auf 1 Gold",
			category_market$custom_prices : "Zeige benutzerdefinierte Marktpreise\n•Verkaufe den Basiswert des Gegenstandes um 50% teurer (z.B.: 150%)\n•Trenne mit Kommas (z.B.: 100.000, 2000000, 150%)\n ",
			category_market$remember_sort : "Die letzte Reihenfolge der Sortierung merken",
			category_market$double_click_select : "Wähle Gegenstand durch Doppelklick aus",
			category_market$sell_warning_icons : "Warnsymbole bei Verkauf von Gegenständen anzeigen",
			category_market$sell_with_enter : "Verkaufe Gegenstände durch Drücken der Enter-Taste ⏎",
			// Settings - Expedition
			category_expedition$show_enemy_drops : "Zeige mögliches Schmiedematerial der Gegner",
			category_expedition$underworld_layout : "Zeige das Layout der Unterwelt wie das der Expedition",
			// Settings - Guild
			category_guild$jail_layout : "Zeige verbessertes Layout des Negotium X",
			category_guild$library_layout : "Zeige verbessertes Layout der Bibliothek",
			category_guild$library_fade_non_scrolls : "Blende Gegenstände aus, die nicht zur Bibliothek hinzugefügt werden können",
			category_guild$library_tooltip_data : "Zeige weitere Informationen im Tooltip der Bibliothek",
			category_guild$bank_donate_layout : "Zeige verbessertes Layout der Bank",
			category_guild$bank_book_layout : "Zeige verbessertes Layout des Spendebuches",
			category_guild$bank_book_show_changes : "Zeige Spendendifferenz der Spieler seit letzten Spendenbuch-Besuch",
			category_guild$medic_layout : "Zeige verbessertes Layout des Villa Medicis",
			// Settings - Auction
			category_auction$items_counters : "Zeige Anzahl der Gegenstände",
			category_auction$more_search_levels : "Zeige mehr Stufen in den Suchoptionen",
			category_auction$item_price_analyze : "Analysiere die Preise der Gegenstände",
			category_auction$item_level : "Zeige zusätzlich das Level der Gegenstände",
			category_auction$item_name : "Zeige zusätzlich den Name der Gegenstände",
			category_auction$x3_items_per_line : "Zeige 3 Gegenstände pro Reihe",
			category_auction$multi_bids : "Mehrere Gebote ohne Aktualisierung der Seite",
			category_auction$extra_item_stats : "Zeige zusätzliche Statistiken auf den Gegenstandsbildern",
			category_auction$save_last_state : "Zuletzt gewählter Filter als Standardeinstellung anzeigen",
			// Settings - Accessibility
			category_accessibility$white_level_indicators : "Ändere die Stufen-Anzeige der Gegenstände in die Farbe weiss" ,
			category_accessibility$qualty_symbols_indicators : "Füge ein Symbol als Qualitätsindikator auf Gegenstände hinzu",
			category_accessibility$tooltips_qualty_white : "Ändere den Titel der Gegenstände im Tooltip in die Farbe weiss",
			category_accessibility$tooltips_qualty_symbols : "Füge ein Symbol als Qualitätsindikator im Tooltip hinzu",
			// Settings - Events
			category_events$server_quest_timer : "Zeige den Timer des Server-Quest- oder Location-Events",
			category_events$craps_timer : "Zeige den Timer des Würfelevents ",
			// Settings - Sound
			category_sound$cooldown_sound_notifications : "Aktiviere Sound Benachrichtigungen (Expedition, Dungeon, Arena)",
			category_sound$muted : "Töne stummschalten / aufheben",
			category_sound$volume : "Lautstärke",
			// Settings - Data
			category_data$export_settings : "Exportieren von Einstellungsdaten in eine Datei",
			category_data$import_settings : "Importieren der Einstellungsdaten aus einer Datei",
			category_data$export_settings_to_notes : "Exportieren von Einstellungsdaten in die Notizen",
			category_data$import_settings_from_notes : "Importieren der Einstellungsdaten aus den Notizen",
			category_data$reset_settings : "Setzt die Einstellungen des Add-ons zurück",
			category_data$clear_data : "Lösche alle Add-on Daten",
			category_data$clear_cache_data : "Lösche Cache Dateien des Add-ons",
			category_data$cross_browser_login : "Browserübergreifende Anmeldesynchronisation",

			// Buttons
			save : "Speichern",
			export : "exportieren",
			import : "importieren",
			reset : "zurücksetzen",
			clear : "löschen",
			do_not_show : "nicht anzeigen",
			show_as : "anzeigen als",
			show_info : "Zeige Informationen",
			each_category : "Zeige pro Kategorie",
			all_category : "Zeige pro Kategorie und gesamten Inhalt",
			do_not_run : "Nicht anzeigen",
			default: "Ursprünglich",

			// Info
			translated_percent : "Aktuell übersetzt: {{number}}%",
			translated_by : "Übersetzt von: {{string}}",
			reset_settings_confirm : "Möchtest du die Einstellungen des Add-ons wirklich zurücksetzen?",
			clear_data_confirm : "Möchtest du wirklich alle Daten des Addons löschen?",
			data_exported_save_the_file : "Datei wurde exportiert. Speicher die Datei.",
			missing_translations : "Fehlende Übersetzung",

			// Notifications
			notification_reload : "Seite neu laden, um die Zusätze zu aktivieren"
		}
	}
}

gca_languages._active = "de";
