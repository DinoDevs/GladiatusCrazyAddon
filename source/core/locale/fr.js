/*
 * Gladiatus Crazy Addon Translation
 * Name : French
 * Code : [none]
 * Tag  : fr
 * Translator: titigrd, Vanlen_1er, wawane21@sfr.fr
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages['fr'] = {
	name : 'Français (French)',
	translators : ["titigrd", "Vanlen_1er", "wawane21"],
	locale : {
		info : {
			description : "L'Add-on le plus fou pour gladiatus !!"
		},
		general : {
			days : "Jours",
			minutes : "minutes",
			no_data : "Il n'y a pas de données",
			confirm : "confirmer",
			cancel : "annuler",
			close : "Fermer",
			error : "Erreur"
		},
		global : {
			life_potion_use : "utilise une potion de vie",
			life_potion_used : "potion de vie a été utilisé",
			life_potion_left : "Vous avez maintenant {{number}} potion (s) de vie",
			life_recover_full : "Vie pleine récupérer",
			message_private_write : "Écrire un message privé",
			message_guild_write : "Écrire un message de guilde",
			message_send : "Envoyer",
			message_sent_success : "Le message de guilde a bien été envoyé",
			message_sent_failed : "L'envoie de message à échoué",
			message_empty : "Le message est vide",
			message_exclude_me : "M'exclure",
			guild_market_goto : "Aller au Marché de guilde",
			guild_storage_goto : "Aller à l’Entrepôt",
			guild_bank_goto : "Aller à la Banque de guilde",
			guild_warcamp_goto : "Aller au Hall de Guerre",
			guild_jail_goto : "Aller au Négotium X",
			guild_library_goto : "Aller à la Bibliothèque",
			guild_medic_goto : "Aller à la Villa Médici",
			simulator_goto : "Aller au Simulateur de combat",
			stats_display : "Afficher mes stats",
			online_display : "Afficher les joueurs en ligne",
			online_friends : "Amis en ligne",
			guild_friends : "Amis de la guilde",
			family_friends : "Amis de votre famille",
			donate_gold_confirm : "Êtes-vous sûr de vouloir faire don de {{number}} or?",
			donate_gold_success : "Votre or à été donné",
			donate_gold_failed : "Le don d'or a échoué",
			donate_gold_no_gold : "Il n'y a pas d'or à donner",
			donate_gold_all_gold : "Donner tout votre or",
			quest_full : "Complet",
			quest_new : "Nouveau",
			pray_start : "Appuyez pour commencer à prier",
			pray_stop : "Appuyez pour finir de prier",
			heal : "guérir",
			notification_guild_application : "Il y a une application de guilde en attente!",
			low_durability_items : "Il y a {{number}} article (s) avec durabilité sous {{percent}}%",
			gold_exp_data_to_level_up : "Jours restants pour monter de niveau"
		},
		overview : {
		},
		pantheon : {
		},
		guild : {
			bank_all_gold : "Ajouter tout l'or",
			medic_lost_points : "Points perdus",
			medic_points_to_heal : "Points pour guérir",
			medic_life_after_heal : "Vie après les soins"
		},
		expedition : {
		},
		training : {
		},
		auction : {
			number_of_items : "Nombre d'éléments : {{number}}",
			number_of_bided_items : "Nombre d'éléments trouvés : {{number}}",
			hide_your_gold_here : "Cacher votre or ici",
			price_value_function : "Prix = Valeurs + {{number}}"
		},
		markets : {
		},
		forge : {
		},
		packages : {
		},
		settings : {
			settings : "Paramètres",
			description : "Activer ou désactiver les paramètres que vous voulez pour l'Addon!",
			description_click_button : "Cliquez sur le bouton ci-dessous pour alleraux paramètres de l'addon ...",
			category_global : "Configuration Générale",
			category_overview : "Configuration de la vue d'ensembles",
			category_messages : "Configuration de la section Messages",
			category_packages : "Configuration de la section Paquets",
			category_reports : "Configuration de la section rapports",
			category_training : "Configuration de la section entrainement",
			category_merchants : "Configuration de la section des Marchands",
			category_forge : "forge",
			category_arena : "arène",
			category_magus : "Magus",
			category_market : "marché",
			category_expedition : "expédition",
			category_guild : "Configuration de la section Guilde",
			category_auction : "Paramètres des enchères",
			category_sound : "son",
			category_data : "info / donné",
			category_global$language_select : "Changer la langue de l'addon",
			category_global$extended_hp_xp_info : "Afficher les infos HP et XP améliorés",
			category_global$shortcuts_bar : "Afficher la barre de bouton en haut ",
			category_global$auction_status_bar : "Afficher la barre d'état des enchères",
			category_global$top_fixed_bar : "Activer la barre de défilement en haut",
			category_global$remember_tabs : "Sauvegarde du dernier onglet utiliser pour les marchands et les inventaires",
			category_overview$analyze_items : "Analysez les éléments du joueur",
			category_overview$more_statistics : "Fournir les statistiques de plus de joueurs",
			// Settings - Main menu
			category_main_menu$advance_main_menu : "Améliorer le menu principal",
			category_main_menu$merchants_timer : "Afficher le chronomètre du marchand",			
			category_messages$messages_layout : "Améliorer l’interface des messages",
			category_messages$new_message_focus : "Définir le focus instantané sur ​​le contenu",
			category_messages$new_message_friend_list : "Activer le bouton \"Liste d'amis\"",
			category_packages$pages_to_load : "Nombre maximum de pages chargées",
			category_reports$style_change : "Améliorer l'interface de la liste des rapports",
			category_guild$jail_layout : "Améliorer l'interface du Négotium X",
			category_guild$library_layout : "Améliorer l'interface de la Bibliothèque",
			category_guild$bank_donate_layout : "Améliorer l'interface de la Banque",
			category_guild$bank_book_layout : "Améliorer l'interface du livre des dons",
			category_guild$medic_layout : "Améliorer l'interface de la Villa Médici",
			category_auction$items_counters : "Afficher le nombres d'éléments",
			category_auction$item_level : "Afficher le level de l’élément",
			category_auction$x3_items_per_line : "Afficher 3 éléments par ligne",
			save : "Sauver tout",
			notification_reload : "Recharger la page pour que les modifications prennent effet"
		}
	}
}

gca_languages._active = "fr";
