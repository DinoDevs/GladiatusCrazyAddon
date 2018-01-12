/*
 * Addon Guild Script
 * Author: DarkThanos, GreatApo
 */

// Guild
var gca_guild = {
	inject : function(){
		// If message page
		if (gca_section.submod == 'adminMail') {
			// Default auto focus all
			this.auto_focus_all();
		}

		// Setting Link
		gca_tools.create.settingsLink("guild");
	},

	// Default auto focus all
	auto_focus_all : function(){
		jQuery('#mainbox').find('input[type="checkbox"]').each(function(){
			jQuery(this).prop('checked', 1);
		});
	}
};

(function(){
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_guild.inject();
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