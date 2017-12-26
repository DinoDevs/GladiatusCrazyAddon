/*
 * Addon Arena Script
 * Author: DarkThanos, GreatApo
 */

// Location
var gca_arena = {
	inject : function(){
		(gca_options.bool("arena","ignore_attack_confirmations") &&
			this.ignore_attack_confirmations());
			
		// Normal arena
		if (gca_section.submod == null) {
			(gca_options.bool("arena","show_simulator_imagelink") &&
				this.show_simulator());
			
		// Server Arena / Server Turma
		} else if(gca_section.submod === 'serverArena') {
			this.sort_by_lvl();
			
			if (gca_getPage.parameter('aType') === 2) {
				// Normal
				(gca_options.bool("arena","show_simulator_imagelink") &&
					this.show_simulator());
			} else {
				//Turma
				
			}
			
		// Turma
		} else {
			
		}

		// Setting Link
		gca_tools.create.settingsLink("arena");
	},

	// Show Simulator
	show_simulator : function(){
		var sim_link = document.createElement('a');
		sim_link.href = "http://gladiatussimulator.tk/";
		sim_link.setAttribute("target","_blank");
		sim_link.style = "text-decoration: none;";
		document.getElementById('content').getElementsByTagName('article')[0].parentNode.insertBefore(sim_link, document.getElementById('content').getElementsByTagName('article')[0]);
		
		var sim_image = document.createElement('div');
		sim_image.className = "gca_arena-simulator-img";
		sim_link.appendChild(sim_image);
		
		var sim_text = document.createElement('div');
		sim_text.textContent = "Before attacking, use the...";
		sim_image.appendChild(sim_text);
	},
	
	// Ignore attack confirmations
	ignore_attack_confirmations : function(){
		var attack_buttons = document.getElementsByClassName('attack');
		for(i=0;i<attack_buttons.length;i++){
			attack_buttons[i].setAttribute("onclick",attack_buttons[i].getAttribute("onclick").replace("Fight(","FightConfirmed("));
		}
	},
	
	// Re-arrange by lvl
	sort_by_lvl : function(){
		var rows = (document.getElementById('own2')!=null)? document.getElementById('own2').getElementsByTagName('tr') : document.getElementById('own3').getElementsByTagName('tr');
		for(i=1;i<=5;i++){
			for(j=i+1;j<=5;j++){
				if(parseInt(rows[i].getElementsByTagName('td')[1].textContent)>parseInt(rows[j].getElementsByTagName('td')[1].textContent)){
					rows[i].parentNode.insertBefore(rows[j].parentNode.removeChild(rows[j]), rows[i]);
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
		gca_arena.inject();
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