/*
 * Addon SettingsCharacter Script
 * Author: DarkThanos, GreatApo
 */

// SettingsCharacter
var gca_settings_character = {
	// Inject Code
	inject : function(){
		// Show player's link
		//this.showPlayerLink();
		// Description preview
		this.descriptionPreview.load();
	},

	// Show player's link
	/*
	showPlayerLink : function() {
		var wrapper = document.createElement('div');
		wrapper.style.margin = '5px 20px 5px 20px';

		var section = document.createElement('section');
		section.style.textAlign = 'right';
		section.style.opacity = '0.6';
		section.style.fontSize = '0.8em';

		var link = document.createElement('a');
		link.href = gca_getPage.link({mod : "player", p : gca_section.playerId}).replace(/&sh=.*^/i,'');
		link.textContent =gca_getPage.fullLink({mod : "player", p : gca_section.playerId}).replace(/&sh=.*^/i,'');
		link.target = '_blank';

		section.appendChild(link);
		wrapper.appendChild(section);
		document.getElementById('content').appendChild(wrapper);
	},*/

	// Show a Description Preview
	descriptionPreview : {
		load : function() {
			// Save instance
			var that = this;

			// Create loading indicator
			this.loading = document.createElement('div');
			this.loading.className = 'loading';
			this.loading.style.margin = '40px 25px 20px 25px';
			this.loading.style.width = '490px';
			this.loading.style.backgroundPosition = 'center';
			document.getElementById('content').appendChild(this.loading);

			// Create hidden frame
			this.frame = document.createElement('iframe');
			this.frame.style.display = 'none';
			// On frame load
			this.frame.addEventListener('load', function(){
				that.show(this.contentWindow.document);
			}, false);
			// Get player's link
			this.frame.src = gca_getPage.link({
				mod : "player",
				p : gca_section.playerId
			});
			// Add frame on page
			document.getElementById('content').appendChild(this.frame);
		},

		loaded : false,
		show : function(frameDocument) {
			// If alredy loaded
			if (this.loaded) {
				return;
			}
			// Check if valid page
			if (!frameDocument.getElementById('content') || frameDocument.getElementById('content').getElementsByTagName('section').length < 1) {
				return;
			}

			// Set as loaded
			this.loaded = true;

			// Get player's description
			var description = frameDocument.getElementById('content').getElementsByTagName('section')[0].parentNode;
			// Clone player's description
			//var preview = description.cloneNode(true);
			var preview = document.importNode(description, true);
			preview.style.margin = '20px 25px 0px 25px';

			// Remove loading
			this.loading.parentNode.removeChild(this.loading);
			this.loading = null;
			// Display the description as a preview
			document.getElementById('content').appendChild(preview);

			// Remove frame
			// There is a bug if you dont wait ...
			var that = this;
			setTimeout(function(){
				that.frame.src = 'about:blank';
				that.frame.parentNode.removeChild(that.frame);
				that.frame = null;
			}, 1000);
		}
	}
};

(function(){
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_settings_character.inject();
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
