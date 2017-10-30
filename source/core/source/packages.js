/*
 * Addon Packages Script
 * Author: DarkThanos, GreatApo
 */

// Packages
var gca_packages = {
	// Pre Inject code
	preinject : function(){
		// Check if filter style is active
		if(gca_options.bool("packages", "filters_layout"))
			// Add class tag
			document.documentElement.className += " gca_packages_filters_layout";
	},

	// Inject Code
	inject : function(){
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
		
		this.eventItemsCategory();
	},

	// Layout Improvements
	layout : {

		// Improve Info dipslay
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
			bagBox.style.float = "right";
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

			gca_tools.event.request.onBeforeAjaxResponce(function(responce){
				// If package load request
				if(responce.data.newPackages && responce.data.pagination && responce.data.worthTotal){
					// Parse code
					var wrapper = document.createElement("div");
					wrapper.innerHTML = responce.data.pagination;
					// Parse pagination
					gca_packages.layout.paginationApply(wrapper);
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
			// Save instance
			var that = this;

			var item = jQuery(data.newPackage);
			var item_dragable = item.find(".ui-draggable");
			jQuery("#packages").append(item);
			DragDrop.makeDraggable(item_dragable);
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
			var cost = factor * item.data("priceGold") * item.data("amount");
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
					// Save instance
					var that = this;

					// Make request
					jQuery.ajax({
						type: "GET",
						url: gca_getPage.link({"mod":"forge"}),
						success: function(result){
							// Get each name
							var scrollNamesCode = result.match(/<option value="\d+" data-level="\d+" data-name="[^"]+">/gim);
							// Parse names
							var list = [];
							for(var i = scrollNamesCode.length - 1; i >= 0; i--){
								// Add on the list
								list.unshift(scrollNamesCode[i].match(/data-name="([^"]+)">/i)[1]);
							}

							// Same list
							that.name = list;
							// Save regexp code
							that.nameRegexp = "(" + list.join("|") + ")";
							// Check scrolls
							that.showIsLearned();
						},
						error: function(){}
					});
				},

				// Apply 
				showIsLearned : function(){
					// If no data return
					if(!this.name)
						return;

					// Save instance
					var that = this;
					
					// For each item
					jQuery("#packages .ui-draggable").each(function(){
						// If already parsed
						if(this.dataset.gcaFlag_isLearned)
							return;
						// Flag as parsed
						this.dataset.gcaFlag_isLearned = true;
						
						// Get item
						let item = jQuery(this);
						// Check if own
						let own = item.data("tooltip")[0][0][0].match(new RegExp(that.nameRegexp,'i'));
						if(own){
							this.style.filter = "drop-shadow(2px 2px 1px rgba(255,0,0,0.4)) drop-shadow( 2px -2px 1px rgba(255,0,0,0.4)) drop-shadow(-2px -2px 1px rgba(255,0,0,0.4)) drop-shadow(-2px 2px 1px rgba(255,0,0,0.4))";
							item.data("tooltip")[0].push(["You know this scroll", "red"]); // TODO : translation needed
						}
						else{
							this.style.filter = "drop-shadow(2px 2px 1px rgba(0,255,0,0.4)) drop-shadow( 2px -2px 1px rgba(0,255,0,0.4)) drop-shadow(-2px -2px 1px rgba(0,255,0,0.4)) drop-shadow(-2px 2px 1px rgba(0,255,0,0.4))";
							item.data("tooltip")[0].push(["You don't know this scroll", "green"]); // TODO : translation needed
						}
					});
				}
			}
		}


	},
	
	eventItemsCategory : function(){
		// Code based on:	https://github.com/Sheldan/GladiatusScripts/blob/master/gladi_fixes.tamper.js
		// Author:			Sheldan

		// Fixes the missing option for items with the category 21 (presumably Event items)
		var option = document.createElement("option");
		option.setAttribute('value', 21);
		option.textContent = 'Event items';
		document.getElementsByName('f')[0].appendChild(option);
		
		// Gladiatus doesn't autoselect options which are not there server side
		var isFiltered = function() {
			if (document.location.href.indexOf('f=') != -1){
				return ( parseInt(document.location.href.match(/f=(\d+)/)[1]) == 21 );
			}
			return false;
		}
		if (isFiltered()){document.getElementsByName('f')[0].value = 21;}
	}

};

(function(){
	// Pre Inject
	gca_packages.preinject();
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		
		// While not traveling
		if(document.getElementById('submenu1') !== null)
			gca_packages.inject();
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
