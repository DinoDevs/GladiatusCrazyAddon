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
		this.options.inject();

		// If gca settings
		if(gca_section.gcamod == "settings"){
			this.options.open();
			this.options.preinject.showContent();
		}
	},

	// Options
	options : {
		// Inject
		inject : function(){
			// Box
			var wrapper = document.createElement("div");
			wrapper.id = "settings_box";
			var wrapperTitle = document.createElement("div");
			wrapperTitle.className = "title_box";
			var title = document.createElement("div");
			title.className = "title_inner";
			title.textContent = gca.name + " - " + gca_locale.get("OPTIONS_SETTINGS");
			wrapperTitle.appendChild(title);
			wrapper.appendChild(wrapperTitle);
			var wrapperBox = document.createElement("div");
			wrapperBox.className = "title2_box";
			var box = document.createElement("div");
			box.className = "title2_inner";
			wrapperBox.appendChild(box);
			wrapper.appendChild(wrapperBox);
			document.getElementById("content").appendChild(wrapper);

			// Icon
			var icon = document.createElement("div");
			icon.className = "icon";
			box.appendChild(icon);
			// Description
			var desc = document.createElement("div");
			desc.className = "description";
			desc.appendChild(document.createTextNode(gca_locale.get("OPTIONS_DESCRIPTION")));
			desc.appendChild(document.createElement("br"));
			desc.appendChild(document.createTextNode(gca_locale.get("OPTIONS_BUTTON_BELOW")));
			box.appendChild(desc);

			// Clear
			var clear = document.createElement("div");
			clear.className = "space";
			box.appendChild(clear);

			// Insert Settings button
			var button = document.createElement("input");
			button.type = "button";
			button.className = "awesome-button";
			button.value = gca_locale.get("OPTIONS_SETTINGS");
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
				// Sounds
				"sound_notifications" : true,

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
				"shortcuts_bar_buttons" : 'msg|gmd|gmr|gst|gbn|gwr|gjl|glb|sim|stt|onl',
			
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
				// Craps Event Timer
				"craps_timer" : true,

				// Player Image
				"player_image" : true,

				// Notifications
				"notify_new_guild_application" : false,
				// Notifications Interal in minites
				"notify_new_guild_application_interval" : 60,
	
				// Enable x-scroll
				"x-scroll" : true,

				// Enable item's shadow
				"item_shadow" : true,
				
				// Underword
					// Pray Shorcut
					"pray_shorcut" : true
			},

			// Overview Options
			"overview" : {
				// Show the life gain a food gives
				"food_life_gain" : true,
				// Drop items to see materials to repair feature
				"repair_materials_info" : true,
				// Show best food to consume
				"best_food" : true,
				// Overview bag manager
				"bag_manager" : true,
				// Show more statistics
				"more_statistics" : true,
				// new Achivements layout
				"achivements_layout" : true
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

			// Pantheon Options
			"pantheon" : {
				// Reorder quests
				"quests_reorder" : true,
				// Insert more details on quests
				"quests_detailed_rewards" : true,
				// Show completed missions
				"missions_show_completed" : true
			},

			// Reports
			"reports" : {
				// Style change
				"style_change" : true,
				"load_loot_tooltips" : true,
				// Item found
				"found_items" : true
			},

			// Auction Options
			"auction" : {
				// TODO : need options
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
				// Library layout
				"library_layout" : true
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
				"pages_to_load" : 2
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
						if(!locale) locale = "$" + category + "$" + label;
						var _category = this.scheme[category][label].category;
						if(!_category) _category = category;
						var _label = this.scheme[category][label].label;
						if(!_label) _label = label;

						switch(this.scheme[category][label].type){
							case "boolean" :
								this.scheme[category][label] = this.class.boolean(locale, _category, _label);
								break;
							case "enumerator" :
								this.scheme[category][label] = this.class.enumerator(locale, this.scheme[category][label].values, _category, _label);
								break;
						}
					}

					// Parse from value
					else{
						var type = this.scheme[category][label];
						if(typeof type != "string"){
							if(typeof type == "boolean")
								type = "boolean";
						}
						else{
							if(type.match(/\|/i)){
								type = "enumerator";
							}
						}

						switch(type){
							case "boolean" :
								this.scheme[category][label] = this.class.boolean("$" + category + "$" + label, category, label);
								break;
							case "enumerator" :
								this.scheme[category][label] = this.class.enumerator("$" + category + "$" + label, this.scheme[category][label], category, label);
								break;
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
			var tabname = null;
			if(url.gcamod == "settings" && url.category){
				tabname = url.category;
			}

			// Change Url
			url.gcamod = "settings";
			delete url.sh;
			window.history.pushState(null, "GCA - Settings", gca_getPage.link(url));

			// Create if not exist
			if(!document.getElementById("content_2nd"))
				this.create();

			// Open Global tab
			this.openTab(tabname);

			// Scroll to top
			window.scrollTo(0, 0);

			// Hide page's content
			document.getElementById("content").style.display = "none";
			// Show page's 2nd content
			document.getElementById("content_2nd").style.display = "block";
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
			logo_title.textContent = "Settings";
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
				let li = document.createElement('li');
				li.dataset.category = category;
				li.textContent = category; // TODO : add translations
				menu.appendChild(li);
				li.addEventListener('click', (function(tabname, that){
					return function(){
						that.openTab(tabname);
					};
				})(category, this), false);
			}
		},

		activeTab : null,
		openTab : function(tabname){
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
			this.createTab(tabname, this.scheme[tabname]);
		},

		tabItems : null,
		createTab : function(name, scheme){
			// Tab Items reset
			this.tabItems = [];

			var container = document.createElement("div");

			var title = document.createElement("div");
			title.textContent = name;
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
			save.value = "Save"; // TODO : locale
			// Save event
			var that = this;
			save.addEventListener('click', function(){
				// Saving
				for (var i = 0; i < that.tabItems.length; i++) {
					that.tabItems[i].save();
				}
				// Notify
				gca_notifications.info("Refresh");
			}, false);

			container.appendChild(save);
			this.tab_div.appendChild(container);
		},

		createItem : function(id, scheme, container){
			// Costruck known type
			switch(scheme.type){
				case "boolean": return this.construct.boolean(id, scheme, container);
				case "enumerator": return this.construct.enumerator(id, scheme, container);
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
					gca_options.set(scheme.data.category, scheme.data.label, value);
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
					label.textContent = scheme.types[i]; // TODO : locale
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

					gca_options.set(scheme.data.category, scheme.data.label, value.join("|"));
				};

				return item;
			}
		},

		class : {
			boolean : function(locale, category, label){
				return {
					type : "boolean",
					locale : locale,
					data : {
						category : category,
						label : label
					},
					value : gca_options.bool(category, label)
				};
			},
			enumerator : function(locale, types, category, label){
				var defValues = types.split('|');
				var values = [];
				var saved = gca_options.get(category, label).split('|');
				for(var i = 0; i < saved.length; i++){
					if(defValues.indexOf(saved[i]) > -1){
						values.push(saved[i]);
					}
				}

				return {
					type : "enumerator",
					locale : locale,
					types : defValues,
					data : {
						category : category,
						label : label
					},
					value : values
				};
			}
		}
	},

	interface : {
		// Create Options
		createSettings : function(){
			// Settings var
			var settings = gca_settings.settings;

			// Settings Div
			settings.elements.content = document.createElement("div");
			settings.elements.content.id = "gca_setings_content";

			// Elements build temp variables
			var div, textDiv;

			// Page title
			div = document.createElement("div");
			div.className = "logo";
			textDiv = document.createElement("div");
			textDiv.textContent = gca_locale.get("OPTIONS_SETTINGS");
			div.appendChild(textDiv);
			settings.elements.content.appendChild(div);

			// Spacer
			div = document.createElement("div");
			div.style.height = "4px";
			settings.elements.content.appendChild(div);


			settings.elements.options = (
				new settings.classes.options("Gladiatus Crazy Addon Options",[
					new settings.classes.category("GLOBAL_OPTIONS",[
						new settings.classes.subcategory(null,[
							new settings.classes.checkBox("GLOBAL_EXTENDED_HP_XP_INFO"),
							new settings.classes.checkBox("GLOBAL_BUTTON_BAR"),
							new settings.classes.checkBox("GLOBAL_AUCTION_STATUS_BAR"),
							new settings.classes.checkBox("GLOBAL_AUCTION_STATUS_NOTIFICATION"),
							new settings.classes.checkBox("GLOBAL_TOP_FIXED_BAR"),
							new settings.classes.checkBox("GLOBAL_ADVANCED_MAIN_MENU"),
							new settings.classes.checkBox("GLOBAL_MERCHANTS_TIME"),
							new settings.classes.checkBox("GLOBAL_MINITES_LEFT_FOR_FULL_LIFE"),
							new settings.classes.checkBox("GLOBAL_REMEMBER_TABS"),
							new settings.classes.checkBox("GLOBAL_QUESTS_TIMER"),
							new settings.classes.checkBox("GLOBAL_ATTACKED_TIMERS"),
							new settings.classes.checkBox("GLOBAL_WEAPON_DOWN_ALERT"),
							new settings.classes.checkBox("GLOBAL_DISPLAY_CENTURIO_DAYS"),
							new settings.classes.checkBox("GLOBAL_MAP_NAMES_LEVELS"),
							new settings.classes.checkBox("GLOBAL_SOUND_NOTIFICATIONS"),
							new settings.classes.dropdownlist("GLOBAL_LANGUAGE", gca_languages),
						])
					]),
					new settings.classes.category("OVERVIEW_OPTIONS",[
						new settings.classes.subcategory("MAIN_PLAYER_OPTIONS",[
							new settings.classes.checkBox("OVERVIEW_ITEMS_ANALIZE"),
							new settings.classes.checkBox("OVERVIEW_DISPLAY_SHARE_LINK")
						]),
						new settings.classes.subcategory("STATS_OPTIONS",[
							new settings.classes.checkBox("OVERVIEW_PLAYER_STATS_MOD"),
							new settings.classes.checkBox("OVERVIEW_BLOCK_AVOID_CAPS")
						])
					]),
					new settings.classes.category("TRANING_OPTIONS",[
						new settings.classes.subcategory(null,[
							new settings.classes.checkBox("TRANING_DISPLAY_MOD"),
							new settings.classes.checkBox("TRANING_DISPLAY_COST_CALCULATOR")
						])
					]),
					new settings.classes.category("AUCTION_OPTIONS",[
						new settings.classes.subcategory("AUCTION_TABLE_MODIFICATIONS",[
							new settings.classes.checkBox("AUCTION_DISPLAY_ITEMS_NUM"),
							new settings.classes.checkBox("AUCTION_DISPLAY_ITEMS_BGCOLOR"),
							new settings.classes.checkBox("AUCTION_AUTO_FILL_GOLD"),
							new settings.classes.checkBox("AUCTION_DISPLAY_ITEMS_LVL"),
							new settings.classes.checkBox("AUCTION_DISPLAY_3_ITEMS_PER_ROW"),
							new settings.classes.checkBox("AUCTION_MULTIPLE_BIDS"),
							new settings.classes.checkBox("AUCTION_WARN_GUILD")
						]),
						new settings.classes.subcategory("AUCTION_SEARCH_MODIFICATIONS",[
							new settings.classes.checkBox("AUCTION_EXPAND_ITEMS_LVL"),
							new settings.classes.checkBox("AUCTION_IMPROVE_SEARCH_MENU")
						]),
						new settings.classes.subcategory("AUCTION_TOOLTIP_MODIFICATIONS",[
							new settings.classes.checkBox("AUCTION_MERCENARIES_TOOLTIPS"),
							new settings.classes.checkBox("AUCTION_HIDE_MERCENARIES_GUIDE_ROW")
						])
					]),
					new settings.classes.category("MARKET_OPTIONS",[
						new settings.classes.subcategory("MARKET_TABLE_MODIFICATIONS",[
							new settings.classes.checkBox("MARKET_LOAD_MORE_PAGES",true),
							new settings.classes.checkBox("MARKET_STYLE_CHANGES"),
							new settings.classes.checkBox("MARKET_CANCEL_PACKETS_BUTTON"),
							new settings.classes.dropdownlist("MARKET_DEFAULT_SELL_DURATION", {"0":{name:"2 h"},"1":{name:"8 h"},"2":{name:"24 h"},"3":{name:"48 h"}}),
						]),
						new settings.classes.subcategory("MARKET_SEARCH_MODIFICATIONS",[
							new settings.classes.checkBox("MARKET_EXPAND_ITEMS_LVL"),
							new settings.classes.checkBox("MARKET_IMPROVE_SEARCH_MENU")
						])
					]),
					new settings.classes.category("MERCHANTS_OPTIONS",[
						new settings.classes.subcategory(null,[
							new settings.classes.checkBox("MERCHANTS_ITEM_SEARCH"),
							new settings.classes.checkBox("MERCHANTS_HIGHLIGHT_ITEMS"),
							new settings.classes.checkBox("MERCHANTS_INFOS")
						])
					]),
					new settings.classes.category("MESSAGES_OPTIONS",[
						new settings.classes.subcategory("MESSAGES_LIST_OPTIONS",[
							new settings.classes.checkBox("MESSAGES_STYLING"),
							new settings.classes.checkBox("MESSAGES_CONVERT_LINKS", false, true),
							new settings.classes.checkBox("MESSAGES_FIX_SPACES", false, true)
						]),
						new settings.classes.subcategory("NEW_MESSAGE_OPTIONS",[
							new settings.classes.checkBox("NEWMESSAGE_FOCUS"),
							new settings.classes.checkBox("NEWMESSAGE_FRIENDLIST")
						]),
						new settings.classes.subcategory("MESSAGE_SPAM_BLOCK_OPTIONS",[
							new settings.classes.checkBox("MESSAGE_SPAM_BLOCK"),
							new settings.classes.textinput("SPAM_BLOCKED_PLAYERS",function(){}),
						])
					]),
					new settings.classes.category("PACKAGES_OPTIONS",[
						new settings.classes.subcategory(null,[
							new settings.classes.checkBox("PACKAGES_NEW_LAYOUT",true),
							new settings.classes.numberinput("PACKAGES_MAX_PAGES_TO_LOAD",function(){},true),
							new settings.classes.checkBox("PACKAGES_COLLECT_GOLD_BUTTON"),
							new settings.classes.checkBox("PACKAGES_EXPIRED_PACKAGES"),
							new settings.classes.numberinput("PACKAGES_EXPIRED_HOURS")
						])
					]),
					new settings.classes.category("REPORTS_OPTIONS",[
						new settings.classes.subcategory("REPORT_LIST_OPTIONS",[
							new settings.classes.checkBox("REPORT_LIST_STYLE")
						])
					]),
					new settings.classes.category("CHAT_OPTIONS",[
						new settings.classes.checkBox("CHAT_URL_MOD"),
						new settings.classes.checkBox("CHAT_STYLE_MOD")
					]),
					new settings.classes.category("PANTHEON_OPTIONS",[
						new settings.classes.checkBox("PANTHEON_QUESTS_ORDER"),
						new settings.classes.checkBox("PANTHEON_QUESTS_DETAILED_REWARDS"),
						new settings.classes.checkBox("PANTHEON_GODS_RECOLOR")
					]),
					new settings.classes.category("ARENA_OPTIONS",[
						new settings.classes.checkBox("ARENA_SERVER_ARENA_ORDER")
					]),
					new settings.classes.category("PLAYER_OPTIONS",[
						new settings.classes.checkBox("PLAYER_SIMULATOR_BUTTON"),
						new settings.classes.checkBox("PLAYER_MERCENARIES_FIGHT_TYPE")
					]),
					new settings.classes.category("GUILD_OPTIONS",[
						new settings.classes.subcategory(null,[
							new settings.classes.checkBox("GUILD_MESSAGE_INTERFACE"),
							new settings.classes.checkBox("GUILD_JAIL_INTERFACE"),
							new settings.classes.checkBox("GUILD_LIBRARY_INTERFACE"),
							new settings.classes.checkBox("GUILD_BANK_INTERFACE"),
							new settings.classes.checkBox("GUILD_BANKBOOK_INTERFACE"),
							new settings.classes.checkBox("GUILD_MEDIC_INTERFACE"),
							new settings.classes.checkBox("GUILD_LIFE_TAB"),
							new settings.classes.checkBox("GUILD_APPLICATION_ALERT"),
							new settings.classes.checkBox("GUILD_NAMES_LEVELS")
						])
					]),
					new settings.classes.category("PREMIUM_OPTIONS",[
						new settings.classes.subcategory(null,[
							new settings.classes.textinput("PREMIUM_KEY",function(){gca_dataUpdater.premium.getPremiumCode()}),
							new settings.classes.text( 'Premium: '+( (Math.round((gca_data.get('premium_days',0)-(new Date().getTime()/1000))/60/60/24)<0)?0:Math.round((gca_data.get('premium_days',0)-(new Date().getTime()/1000))/60/60/24) )+' '+gca_locale.get("days")+' '+gca_locale.get("remaining")),
							new settings.classes.button("GET_PREMIUM",function(){window.open('http://gladiatuscrazyaddon.tk/index.php?mode=donate','_blank');})
						])
					]),
					new settings.classes.category("GAME_FIXES_OPTIONS",[
						new settings.classes.subcategory(null,[
							new settings.classes.checkBox("FIXES_RTL_TOOLTIP_FIX")
						])
					])
				])
			);
			this.gcaElements.content.addChild([
				this.gcaElements.options.getDOM(),
				$dark('*br'),
				$dark('*input').type('button').value(gca_locale.get("GENERAL_BACK")).class("button2 options_bottom_button_margin").click(function(){
					gca_options.interface.toggle();
				}),
				$dark('*input').type('button').value(gca_locale.get("OPTIONS_OPEN_ALL")).class("button2 options_bottom_button_margin").click(function(){
					gca_options.interface.gcaElements.options.toggle(false);
				}),
				$dark('*input').type('button').value(gca_locale.get("OPTIONS_CLOSE_ALL")).class("button2 options_bottom_button_margin").click(function(){
					gca_options.interface.gcaElements.options.toggle(true);
				}),
				$dark('*input').type('button').value(gca_locale.get("OPTIONS_SAVE_ALL")).class("button2").click(function(){
					gca_options.interface.gcaElements.options.save();
					gca_options.interface.saveComplete();
				})
			]);

			$dark('#main_inner').addChild(this.gcaElements.content);





		}
	},


	settings : {
		// Settings Elements
		elements : {},

		// Settings Types Classes
		classes : {
			options : (function(name, categories){
				// Constructor
				function Options(name, categories) {
					this.name = name;
					this.categories = categories;
					this.div = document.createElement("div");
					for (var i = 0; i < this.categories.length; i++)
						this.div.appendChild(this.categories[i].getDOM());
				}
				Options.prototype.save = function(){
					for (var i = 0; i < this.categories.length; i++)
						this.categories[i].save();
				};
				Options.prototype.getDOM = function(){
					return this.div;
				};
				Options.prototype.toggle = function(value){
					for(i in this.categories)
						this.categories[i].toggle(value);
				};
				return Options;
			})(),

			// Categories
			category : (function(name, subcategories){
				// Constructor
				function Category(name, subcategories) {
					this.name = (name) ? gca_locale.get("OPTIONS_"+name) : name;
					this.subcategories = subcategories;
					this.open = false;
					this.div = document.createElement("div");
					for(i in this.subcategories)
						this.div.addChild(subcategories[i].getDOM());
				}
				Category.prototype.save = function(){
					for(i in this.subcategories)
						this.subcategories[i].save();
				};
				Category.prototype.getDOM = function(){
					// Save instance
					var that = this;
					// Main div
					var div = document.createElement("div");
					// Name
					var name = document.createElement("div");
					name.className = "options_category";
					name.textContent = this.name;
					name.addEventListener("click", function(){that.toggle();}, false);
					div.appendChild(name);
					// Category
					this.div.className = "options_category_box";
					this.div.style.display = "none";
					// Save Category button
					var input = document.createElement("input");
					input.type = "button";
					input.className = "button1";
					input.style.marginTop = "5px";
					input.value = gca_locale.get("OPTIONS_SAVE_CATEGORY");
					input.addEventListener("click", function(){
						that.save();
						gca_settings.settings.saveComplete();
					}, false);
					this.div.appendChild(input);
					div.appendChild(this.div);

					return div;
				};
				Category.prototype.toggle = function(value){
					if(value!=undefined) this.open = value;
					if(this.open) this.div.style.display = "none";
					else this.div.style.display = "block";
					this.open = (!this.open);
				};
				return Category;
			})(),

			// SubCategories
			subcategory : (function(name, elements){
				// Constructor
				function Subcategory(name, elements) {
					this.name = (name) ? gca_locale.get("OPTIONS_"+name) : name;
					this.elements = elements;
					this.div = document.createElement("div");
					if(this.name) this.div.style.marginTop = "10px";
					for(i in this.elements)
						this.div.addChild(elements[i].getDOM());
				}
				Subcategory.prototype.save = function(){
					for(i in this.elements)
						this.elements[i].save();
				};
				Subcategory.prototype.getDOM = function(){
					// If name exist
					if(this.name){
						// Create wrapper
						var div = document.createElement("div");
						// Option name
						var name = document.createElement("div");
						name.textContent = this.name;
						div.appendChild(name);
						div.appendChild(this.div);
						return div;
					};
					return this.div;
				};
				return Subcategory;
			})(),

			// Elements Types "CheckBox"
			checkBox : (function(label){
				function CheckBox(label, premium, beta){
					premium = typeof premium !== 'undefined' ? premium : false;
					beta = typeof beta !== 'undefined' ? beta : false;
					this.label = (label) ? gca_locale.get("OPTIONS_"+label) : label;
					this.value = "ENABLE_"+label;
					this.input = document.createElement("input");
					this.input.type = "checkbox";
					if(gca_options.isOn(this.value)){
						this.input.setAttribute("checked","checked");
					}
					this.element = document.createElement("label");
					
					if(beta){
						let betaIcon = document.createElement("div");
						betaIcon.className = "betaico";
						this.element.appendChild(betaIcon);
					}
					if(premium){
						let premIcon = document.createElement("div");
						premIcon.className = "premico";
						this.element.appendChild(premIcon);
					}

					var span = document.createElement("span");
					span.textContent = this.label;
					this.element.appendChild(span);
				}
				CheckBox.prototype.getValue = function(){
					if(this.input.checked)
						return true;
					return false;
				};
				CheckBox.prototype.save = function(){
					gca_options.save(this.value, this.getValue());
				};
				CheckBox.prototype.getDOM = function(){
					var div = document.createElement("div");
					div.appendChild(this.element);
					return div;
				};
				return CheckBox;
			})(),

			// Elements Types "DropDown List"
			dropdownlist : (function(label){
				function DropDownList(label, options, texts){
					this.label = (label) ? gca_locale.get("OPTIONS_"+label) : label;
					this.value = label;
					this.select = document.createElement("select");
					
					if(options instanceof Object){
						this.options = new Array();
						this.texts = new Array();
						for(i in options){
							this.options.push(i);
							this.texts.push(options[i].name);
						}
					}else{
						this.options = options;
						this.texts = texts;
					}
					
					for(var i=0; i<this.options.length; i++){
						var optElm = document.createElement("option");
						optElm.value = i;
						optElm.textContent = this.texts[i];
						this.select.appendChild(optElm);
						if(this.options[i] == gca_options.load(this.value))
							optElm.setAttribute("selected","selected");
					}

					this.element = document.createElement("span");
					this.element.textContent = this.label;
				};
				DropDownList.prototype.getValue = function(){
					if(isNaN(this.select.value) || this.select.value >= this.options.length)
						return null;
					return this.options[this.select.value];
				};
				DropDownList.prototype.save = function(){
					if(this.getValue())
						gca_options.save(this.value, this.getValue());
				};
				DropDownList.prototype.getDOM = function(){
					var div = document.createElement("div");
					div.appendChild(this.select);
					div.appendChild(this.element);
					return div;
				};
				return DropDownList;
			})(),
			
			// Elements Types "TextInput"
			textinput : (function(label, save_function){
				function TextInput(label, save_function){
					this.label = (label) ? gca_locale.get("OPTIONS_" + label) : label;
					this.value = label;
					this.input = document.createElement("input");
					this.input.type = "text";
					this.save_function = save_function;
					
					if(gca_options.load(this.value))
						this.input.value(gca_options.load(this.value)) ;
					
					this.element = document.createElement("span");
					this.element.textContent = this.label;
				};
				TextInput.prototype.getValue = function(){
					if(this.input.value && this.input.value!="" && this.input.value!=null)
						return this.input.value;
					return '-';
				};
				TextInput.prototype.save = function(){
					gca_options.save(this.value, this.getValue());
					if(this.save_function)
						this.save_function();
				};
				TextInput.prototype.getDOM = function(){
					var div = document.createElement("div");
					div.appendChild(this.input);
					div.appendChild(this.element);
					return div;
				};
				return TextInput;
			})(),

			// Elements Types "NumberInput"
			numberinput : (function(label, save_function){
				function NumberInput(label, save_function, premium, beta){
					premium = typeof premium !== 'undefined' ? premium : false;
					beta = typeof beta !== 'undefined' ? beta : false;
					this.label = (label) ? gca_locale.get("OPTIONS_"+label) : label;
					this.value = label;
					this.input = document.createElement("input");
					this.input.style.float = "right";
					this.input.type = "number";
					this.save_function = save_function;
					
					if(gca_options.load(this.value))
						this.input.value(gca_options.load(this.value)) ;

					this.element = document.createElement("label");
					
					if(beta){
						let betaIcon = document.createElement("div");
						betaIcon.className = "betaico";
						this.element.appendChild(betaIcon);
					}
					if(premium){
						let premIcon = document.createElement("div");
						premIcon.className = "premico";
						this.element.appendChild(premIcon);
					}

					var span = document.createElement("span");
					span.textContent = this.label;
					this.element.appendChild(span);
				};
				NumberInput.prototype.getValue = function(){
					if(this.input.value && this.input.value!="" && this.input.value!=null && this.input.value>=0)
						return this.input.value;
					return gca_options.load(this.value);
				};
				NumberInput.prototype.save = function(){
					gca_options.save(this.value, this.getValue());
					if(this.save_function)
						this.save_function();
				};
				NumberInput.prototype.getDOM = function(){
					var div = document.createElement("div");
					div.style.height = "26px";
					div.style.lineHeight = "26px";
					div.appendChild(this.input);
					div.appendChild(this.element);
					return div;
				};
				return NumberInput;
			})(),
			
			// Elements Types "Button"
			button : (function(label, callback){
				function Button(label, callback){
					this.input = document.createElement("input");
					this.input.type = "button";
					this.input.value = gca_locale.get("OPTIONS_" + label);
					this.input.className = "button1";
					this.input.addEventListener("click", function(){callback();}, false);
				};
				Button.prototype.save = function(){return;};
				Button.prototype.getDOM = function(){
					var div = document.createElement("div");
					div.appendChild(this.input);
					return div;
				};
				return Button;
			})(),
			
			// Text
			text : (function(label){
				function Text(label){
					this.span = document.createElement("span");
					this.span.textContent = label;
				};
				Text.prototype.save = function(){return;};
				Text.prototype.getDOM = function(){
					var div = document.createElement("div");
					div.appendChild(this.span);
					return div;
				};
				return Text;
			})()
		}




	},
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