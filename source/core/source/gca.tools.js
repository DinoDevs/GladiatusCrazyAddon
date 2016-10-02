/*
 * Addon Tools Script
 * Author: DarkThanos, GreatApo
 */

// Tools
var gca_tools = {
	// String Functions
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
		}
	},

	// Time functions
	time : {
		// Server's Timestamp
		_server : false,
		_serverDateString : false,
		_serverTimeString : false,
		// Update Server Time
		updateServerTime : function(){
			// Parse server's time
			var sDate = JSON.parse(document.getElementById("server-time").getAttribute("data-start-time"));
			// Bug fix - Wrong month?
			if(new Date().getMonth() == sDate[1]-1 && Math.abs(sDate[2] - (new Date().getDate()))<=1 ) sDate[1] -= 1;
			
			// Save time
			this._server = new Date(sDate[0], sDate[1], sDate[2], sDate[3], sDate[4], sDate[5], sDate[6]).getTime();
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
		msToHMS_String : function(d){
			d = parseInt(d);
			
			// Max values
			if(d >= 99*60*60*1000)
				return '99:00:00';
			
			var [hrs, mins, secs] = this.msToHMS(d);
			return (hrs<10? '0':'') + hrs + ':' + (mins<10? '0':'') + mins + ':' + (secs<10? '0':'') + secs;
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
		}
	},

	// Set a tooltip
	setTooltip : function(el, data){
		el.dataset.tooltip = data;
		// If function is availiable
		if(typeof setTooltip != "undefined"){
			setTooltip(el, data);
		}
	},

	// Item Shadow
	itemShadow : {

		// Get Tooltip Color
		getColor : function(data){
			// Parse data
			if(typeof data == "string")
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
			if(color.match("#E303E0"))
				return "blue";
			if(color.match("#5159F7"))
				return "purple";
			if(color.match("#FF6A00"))
				return "orange";
			if(color.match("#FF0000"))
				return "red";

			// Default
			return false;
		},

		// Add shadow
		add : function(element){
			// Get color
			var color = this.getColor(element.dataset.tooltip);
			// Add item's shadow
			element.className += " item-i-" + color;
		}

	},


	// Events
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

			// Sent Ajax wrapper
			sendAjax : function(elem, url, data, callbackDone, callbackFail, option){
				// Call original
				gca_tools.event.request.original.sendAjax(elem, url, data, function(data, elem){
					if(callbackDone !== undefined && typeof callbackDone === 'function') {
						callbackDone(data, elem);
					}
					// Fire event
					gca_tools.event.fire('ajaxresponce', {elem : elem, data : data});
				}, callbackFail, option);
			},

			// OnDrag Event wrapper
			onAjaxResponce : function(callback){
				if(!this.loaded)
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
					jQuery("#inventory_nav .current").click();
				});
			},

			// OnBagOpen
			onBagOpen : function(callback){
				if(!this.loaded)
					this.init();
				// Set a listener
				gca_tools.event.addListener('bagOpen', callback);
			}

		}


	}

};
