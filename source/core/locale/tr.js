/*
 * Gladiatus Crazy Eklenti Dil Dosyası
 * Name : Turkish (Türkiye)
 * Code : TR
 * Tag  : tr-TR
 * Translator: Elderly (s48) & Rubick (s48), Xus (s25), Anonim, Emefar (s33-s41)
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages["tr"] = {
	name : "Türkçe (Turkish)",
	translators : ["Elderly (s48) & Rubick (s48), Xus (s25)", "Anonim", "Emefar (s33-s41)"],
	locale : {
		info : {
			description : "Gladiatus için yapılmış en güzel eklenti!"
		},
		general : {
			days : "Gün",
			minutes : "Dakika",
			hours : "Saat",
			no_data : "Bilgi Bulunmuyor",
			confirm : "Onayla",
			cancel : "İptal Et",
			close : "Kapat",
			error : "Hata",
			yes : "Evet",
			no : "Hayır",
			ok : "Tamam"
		},

		//global
		global : {
			//Şifa iksiri
			life_potion_use : "Şifa İksiri Kullan",
			life_potion_used : "Şifa İksiri Kullanıldı",
			life_potion_left : "Kalan Şifa İksirin {{number}}",

			//Yaşam Enerjisi/Keşif/Zindan puanı
			life_recover_full : "Yaşam Enerjisinin Dolacağı Süre:",
			expedition_recover_full : "Keşif Seferinin Dolacağı Süre:",
			dungeon_recover_full : "Zindanın Dolacağı Süre:",

			//Tuş ayarları - Mesaj
			message_private_write : "Özel Mesaj Yaz",
			message_guild_write : "İttifak Mesajı Yaz",
			message_send : "Gönder",
			message_sent_success : "Mesaj Başarıyla Gönderildi",
			message_sent_failed : "Mesaj Gönderilemedi",
			message_empty : "Mesaj Boş",
			message_exclude_me : "Ben Hariç Herkes",

			//Kısayol Tuşları
			auction_food_goto : "Yiyecek müzayedesine git",
			guild_arenareports_goto : "Usta Savaşçılar Salonunun Raporlarına Git",
			guild_bank_goto : "İttifak Bankasına Git",
			guild_baths_goto : "Hamam'a git (Vox Logus I)",
			guild_jail_goto : "Negotium X'e Git",
			guild_library_goto : "Kütüphaneye Git",
			guild_market_goto : "İttifak Marketine Git",
			guild_medic_goto : "Villa Mediciye Git",
			guild_storage_goto : "İttifak Deposuna Git",
			guild_templum_goto : "Templum'a Git",
			guild_warcamp_goto : "Usta Savaşçılar Salonuna Git",
			online_display : "Online Oyuncuları Göster",
			simulator_goto : "Simülatöre Git",
			stats_display : "İstatistiklerimi Göster",

			//Çevrimiçi Arkadaşlar
			online_friends : "Online Arkadaşlarım",
			guild_friends : "İttifak Arkadaşlarım",
			family_friends : "Aile Arkadaşlarım",
			
			//İttifak bağışı
			donate_gold_confirm : "{{number}} Altını Bağışlamak istediğinize Emin Misin?",
			donate_gold_success : "Bağış Başarıyla Yapıldı",
			donate_gold_failed : "Bağış Yapılamadı",
			donate_gold_no_gold : "Altın Bağışı Bulunmuyor",
			donate_gold_all_gold : "Tüm Altını Bağışla",

			//Görev Süresi
			quest_full : "Dolu",
			quest_new : "Yeni",

			//Dua simgesi
			pray_start : "Dua Etmeye Başlayın",
			pray_stop : "Dua Etmeyi Durdurun",
			heal : "İyileşme",

			//Bildirimler
			notification_guild_application : "İttifağa Katılım Başvurusu Var",
			notification_guild_attack_ready : "İttifak savaşı zamanı geldi!",
			low_durability_items : "Şu ana {{number}} eşyanın dayanıklılığı %{{percent}}in altında!",
			item_worth_rubies : "Bu item yakut ile alınıyor",

			//Altın ve Tecrübe verileri
			gold_exp_data : "Altın ve Deneyim Bilgileri",
			gold_exp_data_today : "Son 24 Saat",
			gold_exp_data_week : "Son 7 Gün",
			gold_exp_data_avg_day : "Günlük Ortalama Değer",
			gold_exp_data_to_level_up : "Seviye Atlamak İçin Kalan Gün",
			gold_exp_data_package_tax : "Haftalık Altın Paketi Vergisi",
			gold_exp_data_measurements : "Ölçüm",
			gold_exp_data_total_exp : "Toplam Tecrübe",
			gold_exp_data_total_gold : "Toplam Altın",
			gold_exp_data_reset : "İstatistikler sıfırlandı",
			gold_exp_data_desc : "her 5 dakikada veri toplanır. Satın aldığınız ürünleri satmak altın kazancınızı ikiye katlar.",
			
			//Mersenerler
			mercenary_type : "Tip: {{name}} ({{number}})",
			gains_with_full_stats : "Maximum Oluşacak Eğitim İlaveleri",
			//Eşya Bileşenleri
			base : "Ana Eşya",
			prefix : "Ön ek",
			suffix : "Son ek"

		},

		//Genel Bakış
		overview : {
			//İstatistik
			stats_difference : "Fark",
			//Onarılacak eşyanın hangi hammadde istediği özelliği
			drop_item_see_materials_repair : "Gerekli Tamir Malzemesini Görmek İçin Eşyayı Üzerine Sürükleyin",
			workbench_6th_slot_empty : "Tezgahın 6. Yuvasının Boş Olması Gerekir",

			//Ekstra Oyuncu Bilgileri
			more_player_info : "Ekstra kullanıcı bilgileri",
			can_use_max_item_level : "Bu kullanıcı ana karakterinde maksimum {{max}} seviye itemleri kullanabilir.",
			can_see_market_max_item_level : "Bu kullanıcı markette maksimum {{max}} seviye itemleri görebilir.",
			can_see_auction_item_levels : "Bu kullanıcı müzayede salonunda {{min}} ile {{max}} seviye arası itemleri görebilir."
		},

		//Görev Bölümü
		pantheon : {
			mysterybox_open_all : "Hepsini Aç",
			mysterybox_open_stop : "Durdur",
			mysterybox_open_done : "Tamam"
		},

		//İttifak Bölümü
		guild : {
			//İttifak Bankası
			bank_all_gold : "Tüm Altınınız",
			total_donations : "Toplam bağış",
			min_upgrades_gold : "Yükseltmeler için harcanan altın (minimum)",
			max_stolen_gold : "Diğer loncalardan çalınan altın (maximum)",

			//Kütüphane
			library_per_point_cost : "Eğitim Başına Mâliyet",
			library_gold_left : "Aktivasyon İçin Gerekli Altın Miktarı",

			//Villa Medici
			medic_lost_points : "Kayıp Puan",
			medic_points_to_heal : "İyileştirilecek Noktalar",
			medic_life_after_heal : "İyileştikten Sonraki Yaşam Puanı",

			//Hamam
			pinned_message : "Sabitlenmiş ittifak mesajı",
			pin_unpin_message : "Bu mesajı sabitle veya sabitlemesini kaldır",
			pinned_message_info : "Bu özelliği kullanan tüm ittifak üyeleri için mesajların üst kısmında sabitlenmiş mesajlar görüntülenir."
		},

		//Keşif
		expedition : {
			material_drop_chance : "Bu malzemenin düşme şansı %{{number}} "
		},

		//Arena Bilgileri
		arena : {
			global_arena_title : "Global Arena (Crazy Addon)",
			global_arena_description : "Bu nihai arena, dünyanın her yerinden gladyatörleri bir araya toplar! Bu alanda, gladyatörler altın ya da deneyim için savaşmazlar, dünyanın en iyiler listesinde bir yer için savaşırlar!",
			global_arena_load : "Düşman listesini yükle",
			global_highscore : "Yüksek Skor (Global)",
			country : "Ülke",
			server : "Sunucu",
			target_list : "Hedef Listesi",
			target_list_add : "Hedef listesine ekle",
			target_list_remove : "Hedef listesinden çıkar",
			error_sth_went_wrong : "Bir şeyler yanlış gitti",
			error_response : "Sunucu bir hata ile karşılaştı",
			error_blocked_access : "Bir şeyler GCA sunucusuna bağlanmanızı engelliyor ({{url}})",
			error_connection : "Bağlantı hatası",
			attack_player : "Saldırmak için tıkla “{{name}}”",
			fight_won : "Savaşı kazandın!",
			fight_lost : "Savaşı kaybettin...",
			player_tired : "Çok yorgunsun, biraz dinlenmelisin.",
			player1_hits_player2 : "{{name1}} tarafından vurulan: {{name2}}.",
			player_takes_x_damage : "{{name}}, {{number}} hasar aldı",
			player_dies : "{{name}} öldü"
		},

		//Eğitim Bilgileri
		training : {
			//Puan analizi
			stats_points : "Eğitim Puanı",
			points_breakdown : "Eğitim Dağılımı",
			points_breakdown_damage : "Hasar: +{{integer}} (+{{float}})",
			points_breakdown_block : "Blok: +{{integer}}% (+{{float}}%)",
			points_breakdown_block_short : "Blok: +{{integer}}%",
			points_breakdown_block_max : "Blok: maximum değer",
			points_breakdown_normal_hit : "Vuruş şansı: +{{integer}}% (+{{float}}‰) *",
			points_breakdown_critical_hit : "Kritik vuruş şansı: +{{integer}}% (+{{float}}‰)",
			points_breakdown_critical_hit_short : "Krit vuruş: +{{integer}}%",
			points_breakdown_double_hit : "Çifte vuruş şansı: +{{integer}}% (+{{float}}‰) *",
			points_breakdown_double_hit_factor : "Çift Vuruş: {{number}}",
			points_breakdown_avoid_double_hit_factor : "Çift vuruştan kaçma: {{number}}",
			points_breakdown_avoid_short : "Kritik vuruştan kaçma: +{{integer}}%",
			points_breakdown_avoid : "Kritik vuruştan kaçma şansı: +{{integer}}% (+{{float}}‰)",
			points_breakdown_avoid_max : "Kritik vuruştan kaçma şansı: maximum değer",
			points_breakdown_enemy_normal_hit : "Rakip vuruş şansı: {{integer}}% ({{float}}‰) *",
			points_breakdown_enemy_double_hit : "Rakip çifte vuruş şansı: {{integer}}% ({{float}}‰) *",
			points_breakdown_life : "Yaşam puanı: +{{number}}",
			points_breakdown_regeneration : "Saatlik iyileşme: +{{number}}",
			points_breakdown_threat : "Tehlike: +{{integer}} (+{{float}})",
			points_breakdown_heal : "İyileşme: +{{integer}} (+{{float}})",
			points_breakdown_critical_heal : "Kritik iyileşme: +{{integer}}% (+{{float}}‰)",
			points_breakdown_critical_heal_max : "Kritik iyileşme: maximum değer",
			stats_calculated_with_yourself_as_an_opponent : "* Yukardaki istatistikler kendinize saldırmak kavramıyla hesaplanır.",
			values_in_parenthesis_explanation : "Parantez içindeki değerler bir önceki turu temsil eder.",
			total_cost : "Toplam Tutar",
			costs_discount : "Eğitim indirimi: {{number}}%"
		},

		//Müzayede Salonu
		auction : {
			items_info : "Eşya Bilgileri",
			number_of_items : "Eşya Sayısı : {{number}}",
			number_of_bided_items : "Teklif verilen eşya sayısı : {{number}}",
			hide_your_gold_here : "Altınını burada saklayabilirsin.",
			price_value_function : "Ücret = Değer + {{number}}",
			levels_you_can_see : "Burada görebileceğiniz itemler {{min}} den {{max}}.",
			sort : "Sıralama",
			sort_by : "Sırala",
			sort_order : "Düzen",
			asc : "Artan",
			desc : "Azalan"
		},
		//Market
		markets : {
			//Uyarılar
			item_cost_only_x_gold : "Bu itemin mâliyeti sadece {{number}} altın.",
			item_is_soulbound : "Bu item ruha bağlıdır.",
			item_cant_buy_back : "Bu itemi geri alamayacaksınız.",
			//İzinler
			are_you_sure_you_want_to_buy : "Bu itemi gerçekten almak istiyor musun?",
			click_enter_to_sell : "İtemi satmak için ENTER ⏎ tuşunu kullanabilirsin",
			//Kısayol
			add_fees_in_price : "Fiyata ücreti ekleyin"
		},
		//Demirhane
		forge : {
			forge_ended : "Eşya üretimi bitti",
			recraft_item : "Eşyayı yeniden oluştur",
			show_hide_doll : "Eşyalarımı Göster/Gizle",
			horreum_material_change : "Demirhane malzemeleri değişimi"
		},
		//Tüccarlar
		merchants : {
			search_item_in_merchants : "Tüccarda item ara",
			no_such_item : "Aranan item bulunamadı"
		},
		//Sandık
		packages : {
			event_items : "Etkinlik ögeleri",
			known_scroll : "Bu parşömeni daha önce okudun",
			unknown_scroll : "Bu parşömeni daha önce okumadın",
			advance_filters : "Gelişmiş Filtreleme",
			advance_filters_apply : "Filtreyi uygula",
			advance_filters_clear : "Filtreyi sıfırla",
			advance_filters_found : "({{items}} adet bulundu)"
		},
		//Raporlar
		reports : {
			avg_damage : "Ortalama hasar",
			avg_heal : "Ortalama iyileştirme",
			total_hits : "Toplam vuruşlar",
			hits : "Vuruşlar",
			dodge : "Kaçınmalar veya Bloklamalar",
			points : "Puanlar"
		},
		//Senkronizasyon
		sync : {
			are_you_sure:"{{name}} olarak giriş yapmak istediğinize emin misiniz?",
			gladiatus_crazy_addon_dependency : "Gladiatus Crazy Addon eklentisinin diğer tarayıcıda da yüklü olduğundan emin olun.",
			how_to_sync_info : "Üstte görünen URL'yi diğer tarayıcıya yapıştırın veya QR kodunu kullanın."
		},

		//Ayarlar Bölümü
		settings : {
			settings : "Ayarlar",
			//Açıklamalar
			description : "Eklentinin özelliklerini etkinleştirin veya devre dışı bırakın.",
			description_click_button : "Eklenti ayarlarına gitmek için aşağıdaki butona tıklayın",
			//Kategoriler
			category_global : "Genel Ayarlar",
			category_overview : "Genel Bakış",
			category_messages : "Mesaj Ayarları",
			category_packages : "Sandık Ayarları",
			category_pantheon : "Pantheon Ayarları",
			category_reports : "Raporlama Ayarları",
			category_training : "Eğitim Ayarları",
			category_merchants : "Tüccar Ayarları",
			category_forge : "Demirhane Ayarları",
			category_arena : "Arena Ayarları",
			category_magus : "Hermetik Müneccim",
			category_market : "Market Ayarları",
			category_expedition : "Keşif Ayarları",
			category_guild : "İttifak Ayarları",
			category_auction : "Müzayede Ayarları",
			category_accessibility : "Erişebilirlik",
			category_events : "Etkinlik Ayarları",
			category_sound : "Ses Ayarları",
			category_data : "Eklenti Ayarları",
			//Genel Ayarlar
			category_global$language_select : "Eklenti dilini değiştir",
			category_global$browser_notifications : "Tarayıcı bildirimlerini aç",
			category_global$extended_hp_xp_info : "Sayfanın üst kısmında genişletilmiş HP ve TP bilgilerini göster",
			category_global$extended_hp_xp_info_potion : "Şifa iksirini göster",
			category_global$hp_timer_for_full_life : "Yaşam enerjinisin dolacağı süreyi göster",
			category_global$expedition_dungeon_points_recover_timer : "Keşif seferinin ve zindanın dolacağı süreyi göster",
			category_global$shortcuts_bar : "Kısayollar çubuğunu etkinleştir",
			category_global$shortcuts_bar_buttons : "Kısayol çubuğundaki kısayolları seçin",
			category_global$auction_status_bar : "Müzayede durum çubuğunu göster",
			category_global$auction_status_notification : "Müzayede durumu değiştiğinde uyarı ver",
			category_global$top_fixed_bar : "En üstteki şerit sürekli görünsün",
			category_global$remember_tabs : "Tüccar sekmelerini hatırla",
			category_global$attacked_timers : "En son saldırıya uğradığım zamanı göster",
			category_global$notify_new_guild_application : "Yeni ittifak başvurusu olduğunda uyarı ver",
			category_global$check_guild_pinned_message : "Mesajlar bölümünde hamamdaki sabitlenmiş ittifak mesajlarını göster",
			category_global$check_guild_application_pinned_messages_interval : "İttifak başvurularını ve sabitlenmiş mesajları kontrol edin (Dakika)",
			category_global$notify_guild_attack_ready : "İttifak savaşı için geri sayım bitince beni uyar",
			category_global$notify_guild_attack_ready_interval : "İttifak savaşının zamanını kontrol et (Dakika cinsinden)",
			category_global$x_scroll : "Gladiatus'un yatay kaydırma özelliğini etkinleştir",
			category_global$item_shadow : "Eşya gölgelerini etkinleştir",
			category_global$inventory_options_group : "Envanter opsiyonlarını etkinleştir",
			category_global$inventory_gold_info : "Envanterdeki eşyaların toplam fiyatını göster",
			category_global$pagination_layout : "Sandıktaki sayfa numaralarının arayüzünü geliştir",
			category_global$gold_exp_data : "Altın ve Deneyim Bilgileri analiz opsiyonunu etkinleştir",
			category_global$pray_shorcut : "Yeraltındayken dua etme kısayolunu göster",
			category_global$show_durability : "Ürünün sol alt köşesinde dayanıklılığı göster",
			category_global$min_durability : "Seçilen % nin altında dayanıklılığı olan itemleri göster (Devre dışı bırakmak için 0 yapın)",
			category_global$show_forge_info : "İtemlerin hammadde gereksinimlerini ipucu olarak göster",
			category_global$show_mercenaries_real_name : "Paralı askerlerin gerçek ismini ve tipini ipucunda göster",
			category_global$show_mercenaries_real_name_and_combat_stats : "Araç ipuçlarında paralı askerlerin gerçek adlarını (tür) ve savaş istatistiklerini görüntüleyin",
			category_global$show_upgrade_values : "Takviye ve yükseltmelerde güçlendirme değerlerini göster",
			category_global$global_arena_timer : "Global Arena zamanlayıcısını göster",
			//Genel Bakış
			category_overview$analyze_items : "Eşyaların durumlarını analiz et (Eğitim için gereklidir)",
			category_overview$food_life_gain : "Malzemelerden hayat kazancını göster",
			category_overview$block_avoid_caps : "Maksimum blok, direnç ve kritik hasar değerlerini göster",
			category_overview$best_food : "En iyi yiyeceği vurgula",
			category_overview$overfeed_food : "Aşırı iyileştirici malzemeleri soluk göster",
			category_overview$double_click_consume : "Yiyecekleri tüketmek için çift tıkla",
			category_overview$daily_bonus_log : "Günlük bonusu kaydet",
			category_overview$buffs_detailed_time : "İttifak meraklıları üzerinde ayrıntılı zamanlayıcıları göster",
			category_overview$mercenaries_manager : "Paralı askeri göster",
			category_overview$mercenary_tooltip_show : "Paralı asker ipuçlarını göster",
			category_overview$more_statistics : "İstatistik sekmesinde daha fazla istatistik göster",
			category_overview$achivements_layout : "Başarı düzenini geliştir",
			category_overview$costumes_layout : "Kostüm düzenini geliştir",
			category_overview$items_repair_overview : "İtem arındırması için gerekli kutuyu göster",
			// Settings - Main menu
			category_main_menu$advance_main_menu : "Ana menüyü geliştir",
			category_main_menu$submenu_click_to_change : "Tıklamayla alt menü değişimini aktifleştir",
			category_main_menu$quest_timer : "Görev durumunu ve zamanlayıcıyı göster",	
			category_main_menu$centurio_powerups_timers : "Premium menüsü üzerinde anlaşmaların kalan zamanlarını göster",
			category_main_menu$forge_timers : "Demirci / Arındırma zamanlayıcıyı göster",
			category_main_menu$merchants_timer : "Tüccarların yenilenme süresini göster",
			//Mesaj Ayarları
			category_messages$messages_layout : "Mesaj düzenini geliştir",
			category_messages$show_unread : "Okunmamış mesajları vurgula",
			category_messages$separate_days : "Farklı günlerin mesajlarını ayrı tut",
			category_messages$more_guild_mate_info : "İttifak arkadaşlarının seviyesini ve rütbesini göster",
			category_messages$show_message_links : "Mesajlardaki linkleri özelleştirilmiş alanda göster",
			category_messages$get_guild_battle_info : "İttifak savaş sonuçlarını otomatik yükle",
			category_messages$show_sidebar : "Mesajları kenar çubuğunda göster",
			category_messages$fix_header_links : "Mesajın başlığındaki link'e tıklama hatasını gider",
			category_messages$new_message_focus : "Mesaj gövdesine odaklan",
			category_messages$new_message_friend_list : "Listeden arkadaş seç butonunu ektinleştir",
			//Sandık Ayarları
			category_packages$filters_layout : "Filtre düzenini geliştir",
			category_packages$compact_info_layout : "Bilgi düzenini kompakt hale getir",
			category_packages$items_layout : "Eşyaların düzenini iyileştir",
			category_packages$small_items_layout : "Eşyaları küçük göster",
			category_packages$load_more_pages : "Daha fazla sayfa yükle",
			category_packages$list_view_layout : "Liste görünümünde göster",
			category_packages$pages_to_load : "Yüklenecek sayfa sayısı",
			category_packages$item_price : "Ögelerin fiyatını göster",
			category_packages$special_category_features : "Özel kategori özelliklerini etkinleştir",
			category_packages$double_click_open : "Paketleri açmak için çift tıkla",
			category_packages$advance_filter : "Gelişmiş sandık filtrelemesini etkinleştir",
			category_packages$pop_over_bag : "Kaydırmada çantayı aç",
			//Pantheon (Görev) Ayarları
			category_pantheon$quests_reorder : "Görev grubunu göster",
			category_pantheon$quests_detailed_rewards : "Görevlerin ödüllerini ayrıntılı göster",
			category_pantheon$missions_show_completed : "Tamamlanan görevleri göster",
			category_pantheon$gods_show_points_percent : "Tanrı puanını yüzdesel olarak göster",
			category_pantheon$open_many_mysteryboxes : "Toplu sandık açma seçeneğini göster",
			category_pantheon$show_mysterybox_rewards_rubies : " Sandık ödüllerinin yakut değerini göster",
			category_pantheon$show_mysterybox_rewards_owned : "Tanrının lütfu sandığındaki olası kazançlarda, sahip olduğum eşya sayısını göster.",
			//Raporlama Ayarları
			category_reports$style_change : "Rapor liste düzenini iyileştir",
			category_reports$load_loot_tooltips : "Her raporun ödülünü yükle",
			category_reports$found_items : "Bulunan ögeler hakkında veri topla",
			category_reports$battle_analyzer : "Raporu analiz et ve yaşam istatistiklerini göster",
			//Eğitim Ayarları
			category_training$show_discount : "Eğitim indirimini göster",
			category_training$show_basics_in_bars : "Temel bilgileri çubuklar halinde göster",
			category_training$multiple_train : "Birden fazla eğitim basmayı etkinleştir",
			category_training$calculator_train : "Mâliyet hesaplayıcıyı etkinleştir",
			category_training$show_analyze_items_data : "Analiz edilen item verilerini araç ipuçlarında göster",
			category_training$show_points_after_upgrade : "Yükseltmeden sonraki eğitim puanını göster",
			//Tüccar Ayarları
			category_merchants$fade_unaffordable_items : "Alamadığın nesneleri soluk göster",
			category_merchants$ruby_icon_on_items : "Yakut ile alınan öğelere sembol ekleyin",
			category_merchants$show_shop_info : "Perakende tüccarında toplam altın ve yakut bilgilerini göster",
			category_merchants$double_click_actions : "İtemleri almak veya satmak için çift tıkla",
			//Demirhane Ayarları
			category_forge$material_links : "İhtiyaç duyulan hammaddeler için market ve sandık kısayolunu göster (Demirhane / Çalışma Tezgahı)",
			category_forge$show_levels : "İtemlerin seviyelerini göster (Demirhane)",
			category_forge$horreum_materials_names : "Hammaddelerin isimlerini göster (Hammadde Deposu)",
			category_forge$horreum_remember_options : "Son seçilen hammadde bloğunu hatırla (Hammadde Deposu)",
			category_forge$horreum_select_meterials : "Hammaddeyi seçmek için tıkla (Hammadde Deposu)",
			//Arena Ayarları
			category_arena$ignore_attack_confirmations : "5 defadan fazla saldıramazsınız mesajını yoksay",
			category_arena$show_simulator_imagelink : "Arena ve Sirk Turma'da simulasyon bağlantısını göster (simulator.dinodevs.com)",
			category_arena$sort_by_lvl : "Arenadaki oyuncuları seviyeye göre sırala",
			category_arena$highlight_guild_members : "Diğer sunucularda oynayan ittifak üyelerini vurgula",
			category_arena$target_list : "Hedef listesi özelliğini aktifleştir",
			//Hermetik Müneccim Ayarları
			category_magus$fade_unimprovable_items : "Geliştirilemeyen itemleri soluk göster",
			//Market Ayarları
			category_market$add_fees_button : "Ürünün fiyatını satış fiyatının üstüne ekle butonunu göster",
			category_market$soulbound_warning : "Satın alımlarda ruha bağlı ürünlerde onay al",
			category_market$one_gold_warning : "1 Altına mâl olan ürünleri alırken onay al",
			category_market$cancel_all_button : "Tümünü iptal et butonunu göster",
			category_market$remember_sell_duration : "Son seçilen satış süresini hatırla",
			category_market$sell_duration : "Varsayılan satış süresini seç",
			category_market$one_gold_mode : "Satış fiyatını her zaman 1 altın olarak değiştir butonunu göster",
			category_market$custom_prices : "Virgülle ayrılmış özel piyasa fiyatları. Bir '%' ekleyerek ögenin fiyatının yüzdesine dayalı olarak hesaplayın. (ör. '10000, 10.000, 200%')",
			category_market$remember_sort : "Son sıralama düzenini hatırla",
			category_market$double_click_select : "İtemi markete atmak için çift tıkla",
			category_market$sell_warning_icons : "İtemi satarken uyarı ikonunu göster",
			category_market$sell_with_enter : "İtemleri satmak için ENTER ⏎ tuşunu kullan",
			//Keşif Ayarları
			category_expedition$show_enemy_drops : "NPC'lerden düşebilecek hammaddeleri göster",
			category_expedition$underworld_layout : "Yeraltı NPC'lerini tıpkı normal keşiflerdeki NPC'ler gibi göster",
			//İttifak Ayarları
			category_guild$jail_layout : "Negotium X arayüzünü geliştir",
			category_guild$library_layout : "Kütüphanenin arayüzünü geliştir",
			category_guild$library_fade_non_scrolls : "Kütüphanede kaydırılamayan ögeleri soluk göster",
			category_guild$library_tooltip_data : "Kütüphanenin araç ipuçları hakkında daha fazla veri ekle",
			category_guild$bank_donate_layout : "Bankanın arayüzünü geliştir",
			category_guild$bank_book_layout : "Bankanın bağış arayüzünü geliştir",
			category_guild$bank_book_show_changes : "Bağış Kitabında son ziyaretinden bu yana olan bağış değişikliklerini göster",
			category_guild$medic_layout : "Villa Medici'nin arayüzünü geliştir",
			//Müzayede Ayarları
			category_auction$items_counters : "Tüm eşyaları ve teklif verilen eşya sayısını göster",
			category_auction$more_search_levels : "Asgari seviye yerine ara seviyeler ekle",
			category_auction$item_price_analyze : "Eşya fiyatlarını analiz et",
			category_auction$item_level : "Eşya seviyesini göster",
			category_auction$item_name : "Eşya adını göster",
			category_auction$x3_items_per_line : "Satır başına 3 eşya göster",
			category_auction$multi_bids : "Sayfayı yenilemeden teklif ver",
			category_auction$extra_item_stats : "Eşya resimlerinde ekstra istatistikleri göster",
			category_auction$save_last_state : "Aranan son kriterleri hatırla.",
			
			//Erişebilirlik Ayarları
			category_accessibility$white_level_indicators : "Öge seviyelerini beyaz olarak değiştir",
			category_accessibility$qualty_symbols_indicators : "Ögelere kalite sembolü ekle",
			category_accessibility$tooltips_qualty_white : "Öge açıklamasında öge adını beyaz olarak değiştir",
			category_accessibility$tooltips_qualty_symbols : "Öge açıklamasına kalite sembolü ekle",
			//Event(Etkinlik) Ayarları
			category_events$craps_timer : "Zar etkinliğinde zamanlayıcıyı en üstte göster",
			category_events$server_quest_timer : "Sunucu görevini veya konum olayının zamanlayıcısını en üstte göster",
			//Ses Ayarları
			category_sound$cooldown_sound_notifications : "Sesli bildirimleri etkinleştir (Keşif, Zindan, Arena, Sirk Turma)",
			category_sound$muted : "Sesi açma-kapatma sesleri",
			category_sound$volume : "Ses seviyesi",
			//Eklenti Ayarları
			category_data$export_settings : "Eklenti ayarlarını dışarı aktar",
			category_data$import_settings : "Eklenti ayarlarını içeri aktar",
			category_data$export_settings_to_notes : "Ayarları notlara aktar",
			category_data$import_settings_from_notes : "Ayarları notlardan içeri aktar",
			category_data$reset_settings : "Eklenti ayarlarını sıfırla",
			category_data$clear_data : "Tüm eklenti verilerini temizle",
			category_data$clear_cache_data : "Eklentinin çerezlerini temizle",
			category_data$cross_browser_login : "Birden fazla tarayıcıda aynı anda oyna",
			category_data$export_error_player_settings : "Kullanıcı ayarlarının hatalarını dışarı aktar",

			//Tuşlar
			save : "Kaydet",
			export : "Dışarı aktar",
			import : "İçeri aktar",
			reset : "Sıfırla",
			clear : "Temizle",
			do_not_show : "Gösterme",
			show_as : "Olarak göster",
			show_info : "Bilgileri göster",
			each_category : "Hedef kategori üzerinde çalış",
			all_category : "Hedef kategori ve hepsi üzerinde çalış",
			do_not_run : "Çalışma",
			default: "Varsayılan",
			translated_percent : "Çeviri durumu: %{{number}}",
			translated_by : "Çeviren: {{string}}",
			reset_settings_confirm : "Eklenti ayarlarını sıfırlamak istediğinize emin misiniz?",
			clear_data_confirm : "Tüm eklenti ayarlarını silmek istediğinize emin misiniz?",
			data_exported_save_the_file : "Veriyi dışarı aktarma başarılı",
			missing_translations : "Eksik Çeviri",
			notification_reload : "Değişikliklerin geçerli olması için sayfayı yeniden yükleyin",
		}
	}
}

gca_languages._active = "tr";
