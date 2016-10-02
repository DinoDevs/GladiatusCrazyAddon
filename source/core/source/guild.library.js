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
			if(!document.getElementById('content').getElementsByClassName('title2_box')[0])
				return;
			
			document.getElementById('content').getElementsByClassName('title2_box')[0].id = 'gca-library-container';
			var guildGold = parseInt(document.getElementById('gca-library-container').parentNode.getElementsByClassName('title_box')[2].getElementsByClassName('span_right')[0].textContent.replace(/\./g,''));
			
			document.getElementById('gca-library-container').getElementsByTagName('tr')[0].getElementsByTagName('td')[4].style = 'width: 15%;';
				
			for(let i=1;i<document.getElementById('gca-library-container').getElementsByTagName('tr').length;i++){
				document.getElementById('gca-library-container').getElementsByTagName('tr')[i].getElementsByTagName('td')[4].getElementsByTagName('input')[0].value = '';
				document.getElementById('gca-library-container').getElementsByTagName('tr')[i].getElementsByTagName('td')[4].getElementsByTagName('input')[1].value = '';
				document.getElementById('gca-library-container').getElementsByTagName('tr')[i].getElementsByTagName('td')[4].getElementsByTagName('input')[1].className = 'library_button_delete';
				let recepGold = document.getElementById('gca-library-container').getElementsByTagName('tr')[i].getElementsByTagName('td')[1].textContent.replace(/\./g,'').match(/(\d+)/)[1];
				if(document.getElementById('gca-library-container').getElementsByTagName('tr')[i].getElementsByTagName('td')[3].textContent!='---' || recepGold>guildGold){
					document.getElementById('gca-library-container').getElementsByTagName('tr')[i].style = 'opacity:0.7;';
					document.getElementById('gca-library-container').getElementsByTagName('tr')[i].getElementsByTagName('td')[4].getElementsByTagName('input')[0].className = 'library_button_disabled';
					if(recepGold>guildGold)
						document.getElementById('gca-library-container').getElementsByTagName('tr')[i].getElementsByTagName('td')[1].style = 'color:red;';
				}else{
					document.getElementById('gca-library-container').getElementsByTagName('tr')[i].getElementsByTagName('td')[4].getElementsByTagName('input')[0].className = 'library_button_enable';
				}
				
				document.getElementById('gca-library-container').getElementsByTagName('tr')[i].getElementsByTagName('td')[2].textContent = JSON.parse('["'+(document.getElementById('gca-library-container').getElementsByTagName('tr')[i].getElementsByTagName('img')[0].getAttribute('data-tooltip').match(/(\+\d+ [^"]+)"/)[1])+'"]')+' ('+(document.getElementById('gca-library-container').getElementsByTagName('tr')[i].getElementsByTagName('td')[2].textContent)+')';
				
				let div = document.createElement('div');
				div.className = 'library_level_number';
				div.style = 'background-image: url(img/interface/new.gif);';
				div.textContent = document.getElementById('gca-library-container').getElementsByTagName('tr')[i].getElementsByTagName('img')[0].getAttribute('data-tooltip').match(/(\d+) \\\//)[1];
				document.getElementById('gca-library-container').getElementsByTagName('tr')[i].getElementsByTagName('div')[0].appendChild(div);
				
				
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