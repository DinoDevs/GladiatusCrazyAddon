/*
 * Addon New Message Script
 * Author: DarkThanos, GreatApo
 */

// New Messages
var gca_new_message = {
	// Pre Inject code
	preinject : function(){
		// Messages
		if(gca_section.submod == 'messageNew'){
			// Check if style is active
			if(gca_options.bool("messages","new_message_focus") || gca_options.bool("messages","new_message_friend_list"))
				// Add class tag
				document.documentElement.className += " gca_new_message_styling";
		}
	},

	// Inject Code
	inject : function(){
		// New Message
		if(gca_section.submod == 'messageNew'){
			// Set focus on main body
			(gca_options.bool("messages","new_message_focus") && 
				this.newMessage.setFocus());
			
			// Add friend list
			if(gca_options.bool("messages","new_message_friend_list") && !gca_getPage.parameter('addBuddy') &&
				this.newMessage.friendList.inject());
		}
	},

	// New Message
	newMessage : {
		
		// Set focus
		setFocus : function(){
			document.getElementById("messageForm").getElementsByTagName("textarea")[0].focus();
		},

		// Show friend list to send message
		friendList : {
				
			// Create button to open dialog
			inject : function() {
				// Check if correct inputs
				if (document.getElementById("messageForm").getElementsByTagName("input")[0].name != 'messageRecipient') {
					// Maybe it is a reply 
					return;
				}

				// Create a friends button
				var div = document.createElement("div");
				div.className = "gca_new_message_select_user";
				div.addEventListener("click", () => {
					this.dialogHandler.open();
				}, false);

				// Insert button
				document.getElementById("messageForm").messageRecipient.parentNode.appendChild(div);
			},

			dialogHandler : {
				// Online Friends Dialog
				dialog : false,

				// Open Dialog
				open : function(){
					if(!this.dialog){
						// Create a dialog
						var dialog = new gca_build.dialog;
						dialog.smallHead(true);
						dialog.title.textContent = gca_locale.get("global", "online_friends");

						// Temp elements variables
						var table, tr, td, div, span;

						// Headers
						table = document.createElement('table');
						table.className = "online_friends_table";
						tr = document.createElement('tr');
						td = document.createElement('td');
						td.setAttribute("width", "50%");
						td.textContent = gca_locale.get("global", "guild_friends") + " ";
						span = document.createElement('span');
						span.id = "select_friends_guild_counter";
						td.appendChild(span);
						tr.appendChild(td);
						td = document.createElement('td');
						td.setAttribute("width", "50%");
						td.textContent = gca_locale.get("global", "family_friends") + " ";
						span = document.createElement('span');
						span.id = "select_friends_family_counter";
						td.appendChild(span);
						tr.appendChild(td);
						table.appendChild(tr);
						dialog.body.appendChild(table);

						// Loading
						table = document.createElement('table');
						table.className = "online_friends_table";
						tr = document.createElement('tr');
						td = document.createElement('td');
						td.setAttribute("width", "50%");
						div = document.createElement('div');
						div.id = "select_guild_friends";
						td.appendChild(div);
						tr.appendChild(td);
						td = document.createElement('td');
						td.setAttribute("width", "50%");
						div = document.createElement('div');
						div.id = "select_family_friends";
						td.appendChild(div);
						tr.appendChild(td);
						table.appendChild(tr);
						dialog.body.appendChild(table);

						// Add some space
						div = document.createElement('div');
						div.className = "space";
						dialog.body.appendChild(div);

						// Save dialog variable
						this.dialog = dialog;

						// Add refresh Button
						var button = document.createElement('a');
						button.className = "gca-icon refresh-icon";
						button.style.marginRight = "10px";
						dialog.body.appendChild(button);

						button.addEventListener('click', () => {
							this.refresh();
						}, false);

						// Add close Button
						button = document.createElement('input');
						button.className = "button3";
						button.type = "button";
						button.value = gca_locale.get("general", "close");
						dialog.body.appendChild(button);

						button.addEventListener('click', () => {
							this.dialog.close();
						}, false);
					}

					// Refresh Dialog
					this.refresh();
					// Display Dialog
					this.dialog.open();
				},

				// Refresh
				refresh : function(){
					// Clear Lists
					document.getElementById('select_guild_friends').textContent = "";
					document.getElementById('select_family_friends').textContent = "";
					document.getElementById("select_friends_guild_counter").textContent = "";
					document.getElementById("select_friends_family_counter").textContent = "";
					// Display loading
					document.getElementById('select_guild_friends').className = "online_friends_loading_img loading";
					document.getElementById('select_family_friends').className = "online_friends_loading_img loading";

					// Get online guild members
					jQuery.get(gca_getPage.link({"mod":"guild","submod":"memberList","order":"o"}), (content) => {
						// Match All active players
						var online_players = content.match(/<tr>\s*<td>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+">([^<]+)<\/a>\s*<\/td>\s*<td>([^<]+)<\/td>\s*<td>(\d+)<\/td>\s*<td align="right">\s*[^<]*(<span[^>]*>[^<]*<\/span>|)\s*<\/td>\s*<td align="right"><span style="color:\s*([^;]+);[^"]*" title="[^"]*">([^<]*)</mg);
						
						// Check if you are on a guild
						if(!online_players && content.match(/<form\s+action="index.php\?mod=guild&submod=create&sh=/i)){
							// Save that you are not on guild
							if(gca_data.section.get("guild", "inGuild", false)){
								gca_data.section.set("guild", "inGuild", false);
								gca_data.section.del("guild", "mates");
							}
						}
						// You are in a guild, so update guild data
						else{
							let guild_players_data = content.match(/<tr>\s*<td>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+">([^<]+)<\/a>\s*<\/td>\s*<td>([^<]+)<\/td>\s*<td>(\d+)<\/td>\s*<td align="right">\s*[^<]*(<span[^>]*>[^<]*<\/span>|)\s*<\/td>\s*<td align="right"><span style="color:[^>]+>([^<]*)</mg);
							let guild_players = [];
						
							// For each player
							for (let i = 0; i < guild_players_data.length; i++){
								// Match player's info
								let player = guild_players_data[i].match(/<tr>\s*<td>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+">([^<]+)<\/a>\s*<\/td>\s*<td>([^<]+)<\/td>\s*<td>(\d+)<\/td>\s*<td align="right">\s*[^<]*(<span[^>]*>[^<]*<\/span>|)\s*<\/td>\s*<td align="right"><span style="color:[^>]+>([^<]*)</mi);
								let player_info = {
									id : player[1],
									name : player[2],
									rank : player[3],
									level : player[4]
								};
								player_info.name = gca_tools.strings.trim(player_info.name);
								player_info.rank = gca_tools.strings.trim(player_info.rank);
								// Update guild players
								guild_players.push(player_info);
							}

							// If guild players, update them
							if(guild_players.length > 0){
								// Update guild data
								gca_data.section.set("guild", "inGuild", true);
								gca_data.section.set("guild", "mates", guild_players);
							}
						}

						// If no players found
						if(!online_players){
							online_players = [];
						}
						

						// List with parsed players info
						var player_list = [];
						// For each player
						for (let i = 0; i < online_players.length; i++){
							// Match player's info
							let player = online_players[i].match(/<tr>\s*<td>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+">([^<]+)<\/a>\s*<\/td>\s*<td>([^<]+)<\/td>\s*<td>(\d+)<\/td>\s*<td align="right">\s*[^<]*(<span[^>]*>[^<]*<\/span>|)\s*<\/td>\s*<td align="right"><span style="color:\s*([^;]+);[^"]*" title="[^"]*">([^<]*)</mi);
							let player_info = {
								id : player[1],
								name : player[2],
								rank : player[3],
								level : player[4],
								color : player[6],
								time : player[7]
							};
							player_info.name = gca_tools.strings.trim(player_info.name);
							player_info.rank = gca_tools.strings.trim(player_info.rank);

							// If not This player, add him to the list
							if(player_info.id != gca_section.playerId)
								player_list.push(player_info);
						}

						var parent = document.getElementById('select_guild_friends');
						var countElement = document.getElementById("select_friends_guild_counter");
						// Remove loading
						parent.removeAttribute('class');
						// If no players online
						if(player_list.length == 0){
							var noPlayers = document.createElement('div');
							noPlayers.style.textAlign = "center";
							noPlayers.textContent = "-";
							parent.appendChild(noPlayers);
							countElement.textContent = "";
							parent.parentNode.setAttribute('style','vertical-align:middle;');
						}
						// If many players found
						else{
							// Short on name
							player_list.sort(function(a, b){
								if(a.name > b.name) return 1;
								else if(a.name < b.name) return -1;
								else return 0;
							});

							// If too many players found
							if(player_list.length >= 10){
								parent.setAttribute('style','overflow:auto;height:200px;');
							}else{
								parent.removeAttribute('style');

							}
							parent.parentNode.setAttribute('style','vertical-align:top;');
							// For each player
							for (let i = 0; i < player_list.length; i++){
								let bull = document.createElement('font');
								bull.setAttribute("color", player_list[i].color);
								bull.textContent = "\u25cf";
								parent.appendChild(bull);
								parent.appendChild( document.createTextNode(' ') );
								let name = document.createElement('a');
								name.addEventListener("click", () => {
									document.getElementById("messageForm").getElementsByTagName("input")[0].value = player_list[i].name;
									this.dialog.close();
									document.getElementById("messageForm").getElementsByTagName("textarea")[0].focus();
								}, false);
								name.style.color = "black";
								name.style.cursor = "pointer";
								name.style.fontFamily = "century gothic";
								name.textContent = player_list[i].name;
								name.title = player_list[i].time;
								parent.appendChild(name);
								parent.appendChild( document.createTextNode(' ') );
								let info = document.createElement('span');
								info.style.fontSize = "0.8em";
								info.style.color = "#525252";
								info.textContent = "[lv" + player_list[i].level + " - " + player_list[i].rank + "]";
								parent.appendChild(info);
								parent.appendChild( document.createElement('br') );
							}
							countElement.textContent = "(" + player_list.length + ")";
						}
					});
					
					// Get online family members
					jQuery.get(gca_getPage.link({"mod":"overview","submod":"buddylist"}), (content) => {
						// Match All active players
						var online_players = content.match(/<tr>\s*<td[^>]*>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+"[^>]*>([^<]+)<\/a>\s*<\/td>\s*<td><a href="index\.php\?mod=guild&i=(\d+)&sh=[^"]+"[^>]*>\s*\[([^\]]+)\]\s*<\/a><\/td>\s*<td>(\d+)<\/td>\s*<td><span style="color:\s*([^;]+);[^"]*" title="on">([^<]*)</mg);
						if(!online_players) online_players = [];
						// List with parsed players info
						var player_list = [];
						// For each player
						for (let i = 0; i < online_players.length; i++){
							// Match player's info
							let player = online_players[i].match(/<tr>\s*<td[^>]*>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+"[^>]*>([^<]+)<\/a>\s*<\/td>\s*<td><a href="index\.php\?mod=guild&i=(\d+)&sh=[^"]+"[^>]*>\s*\[([^\]]+)\]\s*<\/a><\/td>\s*<td>(\d+)<\/td>\s*<td><span style="color:\s*([^;]+);[^"]*" title="on">([^<]*)</mi);
							let player_info = {
								id : player[1],
								name : player[2],
								guild : {
									id : player[3],
									name : player[4]
								},
								level : player[5],
								color : player[6],
								time : player[7]
							};
							player_info.name = gca_tools.strings.trim(player_info.name);
							player_info.guild.name = gca_tools.strings.trim(player_info.guild.name);

							player_list.push(player_info);
						}

						var parent = document.getElementById('select_family_friends');
						var countElement = document.getElementById("select_friends_family_counter");
						// Remove loading
						parent.removeAttribute('class');
						// If no players online
						if(player_list.length == 0){
							var noPlayers = document.createElement('div');
							noPlayers.style.textAlign = "center";
							noPlayers.textContent = "-";
							parent.appendChild(noPlayers);
							countElement.textContent = "";
							parent.parentNode.setAttribute('style','vertical-align:middle;');
						}
						// If many players found
						else{
							// Short on name
							player_list.sort(function(a, b){
								if(a.name > b.name) return 1;
								else if(a.name < b.name) return -1;
								else return 0;
							});

							// If too many players found
							if(player_list.length >= 10){
								parent.setAttribute('style','overflow:auto;height:200px;');
							}else{
								parent.removeAttribute('style');
							}
							parent.parentNode.setAttribute('style','vertical-align:top;');
							// For each player
							for (let i = 0; i < player_list.length; i++){
								let bull = document.createElement('font');
								bull.setAttribute("color", player_list[i].color);
								bull.textContent = "\u25cf";
								parent.appendChild(bull);
								parent.appendChild( document.createTextNode(' ') );
								let name = document.createElement('a');
								name.addEventListener("click", () => {
									document.getElementById("messageForm").getElementsByTagName("input")[0].value = player_list[i].name;
									this.dialog.close();
									document.getElementById("messageForm").getElementsByTagName("textarea")[0].focus();
								}, false);
								name.style.color = "black";
								name.style.cursor = "pointer";
								name.style.fontFamily = "century gothic";
								name.textContent = player_list[i].name;
								name.title = player_list[i].time;
								parent.appendChild(name);
								parent.appendChild( document.createTextNode(' ') );
								let info = document.createElement('span');
								info.style.fontSize = "0.8em";
								info.style.color = "#525252";
								info.appendChild( document.createTextNode("[lv" + player_list[i].level + " - ") );
								let guild = document.createElement('a');
								guild.href = gca_getPage.link({"mod":"guild","submod":"forumGladiatorius","i":player_list[i].guild.id});
								guild.style.color = "#525252";
								guild.textContent = player_list[i].guild.name;
								info.appendChild(guild);
								info.appendChild( document.createTextNode("]") );
								parent.appendChild(info);
								parent.appendChild( document.createElement('br') );
							}
							countElement.textContent = "(" + player_list.length + ")";
						}
					});
				}
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
		gca_new_message.inject();
	};
	gca_new_message.preinject();
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_build, gca_data, gca_getPage, gca_locale, gca_options, gca_section, gca_tools */
/* global jQuery */
