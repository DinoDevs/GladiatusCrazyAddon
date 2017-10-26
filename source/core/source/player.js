/*
 * Addon Gods Script
 * Author: DarkThanos, GreatApo
 */

// Overview
var gca_player = {
	inject : function(){
		
		// Items shadow
		(gca_options.bool("global","item_shadow") && 
			this.itemShadow.inject());
		
		this.show_buffs();
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
	
	// Show player buffs
	show_buffs : function(){
		if(!document.getElementById('content'))
			return;
		
		var stats_translations = [];
		var j=2;
		while( document.getElementById('charstats').getElementsByClassName('charstats_text')[j] ){
			stats_translations.push( document.getElementById('charstats').getElementsByClassName('charstats_text')[j].textContent );
			j++;
		}
		var j=1;
		while( document.getElementById('charstats').getElementsByClassName('charstats_value21')[j] ){
			stats_translations.push( document.getElementById('charstats').getElementsByClassName('charstats_value21')[j].textContent );
			j++;
		}
		
		//Buffs array
		var buffs = [];//category (1:oils, 2:max, 3:enisxiseis, 4:critical), stat(number), value 
		
		//Find Oil buffs
		for(var i=1;i<document.getElementById('char').getElementsByClassName('ui-droppable').length;i++){
			if(typeof document.getElementById('char').getElementsByClassName('ui-droppable')[i].dataset.tooltip !== 'undefined'){
				if( document.getElementById('char').getElementsByClassName('ui-droppable')[i].dataset.tooltip.match(/\+(\d+) ([^\s]+)  /i) ){
					var buff = document.getElementById('char').getElementsByClassName('ui-droppable')[i].dataset.tooltip.match(/\+(\d+) ([^\s]+)  /i);
					//Find the stat
					var j=0; var found=false;
					while( stats_translations[j] && !found){
						if( stats_translations[j]==JSON.parse('"'+buff[2]+'"') ){
							buff[2]=j;
							found=true;
						}
						j++;
					}
					//Add to buffs
					if(found)
						buffs.push([1,buff[2],buff[1]]);
				}
			}
		}
		
		//Find Max/Enisxiseis buffs
		for(var i=3;i<=10;i++){
			//Max
			if( document.getElementById('charstats').getElementsByClassName('charstats_bg')[i].dataset.tooltip.match(/,(\d+)\],\["#00B712"/i) ){
				var buff = document.getElementById('charstats').getElementsByClassName('charstats_bg')[i].dataset.tooltip.match(/,(\d+)\],\["#00B712"/i)[1] - Math.round(document.getElementById('charstats').getElementsByClassName('charstats_bg')[i].dataset.tooltip.match(/,(\d+)\],\["#DDDDDD"/i)[1]*1.5 + parseInt(document.getElementById('char_level').textContent));
				buffs.push([2,i-3,buff+' max']);
				//console.log(i+': +'+buff);
			}
			//Enisxiseis
			if( document.getElementById('charstats').getElementsByClassName('charstats_bg')[i].dataset.tooltip.match(/\+(\d+)"\],\["#00B712"/i) ){
				var buff = document.getElementById('charstats').getElementsByClassName('charstats_bg')[i].dataset.tooltip.match(/\+(\d+)"\],\["#00B712"/i)[1];
				buffs.push([3,i-3,buff]);
				//console.log(i+': +'+buff);
			}
		}
		//Find Critical buff
		if( document.getElementById('char_schaden_tt').dataset.tooltip.match(/>(\d+) %</i) && !document.location.href.match(/&doll=[3-6]/i)){
			var buff = document.getElementById('char_schaden_tt').dataset.tooltip.match(/>(\d+) %</i)[1] - Math.round(document.getElementById('char_schaden_tt').dataset.tooltip.match(/,(\d+)\],\["#BA9700"/i)[1]*52/(parseInt(document.getElementById('char_level').textContent)-8)/5);
			if( buff>0 ){
				buffs.push([4,9,buff+'%']);
				stats_translations.push( document.getElementById('char_schaden_tt').dataset.tooltip.match(/([^:]+):/gi)[8].match(/([^:]+):/)[1] );
			}
		}
		//Find Damage buff
		if( document.getElementById('char_schaden_tt').dataset.tooltip.match(/(\d+)</i) ){
			var buff = document.getElementById('char_schaden_tt').dataset.tooltip.match(/(\d+)</gi)[4].match(/(\d+)/)[1];
			if( buff>0 ){
				buffs.push([3,7,buff]);
			}
		}
		//Find Life buff
		if( document.getElementById('char_leben_tt').dataset.tooltip.match(/(\d+)</i) ){
			var buff = document.getElementById('char_leben_tt').dataset.tooltip.match(/(\d+)</gi)[3].match(/(\d+)/)[1];
			if( buff>0 ){
				buffs.push([3,8,buff]);
				stats_translations[8] = document.getElementById('char_leben_tt').getElementsByClassName('charstats_text').textContent;
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
		
		if( buffs.length>0 ){
			var buffbar = document.createElement("div");
			buffbar.id = 'buffbar_old';
			document.getElementById("blackoutDialogbod").parentNode.insertBefore(buffbar, document.getElementById("blackoutDialogbod"));
			
            var i=0;
			var div, img, div2, span;
			while( buffs[i] ){
				div = document.createElement("div");
				div.className = 'buff_old';
				div.dataset.tooltip = JSON.stringify([[[ stats_translations[buffs[i][1]],'#FFD800'],['+'+buffs[i][2]+' '+stats_translations[buffs[i][1]].toLowerCase() ,'#DDDDDD']]]);
				buffbar.appendChild(div);
				img = document.createElement("div");
				img.className = images[buffs[i][0]-1][buffs[i][1]];
				img.style = 'width:32px;height:32px;margin-top: 3px;margin-left: 3px;margin-right: 3px;';
				div.appendChild(img);
				div2 = document.createElement("div");
				div2.style = 'text-align:center;width:35px';
				div.appendChild(div2);
				span = document.createElement("span");
				span.className = 'z';
				span.style = 'text-align:left';
				span.textContent = '+'+ ((buffs[i][2].match('%'))?buffs[i][2]:buffs[i][2].match(/(\d+)/i)[1]);
				div2.appendChild(span);
				span = document.createElement("style");
				span.textContent = ".powerups-powerup_1{background-image: url(img/powerups/powerup_1.gif)}.powerups-powerup_3{background-image: url(img/powerups/powerup_3.gif)}.powerups-powerup_4{background-image: url(img/powerups/powerup_4.gif)}";
				div2.appendChild(span);
				i++;
			}
			document.getElementById("buffbar_old").getElementsByClassName('buff_old')[i-1].className = 'buff_old buffende';
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
		gca_player.inject();
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