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
			(gca_options.bool("auction","multi_bids") &&
				this.multiBids());
			(gca_options.bool("auction","extra_item_stats") &&
				this.extraItemStats());
				
			this.levelsYouCanSee();
		}
	},
	
	levelsYouCanSee : function(){
		var playerLvl = parseInt(document.getElementById("header_values_level").textContent);
		var minLvl = Math.floor(playerLvl* 0.75);
		var maxLvl = ( playerLvl+14<Math.ceil(1.25*playerLvl+5.75) )? playerLvl+14 : Math.ceil(1.25*playerLvl+5.75);
		
		var baseElement = document.getElementsByClassName("buildingDesc")[1].getElementsByTagName("p")[0];
		baseElement.appendChild(document.createElement("br"));
		baseElement.appendChild(document.createElement("br"));
		baseElement.appendChild(document.createTextNode(gca_locale.get("auction", "levels_you_can_see", {min : minLvl, max : maxLvl})));
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
			// Render shadow
			gca_tools.item.shadow.add(items[i].getElementsByTagName("div")[1]);
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

	extraItemStats : function() {
		// Run on food section
		var e = document.getElementsByName("itemType")[0];
		if ( e.options[e.selectedIndex].value==7 ){
			// Translations
			healTranslation = unescape(document.getElementById("header_values_hp_bar").dataset.tooltip.match(/"([^:]+):"/)[1]);
			goldTranslation = unescape(document.getElementById("icon_gold").dataset.tooltip.match(/"([^"]+)"/)[1]);
			
			// Get items
			var items = document.getElementById("auction_table").getElementsByClassName("auction_item_div");
			var items2 = document.getElementById("auction_table").getElementsByClassName("auction_bid_div");
			// For each item
			var heal, price, wrapper, indicator, re = / (\d+) /i;
			for (var i = items.length - 1; i >= 0; i--) {
				// Get heal
				heal = parseInt(items[i].getElementsByTagName("div")[1].dataset.tooltip.replace(/ 0 /g,"").match(re)[1]);
				price = parseInt(gca_tools.strings.removeDots(items2[i].getElementsByTagName('div')[1].textContent).match(/(\d+)/i)[1], 10);
				// Create heal per gold indicator
				indicator = document.createElement("div");
				indicator.className = "";
				indicator.style="position: absolute; color: #a2dca5; text-align: center; font-size: 10px; overflow: hidden; margin-top: 80px; width: 64px; text-shadow: rgb(0, 0, 0) 0px 0px 2px;";
				indicator.title = "+"+healTranslation+ " ("+healTranslation+"/"+goldTranslation+")";
				indicator.textContent = "+" + heal +" ("+ Math.round(heal/price*100)/100 +")"; //heal+"/"+price;
				// Get wrapper
				wrapper = items[i];
				wrapper.insertBefore(indicator, wrapper.firstChild);
			}
		}
	},
	
	multiBids : function(){
		// Get item forms
		var itemForms = document.getElementById("auction_table").getElementsByTagName("form");
		for (var i = itemForms.length - 1; i >= 0; i--) {
			// Each item
			document.getElementById("auction_table").getElementsByTagName("form")[i].getElementsByTagName("input")[7].setAttribute("type","button");
			document.getElementById("auction_table").getElementsByTagName("form")[i].getElementsByTagName("input")[7].setAttribute("id", itemForms[i].id.match(/\d+/) );
			document.getElementById("auction_table").getElementsByTagName("form")[i].getElementsByTagName("input")[7].addEventListener('click',function(){gca_auction.bidItem(this.id);},false);
		}
	},
	
	bidItem : function(id){
		data = document.getElementById("auctionForm"+id).getElementsByTagName("input");
		price = parseInt( data[6].value );
		gold = parseInt( document.getElementById("sstat_gold_val").textContent.replace(/ /g,'').replace(/\./g,'') );
		
		post_data = "auctionid="+ data[0].value +"&qry="+ data[1].value +"&itemType="+ data[2].value +"&itemLevel="+ data[3].value +"&itemQuality="+ data[4].value +"&buyouthd="+ data[5].value +"&bid_amount="+price+"&bid="+ data[7].value ;
		
		//Create Spinner
		spinner = document.createElement("img");
		spinner.src = "img/ui/spinner.gif";
		spinner.id = "spinner"+id;
		spinner.style = "position: absolute;margin-top: -90px;margin-left: 115px;margin-right: 115px;height: 40px;";
		document.getElementById("auctionForm"+id).appendChild(spinner);
		
		// Post to the server
		jQuery.ajax({
			type: "POST",
			url:  document.getElementById("auctionForm"+id).getAttribute('action'),
			data: post_data,
			success: function(content){
				document.getElementById("auctionForm"+id).removeChild(document.getElementById("spinner"+id));
				if( content.match(/message fail">([^<]+)<\/div/i) ){
					gca_notifications.error( content.match(/message fail">([^<]+)<\/div/i)[1] );
				}else if( content.match(/message success">([^<]+)<\/div/i) ){
					gca_notifications.success( content.match(/message success">([^<]+)<\/div/i)[1] );
					document.getElementById("sstat_gold_val").textContent = gca_tools.strings.insertDots(gold-price);
					document.getElementById("auctionForm"+id).getElementsByClassName("auction_bid_div")[0].getElementsByTagName("div")[0].setAttribute('style','color: blue;height: 48px;');
					document.getElementById("auctionForm"+id).getElementsByClassName("auction_bid_div")[0].getElementsByTagName("div")[1].setAttribute('style','display:none;');
					document.getElementById("auctionForm"+id).getElementsByClassName("auction_bid_div")[0].getElementsByTagName("div")[0].textContent = content.match(/message success">([^<]+)<\/div/i)[1];
					document.getElementById("auctionForm"+id).getElementsByTagName("input")[6].value = Math.floor(price*1.05)+1;
					document.getElementById("auctionForm"+id).getElementsByTagName("input")[6].setAttribute("style","");
					
				}else{
					gca_notifications.error(gca_locale.get("general", "error"));
				}
			},
			error: function(){
				gca_notifications.error(gca_locale.get("general", "error"));
			}
		});
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
		// Menu over bug - Semi fix
		document.getElementById("main_inner").getElementsByTagName("article")[0].style = "min-height:379px";
		
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
