/*
 * Addon Global Section Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_section_global = {
	inject : function(){
		
		//gca_welcome.newVersion.run();
		//gca_dataUpdater.newVersion();
		//gca_dataUpdater.gca_highscore_update();
		//gca_dataUpdater.gca_info_collector_post();
		
		//Check if traveling
		traveling=false;
		if( !$dark('#submenu1') ){
			traveling=true;
			this.traveling();
		}
		
		//Display gca version on footer
		this.display.version();
		//Set page direction (Arabic support)
		this.display.pageDirection.set();
		
		//Extended info on Health and Experience bars
		(gca_options.isOn("ENABLE_GLOBAL_EXTENDED_HP_XP_INFO") && 
			this.display.extended_hp_xp_info());
		
		//Buttons' main bar built
		(gca_options.isOn("ENABLE_GLOBAL_BUTTON_BAR") &&
			this.display.button_bar.make());

		//Display auction status
		(!traveling &&
			this.display.auction_status_bar());
		
		//Show premium days
		this.display.show_premium_days();

		//Integrate top fixed bar
		(gca_options.isOn("ENABLE_GLOBAL_TOP_FIXED_BAR") && 
			this.display.top_fixed_bar.boot());

		//More advance main menu
		(gca_options.isOn("ENABLE_GLOBAL_ADVANCED_MAIN_MENU") && 
			this.display.advanced_main_menu());

		//Quests Timer
		(gca_options.isOn("ENABLE_GLOBAL_QUESTS_TIMER") && gca_section.mod!='quests' && !traveling &&
			this.display.quests_timer());
		
		//Attacked Timers
		(gca_options.isOn("ENABLE_GLOBAL_ATTACKED_TIMERS") && gca_section.mod!='reports' && 
			this.display.attacked_timers());
		
		//Display the time for new merchants goods
		(gca_options.isOn("ENABLE_GLOBAL_MERCHANTS_TIME") && !traveling &&
			this.display.merchants_time());
		
		//Remember merchants' and inventory tabs
		(gca_options.isOn("ENABLE_GLOBAL_REMEMBER_TABS") && 
			this.rememberTabs());
		
		// Expired packages notification
		//(gca_options.isOn("ENABLE_PACKAGES_EXPIRED_PACKAGES") && !traveling && gca_section.mod!='packages' && 
		//	this.display.expiredPackages());
		
		// Guild application alert
		(gca_options.isOn("ENABLE_GUILD_APPLICATION_ALERT") && !traveling && 
			this.display.guild_application_alert());
		
		// Display Centurion days
		(gca_options.isOn("ENABLE_GLOBAL_DISPLAY_CENTURIO_DAYS") && 
			this.display.centurio_days());
			
		//Event bar move
		( (gca_options.isOn("ENABLE_GLOBAL_BUTTON_BAR") || gca_options.isOn("ENABLE_GLOBAL_AUCTION_STATUS_BAR") || gca_options.isOn("ENABLE_GLOBAL_EXTENDED_HP_XP_INFO")) &&
			this.display.eventBarMove());
			
		//Sounds
		(gca_options.isOn("ENABLE_GLOBAL_SOUND_NOTIFICATIONS") && this.soundManager());
	},
	traveling : function(){
		// Block Useless items
		$dark('#menue_news').delAttr('href').addClass('menue_news_disable');
		$dark('#menue_packages').delAttr('href').addClass('menue_packages_disable');
		$dark('#menue_reports').setAttr('disabled-link', $dark('#menue_reports').getAttr('href') );
		$dark('#menue_reports').delAttr('href').addClass('menue_reports_disable');
		$dark('#mainmenu a[1]').remove();
		$dark('#mainmenu a[3]').remove();
		$dark('#cooldown_bar_expedition a[0]').delAttr('href').css('cursor:default;');
		$dark('#cooldown_bar_dungeon a[0]').delAttr('href').css('cursor:default;');
		$dark('#cooldown_bar_arena a[0]').delAttr('href').css('cursor:default;');
		$dark('#cooldown_bar_ct a[0]').delAttr('href').css('cursor:default;');
		
		gca_section_work.work_finish_time();
	},
	display : {
		
		//Display gca version on footer
		version : function(){
			// Display the GCA version on the bottom of the page
			$dark('html[0]').addClass(gca.shortName+"_v"+gca.version);
			//If not element is missing
			if( $dark('#footer_inner .footer_links[0]') ){
				$dark('#footer_inner .footer_links[0]').addHtml(' | <a href="'+gca.homepage+'" target="_blank">'+gca.shortName+' v'+gca.version+'</a>');
				//var img="*script";
				//$dark('#footer_inner .footer_links[0]').addChild($dark(img).src('http://gladiatus.darkthanos.net/icon.gif').type('text/javascript'));
			}
		},
		
		//Set page direction (arabic support)
		pageDirection : {
			set : function(){
				/* Check page direction ltr or rtl */
				if(!$dark('link[1]').href().match("rtl_") && !$dark('link[2]').href().match("rtl_")){
					window.gca_rtl=false;
					return;
				}
				//If right to left
				window.gca_rtl=true;
				$dark('html[0]').addClass("gca_rtl");
			},
		},

		//Event bar move
		eventBarMove : function(){
			if( $dark('#banner_top') && $dark('#banner_event') && ( $dark('#banner_top').element.style.display=='' || $dark('#banner_top').element.style.display=='block') ){
				$dark('#mainnav').addClass('eventBarMove_mainnav');
				$dark('#content').addClass('eventBarMove_content');
				if( $dark('#gca_setings_content') )
					$dark('#gca_setings_content').addClass('eventBarMove_content');
				$dark('#banner_top').addClass('eventBarMove_banner_top');
				$dark('#banner_event').addClass('eventBarMove_banner_event');
				if( $dark('#cooldown_bar_event') )
					$dark('#cooldown_bar_event').addClass('eventBarMove_cooldown_bar_event');
				$dark('*script').html("if(typeof changeShow=='function' && typeof aElts != 'undefined'){changeShow();\ntt_Init(true);\ndd.recalc();}").appendTo('body');
			}
		},

		//Extended info on Health and Experience bars
		extended_hp_xp_info : function(){
			/* Extend HP bar and XP bar, more info*/
			$dark('#header_values_hp').addClass("header_values_hp_extend");
			$dark('#header_values_xp').addClass("header_values_xp_extend");

			var hp = $dark('#header_values_hp_bar').attr('data-tooltip').match(/(\d+ \\\/ \d+)/i)[1].match(/\d+/g);
			var xp = $dark('#header_values_xp_bar').attr('data-tooltip').match(/(\d+ \\\/ \d+)/i)[1].match(/\d+/g);
			
			$dark('*div').id("header_values_hp_xp_background").appendTo('#header_game');
			$dark('*div').id("header_values_hp_points").html('<span>'+hp[0]+'</span> / '+hp[1]).appendTo('#header_values_hp');
			$dark('*div').id("header_values_xp_points").html('<span>'+xp[0]+'</span> / '+xp[1]).appendTo('#header_values_xp');
			
			$dark('*div').id("header_life_pot").setAttr("onclick","document.location.href='index.php?mod=premium&submod=inventoryActivate&feature=18&sh="+getPage.parameter('sh')+"#content';").html(' ').appendTo('#header_values_hp');
		},
		button_bar : {
			make : function(){
				/* Make a button bar with icon-links */
				var buttonBar = $dark('*div').id("gca_button_bar");

				//No Guild
				if(!gca_data.get('guild', {inGuild:true} ).inGuild){
					/* Sent Private message button */
					$dark('*div').class('icon-out').addChild([
						$dark('*a').class('icon message-icon').href( getPage.link({"mod":"messages","submod":"messageNew"}) ).title( gca_locale.get("write_private_message") )
					]).appendTo(buttonBar);

				//In Guild
				}else{
					/* Sent guild message button */
					var instant_message_textarea = $dark('*textarea');
					var instant_message_div = $dark('*div').class('instant_message_div instant').css('display:none;').addChild(
						$dark('*div').class('hover_box').addChild([
							$dark('*i').html( gca_locale.get("write_guild_message")+":" ),
							$dark('*br'),
							instant_message_textarea,
							$dark('*br'),
							$dark('*input').type('button').class('button1').id('qgm_button').value( gca_locale.get("send") ).click(function(){
								var exclude_me=($dark('#qgm_exclude_me').element.checked)?true:false;
								gca_section_guild.sent_guild_mail(instant_message_textarea.element.value,exclude_me,'qgm_button');
							}),
							$dark('*input').type('checkbox').id('qgm_exclude_me'),
							$dark('*label').attr('for','qgm_exclude_me').id('qgm_exclude_me').html(gca_locale.get('exclude_me'))
						])
					);

					$dark('*div').class('icon-out').addChild([
						$dark('*a').class('icon message-icon').href( getPage.link({"mod":"guild","submod":"adminMail"}) ),//.title( gca_locale.get("write_guild_message") )
						instant_message_div
					]).mouseover(function(){
						instant_message_div.fadeIn('fast');
					}).mouseout(function(){
						instant_message_div.fadeOut('fast');
					}).appendTo(buttonBar);
				
					if( $dark('#submenu1') ){//Traveling Test
						/* Link to guild's medical center */
						$dark('*div').class('icon-out').addChild(
							$dark('*a').class('icon cross-icon').title( gca_locale.get("go_to_guilds_medic_center") ).href( getPage.link({"mod":"guild_medic"}) )
						).appendTo(buttonBar);
						
						/* Link to guild's market */
						$dark('*div').class('icon-out').addChild(
							$dark('*a').class('icon market-icon').title( gca_locale.get("go_to_guilds_market") ).href( getPage.link({"mod":"guildMarket"}) )
						).appendTo(buttonBar);
						
						/* Link to guild's storage */
						$dark('*div').class('icon-out').addChild(
							$dark('*a').class('icon box-icon').title( gca_locale.get("go_to_guilds_storage") ).href( getPage.link({"mod":"guildStorage"}) )
						).appendTo(buttonBar);
						
						/* Link to guild's bank */
						var instant_donate_gold = $dark('*div').class('instant_message_div instant').css('display:none;').addChild(
							$dark('*div').class('hover_box').addChild(
								$dark('*input').type('button').id('donate_all_button').class('button1').value( gca_locale.get("donate_all_your_gold") ).click(function(){
									gca_section_global.display.button_bar.donate_gold.check();
								})
							)
						);
						$dark('*div').class('icon-out').addChild([
							$dark('*a').class('icon gold-icon').href( getPage.link({"mod":"guildBankingHouse"}) ),//.title( gca_locale.get("go_to_guilds_bank") )
							instant_donate_gold
						]).mouseover(function(){
							instant_donate_gold.fadeIn('fast');
						}).mouseout(function(){
							instant_donate_gold.fadeOut('fast');
						}).appendTo(buttonBar);
						
						/* Link to guild's war camp */
						$dark('*div').class('icon-out').addChild(
							$dark('*a').class('icon report-icon').title( gca_locale.get("go_to_guilds_war_camp") ).href( getPage.link({"mod":"guild_warcamp"}) )
						).appendTo(buttonBar);
						
						/* Link to guild's jail */
						$dark('*div').class('icon-out').addChild(
							$dark('*a').class('icon castle-icon').title( gca_locale.get("go_to_guilds_jail") ).href( getPage.link({"mod":"guild_jail"}) )
						).appendTo(buttonBar);
						
						/* Link to guild's library */
						$dark('*div').class('icon-out').addChild(
							$dark('*a').class('icon notebook-icon').title( gca_locale.get("go_to_guilds_library") ).href( getPage.link({"mod":"guildLibrary"}) )
						).appendTo(buttonBar);
					}
				}

				/* Link to the simulator page */
				$dark('*div').class('icon-out').addChild(
					$dark('*a').class('icon swords-icon').title( gca_locale.get("go_to_simulator") ).href( 'http://gladiatussimulator.tk/' ).attr('target','_blank')
				).appendTo(buttonBar);
				
				/* Display your player stats */
				var stats = gca_data.get('playerStats', false);
				var code = gca_locale.get("error");
				if(stats){
					code = "<table class='tooltipBox'>";
					code+= "<tr><td>"+stats.strength.locale+"</td><td>:</td><td class='cssAlign'>"+stats.strength.points+"</td></tr>";
					code+= "<tr><td>"+stats.skill.locale+"</td><td>:</td><td class='cssAlign'>"+stats.skill.points+"</td></tr>";
					code+= "<tr><td>"+stats.agility.locale+"</td><td>:</td><td class='cssAlign'>"+stats.agility.points+"</td></tr>";
					code+= "<tr><td>"+stats.constitution.locale+"</td><td>:</td><td class='cssAlign'>"+stats.constitution.points+"</td></tr>";
					code+= "<tr><td>"+stats.charisma.locale+"</td><td>:</td><td class='cssAlign'>"+stats.charisma.points+"</td></tr>";
					code+= "<tr><td>"+stats.intelligence.locale+"</td><td>:</td><td class='cssAlign'>"+stats.intelligence.points+"</td></tr>";
					code+= "<tr><td>"+stats.armor.locale+"</td><td>:</td><td class='cssAlign'>"+stats.armor.points+"</td></tr>";
					code+= "<tr><td>"+stats.damage.locale+"</td><td>:</td><td class='cssAlign'>"+stats.damage.min+" - "+stats.damage.max+"</td></tr>";
					code+= "</table>";
				}

				var show_stats = $dark('*div').class('instant').css('display:none;').id('showMyStats').html(code);
				$dark('*div').class('icon-out').addChild([
					$dark('*a').class('icon people-icon').title( gca_locale.get("display_my_stats") ),
					show_stats
				]).click(function(){
					if(stats){
						if(show_stats.element.style.display=="inline")
							show_stats.fadeOut();
						else
							show_stats.fadeIn();
					}
				}).appendTo(buttonBar);
				
				/* Display Online Players */
				$dark('*div').class('icon-out').addChild(
					$dark('*a').class('icon online-icon').title( gca_locale.get("display_online_players") )
				).click(function(){
					gca_section_global.display.button_bar.online_friends.open();
				}).appendTo(buttonBar);
				
				buttonBar.appendTo('#header_game');
			},
			
			// Hide/Display Online Friends
			online_friends : {
				// Online Friends Dialog
				dialog : false,

				// Open Dialog
				open : function(){
					if(!this.dialog){
						// Create a dialog
						var dialog = new gca_built.dialog;
						dialog.title.html(gca_locale.get( "online_friends" ));

						var v4Feature = document.createElement('div');
						var v4Feature_new = document.createElement('span');
						v4Feature_new.textContent = "v4.0.0";
						v4Feature_new.style.color = "white";
						v4Feature_new.style.backgroundColor = "red";
						v4Feature_new.style.borderRadius = "8px";
						v4Feature_new.style.padding = "0px 4px";
						v4Feature_new.style.marginRight = "6px";
						v4Feature.appendChild(v4Feature_new);
						v4Feature.appendChild(document.createTextNode("Rescripted feature for the version 4.0.0"));
						v4Feature.style.marginTop = "-32px";
						v4Feature.style.position = "absolute";
						dialog.body.addChild(v4Feature);
						
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
						span.id = "online_friends_guild_counter";
						td.appendChild(span);
						tr.appendChild(td);
						td = document.createElement('td');
						td.setAttribute("width", "50%");
						td.textContent = gca_locale.get( "family_friends" ) + " ";
						span = document.createElement('span');
						span.id = "online_friends_family_counter";
						td.appendChild(span);
						tr.appendChild(td);
						table.appendChild(tr);
						dialog.body.addChild(table);

						// Loading
						table = document.createElement('table');
						table.className = "online_friends_table";
						tr = document.createElement('tr');
						td = document.createElement('td');
						td.setAttribute("width", "50%");
						div = document.createElement('div');
						div.id = "online_guild_friends";
						div.style.textAlign = "left";
						td.appendChild(div);
						tr.appendChild(td);
						td = document.createElement('td');
						td.setAttribute("width", "50%");
						div = document.createElement('div');
						div.id = "online_family_friends";
						div.style.textAlign = "left";
						td.appendChild(div);
						tr.appendChild(td);
						table.appendChild(tr);
						dialog.body.addChild(table);

						// Add some space
						div = document.createElement('div');
						div.className = "space";
						dialog.body.addChild(div);

						// Save dialog variable
						this.dialog = dialog;

						// Add refresh Button
						var button = document.createElement('a');
						button.className = "gca-icon refresh-icon";
						button.style.marginRight = "10px";
						dialog.body.addChild(button);

						button.addEventListener('click', function(){
							gca_global.display.shortcuts_bar.online_friends.refresh();
						}, false);

						// Add close Button
						var button = document.createElement('input');
						button.className = "button3";
						button.type = "button";
						button.value = gca_locale.get("close");
						dialog.body.addChild(button);

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
					if(!this.dialog || !document.getElementById('online_guild_friends') || !document.getElementById('online_family_friends'))
						return;

					// Clear Lists
					document.getElementById('online_guild_friends').textContent = "";
					document.getElementById('online_family_friends').textContent = "";
					document.getElementById("online_friends_guild_counter").textContent = "";
					document.getElementById("online_friends_family_counter").textContent = "";
					// Display loading
					document.getElementById('online_guild_friends').className = "online_friends_loading_img loading";
					document.getElementById('online_family_friends').className = "online_friends_loading_img loading";

					// Get online guild memebers
					xmlHttpRequest({url : getPage.link({"mod":"guild","submod":"memberList","order":"o"}), method : "GET", onload : function(content){
						// Match All active players
						var online_players = content.match(/<tr>\s*<td>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+">([^<]+)<\/a>\s*<\/td>\s*<td>([^<]+)<\/td>\s*<td>(\d+)<\/td>\s*<td align="right">\s*[^<]*(<span[^>]*>[^<]*<\/span>|)\s*<\/td>\s*<td align="right"><span style="color: (green|#406000|#804000);[^"]*" title="on">([^<]*)</mg);
						
						// Check if you are in a guild
						if(online_players && content.match(/<form\s+action="index.php\?mod=guild&submod=create&sh=/i)){
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
								player_info.name = player_info.name.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"");
								player_info.rank = player_info.rank.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"");
								// Update guild players
								guild_players.push(player_info);
							}
						}

						// If no players found
						if(!online_players){
							online_players = [];
						}
						

						// List with parsed players info
						var player_list = [];
						var playerId = 0;
						// Resolve Player Id from cookies
						var cookiePlayerId = document.cookie.match(new RegExp("Gladiatus_" + gca_section.country + "_" + gca_section.server + "=(\\d+)","i"));
						// If cookie exist
						if(cookiePlayerId && cookiePlayerId[1]){
							playerId = cookiePlayerId[1];
						}
						
						// For each player
						for (let i = 0; i < online_players.length; i++){
							// Match player's info
							let player = online_players[i].match(/<tr>\s*<td>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+">([^<]+)<\/a>\s*<\/td>\s*<td>([^<]+)<\/td>\s*<td>(\d+)<\/td>\s*<td align="right">\s*[^<]*(<span[^>]*>[^<]*<\/span>|)\s*<\/td>\s*<td align="right"><span style="color: (green|#406000|#804000);[^"]*" title="on">([^<]*)</mi);
							let player_info = {
								id : player[1],
								name : player[2],
								rank : player[3],
								level : player[4],
								color : player[6],
								time : player[7]
							};
							player_info.name = player_info.name.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"");
							player_info.rank = player_info.rank.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"");

							// If not This player, add him to the list
							if(player_info.id != playerId)
								player_list.push(player_info);
						}

						var parent = document.getElementById('online_guild_friends');
						var countElement = document.getElementById("online_friends_guild_counter");
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
								let sentMsg = document.createElement('a');
								sentMsg.className = "private-message-icon";
								sentMsg.href = getPage.link({"mod":"messages","submod":"messageNew","profileName":player_list[i].name});
								sentMsg.textContent = "✉";
								sentMsg.style.color = "black";
								sentMsg.style.marginRight = "3px";
								parent.appendChild(sentMsg);
								let bull = document.createElement('font');
								bull.setAttribute("color", player_list[i].color);
								bull.textContent = "\u2022";
								parent.appendChild(bull);
								parent.appendChild( document.createTextNode(' ') );
								let name = document.createElement('a');
								name.href = getPage.link({"mod":"player","p":player_list[i].id});
								name.style.color = "black";
								name.style.fontFamily = "century gothic";
								name.dataset.tooltip = '[[["Test","white"]]]';
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
					}});
					
					// Get online family memebers
					xmlHttpRequest({url : getPage.link({"mod":"overview","submod":"buddylist"}), method : "GET", onload : function(content){
						// Match All active players
						var online_players = content.match(/<tr>\s*<td[^>]*>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+"[^>]*>([^<]+)<\/a>\s*<\/td>\s*<td><a href="index\.php\?mod=guild&i=(\d+)&sh=[^"]+"[^>]*>\s*\[([^\]]+)\]\s*<\/a><\/td>\s*<td>(\d+)<\/td>\s*<td><span style="color: (green|#406000|#804000);[^"]*" title="on">([^<]*)</mg);
						if(!online_players) online_players = [];
						// List with parsed players info
						var player_list = [];
						// For each player
						for (let i = 0; i < online_players.length; i++){
							// Match player's info
							let player = online_players[i].match(/<tr>\s*<td[^>]*>\s*<a href="index\.php\?mod=player&p=(\d+)&sh=[^"]+"[^>]*>([^<]+)<\/a>\s*<\/td>\s*<td><a href="index\.php\?mod=guild&i=(\d+)&sh=[^"]+"[^>]*>\s*\[([^\]]+)\]\s*<\/a><\/td>\s*<td>(\d+)<\/td>\s*<td><span style="color: (green|#406000|#804000);[^"]*" title="on">([^<]*)</mi);
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
							player_info.name = player_info.name.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"");
							player_info.guild.name = player_info.guild.name.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"");

							player_list.push(player_info);
						}

						var parent = document.getElementById('online_family_friends');
						var countElement = document.getElementById("online_friends_family_counter");
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
								let sentMsg = document.createElement('a');
								sentMsg.className = "private-message-icon";
								sentMsg.href = getPage.link({"mod":"messages","submod":"messageNew","profileName":player_list[i].name});
								sentMsg.textContent = "✉";
								sentMsg.style.color = "black";
								sentMsg.style.marginRight = "3px";
								parent.appendChild(sentMsg);
								let bull = document.createElement('font');
								bull.setAttribute("color", player_list[i].color);
								bull.textContent = "\u2022";
								parent.appendChild(bull);
								parent.appendChild( document.createTextNode(' ') );
								let name = document.createElement('a');
								name.href = getPage.link({"mod":"player","p":player_list[i].id});
								name.style.color = "black";
								name.style.fontFamily = "century gothic";
								name.dataset.tooltip = '[[["Test","white"]]]';
								name.textContent = player_list[i].name;
								name.title = player_list[i].time;
								parent.appendChild(name);
								parent.appendChild( document.createTextNode(' ') );
								let info = document.createElement('span');
								info.style.fontSize = "0.8em";
								info.style.color = "#525252";
								info.appendChild( document.createTextNode("[lv" + player_list[i].level + " - ") );
								let guild = document.createElement('a');
								guild.href = getPage.link({"mod":"guild","submod":"forumGladiatorius","i":player_list[i].guild.id});
								guild.style.color = "#525252";
								guild.textContent = player_list[i].guild.name;
								info.appendChild(guild);
								info.appendChild( document.createTextNode("]") );
								parent.appendChild(info);
								parent.appendChild( document.createElement('br') );
							}
							countElement.textContent = "(" + player_list.length + ")";
						}
					}});
				}
			},
			// Donate All button
			donate_gold : {

				// Create confirm modal
				check : function(){
					// Get gold with dots
					var gold_txt = document.getElementById('sstat_gold_val').textContent.replace(/ /g,'');
					// Parse gold in number
					var gold = parseInt(gold_txt.replace(/\./g,''));
					
					// If no gold or parse failed
					if(gold == 0 || isNaN(gold)){
						// Show warning
						gca_notifications.warning( gca_locale.get("no_gold") );
						return;
					}

					var that = this;
					// Create confirm modal
					var modal = new gca_built.Modal(
						gca_locale.get("donate_all_your_gold"),
						null,
						function(){
							that.donate(gold);
							modal.destroy();
						},
						function(){
							modal.destroy();
						}
					);
					modal.body(("Are you sure you want to donate <number> gold?").replace(/<number>/g, gold_txt));
					modal.button("Yes", true);
					modal.button("Cancel", false);
					modal.show();
				},

				// Donate gold
				donate : function(gold){
					if(gold == 0)
						gca_notifications.warning( gca_locale.get("no_gold") );

					$dark('#sstat_gold_val').html('<div class="loading" style="margin-top:6px;opacity:0.8;"/></div>');				
					//Post to the server
					xmlHttpRequest({
						url: getPage.link({"mod":"guildBankingHouse","submod":"donate"}),
						method: "POST",
						data : 'donation='+gold+'&doDonation=Donate All',
						onload: function(content){
							//document.getElementById('donate_all_button').value=gca_locale.get( "done" );
							gca_notifications.success( gca_locale.get("gold_donated") );
							document.getElementById('sstat_gold_val').innerHTML=0;
						},
						onerror: function(xml){
							$dark('#sstat_gold_val').html( subFuncts.strings.insertDots(myGold) );
							gca_notifications.error( gca_locale.get("gold_donation_failed") );
						}
					});
				}

			}
		},
		auction_status_bar : function(){
			if(gca_options.isOn("ENABLE_GLOBAL_AUCTION_STATUS_BAR")){
				/* Auction status bar at the top-right corner */
				$dark('*div').id('AuctionStatusDiv').html(
					'<table cellspacing="0" cellpadding="0">'+
					'	<tr>'+
					'		<td class="auction_status_bg_left"></td>'+
					'		<td class="auction_status_bg_center">'+
					'			<span id="AuctionStatus">'+
					'				<table>'+
					'					<tr>'+
					'						<td id="Auction_Status_1">'+
					'							<div class="auction_status_loading_img loading"/></div>'+
					'						</td>'+
					'					</tr>'+
					'					<tr>'+
					'						<td id="Auction_Status_2"></td>'+
					'					</tr>'+
					'				</table>'+
					'			</span>'+
					'		</td>'+
					'		<td class="auction_status_bg_right"></td>'+
					'	</tr>'+
					'</table>'
				).appendTo('#header_game');
			}
			
			if(gca_options.isOn("ENABLE_GLOBAL_AUCTION_STATUS_BAR") || gca_options.isOn("ENABLE_GLOBAL_AUCTION_STATUS_NOTIFICATION")){
				//Get auction status 1
				xmlHttpRequest({
					url : getPage.link({"mod":"auction","fl":"999"}),
					method : "GET",
					onload : function(content){
						var doc = $dark('*div').html(content).element;
						if( doc.getElementsByClassName("current")[0] && doc.getElementsByClassName("description_span_right")[0] ){
							var AuctionTranslation = doc.getElementsByClassName("current")[0].innerHTML;
							var Status = doc.getElementsByClassName("description_span_right")[0].innerHTML;
							if(document.getElementById('Auction_Status_1'))
								document.getElementById('Auction_Status_1').innerHTML = AuctionTranslation + " : " + Status;
							
							// Status changed notification
							if(gca_options.isOn("ENABLE_GLOBAL_AUCTION_STATUS_NOTIFICATION") && gca_data.get('auction_status_1', false)){
								if( gca_data.get('auction_status_1', false)!=Status ){
									gca_notifications.info( AuctionTranslation + " : " + Status );
								
									if(gca_options.isOn("ENABLE_GLOBAL_SOUND_NOTIFICATIONS")){
										//Sound
										var html5audio;
										if(gca_resources.firefox_audio == null){
											html5audio = new Audio(gca_resources.getURL("sounds/alert-sound-water.ogg"));
										}else{
											//gca_resources.firefox_audio.src = gca_resources.getURL("sounds/alert-sound-water.ogg");
											html5audio = gca_resources.firefox_audio;
										}
										// if muted
										if( !(typeof localStorage.sounds!="undefined" && localStorage.sounds=="off"))
											html5audio.play();
									}
								}
							}
							// save status
							gca_data.set('auction_status_1', Status);
						}else{
							if(document.getElementById('Auction_Status_1'))
								document.getElementById('Auction_Status_1').innerHTML = gca_locale.get("error");
						}
					}
				});
				
				//Get auction status 2
				xmlHttpRequest({
					url : getPage.link({"mod":"auction","fl":"999","ttype":"3"}),
					method : "GET",
					onload : function(content){
						var doc = $dark('*div').html(content).element;
						if(doc.getElementsByClassName("current")[0] && doc.getElementsByClassName("description_span_right")[0] ){
							var AuctionTranslation = doc.getElementsByClassName("current")[0].innerHTML;
							var Status = doc.getElementsByClassName("description_span_right")[0].innerHTML;
							if(document.getElementById('Auction_Status_2'))
								document.getElementById('Auction_Status_2').innerHTML = AuctionTranslation + " : " + Status;
							
							// Status changed notification
							if(gca_options.isOn("ENABLE_GLOBAL_AUCTION_STATUS_NOTIFICATION") && gca_data.get('auction_status_2', false)){
								if( gca_data.get('auction_status_2', false)!=Status )
									gca_notifications.info( AuctionTranslation + " : " + Status );
							}
							// Save status
							gca_data.set('auction_status_2', Status);
						}else{
							if(document.getElementById('Auction_Status_2'))
								document.getElementById('Auction_Status_2').innerHTML = gca_locale.get("error");
						}
					}
				});
			}
		},
		top_fixed_bar : {
			boot : function(){
				/* Setting the "Top Fixed Bar" */
				$dark('*div').id('topFixedBar').html('&nbsp;<b>Gladiatus Crazy Addon</b> v'+gca.version).appendTo(document.body);
				this.elements = {
					bar : {
						dom : $dark('#topFixedBar'),
						scroll : 74, className : "bar-fixed-bar"
					},
					icon_gold : {
						dom : $dark('#icon_gold'),
						scroll : 74, className : "icon_gold-fixed-bar"
					},
					gold_val : {
						dom : $dark('#sstat_gold_val'),
						scroll : 74, className : "gold_val-fixed-bar"
					},
					icon_rubies : {
						dom : $dark('#icon_rubies'),
						scroll : 74, className : "icon_rubies-fixed-bar"
					},
					ruby_val : {
						dom : $dark('#sstat_ruby_val'),
						scroll : 74, className : "ruby_val-fixed-bar"
					},
					icon_expeditionpoints : {
						dom : $dark('#icon_expeditionpoints'),
						scroll : 105, className : "icon_expeditionpoints-fixed-bar"
					},
					expeditionpoints_value : {
						dom : $dark('#expeditionpoints_value'),
						scroll : 105, className : "expeditionpoints_value-fixed-bar"
					},
					icon_dungeonpoints : {
						dom : $dark('#icon_dungeonpoints'),
						scroll : 105, className : "icon_dungeonpoints-fixed-bar"
					},
					dungeonpoints_value : {
						dom : $dark('#dungeonpoints_value'),
						scroll : 105, className : "dungeonpoints_value-fixed-bar"
					},
					header_values_ressources : {
						dom : $dark('#header_values_ressources'),
						scroll : 74, className : "header_values_ressources-fixed-bar"
					},
					header_values_general : {
						dom : $dark('#header_values_general'),
						scroll : 74, className : "header_values_general-fixed-bar"
					},
					icon_arena : {
						dom : $dark('#icon_arena').parent(),
						scroll : 105, className : "icon_arena-fixed-bar"
					},
					icon_grouparena : {
						dom : $dark('#icon_grouparena').parent(),
						scroll : 105, className : "icon_grouparena-fixed-bar"
					}
					//,
					//show_premium_days : {
					//	dom : $dark('#show_premium_days'),
					//	scroll : 74, className : "show_premium_days-fixed-bar"
					//}
				}
				
				window.addEventListener("scroll",function(){gca_section_global.display.top_fixed_bar.onscroll();}, false);
				this.onscroll();
			},
			onscroll : function(){
				var vscroll = parseInt((document.all ? document.scrollTop : window.pageYOffset));
				for(var i in this.elements){
					if(this.elements[i].dom.element){
						if(vscroll>this.elements[i].scroll && this.elements[i].dom.element.name!="in-use"){
							this.elements[i].dom.element.className+=" "+this.elements[i].className;
							this.elements[i].dom.element.name="in-use";
						}else if(vscroll<=this.elements[i].scroll && this.elements[i].dom.element.name=="in-use"){
							this.elements[i].dom.element.name="no-use";
							this.elements[i].dom.element.className=this.elements[i].dom.element.className.replace(this.elements[i].className,"").replace("  "," ");
						}
					}
				}
			}
		},
		advanced_main_menu : function(){
			var traveling=false;
			if(!$dark('#submenu1')){//Traveling test
				traveling=true;
			}
			var submenu_event=false;//Zaria event
			if(!traveling && $dark('#submenu1 a[0]').attr('class').match('glow') ){
				submenu_event=true;
			}
			// Convert mouse over menu shift event to click event
			if(!traveling){//Traveling test
				$dark('#submenuhead1 div[1]').delAttr('onmouseover').attr('onclick','switchMenu(2)').css('cursor:pointer;');
				$dark('#submenuhead1 div[1] a[0]').delAttr('href');
				$dark('#submenuhead2 div[0]').delAttr('onmouseover').attr('onclick','switchMenu(1)').css('cursor:pointer;');
				$dark('#submenuhead2 div[0] a[0]').delAttr('href');
			}
			// Add more links on the menu
				// Set original main links variables
				var overview = $dark('#mainmenu a[0]');var overview_active=(overview.class().match('active'))?'_active':'';
				var highscore = $dark('#mainmenu a[3]');var highscore_active=(highscore.class().match('active'))?'_active':'';
				if(!traveling){//Traveling test
					var pantheon = $dark('#mainmenu a[1]');var pantheon_active=(pantheon.class().match('active'))?'_active':'';
					var guild = $dark('#mainmenu a[2]');var guild_active=(guild.class().match('active'))?'_active':'';
					// Set original submain links variables
						var sublink = {
							work : {active : false},
							arena : {active : false},
							training : {active : false},
							weaponSmith : {active : false},
							armourSmith : {active : false},
							generalGoods : {active : false},
							alchemist : {active : false},
							mercenaries : {active : false},
							forge : {active : false},
							malefica : {active : false},
							wizard : {active : false},
							auction : {active : false},
							market : {active : false},
							cityGate : {active : false}
						}
						var sub_links = $dark('#submenu1 a');
						for(var i = 0; i < sub_links.length; i++){
							if(!sublink.work.active && sub_links[i].href.match(/index.php\?mod=work(&|&amp;)sh=/i)){
								sublink.work.active = i;
							}
							else if(!sublink.arena.active && sub_links[i].href.match(/index.php\?mod=arena(&|&amp;)sh=/i)){
								sublink.arena.active = i;
							}
							else if(!sublink.training.active && sub_links[i].href.match(/index.php\?mod=training(&|&amp;)sh=/i)){
								sublink.training.active = i;
							}
							else if(!sublink.weaponSmith.active && sub_links[i].href.match(/index.php\?mod=inventory(&|&amp;)sub=1(&|&amp;)sh=/i)){
								sublink.weaponSmith.active = i;
							}
							else if(!sublink.armourSmith.active && sub_links[i].href.match(/index.php\?mod=inventory(&|&amp;)sub=2(&|&amp;)sh=/i)){
								sublink.armourSmith.active = i;
							}
							else if(!sublink.generalGoods.active && sub_links[i].href.match(/index.php\?mod=inventory(&|&amp;)sub=3(&|&amp;)sh=/i)){
								sublink.generalGoods.active = i;
							}
							else if(!sublink.alchemist.active && sub_links[i].href.match(/index.php\?mod=inventory(&|&amp;)sub=4(&|&amp;)sh=/i)){
								sublink.alchemist.active = i;
							}
							else if(!sublink.mercenaries.active && sub_links[i].href.match(/index.php\?mod=inventory(&|&amp;)sub=5(&|&amp;)sh=/i)){
								sublink.mercenaries.active = i;
							}
							else if(!sublink.forge.active && sub_links[i].href.match(/index.php\?mod=forge(&|&amp;)sh=/i)){
								sublink.forge.active = i;
							}
							else if(!sublink.malefica.active && sub_links[i].href.match(/index.php\?mod=inventory(&|&amp;)sub=6(&|&amp;)sh=/i)){
								sublink.malefica.active = i;
							}
							else if(!sublink.wizard.active && sub_links[i].href.match(/index.php\?mod=magus(&|&amp;)sh=/i)){
								sublink.wizard.active = i;
							}
							else if(!sublink.auction.active && sub_links[i].href.match(/index.php\?mod=auction(&|&amp;)sh=/i)){
								sublink.auction.active = i;
							}
							else if(!sublink.market.active && sub_links[i].href.match(/index.php\?mod=market(&|&amp;)sh=/i)){
								sublink.market.active = i;
							}
						};
						var submenu_len = $dark('#submenu1 a').length;
						if(submenu_event) submenu_len--;
						// Arena
						if(sublink.arena.active){
							var arena = $dark('#submenu1 a['+sublink.arena.active+']');
							var arena_active = (arena.class().match('active'))?'_active':'';
						}
						// Forge
						if(sublink.forge.active){
							var forge = $dark('#submenu1 a['+sublink.forge.active+']');
							var forge_active = (forge.class().match('active'))?'_active':'';
						}
						// Auction
						if(sublink.auction.active){
							var auction = $dark('#submenu1 a['+sublink.auction.active+']');
							var auction_active = (auction.class().match('active'))?'_active':'';
						}
						// Market
						if(sublink.market.active){
							var market = $dark('#submenu1 a['+sublink.market.active+']');
							var market_active=(market.class().match('active'))?'_active':'';
						}

						/*
						var submenu_len = $dark('#submenu1 a').length;
						if(submenu_event) submenu_len--;
						// Arena
						if(submenu_len>=1){
							var arena = (submenu_event)?$dark('#submenu1 a[2]'):$dark('#submenu1 a[1]');
							var arena_active = (arena.class()=='submenuitem_aktive')?'_active':'';
						}
						// Forge
						if(submenu_len>=8){
							var forge = (submenu_event)?$dark('#submenu1 a[9]'):$dark('#submenu1 a[8]');
							var forge_active = (forge.class()=='submenuitem_aktive')?'_active':'';
						}
						// Auction
						if(submenu_len>=11){
							var auction = (submenu_event)?$dark('#submenu1 a[12]'):$dark('#submenu1 a[11]');
							var auction_active = (auction.class()=='submenuitem_aktive')?'_active':'';
						}
						// Market
						if(submenu_len>=12){
							var market = (submenu_event)?$dark('#submenu1 a[13]'):$dark('#submenu1 a[12]');
							var market_active=(market.class()=='submenuitem_aktive')?'_active':'';
						}
						*/
						
				}else{
					var highscore = $dark('#mainmenu a[2]');var highscore_active = (highscore.class().match('active'))?'_active':'';
				}
				
				//Menu links injection
					//Inject Overview Link
					var newOverview = $dark('*div').class('advanced_main_menu_entry').afterFrom(overview);
					var backOverview = $dark('*div').hide().class('advanced_main_menu_back_links').addChild([
						$dark('*a').text('P').href( getPage.link({"mod":"overview","submod":"stats"}) ),
						$dark('*a').text('X').href( getPage.link({"mod":"overview","doll":"2"}) ),
						$dark('*a').text('I').href( getPage.link({"mod":"overview","doll":"3"}) ),
						$dark('*a').text('II').href( getPage.link({"mod":"overview","doll":"4"}) ),
						$dark('*a').text('III').href( getPage.link({"mod":"overview","doll":"5"}) ),
						$dark('*a').text('IV').href( getPage.link({"mod":"overview","doll":"6"}) )
					]);
					overview.appendTo(newOverview).addClass('advanced_main_menu_link'+overview_active);
					newOverview.addChild([
						backOverview,
						$dark('*a').class('advanced_main_menu_shift').html('+').click(function(){
							if(backOverview.element.style.display=='none'){overview.hide();backOverview.show();}
							else{backOverview.hide();overview.showBlocked();}
						})
					]);
					
					//Inject Highscore Link
					var newHighscore = $dark('*div').class('advanced_main_menu_entry').afterFrom(highscore);
					highscore.appendTo(newHighscore).addClass('advanced_main_menu_link'+highscore_active);
					newHighscore.addChild([
						$dark('*a').class('advanced_main_menu_shift').html('+').href( 'http://gladiatuscrazyaddon.tk/index.php?mode=highscore' ).attr('target','_blank')
					]);
				if(!traveling){//Traveling test
					//Inject Pantheon Link
					var newPantheon = $dark('*div').class('advanced_main_menu_entry').afterFrom(pantheon);
					pantheon.appendTo(newPantheon).addClass('advanced_main_menu_link'+pantheon_active);
					newPantheon.addChild([
						$dark('*a').class('advanced_main_menu_shift').html('+').href( getPage.link({"mod":"gods"}) )
					]);

					//Check if guild
					if( gca_data.get('guild', {inGuild:true} ).inGuild ){
						//Inject Guild Link
						var newGuild = $dark('*div').class('advanced_main_menu_entry').afterFrom(guild);
						var backGuild = $dark('*div').hide().class('advanced_main_menu_back_links').addChild([
							$dark('*a').text('Gl').href( getPage.link({"mod":"guild"}) ),
							$dark('*a').text('Ad').href( getPage.link({"mod":"guild","submod":"admin"}) ),
							$dark('*a').text('Bu').href( getPage.link({"mod":"guild","submod":"buildings"}) ),
							$dark('*a').text('Ba').href( getPage.link({"mod":"guildBankingHouse"}) ),
							$dark('*a').text('Ja').href( getPage.link({"mod":"guild_jail"}) ),
							$dark('*a').text('Me').href( getPage.link({"mod":"guild_medic"}) )
						]);
						guild.appendTo(newGuild).addClass('advanced_main_menu_link'+guild_active);
						newGuild.addChild([
							backGuild,
							$dark('*a').class('advanced_main_menu_shift').html('+').click(function(){
								if(backGuild.element.style.display=='none'){guild.hide();backGuild.show();}
								else{backGuild.hide();guild.showBlocked();}
							})
						]);
					}
				//Submenu links injection
					var level = parseInt( $dark('#header_values_level').html() );
					
					if(level>2){
						//Inject Arena link
						var newArena = $dark('*div').class('advanced_sub_menu_entry').afterFrom(arena);
						arena.appendTo(newArena).addClass('advanced_sub_menu_link'+arena_active);
						newArena.addChild([
							$dark('*a').class('advanced_sub_menu_shift').html('+').href( getPage.link({"mod":"arena","submod":"grouparena"}) )
						]);
						//Forge
						if(forge){
							var newForge = $dark('*div').class('advanced_sub_menu_entry').afterFrom(forge);
							forge.appendTo(newForge).addClass('advanced_sub_menu_link'+forge_active);
							newForge.addChild([
								$dark('*a').class('advanced_sub_menu_shift').html('+').href( getPage.link({"mod":"forge","submod":"smeltery"}) )
							]);
						}
						//Auction
						if(auction){
							var newAuction = $dark('*div').class('advanced_sub_menu_entry').afterFrom(auction);
							auction.appendTo(newAuction).addClass('advanced_sub_menu_link'+auction_active);
							newAuction.addChild([
								$dark('*a').class('advanced_sub_menu_shift').html('+').href( getPage.link({"mod":"auction","ttype":"3"}) )
							]);
						}
						//Inject Market Link
						if(market){
							var newMarket = $dark('*div').class('advanced_sub_menu_entry').afterFrom(market);
							var backMarket = $dark('*div').hide().class('advanced_sub_menu_back_links').addChild([
								$dark('*a').addChild( $dark('*div').class('item-i-7-2').css("transform: scale(0.7);margin: -2px 0px 0px -2px;") ).href( getPage.link({"mod":"market","f":"7","s":"p"}) ),
								$dark('*a').addChild( $dark('*div').class('item-i-11-2').css("transform: scale(0.7);margin: -2px 0px 0px -2px;") ).href( getPage.link({"mod":"market","f":"11","s":"p"}) ),
								$dark('*a').addChild( $dark('*div').class('item-i-12-4').css("transform: scale(0.7);margin: -2px 0px 0px -2px;") ).href( getPage.link({"mod":"market","f":"12","s":"p"}) ),
								$dark('*a').addChild( $dark('*img').src('img/ui/icon_gold.gif') ).href( getPage.link({"mod":"market","s":"p"}) ),
								$dark('*a').addChild( $dark('*img').src('img/ui/icon_level.gif') ).href( getPage.link({"mod":"market","s":"ld"}) )
							]);
							market.appendTo(newMarket).addClass('advanced_sub_menu_link'+market_active);
							newMarket.addChild([
								backMarket,
								$dark('*a').class('advanced_sub_menu_shift').html('+').click(function(){
									if(backMarket.element.style.display=='none'){market.hide();backMarket.showBlocked();}
									else{backMarket.hide();market.showBlocked();}
								})
							]);
						}
					}else if(level==2){
						//Inject Arena link
						arena = $dark('#submenu1 a[0]');
						var newArena = $dark('*div').class('advanced_sub_menu_entry').afterFrom(arena);
						arena.appendTo(newArena).addClass('advanced_sub_menu_link'+arena_active);
						newArena.addChild([
							$dark('*a').class('advanced_sub_menu_shift').html('+').href( getPage.link({"mod":"arena","submod":"grouparena"}) )
						]);
					}
				}
		},
		
		merchants_time : function(){
			//Save time if merchant
			if(gca_section.mod=='inventory'){
				gca_section_merchants.save_merchants_time();
			}
			
			//Variable because of the Advance menu changes
			var x=($dark('#submenu1 a').length > 12)?4:3;
			
			// Zaria Event
			if( $dark('#submenu1 a[0]').attr('class').match('glow') ){
				x++;
			}
			
			//Calculate time
			var date = new Date();
			var time = gca_data.get('merchants_time', -1 );
			var remaining_time = time-date.getTime();
			
			if(remaining_time>0){
				var percent_completed = Math.round( 100-( remaining_time/( 24*60*60*1000 ) )*100 );
				var remaining_h = Math.floor( remaining_time/(60*60*1000) );
				if(remaining_h<10){remaining_h='0'+remaining_h;}
				var remaining_m = Math.floor( ( remaining_time%(60*60*1000) )/(60*1000) );
				if(remaining_m<10){remaining_m='0'+remaining_m;}
				var remaining_s = Math.floor( ( remaining_time%(60*1000) )/1000 );
				if(remaining_s<10){remaining_s='0'+remaining_s;}
				var time_format = remaining_h +':'+ remaining_m +':'+ remaining_s;
				var color='#BFAE54';
			}else if( remaining_time == (-1-date.getTime()) ){
				var percent_completed = '?';
				var time_format = 'N/A';
				var color='white';
			}else{
				var percent_completed = 100;
				var time_format = gca_locale.get('new_goods');
				var color='yellow';
			}
			
			var level = parseInt( $dark('#header_values_level').html() );
			if(level==1){
				$dark('*div').id("merchants_time_tooltip_holder").html('<div id="merchants_time_box" style="color:'+color+';">'+time_format+'</div><div class="merchants_time_percent_out" style="background-image: url(img/energie_balken_grund.gif);"><div id="merchants_time_percent" class="charstats_balken_xp" style="width:'+percent_completed+'%"></div></div>').beforeFrom( $dark('#submenu1 a['+(x-2)+']') );
				$dark('*div').style('height:10px;').afterFrom( $dark('#submenu1 a['+(x+1)+']') );
			}else if(level==2){
				$dark('*div').id("merchants_time_tooltip_holder").html('<div id="merchants_time_box" style="color:'+color+';">'+time_format+'</div><div class="merchants_time_percent_out" style="background-image: url(img/energie_balken_grund.gif);"><div id="merchants_time_percent" class="charstats_balken_xp" style="width:'+percent_completed+'%"></div></div>').beforeFrom( $dark('#submenu1 a['+x+']') );
				$dark('*div').style('height:10px;').afterFrom( $dark('#submenu1 a['+(x+1)+']') );
			}else if(level==3 || level==4 || level==5 ){
				$dark('*div').id("merchants_time_tooltip_holder").html('<div id="merchants_time_box" style="color:'+color+';">'+time_format+'</div><div class="merchants_time_percent_out" style="background-image: url(img/energie_balken_grund.gif);"><div id="merchants_time_percent" class="charstats_balken_xp" style="width:'+percent_completed+'%"></div></div>').beforeFrom( $dark('#submenu1 a['+(x+1)+']') );
				$dark('*div').style('height:10px;').afterFrom( $dark('#submenu1 a['+(x+4)+']') );
			}else{
				$dark('*div').id("merchants_time_tooltip_holder").html('<div id="merchants_time_box" style="color:'+color+';">'+time_format+'</div><div class="merchants_time_percent_out" style="background-image: url(img/energie_balken_grund.gif);"><div id="merchants_time_percent" class="charstats_balken_xp" style="width:'+percent_completed+'%"></div></div>').beforeFrom( $dark('#submenu1 a['+x+']') );
				$dark('*div').style('height:10px;').afterFrom( $dark('#submenu1 a['+(x+4)+']') );
			}
			
			if(remaining_time>0){
				$dark('*script').html('\
				var time_left='+Math.floor(remaining_time/1000)+';\
				merchant_coutdown();\
				\
				function merchant_coutdown(){\
					var percent_completed = Math.round( 100-( time_left/( 24*60*60 ) )*100 );\
					document.getElementById("merchants_time_percent").style.width=percent_completed+"%";\
					\
					if((time_left-(time_left%3600))/3600<1){\
						document.getElementById("merchants_time_box").style.color="red";\
					}else{\
						document.getElementById("merchants_time_box").style.color="#C7B68A;";\
					}\
					\
					var h=(time_left-(time_left%3600))/3600;\
					var m=((time_left%3600)-(time_left%60))/60;\
					var s=time_left%60;\
					h=(h<10)?"0"+h:h;\
					m=(m<10)?"0"+m:m;\
					s=(s<10)?"0"+s:s;\
					\
					document.getElementById("merchants_time_box").innerHTML=""+h+":"+m+":"+s;\
					time_left=time_left-1;\
					if(time_left==-2){\
						document.getElementById("merchants_time_box").innerHTML="'+gca_locale.get('new_goods')+'";\
						document.getElementById("merchants_time_box").style.color="yellow";\
					}else{\
						setTimeout("merchant_coutdown()",999);\
					}\
				}\
				').appendTo('body');
			}
		},
		//Timer for the Quests
		quests_timer : function(){
			//Time when quests will be refreshed (since 1970 in milliseconds)
			var time=parseInt( gca_data.get('quest_timer_time',0) );
			//Quest you can still take
			var quests_left=parseInt( gca_data.get('quest_timer_quests_you_can_take','N/A') );
			//Make the "QuestTime"
			//Check if "advanced main menu" is enabled or not
			if( $dark('.advanced_main_menu_entry[0]') ){
				$dark('.advanced_main_menu_entry[1] a[0]').html( $dark('.advanced_main_menu_entry[1] a[0]').html().replace(/\((\d+)\)/i,'(<font color="green">$1</font>)') );
				$dark('.advanced_main_menu_entry[1] a[0]').addHtml('<font id="QuestTime" style="margin-left:5px;" weight="bold">(N/A)</font>');
			}else{
				$dark('#mainmenu a[1]').html( $dark('#mainmenu a[1]').html().replace(/\((\d+)\)/i,'(<font color="green">$1</font>)') );
				$dark('#mainmenu a[1]').addHtml('<font id="QuestTime" style="margin-left:5px;" weight="bold">(N/A)</font>');
			}
			//Time difference
			var time=( time-new Date().getTime() );
			//Check if the time has finished
			if(time<0){//Time has finished
				if(quests_left==0){//Can i take quests?
					$dark('#QuestTime').html('(<font color="red">'+gca_locale.get('quest_full')+'</font>)');
				}else if(quests_left!='N/A'){//Do i have data saved? (N/A is the default value)
					$dark('#QuestTime').html('(<font color="yellow">'+gca_locale.get('quest_new')+'</font>)');
				}
			}else{//Time has NOT finished
				//Convert milliseconds to Minutes:Seconds
				var date = new Date(time);
				var minutes=date.getMinutes();
				var seconds=date.getSeconds();
				//Format to 01:04
				if(minutes<10){minutes='0'+minutes;}
				if(seconds<10){seconds='0'+seconds;}
				//Display the values
				$dark('#QuestTime').html('('+minutes+':'+seconds+')');
				//Script to refresh the countdown
				$dark('body').addChild(
					$dark('*script').html('var questclockReseter='+time+';questClock();function questClock(){var date = new Date(questclockReseter);if(date.getMinutes()<10){var m="0";}else{var m="";}if(date.getSeconds()<10){var s="0";}else{var s="";}document.getElementById("QuestTime").innerHTML="("+m+date.getMinutes()+":"+s+date.getSeconds()+")";questclockReseter=questclockReseter-1000;if(questclockReseter<0){if('+quests_left+'==0){var text="'+gca_locale.get('quest_full')+'";}else{var text="'+gca_locale.get('quest_new')+'";}document.getElementById("QuestTime").innerHTML="("+text+")";document.getElementById("QuestTime").style.color="yellow";}else{setTimeout("questClock()",999);}}')
				);
			}
			
		},
		//Guild application alert
		guild_application_alert : function(){
			xmlHttpRequest({
				url : getPage.link({"mod":"guild","submod":"admin"}),
				method : "GET",
				onload : function(content){
					if( content.match('submod=adminApplication') ){
						gca_notifications.info( gca_locale.get("pending_guild_application") );
					}
				}
			});	
		},
		//Display Centurio days
		centurio_days : function(){
			xmlHttpRequest({
				url : getPage.link({"mod":"premium","submod":"centurio"}),
				method : "GET",
				onload : function(content){
					if( content.match(/<div id="premium_duration">([^<]+)<\/div>/) ){
						var info = content.match(/<div id="premium_duration">([^<]+)<\/div>/)[1].replace(/  /g,'');
						var days = info.match(/(\d+)/)[1];
						if(days>=100){days='+;'}
						$dark('#mainmenu .premium[0]').html( 
							$dark('#mainmenu .premium[0]').html() + '<div class="show_centurio_days" style="background-image: url(img/interface/new.gif);">'+days+'</div>'
						);
					}
				}
			});	
		},
		//Attacked timers
		attacked_timers : function(){

			// Style fixes
			document.getElementById("header_menue").className = "attacked_timers_active";
			// Get Last arena attack
			var lastAttacked = {
				// Arena
				arena : parseInt(gca_data.get('arena_attacked_time',0)),
				// Grouparena
				grouparena : parseInt(gca_data.get('grouparena_attacked_time',0)),
				// Arena xs
				arena_xs : parseInt(gca_data.get('arena_xs_attacked_time',0)),
				// Grouparena xs
				grouparena_xs : parseInt(gca_data.get('grouparena_xs_attacked_time',0))
			};

			// Create timers UI
			var arenaTimeElement = {
				arena : null,
				grouparena : null,
				arena_xs : null,
				grouparena_xs : null
			};

			// Variables
			var tr, td, img, text;

			// Create timers container
			var container = document.createElement("div");
			container.className = "attacked_timers_back";
			// Insert timer table
			var table = document.createElement("table");
			table.id = "attacked_timers_table";
			table.className = "attacked_timers_table";
			tr = document.createElement("tr");

			// Arena Timer Cell
			td = document.createElement("td");
			icon = document.createElement("span");
			icon.className = "timer-icon timer-icon-arena";
			arenaTimeElement.arena = document.createElement("span");
			arenaTimeElement.arena.className = "timer";
			td.appendChild(icon);
			td.appendChild(arenaTimeElement.arena);
			tr.appendChild(td);
			
			// Grouparena Timer
			td = document.createElement("td");
			icon = document.createElement("span");
			icon.className = "timer-icon timer-icon-grouparena";
			arenaTimeElement.grouparena = document.createElement("span");
			arenaTimeElement.grouparena.className = "timer";
			td.appendChild(icon);
			td.appendChild(arenaTimeElement.grouparena);
			tr.appendChild(td);
			table.appendChild(tr);

			tr = document.createElement("tr");

			// Arena xs Timer
			td = document.createElement("td");
			icon = document.createElement("span");
			icon.className = "timer-icon timer-icon-arena";
			text = document.createElement("span");
			text.className = "attacked_timers_xs_text";
			text.textContent = "s";
			arenaTimeElement.arena_xs = document.createElement("span");
			arenaTimeElement.arena_xs.className = "timer";
			td.appendChild(icon);
			td.appendChild(text);
			td.appendChild(arenaTimeElement.arena_xs);
			tr.appendChild(td);

			// Grouparena xs Timer
			td = document.createElement("td");
			icon = document.createElement("span");
			icon.className = "timer-icon timer-icon-grouparena";
			text = document.createElement("span");
			text.className = "attacked_timers_xs_text";
			text.textContent = "s";
			arenaTimeElement.grouparena_xs = document.createElement("span");
			arenaTimeElement.grouparena_xs.className = "timer";
			td.appendChild(icon);
			td.appendChild(text);
			td.appendChild(arenaTimeElement.grouparena_xs);
			tr.appendChild(td);

			// Insert on page
			table.appendChild(tr);
			container.appendChild(table);
			document.getElementById("header_game").appendChild(container);

			// Current server day to milliseconds
			date = JSON.parse($dark("#server-time").attr("data-start-time"));
			// Bug fix
			date = new Date(date[0], date[1], date[2], date[3], date[4], date[5], date[6]).getTime();

			// Arena Timer Values
			var timer = {
				arena : date - lastAttacked.arena,
				grouparena : date - lastAttacked.grouparena,
				arena_xs : date - lastAttacked.arena_xs,
				grouparena_xs : date - lastAttacked.grouparena_xs
			}

			var msToHMS_String = function(d){
				d = parseInt(d);
				
				// Max values
				if(d >= 99*60*60*1000)
					return '99:00:00';
				// Min value
				//if(d <= 0)
				//	return '00:00:00';
				
				var ms = d % 1000;
				d = (d - ms) / 1000;
				var secs = d % 60;
				d = (d - secs) / 60;
				var mins = d % 60;
				var hrs = (d - mins) / 60;

				return (hrs<10? '0':'') + hrs + ':' + (mins<10? '0':'') + mins + ':' + (secs<10? '0':'') + secs;
			}

			var countdown = function(){
				// Arena
				arenaTimeElement.arena.textContent = msToHMS_String(timer.arena);
				// Grouparena
				arenaTimeElement.grouparena.textContent = msToHMS_String(timer.grouparena);
				// Arena xs
				arenaTimeElement.arena_xs.textContent = msToHMS_String(timer.arena_xs);
				// Grouparena xs
				arenaTimeElement.grouparena_xs.textContent = msToHMS_String(timer.grouparena_xs);
				
				// 1 sec passed
				timer.arena = timer.arena + 1000;
				timer.grouparena = timer.grouparena + 1000;
				timer.arena_xs = timer.arena_xs + 1000;
				timer.grouparena_xs = timer.grouparena_xs + 1000;
			}

			countdown_interval = setInterval(function(){
				countdown();
			}, 1000);
			countdown();


			/*
			//Load attacked times in milliseconds
			var time=[
				[parseInt(gca_data.get('arena_attacked_time',0)),'#BFAE54'],//arena_time
				[parseInt(gca_data.get('grouparena_attacked_time',0)),'#BFAE54'],//grouparena_time
				[parseInt(gca_data.get('arena_xs_attacked_time',0)),'#BFAE54'],//arena_xs_time
				[parseInt(gca_data.get('grouparena_xs_attacked_time',0)),'#BFAE54']//grouparena_xs_time
			];

			//Current server day to milliseconds
			date = JSON.parse($dark("#server-time").attr("data-start-time"));
			// Bug fix
			if(new Date().getMonth() == date[1]-1 && new Date().getDate() == date[2]){
				date = new Date(date[0], date[1]-1, date[2], date[3], date[4], date[5], date[6]).getTime();
			}else{
				date = new Date(date[0], date[1], date[2], date[3], date[4], date[5], date[6]).getTime();
			}

			// Function to make milliseconds to format 02:10:39
			var format_time = function(t, y){
				// Set limit
				var text = 3599999000; // 999*60*60*1000 + 59*60*1000 + 59*1000;
				if(text > t){
					t = text;
				}
				m = t%1000;
				t = (t-m)/1000;
				s = t%60;
				t = (t-s)/60;
				m = t%60;
				t = (t-m)/60;
				h = t;
				text = ((h<10)?'0':((h<100)?'00':'')) + h + ((m<10)?'0':'') + m + ((s<10)?'0':'') + s;
				color = ((t < y) ? 'green' : '#BFAE54');
				return [text, color]};
			
			// Save diference in milliseconds
			var time_in_ml = [null,null,null,null];
			time_in_ml[0] = date - ((!time[0][0] || isNaN(time[0][0])) ? 0 : time[0][0]);
			time_in_ml[1] = date - ((!time[1][0] || isNaN(time[0][0])) ? 0 : time[1][0]);
			time_in_ml[2] = date - ((!time[2][0] || isNaN(time[0][0])) ? 0 : time[2][0]);
			time_in_ml[3] = date - ((!time[3][0] || isNaN(time[0][0])) ? 0 : time[3][0]);

			// Make milliseconds to format 02:10:39
			time[0] = format_time(time_in_ml[0], 3600000);
			time[1] = format_time(time_in_ml[0], 3600000);
			time[2] = format_time(time_in_ml[0], 1800000);
			time[3] = format_time(time_in_ml[0], 1800000);

			console.log(time[0]);
			console.log(time[1]);
			console.log(time[2]);
			console.log(time[3]);

			//for(i=0;i<2;i++){time[i]=temp_function(time[i][0],3600000);}
			//for(i=2;i<4;i++){time[i]=temp_function(time[i][0],1800000);}

			// New fights?
			if($dark('#menue_reports div[0]')){
				var link =(!traveling)?$dark('#menue_reports').getAttr('href'):$dark('#menue_reports').getAttr('disabled-link');
				if(link.match('reports&t=3')){
					//Arena Turma
					time[1][0]=' --:--:--';
					time[3][0]=' --:--:--';
					time[1][1]='#BFAE54';
					time[3][1]='#BFAE54';
					time_in_ml[1]=null;
					time_in_ml[3]=null;
				}else{
					//Arena
					time[0][0]=' --:--:--';
					time[2][0]=' --:--:--';
					time[0][1]='#BFAE54';
					time[2][1]='#BFAE54';
					time_in_ml[0]=null;
					time_in_ml[2]=null;
				}
			}
			//Arena TURMA disabled?
			if(gca_data.get('arena_turma_closed',false)){
				time[1][1]='#666';
				time[3][1]='#666';
			}
			//Make the attacked timers table
			$dark('#header_game').addChild(
				$dark('*span').class('attacked_timers_back').addChild(
					$dark('*table').id('attacked_timers_table').class('attacked_timers_table').addChild([
						$dark('*tr').addChild([
							$dark('*td').addChild([
								$dark('*img').attr('align','absmiddle').src('img/ui/icon_arena.gif').css('height:18px;'),
								$dark('*span').css('color: '+time[0][1]+';margin-left:0px;margin-right:0px;').html( time[0][0] )
							]),
							$dark('*td').addChild([
								$dark('*img').attr('align','absmiddle').src('img/ui/icon_grouparena.gif').css('height:18px;'),
								$dark('*span').css('color: '+time[1][1]+';margin-left:0px;margin-right:0px;').html( time[1][0] )
							])
						]),
						$dark('*tr').addChild([
							$dark('*td').addChild([
								$dark('*img').attr('align','absmiddle').src('img/ui/icon_arena.gif').css('height:18px;'),
								$dark('*font').class('attacked_timers_xs_text').html('s'),
								$dark('*span').css('color: '+time[2][1]+';margin-left:0px;margin-right:0px;').html( time[2][0] )
							]),
							$dark('*td').addChild([
								$dark('*img').attr('align','absmiddle').src('img/ui/icon_grouparena.gif').css('height:18px;'),
								$dark('*font').class('attacked_timers_xs_text').html('s'),
								$dark('*span').css('color: '+time[3][1]+';margin-left:0px;margin-right:0px;').html( time[3][0] )
							])
						])
					])
				)
			);
			//Count down scripts
			for(i=0;i<4;i++){
				if(time_in_ml[i]){
					if(i==0 || i==1){var color_time=3600;}
					else{var color_time=1800;}
					
					if((i==1 || i==3) && gca_data.get('arena_turma_closed',false)){
						var color_green='#666';
						var color_red='#666';
					}else{
						var color_green='green';
						var color_red='#BFAE54';
					}
					$dark('body').addChild(
						$dark('*script').html('\
							var attacked_time_'+i+'='+Math.floor(time_in_ml[i]/1000)+';\
							attacked_time_coutdown_'+i+'();\
							function attacked_time_coutdown_'+i+'(){\
								if(attacked_time_'+i+'<'+color_time+'){document.getElementById("attacked_timers_table").getElementsByTagName("span")['+i+'].style.color="'+color_green+'";}\
								else{document.getElementById("attacked_timers_table").getElementsByTagName("span")['+i+'].style.color="'+color_red+'";}\
								var h=(attacked_time_'+i+'-(attacked_time_'+i+'%3600))/3600;\
								var m=((attacked_time_'+i+'%3600)-(attacked_time_'+i+'%60))/60;\
								var s=attacked_time_'+i+'%60;\
								h=(h<10)?"0"+h:h;m=(m<10)?"0"+m:m;s=(s<10)?"0"+s:s;\
								document.getElementById("attacked_timers_table").getElementsByTagName("span")['+i+'].innerHTML=""+h+":"+m+":"+s;\
								attacked_time_'+i+'=attacked_time_'+i+'+1;\
								setTimeout("attacked_time_coutdown_'+i+'()",999);\
							}\
						')
					);
				}
			}*/
		},
		//Show Premium Days
		show_premium_days : function(){
			return;
			
			var prem_days=Math.ceil((gca_data.get('premium_days',0)-(new Date().getTime()/1000))/60/60/24);
			
			if(prem_days>0){
				var text='GCA Premium: '+prem_days+' '+gca_locale.get("days");
			}else{
				var text='<a href="http://q.gs/1940284/free-gca-key" target="_blank" style="color:yellow;font-weight:bold;" title="Get 1 day FREE Key">GET GCA PREMIUM FREE!</a>';
			}
			
			$dark('body').addChild( 
				$dark('*div').id('show_premium_days').class('show_prem_days').addChild(
					$dark('*h4').class('show_prem_days_text').html(text)
				)
			);
		},
		//Packages Expire Notification
		expiredPackages : function(){
			var diffHourMin = gca_options.load("PACKAGES_EXPIRED_HOURS");
			xmlHttpRequest({
				url : getPage.link({"mod":"packages","page":"999999"}),
				method : "GET",
				onload : function(content){
					var packets = content.split('<span style="float:left;margin-right:5px">');
					if(packets.length!=1){
						var lastPacket = packets[packets.length-1];
						var lastTime = lastPacket.split('<br />')[4];
						
						lastTime = lastTime.split(', ')[1].replace('- ','').replace(/\./g,'/').replace(/(\d+)\/(\d+)\/(\d+)/i,'$2/$1/$3');
						var expireDay = new Date(lastTime);
						
						//Server Date
							var server_date = $dark('#header_game span[6]').html().match(/(\d+).(\d+).(\d+) (\d+).(\d+)/i);
							//fix seconds
							var now = new Date();
							var nowServerDate=new Date(server_date[2]+"/"+server_date[1]+"/"+server_date[3]+' '+server_date[4]+":"+now.getMinutes()+":"+now.getSeconds());
						
						//Expire Difference
						var diffHour = Math.floor( (expireDay-nowServerDate)/(60*60*1000) );
						
						if(diffHour<diffHourMin)
							gca_notifications.warning( gca_locale.get("packages_expiring_in")+' '+diffHour+' '+ gca_locale.get("hours") );
					}
				}
			});
			
			if( $dark('#menue_packages .menue_new_count[0]') ){
				var number_of_new_packages = parseInt($dark('#menue_packages .menue_new_count[0]').html().replace(/[^0-9]/gi,''));
				number_of_new_packages += gca_data.get('number_of_new_packages', 0 );
				$dark('#menue_packages .menue_new_count[0]').html(number_of_new_packages);
				gca_data.set('number_of_new_packages', number_of_new_packages );
			}else{
				var number_of_new_packages = gca_data.get('number_of_new_packages', 0 );
				if(number_of_new_packages!=0){
					$dark('#menue_packages').attr('class','menue_packages_highlight');
					$dark('#menue_packages').html('<div class="menue_new_count"> '+number_of_new_packages+' </div>');
				}
			}
		}
	},
	rememberTabs : function(){
		window.addEventListener('click',function(event){
			var url = ( event.target && (event.target.href || (event.target.parentNode && event.target.parentNode.href) || (event.target.parentNode && event.target.parentNode.parentNode && event.target.parentNode.parentNode.href) ) ) || false;
			if(!url || url.match("javascript:")) return;
			var mod = (url.match(/mod=\w+/i))?url.match(/mod=(\w+)/i)[1]:null;
			var submod = (url.match(/submod=\w+/i))?url.match(/submod=(\w+)/i)[1]:null;
			if(!mod) return;

			if((mod=="overview" && submod==null) || mod=="inventory" || mod=="packages" || mod=="market" || mod=="auction" || mod=="magus" || mod=="guild_market" || mod=="guild_storage" || mod=="forge" ){
				if(!url.match(/inv=\d+/i)){
					var inv = gca_data.get('inventory_tab', 0);
				}else{
					gca_data.set('inventory_tab', url.match(/inv=(\d+)/i)[1]);
				}
				
				//Save inventory preview
				var inventory_previews = gca_data.get('inventory_previews', ['?','?','?','?','?','?','?','?']);
				if( $dark('#inventory_nav') ){
					var invIndex=0;
					while( $dark('#inventory_nav a['+invIndex+']') ){
						if( $dark('#inventory_nav a['+invIndex+']').class().match('current') ){
							break;
						}
						invIndex++;
					}
					
					if( invIndex<=7 ){
						var inventory_html = $dark('#inv').html()+"";
						// remove cache links if they exist
						if( inventory_html.match(/(\d+)\/img\/item\//g) ){
							var cacheLink = inventory_html.match(/(\d+)\/img\/item\//g)[0];
							inventory_html = inventory_html.replace( new RegExp(cacheLink, "g") , 'img/item/');
						}
						inventory_html = inventory_html.replace(/\r\n/g,'').replace(/\n/g,'').replace(/\s+/g,' ').replace(/ onmouseover="[^"]+"/g,'').replace(/opacity\s*:\s*\d+\.*\d*\s*;/gi,'').replace(/id=/gi,'itemid=').replace(/\s*visibility\s*:\s*visible\s*;/gi,'');
						inventory_previews[invIndex] = inventory_html;
						gca_data.set('inventory_previews', inventory_previews);
					}
				}
			}

			if(mod=="inventory"){
				if(!url.match(/subsub=\d+/i)){
					var subsub = gca_data.get('merchants_tab', 0);
				}else{
					gca_data.set('merchants_tab', url.match(/subsub=(\d+)/i)[1]);
				}
			}

			if(!inv && !subsub) return;
			
			var parameters = "";
			if(inv) parameters += "&inv="+inv;
			if(subsub) parameters += "&subsub="+subsub;

			if(event.target.href){
				event.target.href += parameters;
			}else if(event.target.parentNode.href){
				event.target.parentNode.href += parameters;
			}else{
				event.target.parentNode.parentNode.href += parameters;
			}
		},false);
	},
	soundManager : function(){
		//Make the sound and make it run
		var html5audio;
		if(gca_resources.firefox_audio == null){
			html5audio = new Audio(gca_resources.getURL("sounds/alert-sound-water.ogg"));
		}else{
			//gca_resources.firefox_audio.src = gca_resources.getURL("sounds/alert-sound-water.ogg");
			html5audio = gca_resources.firefox_audio;
		}
		
		// Set if muted
		if(typeof localStorage.sounds!="undefined" && localStorage.sounds=="off"){
			html5audio.muted = true;
		}

		var time;
		//Missions
		if( $dark('#cooldown_bar_text_expedition').html().match(/\d+:\d+:\d+/) ){
			time = $dark('#cooldown_bar_text_expedition').html().match(/(\d+):(\d+):(\d+)/);
			time = parseInt(time[1])*60*60*1000 + parseInt(time[2])*60*1000 + parseInt(time[3])*1000;
			setTimeout(function(){
				//document.getElementById("audio_tag").play();
				html5audio.play();
			},time);
		}
		//Dungeon
		if( $dark('#cooldown_bar_text_dungeon').html().match(/\d+:\d+:\d+/) ){
			time = $dark('#cooldown_bar_text_dungeon').html().match(/(\d+):(\d+):(\d+)/);
			time = parseInt(time[1])*60*60*1000 + parseInt(time[2])*60*1000 + parseInt(time[3])*1000;
			setTimeout(function(){
				//document.getElementById("audio_tag").play();
				html5audio.play();
			},time);
		}
		//Arena
		if( $dark('#cooldown_bar_text_arena').html().match(/\d+:\d+:\d+/) ){
			time = $dark('#cooldown_bar_text_arena').html().match(/(\d+):(\d+):(\d+)/);
			time = parseInt(time[1])*60*60*1000 + parseInt(time[2])*60*1000 + parseInt(time[3])*1000;
			setTimeout(function(){
				//document.getElementById("audio_tag").play();
				html5audio.play();
			},time);
		}
		//Arena Turma
		if( $dark('#cooldown_bar_text_ct').html().match(/\d+:\d+:\d+/) ){
			time = $dark('#cooldown_bar_text_ct').html().match(/(\d+):(\d+):(\d+)/);
			time = parseInt(time[1])*60*60*1000 + parseInt(time[2])*60*1000 + parseInt(time[3])*1000;
			setTimeout(function(){
				//document.getElementById("audio_tag").play();
				html5audio.play();
			},time);
		}

		// Make sound button
		var soundButton = $dark('*div');
		if(html5audio.muted) soundButton.class('mute_button sound_off');
		else soundButton.class('mute_button sound_on');

		var toggleSound = function(){
			html5audio.muted = (html5audio.muted)?false:true;
			if(html5audio.muted){
				soundButton.class('mute_button sound_off');
				localStorage.sounds = "off";
			}else{
				soundButton.class('mute_button sound_on');
				html5audio.play();
				localStorage.sounds = "on";
			}
		}

		soundButton.click(toggleSound);
		soundButton.appendTo('body');

	}
}