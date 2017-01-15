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

		// Highlight best food to consume
		(this.doll == 1 && gca_options.bool("overview", "best_food") && 
			this.foodStuff.bestFood());

		// Make foods that give more life transparent
		(this.doll == 1 && gca_options.bool("overview", "overfeed_food") && 
			this.foodStuff.overFeeding());

		// Daily Bonus Log
		(gca_options.bool("overview", "daily_bonus_log") && 
			this.daily_bonus_log.inject());
		
		// Repair Items Overview
		(gca_options.bool("overview", "repair_materials_info") &&
			this.repair_overview.inject());

		// If Item shadow
		(gca_options.bool("global","item_shadow") && 
			this.itemShadow.inject());
		
		// Display detailed timer in tooltips of the buffs
		(gca_options.bool("overview", "buffs_detailed_time") && 
			this.buffBar.inject());
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
		life : [
			0, // Current life points
			0, // Max life points
			0  // Life percent
		],

		// Elements
		custom_elements : {
			info : null,
			bar : null,
			spaceBar : null
		},

		// Check if item is food
		isItemFood : function(item){
			// Check if food item-i-7-15
			if(item.dataset.contentType == "64" && item.className.match(/item-i-7-\d+/i)){
				// Is a food
				return true;
			}
			// Not a food
			return false;
		},

		// Init life
		initLifeData : function(){
			// Get Life
			if(this.life[1] == 0)
				this.parseLifeTooltip(document.getElementById("header_values_hp_bar").dataset.tooltip);
		},

		// Parse life tooltip
		parseLifeTooltip : function(tooltip){
			var getLife = JSON.parse(tooltip)[0][0][0][1].match(/(\d+)\s*\/\s*(\d+)/);
			this.life[0] = parseInt(getLife[1]);
			this.life[1] = parseInt(getLife[2]);
			this.life[2] = Math.round(parseInt(getLife[1]) * 100 / parseInt(getLife[2]));
		},

		// Parse life request
		parseLifeRequest : function(r){
			if(r.data.header && r.data.header.health){
				if(r.data.header.health.value && r.data.header.health.maxValue){
					this.life[0] = r.data.header.health.value;
					this.life[1] = r.data.header.health.maxValue;
					this.life[2] = Math.round(this.life[0] * 100 / this.life[1]);
				}
				else if(r.data.header.health.tooltip)
					this.parseLifeTooltip(r.data.header.health.tooltip);
			}
		},

		// Keep life data updated
		keepLifeDataUpdated_active : false,
		keepLifeDataUpdated : function(callback){
			// If callback exist
			if(callback && typeof callback == "function")
				gca_tools.event.addListener("overviewFoodLifeChange", callback);

			// If not already setuped
			if(!this.keepLifeDataUpdated_active){
				// Set it done
				this.keepLifeDataUpdated_active = true;
				// Attach event on request response
				gca_tools.event.request.onAjaxResponce(function(r){
					// Parse life
					gca_overview.foodStuff.parseLifeRequest(r);
					// Fire event
					gca_tools.event.fire("overviewFoodLifeChange", r);
				});
			}
		},

		// Get Item's vitality
		getItemVitality : function(item){
			// If item is not food
			if(!this.isItemFood(item))
				return false;

			// Get tooltip
			let tooltip = JSON.parse(item.dataset.tooltip);

			// Initialize vitality to zero
			let vitality = 0;
			
			// Parse vitality (way 1)
			if(tooltip[0][2][0].match(/\+\d+/i)){
				vitality += parseInt(tooltip[0][1][0].match(/(\d+)/i)[0]);
			}
			// or Parse vitality (way 2)
			else if(tooltip[0][3][0].match(/\+\d+/i)){
				vitality += parseInt(tooltip[0][2][0].match(/(\d+)/i)[0]);
			}

			// Return results
			return vitality;
		},

		// Inject
		lifeGain : function(){
			// Get Life
			this.initLifeData();

			// Create info span
			this.custom_elements.info = document.createElement('span');
			this.custom_elements.info.className = "charstats_value";
			this.custom_elements.info.style = "margin-right: -20px;margin-top: -6px;font-size: 10px;";
			document.getElementById('char_leben_tt').appendChild(this.custom_elements.info);
			// Create space bar
			this.custom_elements.spaceBar = document.createElement('div');
			this.custom_elements.spaceBar.className = "charstats_balken_leben";
			this.custom_elements.spaceBar.style = "width:0%;float:right;background-image:none;";
			document.getElementById("char_leben_balken").parentNode.insertBefore(this.custom_elements.spaceBar, document.getElementById("char_leben_balken"));
			// Create extend bar
			this.custom_elements.bar = document.createElement('div');
			this.custom_elements.bar.className = "charstats_balken_leben";
			this.custom_elements.bar.style = "width:0%;float:right;background-image:url(img/energie_gruen.gif);";
			document.getElementById("char_leben_balken").parentNode.insertBefore(this.custom_elements.bar, document.getElementById("char_leben_balken"));

			// Add event on bag open
			gca_tools.event.bag.onBagOpen(function(tab){
				// Patch items
				gca_overview.foodStuff.patchItems();
			});
			gca_tools.event.bag.waitBag(function(){
				// Patch items
				gca_overview.foodStuff.patchItems();
			});
			
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

			// Track life changes
			this.keepLifeDataUpdated(function(r){
				// Update data
				gca_overview.foodStuff.refreshData(r.data);
			});
		},

		// Patch inventory items
		patchItems : function(){
			// Items
			var items = document.getElementById("inv").getElementsByTagName("div");
			// For each item
			for(var i = items.length-1; i>=0; i--){
				let vitality = this.getItemVitality(items[i]);
				// If item is food
				if(vitality != false){
					// If possitive vitality
					if(vitality > 0){
						// Save vitality
						items[i].dataset.vitality = vitality;

						// Attach events
						if(!items[i].dataset.vitalityPatch){
							items[i].dataset.vitalityAttached = true;
							items[i].addEventListener('mouseover', function(){
								gca_overview.foodStuff.showVitalityGain(this);
							}, false);
							items[i].addEventListener('mouseout', function(){
								gca_overview.foodStuff.hideVitalityGain(this);
							}, false);
						}
					}

				}
			}
		},

		// Refresh data
		refreshData : function(json){
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
			this.custom_elements.info.textContent = "+" + gain + "%";
			// Calculate max healing
			var lifeLost = 100 - this.life[2];
			// Frame gain inside the posible
			gain = ((lifeLost > gain) ? gain : lifeLost);
			// Show gain bar
			this.custom_elements.bar.style.width = gain + "%";
			this.custom_elements.spaceBar.style.width = (lifeLost - gain) + "%";
		},

		// Hide Item vitality
		hideVitalityGain : function(item){
			// Clear text
			this.custom_elements.info.textContent = "";
			// Hide gain bar
			this.custom_elements.bar.style.width = "0%";
			this.custom_elements.spaceBar.style.width = "0%";
		},


		// Find the best food
		bestFood : function(){
			// Get Life
			this.initLifeData();

			var that = this;
			// Add event on bag open
			gca_tools.event.bag.onBagOpen(function(tab){
				// Find best food
				that.findBestFood();
			});
			gca_tools.event.bag.waitBag(function(){
				// Find best food
				that.findBestFood();
			});

			// Track life changes
			this.keepLifeDataUpdated(function(){
				// Find best food
				that.findBestFood();
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
				// Get vitality
				let vitality = this.getItemVitality(items[i]);
				// If item is food
				if(vitality != false){
					// If possitive vitality
					if(vitality > 0){
						// Calculate how close to 100% it is
						let thisDistance = Math.abs(this.life[1] - (this.life[0] + vitality));
						// If closer than the last one
						if(thisDistance < distance){
							// We have a new canditate
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
				food.style.webkitFilter = 'drop-shadow(black 0px 0px 1px) drop-shadow(yellow 0px 0px 3px) drop-shadow(yellow 0px 0px 3px)';
			}
		},

		// Make foods that give more life transparent
		overFeeding : function(){
			// Get Life
			this.initLifeData();

			var that = this;
			// Add event on bag open
			gca_tools.event.bag.onBagOpen(function(){
				// Find best food
				that.findOverFeeding();
			});
			gca_tools.event.bag.waitBag(function(){
				// Find best food
				that.findOverFeeding();
			});

			// Track life changes
			this.keepLifeDataUpdated(function(){
				// Find overfeeding food
				that.findOverFeeding();
			});
		},

		// Find overfeeding food
		findOverFeeding : function(){
			// Items
			var items = document.getElementById("inv").getElementsByTagName("div");
			// For each item
			for(var i = items.length-1; i>=0; i--){
				// Get vitality
				let vitality = this.getItemVitality(items[i]);
				// If item is food
				if(vitality != false){
					// If possitive vitality
					if(vitality > 0){
						// If overfeed
						if(this.life[1] - this.life[0] < vitality){
							items[i].style.opacity = 0.6;
						}
						// No overfeed
						else{
							items[i].style.opacity = 1;
						}

					}
				}
				// Next item
			}

			return;
		}
	},

	// Log the Daily Bonus
	daily_bonus_log : {
		// Inject
		inject : function(){
			// If daily bonus
			if(document.getElementById('blackoutDialogLoginBonus') != null){
				// Save instance
				var that = this;
				// Wait update event
				gca_tools.event.addListener("loginBonusDataUpdated", function(){
					// Display data
					that.showData();
				});
			}

			// No any new daily bonus
			else{
				// Display data
				this.showData();
			}
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
	},
	
	// Items Repair Overview
	repair_overview : {
		// Inject
		inject : function(){
			// Create drop area
			var div = document.createElement("div");
			div.id = "repair-droppable-grid";
			div.className = "custom-ui-droppable";
			// TODO : style on css file
			div.style = "background: url(img/shop/amplifying.png) no-repeat center center;background-size: 40px 40px;";
			div.dataset.containerNumber = 10101;
			div.dataset.contentTypeAccept = 1855;
			document.getElementById("char").appendChild(div);

			// Add tooltip
			gca_tools.setTooltip(div, JSON.stringify([[
				[gca_locale.get("drop_item_see_materials_repair"), "#FF6A00"],
				[gca_locale.get("workbench_6th_slot_empty"), "#808080"]
			]]));
			
			window.addEventListener('load', function(){
				DragDrop.makeDroppable(div);
				div.dataset.requestFunction = function(to, amount){
					gca_overview.repair_overview.dropHandler(this, {from : this.getDrag(), to : to, amount : amount});
				};
			}, false);
		},

		// Item drop handler
		dropHandler : function(drop, item){
			// Remove fake one
			item.to.remove().dequeue();
			// Set amount
			item.from.data("amount", item.amount);
			item.from.attr("data-amount", item.amount);
			// Get items needed to repair the item
			sendAjax(
				drop.getDropContainer(), 'ajax.php', 'mod=forge&submod=getWorkbenchPreview&mode=workbench&slot=5&iid=' + item.from.data('item-id') + '&amount=1',
				function(data){
					gca_overview.repair_overview.resolveMaterials(data)
				},
				function(elem, msg, delayDuration){
					console.log(msg.responseText);
				}
			);
		},

		resolveMaterials : function(data){
			if(/^[\],:{}\s]*$/.test(data.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){
				data=JSON.parse(data);
				needed_materials = data.slots[5].formula.needed;
				
				// Create tooltip with the materials
				tooltip = '[[["'+data.slots[5].item.name+'","'+data.slots[5].item.data.tooltip[0][0][1]+'"]';
				for (var key in needed_materials) {
					if (needed_materials.hasOwnProperty(key)) {
						//console.log(key + " -> " + needed_materials[key]);
						if(needed_materials[key].amount>0)
							tooltip += ',["<div class=\\"item-i-18-'+parseInt(key.match(/18(\d+)/)[1])+'\\" style=\\"display: inline-block;\\"></div>x '+needed_materials[key].amount+' ('+needed_materials[key].name.replace(/(u.{4})/g, '\\$1')+')","#cccccc"]'
					}
				}
				tooltip += ']]';
				gca_tools.setTooltip(document.getElementById("repair-droppable-grid"), tooltip);
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

	// Buff bar
	buffBar : {
		inject : function(){
			// If there is a buff bar
			if(document.getElementById("buffbar_old")){
				this.addTimers();
			}
		},

		// Add timers on the buffs
		addTimers : function(){
			// Get buffs
			var buffs = document.getElementsByClassName("buff_old");
			// For each buff
			for(var i = buffs.length - 1; i >= 0; i--){
				// Get buff
				let buff = buffs[i].getElementsByClassName("buff_inner")[0];
				// Copy old timer
				buff.dataset.timeLeft = parseInt(buffs[i].getElementsByClassName("ticker")[0].dataset.tickerTimeLeft);
				// Update buff
				this.updateBuffTimer(buff);
			}
		},

		updateBuffTimer : function(buff){
			// Get time left
			var time_left = parseInt(buff.dataset.timeLeft);

			// Get tooltip
			var tooltip = JSON.parse(buff.dataset.tooltip);
			tooltip[0][2] = [gca_tools.time.msToHMS_String(time_left*1000), "#DDD;text-align:right;"];
			gca_tools.setTooltip(buff, JSON.stringify(tooltip));

			// Update time
			buff.dataset.timeLeft = time_left - 1;

			var that = this;
			setTimeout(function(){
				that.updateBuffTimer(buff);
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