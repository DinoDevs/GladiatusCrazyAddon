/*
 * Addon Packages Script
 * Author: DarkThanos, GreatApo
 */

// Packages
var gca_packages = {
	// Pre Inject code
	preinject : function(){
		// If filter is active
		if (gca_options.bool("packages", "filters_layout"))
			document.documentElement.className += " gca_packages_filters_layout";
		// If small items is active
		if (gca_options.bool("packages", "small_items_layout"))
			document.documentElement.className += " gca_packages_small_items_layout";
	},

	// Inject Code
	inject : function(){
		// Exit if not traveling
		if(!document.getElementById('submenu1')) return;

		// Set filters styling if enabled
		(gca_options.bool("packages", "filters_layout") && 
			this.layout.groupSideFilters());
		// Set Compact layout
		(gca_options.bool("packages", "compact_info_layout") && 
			this.layout.compactInfo());
		// If Item shadow
		(gca_options.bool("global","item_shadow") && 
			this.layout.itemShadow.init(this));
		// Show item's price
		(gca_options.bool("packages", "item_price") && 
			this.layout.itemPrice.init(this));
		// Set Items layout
		(gca_options.bool("packages", "items_layout") && 
			this.layout.compactPackets());
		// Pagination layout
		(gca_options.bool("global", "pagination_layout") && 
			this.layout.pagination());
		// Load more pages
		(gca_options.bool("packages", "load_more_pages") && 
			this.loadPackets.load());
		// Special category features
		(gca_options.bool("packages", "special_category_features") && 
			this.specialCategory.resolve(this));
		// Open packets with double click
		(gca_options.bool("packages", "double_click_open") && 
			this.doubleClickToOpen.init(this));
		// Enable advance packet filter
		(gca_options.bool("packages", "advance_filter") && 
			this.itemFilters.inject(this));
		
		this.eventItemsCategory();
		
		// Add icon to soul-bound items 
		this.showSoulbound();

		// Setting Link
		gca_tools.create.settingsLink("packages");
	},

	// Layout Improvements
	layout : {

		// Improve Info display
		compactInfo : function(){
			// Gold info spacing
			document.getElementById('content').getElementsByTagName('article')[0].getElementsByTagName('h2')[0].style.marginTop = "8px";
			// Paging
			if(document.getElementById('content').getElementsByClassName('paging').length)
				document.getElementById('content').getElementsByClassName('paging')[0].parentNode.style.marginTop = "-2px";
			// Options
			document.getElementById('content').getElementsByTagName('article')[0].getElementsByTagName('h2')[1].style.marginTop = "-2px";
		},

		// Improve packet layout
		compactPackets : function(){
			// Content
			document.getElementById("content").className += " gca_packages_compact_items_layout";
			// Wrapper Id
			document.getElementById("packages").parentNode.id = "packages_wrapper";
		},

		// Group filters on tabs
		groupSideFilters : function(){
			// Move bag to the right
			var bagBox = document.getElementById("inv").parentNode.parentNode;
			bagBox.className += " package_side_bag";
			bagBox.parentNode.style.padding = "0px 0px";

			// Create Side filter box
			var sideBox = document.createElement("div");
			sideBox.className = "inventoryBox package_side_filters";
			bagBox.parentNode.insertBefore(sideBox, bagBox.nextSibling);

			// Remove Centered
			sideBox.parentNode.className = "";

			// Create tabs menu
			var menu = document.createElement("div");
			menu.className = "side_menu";
			// Tabs
			var filterTab = document.createElement("div");
			filterTab.style.float = "left";
			filterTab.className = "side_tab active";
			filterTab.textContent = document.getElementById("pf").getElementsByTagName("legend")[0].textContent;
			var sortTab = document.createElement("div");
			sortTab.style.float = "right";
			sortTab.className = "side_tab";
			sortTab.textContent = document.getElementById("pa").getElementsByTagName("legend")[0].textContent;
			menu.appendChild(filterTab);
			menu.appendChild(sortTab);
			sideBox.appendChild(menu);
			// Side box container
			var container = document.createElement("div");
			container.className = "side_container";

			var filterTabContainer = document.createElement("div");
			container.appendChild(filterTabContainer);
			var sortTabContainer = document.createElement("div");
			container.appendChild(sortTabContainer);
			sortTabContainer.className = "actions_container"
			sortTabContainer.style.display = "none";

			sideBox.appendChild(container);

			// Old Settings
			var settingDiv = document.getElementById("pf").parentNode;

			// Insert action forms
			var actionForms = settingDiv.getElementsByTagName("form");
			actionForms[0].style.width = "190px";
			sortTabContainer.appendChild(actionForms[3]);
			sortTabContainer.appendChild(actionForms[2]);
			sortTabContainer.appendChild(actionForms[1]);
			filterTabContainer.appendChild(actionForms[0]);

			// Events
			filterTab.addEventListener("click", function(){
				filterTab.className = "side_tab active";
				sortTab.className = "side_tab";
				filterTabContainer.style.display = "block";
				sortTabContainer.style.display = "none";
			}, false);
			sortTab.addEventListener("click", function(){
				filterTab.className = "side_tab";
				sortTab.className = "side_tab active";
				filterTabContainer.style.display = "none";
				sortTabContainer.style.display = "block";
			}, false);

			// Hide old row
			settingDiv.previousSibling.previousSibling.style.display = "none";
			settingDiv.style.display = "none";
			settingDiv.parentNode.removeChild(settingDiv);
		},

		// Item Shadow
		itemShadow : {
			init : function(self){
				// Save instance
				var that = this;
				// Apply item shadow
				this.apply();

				// On new items reapply
				gca_tools.event.request.onAjaxResponce(function(responce){
					// If package load request
					if(responce.data.newPackages && responce.data.pagination && responce.data.worthTotal)
						that.apply();
				});
				// On packages page load
				self.loadPackets.onPageLoad(function(){
					that.apply();
				});
			},
			apply : function(){
				// For each
				jQuery("#packages .ui-draggable").each(function(){	
					// If already parsed
					if(this.dataset.gcaFlag_itemShadow)
						return;
					// Flag as parsed
					this.dataset.gcaFlag_itemShadow = true;
					// Add shadow
					gca_tools.item.shadow.add(this);
				});
			}
		},

		// Show item's price
		itemPrice : {
			init : function(self){
				// Save instance
				var that = this;
				// Apply item shadow
				this.apply();

				// On new items reapply
				gca_tools.event.request.onAjaxResponce(function(responce){
					// If package load request
					if(responce.data.newPackages && responce.data.pagination && responce.data.worthTotal)
						that.apply();
				});
				// On packages page load
				self.loadPackets.onPageLoad(function(){
					that.apply();
				});
			},
			apply : function(){
				// For each
				jQuery("#packages .ui-draggable").each(function(){
					// If no gold data
					if(!this.dataset.priceGold)
						return;
						
					// If already parsed
					if(this.dataset.gcaFlag_itemPriceShow)
						return;
					// Flag as parsed
					this.dataset.gcaFlag_itemPriceShow = true;

					// Get item's gold
					var gold = parseInt(this.dataset.priceGold, 10);
					
					// Create text
					var div = document.createElement("div");
					div.style.position = "absolute";
					div.style.color = "white";
					div.style.textAlign = "right";
					div.style.fontSize = "10px";
					div.style.overflow = "hidden";
					div.style.marginTop = "-44px";
					div.style.width = "70px";
					div.style.textShadow = "0px 0px 2px #000";
					div.textContent = gca_tools.strings.insertDots(gold);
					var icon = document.createElement("div");
					icon.className = "icon_gold";
					icon.style.transform = "scale(0.8)";
					div.appendChild(icon);
					this.parentNode.parentNode.appendChild(div);
				});
			}
		},

		// Pagination
		pagination : function(){
			// Apply pagination shadow
			this.paginationApply(document);

			gca_tools.event.request.onBeforeAjaxResponce((responce) => {
				// If package load request
				if(responce.data.newPackages && responce.data.pagination && responce.data.worthTotal){
					// Parse code
					var wrapper = document.createElement("div");
					wrapper.innerHTML = responce.data.pagination;
					// Parse pagination
					this.paginationApply(wrapper);
					// Patch code
					responce.data.pagination = wrapper.innerHTML;
				}
			});
		},
		paginationCurrent : -1,
		paginationApply : function(wrapper){
			// Page skipping
			var skipping = 1;
			if(gca_options.bool("packages", "load_more_pages")){
				skipping = gca_options.get("packages", "pages_to_load");
			}

			// Get pagings
			var pagings = wrapper.getElementsByClassName("paging");
			if(this.paginationCurrent < 0 && pagings.length){
				var page = gca_tools.pagination.getInfo(pagings[0], skipping);
				this.paginationCurrent = page.current;
			}

			var page;
			for(var i = pagings.length - 1; i >= 0; i--){
				// Pagination info
				page = gca_tools.pagination.getInfo(pagings[i], skipping);
				// Check current page
				if(this.paginationCurrent < 0 || this.paginationCurrent > page.current){
					this.paginationCurrent = page.current;
				}
				// Update current page
				else{
					page.current = this.paginationCurrent;
				}
				// Parse pagination
				gca_tools.pagination._parse(pagings[i], page, skipping);
			}
		}
	},

	// Load more packets
	loadPackets : {

		// Inject
		load : function(){
			// Get page
			var page = this.getPage();
			if(page <= 0) return;
			// Get url params
			var urlParams = this.getUrlParams();
			// Get packets pages to show
			var pages = gca_options.get("packages", "pages_to_load");
			// Patch ajax url
			this.patchAjaxUrl(pages);
			// Patch ajax responce
			this.patchAjaxResponce();
			// Load pages
			this.loadPages(page, pages, urlParams)
		},

		// Get Page
		getPage : function(){
			// Get cerrent page from paginator
			var page = document.getElementsByClassName("paging_numbers_current");
			
			// Check if other page exist
			if(page.length == 0)
				return -1;

			// Get Page number
			page = parseInt(page[0].textContent);

			// Check if valid
			if(isNaN(page))
				return -1;

			// Return
			return page;
		},

		// Get page url
		getUrlParams : function(){
			// Analyze url
			var url = gca_getPage.parameters(window.ajaxUrl);
			// Delete page number
			delete url.page;
			// Remove submod
			delete url.submod;
			// Remove sh
			delete url.sh;
			// Return url
			return url;
		},

		// Patch ajax url
		patchAjaxUrl : function(pages){
			// Analyze url
			var url = gca_getPage.parameters(window.ajaxUrl);
			// Increase page number
			url.page = parseInt(url.page) + pages - 1;
			// Remove sh
			delete url.sh;
			// Patch ajax
			window.ajaxUrl = gca_getPage.link(url, 'ajax.php');
		},

		// Patch Ajax Responce
		patchAjaxResponce : function(){
			// Save scope
			var that = this;

			// Save Items
			jQuery(".packageItem > [data-container-number]").each(function(){
				that.patchAjaxResponceItems.push( -1 * jQuery(this).data("containerNumber") );
			})

			// Before Responce
			gca_tools.event.request.onBeforeAjaxResponce(function(responce){
				// If package load request
				if(responce.data.newPackages && responce.data.pagination && responce.data.worthTotal)
					// Handle items
					that.patchAjaxResponceHandler(responce);
			});
		},

		// Handle
		patchAjaxResponceItems : [],
		patchAjaxResponceHandler : function(responce){
			// Save scope
			var that = this;

			// Remove empty boxes
			jQuery(".packageItem > [data-container-number]:not(:has(div))").each(function(){
				var index = that.patchAjaxResponceItems.indexOf(-1 * jQuery(this).data("containerNumber"));
				if(index > -1){
					that.patchAjaxResponceItems.splice(index, 1);
				}
			})

			// Add items on list
			for(var i = this.patchAjaxResponceItems.length - 1; i >= 0; i--){
				var index = responce.data.newPackages.indexOf(this.patchAjaxResponceItems[i]);
				if(index == -1){
					responce.data.newPackages.unshift( this.patchAjaxResponceItems[i] );
				}
			}

			JSON.stringify(responce.data.newPackages);
		},

		// Load more pages
		loadPages : function(page, pages, urlParams){
			// Pages to load
			this.pageLoadArray = [];

			// Create url object for each page
			var urlObj;
			for(var i=1; i<pages; i++){
				// Init url object for this page
				urlObj = {};
				// Copy url parametes
				for (param in urlParams) {
					if (urlParams.hasOwnProperty(param)) {
						urlObj[param] = urlParams[param];
					}
				}
				// Set page number
				urlObj.page = page + i;
				// Add url on the list
				this.pageLoadArray.push(urlObj);
			}

			// Load page auter page
			this.loadPage();
		},

		// Load a page
		loadPage : function(){
			// Check id end
			if(this.pageLoadArray.length == 0)
				return;

			// Get page
			var page = this.pageLoadArray.shift();

			// Save instance
			var that = this;

			// Get packets
			jQuery.get(gca_getPage.link(page), function(content){
				// Get page number
				var responce_page = content.match(/<span\s+class="paging_numbers_current">\s*(\d+)\s*<\/span>/im);
				if(responce_page) responce_page = parseInt(responce_page[1], 10);
				else responce_page = -1;

				// Validate responce page
				if(page.page != responce_page)
					return;

				// Parse items form content
				var items = content.match(/<div\s+class="packageItem">[^<]*<input\s+[^>]+>[^<]*<div[^>]+>[^<]*<\/div>[^<]*<div[^>]*>[^<]*<div[^>]*>[^<]*<\/div>[^<]*<\/div>[^<]*<div>[^<]*[^<]*<span[^>]*>[^<]*<\/span>[^<]*<\/div>[^<]*<\/div>/gim);
				if(items == null) return;
				// For each item
				for (var i=0; i<items.length; i++){
					// Insert item on page
					that.insertPacket({newPackage : items[i]});
				}

				// Fire page load event
				gca_tools.event.fire('packages_page_loaded');

				// Load next page
				that.loadPage();
			});
		},

		// Insert Packet
		// Just like the page do
		insertPacket : function(data){
			var item = jQuery(data.newPackage);
			var item_dragable = item.find(".ui-draggable");
			jQuery("#packages").append(item);
			window.DragDrop.makeDraggable(item_dragable);
			item_dragable.removeClass("ui-droppable");
			this.updatePagePriceInGold(item_dragable, +1);
			item.find("[data-container-number]").data("removeFunction",
				// Copy from other :P
				jQuery(".packageItem > [data-container-number]").data("removeFunction")
			);

			// Save Item
			this.patchAjaxResponceItems.push( -1 * item.find("[data-container-number]").data("containerNumber") );

			// If Item shadow
			//(gca_options.bool("global","item_shadow") && 
			//	gca_tools.item.shadow.add(item_dragable[0]));
		},

		// Update page price in gold
		updatePagePriceInGold : function(item, factor){
			var pagePriceInGold = jQuery("#valuePage");
			if (!item.data("priceGold") || !item.data("amount")) return;
			var cost = factor * item.data("priceGold") * item.data("amount");
			if (isNaN(cost)) return;
			var newPagePriceInGold = pagePriceInGold.data("value") + cost;
			pagePriceInGold.data("value", newPagePriceInGold).text(formatZahl(newPagePriceInGold))
		},

		// On page load event
		onPageLoad : function(callback){
			// Set a listener
			gca_tools.event.addListener('packages_page_loaded', callback);
		}
	},

	// Special Categories
	specialCategory : {
		
		// Resolve category
		resolve : function(self){
			var category = parseInt(document.getElementById("pf").f.value);
			switch(category){
				case 20:
					this.categories.scroll.load(self);
					break;
			}
		},

		// Categories
		categories : {
			
			// Scrolls Category
			scroll : {

				// Load
				load : function(self){
					// Save instance
					var that = this;

					// Get data
					this.loadData();

					// On new items reapply
					gca_tools.event.request.onAjaxResponce(function(responce){
						// If package load request
						if(responce.data.newPackages && responce.data.pagination && responce.data.worthTotal)
							that.showIsLearned();
					});

					// On packages page load
					self.loadPackets.onPageLoad(function(){
						that.showIsLearned();
					});
				},

				// Load scroll data

				loadData : function(){
					// Make request
					jQuery.ajax({
						type: "GET",
						url: gca_getPage.link({"mod":"forge"}),
						success: (result) => {
							// Get each name
							let scrolls = result.match(/<option value="\d+" (selected |)data-level="\d+" data-name="[^"]*">[^<]*<\/option>/gim);

							// If error
							if (scrolls.length < 2) {
								this.prefix = false;
								this.suffix = false;
								return;
							}

							// Parse scrolls
							let prefix = []; 
							let suffix = [];

							var i = 1;
							// Get prefixes
							while (i < scrolls.length) {
								let id = parseInt(scrolls[i].match(/ value="(\d+)"/i)[1], 10);
								i++;
								if (id == 0) break;
								prefix.push(id);
							}
							// Get suffixes
							while (i < scrolls.length) {
								let id = parseInt(scrolls[i].match(/ value="(\d+)"/i)[1], 10);
								i++;
								suffix.push(id);
							}

							// Save lists
							this.prefix = prefix;
							this.suffix = suffix;

							// Check scrolls
							this.showIsLearned();
						},
						error: function(){}
					});
				},

				// Apply 
				showIsLearned : function(){
					// If no data return
					if(!this.prefix) return;
					
					// For each item
					jQuery("#packages .ui-draggable").each((i, item) => {
						// If already parsed
						if(item.dataset.gcaFlag_isLearned) return;
						// Flag as parsed
						item.dataset.gcaFlag_isLearned = true;

						// Get hash
						let hash = gca_tools.item.hash(item);
						if (!hash) return;
						// Check if own
						let known = (this.prefix.indexOf(hash.prefix) >= 0 || this.suffix.indexOf(hash.suffix) >= 0);
						if (known) {
							item.style.filter = "drop-shadow(2px 2px 1px rgba(255,0,0,0.4)) drop-shadow( 2px -2px 1px rgba(255,0,0,0.4)) drop-shadow(-2px -2px 1px rgba(255,0,0,0.4)) drop-shadow(-2px 2px 1px rgba(255,0,0,0.4))";
							jQuery(item).data("tooltip")[0].push([gca_locale.get("packages","known_scroll"), "red"]);
						}
						else {
							item.style.filter = "drop-shadow(2px 2px 1px rgba(0,255,0,0.4)) drop-shadow( 2px -2px 1px rgba(0,255,0,0.4)) drop-shadow(-2px -2px 1px rgba(0,255,0,0.4)) drop-shadow(-2px 2px 1px rgba(0,255,0,0.4))";
							jQuery(item).data("tooltip")[0].push([gca_locale.get("packages","unknown_scroll"), "green"]);
						}
					});
				}
			}
		}
	},

	// On double click open packet
	doubleClickToOpen : {
		init : function(self){
			// Save instance
			var that = this;
			// Apply item events
			this.apply();

			// On new items reapply
			gca_tools.event.request.onAjaxResponce(function(responce){
				// If package load request
				if(responce.data.newPackages && responce.data.pagination && responce.data.worthTotal)
					that.apply();
			});
			// On packages page load
			self.loadPackets.onPageLoad(function(){
				that.apply();
			});
		},
		apply : function(){
			var that = this;
			// For each
			jQuery("#packages .ui-draggable").each(function(){
				// If already parsed
				if(this.dataset.gcaFlag_doubleClickEvent)
					return;
				// Flag as parsed
				this.dataset.gcaFlag_doubleClickEvent = true;
				// Add event
				this.addListener('dblclick', that.handler);
			});
		},
		handler : function() {
			if (this.parentNode.id == 'inv') return;
			gca_tools.item.move(this,'inv');
		}
	},
	
	eventItemsCategory : function(){
		// Fixes the missing option for items with the category 21 (presumably Event items)
		var option = document.createElement("option");
		option.setAttribute('value', 21);
		option.textContent = gca_locale.get("packages", "event_items");
		document.getElementsByName('f')[0].appendChild(option);
		
		// Select it if needed
		if (gca_getPage.parameter('f') == '21') {
			document.getElementsByName('f')[0].value = 21;
		}
	},
	
	showSoulbound : function(){
		var items = document.getElementById('packages_wrapper').getElementsByClassName('ui-draggable');
		for (let i=0; i<items.length; i++) {
			console.log(i);
			if (items[i].dataset.soulboundTo) {
				items[i].parentNode.dataset.gcaSoulbound = true;
			}
		}
	},

	itemFilters : {
		rules : {},
		comparators : {
			greater : '>',
			lesser : '<',
			equal : '='
		},

		inject : function(self) {
			var stats = gca_data.section.get('overview', 'stats_locale', false);
			if (!stats) return;

			// Create Rules
			var number = '((?:\\+|\\-|)\\d+)';
			var stat_value = ' (?:(?:\\+|\\-|)\\d+% |)\\(((?:\\+|\\-|)\\d+)\\)'; // ex. 'Χάρισμα -22% (-92)'
			var stat_percent = ' ((?:\\+|\\-|)\\d+)%'; // ex. 'Χάρισμα -22% (-92)'
			var mercenary_stat_value = ' (\\d+)';
			var mercenary = document.getElementById('pf').f.getElementsByTagName('option')[14].textContent.trim();

			this.rules.level = [stats.level, stats.level + ' (\\d+)'];
			this.rules.strength = [stats.strength, stats.strength + stat_value];
			this.rules.strength_percent = [stats.strength + '%', stats.strength + stat_percent];
			this.rules.dexterity = [stats.dexterity, stats.dexterity + stat_value];
			this.rules.dexterity_percent = [stats.dexterity + '%', stats.dexterity + stat_percent];
			this.rules.agility = [stats.agility, stats.agility + stat_value];
			this.rules.agility_percent = [stats.agility + '%', stats.agility + stat_percent];
			this.rules.constitution = [stats.constitution, stats.constitution + stat_value];
			this.rules.constitution_percent = [stats.constitution + '%', stats.constitution + stat_percent];
			this.rules.charisma = [stats.charisma, stats.charisma + stat_value];
			this.rules.charisma_percent = [stats.charisma + '%', stats.charisma + stat_percent];
			this.rules.intelligence = [stats.intelligence, stats.intelligence + stat_value];
			this.rules.intelligence_percent = [stats.intelligence + '%', stats.intelligence + stat_percent];
			this.rules.armour = [stats.armour, stats.armour + ' \\+(\\d+)'];
			this.rules.damage = [stats.damage, stats.damage + ' ((?:\\+|\\-)\\d+)'];
			this.rules.damage_min = [stats.damage + ' min', stats.damage + ' (\\d+) - \\d+'];
			this.rules.damage_max = [stats.damage + ' max', stats.damage + ' \\d+ - (\\d+)'];
			this.rules.healing = [stats.healing, stats.healing + ' ' + number];
			this.rules.threat = [stats.threat, stats.threat + ' ' + number];
			//this.RULES.life_points = stats.life_points + ': ' + number;
			
			this.rules.strength_mercenary = [mercenary + ' ' + stats.strength, stats.strength + ':' + mercenary_stat_value];
			this.rules.dexterity_mercenary = [mercenary + ' ' + stats.dexterity, stats.dexterity + ':' + mercenary_stat_value];
			this.rules.agility_mercenary = [mercenary + ' ' + stats.agility, stats.agility + ':' + mercenary_stat_value];
			this.rules.constitution_mercenary = [mercenary + ' ' + stats.constitution, stats.constitution + ':' + mercenary_stat_value];
			this.rules.charisma_mercenary = [mercenary + ' ' + stats.charisma, stats.charisma + ':' + mercenary_stat_value];
			this.rules.intelligence_mercenary = [mercenary + ' ' + stats.intelligence, stats.intelligence + ':' + mercenary_stat_value];
			
			// Create Advance Filter
			var article = document.createElement('article');
			article.className = 'package-advance-filters';
			var title = document.createElement('h2');
			title.className = 'section-header';
			title.textContent = gca_locale.get("packages", "advance_filters");
			article.appendChild(title);
			var info = document.createElement('span');
			title.appendChild(info);
			var section = document.createElement('section');
			article.appendChild(section);
			document.getElementById('content').appendChild(article);
			
			var active_rules = gca_data.section.get('packages', 'advance_filters', []);
			var active_rules_running = false;

			// Active rules
			var box_active = document.createElement('div');
			box_active.className = "active-filters";
			for (var r = 0; r < active_rules.length; r++) {
				let rule = document.createElement('div');
				rule.className = 'filter-rule';
				rule.textContent = active_rules[r][3];
				box_active.appendChild(rule);
			}
			section.appendChild(box_active);

			// Add rule box
			var div = document.createElement('div');
			div.className = 'filter-add';

			var input_rule, input_comp, input_value, btn_add;
			input_rule = document.createElement('select');
			for (let rule in this.rules) {
				if (this.rules.hasOwnProperty(rule)) {
					let option = document.createElement('option');
					option.value = rule;
					option.textContent = this.rules[rule][0];
					input_rule.appendChild(option);
				}
			}
			div.appendChild(input_rule);

			input_comp = document.createElement('select');
			for (let comp in this.comparators) {
				if (this.comparators.hasOwnProperty(comp)) {
					let option = document.createElement('option');
					option.value = comp;
					option.textContent = this.comparators[comp][0];
					input_comp.appendChild(option);
				}
			}
			div.appendChild(input_comp);

			input_value = document.createElement('input');
			div.appendChild(input_value);

			btn_add = document.createElement('button');
			btn_add.textContent = '+';
			btn_add.className = 'awesome-button';
			div.appendChild(btn_add);

			btn_add.addEventListener('click', () => {
				if (input_value.value.length == 0) return;

				let txt = this.rules[input_rule.value][0] + ' ' + this.comparators[input_comp.value] + ' ' + input_value.value;
				active_rules.push([this.rules[input_rule.value][1], this.comparators[input_comp.value], input_value.value, txt]);

				let rule = document.createElement('div');
				rule.className = 'filter-rule';
				rule.textContent = txt;
				box_active.appendChild(rule);

				input_value.value = '';
			});

			section.appendChild(div);

			var btn = document.createElement('button');
			var clear = document.createElement('button');

			clear.textContent = gca_locale.get("packages", "advance_filters_clear");
			clear.className = 'awesome-button';
			section.appendChild(clear);
			clear.addEventListener('click', () => {
				active_rules = [];
				box_active.innerHTML = '';
				let packages = document.getElementById('packages').getElementsByClassName('ui-draggable');
				for (let i = 0; i < packages.length; i++) {
					packages[i].parentNode.parentNode.style.opacity = 1;
				}
				gca_data.section.del('packages', 'advance_filters');
				active_rules_running = false;
				info.textContent = '';
			});
			
			btn.textContent = gca_locale.get("packages", "advance_filters_apply");
			btn.className = 'awesome-button';
			section.appendChild(btn);
			btn.addEventListener('click', () => {
				let items = this.applyFilter(active_rules);
				info.textContent = gca_locale.get("packages", "advance_filters_found", {items : items.length});
				gca_data.section.set('packages', 'advance_filters', active_rules);
				active_rules_running = true;
			});

			if (active_rules.length) {
				let items = this.applyFilter(active_rules);
				info.textContent = gca_locale.get("packages", "advance_filters_found", {items : items.length});
				active_rules_running = true;
			}

			// On new items reapply
			gca_tools.event.request.onAjaxResponce(() => {
				if (active_rules_running) {
					let items = this.applyFilter(active_rules);
					info.textContent = gca_locale.get("packages", "advance_filters_found", {items : items.length});
				}
			});
			// On packages page load
			self.loadPackets.onPageLoad(() => {
				if (active_rules_running) {
					let items = this.applyFilter(active_rules);
					info.textContent = gca_locale.get("packages", "advance_filters_found", {items : items.length});
				}
			});
		},

		// Apply filter rules
		applyFilter : function(rules){
			for (var r = rules.length - 1; r >= 0; r--) {
				if (rules[r][1] == '<' || rules[r][1] == '>') rules[r][2] = parseInt(rules[r][2], 10);
			}

			var packages = document.getElementById('packages').getElementsByClassName('ui-draggable');
			var items = [];
			for (var i = 0; i < packages.length; i++) {
				if (this.testItemRules(packages[i], rules)) {
					items.push(packages[i]);
					//packages[i].parentNode.parentNode.style.display = 'block';
					packages[i].parentNode.parentNode.style.opacity = 1;
				}
				else {
					//packages[i].parentNode.parentNode.style.display = 'none';
					packages[i].parentNode.parentNode.style.opacity = 0.5;
				}
			}
			return items;
		},
		testItemRules : function(item, rules) {
			var r, t;
			for (var i = 0; i < rules.length; i++) {
				t = JSON.stringify(JSON.parse(item.dataset.tooltip));
				r = t.match(new RegExp(rules[i][0], 'i'));
				if (!this.testItemRule(r, rules[i])) {
					return false;
				}
			}

			return true;
		},
		testItemRule : function(match, rule) {
			if (!match) return false;

			switch(rule[1]) {
				case '>':
					if (match[1] > rule[2]) return true;
					else return false;
				case '<':
					if (match[1] < rule[2]) return true;
					else return false;
				case '=':
					if (match[1] == rule[2]) return true;
					else return false;
			}

			return false;
		}
	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_packages.inject();
	};
	gca_packages.preinject();
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_data, gca_getPage, gca_locale, gca_options, gca_tools */
/* global jQuery */
