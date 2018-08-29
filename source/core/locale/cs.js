/*
 * Gladiatus Crazy Addon Translation
 * Name : Czech
 * Code : [none]
 * Tag  : cs
 * Translator: WiLLsTeiN, marekrich@seznam.cz, Alutom, bleakill.3607@gmail.com, Yenicheri, JAMES, Drnda3 [jpmaster38@gmail.com]
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages['cs'] = {
	name : 'čeština (Czech)',
	translators : ["WiLLsTeiN", "marekrich", "Alutom", "bleakill", "Yenicheri", "JAMES", "Drnda3"],
	locale : {
		info : {
			description : "Nejbláznivější add-on pro Gladiatus"
		},
		general : {
			days : "dny",
			minutes : "minut",
			no_data : "Nejsou vyplněny žádná hodnoty",
			confirm : "Potvrdit",
			cancel : "Zrušit",
			close : "Zavřít",
			error : "Chyba"
		},
		global : {
			life_potion_use : "Použijte lektvar života",
			life_potion_used : "Byl použit lektvar života",
			life_potion_left : "Nyní máš {{number}} léčivých lektvar(ů)",
			life_recover_full : "Plné životy se doplní",
			message_private_write : "Napsat soukromou zprávu",
			message_guild_write : "Napsat gildovní zprávu",
			message_send : "Odeslat",
			message_sent_success : "Gildovní zpráva byla odeslána",
			message_sent_failed : "Odesílání gildovní zprávy SELHALO",
			message_empty : "Gildovní zprávy jsou prázdné",
			message_exclude_me : "Vyloučit mne",
			guild_market_goto : "Gildovní tržiště",
			guild_storage_goto : "Skladiště",
			guild_bank_goto : "Banka",
			guild_warcamp_goto : "Síň mistra války",
			guild_jail_goto : "Negotium X",
			guild_library_goto : "Knihovna",
			guild_medic_goto : "Vila Medici",
			simulator_goto : "Simulátor",
			stats_display : "Ukaž mé staty",
			online_display : "Online hráči",
			online_friends : "Online přátelé",
			guild_friends : "Gildovní přátelé",
			family_friends : "Přátelé z Familie",
			donate_gold_confirm : "Opravdu chcete darovat {{number}} zlato?",
			donate_gold_success : "Tvé zlato bylo darováno",
			donate_gold_failed : "Darování tvého zlata SELHALO",
			donate_gold_no_gold : "Nemáš žádné zlato",
			donate_gold_all_gold : "Věnovat všechno zlato",
			quest_full : "Plné",
			quest_new : "Nové",
			pray_start : "Stiskněte pro začátek modlitby",
			pray_stop : "Stisknutím tlačítka přestanete se modlit",
			heal : "vyléčit",
			notification_guild_application : "Nová gildovní aplikace",
			low_durability_items : "Existují {{number}} položky s trvanlivostí pod {{percent}}%",
			gold_exp_data : "Zlato a Zkušenosti",
			gold_exp_data_today : "Posledních 24 hodin",
			gold_exp_data_week : "Posledních 7 dní",
			gold_exp_data_avg_day : "Průměrné denní hodnoty",
			gold_exp_data_to_level_up : "počet zbývajících dnů do levelu",
			gold_exp_data_package_tax : "Týdenní daň za ukádání do zásilek",
			gold_exp_data_measurements : "Měření",
			gold_exp_data_total_exp : "Celková zkušenost",
			gold_exp_data_total_gold : "Celkem zlato"
		},
		overview : {
			stats_difference : "Rozdíl",
			drop_item_see_materials_repair : "Položte položku a zobrazte materiály potřebné k její opravě",
			workbench_6th_slot_empty : "6. slot prac. stolu musí být prázdný"
		},
		pantheon : {
			mysterybox_open_all : "Otevřete vše",
			mysterybox_open_stop : "Stop",
			mysterybox_open_done : "Hotovo!"
		},
		guild : {
			bank_all_gold : "Přidej všechno zlato",
			library_per_point_cost : "Cena za bod schopnosti",
			library_gold_left : "Zůstatek zlata po aktivaci",
			medic_lost_points : "Ztracené body",
			medic_points_to_heal : "Body k vyléčení",
			medic_life_after_heal : "Životy po vyléčení"
		},
		expedition : {
			material_drop_chance : "{{number}}% šance, mezi získanými materiály"
		},
		training : {
			stats_points : "Body vlastností",
			points_breakdown : "Rozdělení bodů",
			stats_calculated_with_yourself_as_an_opponent : "* Vlastnosti jsou vypočítány pomocí konceptu napadání sebe sama",
			total_cost : "Celková cena",
			costs_discount : "Sleva na cvičení: {{number}}%"
		},
		auction : {
			items_info : "Informace o předmětech",
			number_of_items : "Počet předmětů : {{number}}",
			number_of_bided_items : "Počet nabídnutých předmětů : {{number}}",
			hide_your_gold_here : "Zde můžeš uložit zlato",
			price_value_function : "Cena = Hodnota + {{number}}",
			levels_you_can_see : "Vidíš předměty od úrovně {{min}} do úrovně {{max}}."
		},
		markets : {
			item_cost_only_x_gold : "Tento předmět stojí jen {{number}} zlata",
			item_is_soulbound : "Předmět má duševní pouto",
			are_you_sure_you_want_to_buy : "Vážně chceš koupit tento předmět?"
		},
		forge : {
			forge_ended : "Je potřeba kovárna!",
			recraft_item : "Znovu vykovat předmět"
		},
		packages : {
			event_items : "Eventový předmět",
			known_scroll : "Tento svitek už znáš",
			unknown_scroll : "Tento svitek ještě neznáš"
		},
		settings : {
			settings : "Nastavení",
			description : "Zapnout nebo vypnout vymoženosti addonu.",
			
			description_click_button : "Klikni na tlačítko k nastavení addonu",
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
			category_global$language_select : "Změn jazyk addonu",
			category_global$sound_notifications : "Povolit zvukové upozornění na výpravy, bludiště a arény",
			category_global$browser_notifications : "Povolit upozornění v prohlížeči",
			category_global$extended_hp_xp_info : "Zobraz rozšířené informace o HP a XP na liště",
			category_global$extended_hp_xp_info_potion : "Zobraz ikonu léčivého lektvaru",
			category_global$hp_timer_for_full_life : "Zobraz čas do plného uzdravení",
			category_global$shortcuts_bar : "Zobraz lištu",
			category_global$shortcuts_bar_buttons : "Vyber ikony do rychlého menu",
			category_global$auction_status_bar : "Zobrazit stav aukce",
			category_global$auction_status_notification : "Upozornit na změnu stavu aukce",
			category_global$top_fixed_bar : "Aktivovat horní rolující lištu",
			category_global$advance_main_menu : "Zlepšit hlavní menu",
			category_global$submenu_click_to_change : "Změna podmenu na kliknutí",
			category_global$remember_tabs : "Pamatovat záložky u obchodníků a v inventáři",
			category_global$quest_timer : "Zobrazit stav úkolů nebo časovač",
			category_global$merchants_timer : "Zobrazit čas obchodníků",
			category_global$forge_timers : "Zobrazit časový indikátor kovárny/tavírny",
			category_global$notify_new_guild_application : "Upozorni mě na novou přihlášku do gildy",
			category_global$notify_new_guild_application_interval : "Kontrolovat gildovní příhlášky každých (minut)",
			category_global$x_scroll : "Povolit horizontální posuv",
			category_global$item_shadow : "Povolit stínování předmětů",
			category_global$inventory_gold_info : "Zobrazit cenu předmětů v inventáři",
			category_global$pray_shorcut : "Zobrazovat v Podzemí ikonu modlení ",
			category_global$show_durability : "Zobrazit životnost předmětu v levém dolním rohu",
			category_overview$analyze_items : "Analizuj hráčovo předměty",
			category_overview$food_life_gain : "Zobrazit počet životů obdržený z jídla",
			category_overview$best_food : "Zvýraznit nejlepší jídlo",
			category_overview$overfeed_food : "Nechat zblednout jídlo, léčící více než je potřeba",
			category_overview$daily_bonus_log : "Denní přihlašovací bonus",
			category_overview$more_statistics : "Rozšířené zobrazení statů",
			category_messages$messages_layout : "Rozšířené zobrazení zpráv",
			category_messages$show_unread : "Zvýraznit nepřečtené zprávy",
			category_messages$new_message_focus : "Nastavit pozadí",
			category_messages$new_message_friend_list : "Povolit přátele ve zprávách",
			category_packages$pages_to_load : "maximum načtených stránek",
			category_packages$item_price : "Zobrazit cenu předmětů",
			category_pantheon$quests_reorder : "Povolit seskupování úkolů",
			category_pantheon$quests_detailed_rewards : "Zobrazit podrobné odměny z úkolu",
			category_pantheon$missions_show_completed : "Zobrazit dokončené mise",
			category_pantheon$gods_show_points_percent : "Zobrazit procenta bodů přízně",
			category_pantheon$open_many_mysteryboxes : "Otevřít vícero Truhel božího osudu",
			category_pantheon$show_mysterybox_rewards_rubies : "Zobrazit cenu odměn Truhly božího osudu v rubínech",
			category_reports$style_change : "Rozšířené zprávy z boje",
			category_reports$found_items : "Sbírat data o nalezených předmětech",
			category_training$show_discount : "Zobrazit slevu na cvičení",
			category_training$calculator_train : "Povolit kalkulačku ceny",
			category_merchants$fade_unaffordable_items : "Nechat vyblednou předměty na které nemám peníze",
			category_magus$fade_unimprovable_items : "Nechat vyblednout předměty, které nelze zdokonalit",
			category_market$soulbound_warning : "Potvrzení při koupi předmětů s duševním poutem",
			category_market$one_gold_warning : "Potvrzení při koupi předmětů, které stojí 1 zlaťák",
			category_market$cancel_all_button : "Zobrazit tlačítko pro zrušení všeho",
			category_market$remember_sell_duration : "Zapamatovat poslední zvolenou dobu prodeje",
			category_market$sell_duration : "Zvol výchozí dobu prodeje",
			category_market$one_gold_mode : "Nastavit výchozí cenu předmětu na 1 zlaťák",
			category_market$remember_sort : "Zapamatovat poslední zvolené seřazení",
			category_expedition$show_enemy_drops : "Zobrazit materiály padající z nepřátel",
			category_expedition$underworld_layout : "Zobrazit nepřátele v podzemí stejně jako u výprav",
			category_guild$jail_layout : "Zlepšit zobrazení Negotia X",
			category_guild$library_layout : "Zlepšit zobrazení knihovny",
			category_guild$bank_donate_layout : "Zlepšit zobrazení banky",
			category_guild$bank_book_layout : "Zlepšit zobrazení bankovní knihy darů",
			category_guild$medic_layout : "Zlepšit zobrazení medika",
			category_auction$items_counters : "Zobraz počet předmětů",
			category_auction$item_price_analyze : "Analyzovat ceny předmětů",
			category_auction$item_level : "Zobraz level itemu",
			category_auction$x3_items_per_line : "Zobrazení 3 itemů na řádek",
			category_auction$multi_bids : "Přihazovat na více předmětu před znovu načtením stránky",
			save : "Ulož vše",
			do_not_show : "Nezobrazovat",
			translated_percent : "Přeloženo: {{number}}%",
			translated_by : "Přeložil: {{string}}",
			reset_settings_confirm : "Opravdu chcete obnovit nastavení aplikace Addon?",
			clear_data_confirm : "Opravdu chcete vymazat všechna data addonu?",
			notification_reload : "Znovu načíst stránku pro projevení změn"
		}
	}
}

gca_languages._active = "cs";
