/*
 * Addon Guild Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_section_guild = {
	guild : {
		// Inject code for guild
		inject : function(){
			//Check if player is in a guild
			this.checkData();
			
			if(gca_section.submod=="memberList"){
				if( getPage.url().match('targetGold=') ){
					//Upgrade Cost Calculator
					this.upgrade_calculator();
				}else{
					if($dark('#mainnav td[2]')){//My guild or other?
						//If player is in memberlist, update it.
						this.updateGuildMates();
						// Defence times
						this.defenceTimes();
					}else{
						this.guildAttackButtons();
					}
				}
			}else if(gca_section.submod=="admin"){
				//Search for players to invite to guild
				this.players_to_invite_to_guild();
			}else if(gca_section.submod=="adminMail"){
				//Guild Mail Interface
				( gca_options.isOn("ENABLE_GUILD_MESSAGE_INTERFACE") &&
				this.guild_mail_interface());
			}else if(gca_section.submod=="forumGladiatorius"){
				//Change Guild Image
				( gca_options.isOn("ENABLE_GUILD_IMAGES") &&
				this.changeGuildImage());
			}else if(gca_section.submod=='adminLogo'){
				//Save Guild Image
				this.saveGuildImage();
			}else if(gca_section.submod=='buildings'){
				//Upgrade Cost Calculator links in the bulding list
				this.upgrade_calculator_links();
			}else if(gca_section.submod==null){
				//Guild building titles & levels
				( gca_options.isOn("ENABLE_GUILD_NAMES_LEVELS") &&
				this.guild_building_titles_levels());
			}
		},
		players_to_invite_to_guild : function(){
			//Check if player is an admin
			if( $dark('#mainbox').html().match('mod=guild&amp;submod=adminDescription') ){
				$dark('#mainbox').addChild([
					$dark('*br'),
					$dark('*div').class('title_box').addChild([
						$dark('*div').class('title_inner').html( gca_locale.get("search_for_players") )
					]),
					$dark('*div').class('title2_box').addChild([
						$dark('*div').class('title_inner').html('\
							<p>\
								<table>\
									<tr>\
										<td><b>'+ JSON.parse($dark('#icon_level').attr('data-tooltip'))[0][0][0] +' :</b></td>\
										<td>Max <input type="number" name="from_level" style="width: 50px;"> Min <input type="number" name="to_level" style="width: 50px;"></td>\
									</tr>\
									<tr>\
										<td><b>'+gca_locale.get("guild_status")+' :</b></td>\
										<td>\
											<input type="radio" name="guild_status" value="any"> '+gca_locale.get("any")+' ,\
											<input type="radio" name="guild_status" value="in_guild"> '+gca_locale.get("in_guild")+' ,\
											<input type="radio" name="guild_status" value="no_guild" checked> '+gca_locale.get("no_guild")+'\
										</td>\
									</tr>\
									<tr>\
										<td colspan=2><input class="button2" type="button" id="search_button" value="'+gca_locale.get("search")+'"></td>\
									</tr>\
								</table>\
							</p>')
					])
				]);
				//Connect button with the code that runs
				$dark('#search_button').click(function(){gca_section_guild.guild.search_players_to_invite();})
			}
		},
		search_players_to_invite :function(){
			if(!$dark('#search_resultes')){
				$dark('#mainbox').addChild([
					$dark('*br'),
					$dark('*div').class('title_box').addChild([
						$dark('*div').class('title_inner').html( gca_locale.get("search_results") )
					]),
					$dark('*div').class('title2_box').addChild([
						$dark('*div').class('title_inner').id('search_resultes').html('<p><div style="width:479px;height: 4px;border:1px solid #371000;background:#222;margin-bottom: 3px;"><div id="percent_search_bar" style="width:0%;height: 6px;margin-top:-1px;background-image:url(img/energie_gelb.gif);"></div></div></p>')
					])
				]);
			}else{
				$dark('#search_resultes').html();
			}
			//percent_search_bar
			var search_code = function(page){
				var from_level = parseInt( document.getElementsByName("from_level")[0].value );
				var to_level = parseInt( document.getElementsByName("to_level")[0].value );

				// Ups ... reverse them
				if(from_level < to_level){
					document.getElementsByName("from_level")[0].value = to_level;
					document.getElementsByName("to_level")[0].value = from_level;

					from_level = parseInt( document.getElementsByName("from_level")[0].value );
					to_level = parseInt( document.getElementsByName("to_level")[0].value );
				}

				if(!from_level){from_level=1;}
				if(!to_level){to_level=1;}
				
				//Guild status
				if(document.getElementsByName("guild_status")[0].checked){
					var status = 'any';
				}else if(document.getElementsByName("guild_status")[1].checked){
					var status = 'in_guld';
				}else{
					var status = 'no_guild';
				}
				
				xmlHttpRequest({
					url : getPage.link({"mod":"highscore","a":page,"o":"l"}).replace(/&sh=.+/,''),
					method : "GET",
					onload : function(content){
						var players = content.match(/p=(\d+)[^>]+>([^<]+)<\/a><\/div><\/td>[^>]+>(\d+)<\/td>/g);
						var max = parseInt(players[0].match(/p=(\d+)[^>]+>([^<]+)<\/a><\/div><\/td>[^>]+>(\d+)<\/td>/)[3]);
						var min = parseInt(players[players.length-1].match(/p=(\d+)[^>]+>([^<]+)<\/a><\/div><\/td>[^>]+>(\d+)<\/td>/)[3]);
						
						if( !(to_level>=max) || !(min>=from_level) ){
							for(x = 0; x < players.length; x++){
								var id = players[x].match(/p=(\d+)[^>]+>([^<]+)<\/a><\/div><\/td>[^>]+>(\d+)<\/td>/)[1];
								var level = players[x].match(/p=(\d+)[^>]+>([^<]+)<\/a><\/div><\/td>[^>]+>(\d+)<\/td>/)[3];

								if(from_level>=level && level>=to_level){
									if(status == 'any'){
										var name = players[x].match(/p=(\d+)[^>]+>([^<]+)<\/a><\/div><\/td>[^>]+>(\d+)<\/td>/)[2];
										$dark('#search_resultes').addHtml('<a href="'+getPage.link({"mod":"player","p":id})+'" target="_blank">'+name+'</a>('+level+'), ');
									}
									else{
										xmlHttpRequest({
											url : getPage.link({"mod":"player","p":id}).replace(/sh=.+/,''),
											method : "GET",
											onload : function(content){
												if(content.match('mod=guild.i=')){
													var guild = true;
												}else{
													var guild = false;
												}
												
												if( (status=='no_guild' && guild==false) || (status=='in_guild' && guild==true) ){
													if(content.match('playername_achievement')){
														var name=content.match(/playername_achievement">([^<]+)</)[1];
													}else{
														var name=content.match(/playername">([^<]+)</)[1];
													}
													var level=content.match(/charstats_value22">([^<]+)</)[1];
													var id=content.match(/p=(\d+)/)[1];
													$dark('#search_resultes').addHtml('<a href="'+getPage.link({"mod":"player","p":id})+'" target="_blank">'+name+'</a>('+level+'), ');
												}
											}
										});
									}
								}
							}
						}
						
						if(max < to_level){
							$dark('#percent_search_bar').element.style.width='100%';
						}else{
							$dark('#percent_search_bar').element.style.width = page*5+'%';
							if(page!=20){
								search_code(page+1);
							}
						}
					}
				});
			}
			search_code(1);
		},
		guild_building_titles_levels : function(){
			$dark('#content').addChild([
				$dark('*style').html('.map_label{display:none;}')
			])
		},
		checkData : function(){
			var guild = gca_data.get('guild', {inGuild:true,mates:[]} );
			var tabs = $dark('#mainnav td').length;
			if( guild.inGuild && tabs==1 ){
				guild.inGuild = false;
				guild.mates = new Array();
				gca_data.set('guild', guild );
			}else if(!guild.inGuild && tabs>1){
				gca_dataUpdater.guild.getGuildMatesIds();
			}
		},
		updateGuildMates : function(){
			var x = $dark('#content').html();
			if( x.match(/xn=y/i) ){
				gca_dataUpdater.guild.setNoGuild();
			}else if( x.match(/index\.php\?mod=player(&|&amp;)p=\d+/i) ){
				gca_dataUpdater.guild.setTheGuild(x);
			}else{
				gca_dataUpdater.guild.getGuildMatesIds();
			}
		},
		defenceTimes : function(){
			// Launch requests
			this.defenceTimesRequest("Arena");
		},
		defenceTimesRequest : function(type){
			if(type=="Arena"){
				var link = getPage.link({"mod":"guild_warcamp","submod":"guild_member_reports"});
			}else{// Turma
				var link = getPage.link({"mod":"guild_warcamp","submod":"guild_member_reports","aType":"1"});
			}
			
			xmlHttpRequest({
				url : link,
				method : "GET",
				onload : function(content){
					// Data
					var dates=content.match(/warcamp_member_report_date">([^<]+)<\/td>/g);
					var players=content.match(/warcamp_member_report_cell">(.+)<\/td>/g);//loop Attacker,Defender,Winner
					if(type!="Arena")
						arenaResultes=type;
					var resutes=[];
					
					// Server Date
						var date = JSON.parse($dark("#server-time").attr("data-start-time"));
						// Bug fix
						if(new Date().getMonth() == date[1]-1 && new Date().getDate() == date[2]){
							date = new Date(date[0], date[1]-1, date[2], date[3], date[4], date[5], date[6]).getTime();
						}else{
							date = new Date(date[0], date[1], date[2], date[3], date[4], date[5], date[6]).getTime();
						}
						var nowServerDate = date;

					// Loop and find out times
					var i=0;
					while( dates[i] ){
						dates[i] = dates[i].match(/warcamp_member_report_date">([^<]+)<\/td>/)[1].split(', ')[1].replace('- ','').replace(/\./g,'/').replace(/(\d+)\/(\d+)\/(\d+)/i,'$2/$1/$3');
						var attackedDate = new Date(dates[i]);
						var diffMinutes = Math.floor( (nowServerDate-attackedDate)/(60*1000) );
						
						if(diffMinutes>75)
							break;
						
						if( players[i*3+1].match("color:green;") && !resutes[players[i*3+1].match(/>([^<]+)</)[1]] ){//i*3+1 = Defenders
							resutes[players[i*3+1].match(/>([^<]+)</)[1]]=diffMinutes;
						}
						i++;
					}
					
					//console.log(resutes);
					
					if(type=="Arena"){
						gca_section_guild.guild.defenceTimesRequest(resutes);
					}else{
						var j=1;
						while( $dark("#mainbox table[0] tr["+j+"] td[0] a[0]") ){
							var playerName = $dark("#mainbox table[0] tr["+j+"] td[0] a[0]").html();
							if( resutes[playerName] || arenaResultes[playerName] ){
								$dark("#mainbox table[0] tr["+j+"] td[0] a[0]").css("padding-left:5px;padding-right:5px;");
								var tooltipText="";
								if(arenaResultes[playerName]){
									tooltipText='[[[["Arena:","Attacked before '+arenaResultes[playerName]+' min"],["#BA9700","#fff"]]]]';
								}
								if(resutes[playerName]){
									tooltipText='[[[["Turma:","Attacked before '+resutes[playerName]+' min"],["#BA9700","#fff"]]]]';
								}
									
								$dark('*img').src("img/interface/shield-passive.gif").css("vertical-align: middle;").attr("data-tooltip",tooltipText).beforeFrom( $dark("#mainbox table[0] tr["+j+"] td[0] a[0]") );
							}
							j++
						}
					}
				}
			});
		},
		//Change Guild Image
		changeGuildImage : function(){
			if($dark('#mainbox').html().match(/##GTGI=([^#]+)##/)){
				var guildImage=$dark('#mainbox').html().match(/##GTGI=([^#]+)##/)[1];
				$dark('#mainbox img[0]').src(guildImage).css('width: 209px;height: 232px;').parent().addChild(
					$dark('*div').class('guild_flag_border')
				);
			}
		},
		//Save Guild Image
		saveGuildImage : function(){
			var saveFunction= function(){
				var description = $dark('#guild_description').html();
				var guildImage = $dark('#image_link').value();
				var save = $dark('#image_button').value();
				$dark('#image_button').value( gca_locale.get('loading') );
				if(description!='ERROR'){
					description = description+'[f c=#DED2AD][f s=10]##GTGI='+guildImage+'##[/f][/f]';
					xmlHttpRequest({
						url : getPage.link({"mod":"guild","submod":"adminDescriptionEdit"}),
						method : "POST",
						data: 'fontsize=none&fontface=none&description='+encodeURIComponent(description)+'&save='+encodeURIComponent(save),
						onload : function(content){
							if(content.match('##GTGI='+guildImage+'##')){
								gca_notifications.success( gca_locale.get("image_was_saved") );
								if(guildImage==''){
									$dark('.guild_flag_border[0]').remove();
									$dark('#mainbox img[0]').remove();
								}else{
									if(!$dark('#mainbox img[1]')){
										$dark('*img').beforeFrom($dark('#mainbox img[0]'));
										$dark('#mainbox img[0]').parent().addChild(
											$dark('*div').class('guild_flag_border guild_flag_border_change_flag')
										);
									}
									$dark('#mainbox img[0]').src(guildImage).css('width: 209px;height: 232px;padding: 2px;');
								}
							}else{
								gca_notifications.error( gca_locale.get("error") );
							}
							$dark('#image_button').value( save );
						},
						onerror: function(xml){
							_alert('Error (During request)');
							$dark('#image_button').value( save );
						}
					});
				}else{
					_alert('Error (No description)');
				}
			};
			
			$dark('#mainbox table[0]').addChild([
				$dark('*tr').addChild(
					$dark('*th').html('Guild Image Link:')
				),
				$dark('*tr').addChild(
					$dark('*th').addChild([
						$dark('*textarea').id('guild_description').type('text').css('display:none;').html('ERROR'),
						$dark('*input').id('image_link').type('text').css('width:70%;').value( gca_locale.get('loading')+'...' ),
						$dark('*input').id('image_button').type('button').class('button2').value('').css('margin-left: 10px;margin-right: 10px;').click( saveFunction )
					])
				)
			])
			
			//Take Guild Description
			xmlHttpRequest({
				url : getPage.link({"mod":"guild","submod":"adminDescription"}),
				method : "GET",
				onload : function(content){
					var doc = $dark('*div').html(content).element;
					var guildImage='';
					var description=$dark('textarea[0]',doc).html();
					if(description.match(/##GTGI=([^#]+)##/)){
						guildImage=description.match(/##GTGI=([^#]+)##/)[1];
						description=description.replace('[f c=#DED2AD][f s=10]##GTGI='+guildImage+'##[/f][/f]','');
					}
					$dark('#image_link').value(guildImage);
					$dark('#image_button').value($dark('input[1]',doc).value());
					$dark('#guild_description').html(description);
					$dark('#mainbox img[0]').css('padding: 2px;');
					$dark('*img').beforeFrom($dark('#mainbox img[0]'));
					if(guildImage!=''){
						$dark('#mainbox img[0]').src(guildImage).css('width: 209px;height: 232px;padding: 2px;').parent().addChild(
							$dark('*div').class('guild_flag_border guild_flag_border_change_flag')
						);
					}
				}
			});
		},
		//Guild Mail Interface
		guild_mail_interface : function(){
			if(document.getElementById('content').getElementsByTagName('input')[2]){
				$dark('*span').id('ToolBar').css("display:none;").beforeFrom($dark('#message'));
				$dark('#mainbox').class('guild_mail');
				$dark('#mainbox textarea[0]').delAttr('style');
				
				var bbCode = new Array(
					['[b]','[/b]','Bold selected text'],
					['[i]','[/i]','Italic selected text'],
					['[u]','[/u]','Underline selected text'],
					['[s]','[/s]','Strike though selected text'],
					['[center]','[/center]','Put selected text at the center'],
					['[url]','[/url]','Selected text is a link'],
					['[img]','[/img]','Selected text is an image'],
					['[email]','[/email]','Selected text is an email'],
					['[ytvideo]','[/ytvideo]','Selected text is a video'],
					['[code]','[/code]','Selected text is code'],
					['[quote]','[/quote]','Selected text is quoted text'],
					['╔═════════════════════════════════╗\\n\\n','\\n\\n╚═════════════════════════════════╝','Selected text will be a Guild Announcement'] // leave always last
				);
				
				var smiles = new Array(
					['smile',':)'],
					['sad',':('],
					['biggrin',':D'],
					['wink',';)'],
					['w00t','8o'],
					['unsure',':S'],
					['tongue',':P'],
					['squint','^^'],
					['mellow',':|'],
					['crying',';('],
					['cool','8)'],
					['confused','?('],
					['blink','8|']
				);
				
				$dark('#ToolBar').html('\
				<div class="subTabMenu" width="400px">\
					<div class="containerHead">\
						<div class="mceToolbar" id="mce_editor_0_toolBar">\
							<ul>\
								<li>\
									<div title="Open smileys bar" class="bbcode_button_smiles" onclick="if(document.getElementById(\'smiles\').style.display==\'none\'){document.getElementById(\'smiles\').style.display=\'block\';}else{document.getElementById(\'smiles\').style.display=\'none\';}"></div>\
								</li>\
							</ul>\
							<br/>\
							<ul style="display:none;margin-top:3px;" id="smiles">\
							<ul>\
						</div>\
					</div>\
				</div>');
				
				for(i=0; i<bbCode.length-1; i++){
					$dark('#mce_editor_0_toolBar ul[0] li[0]').addChild([
						$dark('*div').class('bbcode_button_'+bbCode[i][0].replace(/\[|\]/g,'')).title(bbCode[i][2]).attr("onclick","var textArea = $(\'message\');var startTag = \'"+bbCode[i][0]+"\';var closeTag = \'"+bbCode[i][1]+"\';var pos = textArea.getSelectedRange();var text = textArea.get(\'value\');var selectedText = textArea.getSelectedText();textArea.set(\'value\', text.substring(0, pos.start) + startTag + selectedText + closeTag + text.substring(pos.end, text.length));textArea.setCaretPosition(textArea.get(\'value\').length-text.substring(pos.end, text.length).length);")
					]);
				}
				
				$dark('#mce_editor_0_toolBar ul[0] li[0]').addChild([
					$dark('*div').class('bbcode_button_announcement').title(bbCode[bbCode.length-1][2]).attr("onclick","var textArea = $(\'message\');var startTag = \'"+bbCode[bbCode.length-1][0]+"\';var closeTag = \'"+bbCode[bbCode.length-1][1]+"\';var text = textArea.get(\'value\');textArea.set(\'value\', startTag + text + closeTag);")
				]);
				
				for(i=0; i<smiles.length; i++){
					$dark('#mce_editor_0_toolBar ul[1]').addChild([
						$dark('*li').addChild([
							$dark('*div').class('bbcode_emoticons_'+ smiles[i][0].replace(/\[|\]/g,'') ).title(smiles[i][0]).attr("onclick","var textArea = $(\'message\');var pos = textArea.getSelectedRange();var text = textArea.get(\'value\');textArea.set(\'value\', text.substring(0, pos.start) + \' "+smiles[i][1]+" \' + text.substring(pos.end, text.length));textArea.setCaretPosition(textArea.get(\'value\').length-text.substring(pos.end, text.length).length);")
						])
					]);
				}			
				
				$dark('*div').id("buttons").html('<input type="checkbox" id="Check_All" checked="checked" > <label for="Check_All">'+gca_locale.get('check_all')+'</label>').afterFrom("#quickFilter");
				
				if($dark('#mainbox tr[0]')){
					var isAdmin=false;
					var num=$dark('#mainbox tr').length;
					var changeThemToo='';
					gca_data.set('guild_master_translation', $dark('#mainbox tr[2] td[2]').html());
					var guildClass=-1;// <=1 for Master + Admins
					for(i=1;i<num;i++){
						var prevTd=$dark('#mainbox tr['+(i-1)+'] td[2]').html();
						var thisTd=$dark('#mainbox tr['+i+'] td[2]').html();
						if(thisTd!=prevTd){
							$dark('#buttons').addHtml(' | <input type="checkbox" id="'+thisTd+'" checked="checked"><label for="'+thisTd+'">'+thisTd+'</label>');
							$dark('#'+thisTd).attr('onclick',"var countTheChecked=0;for(i=1;i<"+num+";i++){if(document.getElementById('mainbox').getElementsByTagName('tr')[i].getElementsByTagName('td')[2].innerHTML==this.getAttribute('id')){document.getElementById('mainbox').getElementsByTagName('tr')[i].getElementsByTagName('td')[0].getElementsByTagName('input')[0].checked=this.checked;}if(document.getElementById('mainbox').getElementsByTagName('tr')[i].getElementsByTagName('td')[0].getElementsByTagName('input')[0].checked){countTheChecked=countTheChecked+1;}}countTheChecked=countTheChecked+2;if(countTheChecked!="+num+"){document.getElementById('Check_All').checked=false;}else{document.getElementById('Check_All').checked=true;}");
							changeThemToo+="document.getElementById('"+thisTd+"').checked=this.checked;"
							guildClass++;
						}
						
						if( guildClass<=1 && !isAdmin && $dark('#mainbox tr['+i+'] td[1] a[0]').html().trim()==gca_data.get('playerName', null) ) isAdmin=true;
					}
					$dark('#Check_All').attr('onclick',"for(i=1;i<"+num+";i++){document.getElementById('mainbox').getElementsByTagName('tr')[i].getElementsByTagName('td')[0].getElementsByTagName('input')[0].checked=this.checked;}"+changeThemToo);
					
					for(i=1; i<num; i++){
						document.getElementById('mainbox').getElementsByTagName('tr')[i].getElementsByTagName('td')[0].getElementsByTagName('input')[0].checked = "checked";
					}

					if(!isAdmin){
						$dark('.bbcode_button_announcement[0]').css('display:none;');
					}
				}
				
				//$dark('#content form[0]').attr('onSubmit','if(document.getElementById(\'content\').getElementById(\'message\').value!=\'\'){document.getElementById(\'content\').getElementById(\'message\').value=\'­\'+document.getElementById(\'content\').getElementById(\'message\').value.replace(/ /g,\'	\');}');
			}
		},
		//Upgrade Cost Calculator Links in the guild bulding list
		upgrade_calculator_links : function(){
			if($dark('#mainbox')){
				if($dark('#mainbox div[3]').html().match(/<\/b> ([^<]+) <img/i)){
					var guildGold=parseInt( $dark('#mainbox div[3]').html().replace(/\./gi,'').match(/<\/b> ([^<]+) <img/i)[1] );
					for (var i=0;i<=10;i++){
						if( $dark('#mainbox table['+i+']') ){
							var targetGold=parseInt( $dark('#mainbox table['+i+'] td[2]').html().replace(/\./gi,'').match(/gold.>([^<]+)<img/i)[1]);
							var link=getPage.link({"mod":"guild","submod":"memberList","i":"0","targetGold":targetGold,"guildGold":guildGold});
							$dark('#guild_build_description_'+i).addChild([
								$dark('*a').attr('href',link).addChild([
									$dark('*input').class('button1 upgrade_calculator_link_button').attr('type','button').value( gca_locale.get('calculate_cost') )
								])
							]);
						}
					}
				}
			}
		},
		//Upgrade Cost Calculator
		upgrade_calculator : function(){
			var targetGold=getPage.url().match(/targetGold=(\d+)/i)[1];
			var guildGold=getPage.url().match(/guildGold=(\d+)/i)[1];
			$dark('#mainnav td[0]').element.style.display='none';
			$dark('#mainnav td[1]').html('<a class="awesome-tabs current">'+gca_locale.get("calculate")+'</a>');
			$dark('#mainnav td[2]').element.style.display='none';
			$dark('#mainnav td[3]').element.style.display='none';
			$dark('#mainbox div[1]').html( gca_locale.get('calculate_guild_upgrade') );
			$dark('#mainbox tr[0] td[0]').html('<b>'+$dark('#mainbox tr[0] td[0] a[0]').html()+'</b>');
			$dark('#mainbox tr[0] td[1]').html('<b>'+gca_locale.get('include')+'</b>');
			$dark('#mainbox tr[0] td[2]').html('<b>'+$dark('#mainbox tr[0] td[2] a[0]').html()+'</b>');
			$dark('#mainbox tr[0] td[3]').html('<b>'+gca_locale.get('custom_amount')+'</b>');
			$dark('#mainbox tr[0] td[4]').html('<b>'+gca_locale.get('gold_per_player')+'</b>');
			$dark('#mainbox tr[0] td[5]').element.style.display='none';

			var trs=$dark('#mainbox tr').length;
			$dark('#mainbox tr['+ (trs-1) +']').element.style.display='none';
			$dark('#mainbox tr['+ (trs-2) +']').html('');
			$dark('#mainbox tr['+ (trs-2) +']').addChild([
				$dark('*td').attr('colspan',3).addChild([
					$dark('*table').addChild([
						$dark('*tr').addChild([
							$dark('*td').html( gca_locale.get('target_gold')+':'),
							$dark('*td').html('<b><font id="targetGold">'+subFuncts.strings.insertDots(targetGold)+'</font></b> <img align="absmiddle" border="0" src="img/res2.gif">'),
							$dark('*td').html('')
						]),
						$dark('*tr').addChild([
							$dark('*td').html( gca_locale.get('gold_in_bank')+':'),
							$dark('*td').html('<b id="bank_gold">'+subFuncts.strings.insertDots(guildGold)+'</b> <img align="absmiddle" border="0" src="img/res2.gif">'),
							$dark('*td').html('<input id="check_calculate_bank" type="checkbox" checked="checked"> <!--(not Calculated)-->')
						]),
						$dark('*tr').addChild([
							$dark('*td').html( gca_locale.get('enable_multiplier')+':'),
							$dark('*td').html('<input id="check_multiplier" type="checkbox" checked="checked">'),
							$dark('*td').html('')
						])
					])
				]),
				$dark('*td').attr('colspan',2).css('padding-top: 10px;').addChild([
					$dark('*table').addChild([
						$dark('*tr').addChild([
							$dark('*td').html( gca_locale.get('difference')+':' ),
							$dark('*td').html('<b id="result">~</b>')
						]),
						$dark('*tr').addChild([
							$dark('*td').html( gca_locale.get('round_up')+':'),
							$dark('*td').html('<input id="round_up_calculate_bank" type="checkbox">')
						]),
						$dark('*tr').addChild([
							$dark('*td').html( gca_locale.get('round_to')+':'),
							$dark('*td').html('<select id="round_to_calculate_bank"><option value="1">1</option><option value="10">10</option><option value="100">100</option><option value="1000">1.000</option><option value="10000">10.000</option><option value="100000">100.000</option><option value="1000000">1.000.000</option></select>')
						])
					])
				])
			]);
			
			for (var i=1;i<=(trs-3);i++){
				$dark('#mainbox tr['+i+'] td[1]').html('<input id="pls_ckeck_'+i+'" type="checkbox" checked="checked"> x <input id="multilier_'+i+'" type="int" value="1" maxlength="3" style="width: 25px;" title="'+gca_locale.get('multiplier')+'">');
				$dark('#mainbox tr['+i+'] td[3]').html('<input id="pls_input_'+i+'" type="int" size="8" maxlength="9" value="0"> <img class="guild_upgrade_gold_to_custom_img" src="img/ui/pagination/left_full.jpg" align="absmiddle" onclick="document.getElementById(\'pls_input_'+i+'\').value=parseInt(document.getElementById(\'mainbox\').getElementsByTagName(\'tr\')['+i+'].getElementsByTagName(\'td\')[4].innerHTML.replace(/\\./gi,\'\'))"> <!--<div class="clear_button guild_upgrade_clear_button" title="'+gca_locale.get("clear")+'" onclick="document.getElementById(\'pls_input_'+i+'\').value=0;"></div>-->');
				$dark('#mainbox tr['+i+'] td[4]').html(' ~ ');
			
			}
			
			$dark('#mainbox .title2_box[0] .title2_inner[0]').addChild([
				$dark('*input').class('button2 upgrade_calculator_button').id('calculate').attr('type','button').value( gca_locale.get("calculate") ),
				$dark('*input').class('button1 upgrade_calculator_button').id('to_string').attr('type','button').value( gca_locale.get('results_to_text') )
			]);
			
			$dark('#calculate').click( function(){gca_section_guild.guild.upgrade_calculator_calculation_process();} );
			$dark('#to_string').click( function(){gca_section_guild.guild.upgrade_calculator_to_string();} );
			this.upgrade_calculator_calculation_process();
		},
		//Upgrade Cost Calculator
		upgrade_calculator_calculation_process : function(){
			var targetGold = parseInt($dark('#targetGold').html().replace(/\./gi,''));
			var Gold = targetGold;
			var totalLevel = 0;
			var trs = $dark('#mainbox tr').length;
			var i=1;
			while( $dark('#pls_ckeck_'+i) ){
				if( $dark('#pls_ckeck_'+i).element.checked==true){
					if( $dark('#pls_input_'+i).value()==0 || $dark('#pls_input_'+i).value()==''){
						//level
						var level = ( $dark('#check_multiplier').element.checked==true )?(parseInt($dark('#mainbox tr['+i+'] td[2]').html())*parseInt($dark('#multilier_'+i).value())):parseInt( $dark('#mainbox tr['+i+'] td[2]').html() );
						totalLevel += level;
					}else{
						//fixed gold
						Gold -= parseInt( $dark('#pls_input_'+i).value() );
					}
				}
				i++;
			}
			
			var futureGatheredGold = 0;
			if( $dark('#check_calculate_bank').element.checked==true){
				Gold -= parseInt( $dark('#bank_gold').html().replace(/\./gi,'') );
				futureGatheredGold += parseInt( $dark('#bank_gold').html().replace(/\./gi,'') );
			}
			
			if(Gold<0){Gold=0;}
			var goldPerLevel = Gold/totalLevel;
			i=1;
			while( $dark('#pls_ckeck_'+i) ){
				$dark('#mainbox tr['+i+'] td[5]').element.style.display='none';
				if( $dark('#pls_ckeck_'+i).element.checked==true){
					if( $dark('#pls_input_'+i).value()==0 || $dark('#pls_input_'+i).value()==''){
						var level = ( $dark('#check_multiplier').element.checked==true )?(parseInt($dark('#mainbox tr['+i+'] td[2]').html())*parseInt($dark('#multilier_'+i).value())):parseInt( $dark('#mainbox tr['+i+'] td[2]').html() );
						var playerGold =  level*goldPerLevel;
						if( $dark('#round_up_calculate_bank').element.checked==true ){
							var round_to = $dark('#round_to_calculate_bank').value();
							playerGold = Math.ceil( playerGold/round_to )*round_to;
						}else{
							var round_to = $dark('#round_to_calculate_bank').value();
							playerGold = Math.round( playerGold/round_to )*round_to;
						}
					}else{
						//fixedGold
						var playerGold = parseInt(document.getElementById('pls_input_'+i).value);
					}
					futureGatheredGold += playerGold;
					$dark('#mainbox tr['+i+'] td[4]').html( subFuncts.strings.insertDots(playerGold)+' <img align="absmiddle" border="0" src="img/res2.gif">' );
					$dark('#mainbox tr['+i+']').css('opacity: 1;');
				}else{
					$dark('#pls_input_'+i).value(0);
					$dark('#mainbox tr['+i+'] td[4]').html(' ~ ');
					$dark('#mainbox tr['+i+']').css('opacity: 0.5;');
				}
				i++;
			}
			var result = futureGatheredGold-targetGold;
			if(result<0){
				$dark('#result').html('<font color="red">'+subFuncts.strings.insertDots(result)+'</font> <img align="absmiddle" border="0" src="img/res2.gif">');
			}else{
				$dark('#result').html('<font color="green">+'+subFuncts.strings.insertDots(result)+'</font> <img align="absmiddle" border="0" src="img/res2.gif">');
			}
		},
		upgrade_calculator_to_string : function(){
			var text = 'Select all: Ctr+A\nCopy: Ctr+C\n\n';
			var i=1;
			while( $dark('#pls_ckeck_'+i) ){
				//Name
				text += $dark('#mainbox tr['+i+'] td[0] a[0]').html();
				if( $dark('#pls_ckeck_'+i).element.checked==true){
					if( $dark('#pls_input_'+i).value()==0 || $dark('#pls_input_'+i).value()==''){
						text += ' : '+subFuncts.strings.insertDots( parseInt( $dark('#mainbox tr['+i+'] td[4]').html().replace(/\./gi,'') ) );
					}else{
						text += ' : '+subFuncts.strings.insertDots( parseInt( document.getElementById('pls_input_'+i).value ) );
					}
				}else{
					text += ' : 0';
				}
				text += '\n';
				i++;
			}
			text += '\nCalculated using Gladiatus Crazy Addon';
			alert(text);
		},
		guildAttackButtons : function(){
			$dark('#mainbox .title2_inner[0] tr[0]').addChild([
				$dark('*td').html('Attack')
			]);

			var x=1;
			var temp_id;
			while($dark('#mainbox .title2_inner[0] tr['+x+']')){
				temp_id=$dark('#mainbox .title2_inner[0] tr['+x+']').html().match(/p=(\d+)/i)[1];
				$dark('#mainbox .title2_inner[0] tr['+x+']').addChild([
					$dark('*td').addChild([
						$dark('*img').src('img/ui/icon_arena.gif').css('height:16px;cursor:pointer;').attr('onclick',"sendRequest('get', 'ajax/doArenaFight.php', 'did="+temp_id+"');"),
						$dark('*img').src('img/ui/icon_grouparena.gif').css('height:16px;cursor:pointer;').attr('onclick',"sendRequest('get', 'ajax/doGroupFight.php', 'did="+temp_id+"');")
					])
				]);
				x++;
			}
		}
	},
	jail : {
		inject : function(){
			//On guild jail, check if there is content
			if( gca_options.isOn("ENABLE_GUILD_JAIL_INTERFACE") && gca_section.submod==null && $dark('#content p[1]') )
				this.betterJail();
		},
		//Jail Boss Database
		jail_dataBase : {
			"10" : { name : "King Gustavo", image : "img/npc/0/2_1.jpg"},
			"15" : { name : "Flavio Gnaeus Aurelius", image : "img/npc/0/2_13.jpg"},
			"20" : { name : "Oribas", image : "img/npc/2/1_21.jpg"},
			"25" : { name : "Helldog", image : "img/npc/0/2_7.jpg"},
			"30" : { name : "Themba", image : "img/npc/1/2_3.jpg"},
			"35" : { name : "Shetu",  image : "img/npc/1/2_14.jpg"},
			"40" : { name : "Pyro", image : "img/npc/1/2_1.jpg"},
			"45" : { name : "Nithotep", image : "img/npc/1/2_6.jpg"},
			"50" : { name : "Lord Aesteron", image : "img/npc/0/2_8.jpg"},
			"55" : { name : "Oak Lord", image : "img/npc/2/2_4.jpg"},
			"60" : { name : "Homo Nautilus", image : "img/npc/0/2_4.jpg"},
			"70" : { name : "Nekromar", image : "img/npc/0/2_5.jpg"},
			"73" : { name : "Trakovar", image : "img/npc/0/2_14.jpg"},
			"78" : { name : "Captian Kratos", image : "img/npc/0/2_12.jpg"},
			"80" : { name : "Gernasch", image : "img/npc/0/2_2.jpg"},
			"83" : { name : "Fenrirson", image : "img/npc/0/2_15.jpg"},
			"88" : { name : "Zagrash", image : "img/npc/0/2_6.jpg"},
			"90" : {
				"Papa" : {name : "Papa Sasama", image : "img/npc/1/2_2.jpg"},
				"Frank" : {name : "Frank N. Stein", image : "img/npc/2/2_3.jpg"}
			},
			"96" : { name : "Shetu bin Seth", image : "img/npc/1/2_16.jpg"},
			"100" : { name : "Corruption", image : "img/npc/1/2_8.jpg"},
			"102" : { name : "Akhekhu", image : "img/npc/1/2_9.jpg"},
			"112" : { name : "Wrath Mountain", image : "img/npc/2/2_5.jpg"},
			"122" : { name : "Valerius Filius Gustavo", image : "img/npc/2/2_8.jpg"},
			"130" : { name : "Dracolich", image : "img/npc/2/1_32.jpg"}
		},
		//Improve Jail Layout
		betterJail : function(){

			// Get Jail's cells number
			var jailCells = $dark('#content p[1]').html().match(/\d+/i);

			// Set an array for the prisoners
			var prisoners = new Array();

			//Count prisoners' rows
			var jailTableRows = $dark('#content table[0] tr').length;
			
			// If you have the rights to free monsters
			var admin = ( $dark('#content table[0] tr['+1+'] td[3] a[1]') )?true:false;
			if(!admin) $dark('#content').addClass('noJailRights');
			// For every prisoner row
			for(var i=1;i<jailTableRows;i++){
				//Get prisoner's info
				var name = $dark().trim($dark('#content table[0] tr['+i+'] td[0]').text());
				var lvl = parseInt($dark('#content table[0] tr['+i+'] td[1]').text().match(/\d+/i));
				var number = $dark('#content table[0] tr['+i+'] td[2]').text().match(/\d+/i);

				//Store info on a json object
				var info = {
					"name" : name,
					"lvl" : lvl,
					"img" : "img/expedition/enemy_unknown.jpg",
					"attack_code" :  $dark('#content table[0] tr['+i+'] td[3] a[0]').attr('onclick'),
					"attack" :  $dark('#content table[0] tr['+i+'] td[3] a[0]').text(),
					"free_link" : "#",
					"free" : "-"
				};

				// If you can free monsters
				if(admin){
					info["free_link"] = $dark('#content table[0] tr['+i+'] td[3] a[1]').href();
					info["free"] = $dark('#content table[0] tr['+i+'] td[3] a[1]').text();
				}

				//Update info using the database
				//If matching data, updata
				if(this.jail_dataBase[lvl] && this.jail_dataBase[lvl].name){
					//Update prioner image
					info['img'] = this.jail_dataBase[lvl].image;
				//If data have many prisoners
				}else if(this.jail_dataBase[lvl]){
					//Try to find the prisoner based on his name
					for(var label in this.jail_dataBase[lvl]){
						//if name match
						if( name.indexOf(label)>=0 ){
							//Update prioner image
							info['img'] = this.jail_dataBase[lvl][label].image;
						}
					}
				}
				//Insert prisoners of the row in the array
				for(var j=0;j<number;j++){
					prisoners.push(info);
				}
			}
			
			var swapped;
			do{
				swapped = false;
				for (var i=0; i < prisoners.length-1; i++) {
					if (prisoners[i].lvl > prisoners[i+1].lvl) {
						var temp = prisoners[i];
						prisoners[i] = prisoners[i+1];
						prisoners[i+1] = temp;
						swapped = true;
					}
				}
			}while(swapped);

			// Jaild Wrapper
			var jail_wrapper = $dark('*div').css("margin-top:10px;").appendTo('#content');
			
			// Built prisoners' cells
			for(var i=0;i<prisoners.length;i++){
				$dark('*div').class('expedition_box').css("margin: 16px 4px 0px 4px;").addChild([
					$dark('*div').addChild([
						//prisoner name
						$dark('*div').class('expedition_name').text(prisoners[i].name),
						$dark('*div').class('expedition_picture').attr('onmouseover',"return escape('<table cellspacing=2 cellpadding=2 valign=middle class=\\'tooltipBox\\'><tr><td style=\\'color:white; font-weight: bold; font-size:9pt\\' colspan=\\'2\\' nowrap=\\'nowrap\\'>"+prisoners[i].name+"</td></tr></table>')").addChild([
							//prisoner image
							$dark('*img').src(prisoners[i].img).css('background-color:black;width:123px;height:142px;'),
							$dark('*div').class('jail_picture_cell pngfic')
						]),
						$dark('*div').class('jail_level_number ').style('background-image: url(img/premium/box/amount.png);background-size: contain;').attr('onmouseover',"return escape('<table cellspacing=2 cellpadding=2 valign=middle class=\\'tooltipBox\\'><tr><td style=\\'color:white; font-weight: bold; font-size:9pt\\' colspan=\\'2\\' nowrap=\\'nowrap\\'>Level "+prisoners[i].lvl+"</td></tr></table>')").text(prisoners[i].lvl)
					]),
					$dark('*div').addChild([
						//prisoner action codes
						$dark('*button').type('button').css('margin-top:5px;').attr('onclick', prisoners[i].attack_code).class('expedition_button').text(prisoners[i].attack),
						$dark('*a').href(prisoners[i].free_link).css(((admin)?"":"display:none;")).addChild([
							$dark('*button').type('button').css('margin-top:5px;').class('expedition_button').text(prisoners[i].free)
						])
					])
				]).appendTo(jail_wrapper);
			}


			// Hide old prisoners layout
			$dark('#content article[0]').hide();

			// Calculate empty cells
			jailCells -= prisoners.length;

			// Built empty cells
			for(var i=0;i<jailCells;i++){
				$dark('*div').class('expedition_box').css("margin: 16px 4px 0px 4px;").addChild([
					$dark('*div').addChild([
						$dark('*div').class('expedition_name').text('-'),
						$dark('*div').class('expedition_picture').addChild([
							$dark('*img').src('img/costumes/background.jpg').css('background-color:black;width:123px;height:142px;'),
							$dark('*div').class('jail_picture_cell pngfic')
						])
					]),
					$dark('*div').addChild([
						$dark('*button').type('button').css('margin-top:5px;').class('expedition_button_disabled').attr('disabled','disabled').text("-"),
						$dark('*button').type('button').css('margin-top:5px;'+((admin)?"":"display:none;")).class('expedition_button_disabled').attr('disabled','disabled').text("-")
					])
				]).appendTo(jail_wrapper);
			}
		}
	},
	library : {
		inject : function(){
			//Check if there is content
			if(gca_section.submod==null){
				if( gca_options.isOn("ENABLE_GUILD_LIBRARY_INTERFACE") && $dark('#content table[0]') )
					this.betterLibrary();
			}
		},
		//Improve Library Layout
		betterLibrary : function(){
			//Better Store Buffs Interface
			for(i=0;i<32;i++){
				if($dark('#inv div['+i+'] img[0]')){
					if(!$dark('#inv div['+i+'] img[0]').attr('src').match(/item\/13_\d+\.gif/i)){
						$dark('#inv div['+i+'] img[0]').attr('style','opacity:0.30;');
					}
				}
			}
			
			//Better Enable Buffs Interface
			var gold_in_guild_bank = $dark('#content .section-header[2] .span_right[0]').html().replace(/\./gi,'');

			// Variables
			var id;var gold;var time;var buff;var level;var gold_dif;var temp_tootlip;
			
			var x=1;
			while($dark('#content section[0] tr['+x+']')){
				//Gather Values
				temp_tootlip=$dark('#content section[0] tr['+x+'] div[0] div[0]').attr('data-tooltip');
				level=temp_tootlip.match(/ (\d+) /i)[1];
				time=$dark('#content section[0] tr['+x+'] td[2]').html();
				buff=temp_tootlip.match(/(\+\d+)/i)[1];
				gold=$dark('#content section[0] tr['+x+'] td[1]').html().replace(/\./gi,'');
				
				//Change Borders and Style
				$dark('#content section[0] table[0]').attr('cellspacing','1').attr('cellpadding','1');
				$dark('#content section[0] tr['+x+'] td[1]').class('dotted_bottom_border');
				$dark('#content section[0] tr['+x+'] td[2]').class('dotted_bottom_border');
				$dark('#content section[0] tr['+x+'] td[3]').class('dotted_bottom_border');
				$dark('#content section[0] tr['+x+'] td[4]').attr('style','width:80px;text-align:center;');
				
				//Display Levels
				$dark('#content section[0] tr['+x+'] div[0]').addChild([$dark('*div').class('library_level_number').style('background-image: url(img/premium/box/amount.png);background-size: contain;').text(level)]);
				
				//Change Buttons
				if($dark('#content section[0] tr['+x+'] td[4] input[0]').attr('disabled')=='disabled'){
					$dark('#content section[0] tr['+x+'] td[4] input[0]').class('library_button_disabled').value('').style('');
					//Transparent what you can't enable
					$dark('#content section[0] tr['+x+']').attr('style','opacity:0.5;');
				}else{$dark('#content section[0] tr['+x+'] td[4] input[0]').class('library_button_enable').value('').style('');}
				$dark('#content section[0] tr['+x+'] td[4] input[1]').class('library_button_delete').value('').style('');
				
				//Display each Buff
				$dark('#content section[0] tr['+x+'] td[2]').html(buff+'<br/><font style="font-size:10px;color:#666;">('+time+')</font>');
				
				//Gold left in guild bank tolltip
				gold_dif=parseInt(gold_in_guild_bank)-parseInt(gold);
				if(gold_dif>=0){
					gold_dif=gca_locale.get("gold_after_enable")+': '+subFuncts.strings.insertDots(gold_dif)+' <img src="img/res2d.gif" align="absmiddle" border="0">';
					$dark('#content section[0] tr['+x+'] td[1]').attr('onmouseover',"return escape('<table cellspacing=2 cellpadding=2 valign=middle class=\\'tooltipBox\\'><tr><td style=\\'color:white; font-weight: bold; font-size:9pt\\' colspan=\\'2\\' nowrap=\\'nowrap\\'>"+gold_dif+"</td></tr></table>')");
				}
				
				//Gold per point tolltip
				gold_dif=Math.round(parseInt(gold)/parseInt(buff.match(/(\d+)/)[1]));
				gold_dif=subFuncts.strings.insertDots(gold_dif)+' <img src="img/res2d.gif" align="absmiddle" border="0"> '+gca_locale.get("per_point");
				$dark('#content section[0] tr['+x+'] td[2]').attr('onmouseover',"return escape('<table cellspacing=2 cellpadding=2 valign=middle class=\\'tooltipBox\\'><tr><td style=\\'color:white; font-weight: bold; font-size:9pt\\' colspan=\\'2\\' nowrap=\\'nowrap\\'>"+gold_dif+"</td></tr></table>')");
				
				x++;
			}
			//End of library improvement
		}
	},
	bank : {
		inject : function(){
			if(gca_section.submod==null || gca_section.submod=='donate'){
				//Check if there is content
				if( gca_options.isOn("ENABLE_GUILD_BANK_INTERFACE") && $dark('#content .buildingDesc[0]') )
					this.betterBank();
			}else if(gca_section.submod=="showDonationLog"){
				if( gca_options.isOn("ENABLE_GUILD_BANKBOOK_INTERFACE") && $dark('#content table[0]'))
					this.betterBankBook();
			}
		},
		//Improve Bank
		betterBank : function(){
			//Gather gold values
			var guild_gold=$dark('#content th[1]').html().replace(/\./g,'').match(/(\d+)/)[1];
			var gold_in_bank=$dark('#content th[3]').html().replace(/\./g,'').match(/(\d+)/)[1];
			var my_gold=$dark('#sstat_gold_val').html().replace(/\./g,'');
			
			//Counting style
			$dark('#content th[3]').html('- '+$dark('#content th[3]').html());
			$dark('#content tbody[0]').addChild([$dark('*tr').html('<th></th><th class="count_line">= '+subFuncts.strings.insertDots(guild_gold-gold_in_bank)+' <img src="img/res2.gif" align="absmiddle" border="0"></th>')]);
			
			//From 'text' type input to 'number'
			$dark('#content form[0] input[0]').type('number').delAttr('size').delAttr('maxlength').class('donate_input');
			
			//Donate All button
			$dark('#content form[0] tr[2] th[0]').addChild([
				$dark('*input').type('button').value( gca_locale.get("add_all_gold") ).class('button1 donate_all_button').attr('onclick','document.getElementsByTagName("form")[0].getElementsByTagName("input")[0].value='+my_gold+';')
			]);
		},
		//Improve Bank Book
		betterBankBook : function(){
			//Hide ex-guild member's donations & calculate total money
			$dark('#content').addChild([ $dark('*style').id('NoGuildPlayersStyle').html('.notInGuild {display:none;}') ]);
			var num=$dark('#content table[0] tr').length;
			var sum=0;
			var temp='';
			for(i=1;i<num;i++){
				temp=$dark('#content table[0] tr['+i+'] td[2]').html().replace(/\./g,'');
				sum=sum+parseInt(temp);
				if($dark('#content table[0] tr['+i+'] td[1]').html()=='-'){
					$dark('#content table[0] tr['+i+']').attr('class','notInGuild');
					if(!$dark('#ShowNoGuildPlayersButton')){
						var value=$dark('#content table[0] tr['+i+'] td[0]').html();
						$dark('#content tbody[0]').addChild([
							$dark('*tr').id('ShowNoGuildPlayersButton').attr('colspan', '4').html('<td><input type="button" class="button2" value="'+value+'" onclick="this.style.display=\'none\';document.getElementById(\'NoGuildPlayersStyle\').innerHTML=\'.notInGuild {display:inherited;}\'"></td>')
						]);
					}
				}
			}
			
			//Total money
			$dark('#content div[2]').addHtml(' <font style="float:right;padding-right:10px;">('+gca_locale.get("total")+': '+subFuncts.strings.insertDots(sum)+' <img src="img/res2.gif" align="absmiddle" border="0">)</font>');
			
			//Donated percent amount
			var hisMoney=0;
			var percent=0;
			var othersPerCent=100;
			var name='';
			for(i=1;i<num;i++){
				hisMoney=$dark('#content table[0] tr['+i+'] td[2]').html().replace(/\./gi,'')*1;
				percent=Math.round((hisMoney/sum)*1000)/10;
				$dark('#content table[0] tr['+i+'] td[2]').addHtml(' <b>('+percent+'%)</b>');
			}
			
			//Donatations Log Changes
			var gold;var time;var x;var day=null;
			var i=1;
			while($dark('#content table[1] tr['+(i)+']')){
				//Merge same next donators
				if($dark('#content table[1] tr['+(i)+'] td[4]')){
					time=$dark('#content table[1] tr['+(i)+'] td[4]').html().match(/(\w\w\w, \d+\.\d+\.\d+)/)[0];
					
					if(day!=time){
						day=time;
						$dark('*tr').class('reports_day_row').html('<td colspan="5">'+day+'</td>').beforeFrom($dark('#content table[1] tr['+(i)+']'));
						//alert(day);
					}else{
						gold="<tr style=\\'color:white; font-weight: bold; font-size:9pt\\' colspan=\\'2\\' nowrap=\\'nowrap\\'><td>"+$dark('#content table[1] tr['+(i)+'] td[2]').html()+' <img src="img/res2.gif" align="absmiddle" border="0"></td></tr>';
						time="<tr style=\\'color:white; font-weight: bold; font-size:9pt\\' colspan=\\'2\\' nowrap=\\'nowrap\\'><td>"+$dark('#content table[1] tr['+(i)+'] td[4]').html().match(/(\d+:\d+:\d+)/)[0]+"</td></tr>";
						x=0;
						if($dark('#content table[1] tr['+(i+1)+']')){
							while($dark('#content table[1] tr['+i+'] td[0]') && $dark('#content table[1] tr['+(i+1)+'] td[0]') && x<=50){
								if($dark('#content table[1] tr['+i+'] td[0]').html()==$dark('#content table[1] tr['+(i+1)+'] td[0]').html()){
									gold+="<tr style=\\'color:white; font-weight: bold; font-size:9pt\\' colspan=\\'2\\' nowrap=\\'nowrap\\'><td>"+$dark('#content table[1] tr['+(i+1)+'] td[2]').html()+' <img src="img/res2.gif" align="absmiddle" border="0"></td></tr>';
									time+="<tr style=\\'color:white; font-weight: bold; font-size:9pt\\' colspan=\\'2\\' nowrap=\\'nowrap\\'><td>"+$dark('#content table[1] tr['+(i+1)+'] td[4]').html().match(/(\d+:\d+:\d+)/)[0]+"</td></tr>";
									$dark('#content table[1] tr['+(i)+'] td[2]').html(subFuncts.strings.insertDots( parseInt($dark('#content table[1] tr['+(i)+'] td[2]').html().replace(/\./g,''))+parseInt($dark('#content table[1] tr['+(i+1)+'] td[2]').html().replace(/\./g,'')) ));
									$dark('#content table[1] tr['+(i+1)+']').remove();
								}else{break;}
								x++;
							}
						}
						
						if(x>0){
							$dark('#content table[1] tr['+(i)+'] td[2]').addHtml(' <b>(+)</b>').attr('onmouseover',"return escape('<table cellspacing=2 cellpadding=2 valign=middle style=\\'width:100px;text-align:right;\\' class=\\'tooltipBox\\'>"+gold+"</table>')");
							$dark('#content table[1] tr['+(i)+'] td[4]').addHtml(' <b>(+)</b>').attr('onmouseover',"return escape('<table cellspacing=2 cellpadding=2 valign=middle style=\\'width:190px;\\' class=\\'tooltipBox\\'>"+time+"</table>')");
						}
						//Remove day, display only time
						$dark('#content table[1] tr['+(i)+'] td[3]').html($dark('#content table[1] tr['+(i)+'] td[3]').html().replace(/\w\w\w, \d+\.\d+\.\d+ - /,''));
					}
				}
				i++
			}
		}
	},
	guildWarCamp : {
		inject : function(){
			if(gca_section.submod=="guild_combatreports"){
				this.guild_combatreports();
			}else if(gca_section.submod=="guild_member_reports"){
				this.guild_member_reports();
			}else if(!gca_section.submod){
				this.guild_fight_more_stats();
			}
		},
		guild_member_reports : function(){
			//Link to image
			var code=$dark('#content table[0]').html();
			code=code.replace(/t=2&amp;sh=................................">[^<]+<\/a>/gi,'t=2&sh='+gca_section.sh+'"><div class="guild-war-camp-fight-details"></div></a>');
			code=code.replace(/t=3&amp;sh=................................">[^<]+<\/a>/gi,'t=3&sh='+gca_section.sh+'"><div class="guild-war-camp-fight-details"></div></a>');
			$dark('#content table[0]').html(code);
			//Day seperators
			var temp_day=null;
			var i=0;
			while($dark('#content tr['+i+']')){
				if($dark('#content tr['+i+'] td[0]')){
					if(temp_day!=$dark('#content tr['+i+'] td[0]').html().match(/(\w+, \d+\.\d+\.\d+) /i)[1]){
						temp_day=$dark('#content tr['+i+'] td[0]').html().match(/(\w+, \d+\.\d+\.\d+) /i)[1];
						$dark('*tr').class('reports_day_row').html('<td>'+temp_day+'</td><td></td><td></td><td></td><td></td>').beforeFrom($dark('#content tr['+i+']'));
					}else{
						$dark('#content tr['+i+'] td[0]').style('').html($dark('#content tr['+i+'] td[0]').html().replace(temp_day+' - ',''));
					}
				}
				i++;
			}
			
			// Create the checkboxes
			var nor = $dark('#content tr').length-1;

			// Create the "raided gold"" button
			$dark('#content section[0]').addChild([
				$dark('*div').css('text-align:right;').addChild([
					$dark('*button').class('awesome-button').id('raidedGoldButton').attr('type','button').html( gca_locale.get("show_raided_gold") ),
					$dark('*img').src('img/res2.gif').css("display:none;"),
					$dark('*div').id('WarListOptions').html(''+
					'<input type="checkbox" checked="checked" id="A" onclick="for(i=1;i<='+nor+';i++){if(document.getElementById(\'content\').getElementsByTagName(\'tr\')[i].getElementsByTagName(\'td\')[1].innerHTML.match(\'<span\') && !document.getElementById(\'content\').getElementsByTagName(\'tr\')[i].getElementsByTagName(\'td\')[2].innerHTML.match(\'<span\')){if(!this.checked){document.getElementById(\'content\').getElementsByTagName(\'tr\')[i].setAttribute(\'style\',\'display:none;\');}else{document.getElementById(\'content\').getElementsByTagName(\'tr\')[i].setAttribute(\'style\',\'display:inherited;\');}}}"><label for="A">'+gca_locale.get("attacks")+'</label> | '+
					'<input type="checkbox" checked="checked" id="D" onclick="for(i=1;i<='+nor+';i++){if(!document.getElementById(\'content\').getElementsByTagName(\'tr\')[i].getElementsByTagName(\'td\')[1].innerHTML.match(\'<span\') && document.getElementById(\'content\').getElementsByTagName(\'tr\')[i].getElementsByTagName(\'td\')[2].innerHTML.match(\'<span\')){if(!this.checked){document.getElementById(\'content\').getElementsByTagName(\'tr\')[i].setAttribute(\'style\',\'display:none;\');}else{document.getElementById(\'content\').getElementsByTagName(\'tr\')[i].setAttribute(\'style\',\'display:inherited;\');}}}"><label for="D">'+gca_locale.get("defences")+'</label> | '+
					'<input type="checkbox" checked="checked" id="F" onclick="for(i=1;i<='+nor+';i++){if(document.getElementById(\'content\').getElementsByTagName(\'tr\')[i].getElementsByTagName(\'td\')[1].innerHTML.match(\'<span\') && document.getElementById(\'content\').getElementsByTagName(\'tr\')[i].getElementsByTagName(\'td\')[2].innerHTML.match(\'<span\')){if(!this.checked){document.getElementById(\'content\').getElementsByTagName(\'tr\')[i].setAttribute(\'style\',\'display:none;\');}else{document.getElementById(\'content\').getElementsByTagName(\'tr\')[i].setAttribute(\'style\',\'display:inherited;\');}}}"><label for="F">'+gca_locale.get("friendly")+'</label>'+
					'')
				])
			]);

			document.getElementById('raidedGoldButton').addEventListener('click', function() { gca_section_guild.guildWarCamp.showRaidedGold(); }, false);
		},
		showRaidedGold : function(){
			var i=1;
			while( $dark('.warcamp_member_report_details['+i+']') ){
				if( $dark('.warcamp_member_report_cell['+(i*3)+']').html().match( ">"+$dark('.warcamp_member_report_cell['+(i*3+2)+']').html()+"<" ) ){
					(function(i){
						xmlHttpRequest({
							url : $dark('.warcamp_member_report_details['+i+'] a[0]').attr("href"),
							method : "GET",
							onload : function(content){
								var doc = $dark("*div").html(content);
								if( $dark(doc,".report_reward[0]").html().match('res2.gif') ){
									var gold = $dark(doc,".report_reward[0]").html().replace(/\./g,'').match(/(\d+) <img/)[1];
									
									$dark('.warcamp_member_report_date['+i+']').addChild(
										$dark('*span').class("raidedGold").html( subFuncts.strings.insertDots(gold)+" ").addChild(
											$dark('*img').src('img/res2.gif').attr('align','absmiddle')
										)
									);
								}else{
									$dark('.warcamp_member_report_date['+i+']').addChild(
										$dark('*span').class("raidedGold").html( " - ")
									);
								}
								
							}
						});
					})(i);
				}else{
					$dark('.warcamp_member_report_date['+i+']').addChild(
						$dark('*span').class("raidedGold").html( " - ")
					);
				}
				i++;
			}
		},
		guild_combatreports : function(){
			//Change win-lost-draw icons with those from quests
			$dark('#content').html( $dark('#content').html().replace(/guild\/combat\/lose\.gif/gi,'ui/quest/button_cancel.jpg" width="20"').replace(/guild\/combat\/win\.gif/gi,'ui/quest/button_finish.jpg" width="20"').replace(/guild\/combat\/draw\.gif/gi,'ui/quest/button_accept.jpg" width="20"') );
		},
		guild_fight_more_stats : function(){
			if($dark('#content img[2]')){
				if($dark('#bx0')){var i=3;}else{var i=1;}
				var tableHTML = $dark('#content div['+i+']').html();

				if(tableHTML.match(/gid=(\d+)/i)){
					var guilds = $dark('#content div['+i+'] a').length/2;
				}else{
					var guilds = $dark('#content div['+i+'] a').length;
				}
				
				$dark('#content div['+i+']').html( tableHTML.replace(/<\/th>/i, ' (' + guilds + ')<span class="guild_av_level"><b>LvL &#216;</b></span></th>') );

				var c=0;
				var number_of_guilds=9;
				while(tableHTML.match(/guild&amp;i=(\d+)/i) && c<=number_of_guilds){
					var guildid = tableHTML.match(/guild&amp;i=(\d+)/i)[1];
					tableHTML = tableHTML.replace(/guild&amp;i=/i, 'guild&i=[DONE]');
					this.guild_fight_get_more_stats(guildid,i);
					c++;
				}
			}
		},
		guild_fight_get_more_stats : function(id,i){
			xmlHttpRequest({
				url : getPage.link({"mod":"guild","submod":"forumGladiatorius","i":id}),
				method : "GET",
				onload : function(content){
					if(content.match(/mainbox/i)){
						var PulledGold = content.match(/<th>(.+)<img alt="" src\="\d+\/img\/res2\.gif"/i)[1];
						var mesoLevel = content.match(/0216.<\/td[^<]+<th>([^<]+)/i)[1];
					}else{
						var PulledGold = gca_locale.get("error");
						var mesoLevel = gca_locale.get("error");
					}
					$dark('#content div['+i+']').html( $dark('#content div['+i+']').html().replace('<a href="index.php?mod=guild&amp;i=' + id + '&amp;', '<span class="war_camp_guild_gold">' + mesoLevel + '</span><span class="guild_av_level2"><b>' + PulledGold + '</b> <img border="0" src="/game/img/res2.gif"></span><a title="" href="index.php?mod=guild&amp;i=' + id + '&amp;') );
				}
			});
		}
	},
	guildMedic : {
		inject : function(){
			if(!document.location.href.match('guildLife')){
				//Check if there is content
				if( gca_options.isOn("ENABLE_GUILD_MEDIC_INTERFACE") && $dark('#content .buildingDesc[0]') )
					this.betterGuildMedic();
			}else{
				//Check if there is content
				if( gca_options.isOn("ENABLE_GUILD_LIFE_TAB") && $dark('#content .buildingDesc[0]') )
					this.guildLife();
			}
		},
		//Improve Guild Medic
		betterGuildMedic : function(){
			//Gather and calculate values
			var healPercent=$dark('#content p[1]').html().match(/(\d+)%/i)[1];
			var healpoints=$dark('#char_leben_tt').attr('data-tooltip').match(/(\d+) \\\/ (\d+)/i);
			var currentPoints=healpoints[1]*1;
			var maxPoints=healpoints[2]*1;
			var lifePercent=Math.round(currentPoints/maxPoints*100);
			var medicPoints=Math.round(maxPoints*(healPercent/100));
			var afterHealPoints=currentPoints+medicPoints;
			if(afterHealPoints>maxPoints){afterHealPoints=maxPoints;}
			var afterPersent=Math.round(afterHealPoints/maxPoints*100);
			
			//Remove some stats
			$dark('#charstats .charstats_bg[0]').remove();
			for(i=1;i<7;i++){
				$dark('#charstats .charstats_bg[4]').remove();
			}
			
			//Change to life values
			$dark('#charstats .charstats_text[1]').html(gca_locale.get("lost_points"));
			$dark('#charstats .charstats_text[2]').html(gca_locale.get("points_to_heal"));
			$dark('#charstats .charstats_text[3]').html(gca_locale.get("life_after_heal"));
			$dark('#charstats .charstats_balken[0] div[0]').class('charstats_balken_xp');
			$dark('#charstats .charstats_balken[1] div[0]').style('width:'+(100-lifePercent)+'%;').class('charstats_balken_leben float_right');
			$dark('#charstats .charstats_balken[2] div[0]').style('width:'+healPercent+'%;margin-left:'+lifePercent+'%;');
			if($dark('.gca_rtl[0]')){$dark('#charstats .charstats_balken[2] div[0]').style('width:'+healPercent+'%;margin-right:'+lifePercent+'%;');}
			$dark('#charstats .charstats_balken[3] div[0]').style('width:'+afterPersent+'%;');
			$dark('#charstats .charstats_value[1]').html((100-lifePercent)+'</font>%');
			$dark('#charstats .charstats_value[2]').html('<font color="green">+'+healPercent+'</font>%');
			$dark('#charstats .charstats_value[3]').html(afterPersent+'%');
			$dark('#charstats .charstats_bg[0]').tooltip([currentPoints+' / '+maxPoints],["white","#c0c0c0"]);
			$dark('#charstats .charstats_bg[1]').tooltip([(maxPoints-currentPoints)+' / '+maxPoints],["red","#c0c0c0"]);
			$dark('#charstats .charstats_bg[2]').tooltip(['+'+medicPoints],["lime","#c0c0c0"]);
			$dark('#charstats .charstats_bg[3]').tooltip([afterHealPoints+' / '+maxPoints],["white","#c0c0c0"]);
			
			//Make Guild Life Tab
			$dark('#mainnav tr[0]').addChild([
				$dark('*td').html('<a href="'+document.location.href+'&guildLife" class="awesome-tabs" style="cursor:pointer;">'+gca_locale.get("guild_life")+'<div class="navBG"></div></a>')
			]);
		},
		//Guild Life
		guildLife : function(){
			//Clear and appear Loading
			$dark('#content').html('<div class="title2_box"><div class="title2_inner" style="padding:10px;"><center id="loading"><b>'+gca_locale.get("loading")+'</b><br/><div class="auction_status_loading_img loading"/></div></center></div></div>');
			
			//Make Guild Life Tab
			$dark('#mainnav .current[0]').addHtml('<div class="navBG"></div>').class('awesome-tabs');
			$dark('#mainnav tr[0]').addChild(
				$dark('*td').html('<a href="'+getPage.link({"mod":"guild_medic","submod":"guildLife"})+'" class="awesome-tabs current" style="cursor:pointer;">'+gca_locale.get("guild_life")+'</a>')
			);
			
			//Get an opponet guild ID
			xmlHttpRequest({
				url : getPage.link({"mod":"guild_warcamp"}),
				method : "GET",
				onload : function(content){
					var doc = $dark('*div').html(content).element;
					if(doc.getElementsByClassName("buildingDesc")){
						if(doc.getElementsByClassName('report_statistic')[0].getElementsByTagName('a')){
							var opponent_Guild_ID=doc.getElementsByClassName('report_statistic')[0].getElementsByTagName('a')[0].getAttribute('href').match(/i=(\d+)&/i)[1];
							//Take guild life code
							xmlHttpRequest({
								url : getPage.link({"mod":"guild_warcamp","submod":"guild_combat","gid":opponent_Guild_ID}),
								method : "GET",
								onload : function(content){
									var doc = $dark('*div').html(content).element;
									
									if(doc.getElementsByClassName("dungeon_report_statistic")){
										$dark('#loading').html(doc.getElementsByClassName("dungeon_report_statistic")[0].innerHTML);
									}else{//Write the error
										$dark('#loading').html(gca_locale.get("error")+' : no appropriate report response');
									}
								}
							});
						}else{//Write the error
							$dark('#loading').html(gca_locale.get("error")+' : no opponent guild id');
						}
					}else{//Write the error
						$dark('#loading').html(gca_locale.get("error")+' : no appropriate response');
					}
				}
			});
		}
	},
	sent_guild_mail : function(message,exclude_me,id_to_write){
		var mates_ids=gca_data.get('guild',[null]).mates_id;
		
		if(mates_ids!=null){
			var i=0; var code="";
			while(mates_ids[i]){
				code+='&qq'+mates_ids[i]+'='+mates_ids[i];
				i++;
			}
			
			if(exclude_me){
				var mates_names=gca_data.get('guild',[null]).mates_name;
				var i=0;
				exclude_me=false;
				while(mates_names[i]){
					if(mates_names[i]==gca_data.get('playerName',null)){exclude_me=true;break;}
					i++;
				}
				if(exclude_me)
					code=code.replace('&qq'+mates_ids[i]+'='+mates_ids[i],'');
			}
			
			code+= '&mailText='+message+'&sendmails=123';
			
			if(message.length==0)
				gca_notifications.warning( gca_locale.get("guild_message_empty") );

			//Post message to the server
			xmlHttpRequest({
				url: getPage.link({"mod":"guild","submod":"adminMail"}),
				method: "POST",
				data : code,
				onload: function(response){
					//if(document.getElementById(id_to_write))
						//document.getElementById(id_to_write).value=gca_locale.get("done");
					gca_notifications.success( gca_locale.get("guild_message_was_sent") );
				},
				onerror: function(xml){
					gca_notifications.error( gca_locale.get("guild_message_sent_failed") );
				}
			});
		}else{
			gca_notifications.error( gca_locale.get("there_are_no_data") );
		}
	},
	guildStorage : {
		inject : function(){
			if(gca_section.submod != "control")
				this.storageInfos();
		},
		storageInfos : function(){
			gca_section_merchants.merchandsInfos();
			if( $dark('#gca_merchands_value') )
				$dark('#gca_merchands_value').parent().parent().parent().hide();
		}
	},
	guildMarket : {
		inject : function(){
			if(!getPage.url().match("sub=2"))
				gca_section_market.inject();
		}
	},
	guildTemple : {
		inject : function(){
			if( $dark('#ticker1') )
				gca_section_work.work_finish_time();
		}
	}
}