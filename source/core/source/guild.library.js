/*
 * Addon Guild Library Script
 * Author: DarkThanos, GreatApo
 */

// Guild Library
var gca_guild_library = {
	inject : function(){
		// Library Layout improve
		(gca_options.bool("guild","library_layout") && 
			this.layout.improve());
	},

	// Layout Improvements
	layout : {
		improve : function(){
			// If library container
			if(!document.getElementById('content').getElementsByClassName('title2_box').length)
				return;
			
			// Save container
			var container = document.getElementById('content').getElementsByClassName('title2_box')[0];
			// Add an id to it
			container.id = 'gca-library-container';

			// Get guild gold
			var guildGold = container.parentNode.getElementsByClassName('title_box')[2].getElementsByClassName('span_right')[0].textContent;
			guildGold = parseInt(guildGold.replace(/\./g,''));
			
			// Get recipes
			var recipes = container.getElementsByTagName('tr');
			// Header style fix
			recipes[0].getElementsByTagName('td')[4].style = 'width: 15%;';
			
			// For each recipe
			for (var i = recipes.length - 1; i >= 1; i--) {
				// Fix buttons
				recipes[i].getElementsByTagName('td')[4].getElementsByTagName('input')[0].value = '';
				recipes[i].getElementsByTagName('td')[4].getElementsByTagName('input')[1].value = '';
				recipes[i].getElementsByTagName('td')[4].getElementsByTagName('input')[1].className = 'library_button_delete';

				// Get recipe gold
				let recepGold = recipes[i].getElementsByTagName('td')[1].textContent.replace(/\./g,'').match(/(\d+)/)[1];

				// If not enought gold or is active
				if(recipes[i].getElementsByTagName('td')[3].textContent != '---' || recepGold > guildGold){
					// Disable recipe
					recipes[i].style = 'opacity:0.7;';
					recipes[i].getElementsByTagName('td')[4].getElementsByTagName('input')[0].className = 'library_button_disabled';

					// No gold
					if(recepGold > guildGold)
						recipes[i].getElementsByTagName('td')[1].style = 'color:red;';
				}

				// You can activate this recipe
				else{
					recipes[i].getElementsByTagName('td')[4].getElementsByTagName('input')[0].className = 'library_button_enable';
				}

				// Get recipe tooltip
				let tooltip = JSON.parse(recipes[i].getElementsByTagName('div')[1].dataset.tooltip)[0];

				// Get bonus
				let bonus = tooltip[1][0].match(/\+\d+.*/)[0];
				recipes[i].getElementsByTagName('td')[2].textContent = bonus +' ('+(recipes[i].getElementsByTagName('td')[2].textContent)+')';
				
				// Show level
				let div = document.createElement('div');
				div.className = 'library_level_number';
				div.style = 'background-image: url(img/interface/new.gif);';
				console.log(tooltip[3][0]);
				div.textContent = tooltip[3][0].match(/(\d+)\s*\//)[1];
				recipes[i].getElementsByTagName('div')[0].appendChild(div);
			}

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
		gca_guild_library.inject();
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