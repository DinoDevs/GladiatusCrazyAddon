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
	name : "Ελληνικά",
	// Translators (authors of this script)
	translators : ["DarkThanos", "GreatApo"],

	// Translations object
	locale : {
		// Addon info
		info : {
			description : "Το πιο τρελό add-on για το gladiatus που φτιάχτηκε ποτέ!"
		},
		
		
		// Overview
		overview : {
			// Stats Difference
			stats_difference : "Διαφορά",
			// Drop items to see materials to repair feature
			drop_item_see_materials_repair : "Ρίξτε ένα αντικείμενο για να δείτε τα υλικά που χρειάζεται για να επισκευαστεί",
			workbench_6th_slot_empty : "Η 6η θέση στον Πάγκο Εργασίας πρέπει να είναι ελεύθερη",
		}	
	},

	// Old deprecated struct
	locale_deprecated : {
		/* Add on informations */
			description : "Το πιο τρελό add-on για το gladiatus που φτιάχτηκε ποτέ!",

		/* Global */
			// No-guild-bar compose a new private message
			write_private_message : "Γράψε προσωπικό μήνυμα",
			// Guild-bar compose a new guild message
			write_guild_message : "Γράψε μήνυμα τάγματος",
			// Guild-bar sent new guild message
			send : "Αποστολή",
			// Guild-bar exclude me from guild message
			exclude_me : "Εξαίρεσε εμένα",
			// Guild-bar go to guild's medic center
			go_to_guilds_medic_center : "Πήγαινε στο ιατρικό κέντρο",
			// Guild-bar go to guild's market
			go_to_guilds_market : "Πήγαινε στην αγορά τάγματος",
			// Guild-bar go to guild's storage
			go_to_guilds_storage : "Πήγαινε στην αποθήκη τάγματος",
			// Guild-bar go to guild's bank
			go_to_guilds_bank : "Πήγαινε την τράπεζα τάγματος",
			// Guild-bar donate all your gold
			donate_all_your_gold : "Δωρεά όλου του χρυσού",
			// Guild-bar go to guild's war camp
			go_to_guilds_war_camp : "Πήγαινε στην αίθουσα του άρχοντα του πολέμου",
			// Guild-bar go to guild's jail
			go_to_guilds_jail : "Πήγαινε στην φυλακή τάγματος",
			// Guild-bar go to guild's library
			go_to_guilds_library : "Πήγαινε στην βιβλιοθήκη τάγματος",
			// Guild-bar go to simulator
			go_to_simulator : "Μεταβίβαση στον προσομοιωτή",
			// Guild-bar display my stats
			display_my_stats : "Εμφάνιση των στατιστικών μου",
			// Guild-bar display online players
			display_online_players : "Εμφάνιση των online παιχτών",
			// Quest timer new
			quest_new : "Νέα",
			// Quest timer full
			quest_full : "Γεμάτο",
			// Weapon down alert
			weapon_down : "Το όπλο σου έχει αφαιρεθεί!",
			// Leveling Stats
			gold_exp_data : "Δεδομένα Χρυσού και Εμπειρίας",
			today_values : "Σημερινές τιμές",
			days7_values : "Τιμές 7 ημερών",
			average_per_day : "Μέσες τιμές ανά μέρα",
			days_left_to_level_up : "Υπολειπόμενες ημέρες για ανέβασμα επιπέδου",
			leveling_stats : "Στατιστικά Εμπειρίας", //old
			today_experience : "Εμπειρία σήμερα", //old
			days7_experience : "Εμπειρία 7 ημερών", //old
			avarage_experiance_per_day : "Μέση εμπειρία ανά μέρα", //old
			// Life
			use_life_potion : "Χρήση ενός φίλτρου ζωής 100%",
			// dataUpdater
			dropped_items_reported : "Οι πληροφορίες για τα κερδισμένα αντικείμενα δηλώθηκαν!",
			// Underword
				// Pray Shorcut
				stop_praying : "Πάτα για να σταματήσεις την προσευχή",
				start_praying : "Πάτα για να ξεκινήσεις να προσεύχεσαι",
				heal : "θεραπεία",
		
		/* Guild */
			// Library
				// Remaining gold after enable a recipe
				gold_after_enable : "Περιουσία μετά την ενεργοποίηση",
			// Medic Center
				// Lost life points
				lost_points : "Χαμένοι πόντοι",
				// Points of life that are about to be healed
				points_to_heal : "Πόντοι για θεραπεία",
				// The number of life point you will have after healing
				life_after_heal : "Ζωή μετά την θεραπεία",
				// Life of your guild
				guild_life : "Ζωή Τάγματος",
			// Bank
				// Difference between the gold
				difference : "Διαφορά",
				// The sum of the gold
				total : "Σύνολο",
				// Add all gold in bank
				add_all_gold : "Όλος ο χρυσός",
			// War Camp
				attacks : "Επιθέσεις",
				defences : "Άμυνες",
				friendly : "Φιλικές",
				show_raided_gold : "Εμφάνιση κλεμμένου χρυσού",
			// Global
				pending_guild_application : "Υπάρχει μια αίτηση στο τάγμα σε αναμονή!",
			// Upgrade Calculator
				calculate_guild_upgrade : "Υπολογισμός Αναβάθμισης Τάγματος",
				include : "Συμπεριέλαβε",
				custom_amount : "Προσαρμοσμένο ποσό",
				gold_per_player : "Χρυσός ανά παίχτη",
				target_gold : "Στόχος χρυσού",
				gold_in_bank : "Χρυσός στην τράπεζα",
				difference : "Διαφορά",
				round_up : "Στρογγυλοποίηση επάνω",
				round_to : "Στρογγυλοποίηση στα",
				results_to_text : "Αποτελέσματα σε κείμενο",
				calculate_cost : "Υπολογισμός Κόστους",
				multiplier : "Πολλαπλασιαστής",
				enable_multiplier : "Ενεργοποίηση Πολ/στή",
			//Admin
				search_for_players : "Ψάξτε για παίχτες",
				guild_status : "Κατάσταση τάγματος",
				any : "Οποιαδήποτε",
				in_guild : "Σε τάγμα",
				no_guild : "Χωρίς τάγμα",
				search : 'Αναζήτηση',
		
		/* Overview */
			// General
				// Full life points recovery in (x minutes)
				full_life_recover_in : "Ολική αναγέννηση της ζωής σε",
			// Manage Mercenaries Box
				// Manage mercenaries title
				manage_mercenaries : "Διαχείριση Μισθοφόρων",
				// Name of mercenaries
				name : "Όνομα",
				// "Protect your self" mercenary command
				protect : "Προστασία",
				// "Leave behind" mercenary command
				leave : "Άφησε",
		
		/* Online Friends */
			// List of your in game friends
			friend_list : "Λίστα Φίλων",
			// List of your in game friends that are now online
			online_friends : "Συνδεδεμένοι Φίλοι",
			// List of your guild friends
			guild_friends : "Φίλοι Τάγματος",
			// List of your family friends
			family_friends : "Οικογενειακοί Φίλοι",
			
		/* Auction */
			// Number of items in the page
			number_of_items : "Αριθμός αντικειμένων",
			// Number of items that have been bided in the page
			number_of_bided_items : "Αριθμός δημοπρατούμενων αντικειμένων",
			// Message on items that you can buy and sell at the same price
			hide_your_gold_here : "Κρύψε τον χρυσό σου εδώ",
			// Price of item equals to its value
			price_eq_value : "Τιμή = Αξία",
			// Item "Type"
			type : "Είδος",
			// Item
			item : "Αντικείμενο",
			// Select an item
			select : "Επέλεξε",
			// Items that where found
			items_found : "Αντικείμενα που βρέθηκαν",
			// Search items using a gold limit value
			gold_limit : "Όριο Χρυσού",
			// Search items using a max-damage value
			min_damage : "Ελάχιστη μεγάλη-ζημιά",
			// Search items using the duration of their use
			duration : "Διάρκεια",
			// Announce auction status to guild button
			announce_to_guild : "Ανακοίνωσε στο τάγμα",
		
		/* Merchants */
			// Time
				// New merchants items/goods
				new_goods : "Νέα αγαθά",
				// Merchant's new items/goods time
				merchants_new_goods_time : "Χρόνος νέων αγαθών των πωλητών",
			// Item Search
				// Search Results
				search_results : "Αποτελέσματα Αναζήτησης",
				// Item Search
				item_search : "Αναζήτηση Αντικειμένων",
			// Storage info
				storage_info : "Πληροφορίες Χώρου",
				value : "Αξία",
				no_rubies : "χωρίς ρουμπ.",
		
		/* Training */
			// Discount from the guild tranining grounds
			guild_discount : "Έκπτωση τάγματος",
			training_cost_calculator : "Υπολογιστής Κόστους Εκπαίδευσης",
			stats : "Στατς",
			from : "από",
			to : "έως",
			cost : "Κόστος",
			training_camp_level : "Επίπεδο Χώρου Εκπαίδευσης",
			reduction : "Μείωση",
			total_cost : "Συνολικό Κόστος",
			calculate : "Υπολογισμός",
			reset : "Επαναφορά",
			spent : "ξοδεύτηκαν",
		
		/* Market */
			// The number of the items you own
			number_of_my_items : "Αριθμός των αντικειμένων μου",
			// Cancel all (items you sell)
			cancel_all : "Ακύρωση όλων",
			// Levels you can see
			levels_you_can_see : "Τα επίπεδα αντικειμένων που μπορείς να δεις είναι",
		
		/* Costumes */
			player_image : "Εικόνα Παίχτη",
			change_player_image : "Αλλαγή εικόνας παίχτη",
			image_was_saved : "Η εικόνα αποθηκεύτηκε",
			more_player_images: "Περισσότερες εικόνες παίχτη",
			made_by: "Δημιουργήθηκαν από",
		
		/* Alert Messages */
			// Guild message was sent
			guild_message_was_sent : "Το μήνυμα τάγματος στάλθηκε",
			// Guild message sent failed
			guild_message_sent_failed : "Η αποστολή του μηνύματος τάγματος απέτυχε",
			// Guild message is empty
			guild_message_empty : "Το μήνυμα τάγματος είναι κενό",
			// Your gold was donated
			gold_donated : "Ο χρυσός σου δωρήθηκε",
			// Your gold donation failed
			gold_donation_failed : "Η δωρεά χρυσού απέτυχε",
			// There is no gold to donate
			no_gold : "Δεν υπάρχει χρυσός για δωρεά",
			// There are packages expiring in ... hours
			packages_expiring_in : 'Υπάρχουν πακέτα που θα λείξουν σε',
			hours : 'ώρες',
		
		/* General */
			// Error
			error : "Σφάλμα",
			// Loading...
			loading : "Φόρτωση",
			// Clear
			clear : "Εκκαθάριση",
			// Close
			close : "Κλείσιμο",
			// Check all
			check_all : "Επιλογή όλων",
			// Done / Finish
			done : "Έγινε!",
			// Per point
			per_point: "για κάθε πόντο",
			// Minutes
			minutes : "λεπτά",
			// Numbers' symbol for hundreds
			number_format_front : ".",
			// Numbers' symbol for decimal
			number_format_back : ",",
			// Bck button
			GENERAL_BACK : "Πίσω",
			//There are no data message (for the alerts)
			there_are_no_data : "Δεν υπάρχουν δεδομένα.",
		
		/* Packages */
			all_pages : "Όλες οι σελίδες",
			specific_pages : "Συγκεκριμένες σελ.",
			this_page : "Αυτή η σελίδα",
			calculate_gold : "Υπολογισμός χρυσού",
			calculate_item_values : "Υπολογισμός αξίας αντικειμένων",
			collect_gold : "Μάζεμα χρυσού",
		
		/* Premium */
			days : "ημέρες",
			remaining : "υπολείπονται",

		/* Options */
			OPTIONS_DESCRIPTION : "Ενεργοποίησε ή απενεργοποίησε οποιοδήποτε μέσα στο προσθέτου!",
			OPTIONS_BUTTON_BELOW : "Πατήστε το κουμπί από κάτω για να μεταβείτε στις ρυθμίσεις...",
			OPTIONS_SETTINGS : "Ρυθμίσεις",
			OPTIONS_OPEN_ALL : "Άνοιγμα όλων",
			OPTIONS_CLOSE_ALL : "Κλείσιμο όλων",
			OPTIONS_SAVE_CATEGORY : "Αποθήκευση Κατηγορίας",
			OPTIONS_SAVE_ALL : "Αποθήκευση όλων",
			OPTIONS_SAVED : "Οι ρυθμίσεις αποθηκεύτηκαν",
			OPTIONS_RELOAD : "Επαναφορτώστε την σελίδα για να ενεργοποιηθούν οι αλλαγές",
			OPTIONS_GLOBAL_OPTIONS : "Γενικές Ρυθμίσεις",
				OPTIONS_GLOBAL_EXTENDED_HP_XP_INFO : "Προβολή εκτεταμένων πληροφοριών για HP και XP",
				OPTIONS_GLOBAL_BUTTON_BAR : "Προβολή της μπάρας κουμπιών",
				OPTIONS_GLOBAL_AUCTION_STATUS_BAR : "Προβολή της μπάρας κατάστασης δημοπρατηρίου",
				OPTIONS_GLOBAL_AUCTION_STATUS_NOTIFICATION : "Ειδοποίηση όταν αλλάξει η κατάσταση του δημοπρατηρίου",
				OPTIONS_GLOBAL_TOP_FIXED_BAR : "Ενεργοποίηση της on-scroll μπάρας",
				OPTIONS_GLOBAL_ADVANCED_MAIN_MENU : "Βελτίωση του κυρίως μενού",
				OPTIONS_GLOBAL_MERCHANTS_TIME : "Προβολή του χρονομέτρου των πωλητών",
				OPTIONS_GLOBAL_MINITES_LEFT_FOR_FULL_LIFE : "Προβολή των λεπτών που απομένουν για την αναπλήρωση της ζωής",
				OPTIONS_GLOBAL_REMEMBER_TABS : "Να θυμάται το πρόσθετο τις καρτέλες της τσάντας και των πωλητών",
				OPTIONS_GLOBAL_QUESTS_TIMER : "Εμφάνιση της κάτασταση/χρόνου των αποστολών",
				OPTIONS_GLOBAL_ATTACKED_TIMERS : "Εμφάνιση των χρόνων απο την τελευταία επίθεση σε άμυνα",
				OPTIONS_GLOBAL_WEAPON_DOWN_ALERT: "Ειδοποίηση όταν ο παίχτης δεν έχει όπλο",
				OPTIONS_GLOBAL_DISPLAY_CENTURIO_DAYS : "Προβολή των υπολειπόμενων μερών Εκατόνταρχου (στο μενού)",
				OPTIONS_GLOBAL_MAP_NAMES_LEVELS : "Απόκρυψη των ονομάτων των κτιρίων στους χάρτες πόλης/χώρας",
				OPTIONS_GLOBAL_SOUND_NOTIFICATIONS : "Ενεργοποίηση των ήχων ειδοποίησης για αποστολές, μπουντρούμια και αρένες",
				OPTIONS_GLOBAL_LANGUAGE : "Αλλαγή της γλώσσας του προσθέτου",
			
			OPTIONS_OVERVIEW_OPTIONS : "Ρυθμίσεις Επισκόπησης",
				OPTIONS_MAIN_PLAYER_OPTIONS : "Ρυθμίσεις κυρίως παίκτη",
					OPTIONS_OVERVIEW_ITEMS_ANALIZE : "Ανάλυση των αντικειμένων του παίκτη",
					OPTIONS_OVERVIEW_DISPLAY_SHARE_LINK : "Προβολή του κουμπιού κοινοποίησης του υπερσυνδέσμου του παίκτη",
				OPTIONS_STATS_OPTIONS : "Ρυθμίσεις Στατιστικών",
					OPTIONS_OVERVIEW_PLAYER_STATS_MOD : "Παροχή περισσότερων στατιστικών παίκτη",
					OPTIONS_OVERVIEW_BLOCK_AVOID_CAPS : "Προβολή των τιμών cap για την Προσαρμοστικότητα και την Αξία Κλειδώματος",

			OPTIONS_TRANING_OPTIONS : "Ρυθμίσεις Εκπαίδευσης",
				OPTIONS_TRANING_DISPLAY_MOD : "Προβολή περισσότερων πληροφοριών",
				OPTIONS_TRANING_DISPLAY_COST_CALCULATOR : "Προβολή του υπολογιστή κόστους",

			OPTIONS_AUCTION_OPTIONS : "Ρυθμίσεις Δημοπρατηρίου",
				OPTIONS_AUCTION_TABLE_MODIFICATIONS : "Ενεργοποίηση τροποποιήσεων του interface",
					OPTIONS_AUCTION_DISPLAY_ITEMS_NUM : "Εμφάνιση του αριθμού των αντικειμένων",
					OPTIONS_AUCTION_DISPLAY_ITEMS_BGCOLOR : "Προβολή της ποιότητας του κάθε αντικειμένου στο background",
					OPTIONS_AUCTION_AUTO_FILL_GOLD : "Αυτόματη συμπλήρωση της ποσότητας του χρυσού",
					OPTIONS_AUCTION_DISPLAY_ITEMS_LVL : "Προβολή του επιπέδου του κάθε αντικειμένου",
					OPTIONS_AUCTION_DISPLAY_3_ITEMS_PER_ROW : "Προβολή 3ων αντικειμένων ανά γραμμή",
					OPTIONS_AUCTION_MULTIPLE_BIDS : "Ενεργοποίηση πολλαπλών δημοπρατήσεων (χωρίς ανανέωση)",
					OPTIONS_AUCTION_WARN_GUILD : "Ενεργοποίηση του κουμπιού ανακοίνωσης της κατάστασης του δημοπρατηρίου στο τάγμα",
				OPTIONS_AUCTION_SEARCH_MODIFICATIONS : "Ενεργοποίηση των τροποποιήσεων της αναζήτησης",
					OPTIONS_AUCTION_EXPAND_ITEMS_LVL : "Επέκταση των επιπέδων των αντικειμένων",
					OPTIONS_AUCTION_IMPROVE_SEARCH_MENU : "Βελτίωση του μενού αναζήτησης",
				OPTIONS_AUCTION_TOOLTIP_MODIFICATIONS : "Ενεργοποίηση των τροποποιήσεων των tooltip",
					OPTIONS_AUCTION_MERCENARIES_TOOLTIPS : "Εμφάνιση των tooltip για κάθε μισθοφόρο όταν είστε στους Μισθοφόρους",
					OPTIONS_AUCTION_HIDE_MERCENARIES_GUIDE_ROW : "Απόκρυψη της γραμμής οδηγιών/τελευταία από τα tooltip των μισθοφόρων (καλύτερη εικόνα σύγκρισης)",

			OPTIONS_MARKET_OPTIONS : "Ρυθμίσεις Αγοράς",
				OPTIONS_MARKET_TABLE_MODIFICATIONS : "Ενεργοποίηση τροποποιήσεων του interface",
					OPTIONS_MARKET_LOAD_MORE_PAGES : "Αυτόματη φόρτωση όλων των σελίδων",
					OPTIONS_MARKET_STYLE_CHANGES : "Ενεργοποίηση τροποποιήσεων του style",
					OPTIONS_MARKET_CANCEL_PACKETS_BUTTON : "Εμφάνιση του κουμπιού 'Ακύρωση όλων'",
					OPTIONS_MARKET_DEFAULT_SELL_DURATION : "Επιλέξτε την προεπιλεγμένη διάρκεια πωλήσεων στην αγορά",
				OPTIONS_MARKET_SEARCH_MODIFICATIONS : "Ενεργοποίηση τροποποιήσεων της αναζήτησης",
					OPTIONS_MARKET_EXPAND_ITEMS_LVL : "Επέκταση των επιπέδων των αντικειμένων",
					OPTIONS_MARKET_IMPROVE_SEARCH_MENU : "Βελτίωση του μενού αναζήτησης",

			OPTIONS_MERCHANTS_OPTIONS : "Ρυθμίσεις Πωλητών",
				OPTIONS_MERCHANTS_ITEM_SEARCH : "Ενεργοποίηση της αναζήτησης αντικειμένων των πωλητών",
				OPTIONS_MERCHANTS_HIGHLIGHT_ITEMS : "Ενεργοποίηση της υπερφώτισης αντικειμένων που μπορούν να αγοραστούν στους πωλητές",
				OPTIONS_MERCHANTS_INFOS : "Ενεργοποίηση των κουτιών πληροφοριών κάτω από τους πωλητές",

			OPTIONS_MESSAGES_OPTIONS : "Ρυθμίσεις Μηνυμάτων",
				OPTIONS_MESSAGES_LIST_OPTIONS : "Ρυθμίσεις Λίστας Μηνυμάτων",
					OPTIONS_MESSAGES_STYLING : "Βελτίωση του interface των μηνυμάτων",
				OPTIONS_NEW_MESSAGE_OPTIONS : "Ρυθμίσεις Νέων Μηνυμάτων",
					OPTIONS_NEWMESSAGE_FOCUS : "Αυτόματο focus του κέρσορα στο μήνυμα",
					OPTIONS_NEWMESSAGE_FRIENDLIST : "Εμφάνιση του κουμπιού Λίστα Φίλων",
				OPTIONS_MESSAGE_SPAM_BLOCK_OPTIONS : "Ρυθμίσεις Μπλοκαρισμένων Μηνυμάτων",
					OPTIONS_MESSAGE_SPAM_BLOCK : "Ενεργοποίηση μπλοκαρισμού μηνυμάτων",
					OPTIONS_SPAM_BLOCKED_PLAYERS : "Μπλοκαρισμένοι παίχτες (χωρίστε με ,)",

			OPTIONS_PACKAGES_OPTIONS : "Ρυθμίσεις Πακέτων",
				OPTIONS_PACKAGES_NEW_LAYOUT : "Ενεργοποίηση της νέας εμφάνισης των πακέτων",
				OPTIONS_PACKAGES_MAX_PAGES_TO_LOAD : "Μέγιστος αριθμός σελίδων που φορτώνονται",
				OPTIONS_PACKAGES_COLLECT_GOLD_BUTTON : "Ενεργοποίηση του κουμπιού Μάζεμα Χρυσού",
				OPTIONS_PACKAGES_EXPIRED_PACKAGES : "Ενεργοποίηση της προειδοποίησης για τα πακέτα που θα λήξουν",
				OPTIONS_PACKAGES_EXPIRED_HOURS : "Προειδοποίηση για τα πακέτα που θα λήξουν σε αυτές της επόμενες ώρες",

			OPTIONS_REPORTS_OPTIONS : "Ρυθμίσεις Αναφορών",
				OPTIONS_REPORT_LIST_OPTIONS : "Ρυθμίσεις λίστας αναφορών",
					OPTIONS_REPORT_LIST_STYLE : "Βελτίωση του interface της λίστας αναφορών",

			OPTIONS_CHAT_OPTIONS : "Ρυθμίσεις Chat",
				OPTIONS_CHAT_URL_MOD : "Ενεργοποίηση της τροποποίησης του URL",
				OPTIONS_CHAT_STYLE_MOD : "Βελτίωση του style",

			OPTIONS_GUILD_OPTIONS : "Ρυθμίσεις Τάγματος",
				OPTIONS_GUILD_MESSAGE_INTERFACE : "Βελτίωση του interface των μηνυμάτων τάγματος",
				OPTIONS_GUILD_JAIL_INTERFACE : "Βελτίωση του interface της φυλακής",
				OPTIONS_GUILD_LIBRARY_INTERFACE : "Βελτίωση του interface της βιβλιοθήκης",
				OPTIONS_GUILD_BANK_INTERFACE : "Βελτίωση του interface της τράπεζας",
				OPTIONS_GUILD_BANKBOOK_INTERFACE : "Βελτίωση του interface του βιβλίου δωρεών της τράπεζας",
				OPTIONS_GUILD_MEDIC_INTERFACE : "Βελτίωση του interface του ιατρικού κέντρου",
				OPTIONS_GUILD_LIFE_TAB : "Εμφάνιση του tab Ζωή Τάγματος στο ιατρικό κέντρο",
				OPTIONS_GUILD_APPLICATION_ALERT: "Ειδοποίηση όταν υπάρχει αίτηση στο τάγμα σε αναμονή (για τους Διαχειριστές τάγματος)",
				OPTIONS_GUILD_NAMES_LEVELS : "Απόκρυψη ονομάτων και επίπεδο των κτιρίων του τάγματος (κεντρική σελίδα τάγματος)",
			
			OPTIONS_PANTHEON_OPTIONS : "Ρυθμίσεις Πάνθεον",
				OPTIONS_PANTHEON_QUESTS_ORDER : "Ενεργοποίηση ομαδοποίησης αποστολών",
				OPTIONS_PANTHEON_QUESTS_DETAILED_REWARDS : "Ενεργοποίηση λεπτομερούς εμφάνισης των ανταμοιβών",
				OPTIONS_PANTHEON_GODS_RECOLOR : "Επαναχρωματισμός των κουμπιών με βάση την εύνοια του κάθε θεού",
				
			OPTIONS_ARENA_OPTIONS : "Ρυθμίσεις Αρένας",
				OPTIONS_ARENA_SERVER_ARENA_ORDER : "Ταξινόμηση μονομάχων κατά επίπεδο",
				
			OPTIONS_PLAYER_OPTIONS : "Ρυθμίσεις Επισκόπησης Παίχτη",
				OPTIONS_PLAYER_SIMULATOR_BUTTON : "Ενεργοποίηση του κουμπιού προσομοίωσης",
				OPTIONS_PLAYER_MERCENARIES_FIGHT_TYPE : "Εμφάνιση του είδους μάχης των μισθοφόρων",
			
			OPTIONS_PREMIUM_OPTIONS : "Ρυθμίσεις GCA Premium",
				OPTIONS_PREMIUM_KEY : "Γράψτε το GCA Premium Κλειδί σας",
				OPTIONS_GET_PREMIUM : "Αγοράστε Κλειδί Premium",
				
			OPTIONS_GAME_FIXES_OPTIONS : "Διορθώσεις στο παιχνίδι",
				OPTIONS_FIXES_RTL_TOOLTIP_FIX : "Διόρθωση προβλήματος των κινούμενων tooltip (για τους δεξιά προς τα αριστερά server, πχ. Αραβικός)"
	}
}
