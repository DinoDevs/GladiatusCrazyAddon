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
		}else{//workbench
			// TODO
			
			this.sourceLinks();
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
	
	sourceLinks : function(){
		if(document.getElementsByClassName('crafting_requirements').length>0 && typeof document.getElementById('forge_nav').getElementsByClassName('tabActive')[0]!=="undefined"){
			var tab = document.getElementById('forge_nav').getElementsByClassName('tabActive')[0].className.match(/forge_(opened|closed) (\d) /i)[2];
			
			if(typeof document.getElementsByClassName('crafting_requirements')[0].dataset.runlinks=="undefined")
				document.getElementsByClassName('crafting_requirements')[0].dataset.runlinks=-1;
			
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
			gca_forge.sourceLinks();
		}, 500);
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

