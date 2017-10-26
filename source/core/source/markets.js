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
		
		// If Item shadow
		(gca_options.bool("global","item_shadow") &&
			this.itemShadow.market());
		
		this.soulboundItems();
		this.levelsYouCanSee();
	},

	// Add shadow on items
	itemShadow : {
		market : function() {
			// If no items exit
			if (!document.getElementById('market_table'))
				return;

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
		if(document.getElementById("market_table")){
			var rows = document.getElementById("market_table").getElementsByTagName("tr");
			for(var i=1; i<=rows.length - 1; i++){
				if(typeof rows[i].getElementsByTagName("div")[0].dataset.soulboundTo !== "undefined"){
					rows[i].style="background-color: rgba(255, 0, 0,0.2);";
					document.buyForm[i-1].setAttribute("onsubmit","return confirm('This item is soulbound. Do you really want to buy it?');")
				}
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
