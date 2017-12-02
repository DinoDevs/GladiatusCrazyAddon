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
		if(gca_section.submod == null){
			
			
		// Server Arena / Server Turma
		}else if(gca_section.submod=='serverArena'){
			this.sort_by_lvl();
			
			
		// Turma
		}else{
			
			
		}
	},

	// Ignore attack confirmations
	ignore_attack_confirmations : function(){
		var attack_buttons = document.getElementsByClassName('attack');
		for(i=0;i<attack_buttons.length;i++){
			attack_buttons[i].setAttribute("onclick",attack_buttons[i].getAttribute("onclick").replace("Fight(","FightConfirmed("));
		}
	},
	
	// Rearange by lvl
	sort_by_lvl : function(){
		var rows = (document.getElementById('own2')!=null)? document.getElementById('own2').getElementsByTagName('tr') : document.getElementById('own3').getElementsByTagName('tr');
		for(i=1;i<=5;i++){
			for(j=i+1;j<=5;j++){
				if(rows[i].getElementsByTagName('td')[1].textContent>rows[j].getElementsByTagName('td')[1].textContent){
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