/*
 * Addon Training Script
 * Author: DarkThanos, GreatApo
 */

// Training
var gca_training = {
	inject : function(){
		// Get Values
		this.getValues();
		
		// Training Interface
		this.interface.improvements();
		
		// Run training points inject info
		//(gca_options.isOn("ENABLE_TRANING_DISPLAY_MOD") && 
		//this.display.extened_training_info.run());
		
		// Run training points inject info
		//(gca_options.isOn("ENABLE_TRANING_DISPLAY_COST_CALCULATOR") && 
		//this.interface.training_cost_calculator.run());
	},
	// Library
	data : {
		// Element Ids
		id : {
			strength : "char_f0",
			skill : "char_f1",
			agility : "char_f2",
			constitution : "char_f3",
			charisma : "char_f4",
			intelligence : "char_f5"
		},
		// Stats coeff
		coeff : {
			strength : 2.6,
			skill : 2.5,
			agility : 2.3,
			constitution : 2.3,
			charisma : 2.5,
			intelligence : 2.4
		},
		// Current Values
		values : {
			name : [],
			value : [],
			base : [],
			max : [],
			item_points_used : [],
			item_points_all : []
		},
	},
	getValues : function(){
		for(let i=0; i<=5;i++){
			let tooltip = JSON.parse(document.getElementById('char_f'+i+'_tt').getAttribute('data-tooltip'));
			// Name [0][0][0][0]
			// Value [0][0][0][1]
			// Base Name [0][1][0][0]
			// Base Value [0][1][0][1]
			// Max Name [0][2][0][0]
			// Max Value [0][2][0][1]
			// Max Value Color [0][2][1][1]
			// Items Value from tot_value [0][3][0][1]
			// If [5] -> ενισχυση
			this.data.values.name.push(tooltip[0][0][0][0].replace(':',''));
			this.data.values.value.push(tooltip[0][0][0][1]);
			this.data.values.base.push(tooltip[0][1][0][1]);
			this.data.values.max.push(tooltip[0][2][0][1]);
			this.data.values.item_points_used.push(parseInt(tooltip[0][3][0][1].match(/\+*-*\d+/g)[0]));
			this.data.values.item_points_all.push(parseInt(tooltip[0][3][0][1].match(/\+*-*\d+/g)[1]));
		}
		//console.log(this.data.values);
	},

	// Interface Improvements
	interface : {
		improvements : function(){
			// Get Data
			
			// Display base points in bars
			for(let i=0; i<=5;i++){
				let div = document.createElement('div');
				div.className = 'gca-bases-bar';
				var p_base = Math.round( gca_training.data.values.base[i]/gca_training.data.values.max[i]*100 );
				div.style = 'width:' + p_base + '%;background-color:#ccc;';
				document.getElementById('char_f'+i+'_tt').getElementsByTagName('div')[0].appendChild(div);

				var p_value = Math.round( gca_training.data.values.value[i]/gca_training.data.values.max[i]*100 );
				if(p_base > p_value){
					div = document.createElement('div');
					div.className = 'gca-bases-bar';
					div.style = 'width:' + (p_base-p_value) + '%;margin-left:' + (p_value) + '%;background-color:#A70000;';
					document.getElementById('char_f'+i+'_tt').getElementsByTagName('div')[0].appendChild(div);
				}
			}
			
			//width: 30%;
			//height:4px;margin-top:-6px;background-color:#fff;border:1px solid #766531;
			
			// Get max points and calculate max points after upgrade
			
			
			/*
			var max = parseInt( $dark('#'+this.object[i]+'_tt').getAttr('onmouseover').match(/\d+<\/td><\/tr>/g)[2] );
			var max_change = 1+(newpoints-1)%2;
			//Show Max
			$dark('#'+this.object[i]+' div[3]').html( '/' ).afterFrom( $dark('#'+this.object[i]+' div[6]') );
			$dark('#'+this.object[i]+' div[3]').style('color:#666;').html( max ).afterFrom( $dark('#'+this.object[i]+' div[6]') );
			*/
			
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
		gca_training.inject();
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