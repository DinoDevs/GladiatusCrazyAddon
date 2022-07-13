/*
 * Addon Guild Library Script
 * Author: DarkThanos, GreatApo
 */

// Guild Baths
var gca_guild_baths = {
	inject : function(){
		// If in guild_shoutbox
		if (gca_section.submod == 'guild_shoutbox') {

			// Room 1
			if (gca_getPage.parameter('room') == 1 || (gca_getPage.parameter('room')===undefined)) {
				// Announcements / Pin message button
				(gca_options.bool("global","check_guild_pinned_message") && 
					this.layout.pinMessageButton());
			}
		}

		// Setting Link
		gca_tools.create.settingsLink("guild");
	},

	// Layout Improvements
	layout : {
		pinMessageButton : function(){
			// If new message textarea
			if((document.getElementsByName('sendMessage').length!=1 && document.getElementsByName('editMessage').length!=1 ) || document.forms.length<1)
				return;

			// Check if admin by checking if you can delete all messages
			let numberOfMessages = document.getElementById('content').getElementsByTagName('tr').length/4;
			let links = document.getElementById('content').getElementsByTagName('a');
			let numberOfDeleteLinks = 0;
			for (var i=0; i<links.length; i++) {
				let href = links[i].getAttribute('href');
				if ( href.match('&den=') )
					numberOfDeleteLinks++;
			}
			if(numberOfMessages > numberOfDeleteLinks){
				console.log('[GCA] Not authorized to pin messages');
				return;
			}

			// Add pinned announcement button
			let button = document.createElement('input');
			button.className = 'awesome-button center';
			button.type = 'button';
			button.value = '📌';
			button.style = 'margin-top: 10px;';
			button.addEventListener("click", gca_guild_baths.layout.addPinAndSubmit);
			document.forms[0].appendChild(button);

			// Add tooltip
			let tooltip = [[[gca_locale.get('guild', 'pin_unpin_message'), 'white'],[gca_locale.get('guild', 'pinned_message_info'), 'white']]];
			gca_tools.setTooltip(button, JSON.stringify(tooltip));
		},

		addPinAndSubmit(){
			let message = document.forms[0].getElementsByTagName('textarea')[0].value;

			// Check if message is empty
			if(message.trim()=='')
				return;

			// Add/remove pin in front of the message
			console.log(message.substring(0, 3));
			if(message.substring(0, 3)=='[⚲]') // Other symbols: Ϙ, ⊸, ‼, ⏰, ⚲
				document.forms[0].getElementsByTagName('textarea')[0].value = message.substring(3);
			else
				document.forms[0].getElementsByTagName('textarea')[0].value = '[⚲]'+ message;
		}
	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_guild_baths.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_locale, gca_options, gca_section, gca_tools */
