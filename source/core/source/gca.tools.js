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
			this._serverDateString = sDate[3] + "." + sDate[2] + "." + sDate[1];
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
			var time = html.match(/<span id="server-time" data-start-time="\[(\d+),(\d+),(\d+),(\d+),(\d+),(\d+),(\d+)\]">/i);
			if(time == null){
				return 0;
			}
			return new Date(
				parseInt(time[1], 10),
				parseInt(time[2], 10) - 1,
				parseInt(time[3], 10),
				parseInt(time[4], 10),
				parseInt(time[5], 10),
				parseInt(time[6], 10),
				parseInt(time[7], 10)
			).getTime();
		}
	},


	// Set a tooltip
	// -------------------------------------------------- //
	setTooltip : function(el, data){
		el.dataset.tooltip = data;
		// If function is availiable
		if(typeof window.tooltips != "undefined"){
			window.tooltips.set(el, data);
		}
	},


	// Item Shadow
	// -------------------------------------------------- //
	// item.shadow.add(item)
	// item.shadow.getColor(tooltip)
	// item.move(item, target[, size])
	// -------------------------------------------------- //
	item : {

		// Item Shadow
		shadow : {

			// Get Tooltip Color
			getColor : function(data){
				// Parse data
				if(typeof data == "string" && data.length > 0)
					data = JSON.parse(data);

				// Get color
				var color = "";
				if(data[0] && data[0][0] && data[0][0][1])
					color = data[0][0][1];

				// Find color
				if(color.match("white"))
					return "white";
				if(color.match("lime"))
					return "green";
				if(color.match("#5159F7"))
					return "blue";
				if(color.match("#E303E0"))
					return "purple";
				if(color.match("#FF6A00"))
					return "orange";
				if(color.match("#FF0000"))
					return "red";

				// Default
				return false;
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
		/*
		move : function(item, target, size){
			// Get target
			var target = this._move.resolveMoveTraget(item, target);

			// If many targets
			if(target instanceof Array){
				// Translate size
				if(typeof size === "string")
					size = this.droppable[size];
				// Create tables
				var tables = this._move.createTables(size[0], size[1], target);
				// Get item size
				var itemSize = this._move.getSize(item);
				// Find spot
				var spot = this._move.findSpot(itemSize[0], itemSize[1], tables.grid);
				// Validate spot
				if(!spot) return false;
				// Translate to target
				target = target[ tables.index[spot[0]][spot[1]] - 1 ];
			}

			// Validate target
			if(!target) return false;
			// Convert to jQuery
			target = jQuery(target);
			item = jQuery(item);

			// Prepare item
			item.data("ui-draggable").originalPosition = item.offset();
			// Drop item
			target.droppable('option', 'drop').call(target, null, {
				draggable : item,
				offset : target.offset()
			});

			// Return
			return true;
		},

		droppable : {
			INV : [8, 5],
			SHOP : [6, 8]
		},

		_move : {

			resolveMoveTraget : function(item, target){
				// If array of targets
				if(target instanceof Array){
					return target;
				}
				// If not jQuery element
				else if(!(target instanceof jQuery)){
					// Make target jQuery
					target = jQuery(target);
				}

				// Id droppable
				if(target.hasClass("ui-droppable")){
					target = target[0];
				}
				// If droppable grid
				else if(target.hasClass("ui-droppable-grid")){
					// Build grid droparea
					this.rebuildGridDropareas(item, target);
					// Get targets
					target = target.find(".ui-droppable.grid-droparea");
				}
				// If not droppable
				else{
					target = target.find(".ui-droppable");
				}

				// Return to normal jQuery
				if(target instanceof jQuery){
					if(target.length == 0){
						return false;
					}
					else if(target.length == 1){
						target = target[0];
					}
					else{
						var array = [];
						target.each(function(){
							array.push(this);
						});
						target = array;
					}
				}

				// If target found
				if(target)
					return target;
				// Failed
				return false;
			},

			rebuildGridDropareas : function(drag, el){
				var gridSizes = [];
				$(el).each(function(i) {
					gridSizes[i] = {
						w: Math.round($(this).width() / 32),
						h: Math.round($(this).height() / 32)
					}
				});
				$(el).find(".grid-droparea").remove();
				$(el).each(function(i) {
					var drop = $(this);
					if (!drop.is(".ui-droppable-grid") || drag.data("questType")) {
						return
					}
					var w = gridSizes[i].w,
						h = gridSizes[i].h,
						map = this.buildDroppableMap(drop.children().not(drag), w, h);
					for (var x = 0; x < w; x++) {
						for (var y = 0; y < h; y++) {
							var cell = new GridCell(drop.data("contentTypeAccept") || 0, map, x, y);
							if (!map[x][y] && cell.accepts($(drag))) {
								drop.prepend(cell.createDroppable())
							}
						}
					}
				});
				return el
			},

			buildDroppableMap : function(elements, w, h) {
				var map = new Array(w);
				for (var i = 0; i < w; i++) {
					map[i] = new Array(h)
				}
				elements.each(function() {
					var obj = $(this),
						l = obj.data("positionX") - 1,
						t = obj.data("positionY") - 1,
						w = obj.data("measurementX"),
						h = obj.data("measurementY");
					for (var x = 0; x < w; x++) {
						for (var y = 0; y < h; y++) {
							map[l + x][t + y] = this
						}
					}
				});
				return map;
			},

			// Create
			createTables : function(grid_width, grid_height, grid_spots){
				// Results
				var table = {};
				// Variables
				var x, y;

				// Init tables
				table.grid = [];
				table.index = [];
				for (var i = 0; i < grid_width; i++) {
					x = [];
					y = [];
					for (var j = 0; j < grid_height; j++) {
						x.push(1);
						y.push(0);
					}
					table.grid.push(x);
					table.index.push(y);
				}

				// Populate tables
				for (var i = 0; i < grid_spots.length; i++) {
					x = (parseInt(grid_spots[i].style.left) / 32);
					y = (parseInt(grid_spots[i].style.top) / 32);
					table.grid[x][y] = 0;
					table.index[x][y] = i + 1;
				}

				// Return
				return table;
			},

			// Get size
			getSize : function(target){
				// Convert to jQuery
				if(!(target instanceof jQuery))
					target = jQuery(target);

				// Get sizes
				var x = (parseInt(target.width()) / 32);
				var y = (parseInt(target.height()) / 32);

				// Retrun sizes
				return [x, y];
			},

			// Find a spot on the table
			// -------------------------------------------------- //
			// Table has 0 on empty spots
			// -------------------------------------------------- //
			findSpot : function(item_width, item_height, table){
				// Variables
				var x,y,w,h;

				// Init found position
				var found = false;

				// Do magic stuff
				for(x=0; x<=table.length-item_width; x++){
					for(y=0; y<=table[0].length-item_height; y++){
						found = true;
						if(item_height == 1){
							if(table[x][y]==0){
								found = true;
							}else if(table[x+1][y]==0){
								x++;
							}else{
								found = false;
							}
						}else{
							for(w=0; w<item_width; w++){
								for(h=0; h<item_height; h++){
									if(table[x+w][y+h]==1){
										found = false;
										break;
									}
								};
								if(!found){
									break;
								}
							};
						}
						if(found){
							for(w=0; w<item_width; w++){
								for(h=0; h<item_height; h++){
									table[x+w][y+h] = 1;
								};
							};
							// BOOM! ... rabbit out of the hat
							found = [x, y];
							break;
						}
					}
					if(found){
						break;
					}
					if(item_height == 1){
						x++;
					}
				}
				return found;
			}

		}
		*/
	},


	// Events
	// -------------------------------------------------- //
	// event.addListener(name, callback)
	// event.fire(name[, data])
	// event.fireOnce(name[, data])
	// event.clearEventListeners(name)
	// event.item.onDrag(callback)
	// event.item.onDrop(callback)
	// event.request.onBeforeAjaxResponce(callback)
	// event.request.onAjaxResponce(callback)
	// event.bag.waitBag(callback)
	// event.bag.onBagOpen(callback)
	// -------------------------------------------------- //
	event : {
		// List of events
		event_list : {},
		once_event : {},

		// Add an event
		addListener : function(name, callback){
			// If no callback, no one is listening
			if(!callback) return;

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
				return;
			}

			// If event exist
			if(this.event_list[name]){
				this.event_list[name].push(callback);
			}
			// New list for this event name
			else{
				this.event_list[name] = [callback];
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
				jQuery(document).on('dragend', function(e){
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
			beforeAjaxResponce : {
				list : []
			},
			// on Before Callback
			onBeforeAjaxResponce : function(callback){
				if(!this.loaded)
					this.init();
				// Set an injector
				this.beforeAjaxResponce.list.push(callback);
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

					// Before responce
					var before = gca_tools.event.request.beforeAjaxResponce;
					if(before.list.length){
						for(var i = 0; i < before.list.length; i++){
							before.list[i](arg);
						}
					};

					// Call callback
					if(callbackDone !== undefined && typeof callbackDone === 'function') {
						callbackDone(arg.data, arg.elem);
					}

					// Fire event
					gca_tools.event.fire('ajaxresponce', {elem : arg.elem, data : arg.data});
				}, callbackFail, option);
			},

			// Ajax Event wrapper
			onAjaxResponce : function(callback){
				// Init it
				this.init();
				// Set a listener
				gca_tools.event.addListener('ajaxresponce', callback);
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

					// Overide
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

					// Get tab
					var tab = document.getElementById("inventory_nav").getElementsByClassName("current")[0];

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
			linkWrapper.innerHTML = "";

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
			var value;

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
			var page;

			// Push current
			pages.push(info.current);

			// Prepend pages
			var prepend_count = offset;
			prepend_page = info.current - info.skipping;
			while(prepend_count > 0 && info.first <= prepend_page){
				pages.unshift(prepend_page);
				prepend_page -= info.skipping;
				prepend_count--;
			}

			// Append pages
			var append_count = offset;
			append_page = info.current + info.skipping;
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
			this.img.src = "img/ui/blackoutDialog/icon_warning.jpg";
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


	// Create
	// -------------------------------------------------- //
	// create.goldIcon()
	// -------------------------------------------------- //
	create : {

		goldIcon : function() {
			var img = document.createElement("img");
			img.setAttribute("alt", "");
			img.setAttribute("src", "img/res2.gif");
			img.setAttribute("align", "absmiddle");
			img.setAttribute("border", "0");
			return img;
		}

	}

};
