/*
 * Addon Messages Script
 * Author: DarkThanos, GreatApo
 */

// Messages
var gca_messages = {
	// Pre Inject code
	preinject : function(){
		// Messages
		if(gca_section.submod == 'messageShow' || gca_section.submod == 'messageMoveDelete'){
			// Check if style is active
			if(gca_options.bool("messages","messages_layout"))
				// Add class tag
				document.documentElement.className += " gca_messages_styling";
		}
	},

	// Inject Code
	inject : function(){
		// Messages
		if(gca_section.submod == 'messageShow' || gca_section.submod == 'messageMoveDelete'){
			// Check if messages list
			if(document.getElementById('content').getElementsByTagName('form').length > 0){
				// Check if option is active
				if(gca_options.bool("messages","messages_layout")){
					// Improve Messages Interface
					this.messages.improve();
				}
				// Check if option is active
				if(gca_options.bool("messages","send_message_box")){
					// Insert message sent
					this.sendMessage.inject(); // TODO : Send message
				}
			}
		}
	},

	// Messages Interface stuff
	messages : {

		// Improve interface
		improve : function(){
			// Messages
			var messages = document.getElementById("content").getElementsByTagName('form')[0].getElementsByClassName("message_box");
			
			// Display Number of messages
			this.displayNumberOfMessages(messages.length);

			// Message editing and style changes on each message
			for(var i = 0; i < messages.length; i++){
				this.editMessageInterface(messages[i]);
			}
		},

		// Edit message interface
		editMessageInterface : function(element){
			// Message Object
			var message = {
				image : element.getElementsByClassName("message_icon")[0].style.backgroundImage,
				title : element.getElementsByClassName("message_title")[0],
				date : element.getElementsByClassName("message_date")[0],
				body : element.getElementsByClassName("message_text")[0],
				element : element
			};

			// Fix link click close message
			var titleLinks = message.title.getElementsByTagName('a');
			if(titleLinks){
				for (var i = titleLinks.length - 1; i >= 0; i--) {
					titleLinks[i].addEventListener('click', function(e){
						e.stopPropagation();
					}, false);
				}
			}

			// Personal message
			if(message.image.match("messages.gif")){
				this.editMessage.personal(message);
			}

			// Guild message
			else if(message.image.match(/\d+-\d+\.png/)){
				//this.editMessage.guild(message);
			}

			// Gladiatus notification
			else if(message.image.match("icon_7.gif")){
				// Guild attack
				if(element.getElementsByTagName('a').length > 0 && element.getElementsByTagName('a')[0].href.match("guild_warcamp")){
					this.editMessage.guildReport(message);
				}
				// Other
				else{
					this.editMessage.otherNews(message);
				}
			}
		},

		// Fix messages
		editMessage : {
			// Personal message
			personal : function(message){
				// Personal message
				message.element.className += " gca_messages_personal";

				// Create table
				var layout = document.createElement("div");
				layout.className = "gca_messages_personal_table";
				var table = document.createElement("table");
				table.setAttribute("cellspacing","0");
				table.setAttribute("cellpadding","0");
				var tr = document.createElement("tr");
				var td = document.createElement("td");
				td.className = "scroll_top_left";
				tr.appendChild(td);
				td = document.createElement("td");
				td.className = "scroll_top_center";
				tr.appendChild(td);
				td = document.createElement("td");
				td.className = "scroll_top_right";
				tr.appendChild(td);
				table.appendChild(tr);
				tr = document.createElement("tr");
				td = document.createElement("td");
				td.className = "scroll_body_left";
				tr.appendChild(td);
				var body = document.createElement("td");
				body.className = "scroll_body_center";
				tr.appendChild(body);
				td = document.createElement("td");
				td.className = "scroll_body_right";
				tr.appendChild(td);
				table.appendChild(tr);
				tr = document.createElement("tr");
				td = document.createElement("td");
				td.className = "scroll_bottom_left";
				tr.appendChild(td);
				td = document.createElement("td");
				td.className = "scroll_bottom_center";
				tr.appendChild(td);
				td = document.createElement("td");
				td.className = "scroll_bottom_right";
				tr.appendChild(td);
				table.appendChild(tr);
				layout.appendChild(table);

				// Message Content
				var content = message.body.parentNode;

				// Insert Message
				body.appendChild(message.body);
				content.insertBefore(layout, content.firstChild);
			},
			
			// Guild Battle report
			guildReport : function(message){
				// Guild Report message
				message.element.className += " gca_messages_guild_report";

				// Loading
				var loading = document.createElement("div");
				loading.className = "loading";
				message.body.appendChild(loading);

				// Create new message layout
				var layout = document.createElement("div");
				// Header title div
				var header = document.createElement("div");
				header.className = "gca_messages_guild_report_title";
				layout.appendChild(header);
				// Guild flags div
				var guilds = document.createElement("div");
				guilds.className = "gca_messages_guild_report_main";
				layout.appendChild(guilds);
				// Description Div
				var description = document.createElement("div");
				description.className = "gca_messages_guild_report_decription";
				layout.appendChild(description);
				// Results
				var resultsDiv = document.createElement("div");
				resultsDiv.className = "gca_messages_guild_report_results";
				layout.appendChild(resultsDiv);
				// Place link on message title
				var link = message.body.getElementsByTagName("a")[0];
				message.title.appendChild(link);
				// Insert new layout on the message
				layout.style.display = "none";
				message.body.appendChild(layout);

				// Attacker guild
				var guildA = {};
				var div = document.createElement("div");
				div.className = "gca_messages_guild_report_left";
				guildA.name = document.createElement("div");
				guildA.name.className = "gca_messages_guild_report_name";
				div.appendChild(guildA.name);
				guildA.imgDiv = document.createElement("div");
				guildA.imgDiv.className = "gca_messages_guild_report_divimage";
				guildA.img = document.createElement("img");
				guildA.imgDiv.appendChild(guildA.img);
				div.appendChild(guildA.imgDiv);
				guilds.appendChild(div);

				// Defender guild
				var guildB = {};
				div = document.createElement("div");
				div.className = "gca_messages_guild_report_right";
				guildB.name = document.createElement("div");
				guildB.name.className = "gca_messages_guild_report_name";
				div.appendChild(guildB.name);
				guildB.imgDiv = document.createElement("div");
				guildB.imgDiv.className = "gca_messages_guild_report_divimage";
				guildB.img = document.createElement("img");
				guildB.imgDiv.appendChild(guildB.img);
				div.appendChild(guildB.imgDiv);
				guilds.appendChild(div);

				// VS
				div = document.createElement("div");
				div.className = "gca_messages_guild_report_vs";
				div.textContent = "VS";
				guilds.appendChild(div);
				
				// Get more info
				jQuery.get(link.href, function(data){
					// Get Winner
					var winner = data.match(/<div\s*id="reportHeader"\s*class="([^"]+)">([^<]+)<\/div>/i);
					// Get Guilds
					var guilds = data.match(/<span\s*class="guildname">([^<]+)<\/span>\s*<\/div>\s*<img\s*alt="[^"]+"\s*src="[^"]+"\s*border="0"\s*\/>/gm);
					// Get description
					var battleInfo = data.match(/<h2>\s*([^<]+)<img\s+src="([^"]+)"\s+alt="([^"]+)"\s+title="([^"]+)"[^>]+>[^<]*(<a\s+alt="[^"]+"\s+title="[^"]+"\s+href="index\.php\?mod=guild_warcamp&submod=guild_combat&gid=\d+&sh=[^"]+"[^>]*>\s*<img[^>]+>\s*<\/a>|)\s*<br[^>]*>\s*<\/h2>/im);
					// Results
					var results = data.match(/<th[^>]*>(\d+)<\/th>\s*<th[^>]*><a\s+href="index\.php\?mod=guild&i=(\d+)&sh=[^"]+"\s+target="_self">([^<]+)<\/a><\/th>\s*<th[^>]*><\/th>\s*<th[^>]*><\/th>\s*<th[^>]*><a\s+href="index\.php\?mod=guild&i=(\d+)&sh=[^"]+"\s+target="_self">([^<]+)<\/a><\/th>\s*<th[^>]*>(\d+)<\/th>/im);

					// If data was loaded with no problem
					if(winner != null && results != null && guilds.length == 2){
						// Display layout
						layout.style.display = "block";
						loading.style.display = "none";

						// Display winner
						header.appendChild(document.createTextNode(winner[2]));
						header.className += " " + winner[1];
						// Parse guilds' info
						var guild_A = guilds[0].match(/<span\s*class="guildname">([^<]+)<\/span>\s*<\/div>\s*<img\s*alt="[^"]+"\s*src="([^"]+)"\s*border="0"\s*\/>/im);
						var guild_B = guilds[1].match(/<span\s*class="guildname">([^<]+)<\/span>\s*<\/div>\s*<img\s*alt="[^"]+"\s*src="([^"]+)"\s*border="0"\s*\/>/im);

						// Display Attacker Guild
						guildA.name.appendChild(document.createTextNode(guild_A[1]));
						guildA.img.setAttribute("src", guild_A[2]);
						// Display Defender Guild
						guildB.name.appendChild(document.createTextNode(guild_B[1]));
						guildB.img.setAttribute("src", guild_B[2]);

						// Build description
						if(battleInfo != null){
							var img = document.createElement("img");
							img.setAttribute("src", battleInfo[2]);
							img.setAttribute("alt", battleInfo[3]);
							img.setAttribute("title", battleInfo[4]);
							img.setAttribute("align", "absmiddle");
							img.setAttribute("border", "0");
							description.appendChild(document.createTextNode(battleInfo[1]));
							description.appendChild(img);
						}

						// Build results
						var table, tr, td, link;
						table = document.createElement("table");
						tr = document.createElement("tr");
						td = document.createElement("td");
						td.className = "battles_results battles_results_left";
						td.textContent = "(" + results[1] + ")";
						tr.appendChild(td);
						td = document.createElement("td");
						td.className = "battles_results_left";
						link = document.createElement("a");
						link.href = gca_getPage.link({"mod":"guild", "submod":"forumGladiatorius", "i":results[2]});
						link.textContent = results[3];
						td.appendChild(link);
						tr.appendChild(td);
						td = document.createElement("td");
						tr.appendChild(td);
						td = document.createElement("td");
						td.className = "battles_results_right";
						link = document.createElement("a");
						link.href = gca_getPage.link({"mod":"guild", "submod":"forumGladiatorius", "i":results[4]});
						link.textContent = results[5];
						td.appendChild(link);
						tr.appendChild(td);
						td = document.createElement("td");
						td.className = "battles_results battles_results_right";
						td.textContent = "(" + results[6] + ")";
						tr.appendChild(td);
						table.appendChild(tr);
						resultsDiv.appendChild(table);
					}
					else{
						loading.style.backgroundImage = "none";
						loading.appendChild(document.createTextNode(gca_locale.get("error")));
					}
				});
			},

			// General News
			otherNews : function(message){
				// News message
				message.element.className += " gca_messages_other_news";
			}
		},

		// Display number of messages
		displayNumberOfMessages : function(messagesNumber) {
			return;

			// Get pagging div
			var pagging = document.getElementsByClassName("paging");
			// Check if exist
			if(!pagging.length > 0) return;
			pagging = pagging[0];

			var div = document.createElement("div");
			div.className = "pagging-number-of-messages";
			div.textContent = "(" + messagesNumber + ")";
			pagging.insertBefore(div, pagging.firstChild);
		}
	},

	// Sent message interface
	sendMessage : {
		// Inject
		inject : function(){
			// 
			//var div = document.createElement('div');
			//document.getElementById("content").preve
		}
	}
};

(function(){
	// Pre Inject
	gca_messages.preinject();
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_messages.inject();
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
