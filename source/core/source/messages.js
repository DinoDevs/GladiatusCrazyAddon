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
			// If mobile
			if(navigator.userAgent.toLowerCase().indexOf('android') > -1)
				// Add class tag
				document.documentElement.className += " gca_mobile_device";
			
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

			// Parse messages
			this.messages.resolve();

			// Messages layout improve
			(gca_options.bool("messages", "messages_layout") && 
				this.layout.improve(this));

			// Unread messages
			(gca_options.bool("messages", "show_unread") &&
				this.unread.show(this));

			// Pagination layout
			(gca_options.bool("global", "pagination_layout") && 
				this.pagination());

			// Separate days
			(gca_options.bool("messages", "separate_days") && 
				this.separator.days(this));

			// Guild message player info
			(gca_options.bool("messages", "messages_layout") && gca_options.bool("messages", "more_guild_mate_info") && (
				this.guild_message.more_info(this) ||
				this.private_message.more_info(this)
			));

			// Guild message parse links
			(gca_options.bool("messages", "show_message_links") &&
				this.guild_message.display_links(this));

			// Guild battle more info
			(gca_options.bool("messages", "get_guild_battle_info") &&
				this.guild_battle.more_info(this));

			// Sidebar
			(gca_options.bool("messages", "show_sidebar") &&
				this.sidebar.inject(this));

			// Header links fix
			(gca_options.bool("messages", "fix_header_links") &&
				this.fix.headerLinks(this));
			
			// Folder shortcuts
			this.folders.show();

			// Show guild pinned message (LEAVE LAST)
			(gca_options.bool("global","check_guild_pinned_message") &&
				this.guild_message.showPinned());
		}

		// Folders
		else if (gca_section.submod == null) {
			this.folders.detect();
		}

		// Setting Link
		gca_tools.create.settingsLink("messages");
	},


	// Resolve messages
	messages : {

		// Message list
		list : [],
		// Messages by type
		type : {
			// Unknown messages
			"other" : [],

			// Messages
			"personal" : [],
			"guild" : [],

			// News
			"news" : [],
			"guild_battle" : []
		},

		// Resolve
		resolve : function(){
			// If no messages
			if(document.getElementById('content').getElementsByTagName('form').length == 0)
				return;

			// Get messages
			var messages = document.getElementById("content").getElementsByTagName('form')[0].getElementsByClassName("message_box");

			// Parse messages
			var msg;
			for(var i = 0; i < messages.length; i++){
				// Parse message
				msg = this.parseMessage(messages[i]);
				// Insert it in all list
				this.list.push(msg);
				// Insert it in type list
				this.type[msg.type].push(msg);
			}
		},

		// Parse message
		parseMessage : function(element){
			// Message Object
			var message = {
				image : element.getElementsByClassName("message_icon")[0].style.backgroundImage,
				title : element.getElementsByClassName("message_title")[0],
				date : element.getElementsByClassName("message_date")[0],
				body : element.getElementsByClassName("message_text")[0],
				element : element,
				type : "other"
			};

			// Personal message
			if(message.image.match("0b70a488ee312aef4a42ff53c88c62.gif")){ //messages.gif
				message.type = "personal";
			}

			// Guild message
			else if(message.image.match(/\d*-\d*\.png/)){
				message.type = "guild";
			}

			// Guild attack
			else if(element.getElementsByTagName('a').length > 0 && element.getElementsByTagName('a')[0].href.match("guild_warcamp")){
				message.type = "guild_battle";
			}

			// Gladiatus notification
			else if(message.image.match("icon_7.gif")){
				/*
				// New title
				else if(element.getElementsByTagName('a').length > 0 && element.getElementsByTagName('a')[0].href.match("achievements")){
					message.type = "news";
					// Title
					//console.log(element.getElementsByTagName('a')[0].textContent);
					// HTML content
					//<a href="index.php?mod=overview&amp;submod=achievements&amp;sh=<hash>"><span style="font-weight: bold;">Pluto`s Death Bringer</span></a>
				}

				// Auction item won
				// The announcement has the same title and body
				else if(message.title.textContent == message.body.textContent){
					message.type = "news";
				}

				// Auction item lost
				// The body has 2x "
				else if(message.body.textContent.split('"').length - 1 == 2){
					message.type = "news";
				}
				*/
				
				// Other
				message.type = "news";
			}

			return message;
		},

		// Get date from message
		parseDate : function(message){
			var date = message.date.textContent.match(/(\d+)\.(\d+)\.(\d+)/i);
			var time = message.date.textContent.match(/(\d+):(\d+):(\d+)/i);
			return {
				day : date[0],
				month : date[1],
				year : date[2],

				hour : time[0],
				minites : time[1],
				seconds : time[2]
			};
		}

	},


	// Layout
	layout : {

		// Improve interface
		improve : function(self){
			// List
			var messages = self.messages.list;
			// For each message
			for(var i = 0; i < messages.length; i++){
				// Apply interface
				this.apply(messages[i]);
			}
		},

		// Apply on message
		apply : function(message){
			// Find type
			switch(message.type){
				// Messages
				case "personal":
					this.template.personal(message);
					break;
				case "guild":
					this.template.guild(message);
					break;

				// News
				case "news":
					this.template.news(message);
					break;
				case "guild_battle":
					this.template.guild_battle(message);
					break;

				// Unknown messages
				case "other":
					break;
			}
		},

		// Per Type edit
		template : {

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
			
			// Guild message
			guild : function(message){
				
			},

			// General News
			news : function(message){
				// News message
				message.element.className += " gca_messages_other_news";
			},

			// Guild Battle report
			guild_battle : function(message){
				// Guild Report message
				message.element.className += " gca_messages_guild_report";

				// Change icon
				var icon = message.element.getElementsByClassName("message_icon")[0];
				icon.style.backgroundImage = icon.style.backgroundImage.replace("icon_7.gif", "icon_4.gif");
			}
		}

	},


	// Unread messages
	unread : {

		// Last read
		last : 0,

		// Show unread messages
		show : function(self){
			// Load last message
			this.last = gca_data.section.get("messages", 'last_read_message', 0);

			// List
			var messages = self.messages.list;

			// If messages
			if(messages.length > 0){
				// Get the id of the first message
				let first_id = this.getId(messages[0]);
				// If new message save it's id
				if(first_id > this.last)
					gca_data.section.set("messages", 'last_read_message', first_id);
			}

			// For each message
			for(var i = 0; i < messages.length; i++){
				// Check if unread
				this.checkMessage(messages[i]);
			}
		},

		// Check message
		checkMessage : function(message){
			// If unread message
			if(this.getId(message) > this.last)
				// Highlight unread message
				message.element.className += " gca_messages_unread_message";
		},

		// Get message id
		getId : function(message){
			// Return message id
			return (message.element.getElementsByClassName("message_box_icon")[0].getElementsByTagName("input")[0].value * 1);
		}

	},


	// Guild message functions
	guild_message : {

		// Guild mates
		mates : {},

		// Refresh Guild mates once
		refreshed : false,

		// Load
		more_info : function(self){
			// If no guild
			if(!gca_data.section.get("guild", "inGuild", false))
				return;

			// List
			var messages = self.messages.type.guild;

			// If no messages
			if(messages.length == 0)
				return;

			// Load guild mates
			var mates = gca_data.section.get("guild", "mates", []);
			for(let i = mates.length - 1; i >= 0; i--){
				this.mates[mates[i].id] = mates[i];
			}

			// For each message
			for(let i = 0; i < messages.length; i++){
				// Load battle
				this.load_info(messages[i]);
			}
		},

		// Load info
		load_info : function(message){
			// Get player id
			var id = message.title.getElementsByTagName('a')[0].href.match(/&p=(\d+)/i)[1];
			// Get player info
			var mate = this.mates[id];

			// If player in list
			if (mate) {
				// Insert more info
				var info = document.createElement("span");
				info.textContent = "[ lv" + mate.level + " - " + mate.rank + " ]";
				message.title.appendChild(info);
			}
			// If guild member was not found, we should refresh our list
			else {
				this.update_guild_info();
			}
		},

		// Update guild info
		update_guild_info : function() {
			if (typeof gca_global !== 'object') {
				setTimeout(() => function() {
					this.update_guild_info();
				}, 100);
				return;
			}
			if (this.guild_info_updated) return;
			this.guild_info_updated = true;
			// Set refresh time null
			gca_data.section.set("timers", "guild_info_update", 0);
			// Refresh guild info (for next time)
			gca_global.update_guild_info();
		},


		// Display links
		display_links : function(self){
			// List
			var messages = self.messages.type.guild;
			// For each message
			for(var i = 0; i < messages.length; i++){
				// Load battle
				this.parse_links(messages[i]);
			}
		},

		// Parse links
		parse_links : function(message){
			// Match links
			var links = message.body.textContent.match(/(http|https):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/g);

			// If no links found return
			if(!links)
				return;

			// Create links box
			var wrapper = document.createElement("div");
			wrapper.className = "message_text gca_message_links";

			// Create links
			var a;
			for(var i = 0; i < links.length; i++){
				a = document.createElement("a");
				a.href = links[i];
				a.setAttribute("target", "_blank");
				a.setAttribute("rel", "noopener noreferrer");
				a.textContent = links[i];
				wrapper.appendChild(a);
				wrapper.appendChild(document.createElement("br"));
			}

			// Add box on message
			if(message.body.className=="message_pinned_title") // if pinned message
				message.body.parentNode.parentNode.parentNode.appendChild(wrapper);
			else // normal message
				message.body.parentNode.appendChild(wrapper);
		},

		showPinned : function(){
			// Get pinned message
			let message = gca_data.section.get('cache', 'guild_pinned_message', null);
			if(message==null) return;

			// Show pinned guild message only if other guild messages are shown (avoid showing the message in folder unrelated to guild)
			if(gca_messages.messages.type["guild"].length==0)
				return;
			
			message = gca_tools.strings.decodeHTMLEntities(message);// Decode message
			let sender = gca_data.section.get('cache', 'guild_pinned_message_sender', null);

			// Display pinned message
			let pinned_message_container = document.createElement("div");
			pinned_message_container.className = "message_box gca_messages_pinned_message";

			let subject_box = document.createElement("div");
			subject_box.className = "messageSubject";
			pinned_message_container.appendChild(subject_box);

			let message_box_icon = document.createElement("div");
			message_box_icon.className = "message_box_icon";
			subject_box.appendChild(message_box_icon);

			let message_icon = document.createElement("div");
			message_icon.className = "message_icon";
			//message_icon.textContent = "📌";
			message_icon.style = 'background-image:url(/cdn/img/news/icon_7.gif);';
			message_box_icon.appendChild(message_icon);

			let message_box_title = document.createElement("div");
			message_box_title.className = "message_box_title";
			subject_box.appendChild(message_box_title);

			let message_title = document.createElement("div");
			message_title.className = "message_pinned_title";
			message_box_title.appendChild(message_title);

			let name = document.createElement("b");
			name.textContent = sender;
			message_title.appendChild(name);

			message_title.appendChild(document.createTextNode(`: ${message}`));

			let first_message = document.getElementsByClassName('message_box')[0];
			first_message.parentNode.insertBefore(pinned_message_container, first_message);

			// Add tooltip
			let tooltip = [[[gca_locale.get('guild', 'pinned_message'), 'white']]];
			gca_tools.setTooltip(pinned_message_container, JSON.stringify(tooltip));

			// Check for links
			if(gca_options.bool("messages", "show_message_links"))
				gca_messages.guild_message.parse_links({body:message_title});
		}
	},

	// Private message functions
	private_message : {

		// Guild mates
		mates : {},

		// Load
		more_info : function(self){
			// If no guild
			if(!gca_data.section.get("guild", "inGuild", false))
				return;

			// List
			var messages = self.messages.type.personal;

			// If no messages
			if(messages.length == 0)
				return;

			// Load guild mates
			var mates = gca_data.section.get("guild", "mates", []);
			for(let i = mates.length - 1; i >= 0; i--){
				this.mates[mates[i].id] = mates[i];
			}

			// For each message
			for(let i = 0; i < messages.length; i++){
				// Load battle
				this.load_info(messages[i]);
			}
		},

		// Load info
		load_info : function(message){
			// Get player id
			var id = message.title.getElementsByTagName('a')[0].href.match(/&p=(\d+)/i)[1];
			// Get player info
			var mate = this.mates[id];

			// If player in list
			if (mate) {
				// Insert more info
				var info = document.createElement("span");
				info.textContent = "[ lv" + mate.level + " - " + mate.rank + " ]";
				message.title.appendChild(info);
			}
		}
	},


	// Guild battle functions
	guild_battle : {

		// Load
		more_info : function(self){
			// List
			var messages = self.messages.type.guild_battle;
			// For each message
			for(var i = 0; i < messages.length; i++){
				// Load battle
				this.load_battle(messages[i], i);
			}
		},

		// Load more
		load_battle : function(message, index){
			// Guild Report message
			if(!message.element.className.match("gca_messages_guild_report"))
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
			
			// Show data
			var showBattleResults = function (winner, guilds, battleInfo, results) {
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
					return true;
				}
				else {
					loading.style.backgroundImage = "none";
					loading.appendChild(document.createTextNode(gca_locale.get("error")));
					return false;
				}
			};

			// Get id
			var message_id = message.element.id;
			// If message is cached load it
			if (message_id === gca_data.section.get("cache", 'last_guild_battle_id', "no-id")) {
				let data = gca_data.section.get("cache", 'last_guild_battle_data', false);
				if (data !== false) {
					showBattleResults(data.winner, data.guilds, data.battleInfo, data.results);
					return;
				}
			}

			// Load battle info
			jQuery.get(link.href, function(data){
				// Get Winner
				var winner = data.match(/<div\s*id="reportHeader"\s*class="([^"]+)">([^<]+)<\/div>/i);
				// Get Guilds
				var guilds = data.match(/<span\s*class="guildname">([^<]+)<\/span>\s*<\/div>\s*<img\s*alt="[^"]+"\s*src="[^"]+"\s*border="0"\s*\/>/gm);
				// Get description
				var battleInfo = data.match(/<div\s+class="section-header">\s*([^<]+)<img\s+src="([^"]+)"\s+alt="([^"]+)"\s+title="([^"]+)"[^>]+>[^<]*(<a\s+alt="[^"]+"\s+title="[^"]+"\s+href="index\.php\?mod=guild_warcamp&submod=guild_combat&gid=\d+&sh=[^"]+"[^>]*>\s*<img[^>]+>\s*<\/a>|)\s*<br[^>]*>\s*<\/div>/im);
				// Results
				var results = data.match(/<th[^>]*>(\d+)<\/th>\s*<th[^>]*><a\s+href="index\.php\?mod=guild&i=(\d+)&sh=[^"]+"\s+target="_self">([^<]+)<\/a><\/th>\s*<th[^>]*><\/th>\s*<th[^>]*><\/th>\s*<th[^>]*><a\s+href="index\.php\?mod=guild&i=(\d+)&sh=[^"]+"\s+target="_self">([^<]+)<\/a><\/th>\s*<th[^>]*>(\d+)<\/th>/im);

				// Show data
				var valid = showBattleResults(winner, guilds, battleInfo, results);
				// If not valid or not the first battle, exit
				if (!valid || index !== 0) return;

				// Save data
				winner = [0, winner[1], winner[2]];
				guilds = [guilds[0], guilds[1]];
				battleInfo = (!battleInfo) ? null : [0, battleInfo[1], battleInfo[2], battleInfo[3], battleInfo[4]];
				results = [0, results[1], results[2], results[3], results[4], results[5], results[6]];

				gca_data.section.set("cache", 'last_guild_battle_id', message_id);
				gca_data.section.set("cache", 'last_guild_battle_data', {
					winner : winner,
					guilds : guilds,
					battleInfo : battleInfo,
					results : results,
				});
			});
		}

	},


	// Sidebar
	sidebar : {
		
		// Sidebar element
		element : null,

		// Inject
		inject : function(self){
			// Create sidebar
			this.element = document.createElement("div");
			this.element.className = "gca_messages_sidebar";
			// Insert on page
			var content = document.getElementById("content");
			content.insertBefore(this.element, content.firstChild);

			// Create Icons
			this.createIcons(self.messages);
		},

		// Create Icons
		createIcons : function(messages){
			// Personal
			if(messages.type.personal.length){
				let icon = this.addIcon({
					backgroundImage : "url(" + gca_tools.img.cdn('img/interface_ar/messages.gif') + ")"
				}, messages.type.personal.length, this.handleClick);
				icon.cur = -1;
				icon.list = messages.type.personal;
			}

			// Guild
			if(messages.type.guild.length){
				let img = messages.type.guild[0].element.getElementsByClassName("message_icon")[0].style.backgroundImage;
				let icon = this.addIcon({
					backgroundImage : img,
					backgroundSize : "100% 111%"
				}, messages.type.guild.length, this.handleClick);
				icon.cur = -1;
				icon.list = messages.type.guild;
			}

			// News
			if(messages.type.news.length){
				let icon = this.addIcon({
					backgroundImage : "url(" + gca_tools.img.cdn('img/news/icon_7.gif') + ")"
				}, messages.type.news.length, this.handleClick);
				icon.cur = -1;
				icon.list = messages.type.news;
			}

			// Guild Battle
			if(messages.type.guild_battle.length){
				let icon = this.addIcon({
					backgroundImage : "url(" + gca_tools.img.cdn('img/news/icon_4.gif') + ")"
				}, messages.type.guild_battle.length, this.handleClick);
				icon.cur = -1;
				icon.list = messages.type.guild_battle;
			}
		},

		// Handle click
		handleClick : function(obj){
			// Next message
			obj.cur ++;
			// If end go to start
			if(obj.list.length <= obj.cur)
				obj.cur = 0;
			// Scroll to message
			jQuery('html, body').animate({
				scrollTop: jQuery(obj.list[obj.cur].element).offset().top - 30
			}, 200);
		},

		// Add icon
		addIcon : function(icon, text, callback){
			// Icon Wrapper
			var wrapper = document.createElement("div");
			wrapper.className = "gca_messages_sidebar_icon_wrapper";
			// Text
			var text_element = document.createElement("div");
			text_element.className = "gca_messages_sidebar_text";
			text_element.textContent = text;
			// Icon
			var icon_element = document.createElement("div");
			icon_element.className = "gca_messages_sidebar_icon";
			for(let css in icon){
				if (icon.hasOwnProperty(css))
					icon_element.style[css] = icon[css];
			}

			// Object
			var object = {
				element : wrapper,
				content : text_element,
				icon : icon_element
			};

			// If callback
			if(callback){
				// Add cursor pointer
				icon_element.style.cursor = "pointer";
				// If function
				if(typeof(callback) == "function"){
					icon_element.addEventListener('click',function(){
						callback(object);
					}, false);
				}
			}

			// Insert on page
			wrapper.appendChild(text_element);
			wrapper.appendChild(icon_element);
			this.element.appendChild(wrapper);

			// Return icon
			return object;
		}

	},


	// Pagination
	pagination : function(){
		// Get pagings
		var pagings = document.getElementsByClassName("paging");
		// Parse each
		for(var i = pagings.length - 1; i >= 0; i--){
			gca_tools.pagination.parse(pagings[i]);
		}
	},


	// Separator
	separator : {
		
		// Separate days
		days : function(self){
			// List
			var messages = self.messages.list;
			// If messages
			if(messages.length > 1){
				// Get previous date
				var prev_date = self.messages.parseDate(messages[0]).day;
				// Next date variable
				var next_date;

				// For each message
				for(var i = 1; i < messages.length; i++){
					// Get date
					next_date = self.messages.parseDate(messages[i]).day;
					// If new date
					if(next_date != prev_date){
						// Add separator
						this.add(messages[i], next_date);
						// Set new date
						prev_date = next_date;
					}
				}
			}
		},

		// Add a separator
		add : function(message, title){
			// Create
			var separator = document.createElement("div");
			separator.className = "message_box gca_messages_separator";
			// Set title
			separator.textContent = title;
			// Add on page
			message.element.parentNode.insertBefore(separator, message.element);
			// Return element
			return separator;
		}

	},


	// Fixes functions
	fix : {

		// Fix messages header links
		headerLinks : function(self){
			// List
			var messages = self.messages.list;

			var links;
			// For each message
			for(var i = 0; i < messages.length; i++){
				links = messages[i].title.getElementsByTagName('a');
				// If header link
				if(links.length){
					// Fix header link
					this.headerLink(links);
				}
			}
		},

		// Fix message header links
		headerLink : function(links){
			// Fix link click close message
			for (var i = links.length - 1; i >= 0; i--) {
				links[i].addEventListener('click', function(e){
					e.stopPropagation();
				}, true);
			}
		}

	},

	// Folders
	folders : {
		detect : function() {
			console.log(123);
			let list = jQuery('#content table .tdn a');
			if (!list[0]) return;

			let folders = {};
			for (let i = 0; i < list.length; i++) {
				if (list[i].href) {
					let id = list[i].href.match(/index\.php\?mod=messages&submod=messageShow&folder=(\d+)&sh=[^"]*/i);
					let name = list[i].textContent;
					if (id && name) {
						folders[parseInt(id[1], 10)] = gca_tools.strings.trim(name);
					}
				}
			}

			// Save folders
			gca_data.section.set("cache", "message_folders", folders);
		},

		show : function() {
			// Get folders
			let folders = gca_data.section.get("cache", "message_folders", null);
			if (!folders) return;

			// Create wrapper
			let wrapper = document.createElement('div');
			wrapper.className = 'gca_messages_sidebar_folders';

			// For each folder create icon link
			let links = [];
			for (let id in folders) {
				if (folders.hasOwnProperty(id)) {
					let a = document.createElement('a');
					a.className = 'gca_messages_sidebar_folder';
					a.href = gca_getPage.link({'mod':'messages','submod':'messageShow','folder':id});
					a.textContent = folders[id].substring(0,2);
					a.dataset.name = folders[id];
					links.push(a);
					wrapper.appendChild(a);
				}
			}

			// Add wrapper in page
			var content = document.getElementById('content');
			content.insertBefore(wrapper, content.firstChild);

			// Add tooltips
			links.forEach((a) => {
				gca_tools.setTooltip(a, [[[a.dataset.name, '#ffffff']]]);
			});
		}
	}

};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_messages.inject();
	};
	gca_messages.preinject();
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_data, gca_getPage, gca_global, gca_locale, gca_options, gca_section, gca_tools */
/* global jQuery */
