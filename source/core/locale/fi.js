/*
 * Gladiatus Crazy Addon Translation
 * Name : Suomi (Finnish)
 * Code : FI
 * Tag  : fi-FI
 * Translator: Dalmore
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages["fi"] = {

	// Language name
	name : "Suomi (Finnish)",
	// Translators (authors of this script)
	translators : ["Dalmore"],

	// Translations object
	locale : {
		// Addon info
		info : {
			description : "The craziest add-on for Gladiatus ever!"
		},

		// General
		general : {
			// Days
			days : "päivä(ä)",
			// Minutes
			minutes : "minuuttia",
			// Hours
			hours : "tuntia",
			// No data
			no_data : "Ei dataa",

			// Buttons
			confirm : "Hyväksy",
			cancel : "Peruuta",
			close : "Sulje",
			error : "Error",
			yes : "Kyllä",
			no : "Ei",
			ok : "OK"
		},

		// Global
		global : {
			// Use a life potion
			life_potion_use : "Käytä elinvoimapullo",
			life_potion_used : "Elinvoimapullo käytetty",
			life_potion_left : "{{number}} elinvoimapulloa jäljellä",
			
			// Life/Expedition/Dungeon points recovery
			life_recover_full : "Täydet HP:t ajassa",
			expedition_recover_full : "Täydet tutkimusmatkapisteet ajassa",
			dungeon_recover_full : "Täydet vankityrmäpisteet ajassa",

			// Button bar - Message
			message_private_write : "Kirjoita yksityisviesti",
			message_guild_write : "Kirjoita kiltaviesti",
			message_send : "Lähetä",
			message_sent_success : "Viesti lähetetty",
			message_sent_failed : "Viestin lähetys epäonnistunut",
			message_empty : "Viesti on tyhjä",
			message_exclude_me : "Poislukien itseni",

			// Button bar buttons
			guild_market_goto : "Näytä killan tori",
			guild_storage_goto : "Näytä killan varasto",
			guild_bank_goto : "Näytä killan pankki",
			guild_baths_goto: "Näytä killan kylpylä",
			guild_warcamp_goto : "Näytä killan sotamestarin sali",
			guild_arenareports_goto : "Näytä kiltalaisten taisteluraportit",
			guild_jail_goto : "Näytä killan tyrmä",
			guild_library_goto : "Näytä killan kirjasto",
			guild_templum_goto : "Näytä killan temppeli",
			auction_food_goto : "Näytä ruuat huutokaupassa",
			guild_medic_goto : "Näytä killan lääkärit",
			simulator_goto : "Avaa taistelusimulaattori",
			stats_display : "Näytä statsini",
			online_display : "Näytä onlinessä olevat pelaajat",

			// Online friends
			online_friends : "Online pelaajat",
			guild_friends : "Kiltalaiset",
			family_friends : "Kaverilista",

			// Guild donate
			donate_gold_confirm : "Haluatko varmasti lahjoittaa {{number}} kultaa?",
			donate_gold_success : "Lahjoitus onnistunut",
			donate_gold_failed : "Lahjoitus epäonnistunut",
			donate_gold_no_gold : "Sinulla on 0 kultaa",
			donate_gold_all_gold : "Lahjoita kaikki kultasi",

			// Quest timer
			quest_full : "5/5",
			quest_new : "Uusi",

			// Pray icon
			pray_start : "Aloita rukoilu",
			pray_stop : "Lopeta rukoilu",
			heal : "Paranna",

			// Notifications
			notification_guild_application : "Kiltahakemus odottaa toimenpiteitä!",
			notification_guild_attack_ready : "Kiltahyökkäyksen odotusaika on ohi!",
			low_durability_items : "{{number}}:n varusteesi kunto on pudonnut alle {{percent}} prosentin",
			item_worth_rubies : "Tämä tavara maksaa rubiineja!",

			// Gold - Exp data
			gold_exp_data : "Kulta ja kokemus statistiikka",
			gold_exp_data_today : "Viimeiset 24 tuntia",
			gold_exp_data_week : "Viimeiset 7 päivää",
			gold_exp_data_avg_day : "Keskimäärin per päivä",
			gold_exp_data_to_level_up : "Päivää seuraavaan tasoon",
			gold_exp_data_package_tax : "Viikon torikulut",
			gold_exp_data_measurements : "Mitat",
			gold_exp_data_total_exp : "Kokemuspisteet yhteensä",
			gold_exp_data_total_gold : "Kultaa yhteensä",
			gold_exp_data_reset : "Statistiikat resetoitu!",
			gold_exp_data_desc: "Dataa kerätään joka viides minuutti. Kulta tulosi tuplaantuu, mikäli myyt jo ostamasi tavaran.",
			
			// Items
			// Mercenaries
			mercenary_type : "Tyyppi: {{name}} ({{number}})",
			gains_with_full_stats: "Vaikutus täysillä statseilla:",
			// Item materials
			base : "Esine",
			prefix : "Etuliite",
			suffix : "Loppuliite"
		},

		// Overview
		overview : {
			// Stats Difference
			stats_difference : "Erotus",
			// Drop items to see materials to repair feature
			drop_item_see_materials_repair : "Raahaa varuste nähdäksesi korjaukseen vaadittavat resurssit",
			workbench_6th_slot_empty : "Höyläpenkin 6. paikka tulee olla vapaana",

			// More player info
			more_player_info : "Lisätietoja pelaajasta",
			can_use_max_item_level : "Pystyy käyttämään areenoilla varusteita, joiden taso on maksimissaan {{max}}.",
			can_see_market_max_item_level : "Näkee torilla maksimissaan {{max}} tasoisia tavaroita.",
			can_see_auction_item_levels : "Näkee huutokaupassa {{min}} - {{max}} tasoiset tavarat."
		},

		// Pantheon section
		pantheon : {
			// Mystery box
			mysterybox_open_all : "Avaa kaikki",
			mysterybox_open_stop : "Pysäytä",
			mysterybox_open_done : "Valmis!"
		},

		// Guild section
		guild : {
			// Guild Bank
			bank_all_gold : "Kaikki kultasi",
			total_donations: "Lahjoitukset yhteensä",
			min_upgrades_gold: "Kultaa käytetty rakennuksiin (minimissään)",
			max_stolen_gold: "Kultaa ryöstetty muilta killoilta (maksimissaan)",

			// Library
			library_per_point_cost : "Hinta per yksikkö",
			library_gold_left : "Pankissa rahaa aktivoimisen jälkeen",

			// Medic
			medic_lost_points : "Menetettyä elinvoimaa",
			medic_points_to_heal : "Lääkärin parannusteho",
			medic_life_after_heal : "Elinvoima lääkärin jälkeen",

			// Baths
			pinned_message : "Kiinnitetty kiltaviesti",
			pin_unpin_message : "Kiinnitä/poista kiinnitys",
			pinned_message_info : "Kiinnitetyt viestit näkyvät ylimpänä kaikille niille, jotka käyttävät tätä toimintoa",
			
			// Important ranks button
			important_ranks : "Mestari+Ylläpito"
		},

		// Expedition
		expedition : {
			material_drop_chance : "{{number}}% mahdollisuus, suhteessa kaikkiin pudonneisiin resursseihin"
		},

		// Arena section
		arena : {
			global_arena_title : "Global Arena",
			global_arena_description : "Tällä areenalla on kaikki Addonin asentaneet. Täällä ei taistella rahan tai kokemuspisteiden perässä, vaan paikasta maailman huipulla!",
			global_arena_load : "Lataa viholliset uudelleen",
			global_highscore : "Global Highscore",
			country : "Maa",
			server : "Serveri",
			target_list : "Haastolista",
			target_list_add : "Lisää haastolistalle",
			target_list_remove : "Poista haastolistalta",
			error_sth_went_wrong : "Jotain meni pieleen",
			error_response : "Palvelin sanoo: ERROR",
			error_blocked_access : "Jokin estää yhteyden GCA palvelimelle ({{url}})",
			error_connection : "Yhteysvirhe",
			attack_player : "Klikkaa hyökätäksesi “{{name}}”",
			fight_won : "Voitit taistelun!",
			fight_lost : "Hävisit taistelun...",
			player_tired : "Olet uupunut, joudut vielä odottamaan.",
			player1_hits_player2 : "{{name1}} lyö {{name2}}",
			player_takes_x_damage :"{{name}} vastaanottaa {{number}} vauriota",
			player_dies :"{{name}} kuolee"
		},

		// Training section
		training : {
			// Points analysis
			stats_points : "Kykypisteet",
			points_breakdown : "Kykypisteiden vaikutus",
			points_breakdown_damage : "Vaurio: +{{integer}} (+{{float}})",
			points_breakdown_block : "Torjunta: +{{integer}}% (+{{float}}%)",
			points_breakdown_block_max : "Torjunta: max arvo",
			points_breakdown_block_short : "Torjunta: +{{integer}}%",
			points_breakdown_normal_hit : "Osumis mahdollisuus: +{{integer}}% (+{{float}}‰) *",
			points_breakdown_critical_hit : "Mahdollisuus kriittiseen iskuun: +{{integer}}% (+{{float}}‰)",
			points_breakdown_critical_hit_short : "Kriittinen isku: +{{integer}}%",
			points_breakdown_double_hit : "Mahdollisuus tuplaiskuun: +{{integer}}% (+{{float}}‰) *",
			points_breakdown_double_hit_factor : "Arvo tuplaiskulle: {{number}}",
			points_breakdown_avoid_double_hit_factor : "Arvo välttää tuplaiskuja: {{number}}",
			points_breakdown_avoid : "Välttää kriittisia iskuja mahdollisuus: +{{integer}}% (+{{float}}‰)",
			points_breakdown_avoid_max : "Välttää kriittisiä iskuja mahdollisuus: maximi arvo",
			points_breakdown_avoid_short : "Välttää kriittinen isku: +{{integer}}%",
			points_breakdown_enemy_normal_hit : "Vihollisen osumis mahdollisuus: {{integer}}% ({{float}}‰) *",
			points_breakdown_enemy_double_hit : "Vihollisen tuplaisku mahdollisuus: {{integer}}% ({{float}}‰) *",
			points_breakdown_life : "Elinvoimaa: +{{number}}",
			points_breakdown_regeneration : "Palautuminen tunnissa: +{{number}}",
			points_breakdown_threat : "Uhka: +{{integer}} (+{{float}})",
			points_breakdown_heal : "Parantaminen: +{{integer}} (+{{float}})",
			points_breakdown_critical_heal : "Kriittinen parantaminen: +{{integer}}% (+{{float}}‰)",
			points_breakdown_critical_heal_max : "Kriittinen parantaminen: maximi arvo",
			stats_calculated_with_yourself_as_an_opponent : "* Statsit ovat laskettu siten, että hyökkäisit pelaajaan jolla identtiset statsit verrattuna itseesi.",
			values_in_parenthesis_explanation : "Suluissa olevat arvot näyttävät vastaavat arvot ennen pyöristystä.",
			// Cost calculator
			total_cost : "Hinta yhteensä",
			// Discount show
			costs_discount : "Alennus harjoittelusta: {{number}}%"
		},

		// Auction section
		auction : {
			// Info
			items_info : "Tietoa sivun esineistä",
			// Number of items in the page
			number_of_items : "Esineiden määrä : {{number}}",
			// Number of items that have been bidden in the page
			number_of_bided_items : "Esineitä, joista jo huudettu tarjous : {{number}}",
			// Message on items that you can buy and sell at the same price
			hide_your_gold_here : "Kultakätkö",
			// Price of item equals to its value
			price_value_function : "Hinta = Arvo + {{number}}",
			// Levels you can see
			levels_you_can_see : "Näet esineet joiden taso on {{min}} - {{max}}.",
			// Sort
			sort : "Lajittele",
			sort_by : "Lajitteluperuste",
			sort_order : "Järjestys",
			asc : "Nouseva",
			desc : "Laskeva"
		},

		// Markets section
		markets : {
			// Warnings
			item_cost_only_x_gold : "Tämä esine maksaa vain {{number}} kullan.",
			item_is_soulbound : "Tämä on soulbound esine.",
			item_cant_buy_back : "Et pysty ostamaan tätä esinettä takaisin.",
			// Are you sure
			are_you_sure_you_want_to_buy : "Haluatko varmasti ostaa tämän esineen?",
			click_enter_to_sell : "Paina enter ⏎ myydäksesi",
			// Tooltips
			add_fees_in_price : "Lisää torikulut hintaan",
		},
		
		// Forge
		forge : {
			forge_ended : "Takominen päättynyt!",
			recraft_item : "Tao uudelleen",
			show_hide_doll : "Näytä/piilota palkkasoturi ukot",
			horreum_material_change : "Horrelum resurssi vaihto",
		},
		
		// Merchants
		merchants : {
			search_item_in_merchants : "Salli esineiden etsiminen sepiltä",
			no_such_item : "Esineitä ei löytynyt."
		},
		
		// Packages
		packages : {
			event_items : "Tapahtumaesineet",
			known_scroll : "Jo opeteltu käärö",
			unknown_scroll : "Opettelematon käärö",
			advance_filters : "Erikoissuodattimet",
			advance_filters_apply : "Hyväksy",
			advance_filters_clear : "Nollaa",
			advance_filters_found : "(Löytyi {{items}} esinettä)"
		},
		
		// Report
		reports : {
			avg_damage : "vaurion keskiarvo",
			avg_heal : "keskiarvo parantaminen",
			total_hits : "osumia yhteensä",
			hits : "osumaa",
			dodge : "väistetty",
			points : "pistettä"
		},

		// Cross-Browser Sync
		sync : {
			are_you_sure : "Haluatko varmasti kirjautua pelaajana {{name}}?",
			gladiatus_crazy_addon_dependency : "Sinulla täytyy olla asennettuna CGA toisessa selaimessa.",
			how_to_sync_info : "Kopioi URL ja liitä se toisella selaimella, tai skannaa QRKoodi."
		},

		// Settings
		settings : {
			// Settings
			settings : "Asetukset",
			// Description
			description : "Salli tai poista addonin ominaisuuksia.",
			description_click_button : "Mene addonin asetuksiin painamalla Asetukset -nappia",
			
			// Categories
			category_global : "Yleiset",
			category_overview : "Yleiskatsaus",
			category_messages : "Viestit",
			category_packages : "Paketit",
			category_pantheon : "Pantheon",
			category_reports : "Taisteluraportit",
			category_training : "Harjoittelu",
			category_merchants : "Sepät",
			category_forge : "Takomo",
			category_arena : "Areenat",
			category_magus : "Magus",
			category_market : "Tori",
			category_expedition : "Tutkimusmatka",
			category_guild : "Kilta",
			category_auction : "Huutokauppa",
			category_accessibility : "Värisokeus",
			category_events : "Tapahtumat",
			category_sound : "Äänet",
			category_data : "Data",

			// Settings - Global
			category_global$language_select : "Addonissä käytettävä kieli",
			category_global$browser_notifications : "Salli selaimen ilmoitukset",
			category_global$extended_hp_xp_info : "Näytä hp/exp numeroina (päänäkymä vasen ylänurkka)",
			category_global$extended_hp_xp_info_potion : "Näytä 100% parannusjuoma kuvake/pikavalinta (päänäkymä vasen ylänurkka)",
			category_global$hp_timer_for_full_life : "Näytä täysiin elinvoimiin palautumisaika (hiiri elinvoiman päälle)",
			category_global$expedition_dungeon_points_recover_timer : "Näytä tutkimusmatka/vankityrmä palautumisaika täysiin pisteisiin (hiiri tutkimusmatka logon päälle)",
			category_global$shortcuts_bar : "Näytä pikavalinta logorivi yläpalkissa",
			category_global$shortcuts_bar_buttons : "Valitse yläpalkin pikavalinnat",
			category_global$auction_status_bar : "Näytä huutokauppojen ajat oikeassa ylänurkassa",
			category_global$auction_status_notification : "Huomautusääni huutokaupan tilan muuttuessa",
			category_global$top_fixed_bar : "Näytä yläpalkki myös scrollatessa (testaa scrollaa alas)",
			category_global$remember_tabs : "Muista seppien viimeksi auki ollut sivu",
			category_global$attacked_timers : "Näytä omat areena suoja-aikasi",
			category_global$notify_new_guild_application : "Anna ilmoitus killan hakemuksista",
			category_global$check_guild_pinned_message : "Näytä kylpylän kiinnitetyt viestit myös viesteissäsi",
			category_global$check_guild_application_pinned_messages_interval : "Kuinka usein uudet kiltahakemukset + viestit päivitetään",
			category_global$notify_guild_attack_ready : "Anna ilmoitus kun kiltahyökkäys odotusaika on ohi",
			category_global$notify_guild_attack_ready_interval : "Kuinka usein kiltahyökkäys ajat päivitetään",
			category_global$x_scroll : "Salli vaakataso scrollaus",
			category_global$item_shadow : "Esineiden laadun väriset varjot",
			category_global$inventory_options_group : "Piilota reppusi asetukset hammasrattaan taakse",
			category_global$inventory_gold_info : "Näytä repun sivun esineiden arvo yhteensä",
			category_global$pagination_layout : "Parannettu sivunumeroiden ulkonäkö",
			category_global$gold_exp_data : "Näytä kulta/kokemus statistiikat",
			category_global$pray_shorcut : "Näytä rukoilun pikakuvake tuonelassa",
			category_global$show_durability : "Näytä esineen kunto esineen vasemmassa alalaidassa",
			category_global$min_durability : "Anna ilmoitus esineiden kulumisesta, kun Kestävyys+Kunnostus yht:",
			category_global$show_forge_info : "Näytä esineen takomismateriaalit kun hiiren vie esineen päälle",
			category_global$show_mercenaries_real_name_and_combat_stats : "Näytä palkkasoturin lisätietoja (hiiri päälle)",
			category_global$show_upgrade_values : "Näytä kaikki väliaikaisetkin boostit siunausrivillä",
			category_global$global_arena_timer : "Näytä Global arena ajastin",
			category_global$gladiatus_site_fixes : "Korjaa gladiatuksen omia sivuston tyyliasetuksia/virheitä",
			category_global$lock_section_visibility : "Lukitse nykyinen valinta piilotettavista lisätiedoista (estä näyttäminen/piilottaminen painamalla otsikkoa)",
			category_global$hide_language_flags : "Piilota maaliput pelaajien nimien perästä",
			// Settings - Overview
			category_overview$analyze_items : "Näytä statsista lisätietoa",
			category_overview$food_life_gain : "Näytä ruokien parannusarvo",
			category_overview$block_avoid_caps : "näytä torjunta/kriittinen isku maximiarvot lisätiedoissa (hiiri esim panssarin päälle)",
			category_overview$best_food : "Korosta suositeltua ruokaa",
			category_overview$overfeed_food : "Haalenna ruuat, joista enemmän elinviomaa kuin tarvitset",
			category_overview$double_click_consume : "Syö ruoka kaksoisklikkaamalla",
			category_overview$daily_bonus_log : "Pidä lokia päivittäisistä kirjautumisbonuksista (yleiskatsaus, sivun alareuna)",
			category_overview$buffs_detailed_time : "Näytä killan boostien tarkka kesto viemällä hiiri boostin päälle",
			category_overview$mercenaries_manager : "Näytä palkkasoturi hallintamenu (turmaukkosi sivulla)",
			category_overview$mercenary_tooltip_show : "Näytä palkkasoturin infokuvake sen hahmon sivulla",
			category_overview$more_statistics : "Näytä statistiikat sivulla lisää statistiikkoja",
			category_overview$achivements_layout : "Paranneltu voitot-näkymä",
			category_overview$costumes_layout : "Parannellut asusteet",
			category_overview$items_repair_overview : "Näytä korjaukseen vaadittavien resurssien määrät",
			// Settings - Main menu
			category_main_menu$advance_main_menu : "Näytä päävalikon lisäpikavalinnat",
			category_main_menu$submenu_click_to_change : "Vaadi klikkaus alavalikkojen avaamiseksi (testaa vasen päävalikko)",
			category_main_menu$quest_timer : "Näytä tehtävien odotusaika",	
			category_main_menu$centurio_powerups_timers : "Näytä centurio/siunaus ajat Premium napin yhteydessä (hiiri päälle)",
			category_main_menu$forge_timers : "Näytä ilmoitus takomon/sulaton valmistumisista. Näytä sulaton/takomon odotusajat (vihreä/punainen pallo takomon vasemmalla puolella)",
			category_main_menu$merchants_timer : "Näytä seppien odotusajat (vihreä/punainen pallo sepälistan vasemmalla puolella)",
			// Settings - Messages
			category_messages$messages_layout : "Paranneltu viestinäkymä",
			category_messages$show_unread : "Korosta lukemattomat viestit",
			category_messages$separate_days : "Erota viestit vuorokausilla",
			category_messages$more_guild_mate_info : "Näytä kiltalaisista lisäinfoa",
			category_messages$show_message_links : "Näytä linkit viesteissä",
			category_messages$get_guild_battle_info : "Lataa automaattisesti kiltasotien tulokset",
			category_messages$show_sidebar : "Näytä viesteissä sivupalkki",
			category_messages$fix_header_links : "Korjaa viestinkirjoitus bugi",
			category_messages$new_message_focus : "Korjaa bugi (viestinkirjoituksessa kohdistetaan kirjoituskenttään, ei otsikkoon)",
			category_messages$new_message_friend_list : "Näytä kaverilista viestinkirjoitussivulla",
			// Settings - Packages
			category_packages$filters_layout : "Paranneltu suodatinvalikoima",
			category_packages$small_items_layout : "Pienennä esineiden kokoa",
			category_packages$items_layout : "Paranna esineiden järjestystä:",
			category_packages$compact_info_layout : "Tiivistetty",
			category_packages$list_view_layout : "Listanäkymä",
			category_packages$load_more_pages : "Lataa useita sivulle yhdelle sivulle",
			category_packages$pages_to_load : "Sivujen lukumäärä yhdellä sivulla",
			category_packages$item_price : "Näytä esineiden arvo",
			category_packages$special_category_features : "Näytä lisätietona onko käärö opeteltu\n•Näyttää onko käärö opeteltu vai ei\n•Näyttää käärön kuvakken esineen päällä, mikäli varusteen etu ja/tai loppuliite on opettelematta",
			category_packages$double_click_open : "Kaksoisklikkaa pakettia siirtääksesi sen taskuusi",
			category_packages$advance_filter : "Näytä erikoissuodattimet",
			category_packages$pop_over_bag : "Näytä reppusi, jos scrollatessasi alas reppu muuten jäisi näkymättömiin",
			category_packages$packages_shortcuts : "Näytä esineiden tyyppikategoriat pikanäppäiminä ylhäällä",
			// Settings - Pantheon
			category_pantheon$quests_reorder : "Salli tehtävien ryhmittely (areenatehtävät allekkain jne)",
			category_pantheon$quests_detailed_rewards : "Näytä tehtävien palkintojen lisätiedot",
			category_pantheon$missions_show_completed : "Show completed missions",
			category_pantheon$gods_show_points_percent : "Näytä jumalten pisteet myös prosentteina",
			category_pantheon$open_many_mysteryboxes : "Näytä lisävalinta kaikkien arkkujen avaamisesta kerrallaan",
			category_pantheon$show_mysterybox_rewards_rubies : "Näytä palkintojen hinnat rubiineissa",
			category_pantheon$show_mysterybox_rewards_owned : "Näytä palkintojen varastosaldosi",
			// Settings - Reports
			category_reports$style_change : "Paranneltu näkymä tutkimusmatkaraporteissa",
			category_reports$load_loot_tooltips : "Näytä pudonneet esineet raporttinäkymässä",
			category_reports$found_items : "Salli kerätä dataa pudonneista esineistä (jotta esim näet tutkimusmatkavihollisista mitä resurssia pudottanut)",
			category_reports$battle_analyzer : "Analysoi turma taisteluraportit ja näytä lisätietoa",
			// Settings - Training
			category_training$show_discount : "Näytä harjoittelun alennuslaskuri",
			category_training$show_basics_in_bars : "Näytä kykyjen perusarvot palkkina",
			category_training$multiple_train : "Salli useamman kuin yhden tason harjoittelu kerrallaan",
			category_training$calculator_train : "Näytä kululaskuri",
			category_training$show_analyze_items_data : "Näytä extra lisätietoja kun hiiri jonkin taidon päällä",
			category_training$show_points_after_upgrade : "Päivitä treenattu pinna heti ruudullesi",
			// Settings - Merchants
			category_merchants$fade_unaffordable_items : "Hallenna esineet, joihin sinulla ei ole varaa",
			category_merchants$ruby_icon_on_items : "Lisää rubiinin kuva esineisiin, jotka maksavat rubiineita",
			category_merchants$show_shop_info : "Näytä kaupan info (esineiden hinta yht rubiineissa & kultana)",
			category_merchants$double_click_actions : "Kaksoisklikkaa esinettä myydäksesi/ostaaksesi",
			// Settings - Forge
			category_forge$material_links : "[Takomo ja höyläpenkki] Näytä pikalinkit tarvittaviin resursseihin (paketit, tori, kiltaviesti)",
			category_forge$show_levels : "[Takomo] Näytä tasot etuliitteen/loppuliitteen/esineen tyypin nimen perässä (valitessasi mitä taot)",
			category_forge$horreum_materials_names : "[Horreum] Näytä resurssien nimet kuvakkeen perässä",
			category_forge$horreum_remember_options : "[Horreum] Muista asetukset",
			category_forge$horreum_select_meterials : "[Horreum] Valitse materiaali klikkaamalla",
			// Settings - Arena
			category_arena$ignore_attack_confirmations : "Ohita hyökkäys vahvistukset (yli 5 hyökkäyksen jälkeen)",
			category_arena$show_simulator_imagelink : "Näytä kuvalinkki simulaattoriin (simulator.dinodevs.com)",
			category_arena$sort_by_lvl : "Lajittele pelaajat tasojärjestyksessä",
			category_arena$highlight_guild_members : "Korosta muiden serverien pelaajat, joilla sama nimi, kuin omalla kiltalaisellasi",
			category_arena$target_list : "Käytä haastolistaa (Yleiskatsaus -> Kaverilista -> Haastolista)",
			// Settings - Magus
			category_magus$fade_unimprovable_items : "Haalista esineet, joiden väriä ei voi parantaa",
			// Settings - Market
			category_market$soulbound_warning : "Vahvistuskysymys ostaessasi soulbound esineen",
			category_market$one_gold_warning : "Vahvistuskysymys ostaessasi esineen 1 kullalla",
			category_market$cancel_all_button : "Näytä \"Peruuta kaikki\" -nappi",
			category_market$remember_sell_duration : "Muista viimeisin myyntiaika",
			category_market$add_fees_button : "Näytä [+] -nappi jolla voit lisätä torikulut myyntihintaan",
			category_market$sell_duration : "Valitse oletus myyntiaika",
			category_market$one_gold_mode : "Näytä hintavaihtoehdot (Auto, 1 kulta, Arvo)",
			category_market$custom_prices : "Lisää kustomoituja hintavaihtoehtoja (esim 10000, 1000000, 100% tai 200%)",
			category_market$remember_sort : "Muista edellinen järjestys (esim hinnan tai myyntiajan mukaan)",
			category_market$double_click_select : "Valitse esine kaksoisklikkaamalla",
			category_market$sell_warning_icons : "Warning icon when selling items",
			category_market$sell_with_enter : "Myy esine painamalla Enter",
			// Settings - Expedition
			category_expedition$show_enemy_drops : "Näytä takomisresurssit joita vihollinen pudottaa",
			category_expedition$underworld_layout : "Järjestä tuonelan viholliset tutkimusmatkavihollisten tapaan",
			// Settings - Guild
			category_guild$jail_layout : "Paranneltu tyrmä näkymä",
			category_guild$library_layout : "Paranneltu kirjastonäkymä",
			category_guild$library_fade_non_scrolls : "Himmennä repustasi kaikki muut esineet, paitsi reseptit",
			category_guild$library_tooltip_data : "Reseptien lisätiedot (hinta per yksikkö ym.)",
			category_guild$bank_donate_layout : "Paranneltu lahjoitusnäkymä (ensimmäinen välilehti)",
			category_guild$bank_book_layout : "Paranneltu lahjoituskirjanäkymä (toinen välilehti)",
			category_guild$bank_book_show_changes : "Näytä uudet lahjoitukset (sitten viime kerran, kun luit lahjoituskirjaa)",
			category_guild$medic_layout : "Parannettu ulkoasu killan lääkärissä",
			// Settings - Auction
			category_auction$items_counters : "Näytä lisää tietoa sivun esineistä (esineiden+huudettujen määrät)",
			category_auction$more_search_levels : "Laajennettu levusuodatin (enemmän vaihtoehtoja)",
			category_auction$item_price_analyze : "Analysoi esineen hintaa",
			category_auction$item_level : "Näytä esineen taso",
			category_auction$item_name : "Näytä esineen nimi",
			category_auction$x3_items_per_line : "Muuta ulkonäköä - esineet kolmessa pystyrivissä kahden sijaan",
			category_auction$multi_bids : "Estä sivun päivitys huutojen välissä - helpottaa useiden huutojen tekemistä",
			category_auction$extra_item_stats : "Näytä ruokien kuvakkeen alla parannusvoima (ja elinvoima/kulta suhde)",
			category_auction$save_last_state : "Muista huutokaupan asetukset",
			// Settings - Accessibility
			category_accessibility$white_level_indicators : "Muuta esineiden tason fontti valkoiseksi",
			category_accessibility$qualty_symbols_indicators : "Lisää laatusymbolit esineiden kuvakkeeseen",
			category_accessibility$tooltips_qualty_white : "Muuta teksti valkoiseksi (esineen tiedot)",
			category_accessibility$tooltips_qualty_symbols : "Lisää laatusymbolit esineen tietoihin",
			// Settings - Events
			category_events$craps_timer : "Näytä arpakuutio -tapahtuman ajastin tapahtuman alla",
			category_events$server_quest_timer : "Näytä erikoistapahtumien ajastin tapahtuman alla",
			// Settings - Sound
			category_sound$cooldown_sound_notifications : "Odotusaikojen huomioäänet (Tutkimusmatkat, vankityrmät, areenat)",
			category_sound$muted : "Mykistä/Salli äänet",
			category_sound$volume : "Äänenvoimakkuus",
			// Settings - Data
			category_data$export_settings : "Vie/lataa asetukset tiedostoon",
			category_data$import_settings : "Tuo asetukset tiedostosta",
			category_data$export_settings_to_notes : "Vie asetukset ingame muistioon",
			category_data$import_settings_from_notes : "Tuo asetukset ingame muistiosta",
			category_data$reset_settings : "Nollaa addonin asetukset",
			category_data$clear_data : "Poista kaikki addonin data",
			category_data$clear_cache_data : "Poista addonin välimuisti (cache)",
			category_data$cross_browser_login : "Cross browser login sync",
			category_data$export_error_player_settings : "Export unknown-user data to file", // TODO: This may be removed on the future

			// Buttons
			save : "Tallenna",
			export : "Vie",
			import : "Tuo",
			reset : "Nollaa",
			clear : "Poista",
			do_not_show : "Älä näytä",
			show_as : "Show as",
			show_info : "Näytä tiedot",
			each_category : "Näytä vain jos suodatettu tietyt esineet",
			all_category : "Näytä aina suodatuksista huolimatta",
			do_not_run : "Älä näytä",
			default: "Oletus",

			// Info
			translated_percent : "Käännösprosentti: {{number}}%",
			translated_by : "Kääntänyt: {{string}}",
			reset_settings_confirm : "Haluatko varmasti nollata addonin asetukset?",
			clear_data_confirm : "Haluatko varmasti poistaa kaikki addonin datat?",
			data_exported_save_the_file : "Asetukset muutettu tiedostoksi, tallenna tiedosto.",
			missing_translations : "Puuttuvia käännöksiä",

			// Notifications
			notification_reload : "Lataa sivu uudelleen jotta muutokset astuvat voimaan",
		}
	}
}
