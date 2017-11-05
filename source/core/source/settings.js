/*
 * Addon Settings Script
 * Author: DarkThanos, GreatApo
 */

var gca_settings = {
	preinject : function(){
		// If gca settings
		(gca_section.gcamod == "settings" && 
			this.options.preinject.hideContent());
	},

	inject : function(){
		// Get Scheme
		this.options.parseScheme();

		// Create Options
		this.options.createBox();

		// If gca settings
		if(gca_section.gcamod == "settings"){
			this.options.open();
			this.options.preinject.showContent();
		}
	},

	// Options
	options : {
		// Create box on settings
		createBox : function(){
			// Gca Box
			var wrapper = document.createElement("div");
			wrapper.id = "settings_box";
			var title = document.createElement("h2");
			title.className = "section-header";
			title.textContent = gca.name + " v" + gca.version + " - " + gca_locale.get("settings", "settings");
			wrapper.appendChild(title);
			var box = document.createElement("section");
			box.style.display = "block";
			wrapper.appendChild(box);
			document.getElementById("content").appendChild(wrapper);

			// Icon
			var icon = document.createElement("div");
			icon.className = "icon";
			box.appendChild(icon);
			// Description
			var desc = document.createElement("div");
			desc.className = "description";
			desc.appendChild(document.createTextNode(gca_locale.get("settings", "description")));
			desc.appendChild(document.createElement("br"));
			desc.appendChild(document.createTextNode(gca_locale.get("settings", "description_click_button")));
			box.appendChild(desc);

			// Clear
			var spacer = document.createElement("div");
			spacer.className = "space";
			box.appendChild(spacer);

			// Insert Settings button
			var button = document.createElement("input");
			button.type = "button";
			button.className = "awesome-button";
			button.value = gca_locale.get("settings", "settings");
			box.appendChild(button);
			// Add on click event
			button.addEventListener("click", function(){
				gca_settings.options.open();
			}, false);
		},

		preinject : {
			active : false,
			hideContent : function(){
				this.active = true;
				if(document.documentElement.className.length > 0)
					document.documentElement.className += " ";
				document.documentElement.className += "hidePrimeContent";
			},
			showContent : function(){
				document.documentElement.className = document.documentElement.className.replace(/\s*hidePrimeContent\s*/i, " ");
			}
		},

		// Options scheme
		scheme : {
			// Global Options
			"global" : {
				// Language
				"language_select" : (function(){
					var scheme = {
						"type" : "custom",
						"dom" : function(data, title, wrapper){
							data.select = document.createElement("select");
							var languages = [];
							var lang;
							for(lang in gca_languages){
								if(gca_languages.hasOwnProperty(lang)){
									languages.push(lang);
								}
							}
							languages.sort(function(a, b) {
								//if(gca_languages[a].name < gca_languages[b].name) return -1;
								//else if(gca_languages[a].name > gca_languages[b].name) return 1;
								if(a < b) return -1;
								else if(a > b) return 1;
								else return 0;
							});
							var option;
							for (var i = 0; i < languages.length; i++) {
								lang = languages[i];
								option = document.createElement("option");
								option.value = lang;
								option.textContent = gca_languages[lang].name;
								if (gca_locale.active == lang) {
									option.selected = true;
								}
								data.select.appendChild(option);
							}
							return data.select;
						},
						"save" : function(data){
							gca_locale._setLang(data.select.value);
						}
					};
					return scheme;
				})(),

				// Sounds
				"sound_notifications" : true,
				// Browser notifications
				"browser_notifications" : true,

				// Extended Hp-Xp info
				"extended_hp_xp_info" : true,
				"extended_hp_xp_info_potion" : true,
				"hp_timer_for_full_life" : true,

				// Shortcuts bar
				"shortcuts_bar" : true,
					// msg : guild message / personal message
					// gmd : guild medic
					// gmr : guild market
					// gst : guild storge
					// gbn : guild bank
					// gwr : guild war room
					// gjl : guild jail
					// glb : guild library
					// sim : battle simulator
					// stt : show my stats
					// onl : online friends
				"shortcuts_bar_buttons" : (function(){
					var scheme = {
						"type" : "enumerator",
						"values" : 'msg|gmd|gmr|gst|gbn|gwr|gjl|glb|sim|stt|onl'
					};
					var icons = ["message-icon", "cross-icon", "market-icon", "box-icon", "gold-icon", "report-icon", "castle-icon", "notebook-icon", "swords-icon", "people-icon", "online-icon"];
					scheme.values_dom = [];
					var tmp;
					for (var i = 0; i < icons.length; i++) {
						tmp = document.createElement("span");
						tmp.className = icons[i];
						tmp.style.width = "25px";
						tmp.style.height = "25px";
						tmp.style.display = "block";
						scheme.values_dom.push(tmp);
					}
					return scheme;
				})(),
			
				// Auction Status
				"auction_status_bar" : false,
				"auction_status_notification" : false,

				// Top fixed bar
				"top_fixed_bar" : true,

				// Advance main menu
				"advance_main_menu" : true,
				"submenu_click_to_change" : true,

				// Remember Tabs
				"remember_tabs" : true,

				// Attacked Timer
				"attacked_timers" : true,
				// Quest Timer
				"quest_timer" : true,
				// Merchants
				"merchants_timer" : true,

				// Player Image
				"player_image" : true,

				// Cooldown Sound Notification
				"cooldown_sound_notifications" : true,

				// Notifications
				"notify_new_guild_application" : false,
				// Notifications Interal in minites
				"notify_new_guild_application_interval" : 60,
			
				// Enable x-scroll
				"x_scroll" : true,

				// Enable item's shadow
				"item_shadow" : true,

				// Enable inventory group options
				"inventory_options_group" : true,

				// Enable pagination layout
				"pagination_layout" : true,
				
				// Gold/Exp data
				"gold_exp_data" : true,
				
				// Underword
					// Pray Shorcut
					"pray_shorcut" : true
			},

			// Overview Options
			"overview" : {
				// Analyze items
				"analyze_items" : true,
				// Show the life gain a food gives
				"food_life_gain" : true,
				// Show block and avoid criticals values caps
				"block_avoid_caps" : true,
				// Show best food to consume
				"best_food" : true,
				// Trasparent food gives you more life than you need
				"overfeed_food" : true,
				// Daily Bonus Log
				"daily_bonus_log" : true,
				// Detailed buffs timer
				"buffs_detailed_time" : true,
				// Mercenaries manager
				"mercenaries_manager" : true,
				// Mercenary tooltip show
				"mercenary_tooltip_show" : true,
				// Show more statistics
				"more_statistics" : true,
				// new Achivements layout
				"achivements_layout" : true,
				// Costumes layout
				"costumes_layout" : true,
				// Items repair overview
				"items_repair_overview" : true
			},

			// Messages Options
			"messages" : {
				// Layout
				"messages_layout" : true,
				// Show Unreaded
				"show_unread" : true,
				// Separate days
				"separate_days" : true,
				// Send Message Box
				"send_message_box" : true,
				// Show more guild mate info
				"more_guild_mate_info" : true,
				// Show message links
				"show_message_links" : true,
				// Get guild battle info
				"get_guild_battle_info" : true,
				// Show sidebar
				"show_sidebar" : true,
				// Fix header links
				"fix_header_links" : true,
				// New Message focus manage
				"new_message_focus" : true,
				// New Message friend list
				"new_message_friend_list" : true
			},

			// Packages Options
			"packages" : {
				// Improve filters layout
				"filters_layout" : true,
				// Improve info layout
				"compact_info_layout" : true,
				// Improve packets layout
				"items_layout" : true,
				// Load more packages pages
				"load_more_pages" : true,
				// Number of pages to load
				"pages_to_load" : 2,
				// Show item's price
				"item_price" : false,
				// Special category features
				"special_category_features" : true
			},

			// Pantheon Options
			"pantheon" : {
				// Reorder quests
				"quests_reorder" : true,
				// Insert more details on quests
				"quests_detailed_rewards" : true,
				// Show completed missions
				"missions_show_completed" : true,
				// Show gods points percent
				"gods_show_points_percent" : true,
				// Open many mysteryboxes button
				"open_many_mysteryboxes" : true,
				// Show mysterybox reward's value in rubies
				"show_mysterybox_rewards_rubies" : true
			},

			// Reports
			"reports" : {
				// Style change
				"style_change" : true,
				"load_loot_tooltips" : true,
				// Item found
				"found_items" : true
			},

			"training" : {
				// Show discount
				"show_discount" : true,
				// Show bacis in bars
				"show_basics_in_bars" : true,
				// Enable multiple train
				"multiple_train" : true,
				// Show analyze data
				"show_analyze_items_data" : true,
				// Show points after upgrade
				"show_points_after_upgrade" : true,
			},

			// Merchants
			"merchants" : {
				// Fade items that you can not afford
				"fade_unaffordable_items" : true
			},
			
			// Magus
			"magus" : {
				// Fade items that you can not improve
				"fade_unimprovable_items" : true
			},

			// Expedition Options
			"expedition" : {
				// Show that each enemy drops
				"show_enemy_drops" : true,
				// Underworld expedition layout
				"underworld_layout" : true
			},

			// Guild Options
			"guild" : {
				// Jail layout
				"jail_layout" : true,
				// Library options
				"library_layout" : true,
				"library_fade_non_scrolls" : true,
				"library_tooltip_data" : true,
				// Bank Layouts
				"bank_donate_layout" : true,
				"bank_book_layout" : true,
				// Medic Layout
				"medic_layout" : true
			},

			// Auction Options
			"auction" : {
				// Count page items
				"items_counters" : true,
				// Show price data
				"item_price_analyze" : true,
				// Show item level
				"item_level" : true,
				// Show 3 items per line
				"x3_items_per_line" : false,
				// Enable multi bids
				"multi_bids" : true,
				// Show extra stats on items
				"extra_item_stats" : true
			},

			"events" : {
				// Craps Event Timer
				"craps_timer" : true,
				// Server Quest Event Timer
				"server_quest_timer" : true
			},

			"sound" : {
				// Sounds enabled
				"enabled" : true,
				// Sounds muted
				"muted" : false,
				// Volume scale
				"volume" : {
					"type" : "range",
					"min" : 1,
					"step" : 1,
					"max" : 100,
					"scale" : 0.01,
					"db" : "section",
				}
			}
		},

		parseScheme : function(){
			// For each category
			for(var category in this.scheme){
				// For each label
				for(var label in this.scheme[category]){

					// Settings Object
					if(typeof this.scheme[category][label] == "object"){
						var type = this.scheme[category][label].type;
						if(!type) continue;
						var locale = this.scheme[category][label].locale;
						if(!locale) locale = gca_locale.get("settings", "category_" + category + "$" + label);
						var _category = this.scheme[category][label].category;
						if(!_category) _category = category;
						var _label = this.scheme[category][label].label;
						if(!_label) _label = label;
						var _db = this.scheme[category][label].db;
						if(!_db) _db = "options";

						switch(this.scheme[category][label].type){
							case "boolean" :
								this.scheme[category][label] = this.class.boolean(locale, _category, _label, _db);
								break;
							case "integer" :
								this.scheme[category][label] = this.class.integer(locale, _category, _label, _db);
								break;
							case "enumerator" :
								var _values = this.scheme[category][label].values;
								var _values_locale = this.scheme[category][label].values_locale;
								if(!_values_locale) _values_locale = false;
								var _values_dom = this.scheme[category][label].values_dom;
								if(!_values_dom) _values_dom = false;
								this.scheme[category][label] = this.class.enumerator(locale, _values, _values_locale, _values_dom, _category, _label, _db);
								break;
							case "range" :
								var _min = this.scheme[category][label].min;
								if(!_min) _min = 0;
								var _step = this.scheme[category][label].step;
								if(!_step) _step = 1;
								var _max = this.scheme[category][label].max;
								if(!_max) _max = 100;
								var _scale = this.scheme[category][label].scale;
								if(!_scale) _scale = 1;
								this.scheme[category][label] = this.class.range(locale, _min, _step, _max, _scale, _category, _label, _db);
								break;
							case "custom" :
								let _dom = this.scheme[category][label].dom;
								if(!_dom) _dom = 0;
								let _save = this.scheme[category][label].save;
								if(!_save) _save = 0;
								this.scheme[category][label] = this.class.custom(
									gca_locale.get("settings", "category_" + category + "$" + label),
									_dom,
									_save,
									category,
									label,
									db
								);
						}
					}

					// Parse from value
					else{
						var type = this.scheme[category][label];
						if(typeof type != "string"){
							if(typeof type == "boolean")
								type = "boolean";
							else if(typeof type == "number")
								type = "integer";
						}
						else{
							if(type.match(/\|/i)){
								type = "enumerator";
							}
						}
						var db = "options";

						switch(type){
							case "boolean" :
								this.scheme[category][label] = this.class.boolean(
									gca_locale.get("settings", "category_" + category + "$" + label),
									category,
									label,
									db
								);
								break;
							case "integer" :
								this.scheme[category][label] = this.class.integer(
									gca_locale.get("settings", "category_" + category + "$" + label),
									category,
									label,
									db
								);
								break;
							case "enumerator" :
								this.scheme[category][label] = this.class.enumerator(
									gca_locale.get("settings", "category_" + category + "$" + label),
									this.scheme[category][label],
									false,
									false,
									category,
									label,
									db
								);
								break;
							case "range" :
								this.scheme[category][label] = this.class.range(
									gca_locale.get("settings", "category_" + category + "$" + label),
									0,
									1,
									100,
									1,
									category,
									label,
									db
								);
								break;
							case "custom" :
								let _dom = this.scheme[category][label].dom;
								if(!_dom) _dom = 0;
								let _save = this.scheme[category][label].save;
								if(!_save) _save = 0;
								this.scheme[category][label] = this.class.custom(
									gca_locale.get("settings", "category_" + category + "$" + label),
									null,
									null,
									category,
									label,
									db
								);
						}
					}
					
				}
			}

			return;
		},

		// Open Bag manager
		open : function(){
			// Get url
			var url = gca_getPage.parameters();

			// Get tabname
			var tabname = "global";
			if(url.gcamod == "settings" && url.category){
				tabname = url.category;
			}

			// Change Url
			url.gcamod = "settings";
			delete url.sh;
			window.history.pushState({category : tabname}, "GCA - Settings", gca_getPage.link(url));

			// Create if not exist
			if(!document.getElementById("content_2nd"))
				this.create();

			// Open Global tab
			this.openTab(tabname, gca_locale.get("settings", "category_" + tabname));

			// Scroll to top
			window.scrollTo(0, 0);

			// Hide page's content
			document.getElementById("content").style.display = "none";
			// Show page's 2nd content
			document.getElementById("content_2nd").style.display = "block";

			var that = this;
			// Catch history events
			window.addEventListener("popstate", function (event) {
				// Previus tab
				if(event.state){
					var tabname = event.state.category;
					// Open Global tab
					that.openTab(tabname, gca_locale.get("settings", "category_" + tabname));
					// Scroll to top
					window.scrollTo(0, 0);
				}
				// Close settings
				else {
					// Hide page's 2nd content
					document.getElementById("content_2nd").style.display = "none";
					// Show page's content
					document.getElementById("content").style.display = "block";
				}
				return true;
			}, false);
		},

		// Create options
		create : function(){
			// Create a new content
			var content_2nd = document.createElement("div");
			content_2nd.id = "content_2nd";
			content_2nd.style.display = "none";
			content.parentNode.insertBefore(content_2nd, content.nextSibling);

			// Logo
			var logo = document.createElement("div");
			logo.id = "settings_logo";
			var logo_title = document.createElement("div");
			logo_title.className = "title";
			logo_title.textContent = gca_locale.get("settings", "settings");
			logo.appendChild(logo_title);
			content_2nd.appendChild(logo);

			// Menu Wrapper
			var menu_div = document.createElement("div");
			menu_div.id = "settings_menu";
			content_2nd.appendChild(menu_div);

			// Menu
			var menu = document.createElement("ul");
			menu_div.appendChild(menu);

			// Tab Wrapper
			this.tab_div = document.createElement("div");
			this.tab_div.id = "settings_tab";
			content_2nd.appendChild(this.tab_div);

			// Clear both
			var clearfix = document.createElement("div");
			clearfix.style.clear = "both";
			content_2nd.appendChild(clearfix);

			// Create Categories
			for (let category in this.scheme) {
				let title = gca_locale.get("settings", "category_" + category);
				let li = document.createElement('li');
				li.dataset.category = category;
				li.textContent = title;
				menu.appendChild(li);
				li.addEventListener('click', (function(tabname, title, that){
					return function(){
						// Get url
						var url = gca_getPage.parameters();
						url.category = tabname;
						url.gcamod = "settings";
						delete url.sh;
						// Change Url
						window.history.pushState({category : tabname}, "GCA - Settings", gca_getPage.link(url));

						that.openTab(tabname, title);
					};
				})(category, title, this), false);
			}
		},

		activeTab : null,
		openTab : function(tabname, title){
			// Clear tab
			this.tab_div.innerHTML = "";

			// If tabname not exist
			if(!tabname || !this.scheme[tabname]){
				tabname = "global";
			}

			// If is open do nothing
			if(this.activeTab == tabname)
				return;

			var li = document.getElementById('settings_menu').getElementsByTagName('li');
			for (var i = 0; i < li.length; i++) {
				if(li[i].dataset.category == tabname){
					li[i].className = "active";
				}else{
					li[i].className = "";
				}
			}

			// Open tab
			this.createTab(tabname, title, this.scheme[tabname]);
		},

		tabItems : null,
		createTab : function(name, titleText, scheme){
			// Tab Items reset
			this.tabItems = [];

			var container = document.createElement("div");

			var title = document.createElement("div");
			title.textContent = titleText;
			title.className = "settings_tab_title";
			container.appendChild(title);

			// Create each item
			for(var id in scheme){
				this.tabItems.push(
					this.createItem(id, scheme[id], container)
				);
			}

			var save = document.createElement("input");
			save.type = "button";
			save.className = "button2";
			save.style.float = "right";
			save.value = gca_locale.get("settings", "save");
			// Save event
			var that = this;
			save.addEventListener('click', function(){
				// Saving
				for (var i = 0; i < that.tabItems.length; i++) {
					that.tabItems[i].save();
				}
				// Notify
				gca_notifications.info(gca_locale.get("settings", "notification_reload"));
			}, false);

			container.appendChild(save);
			this.tab_div.appendChild(container);
		},

		createItem : function(id, scheme, container){
			// Costruck known type
			switch(scheme.type){
				case "boolean": return this.construct.boolean(id, scheme, container);
				case "integer": return this.construct.integer(id, scheme, container);
				case "enumerator": return this.construct.enumerator(id, scheme, container);
				case "range": return this.construct.range(id, scheme, container);
				case "custom": return this.construct.custom(id, scheme, container);
			}

			// Default - Unknown
			var item = {};
			item.id = id;
			item.save = function(){};

			return item;
		},

		construct : {
			boolean : function(id, scheme, container){
				// Item object
				var item = {};
				item.id = id;
				item.data = {};

				// Type Wrapper
				var typeWrapper = document.createElement('div');
				typeWrapper.className = "type-wrapper type-boolean";
				var title = document.createElement('span');
				title.textContent = scheme.locale;
				typeWrapper.appendChild(title);
				container.appendChild(typeWrapper);

				var select = document.createElement('div');
				select.className = "switch-field";

				item.data.true = document.createElement('input');
				item.data.true.type = "radio";
				item.data.true.id = id + "__true";
				item.data.true.name = id;
				item.data.true.value = "true";
				select.appendChild(item.data.true);
				var label = document.createElement('label');
				label.setAttribute('for', id + "__true");
				label.textContent = "On";
				select.appendChild(label);

				item.data.false = document.createElement('input');
				item.data.false.type = "radio";
				item.data.false.id = id + "__false";
				item.data.false.name = id;
				item.data.false.value = "false";
				select.appendChild(item.data.false);
				var label = document.createElement('label');
				label.setAttribute('for', id + "__false");
				label.textContent = "Off";
				select.appendChild(label);

				if(scheme.value) item.data.true.checked = true;
				else item.data.false.checked = true;

				typeWrapper.appendChild(select);

				var clearBoth = document.createElement('div');
				clearBoth.style.clear = "both";
				typeWrapper.appendChild(clearBoth);

				item.save = function(){
					var value = item.data.true.checked;

					if(scheme.data.db == "options"){
						gca_options.set(scheme.data.category, scheme.data.label, value);
					}
					else if(scheme.data.db == "section"){
						gca_data.section.set(scheme.data.category, scheme.data.label, value);
					}
				};

				return item;
			},

			integer : function(id, scheme, container){
				// Item object
				var item = {};
				item.id = id;
				item.data = {};

				// Type Wrapper
				var typeWrapper = document.createElement('div');
				typeWrapper.className = "type-wrapper type-integer";
				var title = document.createElement('span');
				title.textContent = scheme.locale;
				typeWrapper.appendChild(title);
				container.appendChild(typeWrapper);

				var select = document.createElement('div');
				select.className = "switch-field";

				item.data.input = document.createElement('input');
				item.data.input.type = "text";
				item.data.input.id = id + "__integer";
				item.data.input.name = id;
				item.data.input.value = scheme.value;
				select.appendChild(item.data.input);

				typeWrapper.appendChild(select);

				var clearBoth = document.createElement('div');
				clearBoth.style.clear = "both";
				typeWrapper.appendChild(clearBoth);

				item.save = function(){
					var value = item.data.input.value;
					value = parseInt(value, 10);
					if(isNaN(value)){
						value = scheme.value;
						item.data.input.value = scheme.value;
					}
					else {
						if(scheme.data.db == "options"){
							gca_options.set(scheme.data.category, scheme.data.label, value);
						}
						else if(scheme.data.db == "section"){
							gca_data.section.set(scheme.data.category, scheme.data.label, value);
						}
					}
				};

				return item;
			},

			enumerator : function(id, scheme, container){
				// Item object
				var item = {};
				item.id = id;
				item.data = {};

				// Type Wrapper
				var typeWrapper = document.createElement('div');
				typeWrapper.className = "type-wrapper type-enumerator";
				var title = document.createElement('span');
				title.textContent = scheme.locale;
				typeWrapper.appendChild(title);
				container.appendChild(typeWrapper);

				var select = document.createElement('div');
				select.className = "switch-field";

				item.data.types = [];
				for(var i = 0; i < scheme.types.length; i++){
					var typeItem = document.createElement('input');
					typeItem.type = "checkbox";
					typeItem.id = id + "__" + scheme.types[i];
					typeItem.name = id;
					typeItem.value = scheme.types[i];
					select.appendChild(typeItem);
					var label = document.createElement('label');
					label.setAttribute('for', id + "__" + scheme.types[i]);
					
					if (scheme.values_locale && scheme.values_locale[i]) {
						label.appendChild(scheme.values_locale[i]);
					}
					else if (scheme.values_dom && scheme.values_dom[i]) {
						label.appendChild(scheme.values_dom[i]);
					}
					else {
						label.textContent = scheme.types[i];
					}
					select.appendChild(label);

					if(scheme.value.indexOf(scheme.types[i]) > -1)
						typeItem.checked = true;

					item.data.types.push(typeItem);
				}

				typeWrapper.appendChild(select);

				var clearBoth = document.createElement('div');
				clearBoth.style.clear = "both";
				typeWrapper.appendChild(clearBoth);

				item.save = function(){
					var value = [];

					for (var i = 0; i < item.data.types.length; i++) {
						if(item.data.types[i].checked)
							value.push(item.data.types[i].value);
					}

					if(scheme.data.db == "options"){
						gca_options.set(scheme.data.category, scheme.data.label, value.join("|"));
					}
					else if(scheme.data.db == "section"){
						gca_data.section.set(scheme.data.category, scheme.data.label, value.join("|"));
					}
				};

				return item;
			},

			range : function(id, scheme, container){
				// Item object
				var item = {};
				item.id = id;
				item.data = {};

				var input_value = scheme.value / scheme.scale;

				// Type Wrapper
				var typeWrapper = document.createElement('div');
				typeWrapper.className = "type-wrapper type-range";
				var title = document.createElement('span');
				title.textContent = scheme.locale;
				typeWrapper.appendChild(title);
				container.appendChild(typeWrapper);

				var select = document.createElement('div');
				select.className = "switch-field";

				var preview = document.createElement('div');
				preview.style.float = "left";
				preview.style.width = "32px";
				preview.style.fontSize = "10px";
				preview.style.height = "20px";
				preview.style.lineHeight = "20px";
				preview.textContent = Math.round((input_value / scheme.max) * 100);
				select.appendChild(preview);

				item.data.input = document.createElement('input');
				item.data.input.style.height = "12px";
				item.data.input.style.width = "80px";
				item.data.input.type = "range";
				item.data.input.id = id + "__range";
				item.data.input.name = id;
				item.data.input.value = input_value;
				item.data.input.setAttribute("min", scheme.min);
				item.data.input.setAttribute("step", scheme.step);
				item.data.input.setAttribute("max", scheme.max);
				select.appendChild(item.data.input);

				item.data.input.addEventListener('change', function(){
					preview.textContent = Math.round((this.value / scheme.max) * 100);
				}, false);

				typeWrapper.appendChild(select);

				var clearBoth = document.createElement('div');
				clearBoth.style.clear = "both";
				typeWrapper.appendChild(clearBoth);

				item.save = function(){
					var value = item.data.input.value;
					value = parseInt(value, 10);

					if(scheme.data.db == "options"){
						gca_options.set(scheme.data.category, scheme.data.label, value * scheme.scale);
					}
					else if(scheme.data.db == "section"){
						gca_data.section.set(scheme.data.category, scheme.data.label, value * scheme.scale);
					}
				};

				return item;
			},

			custom : function(id, scheme, container){
				// Item object
				var item = {};
				item.id = id;
				item.data = {};

				// Type Wrapper
				var typeWrapper = document.createElement('div');
				typeWrapper.className = "type-wrapper type-custom";
				var title = document.createElement('span');
				title.textContent = scheme.locale;
				typeWrapper.appendChild(title);
				container.appendChild(typeWrapper);

				if(typeof scheme.dom == "function"){
					var custom = scheme.dom(item.data, title, typeWrapper);
					typeWrapper.appendChild(custom);
				}

				var clearBoth = document.createElement('div');
				clearBoth.style.clear = "both";
				typeWrapper.appendChild(clearBoth);

				item.save = function(){
					if(typeof scheme.save == "function"){
						scheme.save(item.data);
					}
				};

				return item;
			}
		},

		class : {
			boolean : function(locale, category, label, db){
				return {
					type : "boolean",
					locale : locale,
					data : {
						category : category,
						label : label,
						db : db
					},
					value : 
						(db == "options") ? gca_options.bool(category, label) :
						(db == "section") ? gca_data.section.get(category, label, gca_options.get(category, label)) :
						null
				};
			},
			integer : function(locale, category, label, db){
				return {
					type : "integer",
					locale : locale,
					data : {
						category : category,
						label : label,
						db : db
					},
					value : 
						(db == "options") ? gca_options.get(category, label) :
						(db == "section") ? gca_data.section.get(category, label, gca_options.get(category, label)) :
						null
				};
			},
			enumerator : function(locale, types, values_locale, values_dom, category, label, db){
				var defValues = types.split('|');
				var values = [];
				var saved = 
					(db == "options") ? gca_options.get(category, label).split('|') :
					(db == "section") ? gca_data.section.get(category, label, gca_options.get(category, label)).split('|') :
					[];

				for(var i = 0; i < saved.length; i++){
					if(defValues.indexOf(saved[i]) > -1){
						values.push(saved[i]);
					}
				}

				return {
					type : "enumerator",
					locale : locale,
					types : defValues,
					values_locale : values_locale,
					values_dom : values_dom,
					data : {
						category : category,
						label : label,
						db : db
					},
					value : values
				};
			},
			range : function(locale, min, step, max, scale, category, label, db){
				return {
					type : "range",
					locale : locale,
					data : {
						category : category,
						label : label,
						db : db
					},
					value : 
						(db == "options") ? gca_options.get(category, label) :
						(db == "section") ? gca_data.section.get(category, label, gca_options.get(category, label)) :
						null
					,

					min : min,
					step : step,
					max : max,
					scale : scale
				};
			},
			custom : function(locale, dom, save, category, label, db){
				return {
					type : "custom",
					locale : locale,
					data : {
						category : category,
						label : label,
						db : db
					},
					dom : dom,
					save : save
				};
			}
		}
	}
};

(function(){
	// Pre Inject
	gca_settings.preinject();
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_settings.inject();
	}
	if(document.readyState == "complete" || document.readyState == "loaded"){
		fireLoadEvent();
	}else{
		window.addEventListener('DOMContentLoaded', function(){
			fireLoadEvent();
		}, true);
		window.addEventListener('load', function(){
			fireLoadEvent();
		}, true);
	}
})();