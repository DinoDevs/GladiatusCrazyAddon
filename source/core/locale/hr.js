/*
 * Gladiatus Crazy Addon Translation
 * Name : Croatian
 * Code : [none]
 * Tag  : hr
 * Translator: Dark_Knight, Tharacius
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages['hr'] = {
	name : 'Hrvatski (Croatian)',
	translators : ["Dark_Knight","Tharacius"],
	locale : {
		info : {
			description : "Najluđi addon za Gladiatus ikada!"
		},
		general : {
			days : "dana",
			minutes : "minute",
			hours : "sati",
			no_data : "Nema podataka.",
			
			// Buttons
			confirm : "Potvrdi",
			cancel : "Otkaži",
			close : "Zatvori",
			error : "Greška",
			yes : "Da",
			no : "Ne",
			ok : "OK"
		},
		global : {
			// Use a life potion
			life_potion_use : "Iskoristi napitak Života",
			life_potion_used : "Napitak Života iskorišten",
			life_potion_left : "Preostalo vam je {{number}} napitaka Života",
			
			// Life/Expedition/Dungeon points recovery
			life_recover_full : "Životni bodovi će biti puni za",
			expedition_recover_full : "Bodovi za ekspedicije će biti pune za",
			dungeon_recover_full : "Bodovi za tamnice će biti pune za",

			// Button bar - Message
			message_private_write : "Pošalji privatnu poruku",
			message_guild_write : "Pošalji saveznu poruku",
			message_send : "Pošalji",
			message_sent_success : "Poruka uspešno poslata",
			message_sent_failed : "Greška pri slanju poruke",
			message_empty : "Poruka je prazna",
			message_exclude_me : "Isključi mene",

			// Button bar buttons
			guild_market_goto : "Idi na savezni market",
			guild_storage_goto : "Idi u savezno skladište",
			guild_bank_goto : "Idi u saveznu banku",
			guild_warcamp_goto : "Idi u saveznu dvoranu ratnih heroja",
			guild_arenareports_goto : "Idi u izveštaje saveznih borbi",
			guild_jail_goto : "Idi u savezni Negotijum",
			guild_library_goto : "Idi u saveznu knjižnicu",
			guild_templum_goto : "Idi u savezni Templum",
			guild_medic_goto : "Idi kod saveznog Doktora",
			simulator_goto : "Idi u simulator",
			stats_display : "Prikaži moju statistiku",
			online_display : "Prikaži online igrače",

			// Online friends
			online_friends : "Online Prijatelji",
			guild_friends : "Saveznici",
			family_friends : "Familija",

			// Guild donate
			donate_gold_confirm : "Da li ste sigurni da želite da donirate {{number}} zlata?",
			donate_gold_success : "Zlato uspešno donirano",
			donate_gold_failed : "Zlato neuspešno donirano",
			donate_gold_no_gold : "Nemate zlata da donirate",
			donate_gold_all_gold : "Doniraj sve svoje zlato",

			// Quest timer
			quest_full : "Puno",
			quest_new : "Novo",

			// Pray icon
			pray_start : "Pritisnite da započnete sa molitvom",
			pray_stop : "Pritisnite da prekinite sa molitvom",
			heal : "izlječi",

			// Notifications
			notification_guild_application : "Ima nova savezna aplikacija na čekanju!",
			low_durability_items : "Ima {{number}} predmeta sa održavanjem ispod {{percent}}%",
			item_worth_rubies : "Taj predmet vredi rubina!",

			// Gold - Exp data
			gold_exp_data : "Podaci o Zlatu i Iskustvu ",
			gold_exp_data_today : "Zadnjih 24 sata",
			gold_exp_data_week : "Zadnjih 7 dana",
			gold_exp_data_avg_day : "Prosek po danu",
			gold_exp_data_to_level_up : "Preostalo dana do sljedećeg levela",
			gold_exp_data_package_tax : "Nedeljni gubitak zlata na pakiranje",
			gold_exp_data_measurements : "Measurements",
			gold_exp_data_total_exp : "Ukupno iskustva",
			gold_exp_data_total_gold : "Ukupno zlata",
		},

		// Overview
		overview : {
			// Stats Difference
			stats_difference : "Razlika",
			// Drop items to see materials to repair feature
			drop_item_see_materials_repair : "Prikaži materijale potrebne za popravku",
			workbench_6th_slot_empty : "Šesti prozor na radnom stolu mora biti prazan!",

			// More player info
			more_player_info : "Više informacija o igraču",
			can_use_max_item_level : "Može koristiti predmete do {{max}} levela.",
			can_see_market_max_item_level : "Može da vidi predmete na marketu do {{max}} levela.",
			can_see_auction_item_levels : "Može da vidi predmete na aukciji od {{min}} do {{max}} levela."
		},

		// Pantheon section
		pantheon : {
			// Mystery box
			mysterybox_open_all : "Otvori sve",
			mysterybox_open_stop : "Zaustavi",
			mysterybox_open_done : "Gotovo!"
		},

		// Guild section
		guild : {
			// Guild Bank
			bank_all_gold : "Dodaj sve svoje zlato",

			// Library
			library_per_point_cost : "Cena po bodu temeljnog",
			library_gold_left : "Preostalo savezno zlato nakon aktivacije",

			// Medic
			medic_lost_points : "Prazni životni bodovi",
			medic_points_to_heal : "Životnih bodova će biti izlječeno",
			medic_life_after_heal : "Životni bodovi nakon lječenja"
		},

		// Expedition
		expedition : {
			material_drop_chance : "{{number}}% šanse, između materijala za drop"
		},

		// Arena section
		arena : {
			global_arena_title : "Globalna Arena",
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
			player_tired : "You are tired. You need to rest."
		},

		// Training section
		training : {
			// Points analysis
			stats_points : "Stats Points",
			points_breakdown : "Points Breakdown",
			stats_calculated_with_yourself_as_an_opponent : "* Stats are calculated with the concept of attacking yourself.",
			// Cost calculator
			total_cost : "Ukupna cijena",
			// Discount show
			costs_discount : "Popust na cijenu treniranja: {{number}}%"
		},

		// Auction section
		auction : {
			// Info
			items_info : "Informacija o predmetu",
			// Number of items in the page
			number_of_items : "Broj predmeta : {{number}}",
			// Number of items that have been bidden in the page
			number_of_bided_items : "Broj ponuda na predmetima : {{number}}",
			// Message on items that you can buy and sell at the same price
			hide_your_gold_here : "Upakirajte zlato ovde",
			// Price of item equals to its value
			price_value_function : "Cena = Vrednost + {{number}}",
			// Levels you can see
			levels_you_can_see : "Možete videti predmete od {{min}} do {{max}} levela.",
		},

		// Markets section
		markets : {
			// Warnings
			item_cost_only_x_gold : "Ovaj predmet košta {{number}} zlata.",
			item_is_soulbound : "Ovaj predmet je povezan dušom.",
			item_cant_buy_back : "Nećete moći otkupiti ovaj predmet nazad.",
			// Are you sure
			are_you_sure_you_want_to_buy : "Da li ste sigurni da želite da kupite ovaj predmet?"
		},
		
		// Forge
		forge : {
			forge_ended : "Kovanje se završilo!",
			recraft_item : "Pokušaj kovanje ponovo",
			show_hide_doll : "Prikaži/Sakrij opremu gladiatora"
		},
		
		// Packages
		packages : {
			event_items : "Predmeti sa eventa",
			known_scroll : "Već ste naučili sadržaj ovog svitka",
			unknown_scroll : "Nemate naučen ovaj svitak",
			advance_filters : "Napredni filteri",
			advance_filters_apply : "Primeni filtere",
			advance_filters_clear : "Skloni filtere",
			advance_filters_found : "(found {{items}})"
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
			settings : "Postavke",
			// Description
			description : "Uključite ili isključite određene opcije addona.",
			description_click_button : "Pritisnite dugme ispod da odete na postavke addona...",
			
			// Categories
			category_global : "Globalno",
			category_overview : "Pregled",
			category_messages : "Poruke",
			category_packages : "Paketi",
			category_pantheon : "Panteon",
			category_reports : "Izveštaji",
			category_training : "Trening",
			category_merchants : "Prodavci",
			category_forge : "Kovačnica",
			category_arena : "Arena",
			category_magus : "Magus",
			category_market : "Market",
			category_expedition : "Ekspedicije",
			category_guild : "Savez",
			category_auction : "Aukcija",
			category_events : "Eventovi",
			category_sound : "Zvukovi",
			category_data : "Podaci",

			// Settings - Global
			category_global$language_select : "Odaberite jezik addona",
			category_global$sound_notifications : "Uključi zvučne notifikacije",
			category_global$browser_notifications : "Uključi browser notifikacije",
			category_global$extended_hp_xp_info : "Prikaži prošireno HP i XP zaglavlje",
			category_global$extended_hp_xp_info_potion : "Prikaži ikonicu za korišćenje napitka Života",
			category_global$hp_timer_for_full_life : "Prikaži preostale minute do regeneracije svih životnih bodova",
			category_global$expedition_dungeon_points_recover_timer : "Prikaži minute do regeneracije svih bodova za ekspedicije/tamnice",
			category_global$shortcuts_bar : "Uključi bar za prečice",
			category_global$shortcuts_bar_buttons : "Odaberite prečice za prikaz na baru za prečice",
			category_global$auction_status_bar : "Prikaži bar za status aukcije",
			category_global$auction_status_notification : "Obavijest pri promeni statusa aukcije",
			category_global$top_fixed_bar : "Uključi gornji fiksirani bar",
			category_global$advance_main_menu : "Poboljšaj glavni meni",
			category_global$submenu_click_to_change : "Promena pod-menija na klik",
			category_global$remember_tabs : "Zapamti aktivni prozor kod prodavca",
			category_global$attacked_timers : "Prikaži tajmere za napade",
			category_global$quest_timer : "Prikaži status zadataka ili tajmer",
			category_global$merchants_timer : "Prikaži vremenski indikator kod prodavca",
			category_global$forge_timers : "Prikaži indikator vremena kod kovačnice/talioničara",
			category_global$cooldown_sound_notifications : "Uključi zvučne notifikacije za hlađenje (ekspedicije, tamnica, arena)",
			category_global$notify_new_guild_application : "Obavijesti me kada ima nova savezna aplikacija",
			category_global$notify_new_guild_application_interval : "Proveravaj za novu saveznu aplikaciju svakih (minuta)",
			category_global$x_scroll : "Uključi gladiatusov horizontalni scroll",
			category_global$item_shadow : "Uključi senke predmeta",
			category_global$inventory_options_group : "Grupne postavke inventara",
			category_global$inventory_gold_info : "Prikaži vrednost predmeta u zlatu na trenutnoj torbi",
			category_global$pagination_layout : "Change pages-box's layout",
			category_global$gold_exp_data : "Prikaži podatke za zlato i iskustvo",
			category_global$pray_shorcut : "Prikaži prečicu za molitvu unutar Podzemlja",
			category_global$centurio_powerups_timers : "Prikaži trajanje Centuriona i Paktova na Premium dugmetu",
			category_global$show_durability : "Prikaži održavanje predmeta u donjem levom uglu predmeta",
			category_global$min_durability : "Notifikacija za predmete sa održavanjem+izdržljivosti ispod _% (pomeriti na 0 da bi isključili)",
			category_global$show_forge_info : "Prikaži resurse za popravku u informacijama predmeta",
			// Settings - Overview
			category_overview$analyze_items : "Analiziraj statove predmeta (potrebno radi treniranja)",
			category_overview$food_life_gain : "Prikaži koliko životnih bodova hrana daje",
			category_overview$block_avoid_caps : "Show block and Avoid caps",
			category_overview$best_food : "Označi najefikasniju hranu",
			category_overview$overfeed_food : "Izbledi hranu koja će vas previše izlečiti",
			category_overview$double_click_consume : "Klikni dva puta na predmet da ga iskoristiš",
			category_overview$daily_bonus_log : "Izveštaj o dnevnom login bonusu",
			category_overview$buffs_detailed_time : "Prikaži detaljne tajmere na saveznim pojačanjima",
			category_overview$mercenaries_manager : "Prikaži menadžment za plaćenike",
			category_overview$mercenary_tooltip_show : "Prikaži statove plaćenika",
			category_overview$more_statistics : "Prikaži više statova na dugmetu za statistike",
			category_overview$achivements_layout : "Poboljšaj izgleda prozora sa Pobjedama ",
			category_overview$costumes_layout : "Poboljšaj izgled prozora sa Kostimima",
			category_overview$items_repair_overview : "Show needed-materials-to-repair box",
			// Settings - Messages
			category_messages$messages_layout : "Poboljšaj izgled poruka",
			category_messages$show_unread : "Označi nepročitane poruke",
			category_messages$separate_days : "Odvoji poruke po različitim danima",
			category_messages$send_message_box : "Uključi kutiju za slanje poruke",
			category_messages$more_guild_mate_info : "Prikaži više informacija o saveznicima",
			category_messages$show_message_links : "Prikaži linkove unutar poruka",
			category_messages$get_guild_battle_info : "Automatski ucitaj rezultate saveznih borbi",
			category_messages$show_sidebar : "Prikaži sidebar za poruke",
			category_messages$fix_header_links : "Popravi bag sa linkovima unutar Predmeta poruke",
			category_messages$new_message_focus : "Fokus na telo poruke",
			category_messages$new_message_friend_list : "Uključi odabir prijatelja iz dugmeta za Listu prijatelja",
			// Settings - Packages
			category_packages$filters_layout : "Poboljšaj izgled filtera",
			category_packages$compact_info_layout : "Napravi sadržaj filtera kompaktan",
			category_packages$items_layout : "Poboljšaj izgled informacija o predmetu",
			category_packages$small_items_layout : "Smanji izgled predmeta u veličini unutar paketa",
			category_packages$load_more_pages : "Učitaj više stranica",
			category_packages$pages_to_load : "Broj stranica za učitavanje",
			category_packages$item_price : "Prikaži cenu predmeta",
			category_packages$special_category_features : "Uključi specijalne opcije po kategoriji",
			category_packages$double_click_open : "Klikni dva puta na paket da ga otvoriš",
			category_packages$advance_filter : "Napredni filteri za pakete",
			// Settings - Pantheon
			category_pantheon$quests_reorder : "Sortiraj zadatke po grupi",
			category_pantheon$quests_detailed_rewards : "Prikaži detaljnije nagradu za zadatak",
			category_pantheon$missions_show_completed : "Prikaži završene zadatke",
			category_pantheon$gods_show_points_percent : "Prikaži procenat milosti za bogove",
			category_pantheon$open_many_mysteryboxes : "Otvori više Kovčega Božanske sudbine",
			category_pantheon$show_mysterybox_rewards_rubies : "Prikaži vrednost nagrada unutar Kovčega Božanske sudbine u rubinima",
			category_pantheon$show_mysterybox_rewards_owned : "Prikaži broj vlastitih nagrada unutar Kočega Božanske sudbine",
			// Settings - Reports
			category_reports$style_change : "Poboljšaj izgled liste izveštaja",
			category_reports$load_loot_tooltips : "Učitaj nagradu svakog pojedinačnog izveštaja",
			category_reports$found_items : "Prikupljaj podatke o pronađenim predmetima",
			category_reports$battle_analyzer : "Analiziraj izveštaje i prikaži statistike o životnim bodovima",
			// Settings - Training
			category_training$show_discount : "Prikaži popust za treniranje",
			category_training$show_basics_in_bars : "Prikazi temeljne unutar barova",
			category_training$multiple_train : "Uključi višestruko treniranje odjednom",
			category_training$calculator_train : "Uključi kalkulator za cenu treniranja",
			category_training$show_analyze_items_data : "Prikaži analizirane podatke o predmetima unutar tooltipa",
			category_training$show_points_after_upgrade : "Prikaži vrednost temeljnih nakog poboljšanja",
			// Settings - Merchants
			category_merchants$fade_unaffordable_items : "Izbledi predmete koje ne možete kupiti",
			category_merchants$show_shop_info : "Prikaži informacije o prodavcu (ukupno zlata i rubina)",
			category_merchants$double_click_actions : "Dvoklik na predmete da ih kupimo/prodamo",
			// Settings - Forge
			category_forge$material_links : "[Kovačnica/Radni stol] Prikaži prečice za pakete i market za svaki potreban materijal",
			category_forge$show_levels : "[Kovačnica] Prikaži Prefix/Sufix/Osnovu nivo predmeta pored naziva",
			category_forge$horreum_materials_names : "[Horreum] Prikaži naziv materijala",
			category_forge$horreum_remember_options : "[Horreum] Zapamti podešavanja za pohranjivanje resursa unutar horreuma",
			category_forge$horreum_select_meterials : "[Horreum] Odaberi materijal na klik",
			// Settings - Arena
			category_arena$ignore_attack_confirmations : "Ignoriši obavijest o višestrukom napadu (poruka kada pokušamo da napadnemo istog igrača više od 5 puta)",
			category_arena$show_simulator_imagelink : "Prikaži an sliku sa linkom do simulatora (simulator.dinodevs.com)",
			category_arena$sort_by_lvl : "Prikaži protivnike u areni po levelu",
			category_arena$highlight_guild_members : "Označi igrače na drugim serverima koji su možda saveznici",
			category_arena$target_list : "Players target list",
			// Settings - Magus
			category_magus$fade_unimprovable_items : "Izbledi predmete koje ne možete poboljšati unutura Magusa",
			// Settings - Market
			category_market$soulbound_warning : "Potvrda prilikom kupovine predmeta povezanog dušom",
			category_market$one_gold_warning : "Potvrda prilikom kupovine predmeta koji košta 1 zlatnik",
			category_market$cancel_all_button : "Prikaži otkaži-sve dugme",
			category_market$remember_sell_duration : "Zapamti prethodno odabrano trajanje za prodaju",
			category_market$sell_duration : "Odaberi default dužinu prodaje",
			category_market$one_gold_mode : "Dugme za Uključi/Isključi prodaju predmeta za uvek 1 zlatnik",
			category_market$remember_sort : "Zapamti raspored poslednjeg sortiranja",
			category_market$double_click_select : "Selektuj predmete dvoklikom",
			category_market$sell_warning_icons : "Ikonica za upozorenje prilikom prodaje predmeta",
			// Settings - Expedition
			category_expedition$show_enemy_drops : "Prikaži materijale koji svaki neprijatelj može da baci",
			category_expedition$underworld_layout : "Prikaži  izgled menija neprijatelja unutar Podzemlja nalik na ekspedicije",
			// Settings - Guild
			category_guild$jail_layout : "Poboljšaj izgled Negotijuma",
			category_guild$library_layout : "Poboljšaj izgled knjižnice",
			category_guild$library_fade_non_scrolls : "Izbledi predmete koji nisu recepti unutar knjižnice",
			category_guild$library_tooltip_data : "Add more data on library's tooltips",
			category_guild$bank_donate_layout : "Poboljšaj izgled banke pri doniranju",
			category_guild$bank_book_layout : "Poboljšaj izgled knjige saveznih donacija",
			category_guild$medic_layout : "Poboljšaj izgled saveznog doktora",
			// Settings - Auction
			category_auction$items_counters : "Prebroj predmete i broj ponuda",
			category_auction$more_search_levels : "Prkaži više filtera za levele predmeta",
			category_auction$item_price_analyze : "Analiziraj cijene predmeta",
			category_auction$item_level : "Prikaži level predmeta",
			category_auction$x3_items_per_line : "Promeni izgled na po 3 predmeta po liniji",
			category_auction$multi_bids : "Stavi ponudu na predmet bez osvežavanja stranice",
			category_auction$extra_item_stats : "Prikaži dodatne statove na stranici sa predmetima",
			category_auction$save_last_state : "Implementiraj čuvanje poslednje pretrage po aukciji i učitaj je",
			// Settings - Events
			category_events$craps_timer : "Prikaži tajmer za kockice eventa",
			category_events$server_quest_timer : "Display server-quest or location event's timer on top",
			// Settings - Sound
			category_sound$enabled : "Uključi zvučni sistem",
			category_sound$muted : "Mutiraj/Unmutiraj zvukove",
			category_sound$volume : "Jačina zvuka",
			// Settings - Data
			category_data$export_settings : "Exportuj opcije podešavanja u fajl",
			category_data$import_settings : "Importuj podešavanja iz fajla",
			category_data$reset_settings : "Resetuj podešavanja addona",
			category_data$clear_data : "Obriši sve podatke addona",
			category_data$cross_browser_login : "Cross browser login sync",

			// Buttons
			save : "Sačuvaj",
			export : "Export",
			import : "Import",
			reset : "Resetuj",
			clear : "Obriši",
			do_not_show : "Ne prikazuj",
			show_as : "Prikaži kao",
			show_info : "Pokaži informacije",

			// Info
			translated_percent : "Preveden postotak: {{number}}%",
			translated_by : "Prevedeno od strane: {{string}}",
			reset_settings_confirm : "Da li ste sigurni da želite da resetujete podešavanja addona?",
			clear_data_confirm : "Da li ste sigurni da želite da obrišete prikupljene podatke addona?",
			data_exported_save_the_file : "Data were exported. Save the file.",

			// Notifications
			notification_reload : "Osvežite stranicu da primenite promene",
		}
	}
}

gca_languages._active = "hr";
