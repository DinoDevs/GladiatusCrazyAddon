/*
 * Gladiatus Crazy Eklenti Dil Dosyası
 * Name : Turkish (Türkiye)
 * Code : TR
 * Tag  : tr-TR
 * Translator: Xus (s25)
 */

// Languages Object
var gca_languages = gca_languages || {};

// Set Language
gca_languages["tr"] = {

    // Language name
    name : "Türkçe",
    // Translators (authors of this script)
    translators : ["Xus (s25)"],

    // Translations object
    locale : {
        // Addon info
        info : {
            description : "Gladiatus için yapılmış en güzel eklenti!"
        },

        // General
        general : {

            // Days
            days : "Gün",
            // Minutes
            minutes : "Dakika",
            // No data
            no_data : "Bilgi Bulunmuyor",

            // Modal buttons
            confirm : "Onayla",
            cancel : "İptal Et",
            close : "Kapat",
            error : "Hata",
        },

        // Global
        global : {
            // Use a life potion
            life_potion_use : "Şifa İksiri Kullan",
            life_potion_used : "Şifa İksiri Kullanıldı",
            life_potion_left : "Kalan Şifa İksirin {{number}}",
            
            // Life points recovery
            life_recover_full : "Yaşam Enerjisinin Dolacağı Süre",

            // Button bar - Message
            message_private_write : "Özel Mesaj Yaz",
            message_guild_write : "İttifak Mesajı Yaz",
            message_send : "Gönder",
            message_sent_success : "Mesaj Başarıyla Gönderildi",
            message_sent_failed : "Mesaj Gönderilemedi",
            message_empty : "Mesaj Boş",
            message_exclude_me : "Ben Hariç Herkes",

            // Button bar buttons
            guild_market_goto : "İttifak Marketi'ne Git",
            guild_storage_goto : "İttifak Deposu'na Git",
            guild_bank_goto : "İttifak Bankası'na Git",
            guild_warcamp_goto : "Usta Savaşçılar Salonu'na Git",
            guild_jail_goto : "Negotium X'e Git",
            guild_library_goto : "Kütüphaneye Git",
            guild_medic_goto : "Villa Medici'ye Git",
            simulator_goto : "Simülatöre Git",
            stats_display : "İstatistiklerimi Göster",
            online_display : "Online Oyuncuları Göster",

            // Online friends
            online_friends : "Online Arkadaşlarım",
            guild_friends : "İttifak Arkadaşlarım",
            family_friends : "Aile Arkadaşlarım",

            // Guild donate
            donate_gold_confirm : "{{number}} Altını Bağışlamak istediğinize Emin Misin?",
            donate_gold_success : "Bağış Başarıyla Yapıldı",
            donate_gold_failed : "Bağış Yapılamadı",
            donate_gold_no_gold : "Altın Bağışı Bulunmuyor",
            donate_gold_all_gold : "Tüm Bağışlar",

            // Quest timer
            quest_full : "Dolu",
            quest_new : "Yeni",

            // Pray icon
            pray_start : "Dua Etmeye Başlayın",
            pray_stop : "Dua Etmeyi Durdurun",
            heal : "İyileşme",

            // Notifications
            notification_guild_application : "İttifağa Katılım Başvurusu Var",

            // Gold - Exp data
            gold_exp_data : "Altın ve Deneyim Bilgileri",
            gold_exp_data_today : "Son 24 Saat",
            gold_exp_data_week : "Son 7 Gün",
            gold_exp_data_avg_day : "Günlük Ortalama Değer",
            gold_exp_data_to_level_up : "Level Atlamak İçin Kalan Gün",
            gold_exp_data_package_tax : "Haftalık Altın Paketi Vergisi",
            gold_exp_data_measurements : "Ölçüm",
            gold_exp_data_total_exp : "Toplam Tecrübe",
            gold_exp_data_total_gold : "Toplam Altın",
        },

        // Overview
        overview : {
            // Stats Difference
            stats_difference : "Fark",
            // Drop items to see materials to repair feature
            drop_item_see_materials_repair : "Gerekli Tamir Malzemesini Görmek İçin Eşyayı Üzerine Sürükleyin",
            workbench_6th_slot_empty : "Tezgahın 6. Yuvasının Boş Olması Gerekir",
        },

        // Pantheon section
        pantheon : {
            // Mystery box
            mysterybox_open_all : "Hepsini Aç",
            mysterybox_open_stop : "Durdurmak",
            mysterybox_open_done : "Tamam",
        },

        // Guild section
        guild : {
            // Guild Bank
            bank_all_gold : "Tüm Altın",

            // Library
            library_per_point_cost : "Eğitim Başına Maliyet",
            library_gold_left : "Aktivasyon İçin Altın Miktarı",

            // Medic
            medic_lost_points : "Kayıp Puan",
            medic_points_to_heal : "İyileştirilecek Noktalar",
            medic_life_after_heal : "İyileştikten Sonraki Yaşam Puanı"
        },

        // Expedition
        expedition : {
            material_drop_chance : "Bu malzemenin düşme şansı {{number}}% "
        },

        // Training section
        training : {
            // Points analysis
            stats_points : "Eğitim Puanı",
            points_breakdown : "Eğitim Dağılımı",
            stats_calculated_with_yourself_as_an_opponent : "* Yukardaki istatistikler kendinize saldırmak kavramıyla hesaplanır.",
            // Cost calculator
            total_cost : "Toplam Tutar",
            // Discount show
            costs_discount : "Eğitim indirimi: {{number}}%"
        },

        // Auction section
        auction : {
            // Info
            items_info : "Eşya Bilgileri",
            // Number of items in the page
            number_of_items : "Eşya Sayısı : {{number}}",
            // Number of items that have been bidden in the page
            number_of_bided_items : "Teklif verilen eşya sayısı : {{number}}",
            // Message on items that you can buy and sell at the same price
            hide_your_gold_here : "Altını burada saklayabilirsin.",
            // Price of item equals to its value
            price_value_function : "Ücret = Değer + {{number}}",
            // Levels you can see
            levels_you_can_see : "Burada görebileceğiniz itemler {{min}} den {{max}}.",
        },

        // Markets section
        markets : {
            // Warnings
            item_cost_only_x_gold : "Bu ürünün maaliyeti sadece {{number}} altın.",
            item_is_soulbound : "Bu eşya ruha bağlıdır.",
            // Are you sure
            are_you_sure_you_want_to_buy : "Bu eşyayı gerçekten almak istiyor musunuz?"
        },
        
        // Forge
        forge : {
            forge_ended : "Eşya üretimi Bitti",
            recraft_item : "Eşyayı yeniden oluştur"
        },
        
        // Packages
        packages : {
            event_items : "Etkinlik öğeleri",
            known_scroll : "Bu parşömeni daha önce okudun",
            unknown_scroll : "Bu parşömeni daha önce okumadın"
        },
        // Settings
        settings : {
            // Settings
            settings : "Ayarlar",
            // Description
            description : "Eklentinin özelliklerini etkinleştirin veya devre dışı bırakın.",
            description_click_button : "Eklenti ayarlarına gitmek için aşağıdaki butona tıklayın",
            
            // Categories
            category_global : "Genel Ayarlar",
            category_overview : "Genel Bakış",
            category_messages : "Mesaj Ayarları",
            category_packages : "Kasa Ayarları",
            category_pantheon : "Pantheon",
            category_reports : "Raporlama Ayarları",
            category_training : "Eğitim Ayarları",
            category_merchants : "Tüccar Ayarları",
            category_forge : "Demirhane Ayarları",
            category_arena : "Arena",
            category_magus : "Hermetik Müneccim",
            category_market : "Market",
            category_expedition : "Keşif Ayarları",
            category_guild : "İttifak Ayarları",
            category_auction : "Müzayede Ayarları",
            category_events : "Event Ayarları",
            category_sound : "Ses Ayarları",

            // Settings - Global
            category_global$language_select : "Eklenti dilini değiştir",
            category_global$sound_notifications : "Görev, zindanlar ve arenalar için sesle uyar",
            category_global$browser_notifications : "Tarayıcı bildirimlerini aç",
            category_global$extended_hp_xp_info : "Sayfanın üst kısmında genişletilmiş HP ve XP bilgilerini göster",
            category_global$extended_hp_xp_info_potion : "Şifre iksirini göster",
            category_global$hp_timer_for_full_life : "Yaşam enerjinisin dolacağı zaman",
            category_global$shortcuts_bar : "Kısayollar çubuğunu etkinleştir",
            category_global$shortcuts_bar_buttons : "Kısayol çubuğundaki kısayolları seçin",
            category_global$auction_status_bar : "Müzayede durum çubuğunu göster",
            category_global$auction_status_notification : "Müzayede durumu değiştiğinde uyarı ver",
            category_global$top_fixed_bar : "En üstteki şerit sürekli görünsün",
            category_global$advance_main_menu : "Ana menüyü geliştir",
            category_global$submenu_click_to_change : "Tıklamayla alt menü değişimi",
            category_global$remember_tabs : "Tüccar sekmelerini hatırla",
            category_global$attacked_timers : "Saldırıya uğramış sayaçları göster",
            category_global$quest_timer : "Görev durumunu ve zamanlayıcıyı göster",
            category_global$merchants_timer : "Tüccarların yenilenme süresini göster",
            category_global$forge_timers : "Demirci / Arındırma zamanlayıcıyı göster",
            category_global$player_image : "Oyuncuların resimlerini etkinleştir",
            category_global$cooldown_sound_notifications : "Sesli bildirimleri etkinleştir (keşif, zindan, arena)",
            category_global$notify_new_guild_application : "Yeni ittifak başvurusu olduğunda beni haberdar et",
            category_global$notify_new_guild_application_interval : "Her dakika başvuruları kontrol edin (dakika)",
            category_global$x_scroll : "Gladiatus'un yatay kaydırma özelliğini etkinleştir",
            category_global$item_shadow : "Eşya gölgelerini etkinleştir",
            category_global$inventory_options_group : "Envanter opsiyonlarını ektinleştir",
            category_global$pagination_layout : "Sayfalar kutusunun düzenini değiştirme",
            category_global$gold_exp_data : "Altın ve exp bilgilerini göster",
            category_global$pray_shorcut : "Yeraltı zaman ile ilgili bir opsiyon",
            // Settings - Overview
            category_overview$analyze_items : "Eşya durumlarını analiz edin (eğitim için gereklidir)",
            category_overview$food_life_gain : "Malzemelerden hayat kazancını göster",
            category_overview$block_avoid_caps : "Blokları gösterin başlıklardan kaçının",
            category_overview$best_food : "En iyi yiyeceği vurgulayın",
            category_overview$overfeed_food : "Aşırı iyileştirici malzemeleri soluk gözüksün",
            category_overview$daily_bonus_log : "Günlük bonusu kaydet",
            category_overview$buffs_detailed_time : "İttifak meraklıları üzerinde ayrıntılı zamanlayıcıları göster",
            category_overview$mercenaries_manager : "Paralı askeri göster",
            category_overview$mercenary_tooltip_show : "Paralı asker ipuçlarını göster",
            category_overview$more_statistics : "İstatistik sekmesinde daha fazla istatistik gözüksün",
            category_overview$achivements_layout : "Başarı düzenini geliştirin",
            category_overview$costumes_layout : "Kostüm düzenini geliştirin",
            category_overview$items_repair_overview : "Malzeme onarımı için gerekli kutuyu gösterin",
            // Settings - Messages
            category_messages$messages_layout : "Mesaj düzenini geliştir",
            category_messages$show_unread : "Okunmamış mesajları vurgula",
            category_messages$separate_days : "Farklı günlerin mesajlarını ayrı tut",
            category_messages$send_message_box : "Gönder mesaj kutusunu etkinleştir",
            category_messages$more_guild_mate_info : "Daha fazla ittifak arkadaş bilgisi göster",
            category_messages$show_message_links : "İletilere dahil olan bağlantıları göster",
            category_messages$get_guild_battle_info : "İttifak savaş sonuçlarını otomatik yükle",
            category_messages$show_sidebar : "İletileri kenar çubuğunda göster",
            category_messages$fix_header_links : "İletileri düzeltme başlığı bağlantısına tıkla hata",
            category_messages$new_message_focus : "Mesaj gövdesine odaklanma",
            category_messages$new_message_friend_list : "Listeden arkadaş seç düğmesini ektinleştir",
            // Settings - Packages
            category_packages$filters_layout : "Filtre düzenini geliştirin",
            category_packages$compact_info_layout : "Bilgi düzenini kompakt hale getirin",
            category_packages$items_layout : "Eşyaların düzenini iyileştirin",
            category_packages$load_more_pages : "Daha fazla sayfa yükle",
            category_packages$pages_to_load : "Yüklenecek sayfa sayısı",
            category_packages$item_price : "Öğelerin fiyatını göster",
            category_packages$special_category_features : "Özel kategori özelliklerini etkinleştir",
            // Settings - Pantheon
            category_pantheon$quests_reorder : "Görev grubunu göster",
            category_pantheon$quests_detailed_rewards : "Görevlerin ödüllerini ayrıntılı göster",
            category_pantheon$missions_show_completed : "Tamamlanan görevleri göster",
            category_pantheon$gods_show_points_percent : "Tanrı puanını yüzdesel olarak göster",
            category_pantheon$open_many_mysteryboxes : "Birden çok sandığı aç",
            category_pantheon$show_mysterybox_rewards_rubies : " Sandık ödüllerinin yakut değerini göster",
            // Settings - Reports
            category_reports$style_change : "Rapor liste düzenini iyileştirin",
            category_reports$load_loot_tooltips : "Her raporun ödülünü yükleyin",
            category_reports$found_items : "Bulunan öğeler hakkında veri toplayın",
            // Settings - Training
            category_training$show_discount : "Eğitim indirimini göster",
            category_training$show_basics_in_bars : "Temel bilgileri çubuklar halinde göster",
            category_training$multiple_train : "Birden fazla eğitimi etkinleştir",
            category_training$calculator_train : "Maliyet hesap makinesini etkinleştir",
            category_training$show_analyze_items_data : "Analiz edilen kalem verilerini araç ipuçlarında göster",
            category_training$show_points_after_upgrade : "Yükseltmeden sonraki eğitim puanını göster",
            // Settings - Merchants
            category_merchants$fade_unaffordable_items : "Alamadığınız nesneleri soluk göster",
            // Settings - Forge
            category_forge$material_links : "Her malzeme ihtiyacı için paketleri ve pazar kısayollarını gösterin (Demirhane / Tamir)",
            category_forge$show_levels : "Temel öğe düzeyini isim yanında gösterin ÖnEk / SonEk (Demirhane)",
            // Settings - Arena
            category_arena$ignore_attack_confirmations : "Saldırı yetiylerini yoksay (5'den fazla saldırı mesajı)",
            category_arena$show_simulator_imagelink : "Simülasyona bir resim bağlantısı gösterin (gladiatussimulator.tk)",
            // Settings - Magus
            category_magus$fade_unimprovable_items : "Geliştiremediğiniz öğeleri soluk gösterin",
            // Settings - Market
            category_market$soulbound_warning : "Ruha bağlı ürünlerde onay alın",
            category_market$one_gold_warning : "1 Altına maal olan ürünlerde alırken onay al",
            category_market$cancel_all_button : "Tümünü iptal et butonunu gösterin",
            // Settings - Expedition
            category_expedition$show_enemy_drops : "Düşecek olan hammaddeleri gösterin",
            category_expedition$underworld_layout : "Keşifler gibi yeraltı dünyasının düşman düzenini göster",
            // Settings - Guild
            category_guild$jail_layout : "Negotium arayüzünü geliştir",
            category_guild$library_layout : "Kütüphane arayüzünü geliştir",
            category_guild$library_fade_non_scrolls : "Kütüphanede kaydırılmayan öğeleri soluk göster",
            category_guild$library_tooltip_data : "Kütüphanenin araç ipuçları hakkında daha fazla veri ekle",
            category_guild$bank_donate_layout : "Bankanın arayüzünü geliştirin",
            category_guild$bank_book_layout : "Bankanın bağış arayüzünü geliştir",
            category_guild$medic_layout : "Villa medici arayüzünü geliştir",
            // Settings - Auction
            category_auction$items_counters : "Tüm eşyaları ve teklif verilen eşya sayısını göster",
            category_auction$more_search_levels : "Arama seçeneklerinde daha fazla düşük seviye",
            category_auction$item_price_analyze : "Eşya fiyatlarını analiz edin",
            category_auction$item_level : "Eşya seviyesini göster",
            category_auction$x3_items_per_line : "Satır başına 3 eşya göster",
            category_auction$multi_bids : "Sayfa yenilemeden teklif verin",
            category_auction$extra_item_stats : "Eşya resimlerinde ekstra istatistikleri göster",
            // Settings - Events
            category_events$craps_timer : "Zar olayında zamanlayıcıyı en üstte göster",
            category_events$server_quest_timer : "Sunucu görevini veya konum olayının zamanlayıcısını en üstte göster",
            // Settings - Sound
            category_sound$enabled : "Ses sistemini ektinleştir",
            category_sound$muted : "Sustur / Sesi Açma Sesi",
            category_sound$volume : "Ses seviyesi",

            // Buttons
            save : "Kaydet",

            // Info
            translated_by : "Çeviren: {{string}}",

            // Notifications
            notification_reload : "Değişikliklerin geçerli olması için sayfayı yeniden yükleyin"
        }
    }
}

gca_locale.active = "tr";