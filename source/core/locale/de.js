/*
 * Gladiatus Crazy Addon Translation
 * Name : German
 * Code : [none]
 * Tag  : de
 * Translator: DoonFreak, GreatApo
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages['de'] = {

	// Language name
	name : 'Deutsch (German)',
	// Translators (authors of this script)
	translators : ["DoonFreak", "GreatApo"],

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
			// No data
			no_data : "Keine Daten vorhanden",

			// Modal buttons
			confirm : "bestätigen",
			cancel : "abbrechen",
			close : "schließen",
			error : "Fehler"
		},

		// Global
		global : {
			// Use a life potion
			life_potion_use : "benutze einen Heiltrank",
			life_potion_used : "ein Heiltrank wurde verwendet",
			life_potion_left : "Noch {{number}} Heiltränke vorhanden",
			
			// Life points recovery
			life_recover_full : "Gesamtes Leben wiederhergestellt in",

			// Button bar - Message
			message_private_write : "Private Nachricht schreiben",
			message_guild_write : "Gildennachricht schreiben",
			message_send : "senden",
			message_sent_success : "Gildennachricht wurde gesendet",
			message_sent_failed : "Gildennachricht ist fehlgeschlagen",
			message_empty : "Gildennachricht ist leer",
			message_exclude_me : "Mich ausgenommen",

			// Button bar buttons
			guild_market_goto : "Zum Gildenmarkt",
			guild_storage_goto : "Zum Lager",
			guild_bank_goto : "Zur Bank",
			guild_warcamp_goto : "Zur Kriegsmeisterhalle",
			guild_jail_goto : "Zum Negotium X",
			guild_library_goto : "Zur Bibliothek",
			guild_medic_goto : "Zum Arzt",
			simulator_goto : "Zum Simulator",
			stats_display : "Zeige meine Werte",
			online_display : "Spieler die online sind anzeigen",

			// Online friends
			online_friends : "Online Freunde",
			guild_friends : "Gilden Freunde",
			family_friends : "Familien Freunde",

			// Guild donate
			donate_gold_confirm : "Bist du sicher, dass du {{number}} gold spenden möchtest?",
			donate_gold_success : "Dein Gold wurde gespendet",
			donate_gold_failed : "Deine Goldspende schlug fehlt",
			donate_gold_no_gold : "Kein Gold zum spenden vorhanden",
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


			// Gold - Exp data
				//gold_exp_data : "",
			gold_exp_data_today : "Die letzten 24 Stunden",
			gold_exp_data_week : "Die letzten 7 Tage",
			gold_exp_data_avg_day : "Durchschnittswerte pro Tag",
			gold_exp_data_to_level_up : "Verbleibende Tage bis zum Level Aufstieg",
				//gold_exp_data_package_tax : "",
			gold_exp_data_measurements : "Messungen",
			gold_exp_data_total_exp : "gesamte Erfahrung",
			gold_exp_data_total_gold : "gesamtes Gold",
		},

		// Overview
		overview : {
			// Stats Difference
			stats_difference : "Unterschied",
			// Drop items to see materials to repair feature
			drop_item_see_materials_repair : "ziehe hierher einen Gegenstand, um die Materialien zu sehen, die benötigt werden, um ihn zu reparieren",
			workbench_6th_slot_empty : "Der 6. Slot der Werkbank muss leer sein",
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

			// Library
			library_per_point_cost : "Gold pro Punkt",
			library_gold_left : "Gildengold nach der Aktivierung",

			// Medic
			medic_lost_points : "Verlorene Punkte",
			medic_points_to_heal : "Punkte zum heilen",
			medic_life_after_heal : "Leben nach dem heilen"
		},

		// Expedition
		expedition : {
			material_drop_chance : "{{number}}% Chance das Schmiedematerial zu erhalten"
		},

		// Training section
		training : {
			// Points analysis
				//stats_points : "",
				//points_breakdown : "",
				//stats_calculated_with_yourself_as_an_opponent : "",
			// Cost calculator
			total_cost : "Gesamtkosten",
			// Discount show
			costs_discount : "Trainingskosten Ersparnis: {{number}}%"
		},

		// Auction section
		auction : {
			// Info
			items_info : "Gegenstands Informationen",
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
		},

		// Markets section
		markets : {
			// Warnings
			item_cost_only_x_gold : "Dieser Gegenstand kostet nur {{number}} Gold.",
			item_is_soulbound : "Gegenstand ist seelengebunden",
			// Are you sure
			are_you_sure_you_want_to_buy : "Willst du den Gegenstand wirklich kaufen?"
		},
		
		// Forge
		forge : {
				forge_ended : "Schmiede fertig!",
				recraft_item : "Gegenstand zerlegt"
		},
		
		// Packages
		packages : {
				event_items : "Event Gegenstände",
				known_scroll : "Bereits gelernt",
				unknown_scroll : "noch nicht gelernt"
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
			//category_pantheon : "",
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
			category_events : "Events",
			category_sound : "Sound",
			category_data : "Daten",

			// Settings - Global
			category_global$language_select : "Add on Sprache ändern",
			category_global$sound_notifications : "Aktiviere Ton Benachrichtigungen für Missionen, Dungeons und Arenas",
			category_global$browser_notifications : "Aktiviere Browser Benachrichtigungen",
			category_global$extended_hp_xp_info : "Zeige erweiterte HP und XP Infos",
			category_global$extended_hp_xp_info_potion : "Zeige den Heiltrank Button",
			category_global$hp_timer_for_full_life : "Zeige Minuten bis zur vollen Gesundheit",
			category_global$shortcuts_bar : "Buttonleiste anzeigen",
			category_global$shortcuts_bar_buttons : "Wähle die Optionen für die Schnelltastenleiste",
			category_global$auction_status_bar : "Auktionsstatus einblenden",
			category_global$auction_status_notification : "Benachrichtigung sobald sich der Status des Auktionshauses ändert",
			category_global$top_fixed_bar : "Aktiviere mitscrollende Leiste",
			category_global$advance_main_menu : "Verbessertes Hauptmenü",
			category_global$submenu_click_to_change : "Wechsel das Untermenü per Klick",
			category_global$remember_tabs : "Merke Händler und Inventar Tabs",
			category_global$attacked_timers : "Anzeige der letzten Angriffe aktivieren",
			category_global$quest_timer : "Aufgaben timer anzeigen",
			category_global$merchants_timer : "Händlerzeit anzeigen",
			category_global$forge_timers : "Schmiede/Schmelzzeit anzeigen",
			category_global$cooldown_sound_notifications : "Aktiviere sound Benachrichtigungen (Expedition, Dungeon, Arena)",
			category_global$notify_new_guild_application : "Benachrichtigen bei einer neuen Gildenbewerbung",
			category_global$notify_new_guild_application_interval : "Überprüfe auf neue Bewerbung (Minuten)",
			category_global$x_scroll : "Horizontale Scrolleiste aktivieren",
			category_global$item_shadow : "Qualität der Gegenstände als Schatten anzeigen",
			category_global$inventory_options_group : "Inventar Optionen zusammenfassen",
			category_global$inventory_gold_info : "Gold des Inventars anzeigen",
			//category_global$pagination_layout : "",
			category_global$gold_exp_data : "Zeige Gold und Erfahrung Daten an",
			category_global$pray_shorcut : "Beten Tasten in der Unterwelt anzeigen",
			category_global$centurio_powerups_timers : "",
			category_global$show_durability : "Haltbarkeit der Gegenstände unten links anzeigen",
			category_global$min_durability : "Benachrichtige sobald ein Gegenstand weniger als _% Haltbarkeit + Veredelung hat (Regler auf 0 deaktiviert)",
			// Settings - Overview
			category_overview$analyze_items : "Analysiere Spielergegenstände",
			category_overview$food_life_gain : "Zeige Lebenspunkte nach der Nahrung",
			category_overview$block_avoid_caps : "",
			category_overview$best_food : "Hebt das beste Essen hervor",
			category_overview$overfeed_food : "Blende Essen aus, dass zuviel heilt",
			category_overview$daily_bonus_log : "Tagesbonus protokollieren",
			category_overview$buffs_detailed_time : "Zeige detaillierte Timer für Buffs (Sekunden)",
			category_overview$mercenaries_manager : "Söldnermanager anzeigen",
			category_overview$mercenary_tooltip_show : "Söldner-Tooltips anzeigen",
			category_overview$more_statistics : "Zeige mehr Spielerstatistik",
			category_overview$achivements_layout : "Verbessere das Layout der Erfolge",
			category_overview$costumes_layout : "Verbessere das Layout der Kostüme",
			category_overview$items_repair_overview : "Zeige die Reperatur-Box an",
			// Settings - Messages
			category_messages$messages_layout : "Füge Nachrichteninterface hinzu",
			category_messages$show_unread : "Ungelesene Nachrichten hervorheben",
			category_messages$separate_days : "Teile Nachrichten nach Tagen auf",
			category_messages$send_message_box : "Aktiviere die Nachricht senden box",
			category_messages$more_guild_mate_info : "Zeige zusätzliche Mitgliederinformationen",
			category_messages$show_message_links : "Links anzeigen",
			category_messages$get_guild_battle_info : "Zeige Gildenkämpfe direkt an",
			category_messages$show_sidebar : "Zeige die Nachrichten Sidebar",
			//category_messages$fix_header_links : "",
			category_messages$new_message_focus : "Konzentration auf den Nachrichtentext",
			category_messages$new_message_friend_list : "Aktivieren des Freunde list Button",
			// Settings - Packages
			category_packages$filters_layout : "Erweitere das Filter Layout",
			category_packages$compact_info_layout : "Info-Layout kompakt anzeigen",
			category_packages$items_layout : "Verbessere das Layout von Gegenständen",
			category_packages$load_more_pages : "Mehrere Seiten laden",
			category_packages$pages_to_load : "Max Seitenanzahl die geladen werden soll",
			category_packages$item_price : "Wert der Gegenstände anzeigen",
			category_packages$special_category_features : "",
			// Settings - Pantheon
			category_pantheon$quests_reorder : "Aktiviere die Gruppierung von Aufgaben",
			category_pantheon$quests_detailed_rewards : "Zeige detaillierte Aufgabenbelohnungen ",
			category_pantheon$missions_show_completed : "Zeige abgeschlossene Missionen",
			category_pantheon$gods_show_points_percent : "Zeige Götterpunkte in Prozent",
			category_pantheon$open_many_mysteryboxes : "Öffne mehrere Schatztruhen",
			category_pantheon$show_mysterybox_rewards_rubies : "Wert der Schatztruhen Belohnungen in Rubinen anzeigen",
			// Settings - Reports
			category_reports$style_change : "Verbessere das Layout der Kampfberichte",
			category_reports$load_loot_tooltips : "Beute der Kampfberichte direkt anzeigen",
			category_reports$found_items : "Daten der gefundenen Gegenstände sammeln",
			// Settings - Training
			category_training$show_discount : "Trainingsrabatt anzeigen",
			category_training$show_basics_in_bars : "Zeige Gundwerte als Balken",
			category_training$multiple_train : "Mehrere Punkte auf einmal trainieren",
			category_training$calculator_train : "Kostenrechner aktivieren",
			category_training$show_analyze_items_data : "Zeige erweiterte Daten im Tooltip an",
			category_training$show_points_after_upgrade : "Zeige Werte nach dem Training an",
			// Settings - Merchants
			category_merchants$fade_unaffordable_items : "Verblasse Gegenstände, die Sie sich nicht leisten können",
			// Settings - Forge
			category_forge$material_links : "Taste zu den Paketen und dem Markt für jedes Material (Schmiede / Reparatur)",
			category_forge$show_levels : "Stufe neben dem Namen anzeigen",
			// Settings - Arena
			category_arena$ignore_attack_confirmations : "Ignoriere Angriffsbestätigungen (mehr als 5 Angriffe usw.)",
			category_arena$show_simulator_imagelink : "Zeige einen Link zum Simulator (gladiatussimulator.tk)",
			// Settings - Magus
				category_magus$fade_unimprovable_items : "Verblasse Gegenstände die sich nicht verbessern lassen",
			// Settings - Market
			category_market$soulbound_warning : "Kaufbestätigung für seelengebundene Gegenstände",
			category_market$one_gold_warning : "Kaufbestätigung für Gegenstände, die 1 Gold kosten",
			category_market$cancel_all_button : "Zeige Alle-abbrechen-Taste",
			category_market$remember_sell_duration : "Merken die zuletzt gewählte Verkaufsdauer",
			category_market$sell_duration : "Wähle die Standardverkaufsdauer aus",
			category_market$remember_sort : "Die letzte Sortierreihenfolge merken",
			// Settings - Expedition
			category_expedition$show_enemy_drops : "Zeige mögliches Schmiedematerial der Gegner",
			category_expedition$underworld_layout : "Zeige das Layout der Unterwelt wie das der Expedition",
			// Settings - Guild
			category_guild$jail_layout : "Verbessere das Layout des Negotium X",
			category_guild$library_layout : "Verbessere das Layout der Bibliothek",
			category_guild$library_fade_non_scrolls : "Gegenstände ausblenden die nicht zur Bibliothek hinzugefügt werden können",
			category_guild$library_tooltip_data : "Erweiterte Daten bei den Tooltips der Bibliothek",
			category_guild$bank_donate_layout : "Verbessere das Layout der Bank",
			category_guild$bank_book_layout : "Verbessere das Spendenbuch Layout der Bank",
			category_guild$medic_layout : "Verbessere Layout des Arztes",
			// Settings - Auction
			category_auction$items_counters : "Zeige Anzahl der Gegenstände",
			category_auction$more_search_levels : "Zeige mehr Stufen in den Suchoptionen",
			category_auction$item_price_analyze : "Analisiere die Preise der Gegenstände",
			category_auction$item_level : "Zeige Level der Gegenstände",
			category_auction$x3_items_per_line : "Zeige 3 Gegenstände pro Reihe",
			category_auction$multi_bids : "mehrere Gebote ohne Seitenaktualisierung",
			category_auction$extra_item_stats : "Zeige zusätzliche Statistiken auf den Gegenstandsbildern",
			// Settings - Events
			category_events$craps_timer : "Zeigen den Timer des Würfelevents oben an",
			category_events$server_quest_timer : "Zeigen den Timer des Server-Quest- oder Location-Events oben an",
			// Settings - Sound
			category_sound$enabled : "Aktiviere das Soundsystem",
			category_sound$muted : "Töne stummschalten / aufheben",
			category_sound$volume : "Lautstärke",
			// Settings - Data
			category_data$export_settings : "Exportieren von Einstellungsdaten in eine Datei",
			category_data$import_settings : "Importieren der Einstellungsdaten aus einer Datei",
			category_data$reset_settings : "Setzt die Einstellungen des Addons zurück",
			category_data$clear_data : "Lösche alle Addon Daten",

			// Buttons
			save : "Speichern",
			export : "exportieren",
			import : "importieren",
			reset : "zurücksetzen",
			clear : "löschen",
			do_not_show : "nicht anzeigen",
			show_as : "anzeigen als",

			// Info
			translated_by : "",
			reset_settings_confirm : "Möchtest du die Einstellungen des Addons wirklich zurücksetzen?",
			clear_data_confirm : "Möchtest du wirklich alle Daten des Addons löschen?",

			// Notifications
			notification_reload : "Seite neu laden, um die Zusätze zu aktivieren"
		}
	},


	locale_deprecated : {
		description : "Das verrückteste Gladiatus Add-On aller Zeiten",
		write_private_message : "Private Nachricht schreiben",
		write_guild_message : "Gildennachricht schreiben",
		send : "senden",
		exclude_me : "Mich ausgenommen",
		go_to_guilds_medic_center : "Zum Arzt",
		go_to_guilds_market : "Zum Gildenmarkt",
		go_to_guilds_storage : "Zum Lager",
		go_to_guilds_bank : "Zur Bank",
		donate_all_your_gold : "Gesamtes Gold spenden",
		go_to_guilds_war_camp : "Zur Kriegsmeisterhalle",
		go_to_guilds_jail : "Zum Negotium X",
		go_to_guilds_library : "Zur Bibliothek",
		go_to_simulator : "Zum Simulator",
		display_online_players : "Spieler die online sind anzeigen",
		quest_new : "Neu",
		quest_full : "Voll",
		weapon_down : "Du trägst keine Waffe",
		leveling_stats : "Erfahrung",
		today_experience : "Heutige Erfahrung",
		days7_experience : "Erfahrung Letzte 7 Tage",
		avarage_experiance_per_day : "Durchschnitts Erfahrung am Tag",
		days_left_to_level_up : "Verbleibende Tage bis zum Level Aufstieg",
		gold_after_enable : "Gold nach Aktivierung",
		lost_points : "Verlorene Punkte",
		points_to_heal : "Punkte zum heilen",
		life_after_heal : "Leben nach dem heilen",
		guild_life : "Gildenleben",
		difference : "Unterschied",
		total : "Gesamt",
		add_all_gold : "Füge gesamtes Gold hinzu",
		attacks : "Angriffe",
		defences : "Verteidigungen",
		friendly : "Freundlich",
		pending_guild_application : "Gildenbewerbung vorhanden",
		calculate_guild_upgrade : "Gildenausbau berechnen",
		include : "Einbeziehen",
		custom_amount : "Individueller Betrag",
		gold_per_player : "Gold pro Spieler",
		target_gold : "Angestrebtes Gold",
		gold_in_bank : "Gold in der Bank",
		round_up : "Aufrunden",
		round_to : "Runden auf",
		results_to_text : "Ergebnisse als Text",
		calculate_cost : "Kosten berechen",
		full_life_recover_in : "Gesamtes Leben wiederhergestellt in",
		manage_mercenaries : "Söldner Einstellungen",
		name : "Name",
		protect : "Schutz",
		leave : "Verlassen",
		friend_list : "Freundschaftsliste",
		online_friends : "Online Freunde",
		guild_friends : "Gilden Freunde",
		family_friends : "Familien Freunde",
		number_of_items : "Anzahl Gegenstände",
		number_of_bided_items : "Anzahl gebotener Gegenstände",
		hide_your_gold_here : "Sichere dein Gold hier",
		price_eq_value : "Preis = Wert",
		type : "Typ",
		item : "Gegenstand",
		select : "Auswahl",
		items_found : "Gegenständen gefunden",
		gold_limit : "Gold Limit",
		min_damage : "Mini und Maximaler-Schaden",
		duration : "Dauer",
		announce_to_guild : "Der Gilde verkünden ",
		new_goods : "Neue Waren",
		merchants_new_goods_time : "Neue Ware beim Händler Countdown",
		search_results : "Suchergebnisse",
		item_search : "Gegenstandssuche",
		storage_info : "Taschen Info",
		value : "Wert",
		no_rubies : "Rubinfrei",
		guild_discount : "Gildenersparnis",
		training_cost_calculator : "Trainingskosten Rechner",
		stats : "Statistik",
		from : "von",
		to : "zu",
		cost : "Kosten",
		training_camp_level : "Trainingsgeländestufe",
		reduction : "Verringerung",
		total_cost : "Gesamtkosten",
		calculate : "Berechnen",
		reset : "Zurücksetzen",
		spent : "ausgegeben",
		number_of_my_items : "Anzahl meiner Gegenstände",
		cancel_all : "Alle abbrechen",
		levels_you_can_see : "Der Gegenstands Level, den du sehen kannst",
		player_image : "Profilbild",
		change_player_image : "Profilbild ändern",
		image_was_saved : "Bild wurde gespeichert",
		more_player_images : "Weitere Profilbilder",
		made_by : "Erstellt von",
		guild_message_was_sent : "Gildennachricht wurde gesendet",
		guild_message_sent_failed : "Gildennachricht ist fehlgeschlagen",
		guild_message_empty : "Gildennachricht ist leer",
		gold_donated : "Dein Gold wurde gespendet",
		gold_donation_failed : "Deine Goldspende schlug fehlt",
		error : "Fehler",
		loading : "Läd",
		clear : "löschen",
		close : "schließen",
		check_all : "Alle",
		done : "Erledigt!",
		per_point : "pro Punkt",
		minutes : "Minuten",
		GENERAL_BACK : "zurück",
		there_are_no_data : "Keine Daten vorhanden",
		all_pages : "Alle Seiten",
		specific_pages : "Spezielle Seiten",
		this_page : "Diese Seite",
		calculate_gold : "Berechne Gold",
		calculate_item_values : "Berechne Gegestandswerte",
		collect_gold : "Sammle Gold",
		days : "Tage",
		remaining : "verbleibend",
		OPTIONS_DESCRIPTION : "Aktiviere oder deaktiviere Funktionen des Add-On",
		OPTIONS_BUTTON_BELOW : "Drücke den unteren Button um zu den Add-On Einstellungen zu kommen",
		OPTIONS_SETTINGS : "Einstellungen",
		OPTIONS_OPEN_ALL : "Alles öffnen",
		OPTIONS_CLOSE_ALL : "Alles schließen",
		OPTIONS_SAVE_CATEGORY : "Kategorie sichern",
		OPTIONS_SAVE_ALL : "Alles speichern",
		OPTIONS_SAVED : "Einstellungen wurden gespeichert",
		OPTIONS_RELOAD : "Seite neu laden, um die Zusätze zu aktivieren",
		OPTIONS_GLOBAL_OPTIONS : "Allgemeine Einstellungen",
		OPTIONS_GLOBAL_EXTENDED_HP_XP_INFO : "Zeige erweiterte HP und XP Infos",
		OPTIONS_GLOBAL_BUTTON_BAR : "Buttonleiste anzeigen",
		OPTIONS_GLOBAL_AUCTION_STATUS_BAR : "Auktionsstatus einblenden",
		OPTIONS_GLOBAL_TOP_FIXED_BAR : "Aktiviere mitscrollende Leiste",
		OPTIONS_GLOBAL_ADVANCED_MAIN_MENU : "Verbessertes Hauptmenü",
		OPTIONS_GLOBAL_MERCHANTS_TIME : "Händlerzeit anzeigen",
		OPTIONS_GLOBAL_MINITES_LEFT_FOR_FULL_LIFE : "Minuten zur volle Gesundheit anzeigen",
		OPTIONS_GLOBAL_REMEMBER_TABS : "Behalte Händler und Inventar Tabs",
		OPTIONS_GLOBAL_WEAPON_DOWN_ALERT : "Alarm wenn keine Waffe getragen wird",
		OPTIONS_GLOBAL_DISPLAY_CENTURIO_DAYS : "Zeige verbleibende Centuriotage (Im Menü)",
		OPTIONS_GLOBAL_MAP_NAMES_LEVELS : "Blende Gebäudenamen in der Stadt/Landkarte aus",
		OPTIONS_GLOBAL_SOUND_NOTIFICATIONS : "Aktiviere Ton Benachrichtigungen für Missionen, Dungeons und Arenas",
		OPTIONS_GLOBAL_LANGUAGE : "Add on Sprache ändern",
		OPTIONS_OVERVIEW_OPTIONS : "Übersicht Einstellungen",
		OPTIONS_MAIN_PLAYER_OPTIONS : "Hauptspieler Einstellungen",
		OPTIONS_OVERVIEW_ITEMS_ANALIZE : "Analysiere Spielergegenstände",
		OPTIONS_OVERVIEW_DISPLAY_SHARE_LINK : "Zeige den \"Teilen auf Facebook\" Button",
		OPTIONS_STATS_OPTIONS : "Statistik Einstellungen",
		OPTIONS_OVERVIEW_PLAYER_STATS_MOD : "Zeige mehr Spielerstatistik",
		OPTIONS_TRANING_OPTIONS : "Trainings Einstellungen",
		OPTIONS_TRANING_DISPLAY_MOD : "Zeige mehr Infos",
		OPTIONS_TRANING_DISPLAY_COST_CALCULATOR : "Zeige den Kostenberechner",
		OPTIONS_AUCTION_OPTIONS : "Auktionshaus Einstellungen",
		OPTIONS_AUCTION_TABLE_MODIFICATIONS : "Aktivieren der Interface Modifikationen",
		OPTIONS_AUCTION_DISPLAY_ITEMS_NUM : "Zeige Anzahl der Gegenstände",
		OPTIONS_AUCTION_DISPLAY_ITEMS_BGCOLOR : "Gegenstandsqualität als Hintergrund anzeigen",
		OPTIONS_AUCTION_AUTO_FILL_GOLD : "Automatisch Goldbetrag einfügen",
		OPTIONS_AUCTION_DISPLAY_ITEMS_LVL : "Zeige Level der Gegenstände",
		OPTIONS_AUCTION_DISPLAY_3_ITEMS_PER_ROW : "Zeige 3 Gegenstände pro Reihe",
		OPTIONS_AUCTION_SEARCH_MODIFICATIONS : "Aktiviere Änderungen an der Suche",
		OPTIONS_AUCTION_EXPAND_ITEMS_LVL : "Erweitere Gegenstandsstufe",
		OPTIONS_AUCTION_IMPROVE_SEARCH_MENU : "Menüsuche hinzufügen",
		OPTIONS_MARKET_OPTIONS : "Markt Einstellungen",
		OPTIONS_MARKET_TABLE_MODIFICATIONS : "Aktivieren der Interface Modifikationen",
		OPTIONS_MARKET_LOAD_MORE_PAGES : "Automatisch mehrere Seiten laden",
		OPTIONS_MARKET_STYLE_CHANGES : "Aktiviere Stiländerungen",
		OPTIONS_MARKET_CANCEL_PACKETS_BUTTON : "Zeige alle Pakete abbrechen Button",
		OPTIONS_MARKET_SEARCH_MODIFICATIONS : "Aktiviere Änderungen an der Suche",
		OPTIONS_MARKET_EXPAND_ITEMS_LVL : "Erweitere Gegenstandsstufe",
		OPTIONS_MARKET_IMPROVE_SEARCH_MENU : "Menüsuche hinzufügen",
		OPTIONS_MERCHANTS_OPTIONS : "Händler Einstellungen",
		OPTIONS_MERCHANTS_ITEM_SEARCH : "Aktiviere Gegenstandssuche beim Händler",
		OPTIONS_MESSAGES_OPTIONS : "Nachrichten Einstellungen",
		OPTIONS_MESSAGES_LIST_OPTIONS : "Nachrichtenliste Einstellungen",
		OPTIONS_MESSAGES_STYLING : "Füge Nachrichteninterface hinzu",
		OPTIONS_NEW_MESSAGE_OPTIONS : "Neue Nachrichten Einstellungen",
		OPTIONS_NEWMESSAGE_FRIENDLIST : "Aktivieren des Freunde list Button",
		OPTIONS_MESSAGE_SPAM_BLOCK_OPTIONS : "Spam Block Einstellung",
		OPTIONS_MESSAGE_SPAM_BLOCK : "Aktivieren des Spam Blockers",
		OPTIONS_SPAM_BLOCKED_PLAYERS : "Blockierte Spieler (trenne mit ,)",
		OPTIONS_PACKAGES_OPTIONS : "Pakete Einstellungen",
		OPTIONS_PACKAGES_NEW_LAYOUT : "Aktiviere neues Pakete Layout",
		OPTIONS_PACKAGES_MAX_PAGES_TO_LOAD : "Max Seitenanzahl die geladen werden soll",
		OPTIONS_PACKAGES_COLLECT_GOLD_BUTTON : "Aktiviere Gold nehmen Button",
		OPTIONS_REPORTS_OPTIONS : "Meldungs Einstellungen",
		OPTIONS_REPORT_LIST_OPTIONS : "Report list Einstellung",
		OPTIONS_CHAT_OPTIONS : "Chat Einstellung",
		OPTIONS_CHAT_URL_MOD : "Aktivieren der Chat Link Modifikation",
		OPTIONS_CHAT_STYLE_MOD : "Ändern des Chat Style's",
		OPTIONS_GUILD_OPTIONS : "Gilden Einstellung",
		OPTIONS_PREMIUM_OPTIONS : "GCA Premium Einstellung",
		OPTIONS_GET_PREMIUM : "Premium Key Kaufen",
		OPTIONS_GAME_FIXES_OPTIONS : "Spiel Fix"
	}
}

gca_languages._active = "de";
