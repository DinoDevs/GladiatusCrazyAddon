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
		urls : {
			bug_report : gca_links.get('addon-github') + '/issues/new?template=bug.md',
			idea_request : gca_links.get('addon-github') + '/issues/new?template=feature-request.md',
			documentation : gca_links.get('addon-github') + '/blob/master/documentation/features/README.md',
			troubleshooting_guide : gca_links.get('addon-github') + '/blob/master/documentation/Troubleshooting.md',
			translate_addon : gca_links.get('addon-github') + '/blob/master/documentation/translators/README.md',

			github_link : gca_links.get('addon-github') + '/issues',
			facebook_link : gca_links.get('addon-facebook'),
			donation_link : gca_links.get('addon-donation')
		},

		// Create box on settings
		createBox : function(){
			// GCA Box
			var wrapper = document.createElement("div");
			wrapper.id = "addon_box";
			var title = document.createElement("h2");
			title.className = "section-header";
			title.textContent = gca.name + " - v" + gca.version;
			var changelog = document.createElement('a');
			changelog.href = gca_links.get('addon-github') + '/releases/tag/' + 'v' + gca.version;
			changelog.textContent = '[Changelog v' + gca.version + ']';
			changelog.setAttribute('target', '_black');
			changelog.style.float = 'right';
			title.appendChild(changelog);
			wrapper.appendChild(title);
			var section = document.createElement("section");
			section.style.display = "block";
			wrapper.appendChild(section);
			document.getElementById("content").appendChild(wrapper);

			var box;
			box = document.createElement("div");
			this.createBox_description(box);
			section.appendChild(box);
			section.appendChild(document.createElement("hr"));
			box = document.createElement("div");
			this.createBox_settings(box);
			section.appendChild(box);
			section.appendChild(document.createElement("hr"));
			box = document.createElement("div");
			this.createBox_links(box);
			section.appendChild(box);
		},

		createBox_description : function(box) {
			box.className = "info_box";

			// Subtitle
			let suptitle = document.createElement("div");
			suptitle.textContent = "Making Gladiatus great since 2010!";
			box.appendChild(suptitle);

			// Create letter
			let letter = document.createElement("div");
			letter.style.padding = "10px 30px 10px 20px";

			let p, icon, a;

			// Letter start
			let start = document.createElement("div");
			start.appendChild(document.createTextNode("Ave Gladiator,"));

			// Letter body
			let body = document.createElement("div");
			body.style.marginLeft = "40px";
			body.style.paddingTop = "10px";
			body.style.textAlign = "justify";
			body.style.textJustify = "inter-word";

			p = document.createElement("div");
			p.style.paddingBottom = "10px";
			p.appendChild(document.createTextNode("Thank you for using Gladiatus Crazy Addon."));
			body.appendChild(p);

			p = document.createElement("div");
			p.style.paddingBottom = "10px";
			p.appendChild(document.createTextNode("If you find a "));
			icon = document.createElement("div");
			icon.className = "gca_windows_icon gca_windows_icon-bug";
			p.appendChild(icon);
			p.appendChild(document.createTextNode(" "));
			a = document.createElement("a");
			a.setAttribute("href", this.urls.bug_report);
			a.setAttribute("target", "_blank");
			a.setAttribute("rel", "noreferrer");
			a.style.color = "#b50604";
			a.style.textDecoration = "underline";
			a.textContent = "bug";
			p.appendChild(a);
			p.appendChild(document.createTextNode(" or you have a nice "));
			icon = document.createElement("div");
			icon.className = "gca_windows_icon gca_windows_icon-idea";
			p.appendChild(icon);
			p.appendChild(document.createTextNode(" "));
			a = document.createElement("a");
			a.setAttribute("href", this.urls.idea_request);
			a.setAttribute("target", "_blank");
			a.setAttribute("rel", "noreferrer");
			a.style.color = "#545454";
			a.style.textDecoration = "underline";
			a.textContent = "idea";
			p.appendChild(a);
			p.appendChild(document.createTextNode(" for a new feature, you can open an issue on our "));
			icon = document.createElement("div");
			icon.className = "gca_windows_icon gca_windows_icon-github";
			p.appendChild(icon);
			p.appendChild(document.createTextNode(" "));
			a = document.createElement("a");
			a.setAttribute("href", this.urls.github_link);
			a.setAttribute("target", "_blank");
			a.setAttribute("rel", "noreferrer");
			a.style.color = "#000";
			a.style.textDecoration = "underline";
			a.textContent = "Github page";
			p.appendChild(a);
			p.appendChild(document.createTextNode(" or send us a "));
			icon = document.createElement("div");
			icon.className = "gca_windows_icon gca_windows_icon-facebook";
			p.appendChild(icon);
			p.appendChild(document.createTextNode(" "));
			a = document.createElement("a");
			a.setAttribute("href", this.urls.facebook_link);
			a.setAttribute("target", "_blank");
			a.setAttribute("rel", "noreferrer");
			a.style.color = "#3c5b9b";
			a.style.textDecoration = "underline";
			a.textContent = "Facebook message";
			p.appendChild(a);
			p.appendChild(document.createTextNode("."));
			body.appendChild(p);
			
			// Documentation
			p = document.createElement("div");
			p.style.paddingBottom = "10px";
			p.appendChild(document.createTextNode("If you want to see all features, check our 📚 "));
			body.appendChild(p);
			a = document.createElement("a");
			a.setAttribute("href", this.urls.documentation);
			a.setAttribute("target", "_blank");
			a.setAttribute("rel", "noreferrer");
			a.style.color = "#612d04;";
			a.style.textDecoration = "underline";
			a.textContent = "Documentation";
			p.appendChild(a);
			p.appendChild(document.createTextNode(". There, we explain the in-game changes that each setting/option does."));

			// Troubleshooting guide note
			p = document.createElement("div");
			p.style.paddingBottom = "10px";
			p.appendChild(document.createTextNode("You can also check our 🚩 "));
			body.appendChild(p);
			a = document.createElement("a");
			a.setAttribute("href", this.urls.troubleshooting_guide);
			a.setAttribute("target", "_blank");
			a.setAttribute("rel", "noreferrer");
			a.style.color = "#612d04;";
			a.style.textDecoration = "underline";
			a.textContent = "Troubleshooting guide";
			p.appendChild(a);
			p.appendChild(document.createTextNode(" that might help you solve your problem!"));

			p = document.createElement("div");
			p.style.paddingBottom = "10px";
			p.appendChild(document.createTextNode("We need your support! Buy us a "));
			icon = document.createElement("div");
			icon.className = "gca_windows_icon gca_windows_icon-beer";
			p.appendChild(icon);
			p.appendChild(document.createTextNode(" "));
			a = document.createElement("a");
			a.setAttribute("href", this.urls.donation_link);
			a.setAttribute("target", "_blank");
			a.setAttribute("rel", "noreferrer");
			a.style.color = "#af790f";
			a.style.textDecoration = "underline";
			a.textContent = "beer";
			p.appendChild(a);
			p.appendChild(document.createTextNode(" by donating and also help us by "));
			icon = document.createElement("div");
			icon.className = "gca_windows_icon gca_windows_icon-translation";
			p.appendChild(icon);
			p.appendChild(document.createTextNode(" "));
			a = document.createElement("a");
			a.setAttribute("href", this.urls.translate_addon);
			a.setAttribute("target", "_blank");
			a.setAttribute("rel", "noreferrer");
			a.style.color = "#3278ee";
			a.style.textDecoration = "underline";
			a.textContent = "translating the addon";
			p.appendChild(a);
			p.appendChild(document.createTextNode(" in your language!"));
			body.appendChild(p);

			p = document.createElement("div");
			p.style.paddingBottom = "10px";
			p.appendChild(document.createTextNode("Do not forget to check the addon's settings bellow, so that you can enable or disable any feature you want."));
			body.appendChild(p);

			// Letter end
			let end = document.createElement("div");
			end.appendChild(document.createTextNode("Yours,"));
			end.appendChild(document.createElement("br"));
			end.appendChild(document.createTextNode("GreatApo & DarkThanos"));

			// Build letter
			letter.appendChild(start);
			letter.appendChild(body);
			letter.appendChild(end);
			box.appendChild(letter);
		},

		createBox_settings : function(box) {
			box.className = "settings_box";

			// Title
			var title = document.createElement('h2');
			title.textContent = gca_locale.get("settings", "settings");
			box.appendChild(title);

			// Icon
			var icon = document.createElement('div');
			icon.className = 'icon';
			box.appendChild(icon);

			// Description
			var desc = document.createElement('div');
			desc.className = 'description';
			desc.appendChild(document.createTextNode(gca_locale.get('settings', 'description')));
			desc.appendChild(document.createElement('br'));
			desc.appendChild(document.createTextNode(gca_locale.get('settings', 'description_click_button')));
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
			button.addEventListener("click", () => {
				this.open();
			}, false);
		},

		createBox_links : function(box) {
			box.className = "links_box";

			// Title
			var title = document.createElement('h2');
			title.textContent = 'Gladiatus related links';
			box.appendChild(title);

			// SubTitle
			title = document.createElement('h3');
			title.textContent = 'Addon links';
			box.appendChild(title);

			// Links
			let wrapper, group;

			group = document.createElement('div');
			group.className = 'group';

			wrapper = document.createElement('div');
			wrapper.appendChild(document.createTextNode('Gladiatus Crazy Addon : '));
			wrapper.appendChild(gca_tools.create.link(gca_links.get('addon-page'), gca_links.get('addon-page'), {target: '_blank'}));
			group.appendChild(wrapper);
			
			wrapper = document.createElement('div');
			wrapper.appendChild(document.createTextNode('Gladiatus Forum : '));
			wrapper.appendChild(gca_tools.create.link(gca_links.get('addon-forum-thread'), gca_links.get('addon-forum-thread'), {target: '_blank'}));
			group.appendChild(wrapper);
			
			wrapper = document.createElement('div');
			wrapper.appendChild(document.createTextNode('Facebook : '));
			wrapper.appendChild(gca_tools.create.link(gca_links.get('addon-facebook'), gca_links.get('addon-facebook'), {target: '_blank'}));
			group.appendChild(wrapper);
			
			wrapper = document.createElement('div');
			wrapper.appendChild(document.createTextNode('GitHub : '));
			wrapper.appendChild(gca_tools.create.link(gca_links.get('addon-github'), gca_links.get('addon-github'), {target: '_blank'}));
			group.appendChild(wrapper);
			
			wrapper = document.createElement('div');
			wrapper.appendChild(document.createTextNode('Install on Firefox : '));
			wrapper.appendChild(gca_tools.create.link(gca_links.get('addon-mozilla'), gca_links.get('addon-mozilla'), {target: '_blank'}));
			group.appendChild(wrapper);
			
			wrapper = document.createElement('div');
			wrapper.appendChild(document.createTextNode('Install on Chrome : '));
			wrapper.appendChild(gca_tools.create.link(gca_links.get('addon-chrome'), gca_links.get('addon-chrome'), {target: '_blank'}));
			group.appendChild(wrapper);

			box.appendChild(group);

			// SubTitle
			title = document.createElement('h3');
			title.textContent = 'Other links';
			box.appendChild(title);
			
			group = document.createElement('div');
			group.className = 'group';

			wrapper = document.createElement('div');
			wrapper.appendChild(document.createTextNode('Gladiatus Simulator : '));
			wrapper.appendChild(gca_tools.create.link(gca_links.get('gladiatus-simulator'), gca_links.get('gladiatus-simulator'), {target: '_blank'}));
			group.appendChild(wrapper);

			wrapper = document.createElement('div');
			wrapper.appendChild(gca_tools.create.link(gca_links.get('skarsburning@forum'), 'Skarsburning\'s', {target: '_blank'}));
			wrapper.appendChild(document.createTextNode(' Gladiatus Fansite : '));
			wrapper.appendChild(gca_tools.create.link(gca_links.get('gladiatus-fansite'), gca_links.get('gladiatus-fansite'), {target: '_blank'}));
			group.appendChild(wrapper);

			wrapper = document.createElement('div');
			wrapper.appendChild(gca_tools.create.link(gca_links.get('michalus@forum'), 'Michalus\'', {target: '_blank'}));
			wrapper.appendChild(document.createTextNode(' Gladiatus Tools : '));
			wrapper.appendChild(gca_tools.create.link(gca_links.get('gladiatus-tools-server'), gca_links.get('gladiatus-tools-server'), {target: '_blank'}));
			group.appendChild(wrapper);

			wrapper = document.createElement('div');
			wrapper.appendChild(document.createTextNode('Unofficial Gladiatus Reddit : '));
			wrapper.appendChild(gca_tools.create.link(gca_links.get('unofficial-reddit'), gca_links.get('unofficial-reddit'), {target: '_blank'}));
			wrapper.appendChild(document.createTextNode(' by '));
			wrapper.appendChild(gca_tools.create.link(gca_links.get('williaf@reddit'), 'Williaf', {target: '_blank'}));
			group.appendChild(wrapper);
			
			/*
			wrapper = document.createElement('div');
			wrapper.appendChild(document.createTextNode('Discord Server of Gladiatus Reddit : '));
			wrapper.appendChild(gca_tools.create.link(gca_links.get('reddit-discord'), gca_links.get('reddit-discord'), {target: '_blank'}));
			group.appendChild(wrapper);
			*/
			
			wrapper = document.createElement('div');
			wrapper.appendChild(document.createTextNode('Official Gladiatus Discord Server : '));
			wrapper.appendChild(gca_tools.create.link(gca_links.get('official-discord'), gca_links.get('official-discord'), {target: '_blank'}));
			group.appendChild(wrapper);

			box.appendChild(group);


			let info = document.createElement('div');
			info.className = 'info';
			info.textContent = '(Contact us to add your link here.)';
			box.appendChild(document.createElement('br'));
			box.appendChild(info);
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
							if(wrapper.className.length > 0) wrapper.className += " ";
							wrapper.className += "language_select";
							// Create select
							data.select = document.createElement("select");
							data.select.style.width = "120px";
							// Create a list of languages
							var languages = [];
							for(let lang in gca_languages){
								if(gca_languages.hasOwnProperty(lang) && lang[0] !== '_'){
									languages.push(lang);
								}
							}
							// Sort languages
							languages.sort(function(a, b) {
								if(a < b) return -1;
								else if(a > b) return 1;
								else return 0;
							});
							var option;
							for (var i = 0; i < languages.length; i++) {
								let lang = languages[i];
								option = document.createElement("option");
								option.value = lang;
								option.textContent = gca_languages[lang].name;
								if (gca_locale.active == lang) {
									option.selected = true;
								}
								data.select.appendChild(option);
							}
							
							// If language is not selected
							if (data.select.value == '_active'){
								data.select.value = 'en';
							}

							// Count items
							data.count_items = {};
							data.translated_items = 0;
							for (let category in gca_languages['en'].locale) {
								if (gca_languages['en'].locale.hasOwnProperty(category)) {
									for (let item in gca_languages['en'].locale[category]) {
										if (gca_languages['en'].locale[category].hasOwnProperty(item)) {
											data.translated_items++;
										}
									}
								}
							}

							// Create refresh info function
							data.refreshInfo = function() {
								var lang = gca_languages[data.select.value];
								gca_languages._active = data.select.value;
								var info = "";

								// Completed percent
								info = 0;
								var translated_items = 0;
								if (data.count_items.hasOwnProperty(data.select.value)) {
									translated_items = data.count_items[data.select.value];
								}
								else {
									for (let category in gca_languages['en'].locale) {
										if (gca_languages['en'].locale.hasOwnProperty(category)) {
											for (let item in gca_languages['en'].locale[category]) {
												if (gca_languages['en'].locale[category].hasOwnProperty(item)) {
													if (lang.locale.hasOwnProperty(category) && lang.locale[category].hasOwnProperty(item)) {
														translated_items++;
													}
												}
											}
										}
									}
									data.count_items[data.select.value] = translated_items;
								}
								info = Math.round(translated_items * 100 / data.translated_items);
								data.info_completed.textContent = gca_locale.get("settings", "translated_percent", {number: info});
								data.info_completed.style.fontWeight = "bold";
								
								if( translated_items < data.translated_items ){
									data.show.style.display = "block";
									//data.select.value
								}else
									data.show.style.display = "none";

								// Translators
								info = "";
								if (lang.translators instanceof Array) {
									for (var i = 0; i < lang.translators.length; i++) {
										if (i != 0) {
											info += ", ";
										}
										info += lang.translators[i];
									}
								} else {
									info += lang.translators;
								}
								data.info_translators.textContent = gca_locale.get("settings", "translated_by", {string: info});
							}
							// Clear both
							let clearboth = document.createElement("div");
							clearboth.style.clear = "both";
							// Add language info
							data.info_completed = document.createElement("div");
							data.info_completed.className = "translate-percent";
							data.info_translators = document.createElement("div");
							data.info_translators.className = "translated-by";
							
							// Create missing translation button
							data.show = document.createElement("input");
							data.show.setAttribute("type", "button");
							data.show.className = "awesome-button";
							data.show.style.float = "left";
							data.show.value = gca_locale.get("settings", "missing_translations");
							data.show.addEventListener("click", () => {
								gca_settings.translation_help.show();
							}, false);
							
							data.refreshInfo();
							// Add change event
							data.select.addEventListener("change", data.refreshInfo, false);
							return [data.select, clearboth, data.info_translators, data.info_completed, data.show];
						},
						"save" : function(data){
							if (!gca_languages.hasOwnProperty(data.select.value) || !gca_languages[data.select.value].hasOwnProperty('name')) return;
							gca_locale._setLang(data.select.value);
						}
					};
					return scheme;
				})(),
				
				// Browser notifications
				"browser_notifications" : true,

				// Extended Hp-Xp info
				"extended_hp_xp_info" : true,
				"extended_hp_xp_info_potion" : true,
				"hp_timer_for_full_life" : true,
				
				// Minimum health warning
				"health_warning" : {
					"type" : "range",
					"min" : 0,
					"step" : 1,
					"max" : 100,
					"scale" : 1,
					"db" : "options",
				},
				
				// Expedition/Dungeon Points Recover Timer
				"expedition_dungeon_points_recover_timer" : true,

				// Shortcuts bar
				"shortcuts_bar" : true,
					// msg : guild message / personal message
					// gmd : guild medic
					// gmr : guild market
					// gst : guild storge
					// gbn : guild bank
					// gbt : guild war room
					// gwr : guild war room
					// gar : guild arena battle reports
					// gjl : guild jail
					// glb : guild library
					// gtm : guild templum
					// sim : battle simulator
					// stt : show my stats
					// onl : online friends
					// fau : food auctions
				"shortcuts_bar_buttons" : (function(){
					let scheme = {
						"type" : "enumerator",
						"values" : 'msg|gmd|gmr|gst|gbn|gbt|gwr|gar|gjl|glb|gtm|fau|sim|stt|onl'
					};
					let btns = [
						{icon : "message-icon", title : gca_locale.get("global", "message_private_write")},
						{icon : "cross-icon", title : gca_locale.get("global", "guild_medic_goto")},
						{icon : "market-icon", title : gca_locale.get("global", "guild_market_goto")},
						{icon : "box-icon", title : gca_locale.get("global", "guild_storage_goto")},
						{icon : "gold-icon", title : gca_locale.get("global", "guild_bank_goto")},
						{icon : "bathtub-icon", title : gca_locale.get("global", "guild_baths_goto")},
						{icon : "report-icon", title : gca_locale.get("global", "guild_warcamp_goto")},
						{icon : "report2-icon", title : gca_locale.get("global", "guild_arenareports_goto")},
						{icon : "castle-icon", title : gca_locale.get("global", "guild_jail_goto")},
						{icon : "notebook-icon", title : gca_locale.get("global", "guild_library_goto")},
						{icon : "pillar-icon", title : gca_locale.get("global", "guild_templum_goto")},
						{icon : "food-icon", title : gca_locale.get("global", "auction_food_goto")},
						{icon : "swords-icon", title : gca_locale.get("global", "simulator_goto")},
						{icon : "people-icon", title : gca_locale.get("global", "stats_display")},
						{icon : "online-icon", title : gca_locale.get("global", "online_display")}
					];
					scheme.values_dom = [];
					for (let i = 0; i < btns.length; i++) {
						let tmp = document.createElement("span");
						tmp.className = btns[i].icon;
						tmp.title = btns[i].title;
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

				// Remember Tabs
				"remember_tabs" : true,

				// Attacked Timer
				"attacked_timers" : true,				
				
				// Notifications
				"notify_new_guild_application" : false,
				// Check other data in guild
				"check_guild_pinned_message" : true,
				// Check for applicatons & pinned messages interval in minutes
				"check_guild_application_pinned_messages_interval" : 60,
				// Notifications
				"notify_guild_attack_ready" : false,
				// Notifications Interval in minutes
				"notify_guild_attack_ready_interval" : 15,
			
				// Enable x-scroll
				"x_scroll" : true,

				// Enable item's shadow
				"item_shadow" : true,

				// Enable inventory group options
				"inventory_options_group" : true,
				// Enable inventory gold info
				"inventory_gold_info" : false,

				// Enable pagination layout
				"pagination_layout" : true,
				
				// Gold/Exp data
				"gold_exp_data" : true,
				
				// Underworld
				// Pray Shortcut
				"pray_shorcut" : true,				
				
				// Show item durability
				"show_durability" : (function(){
					var scheme = {
						"type" : "custom",
						"dom" : function(data, title, wrapper){
							if(wrapper.className.length > 0) wrapper.className += " ";
							wrapper.className += "gca_settings_select";
							// Create select
							data.select = document.createElement("select");
							// Create a list
							let durations = [ gca_locale.get("settings",'do_not_show'), gca_locale.get("settings",'show_as')+' %', gca_locale.get("settings",'show_as')+' ⚒'];
							for (let i = 0; i < durations.length; i++) {
								let option = document.createElement("option");
								option.value = i;
								option.textContent = durations[i];
								data.select.appendChild(option);
							}
							data.select.selectedIndex = gca_options.get('global', 'show_durability');
							return data.select;
						},
						"save" : function(data){
							gca_options.set("global", "show_durability", (parseInt(data.select.value, 10) || 0));
						}
					};
					return scheme;
				})(),
				
				// Minimum durability alert
				"min_durability" : {
					"type" : "range",
					"min" : 0,
					"step" : 5,
					"max" : 200,
					"scale" : 1,
					"db" : "options",
				},								
				
				// Show item forge info
				"show_forge_info" : (function(){
					var scheme = {
						"type" : "custom",
						"dom" : function(data, title, wrapper){
							if(wrapper.className.length > 0) wrapper.className += " ";
							wrapper.className += "gca_settings_select";
							// Create select
							data.select = document.createElement("select");
							// Create a list
							let styles = [
								gca_locale.get("settings",'do_not_show'),
								gca_locale.get("settings",'show_as')+' ↔',
								gca_locale.get("settings",'show_as')+' ↕',
								gca_locale.get("settings",'show_as')+' ×? ↔',
								gca_locale.get("settings",'show_as')+' ×? ↕'
							];
							for (let i = 0; i < styles.length; i++) {
								let option = document.createElement("option");
								option.value = i;
								option.textContent = styles[i];
								data.select.appendChild(option);
							}
							data.select.selectedIndex = gca_options.get("global", "show_forge_info");
							return data.select;
						},
						"save" : function(data){
							gca_options.set("global", "show_forge_info", (parseInt(data.select.value, 10) || 0));
						}
					};
					return scheme;
				})(),
				
				// Show mercenaries real name
				"show_mercenaries_real_name_and_combat_stats" : false,

				// Show upgrades value on items
				"show_upgrade_values" : false,
				
				// Attacked Timer
				"global_arena_timer" : true,
				
				// Gladiatus site fixes
				"gladiatus_site_fixes" : true,
				
				// Custom page scrollbar
		        "gca_custom_scrollbar" : true,
				
				// Lock sections visibility
				"lock_section_visibility" : false,

				// Hide language flags
				"hide_language_flags" : false,
				
				// Hide expedition button
				"bar_hide_exp_btn" : false,
				
				// Hide dungeon button
				"bar_hide_dun_btn" : false,
				
				// Hide arena button
				"bar_hide_are_btn" : false,

				// Hide circus button
				"bar_hide_ct_btn" : false
			},

			// Overview Options
			"overview" : {
				// Analyze items
				"analyze_items" : true,
				// Show the life gain a food gives
				"food_life_gain" : true,
				// Show block and avoid critical values caps
				"block_avoid_caps" : true,
				// Show best food to consume
				"best_food" : true,
				// Transparent food gives you more life than you need
				"overfeed_food" : true,
				// Double click to consume item
				"double_click_consume" : false,
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
				// new Achievements layout
				"achivements_layout" : true,
				// Costumes layout
				"costumes_layout" : true,
				// Items repair overview
				"items_repair_overview" : true
			},
			
			// Menu Options
			"main_menu" : {		
		        // Advance main menu
		        "advance_main_menu" : true,
		        "submenu_click_to_change" : false,			
			// Merge menu merchants
		        "menu_merge_merchants" : false,				
			// Merge menu merchants
		        "menu_merge_items" : false,
			// Quest Timer
		        "quest_timer" : true,
			// Centurion & PowerUps timers
		        "centurio_powerups_timers" : false,
			// Forge
		        "forge_timers" : true,
			// Merchants
			"merchants_timer" : true,
			// Hide City Gate menu entry
			"menu_hide_citygate" : false
			},

			// Messages Options
			"messages" : {
				// Layout
				"messages_layout" : true,
				// Show Unread
				"show_unread" : true,
				// Separate days
				"separate_days" : true,
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
				// Small items layout
				"small_items_layout" : false,
				// Improve info layout
				//"compact_info_layout" : true, // todo: remove
				// Improve packets layout
				//"items_layout" : true, // todo: remove
				// List view layout
				//"list_view_layout" : false, // todo: remove
				// Package view layout
				"items_layout" : (function(){
					var scheme = {
						"type" : "custom",
						"dom" : function(data, title, wrapper){
							if(wrapper.className.length > 0) wrapper.className += " ";
							wrapper.className += "gca_settings_select";
							// Create select
							data.select = document.createElement("select");
							// Create a list
							let options = [gca_locale.get("settings",'default'), gca_locale.get("settings",'category_packages$compact_info_layout'), gca_locale.get("settings",'category_packages$list_view_layout')];
							for (let i = 0; i < options.length; i++) {
								let option = document.createElement("option");
								option.value = i;
								option.textContent = options[i];
								data.select.appendChild(option);
							}
							data.select.selectedIndex = gca_options.get("packages", "items_layout");
							return data.select;
						},
						"save" : function(data){
							gca_options.set("packages", "items_layout", (parseInt(data.select.value, 10) || 0));
						}
					};
					return scheme;
				})(),
				// Load more packages pages
				"load_more_pages" : true,
				// Number of pages to load
				"pages_to_load" : 2,
				// Show item's price
				"item_price" : false,
				// Special category features
				"special_category_features" : (function(){
					var scheme = {
						"type" : "custom",
						"dom" : function(data, title, wrapper){
							if(wrapper.className.length > 0) wrapper.className += " ";
							wrapper.className += "gca_settings_select";
							// Create select
							data.select = document.createElement("select");
							// Create a list
							let options = [gca_locale.get("settings",'each_category'), gca_locale.get("settings",'all_category'), gca_locale.get("settings",'do_not_run')];
							for (let i = 0; i < options.length; i++) {
								let option = document.createElement("option");
								option.value = i;
								option.textContent = options[i];
								data.select.appendChild(option);
							}
							data.select.selectedIndex = gca_options.get("packages", "special_category_features");
							return data.select;
						},
						"save" : function(data){
							gca_options.set("packages", "special_category_features", (parseInt(data.select.value, 10) || 0));
						}
					};
					return scheme;
				})(),
				
				// Open packets with double click
				"double_click_open" : true,
				// Advance packet filter
				"advance_filter" : false,
				// Pop Bag Over on scroll
				"pop_over_bag" : true,
				// Category shortcuts on packages page
				"packages_shortcuts" : true
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
				// Open many mystery boxes button
				"open_many_mysteryboxes" : true,
				// Show mystery box reward's value in rubies
				"show_mysterybox_rewards_rubies" : true,
				// Show mystery box reward's owned number
				"show_mysterybox_rewards_owned" : true
			},

			// Reports
			"reports" : {
				// Style change
				"style_change" : true,
				"load_loot_tooltips" : true,
				// Item found
				"found_items" : true,
				// Analyze battle reports
				"battle_analyzer" : true
			},

			"training" : {
				// Show discount
				"show_discount" : true,
				// Show basic in bars
				"show_basics_in_bars" : true,
				// Enable multiple training
				"multiple_train" : true,
				// Enable calculator training
				"calculator_train" : true,
				// Show analyze data
				"show_analyze_items_data" : true,
				// Show points after upgrade
				"show_points_after_upgrade" : true,
			},

			// Merchants
			"merchants" : {
				// Fade items that you can not afford
				"fade_unaffordable_items" : true,
				// Fade items for rubies
				"ruby_icon_on_items" : true,
				// Show shop info
				"show_shop_info" : true,
				// Double click items to sell or buy
				"double_click_actions" : true,
				// Alt + Click items to sell or buy
				"alt_click_actions" : false,
				// Hide floating prices when selling/buying
				"hide_prices" : false
			},
			
			// Forge
			"forge" : {
				// Packages & market shortcuts for each material need (forge/repair)
				"material_links" : true,
				// Show Prefix/Suffix/Base levels
				"show_levels" : true,
				// Show materials names
				"horreum_materials_names" : true,
				// Remember options
				"horreum_remember_options" : true,
				// Select material with click
				"horreum_select_meterials" : true,
				// Double click to select
				"double_click_select" : true,
				// Add a notepad
				"forge_notepad" : true
			},
			
			// Arena
			"arena" : {
				// Ignore attack confirmations
				"ignore_attack_confirmations" : false,
				// Show simulator's image-link
				"show_simulator_imagelink" : true,
				// Sort players by level
				"sort_by_lvl" : true,
				// Highlight guild members on other servers
				"highlight_guild_members" : true,
				// Players target list
				"target_list" : true,
				// Overhaul Arena and Circus tables
				"overhaul_tables" : false
			},
			
			// Magus
			"magus" : {
				// Fade items that you can not improve
				"fade_unimprovable_items" : true
			},
			
			// Market
			"market" : {
				// Soul-bound Buy-Confirmation
				"soulbound_warning" : true,
				"one_gold_warning" : true,
				// Show Cancel-all button
				"cancel_all_button" : true,
				// Remember sell duration
				"remember_sell_duration" : false,
				// Show add fees button
				"add_fees_button" : true,
				// Default sell duration
				"sell_duration" : (function(){
					var scheme = {
						"type" : "custom",
						"dom" : function(data, title, wrapper){
							if(wrapper.className.length > 0) wrapper.className += " ";
							wrapper.className += "sell_duration_select";
							// Create select
							data.select = document.createElement("select");
							// Create a list of durations
							let durations = ['2h','8h','24h','48h'];
							for (let i = 0; i < durations.length; i++) {
								let option = document.createElement("option");
								option.value = i;
								option.textContent = durations[i];
								data.select.appendChild(option);
							}
							data.select.selectedIndex = gca_options.get("market", "sell_duration");
							return data.select;
						},
						"save" : function(data){
							gca_options.set("market", "sell_duration", data.select.value);
						}
					};
					return scheme;
				})(),
				// 1 gold mode
				"one_gold_mode" : true,
				// Custom prices
				"custom_prices" : (function(){
					var scheme = {
						"type" : "custom",
						"dom" : function(data, title, wrapper){
							if(wrapper.className.length > 0) wrapper.className += " ";
							wrapper.className += "type-string";

							let field = document.createElement("div");
							field.className = "switch-field";

							data.input = document.createElement("input");
							data.input.type = "text";
							data.input.value = gca_options.get("market", "custom_prices");

							field.appendChild(data.input);

							return field;
						},
						"save" : function(data){
							// Parse data and clean them bofore saving them
							let custom_prices = [];
							(data.input.value || '').split(',').forEach((price) => {
								price = price.trim().replace(/\./g, '');
								price = price.match(/^(\d+)(%?)$/);
								if (!price) return;
								let isPercentage = price[2] == '%';
								price = parseInt(price[1], 10);
								if (!isNaN(price) && price > 0) {
									let value = isPercentage ? price + '%' : gca_tools.strings.insertDots(price);
									if (!custom_prices.includes(value)) custom_prices.push(value);
								}
							});
							gca_options.set("market", "custom_prices", custom_prices.join(', '));
						}
					};
					return scheme;
				})(),

				/*
				(function(){
					var scheme = {
						"type" : "string",
						"save" : function(data){
							console.log(data.select.value);
							//gca_options.set("market", "custom_prices", data.select.value);
						}
					};
					return scheme;
				})(),
				*/

				// Remember sorting
				"remember_sort" : false,
				// Double click to select
				"double_click_select" : true,
				// Item sell warning icons
				"sell_warning_icons" : true,
				// Sell with enter
				"sell_with_enter" : true
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
				"bank_book_show_changes" : true,
				// Medic Layout
				"medic_layout" : true
			},

			// Auction Options
			"auction" : {
				// Count page items
				"items_counters" : true,
				// More search levels
				"more_search_levels" : true,
				// Show price data
				"item_price_analyze" : true,
				// Show item level (disabled)
				/*"item_level" : false, */
				// Show item names
				"item_name" : false,
				// Show 3 items per line
				"x3_items_per_line" : false,
				// Enable multi bids
				"multi_bids" : true,
				// Show extra stats on items
				"extra_item_stats" : true,
				// Save auction last search
				"save_last_state" : true
			},

			// Accessibility
			"accessibility" : {
				// Make lvl number indicators white
				"white_level_indicators" : false,
				// Add quality symbols above level numbers
				"qualty_symbols_indicators" : false,
				// Make item title in tooltips white
				"tooltips_qualty_white" : false,
				// Add quality symbols on tooltips
				"tooltips_qualty_symbols" : false,
			},

			"events" : {
				// Craps Event Timer
				"craps_timer" : true,
				// Server Quest Event Timer
				"server_quest_timer" : true
			},

			"sound" : {
				// Cooldown Sound Notification
				"cooldown_sound_notifications" : true,
				// Sounds muted
				"muted" : {
					"type" : "boolean",
					"db" : "section",
				},
				// Volume scale
				"volume" : {
					"type" : "range",
					"min" : 1,
					"step" : 1,
					"max" : 100,
					"scale" : 0.01,
					"db" : "section",
				},
				
			},

			"data" : {
				"__scheme" : {
					"save_button" : false
				},
				// Export
				"export_settings" : (function(){
					var scheme = {
						"type" : "custom",
						"dom" : function(data, title, wrapper){
							// Create button
							data.export = document.createElement("input");
							data.export.setAttribute("type", "button");
							data.export.className = "awesome-button";
							data.export.style.float = "right";
							data.export.value = gca_locale.get("settings", "export");
							data.export.addEventListener("click", () => {
								gca_settings.backup.export();
							}, false);
							// Add change event
							return [data.export];
						}
					};
					return scheme;
				})(),

				// Import
				"import_settings" : (function(){
					var scheme = {
						"type" : "custom",
						"dom" : function(data, title, wrapper){
							// Create file select
							data.file = document.createElement("input");
							data.file.setAttribute("type", "file");
							data.file.className = "settings-file-input";
							// Create select
							data.import = document.createElement("input");
							data.import.setAttribute("type", "button");
							data.import.className = "awesome-button";
							data.import.style.float = "right";
							data.import.style.marginTop = "5px";
							data.import.value = gca_locale.get("settings", "import");
							// On import
							data.import.addEventListener("click", () => {
								// Check number of files
								let files = data.file.files;
								if (files.length !== 1) {
									gca_notifications.error(gca_locale.get("general", "error"));
									return;
								}
								// Disable elements
								data.import.setAttribute("disabled", "disabled");
								data.file.setAttribute("disabled", "disabled");
								// Import data
								gca_settings.backup.importFromFile(files[0], (error) => {
									if (error) {
										gca_notifications.error(gca_locale.get("general", "error") + " - " + error);
									}
									else {
										// Data were imported
										data.import.removeAttribute("disabled");
										data.file.removeAttribute("disabled");
										data.file.value = "";
										// Notify user
										// gca_notifications.info(gca_locale.get("settings", "notification_reload"));
										document.location.href = document.location.href;
									}
								});
							}, false);
							// Add change event
							return [data.file, data.import];
						}
					};
					return scheme;
				})(),

				// Export
				"export_settings_to_notes" : (function(){
					var scheme = {
						"type" : "custom",
						"dom" : function(data, title, wrapper){
							// Create button
							data.export = document.createElement("input");
							data.export.setAttribute("type", "button");
							data.export.className = "awesome-button";
							data.export.style.float = "right";
							data.export.style.marginTop = "5px";
							data.export.value = gca_locale.get("settings", "export");
							// On export
							data.export.addEventListener("click", () => {
								// Disable elements
								data.export.setAttribute("disabled", "disabled");
								// Export notes
								gca_settings.backup.exportToNotes()
								.then(() => {
									gca_notifications.success(gca_locale.get("general", "ok"));
									data.export.removeAttribute("disabled");
								})
								.catch((error) => {
									gca_notifications.error(gca_locale.get("general", "error") + ' [' + error + ']');
									data.export.removeAttribute("disabled");
								});
							}, false);
							// Add change event
							return [data.export];
						}
					};
					return scheme;
				})(),
				
				// Import
				"import_settings_from_notes" : (function(){
					var scheme = {
						"type" : "custom",
						"dom" : function(data, title, wrapper){
							// Create button
							data.import = document.createElement("input");
							data.import.setAttribute("type", "button");
							data.import.className = "awesome-button";
							data.import.style.float = "right";
							data.import.style.marginTop = "5px";
							data.import.value = gca_locale.get("settings", "import");
							// On import
							data.import.addEventListener("click", () => {
								// Disable elements
								data.import.setAttribute("disabled", "disabled");
								// Get notes
								gca_settings.backup.importFromNotes()
								.then(() => {
									// Reload page
									document.location.href = document.location.href;
								})
								.catch((error) => {
									gca_notifications.error(gca_locale.get("general", "error") + ' [' + error + ']');
									data.import.removeAttribute("disabled");
								});
							}, false);
							// Add change event
							return [data.import];
						}
					};
					return scheme;
				})(),

				// Reset
				"reset_settings" : (function(){
					var scheme = {
						"type" : "custom",
						"dom" : function(data, title, wrapper){
							// Create button
							data.reset = document.createElement("input");
							data.reset.setAttribute("type", "button");
							data.reset.className = "awesome-button";
							data.reset.style.float = "right";
							data.reset.value = gca_locale.get("settings", "reset");
							data.reset.addEventListener("click", () => {
								if (confirm(gca_locale.get("settings", "reset_settings_confirm")) == true) {
									gca_settings.backup.resetSettings();
									// gca_notifications.info(gca_locale.get("settings", "notification_reload"));
									document.location.href = document.location.href;
								}
							}, false);
							// Add change event
							return [data.reset];
						}
					};
					return scheme;
				})(),

				// Clear
				"clear_data" : (function(){
					var scheme = {
						"type" : "custom",
						"dom" : function(data, title, wrapper){
							// Create button
							data.clear = document.createElement("input");
							data.clear.setAttribute("type", "button");
							data.clear.className = "awesome-button";
							data.clear.style.float = "right";
							data.clear.value = gca_locale.get("settings", "clear");
							data.clear.addEventListener("click", () => {
								if (confirm(gca_locale.get("settings", "clear_data_confirm")) == true) {
									gca_settings.backup.clearAll();
									// gca_notifications.info(gca_locale.get("settings", "notification_reload"));
									document.location.href = document.location.href;
								}
							}, false);

							// Create info
							data.info = document.createElement("div");
							data.info.style.float = "right";
							data.info.style.padding = "0px 5px";
							data.info.textContent = gca_settings.backup.getStorageSize(true);

							// Add change event
							return [data.clear, data.info];
						}
					};
					return scheme;
				})(),

				// Clear
				"clear_cache_data" : (function(){
					var scheme = {
						"type" : "custom",
						"dom" : function(data, title, wrapper){
							// Create button
							data.clear = document.createElement("input");
							data.clear.setAttribute("type", "button");
							data.clear.className = "awesome-button";
							data.clear.style.float = "right";
							data.clear.value = gca_locale.get("settings", "clear");
							data.clear.addEventListener("click", () => {
								gca_settings.backup.clearCache();
								//gca_notifications.info(gca_locale.get("settings", "notification_reload"));
								document.location.href = document.location.href;
							}, false);

							// Create info
							data.info = document.createElement("div");
							data.info.style.float = "right";
							data.info.style.padding = "0px 5px";
							data.info.textContent = gca_settings.backup.getStorageSize(true, 'cache');

							// Add change event
							return [data.clear, data.info];
						}
					};
					return scheme;
				})(),

				// Sync
				// TODO: This was disabled as the chat was moved into the game
				/*
				"cross_browser_login" : (function(){
					var scheme = {
						"type" : "custom",
						"dom" : function(data, title, wrapper){
							// Create button
							data.show = document.createElement("input");
							data.show.setAttribute("type", "button");
							data.show.className = "awesome-button";
							data.show.style.float = "right";
							data.show.value = gca_locale.get("settings", "show_info");
							data.show.addEventListener("click", () => {
								gca_settings.sync.show();
							}, false);

							// Add change event
							return [data.show];
						}
					};
					return scheme;
				})(),
				*/

				// Export Error Player
				// TODO: this may be removed in the future
				/*
				"export_error_player_settings" : (function(){
					var scheme = {
						"type" : "custom",
						"dom" : function(data, title, wrapper){
							// Create button
							data.export = document.createElement("input");
							data.export.setAttribute("type", "button");
							data.export.className = "awesome-button";
							data.export.style.float = "right";
							data.export.value = gca_locale.get("settings", "export");
							data.export.addEventListener("click", () => {
								gca_settings.backup.export_player_error();
							}, false);
							// Add change event
							return [data.export];
						}
					};
					return scheme;
				})()
				*/
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
							case "string" :
								this.scheme[category][label] = this.class.string(locale, _category, _label, _db);
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
								var _dom = this.scheme[category][label].dom;
								if(!_dom) _dom = 0;
								var _save = this.scheme[category][label].save;
								if(!_save) _save = 0;
								this.scheme[category][label] = this.class.custom(
									gca_locale.get("settings", "category_" + category + "$" + label),
									_dom,
									_save,
									category,
									label,
									_db
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
							if(type.match(/\|/i))
								type = "enumerator";
							else
								type = "string";
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
							case "string" :
								this.scheme[category][label] = this.class.string(
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
								var _dom = this.scheme[category][label].dom;
								if(!_dom) _dom = 0;
								var _save = this.scheme[category][label].save;
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
				// Previous tab
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
			let content = document.getElementById("content");
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
			var logogca = document.createElement("div");
			logogca.id = "settings_logogca";
			var version = document.createElement('a');
			version.href = gca_links.get('addon-github');
			version.className = "title";
			version.style.left = "10px";	
			version.style.right = "unset";	
			version.setAttribute('target', '_blank');
			version.textContent = ' v' + gca.version;			
			logo.appendChild(version);
			content_2nd.appendChild(logo);
			content_2nd.appendChild(logogca);

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
				let a = document.createElement('a');
				a.textContent = title;
				li.appendChild(a);
				menu.appendChild(li);
				li.addEventListener('click', (function(tabname, title, that){
					return function(){
						// Get URL
						var url = gca_getPage.parameters();
						url.category = tabname;
						url.gcamod = "settings";
						delete url.sh;
						// Change URL
						window.history.pushState({category : tabname}, "GCA - Settings", gca_getPage.link(url));

						that.openTab(tabname, title);
					};
				})(category, title, this), false);
			}
		},

		activeTab : null,
		openTab : function(tabname, title){
			// Clear tab
			this.tab_div.textContent = '';

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
			// Get scheme options
			var scheme_options = {
				save_button : true
			};
			if (scheme.hasOwnProperty("__scheme")) {
				for (let option in scheme["__scheme"]) {
					if (scheme["__scheme"].hasOwnProperty(option) && scheme_options.hasOwnProperty(option)) {
						scheme_options[option] = scheme["__scheme"][option];
					}
				}
			}

			// Tab Items reset
			this.tabItems = [];

			var container = document.createElement("div");

			var title = document.createElement("div");
			title.textContent = titleText;
			title.className = "settings_tab_title";
			container.appendChild(title);

			// Create each item
			for(let id in scheme){
				this.tabItems.push(
					this.createItem(id, scheme[id], container)
				);
			}

			// Save button
			if (scheme_options.save_button) {
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
					// gca_notifications.info(gca_locale.get("settings", "notification_reload"));
					// Reload page
					document.location.href = document.location.href;
				}, false);
				container.appendChild(save);
			}

			this.tab_div.appendChild(container);
		},

		createItem : function(id, scheme, container){
			// Construct known type
			switch(scheme.type){
				case "boolean": return this.construct.boolean(id, scheme, container);
				case "integer": return this.construct.integer(id, scheme, container);
				case "string": return this.construct.string(id, scheme, container);
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

				var select = document.createElement('label');
				select.className = "switch-slide";

				item.data.checkbox = document.createElement('input');
				item.data.checkbox.type = "checkbox";
				if(scheme.value) item.data.checkbox.checked = true;
				select.appendChild(item.data.checkbox);

				var slider = document.createElement('span');
				slider.className = 'slider';
				select.appendChild(slider);

				//<span class="slider"></span>


				/*
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
				label = document.createElement('label');
				label.setAttribute('for', id + "__false");
				label.textContent = "Off";
				select.appendChild(label);

				if(scheme.value) item.data.true.checked = true;
				else item.data.false.checked = true;
				*/

				typeWrapper.appendChild(select);

				var clearBoth = document.createElement('div');
				clearBoth.style.clear = "both";
				typeWrapper.appendChild(clearBoth);

				item.save = function(){
					//var value = item.data.true.checked;
					var value = item.data.checkbox.checked;

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

			string : function(id, scheme, container){
				// Item object
				var item = {};
				item.id = id;
				item.data = {};

				// Type Wrapper
				var typeWrapper = document.createElement('div');
				typeWrapper.className = "type-wrapper type-string";
				var title = document.createElement('span');
				title.textContent = scheme.locale;
				typeWrapper.appendChild(title);
				container.appendChild(typeWrapper);

				var select = document.createElement('div');
				select.className = "switch-field";

				item.data.input = document.createElement('input');
				item.data.input.type = "text";
				item.data.input.id = id + "__string";
				item.data.input.name = id;
				item.data.input.value = scheme.value;
				select.appendChild(item.data.input);

				typeWrapper.appendChild(select);

				var clearBoth = document.createElement('div');
				clearBoth.style.clear = "both";
				typeWrapper.appendChild(clearBoth);

				item.save = function(){
					var value = item.data.input.value;
					if(scheme.data.db == "options"){
						gca_options.set(scheme.data.category, scheme.data.label, value);
					}
					else if(scheme.data.db == "section"){
						gca_data.section.set(scheme.data.category, scheme.data.label, value);
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
				preview.textContent = input_value;//Math.round((input_value / scheme.max) * 100);
				select.appendChild(preview);

				item.data.input = document.createElement('input');
				item.data.input.style.height = "12px";
				item.data.input.style.width = "80px";
				item.data.input.type = "range";
				item.data.input.id = id + "__range";
				item.data.input.name = id;
				item.data.input.setAttribute("min", scheme.min);
				item.data.input.setAttribute("step", scheme.step);
				item.data.input.setAttribute("max", scheme.max);
				item.data.input.value = input_value;
				select.appendChild(item.data.input);

				item.data.input.addEventListener('input', function(){
					preview.textContent = this.value;
				}, false);

				typeWrapper.appendChild(select);

				var clearBoth = document.createElement('div');
				clearBoth.style.clear = "both";
				typeWrapper.appendChild(clearBoth);

				item.save = function(){
					var value = item.data.input.value;
					value = parseInt(value, 10) || 0;

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
					if (custom instanceof Array) {
						for (var i = 0; i < custom.length; i++) {
							typeWrapper.appendChild(custom[i]);
						}
					} else {
						typeWrapper.appendChild(custom);
					}
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
			string : function(locale, category, label, db){
				return {
					type : "string",
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
	},

	// Backup and Restore settings
	backup : {
		// Export gca settings
		export : function() {
			// Get settings data
			let settings_data = window.localStorage.getItem(gca_data_manager.name + "_settings") || "{\"data\":{}}";
			// Get arena data
			let arena_data = window.localStorage.getItem(gca_data_manager.name + "_arena") || "{\"target-list\":{}}";
			// Get Forge Notes
			let notes_data = window.localStorage.getItem(gca_data_manager.name + "_notes") || "{\"forge_notes\":{}}";
			// Decode data to JSON
			settings_data = JSON.parse(settings_data);
			// Prepare extra info
			settings_data['extra'] = {};
			// Seve language
			let value = window.localStorage.getItem(gca_data_manager.name + "_lang") || null;
			if (value) settings_data['extra']['lang'] = value;
			// Encode data
			settings_data = JSON.stringify(settings_data);
			// Export
			this.exportToFile({
				country : gca_section.country,
				server : gca_section.server,
				playerId : gca_section.playerId
			}, {
				settings : settings_data,
				arena : arena_data,
				notes : notes_data
			}, 3);
		},

		// Export gca error player settings
		/*
		export_player_error : function() {
			// Get settings data
			let settings_data = window.localStorage.getItem(gca_data_manager.mod + "_0" + "_settings") || "{\"data\":{}}";
			// Get arena data
			let arena_data = window.localStorage.getItem(gca_data_manager.mod + "_0" + "_arena") || "{\"target-list\":{}}";

			this.exportToFile({
				country : gca_section.country,
				server : gca_section.server,
				playerId : 0
			}, {
				settings : settings_data,
				arena : arena_data
			}, 4);
		},
		*/

		// Handle data export
		exportToFile : function(info, data, version) {
			data = this.exportDataPrepare(info, data, version);
			if (!data) {
				// Set to no data
				gca_notifications.error(gca_locale.get("general", "error"));
				return false;
			}

			// Download file
			gca_notifications.success(gca_locale.get("settings", "data_exported_save_the_file"));
			this.downloadFile("settings_" + info.country + "_s" + info.server + "_" + info.playerId + ".gca", data);
		},

		exportDataPrepare : function(info, data, version, compress=false) {
			// Handle errors
			try {
				// Parse JSON data
				for (let section in data) {
					if (data.hasOwnProperty(section)) {
						data[section] = JSON.parse(data[section]);
					}
				}
			} catch (e) {
				// Failed
				return null;
			}

			// Remove settings that have the default value
			if (gca_options.defaultData) {
				for (let i in data.settings.data) {
					if (gca_options.defaultData.hasOwnProperty(i)) {
						for (let j in data.settings.data[i]) {
							if (gca_options.defaultData[i].hasOwnProperty(j)) {
								// If default value
								if (data.settings.data[i][j] === gca_options.defaultData[i][j]) {
									delete data.settings.data[i][j];
								}
							}
						}
						// If empty category
						if (Object.keys(data.settings.data[i]).length == 0) {
							delete data.settings.data[i];
						}
					}
				}
			}

			// Set data version
			data.version = version;
			data.date = Math.round((new Date().getTime() - new Date('2021-01-01').getTime())/1000);
			data.info = info;

			if (compress) {
				data = JSON.stringify(data);
			}
			else {
				data = JSON.stringify(data, null, "\t");
			}

			return data;
		},

		exportToNotes : function() {
			return new Promise((resolve, reject) => {
				// Make request to get notes
				jQuery.ajax({
					type: "GET",
					url: gca_getPage.link({'mod':'memo'}),
					success: function(content){
						// Load notes
						let notes = content.match(/<textarea id="memo"[^>]*>([^<]*)</i);
						// if Failed to Parse Notes
						if (!notes) return reject('F2PN');
						notes = notes[1];

						// Revert safe printing (probably from htmlspecialchars)
						notes = notes
							.replace(/&amp;/ig, '&')
							.replace(/&quot;/ig, '"')
							.replace(/&apos;/ig, '\'')
							.replace(/&#039;/ig, '\'')
							.replace(/&lt;/ig, '<')
							.replace(/&gt;/ig, '>');

						// Delete settings
						notes = notes.replace(/(\n+|){GCASETTINGS\|([^}]+)}/ig, '');

						// Get settings data
						let settings_data = window.localStorage.getItem(gca_data_manager.name + "_settings") || "{\"data\":{}}";
						// Get arena data
						let arena_data = window.localStorage.getItem(gca_data_manager.name + "_arena") || "{\"target-list\":{}}";
						// Get Forge Notes
						let notes_data = window.localStorage.getItem(gca_data_manager.name + "_notes") || "{\"forge_notes\":{}}";
						// Decode data to JSON
						settings_data = JSON.parse(settings_data);
						// Prepare extra info
						settings_data['extra'] = {};
						// Get language
						let value = window.localStorage.getItem(gca_data_manager.name + "_lang") || null;
						if (value) settings_data['extra']['lang'] = value;
						// Encode data
						settings_data = JSON.stringify(settings_data);
						// Prepare for export
						let sdata = gca_settings.backup.exportDataPrepare({
							country : gca_section.country,
							server : gca_section.server,
							playerId : gca_section.playerId
						}, {
							settings : settings_data,
							arena : arena_data,
							notes : notes_data
						}, 3, true);

						// if Failed to Get Settings
						if (!sdata) return reject('FGS');

						// Prepare note code
						notes += '\n\n' + '{GCASETTINGS\|' + btoa(sdata) + '}';

						// if no space available in settings
						if (notes.length > 16000) return reject('NS');

						// Make request to change notes
						jQuery.ajax({
							type: "POST",
							url: gca_getPage.link({'mod':'memo', 'submod':'save'}),
							data: {memo : notes},
							success: function(){
								return resolve();
							},
							error: function(){
								// Failed to Save Settings
								return reject('FSS');
							}
						});
					},
					error: function(){
						// Request Failed
						return reject('RF');
					}
				});
			});
		},

		// Download file
		downloadFile : function(name, text) {
			// Create file
			let file = document.createElement('a');
			file.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
			file.setAttribute('download', name);
			// Fire download
			var e = document.createEvent('MouseEvents');
			e.initEvent('click', true, false);
			file.dispatchEvent(e);
		},

		// Import gca settings
		import : function(data) {
			// Check for json errors
			try {
				// Parse json
				data = JSON.parse(data);
			}
			catch (e) {
				return "Parse error";
			}

			let settings_json = null;
			let arena_json = null;
			let notes_json = null;

			// Old version file
			if (data.hasOwnProperty('data')) {
				settings_json = data;
			}
			// Newer version
			else if (data.hasOwnProperty('version')) {
				settings_json = data.settings;
				arena_json = data.arena;
				notes_json = data.notes;
			}
			// Error
			else {
				return "Parse error";
			}

			// Check user info
			//if (data.hasOwnProperty('info')) {
			//	if (
			//		!(data.info.country == gca_section.country && data.info.server == gca_section.server && data.info.playerId == gca_section.playerId) &&
			//		confirm(gca_locale.get("settings", "load_settings_confirm", {})) == false
			//	) {
			//		return "Import aborted";
			//	}
			//}
			
			// Parse settings
			if (settings_json) {
				// If no valid structure
				if (!settings_json.hasOwnProperty("data") || typeof settings_json.data !== "object") {
					return "Data error";
				}

				// Start reading data
				let settings = {data : {}};

				// For each category
				for (let category in gca_options.data) {
					if (gca_options.data.hasOwnProperty(category)) {
						// If category exist in imported data
						if (settings_json.data.hasOwnProperty(category)) {
							settings.data[category] = {};

							// For each item in category
							for (let item in gca_options.data[category]) {
								if (gca_options.data[category].hasOwnProperty(item)) {
									
									// If item exist in imported data
									if (settings_json.data[category].hasOwnProperty(item)) {
										// Save data
										settings.data[category][item] = settings_json.data[category][item];
									}

								}
							}

						}
						
					}
				}

				// Prepare data
				let imported_data = JSON.stringify(settings);
				// Save data
				window.localStorage.setItem(gca_data_manager.name + "_settings", imported_data);

				// Load extra section
				if (settings_json.hasOwnProperty('extra')) {
					// Load lang
					if (settings_json['extra'].hasOwnProperty('lang')) {
						let value = settings_json['extra']['lang'];
						if (gca_languages.hasOwnProperty(value)) {
							window.localStorage.setItem(gca_data_manager.name + "_lang", settings_json['extra']['lang']);
						}
					}
				}
			}
			
			// Parse arena
			if (arena_json) {
				// Save arena list
				if (arena_json.hasOwnProperty('target-list')) {
					gca_data.section.set('arena', 'target-list', arena_json['target-list']);
				}
			}

			// Parse Forge notes
			if (notes_json) {
				// Save notes
				if (notes_json.hasOwnProperty('forge_notes')) {
					gca_data.section.set('notes', 'forge_notes', notes_json['forge_notes']);
				}
			}
			
			// No errors
			return false;
		},

		importFromFile : function(file, callback) {
			try {
				// Create reader
				var reader = new FileReader();
				// Listen event onloadend
				reader.onloadend = (evt) => {
					if (evt.target.readyState == FileReader.DONE) {
						// Import
						let error = this.import(evt.target.result);
						// Call the callback
						callback(error);
					}
				};
				// Start reading
				reader.readAsBinaryString(file);
			} catch (e) {
				callback("Unsupported");
			}
		},

		importFromNotes : function() {
			return new Promise((resolve, reject) => {
				jQuery.ajax({
					type: "GET",
					url: gca_getPage.link({'mod':'memo'}),
					success: function(content){
						// Load notes
						let notes = content.match(/<textarea id="memo"[^>]*>([^<]*)</i);

						// if Failed to Parse Notes
						if (!notes) return reject('F2PN');
						notes = notes[1];

						// Load settings
						let settings = notes.match(/{GCASETTINGS\|([^}]+)}/i);
						// if Not found settings
						if (!settings) return reject('NFS');
						settings = settings[1];
						
						// Decode settings
						try {
							settings = atob(settings);
						} catch (e) {
							// Failed to Decode Settings
							return reject('F2DS');
						}

						// Import settings
						let error = gca_settings.backup.import(settings);
						// if Failed to Import Settings
						if (error) return reject('F2IS');

						// Done
						resolve();
					},
					error: function(){
						// Request Failed
						return reject('RF');
					}
				});
			});
		},

		// Reset settings
		resetSettings : function() {
			// Clear all settings
			window.localStorage.removeItem(gca_data_manager.name + "_" + "settings");
		},

		// Define addon's storages
		addonStorages : ["advanced-menu", "arena", "cache", "data", "global", "guild", "lang", "market", "messages", "overview", "packages", "settings", "sound", "stats", "timers", "notes"],
		/*
		// Easy find storages
		(function(){
			var s = [];
			for (let key in localStorage) {
				let storage = key.match(/^gladiatusCrazyAddonData_\d+_(.+)$/);
				if (storage && !s.includes("'" + storage[1] + "'")) s.push("'" + storage[1] + "'"); 
			}
			s.sort();
			console.log('[' + s.join(', ') + ']');
		})();
		*/

		// Clear all data
		clearAll : function() {
			// Clear all storages
			for (let i = this.addonStorages.length - 1; i >= 0; i--) {
				window.localStorage.removeItem(gca_data_manager.name + "_" + this.addonStorages[i]);
			}
		},

		// Clear cache data
		clearCache : function() {
			// Clear cache storage
			window.localStorage.removeItem(gca_data_manager.name + "_" + "cache");
		},

		// Count size of db
		getStorageSize : function(humanReadable = false, storage = false) {
			var bytes = 0;
			// Count all storages
			if (storage) {
				let data = window.localStorage.getItem(gca_data_manager.name + "_" + storage);
				if (typeof data === "string") {
					// https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string
					bytes += encodeURI(data).split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1;
				}
			}
			else {
				for (let i = this.addonStorages.length - 1; i >= 0; i--) {
					let data = window.localStorage.getItem(gca_data_manager.name + "_" + this.addonStorages[i]);
					if (typeof data === "string") {
						// https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string
						bytes += encodeURI(data).split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1;
					}
				}
			}

			// If want bytes number
			if (!humanReadable)
				return bytes;

			// Create human readable string
			if(Math.abs(bytes) < 1024) {
				return bytes + ' B';
			}
			var units = ['kB','MB','GB','TB','PB','EB','ZB','YB'];
			var u = -1;
			do {
				bytes /= 1024;
				++u;
			} while(Math.abs(bytes) >= 1024 && u < units.length - 1);
			return bytes.toFixed(1) + '' + units[u];
		}
	},

	sync : {
		show : function() {
			this.wrapper = document.createElement('div');
			this.wrapper.textContent = 'Loading ...';
			// Create confirm modal
			var modal = new gca_tools.Modal(
				gca_locale.get('settings', 'category_data$cross_browser_login'),
				this.wrapper,
				() => {modal.destroy();},
				() => {modal.destroy();}
			);
			
			modal.button(gca_locale.get('general', 'ok'), true);
			modal.window.style.marginTop = '-225px';
			modal.body_wrapper.style.height = '200px';
			modal.show();
			this.modal = modal;
			this.loadScript();
		},

		loadScript : function() {
			if (this.scriptLoaded) {
				this.loadHash();
				return;
			}
			// Load QRcode library
			gca_tools.load.script('libraries/jquery.qrcode.min.js', () => {
				this.scriptLoaded = true;
				this.loadHash();
			}, true);
		},

		loadHash : function() {
			if (this.hash) {
				this.displayInfo();
				return;
			}
			// Load hash
			jQuery.ajax({
				method: "GET",
				url: 'main.php',
				success : (response) => {
					let match = response.match(/socket\.emit\('authenticate',\s*\{\s*session:\s*'([0-9a-f]+)',\s*id:\s*(\d+)\s*\}\);/i);
					if (!match) {
						this.wrapper.textContent = gca_locale('general', 'error');
						return;
					}
					this.hash = match[1];
					this.player = match[2];
					this.displayInfo();
				}
			});
		},

		displayInfo : function() {
			let url = 'https://s' + gca_section.server + '-' + gca_section.country + '.gladiatus.gameforge.com/game/index.php?mod=player&p=' + this.player + '&gcamod=sync&s=' + this.hash;

			this.wrapper.textContent = '';
			this.wrapper.style.textAlign = 'left';
			this.wrapper.style.height = '186px';

			let qrcode = document.createElement('div');
			qrcode.style.float = 'right';
			this.wrapper.appendChild(qrcode);

			this.wrapper.appendChild(document.createTextNode(gca_locale.get('sync', 'gladiatus_crazy_addon_dependency')));
			this.wrapper.appendChild(document.createElement('br'));
			this.wrapper.appendChild(document.createElement('br'));
			let input = document.createElement('input');
			input.value = url;
			input.style.width = '205px';
			this.wrapper.appendChild(input);
			this.wrapper.appendChild(document.createElement('br'));
			this.wrapper.appendChild(document.createElement('br'));
			this.wrapper.appendChild(document.createTextNode(gca_locale.get('sync', 'how_to_sync_info')));

			this.wrapper.appendChild(document.createElement('br'));

			jQuery(qrcode).qrcode({width: 180, height: 180, text: url});

			input.addEventListener('click', function(){
				this.select();
			}, false);
		}

	},
	
	translation_help : {
		show : function() {
			this.wrapper = document.createElement('div');
			this.wrapper.textContent = 'Loading ...';
			// Create confirm modal
			var modal = new gca_tools.Modal(
				gca_locale.get('settings', 'missing_translations'),
				this.wrapper,
				() => {modal.destroy();},
				() => {modal.destroy();}
			);
			
			modal.button(gca_locale.get('general', 'ok'), true);
			modal.window.style.marginTop = '-225px';
			modal.body_wrapper.style.height = '200px';
			modal.show();
			this.modal = modal;
			this.displayInfo();
		},

		displayInfo : function() {
			// Select language
			let l = gca_languages._active;
			let missing_translations = "/*\n\tMissing translations for "+gca_languages[l].name+" ("+l+")\n\tAdd these values in the existing file or\n\ttranslate them and send them at:\n\thttps://github.com/DinoDevs/GladiatusCrazyAddon/issues/new?template=translation.md\n*/\n";
			// create an array of the keys in the locale object
			let main_keys = Object.keys(gca_languages['en'].locale);
			// loop through the array of object keys
			for (let i = 0; i < main_keys.length; i++) {
				let keys = Object.keys(gca_languages['en'].locale[main_keys[i]]);
				
				if ( !gca_languages[l].locale[main_keys[i]] )
					missing_translations += "\n"+main_keys[i]+" : {\n\t/* ALL TRANSLATIONS IN THIS SECTION ARE MISSING, copy them from en.js */\n} ";
				else{
					let translations = "";
					for (let j = 0; j < keys.length; j++) {
						if ( !gca_languages[l].locale[main_keys[i]][keys[j]] ){
							translations += "\n\t"+keys[j]+ " : \""+gca_languages['en'].locale[main_keys[i]][keys[j]]+"\",";
						}
					}
					if ( translations != "" )
						missing_translations += "\n"+main_keys[i]+" : {"+translations.slice(0, -1)+"\n}";
				}
			}
			
			this.wrapper.textContent = '';
			this.wrapper.style.textAlign = 'left';
			this.wrapper.style.height = '186px';

			let code = document.createElement('div');
			code.style.float = 'right';
			this.wrapper.appendChild(code);

			let input = document.createElement('textarea');
			input.value = missing_translations;
			input.style.width = '100%';
			input.style.height = '94%';
			this.wrapper.appendChild(input);

			this.wrapper.appendChild(document.createElement('br'));

			input.addEventListener('click', function(){
				this.select();
			}, false);
		}

	}

};

// Onload Handler
(function(){
	let loaded = false;
	let fireLoad = function() {
		if (loaded) return;
		loaded = true;
		gca_settings.inject();
	};
	gca_settings.preinject();
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca, gca_data, gca_data_manager, gca_getPage, gca_languages, gca_links, gca_locale, gca_notifications, gca_options, gca_section, gca_tools */
/* global jQuery */
