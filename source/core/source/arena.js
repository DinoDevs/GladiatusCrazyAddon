/*
 * Addon Arena Script
 * Author: DarkThanos, GreatApo
 */

// Location
var gca_arena = {
	inject : function(){
		// Find arena type
		this.resolve();

		// Sort players by level
		((this.isCrossNormalArena || this.isCrossTurmaArena) && gca_options.bool("arena", "sort_by_lvl") &&
			this.sort_by_lvl());

		// Attack Confirmations
		(gca_options.bool("arena", "ignore_attack_confirmations") &&
			this.ignore_attack_confirmations());

		// Highlight guild members on other severs
		((this.isNormalArena || this.isCrossNormalArena) && gca_options.bool("arena", "highlight_guild_members") &&
			this.highlight_mates());

		this.highlight_targets();

		// Simulator Link
		((this.isNormalArena || this.isCrossNormalArena) && gca_options.bool("arena", "show_simulator_imagelink") &&
			this.show_simulator());

		// Global Arena
		(this.isNormalArena &&
			this.show_gca_global_arena());

		// Setting Link
		gca_tools.create.settingsLink("arena");
	},

	// Resolve arena type
	resolve : function() {
		this.isNormalArena = false;
		this.isTurmaArena = false;
		this.isCrossNormalArena = false;
		this.isCrossTurmaArena = false;

		// Normal arena
		if (gca_section.submod == null) {
			this.isNormalArena = true;
		}

		// Turma
		else if (gca_section.submod === "grouparena") {
			this.isTurmaArena = true;
		}

		// Cross Server Arenas
		else if(gca_section.submod === 'serverArena') {
			let type = gca_getPage.parameter('aType');
			// Normal Arena
			if (type == 2) {
				this.isCrossNormalArena = true;
			}
			// Turma Arena
			else if (type == 3) {
				this.isCrossTurmaArena = true;
			}
		}
	},

	// Show Simulator
	show_simulator : function(){
		let link = document.createElement('a');
		link.className = "gca_arena-simulator-link";
		link.href = "https://gladiatussimulator.tk/";
		link.setAttribute("target","_blank");
		document.getElementById('content').getElementsByTagName('article')[0].parentNode.insertBefore(link, document.getElementById('content').getElementsByTagName('article')[0]);
		
		let image = document.createElement('div');
		image.className = "gca_arena-simulator-img";
		link.appendChild(image);
		
		let text = document.createElement('div');
		text.textContent = "Before attacking, use the...";
		image.appendChild(text);
	},
	
	// Show GCA Global Arena
	show_gca_global_arena : function(){
		// Add br
		let temp_element = document.createElement('br');
		document.getElementById('content').getElementsByTagName('article')[0].appendChild(temp_element);
		// Add header
		temp_element = document.createElement('h2');
		temp_element.className = "section-header global_arena_header";
		temp_element.textContent = gca_locale.get("arena", "global_arena_title");
		//temp_element.style = "cursor: pointer;";
		document.getElementById('content').getElementsByTagName('article')[0].appendChild(temp_element);
		// Add box
		temp_element = document.createElement('section');
		temp_element.id = "global_arena_box";
		temp_element.style = "display: block;";
		document.getElementById('content').getElementsByTagName('article')[0].appendChild(temp_element);
		// Add text
		temp_element = document.createElement('p');
		temp_element.textContent = gca_locale.get("arena", "global_arena_description");
		temp_element.style="text-align: justify;";
		document.getElementById('global_arena_box').appendChild(temp_element);
		// Add button
		temp_element = document.createElement('input');
		temp_element.type = "button";
		temp_element.className = "awesome-button";
		temp_element.value = gca_locale.get("arena", "global_arena_load");
		temp_element.style = "margin-bottom: 15px;";
		temp_element.id = "load_global_arena";
		temp_element.setAttribute("onclick","gca_arena_load_enemies()");
		document.getElementById('global_arena_box').appendChild(temp_element);
		
		window.gca_arena_load_enemies = function() {
			jQuery.ajax({
				type: "GET",
				url: "https://gladiatuscrazyaddon.tk/arena/ajax.php?player_id="+gca_section.playerId+"&server="+gca_section.server+"&country="+gca_section.country,
				success: function(content){
					try {
						var obj = JSON.parse(content);
					} catch (e) {
						gca_notifications.error("Global Arena:\nSomething went wrong.");
						return;
					}
					if (obj.error) {
						gca_notifications.error("Global Arena:\nThe server responded with an error.");
						return;
					}
					
					gca_arena_make_list(obj);
				},
				error: function(jqXHR, exception){
					if(jqXHR.status == 0){
						gca_notifications.error("Global Arena:\nOur server is still HTTP and not HTTPS. If you want to continue allow script load of unauthenticated sources on this page.");
					}else{
						gca_notifications.error("Global Arena:\nConnection error.");
					}
				}
			});
		}
		
		window.gca_arena_attack_enemy = function(country_B,server_B,player_id_B) {
			
			document.getElementById('spiner_box').style.height = document.getElementById('global_arena_box').getElementsByTagName('table')[0].offsetHeight;
			document.getElementById('spiner_box').getElementsByTagName('img')[0].style.marginTop = (document.getElementById('global_arena_box').getElementsByTagName('table')[0].offsetHeight/2-16) +'px';
			document.getElementById('spiner_box').style.display = 'block';
			jQuery.ajax({
				type: "GET",
				url: "https://gladiatuscrazyaddon.tk/arena/ajax.php?player_id_A="+gca_section.playerId+"&server_A="+gca_section.server+"&country_A="+gca_section.country+"&player_id_B="+player_id_B+"&server_B="+server_B+"&country_B="+country_B,
				success: function(content){
					try {
						var obj = JSON.parse(content);
					} catch (e) {
						gca_notifications.error("Global Arena:\nSomething went wrong.");
						document.getElementById('alert_box').textContent = "Something went wrong.";
						document.getElementById('alert_box').style="color: rgba(255, 30, 30, 1);";
						return;
					}
					
					if(obj.error){
						gca_notifications.error("Global Arena:\nSomething went wrong.");
						document.getElementById('alert_box').textContent = "Something went wrong.";
						document.getElementById('alert_box').style="color: rgba(255, 30, 30, 1);";
					}else if(obj.status){
						if(obj.status == 'lost'){
							gca_notifications.error("Global Arena:\nYou lost the fight...");
							document.getElementById('alert_box').textContent = "You lost the fight...";
							document.getElementById('alert_box').style="color: rgba(255, 30, 30, 1);";
						}else if(obj.status == 'win'){
							gca_arena_make_list(obj);
							gca_notifications.success("Global Arena:\nYou won!");
							document.getElementById('alert_box').textContent = "You won!";
							document.getElementById('alert_box').style="color: rgb(37, 140, 42);";
						}else if(obj.status == 'cooldown' && obj.cooldown){
							gca_notifications.warning("Global Arena:\nYou are tired.\nPlease rest for "+ ((obj.cooldown>60)?(Math.round(obj.cooldown/60)+" min."):(obj.cooldown+" sec.")));
							document.getElementById('alert_box').textContent = "You are tired. Please rest for "+ ((obj.cooldown>60)?(Math.round(obj.cooldown/60)+" min."):(obj.cooldown+" sec."));
							document.getElementById('alert_box').style="color: rgba(255, 30, 30, 1);";
						}else{
							gca_notifications.error("Global Arena:\nSomething went wrong.");
							document.getElementById('alert_box').textContent = "Something went wrong.";
							document.getElementById('alert_box').style="color: rgba(255, 30, 30, 1);";
						}
					}else{
						gca_notifications.error("Global Arena:\nSomething went wrong.");
						document.getElementById('alert_box').textContent = "Something went wrong.";
						document.getElementById('alert_box').style="color: rgba(255, 30, 30, 1);";
					}
					document.getElementById('spiner_box').style.display = 'none';
				},
				error: function(){
					gca_notifications.error("Global Arena:\nConnection error.");
					document.getElementById('alert_box').textContent = "Connection error.";
					document.getElementById('alert_box').style="color: rgba(255, 30, 30, 1);";
					
					document.getElementById('spiner_box').style.display = 'none';
				}
			});
		}
		
		window.gca_arena_make_list = function(obj) {
			let list = obj.list;
			let div = document.getElementById('global_arena_box');
			while(div.firstChild){
				div.removeChild(div.firstChild);
			}
			
			// Add text
			let temp_element = document.createElement('p');
			temp_element.textContent = gca_locale.get("arena", "global_arena_description");
			temp_element.style="text-align: justify;";
			div.appendChild(temp_element);
			
			temp_element = document.createElement('p');
			temp_element.id = 'alert_box';
			if(obj.cooldown){
				temp_element.textContent = "You are tired. Please rest for "+ ((obj.cooldown>60)?(Math.round(obj.cooldown/60)+" min."):(obj.cooldown+" sec."));
				temp_element.style="color: rgba(255, 30, 30, 1);";
			}
			div.appendChild(temp_element);
			
			temp_element = document.createElement('div');
			temp_element.id = 'spiner_box';
			div.appendChild(temp_element);
			
			let temp_element2 = document.createElement('img');
			temp_element2.src = 'img/ui/spinner.gif';
			temp_element.appendChild(temp_element2);
			
			temp_element = document.createElement("table");
			temp_element.width = "100%";
			div.appendChild(temp_element);
			
			let div2 = document.getElementById('content').getElementsByTagName('article')[0].getElementsByClassName('right')[0].getElementsByTagName('tr');
			let position = div2[0].getElementsByTagName('th')[0].textContent;
			let name = div2[0].getElementsByTagName('th')[1].textContent;
			let my_name = div2[div2.length-1].getElementsByTagName('td')[0].textContent;
			
			temp_element = document.createElement("tr");
			div.getElementsByTagName('table')[0].appendChild(temp_element);
			
			temp_element2 = document.createElement("th");
			temp_element2.textContent = position;
			temp_element2.width = "10%";
			temp_element2.style= "text-align: center;";
			temp_element.appendChild(temp_element2);
			
			temp_element2 = document.createElement("th");
			temp_element2.textContent = name;
			temp_element2.width = "20%";
			temp_element.appendChild(temp_element2);
			
			temp_element2 = document.createElement("th");
			temp_element2.textContent = document.getElementById('mainmenu').getElementsByClassName('menuitem')[2].textContent;
			temp_element2.width = "30%";
			temp_element.appendChild(temp_element2);
			
			temp_element2 = document.createElement("th");
			temp_element2.textContent = 'Country';
			temp_element2.width = "10%";
			temp_element2.style= "text-align: center;";
			temp_element.appendChild(temp_element2);
			
			temp_element2 = document.createElement("th");
			temp_element2.textContent = 'Server';
			temp_element2.width = "10%";
			temp_element2.style= "text-align: center;";
			temp_element.appendChild(temp_element2);
			
			temp_element2 = document.createElement("th");
			temp_element2.width = "10%";
			temp_element2.textContent = " ";
			temp_element.appendChild(temp_element2);
			
			let temp_element3;
			
			for(let i=0;i<list.length;i++){
				temp_element = document.createElement("tr");
				div.getElementsByTagName('table')[0].appendChild(temp_element);
				
				temp_element2 = document.createElement("th");
				temp_element2.textContent = list[i].position;
				temp_element2.style= "text-align: center;";
				temp_element.appendChild(temp_element2);
				
				temp_element2 = document.createElement("td");
				//temp_element2.textContent = list[i].name;
				temp_element.appendChild(temp_element2);
				
				//https://s4-gr.gladiatus.gameforge.com/game/index.php?mod=player&p=119682
				temp_element3 = document.createElement("a");
				temp_element3.href = "https://s"+list[i].server+"-"+list[i].country+".gladiatus.gameforge.com/game/index.php?mod=player&p="+list[i].id;
				temp_element3.textContent = list[i].name;
				temp_element3.setAttribute("target","_blank");
				temp_element2.appendChild(temp_element3);
				
				
				temp_element2 = document.createElement("td");
				temp_element2.textContent = (list[i].guild_id>0)?'':'-';
				temp_element.appendChild(temp_element2);
				
				if(list[i].guild_id>0){
					temp_element3 = document.createElement("a");
					temp_element3.href = "https://s"+list[i].server+"-"+list[i].country+".gladiatus.gameforge.com/game/index.php?mod=guild&submod=forumGladiatorius&i="+list[i].guild_id;
					temp_element3.textContent = list[i].guild;
					temp_element3.setAttribute("target","_blank");
					temp_element2.appendChild(temp_element3);
				}
				
				temp_element2 = document.createElement("td");
				//temp_element2.textContent = "("+list[i].country.toUpperCase()+") ";
				temp_element2.style= "text-align: center;";
				temp_element.appendChild(temp_element2);
				
				temp_element3 = document.createElement("img");
				temp_element3.src = "https://flags.fmcdn.net/data/flags/h20/"+list[i].country.replace(/^en$/,'gb')+".png";
				temp_element3.className = "flag";
				temp_element3.setAttribute("align","absmiddle");
				//temp_element3.dataset.tooltip = '[[[["Country:","'+list[i].country.toUpperCase()+'"],["#fff;font-size:12px;","#fff;font-size:12px;"]],[["Server:","'+list[i].server+'"],["#fff;font-size:12px;","#fff;font-size:12px;"]]]]';
				temp_element3.dataset.tooltip = '[[["'+list[i].country.toUpperCase()+'","#fff;font-size:12px;"]]]';
				temp_element2.appendChild(temp_element3);
				
				temp_element2 = document.createElement("td");
				temp_element2.textContent = list[i].server;
				temp_element2.style= "text-align: center;";
				temp_element.appendChild(temp_element2);
				
				temp_element2 = document.createElement("td");
				//temp_element2.textContent = list[i].id;
				temp_element.appendChild(temp_element2);
				
				temp_element3 = document.createElement("div");
				temp_element3.className = "attack";
				temp_element3.setAttribute("onclick","gca_arena_attack_enemy('"+list[i].country+"',"+list[i].server+","+list[i].id+")");
				temp_element3.dataset.tooltip = '[[["Attack '+list[i].name+'","#fff;font-size:12px;"]]]';
				temp_element2.appendChild(temp_element3);
			}
			
			temp_element = document.createElement("tr");
			div.getElementsByTagName('table')[0].appendChild(temp_element);
			
			temp_element2 = document.createElement("th");
			temp_element2.textContent = list[list.length-1].position+1;
			temp_element2.style= "text-align: center;";
			temp_element.appendChild(temp_element2);
			
			temp_element2 = document.createElement("th");
			temp_element2.textContent = my_name;
			temp_element.appendChild(temp_element2);
			
			temp_element2 = document.createElement("th");
			temp_element2.textContent = '';
			temp_element.appendChild(temp_element2);
			
			temp_element2 = document.createElement("td");
			//temp_element2.textContent = "("+gca_section.country.toUpperCase()+") ";
			temp_element2.style= "text-align: center;";
			temp_element.appendChild(temp_element2);
			
			temp_element3 = document.createElement("img");
			temp_element3.src = "https://flags.fmcdn.net/data/flags/h20/"+gca_section.country.replace(/^en$/,'gb')+".png";
			temp_element3.className = "flag";
			temp_element3.setAttribute("align","absmiddle");
			//temp_element3.dataset.tooltip = '[[[["Country:","'+gca_section.country.toUpperCase()+'"],["#fff;font-size:12px;","#fff;font-size:12px;"]],[["Server:","'+gca_section.server+'"],["#fff;font-size:12px;","#fff;font-size:12px;"]]]]';
			temp_element3.dataset.tooltip = '[[["'+gca_section.country.toUpperCase()+'","#fff;font-size:12px;"]]]';
			temp_element2.appendChild(temp_element3);
			
			temp_element2 = document.createElement("td");
			temp_element2.textContent = gca_section.server;
			temp_element2.style= "text-align: center;";
			temp_element.appendChild(temp_element2);
			
			temp_element2 = document.createElement("td");
			temp_element2.textContent = " ";
			temp_element.appendChild(temp_element2);
		}
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
	},

	// Highlight guild mates
	highlight_mates : function() {
		// If not in a guild
		if (!gca_data.section.get("guild", "inGuild", false)) {
			return;
		}
		// If no opponents
		if (!document.getElementById('own2') && !document.getElementById('own3')) {
			return;
		}

		// Get links
		let links = (document.getElementById('own2') != null) ? document.getElementById('own2').getElementsByTagName('a') : document.getElementById('own3').getElementsByTagName('a');
		if (links.length == 0) return;

		// Get guild mates
		let mates = [];
		let objects = gca_data.section.get("guild", "mates", []);
		for (let i = objects.length - 1; i >= 0; i--) {
			mates.push(objects[i].name);
		}

		// Highlight players
		for (var i = links.length - 1; i >= 0; i--) {
			if (mates.indexOf(links[i].textContent.trim()) >= 0) {
				links[i].style.color = 'green';
			}
		}
	},

	// Highlight targets
	highlight_targets : function() {
		// If no opponents
		if (!document.getElementById('own2') && !document.getElementById('own3')) {
			return;
		}

		// Get links
		let links = (document.getElementById('own2') != null) ? document.getElementById('own2').getElementsByTagName('a') : document.getElementById('own3').getElementsByTagName('a');
		if (links.length == 0) return;

		// Get targets
		let targets = gca_data.section.get('arena', 'target-list', {});

		// Highlight players
		for (var i = links.length - 1; i >= 0; i--) {
			// https://s13-gr.gladiatus.gameforge.com/game/index.php?mod=player&p=153593
			let info = links[i].href.match(/\:\/\/s(\d+)-\w+\.gladiatus\.gameforge\.com\/game\/index\.php\?mod=player&p=(\d+)/i);
			if (info && targets.hasOwnProperty(info[2] + '@' + info[1])) {
				let id = info[2] + '@' + info[1];
				links[i].style.textShadow = '0px 0px 2px ' + targets[id][3];
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