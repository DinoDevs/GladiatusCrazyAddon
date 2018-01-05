/*
 * Gladiatus Crazy Addon Translation
 * Name : Greek
 * Code : GR
 * Tag  : el-GR
 * Translator: DarkThanos, GreatApo
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages["gr"] = {

	// Language name
	name : "Ελληνικά (Greek)",
	// Translators (authors of this script)
	translators : ["DarkThanos", "GreatApo"],

	// Translations object
	locale: {
		// Addon info
		info: {
			description: "Το πιο τρελό add-on για το gladiatus που φτιάχτηκε ποτέ!"
		},

		// General
		general: {

			// Days
			days: "ημέρες",
			// Minutes
			minutes: "λεπτά",
			// No data
			no_data: "Δεν υπάρχουν δεδομένα.",

			// Modal buttons
			confirm : "Επιβεβαίωση",
			cancel : "Ακύρωση",
			close: "Κλείσιμο",
			error: "Σφάλμα"
		},

		// Global
		global: {
			// Use a life potion
			life_potion_use: "Χρήση ενός φίλτρου ζωής 100%",
			life_potion_used : "ένα φίλτρο ζωής χρησιμοποιήθηκε",
			life_potion_left : "Τώρα έχεις {{number}} φίλτρα ζωής διαθέσιμα",
			
			// Life points recovery
			life_recover_full: "Ολική αναγέννηση της ζωής σε",

			// Button bar - Message
			message_private_write: "Γράψε προσωπικό μήνυμα",
			message_guild_write: "Γράψε μήνυμα τάγματος",
			message_send: "Αποστολή",
			message_sent_success: "Το μήνυμα στάλθηκε",
			message_sent_failed: "Η αποστολή του μηνύματος απέτυχε",
			message_empty: "Το μήνυμα είναι κενό",
			message_exclude_me: "Εξαίρεσε εμένα",

			// Button bar buttons
			guild_market_goto: "Πήγαινε στην αγορά τάγματος",
			guild_storage_goto: "Πήγαινε στην αποθήκη τάγματος",
			guild_bank_goto: "Πήγαινε την τράπεζα τάγματος",
			guild_warcamp_goto: "Πήγαινε στην αίθουσα του άρχοντα του πολέμου",
			guild_jail_goto: "Πήγαινε στην φυλακή τάγματος",
			guild_library_goto: "Πήγαινε στην βιβλιοθήκη τάγματος",
			guild_medic_goto: "Πήγαινε στο ιατρικό κέντρο",
			simulator_goto: "Μεταβίβαση στον προσομοιωτή",
			stats_display: "Εμφάνιση των στατιστικών μου",
			online_display: "Εμφάνιση των online παιχτών",

			// Online friends
			online_friends: "Συνδεδεμένοι Φίλοι",
			guild_friends: "Φίλοι Τάγματος",
			family_friends: "Οικογενειακοί Φίλοι",

			// Guild donate
			donate_gold_confirm : "Είσαι σίγουρος πως θες να δωρίσεις {{number}} χρυσό?",
			donate_gold_success: "Ο χρυσός σου δωρήθηκε",
			donate_gold_failed: "Η δωρεά χρυσού απέτυχε",
			donate_gold_no_gold: "Δεν υπάρχει χρυσός για δωρεά",
			donate_gold_all_gold: "Δωρεά όλου του χρυσού",

			// Quest timer
			quest_full: "Γεμάτο",
			quest_new: "Νέα",

			// Pray icon
			pray_start: "Πάτα για να ξεκινήσεις να προσεύχεσαι",
			pray_stop: "Πάτα για να σταματήσεις την προσευχή",
			heal: "θεραπεία",

			// Notifications
			notification_guild_application: "Υπάρχει μια αίτηση στο τάγμα σε αναμονή!",

			// Gold - Exp data
			gold_exp_data: "Δεδομένα Χρυσού και Εμπειρίας",
			gold_exp_data_today: "Τελευταίες 24 ώρες",
			gold_exp_data_week: "Τελευταίες 7 ημέρες",
			gold_exp_data_avg_day: "Μέσες τιμές ανά μέρα",
			gold_exp_data_to_level_up: "Υπολειπόμενες ημέρες για ανέβασμα επιπέδου",
			gold_exp_data_package_tax : "Εβδομαδιαίος φόρος για μετατροπή χρυσού σε πακέτο",
			gold_exp_data_measurements : "Μετρήσεις",
			gold_exp_data_total_exp : "Συνολική εμπειρία",
			gold_exp_data_total_gold : "Συνολικός χρυσός",
		},

		// Overview
		overview: {
			// Stats Difference
			stats_difference : "Διαφορά",
			drop_item_see_materials_repair : "Ρίξτε ένα αντικείμενο για να δείτε τα υλικά που χρειάζεται για να επισκευαστεί",
			// Drop items to see materials to repair feature
			workbench_6th_slot_empty : "Η 6η θέση στον Πάγκο Εργασίας πρέπει να είναι ελεύθερη",
		},

		// Pantheon section
		pantheon : {
			// Mystery box
			mysterybox_open_all : "Άνοιγμα όλων",
			mysterybox_open_stop : "Στοπ",
			mysterybox_open_done : "Έγινε!"
		},

		// Guild section
		guild: {
			// Guild Bank
			bank_all_gold: "Όλος ο χρυσός",

			// Library
			library_per_point_cost : "Κόστος ανά πόντο",
			library_gold_left : "Χρυσός τάγματος μετά την ενεργοποίηση",

			// Medic
			medic_lost_points: "Χαμένοι πόντοι",
			medic_points_to_heal: "Πόντοι για θεραπεία",
			medic_life_after_heal: "Ζωή μετά την θεραπεία"
		},

		// Expedition
		expedition : {
			material_drop_chance : "{{number}}% πιθανότητα, μεταξύ των υλικών που πέφτουν"
		},

		// Training section
		training : {
			// Points analysis
			stats_points : "Πόντοι στατιστικών",
			points_breakdown : "Ανάλυση πόντων",
			stats_calculated_with_yourself_as_an_opponent : "* Τα στατιστικά υπολογίζονται με την υπόθεση ότι επιτίθεσαι στον εαυτό σου.",
			// Cost calculator
			total_cost : "Συνολικό κόστος",
			// Discount show
			costs_discount: "Έκπτωση κόστους: {{number}}%"				 
		},

		// Auction section
		auction: {
			// Info
			items_info : "Πληροφορίες αντικειμένων",
			// Number of items in the page
			number_of_items: "Αριθμός αντικειμένων : {{number}}",
			// Number of items that have been bidden in the page
			number_of_bided_items: "Αριθμός δημοπρατούμενων αντικειμένων : {{number}}",
			// Message on items that you can buy and sell at the same price
			hide_your_gold_here: "Κρύψε τον χρυσό σου εδώ",
			// Price of item equals to its value
			price_value_function: "Τιμή = Αξία + {{number}}",
			// Levels you can see
			levels_you_can_see: "Μπορείς να δεις αντικείμενα επιπέδου από {{min}} έως {{max}}."
		},

		// Markets section
		markets : {
			// Warnings
			item_cost_only_x_gold : "Αυτό το αντικείμενο κοστίζει μόνο {{number}} χρυσό.",
			item_is_soulbound : "Αυτό το αντικείμενο είναι ψυχικά δεμένο.",
			// Are you sure
			are_you_sure_you_want_to_buy : "Θέλεις πραγματικά να αγοράσεις αυτό το αντικείμενο;"
		},
		
		// Forge
		forge : {
			forge_ended : "Η σφυρηλάτηση τελείωσε!",
			recraft_item : "Σφυρηλάτηση ξανά"
		},

		// Packages
		packages : {
			event_items : "Αντικείμενα εκδηλώσεων",
			known_scroll : "Γνωστός πάπυρος",
			unknown_scroll : "Άγνωστος πάπυρος"
		},
		
		// Settings
		settings : {
			// Settings
			settings: "Ρυθμίσεις",
			// Description
			description: "Ενεργοποίησε ή απενεργοποίησε οποιοδήποτε μέσα στο προσθέτου!",
			description_click_button: "Πατήστε το κουμπί από κάτω για να μεταβείτε στις ρυθμίσεις...",
			
			// Categories
			category_global: "Γενικά",
			category_overview: "Επισκόπηση",
			category_messages: "Μηνύματα",
			category_packages: "Πακέτα",
			category_pantheon: "Πάνθεον",
			category_reports: "Αναφορές",
			category_training: "Εκπαίδευση",
			category_merchants: "Πωλητές",
			category_forge : "Σιδηρουργείο",
			category_arena : "Αρένα",
			category_magus : "Μάγος Ερμητικός",
			category_market : "Αγορά",
			category_expedition : "Εξορμήσεις",
			category_guild: "Τάγμα",
			category_auction: "Δημοπρατήριο",
			category_events : "Εκδηλώσεις",
			category_sound : "Ήχοι",
			category_data : "Δεδομένα",

			// Settings - Global
			category_global$language_select: "Αλλαγή της γλώσσας του προσθέτου",
			category_global$sound_notifications: "Ενεργοποίηση των ήχων ειδοποίησης για αποστολές, μπουντρούμια και αρένες",
			category_global$browser_notifications : "Ενεργοποίηση των ειδοποιήσεων φυλλομετρητή (browser)",
			category_global$extended_hp_xp_info: "Προβολή εκτεταμένων πληροφοριών για HP και XP",
			category_global$extended_hp_xp_info_potion : "Προβολή εικονιδίου χρήσης φίλτρου ζωής",
			category_global$hp_timer_for_full_life : "Προβολή υπολειπόμενων λεπτών για πλήρη ζωή",
			category_global$shortcuts_bar: "Προβολή της μπάρας κουμπιών",
			category_global$shortcuts_bar_buttons : "Επιλογή συντομεύσεων για την μπάρα κουμπιών",
			category_global$auction_status_bar: "Προβολή της μπάρας κατάστασης δημοπρατηρίου",
			category_global$auction_status_notification: "Ειδοποίηση όταν αλλάξει η κατάσταση του δημοπρατηρίου",
			category_global$top_fixed_bar: "Ενεργοποίηση της on-scroll μπάρας",
			category_global$advance_main_menu: "Βελτίωση του κυρίως μενού",
			category_global$submenu_click_to_change : "Αλλαγή των υπο-μενού με κλικ",
			category_global$remember_tabs: "Να θυμάται το πρόσθετο τις καρτέλες της τσάντας και των πωλητών",
			category_global$attacked_timers: "Εμφάνιση των χρόνων από την τελευταία επίθεση σε άμυνα",
			category_global$quest_timer: "Εμφάνιση της κατάστασης/χρόνου των αποστολών",
			category_global$merchants_timer: "Προβολή του χρονομέτρου των πωλητών",
			category_global$forge_timers : "Προβολή του χρονομέτρου σιδηρουργείου/χυτηρίου",
			category_global$cooldown_sound_notifications : "Ενεργοποίηση των ήχων ειδοποίησης (επιδρομής, μπουντρούμι, αρένα)",
			category_global$notify_new_guild_application : "Ειδοποίηση για νέες αιτήσεις στο τάγμα",
			category_global$notify_new_guild_application_interval : "Έλεγχος για νέες αιτήσεις κάθε (λεπτά)",
			category_global$x_scroll : "Ενεργοποίηση της οριζόντιας κύλισης του gladiatus",
			category_global$item_shadow : "Ενεργοποίηση των σκιών των αντικειμένων",
			category_global$inventory_options_group : "Ομαδοποίηση των επιλογών της τσάντας",
			category_global$inventory_gold_info : "Εμφάνιση της τιμής των αντικειμένων της τσάντας",
			category_global$pagination_layout : "Αλλαγή της εμφάνισης του κουτιού σελίδων",
			category_global$gold_exp_data : "Εμφάνιση στατιστικών χρυσού και πόντων εμπειρίας",
			category_global$pray_shorcut : "Εμφάνισης συντόμευσης για την προσευχή στον κάτω κόσμο",
			category_global$centurio_powerups_timers : "Εμφάνιση χρονομέτρων για τον Εκατόνταρχο και τις Συμφωνίες επάνω στο κουμπί Premium",
			category_global$show_durability : "Εμφάνιση της ανθεκτικότητας των αντικειμένων στην κάτω αριστερή τους γωνία",
			category_global$min_durability : "Ειδοποίηση όταν η ανθεκτικότητα+εξευγενισμός είναι κάτω από μια τιμή % (επιλέξτε 0 για απενεργοποίηση)",
			// Settings - Overview
			category_overview$analyze_items: "Ανάλυση των αντικειμένων του παίκτη",
			category_overview$food_life_gain : "Εμφάνιση των πόντων ζωής που δίνει το κάθε αναλώσιμο",
			category_overview$block_avoid_caps: "Προβολή των τιμών cap για την Προσαρμοστικότητα και την Αξία Κλειδώματος",
			category_overview$best_food : "Επισήμανση του πιο κατάλληλου αναλώσιμου",
			category_overview$overfeed_food : "Ημιδιαφάνεια στα αναλώσιμα που δίνουν παραπάνω πόντους ζωής",
			category_overview$daily_bonus_log : "Καταγραφή του καθημερινού μπόνους",
			category_overview$buffs_detailed_time : "Εμφάνιση λεπτομερείς χρονομετρητών για τα μπόνους του τάγματος",
			category_overview$mercenaries_manager : "Εμφάνιση του διαχειριστή μισθοφόρων",
			category_overview$mercenary_tooltip_show : "Εμφάνιση των tooltip των μισθοφόρων",
			category_overview$more_statistics: "Παροχή περισσότερων στατιστικών παίκτη",
			category_overview$achivements_layout : "Βελτίωση της εμφάνισης των νικών",
			category_overview$costumes_layout : "Βελτίωση της εμφάνισης των κουστουμιών",
			category_overview$items_repair_overview : "Εμφάνιση του κουτιού εμφάνισης των πρώτων υλών για επισκευή",
			// Settings - Messages
			category_messages$messages_layout: "Βελτίωση του interface των μηνυμάτων",
			category_messages$show_unread : "Υπερφώτιση μη αναγνωσμένων μηνυμάτων",
			category_messages$separate_days : "Διαχωρισμός μηνυμάτων διαφορετικών ημερών",
			category_messages$send_message_box : "Ενεργοποίηση κουτιού αποστολής μηνύματος",
			category_messages$more_guild_mate_info : "Εμφάνιση περισσοτέρων πληροφοριών στους συμπαίχτες του τάγματος",
			category_messages$show_message_links : "Εμφάνιση υπερσυνδέσμων που εμπεριέχονται στα μηνύματα",
			category_messages$get_guild_battle_info : "Αυτόματη φόρτωση αποτελεσμάτων των μαχών τάγματος",
			category_messages$show_sidebar : "Εμφάνιση της πλαϊνής μπάρας μηνυμάτων",
			category_messages$fix_header_links : "Επιδιόρθωση του προβλήματος στο κλικ πάνω στον τίτλο των μηνυμάτων ",
			category_messages$new_message_focus: "Αυτόματο focus του κέρσορα στο μήνυμα",
			category_messages$new_message_friend_list: "Εμφάνιση του κουμπιού Λίστα Φίλων",
			// Settings - Packages
			category_packages$filters_layout : "Βελτίωση της εμφάνισης των φίλτρων",
			category_packages$compact_info_layout : "Κάντε το interface των πληροφοριών συμπαγή",
			category_packages$items_layout : "Βελτίωση της εμφάνισης των αντικειμένων",
			category_packages$load_more_pages : "Φόρτωση περισσοτέρων σελίδων",
			category_packages$pages_to_load: "Μέγιστος αριθμός σελίδων που φορτώνονται",
			category_packages$item_price : "Εμφάνιση του κόστους κάθε αντικειμένου",
			category_packages$special_category_features : "Ενεργοποίηση ειδικών λειτουργιών ανά κατηγορία",
			// Settings - Pantheon
			category_pantheon$quests_reorder : "Ομαδοποίηση αποστολών",
			category_pantheon$quests_detailed_rewards: "Ενεργοποίηση λεπτομερούς εμφάνισης των ανταμοιβών",
			category_pantheon$missions_show_completed : "Εμφάνιση διεκπεραιωμένων επιδιώξεων",
			category_pantheon$gods_show_points_percent : "Εμφάνιση των πόντων θεών τις εκατό",
			category_pantheon$open_many_mysteryboxes : "Άνοιγμα πολλαπλών σεντουκιών",
			category_pantheon$show_mysterybox_rewards_rubies : "Εμφάνιση τις αξίας των ανταμοιβών από τα σεντούκια σε ρουμπίνια",
			// Settings - Reports
			category_reports$style_change: "Βελτίωση του interface της λίστας αναφορών",
			category_reports$load_loot_tooltips : "Φόρτωση των ανταμοιβών τις κάθε αναφοράς",
			category_reports$found_items : "Συλλογή δεδομένων από τα αντικείμενα που πέφτουν",
			// Settings - Training
			category_training$show_discount : "Εμφάνιση έκπτωσης εκπαίδευσης",
			category_training$show_basics_in_bars : "Εμφάνιση βασικών εκπαιδεύσεων στις μπάρες",
			category_training$multiple_train : "Ενεργοποίηση πολλαπλής εκπαίδευσης",
			category_training$calculator_train : "Ενεργοποίηση υπολογισμού κόστους",
			category_training$show_analyze_items_data : "Εμφάνιση δεδομένων αναλυμένων αντικειμένων σε tooltips",
			category_training$show_points_after_upgrade : "Εμφάνιση πόντων μετά την εκπαίδευση",
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			// Settings - Guild
			category_guild$jail_layout: "Βελτίωση του interface της φυλακής",
			category_guild$library_layout: "Βελτίωση του interface της βιβλιοθήκης",
			

			category_guild$bank_donate_layout: "Βελτίωση του interface της τράπεζας",
			category_guild$bank_book_layout: "Βελτίωση του interface του βιβλίου δωρεών της τράπεζας",
			category_guild$medic_layout: "Βελτίωση του interface του ιατρικού κέντρου",
			// Settings - Auction
			category_auction$items_counters: "Εμφάνιση του αριθμού των αντικειμένων",
			

			category_auction$item_level: "Προβολή του επιπέδου του κάθε αντικειμένου",
			category_auction$x3_items_per_line: "Προβολή 3ων αντικειμένων ανά γραμμή",
			category_auction$multi_bids: "Ενεργοποίηση πολλαπλών δημοπρατήσεων (χωρίς ανανέωση)",
			
			// Settings - Events


			// Settings - Sound



			// Settings - Data





			// Buttons
			save: "Αποθήκευση",




			// Info




			// Notifications
			notification_reload: "Επαναφορτώστε την σελίδα για να ενεργοποιηθούν οι αλλαγές"
		}
	}
}

gca_locale.active = "el";
