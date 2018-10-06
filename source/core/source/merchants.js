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
		
		// Fade unaffordable items
		(gca_options.bool("merchants","fade_unaffordable_items") &&
			this.fadeUnaffordableItems.inject());

		// If Item shadow
		(gca_options.bool("global","item_shadow") && 
			this.itemShadow.inject());

		// Save merchants time
		(gca_options.bool("global","merchants_timer") &&
			this.save_merchants_info());

		// Fade unaffordable items
		(gca_options.bool("merchants","show_shop_info") &&
			this.containerItemsInfo.prepare());

		// Double click to sell/buy items
		(gca_options.bool("merchants","double_click_actions") &&
			this.doubleClickActions.init());

		// Setting Link
		gca_tools.create.settingsLink("merchants");
	},

	// Fade unaffordable items
	fadeUnaffordableItems : {
		inject : function() {
			// Save instance
			var that = this;
			// Recheck items on item move
			gca_tools.event.request.onAjaxResponce(function(){
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

	// Save merchants infomations
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
			gca_tools.event.request.onAjaxResponce((data) => {
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
			gca_tools.event.request.onAjaxResponce((data) => {
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
				// Add event
				this.addListener('dblclick', that.handler);
			});
		},
		handler : function() {
			if (this.parentNode.id == 'inv') {
				gca_tools.item.move(this, 'shop');
			}
			else if (this.parentNode.id == 'shop') {
				gca_tools.item.move(this, 'inv');
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
/* global gca_data, gca_options, gca_tools */
/* global jQuery */
