/*
 * Addon Markets Script
 * Author: DarkThanos, GreatApo
 */

// Markets
var gca_markets = {
	inject : function(){
		// Check for errors
		if(gca_section.submod === 'control')
			return;
		if(!document.getElementById("content"))
			return;

		// If there are items
		if(document.getElementById("market_table")){
			// If Item shadow
			(gca_options.bool("global","item_shadow") &&
				this.itemShadow.market());

			// If 1 gold warnings
			(gca_options.bool("market","one_gold_warning") &&
				this.itemsWarnings.oneGoldItems());
			// If soul-bound warnings
			(gca_options.bool("market","soulbound_warning") &&
				this.itemsWarnings.soulboundItems());
			// If your items warning
			//	this.itemsWarnings.yourItems();

			// If cancel all button
			(gca_options.bool("market","cancel_all_button") &&
				this.cancelAllButton());

			// If remember sell duration
			if(gca_options.bool("market","remember_sell_duration")){
				this.remember_sell_duration();
			}
			// Default sell duration
			else{
				this.sell_duration();
			}

			// Special category features
			(gca_options.get("packages", "special_category_features") != 2 &&
				this.specialCategory.resolve(this));

			this.layout.changeSortArrows();
		}

		// Trigger sell with enter
		(gca_options.bool("market", "sell_with_enter") &&
			this.enterTriggerSell());

		// Insert sort options in POST-URL on sell form
		this.sortOptionsOnSell();

		// 1 gold mode
		(gca_options.bool("market", "one_gold_mode") &&
			this.oneGoldMode());
		
		// If insert "with fees" button
		if (gca_options.bool("market","add_fees_button")){
			this.add_fees_button();
		}

		// Item sell warning icons
		if (gca_options.bool("market", "sell_warning_icons")) {
			this.sellWarnings.soulbound(this);
			this.sellWarnings.canNotBuyBack(this);
		}

		// Levels you can see
		this.levelsYouCanSee();

		// Double click select
		(gca_options.bool("market", "double_click_select") && 
			this.doubleClickToSelect.init());

		// Setting Link
		gca_tools.create.settingsLink("market");
	},

	// Trigger sell with {enter}
	enterTriggerSell: function() {
		jQuery(document).ready(function() {
			// Monitor key events
			jQuery(document).keyup(function(event) {
				// Check if ENTER is pressed
				if (event.keyCode === 13) {
					// Check if there is an item to sell
					var marketSellElement = document.getElementById("market_sell");
					if (marketSellElement && marketSellElement.getElementsByClassName("ui-draggable").length > 0) {
						//console.log("Item in sell position found");
						let focus = document.activeElement.type;
						if (focus != "textarea" && focus != "text") {
							document.getElementsByName("anbieten")[0].click();
							//console.log("Not a text area:"+document.activeElement.type);
						}
					}
				}
			});

			// Create the span element with text
			let span = document.createElement("span");
			span.textContent = "(" + gca_locale.get("markets", "click_enter_to_sell") + ")"; //"(click enter to sell)";
			span.style = "font-size: 0.8em; font-style: italic;";

			// Check if market_sell_box exists and append the span
			var marketSellBox = document.getElementById("market_sell_box");
			if (marketSellBox) {
				let section = marketSellBox.getElementsByTagName("section")[0];
				if (section) {
					section.appendChild(span);
				}
			}
		});
	},

	// Add shadow on items
	itemShadow : {
		market : function() {
			// Get items
			var items = document.getElementById('market_table').getElementsByTagName("div");
			
			// For each
			for (var i = items.length - 1; i >= 0; i--) {
				if (items[i].className.match("item-"))
					gca_tools.item.shadow.add(items[i]);
			}
		}
	},
	
	// Show item levels you can see
	levelsYouCanSee : function(){
		var playerLvl = parseInt(document.getElementById("header_values_level").textContent);
		var maxLvl = (playerLvl + 9 < Math.floor(1.25 * playerLvl)) ? playerLvl + 9 : Math.floor(1.25 * playerLvl);
		
		var baseElement = document.getElementsByClassName("buildingDesc")[1].getElementsByTagName("p")[0];
		baseElement.appendChild(document.createElement("br"));
		baseElement.appendChild(document.createElement("br"));
		baseElement.appendChild(document.createTextNode(gca_locale.get("auction", "levels_you_can_see", {min : 0, max : maxLvl})));
	},

	// Point out specific items
	itemsWarnings : {
		// Point out which items are soulbound
		soulboundItems : function(){
			let buyForms = [];
			let forms = document.getElementsByTagName('form');
			for (let i = 0; i < forms.length; i++) {
				if (forms[i].name == "buyForm") {
					buyForms.push(forms[i]);
				}
			}

			let message = gca_locale.get("markets", "item_is_soulbound");
			let rows = document.getElementById("market_table").getElementsByTagName("tr");
			for (let i = 1; i <= rows.length - 1; i++) {
				if (
					typeof rows[i].getElementsByTagName("div")[0].dataset.soulboundTo !== "undefined" &&
					typeof rows[i].getElementsByTagName("input")['buy'] !== "undefined"
				) {
					// not to you
					if (rows[i].getElementsByTagName("div")[0].dataset.soulboundTo != gca_section.playerId) {
						rows[i].style.backgroundColor = "rgba(255, 0, 0,0.2)";

						let form = buyForms[i-1];
						if (form.dataset.confirmMessage) {
							form.dataset.confirmMessage += '\n' + message;
						}
						else {
							form.dataset.confirmMessage = message;
							form.addEventListener("submit", function (event) {
								if (!confirm(
									this.dataset.confirmMessage + '\n\n' +
									gca_locale.get("markets", "are_you_sure_you_want_to_buy")
								)) {
									event.preventDefault();
									return false;
								}
							});
						}
					}
				}
			}
		},
		
		// Point out which items are yours
		yourItems : function(){
			let rows = document.getElementById("market_table").getElementsByTagName("tr");
			for (let i = 1; i <= rows.length - 1; i++) {
				if (typeof rows[i].getElementsByTagName("input")['buy'] == "undefined") {
					rows[i].style.backgroundColor = "rgba(0, 0, 255,0.2)";
				}
			}
		},
		
		// Point out which items cost 1 gold
		oneGoldItems : function(){
			let buyForms = [];
			let forms = document.getElementsByTagName('form');
			for (let i = 0; i < forms.length; i++) {
				if (forms[i].name == "buyForm") {
					buyForms.push(forms[i]);
				}
			}

			let message = gca_locale.get("markets", "item_cost_only_x_gold", {number : 1});
			let rows = document.getElementById("market_table").getElementsByTagName("tr");
			for (let i = 1; i <= rows.length - 1; i++) {
				if (
					gca_tools.strings.parseGold(rows[i].getElementsByTagName("td")[2].textContent) === 1 &&
					typeof rows[i].getElementsByTagName("input")['buy'] !== "undefined" &&
					rows[i].style.backgroundColor != "rgba(0, 255, 0,0.2)"
				) {
					rows[i].style.backgroundColor = "rgba(255, 152, 0,0.2)";
					
					let form = buyForms[i-1];
					if (form.dataset.confirmMessage) {
						form.dataset.confirmMessage += '\n' + message;
					}
					else {
						form.dataset.confirmMessage = message;
						form.addEventListener("submit", function (event) {
							if (!confirm(
								this.dataset.confirmMessage + '\n\n' +
								gca_locale.get("markets", "are_you_sure_you_want_to_buy")
							)) {
								event.preventDefault();
								return false;
							}
						});
					}
				}
			}
		}
	},

	// Show warnings on item selling
	sellWarnings: {
    		init: function() {
        		if (this.icons) return;
        		this.icons = {};

        		// Icon wrapper
        		this.icons.wrapper = document.createElement('div');
        		this.icons.wrapper.className = 'gca-market-sell-warnings';

        		// Get the market_sell_box element and check if it exists
        		var marketSellBox = document.getElementById('market_sell_box');
        		if (marketSellBox) {
            			// Get the h2 element inside market_sell_box
            			var header = marketSellBox.getElementsByTagName('h2')[0];
            			if (header) {
                			header.appendChild(this.icons.wrapper);
            			}
	     		}

			// Soulbound icon
			this.icons.soulbound = document.createElement('span');
			this.icons.soulbound.style.display = 'none';
			this.icons.soulbound.textContent = '🔗';
			this.icons.soulbound.title = gca_locale.get("markets", "item_is_soulbound");
			this.icons.wrapper.appendChild(this.icons.soulbound);

			// Buy back warning icon
			this.icons.buyback = document.createElement('span');
			this.icons.buyback.style.display = 'none';
			this.icons.buyback.textContent = '♺';
			this.icons.buyback.title = gca_locale.get("markets", "item_cant_buy_back");
			this.icons.wrapper.appendChild(this.icons.buyback);

			// On item remove, clear icons
			gca_tools.event.addListener('market-sell-item-remove', (data) => {
				this.icons.soulbound.style.display = 'none';
				this.icons.buyback.style.display = 'none';
			});
		},

		// Detect soulbound items
		soulbound : function(self) {
			this.init();
			self.detectMarketSellItemDrop();
			gca_tools.event.addListener('market-sell-item-drop', (data) => {
				let hash = gca_tools.item.hash(data.item[0]);
				this.icons.soulbound.style.display = (!hash || !hash.soulbound || hash.soulbound == 0 || hash.soulbound == 2) ? 'none' : 'inline-block';
			});
		},

		// Detect items that the player will not be able to buy back
		canNotBuyBack : function(self) {
			this.init();
			let playerLevel = parseInt(document.getElementById('header_values_level').textContent, 10);

			self.detectMarketSellItemDrop();
			gca_tools.event.addListener('market-sell-item-drop', (data) => {
				let itemLevel = parseInt(data.item[0].dataset.level, 10);
				let maxVisible = ((playerLevel + 9 < Math.floor(1.25 * playerLevel)) ? playerLevel + 9 : Math.floor(1.25 * playerLevel));
				this.icons.buyback.style.display = (!itemLevel || itemLevel <= maxVisible) ? 'none' : 'inline-block';
			});
		},
	},
	
	// Cancel market items button
	cancelAllButton: function() {
		let buttons = document.getElementsByName('cancel');
		if (buttons.length == 0) return;

		// Create the cancel all button
		let button = document.createElement("input");
		button.type = 'button';
		button.className = "awesome-button";
		button.id = 'cancelAllButton';
		button.style = "margin-top: -21px;position: absolute;right: 116px;";
		button.value = buttons[0].value + ' (' + buttons.length + ')';

		let atomic = false;
		button.addEventListener('click', function() {
			// Disable button
			if (atomic) return;
			atomic = false;
			button.disabled = true;

			let cancelStr = buttons[0].value;
			let cancel = encodeURIComponent(cancelStr);
			let canceledCount = 0; // Counter
			let total = buttons.length;
			let forms = document.getElementById("market_table").getElementsByTagName("form");

			let minDelayRequests = 100; // minimum delay between requests in ms
			button.value = `Cancel (0/${total})`;
			
			function cancelNextButton(index) {
				if (index >= total) {
					// If finished, refresh
					document.location.href = document.location.href.replace(/&p=\d+/i,"");
					return;
				}

				// Gather data for item
				let btn = buttons[index];
				let buyid = btn.form.buyid.value;

				// Launch request
				let request_start = new Date().getTime();
				jQuery.ajax({
					type: "POST",
					url: document.location.href,
					data: 'buyid=' + encodeURIComponent(buyid) + '&cancel=' + encodeURIComponent(btn.value),
					success: function() {
						let request_duration = new Date().getTime() - request_start;
						button.value = `Cancel (${index + 1}/${total})`;

						setTimeout(() => {
							cancelNextButton(index + 1);
						}, Math.max(request_duration, minDelayRequests));
					},
					error: function() {
						let request_duration = new Date().getTime() - request_start;
						// This item cancel failed, it will be skipped
						gca_notifications.error(gca_locale.get("general", "error"));
						// Double the min delay, just in case
						minDelayRequests *= 2;

						setTimeout(() => {
							cancelNextButton(index + 1);
						}, Math.max(request_duration * 2, minDelayRequests));
					}
				});
			}

			cancelNextButton(0);
		});

		// Append DOM
		var base = document.getElementById("market_table");
		base.parentNode.insertBefore(button, base);
	},
	
	// Default sell duration
	sell_duration : function(){
		let duration = gca_options.get("market", "sell_duration");
		let options = document.getElementById('dauer');
		// If 48h is selected, select 24h
		if (duration >= options.length)
			duration = 2;
		// Select saved duration
		options.selectedIndex = duration;
	},
	
	// Remember sell duration
	remember_sell_duration : function(){
		let duration = gca_data.section.get("cache", "last_sell_duration", 0);
		let options = document.getElementById('dauer');
		// If 48h is selected, select 24h
		if (duration >= options.length)
			duration = 2;
		// Select saved duration
		options.selectedIndex = duration;
		
		options.addEventListener("change", function () {
			gca_data.section.set("cache", "last_sell_duration", this.selectedIndex);
		}, false);
	},
	
	detectMarketSellItemDrop : function() {
		if (this.detectMarketSellItemDrop_injected) return;
		this.detectMarketSellItemDrop_injected = true;

		window.marketDrop_original = window.marketDrop;
		window.marketDrop = function(item, amount) {
			var val = window.marketDrop_original(item, amount);
			gca_tools.event.fire('market-sell-item-drop', {item, amount});
			return val;
		}
		window.marketRemove_original = window.marketRemove;
		window.marketRemove = function() {
			var val = window.marketRemove_original();
			gca_tools.event.fire('market-sell-item-remove');
			return val;
		}
		/*
		this.detectMarketSellItemDrop();
		gca_tools.event.addListener('market-sell-item-drop', (data) => {
			// data.item
			// data.amount
		});
		*/
	},

	// 1g mode
	oneGoldMode: function() {
    		// Create mode switch
   		let wrapper = document.createElement('div');
    
    		// Get the market_sell_fields element
    		let fields = document.getElementById("market_sell_fields");
    
    		// Check if the fields element exists before inserting the wrapper
    		if (fields && fields.parentNode) {
        		fields.parentNode.insertBefore(wrapper, fields.nextSibling);
	 	}
		
		let selected_mode = gca_data.section.get("cache", "last_sell_1g_mode", 0);
		
		let modeSwitch = document.createElement("div");
		modeSwitch.className = "switch-field";
		modeSwitch.id = "mode-switch";
		wrapper.appendChild(modeSwitch);

		let normal_mode = document.createElement("input");
		normal_mode.type = "radio";
		normal_mode.id = "normal_mode";
		normal_mode.name = "sell_mode";
		normal_mode.value = 0;
		if (selected_mode == 0)
			normal_mode.checked = true;
		let normal_mode_label = document.createElement("label");
		normal_mode_label.setAttribute("for", "normal_mode");
		normal_mode_label.textContent = 'Auto';
		modeSwitch.appendChild(normal_mode);
		modeSwitch.appendChild(normal_mode_label);

		let oneG_mode = document.createElement("input");
		oneG_mode.type = "radio";
		oneG_mode.id = "1g_mode";
		oneG_mode.name = "sell_mode";
		oneG_mode.value = 1;
		if (selected_mode == 1)
			oneG_mode.checked = true;
		let oneG_mode_label = document.createElement("label");
		oneG_mode_label.setAttribute("for", "1g_mode");
		oneG_mode_label.textContent = '1g';
		modeSwitch.appendChild(oneG_mode);
		modeSwitch.appendChild(oneG_mode_label);
		
		let cost_mode = document.createElement("input");
		cost_mode.type = "radio";
		cost_mode.id = "cost_mode";
		cost_mode.name = "sell_mode";
		cost_mode.value = 2;
		if (selected_mode == 2)
			cost_mode.checked = true;
		let cost_mode_label = document.createElement("label");
		cost_mode_label.setAttribute("for", "cost_mode");
		cost_mode_label.textContent = gca_data.section.get("cache", "value_translation", "Value");
		modeSwitch.appendChild(cost_mode);
		modeSwitch.appendChild(cost_mode_label);
		
		let auto_value = document.createElement("input");
		auto_value.id = "auto_value";
		auto_value.value = 0;
		auto_value.style = "display:none";
		modeSwitch.appendChild(auto_value);
		
		// Custom market prices
		let custom_prices = [];
		(gca_options.get("market", "custom_prices") || '').split(',').forEach((price) => {
			price = price.trim().replace(/\./g, '');
			price = price.match(/^(\d+)(%?)$/);
			if (!price) return;
			let isPercentage = price[2] == '%';
			price = parseInt(price[1], 10);
			if (!isNaN(price) && price > 0) {
				custom_prices.push(isPercentage ? price + '%' : price);
			}
		});

		custom_prices.forEach((price) => {
			let custom_mode = document.createElement("input");
			custom_mode.type = "radio";
			custom_mode.id = "gca_custom_mode_" + price;
			custom_mode.name = "sell_mode";
			custom_mode.value = "custom_" + price;
			if (selected_mode == "custom_" + price)
				custom_mode.checked = true;
			let custom_mode_label = document.createElement("label");
			custom_mode_label.setAttribute("for", custom_mode.id);
			custom_mode_label.textContent = "💰 " + ((price + '').replace(/000000$/,'m').replace(/(\d)(\d)00000$/,'$1.$2m').replace(/(\d)(\d\d)0000$/,'$1.$2m').replace(/000$/,'k'));
			modeSwitch.appendChild(custom_mode);
			modeSwitch.appendChild(custom_mode_label);
		});
	
		var get_translation = (gca_data.section.get("cache", "value_tanslation", "true")=="true")?true:false;
		
		// Change mode
		let modeSwitchFunction = function(){
			let selected = document.querySelector('input[name=sell_mode]:checked');
			selected = selected ? selected.value : '0';
			gca_data.section.set("cache", "last_sell_1g_mode", selected); // Save last selected mode
			if (document.getElementById('preis').value != '') {
				// Just 1 g
				if (selected == 1) {
					document.getElementById('preis').value = 1;
				}
				// Cost value
				else if (selected == 2) {
					document.getElementById('preis').value = Math.round(document.getElementById('auto_value').value * 1);
				}
				// Custom price values
				else if (selected.substring(0, 7) == 'custom_') {
					if (selected.charAt(selected.length - 1) == '%') {
						let price = selected.match(/^custom_(\d+)%$/);
						document.getElementById('preis').value = Math.round(Math.round(document.getElementById('auto_value').value * 1) * (price ? (parseInt(price[1])/100) : 1));
					}
					else {
						let price = selected.match(/^custom_(\d+)/);
						document.getElementById('preis').value = price ? parseInt(price[1], 10) : document.getElementById('auto_value').value;
					}
				}
				// Traditional
				else {
					document.getElementById('preis').value = document.getElementById('auto_value').value;
				}
			}
			window.calcDues();
		};

		// On item drop function
		this.detectMarketSellItemDrop();
		gca_tools.event.addListener('market-sell-item-drop', (data) => {
			let b = data.item.data("priceGold") || 0;
			document.getElementById('auto_value').value = b;
			modeSwitchFunction(); // calcDues(); is called within this function
		});

		modeSwitch.addEventListener('change', modeSwitchFunction);

		let translationIsNeeded = (gca_data.section.get("cache", "value_tanslation", "true") == "true") ? true : false;
		if (translationIsNeeded) {
			// Save "Value" translation
			gca_tools.event.addListener('market-sell-item-drop', (data) => {
				if (translationIsNeeded) {
					let tooltip = data.item.data("tooltip")[0];
					for (let i = 2; i < tooltip.length; i++) {
						if (typeof tooltip[i][0] === "string" && tooltip[i][0].match(/<div class="icon_gold"><\/div>/)) {
							let value_translation = tooltip[i][0].replace(/<div\s*class="icon_gold"><\/div>/g, '').replace(/\s*[0-9.]+\s*/g, '').trim();
							gca_data.section.set("cache", "value_translation", value_translation);
							cost_mode_label.textContent = value_translation;
							translationIsNeeded = false;
							break;
						}
					}
				}
			});
		}
	},

	// Layout
	layout : {
		changeSortArrows : function() {
			let content = document.getElementById("content");
			if(content.className.length > 0)
				content.className += " ";
			content.className += "gca_change_sort_arrows";

			let links = document.getElementById("market_table");
			if(!links) return;
			links = links.getElementsByTagName("tr");
			if(!links.length) return;
			links = links[0].getElementsByTagName("a");
			if(!links.length) return;

			// Get url
			var url = gca_getPage.parameters();
			
			for (var i = 0; i < links.length; i++) {
				let link = gca_getPage.parameters(links[i].href);
				if (url.hasOwnProperty("s") && link.hasOwnProperty("s") && url.s[0] === link.s[0]) {
					links[i].textContent = ((url.s.length == 1) ? "▲" : "▼") + " " + links[i].textContent;
				}else{
					links[i].textContent = "▷ " + links[i].textContent;
				}
			}
		}
	},
	
	sortOptionsOnSell : function() {
		// Get url
		var url = gca_getPage.parameters();
		// Fix POST-URL on sell form
		if (url.hasOwnProperty("s")) {
			document.getElementById('sellForm').action += '&s='+url.s[0];
		}
	},

	// On double click item to select for selling
	doubleClickToSelect: {
		init: function() {
		// Add event
		gca_tools.event.bag.onBagOpen(() => {
			this.apply();
		});

		// Check if 'inv' element exists and handle its className safely
		let invElement = document.getElementById('inv');
		if (invElement && invElement.className.match('unavailable')) {
		// Wait for the first bag
		gca_tools.event.bag.waitBag(() => {
			this.apply();
		});
		} else if (invElement) {
			this.apply();
			}
		},
		apply : function(){
			// For each
			jQuery("#inv .ui-draggable").each((i, item) => {
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
			gca_tools.item.move(this, 'market');
		}
	},
	
	// Special Categories
	specialCategory : {
		
		// Resolve category
		resolve : function(self){
			var category = parseInt(document.getElementsByName("f")[0].value);
			switch(category){
				case 0: // All
					if(gca_options.get("packages", "special_category_features") == 1)
						this.categories.scroll.loadData(self);
					break;
				case 20:
					this.categories.scroll.loadData(self);
					break;
			}
		},

		// Categories
		categories : {
			
			// Scrolls Category
			scroll : {
				loadData : function(){
					gca_tools.ajax.cached.known_scrolls().then(
						(result) => {
							// Save lists
							this.prefix = result.id.prefix;
							this.suffix = result.id.suffix;

							// Check scrolls
							this.showIsLearned();
						},
						() => {
							// On error
							//setTimeout(() => {
							//	this.loadData();
							//}, 10 * 1000);
						}
					);
				},
				// Apply
				showIsLearned : function(){
					// If no data return
					if(!this.prefix) return;
					
					// RegExp to check is item is scroll
					var scroll_patt = new RegExp("20-");
					
					// For each item
					jQuery("#market_table div").each((i, item) => {
						// If not a scroll, return
						if(!scroll_patt.test(item.dataset.basis)) return;
						
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

	add_fees_button : function() {
		let fees_indicator = document.getElementById('marktgebuehren');
		if (!fees_indicator || !fees_indicator.nextElementSibling || fees_indicator.nextElementSibling.tagName != 'IMG') return;
		let img = fees_indicator.nextElementSibling;
		
		let btn = document.createElement('a');
		btn.textContent = '[+]';
		btn.style.cursor = 'pointer';
		btn.style.marginLeft = '5px';
		btn.style.textDecoration = 'none';
		btn.dataset.tooltip = '[[["'+gca_locale.get("markets","add_fees_in_price")+'","#fff"]]]';

		btn.addEventListener('click', () => {
			// Input element with the price
			let price_input = document.getElementById('preis');
			// Parse given price
			let price = parseInt(price_input.value.replace(/\D/g,''), 10);
			// If no input exit
			if (isNaN(price)) return;

			// Get global parameters
			let multiplier = window.factors[document.getElementById('dauer').value];
			let priceBuff = window.priceBuff || 1;

			// Calculate fees
			let fees = Math.ceil(Math.ceil(price * multiplier) * priceBuff);
			// If the fees were already added on the price
			if ((price_input.dataset.withFees * 1) == price) {
				// Change price to the original value
				price = price_input.dataset.withoutFees * 1;
			}

			// Update memory data
			price_input.dataset.withFees = price + fees;
			price_input.dataset.withoutFees = price;

			// Update price
			document.getElementById('preis').value = price + fees;
			// Calculate new fees
			window.calcDues();
		});
		img.parentNode.insertBefore(btn, img.nextSibling);
	}

};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_markets.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_data, gca_getPage, gca_locale, gca_notifications, gca_options, gca_section, gca_tools */
/* global jQuery */
