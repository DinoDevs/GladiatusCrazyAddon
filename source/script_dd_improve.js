/*
 * Addon Improve dd Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

if(dd)
	// Inject dd Actions
	dd.actions = {
		findInvSpaceFor : function(width, height){
			if(!dd.improve.containers.inv){
				return false;
			}

			var id = dd.improve.containers.inv;
			var found = this.getFreeSpot(width, height, this.getInvBinaryTable(id, 8, 5));

			if(!found){
				return false;
			} else {
				id += found;
				return dd.elements[id];
			}
		},
		findShopSpaceFor : function(width, height){
			if(!dd.improve.containers.shop){
				return false;
			}

			var id = dd.improve.containers.shop;
			var found = this.getFreeSpot(width, height, this.getInvBinaryTable(id, 6, 8));

			if(!found){
				return false;
			} else {
				id += found;
				return dd.elements[id];
			}
		},

		getFreeSpot : function(item_width, item_height, table){
			var x,y,w,h;

			var found = false;
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
						found = '_'+(x+1)+'_'+(y+1);
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
		},

		getInvBinaryTable : function(id, columns, rows){
			// Init Table
			var table = new Array(columns);
			for(var x=0; x<columns; x++){
				table[x] = new Array(rows);
			}

			// For every column
			for(var x=0; x<columns; x++){
				// For every row
				for(var y=0; y<rows; y++){
					// If spot free
					if(typeof table[x][y] == "undefined"){
						// Item id save
						var spot_id = id+'_'+(x+1)+'_'+(y+1);
						// If item exist
						if(typeof dd.elements[spot_id] != "undefined" && dd.elements[spot_id].iid!=0){
							for(var w=1; w*32<=dd.elements[spot_id].w; w++){
								for(var h=1; h*32<=dd.elements[spot_id].h; h++){
									table[x+w-1][y+h-1] = 1;
								}
							}
						}
						// If item not exist
						else{
							table[x][y] = 0;
						}
					}
				}
			}

			// Return table
			return table;
		}
	}

	// Improve dd
	dd.improve = {
		// Active containers
		containers : {
			bag : false,
			shop : false,
			packet : false
		},
		// Active mode
		mode : {
			eat : false,
			packet : false
		},
		// Inject code in dd
		inject : function(){
			// Init content menu
			dd.improve.contentMenu.init();

			// Check active containers
				// Check if bag exist
				if(document.getElementById('inv') && document.getElementById('inv').getElementsByTagName('div').length>0){
					this.containers.inv = document.getElementById('inv').getElementsByTagName('div')[0].id.substr(0,4);
				}
				// Check if Shop exist
				if(document.getElementById('shop') && document.getElementById('shop').getElementsByTagName('div').length>0){
					this.containers.shop = document.getElementById('shop').getElementsByTagName('div')[0].id.substr(0,4);
				}
			// Check active mode
				var mod = (document.location.href.match(/mod=\w+/i))?document.location.href.match(/mod=(\w+)/i)[1]:null;
				var submod = (document.location.href.match(/submod=\w+/i))?document.location.href.match(/submod=(\w+)/i)[1]:null;
				var doll = (document.location.href.match(/doll=\d+/i))?document.location.href.match(/doll=(\d+)/i)[1]:null;
				// Check if eat mode
				if(mod=="overview" && (submod==null || submod=="fetchLoginBonus") && (doll==null || doll=="1")){
					this.mode.eat = true;
				}
				// Check if eat mode
				if(mod=="packages"){
					this.mode.packet = true;
				}

			// Validate Containers
				if(this.containers.inv && !this.mode.eat && !this.mode.packet && !this.containers.shop){
					this.containers.inv = false;
					this.mode.eat = false;
				}
				if(this.containers.shop && !this.containers.inv){
					this.containers.shop = false;
				}
				if(this.mode.packet && !this.containers.inv){
					this.containers.packet = false;
				}else{
					this.containers.packet = true;
				}

			// Reinject when needed
				window.changeDraggable = (function(override){
					return function(bool){
						override(bool);
						if(bool)
							dd.improve.injectAllItems();
					};
				})(changeDraggable);
			
			// Inject every element
			dd.improve.injectAllItems();
			
		},

		// Inject Items
		injectAllItems : function(){
			// For every element
			for(id in dd.elements){
				dd.improve.injectOnItem(dd.elements[id]);
			}
		},
		
		// Inject Code on item
		injectOnItem : function(item){
			//dd.elements.p516_1_1 instanceof DDObj
			if(item.id == 'p274_1_1')
				console.log(item.contentdraggable, item.contentdroppable, item.injected);
			if(item instanceof DDObj && !item.injected && (item.injected == false || (item.contentdraggable == 1 && item.contentdroppable == 1))){
				// Set item as injected
				item.injected = true;
				// If item do not have data saved
				if(!item.iimage){
					if(!(item.div && item.div.getElementsByTagName('img').length>0)){
						return;
					}
					// Item info
					item.iimage = item.div.getElementsByTagName('img')[0].src.match(/\/img\/item\/(\d+_\d+\..+)/)[1];
					item.icategory = item.iimage.match(/(\d+)_\d+/)[1];
					item.isubcategory = item.iimage.match(/\d+_(\d+)/)[1];
					// Is Item Soulbound
					item.issoulbound = false;
					if((/nowrap='nowrap'>\([^\)]+\)<\/td>/).test(item.tooltip)){
						item.issoulbound = true;
					}
				} else {
					item.iid = null;
				}
				
				// Options
				var options = {
					collect : false,
					get : false,
					mark : false,
					sell : false,
					buy : false,
					eat : false
				};

				// If item is packet
				if(this.containers.packet && item.id.substr(0,6) == 'paket_'){
					options.get = true;
	// MARK IS DISABLED ---------------------------------------------------------------------------
					//options.mark = true;
					if(item.icategory == 14){
						options.collect = true;
						options.get = false;
					}
					item.div.addEventListener('contextmenu', (function(item){
						// Return callback function
						return function(e){
							e.preventDefault();
							dd.improve.contentMenu.open(e, item, options);
							return false;
						}
					})(item), false);
				
				// If item is in bag
				}else if(this.containers.inv && (new RegExp("^"+this.containers.inv+"_\\d_\\d$")).test(item.id)){
					if(item.iid!=null){
						if(this.containers.shop)
							options.sell = true;
						else if(this.mode.eat && item.div.getElementsByTagName('img').length>0 && (/img\/item\/7_\d+\.gif/i).test(item.div.getElementsByTagName('img')[0].src))
							options.eat = true;
					}
					item.div.addEventListener('contextmenu', (function(item){
						// Return callback function
						return function(e){
							e.preventDefault();
							if(options.sell || options.eat)
								dd.improve.contentMenu.open(e, item, options);
							return false;
						}
					})(item), false);
					if(options.sell){
						item.div.addEventListener("dblclick", (function(item){
							// Return callback function
							return function(e){
								e.preventDefault();
								dd.improve.contentMenu.inv_action.sell_dblclick(item);
								return false;
							}
						})(item), false);
					}

				// If item is in shop
				// p272_x_h, p273_x_h, p272_x_h --> WeaponSmith
				// p288_x_h, p289_x_h, p290_x_h --> BlackSmith
				// p304_x_h, p305_x_h, p306_x_h --> Genaeral Goods
				// p320_x_h, p321_x_h, p322_x_h --> Alhemist
				// p336_x_h, p337_x_h, p338_x_h --> Soldiers
				// p339_x_h, p340_x_h, p341_x_h --> Malefica
				}else if(this.containers.shop && (new RegExp("^"+this.containers.shop+"_\\d_\\d$")).test(item.id)){
					if(item.iid!=null){
						options.buy = true;
					}
					if(options.buy){
						item.div.addEventListener('contextmenu', (function(item){
							// Return callback function
							return function(e){
								e.preventDefault();
								dd.improve.contentMenu.open(e, item, options);
								return false;
							}
						})(item), false);
						item.div.addEventListener("dblclick", (function(item){
							// Return callback function
							return function(e){
								e.preventDefault();
								dd.improve.contentMenu.inv_action.buy_dblclick(item);
								return false;
							}
						})(item), false);
					}
				}
			}
		},
		
		// Content Menu
		contentMenu : {
			// Element
			element : null,
			buttons : [],
			item : null,
			// Init
			init : function(){
				// Create content menu div
				var div = document.createElement('div');
				div.style.display = 'none';
				div.style.position = 'absolute';
				div.style.backgroundColor = 'white';
				div.style.border = '1px solid #513F2C';
				div.style.boxShadow = '3px 3px 2px rgba(0, 0, 0, 0.4)';
				document.body.appendChild(div);
				
				// Save elements pointers
				dd.improve.contentMenu.element = div;

				// Collect gold (Packages)
				dd.improve.contentMenu.createButton('collect', 'Collect gold', function(){
					dd.improve.contentMenu.packet_action.getItem();
				});
				// Get item (Packages)
				dd.improve.contentMenu.createButton('get', 'Get item', function(){
					dd.improve.contentMenu.packet_action.getItem();
				});
				// Sell item (Shop)
				dd.improve.contentMenu.createButton('sell', 'Sell item', function(){
					dd.improve.contentMenu.inv_action.sell();
				});
				// Buy item (Shop)
				dd.improve.contentMenu.createButton('buy', 'Buy item', function(){
					dd.improve.contentMenu.inv_action.buy();
				});
				// Eat food (Inv)
				dd.improve.contentMenu.createButton('eat', 'Eat food', function(){
					dd.improve.contentMenu.inv_action.eat();
				});
				// Get item (Packages)
				dd.improve.contentMenu.createButton('mark', 'Mark item', function(){
					dd.improve.contentMenu.packet_action.markItem();
				});
				
				window.addEventListener('click', function(e){
					dd.improve.contentMenu.close();
				},false);
			},
			
			// Create button
			createButton : function(name, value, callback){
				var button = document.createElement('input');
				button.className = 'button1';
				button.type = 'button';
				button.value = value;
				button.style.display = 'block';
				button.style.outline = '0 !important';
				dd.improve.contentMenu.element.appendChild(button);
				dd.improve.contentMenu.buttons[name] = button;
				if(callback)
					button.addEventListener('click', callback, false);
			},
			
			// Open
			open : function(e, item, options){
				// Set content menu position
				dd.improve.contentMenu.element.style.top = e.pageY+'px';
				dd.improve.contentMenu.element.style.left = e.pageX+'px';
				// Set z-index
				dd.improve.contentMenu.element.style.zIndex = item.div.style.zIndex+10;
				// Set item
				dd.improve.contentMenu.item = item;
				// Set Options
				for(name in options){
					if(dd.improve.contentMenu.buttons[name]){
						if(options[name])
							dd.improve.contentMenu.buttons[name].style.display = "block";
						else
							dd.improve.contentMenu.buttons[name].style.display = "none";
					}
				};
				// Show
				dd.improve.contentMenu.element.style.display = 'block';
			},
			
			// Close
			close : function(){
				// Hide
				dd.improve.contentMenu.element.style.display = 'none';
				// Clear item
				dd.improve.contentMenu.item = null;
			},

			// Packet Action
			packet_action : {
				getItem : function(){
					var moveTo = dd.actions.findInvSpaceFor(
						dd.improve.contentMenu.item.w/32,
						dd.improve.contentMenu.item.h/32
					);
					if(moveTo){
						var id = moveTo.id;
						var iimage = dd.improve.contentMenu.item.iimage;
						var icategory = dd.improve.contentMenu.item.icategory;
						var isubcategory = dd.improve.contentMenu.item.isubcategory;
						var issoulbound = dd.improve.contentMenu.item.issoulbound;

						dd.obj = dd.improve.contentMenu.item;
						dd.obj.x = moveTo.x;
						dd.obj.y = moveTo.y;
						//var item = dd.improve.contentMenu.item;
						my_DropFunc();
						//DROP(dd.e.e);

						// Transfere data
						dd.elements[id].iimage = iimage;
						dd.elements[id].icategory = icategory;
						dd.elements[id].isubcategory = isubcategory;
						dd.elements[id].issoulbound = issoulbound;
						dd.elements[id].injected = false;
						dd.improve.injectOnItem(dd.elements[id]);
					}
				},

				markItem : function(){
					alert("Mark packet is curentrly under construction.");
				}
			},
			// Action
			inv_action : {
				sell_dblclick : function(item){
					// Save item pointer
					dd.improve.contentMenu.item = item;
					// Sell item
					dd.improve.contentMenu.inv_action.sell();
				},
				sell : function(){
					var moveTo = dd.actions.findShopSpaceFor(
						dd.improve.contentMenu.item.w/32,
						dd.improve.contentMenu.item.h/32
					);
					if(moveTo){
						var id = moveTo.id;
						var iimage = dd.improve.contentMenu.item.iimage;
						var icategory = dd.improve.contentMenu.item.icategory;
						var isubcategory = dd.improve.contentMenu.item.isubcategory;
						var issoulbound = dd.improve.contentMenu.item.issoulbound;

						// Save item's position
						item = dd.improve.contentMenu.item;
						var cssx = item.cssx;
						var cssy = item.cssy;
						var x = item.x;
						var y = item.y;

						dd.obj = dd.improve.contentMenu.item;
						dd.obj.x = moveTo.x;
						dd.obj.y = moveTo.y;
						//var item = dd.improve.contentMenu.item;
						my_DropFunc();
						//DROP(dd.e.e);

						// Resore Item position
						item.cssx = cssx;
						item.cssy = cssy;
						item.css.left = cssx+dd.px;
						item.css.top = cssy+dd.px;
						item.x = x;
						item.y = y;

						// Transfere data
						dd.elements[id].iimage = iimage;
						dd.elements[id].icategory = icategory;
						dd.elements[id].isubcategory = isubcategory;
						dd.elements[id].issoulbound = issoulbound;
						dd.elements[id].injected = false;
						//dd.improve.injectOnItem(dd.elements[id]);
					}
				},
				buy_dblclick : function(item){
					// Save item pointer
					dd.improve.contentMenu.item = item;
					// Sell item
					dd.improve.contentMenu.inv_action.buy();
				},
				buy : function(){
					var moveTo = dd.actions.findInvSpaceFor(
						dd.improve.contentMenu.item.w/32,
						dd.improve.contentMenu.item.h/32
					);
					if(moveTo){
						var id = moveTo.id;
						var iimage = dd.improve.contentMenu.item.iimage;
						var icategory = dd.improve.contentMenu.item.icategory;
						var isubcategory = dd.improve.contentMenu.item.isubcategory;
						var issoulbound = dd.improve.contentMenu.item.issoulbound;

						// Save item's position
						item = dd.improve.contentMenu.item;
						var cssx = item.cssx;
						var cssy = item.cssy;
						var x = item.x;
						var y = item.y;

						dd.obj = dd.improve.contentMenu.item;
						dd.obj.x = moveTo.x;
						dd.obj.y = moveTo.y;
						//var item = dd.improve.contentMenu.item;
						my_DropFunc();
						//DROP(dd.e.e);

						// Resore Item position
						item.cssx = cssx;
						item.cssy = cssy;
						item.css.left = cssx+dd.px;
						item.css.top = cssy+dd.px;
						item.x = x;
						item.y = y;

						// Transfere data
						dd.elements[id].iimage = iimage;
						dd.elements[id].icategory = icategory;
						dd.elements[id].isubcategory = isubcategory;
						dd.elements[id].issoulbound = issoulbound;
						dd.elements[id].injected = false;
						//dd.improve.injectOnItem(dd.elements[id]);
					}
				},

				eat : function(){
					// Player image item
					var moveTo = dd.elements.p8_1_1;

					// Define item
					var item = dd.obj = dd.improve.contentMenu.item;

					// Save item's position
					var cssx = dd.obj.cssx;
					var cssy = dd.obj.cssy;
					var x = dd.obj.x;
					var y = dd.obj.y;

					// Simulate Drag n Drop
					dd.obj.x = moveTo.x;
					dd.obj.y = moveTo.y;
					// Call item's drop event
					my_tmpDropFunc(dd.obj, moveTo, document.getElementById('doll').value);

					// Resore Item position
					item.cssx = cssx;
					item.cssy = cssy;
					item.css.left = cssx+dd.px;
					item.css.top = cssy+dd.px;
					item.x = x;
					item.y = y;
				},

				clearItem : function(item){
					item.div.style.visibility = "hidden";
					item.div.removeChild(item.div.getElementsByTagName("img")[0]);
					item.contentsize = 0;
					item.contentsizebase = 0;
					item.contenttype = 0;
					item.cssx = 0;
					item.cssy = 0;
					item.iid = 0;
					item.level = 0;
					item.preis = 0;
					item.tooltip = "";
					item.visible = !1;
					dd.recalc();
				}
			}
		}
	}

// Inject improvements code
if(dd && typeof(changeDraggable) != "undefined")
	dd.improve.inject();

// window.onload == dd.initz
// window.onunload == dd.finlz
// dd.loadFunc
