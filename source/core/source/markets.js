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
			
			// If 1 gold warnings
			(gca_options.bool("market","one_gold_warning") &&
				this.itemsWarnings.oneGoldItems());
			// If soul-bound warnings
			(gca_options.bool("market","soulbound_warning") &&
				this.itemsWarnings.soulboundItems());
			
			// If cancel all button
			(gca_options.bool("market","cancel_all_button") &&
				this.cancelAllButton());
			
			// Default sell duration
			this.sell_duration();
		}

		// Setting Link
		gca_tools.create.settingsLink("market");
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

	// Point out specific items
	itemsWarnings : {
		// Point out which items are soulbound
		soulboundItems : function(){
			let rows = document.getElementById("market_table").getElementsByTagName("tr");
			for (let i = 1; i <= rows.length - 1; i++) {
				if (typeof rows[i].getElementsByTagName("div")[0].dataset.soulboundTo !== "undefined" && typeof rows[i].getElementsByTagName("input")['buy'] !== "undefined") {
					rows[i].style.backgroundColor = "rgba(255, 0, 0,0.2)";
					document.buyForm[i-1].addEventListener("submit", function(e){
						if (
							!confirm(
								gca_locale.get("markets", "item_is_soulbound") + "\n" +
								gca_locale.get("markets", "are_you_sure_you_want_to_buy")
							)
						) {
							event.preventDefault();
							return false;
						}
					});
				}
			}
		},

		// Point out which items cost 1 gold
		oneGoldItems : function(){
			let rows = document.getElementById("market_table").getElementsByTagName("tr");
			for (let i = 1; i <= rows.length - 1; i++) {
				if (gca_tools.strings.parseGold(rows[i].getElementsByTagName("td")[2].textContent) === 1 && typeof rows[i].getElementsByTagName("input")['buy'] !== "undefined"){
					rows[i].style.backgroundColor = "rgba(255, 152, 0,0.2)";
					document.buyForm[i-1].addEventListener("submit", function(e){
						if (
							!confirm(
								gca_locale.get("markets", "item_cost_only_x_gold", {number : 1}) + "\n" +
								gca_locale.get("markets", "are_you_sure_you_want_to_buy")
							)
						) {
							event.preventDefault();
							return false;
						}
					});
				}
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
			button.style = "margin-top: -21px;position: absolute;right: 116px;";
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
			
			var base = document.getElementById("market_table");
			base.parentNode.insertBefore(button,base);
		}
	},
	
	// Default sell duration
	sell_duration : function(){
		let duration = gca_data.section.get("market", "sell_duration", 0);
		let options = document.getElementById('dauer');
		// If 48h is selected, select 24h
		if (duration>=options.length)
			duration = 2;
		// Select saved duration
		options.selectedIndex = duration;
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
