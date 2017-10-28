/*
 * Addon Forge Script
 * Author: DarkThanos, GreatApo
 */

// Forge
var gca_forge = {
	inject : function(){
		// Check for errors
		if(!document.getElementById("content"))
			return;
		
		// Forge
		if(gca_section.submod == null){
			// TODO
		// Smelt
		}else if(gca_section.submod=='smeltery'){
			this.saveSmeltTimers();
		//Repair
		}else{
			// TODO
		}

	},
	
	// Save smelt timers
	saveSmeltTimers : function(){
		if(typeof slotsData!=="undefined"){
			var smeltTimes ={translation : [document.getElementById('mainnav').getElementsByClassName('current')[0].textContent,document.getElementById('forge_duration').textContent.match(/([^:]+):/)[1].trim(),document.getElementById('slot-finished-succeeded').getElementsByTagName('fieldset')[0].textContent.trim().replace(/  /g,'').replace(/(?:\r\n|\r|\n)/g,' ')]};//Smeltery, Duration, Done!
			smeltTimes.data = [];// EndTime, Name
			for(i=0;i<slotsData.length;i++){
				if(typeof slotsData[i]['forge_slots.uend']!=="undefined"){
					smeltTimes.data.push([slotsData[i]['forge_slots.uend'],slotsData[i].item.name]);
				}
			}
			gca_data.section.set("timers", "smelt_times", smeltTimes);
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
		gca_forge.inject();
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

