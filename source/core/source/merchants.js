/*
 * Addon Merchants Script
 * Author: DarkThanos, GreatApo
 */

// Merchants
var gca_merchants = {
	inject : function(){
		// Check for errors
		if(!document.getElementById("content"))
			return;

		// Hide floating prices when selling/buying
		if (gca_options.bool("merchants","hide_prices"))
			document.documentElement.className += " hide_prices";
		
		// Fade non affordable items
		(gca_options.bool("merchants","fade_unaffordable_items") &&
			this.fadeUnaffordableItems.inject());
		
		// Fade items for rubies
		(gca_options.bool("merchants","ruby_icon_on_items") &&
			this.iconForItemsForRubies.inject());

		// If Item shadow
		(gca_options.bool("global","item_shadow") && 
			this.itemShadow.inject());

		// Save merchants time
		(gca_options.bool("main_menu","merchants_timer") &&
			this.save_merchants_info());

		// Fade non affordable items
		(gca_options.bool("merchants","show_shop_info") &&
			this.containerItemsInfo.prepare());

		// Double click to sell/buy items
		(gca_options.bool("merchants","double_click_actions") &&
			this.doubleClickActions.init());
		
		// Alt + Click to sell/buy items
		(gca_options.bool("merchants","alt_click_actions") &&
			this.altClickActions.init());
		
		// Merchants Search
		this.merchantsSearch.searchBox();

		// Setting Link
		gca_tools.create.settingsLink("merchants");
	},

	// Merchants Search
	merchantsSearch : {
		qualities : ['white', 'lime', '#5159f7', '#e303e0', '#FF6A00', '#FF0000'],
		emojis : ['⬜️', '🟩', '🟦', '🟪', '🟧', '🟥'],
		
		searchBox : function(){
			// Create UI
			let container = document.createElement("div");
			container.id = 'gca-item-search-small';
			container.className = "gca-merchants-search-container";
			
			let searchInput = document.createElement("input");
			searchInput.className = 'inputText gca-search-input';
			searchInput.id = 'gca-search-input';
			searchInput.type = 'text';
			searchInput.placeholder = gca_locale.get("merchants", "search_item_in_merchants");
			container.appendChild(searchInput);

			let default_quality = gca_data.section.get("cache", "merchants_search_quality", 0);
			let searchQuality = document.createElement("select");
			searchQuality.className = 'inputText gca-search-input';
			searchQuality.id = 'gca-search-input-color';
			searchQuality.style.color = this.qualities[default_quality];
			searchQuality.style.fontWeight = 'bold';
			searchQuality.style.cursor = 'pointer';
			container.appendChild(searchQuality);
			this.qualities.forEach((color) => {
				let option = document.createElement("option");
				option.textContent = this.emojis[this.qualities.indexOf(color)];
				option.style.color = color;
				option.style.fontWeight = 'bold';
				if (color === this.qualities[default_quality]) option.selected = true;
				option.value = this.qualities.indexOf(color) - 1;
				searchQuality.appendChild(option);
			});
			searchQuality.addEventListener('change', () => {
				let quality = parseInt(searchQuality.value, 10) + 1;
				searchQuality.style.color = this.qualities[quality];
				gca_data.section.set("cache", "merchants_search_quality", quality);
			}, false);
			
			let searchButton = document.createElement("input");
			searchButton.className = 'awesome-button gca-search-submit';
			searchButton.type = 'button';
			searchButton.value = '🔎';
			searchButton.onclick = "self.scrollTo(0,10000);";
			container.appendChild(searchButton);
			
			document.getElementById('mainnav').appendChild(container);
			
			searchButton.addEventListener('click', () => {
				this.searchItems(searchInput, searchQuality, searchButton);
			}, false);
		},
		
		shops : {
			loaded : 0,
			found : 0
		},
		
		searchItems : function(searchInput, searchQuality, searchButton) {
			// Load values
			let qualityValue = parseInt(searchQuality.value, 10);
			let searchValue = searchInput.value.toLowerCase().trim();
			if ((searchValue === "" && qualityValue < 2) || searchValue.match(/[<>=+-]/i))
				return;
			
			// Disable buttons
			searchInput.setAttribute('disabled', 'disabled');
			searchQuality.setAttribute('disabled', 'disabled');
			searchButton.setAttribute('disabled', 'disabled');

			// Init stats
			gca_merchants.merchantsSearch.shops.loaded = 0;
			gca_merchants.merchantsSearch.shops.found = 0;
			
			// Search all merchants
			for (let y = 1; y <= 6; y++) {
				for (let c = 0; c <= 1; c++) {
					// Post to the server
					let link = gca_getPage.link({"mod":"inventory","subsub":c,"sub":y});
					jQuery.ajax({
						url: link,
						success: function(response) {
							// Check if response dont has a shop
							if (!response.match(/class="shopTab"/i)) {
								gca_notifications.error( gca_locale.get("general", "error") );
								gca_merchants.merchantsSearch.shops.loaded++;
								return;
							}
							
							// Get dealer name and shop number
							let dealerName = response.match(/class="awesome-tabs current">([^<]+)<\/a>/i)[1].trim();
							let dealerNum = response.match(/data-container-number="(\d+)"/i)[1];
							
							// Detect Tab
							let tab = response.match(/shopTab [dynamic ]*active">([^<]+)<\/div/i);
							tab = tab ? tab[1] : "N/A";

							// Detect items
							let items = response.match(/<div style="[^"]+" class="item-i-\d+-\d+[^"]*" data-container-number="\d+"[^>]+>/img);
							if (!items) items = [];
							// Analyse items
							for (let i = 0; i < items.length; i++) {
								// Ignore char items
								if (parseInt(items[i].match(/data-container-number="(\d+)"/)[1], 10) <= 20) continue;
								// Ignore items below quality threshold
								let quality = items[i].match(/data-quality="([^"]+)"/);
								quality = quality ? parseInt(quality[1], 10) : gca_tools.item.shadow.getQuality(items[i].match(/data-tooltip="([^"]+)"/)[1].replace(/&quot;/g,'"'));
								if (quality < qualityValue) continue;
								// Get item name
								let name = decodeURIComponent(JSON.parse("\"" + items[i].match(/data-tooltip="\[\[\[&quot;([^&]*)/i)[1] + "\""));
								if (name.toLowerCase().match(searchValue)) {
									let msg = document.createElement('div');
									msg.style.overflow = 'hidden';
									let icon = document.createElement('div');
									icon.className = items[i].match(/class="(item-i-\d+-\d+)/)[1] + ' item-i-' + gca_tools.item.shadow.getColor(quality);
									icon.style.float = 'left';
									msg.appendChild(icon);
									msg.appendChild(document.createTextNode(dealerName + " [" + tab + "]:"));
									msg.appendChild(document.createElement('br'));
									msg.appendChild(document.createTextNode(name));
									gca_notifications.success(msg, link);
									gca_merchants.merchantsSearch.shops.found++;
								}
							}
							
							gca_merchants.merchantsSearch.shops.loaded++;
							
							// If all pages were searched
							if (gca_merchants.merchantsSearch.shops.loaded == 12) {
								// If nothing was found
								if (gca_merchants.merchantsSearch.shops.found == 0)
									gca_notifications.warning( gca_locale.get("merchants", "no_such_item") );
								// Enable buttons
								searchInput.removeAttribute('disabled');
								searchQuality.removeAttribute('disabled');
								searchButton.removeAttribute('disabled');
							}
						},
						error: function() {
							gca_notifications.error( gca_locale.get("general", "error") );
							gca_merchants.merchantsSearch.shops.loaded++;
						}
					});
				}
			}
		}
	},

	// Fade non affordable items
	fadeUnaffordableItems : {
		inject : function() {
			// Recheck items on item move
			gca_tools.event.request.onAjaxResponse(() => {
				this.check();
			});
			// Run for the first time
			this.check();
		},
		// Do a check
		check : function(){
			// Get gold
			var gold = parseInt(gca_tools.strings.removeDots(document.getElementById('sstat_gold_val').textContent), 10);
			// Get rubies
			var rubies = parseInt(gca_tools.strings.removeDots(document.getElementById('sstat_ruby_val').textContent), 10);
			
			// Get shop items
			var items = document.getElementById('shop').getElementsByClassName("ui-draggable");
			// For each
			var t, g, r;
			for (var i = items.length - 1; i >= 0; i--) {
				/*
				// Parse tooltip
				t = items[i].dataset.tooltip.replace(/\./g, "").replace(/\\/g, "");
				// Get item's gold
				g = t.match(/(\d+) <div class="icon_gold">/);
				g = (g) ? g[1] : 0;
				// Get item's rubies
				r = t.match(/(\d+) <div class="icon_rubies">/);
				r = (r) ? r[1] : 0;
				*/

				let info = gca_tools.item.hash(items[i]);
				g = info.price_gold
				r = info.price_rubies

				// If cannot afford
				if(g > gold || r > rubies) {
					items[i].style.opacity = 0.6;
				}
				// If can afford
				else {
					items[i].style.opacity = 1;
				}
			}
		}
	},
	
	// Fade items that cost rubies
	iconForItemsForRubies : {
		inject : function() {
			// Apply item events
			this.apply();

			// On item move
			gca_tools.event.request.onAjaxResponse((data) => {
				if (data?.data?.to?.data && data?.elem?.length === 1 && data?.elem[0]?.dataset?.hash) {
					let item = document.querySelector(`#content .ui-draggable[data-hash="${data.elem[0].dataset.hash}"]`);
					if (item) delete item.dataset.gcaFlag_rudies;
					this.apply();
				}
			});
		},
		apply : function(){
			var items = jQuery('#shop .ui-draggable');
			// For each
			items.each(function(){
				if (!this.dataset) return;
				// If already parsed
				if(this.dataset.gcaFlag_rudies) return;
				// Check if cost rubies
				let info = gca_tools.item.hash(this);
				// Flag as parsed
				this.dataset.gcaFlag_rudies = info.price_rubies;
				// If item cost rubies
				/*
				if (info.price_rubies && info.price_rubies > 0) {
					// Change bg
					//this.style.opacity = 0.6;
					this.style.backgroundColor = "rgba(149, 9, 9, 0.8)";
					//this.style.filter = "grayscale(1)";
				}
				*/
			});
		}
	},
	
	// Items Shadow Inject
	itemShadow : {
		inject : function(){
			this.dollItems();
		},

		// Add shadow to doll items
		dollItems : function(){
			// Get doll items
			var items = document.getElementById("char").getElementsByClassName("ui-draggable");

			// Add shadow to each item
			for(var i = items.length - 1; i >= 0; i--){
				gca_tools.item.shadow.add(items[i]);
			}

		}
	},

	// Save merchants information
	save_merchants_info : function(){
		// Check for errors
		if(!document.getElementById("shop") || !document.getElementById("shop_nav"))
			return;

		// Get cooldown timer
		var cooldown = document.getElementsByClassName("new_inventory_timer_text")[0].getElementsByTagName('span')[0];
		var cooldownText = document.getElementsByClassName("new_inventory_timer")[0].textContent;
		
		// Save time
		var availableIn = gca_tools.time.server() + parseInt(cooldown.dataset.tickerTimeLeft);
		
		// Update data
		gca_data.section.set("timers", 'merchants_refresh', availableIn);
		gca_data.section.set("timers", 'merchants_refresh_text', cooldownText);

		// Fire merchants info updated
		gca_tools.event.fireOnce("merchants-timer-update");
	},

	// Show information about shop's items
	containerItemsInfo : {
		prepare : function() {
			// Exit if no inventory
			if(!document.getElementById("shop")) return;

			// Create UI
			this.infoBox = document.createElement("div");
			this.infoBox.className = "gca-shop-info";

			this.infoRubies = document.createElement("span");
			this.infoBox.appendChild(this.infoRubies);
			this.infoBox.appendChild(document.createTextNode(" "));
			this.infoBox.appendChild(gca_tools.create.rubiesIcon());

			var space = document.createElement("span");
			space.style.display = 'inline-block';
			space.style.width = '8px';
			this.infoBox.appendChild(space);

			this.infoGold = document.createElement("span");
			this.infoBox.appendChild(this.infoGold);
			this.infoBox.appendChild(document.createTextNode(" "));
			this.infoBox.appendChild(gca_tools.create.goldIcon());

			document.getElementById("shop").parentNode.insertBefore(this.infoBox, document.getElementById("shop").nextSibling);

			// Show info
			this.refresh();

			// On item move
			gca_tools.event.request.onAjaxResponse((data) => {
				if (data?.data?.to?.data && data?.elem?.length === 1) {
					this.refresh(data.elem[0]);
				}
			})
		},

		refresh : function(item = {dataset:{amount:0,itemId:0,priceGold:0,tooltip:''}}) {
			// Get items
			var items = document.getElementById('shop').getElementsByClassName('ui-draggable');
			// Count gold
			let rubies = 0;
			let gold = 0;

			//23 <div class="icon_rubies">
			// For each item
			for (var i = items.length - 1; i >= 0; i--) {
				let itm = (item.dataset.itemId == items[i].dataset.itemId) ? item : items[i];
				let g = itm.dataset.amount * itm.dataset.priceGold;
				let r = itm.dataset.tooltip.replace(/\./g, '');
				r = r.match(/(\d+)\s+(?:<|&lt;)div class=\\(?:"|&quot;)icon_rubies\\(?:"|&quot;)(?:>|&gt;)/i);
				r = (r) ? parseInt(r[1], 10) : 0;

				if (!isNaN(g)) gold += g;
				if (!isNaN(r)) rubies += r;
			}

			// Display
			this.infoRubies.textContent = gca_tools.strings.insertDots(rubies);
			this.infoGold.textContent = gca_tools.strings.insertDots(gold);
		}
	},

	// Double click sell/buy
	doubleClickActions: {
	        init: function() {
	            // Apply item events
	            this.apply();
	            // Add event
	            gca_tools.event.bag.onBagOpen(() => {
	                this.apply();
	            });
	            // If bag not already loaded
	            if (document.getElementById("inv").className.match("unavailable")) {
	                // Wait first bag
	                gca_tools.event.bag.waitBag(() => {
	                    this.apply();
	                });
	            }
	            // On item move
	            gca_tools.event.request.onAjaxResponse((data) => {
	                if (data?.data?.to?.data && data?.elem?.length === 1 && data?.elem[0]?.dataset?.hash) {
	                    let item = document.querySelector(`#content .ui-draggable[data-hash="${data.elem[0].dataset.hash}"]`);
	                    if (item) delete item.dataset.gcaFlag_doubleClickEvent;
	                    this.apply();
	                }
	            });
	        },
	        apply: function() {
	            this.applyOn(jQuery('#inv .ui-draggable'));
	            this.applyOn(jQuery('#shop .ui-draggable'));
	        },
	        applyOn: function(items) {
	            var that = this;
	            // For each
	            items.each(function() {
	                if (!this.dataset) return;
	                // If already parsed
	                if (this.dataset.gcaFlag_doubleClickEvent) return;
	                // Flag as parsed
	                this.dataset.gcaFlag_doubleClickEvent = true;
	                // Check if cost rubies
	                let info = gca_tools.item.hash(this);
	                // If item cost rubies
	                if (info.price_rubies && info.price_rubies > 0) {
	                    // Add rubies event
	                    this.addEventListener('dblclick', that.handler_rubies);
	                } else {
	                    // Add event
	                    this.addEventListener('dblclick', that.handler);
	                }
	            });
	        },
	        handler: function() {
	            if (this.parentNode.id == 'inv') {
	                gca_tools.item.move(this, 'shop');
	            } else if (this.parentNode.id == 'shop') {
	                gca_tools.item.move(this, 'inv');
	            }
	        },
	        handler_rubies: function() {
	            gca_notifications.error(gca_locale.get("global", "item_worth_rubies"));
	        }
	    },
	
	    // ALT + Click items to sell/buy
	    altClickActions: {
	        init: function() {
	            // Apply item events
	            this.apply();
	            // Add event
	            gca_tools.event.bag.onBagOpen(() => {
	                this.apply();
	            });
	            // If bag not already loaded
	            if (document.getElementById("inv").className.match("unavailable")) {
	                // Wait first bag
	                gca_tools.event.bag.waitBag(() => {
	                    this.apply();
	                });
	            }
	            // On item move
	            gca_tools.event.request.onAjaxResponse((data) => {
	                if (data?.data?.to?.data && data?.elem?.length === 1 && data?.elem[0]?.dataset?.hash) {
	                    let item = document.querySelector(`#content .ui-draggable[data-hash="${data.elem[0].dataset.hash}"]`);
	                    if (item) delete item.dataset.gcaFlag_altClickEvent;
	                    this.apply();
	                }
	            });
	        },
	        apply: function() {
	            this.applyOn(jQuery('#inv .ui-draggable'));
	            this.applyOn(jQuery('#shop .ui-draggable'));
	        },
	        applyOn: function(items) {
	            var that = this;
	            // For each
	            items.each(function() {
	                if (!this.dataset) return;
	                // If already parsed
	                if (this.dataset.gcaFlag_altClickEvent) return;
	                // Flag as parsed
	                this.dataset.gcaFlag_altClickEvent = true;
	                // Check if cost rubies
	                let info = gca_tools.item.hash(this);
	                // If item cost rubies
	                if (info.price_rubies && info.price_rubies > 0) {
	                    // Add rubies event
	                    this.addEventListener('click', that.handler_rubies);
	                } else {
	                    // Add event
	                    this.addEventListener('click', that.handler);
	                }
	            });
	        },
	        handler: function(event) {
	            if (event.altKey) {
	                if (this.parentNode.id == 'inv') {
	                    gca_tools.item.move(this, 'shop');
	                } else if (this.parentNode.id == 'shop') {
	                    gca_tools.item.move(this, 'inv');
	                }
	            }
	        },
	        handler_rubies: function(event) {
	            if (event.altKey) {
	                gca_notifications.error(gca_locale.get("global", "item_worth_rubies"));
	            }
	        }
	    }
	};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_merchants.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_data, gca_locale, gca_notifications, gca_options, gca_tools */
/* global jQuery */
