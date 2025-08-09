/*
 * Gladiatus Crazy Addon Translation
 * Name : Ukrainian
 * Code : uk
 * Tag  : ukr
 * Translator: Lys_Mykyta
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages["uk"] = {

	// Language name
	name : "Українська (Ukrainian)",
	// Translators (authors of this script)
	translators : ["Lys_Mykyta"],

	// Translations object
	locale : {
		// Addon info
		info : {
			description : "Найбожевільніший додаток до Gladiatus!"
		},

		// General
		general : {
			// Days
			days : "дн",
			// Minutes
			minutes : "хв",
			// Hours
			hours : "год",
			// No data
			no_data : "Немає даних",

			// Buttons
			confirm : "Підтвердити",
			cancel : "Скасувати",
			close : "Закрити",
			error : "Помилка",
			yes : "Так",
			no : "Ні",
			ok : "Добре"
		},

		// Global
		global : {
			// Use a life potion
			life_potion_use : "Використати Цілюще Зілля",
			life_potion_used : "Цілюще Зілля використано",
			life_potion_left : "Цілющих Зіль залишилось: {{number}}",
			
			// Life/Expedition/Dungeon points recovery
			life_recover_full : "Здоров'я повністю відновиться через",
			expedition_recover_full : "Очки Експедицій повністю відновляться через",
			dungeon_recover_full : "Очки Підземель повністю відновляться через",
			health_notification: "Здоров'я нижче",

			// Button bar - Message
			message_private_write : "Написати приватне повідомлення",
			message_guild_write : "Написати повідомлення Гільдії",
			message_send : "Надіслати",
			message_sent_success : "Повідомлення успішно надіслано",
			message_sent_failed : "Не вдалося надіслати повідомлення",
			message_empty : "Повідомлення порожнє",
			message_exclude_me : "Окрім себе",
			
			// Welcome message - text
			welcome_addon : "Ласкаво просимо до Gladiatus Crazy Addon!",
			welcome_version : "Поточна версія додатку",
			welcome_changelog : "Список змін",

			// Button bar buttons
			guild_market_goto : "До Ринку гільдії",
			guild_storage_goto : "До Складу гільдії",
			guild_bank_goto : "До Банку гільдії",
			guild_baths_goto: "До Бань гільдії (Вокс I)",
			guild_warcamp_goto : "До Залу Майстра Війни гільдії",
			guild_arenareports_goto : "До звітів про бої гільдії",
			guild_jail_goto : "До Неготіам Х гільдії",
			guild_library_goto : "До Бібліотеки гільдії",
			guild_templum_goto : "До Храму гільдії",
			auction_food_goto : "До Аукціону їжі",
			guild_medic_goto : "До Дому медика гільдії",
			simulator_goto : "До симулятора боїв",
			stats_display : "До моєї статистики",
			online_display : "До списку гравців онлайн",

			// Online friends
			online_friends : "Друзі онлайн",
			guild_friends : "Друзі у Гільдії",
			family_friends : "Друзі у Братстві",

			// Guild donate
			donate_gold_confirm : "Ви дійсно хочете пожертвувати {{number}} золота?",
			donate_gold_success : "Золото успішно пожертвувано",
			donate_gold_failed : "Не вдалося пожертвувати золото",
			donate_gold_no_gold : "Відсутнє золото, яке можна пожертвувати",
			donate_gold_all_gold : "Пожертвувати усе наявне золото",

			// Quest timer
			quest_full : "Ліміт",
			quest_new : "Нове",

			// Pray icon
			pray_start : "Натисніть для початку молитви",
			pray_stop : "Натисність для завершення молитви",
			heal : "лікується",

			// Notifications
			notification_guild_application : "Нерозглянута заявка до Гільдії!!",
			notification_guild_attack_ready : "Доступна нова атака в межах війни Гільдій!",
			low_durability_items : "{{number}} предм. досягли міцності нижче {{percent}}%",
			item_worth_rubies : "Предмет продається за рубіни!",

			// Gold - Exp data
			gold_exp_data : "Дані про золото та досвід",
			gold_exp_data_today : "Останні 24 години",
			gold_exp_data_week : "Останні 7 діб",
			gold_exp_data_avg_day : "Середні значення за добу",
			gold_exp_data_to_level_up : "Днів до нового рівня",
			gold_exp_data_package_tax : "Щотижневий податок на перепаковку золота",
			gold_exp_data_measurements : "Показники",
			gold_exp_data_total_exp : "Усього досвіду",
			gold_exp_data_total_gold : "Усього золота",
			gold_exp_data_reset : "Статистику було скинуто!",
			gold_exp_data_desc: "Дані оновлюються що 5 хвилин. Продаж куплених предметів подвоїть показники золота.",
			
			// Items
			// Mercenaries
			mercenary_type : "Тип: {{name}} ({{number}})",
			gains_with_full_stats: "Із заповненою шкалою навичок:",
			// Item materials
			base : "База",
			prefix : "Префікс",
			suffix : "Суфікс",
			
			// Gods cooldowns
			gods_cd_title : "Зворотній відлік Божеств",

			// Forge scrolls book (but quite general keywords)
			details : "Деталі",
			name : "Назва",
        },

		// Overview
		overview : {
			// Stats Difference
			stats_difference : "Різниця",
			// Drop items to see materials to repair feature
			drop_item_see_materials_repair : "Перемістіть предмет, щоб побачити необхідні для ремонту матеріали",
			workbench_6th_slot_empty : "6-й слот Верстата повинен бути порожнім",

			// More player info
			more_player_info : "Більше про гравця",
			can_use_max_item_level : "Максимальний рівень використовуваних предметів: {{max}}",
			can_see_market_max_item_level : "Максимальний рівень видимих предметів на Ринку: {{max}}",
			can_see_auction_item_levels : "Максимальний рівнень видимих предметів на Аукціоні від {{min}} до {{max}}"
		},
		
		// Messages
		messages : {
			block_flag : "Повідомлення було помічено як спам!"
		},

		// Pantheon section
		pantheon : {
			// Mystery box
			mysterybox_open_all : "Відкрити усі",
			mysterybox_open_stop : "Стоп",
			mysterybox_open_done : "Готово!"
		},

		// Guild section
		guild : {
			// Guild Bank
			bank_all_gold : "Додати усе наявне золото",
			total_donations: "Усього пожертвувано",
			min_upgrades_gold: "Золото на покращення (мінімум)",
			max_stolen_gold: "Завойоване у інших гільдій золото (максимум)",

			// Library
			library_per_point_cost : "Ціна за одиницю навички",
			library_gold_left : "Золото Гільдії після активації",

			// Medic
			medic_lost_points : "Втрачені очки здоров'я",
			medic_points_to_heal : "Очків здоров'я буде вилікувано",
			medic_life_after_heal : "Очків здоров'я після лікування",

			// Baths
			pinned_message : "Закріплене повідомлення Гільдії",
			pin_unpin_message : "Закріпити/Відкріпити це повідомлення",
			pinned_message_info : "Закріплені повідомлення відображаються поверх інших для усіх членів гільдії, у яких увімкнена дана опція",
			
			// Important ranks button
			important_ranks : "Важливі ранги",
			
			// Rewards - guild battles
			rewards : "Нагороди",
			
			// Battle statistics table
			win : "Перемоги",
			loss : "Поразки",
			draw : "Нічиї",
			win_percentage : "Перемоги (%)",
			loss_percentage : "Поразки (%)",
			draw_percentage : "Нічиї (%)"
		},

		// Expedition
		expedition : {
			material_drop_chance : "{{number}}% шанс серед усіх матеріалів, що випадають"
		},

		// Arena section
		arena : {
			global_arena_title : "Глобальна Арена",
			global_arena_description : "Ця ультимативна арена збирає гладіаторів з усього світу; замість золота чи досвіду гладіатори б'ються виключно за місце у світовому чарті!",
			global_arena_load : "Список суперників",
			global_highscore : "Глобальний рейтинг",
			country : "Країна",
			server : "Сервер",
			target_list : "Список цілей",
			target_list_add : "Додати до списку цілей",
			target_list_remove : "Видалити зі списку цілей",
			error_sth_went_wrong : "Щось пішло не так",
			error_response : "Сталася помилка на сервері",
			error_connection : "Помилка з'єднання",
			attack_player : "Натисніть для атаки “{{name}}”",
			fight_won : "Ви перемогли!",
			fight_lost : "Ви програли цей бій...",
			player_tired : "Ви втомилися та мусите відпочити.",
			player1_hits_player2 : "{{name1}} завдає удару по {{name2}}",
			player_takes_x_damage :"{{name}} отримує {{number}} од. шкоди",
			player_dies :"{{name}} помирає"
		},

		// Training section
		training : {
			// Points analysis
			stats_points : "Очки навичок",
			points_breakdown : "Детальна розбивка",
			points_breakdown_damage : "Шкода: +{{integer}} (+{{float}})",
			points_breakdown_block : "Блок: +{{integer}}% (+{{float}}%)",
			points_breakdown_block_max : "Блок: максимальне значення",
			points_breakdown_block_short : "Блок: +{{integer}}%",
			points_breakdown_normal_hit : "Шанс поцілити: +{{integer}}% (+{{float}}‰) *",
			points_breakdown_critical_hit : "Шанс критичного удару: +{{integer}}% (+{{float}}‰)",
			points_breakdown_critical_hit_short : "Критичний удар: +{{integer}}%",
			points_breakdown_double_hit : "Шанс на подвійний удар: +{{integer}}% (+{{float}}‰) *",
			points_breakdown_double_hit_factor : "Подвійний удар: {{number}}",
			points_breakdown_avoid_double_hit_factor : "Уникнення подвійного удару: {{number}}",
			points_breakdown_avoid : "Шанс уникнення критичного удару: +{{integer}}% (+{{float}}‰)",
			points_breakdown_avoid_max : "Шанс уникнення критичного удару: макс. значення",
			points_breakdown_avoid_short : "Уникнення критичного удару: +{{integer}}%",
			points_breakdown_enemy_normal_hit : "Шанс суперника на успішну атаку: {{integer}}% ({{float}}‰) *",
			points_breakdown_enemy_double_hit : "Шанс суперника на подвійну атаку: {{integer}}% ({{float}}‰) *",
			points_breakdown_life : "Очки здоров'я: +{{number}}",
			points_breakdown_regeneration : "Регенерація за годину: +{{number}}",
			points_breakdown_threat : "Загроза: +{{integer}} (+{{float}})",
			points_breakdown_heal : "Зцілення: +{{integer}} (+{{float}})",
			points_breakdown_critical_heal : "Критичне зцілення: +{{integer}}% (+{{float}}‰)",
			points_breakdown_critical_heal_max : "Критичне зцілення: максимальне значення",
			stats_calculated_with_yourself_as_an_opponent : "* Навички обраховуються, як ніби ви атакуєте самі себе.",
			values_in_parenthesis_explanation : "Числа у дужках показують значення перед заокругленням.",
			// Cost calculator
			total_cost : "Усього",
			// Discount show
			costs_discount : "Знижка на тренування: {{number}}%",
			// CTRL Hint 
			ctrl_hint : "Підказка: Утримуйте CTRL, щоб додати/відняти 10 очків"
		},

		// Auction section
		auction : {
			// Info
			items_info : "Інформація про предмет",
			// Number of items in the page
			number_of_items : "Кількість предметів : {{number}}",
			// Number of items that have been bidden in the page
			number_of_bided_items : "Кількість предметів зі ставками : {{number}}",
			// Message on items that you can buy and sell at the same price
			hide_your_gold_here : "Тут можна сховати золото",
			// Price of item equals to its value
			price_value_function : "Ціна = Ціна + {{number}}",
			// Levels you can see
			levels_you_can_see : "Рівень видимих предметів від {{min}} до {{max}}.",
			// Sort
			sort : "Сортувати",
			sort_by : "Сортувати за",
			sort_order : "Порядок",
			asc : "Висхідний",
			desc : "Низхідний"
		},

		// Markets section
		markets : {
			// Warnings
			item_cost_only_x_gold : "Цей предмет коштує усього {{number}} золота.",
			item_is_soulbound : "Цей предмет має прив'язку до персонажа.",
			item_cant_buy_back : "Ви не зможете викупити цей предмет.",
			// Are you sure
			are_you_sure_you_want_to_buy : "Ви дійсно хочете купити предмет?",
			click_enter_to_sell : "натисність enter ⏎ для продажу",
			// Tooltips
			add_fees_in_price : "Додати розмір податку до ціни",
			// Item checkboxes button
			checkboxes_button : "Скасувати вибрані",
		},
		
		// Forge
		forge : {
			forge_ended : "Кування завершено!",
			recraft_item : "Створити предмет ще раз",
			show_hide_doll : "Показати/Приховати слоти персонажа",
			horreum_material_change : "Обміняти матеріали у Сараї",
			unknown_scrolls_share_code : "Посилання на невідомі мені сувої",
			use_share_code : "Застосувати чуже посилання",
			use_share_code_description : "Вставте посилання, щоб побачити вже вивчені сувої:",
			invalid_share_code : "Посилання недійсне",
			add_last_item : "Додати останній предмет",
			hide_learned: "Приховати вивчені",
			unlearned_scroll: "Сувій ще не вивчено",
			underworld_scroll: "Сувій із Підземного світу",
		},
		
		// Merchants
		merchants : {
			search_item_in_merchants : "Шукати предмет у торговців",
			no_such_item : "Предмет не знайдено."
		},
		
		// Packages
		packages : {
			event_items : "Івентові предмети",
			known_scroll : "Сувій вже вивчено",
			unknown_scroll : "Сувій ще не вивчено",
			advance_filters : "Додаткові фільтри",
			advance_filters_apply : "Застосувати фільтри",
			advance_filters_clear : "Очистити фільтри",
			advance_filters_found : "(знайдено {{items}})"
		},
		
		// Report
		reports : {
			avg_damage : "Середня шкода",
			avg_heal : "Середнє зцілення",
			total_hits : "Усього ударів",
			hits : "Ударів",
			dodge : "Уворотів чи блокувань",
			points : "Очок"
		},

		// Cross-Browser Sync
		sync : {
			are_you_sure : "Ви впевнені, що хочете увійти під іменем {{name}}?",
			gladiatus_crazy_addon_dependency : "Вам потрібно встановити Gladiatus Crazy Addon на інший браузер.",
			how_to_sync_info : "Скопіюйте посилання та вставте його в іншому браузері, або відскануйте QR-код."
		},

		// Settings
		settings : {
			// Settings
			settings : "Налаштування",
			// Description
			description : "Увімкнути або вимкнути функції додатку.",
			description_click_button : "Натисність кнопку нижче, щоб перейти до налаштувань додатку...",
			
			// Categories
			category_global : "Глобальні",
			category_overview : "Огляд",
			category_main_menu : "Головне меню",
			category_messages : "Повідомлення",
			category_packages : "Пакунки",
			category_pantheon : "Пантеон",
			category_reports : "Звіти",
			category_training : "Тренування",
			category_merchants : "Торговці",
			category_forge : "Кузня",
			category_arena : "Арена",
			category_magus : "Магус",
			category_market : "Ринок",
			category_expedition : "Експедиції",
			category_guild : "Гільдія",
			category_auction : "Аукціон",
			category_accessibility : "Спецможливості",
			category_events : "Події",
			category_sound : "Звук",
			category_data : "Дані",

			// Settings - Global
			category_global$language_select : "Оберіть мову додатку",
			category_global$browser_notifications : "Увімкнути нотифікації браузера",
			category_global$extended_hp_xp_info : "Показувати розширену інформацію про ОЗ та ОД",
			category_global$extended_hp_xp_info_potion : "Показувати іконку Цілющого Зілля",
			category_global$hp_timer_for_full_life : "Показувати хвилини до повного зцілення.",
			category_global$health_warning : "Надсилати застереження, якщо ваші ОЗ нижче, ніж:",
			category_global$expedition_dungeon_points_recover_timer : "Показувати хвилини до заповнення очків Експедицій/Підземель",
			category_global$shortcuts_bar : "Увімкнути панель швидкого доступу",
			category_global$shortcuts_bar_buttons : "Виберіть ярлики для відображення на панелі швидкого доступу",
			category_global$auction_status_bar : "Показувати панель статусу Аукціону",
			category_global$auction_status_notification : "Сигналізувати про зміну статусу Ауціону",
			category_global$top_fixed_bar : "Постійно Показувати головну панель персонажа при скролі",
			category_global$remember_tabs : "Запам'ятати вибрані гравцем вкладки у торговців",
			category_global$attacked_timers : "Показувати таймери атак на Аренах",		
			category_global$notify_new_guild_application : "Повідомляти про нові заявки до Гільдії",
			category_global$check_guild_pinned_message : "Показувати закріплені у Банях повідомлення Гільдії у вкладці повідомлень",
			category_global$check_guild_application_pinned_messages_interval : "Перевіряти наявність нових заявок до Гільдії та закріплених повідомлень Гільдії з інтервалом (хв)",
			category_global$notify_guild_attack_ready : "Сигналізувати про відкат атаки у межах Війни Гільдій",
			category_global$notify_guild_attack_ready_interval : "Перевіряти відкат атаки у межах Війни Гільдій з інтервалом (хв)",
			category_global$x_scroll : "Увімкнути горизонтальний скрол",
			category_global$item_shadow : "Активувати тіні предметів",
			category_global$inventory_options_group : "Згрупувати опції інвентаря",
			category_global$inventory_gold_info : "Показувати ціну предметів у інвентарі",
			category_global$pagination_layout : "Змінити зовнішній вигляд клавіш із номерами вкладок",
			category_global$gold_exp_data : "Показувати дані про золото та досвід",
			category_global$pray_shorcut : "Показувати клавішу молитви у Підземному світі",			
			category_global$show_durability : "Показувати очки міцності у нижньому лівому куті предмета",
			category_global$min_durability : "Сигналізувати про досягнення предметом сумарної міцності нижче, ніж _% (0 для деактивації)",
			category_global$show_forge_info : "Показувати матеріали, з яких складається предмет",
			category_global$show_mercenaries_real_name_and_combat_stats : "Показувати реальні імена (типи) найманців",
			category_global$show_upgrade_values : "Показувати числові значення бафів на їх іконках",
			category_global$global_arena_timer : "Показувати таймер Глобальної Арени",
			category_global$gladiatus_site_fixes : "Виправити недоліки візуального дизайну сайта",
			category_global$gca_custom_scrollbar : "Використовувати унікальний скролбар від авторів додатку",
			category_global$lock_section_visibility : "Запам'ятати вибір гравця в усіх приховуваних секціях на сайті",
			category_global$hide_language_flags : "Приховати прапори обраної мови у профілі гладіаторів",
			category_global$bar_hide_exp_btn : "Приховати клавішу Експедицій",
			category_global$bar_hide_dun_btn : "Приховати клавішу Підземель",
			category_global$bar_hide_are_btn : "Приховати клавішу Арени",
			category_global$bar_hide_ct_btn : "Приховати клавішу Кола Турма",
			category_global$clear_arena_notifications : "Автоматично приховувати повідомлення про атаку в межах Арени",
			category_global$clear_ct_notifications : "Автоматично приховувати повідомлення про атаку в межах Кола Турма",	
			category_global$surprise_me : "Здивуйте мене.",
			category_global$gods_cooldown : "Показувати кулдаун Божеств",
			// Settings - Overview
			category_overview$analyze_items : "Аналізувати бонуси предметів (потрібно для тренувань)",
			category_overview$food_life_gain : "Показувати кількість ОЗ від їжі",
			category_overview$block_avoid_caps : "Показувати максимум очок блокування та ухиляння",
			category_overview$best_food : "Підсвітити найбільш підходящу їжу",
			category_overview$overfeed_food : "Затемнити їжу, яка відновить надто багато ОЗ",
			category_overview$double_click_consume : "Подвійний клік на предметах для їх використання",
			category_overview$daily_bonus_log : "Показувати панель щоденних бонусів за вхід до гри",
			category_overview$buffs_detailed_time : "Показувати детальні таймери на бафах Гільдії",
			category_overview$mercenaries_manager : "Показувати менеджер найманців",
			category_overview$mercenary_tooltip_show : "Показувати детальну інформацію про найманців",
			category_overview$more_statistics : "Показувати більше статистики на відповідній вкладці",
			category_overview$achivements_layout : "Покращити дизайн досягнень (шкала прогресу)",
			category_overview$costumes_layout : "Покращити відображення костюмів",
			category_overview$items_repair_overview : "Показувати клавішу потрібних для ремонту матеріалів",
			// Settings - Main menu
			category_main_menu$advance_main_menu : "Покращити головне меню",
			category_main_menu$submenu_click_to_change : "Перемикання між підменю Міста та Локацій через клік",
			category_main_menu$menu_merge_merchants : "Об'єднати торговців в одній вкладці",
			category_main_menu$menu_merge_items : "Об'єднати Кузню, Плавильню, Верстат, Сарай та Магуса в одній вкладці",
			category_main_menu$quest_timer : "Показувати статус та таймер завдань",
			category_main_menu$centurio_powerups_timers : "Показувати таймери Центуріона та Пактів на пункті меню Преміум",
			category_main_menu$forge_timers : "Показувати індикатор таймера Кузні/Плавильні",
			category_main_menu$merchants_timer : "Показувати індикатор таймера торговців",
			category_main_menu$menu_hide_citygate : "Приховати пункт меню Ворота Міста",
			// Settings - Messages
			category_messages$messages_layout : "Покращити розташування повідомлень",
			category_messages$show_unread : "Підсвітити непрочитані повідомлення",
			category_messages$separate_days : "Відділити повідомлення у межах кожної доби",
			category_messages$more_guild_mate_info : "Показувати більше інформації про членів Гільдії",
			category_messages$show_message_links : "Показувати посилання у повідомленнях",
			category_messages$get_guild_battle_info : "Автоматично завантажити результат Битви Гільдій",
			category_messages$show_sidebar : "Показувати бокову панель повідомлень",
			category_messages$fix_header_links : "Виправити помилку при кліці на автора повідомлення Гільдії",
			category_messages$new_message_focus : "Фокусувати курсор на тексті повідомлення",
			category_messages$new_message_friend_list : "Показувати клавішу Вибрати друга зі списку",
			category_messages$spam_ad_blocker : "Позначати та приховувати спам-повідомлення",
			// Settings - Packages
			category_packages$filters_layout : "Покращити розташування фільтрів",
			category_packages$small_items_layout : "Зменшити розмір предметів",
			category_packages$items_layout : "Покращити розташування предметів:",
			category_packages$compact_info_layout : "Зробити інфо-панель компактнішою",
			category_packages$list_view_layout : "Показувати пакунки списком",
			category_packages$load_more_pages : "Завантажувати більше сторінок",
			category_packages$pages_to_load : "Кількість завантажуваних сторінок",
			category_packages$item_price : "Показувати ціну предметів",
			category_packages$special_category_features : "Активувати спеціальні можливості у межах категорій\n•Показувати вивчені/невивчені сувої\n•Показувати, що предмет містить невивчені сувої",
			category_packages$double_click_open : "Відкривати пакунки подвійним кліком",
			category_packages$advance_filter : "Детальні фільтри пакунків",
			category_packages$pop_over_bag : "Інвентар завжди відображається при скролі сторінки",
			category_packages$packages_shortcuts : "Додати посилання на тип предметів",
			// Settings - Pantheon
			category_pantheon$quests_reorder : "Згрупувати завдання за типом",
			category_pantheon$quests_detailed_rewards : "Показувати детальні нагороди",
			category_pantheon$missions_show_completed : "Згрупувати завершені завдання",
			category_pantheon$gods_show_points_percent : "Показувати відсоток Очків Божеств",
			category_pantheon$open_many_mysteryboxes : "Відкривати кілька Скринь Божественної Долі за раз",
			category_pantheon$show_mysterybox_rewards_rubies : "Показувати ціну предметів у Скринях в рубінах",
			category_pantheon$show_mysterybox_rewards_owned : "Відоражати кількість наявних у гравця нагород із Скрині",
			// Settings - Reports
			category_reports$style_change : "Покращити розташування звітів про Експедицію/Підземелля",
			category_reports$load_loot_tooltips : "Показувати деталі про нагороду",
			category_reports$found_items : "Збирати дані про знайдені предмети",
			category_reports$battle_analyzer : "Аналізувати звіти та показувати ОЗ",
			// Settings - Training
			category_training$show_discount : "Показувати знижку на тренування",
			category_training$show_basics_in_bars : "Показувати базові значення навичок",
			category_training$multiple_train : "Активувати тренування кількох навичок за раз",
			category_training$calculator_train : "Показувати калькулятор вартості",
			category_training$show_analyze_items_data : "Показувати дані про бонус предметів",
			category_training$show_points_after_upgrade : "Показувати вплив тренування на бойові навички",
			// Settings - Merchants
			category_merchants$fade_unaffordable_items : "Приховати недоступні предмети",
			category_merchants$ruby_icon_on_items : "Додати іконку на предмети, що коштують рубіни",
			category_merchants$show_shop_info : "Показувати сумарну ціну предметів на вкладці",
			category_merchants$double_click_actions : "Купувати/продавати через подвійний клік",
			category_merchants$alt_click_actions : "(Утримувати) Alt + Клік, щоб купити чи продати",
			category_merchants$hide_prices : "Приховати спливаючі ціни при торгівлі",
			// Settings - Forge
			category_forge$material_links : "[Кузня/Ремонт] Показувати додаткові іконки для матеріалів, яких бракує",
			category_forge$show_levels : "[Кузня] Показувати рівень префікса/суфікса/бази предмета біля їх назв",
			category_forge$horreum_materials_names : "[Сарай] Показувати назву матеріалу біля іконки",
			category_forge$horreum_remember_options : "[Сарай] Запам'ятати поставлені гравцем пташки у чекбоксах",
			category_forge$horreum_select_meterials : "[Сарай] Вибирати матеріал за допомогою кліка на ньому",
			category_forge$double_click_select : "[Плавильня/Ремонт] Вибирати матеріал через подвійний клік на ньому",
			category_forge$forge_notepad : "Додати поле для нотаток",
			category_forge$add_last_item : "Додати клавішу Попередній предмет",	
			// Settings - Arena
			category_arena$ignore_attack_confirmations : "Пропускати повідомлення з вимогою підтвердження (більше 5 атак та ін.)",
			category_arena$show_simulator_imagelink : "Показувати зображення-посилання на симулятор (simulator.dinodevs.com)",
			category_arena$sort_by_lvl : "Сортувати гравців на Арені за рівнем",
			category_arena$highlight_guild_members : "Виділяти гравців на інших серверах, що можуть бути членами вашої Гільдії",
			category_arena$target_list : "Показувати список цілей",
			category_arena$overhaul_tables : "Відокремити та покращити дизайн рангових списоків",
			// Settings - Magus
			category_magus$fade_unimprovable_items : "Затемнити предмети, що не можуть бути покращені",
			// Settings - Market
			category_market$soulbound_warning : "Підтвердження про покупку прив'язаних предметів",
			category_market$one_gold_warning : "Підтвердження на покупку предметів за 1 золота",
			category_market$cancel_all_button : "Показувати клавішу Скасувати усе",
			category_market$remember_sell_duration : "Запам'ятати востаннє вибрану тривалість лоту",
			category_market$add_fees_button : "Показувати клавішу [+], яка додає податки до ціни лоту",
			category_market$sell_duration : "Вибрати тривалість лоту за замовчуванням",
			category_market$one_gold_mode : "Додати швидкі клавіші цін на лоти",
			category_market$custom_prices : "Власні швидкі клавіші цін. Відокремлюйте кожне значення комами. (напр., '10000, 10.000, 200%')",
			category_market$remember_sort : "Запам'ятати порядок сортування",
			category_market$double_click_select : "Вибирати предмет через подвійний клік",
			category_market$sell_warning_icons : "Застереження при продажі предмета",
			category_market$sell_with_enter : "Продавати предмети через натискання ENTER ⏎",
			category_market$item_checkboxes : "Додати чекбокси для кожного предмета",
			// Settings - Expedition
			category_expedition$show_enemy_drops : "Показувати матеріали, що можуть випасти з ворогів",
			category_expedition$underworld_layout : "Розташувати ворогів у Підземному світі так само, як у Експедиціях",
			// Settings - Guild
			category_guild$jail_layout : "Покращити дизайн Неготіам Х",
			category_guild$library_layout : "Покращити дизайн Бібліотеки",
			category_guild$library_fade_non_scrolls : "Затемнити у Бібліотеці предмети, що не є рецептами",
			category_guild$library_tooltip_data : "Показувати у Бібліотеці додаткову інформацію",
			category_guild$bank_donate_layout : "Покращити дизайн пожертв у Банку",
			category_guild$bank_book_layout : "Покращити дизайн книги пожертв у Банку",
			category_guild$bank_book_show_changes : "Показувати пожертви з часу останнього візиту до Банку",
			category_guild$medic_layout : "Покращити дизайн Дому медика",
			category_guild$show_battle_rewards : "Показувати нагороди за кожну Битву Гільдій",
			category_guild$show_battle_statistics : "Показувати статистику Битви Гільдій",
			// Settings - Auction
			category_auction$items_counters : "Підраховувати предмети та предмети зі ставками",
			category_auction$more_search_levels : "Показувати більше рівнів предметів у пошуці",
			category_auction$item_price_analyze : "Аналізувати ціну предметів",
			category_auction$item_level : "Показувати рівень предметів",
			category_auction$item_name : "Показувати назву предметів",
			category_auction$x3_items_per_line : "Показувати по 3 предмети у ряд",
			category_auction$multi_bids : "Робити кілька ставок без оновлення сторінки",
			category_auction$extra_item_stats : "Показувати додаткові показники у описі предметів",
			category_auction$save_last_state : "Запам'ятати вибір гравця у налаштуваннях Аукціону",
			category_auction$special_category_features : "Активувати спеціальні можливості у категоріях\n• Показувати на предметі вивчені/невивчені префікси/суфікси",
			// Settings - Accessibility
			category_accessibility$white_level_indicators : "Змінити колір рівня предметів на білий",
			category_accessibility$qualty_symbols_indicators : "Додати на предмети індикатори їх якості",
			category_accessibility$tooltips_qualty_white : "Змінити назву предметів на білу",
			category_accessibility$tooltips_qualty_symbols : "Додати в опис предметів індикатори їх якості",
			category_accessibility$highlight_item_duplicates : "Підсвітити дублікати",
			// Settings - Events
			category_events$craps_timer : "Показувати на сторінці таймер івенту Гра в кості",
			category_events$server_quest_timer : "Показувати на сторінці таймер загальносерверних івентів",
			// Settings - Sound
			category_sound$cooldown_sound_notifications : "Активувати звукові повідомлення про відкат (Експедицій, Підземель, Арени)",
			category_sound$muted : "Заглушити/увімкнути звуки",
			category_sound$volume : "Гучність звуків",
			// Settings - Data
			category_data$export_settings : "Зберегти налаштування у файлі",
			category_data$import_settings : "Завантажити налаштування із файлу",
			category_data$export_settings_to_notes : "Зберегти налаштування у нотатках персонажа",
			category_data$import_settings_from_notes : "Завантажити налаштування із нотаток персонажа",
			category_data$reset_settings : "Скинути налаштування додатку",
			category_data$clear_data : "Очистити усі дані додатку",
			category_data$clear_cache_data : "Очистити кеш додатку",
			category_data$cross_browser_login : "Увійти через інший браузер",
			category_data$export_error_player_settings : "Зберегти дані невідомого користувача у файлі", // TODO: This may be removed on the future

			// Buttons
			save : "Зберегти",
			export : "Експортувати",
			import : "Імпортувати",
			reset : "Скинути",
			clear : "Очистити",
			do_not_show : "Не показувати",
			show_as : "Показувати як",
			show_info : "Подробиці",
			each_category : "Застосувати до категорії",
			all_category : "Застосувати до усіх категорій",
			do_not_run : "Не виконувати",
			default: "За замовчуванням",
			highlight: "Виділити",
			show_original : "Оригінал",

			// Info
			translated_percent : "Відсоток перекладу: {{number}}%",
			translated_by : "Автор: {{string}}",
			reset_settings_confirm : "Ви справді хочете скинути налаштування додатку?",
			clear_data_confirm : "Ви справді хочете очистити усі дані додатку?",
			data_exported_save_the_file : "Дані було вивантажено. Збережіть файл.",
			missing_translations : "Переклад відсутній",

			// Notifications
			notification_reload : "Перезавантажте сторінку, щоб зміни набули чинності",
		}
	}
}
