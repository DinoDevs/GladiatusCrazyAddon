/*
 * Gladiatus Crazy Addon Translation
 * Name : Russian
 * Code : [none]
 * Tag  : ru
 * Translator: M33312, iks, Impulse99
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages['ru'] = {
	name : 'Русский (Russian)',
	translators : ["M33312", "iks", "Impulse99"],
	locale : {
		info : {
			description : "Лучший аддон для Гладитуса!"
		},
		general : {
			days : "дней",
			minutes : "минут(ы)",
			no_data : "Нет данных",
			confirm : "Подтверждение",
			cancel : "Отмена",
			close : "Закрыть",
			error : "Ошибка"
		},
		global : {
			life_potion_use : "Использовать зелье жизни",
			life_potion_used : "Зелье жизни было использовано",
			life_potion_left : "У вас есть {{number}} зелье(ий) жизни",
			life_recover_full : "Здоровье полностью восстановится через",
			message_private_write : "Написать личное сообщение",
			message_guild_write : "Написать сообщение гильдии",
			message_send : "Отправить",
			message_sent_success : "Сообщение гильдии было отправлено",
			message_sent_failed : "Отправка сообщения гильдии не удалась",
			message_empty : "Пустое сообщение",
			message_exclude_me : "Кроме меня",
			guild_market_goto : "Перейти на рынок гильдии",
			guild_storage_goto : "Перейти на склад гильдии",
			guild_bank_goto : "Перейти в банк гильдии",
			guild_warcamp_goto : "Перейти в зал мастера войны",
			guild_jail_goto : "Перейти в Неготиам",
			guild_library_goto : "Перейти в библиотеку гильдии",
			guild_medic_goto : "Перейти в медицинский пункт гильдии",
			simulator_goto : "Просимулировать",
			stats_display : "Отобразить мои статы",
			online_display : "Отобразить игроков в онлайне",
			online_friends : "Друзья онлайн",
			guild_friends : "Друзья в гильдии",
			family_friends : "Друзья из братства",
			donate_gold_confirm : "Вы уверены, что хотите пожертвовать {{number}} золота?",
			donate_gold_success : "Ваше золото было пожертвовано",
			donate_gold_failed : "Ошибка пожертвования",
			donate_gold_no_gold : "Нет золота для пожертвования",
			donate_gold_all_gold : "Пожертвовать все Ваше золото",
			quest_full : "Заполнено",
			quest_new : "Новый / Создать",
			pray_start : "Нажмите для того, чтобы начать молиться",
			pray_stop : "Нажмите для того, чтобы закончить молиться",
			heal : "лечится",
			notification_guild_application : "Поступила заявка в гильдию",
			low_durability_items : "Есть {{number}} вещей с прочностью {{percent}}%",
			gold_exp_data : "Данные о золоте и опыте",
			gold_exp_data_today : "Последние 24 часа",
			gold_exp_data_week : "Последние 7 дней",
			gold_exp_data_avg_day : "Средние показатели за день",
			gold_exp_data_to_level_up : "Дней осталось до следующего уровня",
			gold_exp_data_package_tax : "Еженедельный налог на золото",
			gold_exp_data_measurements : "Измерения",
			gold_exp_data_total_exp : "Общее количество опыта",
			gold_exp_data_total_gold : "Общее количество золота"
		},
		overview : {
			stats_difference : "Разница",
			drop_item_see_materials_repair : "Переместите предмет, чтобы увидеть необходимые для починки материалы",
			workbench_6th_slot_empty : "Шестой слот верстака должен быть пустым"
		},
		pantheon : {
			mysterybox_open_all : "Открыть все",
			mysterybox_open_stop : "Остановить",
			mysterybox_open_done : "Сделано!"
		},
		guild : {
			bank_all_gold : "Добавить все золото",
			library_per_point_cost : "Стоимость за очко навыка",
			library_gold_left : "Золото гильдии после активации",
			medic_lost_points : "Потерянные очки",
			medic_points_to_heal : "Очков здоровья будет вылечено",
			medic_life_after_heal : "Здоровье после лечения"
		},
		expedition : {
		},
		training : {
			stats_points : "Очки навыков",
			points_breakdown : "Описание показателей",
			stats_calculated_with_yourself_as_an_opponent : "* Статистика рассчитывается в сравнении с нападением на себя.",
			total_cost : "Общая стоимость",
			costs_discount : "Скидка на тренировку: {{number}}%"
		},
		auction : {
			items_info : "Информация о предметах",
			number_of_items : "Количество предметов : {{number}}",
			number_of_bided_items : "Число ставок : {{number}}",
			hide_your_gold_here : "Можно просейвить тут",
			price_value_function : "цена = стоимости + {{number}}"
		},
		markets : {
			item_is_soulbound : "Этот предмет связан с душой.",
			are_you_sure_you_want_to_buy : "Вы действительно хотите купить этот предмет?"
		},
		forge : {
			forge_ended : "Ковка завершилась!"
		},
		packages : {
			known_scroll : "Этот свиток изучен",
			unknown_scroll : "Этот свиток не изучен",
			event_items : "Евент предмет"
		},
		settings : {
			settings : "Настройки",
			description : "Включить или выключить любую функцию аддона по Вашему желанию!",
			description_click_button : "Нажмите кнопку ниже чтобы настроить аддон",
			category_global : "Основные настройки",
			category_overview : "Настройки просмотра",
			category_messages : "Настройки сообщений",
			category_packages : "Настройки сундука",
			category_pantheon : "Пантеон",
			category_reports : "Настройки отчетов",
			category_training : "Настройки тренировок",
			category_merchants : "Настройки торговца",
			category_forge : "Кузня",
			category_arena : "Арена",
			category_magus : "Магус",
			category_market : "Магазин",
			category_expedition : "Экспедиция",
			category_guild : "Настройки гильдии",
			category_auction : "Настройки аукциона",
			category_events : "События",
			category_sound : "Звуки",
			category_data : "Данные",
			category_global$language_select : "Изменить язык аддона",
			category_global$browser_notifications : "Включить уведомления браузера",
			category_global$extended_hp_xp_info : "Отображать расширение с информацией об опыте и здоровье",
			category_global$extended_hp_xp_info_potion : "Показать кнопку использования зелья жизни",
			category_global$hp_timer_for_full_life : "Отображать минуты до полного исцеления",
			category_global$shortcuts_bar : "Отображать полоску кнопок в заголовке",
			category_global$shortcuts_bar_buttons : "Выберите ярлыки для панели ярлыков",
			category_global$auction_status_bar : "Отображать стадии аукционов",
			category_global$auction_status_notification : "Уведомлять при изменении статуса аукциона",
			category_global$top_fixed_bar : "Включить верхнее меню при прокрутке",
			category_global$remember_tabs : "Запоминать вкладки в инвентаре и у торговцев",
			category_global$gold_exp_data : "Показывать данные о золоте и опыте",
			category_overview$analyze_items : "Анализировать вещи игрока",
			category_overview$more_statistics : "Отображать больше характеристик игрока",
			category_overview$achivements_layout : "Улучшенное расположение достижений",
			category_overview$costumes_layout : "Улучшенное расположение костюмов",
			// Settings - Main menu
			category_main_menu$advance_main_menu : "Усовершенствованное главное меню",	
			category_main_menu$merchants_timer : "Отображать таймер торговцев",			
			category_messages$messages_layout : "Улучшенный внешний вид сообщений",
			category_messages$show_unread : "Выделить непрочитанные сообщения",
			category_messages$separate_days : "Разделить сообщения разных дней",
			category_messages$more_guild_mate_info : "Показать больше информации о согильдиевцах",
			category_messages$show_message_links : "Показывать ссылки в сообщениях",
			category_messages$get_guild_battle_info : "Загружать результаты битвы гильдий",
			category_messages$show_sidebar : "Показать панель сообщений",
			category_messages$fix_header_links : "Исправить баг нажатия на заголовок сообщения",
			category_messages$new_message_focus : "Разделять по содержанию",
			category_messages$new_message_friend_list : "Включить кнопку \"список друзей\"",
			category_packages$load_more_pages : "Загружать больше страниц",
			category_packages$pages_to_load : "Максимальное количество загружаемых страниц ",
			category_packages$item_price : "Показать цены товаров",
			category_pantheon$quests_reorder : "Включить группировку заданий",
			category_pantheon$quests_detailed_rewards : "Показать подробные награды заданий",
			category_pantheon$missions_show_completed : "Показать завершенные миссии",
			category_pantheon$open_many_mysteryboxes : "Открывать несколько сундуков",
			category_pantheon$show_mysterybox_rewards_rubies : "Показывать ценность награды сундуков  в рубинах",
			category_reports$style_change : "Улучшенный внешний вид списка отчетов",
			category_reports$found_items : "Собирать данные о найденных предметах",
			category_training$show_discount : "Показывать скидку на тренировку",
			category_training$multiple_train : "Включить множественную тренировку",
			category_training$calculator_train : "Включить калькулятор затрат",
			category_arena$ignore_attack_confirmations : "Игнорировать подтверждения атак (сообщение о более 5 атаках и т.д.)",
			category_arena$show_simulator_imagelink : "Показывать изображение-ссылку на симулятор (simulator.dinodevs.com)",
			category_market$soulbound_warning : "Подтверждение покупки связанных с душами предметов",
			category_market$one_gold_warning : "Подтверждение покупки предметов, стоимость которых составляет 1 золото",
			category_market$cancel_all_button : "Показать кнопку отмены всего",
			category_market$remember_sell_duration : "Запоминать последнюю длительность продажи",
			category_market$sell_duration : "Выбрать длительность продажи по умолчанию",
			category_market$remember_sort : "Запоминать последний порядок сортировки",
			category_guild$jail_layout : "Улушенный внешний вид Неготиама",
			category_guild$library_layout : "Улучшенный внешний вид библиотеки",
			category_guild$bank_donate_layout : "Улучшенный внешний вид банка",
			category_guild$bank_book_layout : "Улучшенный внешний вид банковского писаря",
			category_guild$medic_layout : "Улучшенный внешний вид мед. пункта",
			category_auction$items_counters : "Отображать количество вещей",
			category_auction$more_search_levels : "Показывать больше уровней в настройках поиска",
			category_auction$item_price_analyze : "Анализировать цены предметов",
			category_auction$item_level : "Отображать уровень вещи",
			category_auction$x3_items_per_line : "Отображать 3 вещи в линии",
			category_sound$muted : "Отключить/включить звук",
			category_sound$volume : "Громкость",
			category_data$export_settings : "Экспортировать настройки в файл",
			category_data$import_settings : "Импортировать настройки из файла",
			category_data$reset_settings : "Сбросить настройки аддона",
			category_data$clear_data : "Удалить все данные аддона",
			save : "Сохранить все",
			export : "Экспортировать",
			import : "Импортировать",
			reset : "Сброс",
			clear : "Очистить",
			do_not_show : "Не показывать",
			show_as : "Показать как",
			translated_percent : "Переведено: {{number}}%",
			translated_by : "Переведено: {{string}}",
			reset_settings_confirm : "Вы действительно хотите сбросить настройки аддона?",
			clear_data_confirm : "Вы уверены, что хотите удалить все данные аддона?",
			notification_reload : "Обновите страницу, чтобы увидеть примененные изменения"
		}
	}
}

gca_languages._active = "ru";
