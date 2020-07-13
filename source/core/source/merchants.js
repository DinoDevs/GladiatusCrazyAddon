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
		
		// Fade non affordable items
		(gca_options.bool("merchants","fade_unaffordable_items") &&
			this.fadeUnaffordableItems.inject());

		// If Item shadow
		(gca_options.bool("global","item_shadow") && 
			this.itemShadow.inject());

		// Save merchants time
		(gca_options.bool("global","merchants_timer") &&
			this.save_merchants_info());

		// Fade non affordable items
		(gca_options.bool("merchants","show_shop_info") &&
			this.containerItemsInfo.prepare());

		// Double click to sell/buy items
		(gca_options.bool("merchants","double_click_actions") &&
			this.doubleClickActions.init());
		
		// Merchants Search
		this.merchantsSearch.searchBox();

		// Setting Link
		gca_tools.create.settingsLink("merchants");
	},

	// Merchants Search
	merchantsSearch : {
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
			
			let searchButton = document.createElement("input");
			searchButton.className = 'awesome-button gca-search-submit';
			searchButton.type = 'button';
			searchButton.value = '🔎';
			searchButton.onclick = "self.scrollTo(0,10000);";
			container.appendChild(searchButton);
			
			document.getElementById('mainnav').appendChild(container);
			
			searchButton.addEventListener('click', this.searchItems, false);
		},
		
		shops : {
			loaded : 0,
			found : 0
		},
		
		searchItems : function(){
			let searchValue = document.getElementById('gca-search-input').value.toLowerCase();
			if( searchValue.trim() === "" || searchValue.match(/[<>=+-]/i))
				return;
			
			gca_merchants.merchantsSearch.shops.loaded = 0;
			gca_merchants.merchantsSearch.shops.found = 0;
			
			// Search all merchants
			for(y=1;y<=6;y++){
				for(c=0;c<=1;c++){
					// Post to the server
					jQuery.ajax({
						url: gca_getPage.link({"mod":"inventory","subsub":c,"sub":y}),
						success: function(html){
							
							if( !html.match(/class="shopTab"/i) ){
								// error
								gca_notifications.error( gca_locale.get("general", "error") );
								gca_merchants.merchantsSearch.shops.loaded += 1;
								return;
							}
							
							let dealerName = html.match(/class="awesome-tabs current">([^<]+)<\/a>/i)[1].trim();
							let dealerNum = html.match(/data-container-number="(\d+)"/i)[1];
							
							let tab = "N/A";
							if(html.match(/shopTab [dynamic ]*active">([^<]+)<\/div/i))
								tab = html.match(/shopTab [dynamic ]*active">([^<]+)<\/div/i)[1];
							let items = html.match(/data-container-number="[^"]*" data-content-type="[^"]*" data-content-size="[^"]*" data-enchant-type="[^"]*" data-item-id="[^"]*" (?:data-price-gold="\d+" )*data-tooltip="\[\[\[&quot;([^&]*)&/gim);
							if( !items )
								items = [];
							
							let temp_name = 'Unknown';
							let temp_img = null;
							for (let i in items){
								if ( typeof items[i] != "string" )
									continue;
								temp_name = decodeURIComponent(JSON.parse("\""+items[i].match(/data-tooltip="\[\[\[&quot;([^&]*)/i)[1]+"\""));
								if(temp_name.toLowerCase().match(searchValue) && parseInt(items[i].match(/data-container-number="(\d+)"/)[1]) > 20){
									gca_notifications.success( dealerName+" ["+tab+"]:\n"+temp_name);
									gca_merchants.merchantsSearch.shops.found += 1;
								}
							}
							
							gca_merchants.merchantsSearch.shops.loaded += 1;
							
							if( gca_merchants.merchantsSearch.shops.loaded == 12 && gca_merchants.merchantsSearch.shops.found == 0 )
								gca_notifications.warning( gca_locale.get("merchants", "no_such_item") );
						},
						error: function(){
							gca_notifications.error( gca_locale.get("general", "error") );
							gca_merchants.merchantsSearch.shops.loaded += 1;
						}
					});
				}
			}
		}
	},

	// Fade non affordable items
	fadeUnaffordableItems : {
		inject : function() {
			// Save instance
			var that = this;
			// Recheck items on item move
			gca_tools.event.request.onAjaxResponse(function(){
				that.check();
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
				// Parse tooltip
				t = items[i].dataset.tooltip.replace(/\./g, "").replace(/\\/g, "");
				// Get item's gold
				g = t.match(/(\d+) <div class="icon_gold">/);
				g = (g) ? g[1] : 0;
				// Get item's rubies
				r = t.match(/(\d+) <div class="icon_rubies">/);
				r = (r) ? r[1] : 0;

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
				if (
					data.hasOwnProperty("data") && data.data &&
					data.data.hasOwnProperty("to") && data.data.to &&
					data.data.to.hasOwnProperty("data") && data.data.to.data &&
					data.elem.length === 1
				) {
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
	doubleClickActions : {
		init : function(){
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
				if (
					data.hasOwnProperty("data") && data.data &&
					data.data.hasOwnProperty("to") && data.data.to &&
					data.data.to.hasOwnProperty("data") && data.data.to.data &&
					data.elem.length === 1
				) {
					let item = jQuery('#content .ui-draggable[data-hash=' + data.elem[0].dataset.hash + ']');
					if (item) delete item[0].dataset.gcaFlag_doubleClickEvent;
					this.apply();
				}
			});
		},
		apply : function(){
			this.applyOn(jQuery('#inv .ui-draggable'));
			this.applyOn(jQuery('#shop .ui-draggable'));
		},
		applyOn : function(items){
			var that = this;
			// For each
			items.each(function(){
				if (!this.dataset) return;
				// If already parsed
				if(this.dataset.gcaFlag_doubleClickEvent) return;
				// Flag as parsed
				this.dataset.gcaFlag_doubleClickEvent = true;
				// Check if cost rubies
				let info = gca_tools.item.hash(this);
				// If item cost rubies
				if (info.price_rubies && info.price_rubies > 0) {
					// Add rubies event
					this.addListener('dblclick', that.handler_rubies);
				}
				else {
					// Add event
					this.addListener('dblclick', that.handler);
				}
			});
		},
		handler : function() {
			if (this.parentNode.id == 'inv') {
				gca_tools.item.move(this, 'shop');
			}
			else if (this.parentNode.id == 'shop') {
				gca_tools.item.move(this, 'inv');
			}
		},
		handler_rubies : function() {
			gca_notifications.error(gca_locale.get("global", "item_worth_rubies"));
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
