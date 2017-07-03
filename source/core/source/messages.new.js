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
			if(gca_options.bool("messages","new_message_friend_list") && 
				this.newMessage.showNames());
		}
	},

	// New Message
	newMessage : {
		
		// Set focus
		setFocus : function(){
			document.getElementById("messageForm").getElementsByTagName("textarea")[0].focus();
		},
		
		// Show mates names
		showNames : function(){
			// Create a friends button
			var div = document.createElement("div");
			div.className = "gca_new_message_select_user";
			div.addEventListener("click", function(){
				gca_new_message.newMessage.showPlayersName.open();
			}, false);

			// Insert button
			document.getElementById("messageForm").messageRecipient.parentNode.appendChild(div);
		},

		// Show mates names
		showPlayersName : {
			// Online Friends Dialog
			dialog : false,

			// Open Dialog
			open : function(){
				if(!this.dialog){
					// Create a dialog
					var dialog = new gca_build.dialog;
					dialog.smallHead(true);
					dialog.title.textContent = gca_locale.get( "friend_list" );

					// Temp elements variables
					var table, tr, td, div, span;

					// Headers
					table = document.createElement('table');
					table.className = "online_friends_table";
					tr = document.createElement('tr');
					td = document.createElement('td');
					td.setAttribute("width", "50%");
					td.textContent = gca_locale.get( "guild_friends" ) + " ";
					span = document.createElement('span');
					span.id = "guild_friends_list_counter";
					td.appendChild(span);
					tr.appendChild(td);
					td = document.createElement('td');
					td.setAttribute("width", "50%");
					td.textContent = gca_locale.get( "family_friends" ) + " ";
					span = document.createElement('span');
					span.id = "family_friends_list_counter";
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
					div.id = "guild_friends_list";
					div.style.textAlign = "left";
					td.appendChild(div);
					tr.appendChild(td);
					td = document.createElement('td');
					td.setAttribute("width", "50%");
					div = document.createElement('div');
					div.id = "family_friends_list";
					div.style.textAlign = "left";
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

					button.addEventListener('click', function(){
						gca_new_message.newMessage.showPlayersName.refresh();
					}, false);

					// Add close Button
					var button = document.createElement('input');
					button.className = "button3";
					button.type = "button";
					button.value = gca_locale.get("close");
					dialog.body.appendChild(button);

					button.addEventListener('click', function(){
						dialog.close();
					}, false);
				}

				// Refresh Dialog
				this.refresh();
				// Display Dialog
				this.dialog.open();
			},

			// Refresh
			refresh : function(){
				// If dialog is open
				if(!this.dialog || !document.getElementById('guild_friends_list') || !document.getElementById('family_friends_list'))
					return;

				// Clear Lists
				document.getElementById('guild_friends_list').textContent = "";
				document.getElementById('family_friends_list').textContent = "";
				document.getElementById("guild_friends_list_counter").textContent = "";
				document.getElementById("family_friends_list_counter").textContent = "";
				// Display loading
				document.getElementById('guild_friends_list').className = "online_friends_loading_img loading";
				document.getElementById('family_friends_list').className = "online_friends_loading_img loading";

				// Get online guild memebers
				jQuery.get(gca_getPage.link({"mod":"guild","submod":"memberList","order":"o"}), function(content){
					// Match All active players
					var players = content.match(/<tr>\s*<td>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+">([^<]+)<\/a>\s*<\/td>\s*<td>([^<]+)<\/td>\s*<td>(\d+)<\/td>\s*<td align="right">\s*<span[^>]*>[^<]*<\/span>\s*<\/td>\s*<td align="right"><span style="color:\s*([^;]+);[^"]*" title="[^"]*">([^<]*)</mg);
					
					var guild = {};
					// Save that you are not on a guild
					if(!players && content.match(/<form\s+action="index.php\?mod=guild&submod=create&sh=/i)){
						guild.inGuild = false;
					}
					// Save that you are on guild
					else{
						guild.inGuild = true;
						guild.mates = [];
					}

					// Of no players found
					if(!players){
						players = [];
					}

					// List with parsed players info
					var player_list = [];
					// For each player
					for (let i = 0; i < players.length; i++){
						// Match player's info
						let player = players[i].match(/<tr>\s*<td>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+">([^<]+)<\/a>\s*<\/td>\s*<td>([^<]+)<\/td>\s*<td>(\d+)<\/td>\s*<td align="right">\s*<span[^>]*>[^<]*<\/span>\s*<\/td>\s*<td align="right"><span style="color:\s*([^;]+);[^"]*" title="[^"]*">([^<]*)</mi);
						let player_info = {
							id : player[1],
							name : player[2],
							rank : player[3],
							level : player[4],
							color : player[5],
							time : player[6]
						};
						player_info.name = gca_tools.strings.trim(player_info.name);
						player_info.rank = gca_tools.strings.trim(player_info.rank);

						// If not This player, add him to the list
						if(player_info.id != gca_section.playerId){
							player_list.push(player_info);
							guild.mates.push({
								id : player_info.id,
								name : player_info.name,
								rank : player_info.rank,
								level : player_info.level
							});
						}
					}

					// Save that you are on guild
					gca_data.section.set("guild", "inGuild", guild.inGuild);
					gca_data.section.set("guild", "mates", guild.mates);

					// Short on name
					player_list.sort(function(a, b){
						if(a.name > b.name)
							return 1;
						else if(a.name < b.name)
							return -1;
						else
							return 0;
					});


					var parent = document.getElementById('guild_friends_list');
					var countElement = document.getElementById("guild_friends_list_counter");
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
						// If too many players found
						if(player_list.length >= 10){
							parent.setAttribute('style','text-align:left;overflow:auto;height:200px;');
						}else{
							parent.setAttribute('style','text-align:left;');

						}
						parent.parentNode.setAttribute('style','vertical-align:top;');
						// For each player
						for (let i = 0; i < player_list.length; i++){
							let bull = document.createElement('font');
							bull.setAttribute("color", player_list[i].color);
							bull.textContent = "\u2022";
							parent.appendChild(bull);
							parent.appendChild( document.createTextNode(' ') );
							let name = document.createElement('a');
							name.addEventListener("click", function(){
								document.getElementById("messageForm").getElementsByTagName("input")[0].value = player_list[i].name;
								gca_new_message.newMessage.showPlayersName.dialog.close();
								document.getElementById("messageForm").getElementsByTagName("textarea")[0].focus();
							}, false);
							name.style.color = "black";
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
				
				// Get online family memebers
				jQuery.get(gca_getPage.link({"mod":"overview","submod":"buddylist"}), function(content){
					// Match All active players
					var players = content.match(/<tr>\s*<td[^>]*>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+"[^>]*>([^<]+)<\/a>\s*<\/td>\s*<td><a href="index\.php\?mod=guild&i=(\d+)&sh=[^"]+"[^>]*>\s*\[([^\]]+)\]\s*<\/a><\/td>\s*<td>(\d+)<\/td>\s*<td><span style="color:\s*([^;]+);[^"]*" title="[^"]*">([^<]*)</mg);
					
					var family = {};
					// Save family
					family.mates = [];

					// Of no players found
					if(!players){
						players = [];
					}

					// List with parsed players info
					var player_list = [];
					// For each player
					for (let i = 0; i < players.length; i++){
						// Match player's info
						let player = players[i].match(/<tr>\s*<td[^>]*>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+"[^>]*>([^<]+)<\/a>\s*<\/td>\s*<td><a href="index\.php\?mod=guild&i=(\d+)&sh=[^"]+"[^>]*>\s*\[([^\]]+)\]\s*<\/a><\/td>\s*<td>(\d+)<\/td>\s*<td><span style="color:\s*([^;]+);[^"]*" title="[^"]*">([^<]*)</mi);
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
						family.mates.push({
							id : player_info.id,
							name : player_info.name,
							guild : {
								id : player_info.guild.id,
								name : player_info.guild.name
							},
							level : player_info.level
						});
					}

					// Save family
					gca_data.section.set('guild', "family", family.mates);

					// Short on name
					player_list.sort(function(a, b){
						if(a.name > b.name)
							return 1;
						else if(a.name < b.name)
							return -1;
						else
							return 0;
					});

					var parent = document.getElementById('family_friends_list');
					var countElement = document.getElementById("family_friends_list_counter");
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
						// If too many players found
						if(player_list.length >= 10){
							parent.setAttribute('style','text-align:left;overflow:auto;height:200px;');
						}else{
							parent.setAttribute('style','text-align:left;');
						}
						parent.parentNode.setAttribute('style','vertical-align:top;');
						// For each player
						for (let i = 0; i < player_list.length; i++){
							let bull = document.createElement('font');
							bull.setAttribute("color", player_list[i].color);
							bull.textContent = "\u2022";
							parent.appendChild(bull);
							parent.appendChild( document.createTextNode(' ') );
							let name = document.createElement('a');
							name.addEventListener("click", function(){
								document.getElementById("messageForm").getElementsByTagName("input")[0].value = player_list[i].name;
								gca_new_message.newMessage.showPlayersName.dialog.close();
								document.getElementById("messageForm").getElementsByTagName("textarea")[0].focus();
							}, false);
							name.style.color = "black";
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
};

(function(){
	// Pre Inject
	gca_new_message.preinject();
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_new_message.inject();
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
