/*
 * Addon Messages Script
 * Author: GreatApo
 * Copyright: all rights reserved
 */

var gca_section_messages = {
	inject : function(){
		/*
		if(gca_section.submod=='messageShow' || gca_section.submod=='messageMoveDelete'){
			//Check if there is content
			if($dark('#content form') && gca_options.isOn("ENABLE_MESSAGES_STYLING") )
				this.messages_style();
		}else if(gca_section.submod=='messageNew'){
			// Set focus on main body
			( gca_options.isOn("ENABLE_NEWMESSAGE_FOCUS") &&
			this.newMessage.setFocus());
			// Add friend list
			( gca_options.isOn("ENABLE_NEWMESSAGE_FRIENDLIST") &&
			this.newMessage.getNames());
		}
		*/

		// Prevent message close on click on player link
		var titles = $dark(".message_title");
		for (var i = titles.length - 1; i >= 0; i--) {
			if(titles[i].getElementsByTagName('a').length > 0){
				titles[i].getElementsByTagName('a')[0].addEventListener('click', function(event){
					event.stopPropagation();
				}, false);
			}
		}
	},
	messages_style : function(){
		//Message counting and small style changes
		$dark('#content div[0]').style('padding:0px');
		
		var numberMSG = document.getElementsByName('x[]').length;
		
		if($dark('#content div[1]').attr('class')=='title2_box'){
			$dark('#content form[0] div[4]').addHtml('('+numberMSG+')');
			$dark('#content .title2_inner[1]').addClass('msg_title2_inner');
		}else{
			$dark('#content form[0] div[2]').addHtml('('+numberMSG+')');
			$dark('#content .title2_inner[0]').addClass('msg_title2_inner');
		}
		
		//Message editing and style changes on each table row
		var rows=$dark('#content tr').length-3; //Starts counting from 0
		var i=0;
		var temp_day=null;
		while(i<=rows){
			if($dark('#content tr['+i+'] td[2]')){
				if(temp_day!=$dark('#content tr['+i+'] td[1]').html().match(/(\w\w\w, \d+\.\d+\.\d+) -/i)[1]){
					temp_day=$dark('#content tr['+i+'] td[1]').html().match(/(\w\w\w, \d+\.\d+\.\d+) -/i)[1];
					$dark('*tr').html('<td width="20px"></td><td width="58px" class="message_day_td_small"></td><td width="440px" class="message_day_td">'+temp_day+'</td>').beforeFrom($dark('#content tr['+i+']'));
					rows++;
				}else{
					$dark('#content tr['+i+'] td[0]').attr('width','20px');
					$dark('#content tr['+i+'] td[1]').class('tdn tdn_changed').attr('width','58px').html($dark('#content tr['+i+'] td[1]').html().match(/\d+\:\d+\:\d+/i)[0]);
					$dark('#content tr['+i+'] td[2]').class('tdn tdn_changed').attr('width','440px').html( this.edit_the_message($dark('#content tr['+i+'] td[2]').html()) );
					
					//Guild Master Message
					if( $dark('#content tr['+i+'] td[2] .master[0]') ){
						$dark('#content tr['+i+'] td[1]').addChild( $dark('*div').class('guild-flag icon').tooltip([ gca_data.get('guild_master_translation','Guild Master') ]) );
					}
					
					//Personal Message
					if($dark('#content tr['+i+'] td[2] textarea[0]')){
						$dark('*img').class('personal_message_icon').beforeFrom($dark('#content tr['+i+'] td[2] textarea[0]'));
						$dark('#content tr['+i+'] td[2] textarea[0]').class('message_textarea');
						$dark('#content tr['+i+'] td[2] textarea[0]').delAttr('rows').delAttr('cols');
						
						var text = $dark('#content tr['+i+'] td[2] textarea[0]').html();
						var lines = text.split(/\r|\r\n|\n/);
						var count = lines.length;
						
						for(x in lines){
							if(lines[x].length>54){
								count = count + Math.ceil(lines[x].length/54-1);
							}
						}
						
						$dark('#content tr['+i+'] td[2] textarea[0]').attr('rows',count);
					}
				}
			}
			i++;
		}
		
		if($dark('.paging[0]')){
			$dark('.paging[0]').parent().css("width:500px;");
			$dark('.paging[1]').parent().css("width:500px;");
		}
		
		/*
		if(navigator.userAgent.toLowerCase().match(/firefox/i)){var pre='pre';}else{var pre='span';}
			messagesHTML = messagesHTML.replace(/<textarea.cols..\d+..rows..\d+..class..input.>/gi, '<img class="personal_message_icon"><div style="background:#DBCBA5;border-top:1px solid #AF8E50;border-bottom:1px solid #AF8E50;padding:5px;margin:5px -5px 5px -5px;"><'+pre+' width="60" style="margin:0px;line-height:15px;">').replace(/<\/textarea>/gi,'</'+pre+'></div>');
		}
		*/
	},
	edit_the_message : function(message){
		if(message.match(/([^:]+): ([^>]+)<br>/i)){
			//GCA User? (&shy; symbol, not a -)
			var GCA_user=(message.match('­'))?true:false;
			//First line styling
			var firstsentence = message.match(/([^:]+):([^>]+)<br>/i)[1];
			//Guild member name link
			var AuthorName = message.match(/([^:]+):([^>]+)<br>/i)[2].replace(' ','');
			
			var messageBlock=false;
			if(gca_options.isOn("ENABLE_MESSAGE_SPAM_BLOCK")){
				var spamNames = gca_options.load("SPAM_BLOCKED_PLAYERS");
				var spamNames = '';
				spamNames = spamNames.replace(/ /gi,'').toLowerCase().split(',');
				var x=0;
				while(spamNames[x]){
					if( spamNames[x]==AuthorName.toLowerCase() ){
						messageBlock=true;
					}
					x++;
				}
			}
			
			if(!messageBlock){
				var mates_names=gca_data.get('guild',{mates_name:[]}).mates_name;
				var found=false;var i=0;
				while(mates_names[i]){
					if(mates_names[i]==AuthorName){found=true;break;}
					i++;
				}
				if(found){
					var mates_ids=gca_data.get('guild',{mates_id:[]}).mates_id;
					AuthorName = "<a "+ ((i==0)?'class="master"':'') +" href=\""+getPage.link({"mod":"player","p":mates_ids[i]})+"\" style=\"text-decoration:none;\">"+AuthorName+'</a>';
				}
				
				// Fix space problem
				// BETA Feature
				if(!GCA_user && gca_options.isOn("ENABLE_MESSAGES_FIX_SPACES")){
					var scan_pos = message.indexOf("<br>");
					if(scan_pos > 0 && (message.length-25-scan_pos-4)>50){
						// Bypass <br>
						scan_pos+=4;
						// New message string
						var new_message = message;//.substr(0, scan_pos);
						
						var counter = 0;
						var symbol = "";
						// Check on every 50 chars (&xxxx; count as 2 expect ascii ones : &quot; &amp; &#039; &lt; &gt; )
						while(scan_pos<new_message.length){
							// +1 char on buffer
							counter++;
							
							// Space char reset the buffer
							if(new_message[scan_pos] == " "){
								if(counter > 50){
									//console.log('Error found on length '+scan_pos+' of '+new_message);
									new_message = new_message.slice(0, scan_pos) + new_message.slice(scan_pos+1, new_message.length);
								}
								counter = 0;

							// Symbols chars need to be decoded
							}else if(new_message[scan_pos] == "&"){
								symbol = "&";
								// Read symbol char
								do{
									scan_pos++;
									symbol += new_message[scan_pos];
								}while(new_message[scan_pos] != ";");
								// If symbol is ascii
								if(symbol=="&quot;" || symbol=="&amp;" || symbol=="&#039;" || symbol=="&lt;" || symbol=="&gt;"){
									counter++;
								}else{
									counter+=2;
								}
							}else if(new_message[scan_pos] == "<"){
								// Skip <br>
								do{
									scan_pos++;
								}while(new_message[scan_pos] != ">");
							}else{
								counter++;
							}
							scan_pos++;
						}

						message = new_message;
					}
				}

				var line=(GCA_user)?firstsentence.replace(/ /g,'	')+":</u>	<font	color='black'><b>"+AuthorName.replace(/ /g,'	'):firstsentence+":</u> <font color='black'><b>"+AuthorName;
				message = message.replace(/([^:]+): ([^>]+)<br>/i, "<u>"+line+"</b></font><br/>");
				
				if(GCA_user){
					message = message.replace(/ /g,'').replace(/	/g,' ');
				
					var replaceThese = new Array(
						[/\[img\]([^\s\[]+)\[\/img\]/g,"<a href=\"$1\" target=\"_blank\"><img class=\"msg_img\" src=\"$1\" alt=\"An image\"></a>"],
						[/\[url\]([^\s\[]+)\[\/url\]/g,"<a href=\"$1\" target=\"_blank\">$1</a>"],
						[/\[email\](([A-Za-z0-9&\-_.]+?)@([\w\-]+\.([\w\-\.]+\.)?[\w]+))\[\/email\]/g,"<a href=\"mailto:$1\">$1</a>"],
						[/\[center\]([^\[]+)\[\/center\]/g,"<center>$1</center>"],
						[/\[i\]([^\[]+)\[\/i\]/g,"<i>$1</i>"],
						[/\[b\]([^\[]+)\[\/b\]/g,"<b>$1</b>"],
						[/\[u\]([^\[]+)\[\/u\]/g,"<u>$1</u>"],
						[/\[s\]([^\[]+)\[\/s\]/g,"<strike>$1</strike>"],
						[/\[code\]([^\[]+)\[\/code\]/g,"<pre class=\"msg_code\"><code>$1</code></pre>"],
						[/\[quote\]([^\[]+)\[\/quote\]/g,"<pre class=\"msg_quote\"><quote><font size=\"14px\" class=\"msg_lquote\">”</font><br/>$1<br/><font size=\"14px\" class=\"msg_rquote\">„</font> </quote></pre>"],
						[/\[font=#([^\]]+)\]([^\[]*)\[\/font\]/g,"<font color=\"#$1\">$2</font>"],
						[/\[ytvideo\][\w]+?:\/\/www\.youtube\.com\/watch\?[^v]*v=([^\s\[]+)\[\/ytvideo\]/g,"<iframe width=\"435\" height=\"245\" src=\"http://www.youtube.com/embed/$1\" frameborder=\"0\" allowfullscreen></iframe>"]
					);

					for(i=0; i<replaceThese.length; i++){
						message = message.replace(replaceThese[i][0],replaceThese[i][1]);
					}
				}

				// Convert rest URLs to links
				if(gca_options.isOn("ENABLE_MESSAGES_CONVERT_LINKS")){
					// Split on links (if so )
					message = message.replace(/([^">]*)(https?:\/\/[^\s\["<]+)([^"<])?/gm , "$1<a href=\"$2\" target=\"_blank\">$2</a>$3");
				}
				
				replaceThese = new Array(
					['smile',/:\)/g,':)'],
					['sad',/:\(/g,':('],
					['biggrin',/:D/g,':D'],
					['wink',/;\)/g,';)'],
					['w00t',/ 8o/g,'8o'],
					['unsure',/:S/g,':S'],
					['tongue',/:P/g,':P'],
					['squint',/\^\^/g,'^^'],
					['mellow',/:\|/g,':|'],
					['crying',/;\(/g,';('],
					['cool',/8\)/g,'8)'],
					['confused',/\?\(/g,'?('],
					['blink',/8\|/g,'8|']
				);

				for(i=0; i<replaceThese.length; i++){
					message = message.replace(replaceThese[i][1],'<img align="absmiddle" style="position:relative;top:-2px;" alt="'+replaceThese[i][2]+'" class="bbcode_emoticons_'+replaceThese[i][0]+'" title="'+replaceThese[i][0]+'" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D"/>');
				}
				
				// Remove last empty lines
				while( message.match(/<br>$/) ){
					message = message.replace(/<br>$/, '');
				}
			}else{
				message = '<div class="message_blocked_icon"></div><i class="message_with_icon">Message blocked</i>';
			}
		}else if(!message.match('<table')){//also not a pm
				if(message.match(/"/) && !message.match(/</)){// item was bidded
					message = message.replace(/"([^"]+)"/i,'<a href="index.php?mod=auction&qry=$1&itemType=0&sh='+getPage.parameter('sh')+'" title="Item link for the norman auction">$1</a> <a href="index.php?mod=auction&ttype=3&qry=$1&itemType=0&sh='+getPage.parameter('sh')+'" title="Item link for the mercenary auction">[+]</a>');
					message = '<div class="message_warning_icon"></div><i class="message_with_icon">'+message+'</i>';
				}else{
					message = '<div class="message_info_icon"></div><i class="message_with_icon">'+message+'</i>';
				}
		}
		
		return message;
	},
	newMessage : {
		setFocus : function(){
			$dark("#messageForm textarea[0]").DOM().focus();
		},
		getNames : function(){
			var guild = gca_data.get('guild', false);
			if(!guild || !guild.inGuild || !guild["mates_name"])
				return;
			
			$dark("*div").class("newMessageAdd").click(function(){
				gca_section_messages.newMessage.showPlayersName();
			}).beforeFrom( $dark("#messageForm input[0]") );
		},
		showPlayersName : function(){
			if(!$dark('#guild_friends_list')){
				this.dialog = new gca_built.dialog();
				this.dialog.title.html(gca_locale.get( "friend_list" ));

				this.dialog.body.addChild([
					$dark('*div').html('<table class="online_friends_table"><tr><td width="50%"><b>'+gca_locale.get( "guild_friends" )+'</b><td/><td width="50%"><b>'+gca_locale.get( "family_friends" )+'</b><td/></tr></table><table class="online_friends_table"><tr><td width="50%"><div id="guild_friends_list" class="online_friends_loading_img loading"/></div></td><td width="50%"><div id="family_friends_list" class="online_friends_loading_img loading"/></div></td></tr></table>')
				]);

				this.dialog.body.addChild([
					$dark('*div').class("space")
				]);

				var dialog = this.dialog;
				this.dialog.body.addChild([
					$dark('*input').class("button3").type("button").value(gca_locale.get( "close" )).click( function(){dialog.close();} )
				]);
				this.dialog.open();
				
				//Get online guild memebers
				xmlHttpRequest({
					url : getPage.link({"mod":"guild","submod":"memberList","i":"0","order":"o"}),
					method : "GET",
					onload : function(content){
						var doc = $dark('*div').html(content).element;
						if(doc.getElementsByClassName("title2_box")[0]){
							var html_code='';
							var x=2;
							var found_players=0;
							$dark('#guild_friends_list').delAttr("class");
							while( $dark('.title2_box[0] tr['+x+']', doc) ){
								if( $dark('.title2_box[0] tr['+x+'] td[4]', doc) ){
									$dark('#guild_friends_list').addChild([
										$dark('*span').class("black").html('&bull;'),
										$dark('*span').html(
											$dark(".title2_box[0] tr["+x+"] td[0] a[0]", doc).html()
										).css('cursor:pointer;').click(function(){
											$dark("#messageForm input[0]").value(this.innerHTML);
											gca_section_messages.newMessage.dialog.close();
											gca_section_messages.newMessage.setFocus();
										}),
										$dark('*br')
									]);
									found_players++;
								}
								x++;
							}
							if(found_players>=10)
								$dark('#guild_friends_list').css('overflow:auto;height:200px;');
							else if(found_players==0)
								$dark('#guild_friends_list').html('-<br/>');
						}else{
							$dark('#guild_friends_list').delAttr('class');
							$dark('#guild_friends_list').html( gca_locale.get("error") );
						}
					}
				});
				
				//Get online family memebers
				xmlHttpRequest({
					url : getPage.link({"mod":"overview","submod":"buddylist"}),
					method : "GET",
					onload : function(content){
						var doc = $dark('*div').html(content).element;
						if(doc.getElementsByClassName("title2_box")[0]){
							var html_code='';
							var x=1;
							var found_players=0;
							$dark('#family_friends_list').delAttr("class");
							while( $dark('.title2_box[0] tr['+x+']', doc) ){
								if( $dark('.title2_box[0] tr['+x+'] td[4]', doc) ){
									$dark('#family_friends_list').addChild([
										$dark('*span').class("black").html('&bull;'),
										$dark('*span').html(
											$dark(".title2_box[0] tr["+x+"] td[0] a[0]", doc).html()
										).css('cursor:pointer;').click(function(){
											$dark("#messageForm input[0]").value(this.innerHTML);
											gca_section_messages.newMessage.dialog.close();
											gca_section_messages.newMessage.setFocus();
										}),
										$dark('*br')
									]);
									found_players++;
								}
								x++;
							}
							if(found_players>=10)
								$dark('#family_friends_list').css('overflow:auto;height:200px;');
							else if(found_players==0)
								$dark('#family_friends_list').html('-<br/>');
						}else{
							$dark('#family_friends_list').delAttr('class');
							$dark('#family_friends_list').html( gca_locale.get("error") );
						}
					}
				});
			}else{
				this.dialog.open();
			}
		}
	}
}