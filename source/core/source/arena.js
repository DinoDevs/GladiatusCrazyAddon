/*
 * Addon Arena Script
 * Author: DarkThanos, GreatApo
 */

// Location
var gca_arena = {
	// Pre Inject code
	preinject : function(){

		// Overhaul Arena and Circus tables
		(gca_options.bool("arena", "overhaul_tables") &&
			this.overhaul_tables());
	},

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
		((this.isCrossTurmaArena || this.isCrossNormalArena) && gca_options.bool("arena", "highlight_guild_members") &&
			this.highlight_mates());

		this.highlight_targets();

		// Simulator Link
		((this.isNormalArena || this.isCrossNormalArena) && gca_options.bool("arena", "show_simulator_imagelink") &&
			this.show_simulator());

		// Global Arena
		(this.isNormalArena &&
			this.global_arena.show());

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
	show_simulator: function() {
    		let content = document.getElementById('content');
    
    		// Check if the 'content' element and the first 'article' element exist
    		if (content) {
        		let article = content.getElementsByTagName('article')[0];
        
        		if (article && article.parentNode) {
            		// Create the simulator link
            		let link = document.createElement('a');
            		link.className = "gca_arena-simulator-link";
            		link.href = gca_links.get('gladiatus-simulator');
            		link.setAttribute("target", "_blank");
            
            		// Insert the link before the article
            		article.parentNode.insertBefore(link, article);
            
            		// Create the image container
            		let image = document.createElement('div');
            		image.className = "gca_arena-simulator-img";
            		link.appendChild(image);
            
            		// Create and append the text
            		let text = document.createElement('div');
            		text.textContent = "Before attacking, use the...";
            		image.appendChild(text);
        		}
    		}
	},
	
	// Overhaul Arena and Circus tables
	overhaul_tables: function() {
		let arenaPage = document.getElementById("arenaPage");
    
		if (arenaPage) {
			arenaPage.classList.add("overhaul_tables");
		}
	},
	
	// GCA Global Arena
	global_arena : {

		// Get API link
		getLink : function(x){
			let link = gca_links.get('addon-page') + '/services/global_arena.php';
			let front = "?";
			for(let i in x){
				link += front + i + "=" + x[i];
				if(front == "?") front = "&";
			}
			return link;
		},

		show : function() {
			this.getInfo();
			this.create();
			this.report.init(this);
		},

		getInfo : function() {
			 // Check if 'content' exists
			let content = document.getElementById('content');
			if (!content) return;

			// Check if there are any 'article' elements and get the first one
			let article = content.getElementsByTagName('article')[0];
			if (!article) return;

			// Check if there are any elements with class 'right' and get the first one
			let rightSection = article.getElementsByClassName('right')[0];
			if (!rightSection) return;

			// Check if there are any 'tr' elements
			let arena_rows = rightSection.getElementsByTagName('tr');
			if (!arena_rows) return;
			
			this.info = {};
			this.info.locale_position = arena_rows[0].getElementsByTagName('th')[0].textContent.trim();
			this.info.locale_name = arena_rows[0].getElementsByTagName('th')[1].textContent.trim();
			this.info.locale_best = document.getElementById('content').getElementsByTagName('article')[0].getElementsByClassName('left')[0].getElementsByTagName('h2')[0].textContent.trim();
			this.info.locale_level = jQuery('#icon_level').data().tooltip[0][0][0];
			this.info.locale_guild = document.getElementById('mainmenu').getElementsByClassName('menuitem')[2].textContent;
			this.info.player_name = arena_rows[arena_rows.length - 1].getElementsByTagName('td')[0].textContent.trim();
			this.info.guild_name = gca_data.section.get("guild", "name", "-").trim();
		},

		create: function() {
			let article = document.getElementById('content')?.getElementsByTagName('article')[0];

			// Check if article exists before performing any operations
			if (!article) return;

			// Add <br> element
			article.appendChild(document.createElement('br'));

			// Add header
			let header = document.createElement('h2');
			header.className = "section-header global_arena_header";
			header.textContent = gca_locale.get("arena", "global_arena_title") + ' ' + '(Crazy Addon)';
			article.appendChild(header);

			// Add box
			let box = document.createElement('section');
			box.id = "global_arena_box";
			box.style.display = 'block';
			article.appendChild(box);
			this.box = box;

			// Add description
			let description = document.createElement('p');
			description.textContent = gca_locale.get("arena", "global_arena_description") + " ";
			description.style = "text-align: center;";
			box.appendChild(description);

			// Add highscore link
			let highscore_link = document.createElement('a');
			highscore_link.className = "awesome-button";
			highscore_link.textContent = gca_locale.get("arena", "global_highscore") + ' 🔗';
			highscore_link.style = "margin-bottom: 15px;padding: 2px 6px;margin-right: 20px;";
			highscore_link.href = gca_links.get('addon-page') + "/global-arena.php";
			highscore_link.setAttribute("target", "_blank");
			box.appendChild(highscore_link);

			// Add load button
			let load_btn = document.createElement('input');
			load_btn.type = "button";
			load_btn.className = "awesome-button";
			load_btn.value = gca_locale.get("arena", "global_arena_load") + ' ⚔';
			load_btn.style = "margin-bottom: 15px;padding: 2px 6px;";
			load_btn.id = "load_global_arena";
			load_btn.addEventListener('click', () => {
				this.loadList();
			}, false);
			box.appendChild(load_btn);
			this.load_btn = load_btn;

			// Add status
			let status = document.createElement('p');
			status.id = 'alert_box';
			status.style.display = 'none';
			box.appendChild(status);
			this.status = status;

			// Add spinner
			let spinner = document.createElement('div');
			spinner.id = 'spiner_box';
			spinner.style.display = 'none';
			box.appendChild(spinner);
			this.spinner = spinner;

			let img = document.createElement('img');
			img.src = gca_tools.img.cdn('img/ui/spinner.gif');
			spinner.appendChild(img);

			// Add rankings table
			let rankings_table = document.createElement("table");
			rankings_table.width = "100%";
			rankings_table.style.display = "none";
			rankings_table.style.marginBottom = '15px';
			rankings_table.style.wordBreak = 'break-word';
			box.appendChild(rankings_table);
			this.rankings_table = rankings_table;

			// Add main table
			let table = document.createElement("table");
			table.width = "100%";
			table.style.border = "0px";
			table.style.marginBottom = '15px';
			table.style.wordBreak = 'break-word';
			box.appendChild(table);
			this.table = table;

			// If link opens global arena
			if (document.location.href.match("#global_arena_box")) {
				this.loadList();
				header.scrollIntoView();
			}
		},

		// Load arena list
		loadList : function() {
			this.spinner.style.display = 'block';
			this.table.style.height = '100px';
			this.table.style.opacity = '0.5';
			this.spinner.style.height = this.table.offsetHeight;
			this.spinner.getElementsByTagName('img')[0].style.marginTop = (this.table.offsetHeight / 2 - 16) + 'px';

			this.level = document.getElementById('header_values_level').textContent;

			jQuery.ajax({
				type: "GET",
				url: this.getLink({'player_id' : gca_section.playerId, 'server' : gca_section.server, 'country' : gca_section.country, 'level' : this.level}),
				success: (content) => {
					this.table.style.height = 'auto';
					this.table.style.opacity = '1';
					this.spinner.style.display = 'none';
					var json = false;
					try {
						json = JSON.parse(content);
					} catch (e) {
						gca_notifications.error(
							gca_locale.get("arena", "global_arena_title") + '\n' +
							gca_locale.get("arena", "error_sth_went_wrong")
						);
						return;
					}

					if (json.error) {
						gca_notifications.error(
							gca_locale.get("arena", "global_arena_title") + '\n' +
							gca_locale.get("arena", "error_response")
						);
						return;
					}
					
					this.createList(json);
				},
				error: (jqXHR) => {
					this.spinner.style.display = 'none';
					if (jqXHR.status == 0) {
						gca_notifications.error(
							gca_locale.get("arena", "global_arena_title") + '\n' +
							gca_locale.get("arena", "error_blocked_access", {url : gca.homepage})
						);
					}
					else {
						gca_notifications.error(
							gca_locale.get("arena", "global_arena_title") + '\n' +
							gca_locale.get("arena", "error_connection")
						);
					}
				}
			});
		},

		// Show cooldown
		cooldown : function(cooldown) {
			if (this.cooldown_interval) clearInterval(this.cooldown_interval);
			this.cooldown_interval = null;

			// Display cooldown
			if (cooldown) {
				this.status.style.display = 'block';
				this.status.style.color = 'rgba(255, 30, 30, 1)';
				this.status.textContent = '';
				this.status.appendChild(document.createTextNode(gca_locale.get("arena", "player_tired")));
				this.status.appendChild(document.createElement('br'));

				let timer = document.createElement('span');
				timer.dataset.value = new Date().getTime() + (cooldown * 1000);
				
				// Save global arena timer
				gca_data.section.set("timers", 'global_arena', timer.dataset.value);
				
				this.cooldown_interval = setInterval(() => {
					let left = timer.dataset.value - new Date().getTime();
					if (left > 0) {
						timer.textContent = gca_tools.time.msToString(left);
					}
					else {
						timer.textContent = '';
						clearInterval(this.cooldown_interval);
						this.cooldown_interval = null;
						if (timer.parentNode) timer.parentNode.style.display = 'none';
					}
				}, 1000);
				
				timer.textContent = gca_tools.time.msToString(cooldown * 1000);
				this.status.appendChild(timer);
			}
			else {
				this.status.style.display = 'none';
			}
		},

		// Create global arena list of players
		createList : function(json) {
			// Empty rankings_table
			this.rankings_table.textContent = '';
			// Empty table
			this.table.style.border = '';
			this.table.textContent = '';
			// Disable load list
			this.load_btn.disabled = true;

			// Display cooldown
			this.cooldown(json.cooldown ? json.cooldown : false);
			
			// Create rankings header
			if( json.level_list ){
				this.rankings_table.style.display = "block";
				let rankings_header = document.createElement("tr");
				this.rankings_table.appendChild(rankings_header);
				
				let rankings_th = document.createElement("th");
				rankings_th.textContent = this.info.locale_best.replace("5",json.level_list.length) + " (" + this.info.locale_level + " " + (Math.floor(this.level/5)*5) +"-"+ (Math.floor(this.level/5)*5+5) +")";
				rankings_th.width = "100%";
				rankings_th.style.textAlign = 'center';
				rankings_th.setAttribute('colspan','6');
				rankings_header.appendChild(rankings_th);
				
				rankings_header = document.createElement("tr");
				this.rankings_table.appendChild(rankings_header);
				
				rankings_th = document.createElement("th");
				rankings_th.textContent = this.info.locale_position;
				rankings_th.width = "15%";
				rankings_th.style.textAlign = 'center';
				rankings_header.appendChild(rankings_th);
				
				rankings_th = document.createElement("th");
				rankings_th.textContent = this.info.locale_name;
				rankings_th.width = "20%";
				rankings_header.appendChild(rankings_th);
				
				rankings_th = document.createElement("th");
				rankings_th.textContent = this.info.locale_guild;
				rankings_th.style.fontSize = 'font-size: 0.8em;';
				rankings_th.width = "25%";
				rankings_header.appendChild(rankings_th);
				
				rankings_th = document.createElement("th");
				rankings_th.textContent = this.info.locale_level;
				rankings_th.width = "10%";
				rankings_header.appendChild(rankings_th);
				
				rankings_th = document.createElement("th");
				rankings_th.textContent = gca_locale.get("arena", "country");
				rankings_th.width = "10%";
				rankings_th.style.textAlign = 'center';
				rankings_header.appendChild(rankings_th);
				
				rankings_th = document.createElement("th");
				rankings_th.textContent = gca_locale.get("arena", "server");
				rankings_th.width = "10%";
				rankings_th.style.textAlign = 'center';
				rankings_header.appendChild(rankings_th);
				
				// For each player on the list
				json.level_list.forEach((player) => {
					let isGuildMate = (player.server == gca_section.server && player.country == gca_section.country && this.info.guild_name == player.guild) ? true : false;
					let row = document.createElement('tr');
					this.rankings_table.appendChild(row);

					let th = document.createElement('th');
					th.textContent = player.position + " ("+ player.real_position +")";
					th.style.textAlign = 'center';
					th.style.padding = '5px 0px';
					row.appendChild(th);
					
					let td, link;
					td = document.createElement('td');
					row.appendChild(td);
					link = document.createElement('a');
					link.href = gca_getPage.crossServerLink({server : player.server, country : player.country}, {mod : 'player', p : player.id});
					link.setAttribute('target', '_blank');
					link.textContent = player.name;
					// If guild mate
					if (isGuildMate) link.style.color = 'green';
					td.appendChild(link);
					
					td = document.createElement('td');
					row.appendChild(td);
					if (player.guild_id > 0) {
						link = document.createElement('a');
						link.href = gca_getPage.crossServerLink({server : player.server, country : player.country}, {mod : 'guild', submod : 'forumGladiatorius', i : player.guild_id});
						link.setAttribute('target', '_blank');
						link.textContent = player.guild;
						if (isGuildMate) link.style.color = 'green';
						td.appendChild(link);
					}
					else {
						td.textContent = '-';
					}
					
					td = document.createElement('td');
					td.style.textAlign = 'center';
					td.textContent = player.level >= 1 ? player.level : 'n/a' ;
					row.appendChild(td);
					
					td = document.createElement('td');
					td.style.textAlign = 'center';
					let flag = gca_tools.create.flagIcon(player.country);
					flag.className = 'flag';
					flag.dataset.tooltip = '[[["'+player.country.toUpperCase()+'","#fff;font-size:12px;"]]]';
					td.appendChild(flag);
					row.appendChild(td);
					
					td = document.createElement('td');
					td.textContent = player.server;
					td.style.textAlign = 'center';
					row.appendChild(td);
				});
			}
			
			// Create table header
			let header = document.createElement("tr");
			this.table.appendChild(header);
			this.table.style.display = "block";
			
			let th = document.createElement("th");
			th.textContent = this.info.locale_position;
			th.width = "10%";
			th.style.textAlign = 'center';
			header.appendChild(th);
			
			th = document.createElement("th");
			th.textContent = this.info.locale_name;
			th.width = "20%";
			header.appendChild(th);
			
			th = document.createElement("th");
			th.textContent = this.info.locale_guild;
			th.style.fontSize = 'font-size: 0.8em;';
			th.width = "20%";
			header.appendChild(th);
				
			th = document.createElement("th");
			th.textContent = this.info.locale_level;
			th.width = "10%";
			header.appendChild(th);
			
			th = document.createElement("th");
			th.textContent = gca_locale.get("arena", "country");
			th.width = "10%";
			th.style.textAlign = 'center';
			header.appendChild(th);
			
			th = document.createElement("th");
			th.textContent = gca_locale.get("arena", "server");
			th.width = "10%";
			th.style.textAlign = 'center';
			header.appendChild(th);
			
			th = document.createElement("th");
			th.width = "10%";
			th.textContent = " ";
			header.appendChild(th);
			
			// For each player on the list
			json.list.forEach((player) => {
				let isGuildMate = (player.server == gca_section.server && player.country == gca_section.country && this.info.guild_name == player.guild) ? true : false;
				let row = document.createElement('tr');
				this.table.appendChild(row);

				let th = document.createElement('th');
				th.textContent = player.position;
				th.style.textAlign = 'center';
				th.style.padding = '5px 0px';
				row.appendChild(th);
				
				let td, link;
				td = document.createElement('td');
				row.appendChild(td);
				link = document.createElement('a');
				link.href = gca_getPage.crossServerLink({server : player.server, country : player.country}, {mod : 'player', p : player.id});
				link.setAttribute('target', '_blank');
				link.textContent = player.name;
				// If guild mate
				if (isGuildMate) link.style.color = 'green';
				td.appendChild(link);
				
				td = document.createElement('td');
				row.appendChild(td);
				if (player.guild_id > 0) {
					link = document.createElement('a');
					link.href = gca_getPage.crossServerLink({server : player.server, country : player.country}, {mod : 'guild', submod : 'forumGladiatorius', i : player.guild_id});
					link.setAttribute('target', '_blank');
					link.textContent = player.guild;
					if (isGuildMate) link.style.color = 'green';
					td.appendChild(link);
				}
				else {
					td.textContent = '-';
				}
				
				td = document.createElement('td');
				td.style.textAlign = 'center';
				td.textContent = player.level >= 1 ? player.level : 'n/a' ;
				row.appendChild(td);
				
				td = document.createElement('td');
				td.style.textAlign = 'center';
				let flag = gca_tools.create.flagIcon(player.country);
				flag.className = 'flag';
				flag.dataset.tooltip = '[[["'+player.country.toUpperCase()+'","#fff;font-size:12px;"]]]';
				td.appendChild(flag);
				row.appendChild(td);
				
				td = document.createElement('td');
				td.textContent = player.server;
				td.style.textAlign = 'center';
				row.appendChild(td);
				
				td = document.createElement("td");
				let btn = document.createElement('div');
				btn.className = "attack";
				btn.dataset.tooltip = '[[["'+ gca_locale.get("arena", "attack_player", {name:player.name}) +'","#fff;font-size:12px;"]]]';
				td.appendChild(btn);
				row.appendChild(td);

				// Player attack on click
				btn.addEventListener('click', () => {
					this.attack(player.country, player.server, player.id);
				}, false);
			});

			
			let tr = document.createElement('tr');
			tr.className = "highlight";
			this.table.appendChild(tr);
			
			// Global Arena Position
			let user_position = (json.list.length > 0 ) ? json.list[json.list.length - 1].position + 1 : 1;
			gca_data.section.set("timers", 'global_arena_position', user_position);
			if( document.getElementById('cooldown_bar_ga') )
				document.getElementById('cooldown_bar_ga').dataset.tooltip = '[[["'+gca_locale.get("arena", "global_arena_title")+' : '+user_position+'","#fdfdfd"]]]';
			
			th = document.createElement("th");
			th.textContent = user_position;
			th.style.textAlign = 'center';
			th.className = 'first';
			tr.appendChild(th);
			
			th = document.createElement("th");
			th.textContent = this.info.player_name;
			tr.appendChild(th);
			
			th = document.createElement("th");
			th.textContent = this.info.guild_name;
			tr.appendChild(th);
			
			th = document.createElement("th");
			th.style.textAlign = 'center';
			th.textContent = document.getElementById('header_values_level').textContent;
			tr.appendChild(th);
			
			th = document.createElement("th");
			th.style.textAlign = 'center';
			tr.appendChild(th);
			
			let flag = gca_tools.create.flagIcon(gca_section.country);
			flag.className = "flag";
			flag.dataset.tooltip = '[[["'+gca_section.country.toUpperCase()+'","#fff;font-size:12px;"]]]';
			th.appendChild(flag);
			
			let td = document.createElement("td");
			td.textContent = gca_section.server;
			td.style.textAlign = 'center';
			tr.appendChild(td);
			
			td = document.createElement("td");
			td.textContent = " ";
			td.className = "last";
			tr.appendChild(td);
		},

		attack : function(country, server, player_id) {
			if (this.attack_lock) return;
			this.attack_lock = true;

			this.spinner.style.display = 'block';
			this.spinner.style.height = this.table.offsetHeight;
			this.spinner.getElementsByTagName('img')[0].style.marginTop = (this.table.offsetHeight / 2 - 16) + 'px';

			jQuery.ajax({
				type: "GET",
				url: this.getLink({
					'player_id_A' : gca_section.playerId, 'server_A' : gca_section.server, 'country_A' : gca_section.country,
					'player_id_B' : player_id, 'server_B' : server, 'country_B' : country
				}),
				success: (content) => {
					this.attack_lock = false;
					document.getElementById('spiner_box').style.display = 'none';

					try {
						var json = JSON.parse(content);
					} catch (e) {
						gca_notifications.error(
							gca_locale.get("arena", "global_arena_title") + '\n' +
							gca_locale.get("arena", "error_sth_went_wrong")
						);
						return;
					}
					
					if (json.error) {
						gca_notifications.error(
							gca_locale.get("arena", "global_arena_title") + '\n' +
							gca_locale.get("arena", "error_response")
						);
						this.status.style.display = 'block';
						this.status.textContent = gca_locale.get("arena", "error_response");
						this.status.style.color = 'rgba(255, 30, 30, 1)';
						return;
					}

					if (json.status) {
						if (json.status == 'lost') {
							gca_notifications.error(
								gca_locale.get("arena", "global_arena_title") + '\n' +
								gca_locale.get("arena", "fight_lost")
							);
							this.status.style.display = 'block';
							this.status.textContent = gca_locale.get("arena", "fight_lost");
							this.status.style.color = 'rgba(255, 30, 30, 1)';
						}
						else if (json.status == 'win') {
							gca_notifications.success(
								gca_locale.get("arena", "global_arena_title") + '\n' +
								gca_locale.get("arena", "fight_won")
							);
							this.status.style.display = 'block';
							this.status.textContent = gca_locale.get("arena", "fight_won");
							this.status.style.color = 'rgb(37, 140, 42)';

							this.createList(json);
						}

						// Display cooldown
						if (json.cooldown) {
							this.cooldown(json.cooldown);
						}
						// Display report
						if (json.report_header && json.report) {
							this.report.show(json.report_header, json.report);
						}
					}
					else {
						gca_notifications.error(
							gca_locale.get("arena", "global_arena_title") + '\n' +
							gca_locale.get("arena", "error_response")
						);
						return;
					}
				},
				error: function(){
					this.attack_lock = false;
					gca_notifications.error(
						gca_locale.get("arena", "global_arena_title") + '\n' +
						gca_locale.get("arena", "error_connection")
					);
					this.status.style.display = 'block';
					this.status.textContent = gca_locale.get("arena", "error_connection");
					this.status.style.color = 'rgba(255, 30, 30, 1)';
					this.spinner.style.display = 'none';
				}
			});
		},

		// Parse Global Arena report
		report : {

			init : function(self) {
				this.self = self;
			},

			show : function(header, report) {
				report = this.parse(header, report);
				document.getElementById('content').textContent = '';
				document.getElementById('content').appendChild(report);
				window.scrollTo(window.scrollX, 0);
			},

			parse : function(header, report) {
				// Load saved locale
				this.locale = {
					winner : "Winner",
					stats : "Stats",
					battle_report : "Battle Report",
					name : "Name",
					guild : "Guild",
					hitpoints : "Hitpoints",
					life_points : "Life points",
					round : "Round",
					miss : "misses",
					block : "blocked"
				};
				this.locale = gca_data.section.get('cache', 'reports_locale', this.locale);
				
				var wrapper = document.createElement('div');

				// Battle result
				var elements = this.result(header, report[0]);
				for (let i = 0; i < elements.length; i++) {
					wrapper.appendChild(elements[i]);
				}

				// Title
				var title = document.createElement('h2');
				title.className = 'section-header';
				title.style.cursor = 'pointer';
				title.textContent = this.locale.battle_report;
				wrapper.appendChild(title);

				// Results
				var section = document.createElement('section');
				section.style.display = 'block';
				section.className = 'dungeon_report_statistic';
				var table = document.createElement('table');
				table.setAttribute('width', '100%');
				table.setAttribute('border', '0');
				table.setAttribute('cellspacing', '0');
				table.setAttribute('cellpadding', '3');
				table.className = 'table_border_bottom';

				// Battle rounds
				for (let i = 1; i < report.length; i++) {
					let elements = this.round(report[i], this.locale.round+' ' + i, header.attacker.name, header.defender.name);
					for (let j = 0; j < elements.length; j++) {
						table.appendChild(elements[j]);
					}
				}

				section.appendChild(table);
				wrapper.appendChild(section);
				return wrapper;
			},

			result : function(header, result) {
				let elements = [];

				// Header
				let head = document.createElement('div');
				head.id = 'reportHeader';
				head.className = 'report' + (header.won ? 'Win' : header.lost ? 'Lose' : 'Draw');
				let table = document.createElement('table');
				table.setAttribute('width', '100%');
				table.setAttribute('border', '0');
				table.setAttribute('cellspacing', '0');
				table.setAttribute('cellpadding', '3');
				table.style.borderSpacing = 0;
				let tr, td;
				tr = document.createElement('tr');
				td = document.createElement('td');
				td.textContent = this.locale.winner+': ' + (header.won ? header.attacker.name : header.lost ? header.defender.name : '---');
				tr.appendChild(td);
				table.appendChild(tr);
				head.appendChild(table);
				elements.push(head);

				// Title
				let title = document.createElement('h2');
				title.className = 'section-header';
				title.style.cursor = 'pointer';
				title.textContent = this.locale.stats;
				elements.push(title);

				// Results
				let section = document.createElement('section');
				section.className = 'global-arena-header';
				section.style.display = 'block';
				let fieldset = document.createElement('fieldset');
				fieldset.className = 'dungeon_report_statistic';
				table = document.createElement('table');
				table.setAttribute('width', '100%');
				table.setAttribute('border', '0');
				table.setAttribute('cellspacing', '0');
				table.setAttribute('cellpadding', '3');
				
				let link;

				tr = document.createElement('tr');
				td = document.createElement('th');
				td.textContent = this.locale.name;
				tr.appendChild(td);
				td = document.createElement('th');
				td.textContent = this.locale.hitpoints;
				tr.appendChild(td);
				td = document.createElement('th');
				td.textContent = this.locale.life_points;
				tr.appendChild(td);
				table.appendChild(tr);

				tr = document.createElement('tr');
				td = document.createElement('td');
				link = document.createElement('a');
				link.href = gca_getPage.crossServerLink({server : header.attacker.server, country : header.attacker.country}, {mod : 'player', p : header.attacker.id});
				link.setAttribute('target', '_blank');
				link.textContent = header.attacker.name;
				td.appendChild(link);
				tr.appendChild(td);
				td = document.createElement('td');
				td.textContent = result[0][0];
				tr.appendChild(td);
				td = document.createElement('td');
				td.textContent = result[0][1];
				tr.appendChild(td);
				table.appendChild(tr);

				tr = document.createElement('tr');
				td = document.createElement('td');
				link = document.createElement('a');
				link.href = gca_getPage.crossServerLink({server : header.defender.server, country : header.defender.country}, {mod : 'player', p : header.defender.id});
				link.setAttribute('target', '_blank');
				link.textContent = header.defender.name;
				td.appendChild(link);
				tr.appendChild(td);
				td = document.createElement('td');
				td.textContent = result[1][0];
				tr.appendChild(td);
				td = document.createElement('td');
				td.textContent = result[1][1];
				tr.appendChild(td);
				table.appendChild(tr);

				fieldset.appendChild(table);
				section.appendChild(fieldset);
				elements.push(section);

				return elements;
			},


			flags : {
				REPORT_ATTACKER : 1,
				REPORT_DEFENDER : 2,

				REPORT_ACTION_HIT : 1,
				REPORT_ACTION_KILL : 2,

				HIT_NORMAL : 1,
				HIT_CRITICAL : 2,
				HIT_AVOIDED_CRITICAL : 3,
				HIT_BLOCKED : 4,
				HIT_MISSED : 5
			},

			round : function(round, round_name, attacker_name, defender_name) {
				var elements = [];
				var tr, td, span, text;

				// Tile
				tr = document.createElement('tr');
				tr.style.backgroundColor = '#B5AB83';
				td = document.createElement('th');
				td.setAttribute('colspan', '2');
				td.className = 'table_border_bottom';
				td.textContent = round_name;
				tr.appendChild(td);
				elements.push(tr);

				// For each action
				for (let i = 0; i < round.length; i++) {
					tr = document.createElement('tr');
					if (round[i][0] == this.flags.REPORT_DEFENDER) {
						tr.style.backgroundColor = '#CFC7A3';
					}
					td = document.createElement('td');
					if (round[i][1] == this.flags.REPORT_ACTION_HIT || round[i][1] == this.flags.REPORT_ACTION_KILL) {
						if (round[i][0] == this.flags.REPORT_ATTACKER){
							td.textContent = gca_locale.get("arena", "player1_hits_player2", {name1:attacker_name, name2:defender_name})+"."
						}
						else if (round[i][0] == this.flags.REPORT_DEFENDER){
							td.textContent = gca_locale.get("arena", "player1_hits_player2", {name1:defender_name, name2:attacker_name})+"."
						}
					}
					tr.appendChild(td);
					td = document.createElement('td');
					td.style.textAlign = 'center';
					if (round[i][1] == this.flags.REPORT_ACTION_HIT || round[i][1] == this.flags.REPORT_ACTION_KILL) {
						text = '';
						span = document.createElement('span');
						if (round[i][2] == this.flags.HIT_MISSED) {
							text = this.locale.miss;
						}
						else if (round[i][2] == this.flags.HIT_BLOCKED) {
							text = this.locale.block;
							span.style.color = 'dimgray';
						}
						else {
							span.style.color = 'red';
							if (round[i][0] == this.flags.REPORT_ATTACKER){
								text = gca_locale.get("arena", "player_takes_x_damage", {name:defender_name, number:round[i][3]})+"."
							}
							else if (round[i][0] == this.flags.REPORT_DEFENDER){
								text = gca_locale.get("arena", "player_takes_x_damage", {name:attacker_name, number:round[i][3]})+"."
							}
							if (round[i][2] == this.flags.HIT_CRITICAL) {
								span.style.fontWeight = 'bold';
								text = '*' + text + '*';
							}
							else if (round[i][2] == this.flags.HIT_AVOIDED_CRITICAL) {
								span.style.color = 'dimgray';
								text = '*' + text + '*';
							}
						}
						span.textContent = text;
						td.appendChild(span);

						if (round[i][1] == this.flags.REPORT_ACTION_KILL) {
							td.appendChild(document.createElement('br'));
							span = document.createElement('b');
							if (round[i][0] == this.flags.REPORT_ATTACKER){
								span.textContent = '*' + gca_locale.get("arena", "player_dies", {name:defender_name}) + "*";
							}
							else if (round[i][0] == this.flags.REPORT_DEFENDER){
								span.textContent = '*' + gca_locale.get("arena", "player_dies", {name:attacker_name}) + "*";
							}
							td.appendChild(span);
						}
					}

					tr.appendChild(td);
					elements.push(tr);
				}

				return elements;
			}
		}
	},
	
	// Ignore attack confirmations
	ignore_attack_confirmations : function(){
		// Check if functions exists
		let existsHandler = {
			startFightConfirmed :
				typeof window.startFightConfirmed === 'function' &&
				//typeof window.blackoutDialogDivId !== 'undefined' &&
				document.getElementById('blackoutDialogbod'),
			startProvinciarumFightConfirmed :
				typeof window.startProvinciarumFightConfirmed === 'function' &&
				typeof window.arenaType !== 'undefined' &&
				typeof window.provinciarumDefenderId !== 'undefined' &&
				typeof window.provinciarumServer !== 'undefined' &&
				typeof window.provinciarumCountry !== 'undefined'
		};

		// Function wrappers
		if (existsHandler.startFightConfirmed) {
			window.gca_startFightConfirmed = function (d, a) {
				window.blackoutDialogDivId = 'blackoutDialogbod';
				window.startFightConfirmed(d, a);
			}
		}
		if (existsHandler.startProvinciarumFightConfirmed) {
			window.gca_startProvinciarumFightConfirmed = function (d, a, c, b, e) {
				window.arenaType = a;
				window.provinciarumDefenderId = c;
				window.provinciarumServer = b;
				window.provinciarumCountry = e;
				window.startProvinciarumFightConfirmed(d);
			}
		}

		// Get attack buttons
		var buttons = [...document.getElementsByClassName('attack')];
		buttons.forEach((button) => {
			let onclick = button.getAttribute('onclick');

			if (existsHandler.startFightConfirmed && (/^startFight\(/i).test(onclick)) {
				button.setAttribute('onclick', onclick.replace(/^startFight\(/i, 'gca_startFightConfirmed('));
			}
			else if (existsHandler.startProvinciarumFightConfirmed && (/^startProvinciarumFight\(/i).test(onclick)) {
				button.setAttribute('onclick', onclick.replace(/^startProvinciarumFight\(/i, 'gca_startProvinciarumFightConfirmed('));
			}
		});
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
		for (let i = 1; i < rows.length; i++) {
			let cols = rows[i].getElementsByTagName('td');
			if (cols.length > 0) {
				players.push({
					level : parseInt(cols[1].textContent, 10),
					element : rows[i]
				});
			}
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
			let info = links[i].href.match(/\:\/\/s(\d+)-\w+\.gladiatus\.gameforge\.com\/game\/index\.php\?mod=player&p=(\d+)/i);
			if (info && targets.hasOwnProperty(info[2] + '@' + info[1])) {
				let id = info[2] + '@' + info[1];
				links[i].style.textShadow = '0px 0px 2px ' + targets[id][3];
			}
		}
	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_arena.inject();
	};
	gca_arena.preinject();
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca, gca_data, gca_getPage, gca_links, gca_locale, gca_notifications, gca_options, gca_section, gca_tools */
/* global jQuery */
