/*
 * Gladiatus Crazy Addon Translation
 * Name : Estonian
 * Code : [none]
 * Tag  : et
 * Translator: Legend, Zuslik
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages['et'] = {
	name : 'Eesti keel (Estonian)',
	translators : ["Legend", "Zuslik"],
	locale : {
		info : {
			description : "Vägevaim laiendus Gladiatusele!"
		},
		general : {
			days : "päev(ad)",
			minutes : "minutit",
			no_data : "Andmed puuduvad",
			confirm : "Kinnita!",
			cancel : "Tühista!",
			close : "Sulge!",
		},
		global : {
			life_potion_use : "Kasuta elueliksiiri!",
			life_potion_used : "Elueliksiir kasutatud!",
			life_potion_left : "Nüüd on sul {{number}} elupunkti!",
			life_recover_full : "Elupunktid täis!",
			message_private_write : "Kirjuta privaatne sõnum",
			message_guild_write : "Kirjuta gildi sõnum",
			message_send : "Saada",
			message_sent_success : "Sõnud edukalt edastatud!",
			message_sent_failed : "Sõnumi edastamine ebaõnnestus!",
			message_empty : "Sõnum puudub!",
			message_exclude_me : "Jäta mind välja!",
			guild_market_goto : "Mine gildi turule",
			guild_storage_goto : "Mine gildi lattu",
			guild_bank_goto : "Mine gildi panka",
			guild_warcamp_goto : "Mine gildi sõjameistrite kotta",
			guild_jail_goto : "Mine gildi vanglasse",
			guild_library_goto : "Mine gildi raamatukokku",
			guild_medic_goto : "Mine gildi haiglasse",
			simulator_goto : "Mine simulaatorisse",
			stats_display : "Näita minu andmeid",
			online_display : "Näita online mängijaid",
			online_friends : "Online sõbrad",
			guild_friends : "Gildi sõbrad",
			family_friends : "Perekonna sõbrad",
			donate_gold_confirm : "Oled sa kindel, et tahad annetada {{number}} kulda?",
			donate_gold_success : "Kuld annetatud!",
			donate_gold_failed : "Kulla annetus ebaõnnestus!",
			donate_gold_no_gold : "Pole kulda, mida annetada!",
			donate_gold_all_gold : "Anneta kogu kuld!",
			quest_full : "Täis",
			quest_new : "Uus",
			pray_start : "Vajuta palevatamiseks",
			pray_stop : "Vajuta palvetamise lõpetamiseks",
			heal : "Ravi",
			notification_guild_application : "Uus gildi taotlus!",
			low_durability_items : "Sul on {{number}} asja, mille vastupidavus on alla {{percent}}%",
			gold_exp_data : "Kulla ja kogemuse andmed",
			gold_exp_data_today : "Viimased 24 tundi",
			gold_exp_data_week : "Viimased 7 päeva",
			gold_exp_data_avg_day : "Keskmine päevas",
			gold_exp_data_to_level_up : "Päevi jäänud levelikss",
			gold_exp_data_package_tax : "Nädala kullapakkimise maksud",
			gold_exp_data_measurements : "Mõõdikud",
			gold_exp_data_total_exp : "Kogemust kokku",
			gold_exp_data_total_gold : "Kulda kokku"
		},
		overview : {
			stats_difference : "Vahe",
			drop_item_see_materials_repair : "Lohist ese, et näha, mis materjale vaja parandamiseks.",
			workbench_6th_slot_empty : "Tööpingi 6ne koht on vaja vabaks teha."
		},
		pantheon : {
			mysterybox_open_all : "Ava kõik",
			mysterybox_open_stop : "Peata!",
			mysterybox_open_done : "Tehtud!"
		},
		guild : {
			bank_all_gold : "Kogu sinu kuld",
			library_per_point_cost : "Maksumus iga stasi eest",
			library_gold_left : "Gildi kuld peale aktiveerimist!",
			medic_lost_points : "Kaotatud punktid",
			medic_points_to_heal : "Kui palju ravib",
			medic_life_after_heal : "Elud peale ravimist"
		},
		expedition : {
			material_drop_chance : "{{number}}% võimalus, et leida materjal"
		},
		training : {
			stats_points : "Statsid",
			points_breakdown : "Statside protsendiline tõus",
			stats_calculated_with_yourself_as_an_opponent : "Statsid on arvutatud, nagu ründaks iseenast.",
			total_cost : "Kokku maksab",
			costs_discount : "Treenimise allahindlus: {{number}}%"
		},
		auction : {
			items_info : "Esemete info",
			number_of_items : "Esemeid kokku : {{number}}",
			number_of_bided_items : "Oksjonil pakud esemed : {{number}}",
			hide_your_gold_here : "Peida oma kuld siia",
			price_value_function : "HInd = Väärtus + {{number}}",
			levels_you_can_see : "Sa näed esemeid levelist {{min}} kuni levelini {{max}}."
		},
		markets : {
			item_cost_only_x_gold : "Ese maksab ainult {{number}} kulda.",
			item_is_soulbound : "Ese on hingesugulusega.",
			are_you_sure_you_want_to_buy : "Kas oled kindel, et soovid eset osta?"
		},
		forge : {
			forge_ended : "Sulatamine lõpetatud!",
			recraft_item : "Proovi uuesti!"
		},
		packages : {
			event_items : "Sündmuse esemed",
			known_scroll : "Kirjarull õpitud!",
			unknown_scroll : "Kirjarull õppimata!"
		},
		settings : {
			settings : "Seaded",
			description : "Aktiveeri või deaktiveeri laienduse lisad.",
			description_click_button : "Vali milliseid laienduse seadeid soovid muuta...",
			category_global : "Üleüldine",
			category_overview : "Ülevaade",
			category_messages : "Sõnumid",
			category_packages : "Pakid",
			category_pantheon : "Pantheoon",
			category_reports : "Rapordid",
			category_training : "Treenimine",
			category_merchants : "Kaupmehe seaded",
			category_forge : "Sepikoda",
			category_arena : "Areen",
			category_magus : "Magus",
			category_market : "Turg",
			category_expedition : "Ekspeditsioonid",
			category_guild : "Gildi seaded",
			category_auction : "Oksjoni seaded",
			category_events : "Sündmused",
			category_sound : "Helid",
			category_data : "Andmed",
			category_global$language_select : "Vali laienduse keel",
			category_global$sound_notifications : "Luba märguande helid",
			category_global$browser_notifications : "Luba lehitseja(browseri) teated",
			category_global$extended_hp_xp_info : "Näita elupunktide ja xp infot üleval, kui leht alla keritud.",
			category_global$extended_hp_xp_info_potion : "Näita elueliksiiri kasutamiseks ikooni.",
			category_global$hp_timer_for_full_life : "Näita kui palju minuteid jäänud, et elupunktid täis saaksid.",
			category_global$shortcuts_bar : "Luba otsetee nupud",
			category_global$shortcuts_bar_buttons : "Vali otseteed mida kuvada",
			category_global$auction_status_bar : "Näita oksjoni staatuseid",
			category_global$auction_status_notification : "Anna teada, kui oksjoni staatus muutub.",
			category_global$top_fixed_bar : "Enable top fixed bar",
			category_global$advance_main_menu : "Uuenda peamenüüd",
			category_global$submenu_click_to_change : "Menüü muutub klikiga",
			category_global$remember_tabs : "Mäleta kaupmehe laolehte",
			category_global$merchants_timer : "Händlerzeit anzeigen",
			category_overview$analyze_items : "Analüüsi mängija asju",
			category_overview$more_statistics : "Zeige mehr Spielerstatistik",
			category_messages$messages_layout : "Füge Nachrichteninterface hinzu",
			category_messages$new_message_focus : "Set instant focus on content",
			category_messages$new_message_friend_list : "Enable friends list button",
			category_packages$pages_to_load : "Max Seitenanzahl die geladen werden soll",
			category_reports$style_change : "Improve report list interface",
			category_guild$jail_layout : "Improve jail's interface",
			category_guild$library_layout : "Improve library's interface",
			category_guild$bank_donate_layout : "Improve bank's interface",
			category_guild$bank_book_layout : "Improve bank's handbook interface",
			category_guild$medic_layout : "Improve medic center's interface",
			category_auction$items_counters : "Näita asjade numbreid",
			category_auction$item_level : "Zeige Level der Gegenstände",
			category_auction$x3_items_per_line : "Zeige 3 Gegenstände pro Reihe",
			save : "Alles speichern",
			notification_reload : "Seite neu laden, um die Zusätze zu aktivieren"
		}
	}
}

gca_languages._active = "et";
