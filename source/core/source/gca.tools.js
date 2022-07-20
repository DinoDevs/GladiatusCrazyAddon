/*
 * Addon Tools Script
 * Author: DarkThanos, GreatApo
 */

// Tools
var gca_tools = {


	// String Functions
	// -------------------------------------------------- //
	// strings.removeDots(str)
	// strings.insertDots(str)
	// strings.trim(str)
	// strings.parseGold(str)
	// -------------------------------------------------- //
	strings : {
		removeDots : function(x){
			return x.replace(/\./g,"");
		},
		insertDots : function(str){
			var x=(str + "").split(",");
			var x1 = x[0];
			var x2 = 1 < x.length ? "," + x[1] : "";
			for(str=/(\d+)(\d{3})/;str.test(x1);){
				x1 = x1.replace(str, "$1.$2");
			}
			return x1 + x2;
		},
		trim : function(str){
			return str.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"");
		},
		parseGold : function(text){
			// Prepare
			text = this.trim(text);
			text = this.removeDots(text);
			// Parse gold
			var gold = parseInt(text, 10);
			if(isNaN(gold)) return null;
			return gold;
		},
		toUTF8Array : function(str) {
			var utf8 = [];
			for (var i=0; i < str.length; i++) {
				var charcode = str.charCodeAt(i);
				if (charcode < 0x80) utf8.push(charcode);
				else if (charcode < 0x800) {
					utf8.push(0xc0 | (charcode >> 6), 
							  0x80 | (charcode & 0x3f));
				}
				else if (charcode < 0xd800 || charcode >= 0xe000) {
					utf8.push(0xe0 | (charcode >> 12), 
							  0x80 | ((charcode>>6) & 0x3f), 
							  0x80 | (charcode & 0x3f));
				}
				// surrogate pair
				else {
					i++;
					// UTF-16 encodes 0x10000-0x10FFFF by
					// subtracting 0x10000 and splitting the
					// 20 bits of 0x0-0xFFFFF into two halves
					charcode = 0x10000 + (((charcode & 0x3ff)<<10)
							  | (str.charCodeAt(i) & 0x3ff));
					utf8.push(0xf0 | (charcode >>18), 
							  0x80 | ((charcode>>12) & 0x3f), 
							  0x80 | ((charcode>>6) & 0x3f), 
							  0x80 | (charcode & 0x3f));
				}
			}
			return utf8;
		},
		toUTF8String : function(str) {
			return this.toUTF8Array(str).toString().replace(/,/g,"")
		},
		escapeRegex: function(str) {
			// https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/13157996#13157996
			return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
		},
		decodeHTMLEntities : function(str) {
			var element = document.createElement('div');

			if(str && typeof str === 'string') {
				// strip script/html tags
				while (str.match(/<[^>]+>?/i)) {
					str = str.replace(/<[^>]+>?/gi, '');
				}
				element.innerHTML = str;
				str = element.textContent;
				element.textContent = '';
			}

			return str;
		}
	},


	// Time functions
	// -------------------------------------------------- //
	// time.server()
	// time.serverDateString()
	// time.serverTimeString()
	// time.parse(dateString)
	// time.msToHMS(date)
	// time.msToHMS_String(date)
	// time.msToString(date)
	// time.prepForStamp(dateString)
	// time.ajaxServer(html)
	// time.speedvert(integer)
	// time.serverSpeed()
	// -------------------------------------------------- //
	time : {
		// Server's Timestamp
		_server : false,
		_serverDateString : false,
		_serverTimeString : false,
		// Update Server Time
		updateServerTime : function(){
			// Parse server's time
			var sDate = JSON.parse(document.getElementById("server-time").getAttribute("data-start-time"));

			// Save time
			this._server = new Date(sDate[0], sDate[1] - 1, sDate[2], sDate[3], sDate[4], sDate[5], sDate[6]).getTime();
			// Save date string - dd.mm.yyyy
			this._serverDateString = sDate[2] + "." + sDate[1] + "." + sDate[0];
			// Save time string - hh:mm
			this._serverTimeString = sDate[3] + ":" + sDate[4];
		},
		// Get server's time
		server : function(){
			if(!this._server)
				this.updateServerTime();
			return this._server;
		},
		// Get server's date string
		serverDateString : function(){
			if(!this._server)
				this.updateServerTime();
			return this._serverDateString;
		},
		// Get server's time string
		serverTimeString : function(){
			if(!this._server)
				this.updateServerTime();
			return this._serverTimeString;
		},

		// Parse Time
		parse : function(time){
			// Parse time
			var timeString = time.match(/(\d+)[\/\.](\d+)[\/\.](\d+)\s*-?\s*(\d+):(\d+):*(\d*)/);
			// Pc time
			var now = new Date();

			// Return time
			return (new Date(
				parseInt(timeString[3]),
				parseInt(timeString[2]) - 1,
				parseInt(timeString[1]),
				parseInt(timeString[4]),
				parseInt(timeString[5]),
				(timeString[6]=="")?now.getSeconds():parseInt(timeString[6]),
				now.getMilliseconds()
			).getTime());
		},
		
		// Date to [hrs, mins, secs]
		msToHMS : function(d){
			var ms = d % 1000;
			d = (d - ms) / 1000;
			var secs = d % 60;
			d = (d - secs) / 60;
			var mins = d % 60;
			var hrs = (d - mins) / 60;

			return [hrs, mins, secs];
		},
		msToHMS_String : function(d, maxHours = 99){
			// Parse number if not
			if (typeof d !== "number") {
				d = parseInt(d, 10);
			}
			
			// Max values
			if(d >= maxHours*60*60*1000)
				return (maxHours<10? '0':'') + maxHours + ':00:00';
			
			var [hrs, mins, secs] = this.msToHMS(d);
			return (hrs<10? '0':'') + hrs + ':' + (mins<10? '0':'') + mins + ':' + (secs<10? '0':'') + secs;
		},
		msToString : function(d){
			// Parse number if not
			if (typeof d !== "number") {
				d = parseInt(d, 10);
			}
			
			// Get hh:mm:ss
			var [hrs, mins, secs] = this.msToHMS(d);
			// Convert hours to days
			var days = 0;
			if (hrs > 24) {
				// Calculate days
				days = (hrs - (hrs % 24)) / 24;
				// Calculate hours
				hrs = hrs % 24;
			}

			return '' +
				(days > 0 ? days + ' ' + gca_locale.get("general", "days") + ' ' : '') +
				(hrs < 10 ? '0' : '') + hrs + ':' +
				(mins < 10 ? '0' : '') + mins + ':' +
				(secs < 10 ? '0' : '') + secs;
		},

		prepForStamp : function(d){
			d = d.match(/\d+/g); // 07.05.2016 23:08:50
			var pcDate = new Date();
			var pcMonth = pcDate.getMonth() + 1;
			
			// If no seconds, add seconds
			if(!d[5]) d[5] = pcDate.getSeconds();

			if(
				parseInt(d[0]) > 12 || 
				parseInt(d[1]) == pcMonth || (parseInt(d[1])==pcMonth-1 && pcDate.getDate()==1) ){
				// d/m/y -> m/d/y
				return d[1]+'.'+d[0]+'.'+d[2]+' '+d[3]+':'+d[4]+':'+d[5];
			}else{
				// m/d/y
				return d[0]+'.'+d[1]+'.'+d[2]+' '+d[3]+':'+d[4]+':'+d[5];
			}
		},

		ajaxServer : function(html){
			// Calculate server time
			let time = html.match(/<span id="server-time"[^>]+>/i);
			time = time[0].match(/data-start-time="\[(\d+),(\d+),(\d+),(\d+),(\d+),(\d+),(\d+)\]/i);
			if (time == null) {
				return 0;
			}
			// Note: JavaScript counts months from 0 to 11: January = 0, December = 11.
			return new Date(
				parseInt(time[1], 10),
				parseInt(time[2], 10) - 1,
				parseInt(time[3], 10),
				parseInt(time[4], 10),
				parseInt(time[5], 10),
				parseInt(time[6], 10),
				parseInt(time[7], 10)
			).getTime();
		},

		// Convert time to server's speed
		speedvert : function(base) {
			return base / this.serverSpeed();
		},

		// Get and return server's speed
		serverSpeed : function() {
			if (this._serverSpeed) return this._serverSpeed;
			this._serverSpeed = parseInt((document.getElementById('header_game').getElementsByTagName('span')[7].textContent.match(/Speed x(\d+)/) || [null, '1'])[1], 10);
			return this._serverSpeed;
		}
	},


	// Set a tooltip
	// -------------------------------------------------- //
	setTooltip : function(el, data){
		el.dataset.tooltip = data;
		// If function is available
		if(typeof window.tooltips != "undefined"){
			window.tooltips.set(el, data);
		}
	},


	// Item Shadow
	// -------------------------------------------------- //
	// item.shadow.add(item)
	// item.shadow.getQuality(tooltip)
	// item.shadow.getColor(tooltip)
	// item.move(item, target[, size])
	// item.hash(item)
	// -------------------------------------------------- //
	item : {

		// Item Shadow
		shadow : {

			// Get Tooltip Quality
			getQuality : function(data){
				// Parse data
				if(typeof data == "string" && data.length > 0)
					data = JSON.parse(data);

				// Get color
				var color = "";
				if(data[0] && data[0][0] && data[0][0][1])
					color = data[0][0][1];

				// Find color
				if(color.match("white"))
					return -1;
				if(color.match("lime"))
					return 0;
				if(color.match("#5159F7"))
					return 1;
				if(color.match("#E303E0"))
					return 2;
				if(color.match("#FF6A00"))
					return 3;
				if(color.match("#FF0000"))
					return 4;

				// Default
				return false;
			},

			// Get Tooltip Color
			getColor : function(data, hex = false){
				let quality = (typeof data === 'number') ? data : this.getQuality(data);
				if (quality === false) return false;

				if (!hex)
					return ['white', 'green', 'blue', 'purple', 'orange', 'red'][quality + 1];
				else
					return ['white', 'lime', '#5159f7', '#e303e0', '#FF6A00', '#FF0000'][quality + 1];
			},

			// Add shadow
			add : function(element, tooltipElement){
				// If item is the self element
				if(typeof tooltipElement == "undefined"){
					tooltipElement = element;
				}
				// Get color
				var color = this.getColor(tooltipElement.dataset.tooltip);
				// On error, try jQuery
				if(!color && jQuery){
					color = this.getColor(jQuery(tooltipElement).data("tooltip"));
				}

				// Color not found
				if(!color)
					return;

				// Add item's shadow
				element.className += " item-i-" + color;
			}
		},

		// Move
		move : function(item, target){
			// Get spot to move it to
			var spot = this._move.getTargetSpot(item, target);
			if(!spot) return false;

			// Lock spots
			if(spot.slot) // Markets & avatar do not return slot info
				this._move.lockSlotSpots(spot.slot, item.dataset.itemId || item.parentNode.dataset.containerNumber);
			
			//console.log(spot);
			//console.log('<' + spot.slot.x + ',' + spot.slot.y + '>');
			//return false;

			// Drag item to spot
			this.drag(item, spot.parent, spot.x, spot.y);
			return true;
		},

		drag : function(item, parent, x, y){
			var cords_item = jQuery(item).offset();
			cords_item = {x: cords_item.left, y: cords_item.top};
			var cords_target = {x: x, y: y};
			//var cords_middle = {
			//	x: cords_item.x + (cords_target.x - cords_item.x)/2,
			//	y: cords_item.y + (cords_target.y - cords_item.y)/2
			//};
			
			// Debugging Code
			//let dot = document.createElement('div');
			//dot.setAttribute('style',`position:absolute;top:${cords_target.y}px;left:${cords_target.x}px;width:1px;height:1px;background:red;`);
			//document.body.appendChild(dot);
			//return;

			//let scroll = {x : window.scrollX, y : window.scrollY};
			this._move.fireMouseEvent(item, 'mousedown', {clientX: cords_item.x - window.scrollX, clientY: cords_item.y - window.scrollY});
			//this._move.fireMouseEvent(document, 'mousemove', {clientX: cords_item.x - window.scrollX, clientY: cords_item.y - window.scrollY});
			//this._move.fireMouseEvent(document, 'mousemove', {clientX: cords_middle.x - window.scrollX, clientY: cords_middle.y - window.scrollY});
			this._move.fireMouseEvent(document, 'mousemove', {clientX: cords_target.x - window.scrollX, clientY: cords_target.y - window.scrollY});
			this._move.fireMouseEvent(document, 'mouseup', {clientX: cords_target.x - window.scrollX, clientY: cords_target.y - window.scrollY});
			//setTimeout(() => {window.scroll(scroll.x, scroll.y);}, 0);
		},

		_move : {

			_lockedSpots : [],
			_pendingItems : {},
			lockSlotSpots : function (slot, itemId) {
				// Slot structure:
				// slot : {
				//		target : target,
				//		x : spot.x,
				//		y : spot.y,
				//		h : item_size.y,
				//		w : item_size.x
				// }
				// If don't need to lock spot
				if (slot.target != 'inv' && slot.target != 'shop') {
					return;
				}
				let targetId = this.getTargetId(slot.target);
				
				// Create spots tags
				let tags = [];
				for (let x = 0; x < slot.w; x++) {
					for (let y = 0; y < slot.h; y++) {
						tags.push(targetId + '<' + (slot.x + x) + ',' + (slot.y + y) + '>');
					}
				}
				// Lock spots
				tags.forEach((tag) => {
					if (!this._lockedSpots.includes(tag)) {
						this._lockedSpots.push(tag);
					}
				});
				// Log pending item move request
				if (itemId) {
					this.unlockItemSlots(itemId);
					this._pendingItems[itemId] = tags;
				}

				// Init the first time
				if (this.detectReplies) this.detectReplies();

				return;
			},

			unlockItemSlots : function(itemId) {
				if (!itemId || !this._pendingItems.hasOwnProperty(itemId)) return;
				// Remove locks
				this._pendingItems[itemId].forEach((tag) => {
					let index = this._lockedSpots.indexOf(tag);
					if (index > -1) this._lockedSpots.splice(index, 1);
				});
				// Remove pending
				delete this._pendingItems[itemId];
			},

			detectReplies : function() {
				gca_tools.event.request.onAjaxResponse((json) => {
					// Resolve given URL
					let url = gca_getPage.parameters(json.url);
					if (url.mod !== 'inventory' || url.submod !== 'move') return;
					// Get item's id
					let itemId = json.elem[0].dataset.itemId || url.from;
					if (!itemId) return;
					this.unlockItemSlots(itemId);
				});
				this.detectReplies = false;
			},


			getTargetId : function(target) {
				// Resolve target
				let targetElement = document.getElementById(target);
				if (!targetElement) return target;

				if (target == 'inv') {
					return targetElement.parentNode.getElementsByClassName('awesome-tabs current')[0].dataset.bagNumber;
				}
				if (target == 'inv') {
					return targetElement.dataset.containerNumber;
				}
				return target;
			},

			getTargetSpot : function(item, target) {
				var cords_grid, grid, size;
				var checkLock = false;
				if (target == 'shop') {
					grid = document.getElementById('shop');
					size = [Math.round(grid.clientHeight / 32), 6];
					checkLock = 'shop';
				}
				else if (target == 'inv') {
					grid = document.getElementById('inv');
					size = [5, 8];
					checkLock = 'inv';

					// If gold (works, but the subtracted gold from the counters is wrong)
					//if (item.dataset.basis == '14-1') {
					//	cords_grid = jQuery(grid).offset();
					//	return {
					//		x: (cords_grid.left + 1),
					//		y: (cords_grid.top + 32 * (size[0] - 1) + 1),
					//		parent : grid
					//	}
					//}
				}
				else if (target == 'market') {
					grid = document.getElementById('market_sell');
					cords_grid = jQuery(grid).offset();
					return {
						x: Math.ceil(cords_grid.left + 32 + 32/4),
						y: Math.ceil(cords_grid.top + 32 + 32/4),
						parent : grid
					};
				}
				else if (target == 'avatar') {
					grid = document.getElementById('avatar');
					cords_grid = jQuery(grid).offset();
					return {
						x: Math.ceil(cords_grid.left + 168/2),
						y: Math.ceil(cords_grid.top + 194/2),
						parent : grid
					};
				}
				else {
					return false;
				}

				var items = this.getGridItems(grid);
				var item_size = {
					x : parseInt(item.dataset.measurementX, 10),
					y : parseInt(item.dataset.measurementY, 10)
				}
				var spot = (target != 'shop' && this.findSameItemSpot(item, items)) || this.findGridSpot(
					item_size.y,
					item_size.x,
					this.getGridMap(size[0], size[1], items, checkLock)
				);
				if (!spot) return false;

				cords_grid = jQuery(grid).offset();
				cords_grid = {x: cords_grid.left, y: cords_grid.top};
				spot = {
					x: Math.ceil(cords_grid.x + (32 * spot.x) + 32/4),
					y: Math.ceil(cords_grid.y + (32 * spot.y) + 32/4),
					parent : grid,
					slot : {
						target : target,
						x : spot.x,
						y : spot.y,
						h : item_size.y,
						w : item_size.x
					}
				};

				return spot;
			},

			// Create a grid map of free spaces
			getGridItems : function(grid){
				var items = [];
				var dragables = grid.getElementsByClassName('ui-draggable');
				for (var i = 0; i < dragables.length; i++) {
					items.push({
						y : parseInt(dragables[i].style.top, 10)/32,
						x : parseInt(dragables[i].style.left, 10)/32,
						h : parseInt(dragables[i].dataset.measurementY, 10),
						w : parseInt(dragables[i].dataset.measurementX, 10),
						amount : parseInt(dragables[i].dataset.amount, 10),
						hash : dragables[i].dataset.hash
					});
				}
				return items;
			},

			// Create a grid map of free spaces
			getGridMap : function(height, width, items, checkLock){
				var table = [];
				
				// Create table
				for (let y = 0; y < height; y++) {
					table.push([]);
					for (let x = 0; x < width; x++) {
						table[y].push(false);
					}
				}

				// Set item occupied spaces
				for (let i = items.length - 1; i >= 0; i--) {
					for (let y = 0; y < items[i].h; y++) {
						for (let x = 0; x < items[i].w; x++) {
							table[items[i].y + y][items[i].x + x] = true;
						}
					}
				}

				// Check locked slots
				if (checkLock) {
					let targetId = this.getTargetId(checkLock);
					let now = new Date().getTime();
					for (let y = 0; y < height; y++) {
						for (let x = 0; x < width; x++) {
							if (!table[y][x]) {
								if (this._lockedSpots.includes(targetId + '<' + x + ',' + y + '>')) {
									table[y][x] = true;
								}
							}
						}
					}
				}

				return table;
			},

			// Find a spot on the grid that you can stack this item
			// -------------------------------------------------- //
			findSameItemSpot : function(item, items) {
				let amount = item.dataset.amount ? parseInt(item.dataset.amount, 10) : 1;
				for (var i = 0; i < items.length; i++) {
					if (items[i].hash == item.dataset.hash && items[i].amount + amount <= 100) {
						return {y : items[i].y, x : items[i].x};
					}
				}
				return false;
			},

			// Find a spot on the grid
			// -------------------------------------------------- //
			findGridSpot : function(item_height, item_width, table){
				var x,y,w,h;
				var found = false;

				// Do magic stuff
				for (x = 0; x <= table[0].length - item_width; x++) {
					for (y = 0; y <= table.length - item_height; y++) {
						found = true;

						if (item_height == 1) {
							if (table[y][x] == false) {
								found = true;
							}
							else if (table[y][x+1] == false) {
								x++;
							}
							else {
								found = false;
							}
						}
						else {
							for (w = 0; w < item_width; w++) {
								for (h = 0; h < item_height; h++) {
									if (table[y+h][x+w] == true) {
										found = false;
										break;
									}
								}
								if (!found) {
									break;
								}
							}
						}
						if (found) {
							for (w = 0; w < item_width; w++) {
								for (h = 0; h < item_height; h++) {
									table[y+h][x+w] = true;
								}
							}
							// BOOM! ... rabbit out of the hat
							found = {y : y, x : x};
							break;
						}
					}
					if (found) {
						break;
					}
					if (item_height == 1) {
						x++;
					}
				}
				return found;
			},

			// Mouse event simulation
			fireMouseEvent : function(elem, type, opt) {
				var options = {
					bubbles: true,
					cancelable: (type !== 'mousemove'),
					view: window,
					detail: 0,
					screenX: 0,
					screenY: 0,
					clientX: 1,
					clientY: 1,
					ctrlKey: false,
					altKey: false,
					shiftKey: false,
					metaKey: false,
					button: 0,
					relatedTarget: undefined
				};
				/*
				for (prop in options) {
					if (options.hasOwnProperty(prop) && opt.hasOwnProperty(prop)) {
						options[prop] = opt[prop];
					}
				}
				*/
				options.clientX = opt.clientX;
				options.clientY = opt.clientY;
				var event = document.createEvent('MouseEvents');
				event.initMouseEvent( type, options.bubbles, options.cancelable,
					options.view, options.detail,
					options.screenX, options.screenY, options.clientX, options.clientY,
					options.ctrlKey, options.altKey, options.shiftKey, options.metaKey,
					options.button, options.relatedTarget || document.body.parentNode );
				elem.dispatchEvent(event);
			}

		},

		info : function(item) {
			if (!item) return null;
			let info = this.hash(item) || {};

			if (item.dataset.contentType)
				info.contentType = parseInt(item.dataset.contentType, 10);
			if (item.dataset.contentSize)
				info.contentSize = parseInt(item.dataset.contentSize, 10);

			if (!info.price_gold && item.dataset.priceGold)
				info.price_gold = parseInt(item.dataset.priceGold, 10);
			if (item.dataset.level)
				info.level = parseInt(item.dataset.level, 10);
			if (item.dataset.amount)
				info.amount = parseInt(item.dataset.amount, 10);
			if (item.dataset.positionX)
				info.positionX = parseInt(item.dataset.positionX, 10);
			if (item.dataset.positionY)
				info.positionY = parseInt(item.dataset.positionY, 10);
			if (item.dataset.measurementX)
				info.measurementX = parseInt(item.dataset.measurementX, 10);
			if (item.dataset.measurementY)
				info.measurementY = parseInt(item.dataset.measurementY, 10);
			if (!info.category && item.dataset.basis) {
				let basis = item.dataset.basis.match(/^(\d+)-(\d+)$/i);
				info.category = parseInt(basis[1], 10);
				info.subcategory = parseInt(basis[2], 10);
			}

			if (item.dataset.tooltip) {
				let tooltip = item.dataset.tooltip;
				// White
				if(tooltip.match("white")) info.quality = -1;
				// Green
				else if(tooltip.match("lime")) info.quality = 0;
				// Blue
				else if(tooltip.match("#5159F7")) info.quality = 1;
				// Purple
				else if(tooltip.match("#E303E0")) info.quality = 2;
				// Orange
				else if(tooltip.match("#FF6A00")) info.quality = 3;
				// Red
				else if(tooltip.match("#FF0000")) info.quality = 4;
			}

			// Upgrades
			if (info.category == 11 || info.category == 12) {
				let tooltip = item.dataset.tooltip;
				let upgradeValue = tooltip.match(/: \+(\d+)/i);
				if(upgradeValue)
					info.upgrade_value = parseInt(upgradeValue[1]);
			}

			return info;
		},
		
		hash : function(item) {
			if (!item) return null;

			var hash;
			if (typeof item == 'string') {
				// Decode from string
				hash = this._hash.decode(item);
				if (hash.length == 0) return null;
			}
			else if (item.dataset && item.dataset.hash) {
				// Decode from element
				hash = this._hash.decode(item.dataset.hash);
			}
			else {
				return null;
			}
			
			// Check type
			switch(hash.length) {
				case 18:
					return {
						player : hash[0],
						category : hash[1],
						subcategory : hash[2],
						price_gold : hash[3],
						price_rubies : hash[4],
						prefix : hash[5],
						suffix : hash[6],
					//unknown_part_7 : hash[7], // auction ?
						sold : hash[8],
					//unknown_part_9 : hash[9],
					//unknown_part_10 : hash[10], // upgrade_1_type (upgrade subcategory)
					//unknown_part_11 : hash[11], // upgrade_1_level
					//unknown_part_12 : hash[12],
					//enchant_2_timer : hash[13], // new Date(x * 1000)
						quality : hash[14],
						durability : hash[15],
					//unknown_part_16 : hash[16],
						soulbound : hash[17]
					};

				case 10: // Upgrades
					return {
						player : hash[0],
						category : hash[1],
						subcategory : hash[2],
						price_gold : hash[3],
						price_rubies : hash[4],
					//unknown_part_5 : hash[5],
					//unknown_part_6 : hash[6],
						quality : hash[7],
						soulbound : hash[8],
						upgrade_level : hash[9]
					};

				case 9: // Recipes
					return {
						player : hash[0],
						category : hash[1],
						subcategory : hash[2],
						price_gold : hash[3],
						price_rubies : hash[4],
					//unknown_part_5 : hash[5],
						quality : hash[6],
						soulbound : hash[7],
						recipes_level : hash[8]
					};

				case 8: // Snowballs, Pumpkins, Rune, Bunny
					return {
						player : hash[0],
						category : hash[1],
						subcategory : hash[2],
						price_gold : hash[3],
						price_rubies : hash[4],
					//unknown_part_5 : hash[5],
						quality : hash[6],
						soulbound : hash[7]
					};

				case 7:
					return {
						player : hash[0],
						category : hash[1],
						subcategory : hash[2],
						price_gold : hash[3],
						price_rubies : hash[4],
						prefix : hash[5],
						suffix : hash[6]
					};
			}
			return null;
		},
		
		_hash : {
			decode : function(hash) {
				if (typeof hash != 'string' || hash.length <= 2)
					return [];
				
				let parts = hash.split('-');
				for (let i = 0; i < parts.length; i++) {
					parts[i] = this.decodeValue(parts[i]);
				}
				return parts;
			},
			decodeValue : function(value) {
				let key = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
				let code = 0;
				for (let i = value.length - 1; i >= 0; i--) {
					code += key.indexOf(value[i]) * Math.pow(key.length, value.length - i - 1);
				}
				return code;
			}
		}
	},


	// Events
	// -------------------------------------------------- //
	// event.addListener(name, callback)
	// event.fire(name[, data])
	// event.fireOnce(name[, data])
	// event.clearEventListeners(name)
	// event.item.onDrag(callback)
	// event.item.onDrop(callback)
	// event.request.onBeforeAjaxResponse(callback)
	// event.request.onAjaxResponse(callback)
	// event.bag.waitBag(callback)
	// event.bag.onBagOpen(callback)
	// event.onExit.init()
	// event.onExit.listen(id, message)
	// event.onExit.remove(id)
	// -------------------------------------------------- //
	event : {
		// List of events
		event_list : {},
		once_event : {},

		// Add an event
		addListener : function(name, callback){
			// If no callback, no one is listening
			if(!callback) return;

			// If event exist
			if(this.event_list[name]){
				this.event_list[name].push(callback);
			}
			// New list for this event name
			else{
				this.event_list[name] = [callback];
			}

			// If event once exist
			if(typeof this.once_event[name] != "undefined"){
				// Asynchronously call
				setTimeout(
					(function(callback, data){
						return function(){
							callback(data);
						}
					})(callback, this.once_event[name])
				, 0);
			}
			
			return;
		},

		// Fire an event
		fire : function(name, data = null){
			// No one is listening
			if(!this.event_list[name]) return;

			for(var i = 0; i < this.event_list[name].length; i++){
				// Asynchronously call
				setTimeout(
					(function(callback, data){
						return function(){
							callback(data);
						}
					})(this.event_list[name][i], data)
				, 0);
			}
		},
		fireOnce : function(name, data = null){
			// Save event fire
			this.once_event[name] = data;
			// Fire event
			this.fire(name, data);
		},

		clearEventListeners : function(name){
			// Delete
			delete this.event_list[name];
			delete this.once_event[name];
		},
		
		// Item events
		item : {
			// Is it loaded?
			loaded : false,
			// Active item
			active : null,

			// Initialize
			init  : function(){
				// If already loaded, return
				if(this.loaded)
					return;
				// Set as loaded
				this.loaded = true;

				// Attack an item drag event
				jQuery(document).on('dragstart', function(e){
					// If item drag
					if(e.target && e.target.dataset && e.target.dataset.contentType){
						// Call handler
						gca_tools.event.item.dragEventHandler(e.target);
					}
				});

				// Attack an item drop event
				jQuery(document).on('dragend', function(){
					gca_tools.event.item.dropEventHandler();
				});
			},

			// Item drag handler
			dragEventHandler : function(item){
				// Save item
				gca_tools.event.item.active = item;
				// Fire event
				gca_tools.event.fire('itemdrag', item);
			},

			// Item drag handler
			dropEventHandler : function(){
				// Get item
				var item = gca_tools.event.item.active;
				if(!item) return;
				// Clear active
				gca_tools.event.item.active = null;
				// Fire event
				gca_tools.event.fire('itemdrop', item);
			},

			// OnDrag Event wrapper
			onDrag : function(callback){
				if(!this.loaded)
					this.init();
				// Set a listener
				gca_tools.event.addListener('itemdrag', callback);
			},

			// OnDrag Event wrapper
			onDrop : function(callback){
				if(!this.loaded)
					this.init();
				// Set a listener
				gca_tools.event.addListener('itemdrop', callback);
			}
		},

		// Request event
		request : {
			// Is it loaded?
			loaded : false,
			// Original functions
			original : {},

			// Initialize
			init  : function(){
				// If already loaded, return
				if(this.loaded)
					return;
				// Set as loaded
				this.loaded = true;

				// Save the original ajax function
				this.original.sendAjax = window.sendAjax;
				// And then patch a wrapper
				window.sendAjax = gca_tools.event.request.sendAjax;
			},

			// on Before Callback data
			beforeAjaxResponse : {
				list : []
			},
			// on Before Callback
			onBeforeAjaxResponse : function(callback){
				if(!this.loaded)
					this.init();
				// Set an injector
				this.beforeAjaxResponse.list.push(callback);
			},

			// Sent Ajax wrapper
			sendAjax : function(elem, url, data, callbackDone, callbackFail, option){
				// Call original
				gca_tools.event.request.original.sendAjax(elem, url, data, function(data, elem){
					// Set up a pointer
					var arg = {
						data : data,
						elem : elem
					};

					// Before response
					var before = gca_tools.event.request.beforeAjaxResponse;
					if(before.list.length){
						for(var i = 0; i < before.list.length; i++){
							before.list[i](arg);
						}
					}

					// Call callback
					if(callbackDone !== undefined && typeof callbackDone === 'function') {
						callbackDone(arg.data, arg.elem);
					}

					// Fire event
					gca_tools.event.fire('ajaxresponse', {url: url, elem : arg.elem, data : arg.data});
				}, callbackFail, option);
			},

			// Ajax Event wrapper
			onAjaxResponse : function(callback){
				// Init it
				this.init();
				// Set a listener
				gca_tools.event.addListener('ajaxresponse', callback);
			}
		},

		// Bag events
		bag : {
			// Is it loaded?
			loaded : false,
			// Original functions
			original : {},

			init : function(){
				// If already loaded, return
				if(this.loaded)
					return;
				// Set as loaded
				this.loaded = true;

				// Save this
				var that = this;

				// Wait jQuery
				jQuery(function(){
					// Save
					var events = jQuery._data( document.getElementById("inventory_nav"), "events").click[0];
					that.original.openBag = events.handler;

					// Override
					events.handler = function(){
						// Call original handler
						that.original.openBag.call(this);
						// Fire event
						gca_tools.event.fire('bagOpen', this);
					};

					// First fire
					setTimeout(function(){
						jQuery("#inventory_nav .current").click();
					}, 10);
				});
			},

			// Wait a bag to load
			waitBag_obj : {
				// Wait active
				waiting : false,
				// Callback list
				list : [],
				// Polling function
				polling : function(){
					// Save instance
					var that = this;

					// Not ready
					if(document.getElementById("inv").className.match("unavailable")){
						setTimeout(function(){
							that.polling();
						}, 10);
						return;
					}

					// Reset variables
					var list = this.list;
					this.active = false;
					this.list = [];

					// Call all callbacks
					for(var i = 0; i < list.length; i++){
						// Asynchronously call
						setTimeout(
							(function(callback){
								return function(){
									callback();
								}
							})(list[i])
						, 0);
					}
				}
			},
			waitBag : function(callback){
				// Add callback on the list
				this.waitBag_obj.list.push(callback);

				// If already active
				if(this.waitBag_obj.waiting == true){
					// Return
					return;
				}

				// Make it active
				this.waitBag_obj.waiting = true;
				// Start polling
				this.waitBag_obj.polling();
			},

			// OnBagOpen
			onBagOpen : function(callback){
				if(!this.loaded)
					this.init();
				// Set a listener
				gca_tools.event.addListener('bagOpen', callback);
			}
		},

		// Exit
		onExit : {
			// Initialize
			init : function() {
				if (this.checklist) return;
				this.checklist = {};

				// On window unload
				window.onbeforeunload = () => {
					var message = null;
					// Check if there are pending actions
					for (let id in this.checklist) {
						if (this.checklist.hasOwnProperty(id) && this.checklist[id]) {
							message = this.checklist[id];
							break;
						}
					}
					return message;
				};
			},

			// Set an action as pending
			listen : function(id, message) {
				this.init();
				this.checklist[id] = message;
			},

			// Set an action as completed
			remove : function(id) {
				if (this.checklist && this.checklist.hasOwnProperty(id))
					delete this.checklist[id];
			}
		}
	},


	// Pagination
	// -------------------------------------------------- //
	// pagination.parse(wrapper[, skipping])
	// pagination._parse(wrapper[, info, skipping])
	// -------------------------------------------------- //
	pagination : {

		// Parse
		parse : function(wrapper, skipping){
			return this._parse(wrapper, false, skipping);
		},

		// Advance parse
		_parse : function(wrapper, info, skipping){
			// Default skipping
			if(!skipping || isNaN(skipping) || skipping < 1){
				skipping = 1;
			}
			// If not pagination
			if(
				!wrapper.className.match("paging") &&
				wrapper.getElementsByClassName("paging_numbers").length == 0 &&
				wrapper.getElementsByClassName("paging_button").length == 0
			){
				return false;
			}

			// Pagination info
			if(!info)
				info = this.getInfo(wrapper, skipping);
			var pages = this.calculatePages(info, 6);

			// Add style
			wrapper.className += " gca_paging";

			var linkWrapper = wrapper.getElementsByClassName("paging_numbers")[0];
			// Clear links
			linkWrapper.textContent = "";

			var a;

			// Create before "..."
			if(info.first < pages[0]){
				linkWrapper.appendChild(document.createTextNode("..."));
			} else {
				a = document.createElement('span');
				a.className = "paging_numbers_spacer";
				linkWrapper.appendChild(a);
			}

			// Create page links
			for (var i = 0; i < pages.length; i++) {
				linkWrapper.appendChild(document.createTextNode(" "));
				if(pages[i] != info.current){
					a = document.createElement('a');
					a.href = info.link + "&page=" + pages[i];
				}else{
					a = document.createElement('span');
					a.className = "paging_numbers_current";
				}
				a.textContent = pages[i];
				linkWrapper.appendChild(a);
			}

			// Create after "..."
			if(pages[pages.length - 1] < info.relativeLast)
				linkWrapper.appendChild(document.createTextNode(" ..."));


			// Fix nav buttons
			if(skipping > 1){
				let button;

				// Left Full
				button = wrapper.getElementsByClassName("paging_left_full");
				if(button.length)
					button[0].href = info.link + "&page=" + info.first;
				// Left Step
				button = wrapper.getElementsByClassName("paging_left_step");
				if(button.length)
					if(info.first >= info.current - info.skipping)
						button[0].href = info.link + "&page=" + info.first;
					else
						button[0].href = info.link + "&page=" + (info.current - info.skipping);

				// Right Full
				button = wrapper.getElementsByClassName("paging_right_full");
				if(button.length)
					button[0].href = info.link + "&page=" + info.relativeLast;
				// Right Step
				button = wrapper.getElementsByClassName("paging_right_step");
				if(button.length)
					if(info.relativeLast <= info.current + info.skipping)
						button[0].href = info.link + "&page=" + info.relativeLast;
					else
						button[0].href = info.link + "&page=" + (info.current + info.skipping);
			}

			if(info.first == info.current){
				let button;

				// Left Full
				button = wrapper.getElementsByClassName("paging_left_full");
				if(button.length)
					button[0].style.display = "none";
				// Left Step
				button = wrapper.getElementsByClassName("paging_left_step");
				if(button.length)
					button[0].style.display = "none";
			}
			if(info.relativeLast == info.current){
				let button;

				// Right Full
				button = wrapper.getElementsByClassName("paging_right_full");
				if(button.length)
					button[0].style.display = "none";
				// Right Step
				button = wrapper.getElementsByClassName("paging_right_step");
				if(button.length)
					button[0].style.display = "none";
			}

			return true;
		},

		// Get info
		getInfo : function(wrapper, skipping){
			// Default skipping
			if(!skipping || isNaN(skipping)){
				skipping = 1;
			}
			// Page object
			var page = {};

			// Ger number wrapper
			var numbers = wrapper.getElementsByClassName("paging_numbers")[0];
			var links = numbers.getElementsByTagName("a");

			// Get current page
			page.current = numbers.getElementsByTagName("span");
			if(page.current.length == 0 || isNaN(parseInt(page.current[0].textContent)))
				return false;
			page.current = parseInt(page.current[0].textContent);


			// Get first page button value
			page.first = this.parseButton(wrapper, "paging_left_full");
			// If no button
			if(page.first == false){
				// If links exist
				if(links.length > 0){
					page.first = this.parseLink(links[0]);
				}
			}
			// If first page not found
			if(page.first == false || page.first > page.current){
				page.first = page.current;
			}

			// Get last page button value
			page.last = this.parseButton(wrapper, "paging_right_full");
			// If no button
			if(page.last == false){
				// If links exist
				if(links.length > 0){
					page.last = this.parseLink(links[links.length-1]);
				}
			}
			// If last page not found
			if(page.last == false || page.last < page.current){
				page.last = page.current;
			}

			// Pages per page
			page.skipping = skipping;

			// Link
			page.link = "";
			// If link
			if(links.length > 0){
				page.link = this.getLink(links[0]);
			}
			// Else
			else if(wrapper.getElementsByClassName("paging_left_full").length > 0){
				page.link = wrapper.getElementsByClassName("paging_left_full")[0];
			}
			// Else
			else if(wrapper.getElementsByClassName("paging_right_full").length > 0){
				page.link = wrapper.getElementsByClassName("paging_right_full")[0];
			}

			// Relative last
			page.relativeLast = page.last - ((page.last - 1) % page.skipping);
			if(page.first > page.relativeLast){
				page.relativeLast = page.first;
			}

			// Return info
			return page;
		},

		// Parse button
		parseButton : function(wrapper, name){
			// Button Value
			var value = false;

			// Get button
			var button = wrapper.getElementsByClassName(name);
			// If button exist
			if(button.length != 0){
				// Parse link
				value = this.parseLink(button[0]);
			}

			// Return value
			return value;
		},

		// Parse link
		parseLink : function(element){
			// Get value
			var value = gca_getPage.parameters(element.href);
			// If Not found
			if(!value["page"])
				return false;

			// Parse value
			value = parseInt(value["page"]);
			// Check value
			if(isNaN(value))
				return false;

			// Return value
			return value;
		},

		// Get link
		getLink : function(element){
			var link = element.href;
			link = link.replace(/(&page=\d+|page=\d+&)/i, "");
			return link;
		},

		// Calculate pages to show
		calculatePages : function(info, offset){
			var pages = [];

			// Push current
			pages.push(info.current);

			// Prepend pages
			var prepend_count = offset;
			var prepend_page = info.current - info.skipping;
			while(prepend_count > 0 && info.first <= prepend_page){
				pages.unshift(prepend_page);
				prepend_page -= info.skipping;
				prepend_count--;
			}

			// Append pages
			var append_count = offset;
			var append_page = info.current + info.skipping;
			while(append_count > 0 && append_page <= info.last){
				pages.push(append_page);
				append_page += info.skipping;
				append_count--;
			}

			// Fill ahead
			while(prepend_count > 0 && append_page <= info.last){
				pages.push(append_page);
				append_page += info.skipping;
				prepend_count--;
			}

			// Fill before
			while(append_count > 0 && info.first <= prepend_page){
				pages.unshift(prepend_page);
				prepend_page -= info.skipping;
				append_count--;
			}

			// Return pages
			return pages;
		}

	},


	// modal
	// -------------------------------------------------- //
	// var myModal = new Modal(title, body, confirm, cancel)
	// myModal.show();
	// myModal.hide();
	// myModal.title();
	// myModal.body();
	// myModal.confirm();
	// myModal.cancel();
	// -------------------------------------------------- //
	Modal : (function(){
		var modal = function(title, body, confirm, cancel){
			var modal = this;

			// Wrapper
			this.wrapper = document.createElement("div");
			this.wrapper.className = "gca_modal_wrapper";
			this.wrapper.style.display = "none";

			// Modal window
			this.window = document.createElement("div");
			this.window.className = "gca_modal_window";
			this.wrapper.appendChild(this.window);

			// Title
			this.head = document.createElement("div");
			this.head.className = "blackoutDialog_header";
			this.window.appendChild(this.head);
			this.head_title = document.createElement("div");
			this.head_title.className = "title";
			if(typeof title !== "undefined"){
				this.title(title);
			}
			this.head.appendChild(this.head_title);

			// Body wrapper
			this.body_wrapper = document.createElement("div");
			this.body_wrapper.className = "blackoutDialog_body";
			this.window.appendChild(this.body_wrapper);

			// Modal Icon
			this.icon = document.createElement("div");
			this.icon.className = "blackoutDialog_icon";
			this.body_wrapper.appendChild(this.icon);
			this.img = document.createElement("img");
			this.img.src = "/cdn/img/ui/blackoutDialog/icon_warning.jpg";
			this.icon.appendChild(this.img);

			// Content
			this.body_content = document.createElement("div");
			this.body_content.className = "blackoutDialog_text";
			if(body){
				this.body(body);
			}
			this.body_wrapper.appendChild(this.body_content);

			var br = document.createElement("br");
			br.className = "clearfloat";
			this.body_wrapper.appendChild(br);

			// Footer
			this.footer = document.createElement("div");
			this.footer.className = "blackoutDialog_footer pngfix";
			this.window.appendChild(this.footer);

			// Background
			this.background = document.createElement("div");
			this.background.className = "gca_modal_background";
			this.wrapper.appendChild(this.background);
			this.background.addEventListener('click', function(){
				modal.cancel();
			}, false);

			document.body.appendChild(this.wrapper);

			// Modal Callbacks
			if(typeof confirm === "function"){
				this.callback_confirm = confirm;
			}
			if(typeof cancel === "function"){
				this.callback_cancel = cancel;
			}
		};

		modal.prototype.show = function(){
			this.wrapper.style.display = "block";
			return this;
		};

		modal.prototype.hide = function(){
			this.wrapper.style.display = "none";
			return this;
		};

		modal.prototype.title = function(text){
			this.head_title.textContent = text;
			return this;
		};

		modal.prototype.body = function(content){
			if(typeof content === "string"){
				var p = document.createElement("p");
				p.style.textAlign = "center";
				p.textContent = content;
				this.body_content.appendChild(p);
			}
			else{
				this.body_content.appendChild(content);
			}
			return this;
		};

		modal.prototype.button = function(text, call){
			if(typeof this.buttons_wrapper === "undefined"){
				this.buttons_wrapper = document.createElement("div");
				this.buttons_wrapper.className = "blackoutDialog_buttons";
				this.body_content.appendChild(this.buttons_wrapper);
			}

			var button = document.createElement("input");
			button.setAttribute("type", "button");
			button.className = "awesome-button big";
			button.value = text;
			this.buttons_wrapper.appendChild(button);

			if(typeof call == "boolean"){
				var that = this;
				if(call){
					button.addEventListener('click', function(){that.confirm();}, false);
				}
				else{
					button.addEventListener('click', function(){that.cancel();}, false);
				}
			}

			return button;
		}

		modal.prototype.confirm = function(confirm){
			if(typeof confirm === "function"){
				this.callback_confirm = confirm;
			}
			else{
				this.hide();
				var modal = this;
				if(typeof this.callback_confirm === "function"){
					setTimeout(function(){
						modal.callback_confirm(modal);
					}, 0);
				}
			}
			return this;
		};

		modal.prototype.cancel = function(cancel){
			if(typeof cancel === "function"){
				this.callback_cancel = cancel;
			}
			else{
				this.hide();
				var modal = this;
				if(typeof this.callback_cancel === "function"){
					setTimeout(function(){
						modal.callback_cancel(modal);
					}, 0);
				}
			}
			return this;
		};

		modal.prototype.destroy = function(){
			this.wrapper.parentNode.removeChild(this.wrapper);
			return this;
		};

		return modal;
	})(),


	// Easter Eggs
	// -------------------------------------------------- //
	// You are not supposed to see this!
	// -------------------------------------------------- //
	easter_eggs : {
		lucky : function () {
			return (Math.random() * 100 <= 1 ? true : false);
		},

		check : function (callback = false, data = []) {
			if (this.lucky()) {
				if (!callback) {
					this.poem();
					return true;
				}
				else {
					callback.apply(this, data);
					return true;
				}
			}
			else {
				return false;
			}
		},

		poem : function () {
			let poem = ['Rubies are red,', 'potions are blue,', 'while you click,', 'I work for you.'];
			gca_notifications.error(poem[0]);
			gca_notifications.info(poem[1]);
			gca_notifications.warning(poem[2]);
			gca_notifications.success(poem[3]);
		},

		fight : function (won) {
			if (won) {
				gca_notifications.success("Are you not Entertained?");
			}
			else {
				gca_notifications.warning("The force is strong with this one!");
			}
		},

		isDirty : function () {
			if (new Date().getTime() - gca_data.section.get("cache", "dirty_player", 0) < 48 * 60 * 60 * 1000) {
				return true;
			}
			return false;
		}
	},


	// Create
	// -------------------------------------------------- //
	// create.goldIcon()
	// create.settingsLink(category)
	// -------------------------------------------------- //
	create : {

		goldIcon : function() {
			return this.icon('/cdn/img/res2.gif');
		},
		rubiesIcon : function() {
			return this.icon('/cdn/img/res3.gif');
		},
		flagIcon : function(country) {
			country = country.toLowerCase();
			if (!(/^[a-zA-Z]{2,2}$/).test(country))
				return this.icon('');
			else if (country == 'en') country = 'gb';
			return this.icon('https://flags.fmcdn.net/data/flags/h20/' + country + '.png');
		},

		icon : function(src) {
			var img = document.createElement("img");
			img.setAttribute("alt", "");
			img.setAttribute("src", src);
			img.setAttribute("align", "absmiddle");
			img.setAttribute("border", "0");
			return img;
		},

		settingsLink : function(category) {
			let link = this.footerButton('gear', gca_getPage.link({"mod" : "settings", "gcamod" : "settings", "category" : category}));
			gca_tools.setTooltip(link, JSON.stringify([[[gca_locale.get("settings", "settings"), "#fdfdfd"]]]));
		},

		footerButton : function(icon = null, href = null) {
			let wrapper = this.prepareFooterButtons();
			let link = document.createElement("a");
			if (icon) link.className = "gca-icon gca-icon-" + icon;
			else link.className = "gca-icon";
			if (href) link.setAttribute("href", href);
			wrapper.appendChild(link);
			return link;
		},

		prepareFooterButtons : function() {
			let footer = document.getElementById('footer');

			// If no footer
			if (footer == null) footer = document.getElementsByTagName('body')[0];

			// Return wrapper if already exists
			let wrapper = footer.getElementsByClassName('gca-footer-buttons-wrapper');
			if (wrapper.length > 0) return wrapper[0];
			// Create wrapper
			wrapper = document.createElement("div");
			wrapper.className = 'gca-footer-buttons-wrapper';
			footer.appendChild(wrapper);
			return wrapper;
		},

		link : function(url, text = false, options = {}) {
			let link = document.createElement('a');
			link.href = url;
			if (text)
				link.textContent = text;
			if (options.hasOwnProperty('className'))
				link.className = options.className;
			if (options.hasOwnProperty('target'))
				link.setAttribute('target', options.target);

			return link;	
		}

	},


	// Load
	// -------------------------------------------------- //
	// script(url, function done(){}, isAddonResource)
	// -------------------------------------------------- //
	load : {
		script : function(link, callback = false, resource = false) {
			var script = document.createElement('script');
			script.src = resource ? gca_resources.folder + link : link;
			script.addEventListener('load', function(){
				if (callback) callback();
			}, false);
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	},


	// Cached
	// -------------------------------------------------- //
	// cached.run(id, () => {return 100;}, limit);
	// cached.promise(id, (resolve, reject) => {resolve(100);}, limit).then(result => {}, error => {});
	// cached.clear(id);
	// -------------------------------------------------- //
	cached : {
		_getCache : function(id, limit) {
			let last = gca_data.section.get('cache', 'cached-date-#' + id, 0);
			if (last + limit < new Date().getTime()) {
				return undefined;
			}
			else {
				return gca_data.section.get('cache', 'cached-value-#' + id, null);
			}
		},
		_setCache : function(id, value) {
			gca_data.section.set('cache', 'cached-date-#' + id, new Date().getTime());
			gca_data.section.set('cache', 'cached-value-#' + id, value);
		},
		_delCache : function(id) {
			gca_data.section.del('cache', 'cached-date-#' + id);
			gca_data.section.del('cache', 'cached-value-#' + id);
		},

		run : function(id, func, limit = 10 * 60 * 1000, cache_only = false) {
			let cache = this._getCache(id, limit);
			if (cache != undefined) {
				return cache;
			}
			else if (cache_only) {
				return undefined;
			}
			else {
				return func();
			}
		},
		promise : function(id, func, limit = 10 * 60 * 1000, cache_only = false) {
			return new Promise((resolve, reject) => {
				let cache = this._getCache(id, limit);
				if (cache != undefined) {
					resolve(cache);
					return;
				}
				else if (cache_only) {
					reject('Not found in cache.');
					return;
				}
				else {
					func((result) => {
						this._setCache(id, result);
						resolve(result);
					}, reject);
				}
			});
		},
		clear : function(id) {
			this._delCache(id);
		},
	},


	// Ajax
	// -------------------------------------------------- //
	// ajax.get(url).then(result => {}, error => {});
	// 
	// ajax.cached.known_scrolls().then(result => {}, error => {});
	// -------------------------------------------------- //
	ajax : {
		'get' : function(url) {
			return new Promise(function(resolve, reject) {
				return jQuery.ajax({
					type: 'GET',
					url: (typeof url === 'string') ? url : gca_getPage.link(url),
					success: function(result) {resolve(result);},
					error: function(jqXHR, textStatus, errorThrown) {reject(new Error(errorThrown));},
				});
			});
		},

		cached : {
			known_scrolls : function(options = {}) {
				if (options.hasOwnProperty('clear')) {
					gca_tools.cached.clear('ajax-known-scrolls');
					return;
				}
				return gca_tools.cached.promise('ajax-known-scrolls', (resolve, reject) => {
					gca_tools.ajax.get({"mod":"forge"}).then(
						(result) => {
							// Get each scroll
							let scrolls = result.match(/<option value="\d+" (selected |)data-level="\d+" data-name="[^"]*">[^<]*<\/option>/gim);
							let bases = result.match(/<option value="\d+-\d+">[^<]*<\/option>/gim);

							// If error
							if (scrolls.length < 2) {
								reject(new Error('Failed to parse page.'));
							}

							// Parse scrolls
							let info = {
								id : {
									prefix : [],
									base : [],
									suffix : [],
								},
								name : {
									prefix : {},
									base : {},
									suffix : {},
								},
								level : {
									prefix : [],
									//base : [],
									suffix : [],
								}
							};

							var i = 1;
							// Get prefixes
							while (i < scrolls.length) {
								let id = parseInt(scrolls[i].match(/ value="(\d+)"/i)[1], 10);
								let name = scrolls[i].match(/ data-name="([^"]*)"/i)[1];
								let level = parseInt(scrolls[i].match(/ data-level="(\d+)"/i)[1], 10);
								i++;
								if (id == 0) break;
								info.id.prefix.push(id);
								info.name.prefix[id] = name;
								info.level.prefix.push(level);
							}
							// Get suffixes
							while (i < scrolls.length) {
								let id = parseInt(scrolls[i].match(/ value="(\d+)"/i)[1], 10);
								let name = scrolls[i].match(/ data-name="([^"]*)"/i)[1];
								let level = parseInt(scrolls[i].match(/ data-level="(\d+)"/i)[1], 10);
								i++;
								info.id.suffix.push(id);
								info.name.suffix[id] = name;
								info.level.suffix.push(level);
							}
							// Get bases
							for (let i = 0; i < bases.length; i++) {
								let id = bases[i].match(/ value="(\d+-\d+)"/i)[1];
								let name = gca_tools.strings.trim(bases[i].match(/">([^<]*)<\/option>/i)[1]);
								//let level = parseInt(bases[i].match(/ data-level="(\d+)"/i)[1], 10);
								info.id.base.push(id);
								info.name.base[id] = name;
								//info.level.base.push(level);
							}

							// Send results
							resolve(info);
						},
						(error) => {
							reject(error);
						}
					);
				}, 1 * 60 * 60 * 1000);
			}
		}
	},


	// Extension functions
	// -------------------------------------------------- //
	// sendMessage(message, callback)
	// -------------------------------------------------- //
	extension : {
		sendMessage : function (message, callback) {/* Code Below */}
	},

	// CDN Image
	// -------------------------------------------------- //
	// 
	// -------------------------------------------------- //
	// Info
	// 		Gladiatus moved the images under a CDN
	//		The images were also optimised using the utility "jpegoptim" (exaple: jpegoptim ./image.jpg)
	//		The old images are still in the servers pushed inside the /cdn/ directory
	//		Example:
	//			old image           : https://en.gladiatus.gameforge.com/img/ui/quest/icon_arena_inactive.jpg
	//			new image location  : https://en.gladiatus.gameforge.com/cdn/img/ui/quest/icon_arena_inactive.jpg
	//			new image optimised : https://gf2.geo.gfsrv.net/cdn1b/00f1a594723515a77dcd6d66c918fb.jpg
	cdn : {
		// The CDN uses the file's md5 hash to generate the URL
		// Linux command to get md5: md5sum ./filename.png
		url2info : function(url) {
			let info = url.match(/^(?:https?:|)\/\/(gf\d+\.geo\.gfsrv\.net)\/cdn([0-9a-f]{2,2})\/([0-9a-f]{30,30})\.(\w+)$/i);
			
			if (!info) return null;
			
			return {
				hash : info[2] + info[3],
				server : info[1]
			};
		},

		revLookUp : function(url, lookup) {
			let info = this.url2info(url);
			if (!info) return null;
			return lookup[info.hash];
		},

		// The commented values are invalid
		cdn_npc_lookup : {
			'7c3d25bc04df401afab3897e6ee29d1d' : '/img/npc/0/0_1.jpg',
			'b8bda95f9cd934159f87c91c88846401' : '/img/npc/0/0_2.jpg',
			'1660756c3103999414d17b4c4bea6c66' : '/img/npc/0/0_3.jpg',
			'a6205b44898fb836d9aa2a066d892894' : '/img/npc/0/0_4.jpg',
			'1e7a5c2e00d3285b7a8860ec55abedb2' : '/img/npc/0/0_5.jpg',
			'9c18ae74ddab70c975f0f99302560a96' : '/img/npc/0/0_6.jpg',
			'dc57f844ccf4ddd43a73512dd50cb664' : '/img/npc/0/0_7.jpg',
			'7e2b37847da8cb3b4b056b43daefe881' : '/img/npc/0/0_8.jpg',
			'51c97426564f83096bae6509fc2b301b' : '/img/npc/0/0_9.jpg',
			'c5187db1c5f7b02ad0aba1165a2ab65e' : '/img/npc/0/1_1.jpg',
			'9e0550a4e5a48939030000ceb9760ff2' : '/img/npc/0/1_2.jpg',
			'cc54bea8c392de770ad52a7eca865473' : '/img/npc/0/1_3.jpg',
			'a184fc557e5f50794c904c7b139b266a' : '/img/npc/0/1_4.jpg',
			'd93584fd10b18283c202b1c472ecb04f' : '/img/npc/0/1_5.jpg',
			'beb79b22242ca01a49a1de4cce531a42' : '/img/npc/0/1_6.jpg',
			'67cd2d7eed71992c311ff16d280daa9d' : '/img/npc/0/1_7.jpg',
			'359601ed8377e2fa4d8a3c0c395a3ea5' : '/img/npc/0/1_8.jpg',
			'89d5754ffadd87a19ede2c20b1bc9604' : '/img/npc/0/1_9.jpg',
			'8cd722e66b1319f3f6cb6d503b3d824c' : '/img/npc/0/1_10.jpg',
			'a7e8d22b72011f53b3a72e30c7582a9f' : '/img/npc/0/1_11.jpg',
			'ea0b6866827dd5a5a5b06f044d4474bb' : '/img/npc/0/1_12.jpg',
			'4ca7bcd9f43d8f36e52d883f9d3e55a1' : '/img/npc/0/1_13.jpg',
			'561eb1c71b47acd3e3023585cfa783c7' : '/img/npc/0/1_14.jpg',
			'8ebe89a6fe6f47a87f53cdf6edd8ac94' : '/img/npc/0/1_15.jpg',
			'50d6b951917128124076726b828b4c25' : '/img/npc/0/1_16.jpg',
			'0dbaf81253e8f0420279f0e14b72c2a5' : '/img/npc/0/1_17.jpg',
			'bf9e8bbe18d3d45f0e820d32cf730543' : '/img/npc/0/1_18.jpg',
			'7e6e062106b25f33b28692a7c4aebcd4' : '/img/npc/0/1_19.jpg',
			'abe4fb2466866bddeea0c26a68a6b3ea' : '/img/npc/0/1_20.jpg',
			'6c161b921bae1ff254f34e466875ec42' : '/img/npc/0/1_21.jpg',
			'f5234d2ba5754a96987be0babc627f9d' : '/img/npc/0/1_22.jpg',
			'f5234d2ba5754a96987be0babc627f9d' : '/img/npc/0/1_23.jpg',
			'6c161b921bae1ff254f34e466875ec42' : '/img/npc/0/1_24.jpg',
			'f89ee2fc8b59b0973412864dfe749ccc' : '/img/npc/0/1_25.jpg',
			'22b5ec9d386f70509a9a02740c21e826' : '/img/npc/0/1_26.jpg',
			'9ff30549d00ff8e417e0d9f178b3bbbc' : '/img/npc/0/1_27.jpg',
			'39d556b93d1dd46c37ec1a8632078886' : '/img/npc/0/1_28.jpg',
			'04cdf8c84c5a96423c6a6c6ee9484ac1' : '/img/npc/0/1_29.jpg',
			'0ac4cb0f5a6bcf237d0b21376ecd155c' : '/img/npc/0/1_30.jpg',
			'bddf2b1cb493880f91253822059ec813' : '/img/npc/0/1_31.jpg',
			'88f139aa89d27dbacf7b91ee6bcea7d2' : '/img/npc/0/1_32.jpg',
			'63f559ab2226acf7e5b5a5d6dccff28d' : '/img/npc/0/1_33.jpg',
			'34d31b305686a94d897e695d52dd3261' : '/img/npc/0/1_34.jpg',
			//'f4b2321e2b3f19fcfe79b81f00ddabc1' : '/img/npc/0/1_35.jpg',
			//'6e22c2724c9cf93ef8d44fb7e2deb623' : '/img/npc/0/1_36.jpg',
			//'8840142760a38d0f413a585408192d12' : '/img/npc/0/1_37.jpg',
			//'8630bc28dd4dcde9cc5ee32fd7ca093b' : '/img/npc/0/1_38.jpg',
			//'772e3e3a1edac5a43b2faea9706d66f1' : '/img/npc/0/1_39.jpg',
			//'89503e03d8fc26f8be73b100cfe4d0d9' : '/img/npc/0/1_40.jpg',
			//'fec198bed086554783fde1597a3390ff' : '/img/npc/0/1_41.jpg',
			//'be365e4a9475feae21f9b65d214dfdde' : '/img/npc/0/1_42.jpg',
			'7cd4d5e444152aee4b6bd676beec6a3f' : '/img/npc/0/2_1.jpg',
			'6303de0e8dbdfecbfc716985caf96318' : '/img/npc/0/2_2.jpg',
			'a111637175ff2a6b31f60b190a08a1d6' : '/img/npc/0/2_3.jpg',
			'd4abee5a7a9ae55db33d7c23149fb9b7' : '/img/npc/0/2_4.jpg',
			'c8fad777425795021b8a8a5a8555058c' : '/img/npc/0/2_5.jpg',
			'b52f058bc58f7ea66f601e21d7b133c8' : '/img/npc/0/2_6.jpg',
			'c345041d84700b2c824c92fe99338392' : '/img/npc/0/2_7.jpg',
			'019260c98631e1faf6a2647ebaaaa1e8' : '/img/npc/0/2_8.jpg',
			'f63eec422be1fd658bae6d628a329e65' : '/img/npc/0/2_9.jpg',
			'e8f06d243e54e18f14b6e37c94d5bcbf' : '/img/npc/0/2_10.jpg',
			//'f1568a2b96e19c9a61ba64dfc8366e2f' : '/img/npc/0/2_11.jpg',
			//'20559c85adcda781f1c9c074f7aaca75' : '/img/npc/0/2_12.jpg',
			//'0a3c5a960a49c43c40e56896e9de2e24' : '/img/npc/0/2_13.jpg',
			//'11f93cf36db4b1d0c5b48f6df67bfd12' : '/img/npc/0/2_14.jpg',
			//'af1b10116bd527c57cef364fef5b097e' : '/img/npc/0/2_15.jpg',
			'1edbed7f18ab302ac7446a3b5b1592ed' : '/img/npc/1/0_1.jpg',
			'e1a00db35bd203ed49db6e276bbb62ea' : '/img/npc/1/0_2.jpg',
			'a45c7b73d8dc8d0781bb2225db2fa49c' : '/img/npc/1/0_3.jpg',
			'4e3339f2e3aa07b81be81b6ff38aebfc' : '/img/npc/1/0_4.jpg',
			'40dc384a8570e2e8a0545970f7b3327a' : '/img/npc/1/0_5.jpg',
			'2e7d93d46978c9f71fba8f57e0e7863b' : '/img/npc/1/0_6.jpg',
			'56d31dfb62b2f7bf25bff743c1641174' : '/img/npc/1/0_7.jpg',
			'd03511bf3d850f9a62f9a2a6b62d2873' : '/img/npc/1/0_8.jpg',
			'51c97426564f83096bae6509fc2b301b' : '/img/npc/1/0_9.jpg',
			'e1b28ec72a53cbb684b838d25ed205ff' : '/img/npc/1/1_1.jpg',
			'739a8088faade8c7ca9d77c16915cea3' : '/img/npc/1/1_2.jpg',
			'e06e195ef656d7e1c3614aa5bc98be7b' : '/img/npc/1/1_3.jpg',
			'039f1050696c2acfc9502ba5864e3b32' : '/img/npc/1/1_4.jpg',
			'1f3d1f8fc82d77d568db9db5aba2503f' : '/img/npc/1/1_5.jpg',
			'f28dcaae8700cb60cc32bd58843a915e' : '/img/npc/1/1_6.jpg',
			'784c99043689a5eb4756d131f2e24d3c' : '/img/npc/1/1_7.jpg',
			'ae90148352efef3eb89ba72ab1272e2a' : '/img/npc/1/1_8.jpg',
			'1ff5afc0d5900b9e68958dc6d4885a3b' : '/img/npc/1/1_9.jpg',
			'766e750cdb955edd80ed7dc4a4178965' : '/img/npc/1/1_10.jpg',
			'7182b1558c5f5eff9d9bfa43f8065822' : '/img/npc/1/1_11.jpg',
			'0966f88708c7e3209764a65779228f82' : '/img/npc/1/1_12.jpg',
			'0be5a6df9e00cdeffe0557b08281498a' : '/img/npc/1/1_13.jpg',
			'25448d76cfa4777a8866ee858318ed29' : '/img/npc/1/1_14.jpg',
			'84754306975170a6256d9e5e0b0572bd' : '/img/npc/1/1_15.jpg',
			'dfc51232d0d8c741c69108bf5857b2e0' : '/img/npc/1/1_16.jpg',
			'3656a1b89cd8778a0f33884153c7e52e' : '/img/npc/1/1_17.jpg',
			'5c570124818466e6b9e0c0825c2dd79d' : '/img/npc/1/1_18.jpg',
			'887ff34bd4cf4d5c63eeaadae021cbb7' : '/img/npc/1/1_19.jpg',
			'1bc846ecb527c274375b63e07aecfe9e' : '/img/npc/1/1_20.jpg',
			'fdfaaeb9f9bc808cea06d840bdf89a48' : '/img/npc/1/1_21.jpg',
			'77e4258f347ed39653613e4927005536' : '/img/npc/1/1_22.jpg',
			'46c07ad06be35b733c6e9696c84dcd19' : '/img/npc/1/1_23.jpg',
			'0652eb1c3db4ac7d81ec490abd92f1b7' : '/img/npc/1/1_24.jpg',
			//'a2e43fe445c4ccedd826b333bff8023f' : '/img/npc/1/1_25.jpg',
			//'e0eb7f95b1b16e176c4a41b321a18f8b' : '/img/npc/1/1_26.jpg',
			//'95c43250eca250b58b90a6c5a5d55339' : '/img/npc/1/1_27.jpg',
			//'3fe305eaca5dc5ee3f5dd592229b71a2' : '/img/npc/1/1_28.jpg',
			'6d999cd42b9848a67654fcbe3116994d' : '/img/npc/1/2_1.jpg',
			'8ebbdd16be875d5c6700a3d2e52714d9' : '/img/npc/1/2_2.jpg',
			'7c8ec7992963b6df700d7aa0e9ddf8bb' : '/img/npc/1/2_3.jpg',
			//'ccc2eec908ec26535f1ca00aec69f057' : '/img/npc/1/2_4.jpg',
			//'676c3fbf4c1680031b5d5c51e1d8f3e5' : '/img/npc/1/2_5.jpg',
			//'7422627722a76b2b0c1b83a428c36320' : '/img/npc/1/2_6.jpg',
			//'c8b1c57ea54c0af5d27dfe1d2a43d2a8' : '/img/npc/1/2_7.jpg',
			//'4151d3ab5b16c608ea5a393452d34132' : '/img/npc/1/2_8.jpg',
			//'52c152e278c0a709fb4e1b8b62a10816' : '/img/npc/1/2_9.jpg',
			//'d3c96b582170c2db541eb4e6885f9838' : '/img/npc/1/2_10.jpg',
			//'083b6c5702811191a41dd48f6ff89647' : '/img/npc/1/2_11.jpg',
			//'d0a9f8ea7fcb4a0c5c599769cbacc8a0' : '/img/npc/1/2_12.jpg',
			//'9503810bf5f6167050acbac0af435c27' : '/img/npc/1/2_13.jpg',
			//'db5d492fed616cf30cf66d53b5f76e3c' : '/img/npc/1/2_14.jpg',
			//'d5c3bfdb6b8f8b0b21fa10db1e4a8a38' : '/img/npc/1/2_15.jpg',
			//'003451d7ceaf34b2e265c5f3e7982c51' : '/img/npc/1/2_16.jpg',
			'5ad53b8015b3cdacbcd3ac5452fb0de1' : '/img/npc/2/0_1.jpg',
			'2137a5d7e6388be4ddd7781de0ae6a4b' : '/img/npc/2/0_2.jpg',
			'8a8090da7df5fdfcfe3fabca7c69df03' : '/img/npc/2/0_3.jpg',
			'40b8580e09beb8cea9cb16b14c2cf015' : '/img/npc/2/0_4.jpg',
			'aa7b573ef6374ac99a05a34ba1a8088f' : '/img/npc/2/0_5.jpg',
			'6ae94415e68616ae1d6c7668b4c27fad' : '/img/npc/2/0_6.jpg',
			'53161d56d89537cbcc639e73fb0a1383' : '/img/npc/2/0_7.jpg',
			'8d6f2a60de2428ed066fa4d892865a49' : '/img/npc/2/0_8.jpg',
			'51c97426564f83096bae6509fc2b301b' : '/img/npc/2/0_9.jpg',
			'51feea0e7f835a473849731f0cb50d07' : '/img/npc/2/1_1.jpg',
			'330d305e7413c5ece236868dfc11a363' : '/img/npc/2/1_2.jpg',
			'a7e8d22b72011f53b3a72e30c7582a9f' : '/img/npc/2/1_3.jpg',
			'e9dc3c1437184dc782eef80852a72067' : '/img/npc/2/1_4.jpg',
			'86ac32278e5d2d411e551c00a7e27365' : '/img/npc/2/1_5.jpg',
			'b44eb495e21a9b96e710fb183858a1ec' : '/img/npc/2/1_6.jpg',
			'edee5e8b73fa23851b7f333e5f23abe4' : '/img/npc/2/1_7.jpg',
			'426c32ec62e4957d8017a441cd15fbb6' : '/img/npc/2/1_8.jpg',
			'e947509349370b0177718c69957b0809' : '/img/npc/2/1_9.jpg',
			'8cd722e66b1319f3f6cb6d503b3d824c' : '/img/npc/2/1_10.jpg',
			'9b2a2a3b9c020967488a1a63b55901b5' : '/img/npc/2/1_11.jpg',
			'455306754cd00ead254e12e12af72df4' : '/img/npc/2/1_12.jpg',
			'9d4e58e03b23464b30ccc761d5f83fcf' : '/img/npc/2/1_13.jpg',
			'ef3b00d40cfc3b0966e87912d3cf1d99' : '/img/npc/2/1_14.jpg',
			'6745b92282b17682779039633d48b41d' : '/img/npc/2/1_15.jpg',
			'466206ebe87ee36e0dd668e47ba03f05' : '/img/npc/2/1_16.jpg',
			'6d10ccd94afff7fc9f4f7e75a413fc51' : '/img/npc/2/1_17.jpg',
			'e266f08dfe0a1ebe29a5378585d3f69f' : '/img/npc/2/1_18.jpg',
			'e09e3cabe4ce06b8be6c7e1eb1488734' : '/img/npc/2/1_19.jpg',
			'a3741500539bd4084e80bf0ca4ef3a03' : '/img/npc/2/1_20.jpg',
			'8c229fb54f29c3563324291bb3049a3c' : '/img/npc/2/1_21.jpg',
			//'3e34c66de26971658d11f9a2caae4db1' : '/img/npc/2/1_22.jpg',
			//'475ad3e6fd076ec3cd12dd9f6fc47cb4' : '/img/npc/2/1_23.jpg',
			//'ebf840d429f94fd0b0a0cf9114182615' : '/img/npc/2/1_24.jpg',
			//'a3ce9bf2fabc6c2bc947a000e9f02a82' : '/img/npc/2/1_25.jpg',
			//'8881b610a31a9b78d457372c84a1ce23' : '/img/npc/2/1_26.jpg',
			//'5b5484e0f3b14aad8f8b48baa124a55d' : '/img/npc/2/1_27.jpg',
			//'75fddc5a714acae226320e1f3985915c' : '/img/npc/2/1_28.jpg',
			'bf1a2a56307f51d82dcf6581534a392d' : '/img/npc/2/1_29.jpg',
			'93230fc8d3268e05c79944a17ca8b58b' : '/img/npc/2/1_30.jpg',
			'195223495ed346f0b37786f2c519246f' : '/img/npc/2/1_31.jpg',
			'2aad144e0643fa82b36de31b4d9b7b1c' : '/img/npc/2/1_32.jpg',
			'6aee6c6305b48b14824c1e7274d788e8' : '/img/npc/2/2_1.jpg',
			'2a728d564d1a03ad9d01893b832dc303' : '/img/npc/2/2_2.jpg',
			'02c4efbf6a6f2e1e85a8a9d4ea7b9e3f' : '/img/npc/2/2_3.jpg',
			//'92f669e63df5aec1c63b7c82c7cfda5f' : '/img/npc/2/2_4.jpg',
			//'217fac9c6cda767232bc09b49ae02c06' : '/img/npc/2/2_5.jpg',
			//'6d999cd42b9848a67654fcbe3116994d' : '/img/npc/2/2_6.jpg',
			//'3c62c0dd61d991f3c5b3d7a82cd685ef' : '/img/npc/2/2_7.jpg',
			//'4d36f3cc65d138294bc7c41509ef6909' : '/img/npc/2/2_8.jpg',
			'e84e901247e1413cdcbb48a3a9d5612e' : '/img/npc/2/2_9.jpg',
			//'d25c139b77c0201d7b3b064f53518ab4' : '/img/npc/2/2_10.jpg',
			//'bfa3aef9e00833740776161cf2ae2f5f' : '/img/npc/2/2_11.jpg',
			//'90284de464cfbcc3a2e33883d3503b6b' : '/img/npc/3/0_2.jpg',
			//'5be29d72d8074dd4cc5321802a627479' : '/img/npc/3/0_3.jpg',
			//'41181e91d1d3236066a7c274db51c605' : '/img/npc/3/0_4.jpg',
			//'aa469834f12b2ee5a41a2ad20e57170d' : '/img/npc/3/1_1.jpg',
			//'75b696ee085cc1ba783947781d0aa24d' : '/img/npc/3/1_2.jpg',
			//'7f7b45150b70a6da4724717111db036f' : '/img/npc/3/1_3.jpg',
			//'703381ef3e2d7dee8277f0e165e312bb' : '/img/npc/3/1_4.jpg',
			//'47132c8dcd464cb9e2484987aface536' : '/img/npc/3/2_1.jpg',
			//'272b7d208012181747ec2e94e3426b46' : '/img/npc/3/2_2.jpg',
			//'36dce2c7f9b6c5fb021709f9161081b7' : '/img/npc/3/2_3.jpg',
			//'4c3a45f569ec337c6adb09ed059eabe5' : '/img/npc/3/2_4.jpg',
			//'ceac6ca1a45d1ec902072f3a14b27518' : '/img/npc/3/3_1.jpg',
			//'07bd9abf9ae466ed23aae565661e2029' : '/img/npc/3/3_2.jpg',
			//'fcc655505f49ccabe243a006b9b45e7e' : '/img/npc/3/3_3.jpg',
			//'61df961108d9f086a14062f161e199f3' : '/img/npc/3/3_4.jpg',
			//'9334f1028eacba2dd3cf6409167607df' : '/img/npc/4/0_1.jpg',
			//'cc2f7d4c407b4e4f777014084ad4412f' : '/img/npc/4/0_2.jpg',
			//'0e949e1a3e35a1a93410e4e98128079d' : '/img/npc/4/0_3.jpg',
			//'e961d41a7569f6441f272f1064dfb6f3' : '/img/npc/4/0_4.jpg',
			//'17f3cb9a00b5d8dfad63a8a3d3625dd6' : '/img/npc/4/0_5.jpg',
			//'4f90a19a0d1667303dc979629296ef71' : '/img/npc/4/0_6.jpg',
			//'5235b507d9525669a3ef098c9e8e85dc' : '/img/npc/4/0_7.jpg',
			//'8e54e1b448d34c01d0f1c5d5f7fa58aa' : '/img/npc/4/0_8.jpg',
			//'51c97426564f83096bae6509fc2b301b' : '/img/npc/4/0_9.jpg',
			'd5d8f31cde7ace688220b2cba25bcf8c' : '/img/npc/4/1_1.jpg',
			'8f0c426efa269027825980ea90db1df3' : '/img/npc/4/1_2.jpg',
			'c345a1e26918f9ce3e9ad00aeb01274b' : '/img/npc/4/1_3.jpg',
			'767852341b86709930ce5a964928ca0b' : '/img/npc/4/1_4.jpg',
			'3015fc7f911e5de59fa899a907e1d172' : '/img/npc/4/2_1.jpg',
			'c02eba3e1443a935c8c7c33c9c6898d2' : '/img/npc/4/2_2.jpg',
			'e9bb23f71f767176ca2444f8bc1c2865' : '/img/npc/4/2_3.jpg',
			'89ac050c99b685658f5b65511ac83d45' : '/img/npc/4/2_4.jpg',
			'd8e4b82f457b0803419ce2c50f5255' : '/img/npc/4/3_1.jpg',//'c2a474580a0e4fd19f7990532c064604'
			'5d44a11052e740a8ec483e76f181a7' : '/img/npc/4/3_2.jpg',//'34cc0c80e527503c1b074407e746a0c3'
			'a2611142886c9c6634cbb31e0cdb5e' : '/img/npc/4/3_3.jpg',//'e4417400de107ee48b811efd66dce15a'
			'30c496661bc490a06b5c212124f4fe' : '/img/npc/4/3_4.jpg',//'c5b3c8a465e288c9211b4d6272d692f1'
			'28735e13275819747922c16a516a5b' : '/img/npc/4/4_1.jpg',//'fca1ff0fda2a8079c11f69fb0c8311ae'
			'd84f6adad4686ae45ff5b98fcbc692' : '/img/npc/4/4_2.jpg',//'9579474af297df287385a087f828a3b9'
			'b173612baddf3d7dadbcdb823d3a19' : '/img/npc/4/4_3.jpg',//'62b23ca64c300005611da826fb07fd29'
			'bac7e539d61a9de6caec21363c2694' : '/img/npc/4/4_4.jpg',//'ef28313eb51b992c45f35e498036e7fe'
			'8fc1dc28a272c41b475828a8107afe' : '/img/npc/4/5_1.jpg',//'0c0ec352be06b8cf1a24c144abd21199'
			'0ead089e64b248786fb3e126ffcf7f' : '/img/npc/4/5_2.jpg',//'9ce4a8baf2dbcbc6bf9576c14d392ca3'
			'99db5b8f77050f201cf67dc8e5bf9d' : '/img/npc/4/5_3.jpg',//'e4f822b3e9958abdecf4bb83c9cb906e'
			'cdbea7d87f34475e22555256f0f942' : '/img/npc/4/5_4.jpg',//'1febc10b7638b3801701e8e6c5c7adbc'
			'b98041c012f259885ba823c53eeaca' : '/img/npc/4/6_1.jpg',
			'195c75c0ba9e8fadda41b58b107b84' : '/img/npc/4/6_2.jpg',
			'3ae0563db2cd7241d349f766002b3b' : '/img/npc/4/6_3.jpg',
			'9dd0228c3a6c8dfe9e5b9bd20f50a5' : '/img/npc/4/6_4.jpg',
			'841d17a434e2018c8c84c1fa2271a5' : '/img/npc/4/7_1.jpg',
			'e3e4aa1f515a7c28ce7812c3ac63b7' : '/img/npc/4/7_2.jpg',
			'f4e1cd5cd2438f5a41c47814d0a710' : '/img/npc/4/7_3.jpg',
			'18b0984d6a55da3e034e4760628b7f' : '/img/npc/4/7_4.jpg',

			'ae904194973d21066c96cb414d04d676' : '/img/expedition/enemy_unknown.jpg'
		}
	}
};

// Init extension sendMessage functions
(function(){
	// On chromium based browsers
	if (window.chrome && window.chrome.runtime && window.chrome.runtime.sendMessage) {
		// Send Message to the extension
		gca_tools.extension.sendMessage = function (message, callback) {
			window.chrome.runtime.sendMessage(window.gca_extension.id, message, (response) => {
				callback(response);
			});
		}
	}
	// On other browsers (Firefox)
	else {
		// Setup communication with the background page
		(function(){
			// Talk to the extension script through events on this script's element
			// The extension script will forward the request to the background page
			//  - the `gca-ping` event, to send messages
			//  - the `gca-pong` event, to receive messages

			// Hold the current script in a variable
			let element = document.currentScript;
			// Increment to flag each request
			let increment = 0;
			// Hold the requests here
			let callbacks = {};

			// Send Message to the extension
			gca_tools.extension.sendMessage = function (message, callback) {
				let id = ++increment + '';
				callbacks[id] = callback;
				// Fire custom event
				let e = new CustomEvent('gca-ping', {detail: {id, message}});
				element.dispatchEvent(e);
			}

			// Get response from the extension
			element.addEventListener('gca-pong', () => {
				// For each callback waiting for a response
				for (let id in callbacks) {
					if (callbacks.hasOwnProperty(id)) {
						// Check if response for that callback was received
						let msg = 'message-' + id;
						if (element.dataset.hasOwnProperty(msg)) {
							let message = element.dataset[msg];
							delete element.dataset[msg];
							// Parse the message from JSON string
							message = (message === 'undefined') ? undefined : JSON.parse(message);
							if (typeof callbacks[id] === 'function') {
								let callback = callbacks[id];
								delete callbacks[id];
								setTimeout(() => {callback(message)}, 0);
							}
						}
					}
				}
			});
		})();
	}
})();

// Load Stuff
(() => {
	// Try to load sound
	if (window.gca_audio_loader) window.gca_audio_loader();
	
	// Remove script
	document.currentScript.remove();
})();

// ESlint defs
/* global gca_data, gca_getPage, gca_locale, gca_notifications, gca_resources, gca_tools */
/* global jQuery */
