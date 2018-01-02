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
		// New arena attack functions
		window.gca_startFight = function(b, a) {	
			jQuery("#errorRow").css({display: "none"});
			sendRequest("get", "ajax/doArenaFight.php", "did=" + a + "&c=1", b)
		}
		
		window.gca_startGroupFight = function(b, a) {
			jQuery("#errorRow").css({display: "none"});
			sendRequest("get", "ajax/doGroupFight.php", "did=" + a + "&c=1", b)
		}
		
		window.gca_startProvinciarumFight = function(d, a, c, b, e) {
			jQuery("#errorRow").css({display: "none"});
			sendRequest("get", "ajax.php", "mod=arena&submod=confirmDoCombat&aType=" + a + "&opponentId=" + c + "&serverId=" + b + "&country=" + e, d)
		}
		
		var attack_buttons = document.getElementsByClassName('attack');
		for(i=0;i<attack_buttons.length;i++){
			if(attack_buttons[i].getAttribute("onclick").match(/startFight|startGroupFight|startProvinciarumFight/i))
				attack_buttons[i].setAttribute("onclick","gca_"+attack_buttons[i].getAttribute("onclick"));
		}
	},
	
	// Re-arrange by lvl
	sort_by_lvl : function(){
		// If no opponents
		if (document.getElementById('own2') == null && document.getElementById('own3') == null) {
			return;
		}

		// Get rows
		let rows = (document.getElementById('own2') != null) ? document.getElementById('own2').getElementsByTagName('tr') : document.getElementById('own3').getElementsByTagName('tr');
		// Create players object
		let players = [];
		for (let i = 1; i <= 5; i++) {
			players.push({
				level : parseInt(rows[i].getElementsByTagName('td')[1].textContent, 10),
				element : rows[i]
			});
		}
		// Sort players
		players.sort(function(a,b) {return (a.level > b.level) ? 1 : ((b.level > a.level) ? -1 : 0);});
		// Insert
		let table = rows[0].parentNode;
		for (let i = 0; i < players.length; i++) {
			table.appendChild(players[i].element);
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