/*
 * Gladiatus Crazy Addon Translation
 * Name : Chinese
 * Code : [none]
 * Tag  : zh
 * Translator: Eric Hsieh, Liu, smooth
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages['zh'] = {

	// Language name
	name : '繁體中文 (Chinese traditional)',
	// Translators (authors of this script)
	translators : ["Eric Hsieh", "Liu", "smooth"],

	// Translations object
	locale : {
		// Addon info
		info : {
			description : "craziest add-on給永遠的神鬼戰士"
		},

		// General
		general : {
			// Days
			days : "天",
			// Minutes
			minutes : "每分鐘",
			// Hours
			hours : "小時",
			// No data
			no_data : "目前還沒有數據",

			// Buttons
			confirm : "確認",
			cancel : "取消",
			close : "關閉",
			error : "錯誤",
			yes : "是",
			no : "否",
			ok : "好的"
		},

		// Global
		global : {
			// Use a life potion
			life_potion_use : "使用治癒藥水",
			life_potion_used : "已使用治癒藥水",
			life_potion_left : "你目前有{{number}}生命值",

			// Life/Expedition/Dungeon points recovery
			life_recover_full : "生命值全滿",
			expedition_recover_full : "遠征點數完全恢復",
			dungeon_recover_full : "地城點數完全恢復",

			// Button bar - Message
			message_private_write : "撰寫私人訊息",
			message_guild_write : "撰寫公會訊息",
			message_send : "送出",
			message_sent_success : "公會訊息已發送",
			message_sent_failed : "公會訊息發送失敗",
			message_empty : "公會訊息不可為空",
			message_exclude_me : "不包括自己",

			// Button bar buttons
			guild_market_goto : "移至公會市場",
			guild_storage_goto : "移至公會倉庫",
			guild_bank_goto : "移至公會銀行",
			guild_warcamp_goto : "移至戰王殿堂",
			guild_arenareports_goto : "轉到公會競技場戰鬥報告",
			guild_jail_goto : "移至設裁判所監牢",
			guild_library_goto : "移至公會圖書館",
			guild_templum_goto : "轉到工會默觀聖殿",
			guild_medic_goto : "移至公會醫院",
			simulator_goto : "移至戰鬥模擬器",
			stats_display : "顯示我的統計數據",
			online_display : "顯示在線玩家",

			// Online friends
			online_friends : "在線好友",
			guild_friends : "公會好友",
			family_friends : "家族好友",

			// Guild donate
			donate_gold_confirm : "你確定要捐獻 {{number}}金幣？",
			donate_gold_success : "你已捐獻出你的金幣",
			donate_gold_failed : "你捐獻金幣失敗",
			donate_gold_no_gold : "你已無金幣可捐獻",
			donate_gold_all_gold : "捐獻全部的金幣",

			// Quest timer
			quest_full : "詳細",
			quest_new : "新的",

			// Pray icon
			pray_start : "開始祈禱",
			pray_stop : "停止祈禱",
			heal : "治癒",

			// Notifications
			notification_guild_application : "等待公會採用",
			notification_guild_attack_ready : "公會戰攻擊冷卻結束!",
			low_durability_items : "有 {{number}} 項裝備耐久度低於 {{percent}}%",
			item_worth_rubies : "這件物品值紅寶石!",

			// Gold - Exp data
			gold_exp_data : "金幣及經驗值數據",
			gold_exp_data_today : "最近24小時",
			gold_exp_data_week : "最近7天",
			gold_exp_data_avg_day : "每天平均值",
			gold_exp_data_to_level_up : "再幾天後升級",
			gold_exp_data_package_tax : "每週入金統計",
			gold_exp_data_measurements : "衡量點",
			gold_exp_data_total_exp : "總經驗驗值",
			gold_exp_data_total_gold : "總金幣數",
			
			// Items
			mercenary_type : "類型: {{name}} ({{number}})"
		},

		// Overview
		overview : {
			// Stats Difference
			stats_difference : "差值",
			// Drop items to see materials to repair feature
			drop_item_see_materials_repair : "拖曳裝備以檢視修裝所需材料",
			workbench_6th_slot_empty : "鍛造台第6爐需為空的",

			// More player info
			more_player_info : "更多玩家信息",
			can_use_max_item_level : "能使用的最高裝備等級: {{max}}.",
			can_see_market_max_item_level : "能在市場上看見的最高裝備等級： {{max}}.",
			can_see_auction_item_levels : "在拍賣行可以看到的裝備等級: {{min}} - {{max}}."
		},

		// Pantheon section
		pantheon : {
			// Mystery box
			mysterybox_open_all : "開啟全部",
			mysterybox_open_stop : "停止",
			mysterybox_open_done : "完成"
		},

		// Guild section
		guild : {
			// Guild Bank
			bank_all_gold : "加入所有的金幣",

			// Library
			library_per_point_cost : "啟用袐方所需金幣數",
			library_gold_left : "啟用袐方後公會剩餘金幣數",

			// Medic
			medic_lost_points : "損失的生命值",
			medic_points_to_heal : "治療後增加的生命值",
			medic_life_after_heal : "治療後的生命值"
		},

		// Expedition
		expedition : {
			material_drop_chance : "在掉落的材料中機率為: {{number}}% "
		},

		// Arena section
		arena : {
			global_arena_title : "全球競技場",
			global_arena_description : "這是一個無限的競技場, 蒐集了全世界所有的神鬼戰士! 在這個競技場, 神鬼戰士們並非為金幣與經驗而戰, 他們為了全球榜單的一席之地而戰!",
			global_arena_load : "載入敵人列表",
			global_highscore : "全球積分",
			country : "國家",
			server : "伺服器",
			target_list : "目標列表",
			target_list_add : "添加至目標列表",
			target_list_remove : "從目標列表移除",
			error_sth_went_wrong : "某種錯誤發生(bug)",
			error_response : "服務器返回錯誤",
			error_blocked_access : "有東西阻擋了到全球競技場服務器的連接 ({{url}})",
			error_connection : "連接錯誤",
			attack_player : "點擊以攻擊 “{{name}}”",
			fight_won : "您贏得了戰鬥!",
			fight_lost : "你輸掉了戰鬥...",
			player_tired : "你已經累了; 你需要等一會.",
			player1_hits_player2 : "{{name1}} 命中 {{name2}}",
			player_takes_x_damage : "{{name}} 受到 {{number}} 傷害",
			player_dies : "{{name}} 死亡"
		},

		// Training section
		training : {
			// Points analysis
			stats_points : "屬性點數",
			points_breakdown : "點數分解",
			stats_calculated_with_yourself_as_an_opponent : "* 屬性的計算是設想攻擊你自己.",
			// Cost calculator
			total_cost : "總花費",
			// Discount show
			costs_discount : "訓練花費優惠 : {{number}}%"
		},

		// Auction section
		auction : {
			// Info
			items_info : "物品信息",
			// Number of items in the page
			number_of_items : "物品數 : {{number}}",
			// Number of items that have been bidden in the page
			number_of_bided_items : "已出價的物品數 : {{number}}",
			// Message on items that you can buy and sell at the same price
			hide_your_gold_here : "成本價",
			// Price of item equals to its value
			price_value_function : "價格=價值 + {{number}}",
			// Levels you can see
			levels_you_can_see : "你能看到的裝備等級從 {{min}} 到 {{max}}.",
			// Sort
			sort : "排序",
			sort_by : "排序由 ",
			sort_order : "順序",
			asc : "升序",
			desc : "降序"
		},

		// Markets section
		markets : {
			// Warnings
			item_cost_only_x_gold : "這個物品只需要花 {{number}} 金.",
			item_is_soulbound : "這個物品是靈魂綁定.",
			item_cant_buy_back : "你將無法買回這個物品.",
			// Are you sure
			are_you_sure_you_want_to_buy : "你真的想要買這件物品麼?",
			click_enter_to_sell : "按enter鍵 ⏎ 以出售"
		},
		
		// Forge
		forge : {
			forge_ended : "鍛造結束!",
			recraft_item : "重鑄物品",
			show_hide_doll : "顯示/隱藏 玩家形象",

		},
		
		// Merchants
		merchants : {
			search_item_in_merchants : "在商人裡查找物品",
			no_such_item : "沒有找到這樣的物品."
		},
		
		// Packages
		packages : {
			event_items : "事件物品",
			known_scroll : "你已學習過此捲軸",
			unknown_scroll : "你還未學習此捲軸",
			advance_filters : "高級篩選",
			advance_filters_apply : "接受篩選",
			advance_filters_clear : "清除篩選項",
			advance_filters_found : "(找到 {{items}})"
		},
		
		// Report
		reports : {
			avg_damage : "平均傷害",
			avg_heal : "平均治療",
			total_hits : "總共被擊",
			hits : "命中數",
			dodge : "躲閃或格擋",
			points : "得點"
		},

		// Cross-Browser Sync
		sync : {
			are_you_sure : "你確定你想要作為 {{name}}登錄?",
			gladiatus_crazy_addon_dependency : "你必須在其他瀏覽器上安裝神鬼鬥士瘋狂插件.",
			how_to_sync_info : "複製url粘貼到其他瀏覽器中，或者掃描二維碼."
		},

		// Settings
		settings : {
			// Settings
			settings : "設置",
			// Description
			description : "啟用或禁用任何你指定功能的插件!",
			description_click_button : "點擊按鈕至插件設置...",

			// Categories
			category_global : "常規設置",
			category_overview : "概述設置",
			category_messages : "訊息設定",
			category_packages : "包裹設定",
			category_pantheon : "神諭",
			category_reports : "戰鬥報告介面設定",
			category_training : "訓練場設定",
			category_merchants : "商人設定",
			category_forge : "鍛造",
			category_arena : "競技場",
			category_magus : "魔法師小屋",
			category_market : "市場",
			category_expedition : "遠征",
			category_guild : "公會設定",
			category_auction : "拍賣場設定",

			category_events : "事件",
			category_sound : "聲音",
			category_data : "數據",

			// Settings - Global
			category_global$language_select : "更改插件顯示的語言",
			category_global$browser_notifications : "啟用瀏覽器提醒",
			category_global$extended_hp_xp_info : "顯示延伸的生命值和經驗值資訊",
			category_global$extended_hp_xp_info_potion : "顯示生命藥水使用圖標",
			category_global$hp_timer_for_full_life : "顯示完全自愈所需的時間",
			category_global$expedition_dungeon_points_recover_timer : "顯示遠征/地城點數完全恢復需要的時間",
			category_global$shortcuts_bar : "啟用快捷狀態欄",
			category_global$shortcuts_bar_buttons : "為快捷狀態欄選擇按鈕",
			category_global$auction_status_bar : "顯示拍賣狀態欄",
			category_global$auction_status_notification : "當拍賣狀態變化時提醒",
			category_global$top_fixed_bar : "畫面捲動時啟用玩家狀態顯示條",
			category_global$remember_tabs : "記住商戶和背包標籤",
			category_global$attacked_timers : "顯示攻擊後計時器",
			category_global$notify_new_guild_application : "提醒我在有新的工會消息時",
			//category_global$check_guild_application_pinned_messages_interval : "檢查工會消息間隔 (分鐘)", // add pinned messages
			category_global$notify_guild_attack_ready : "當工會戰攻擊冷卻好時提醒我",
			category_global$notify_guild_attack_ready_interval : "檢查工會戰冷卻每x (分鐘)",
			category_global$x_scroll : "啟用神鬼戰士的水平捲動",
			category_global$item_shadow : "啟用物品陰影",
			category_global$inventory_options_group : "分組物品欄選項",
			category_global$inventory_gold_info : "顯示裝備欄物品的價錢",
			category_global$pagination_layout : "改變頁面盒子的圖層",
			category_global$gold_exp_data : "顯示金幣與經驗數據",
			category_global$pray_shorcut : "在地下世界時顯示祈禱的快捷方式",
			category_global$show_durability : "在物品的左下角顯示耐久度",
			category_global$min_durability : "在裝備的耐久度加耐久影響低於 _% 時提醒我(移至 0 來禁用它)",
			category_global$show_forge_info : "在提示欄顯示物品的鍛造材料",
			category_global$show_mercenaries_real_name : "在提示條上顯示傭兵的真實名字 (類型) ",
			category_global$global_arena_timer : "顯示全球競技場計時器",
			// Settings - Overview
			category_overview$analyze_items : "分析物品加成 (訓練時)",
			category_overview$food_life_gain : "顯示從食物獲得的生命",
			category_overview$block_avoid_caps : "顯示格擋與迴避上限",
			category_overview$best_food : "高亮最佳食物",
			category_overview$overfeed_food : "黯淡會導致治療浪費的食物",
			category_overview$double_click_consume : "雙擊物品以用掉它們",
			category_overview$daily_bonus_log : "記錄每日收益",
			category_overview$buffs_detailed_time : "顯示工會增益的詳細計時",
			category_overview$mercenaries_manager : "顯示傭兵管理器",
			category_overview$mercenary_tooltip_show : "傭兵詳情顯示傭兵縮略圖標",
			category_overview$more_statistics : "在狀態標籤頁顯示更多屬性",
			category_overview$achivements_layout : "強化成就頁面",
			category_overview$costumes_layout : "強化戎裝頁面",
			category_overview$items_repair_overview : "在一般戰役頁面顯示裝備修復所需材料的檢測小盒",			
            // Settings - Main menu
			category_main_menu$advance_main_menu : "加強主選單",
			category_main_menu$submenu_click_to_change : "點擊時改變子菜單",
			category_main_menu$quest_timer : "顯示任務狀態或計時器",	
			category_main_menu$centurio_powerups_timers : "在高級按鈕中顯示百夫長和提升類的計時",
			category_main_menu$forge_timers : "顯示鍛造/熔煉計時指示圖標",
			category_main_menu$merchants_timer : "顯示商人計時器",	
			// Settings - Messages
			category_messages$messages_layout : "改進消息界面",
			category_messages$show_unread : "高亮未讀信息",
			category_messages$separate_days : "將不同日期的消息分割",
			category_messages$more_guild_mate_info : "顯示更多公會夥伴信息",
			category_messages$show_message_links : "在訊息夾內顯示鏈接",
			category_messages$get_guild_battle_info : "自動加載公會戰結果",
			category_messages$show_sidebar : "顯示信息側欄",
			category_messages$fix_header_links : "修復訊息夾標題帶有連接點擊時的bug",
			category_messages$new_message_focus : "訊息夾焦點放在內容處",
			category_messages$new_message_friend_list : "在列表按鈕處啟用選擇朋友",
			// Settings - Packages
			category_packages$filters_layout : "增強篩選頁面",
			category_packages$compact_info_layout : "使信息頁面更緊密",
			category_packages$items_layout : "改善物品頁面",
			category_packages$small_items_layout : "使得物品尺寸縮小",
			category_packages$load_more_pages : "加載更多頁",
			category_packages$pages_to_load : "加載的頁面數",
			category_packages$item_price : "顯示物品價格",
			category_packages$special_category_features : "為每個分類啟用特性",
			category_packages$double_click_open : "雙擊包裹以打開",
			category_packages$advance_filter : "高級包裹篩選",

			// Settings - Pantheon
			category_pantheon$quests_reorder : "啟用任務分組",
			category_pantheon$quests_detailed_rewards : "顯示任務的詳細獎勵",
			category_pantheon$missions_show_completed : "顯示任務完成",
			category_pantheon$gods_show_points_percent : "顯示眾神點數百分比",
			category_pantheon$open_many_mysteryboxes : "打開多個神聖命運寶箱",
			category_pantheon$show_mysterybox_rewards_rubies : "顯示神聖命運寶箱中物品相對於紅寶石的價值",
			category_pantheon$show_mysterybox_rewards_owned : "顯示神聖命運寶箱中物品已擁有的數量",
			// Settings - Reports
			category_reports$style_change : "改善戰鬥報告列表頁面",
			category_reports$load_loot_tooltips : "加載每一個戰鬥報告的獎勵",
			category_reports$found_items : "蒐集找到物品的數據",
			category_reports$battle_analyzer : "分析報告並顯示生命狀態",
			// Settings - Training
			category_training$show_discount : "顯示訓練優惠",
			category_training$show_basics_in_bars : "在條狀圖中顯示基礎數值",
			category_training$multiple_train : "啟用多次訓練",
			category_training$calculator_train : "啟用花費計算器",
			category_training$show_analyze_items_data : "在提示裡顯示分析裝備的數據",
			category_training$show_points_after_upgrade : "顯示升級後的屬性點",
			// Settings - Merchants
			category_merchants$fade_unaffordable_items : "減淡你不足以購買的物品",
			category_merchants$show_shop_info : "顯示商店信息(總共的金幣和紅寶石)",
			category_merchants$double_click_actions : "雙擊物品以買/賣",
			// Settings - Forge
			category_forge$material_links : "[鍛造/修復] 顯示包裹和市場的快捷方式以獲取需要的材料",
			category_forge$show_levels : "[鍛造] 在名字旁顯示 前綴/後綴/基礎 物品等級",
			category_forge$horreum_materials_names : "[Horreum] 顯示材料名稱",
			category_forge$horreum_remember_options : "[Horreum] 記憶最後選擇的存儲設置",
			category_forge$horreum_select_meterials : "[Horreum] 點擊可選取材料",
			// Settings - Arena
			category_arena$ignore_attack_confirmations : "忽略過度攻擊證據 (超過5次攻擊以後的消息)",
			category_arena$show_simulator_imagelink : "顯示一個到模擬器的圖像鏈接 (simulator.dinodevs.com)",
			category_arena$sort_by_lvl : "在競技場中以玩家等級排序",
			category_arena$highlight_guild_members : "高亮其他服務器可能是公會成員的玩家",
			category_arena$target_list : "玩家目標列表",
			// Settings - Magus
			category_magus$fade_unimprovable_items : "黯淡你無法改進的物品",
			// Settings - Market
			category_market$soulbound_warning : "在購買靈魂綁定的物品時進行確認",
			category_market$one_gold_warning : "在購買只花費1金的物品時進行確認",
			category_market$cancel_all_button : "顯示一個取消所有的按鈕",
			category_market$remember_sell_duration : "記憶最後選擇的售賣時長",
			category_market$sell_duration : "選擇默認的售賣時長",
			category_market$one_gold_mode : "切換按鈕總是將出售價設為1金",
			category_market$remember_sort : "記憶最後選擇的排序方式",
			category_market$double_click_select : "雙擊選取物品",
			category_market$sell_warning_icons : "當出售物品時顯示警告圖標",
			category_market$sell_with_enter : "用Enter ⏎鍵出售物品",
			// Settings - Expedition
			category_expedition$show_enemy_drops : "顯示每一個遠征敵人掉落的鍛造材料",
			category_expedition$underworld_layout : "地下世界界面改為遠征界面",
			// Settings - Guild
			category_guild$jail_layout : "改善裁判監牢所頁面",
			category_guild$library_layout : "改善圖書館頁面",
			category_guild$library_fade_non_scrolls : "黯淡非捲軸裝備",
			category_guild$library_tooltip_data : "在圖書館的提示文本中顯示更多數據",
			category_guild$bank_donate_layout : "改善銀行捐贈頁面",
			category_guild$bank_book_layout : "改善銀行捐獻書頁面",
			category_guild$bank_book_show_changes : "在公會捐獻書頁面顯示自上次訪問以來的捐獻變化值",
			category_guild$medic_layout : "改善治療頁面",
			// Settings - Auction
			category_auction$items_counters : "計算物品數與已拍物品數",
			category_auction$more_search_levels : "搜索選項顯示更多等級",
			category_auction$item_price_analyze : "分析物品價格",
			category_auction$item_level : "顯示物品等級(官方已有)",
			category_auction$x3_items_per_line : "頁面改為3個物品每行",
			category_auction$multi_bids : "拍物品時免刷新頁面",
			category_auction$extra_item_stats : "在物品圖像上顯示額外的狀態",
			category_auction$save_last_state : "實現拍賣行搜索條件的存儲與默認載入",
			// Settings - Accessibility
			



			// Settings - Events
			category_events$craps_timer : "在頂部顯示骰子遊戲的計時器",
			category_events$server_quest_timer : "在頂部顯示服務器任務或者區域事件的計時器",
			// Settings - Sound
			category_sound$cooldown_sound_notifications : "啟用新遠征/地城/競技場提示音",
			category_sound$muted : "靜音/恢復 聲音",
			category_sound$volume : "音量",
			// Settings - Data
			category_data$export_settings : "導出設置到文件",
			category_data$import_settings : "從文件導入設置文件",
			category_data$reset_settings : "用默認設置重置本插件的設置",
			category_data$clear_data : "清除所有插件的數據",
			category_data$clear_cache_data : "清除插件緩存數據",
			category_data$cross_browser_login : "跨瀏覽器登錄協同",
			category_data$export_error_player_settings : "輸出用戶的錯誤設置數據到文件",

			// Buttons
			save : "保存",
			export : "導出",
			import : "導入",
			reset : "重置",
			clear : "清除",
			do_not_show : "不要顯示",
			show_as : "顯示為",
			show_info : "顯示信息",
			each_category : "在目標類別上運行",
			all_category : "在目標類別和所有類別上運行",
			do_not_run : "不要運行",

			// Info
			translated_percent : "翻譯百分比: {{number}}%",
			translated_by : "譯者: {{string}}",
			reset_settings_confirm : "你確認你想要重置插件的設置麼?",
			clear_data_confirm : "你確認你想要清除所有插件的數據?",
			data_exported_save_the_file : "數據已導出,請保存文件.",
			missing_translations : "缺失翻譯",

			// Notifications
			notification_reload : "重載頁面使改動生效"
		}
	}
}

gca_languages._active = "zh";
