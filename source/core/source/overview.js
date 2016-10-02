/*
 * Addon Overview Script
 * Author: DarkThanos, GreatApo
 */

// Overview
var gca_overview = {
	inject : function(){

		// Resolve Page
		this.overviewResolve();

		// Food life gain predict
		(this.doll == 1 && gca_options.bool("overview", "food_life_gain") && 
			this.foodStuff.lifeGain());

		// Hilight best food to consume
		(this.doll == 1 && gca_options.bool("overview", "best_food") && 
			this.foodStuff.bestFood());

		// Bag manager
		(gca_options.bool("overview", "bag_manager") && 
			this.inventory_manager.inject());

		// Daily Bonus Log
		(gca_options.bool("overview", "daily_bonus_log") && 
			this.daily_bonus_log.inject());
	},

	// Resolve Page
	overviewResolve : function(){
		// Default Values
		this.doll = 1;

		var dolls = document.getElementsByClassName('charmercsel');
		for (var i = 0; i < dolls.length; i++) {
			if(dolls[i].className == "charmercsel charmercsel_aktive"){
				this.doll = i+1;
				break;
			}
		}
	},

	// Food Life gain predict on mouse over
	foodStuff : {

		// Life variables
		life : [0, 0, 0],
		info : null,
		bar : null,

		// Inject
		lifeGain : function(){
			// Get Life
			if(this.life[1] == 0)
				this.parseLifeTooltip(document.getElementById("header_values_hp_bar").dataset.tooltip);

			// Create info span
			this.info = document.createElement('span');
			this.info.className = "charstats_value";
			this.info.style = "margin-right: -20px;margin-top: -6px;font-size: 10px;";
			document.getElementById('char_leben_tt').appendChild(this.info);
			// Create space bar
			this.spaceBar = document.createElement('div');
			this.spaceBar.className = "charstats_balken_leben";
			this.spaceBar.style = "width:0%;float:right;background-image:none;";
			document.getElementById("char_leben_balken").parentNode.insertBefore(this.spaceBar, document.getElementById("char_leben_balken"));
			// Create extend bar
			this.bar = document.createElement('div');
			this.bar.className = "charstats_balken_leben";
			this.bar.style = "width:0%;float:right;background-image:url(img/energie_gruen.gif);";
			document.getElementById("char_leben_balken").parentNode.insertBefore(this.bar, document.getElementById("char_leben_balken"));
			
			// Items
			var items = document.getElementById("inv").getElementsByTagName("div");
			// For each item
			for(var i = items.length-1; i>=0; i--){
				// If item is food
				if(this.isItemFood(items[i])){
					// Get tooltip
					let tooltip = JSON.parse(items[i].dataset.tooltip);
					let vitality = 0;
					if(tooltip[0][2][0].match(/\+\d+/i)){
						vitality += parseInt(tooltip[0][1][0].match(/(\d+)/i)[0]);
						vitality += parseInt(tooltip[0][2][0].match(/\+(\d+)/i)[0]);
					}else if(tooltip[0][3][0].match(/\+\d+/i)){
						vitality += parseInt(tooltip[0][2][0].match(/(\d+)/i)[0]);
						vitality += parseInt(tooltip[0][3][0].match(/\+(\d+)/i)[0]);
					}
					if(vitality > 0){
						items[i].dataset.vitality = vitality;
						items[i].addEventListener('mouseover', function(){
							gca_overview.foodStuff.showVitalityGain(this);
						}, false);
						items[i].addEventListener('mouseout', function(){
							gca_overview.foodStuff.hideVitalityGain(this);
						}, false);
					}
				}
			}
			
			// Attach on item grag event
			gca_tools.event.item.onDrag(function(item){
				// If is food
				if(gca_overview.foodStuff.isItemFood(item)){
					// Show life gain
					gca_overview.foodStuff.showVitalityGain(item);
				}
			});
			// Attach on item drop event
			gca_tools.event.item.onDrag(function(item){
				// If is food
				if(gca_overview.foodStuff.isItemFood(item)){
					// Hide life gain
					gca_overview.foodStuff.hideVitalityGain(item);
				}
			});

			// Attach on server response
			gca_tools.event.request.onAjaxResponce(function(r){
				// Update data
				gca_overview.foodStuff.refreshData(r.data);
			});
		},

		// Find the best food
		bestFood : function(){
			// Get Life
			if(this.life[1] == 0)
				this.parseLifeTooltip(document.getElementById("header_values_hp_bar").dataset.tooltip);

			// Find best food
			this.findBestFood();

			// Attach event on request response
			gca_tools.event.request.onAjaxResponce(function(r){
				// Parse life
				if(r.data.header && r.data.header.health && r.data.header.health.tooltip){
					gca_overview.foodStuff.parseLifeTooltip(r.data.header.health.tooltip);
				}
				// Find best food
				gca_overview.foodStuff.findBestFood();
			});
		},

		// Find best food
		bestFoodElement : null,
		findBestFood : function(){
			// Remove old
			if(this.bestFoodElement){
				this.bestFoodElement.style.webkitFilter = 'none';
				this.bestFoodElement = null;
			}

			// If full life return
			if(this.life[2] == 100)
				return;

			// Set max distanse
			var distance = this.life[1]+1;
			var food = null;

			// Items
			var items = document.getElementById("inv").getElementsByTagName("div");
			// For each item
			for(var i = items.length-1; i>=0; i--){
				// If item is food
				if(gca_overview.foodStuff.isItemFood(items[i])){
					// Get tooltip
					let tooltip = JSON.parse(items[i].dataset.tooltip);
					let vitality = 0;
					if(tooltip[0][2][0].match(/\+\d+/i)){
						vitality += parseInt(tooltip[0][1][0].match(/(\d+)/i)[0]);
						vitality += parseInt(tooltip[0][2][0].match(/\+(\d+)/i)[0]);
					}else if(tooltip[0][3][0].match(/\+\d+/i)){
						vitality += parseInt(tooltip[0][2][0].match(/(\d+)/i)[0]);
						vitality += parseInt(tooltip[0][3][0].match(/\+(\d+)/i)[0]);
					}
					if(vitality > 0){
						let thisDistance = Math.abs(this.life[1] - (this.life[0] + vitality));
						if(thisDistance < distance){
							distance = thisDistance;
							food = items[i];
						}
					}
				}
			}

			// Set new food
			this.bestFoodElement = food;
			// Add attribute if food exist
			if(food){
				food.style.webkitFilter = 'drop-shadow(black 0px 0px 1px) drop-shadow(yellow 0px 0px 3px)';
			}
		},

		// Check if item is food
		isItemFood : function(item){
			// Check if food
			if(item.dataset.contentType == "64" && window.getComputedStyle(item).getPropertyValue('background-image').match(/img\/item\/7_\d+\.gif/i)){
				// Is a food
				return true;
			}
			// Not a food
			return false;
		},

		// Parse life tooltip
		parseLifeTooltip : function(tooltip){
			var getLife = JSON.parse(tooltip)[0][0][0][1].match(/(\d+)\s*\/\s*(\d+)/);
			this.life[0] = parseInt(getLife[1]);
			this.life[1] = parseInt(getLife[2]);
			this.life[2] = Math.round(parseInt(getLife[1]) * 100 / parseInt(getLife[2]));
		},

		// Refresh data
		refreshData : function(json){
			// Get Life
			if(json.header && json.header.health && json.header.health.tooltip){
				this.parseLifeTooltip(json.header.health.tooltip);
			}

			// If item was moved
			if(json && json.to && json.to.data){
				// Get item data
				var item = json.to.data;

				// Search for element of this data
				var element = null;
				var items = document.getElementsByClassName('ui-draggable ui-droppable');
				for (var i = items.length - 1; i >= 0; i--) {
					// If items their match ids
					if(items[i].dataset && items[i].dataset && items[i].dataset.itemId == item.itemId){
						element = items[i];
						break;
					}
				}

				// Check if an item was found and is a food
				if(element && gca_overview.foodStuff.isItemFood(element)){
					// Hide the life gain
					element.addEventListener('mouseover', function(){
						gca_overview.foodStuff.showVitalityGain(this);
					}, false);
					element.addEventListener('mouseout', function(){
						gca_overview.foodStuff.hideVitalityGain(this);
					}, false);
				}		
			}
		},

		// Show Item vitality
		showVitalityGain : function(item){
			// Calculate life gain in percent
			var gain = Math.floor((parseInt(item.dataset.vitality) * 100) / this.life[1]);
			// Show life gain
			this.info.textContent = "+" + gain + "%";
			// Calculate max healing
			var lifeLost = 100 - this.life[2];
			// Frame gain inside the posible
			gain = ((lifeLost > gain) ? gain : lifeLost);
			// Show gain bar
			this.bar.style.width = gain + "%";
			this.spaceBar.style.width = (lifeLost - gain) + "%";
		},

		// Hide Item vitality
		hideVitalityGain : function(item){
			// Clear text
			this.info.textContent = "";
			// Hide gain bar
			this.bar.style.width = "0%";
			this.spaceBar.style.width = "0%";
		}
	},

	// Bag Manager
	inventory_manager : {
		// Inject
		inject : function(){
			// Insert Bag Manager button
			var button = document.createElement("input");
			button.className = "awesome-button big";
			button.value = "Inventory Manager";
			document.getElementById("content").appendChild(button);
			// Add on click event
			button.addEventListener("click", function(){
				gca_overview.inventory_manager.open();
			}, false);
		},

		// Inventories
		inv : {
			"tab_1" : {no : 0, name : "I"},
			"tab_2" : {no : 1, name : "II"},
			"tab_3" : {no : 2, name : "III"},
			"tab_4" : {no : 3, name : "IV"},
			"tab_5" : {no : 4, name : "V"},
			"tab_6" : {no : 5, name : "VI"},
			"tab_7" : {no : 6, name : "VII"},
			"tab_8" : {no : 7, name : "VIII"}
		},

		// Open Bag manager
		open : function(){
			// Scroll to top
			window.scrollTo(0, 0);
			// Hide page's content
			var content = document.getElementById("content");
			content.style.display = "none";

			// Create a new content
			var content_2nd = document.createElement("div");
			content_2nd.id = "content_2nd";
			// TODO - CSS implement
			content_2nd.style = "width: 540px;float: right;padding-top: 5px;padding-right: 87px;padding-bottom: 0;padding-left: 23px;z-index: 10;";
			content.parentNode.insertBefore(content_2nd, content.nextSibling);

			var manager_div = document.createElement("div");
			manager_div.className = "inv_manager_wrapper";
			content_2nd.appendChild(manager_div);


			// Clear inventories
			for(let i in this.inv){
				// Inv elements object create
				this.inv[i].elements = {};
				// Inv box element
				this.inv[i].elements.box = document.createElement("div");
				this.inv[i].elements.box.className = "inv_manager_box";
				// Inv tab element
				this.inv[i].elements.tab = document.createElement("div");
				this.inv[i].elements.tab.className = "inv_manager_tab";
				this.inv[i].elements.tab.textContent = this.inv[i].name;
				this.inv[i].elements.box.appendChild(this.inv[i].elements.tab);
				// Inv inv element
				this.inv[i].elements.bag = document.createElement("div");
				this.inv[i].elements.bag.className = "inv_manager_inv";
				this.inv[i].elements.box.appendChild(this.inv[i].elements.bag);
				// Inv inv loading
				this.inv[i].elements.loading = document.createElement("div");
				this.inv[i].elements.loading.className = "inv_manager_inv_loading loading";
				this.inv[i].elements.box.appendChild(this.inv[i].elements.loading);

				// Inventory items
				this.inv[i].items = [];

				// Append box in content
				manager_div.appendChild(this.inv[i].elements.box);
			};

			// Clear float
			var clearFloat = document.createElement("div");
			clearFloat.style.clear = "both";
			manager_div.appendChild(clearFloat);

			// Active tab
			var activeTab = document.getElementById('inventory_nav').getElementsByClassName('current')[0];
			activeTab = Array.prototype.indexOf.call(activeTab.parentNode.children, activeTab);

			// Get active invs
			var notLoaded = 0;
			for(let i in this.inv){
				// Not loaded yet
				notLoaded++;
				// Request
				jQuery.get(gca_getPage.link({"mod":"overview","inv":this.inv[i].no}), function(content){
					gca_overview.inventory_manager.parseInventory(content, i);
					notLoaded--;
					if(notLoaded <= 0){
						jQuery.get(gca_getPage.link({"mod":"overview","inv":activeTab}));
					}
				});
			}

		},

		// Parse items from html code
		parseInventory : function(content, i = false){
			var content = content.split('<div id="inv" ');
			if(content.length < 2) return;
			content = '<div id="inv" ' + content[1];
			// Get Inv
			var inv = content.match(/<div id="inv"\s*data-container-number="([^"]*)"\s*data-content-type-accept="([^"]*)"\s*(data-no-remove="true"|)\s*class="([^"]*)"\s*style="([^"]*)">/im);
			var box = this.inv[i].elements.bag;
			box.dataset.containerNumber = inv[1];
			box.dataset.contentTypeAccept = inv[2];
			if(inv[3].length > 0)
				box.dataset.noRemove = "true";
			box.className += " " + inv[4];

			// Get Items
			var items = content.match(/<div style="left:(\d+)px;top:(\d+)px;width:(\d+)px;height:(\d+)px;background-image:([^"]+)" class="ui-draggable ui-droppable" data-content-type="([^"]+)" (data-content-type-accept="[^"]+" |)data-content-size="([^"]+)" data-enchant-type="([^"]+)" data-item-id="([^"]+)" data-price-gold="([^"]+)" data-tooltip="([^"]+)"[^>]*><\/div>/mg);
			if(!items) items = [];
			for(let j=0; j<items.length; j++){
				this.parseItem(items[j], i);
			}
			this.inv[i].elements.loading.style.display = "none";
		},

		// Datasets on items
		itemDataset : {
			"content-type-accept" : "contentTypeAccept",
			"content-type" : "contentType",
			"content-size" : "contentSize",
			"enchant-type" : "enchantType",
			"item-id" : "itemId",
			"price-gold" : "priceGold",
			"tooltip" : "tooltip",
			"comparison-tooltip" : "comparisonTooltip",
			"soulbound-to" : "soulboundTo",
			"level" : "level",
			"quality" : "quality",
			"hash" : "hash",
			"amount" : "amount",
			"position-x" : "positionX",
			"position-y" : "positionY",
			"measurement-x" : "measurementX",
			"measurement-y" : "measurementY",
			"basis" : "basis",
			"usable-with-basis" : "usableWithBasis"
		},

		// Parse items from html code
		parseItem : function(item_code, inv = false){
			var temp;
			var item = document.createElement('div');
			
			// Get Style
			temp = item_code.match(/style="([^"]*)"/);
			if(temp) item.style = temp[1];
			// Get Class
			temp = item_code.match(/class="([^"]*)"/);
			if(temp) item.className = temp[1];

			// Get datasets
			for(let name in this.itemDataset){
				temp = item_code.match(new RegExp("data-" + name + '="([^"]*)"',"i"));
				if(temp) item.dataset[this.itemDataset[name]] = temp[1].replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
			}
			//item.dataset.tooltip = JSON.stringify( JSON.parse(item.dataset.tooltip) );

			if(inv && this.inv[inv]){
				this.inv[inv].items.push(item);
				this.inv[inv].elements.bag.appendChild(item);
				window.makeDraggable(item);
			}

			return item;
		}
	},

	// Log the Daily Bonus
	daily_bonus_log : {
		// Inject
		inject : function(){
			// If daily bonus
			(document.getElementById('blackoutDialogLoginBonus') != null && 
				this.saveBonus());

			// Display data
			this.showData();
		},

		// Save bonus
		saveBonus : function(){
			// Get wrapper
			var wrapper = document.getElementById('blackoutDialogLoginBonus');
			
			// Get title
			var title = document.getElementById('header_LoginBonus').textContent;
			var description = wrapper.getElementsByClassName('loginbonus_description')[0].textContent;

			// Get bonus
			var bonus_box = wrapper.getElementsByClassName('loginbonus_bonus');
			var bonus = [];
			var daysleft = -1;

			// For each reward
			for (var i = bonus_box.length - 1; i >= 0; i--) {
				// Get reward data
				var bonus_item = {
					img : bonus_box[i].getElementsByTagName('img')[0].src,
					text : bonus_box[i].getElementsByClassName('loginbonus_text')[0].textContent,
					tooltip : false
				};
				// Check if reward is collected
				var icon = bonus_box[i].getElementsByClassName('loginbonus_icon')[0];
				if(icon.dataset.tooltip){
					bonus_item.tooltip = icon.dataset.tooltip;
				}
				// Not collected
				else{
					daysleft++;
				}
				
				// Store data
				bonus.unshift(bonus_item);
			}

			// Fix dates
			if(daysleft < 0)
				daysleft = 0;

			var day = 24*60*60*1000;
			var bonusEndDate = new Date(gca_tools.time.server() + daysleft * day);
			bonusEndDate = new Date(bonusEndDate.getFullYear(), bonusEndDate.getMonth(), bonusEndDate.getDate()).getTime() + day - 1;
			
			// Save expiration timestamp
			gca_data.section.set('overview', 'daily_bonus_ends', bonusEndDate);
			// Save data
			gca_data.section.set('overview', 'daily_bonus_data', bonus);
			// Save title/description
			gca_data.section.set('overview', 'daily_bonus', {
				title : title,
				description : description
			});
		},

		// Show daily bonus data
		showData : function(){
			// Get title/subtitle
			var bonus = gca_data.section.get('overview', 'daily_bonus', false);
			// If no data return
			if(!bonus) return;

			// Get Ends date
			var bonusEndDate = gca_data.section.get('overview', 'daily_bonus_ends', 0);
			// If bonus has expired, return
			if(bonusEndDate < gca_tools.time.server()) return;

			// Get data
			var data = gca_data.section.get('overview', 'daily_bonus_data', []);
			var collected = 0;

			// Create container
			var container = document.createElement("div");
			container.className = "contentItem daily_bonus_log";
			var title = document.createElement("h3");
			title.textContent = bonus.title;
			container.appendChild(title);

			var wrapper = document.createElement("div");
			wrapper.className = "contentItem_content";

			// For each bonus
			var boxes = [];
			for(var i = 0; i < data.length; i++){
				// Bonus box
				var box = document.createElement("div");
				box.className = "bonus-box";
				// Image of bonus
				var img = document.createElement("img");
				img.src = data[i].img;
				box.appendChild(img);
				// Display day of week
				var day = document.createElement("div");
				day.className = "bonus-day";
				day.textContent = data[i].text;
				box.appendChild(day);

				// If collected
				if(data[i].tooltip){
					// Show tooltip
					gca_tools.setTooltip(img, data[i].tooltip);
					collected++;
				}
				// If not
				else{
					// Set it as not collected
					img.className = "notcollected";
				}
				wrapper.appendChild(box);
				boxes.push(box);
			}
			container.appendChild(wrapper);

			// Title info
			var info = document.createElement("span");
			info.textContent = "(" + collected + "/" + data.length + ")";
			title.appendChild(info);

			// Mystery bonus info
			if(collected < 6){
				var mystery = document.createElement("div");
				mystery.className = "mystery-info";
				mystery.textContent = collected + "/6";
				boxes[boxes.length-1].appendChild(mystery);
				boxes[boxes.length-1].className += " mystery";
				gca_tools.setTooltip(boxes[boxes.length-1], JSON.stringify([[[bonus.description, "white"]]]));
			}

			// Next Bonus timer
			if(collected < 7){
				var nextBonusDate = new Date(gca_tools.time.server());
				nextBonusDate = new Date(nextBonusDate.getFullYear(), nextBonusDate.getMonth(), nextBonusDate.getDate()).getTime() + 24*60*60*1000 - 1;
				this.nextBonusTimer(boxes[collected], nextBonusDate - gca_tools.time.server());
			}

			document.getElementById("content").appendChild(container);
		},

		nextBonusTimer : function(box, time){
			// Create div
			var div = document.createElement("div");
			div.className = "timer-info";
			div.textContent = gca_tools.time.msToHMS_String(time);
			box.appendChild(div);

			// Count down
			var countDown = setInterval(function(){
				time -= 1000;
				if(time > 0){
					div.textContent = gca_tools.time.msToHMS_String(time);
				}
				else{
					clearInterval(countDown);
					div.textContent = gca_tools.time.msToHMS_String(0);
				}
			}, 1000);
		}
	}
};

(function(){
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_overview.inject();
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