/*
 * Addon Auction Script
 * Author: DarkThanos, GreatApo
 */

// Auction
var gca_auction = {
	// Pre Inject code
	preinject : function(){
		// Add class tag
		document.documentElement.className += " gca_auction";
	},

	// Inject Code
	inject : function(){
		if (document.getElementById("auction_table")){
			(gca_options.bool("auction","items_counters") && 
				this.itemsCounters());
			(gca_options.bool("global","item_shadow") && 
				this.itemsShadow());
			(gca_options.bool("auction","item_price_analyze") && 
				this.itemsValuesShow());
			(gca_options.bool("auction","item_level") && 
				this.itemsLevelShow());
			(gca_options.bool("auction","x3_items_per_line") && 
				this.items3PerLine());
		}
	},

	itemsCounters : function(){
		// Count items (number of fourms minus the search form)
		var items = document.forms.length - 1;
		// Count bided items (number of bids messages)
		var bids = document.getElementById("auction_table").getElementsByTagName("span").length;
		
		// Create info box
		var title = document.createElement("h2");
		title.className = "section-header";
		title.style.cursor = "pointer";
		title.textContent = gca_locale.get("auction", "items_info");
		var content = document.createElement("section");
		content.style.display = "block";
		content.appendChild(
			document.createTextNode(
				gca_locale.get("auction", "number_of_items", {number : items})
			)
		);
		content.appendChild(document.createElement("br"));
		content.appendChild(
			document.createTextNode(
				gca_locale.get("auction", "number_of_bided_items", {number : bids})
			)
		);
		
		// Insert box in page
		var wrapper = document.getElementById("content").getElementsByTagName("article")[0];
		wrapper.appendChild(title);
		wrapper.appendChild(content);
	},

	itemsShadow : function() {
		// Get items
		var items = document.getElementById("auction_table").getElementsByClassName("auction_item_div");
		// For each item
		var tooltipElement, itemElement;
		for (var i = items.length - 1; i >= 0; i--) {
			// Get elements
			tooltipElement = items[i].getElementsByTagName("div")[1];
			itemElement = items[i].getElementsByTagName("div")[1];
			// Render shadow
			gca_tools.item.shadow.add(itemElement, tooltipElement);
		}
	},

	itemsValuesShow : function() {
		// Get items
		var items = document.getElementById("auction_table").getElementsByClassName("auction_bid_div");
		var itemsIconDiv = document.getElementById("auction_table").getElementsByClassName("auction_item_div");
		// Get player gold and rubies
		var gold = parseInt(gca_tools.strings.removeDots(document.getElementById("sstat_gold_val").textContent), 10);
		var rubies = parseInt(gca_tools.strings.removeDots(document.getElementById("sstat_ruby_val").textContent), 10);

		// For each item
		var price, value, percent, wrapper, span, tmp;
		for (var i = items.length - 1; i >= 0; i--) {
			// Get price
			price = parseInt(gca_tools.strings.removeDots(items[i].getElementsByTagName('div')[1].textContent).match(/(\d+)/i)[1], 10);
			// Get value
			value = parseInt(gca_tools.strings.removeDots(itemsIconDiv[i].getElementsByTagName('div')[1].dataset.tooltip).match(/(\d+) (<img|<div class=\\"icon_gold\\")/i)[1], 10);
			// Price-Value percent
			percent = Math.round(price * 100 / value);
			// Get info wrapper box
			wrapper = items[i].getElementsByTagName('div')[0];
			span = document.createElement("span");

			// If price is equal or better from value
			if(value >= price){
				items[i].getElementsByTagName('input')[0].style.backgroundColor = "#FFCC66";
				span.className = "gca-auction-good-price";
				span.textContent = gca_locale.get("auction", "hide_your_gold_here");
			}
			// Price is not good
			else{
				span.className = "gca-auction-bad-price";
				span.textContent = gca_locale.get("auction", "price_value_function", {number : gca_tools.strings.insertDots(price - value)});
				span.appendChild(document.createTextNode(" "));
				span.appendChild(gca_tools.create.goldIcon());
			}
			wrapper.appendChild(document.createElement("br"));
			wrapper.appendChild(span);

			// Show percent
			span = document.createElement("span");
			span.className = "gca-auction-price-value-percent";
			span.textContent = "(" + percent + "%)";
			wrapper.appendChild(span);

			// Display if you can buy it
			document.getElementsByName('bid')[i].className += (gold < price) ? " gca-auction-can-not-buy" : " gca-auction-can-buy";
			// Display if you can buy it out
			tmp = gca_tools.strings.removeDots(items[i].textContent).match(/\s*(\d+)\s*(\d+)\s*$/);
			document.getElementsByName('buyout')[i].className += (gold < parseInt(tmp[1], 10) || rubies < parseInt(tmp[2], 10)) ? " gca-auction-can-not-buy" : " gca-auction-can-buy";
		}
	},

	itemsLevelShow : function() {
		// Get items
		var items = document.getElementById("auction_table").getElementsByClassName("auction_item_div");
		// Get level locale
		var level_locale = JSON.parse(document.getElementById("icon_level").dataset.tooltip)[0][0][0];
		// For each item
		var level, wrapper, indicator, re = /(\d+)","#808080/i;
		for (var i = items.length - 1; i >= 0; i--) {
			// Get level
			level = items[i].getElementsByTagName("div")[1].dataset.tooltip.match(re)[1];
			// Create level indicator
			indicator = document.createElement("div");
			indicator.className = "gca_item_level";
			indicator.style.backgroundImage = "url(img/premium/box/amount.png)";
			indicator.style.backgroundSize = "contain";
			indicator.title = level_locale;
			indicator.textContent = level;
			// Get wrapper
			wrapper = items[i].parentNode.parentNode.parentNode;
			wrapper.insertBefore(indicator, wrapper.firstChild);
		}
	},

	items3PerLine : function() {
		// Get items
		var itemsNumber = document.forms.length - 1;
		// Get auction element
		var auction = document.getElementById("auction_table");

		// If no autction or many items, return
		if(!auction || items <= 5) return;

		// Add style
		auction.className += "gca-x3columns";

		// Top image
		var top = document.createElement("div");
		top.className = "gca-x3columns-top";
		auction.insertBefore(top, auction.firstChild);

		// Bottom image
		var bottom = document.createElement("div");
		bottom.className = "gca-x3columns-bottom";
		auction.appendChild(bottom);
		
		// Get items td
		var items = auction.getElementsByTagName("td");

		// Every 3rd item
		for(var i = 2; i < itemsNumber; i += 6){
			items[i - 1].parentNode.appendChild(items[i]);
		}
		for(var i = 4; i < itemsNumber; i += 6){
			items[i - 1].parentNode.appendChild(items[i]);
		}
		for(var i = 5; i < itemsNumber; i += 6){
			items[i - 2].parentNode.appendChild(items[i]);
		}
	}

};

(function(){
	// Pre Inject
	gca_auction.preinject();
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_auction.inject();
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
