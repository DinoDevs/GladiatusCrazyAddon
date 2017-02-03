/*
 * Addon Chat Style Mod Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_chat_style_mod = {
	// Make a functional chat
	run: function() {
		this.overwriteStyle();
		this.smartHotKey();
	},
	overwriteStyle : function(){
		$dark('#chatBox').css('display:none');
		$dark('#chat_general').id('old_chat_general');
		$dark('#chatFooter').id('old_chatFooter');
		$dark('body').addChild(
			$dark('*div').id('GCA_ChatBox').css('background-color:rgba(0,0,0,0.7);bottom:0px;left:20%;position:fixed;padding:5px;width:60%;').addChild([
				$dark('*div').css('border-radius: 10px 10px 0px 0px;margin-top: -25px;margin-left: -5px;width: 100%;padding-right: 5px;padding-left: 5px;height:20px;background: -webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,0)), to(rgba(0,0,0,0.7)));background: -moz-linear-gradient(top, rgba(0,0,0,0), rgba(0,0,0,0.7));'),
				$dark('*div').id('chat_general').css('max-height: 70px;overflow-y:scroll;').html( $dark('#old_chat_general').html() ),
				$dark('*div').id('chatFooter').css('position:relative;height:20px;margin-top:4px;').html( $dark('#old_chatFooter').html() )
			])
		);
		$dark('#chatInput').id('old_chatInput');
		$dark('#chatButtonSelectChannel').id('old_chatButtonSelectChannel');
		$dark('#chatAktChannel').id('old_chatAktChannel');
		$dark('#chatChannelBox').id('old_chatChannelBox');
		$dark('#chatButtonSelectChannel').css('margin-top:4px;margin-left:auto;');
		$dark('#chatAktChannel').css('margin-top:auto;');
		$dark('#chatInput').css('margin-top:auto;position:absolute;background-color: rgba(255, 255, 255, 0.2);');
		$dark('body').addChild(
			$dark('*script').html("\
			var prepostCheck = function(event){\
				if(event && event.keyCode==32){\
					var message=($('chatInput').value).trim();\
					if(message.match('/'))\
						chat.parseClientMessage(message);\
					return false;\
				};\
				if(event && event.keyCode == 13){\
					chat.sendMessage();\
					return false;\
				}\
			};\
			document.getElementById('chatInput').addEventListener('keydown', prepostCheck );\
			chat.fixInput = function(){\
				var chan = $('chatAktChannel').getSize();\
				var box = $('GCA_ChatBox').getSize();\
				$('chatInput').setStyle('width',(box['x']-chan['x']-50)+'px');\
				$('chatInput').set('opacity','1');\
			};\
			chat.fixInput();\
			")
		);
	},
	chatOn : false,
	smartHotKey : function(){
		// Hide input
		$dark('#GCA_ChatBox').DOM().style.bottom = "-28px";
		$dark('#GCA_ChatBox').DOM().style.pointerEvents = "none";
		$dark('#GCA_ChatBox').DOM().style.opacity = "0.85";
		$dark('#chat_general').DOM().style.maxHeight = "55px";
		
		// Change post event
		$dark('*script').html("document.getElementById('chatInput').removeEventListener('keydown', prepostCheck);");
		$dark('*script').html("document.getElementById('chatInput').addEventListener('keypress', prepostCheck );");

		// If enter was presed
		var onEnterPress = function(){
			// If chat is focused - and no msg - close it
			if( document.activeElement == document.getElementById('chatInput') && document.activeElement.value.length==0 ){
				document.getElementsByTagName('iframe')[0].contentWindow.focus();
				gca_chat_style_mod.chatClose();
			
			// If no input is focused - open chat
			}else if( !document.getElementsByTagName('iframe')[0].contentWindow.document.activeElement.tagName.match(/(TEXTAREA|INPUT)/) ){
				document.getElementById('chatInput').focus();
				gca_chat_style_mod.chatOpen();
			}
		}

		var openButton = $dark('*div').class('chatButtonMaxVertical').css('width:20px;height:20px;margin-right:-30px;position:fixed;bottom:0px;right:20%;opacity:0.5;cursor:pointer;').appendTo('body');
		openButton.DOM().addEventListener('click',function(){
			// If chatOn
			if( gca_chat_style_mod.chatOn ){
				document.getElementsByTagName('iframe')[0].contentWindow.focus();
				gca_chat_style_mod.chatClose();

			// If chatOff
			}else{
				document.getElementById('chatInput').focus();
				gca_chat_style_mod.chatOpen();
			}
		},false);

		// Add events
		window.addEventListener('keydown', function(e){if(e.keyCode==13)onEnterPress();},true);
		document.getElementsByTagName('iframe')[0].addEventListener('load',function(){
			document.getElementsByTagName('iframe')[0].contentWindow.addEventListener('keydown', function(e){if(e.keyCode==13)onEnterPress();},false);
		},false);
		
	},
	chatOpen : function(){
		$dark('#GCA_ChatBox').DOM().style.bottom = "0px";
		$dark('#chat_general').DOM().style.maxHeight = "270px";
		$dark('#chat_general').DOM().scrollTop = $dark('#chat_general').DOM().scrollHeight;
		$dark('#GCA_ChatBox').DOM().style.pointerEvents = "auto";
		$dark('#GCA_ChatBox').DOM().style.opacity = "1";
		gca_chat_style_mod.chatOn = true;
	},
	chatClose : function(){
		$dark('#GCA_ChatBox').DOM().style.bottom = "-28px";
		$dark('#chat_general').DOM().style.maxHeight = "55px";
		$dark('#chat_general').DOM().scrollTop = $dark('#chat_general').DOM().scrollHeight;
		$dark('#GCA_ChatBox').DOM().style.pointerEvents = "none";
		$dark('#GCA_ChatBox').DOM().style.opacity = "0.85";
		gca_chat_style_mod.chatOn = false;
	}
}