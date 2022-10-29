/*
 * Gladiatus Crazy Addon Translation
 * Name : Dutch
 * Code : [none]
 * Tag  : nl
 * Translator: priscuss@hotmail.nl proximilius, anathustra
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages['nl'] = {
	name : 'Nederlands (Dutch)',
	translators : ["priscuss", "proximilius", "anathustra"],
	locale : {
		info : {
			description : "De allerbeste gladiatus add-on ooit!!"
		},
		general : {
			days : "dagen",
			minutes : "minuten",
			no_data : "Er is geen data",
			confirm : "Bevestig",
			cancel : "Annuleer",
			close : "Sluiten",
			error : "Fout"
		},
		global : {
			life_potion_use : "Gebruik een Genezingsdrankje",
			life_potion_used : "Een genezingsdrankje is gebruikt",
			life_potion_left : "Je hebt nu {{number}} genezingsdrankje(s)",
			life_recover_full : "Volledig herstel van levenspunten over",
			message_private_write : "Schrijf privébericht",
			message_guild_write : "Schrijf gildebericht",
			message_send : "Verzend",
			message_sent_success : "Gildebericht is verzonden",
			message_sent_failed : "Gildebericht verzenden mislukt",
			message_empty : "Gildebericht is leeg",
			message_exclude_me : "Mezelf uitsluiten",
			guild_market_goto : "Naar gildemarkt",
			guild_storage_goto : "Naar pakhuis",
			guild_bank_goto : "Naar gildebank",
			guild_warcamp_goto : "Naar oorlogskampioenzaal",
			guild_jail_goto : "Naar Negotium X",
			guild_library_goto : "Naar gilde bibliotheek",
			guild_medic_goto : "Naar villa medici",
			simulator_goto : "Ga naar de simulator",
			stats_display : "Toon mijn statistieken",
			online_display : "Toon online spelers",
			online_friends : "Online vrienden",
			guild_friends : "Gildegenoten",
			family_friends : "Familia leden",
			donate_gold_confirm : "Ben je zeker dat je {{number}} goud wil doneren",
			donate_gold_success : "Je goud is gedoneerd",
			donate_gold_failed : "Goud donatie mislukt",
			donate_gold_no_gold : "Er is geen goud om te doneren",
			donate_gold_all_gold : "Doneer al je goud",
			quest_full : "Volledige verzien",
			quest_new : "Nieuw",
			pray_start : "Klik om te bidden te beginnen",
			pray_stop : "Klik om bidden te beëindigen",
			heal : "Genezing",
			notification_guild_application : "Er is een aanmelding voor de Gilde!",
			low_durability_items : "Er zijn {{number}} item(s) met duurzaamheid onder {{percent}}%",
			gold_exp_data : "Goud en XP Data",
			gold_exp_data_today : "Afgelopen 24 uur",
			gold_exp_data_week : "Afgelopen 7 dagen",
			gold_exp_data_avg_day : "Gemiddelde waarden per dag",
			gold_exp_data_to_level_up : "Dagen voordat je levelt ",
			gold_exp_data_total_exp : "Totale XP",
			gold_exp_data_total_gold : "Totaal Goud"
		},
		overview : {
			stats_difference : "Verschil",
			drop_item_see_materials_repair : "Plaats een item om te zien welke grondstoffen voor reparatie nodig zijn",
			workbench_6th_slot_empty : "Werkbank 6 tabblad moet leeg zijn"
		},
		pantheon : {
			mysterybox_open_all : "Open alle",
			mysterybox_open_stop : "Stop",
			mysterybox_open_done : "Klaar!"
		},
				
				
		guild : {
			bank_all_gold : "Doneer alle goudstukjes",
			library_per_point_cost : "Kosten per Stat punt",
			library_gold_left : "Gilde goud na activatie",
			medic_lost_points : "Verloren punten",
			medic_points_to_heal : "Genezende punten",
			medic_life_after_heal : "Leven na genezing"
		},
		expedition : {
			material_drop_chance : "{{number}}% kans, op materiaal"
		},
		training : {
			stats_points : "Stat punten",
			points_breakdown : "Punten berekening",
			stats_calculated_with_yourself_as_an_opponent : "* Stats zijn berekend op aanval op je eigen",
			total_cost : "Totale kosten",
			costs_discount : "Trainingskosten korting: {{number}}%"
		},
				
		auction : {
			number_of_items : "Aantal voorwerpen : {{number}}",
			number_of_bided_items : "Aantal voorwerpen waarop geboden is : {{number}}",
			hide_your_gold_here : "Zet hier je goud veilig",
			price_value_function : "Prijs is gelijk aan waarde + {{number}}"
		},
		markets : {
		},
		forge : {
		},
		packages : {
		},
		settings : {
			settings : "Instellingen",
			description : "Schakel elk onderdeel van de add-on die je maar wilt in of uit!",
			description_click_button : "Klik op de knop hieronder om naar de add-on instellingen te gaan",
			category_global : "Algemene instellingen",
			category_overview : "Overzicht instellingen ",
			category_messages : "Berichten instellingen",
			category_packages : "Pakketten instellingen",
			category_reports : "Rapportage instellingen",
			category_training : "Trainingsinstellingen",
			category_merchants : "Koopmannen instellingen",
			category_guild : "Gilde instellingen",
			category_auction : "Veiling instellingen",
			category_global$language_select : "Verander de taal van de add-on",
			category_global$extended_hp_xp_info : "Toon HP en XP bovenaan",
			category_global$shortcuts_bar : "Toon knoppenbalk",
			category_global$auction_status_bar : "Toon veiling status",
			category_global$top_fixed_bar : "Zet scroll naar boven balk aan",
			category_global$remember_tabs : "Onthoudt laatst gebruikte tabbladen bij koopmannen en inventaris",			
			category_overview$analyze_items : "Vergelijk spelers voorwerpen",
			category_overview$more_statistics : "Toon meer spelers stats",
			// Settings - Main menu
			category_main_menu$merchants_timer : "Toon de timer van de koopmannen",
			category_main_menu$advance_main_menu : "Verbeterd hoofdmenu",
			category_messages$messages_layout : "Verbeterd berichten interface",
			category_messages$new_message_focus : "Zet instant focus op berichten inhoud aan",
			category_messages$new_message_friend_list : "Zet de vriendenlijst aan",
			category_packages$pages_to_load : "Maximale aantal pagina's te laden ",
			category_reports$style_change : "Verbeterde rapport lijst interface",
			category_guild$jail_layout : "Verbeterde Negotium X interface",
			category_guild$library_layout : "Verbeterde bibliotheek interface",
			category_guild$bank_donate_layout : "Verbeterde bank interface",
			category_guild$bank_book_layout : "Verbeterde donatieboek interface",
			category_guild$medic_layout : "Verbeterde villa medici interface",
			category_auction$items_counters : "Toon het aantal voorwerpen",
			category_auction$item_level : "Toon het item level",
			category_auction$x3_items_per_line : "Toon drie items per rij",
			save : "Sla alles op",
			notification_reload : "Herlaadt de pagina om de opties effect te laten hebben"
		}
	}
}

gca_languages._active = "nl";
