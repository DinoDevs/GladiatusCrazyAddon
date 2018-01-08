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
			// If your items warning
			//	this.itemsWarnings.yourItems();
			
			// If cancel all button
			(gca_options.bool("market","cancel_all_button") &&
				this.cancelAllButton());
			
			// If remember sell duration
			if(gca_options.bool("market","remember_sell_duration")){
				this.remember_sell_duration();
			}else{
			// Default sell duration
				this.sell_duration();
			}

			this.layout.changeShortArrows();
		}
		
		// 1 gold mode
		(gca_options.bool("market","one_gold_mode") &&
			this.oneGoldMode());

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
					if(rows[i].getElementsByTagName("div")[0].dataset.soulboundTo != gca_section.playerId){// not to you
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
			}
		},
		
		// Point out which items are yours
		yourItems : function(){
			let rows = document.getElementById("market_table").getElementsByTagName("tr");
			for (let i = 1; i <= rows.length - 1; i++) {
				if (typeof rows[i].getElementsByTagName("input")['buy'] == "undefined") {
					rows[i].style.backgroundColor = "rgba(0, 0, 255,0.2)";
				}
			}
		},
		
		// Point out which items cost 1 gold
		oneGoldItems : function(){
			let rows = document.getElementById("market_table").getElementsByTagName("tr");
			for (let i = 1; i <= rows.length - 1; i++) {
				if (gca_tools.strings.parseGold(rows[i].getElementsByTagName("td")[2].textContent) === 1 && typeof rows[i].getElementsByTagName("input")['buy'] !== "undefined" && rows[i].style.backgroundColor != "rgba(0, 255, 0,0.2)"){
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
				var forms = document.getElementById("market_table").getElementsByTagName("form");
				var cancel = encodeURIComponent(document.getElementsByName('cancel')[0].value);
				var id;
				for(var i = 1; i <= rows.length - 1; i++){
					if(typeof rows[i].getElementsByTagName("input")['cancel'] !== "undefined"){
						id = forms[i - 1].buyid.value;
						jQuery.ajax({
							type: "POST",
							url: document.location.href,
							data: 'buyid=' + id + '&cancel=' + cancel,
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
		if (duration >= options.length)
			duration = 2;
		// Select saved duration
		options.selectedIndex = duration;
	},
	
	// Remember sell duration
	remember_sell_duration : function(){
		let duration = gca_data.section.get("cache", "last_sell_duration", 0);
		let options = document.getElementById('dauer');
		// If 48h is selected, select 24h
		if (duration >= options.length)
			duration = 2;
		// Select saved duration
		options.selectedIndex = duration;
		
		options.addEventListener("change", function () {
			gca_data.section.set("cache", "last_sell_duration", this.selectedIndex);
		}, false);
	},
	
	// 1g mode
	oneGoldMode : function(){
		// Create mode switch
		let wrapper = document.getElementById("market_sell_box").getElementsByTagName("section")[0];
		
		let selected_mode = gca_data.section.get("cache", "last_sell_1g_mode", 0);
		
		let modeSwitch = document.createElement("div");
		modeSwitch.className = "switch-field";
		modeSwitch.id = "mode-switch";
		let normal_mode = document.createElement("input");
		normal_mode.type = "radio";
		normal_mode.id = "normal_mode";
		normal_mode.name = "sell_mode";
		normal_mode.value = 0;
		if(selected_mode === 0)
			normal_mode.checked = true;
		let normal_mode_label = document.createElement("label");
		normal_mode_label.setAttribute("for", "normal_mode");
		normal_mode_label.textContent = 'Auto';//gca_locale.get("training", "stats_points");
		modeSwitch.appendChild(normal_mode);
		modeSwitch.appendChild(normal_mode_label);

		let oneG_mode = document.createElement("input");
		oneG_mode.type = "radio";
		oneG_mode.id = "1g_mode";
		oneG_mode.name = "sell_mode";
		oneG_mode.value = 1;
		if(selected_mode === 1)
			oneG_mode.checked = true;
		let oneG_mode_label = document.createElement("label");
		oneG_mode_label.setAttribute("for", "1g_mode");
		oneG_mode_label.textContent = '1g';//gca_locale.get("training", "points_breakdown");
		wrapper.appendChild(modeSwitch);
		modeSwitch.appendChild(oneG_mode);
		modeSwitch.appendChild(oneG_mode_label);
		
		let auto_value = document.createElement("input");
		auto_value.id = "auto_value";
		auto_value.value = 0;
		auto_value.style = "display:none";
		modeSwitch.appendChild(auto_value);
		
		// Save last selected mode
		modeSwitch.addEventListener('change',function(){
			let selected = parseInt(document.querySelector('input[name=sell_mode]:checked').value);
			gca_data.section.set("cache", "last_sell_1g_mode", selected);
			if(document.getElementById('preis').value != ''){
				if(selected == 1){
					document.getElementById('auto_value').value = document.getElementById('preis').value;
					document.getElementById('preis').value = 1;
				}else{
					document.getElementById('preis').value = document.getElementById('auto_value').value;
				}
			}
		});
		
		// Change functions
		var calcDuesOrg = calcDues;
		calcDues = function(){
			calcDuesOrg();
			if(document.getElementById('preis').value != '' && document.querySelector('input[name=sell_mode]:checked').value == 1){
				document.getElementById('auto_value').value = document.getElementById('preis').value;
				document.getElementById('preis').value = 1;
			}
		}
	},

	// Layout
	layout : {
		changeShortArrows : function() {
			let content = document.getElementById("content");
			if(content.className.length > 0)
				content.className += " ";
			content.className += "gca_change_sort_arrows";

			let links = document.getElementById("market_table");
			if(!links) return;
			links = links.getElementsByTagName("tr");
			if(!links.length) return;
			links = links[0].getElementsByTagName("a");
			if(!links.length) return;

			// Get url
			var url = gca_getPage.parameters();
			
			for (var i = 0; i < links.length; i++) {
				let link = gca_getPage.parameters(links[i].href);
				if (url.hasOwnProperty("s") && link.hasOwnProperty("s") && url.s[0] === link.s[0]) {
					links[i].textContent = ((url.s.length == 1) ? "▲" : "▼") + " " + links[i].textContent;
				}else{
					links[i].textContent = "▷ " + links[i].textContent;
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
