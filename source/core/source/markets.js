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
			(gca_data.section.get("packages", "special_category_features", 0) != 2 &&
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
	enterTriggerSell : function() {
		jQuery(document).ready(function() {
			// Monitor key events
			jQuery(document).keyup(function(event) {
				// Check if ENTER
				if (event.keyCode === 13) {
					// Check if there is an item to sell
					if ( document.getElementById("market_sell").getElementsByClassName("ui-draggable").length > 0 ){
						//console.log("Item in sell position found");
						let focus = document.activeElement.type
						if ( focus != "textarea" && focus != "text")
							document.getElementsByName("anbieten")[0].click();
							//console.log("Not a text area:"+document.activeElement.type);
					}
				}
			});
			
			let span = document.createElement("span");
			span.textContent = "("+gca_locale.get("markets", "click_enter_to_sell")+")";//"(click enter to sell)";
			span.style = "font-size: 0.8em;font-style: italic;"
			document.getElementById("market_sell_box").getElementsByTagName("section")[0].appendChild(span);
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
	sellWarnings : {

		init : function() {
			if (this.icons) return;
			this.icons = {};

			// Icon wrapper
			this.icons.wrapper = document.createElement('div');
			this.icons.wrapper.className = 'gca-market-sell-warnings';
			document.getElementById('market_sell_box').getElementsByTagName('h2')[0].appendChild(this.icons.wrapper);

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
	
	// Cancel all button
	cancelAllButton : function(){
		var buttons = document.getElementsByName('cancel');
		
		if(buttons.length>0){
			//create button
			var button = document.createElement("input");
			button.type = 'button';
			button.className = "awesome-button";
			button.id = 'cancelAllButton';
			button.style = "margin-top: -21px;position: absolute;right: 116px;";
			button.value = buttons[0].value + ' ('+buttons.length+')';
			button.dataset.current = 0;
			button.dataset.max = buttons.length;
			button.addEventListener('click', function(){
				// Cancel all code
				var rows = document.getElementById("market_table").getElementsByTagName("tr");
				var forms = document.getElementById("market_table").getElementsByTagName("form");
				var cancel = encodeURIComponent(document.getElementsByName('cancel')[0].value);
				var id;
				for(var i = 1; i <= rows.length - 1; i++){
					if(typeof rows[i].getElementsByTagName("input")['cancel'] !== "undefined"){
						id = forms[i - 1].buyid.value;
						jQuery.ajax({
							type: "POST",
							url: document.location.href,
							data: 'buyid=' + id + '&cancel=' + cancel,
							success: function(){
								if(document.getElementById('cancelAllButton').dataset.current==document.getElementById('cancelAllButton').dataset.max-1){
									document.location.href=document.location.href.replace(/&p=\d+/i,"");
									return;
								}
								document.getElementById('cancelAllButton').dataset.current++;
								document.getElementById('cancelAllButton').value = buttons[0].value + ' ( '+document.getElementById('cancelAllButton').dataset.current+'/'+document.getElementById('cancelAllButton').dataset.max+')';;
							},
							error: function(){
								gca_notifications.error(gca_locale.get("general", "error"));
							}
						});
					}
				}
				
				
				//document.location.href
				//'buyid='+itemsId+'&cancel='+encodeURIComponent(cancel)
			}, false);
			
			var base = document.getElementById("market_table");
			base.parentNode.insertBefore(button,base);
		}
	},
	
	// Default sell duration
	sell_duration : function(){
		let duration = gca_data.section.get("market", "sell_duration", 0);
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
	oneGoldMode : function(){
		// Create mode switch
		let wrapper = document.createElement('div');
		let fields = document.getElementById("market_sell_fields");
		fields.parentNode.insertBefore(wrapper, fields.nextSibling);
		
		let selected_mode = gca_data.section.get("cache", "last_sell_1g_mode", 0);
		
		let modeSwitch = document.createElement("div");
		modeSwitch.className = "switch-field";
		modeSwitch.id = "mode-switch";
		let normal_mode = document.createElement("input");
		normal_mode.type = "radio";
		normal_mode.id = "normal_mode";
		normal_mode.name = "sell_mode";
		normal_mode.value = 0;
		if(selected_mode === 0)
			normal_mode.checked = true;
		let normal_mode_label = document.createElement("label");
		normal_mode_label.setAttribute("for", "normal_mode");
		normal_mode_label.textContent = 'Auto';//gca_locale.get("training", "stats_points");
		modeSwitch.appendChild(normal_mode);
		modeSwitch.appendChild(normal_mode_label);

		let oneG_mode = document.createElement("input");
		oneG_mode.type = "radio";
		oneG_mode.id = "1g_mode";
		oneG_mode.name = "sell_mode";
		oneG_mode.value = 1;
		if(selected_mode === 1)
			oneG_mode.checked = true;
		let oneG_mode_label = document.createElement("label");
		oneG_mode_label.setAttribute("for", "1g_mode");
		oneG_mode_label.textContent = '1g';//gca_locale.get("training", "points_breakdown");
		wrapper.appendChild(modeSwitch);
		modeSwitch.appendChild(oneG_mode);
		modeSwitch.appendChild(oneG_mode_label);
		
		let cost_mode = document.createElement("input");
		cost_mode.type = "radio";
		cost_mode.id = "cost_mode";
		cost_mode.name = "sell_mode";
		cost_mode.value = 2;
		if(selected_mode === 2)
			cost_mode.checked = true;
		let cost_mode_label = document.createElement("label");
		cost_mode_label.setAttribute("for", "cost_mode");
		cost_mode_label.textContent = gca_data.section.get("cache", "value_tanslation", "Value");
		wrapper.appendChild(modeSwitch);
		modeSwitch.appendChild(cost_mode);
		modeSwitch.appendChild(cost_mode_label);
		
		let auto_value = document.createElement("input");
		auto_value.id = "auto_value";
		auto_value.value = 0;
		auto_value.style = "display:none";
		modeSwitch.appendChild(auto_value);
		
		var get_translation = (gca_data.section.get("cache", "value_tanslation", "true")=="true")?true:false;

		// On item drop function
		this.detectMarketSellItemDrop();
		gca_tools.event.addListener('market-sell-item-drop', (data) => {
			let b = data.item.data("priceGold") || 0;
			b = Math.floor(b * data.amount / 1.5);
			document.getElementById('auto_value').value = b;
			modeSwitchFunction(); // calcDues(); is called within this function
			
			// Save "Value" translation
			if (get_translation) {
				let tooltip = data.item.data("tooltip")[0];
				for (let i = 2; i < tooltip.length; i++) {
					if (typeof tooltip[i][0] === "string" && tooltip[i][0].match(/(\S+) [1-9][0-9.]* <div class="icon_gold">/)) {
						let value_tanslation = tooltip[i][0].match(/(\S+) [1-9][0-9.]* <div class="icon_gold">/)[1];
						gca_data.section.set("cache", "value_tanslation", value_tanslation);
						cost_mode_label.textContent = value_tanslation;
						break;
					}
				}
			}
		});
		
		// Change mode
		var modeSwitchFunction = function(){
			let selected = parseInt(document.querySelector('input[name=sell_mode]:checked').value);
			gca_data.section.set("cache", "last_sell_1g_mode", selected); // Save last selected mode
			if(document.getElementById('preis').value != ''){
				if(selected == 1){
					document.getElementById('preis').value = 1;
				}else if(selected == 2){
					document.getElementById('preis').value = Math.round(document.getElementById('auto_value').value*0.375);
				}else{
					document.getElementById('preis').value = document.getElementById('auto_value').value;
				}
			}
			window.calcDues();
		};
		modeSwitch.addEventListener('change', modeSwitchFunction);
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
	doubleClickToSelect : {
		init : function(){
			// Add event
			gca_tools.event.bag.onBagOpen(() => {
				this.apply();
			});

			// If bag not already loaded
			if (document.getElementById('inv').className.match('unavailable')) {
				// Wait first bag
				gca_tools.event.bag.waitBag(() => {
					this.apply();
				});
			}
			else {
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
					if(gca_data.section.get("packages", "special_category_features", 0) == 1)
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
					
					// For each item
					jQuery("#market_table div").each((i, item) => {
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
