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
		// If packages shortcuts are active
		if (gca_options.bool("packages", "packages_shortcuts"))
			document.documentElement.className += " packages_shortcuts";
	},

	// Inject Code
	inject : function(){
		// Exit if not traveling
		if(!document.getElementById('submenu1')) return;

		this.resolve();

		// Set filters styling if enabled
		(gca_options.bool("packages", "filters_layout") && 
			this.layout.groupSideFilters());

		// If Item shadow (also soul-bound icon)
		(gca_options.bool("global","item_shadow") && 
			this.layout.itemShadow.init(this));
		// Show item's price
		(gca_options.bool("packages", "item_price") && 
			this.layout.itemPrice.init(this));

		// Package view
		if(gca_options.get("packages", "items_layout") > 0 ){
			// Set remove some useless spacing
			this.layout.compactInfo();
			if(gca_options.get("packages", "items_layout") == 1){
				// Compact items view
				this.layout.compactPackets();
			}else{
				// Packages as list view
				this.layout.listView.init(this);
			}
		}
		// Pagination layout
		(gca_options.bool("global", "pagination_layout") && 
			this.layout.pagination());
		// Load more pages
		(gca_options.bool("packages", "load_more_pages") && 
			this.loadPackets.load(this));
		// Special category features
		(gca_options.get("packages", "special_category_features") != 2 &&
			this.specialCategory.resolve(this));
		// Open packets with double click
		(gca_options.bool("packages", "double_click_open") && 
			this.doubleClickToOpen.init(this));
		// Enable advance packet filter
		(gca_options.bool("packages", "advance_filter") && 
			this.itemFilters.inject(this));
		// Set Compact layout
		(gca_options.bool("packages", "pop_over_bag") && 
			this.layout.popOverBag.inject());
		
		// Add new category selection "Event items"
		this.eventItemsCategory();

		// Category shortcuts
		(gca_options.bool("packages", "packages_shortcuts") && 
			this.packagesShortcuts.inject());

		// Setting Link
		gca_tools.create.settingsLink("packages");
	},

	info : {
		page_last : 1,
		page_current : 1
	},

	resolve : function() {
		let tmp;
		tmp = document.getElementsByClassName('paging_numbers_current');
		if (!tmp.length) return;
		
		this.info.page_current = parseInt(tmp[0].textContent, 10);
		this.info.page_last = this.info.page_current;

		tmp = document.getElementsByClassName('paging_right_full');
		if (tmp.length) {
			tmp = tmp[0].href.match(/(?:&|&amp;)page=(\d+)$/);
			this.info.page_last = tmp ? parseInt(tmp[1], 10) : this.info.page_current;
		}
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
			var filterTab = document.createElement("a");
			filterTab.style.float = "left";
			filterTab.className = "side_tab active";
			filterTab.textContent = document.getElementById("pf").getElementsByTagName("legend")[0].textContent;
			var sortTab = document.createElement("a");
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
				// Apply item shadow
				this.apply();

				// On new items reapply
				self.onNewItemsLoad(() => {
					this.apply();
				});
				// On packages page load
				self.loadPackets.onPageLoad(() => {
					this.apply();
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
					// Add icon to soul-bound items 
					gca_packages.showSoulbound.addIcon(this);
				});
			}
		},

		// Show item's price
		itemPrice : {
			init : function(self){
				// Apply item shadow
				this.apply();

				// On new items reapply
				self.onNewItemsLoad(() => {
					this.apply();
				});
				// On packages page load
				self.loadPackets.onPageLoad(() => {
					this.apply();
				});

				// Dont allow section to close
				document.getElementById('packages').parentNode.className = 'packages-section';
			},
			apply : function(){
				// For each
				jQuery('#packages .ui-draggable').each(function(){
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
					var amount = parseInt(this.dataset.amount, 10);
					
					// Create text
					var div = document.createElement('div');
					div.className = 'gca_item_price_info';
					div.textContent = gca_tools.strings.insertDots(gold * amount);
					var icon = document.createElement('div');
					icon.className = 'icon_gold';
					div.appendChild(icon);
					this.parentNode.parentNode.appendChild(div);
				});
			}
		},

		listView : {
			init : function(self){
				this.apply();
				// On new items reapply
				self.onNewItemsLoad(() => {
					this.apply();
				});
				// On packages page load
				self.loadPackets.onPageLoad(() => {
					this.apply();
				});

				// Dont allow section to close
				document.getElementById('packages').parentNode.className = 'packages-section';
			},
			apply : function(){
				//console.log('applying')
				let index = 0
				jQuery('#packages .ui-draggable').each(function(){
					var packageContainerElement = this.parentNode.parentNode;
					var packageContainerChildren = packageContainerElement.children;

					// do nothing if item has already been rearranged
					if (packageContainerChildren.length === 3) {
						//console.log('do nothing');
						return;
					}

					if (index++ === 0){
						jQuery(packageContainerElement.parentNode).addClass('list-view');
					}

					// Get item's name
					var itemName = JSON.parse(this.dataset.tooltip)[0][0][0];
					var itemLevel = this.dataset.level;
					var itemColor = JSON.parse(this.dataset.tooltip)[0][0][1].split(';')[0].replace('lime', 'green');

					// arrange layout
					var packageOrigin = packageContainerChildren[1];
					var packageImageContainer = packageContainerChildren[2];
					var packageExpiration = packageContainerChildren[3];
					var packagePriceInfo = packageContainerChildren[4];

					jQuery(packageImageContainer).addClass(`size_y_${this.dataset.measurementY}`);

					jQuery(packageOrigin).remove();
					jQuery(packageExpiration).remove();
					jQuery(packagePriceInfo).remove();
					jQuery(packageContainerElement)
						.addClass(`size_y_${this.dataset.measurementY}`)
						.append('<div class="packageItemInfoColumn"></div>');
					jQuery(packageContainerElement.children[2])
						.append('<div class="leftPackageItemInfo"></div>')
						.append('<div class="rightPackageItemInfo"></div>');
					jQuery(packageContainerElement.children[2].children[0])
						.append(packageOrigin)
						.append(`<span style="color: ${itemColor}">${itemName}</span>`);
					jQuery(packageContainerElement.children[2].children[1])
						.append(`<span>Level ${itemLevel}</span>`)
						.append(packagePriceInfo)
						.append(packageExpiration);
				});
				//console.log('after', jQuery('#packages .ui-draggable').length);
			}
		},

		// Pagination
		pagination : function(){
			// Apply pagination shadow
			this.paginationApply(document);

			gca_tools.event.request.onBeforeAjaxResponse((response) => {
				// If package load request
				if(response.data.newPackages && response.data.pagination && response.data.worthTotal){
					// Parse code
					var wrapper = document.createElement("div");
					wrapper.innerHTML = response.data.pagination;
					// Parse pagination
					this.paginationApply(wrapper);
					// Patch code
					response.data.pagination = wrapper.innerHTML;
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

			for(let i = pagings.length - 1; i >= 0; i--){
				// Pagination info
				let page = gca_tools.pagination.getInfo(pagings[i], skipping);
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
		},

		// Implement a fix back on top
		popOverBag : {
			// Inject listener
			inject : function(){
				// Get bag wrapper element
				this.wrapper = document.getElementById('inv').parentNode.parentNode;
				this.handleDrag();

				// Attack a scroll event
				window.addEventListener('scroll', () => {
					this.onScroll();
				}, false);
				// Fire scroll event
				this.onScroll();
			},
			

			// On Page Scroll
			onScroll : function(){
				// Get scroll offset
				var vscroll = parseInt((document.all ? document.scrollTop : window.pageYOffset), 10);
				// For each element to be moved on the bar
				if (vscroll > 465) {
					if (!this.wrapper.classList.contains('gca-bag-pop-over')) {
						// Calculate view port
						let screenW = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
						let screenH = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
						// Get positions
						let posX = gca_data.section.get("cache", "bagPopOverX", Math.min(764 + ((screenW - 764) / 2) - 15, screenW - 256));
						let posY = gca_data.section.get("cache", "bagPopOverY", 18);
						// Set positions
						this.wrapper.style.top = Math.min(Math.max(posY, 18), screenH - 190) + 'px';
						this.wrapper.style.left = Math.min(Math.max(posX, 25), screenW - 256) + 'px';
						this.wrapper.classList.add('gca-bag-pop-over');
					}
				}
				else {
					this.wrapper.classList.remove('gca-bag-pop-over');
				}
			},

			// Handle drag
			handleDrag : function() {
				// Implement element drag
				this.drag = document.createElement('div');
				this.drag.className = 'gca-bag-pop-over-move-btn';

				let bagPos = {x: 0, y: 0};
				let startPos = {x : 0, y: 0};
				let deltaPos = {x : 0, y: 0};
				
				let mousedown = (e) => {
					e.preventDefault();
					// get the mouse cursor position at startup:
					startPos.x = e.clientX;
					startPos.y = e.clientY;
					bagPos.x = parseInt(this.wrapper.style.left, 10);
					bagPos.y = parseInt(this.wrapper.style.top, 10);
					document.addEventListener('mouseup', mouseup);
					document.addEventListener('mousemove', mousemove);
				}

				let mousemove = (e) => {
					e = e || window.event;
					e.preventDefault();
					// calculate the new cursor position:
					deltaPos.x = startPos.x - e.clientX;
					deltaPos.y = startPos.y - e.clientY;
					startPos.x = e.clientX;
					startPos.y = e.clientY;
					// set the element's new position:
					bagPos.x -= deltaPos.x;
					bagPos.y -= deltaPos.y;
					this.wrapper.style.left = bagPos.x + 'px';
					this.wrapper.style.top = bagPos.y + 'px';
				}

				let mouseup = () => {
					document.removeEventListener('mouseup', mouseup);
					document.removeEventListener('mousemove', mousemove);
					gca_data.section.set("cache", "bagPopOverX", bagPos.x);
					gca_data.section.set("cache", "bagPopOverY", bagPos.y);
				}

				this.drag.addEventListener('mousedown', mousedown);
				document.getElementById('inv').parentNode.appendChild(this.drag);
			}
		},
	},
	
	// Add category shortcuts
	packagesShortcuts : {
		inject : function(){
			// Get the right section
			let main = document.getElementById('mainnav').getElementsByTagName('table')[0].getElementsByTagName('td')[0];
			let pageParams = gca_getPage.parameters();

			// Create new menu items
			let items = [
				this.createLink("🗡️", {mod: 'packages', f: '1'}, pageParams),
				this.createLink("🛡️", {mod: 'packages', f: '2'}, pageParams),
				this.createLink("🧥", {mod: 'packages', f: '3'}, pageParams),
				this.createLink("⛑️", {mod: 'packages', f: '4'}, pageParams),
				this.createLink("🧤", {mod: 'packages', f: '5'}, pageParams),
				this.createLink("🥾", {mod: 'packages', f: '8'}, pageParams),
				this.createLink("💍", {mod: 'packages', f: '6'}, pageParams),
				this.createLink("💎", {mod: 'packages', f: '9'}, pageParams),
				this.createLink("🍏", {mod: 'packages', f: '7'}, pageParams),
				this.createLink("🧪", {mod: 'packages', f: '11'}, pageParams),
				this.createLink("⚙️", {mod: 'packages', f: '12'}, pageParams),
				this.createLink("📃", {mod: 'packages', f: '13'}, pageParams),
				this.createLink("💰", {mod: 'packages', f: '14'}, pageParams),
				this.createLink("🤺", {mod: 'packages', f: '15'}, pageParams),
				this.createLink("🧱", {mod: 'packages', f: '18'}, pageParams),
				this.createLink("🔨", {mod: 'packages', f: '19'}, pageParams),
				this.createLink("📜", {mod: 'packages', f: '20'}, pageParams),
				this.createLink("🐇", {mod: 'packages', f: '21'}, pageParams),
				this.createLink("🟣", {mod: 'packages', f: '0', fq: '2'}, pageParams),
				this.createLink("🟠", {mod: 'packages', f: '0', fq: '3'}, pageParams),
				this.createLink("🔴", {mod: 'packages', f: '0', fq: '4'}, pageParams),
			];

			// Append everything
			items.forEach(item => {
				main.appendChild(item);
			});
		},

		createLink : function(text, linkParams, pageParams) {
			let a = document.createElement("a");
			a.className = "awesome-tabs" + (Object.keys(linkParams).every(param => linkParams[param] == pageParams[param]) ? " current" : "");
			a.textContent = text;
			a.href = gca_getPage.link(linkParams);
			let title = '';
			if (linkParams.hasOwnProperty('f')) {
				let name = document.querySelector('select[name="f"] option[value="' + linkParams.f + '"]');
				title += name ? name.textContent + ' ' : '';
			}
			if (linkParams.hasOwnProperty('fq')) {
				let name = document.querySelector('select[name="fq"] option[value="' + linkParams.fq + '"]');
				title += name ? name.textContent + ' ' : '';
			}
			if (title.length > 1) {
				a.title = title.replace(/(^\s+|\s+$)/g, '');
			} 
			return a;
		}
	},

	// Load more packets
	loadPackets : {

		// Inject
		load : function(self){
			// Get page
			var page = this.getPage();
			if(page <= 0) return;
			// Get url params
			var urlParams = this.getUrlParams();
			// Get packets pages to show
			var pages = gca_options.get("packages", "pages_to_load");
			// Patch ajax url
			this.patchAjaxUrl(pages);
			// Patch ajax response
			this.patchAjaxResponse();
			// Load pages
			this.loadPages(page, pages, urlParams, self.info);
		},

		// Get Page
		getPage : function(){
			// Get current page from paginator
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

		// Patch Ajax Response
		patchAjaxResponse : function(){
			// Save Items
			jQuery(".packageItem > [data-container-number]").each((i, item) => {
				this.patchAjaxResponseItems.push(-1 * jQuery(item).data("containerNumber"));
			});

			// Before Response
			gca_tools.event.request.onBeforeAjaxResponse((response) => {
				// If package load request
				if (response.data.hasOwnProperty('newPackages') && response.data.hasOwnProperty('pagination') && response.data.hasOwnProperty('worthTotal'))
					// Handle items
					this.patchAjaxResponseHandler(response);
			});
		},

		// Handle
		patchAjaxResponseItems : [],
		patchAjaxResponseHandler : function(response){
			// Remove empty boxes
			jQuery(".packageItem > [data-container-number]:not(:has(div))").each((i, item) => {
				let index = this.patchAjaxResponseItems.indexOf(-1 * jQuery(item).data("containerNumber"));
				if (index > -1)
					this.patchAjaxResponseItems.splice(index, 1);
			})

			// Add items on list
			for (let i = this.patchAjaxResponseItems.length - 1; i >= 0; i--) {
				let index = response.data.newPackages.indexOf(this.patchAjaxResponseItems[i]);
				if (index == -1)
					response.data.newPackages.unshift(this.patchAjaxResponseItems[i]);
			}
		},

		// Load more pages
		loadPages : function(page, pages, urlParams, info){
			// Pages to load
			this.pageLoadArray = [];

			// Create url object for each page
			for (let i = 1; i < pages && page + i <= info.page_last; i++) {
				// Init url object for this page
				let urlObj = {};
				// Copy url parametes
				for (let param in urlParams) {
					if (urlParams.hasOwnProperty(param)) {
						urlObj[param] = urlParams[param];
					}
				}
				// Set page number
				urlObj.page = page + i;
				// Add url on the list
				this.pageLoadArray.push(urlObj);
			}

			// Create place holders for each page
			let wrapper = document.getElementById('packages');
			for (let i = 0; i < this.pageLoadArray.length; i++) {
				let page_number = this.pageLoadArray[i].page;
				let page_spot = document.createElement('div');
				page_spot.id = 'gca-page-spot-' + page_number;
				wrapper.appendChild(page_spot);
				for (let j = 0; j < 15; j++) {
					// packageItem
					let ghost = document.createElement('div');
					ghost.className = 'packageItem gca-ghost-page-' + page_number;
					let loading = document.createElement('div');
					loading.className = 'loading';
					loading.style.height = '100%';
					loading.style.width = '100%';
					loading.style.backgroundPosition = 'center center';
					ghost.appendChild(loading);
					wrapper.appendChild(ghost);
				}
			}

			// Load pages in parallel (max 4 workers)
			for (var i = 1; i < pages && i <= 4; i++) {
				this.loadPage();
			}
		},

		// Load a page
		loadPage : function(){
			// Check id end
			if(this.pageLoadArray.length == 0)
				return;

			// Get page
			let page = this.pageLoadArray.shift();

			// Get packets
			jQuery.get(gca_getPage.link(page), (content) => {
				// Get page number
				let response_page = content.match(/<span\s+class="paging_numbers_current">\s*(\d+)\s*<\/span>/im);
				if(response_page) response_page = parseInt(response_page[1], 10);
				else response_page = -1;

				// Validate response page
				if(page.page != response_page) {
					this.removeGhosts(page.page);
					return;
				}

				// Parse items form content
				let items = content.match(/<div\s+class="packageItem">[^<]*<input\s+[^>]+>[^<]*<div[^>]+>[^<]*<\/div>[^<]*<div[^>]*>[^<]*<div[^>]*>[^<]*<\/div>[^<]*<\/div>[^<]*<div>[^<]*[^<]*<span[^>]*>[^<]*<\/span>[^<]*<\/div>[^<]*<\/div>/gim);
				if(items == null) return;
				// For each item
				for (let i = 0; i < items.length; i++) {
					// Insert item on page
					this.insertPacket({
						page : page.page,
						newPackage : items[i]
					});
				}
				this.removeGhosts(page.page);

				// Fire page load event
				gca_tools.event.fire('packages_page_loaded');

				// Load next page
				this.loadPage();
			});
		},

		removeGhosts : function(page) {
			// Remove ghosts
			let ghosts = document.getElementsByClassName('gca-ghost-page-' + page);
			for (let i = ghosts.length - 1; i >= 0; i--) {
				ghosts[i].parentNode.removeChild(ghosts[i]);
			}
		},

		// Insert Packet
		// Just like the page do
		insertPacket : function(data){
			let item = jQuery(data.newPackage);
			let item_dragable = item.find(".ui-draggable");
			//jQuery("#packages").append(item);
			jQuery(item).insertBefore("#gca-page-spot-" + data.page);
			window.DragDrop.makeDraggable(item_dragable);
			item_dragable.removeClass("ui-droppable");
			this.updatePagePriceInGold(item_dragable, +1);
			item.find("[data-container-number]").data("removeFunction",
				// Copy from other :P
				jQuery(".packageItem > [data-container-number]").data("removeFunction")
			);

			// Save Item
			this.patchAjaxResponseItems.push( -1 * item.find("[data-container-number]").data("containerNumber") );

			// If Item shadow
			//(gca_options.bool("global","item_shadow") && 
			//	gca_tools.item.shadow.add(item_dragable[0]));
		},

		// Update page price in gold
		updatePagePriceInGold : function(item, factor){
			let pagePriceInGold = jQuery("#valuePage");
			if (!item.data("priceGold") || !item.data("amount")) return;
			let cost = factor * item.data("priceGold") * item.data("amount");
			if (isNaN(cost)) return;
			let newPagePriceInGold = pagePriceInGold.data("value") + cost;
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
			let category = parseInt(document.getElementById("pf").f.value);
			switch(category){
				case 0: // All
					if(gca_options.get("packages", "special_category_features") == 1)
						this.scrollFeatures.load(self)
					break;
				case 1: // Weapons
				case 2: // Shields
				case 3: // Chest
				case 4: // Helmet
				case 5: // Gloves
				case 6: // Rings
				case 8:	// Shoes
				case 9: // Amulets
					this.scrollFeatures.load(self)
					break;
				case 20: // Scrolls
					this.scrollFeatures.load(self)
					break;
			}
		},

		// Categories
		categories : {
			// No features
		},
		
		// Scroll features
		scrollFeatures : {
			// Load
			load : function(self){
				// Get data
				this.loadData();

				// On new items reapply
				self.onNewItemsLoad(() => {
					this.showIsScrollLearned();
					this.showProposeToForgeIcon();
				});

				// On packages page load
				self.loadPackets.onPageLoad(() => {
					this.showIsScrollLearned();
					this.showProposeToForgeIcon();
				});
			},

			// Load scroll data
			loadData : function(){
				gca_tools.ajax.cached.known_scrolls().then(
					(result) => {
						// Save lists
						this.prefix = result.id.prefix;
						this.suffix = result.id.suffix;

						// Check scrolls
						this.showIsScrollLearned();
						this.showProposeToForgeIcon();
					},
					() => {
						// On error
						//setTimeout(() => {
						//	this.loadData();
						//}, 10 * 1000);
					}
				);
			},

			// Show if scroll is Learned
			showIsScrollLearned : function(){
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
					
					// Check if item is a scroll
					if (hash.category!=20) return;
					
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
			},
			
			// Show unknown scroll icon on item - propose to forge
			showProposeToForgeIcon : function(){
				// If no data return
				if(!this.prefix) return;
				
				// For each item
				jQuery("#packages .ui-draggable").each((i, item) => {
					// If already parsed
					if(item.dataset.gcaFlag_isForge) return;
					// Flag as parsed
					item.dataset.gcaFlag_isForge = true;

					// Get hash
					let hash = gca_tools.item.hash(item);
					if (!hash) return;
					
					// Check if forge-able item
					if ( !(hash.category>=1 && hash.category<=9 && hash.category!=7 ) ) return;
					
					// Check if own
					let known_prefix = ( this.prefix.indexOf(hash.prefix) >= 0 );
					let known_suffix = ( this.suffix.indexOf(hash.suffix) >= 0 );
					if ( !(known_prefix && known_suffix) ){
						// Both unknown
						if( !known_prefix && !known_suffix )
							item.parentNode.dataset.gcaForgeProposal = 2;
						// One unknown
						else
							item.parentNode.dataset.gcaForgeProposal = 1;
					}
				});
			}
		}
	},


	// On double click open packet
	doubleClickToOpen : {
		init : function(self){
			// Apply item events
			this.apply();

			// On new items reapply
			self.onNewItemsLoad(() => {
				this.apply();
			});
			// On packages page load
			self.loadPackets.onPageLoad(() => {
				this.apply();
			});
		},
		apply : function(){
			// For each
			jQuery("#packages .ui-draggable").each((i, item) => {
				// If already parsed
				if(item.dataset.gcaFlag_doubleClickEvent)
					return;
				// Flag as parsed
				item.dataset.gcaFlag_doubleClickEvent = true;
				// Add event
				item.addListener('dblclick', this.handler);
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
	
	showSoulbound : {
		init : function(){
			var items = document.getElementById("packages").getElementsByClassName('ui-draggable');
			for (let i = 0; i < items.length; i++) {
				this.addIcon(items[i]);
			}
		},
		addIcon : function(that){
			if (that.dataset.soulboundTo)
				that.parentNode.dataset.gcaSoulbound = true;
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
			
			// Exceptions
			// Lithuanian : https://github.com/DinoDevs/GladiatusCrazyAddon/issues/135
			if (gca_section.country === 'lt') {
				stats.healing = 'Gydymas';
				stats.threat = 'Grėsmė';
			}

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
			//this.rules.life_points = stats.life_points + ': ' + number;
			
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
			section.style.display = 'block';
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

			btn_add = document.createElement('input');
			btn_add.value = '+';
			btn_add.className = 'awesome-button';
			btn_add.setAttribute('type', 'button');
			btn_add.style.width = '56px';
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

			var btn = document.createElement('input');
			var clear = document.createElement('input');

			clear.value = gca_locale.get("packages", "advance_filters_clear");
			clear.className = 'awesome-button';
			clear.setAttribute('type', 'button');
			section.appendChild(clear);
			clear.addEventListener('click', () => {
				active_rules = [];
				box_active.textContent = '';
				let packages = document.getElementById('packages').getElementsByClassName('ui-draggable');
				for (let i = 0; i < packages.length; i++) {
					packages[i].parentNode.parentNode.style.opacity = 1;
				}
				gca_data.section.del('packages', 'advance_filters');
				active_rules_running = false;
				info.textContent = '';
			});
			
			btn.value = gca_locale.get("packages", "advance_filters_apply");
			btn.className = 'awesome-button';
			btn.setAttribute('type', 'button');
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
			self.onNewItemsLoad(() => {
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
	},

	// Add event listener for new items load through ajax
	onNewItemsLoad : function(callback) {
		// On new items reapply
		gca_tools.event.request.onAjaxResponse((response) => {
			// If package load response
			if (response.data.hasOwnProperty('newPackages') && gca_getPage.parameter('mod', response.url) == 'packages')
				callback(response);
		});
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
