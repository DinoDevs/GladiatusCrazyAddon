/*
 * Addon Forge Script
 * Author: DarkThanos, GreatApo
 */

// Forge
var gca_forge = {
	inject : function(){
		// Check for errors
		if(!document.getElementById("content"))
			return;
		
		// Forge
		if(gca_section.submod == null || gca_section.submod == 'forge'){
			this.saveForgeTimers();
			
			(gca_options.bool("forge","show_levels") &&
			this.showPrefixSufixBaseLevels());
			
			(gca_options.bool("forge","material_links") &&
			this.sourceLinks.inject());
			
			//this.recraft.inject();
		}

		// Smelt
		else if(gca_section.submod == 'smeltery') {
			this.saveSmeltTimers();
		}

		// Repair
		else if(gca_section.submod == 'workbench') {
			(gca_options.bool("forge","material_links") &&
			this.sourceLinks.inject());
		}

		// Horreum
		else if(gca_section.submod == 'storage') {
			(gca_options.bool("forge","horreum_materials_names") &&
			this.horreum.showResourcesNames());
			(gca_options.bool("forge","horreum_remember_options") &&
			this.horreum.rememberStoreOptions());
			(gca_options.bool("forge","horreum_select_meterials") &&
			this.horreum.clickToSelectMaterial());

			this.horreum.openAllCategoriesButton();

			this.horreum.gatherInfo();
		}

		// Setting Link
		gca_tools.create.settingsLink("forge");
	},
	
	// Save forge timers
	saveForgeTimers : function(){
		if (typeof window.slotsData !== "undefined") {
			let forgeTimes = {translation : [
				document.getElementById('mainnav').getElementsByClassName('current')[0].textContent,
				document.getElementById('forge_duration').textContent.match(/([^:]+):/)[1].trim(),
				gca_locale.get("forge","forge_ended")
			]};//Smeltery, Duration, Done!
			forgeTimes.data = [];// EndTime, Name
			let current = new Date().getTime();
			for (let i = 0; i < window.slotsData.length; i++) {
				if (typeof window.slotsData[i]['forge_slots.uend'] !== "undefined") {
					if(window.slotsData[i]['forge_slots.uend'] * 1000 > current)
						forgeTimes.data.push([window.slotsData[i]['forge_slots.uend'], window.slotsData[i].item.name]);
				}
			}
			gca_data.section.set("timers", "forge_times", forgeTimes);
		}
	},
	
	// Save smelt timers
	saveSmeltTimers : function(){
		if (typeof window.slotsData !== "undefined") {
			var smeltTimes = {translation : [
				document.getElementById('mainnav').getElementsByClassName('current')[0].textContent,
				document.getElementById('forge_duration').textContent.match(/([^:]+):/)[1].trim(),
				document.getElementById('slot-finished-succeeded').getElementsByTagName('fieldset')[0].textContent.trim().replace(/  /g,'').replace(/(?:\r\n|\r|\n)/g,' ')
			]};//Smeltery, Duration, Done!
			smeltTimes.data = [];// EndTime, Name
			for(var i = 0; i < window.slotsData.length; i++) {
				if (typeof window.slotsData[i]['forge_slots.uend'] !== "undefined") {
					smeltTimes.data.push([window.slotsData[i]['forge_slots.uend'], window.slotsData[i].item.name]);
				}
			}
			gca_data.section.set("timers", "smelt_times", smeltTimes);
		}
	},
	
	// Show Fix/Sufix/Base names levels
	showPrefixSufixBaseLevels : function(){
		var options;

		options = document.getElementById('prefix0').getElementsByTagName("option");
		for (let i = 1; i < options.length; i++) {
			options[i].textContent += " ("+options[i].dataset.level+"lvl)";
		}
		
		options = document.getElementById('suffix0').getElementsByTagName("option");
		for (let i = 1; i < options.length; i++) {
			options[i].textContent += " ("+options[i].dataset.level+"lvl)";
		}
		
		var levels =[
			1,1,1,2,3,3,4,4,4,5,6,6,2,7,8,9,8,9,5,7,//Weapons
			1,2,3,4,5,6,7,8,9,10,3,5,//Shields
			1,1,2,3,4,5,6,7,8,9,10,4,//Armor
			1,1,2,2,3,4,6,7,9,10,5,8,7,//Head
			1,2,3,4,5,6,7,8,9,//Hands
			1,1,1,1,1,1,1,1,//Rings
			1,2,3,4,5,6,7,8,9,10,//Shoes
			1,1,1,1,1,1,1,1,1,1//Amulets
		];
		options = document.getElementById('basic0').getElementsByTagName("option");
		for (let i = 0; i < options.length; i++) {
			options[i].textContent = "("+levels[i]+"lvl) "+options[i].textContent;
		}
	},
	
	// Shortcuts for materials in packages and market
	sourceLinks : {
		inject : function(){
			document.getElementsByClassName('crafting_requirements')[0].dataset.runlinks=-1;
			document.getElementById('forge_nav').addEventListener("click", function(event) {
				document.getElementsByClassName('crafting_requirements')[0].dataset.runlinks = -1;
				//console.log("Clicked");
			});
			this.repeat();
		},
		repeat : function(){
			if (document.getElementsByClassName('crafting_requirements').length > 0 && typeof document.getElementById('forge_nav').getElementsByClassName('tabActive')[0] !== "undefined" && document.getElementById("slot-opened").className != "hidden") {
				var tab = document.getElementById('forge_nav').getElementsByClassName('tabActive')[0].className.match(/forge_(opened|closed) (\d) /i)[2];
				
				if (document.getElementsByClassName('crafting_requirements')[0].dataset.runlinks !== tab) {
					document.getElementsByClassName('crafting_requirements')[0].dataset.runlinks = tab;
					
					var li = document.getElementsByClassName('crafting_requirements')[0].getElementsByTagName('li');
					var name,linkBox;
					var all_names="";
					var msg="";
					var links=[];
					for (let i = 0; i < li.length; i++) {
						//name = encodeURIComponent(li[i].getElementsByTagName('div')[0].title);
						name = window.slotsData[tab].formula.needed[Object.keys(window.slotsData[tab].formula.needed)[i]].name;
						if(document.getElementsByClassName('forge_amount')[i].style.backgroundColor!="greenyellow"){
							all_names+=name.split(" ")[name.split(" ").length-1]+" ";
							msg+="\n - "+name+": "+(parseInt(document.getElementsByClassName('forge_amount')[i].getElementsByClassName('forge_setpoint')[0].textContent,10)-parseInt(document.getElementsByClassName('forge_amount')[i].getElementsByClassName('forge_actual_value')[0].textContent,10));
						}
						linkBox = document.createElement('div');
						//linkBox.className = 'forge_amount';
						linkBox.style = 'background-color: #bba86e;font-size: 14px;position: absolute;width: 16px;margin-top: -46px;margin-left: 32px;line-height: 23px;';
						li[i].appendChild(linkBox);
						links[0] = document.createElement('a');
						links[0].setAttribute("onclick","document.location.href='"+gca_getPage.link({"mod":"packages","qry":name,"&f":"18"})+"';");
						links[0].title = document.getElementById("menue_packages").title+": "+name;
						links[0].textContent = '⧉ ';
						links[0].style = "text-decoration:none;cursor:pointer;";
						linkBox.appendChild(links[0]);
						links[1] = document.createElement('a');
						links[1].setAttribute("onclick","document.location.href='"+gca_getPage.link({"mod":"market","qry":name,"&f":"18"})+"';");
						links[1].title = ((document.getElementById("submenu1").getElementsByClassName("menuitem")[document.getElementById("submenu1").getElementsByClassName("menuitem").length-2].href.match("mod=market"))?document.getElementById("submenu1").getElementsByClassName("menuitem")[document.getElementById("submenu1").getElementsByClassName("menuitem").length-2].textContent+": ":"") + name;
						links[1].textContent = ' ⚖';
						links[1].style = "text-decoration:none;cursor:pointer;";
						linkBox.appendChild(links[1]);
					}
					
					if (msg.length > 0) {
						var most_probable = 0;
						var most_probable_color = "";
						var qualities = document.getElementById('forge_qualities').getElementsByTagName('li');
						for (let i = 0; i < qualities.length; i++) {
							if (qualities[i].textContent.match(/(\d+)%/)[1]>most_probable) {
								most_probable = qualities[i].textContent.match(/(\d+)%/)[1];
								most_probable_color = qualities[i].textContent;
							}
						}
						
						msg = document.getElementsByClassName('crafting_requirements')[0].getElementsByTagName('legend')[0].textContent+" ("+most_probable_color+")"+msg;
					}
					
					linkBox = document.createElement('div');
					linkBox.style = 'width: 16px;font-size: 12px;position: absolute;margin-top: -46px;line-height: 16px;';
					document.getElementsByClassName('crafting_requirements')[0].getElementsByTagName('ul')[0].appendChild(linkBox);
					links[0] = document.createElement('a');
					links[0].setAttribute("onclick","document.location.href='"+gca_getPage.link({"mod":"packages","qry":all_names,"&f":"18"})+"';");
					links[0].title = document.getElementById("menue_packages").title+": "+all_names;
					links[0].textContent = ' ⧉ ';
					links[0].style = "text-decoration:none;cursor:pointer;";
					linkBox.appendChild(links[0]);
					links[1] = document.createElement('a');
					links[1].setAttribute("onclick","document.location.href='"+gca_getPage.link({"mod":"market","qry":all_names,"&f":"18"})+"';");
					links[1].title = ((document.getElementById("submenu1").getElementsByClassName("menuitem")[document.getElementById("submenu1").getElementsByClassName("menuitem").length-2].href.match("mod=market"))?document.getElementById("submenu1").getElementsByClassName("menuitem")[document.getElementById("submenu1").getElementsByClassName("menuitem").length-2].textContent+": ":"") + all_names;
					links[1].textContent = ' ⚖ ';
					links[1].style = "text-decoration:none;cursor:pointer;";
					linkBox.appendChild(links[1]);
					links[2] = document.createElement('a');
					links[2].title = gca_locale.get("global", "message_guild_write");
					links[2].textContent = ' ✉ ';
					links[2].style = "text-decoration:none;cursor:pointer;";
					links[2].dataset.msg = msg;
					links[2].addEventListener('click', function(){
						// Get message
						var msg = this.dataset.msg;
						// Dont send if no materials are needed
						if(msg.length == 0) return;
						// Send message
						var send = gca_global.background.guildMessage.send(msg, false, function(ok){
							gca_notifications.error(gca_locale.get("global", (ok ? "message_sent_success" : "message_sent_failed")));
						});
						if(!send){
							gca_notifications.error(gca_locale.get("global", "no_data"));
						}
					}, false);
					linkBox.appendChild(links[2]);
				}
			}
			
			setTimeout(() => {
				this.repeat();
			}, 500);
		}
	},
	
	recraft : {
		inject : function(){
			// Make button
			var recraft_button = document.createElement('div');
			recraft_button.className = "awesome-button";
			recraft_button.id = "recraft_button";
			recraft_button.style="margin-top: 15px;";
			recraft_button.textContent = gca_locale.get("forge","recraft_item");
			recraft_button.dataset.tab=-1;
			recraft_button.addEventListener('click',function() {
				rent();
			});
			document.getElementById('forge_button_box').appendChild(recraft_button);
			
			document.getElementById('forge_nav').addEventListener("click", function() {
				document.getElementById('recraft_button').dataset.tab = -1;
			});
			
			this.repeat();
		},
		repeat : function(){
			if(document.getElementById("slot-finished-failed").className!="hidden"){
				var tab = document.getElementById('forge_nav').getElementsByClassName('tabActive')[0].className.match(/forge_finished-failed (\d) tabActive/i)[1];
				document.getElementById('recraft_button').dataset.tab=tab;
				if (window.slotsData[tab]){
					document.getElementById('recraft_button').textContent = gca_locale.get("forge","recraft_item")+": "+gca_tools.strings.insertDots(window.slotsData[tab].formula.rent[2])+" ";
					var icon_gold = document.createElement('div');
					if(window.slotsData[tab].formula.rent[2]>document.getElementById('sstat_gold_val').textContent.replace(/\./g,"")){
						document.getElementById('recraft_button').className += " disabled";
					}
					icon_gold.className = "icon_gold";
					document.getElementById('recraft_button').appendChild(icon_gold);
				}
			}
			
			setTimeout(function(){
				gca_forge.recraft.repeat();
			}, 500);
		}
	},

	horreum : {

		clickToSelectMaterial : function() {
			let resource_type = document.getElementById('resource-type');
			let resource_quality = document.getElementById('resource-quality');

			// Enable css
			document.getElementById('resource-list').className += ' resource-click-to-select';

			// Get material values
			let values = {};
			let option = resource_type.getElementsByTagName('option');
			for (var i = option.length - 1; i >= 0; i--) {
				if (option[i].dataset.imageClass) {
					values[option[i].dataset.imageClass] = option[i].value;
				}
			}

			let row = document.getElementById('resource-list').getElementsByTagName('tr');
			for (let i = 0; i < row.length; i++) {
				let column = row[i].getElementsByTagName('td');
				if (column.length > 0) {
					let image = column[0].getElementsByTagName('div')[0].className;
					row[i].addEventListener('click', function(event){
						var element = event.target;
						resource_type.value = values[image];
						if (element.tagName == 'TD' && element.dataset.quality) {
							resource_quality.value = element.dataset.quality;
						}
						jQuery(resource_type).change();
						jQuery(resource_quality).change();
					}, false);
				}
			}
		},

		rememberStoreOptions : function() {
			// Handle load from inventory
			let fromInventory = document.getElementById('from-inventory');
			fromInventory.checked = gca_data.section.get('cache', 'horreum_from_inventory', false);
			fromInventory.addEventListener('change', function() {
				gca_data.section.set('cache', 'horreum_from_inventory', this.checked);
				console.log(this.checked);
			}, false);

			// Handle load from packages
			let fromPackages = document.getElementById('from-packages');
			fromPackages.checked = gca_data.section.get('cache', 'horreum_from_packages', false);
			fromPackages.addEventListener('change', function() {
				gca_data.section.set('cache', 'horreum_from_packages', this.checked);
				console.log(this.checked);
			}, false);

			// Handle overlow action
			let overflowAction = document.getElementsByName('sell-excess');
			if (gca_data.section.get('cache', 'horreum_overflow_action', 'sell') != 'sell') {
				overflowAction[0].checked = false;
				overflowAction[1].checked = true;
			}
			else {
				overflowAction[1].checked = false;
				overflowAction[0].checked = true;
			}
			overflowAction[0].addEventListener('change', function() {
				gca_data.section.set('cache', 'horreum_overflow_action', (this.checked ? 'sell' : 'delete'));
			}, false);
			overflowAction[1].addEventListener('change', function() {
				gca_data.section.set('cache', 'horreum_overflow_action', (this.checked ? 'delete' : 'sell'));
			}, false);

			// Enable button if a from option is checked
			if (fromInventory.checked || fromPackages.checked) {
				document.getElementById('store').removeAttribute('disabled');
			}
		},

		showResourcesNames : function() {
			// Enable css
			document.getElementById('resource-list').className += ' show-resource-names';

			// Get material names
			let names = {};
			let option = document.getElementById('resource-type').getElementsByTagName('option');
			for (var i = option.length - 1; i >= 0; i--) {
				if (option[i].dataset.imageClass) {
					names[option[i].dataset.imageClass] = option[i].innerHTML.trim();
				}
			}

			// Show materials names
			let row = document.getElementById('resource-list').getElementsByTagName('tr');
			for (let i = 0; i < row.length; i++) {
				let column = row[i].getElementsByTagName('td');
				if (column.length > 0) {
					let image = column[0].getElementsByTagName('div')[0].className;
					if (names.hasOwnProperty(image)) {
						column[0].appendChild(document.createTextNode(names[image]));
					}
				}
			}
		},

		openAllCategoriesButton : function() {
			let btn = document.createElement('a');
			btn.className = 'horreum-click-to-open-categories';
			btn.textContent = '↓';
			btn.addEventListener('click', function() {
				jQuery('#resource-list tbody').css('display','table-row-group');
			}, false);
			document.getElementById('content').getElementsByTagName('article')[0].appendChild(btn);
		},

		gatherInfo : function() {
			// Get material names
			let locale = {};
			let option = document.getElementById('resource-type').getElementsByTagName('option');
			for (var i = option.length - 1; i >= 0; i--) {
				if (option[i].dataset.imageClass && option[i].dataset.imageClass.match(/item-i-18-(\d+)/i)) {
					locale[option[i].dataset.imageClass.match(/item-i-18-(\d+)/i)[1]] = option[i].innerHTML.trim();
				}
			}
			gca_data.section.set('cache', 'resource_locale', locale);
		}
	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_forge.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_data, gca_getPage, gca_global, gca_locale, gca_notifications, gca_options, gca_section, gca_tools */
/* global jQuery */
