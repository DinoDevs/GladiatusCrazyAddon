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
			/* (gca_options.bool("auction","item_level") && 
				this.itemsLevelShow()); */
			(gca_options.bool("auction","item_name") && 
				this.itemsNameShow());
			(gca_options.bool("auction","x3_items_per_line") && 
				this.items3PerLine());
			(gca_options.bool("auction","multi_bids") &&
				this.multiBids());
			(gca_options.bool("auction","extra_item_stats") &&
				this.extraItemStats());
			(gca_options.bool("auction","item_sort_functions") &&
				this.itemsSort.init());
			
			this.saveMercenaryRealNames();
		}
		
		(gca_options.bool("auction","more_search_levels") &&
			this.moreSearchLevels());
		(gca_options.bool("auction","save_last_state") &&
			this.saveLastState());

		// Levels you can see
		this.levelsYouCanSee();
			
		// Setting Link
		gca_tools.create.settingsLink("auction");
	},
	
	levelsYouCanSee : function(){
		let playerLvl = parseInt(document.getElementById("header_values_level").textContent);
		let minLvl = Math.floor(playerLvl* 0.75);
		let maxLvl = ( playerLvl+14<Math.ceil(1.25*playerLvl+5.75) )? playerLvl+14 : Math.ceil(1.25*playerLvl+5.75);
		
		let baseElement = document.getElementsByClassName("buildingDesc")[1].getElementsByTagName("p")[0];
		baseElement.appendChild(document.createElement("br"));
		baseElement.appendChild(document.createElement("br"));
		baseElement.appendChild(document.createTextNode(gca_locale.get("auction", "levels_you_can_see", {min : minLvl, max : maxLvl})));
	},
	
	moreSearchLevels : function(){
		let playerLvl = parseInt(document.getElementById("header_values_level").textContent);
		let minLvl = Math.floor(playerLvl* 0.75);
		let maxLvl = ( playerLvl+14<Math.ceil(1.25*playerLvl+5.75) )? playerLvl+14 : Math.ceil(1.25*playerLvl+5.75);
		
		let lvl_options_parent = document.getElementsByName('itemLevel')[0];
		
		// Searched level
		let selectedLvl = parseInt(lvl_options_parent.value);
		// Take first level from items if no clue from search option
		if(document.getElementById("auction_table") && minLvl == selectedLvl)
			selectedLvl = parseInt(document.getElementById('auction_table').getElementsByTagName('td')[0].getElementsByTagName('div')[0].textContent);
		if (minLvl%2 != selectedLvl%2)
			selectedLvl--;
		
		// Remove all previous lvl options
		while (lvl_options_parent.firstChild) {
			lvl_options_parent.removeChild(lvl_options_parent.firstChild);
		}
		
		// Create new lvl options
		for(let i = minLvl; i <= maxLvl; i += 2){
			let lvl_option = document.createElement("option");
			lvl_option.value = i;
			lvl_option.textContent = i + " +";
			lvl_options_parent.appendChild(lvl_option);
		}
		
		lvl_options_parent.value = selectedLvl;
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
		for (let i = items.length - 1; i >= 0; i--) {
			// Render shadow
			gca_tools.item.shadow.add(items[i].getElementsByTagName("div")[1]);
		}
	},

	itemsValuesShow : function() {
		let that = this;
		// Create show/hide button
		let filters = document.getElementsByTagName("section")[1];
		let button = document.createElement("a");
		button.className = "gca-auction-show-hide-button";
		button.dataset.tooltip = '[[["'+ gca_locale.get("auction", "hide_your_gold_here") +'","#fff;font-size:12px;"]]]';
		button.addEventListener('click', function(){
			let status = gca_data.section.get("cache", "auction_show_hide_button_status", false);
			gca_data.section.set("cache", "auction_show_hide_button_status", !status );
			that.showHideNonHideYourGoldItems(this, !status);
		} , false);
		filters.appendChild(button);
		filters.appendChild(document.createElement("br"));
		
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
		
		// Set button status
		// True = hide items, False = do not hide
		let status = gca_data.section.get("cache", "auction_show_hide_button_status", false);
		if ( status )
			this.showHideNonHideYourGoldItems(button, status);
		else
			button.style.filter = "grayscale(100%)";
	},
	
	showHideNonHideYourGoldItems : function(that, status) {
		// Show/hide items
		if ( status == true ){
			jQuery(".auction_bid_div:not(:has(.gca-auction-good-price))").closest("td").hide();
			jQuery('input[name ="buyout"]').hide();
			that.style.filter = "grayscale(0%)";
		}else{
			jQuery(".auction_bid_div:not(:has(.gca-auction-good-price))").closest("td").show();
			jQuery('input[name ="buyout"]').show();
			that.style.filter = "grayscale(100%)";
		}
	},

	itemsNameShow : function() {
		// Get items
		var items = document.getElementById("auction_table").querySelectorAll(".auction_item_div > div > div");
		var bidItems = document.getElementById("auction_table").querySelectorAll(".auction_bid_div");
		// For each item
		for (var i = items.length - 1; i >= 0; i--) {
			let itemName = JSON.parse(items[i].dataset.tooltip)[0][0][0];
			let itemColor = JSON.parse(items[i].dataset.tooltip)[0][0][1].split(';')[0].replace('lime', 'green');

			// Create name div
			indicator = document.createElement("div");
			indicator.textContent = itemName;
			indicator.style.color = itemColor;
			// Get wrapper
			wrapper = bidItems[i];
			wrapper.insertBefore(indicator, wrapper.children[2]);
		}
	},

	/*
	//Item levels are shown on the items it self, feature is no longer needed
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
			indicator.style.backgroundImage = 'url(' + gca_tools.img.cdn('img/premium/box/amount.png') + ')';
			indicator.style.backgroundSize = "contain";
			indicator.title = level_locale;
			indicator.textContent = level;
			// Get wrapper
			wrapper = items[i].parentNode.parentNode.parentNode;
			wrapper.insertBefore(indicator, wrapper.firstChild);
		}
	},
	*/

	extraItemStats : function() {
		// Run on food section
		var e = document.getElementsByName("itemType")[0];
		if (e.options[e.selectedIndex].value == 7) {
			// Translations
			let healTranslation = unescape(document.getElementById("header_values_hp_bar").dataset.tooltip.match(/"([^:]+):"/)[1]);
			let goldTranslation = unescape(document.getElementById("icon_gold").dataset.tooltip.match(/"([^"]+)"/)[1]);
			
			// Get items
			var items = document.getElementById("auction_table").getElementsByClassName("auction_item_div");
			var items2 = document.getElementById("auction_table").getElementsByClassName("auction_bid_div");
			// For each item
			var heal, price, wrapper, indicator, re = / (\d+) /i;
			for (let i = items.length - 1; i >= 0; i--) {
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

	saveMercenaryRealNames : function(){
		// Run mercenaries section only
		var e = document.getElementsByName("itemType")[0];
		if (e.options[e.selectedIndex].value != 15)
			return;

		// If global script not loaded yet
		if (!gca_global) {
			// Run again later
			setTimeout(() => {
				this.saveMercenaryRealNames();
			}, 100);
			return;
		}

		// Get cached names
		let cachedMercenaryNamesLocale = gca_data.section.get('cache', 'mercenary_names_locale', gca_global.display.analyzeItems.mercenaries.names);
		
		// Get items
		var items = document.getElementById("auction_table").querySelectorAll(".auction_item_div > div > div");
		// For each item
		var newNameFound = false;
		for (let i = items.length - 1; i >= 0; i--) {
			// Get hash
			let hash = gca_tools.item.hash(items[i]);
			if (!hash) continue;
			
			let name = JSON.parse(items[i].dataset.tooltip)[0][0][0];

			if ( hash.subcategory <= cachedMercenaryNamesLocale.length ){
				if (name != cachedMercenaryNamesLocale[hash.subcategory-1]){ // new locale?
					console.log(`GCA: Found mercenary name locale to cache (${hash.subcategory} : ${cachedMercenaryNamesLocale[hash.subcategory-1]} = ${name})`)
					cachedMercenaryNamesLocale[hash.subcategory-1] = name;
					newNameFound = true;
				}
			}else{
				console.log(`GCA: Unknown mercenary subcategory (${hash.subcategory} : n/a = ${name})`);
			}
		}

		if (newNameFound)
			gca_data.section.set('cache', 'mercenary_names_locale', gca_global.display.analyzeItems.mercenaries.names);
	},
	
	multiBids : function(){
		// Get item forms
		var itemforms = document.getElementById("auction_table").getElementsByTagName("form");
		// For each item
		for (let i = itemforms.length - 1; i >= 0; i--) {
			let id = itemforms[i].id.match(/\d+/)[0];
			let button = itemforms[i].getElementsByTagName("input")[7];
			button.setAttribute("type","button");
			button.addEventListener('click', () => {
				this.bidItem(id);
			},false);
		}
	},
	
	bidItem : function(id){
		var itemform = document.getElementById("auctionForm"+id);
		var inputs = itemform.getElementsByTagName("input");
		var price = parseInt(inputs[6].value, 10);
		
		// Create dataset time in gold
		document.getElementById("sstat_gold_val").dataset.updateTime = 0;
		
		var data = 
			"auctionid=" + inputs[0].value +
			"&qry=" + inputs[1].value +
			"&itemType=" + inputs[2].value +
			"&itemLevel=" + inputs[3].value +
			"&itemQuality=" + inputs[4].value +
			"&buyouthd=" + inputs[5].value +
			"&bid_amount=" + price +
			"&bid="+ inputs[7].value;
		
		//Create Spinner
		var spinner = document.createElement("img");
		spinner.src = gca_tools.img.cdn("img/ui/spinner.gif");
		spinner.id = "spinner"+id;
		spinner.style = "position:absolute;margin-top:-90px;margin-left:115px;margin-right:115px;height:40px;";
		itemform.appendChild(spinner);
		
		// Post to the server
		jQuery.ajax({
			type: "POST",
			url:  itemform.getAttribute('action'),
			data: data,
			success: function(content){
				// Remove spinner
				itemform.removeChild(spinner);

				// Get status
				let status = 
					content.match(/message fail">([^<]+)<\/div/i) ? 'failed' :
					(content.match(/message success">([^<]+)<\/div/i) ? 'success' :
					'unknown');

				// Update gold info
				if (status != 'unknown') {
					let time = gca_tools.time.ajaxServer(content);
					let gold = document.getElementById("sstat_gold_val");
					if (parseInt(gold.dataset.updateTime, 10) < time){
						gold.textContent = content.match(/id="sstat_gold_val">([^<]+)<\/div>/i)[1];
						gold.dataset.updateTime = time;
					}
				}

				// If Bid failed
				if (status == 'failed') {
					// Notification
					gca_notifications.error(content.match(/message fail">([^<]+)<\/div/i)[1]);
				}

				// If Bid was success full
				else if (status == 'success'){
					let message = content.match(/message success">([^<]+)<\/div/i)[1];
					// Notification
					gca_notifications.success(message);
					let divs = itemform.getElementsByClassName("auction_bid_div")[0].getElementsByTagName("div");
					divs[0].style.color = 'blue';
					jQuery(divs[0]).height( jQuery(divs[0]).height()+jQuery(divs[1]).height()) ; // hardcode original height to avoid changing height
					divs[0].textContent = message;
					divs[1].style.display = 'none';
					inputs[6].value = Math.floor(price * 1.05) + 1;
					inputs[6].removeAttribute("style");
					// Disable button
					inputs[7].setAttribute('disabled', 'disabled');
				}

				// Unknown error
				else {
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

		// If no auction or not many items, return
		if(!auction || items <= 5) return;

		// Add style
		auction.className += "gca-x3columns";
		// Menu over bug - Semi fix
		//document.getElementById("main_inner").getElementsByTagName("article")[0].style = "min-height:468px";
		
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
		var i;
		for(i = 2; i < itemsNumber; i += 6){
			items[i - 1].parentNode.appendChild(items[i]);
		}
		for(i = 4; i < itemsNumber; i += 6){
			items[i - 1].parentNode.appendChild(items[i]);
		}
		for(i = 5; i < itemsNumber; i += 6){
			items[i - 2].parentNode.appendChild(items[i]);
		}

		// Keep table on the correct spot
		let content = document.getElementById("content");
		// Get pointer to children
		let children = [];
		let getchildren = document.getElementById("content").childNodes;
		for (let i = 0; i < getchildren.length; i++) {
			children.push(getchildren[i]);
		}
		// Create one block with minimum height
		let div = document.createElement("div");
		div.style.minHeight = "730px";
		content.prepend(div);

		// Insert all elements in the block up to the auction
		for (i = 0; i < children.length; i++) {
			if (auction === children[i]) {
				break;
			} else {
				div.append(children[i]);
			}
		}
	},

	saveLastState : function() {
		let form = document.getElementsByName('filterForm')[0];
		let type = gca_getPage.parameter('ttype') != 3 ? 'gladiator' : 'mercenary';

		// Handle a search action
		form.addEventListener('submit', () => {
			let data = {
				mod : 'auction',
				// Ignore doll because this will change the selected doll
				//doll : form.doll.value,
				qry : form.qry.value,
				itemLevel : form.itemLevel.value,
				itemType : form.itemType.value,
				itemQuality : form.itemQuality.value
			};
			if (type == 'mercenary') data.ttype = 3;
			gca_data.section.set('cache', 'auction_last_search_' + type, data);
		});

		// Update Tabs
		let tabs = document.getElementById('mainnav').getElementsByTagName('a');
		tabs[0].href = gca_getPage.link(gca_data.section.get('cache', 'auction_last_search_gladiator', {mod : 'auction'}));
		tabs[1].href = gca_getPage.link(gca_data.section.get('cache', 'auction_last_search_mercenary', {mod : 'auction', ttype : '3'}));
	},
	

	// Initiate item sort
	itemsSort : {
		init : function() {
			this.initKeywordMap();
			this.parseItems();
			this.injectSection();
		},

		initKeywordMap: function () {
			this.keywordMap = {};
			let locale = gca_data.section.get("overview", 'stats_locale', null);
			if (locale) {
				// Damage
				let damage = locale.damage.split(' ')[0].toLowerCase();
				this.keywordMap[damage.toLowerCase()] = {
					name: damage,
					display: locale.damage,
					pattern: /(:?\d+ - )*(-?\d+)/, // match weapons and other items
					// the "-" sign should be inside capturing group for negative values
				};
				// Armour
				let armour = locale.armour.split(' ')[0].toLowerCase();
				this.keywordMap[armour] = {
					name: armour,
					display: locale.armour,
					pattern: /-?\d+/,
				};
				// strength
				let strength = locale.strength.split(' ')[0].toLowerCase();
				this.keywordMap[strength] = {
					name: strength,
					display: locale.strength,
					pattern: /-?\d+\)*$/,
				};
				// Agility
				let agility = locale.agility.split(' ')[0].toLowerCase();
				this.keywordMap[agility] = {
					name: agility,
					display: locale.agility,
					pattern: /-?\d+\)*$/,
				};
				// dexterity
				let dexterity = locale.dexterity.split(' ')[0].toLowerCase();
				this.keywordMap[dexterity] = {
					name: dexterity,
					display: locale.dexterity,
					pattern: /-?\d+\)*$/,
				};
				// constitution
				let constitution = locale.constitution.split(' ')[0].toLowerCase();
				this.keywordMap[constitution] = {
					name: constitution,
					display: locale.constitution,
					pattern: /-?\d+\)*$/,
				};
				// charisma
				let charisma = locale.charisma.split(' ')[0].toLowerCase();
				this.keywordMap[charisma] = {
					name: charisma,
					display: locale.charisma,
					pattern: /-?\d+\)*$/,
				};
				// intelligence
				let intelligence = locale.intelligence.split(' ')[0].toLowerCase();
				this.keywordMap[intelligence] = {
					name: intelligence,
					display: locale.intelligence,
					pattern: /-?\d+\)*$/,
				};
				// healing
				let healing = locale.healing.split(' ')[0].toLowerCase();
				this.keywordMap[healing] = {
					name: healing,
					display: locale.healing,
					pattern: /-?\d+/,
				};
				// life_points
				let life_points = locale.life_points.split(' ')[0].toLowerCase();
				this.keywordMap[life_points] = {
					name: life_points,
					display: locale.life_points,
					pattern: /-?\d+/,
				};
				// threat
				let threat = locale.threat.split(' ')[0].toLowerCase();
				this.keywordMap[threat] = {
					name: threat,
					display: locale.threat,
					pattern: /-?\d+/,
				};
			} else {
				locale = {
					level : jQuery('#icon_level').data().tooltip[0][0][0]
				};
			}
			
			if (locale.level) {
				let level = locale.level.split(' ')[0].toLowerCase();
				this.keywordMap[level] = {
					name: level,
					display: locale.level,
					pattern: /\d+/,
				};
			}
		},
	
		// Parse tooltip of each auction item and set parsed data to item's container
		parseItems: function () {
			let that = this;
			jQuery("#auction_table td:has(form)").each(function () {
				let itemElement = jQuery(this).find(".ui-draggable").first();
				let itemData = that.parseItemData(itemElement);
				let frm = jQuery(this).find("form").first();
				jQuery.each(itemData, function (key, val) {
					jQuery(frm)[0].dataset["item_" + key] = val;
				});
			});
		},
		parseItemData: function (itemElement) {
			let itemData = {};
			let props = jQuery(itemElement).data().tooltip[0];
			itemData["name"] = props[0][0];
			for (let i = 1; i < props.length; i++) {
				let prop = props[i][0];
				// if prop has durability bonus, it's an array so we get first element
				if (Array.isArray(prop)) {
					prop = prop[0];
				}

				//let propName = decodeURIComponent(JSON.parse("\""+prop.split(" ")[0]+"\"")).toLowerCase();
				let propName = prop.split(" ")[0].toLowerCase();
				let kw = this.keywordMap[propName];
				
				// If not found try to find a generic
				if (!kw) {
					// Gather other stats locale with values (+)
					let match = prop.match(/\s\+/);
					if (match) {
						// Use full name
						propName = prop.split(/\s\+/)[0].toLowerCase().replace(/\s/g, "-");
						propName = gca_tools.strings.toUTF8String(propName); // convert to valid DOM name (fix for special characters for other languages)
						// Search if already saved
						kw = this.keywordMap[propName];
						
						if (!kw){
							// Save generic
							let propNameLocale = prop.split(/\s\+/)[0];
							//console.log(propName)
							this.keywordMap[propName] = {
								name: propName,
								display: propNameLocale.charAt(0).toUpperCase() + propNameLocale.slice(1), // First letter capital
								pattern: /\d+/,
							};
							kw = this.keywordMap[propName];
						}
					}
				}
				
				//console.log(propName+" -> "+kw);
				if (kw) {
					let match = prop.match(kw.pattern);
					if (match) {
						let val = match[match.length - 1];
						let floatVal = parseFloat(val);
						if (isNaN(floatVal)) {
							itemData[kw.name] = val;
						}
						else {
							itemData[kw.name] = floatVal;
						}
					}
				}
			}

			// if item doesn't have sort property, add that property with value 0
			/*//This is not needed any more because if the dataset is undefined, it is set to 0
			jQuery.each(this.keywordMap, function (key, val) {
				if (itemData[key] == undefined) {
					itemData[key] = 0.0;
				}
			});*/

			return itemData;
		},

		// Create sort menu / options
		injectSection: function () {
			let sectionHeader = this.createSectionHeader();
			let section = this.createSection();
			let filterSection = jQuery("form[name='filterForm']").closest("section");

			jQuery(filterSection).after(jQuery(section));
			jQuery(filterSection).after(jQuery(sectionHeader));
		},
		
		createSectionHeader: function () {
			let h2 = document.createElement("h2");
			h2.className = "section-header";
			h2.id = "gca-auction-sort-section-header";
			h2.style.cursor = "pointer";
			h2.textContent = gca_locale.get("auction", "sort");

			h2.addEventListener("click", function () {
				jQuery("#gca-auction-sort-section").toggle();
			}, false);
			return h2;
		},
		
		createSection: function () {
			let button, select, tr, td, defVal, selectVal;
			let section = document.createElement("section");
			section.id = "gca-auction-sort-section";
			section.style.display = "block";

			// create form
			let form = document.createElement("form");

			let table = document.createElement("table");
			table.border = "0";
			table.style.textAlign = "center";
			table.style.marginLeft = "auto";
			table.style.marginRight = "auto";
			let tbody = document.createElement("tbody");

			// sortBy select
			tr = document.createElement("tr");
			td = document.createElement("td");
			td.style.width = "50%";
			td.style.textAlign = "center";
			td.textContent = gca_locale.get("auction", "sort_by");
			tr.appendChild(td);

			td = document.createElement("td");
			select = document.createElement("select");
			select.id = "gca-auction-sort-select";

			// add sort keywords to select
			jQuery.each(this.keywordMap, function (key, val) {
				let option = document.createElement("option");
				option.text = val.display;
				option.value = val.name;
				select.add(option);
			});

			defVal = select.options[0].value;
			selectVal = gca_data.section.get("cache", "auction-sort-value", defVal);
			jQuery(select).val(selectVal);
			select.addEventListener("change", function(){
				gca_data.section.set("cache", "auction-sort-value", this.value);
			});

			td.appendChild(select);
			tr.appendChild(td);
			tbody.appendChild(tr);

			// order select
			tr = document.createElement("tr");
			td = document.createElement("td");
			td.style.width = "50%";
			td.style.textAlign = "center";
			td.textContent = gca_locale.get("auction", "sort_order");
			tr.appendChild(td);

			td = document.createElement("td");
			select = document.createElement("select");
			select.id = "gca-auction-sort-order-select";
			let option = document.createElement("option");
			option.text = gca_locale.get("auction", "desc");
			option.value = "desc";
			select.add(option);
			option = document.createElement("option");
			option.text = gca_locale.get("auction", "asc");
			option.value = "asc";
			select.add(option);

			defVal = select.options[0].value;
			selectVal = gca_data.section.get("cache", "auction-sort-order", defVal);
			jQuery(select).val(selectVal);
			select.addEventListener("change", function(){
				gca_data.section.set("cache", "auction-sort-order", this.value);
			});

			td.appendChild(select);
			tr.appendChild(td);
			tbody.appendChild(tr);

			// sort button
			tr = document.createElement("tr");
			td = document.createElement("td");
			td.colSpan = "2";
			td.style.textAlign = "center";

			button = document.createElement("button");
			button.classList.add("awesome-button");
			button.classList.add("gca-auction-sort-button");
			button.textContent = gca_locale.get("auction", "sort");
			button.type = "button";
			button.addEventListener('click', () => {
				let propName = document.getElementById("gca-auction-sort-select").value;
				let order = document.getElementById("gca-auction-sort-order-select").value;
				this.sortItems(propName, order);
				this.annotateKeywordOnItemTooltips(propName);
			}, false);

			td.appendChild(button);
			tr.appendChild(td);
			tbody.appendChild(tr);

			table.appendChild(tbody);
			form.appendChild(table);
			section.appendChild(form);

			return section;
		},
		
		sortItems: function (propName, order) {
			// Get item containers
			let tds = jQuery('#auction_table td:has(form)');
			// Get item info
			let items = [];
			tds.each((index, item) => {
				let val = jQuery(item).find('form').first()[0].dataset['item_' + propName];
				if (val === undefined)
					val = 0
				items.push({
					value : parseInt(val),
					nodes : [...item.childNodes]
				});
				let text = jQuery(item).find('.gca-auction-sort-value');
				if (!text.length) {
					let div = document.createElement('div');
					div.className = 'gca-auction-sort-value';
					div.textContent = this.keywordMap[propName].display + ' ' + val;
					jQuery(item).find('.auction_item_div>div').append(div);
				}
				else {
					text[0].textContent = this.keywordMap[propName].display + ' ' + val;
				}
			});
			// Sort items
			items = items.sort(function (a, b) {
				if (a.value == b.value) {
					return 0;
				}
				if (order == 'asc') {
					return a.value > b.value ? 1 : -1;
				}
				else {
					return a.value > b.value ? -1 : 1;
				}
			});
			// Place sorted items in containers
			tds.each(function (index, td) {
				let item = items[index];
				for (var i = 0; i < item.nodes.length; i++) {
					td.appendChild(item.nodes[i]);
				}
			});
		},

		annotateKeywordOnItemTooltips: function (keyword) {
			keyword = keyword.toLowerCase();

			jQuery("#auction_table td form .ui-draggable").each(function () {
				let tooltips = jQuery(this).data().tooltip;

				for (let i = 0; i < tooltips.length; i++) {
					let tooltip = tooltips[i];

					for (let j = 0; j < tooltip.length; j++) {
						let prop = tooltip[j];

						// if prop has durability bonus, it's an array so we get first element
						if (Array.isArray(prop[0])) {
							let propName = prop[0][0].split(" ")[0].toLowerCase();
							if (propName == keyword && prop[1][0] !== undefined) {
								prop[1][0] = "orange";
							}
							else if (prop[1][0] == "orange") {
								prop[1][0] = "#DDD";
							}
						}
						else {
							let propName = prop[0].split(" ")[0].toLowerCase();
							if (propName == keyword && prop[1] !== undefined) {
								prop[1] = "orange";
							}
							else if (prop[1] == "orange") {
								prop[1] = "#DDD";
							}
						}
					}
				}

				jQuery(this).data("tooltip", tooltips);
			});
		}
	}

};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_auction.inject();
	};
	gca_auction.preinject();
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_data, gca_getPage, gca_locale, gca_notifications, gca_options, gca_tools */
/* global jQuery */
