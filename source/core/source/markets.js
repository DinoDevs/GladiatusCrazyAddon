/*
 * Addon Markets Script
 * Author: DarkThanos, GreatApo
 */

// Markets
var gca_markets = {
	inject : function(){
		// Check for errors
		if(!document.getElementById("content"))
			return;
		
		this.levelsYouCanSee();
		
		// If there are items
		if(document.getElementById("market_table")){
			// If Item shadow
			(gca_options.bool("global","item_shadow") &&
				this.itemShadow.market());
		
			this.soulboundItems();
			this.cancelAllButton();
		}
	},

	// Add shadow on items
	itemShadow : {
		market : function() {
			// Get items
			var items = document.getElementById('market_table').getElementsByTagName("div");
			
			// For each
			for (var i = items.length - 1; i >= 0; i--) {
				if (items[i].className.match("item-"))
					gca_tools.item.shadow.add(items[i]);
			}
		}
	},
	
	// Show item levels you can see
	levelsYouCanSee : function(){
		var playerLvl = parseInt(document.getElementById("header_values_level").textContent);
		var maxLvl = ( playerLvl+9<Math.floor(1.25*playerLvl) )? playerLvl+9 : Math.floor(1.25*playerLvl);
		
		var baseElement = document.getElementsByClassName("buildingDesc")[1].getElementsByTagName("p")[0];
		baseElement.appendChild(document.createElement("br"));
		baseElement.appendChild(document.createElement("br"));
		baseElement.appendChild(document.createTextNode(gca_locale.get("auction", "levels_you_can_see", {min : 0, max : maxLvl})));
	},
	
	// Point out which items are soulbound
	soulboundItems : function(){
		var rows = document.getElementById("market_table").getElementsByTagName("tr");
		for(var i=1; i<=rows.length - 1; i++){
			if(typeof rows[i].getElementsByTagName("div")[0].dataset.soulboundTo !== "undefined" && typeof rows[i].getElementsByTagName("input")['buy'] !== "undefined"){
				rows[i].style="background-color: rgba(255, 0, 0,0.2);";
				document.buyForm[i-1].setAttribute("onsubmit","return confirm('This item is soulbound. Do you really want to buy it?');")
			}
		}
	},
	
	// Cancel all button
	cancelAllButton : function(){
		var buttons = document.getElementsByName('cancel');
		
		if(buttons.length>0){
			//create button
			var button = document.createElement("input");
			button.type = 'button';
			button.className = "awesome-button";
			button.id = 'cancelAllButton';
			button.style = "float:right;margin-top: 4px;";
			button.value = buttons[0].value + ' ('+buttons.length+')';
			button.dataset.current = 0;
			button.dataset.max = buttons.length;
			button.addEventListener('click', function(){
				// Cancel all code
				var rows = document.getElementById("market_table").getElementsByTagName("tr");
				var cancel = encodeURIComponent(document.getElementsByName('cancel')[0].value);
				var id;
				for(var i=1; i<=rows.length - 1; i++){
					if(typeof rows[i].getElementsByTagName("input")['cancel'] !== "undefined"){
						id = document.buyForm[i-1][0].value;
						jQuery.ajax({
							type: "POST",
							url: document.location.href,
							data: 'buyid='+id+'&cancel='+cancel,
							success: function(){
								if(document.getElementById('cancelAllButton').dataset.current==document.getElementById('cancelAllButton').dataset.max-1){
									document.location.href=document.location.href;
									return;
								}
								document.getElementById('cancelAllButton').dataset.current++;
								document.getElementById('cancelAllButton').value = buttons[0].value + ' ( '+document.getElementById('cancelAllButton').dataset.current+'/'+document.getElementById('cancelAllButton').dataset.max+')';;
							},
							error: function(){
								gca_notifications.error(gca_locale.get("general", "error"));
							}
						});
					}
				}
				
				
				//document.location.href
				//'buyid='+itemsId+'&cancel='+encodeURIComponent(cancel)
			}, false);
			
			var base = document.getElementById("content").getElementsByTagName("h2")[3];
			base.parentNode.insertBefore(button,base);
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
		gca_markets.inject();
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
