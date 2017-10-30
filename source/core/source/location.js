/*
 * Addon Location Script
 * Author: DarkThanos, GreatApo
 */

// Location
var gca_location = {
	inject : function(){
		// Improve Underworld Layout
		if(document.getElementById('underwold_enemies')){
			(gca_options.bool("expedition","underworld_layout") && 
				this.layout.improve_underworld()); // TODO : code clean
		}
		
		// Normal World
		else{
			(gca_options.bool("expedition","show_enemy_drops") && 
				this.layout.show_drops.show()); // TODO : code clean
		}
	},

	// Layout Improvements
	layout : {
		
		// Improve Underworld expedition layout
		improve_underworld : function(){
			document.getElementById('showPreviousEnemy').style = 'display:none;';
			document.getElementById('showNextEnemy').style = 'display:none;';
			document.getElementById('underwold_enemies').className = 'gca-underwold_enemies';
		},

		// Show drops on expedition enemies
		show_drops : {
			// Drops Data
			drops : {
				"2/2_3" : [33,51],
				"2/2_2" : [11,8],
				"2/2_1" : [48,49],
				"2/1_9" : [17,31],
				"2/1_8" : [37,11],
				"2/1_7" : [45,43],
				"2/1_6" : [42,23],
				"2/1_5" : [48,5],
				"2/1_4" : [9,17],
				"2/1_32" : [35,47],
				"2/1_31" : [27,26],
				"2/1_30" : [22,42],
				"2/1_3" : [48,32],
				"2/1_29" : [51,6],
				"2/1_21" : [36,10],
				"2/1_20" : [7],
				"2/1_2" : [18,9],
				"2/1_19" : [28,27],
				"2/1_18" : [38,39],
				"2/1_17" : [39,21],
				"2/1_16" : [50,46],
				"2/1_15" : [43,38],
				"2/1_14" : [45,22],
				"2/1_13" : [22,32],
				"2/1_12" : [50,36],
				"2/1_11" : [52,7],
				"2/1_10" : [23,51],
				"2/1_1" : [40,8],
				"1/2_3" : [22,19],
				"1/2_2" : [35,49],
				"1/2_1" : [49,35],
				"1/1_9" : [34,40],
				"1/1_8" : [37,39],
				"1/1_7" : [12,38],
				"1/1_6" : [12,7],
				"1/1_5" : [29,32],
				"1/1_4" : [7,20],
				"1/1_3" : [41,42],
				"1/1_24" : [21,14],
				"1/1_23" : [11,10],
				"1/1_22" : [8,41],
				"1/1_21" : [24,29],
				"1/1_20" : [23,24],
				"1/1_2" : [35,16],
				"1/1_19" : [45,44],
				"1/1_18" : [13,34],
				"1/1_17" : [46,30],
				"1/1_16" : [27,50],
				"1/1_15" : [33,23],
				"1/1_14" : [50,52],
				"1/1_13" : [16,33],
				"1/1_12" : [41,12],
				"1/1_11" : [44,19],
				"1/1_10" : [47,45],
				"1/1_1" : [19,6],
				"0/2_9" : [46,38],
				"0/2_8" : [36,6],
				"0/2_7" : [30,33],
				"0/2_6" : [26,48],
				"0/2_4" : [29,12],
				"0/2_3" : [49,47],
				"0/2_2" : [10,28],
				"0/2_10" : [42,5],
				"0/1_9" : [52,14],
				"0/1_7" : [44,8],
				"0/1_6" : [5,18],
				"0/1_4" : [31,11],
				"0/1_34" : [6,5],
				"0/1_32" : [32,40],
				"0/1_30" : [21,9],
				"0/1_3" : [5,9],
				"0/1_29" : [6,16],
				"0/1_28" : [46,15],
				"0/1_27" : [52,24],
				"0/1_26" : [43,51],
				"0/1_25" : [41,30],
				"0/1_23" : [6,31],
				"0/1_22" : [39,28],
				"0/1_21" : [25,5],
				"0/1_20" : [14,25],
				"0/1_2" : [18,13],
				"0/1_19" : [28,44],
				"0/1_18" : [15,26],
				"0/1_17" : [15,25],
				"0/1_16" : [43,37],
				"0/1_15" : [16,14],
				"0/1_14" : [47,27],
				"0/1_13" : [20,10],
				"0/1_12" : [34,40],
				"0/1_11" : [30,21],
				"0/1_10" : [26,13],
				"0/1_1" : [20,17]
			},

			// Show
			show : function(){
				var i = 0;
				var enemy;
				while( document.getElementsByClassName('expedition_picture')[i] && document.getElementsByClassName('expedition_picture')[i].getElementsByTagName('img')[0] ){
					enemy = document.getElementsByClassName('expedition_picture')[i].getElementsByTagName('img')[0].getAttribute('src').match(/img\/(npc|expedition)\/([^.]+)\.(jpg|png)/i)[2];
					//console.log(enemy);
					if(this.drops[enemy] && this.drops[enemy][0] && this.drops[enemy][1]){
						document.getElementsByClassName('expedition_picture')[i].innerHTML += '<div class="item-i-18-'+this.drops[enemy][0]+' enemyDrop" title="If material is droped, 45% chance"></div><div title="If material is droped, 25% chance" class="item-i-18-'+this.drops[enemy][1]+' enemyDrop enemyDrop2"></div>';
					}else if(this.drops[enemy] && this.drops[enemy][0]){
						document.getElementsByClassName('expedition_picture')[i].innerHTML += '<div class="item-i-18-'+this.drops[enemy][0]+' enemyDrop enemyDropOnly1" title="If material is droped, 70% chance"></div>';
					}
					i++;
				}
			}
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
		gca_location.inject();
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