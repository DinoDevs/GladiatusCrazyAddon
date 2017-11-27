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
			this.saveForgeTimers();
			
			(gca_options.bool("forge","show_levels") &&
			this.showPrefixSufixBaseLevels());
			
			(gca_options.bool("forge","material_links") &&
			this.sourceLinks.inject());
		// Smelt
		}else if(gca_section.submod=='smeltery'){
			this.saveSmeltTimers();
		//Repair
		}else{//workbench
			(gca_options.bool("forge","material_links") &&
			this.sourceLinks.inject());
		}

	},
	
	// Save forge timers
	saveForgeTimers : function(){
		if(typeof slotsData!=="undefined"){
			var forgeTimes ={translation : [document.getElementById('mainnav').getElementsByClassName('current')[0].textContent,document.getElementById('forge_duration').textContent.match(/([^:]+):/)[1].trim(),gca_locale.get("forge","forge_ended")]};//Smeltery, Duration, Done!
			forgeTimes.data = [];// EndTime, Name
			var current = new Date(); current = current.getTime();
			for(i=0;i<slotsData.length;i++){
				if(typeof slotsData[i]['forge_slots.uend']!=="undefined"){
					if(slotsData[i]['forge_slots.uend']*1000>current)
						forgeTimes.data.push([slotsData[i]['forge_slots.uend'],slotsData[i].item.name]);
				}
			}
			gca_data.section.set("timers", "forge_times", forgeTimes);
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
	},
	
	// Show Fix/Sufix/Base names levels
	showPrefixSufixBaseLevels : function(){
		var options = document.getElementById('prefix0').getElementsByTagName("option");
		for (var i=1;i<options.length;i++) {
			options[i].textContent += " ("+options[i].dataset.level+")";
		}
		
		var options = document.getElementById('suffix0').getElementsByTagName("option");
		for (var i=1;i<options.length;i++) {
			options[i].textContent += " ("+options[i].dataset.level+")";
		}
		
		var levels =[
			1,1,1,2,3,3,4,4,4,5,6,6,2,7,8,9,8,9,5,7,//Weapons
			1,2,3,4,5,6,7,8,9,10,3,5,//Shields
			1,1,2,3,4,5,6,7,8,9,10,4,//Armor
			1,1,2,2,3,4,6,7,9,10,5,8,7,//Head
			1,1,2,3,4,5,6,7,8,9,//Hands
			1,1,1,1,1,1,1,1,//Rings
			1,2,3,4,6,7,8,9,10,//Shoes
			1,1,1,1,1,1,1,1,1,1//Amulets
		];
		var options = document.getElementById('basic0').getElementsByTagName("option");
		for (var i=0;i<options.length;i++) {
			options[i].textContent = "("+levels[i]+") "+options[i].textContent;
		}
	},
	
	sourceLinks : {
		inject : function(){
			document.getElementsByClassName('crafting_requirements')[0].dataset.runlinks=-1;
			document.getElementById('forge_nav').onclick = function(event) { document.getElementsByClassName('crafting_requirements')[0].dataset.runlinks=-1; };
			this.repeat();
		},
		repeat : function(){
			if(document.getElementsByClassName('crafting_requirements').length>0 && typeof document.getElementById('forge_nav').getElementsByClassName('tabActive')[0]!=="undefined" && document.getElementById("slot-opened").className!="hidden"){
				var tab = document.getElementById('forge_nav').getElementsByClassName('tabActive')[0].className.match(/forge_(opened|closed) (\d) /i)[2];
				
				if(document.getElementsByClassName('crafting_requirements')[0].dataset.runlinks!==tab){
					document.getElementsByClassName('crafting_requirements')[0].dataset.runlinks=tab;
					
					var li = document.getElementsByClassName('crafting_requirements')[0].getElementsByTagName('li');
					var name,linkBox;
					var links=[];
					for(var i=0;i<li.length;i++){
						name = encodeURIComponent(li[i].getElementsByTagName('div')[0].title);
						linkBox = document.createElement('div');
						linkBox.className = 'forge_amount';
						linkBox.style = 'background-color: #bba86e;font-size: 12px;';
						li[i].appendChild(linkBox);
						links[0] = document.createElement('a');
						links[0].href = gca_getPage.link({"mod":"packages","qry":name});
						links[0].textContent = '⧉ ';
						links[0].style = "text-decoration:none;";
						linkBox.appendChild(links[0]);
						links[1] = document.createElement('a');
						links[1].href = gca_getPage.link({"mod":"market","qry":name});
						links[1].textContent = ' ⚖';
						links[1].style = "text-decoration:none;";
						linkBox.appendChild(links[1]);
					}
				}
			}
			
			setTimeout(function(){
				gca_forge.sourceLinks.repeat();
			}, 500);
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

