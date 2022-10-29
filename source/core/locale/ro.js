/*
 * Gladiatus Crazy Addon Translation
 * Name : Romanian (România)
 * Code : RO
 * Tag  : ro-RO
 * Translator: MrMitza, The Breaker
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages["ro"] = {

	// Language name
	name : "Romanian (România)",
	// Translators (authors of this script)
	translators : ["MrMitza", "The Breaker"],

	// Translations object
	locale : {
		// Addon info
		info : {
			description : "Cel mai nebunesc add-on făcut vreodată pentru Gladiatus!"
		},

		// General
		general : {
			// Days
			days : "zile",
			// Minutes
			minutes : "minute",
			// Hours
			hours : "ore",
			// No data
			no_data : "Nu există date",

			// Buttons
			confirm : "Confirmă",
			cancel : "Renunță",
			close : "Închide",
			error : "Eroare",
			yes : "Da",
			no : "Nu",
			ok : "OK"
		},

		// Global
		global : {
			// Use a life potion
			life_potion_use : "Folosește o Poţiune de Vindecare 100%",
			life_potion_used : "o Poţiune de Vindecare 100% a fost utilizată",
			life_potion_left : "Mai ai {{number}} Poțiuni de vindecare 100%",
			
			// Life/Expedition/Dungeon points recovery
			life_recover_full : "Vindecare completă în",
			expedition_recover_full : "Recuperare totală puncte de expediție",
			dungeon_recover_full : "Recuperare totală puncte de temniță",

			// Button bar - Message
			message_private_write : "Scrie mesaj privat",
			message_guild_write : "Scrie mesaj către breaslă",
			message_send : "Trimite",
			message_sent_success : "Mesajul a fost trimis cu succes",
			message_sent_failed : "Trimiterea mesajului a eșuat",
			message_empty : "Mesajul este gol",
			message_exclude_me : "Exclude-mă",

			// Button bar buttons
			guild_market_goto : "Mergi către piaţa breslei",
			guild_storage_goto : "Mergi către depozitul breslei",
			guild_bank_goto : "Mergi către banca breslei",
			guild_warcamp_goto : "Mergi către Sala Maestrului Războiului",
			guild_arenareports_goto : "Afișează rapoartele pentru arena breslei",
			guild_jail_goto : "Mergi către Negotium X – închisoarea breslei",
			guild_library_goto : "Mergi către biblioteca breslei",
			guild_templum_goto : "Mergi către templul breslei",
			guild_medic_goto : "Mergi către Villa Medici",
			simulator_goto : "Mergi la simulator",
			stats_display : "Afişează-mi statisticile",
			online_display : "Afişează jucătorii online",

			// Online friends
			online_friends : "Prieteni online",
			guild_friends : "Colegi de breaslă",
			family_friends : "Membrii Familiei",

			// Guild donate
			donate_gold_confirm : "Ești sigur(ă) că vrei să donezi {{number}} aur?",
			donate_gold_success : "Aurul a fost donat",
			donate_gold_failed : "Donarea aurului a eșuat",
			donate_gold_no_gold : "Nu există aur pentru donat",
			donate_gold_all_gold : "Donează tot aurul",

			// Quest timer
			quest_full : "Plin",
			quest_new : "Nou",

			// Pray icon
			pray_start : "Începe să te rogi",
			pray_stop : "Oprește-te din rugăciune",
			heal : "vindecă",

			// Notifications
			notification_guild_application : "Există o aplicație la breaslă!",
			notification_guild_attack_ready : "Breasla este gata pentru un nou atac!",
			low_durability_items : "Există {{number}} obiect(e) cu durabilitatea sub {{percent}}%",
			item_worth_rubies : "Acel obiect merită rubine!",

			// Gold - Exp data
			gold_exp_data : "Date despre aur și experiență",
			gold_exp_data_today : "Ultimele 24 de ore",
			gold_exp_data_week : "Ultimele 7 zile",
			gold_exp_data_avg_day : "Valoare medie pe zi",
			gold_exp_data_to_level_up : "Zile rămase până la următorul nivel",
			gold_exp_data_package_tax : "Aur cheltuit săptămânal cu taxa de pachete",
			gold_exp_data_measurements : "Statistici",
			gold_exp_data_total_exp : "Experiență totală",
			gold_exp_data_total_gold : "Aur total",
			
			mercenary_type : "Type: {{name}} ({{number}})"
		},

		// Overview
		overview : {
			// Stats Difference
			stats_difference : "Diferență",
			// Drop items to see materials to repair feature
			drop_item_see_materials_repair : "Trage un obiect pentru a vedea materialele necesare pentru reparație",
			workbench_6th_slot_empty : "Al 6-lea Banc de lucru trebuie să fie gol",

			// More player info
			more_player_info : "Mai multe informații despre jucător",
			can_use_max_item_level : "Poate utiliza obiecte până la nivelul {{max}}.",
			can_see_market_max_item_level : "Poate vedea obiecte la piața până la nivelul {{max}}.",
			can_see_auction_item_levels : "Poate vedea obiecte la licitație de la nivelul {{min}} până la nivelul {{max}}."
		},

		// Pantheon section
		pantheon : {
			// Mystery box
			mysterybox_open_all : "Deschide toate",
			mysterybox_open_stop : "Oprește",
			mysterybox_open_done : "Gata!"
		},

		// Guild section
		guild : {
			// Guild Bank
			bank_all_gold : "Adaugă tot aurul tău",

			// Library
			library_per_point_cost : "Cost de activare",
			library_gold_left : "Aurul rămas breslei, după activare",

			// Medic
			medic_lost_points : "Puncte pierdute",
			medic_points_to_heal : "Puncte de vindecare",
			medic_life_after_heal : "Viaţa după vindecare"
		},

		// Expedition
		expedition : {
			material_drop_chance : "{{number}}% șansă, între resursele posibile"
		},

		// Arena section
		arena : {
			global_arena_title : "Global Arena (Crazy Addon)",
			global_arena_description : "Aceasta este Arena Supremă, aici se adună Gladiatori din toată lumea! În această arenă, gladiatorii nu luptă pentru aur sau experiență, ci pentru un loc în Clasamentul Mondial!",
			global_arena_load : "Încarcă lista adversarilor",
			global_highscore : "Clasamentul Mondial",
			country : "Țara",
			server : "Server",
			target_list : "Lista adversarilor",
			target_list_add : "Adaugă la listă",
			target_list_remove : "Șterge din listă",
			error_sth_went_wrong : "Ceva nu a funcționat corect",
			error_response : "Server-ul a răspuns cu o eroare",
			error_blocked_access : "Ceva blochează accesul la server-ul GCA ({{url}})",
			error_connection : "Eroare de conexiune",
			attack_player : "Click pentru atac la “{{name}}”",
			fight_won : "Ai câștigat lupta!",
			fight_lost : "Ai pierdut lupta...",
			player_tired : "Ești obosit; trebuie să mai aștepți.",
			player1_hits_player2 : "{{name1}} lovește pe {{name2}}",
			player_takes_x_damage : "{{name}} primește {{number}} daune",
			player_dies : "{{name}} moare"
		},

		// Training section
		training : {
			// Points analysis
			stats_points : "Statistică Puncte",
			points_breakdown : "Desfășurarea Punctelor",
			stats_calculated_with_yourself_as_an_opponent : "* Statisticile sunt calculate în ideea atacului în care tu ești adversarul tău.",
			// Cost calculator
			total_cost : "Costuri Totale",
			// Discount show
			costs_discount : "Reducere costuri antrenamente: {{number}}%"
		},

		// Auction section
		auction : {
			// Info
			items_info : "Informații despre obiecte",
			// Number of items in the page
			number_of_items : "Numărul obiectelor : {{number}}",
			// Number of items that have been bidden in the page
			number_of_bided_items : "Numărul obiectelor licitate : {{number}}",
			// Message on items that you can buy and sell at the same price
			hide_your_gold_here : "Ascunde-ţi aurul aici",
			// Price of item equals to its value
			price_value_function : "Preţ = Valoare + {{number}}",
			// Levels you can see
			levels_you_can_see : "Poți vedea obiecte de la nivelul {{min}} până la nivelul {{max}}.",
			// Sort
			sort : "Sortează",
			sort_by : "Sortează după",
			sort_order : "Ordine",
			asc : "Crescător",
			desc : "Descrescător"
		},

		// Markets section
		markets : {
			/// Warnings
			item_cost_only_x_gold : "Acest obiect costă doar {{number}} aur.",
			item_is_soulbound : "Acest obiect este personalizat.",
			item_cant_buy_back : "Nu vei putea cumpara înapoi acest obiect.",
			// Are you sure
			are_you_sure_you_want_to_buy : "Ești sigur că vrei să cumperi acest obiect?",
			click_enter_to_sell : "Apasa tasta enter ⏎ pentru a vinde"
		},
		
		// Forge
		forge : {
			forge_ended : "Forja s-a încheiat!",
			recraft_item : "Re-forjează obiectul",
			show_hide_doll : "Arată/Ascunde echipamentul gladiatorului"
		},
		
		// Merchants
		merchants : {
			search_item_in_merchants : "Caută obiecte la negustori",
			no_such_item : "Nu s-a găsit nici un obiect."
		},
		
		// Packages
		packages : {
			event_items : "Obiecte de Eveniment",
			known_scroll : "Cunoști acest pergament",
			unknown_scroll : "Nu ai învățat acest pergament",
			advance_filters : "Filtre avansate",
			advance_filters_apply : "Aplică filtre",
			advance_filters_clear : "Șterge filtre",
			advance_filters_found : "(am găsit {{items}})"
		},
		
		// Report
		reports : {
			avg_damage : "Daună medie",
			avg_heal : "Vindecare medie",
			total_hits : "Total lovituri",
			hits : "Lovituri",
			dodge : "Evitări sau blocări",
			points : "Puncte"
		},

		// Cross-Browser Sync
		sync : {
			are_you_sure : "Ești sigur ca dorești să te loghezi ca jucătorul {{name}}?",
			gladiatus_crazy_addon_dependency : "Trebuie să ai instalat Gladiatus Crazy Addon pe celălalt browser.",
			how_to_sync_info : "Copiază url-ul și lipește-l în celălalt browser sau scanează codul QR."
		},

		// Settings
		settings : {
			// Settings
			settings : "Setări",
			// Description
			description : "Permite sau dezactiveaza caracteristicile addon-ului.",
			description_click_button : "Mergi la setările addon-ului...",
			
			// Categories
			category_global : "Setări Generale",
			category_overview : "Previzualizează setările",
			category_messages : "Mesaje",
			category_packages : "Pachete",
			category_pantheon : "Pantheon",
			category_reports : "Rapoarte",
			category_training : "Antrenamente",
			category_merchants : "Negustori",
			category_forge : "Forjă",
			category_arena : "Arenă",
			category_magus : "Magus Hermeticus",
			category_market : "Piață",
			category_expedition : "Expediții",
			category_guild : "Breaslă",
			category_auction : "Licitaţie",
			category_events : "Evenimente",
			category_sound : "Sunete",
			category_data : "Date",

			// Settings - Global
			category_global$language_select : "Alege limba interfeței addon-ului",
			category_global$browser_notifications : "Activează notificările în browser",
			category_global$extended_hp_xp_info : "Afişează informații liniare despre viaţă şi experienţă în antet",
			category_global$extended_hp_xp_info_potion : "Afișează scurtătura pentru poțiunea de vindecare 100%",
			category_global$hp_timer_for_full_life : "Afișează minutele rămase până la vindecarea completă",
			category_global$expedition_dungeon_points_recover_timer : "Afișează minutele rămase până la recuperarea totală a punctelor de expediție/temniță",
			category_global$shortcuts_bar : "Activează bara scurtăturilor",
			category_global$shortcuts_bar_buttons : "Alege scurtăturile pe care le dorești afișate în bară",
			category_global$auction_status_bar : "Afișează bara licitațiilor",
			category_global$auction_status_notification : "Notificare la schimbarea timpilor la licitații",
			category_global$top_fixed_bar : "Permite fixarea barei de informații in partea de sus",
			category_global$remember_tabs : "Revino la ultimul tab utilizat la negustori",
			category_global$attacked_timers : "Arată cronometre de protecție la atac",
			category_global$notify_new_guild_application : "Notifică-mă la apariția unei aplicații pentru breaslă",
			//category_global$check_guild_application_pinned_messages_interval : "Verifică pentru aplicații la fiecare (minutes)", // add pinned messages
			category_global$notify_guild_attack_ready : "Notifică-mă cand este posibil un atac cu breasla",
			category_global$notify_guild_attack_ready_interval : "Verifică timpul pentru un nou atac cu breasla la fiecare (minutes)",
			category_global$x_scroll : "Activează scroll-ul orizontal pentru Gladiatus",
			category_global$item_shadow : "Activează umbra la obiecte",
			category_global$inventory_options_group : "Grupează opțiunile pachetelor",
			category_global$inventory_gold_info : "Arată prețul în aur al obiectelor din pachete",
			category_global$pagination_layout : "Schimbă interfața modulelor paginii",
			category_global$gold_exp_data : "Afișează datele despre Aur și Experiență",
			category_global$pray_shorcut : "Afișează scurtătura pentru rugăciune, când te afli în Lumea de Dincolo",
			category_global$show_durability : "Afișează durabilitatea în colțul de stânga jos al obiectelor",
			category_global$min_durability : "Notificare pentru obiectele cu durabilitate & condiționare sub _% (mută la 0 pentru dezactivare)",
			category_global$show_forge_info : "Afișează informații despre resursele obiectului",
			category_global$show_mercenaries_real_name : "Afișează numele real al mercenarului (tipul) ca indiciu",
			category_global$global_arena_timer : "Afișează cronometrul pentru Arena Mondială",
			// Settings - Overview
			category_overview$analyze_items : "Analizează calitățile obiectelor (necesare pentru antrenament)",
			category_overview$food_life_gain : "Arată viața recâștigată prin mâncare",
			category_overview$block_avoid_caps : "Arată valorile pentru blocare și evitare",
			category_overview$best_food : "Indică mâncarea optimă",
			category_overview$overfeed_food : "Întunecă mâncarea care te va supra-vindeca",
			category_overview$double_click_consume : "Dublu click pe obiecte pentru a le consuma",
			category_overview$daily_bonus_log : "Bonusul zilnic de logare",
			category_overview$buffs_detailed_time : "Arată cronometre detaliate la săltările pentru breaslă",
			category_overview$mercenaries_manager : "Afișează managerul pentru mercenari",
			category_overview$mercenary_tooltip_show : "Arată indiciile pentru mercenari",
			category_overview$more_statistics : "Arată mai multe date în Tab-ul statisticilor",
			category_overview$achivements_layout : "Îmbunătățește interfața realizărilor",
			category_overview$costumes_layout : "Îmbunătățește interfața costumelor",
			category_overview$items_repair_overview : "Arată căsuța pentru materialele necesare reparării",
			// Settings - Main menu
			category_main_menu$advance_main_menu : "Îmbunătățește meniul principal",
			category_main_menu$submenu_click_to_change : "Submeniul se schimbă la click",
			category_main_menu$quest_timer : "Afișează timpul sau starea Misiunilor",		
			category_main_menu$centurio_powerups_timers : "Afișează cronometre pentru Cont Centurio & Pacte pe butonul Centurio",
			category_main_menu$forge_timers : "Afișează timpul pentru forje/topiri",
			category_main_menu$merchants_timer : "Afișează timpul pentru negustori",
			// Settings - Messages
			category_messages$messages_layout : "Îmbunătățește interfața mesajelor",
			category_messages$show_unread : "Indică mesajele necitite",
			category_messages$separate_days : "Separă mesajele din zile diferite",
			category_messages$more_guild_mate_info : "Arată informații despre colegii de breaslă",
			category_messages$show_message_links : "Afișează link-urile incluse în mesaje",
			category_messages$get_guild_battle_info : "Încarcă automat rezultatul luptelor cu breasla",
			category_messages$show_sidebar : "Afișează bara laterală pentru mesaje",
			category_messages$fix_header_links : "Repară bug-ul la click pe link în numele mesajului",
			category_messages$new_message_focus : "Setează focus instant pe conţinut",
			category_messages$new_message_friend_list : "Permite butonul de mesaj pentru lista prietenilor",
			// Settings - Packages
			category_packages$filters_layout : "Îmbunătățește interfața de filtrare",
			category_packages$compact_info_layout : "Compactează interfața de informații",
			category_packages$items_layout : "Îmbunătățește interfața obiectelor",
			category_packages$small_items_layout : "Micșorează obiectele",
			category_packages$load_more_pages : "Încarcă mai multe pagini",
			category_packages$pages_to_load : "Numărul paginilor de încărcat",
			category_packages$item_price : "Arată prețul obiectelor",
			category_packages$special_category_features : "Activează caracteristici speciale în fiecare categorie\n•Arată daca pergamentele sunt cunoscute/necunoscute\n•Arată pictograma pergamentului pe obiect dacă prefix-ul/suffix-ul sunt necunoscute",
			category_packages$double_click_open : "Dublu click pe pachete pentru a le deschide",
			category_packages$advance_filter : "Filtrare avansată a pachetelor",
			// Settings - Pantheon
			category_pantheon$quests_reorder : "Permite gruparea misiunilor",
			category_pantheon$quests_detailed_rewards : "Afișează detaliat recompensele misiunilor",
			category_pantheon$missions_show_completed : "Afișează misiunile completate",
			category_pantheon$gods_show_points_percent : "Arată procentul punctelor de la Zei",
			category_pantheon$open_many_mysteryboxes : "Deschide multiple cufere ale credinței divine",
			category_pantheon$show_mysterybox_rewards_rubies : "Afișează costul în rubine al cufărului credinței divine",
			category_pantheon$show_mysterybox_rewards_owned : "Arată totalul cuferelor credinței divine deținute",
			// Settings - Reports
			category_reports$style_change : "Îmbunătățește interfața listei rapoartelor",
			category_reports$load_loot_tooltips : "Încarcă recompensa fiecărui raport",
			category_reports$found_items : "Adună date despre obiectele găsite",
			category_reports$battle_analyzer : "Analizează raportul și arată statistici despre viață",
			// Settings - Training
			category_training$show_discount : "Afișează discontul pentru antrenamente",
			category_training$show_basics_in_bars : "Arată antrenamentele de bază în linie",
			category_training$multiple_train : "Activează multiplu pentru antrenamente",
			category_training$calculator_train : "Activează calculator pentru costuri",
			category_training$show_analyze_items_data : "Analizează obiectele jucătorului",
			category_training$show_points_after_upgrade : "Arată punctele după un viitor antrenament",
			// Settings - Merchants
			category_merchants$fade_unaffordable_items : "Intunecă obiectele pe care nu ți le poți permite",
			category_merchants$show_shop_info : "Arată informații de cumpărare (aur total și rubine)",
			category_merchants$double_click_actions : "Dublu click pentru vinderea/cumpărarea unui obiect",
			// Settings - Forge
			category_forge$material_links : "[Forjă/Banc de Lucru] Arată scurtături către pachete&piață pentru fiecare resursă necesară",
			category_forge$show_levels : "[Forjă] Arată Prefixul/Sufixul/Nivelul obiectului de bază lângă numele acestuia",
			category_forge$horreum_materials_names : "[Hambar] Afișează numele resursei",
			category_forge$horreum_remember_options : "[Hambar] Repetă ultimele setări de stocare",
			category_forge$horreum_select_meterials : "[Hambar] Alege resursa cu un click",
			// Settings - Arena
			category_arena$ignore_attack_confirmations : "Ignoră confirmarea de atac (mesajul de peste 5 atacuri etc.)",
			category_arena$show_simulator_imagelink : "Arată o imagine-link către simulator (simulator.dinodevs.com)",
			category_arena$sort_by_lvl : "Aranjează jucătorii în arenă în funcție de nivel",
			category_arena$highlight_guild_members : "Indică jucătorii de pe alte servere care ar putea fi membri ai breslei tale",
			category_arena$target_list : "Lista adversarilor țintă",
			// Settings - Magus
			category_magus$fade_unimprovable_items : "Întunecă obiectele pe care nu le poți îmbunătăți",
			// Settings - Market
			category_market$soulbound_warning : "Confirmare pentru cumpărarea obiectelor personalizate",
			category_market$one_gold_warning : "Confirmare pentru cumpararea obiectelor care costă 1 aur",
			category_market$cancel_all_button : "Arată butonul Anuleaza (toate)",
			category_market$remember_sell_duration : "Repetă ultima durată de vânzare aleasă",
			category_market$sell_duration : "Alege durata de vânzare favorită",
			category_market$one_gold_mode : "Afișează butonul de selecție pentru schimbarea prețului de vânzare cu 1 aur",
			category_market$remember_sort : "Repetă ultima ordine de sortare aleasă",
			category_market$double_click_select : "Alege obiectul cu dublu click",
			category_market$sell_warning_icons : "Pictogramă de atenționare când vinzi obiecte",
			category_market$sell_with_enter : "Vinde obiecte apăsând tasta ENTER ⏎",
			// Settings - Expedition
			category_expedition$show_enemy_drops : "Afișează resursele pe care le poate oferi fiecare adversar",
			category_expedition$underworld_layout : "Afișează interfața adversarilor din Lumea de Dincolo la fel  ca în cazul expedițiilor",
			// Settings - Guild
			category_guild$jail_layout : "Îmbunătățește interfața pentru Negotium X",
			category_guild$library_layout : "Îmbunătățește interfața pentru bibliotecă",
			category_guild$library_fade_non_scrolls : "Întunecă obiectele care nu sunt pergamente la Bibliotecă",
			category_guild$library_tooltip_data : "Adaugă mai multe date în indicațiile de la Biblioteca",
			category_guild$bank_donate_layout : "Îmbunătăţeşte interfaţa băncii",
			category_guild$bank_book_layout : "Îmbunătăţeşte interfaţa cărții de donații a băncii",
			category_guild$bank_book_show_changes : "Afișează variatiile donațiilor de la ultima vizită la cartea de donații a bancii",
			category_guild$medic_layout : "Îmbunătăţeşte interfaţa pentru Villa Medici",
			// Settings - Auction
			category_auction$items_counters : "Numără obiectele și obiectele deja licitate",
			category_auction$more_search_levels : "Arată mai multe nivele la opțiunile de căutare",
			category_auction$item_price_analyze : "Analizează prețul obiectelor",
			category_auction$item_level : "Arată nivelul obiectelor",
			category_auction$x3_items_per_line : "Schimbă interfața la 3 obiecte pe linie",
			category_auction$multi_bids : "Licitează mai multe obiecte fără a reîncărca pagina",
			category_auction$extra_item_stats : "Arată mai multe date în imaginile obiectelor",
			category_auction$save_last_state : "Căutarea la licitație odată salvată, va fi încărcată din start, data viitoare",
			// Settings - Events
			category_events$craps_timer : "Afișează deasupra, cronometrul evenimentului cu zaruri",
			category_events$server_quest_timer : "Afișează deasupra, cronometrul misiunilor pe server sau pe cel al locațiilor evenimentelor",
			// Settings - Sound
			category_sound$cooldown_sound_notifications : "Permite sunet de notificare pentru misiuni, temniţe şi arene",
			category_sound$muted : "Oprește/Pornește sunetul",
			category_sound$volume : "Volum sunet",
			// Settings - Data
			category_data$export_settings : "Exportă datele setărilor în fișier",
			category_data$import_settings : "Importă datele setărilor din fișier",
			category_data$reset_settings : "Resetează setările addon-ului",
			category_data$clear_data : "Șterge toate datele addon-ului",
			category_data$clear_cache_data : "Șterge datele cache ale addon-ului",
			category_data$cross_browser_login : "Sincronizare Logare între browsere",
			category_data$export_error_player_settings : "Exportă datele eronate ale setarilor în fișier",

			// Buttons
			save : "Salvează",
			export : "Exportă",
			import : "Importă",
			reset : "Resetează",
			clear : "Șterge",
			do_not_show : "Nu arăta",
			show_as : "Arată ca",
			show_info : "Afișează informația",
			each_category : "Rulează pe categoria țintă",
			all_category : "Rulează pe categoria țintă & toate",
			do_not_run : "Nu rula pe nimic",

			// Info
			translated_percent : "Procent traducere: {{number}}%",
			translated_by : "Traducator: {{string}}",
			reset_settings_confirm : "Ești sigur(ă) că vrei să resetezi setările addon-ului?",
			clear_data_confirm : "Ești sigur(ă) că vrei să ștergi toate datele addon-ului?",
			data_exported_save_the_file : "Datele au fost exportate. Salvează fișierul.",
			missing_translations : "Traducere lipsă",

			// Notifications
			notification_reload : "Reîncarcă pagina, pentru ca opţiunile să aibă efect"
		}
	}
}

gca_languages._active = "ro";
