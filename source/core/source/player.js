/*
 * Addon Gods Script
 * Author: DarkThanos, GreatApo
 */

// Overview
var gca_player = {
	inject : function(){
	
		// Resolve Page
		this.overviewResolve();
		
		// Items shadow
		(gca_options.bool("global","item_shadow") && 
			this.itemShadow.inject());

		// Target Players List
		this.targetList.prepare(this);
		
		// TODO : add option
		this.show_buffs();
		
		// Show enemy durability
		(gca_data.section.get("global", "show_durability", 0) > 0 &&
			this.show_durability());
	},

	// Resolve Page
	overviewResolve : function(){
		// Default Values
		this.doll = 1;
		this.playerId = gca_getPage.parameter('p');
		this.playerName = null;

		this.isLoggedIn = (document.getElementById('icon_rubies') ? true : false);
		this.referrer = (document.referrer) ? gca_section.resolveUrl(document.referrer) : false;


		// Detect doll
		var dolls = document.getElementsByClassName('charmercsel');
		for (var i = 0; i < dolls.length; i++) {
			if(dolls[i].className == "charmercsel active"){
				this.doll = i+1;
				break;
			}
		}

		// Detect name
		if (this.doll == 1) {
			let name = document.getElementById('content');
			if (name) {
				name = name.getElementsByClassName('player_name_bg');
				if (name.length) {
					name = name[0].getElementsByClassName('ellipsis');
					if (name.length) this.playerName = name[0].innerHTML.trim();
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
			// Get doll divs
			var items = document.getElementById("char").getElementsByClassName("ui-droppable");

			// Add shadow to each item
			for(var i = items.length - 1; i >= 0; i--){
				// If item
				if(items[i].className.match("item-i-")){
					gca_tools.item.shadow.add(items[i]);
				}
			}

		}
	},

	// Target Players List
	targetList : {
		prepare : function(self) {
			if (self.doll != 1 || !self.playerName) return;
			// If not logged in and not cross server
			let isCrossServer = (self.referrer && self.referrer.country && self.referrer.server != gca_section.server && self.referrer.country == gca_section.country && self.referrer.sh);
			if (!self.isLoggedIn && !isCrossServer) return;

			// Check if it is disabled
			if (!isCrossServer && !gca_options.bool("arena","target_list")) return;

			this.self = self;
			this.isCrossServer = isCrossServer;
			this.inject();
		},

		inject : function() {
			this.id = this.self.playerId + '@' + gca_section.server;	

			// Check if target
			this.isTarget = false;
			if (!this.isCrossServer) {
				let list = gca_data.section.get('arena', 'target-list', {});
				this.isTarget = (list.hasOwnProperty(this.id) ? true : false);
			}

			// Add button
			var char = document.getElementById('char');
			this.btn = document.createElement('img');
			this.btn.className = 'gca-target-player-list-btn';
			this.btn.style.display = 'none';
			char.appendChild(this.btn);
			if (!this.isCrossServer) this.btn.addEventListener('click', () => {this.toggle();});
			else this.btn.addEventListener('click', () => {this.handleCrossServer(this.self.referrer);});
			this.update();
			this.btn.style.display = 'block';
		},

		update : function() {
			this.btn.src = (this.isTarget ? 'img/ui/quest/button_cancel.jpg' : 'img/ui/training/button.jpg');
			gca_tools.setTooltip(this.btn, JSON.stringify([[[(this.isTarget ? gca_locale.get('arena', 'target_list_remove') : gca_locale.get('arena', 'target_list_add')), 'white']]]));
		},

		toggle : function() {
			let list = gca_data.section.get('arena', 'target-list', {});
			// Remove from the list
			if (this.isTarget) {
				delete list[this.id];
			}
			// Add to the list
			else {
				list[this.id] = [gca_section.server, this.self.playerId, this.self.playerName, '#ffff00'];
			}
			gca_data.section.set('arena', 'target-list', list);
			this.isTarget = !this.isTarget;
			this.update();
		},

		handleCrossServer : function(info) {
			document.location.href = gca_getPage.crossLink(info, {
				mod : 'overview',
				submod : 'buddylist',
				sh : info.sh,
				gcamod : 'addtarget',
				target_server : gca_section.server,
				target_id : this.self.playerId,
				target_name : this.self.playerName
			});
		}
	},
	
	// Show player buffs
	show_buffs : function() {
		if(!document.getElementById('content'))
			return;
		
		var charstats = document.getElementById('charstats');
		var stats_translations = [];
		var a=2;
		while (charstats.getElementsByClassName('charstats_text')[a]){
			stats_translations.push(charstats.getElementsByClassName('charstats_text')[a].textContent);
			a++;
		}
		var b=1;
		while (charstats.getElementsByClassName('charstats_value21')[b]) {
			stats_translations.push(charstats.getElementsByClassName('charstats_value21')[b].textContent);
			b++;
		}
		
		// Buffs array
		var buffs = [];// category (1:oils, 2:max, 3:enisxiseis, 4:critical), stat(number), value 
		
		// Find Oil buffs
		var droppables = document.getElementById('char').getElementsByClassName('ui-droppable');
		for (let i = 1; i < droppables.length;i++) {
			if (typeof droppables[i].dataset.tooltip !== 'undefined') {
				if (droppables[i].dataset.tooltip.match(/\+(\d+) ([^\s]+)  /i) ){
					var buff = droppables[i].dataset.tooltip.match(/\+(\d+) ([^\s]+)  /i);
					// Find the stat
					let j = 0;
					var found = false;
					while (stats_translations[j] && !found) {
						if (stats_translations[j] == JSON.parse('"'+buff[2]+'"')) {
							buff[2] = j;
							found = true;
						}
						j++;
					}
					// Add to buffs
					if(found) buffs.push([1,buff[2],buff[1]]);
				}
			}
		}
		
		// Find Max/Enisxiseis buffs
		var charstats_bg = charstats.getElementsByClassName('charstats_bg');
		for (let i = 3; i <= 10; i++) {
			// Max
			if (charstats_bg[i].dataset.tooltip.match(/,(\d+)\],\["#00B712"/i)) {
				let buff = charstats_bg[i].dataset.tooltip.match(/,(\d+)\],\["#00B712"/i)[1] - Math.round(charstats_bg[i].dataset.tooltip.match(/,(\d+)\],\["#DDDDDD"/i)[1]*1.5 + parseInt(document.getElementById('char_level').textContent));
				buffs.push([2,i-3,buff+' max']);
			}
			// Enisxiseis
			if (charstats_bg[i].dataset.tooltip.match(/\+(\d+)"\],\["#00B712"/i)) {
				let buff = charstats_bg[i].dataset.tooltip.match(/\+(\d+)"\],\["#00B712"/i)[1];
				buffs.push([3,i-3,buff]);
			}
		}
		// Find Critical buff
		var char_schaden_tt = document.getElementById('char_schaden_tt');
		if (char_schaden_tt.dataset.tooltip.match(/>(\d+) %</i) && !document.location.href.match(/&doll=[3-6]/i)) {
			let buff = char_schaden_tt.dataset.tooltip.match(/>(\d+) %</i)[1] - Math.round(char_schaden_tt.dataset.tooltip.match(/,(\d+)\],\["#BA9700"/i)[1]*52/(parseInt(document.getElementById('char_level').textContent)-8)/5);
			if (buff > 0) {
				buffs.push([4,9,buff+'%']);
				stats_translations.push(char_schaden_tt.dataset.tooltip.match(/([^:]+):/gi)[8].match(/([^:]+):/)[1]);
			}
		}
		// Find Damage buff
		if (document.getElementById('char_schaden_tt').dataset.tooltip.match(/(\d+)</i)) {
			let buff = document.getElementById('char_schaden_tt').dataset.tooltip.match(/(\d+)</gi)[4].match(/(\d+)/)[1];
			if (buff > 0) {
				buffs.push([3,7,buff]);
			}
		}
		// Find Life buff
		var char_leben_tt = document.getElementById('char_leben_tt');
		if (char_leben_tt.dataset.tooltip.match(/(\d+)</i)){
			let buff = char_leben_tt.dataset.tooltip.match(/(\d+)</gi)[3].match(/(\d+)/)[1];
			if( buff>0 ){
				buffs.push([3,8,buff]);
				stats_translations[8] = char_leben_tt.getElementsByClassName('charstats_text').textContent;
			}
		}
		
		// Buff images
		var images = [
			[// oils
				['item-i-11-4'],
				['item-i-11-8'],
				['item-i-11-12'],
				['item-i-11-16'],
				['item-i-11-20'],
				['item-i-11-27'],
				['item-i-12-3'],
				['item-i-12-1']
			],
			[// max
				['powerups-powerup_3'],
				['powerups-powerup_3'],
				['powerups-powerup_4'],
				['powerups-powerup_4'],
				['powerups-powerup_1'],
				[''],
				[''],
				['']
			],
			[// enisxiseis
				['item-i-13-1'],
				['item-i-13-2'],
				['item-i-13-3'],
				['item-i-13-4'],
				['item-i-13-5'],
				['item-i-13-8'],
				['item-i-13-6'],
				['item-i-13-7'],
				['item-i-13-6']
			],
			[// Critical
				[''],
				[''],
				[''],
				[''],
				[''],
				[''],
				[''],
				[''],
				[''],
				['powerups-powerup_3']
			]
		]
		
		if (buffs.length > 0) {
			let buffbar = document.createElement("div");
			buffbar.id = 'buffbar_old';
			document.getElementById("blackoutDialogbod").parentNode.insertBefore(buffbar, document.getElementById("blackoutDialogbod"));
			
            let i = 0;
			while (buffs[i]) {
				let div = document.createElement("div");
				div.className = 'buff_old';
				div.dataset.tooltip = JSON.stringify([[[ stats_translations[buffs[i][1]],'#FFD800'],['+'+buffs[i][2]+' '+stats_translations[buffs[i][1]].toLowerCase() ,'#DDDDDD']]]);
				buffbar.appendChild(div);
				let img = document.createElement("div");
				img.className = images[buffs[i][0]-1][buffs[i][1]];
				img.style = 'width:32px;height:32px;margin-top: 3px;margin-left: 3px;margin-right: 3px;';
				div.appendChild(img);
				let div2 = document.createElement("div");
				div2.style = 'text-align:center;width:35px';
				div.appendChild(div2);
				let span = document.createElement("span");
				span.className = 'z';
				span.style = 'text-align:left';
				span.textContent = '+'+ ((buffs[i][2].match('%'))?buffs[i][2]:buffs[i][2].match(/(\d+)/i)[1]);
				div2.appendChild(span);
				let span2 = document.createElement("style");
				span2.textContent = ".powerups-powerup_1{background-image: url(img/powerups/powerup_1.gif)}.powerups-powerup_3{background-image: url(img/powerups/powerup_3.gif)}.powerups-powerup_4{background-image: url(img/powerups/powerup_4.gif)}";
				div2.appendChild(span2);
				i++;
			}
			document.getElementById("buffbar_old").getElementsByClassName('buff_old')[i-1].className = 'buff_old buffende';
		}
		
	},
	
	show_durability : function() {
		if(!document.getElementById('content'))
			return;
		
		// Durability display type
		let show_durability = gca_data.section.get("global", "show_durability", 0);
		
		// Item category factor table
		let category_factor = [
			/*Weapon (1)*/ 0.15617,
			/*Shield (2)*/ 0.141421,
			/*Armor (3)*/ 0.1291,
			/*Helmet (4)*/ 0.13484,
			/*Gloves (5)*/ 0.13484,
			/*Ring (6)*/ 1,
			0,
			/*Shoes (8)*/ 0.13484,
			/*Amulet (9)*/ 1
		];
		
		// Item quality factor table
		let quality_factor = [
			/*Green (0)*/ 2,
			/*Blue (1)*/ 3,
			/*Purple (2)*/ 5,
			/*Orange (3)*/ 6,
			/*Red (4)*/ 7
		];
		
		// Item list
		let items = document.getElementById('char').getElementsByClassName('ui-droppable');
		
		// Define variable
		let data, durability, q, c, level;
		
		let i = 0;
		while (items[i]) {
			if(items[i].dataset.itemId != undefined){
				// if durability not visible
				if(items[i].dataset.durability == undefined){
					// Get data from item hash
					hash_data = gca_tools.item.hash(items[i]);
					
					// Calculate factors
					level = items[i].dataset.level;
					q = (items[i].dataset.quality!=undefined)?quality_factor[items[i].dataset.quality]:quality_factor[0];
					c = category_factor[hash_data.category-1];
					
					// 100% durability
					max_durability = 120 * q * level / c;
					
					// Calculate current durability
					// 0% - 100%
					if (max_durability<hash_data.durability){
						durability = 100 + Math.round( (hash_data.durability - max_durability) / (max_durability * 0.25) * 100 );
					
					// 100% - 200%
					}else{
						durability = Math.round( hash_data.durability / max_durability * 100 );
					}
					
					// If enabled: % or ●
					if(show_durability==1){
						items[i].dataset.durability = durability + "%";
					}else{
						items[i].dataset.durability = '⚒';//●
					}
					
					// Colors
					if(durability > 100){
						items[i].dataset.durabilityColor = 1;
					}else if(durability>=75){
						items[i].dataset.durabilityColor = 2;
					}else if(durability>=50){
						items[i].dataset.durabilityColor = 3;
					}else if(durability>=25){
						items[i].dataset.durabilityColor = 4;
					}else{
						items[i].dataset.durabilityColor = 5;
					}
					
					console.log(hash_data.category + "("+level+"): "+ durability+"%" + ", c: "+ c + ", q: "+ q + ", Max: "+max_durability);
				}
			}
			i++;
		}
	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_player.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_data, gca_getPage, gca_locale, gca_options, gca_section, gca_tools */
