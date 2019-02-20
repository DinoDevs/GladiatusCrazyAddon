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
			this.detectForgeEvents();
			
			(gca_options.bool("forge","show_levels") &&
			this.showPrefixSufixBaseLevels());
			
			(gca_options.bool("forge","material_links") &&
			this.sourceLinks.inject());

			// Add gladiatus tools links
			this.gladiatusTools.inject();
			
			//this.recraft.inject();
		}

		// Smelt
		else if(gca_section.submod == 'smeltery') {
			this.saveSmeltTimers();
			this.detectForgeEvents();

			// Add gladiatus tools links
			this.gladiatusTools.inject();
		}

		// Repair
		else if(gca_section.submod == 'workbench') {
			this.detectForgeEvents();

			(gca_options.bool("forge","material_links") &&
			this.sourceLinks.inject());

			// Add gladiatus tools links
			this.gladiatusTools.inject();
		}

		// Horreum
		else if(gca_section.submod == 'storage') {
			(gca_options.bool("forge","horreum_materials_names") &&
			this.horreum.showResourcesNames());
			(gca_options.bool("forge","horreum_remember_options") &&
			this.horreum.rememberStoreOptions());
			(gca_options.bool("forge","horreum_select_meterials") &&
			this.horreum.clickToSelectMaterial());

			this.horreum.trackStorageMaterialsChanges.inject();

			this.horreum.openAllCategoriesButton();
			this.horreum.gatherInfo();
		}
		
		// If char box exist
		if (document.getElementById('char')){
			// Show/Hide player doll
			this.showHideDoll();
			// If Item shadow
			(gca_options.bool("global","item_shadow") && 
				this.itemShadow.inject());
		}

		// Setting Link
		gca_tools.create.settingsLink("forge");
	},

	// Setup events
	detectForgeEvents : function() {
		if (!document.getElementById('forge_infobox')) return;

		// Timer to delay event fire
		var atomic = null;
		// Event handler
		var handler = () => {
			let tab = window.activeForgeBox;
			let info = window.slotsData[tab];
			let item = {
				prefix : 0,
				base : '0-0',
				suffix : 0
			};
			if (info.item && info.item.data && info.item.data.hash) {
				let hash = gca_tools.item.hash(info.item.data.hash);
				item.prefix = hash.prefix;
				item.base = hash.category + '-' + hash.subcategory;
				item.suffix = hash.suffix;
			}
			else if (info.item) {
				item.prefix = info.item.prefix || 0;
				item.base = (info.item.image.match(/item-i-(\d+-\d+)/) || ['','0-0'])[1];
				item.suffix = info.item.suffix || 0;
			}
			gca_tools.event.fireOnce('forge-infobox-update', {
				tab : tab,
				info : info,
				item : {
					prefix : item.prefix,
					base : item.base,
					suffix : item.suffix
				}
			});
		}
		// Setup element observer
		var observer = new MutationObserver((mutationsList) => {
			for (let mutation of mutationsList) {
				if (mutation.type == 'childList') {
					// Fire only 1 time 
					clearTimeout(atomic);
					atomic = setTimeout(handler, 1);
					break;
				}
			}
		});
		// Observe info box
		observer.observe(
			document.getElementById('forge_infobox'),// forge_infobox or crafting_infos
			{attributes: false, childList: true, subtree: true}
		);

		// If already
		if (document.getElementById('forge_item_name')) {
			handler();
		}
	},
	
	// Show/Hide player doll
	showHideDoll : function(){
		// Create button
		let btn = document.createElement('input');
		btn.type = "button";
		btn.className = "awesome-button";
		btn.value = gca_locale.get("forge", "show_hide_doll");
		btn.style.position = "absolute";
		btn.style.marginTop = "-30px";
		btn.style.width = "300px";
		btn.addEventListener('click', () => {
			let char = document.getElementById('char');
			if (char.style.display == "block"){
				char.style.display = "none";
				gca_data.section.set("cache", "forge_show_char", false);
			}
			else {
				char.style.display = "block";
				gca_data.section.set("cache", "forge_show_char", true);
			}
		}, false);

		var doll = document.getElementById('plDoll');
		doll.parentNode.insertBefore(btn, doll);
		
		// Check last saved option
		if (gca_data.section.get("cache", "forge_show_char" , false))
			document.getElementById('char').style.display = "block";
	},
	
	// Items Shadow Inject
	itemShadow : {
		inject : function(){
			this.dollItems();
		},

		// Add shadow to doll items
		dollItems : function(){
			// Get doll items
			var items = document.getElementById("char").getElementsByClassName("ui-draggable");

			// Add shadow to each item
			for(var i = items.length - 1; i >= 0; i--){
				gca_tools.item.shadow.add(items[i]);
			}

		}
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
		
		var levels = [
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
			// Detect changes
			gca_tools.event.addListener('forge-infobox-update', (data) => {
				this.updateLinks(data);
			});
		},
		updateLinks : function (data){
			var requirements = document.getElementsByClassName('crafting_requirements');
			var li = requirements[0].getElementsByTagName('li');

			// Check if already loaded
			if (li.length == 0 || li[0].dataset.linksLoaded) return;
			li[0].dataset.linksLoaded = true;

			// Locales
			var locale_packages = document.getElementById("menue_packages").title + ': ';
			var locale_market = document.getElementById("submenu1").getElementsByClassName("menuitem");
			locale_market = locale_market[locale_market.length - 2].href.match('mod=market') ? locale_market[locale_market.length - 2].textContent + ': ': '';

			var all_names = "";
			var guild_msg = '';

			var amounts = document.getElementsByClassName('forge_amount');
			for (let i = 0; i < li.length; i++) {
				let name = data.info.formula.needed[Object.keys(data.info.formula.needed)[i]].name;
				if (amounts[i].style.backgroundColor != 'greenyellow'){
					all_names += name.split(" ")[name.split(" ").length-1]+" ";
					guild_msg += "\n - "+name+": "+(parseInt(amounts[i].getElementsByClassName('forge_setpoint')[0].textContent, 10) - parseInt(amounts[i].getElementsByClassName('forge_actual_value')[0].textContent, 10));
				}
				let box = document.createElement('div');
				box.className = 'gca_forge_material_links';
				li[i].appendChild(box);
				let link = document.createElement('a');
				link.title = locale_packages + name;
				link.href = gca_getPage.link({"mod":"packages","qry":name,"&f":"18"});
				link.textContent = '⧉ ';
				box.appendChild(link);
				link = document.createElement('a');
				link.title = locale_market + name;
				link.href = gca_getPage.link({"mod":"market","qry":name,"&f":"18"});
				link.textContent = ' ⚖';
				box.appendChild(link);
			}
			
			if (guild_msg.length > 0) {
				let most_probable = 0;
				let most_probable_color = "";
				let qualities = document.getElementById('forge_qualities').getElementsByTagName('li');
				for (let i = 0; i < qualities.length; i++) {
					if (parseInt(qualities[i].textContent.match(/(\d+)%/)[1], 10) > most_probable) {
						most_probable = qualities[i].textContent.match(/(\d+)%/)[1];
						most_probable_color = qualities[i].textContent;
					}
				}

				guild_msg = data.info.item.name + '\n' + requirements[0].getElementsByTagName('legend')[0].textContent + (most_probable_color.length ? ' (' + most_probable_color + ')' : '') + guild_msg;
			}
			
			let fieldset = requirements[0].getElementsByTagName('fieldset')[0];
			let box = fieldset.getElementsByClassName('gca_forge_materials_links');
			if (box.length) box[0].parentElement.removeChild(box[0]);

			box = document.createElement('div');
			box.className = 'gca_forge_materials_links';
			fieldset.appendChild(box);
			let link = document.createElement('a');
			link.href = gca_getPage.link({"mod":"packages","qry":all_names,"&f":"18"});
			link.title = locale_packages + all_names;
			link.textContent = ' ⧉ ';
			box.appendChild(link);
			link = document.createElement('a');
			link.href = gca_getPage.link({"mod":"market","qry":all_names,"&f":"18"});
			link.title = locale_market + all_names;
			link.textContent = ' ⚖ ';
			box.appendChild(link);
			link = document.createElement('a');
			link.title = gca_locale.get("global", "message_guild_write");
			link.textContent = ' ✉ ';
			link.addEventListener('click', () => {this.sendMessageModal(guild_msg);}, false);
			box.appendChild(link);
		},

		sendMessageModal : function(message) {
			if (!this.info) {
				this.info = {};

				let wrapper = document.createElement('div');
				wrapper.style.textAlign = 'center';
				this.info.textarea = document.createElement('textarea');
				this.info.textarea.style.width = '100%';
				this.info.textarea.style.height = '80px';
				this.info.textarea.style.marginBottom = '18px';
				wrapper.appendChild(this.info.textarea);

				let btn_cancel = document.createElement('input');
				btn_cancel.className = 'awesome-button';
				btn_cancel.type = 'button';
				btn_cancel.value = gca_locale.get('general', 'cancel');
				btn_cancel.style.width = '80px';
				btn_cancel.style.padding = '5px';
				btn_cancel.style.margin = '0px 10px';
				wrapper.appendChild(btn_cancel);

				let btn_send = document.createElement('input');
				btn_send.className = 'awesome-button';
				btn_send.type = 'button';
				btn_send.value = gca_locale.get('global', 'message_send');
				btn_send.style.width = '80px';
				btn_send.style.padding = '5px';
				btn_send.style.margin = '0px 10px';
				wrapper.appendChild(btn_send);

				// Construct modal
				this.info.modal = new gca_tools.Modal(gca_locale.get('global', 'message_guild_write'), wrapper, () => {
					// Get message
					let message = this.info.textarea.value;
					if(message.length == 0) return;
					// Send message
					let send = gca_global.background.guildMessage.send(message, false, (ok) => {
						gca_notifications.error(gca_locale.get('global', (ok ? 'message_sent_success' : 'message_sent_failed')));
					});
					if (!send) {
						gca_notifications.error(gca_locale.get('global', 'no_data'));
					}
				}, () => {});

				// Buttons handlers
				btn_send.addEventListener('click', () => {
					this.info.modal.confirm();
				}, false);
				btn_cancel.addEventListener('click', () => {
					this.info.modal.cancel();
				}, false);
			}
			
			this.info.textarea.value = message;
			this.info.modal.show();
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
		},

		trackStorageMaterialsChanges : {
			inject : function() {
				window.forgeStorage._original_done = window.forgeStorage.done;
				window.forgeStorage._original_ajax = window.forgeStorage.ajax;

				window.forgeStorage.done = (e) => {
					window.forgeStorage._original_done(e);
					this.showChanges();
				}
				window.forgeStorage.ajax = (f, h, g) => {
					window.forgeStorage._original_ajax(f, h, g);
					this.storageMaterials = JSON.parse(JSON.stringify(
						jQuery('#resource-amount').data('max')
					));
				}
			},

			showChanges : function() {
				if (!this.storageMaterials) {
					return;
				}

				// Detect changes
				let changes = this.detectStorageChange(
					this.storageMaterials,
					window.jQuery('#resource-amount').data('max')
				);
				
				if (changes.added.length == 0 && changes.removed.length == 0) {
					return;
				}

				// Constract notification
				let info = document.createElement('div');
				info.className = 'show-item-quality';
				info.appendChild(document.createTextNode('Horreum material change')); // TODO - add locale
				info.appendChild(document.createElement('br'));
				for (let i = 0; i < changes.added.length; i++) {
					this.addNotificationIcon(changes.added[i], true, info);
				}
				for (let i = 0; i < changes.removed.length; i++) {
					this.addNotificationIcon(changes.removed[i], false, info);
				}
				gca_notifications.normal(info);
			},

			addNotificationIcon : function(list, added, info) {
				let icon = document.createElement('span');
				icon.className = 'item-i-18-' + list[0];
				icon.dataset.level = '1';
				icon.dataset.basis = '18-';
				icon.dataset.quality = list[1];
				icon.dataset.amount = ' ' + (added ? '+' : '-') + list[2];
				icon.style.display = 'inline-block';
				icon.style.marginBottom = '-5px';
				icon.style.position = 'relative';
				//icon.style.filter = added ? 'drop-shadow(0px 0px 3px rgba(0,255,0,1))' : 'drop-shadow(0px 0px 3px rgba(255,0,0,1))';
				info.appendChild(icon);
				info.appendChild(document.createTextNode(' '));
			},

			detectStorageChange : function(_a, _b) {
				let a = {};
				let b = {};

				// Parse lists
				for (let i = 1; i <= 64; i++) {
					a[i] = {'-1' : 0, '0' : 0, '1' : 0, '2' : 0, '3' : 0, '4' : 0};
					if (_a[i]) {
						for (let j = -1; j <= 4; j++) {
							if (_a[i][j]) a[i][j] = _a[i][j];
						}
					}

					b[i] = {'-1' : 0, '0' : 0, '1' : 0, '2' : 0, '3' : 0, '4' : 0};
					if (_b[i]) {
						for (let j = -1; j <= 4; j++) {
							if (_b[i][j]) b[i][j] = _b[i][j];
						}
					}
				}

				var added = [];
				var removed = [];

				// Compare
				for (let i = 1; i <= 64; i++) {
					for (let j = -1; j <= 4; j++) {
						if (a[i][j] > b[i][j]) {
							removed.push([i, j, a[i][j] - b[i][j]]);
						}
						else if (a[i][j] < b[i][j]) {
							added.push([i, j, b[i][j] - a[i][j]]);
						}
					}
				}

				// Return changes
				return {
					added : added,
					removed : removed
				}
			}
		}
	},

	gladiatusTools : {
		inject : function() {
			// Generate server url
			this.url = gca_links.get('gladiatus-tools-server') + '/';
			
			// Detect changes
			gca_tools.event.addListener('forge-infobox-update', (data) => {
				this.updateItemLink(data);
			});

			// Show links to gladiatus tools
			this.attribution();
		},

		updateItemLink : function(data) {
			let name = document.getElementById('forge_item_name');
			let link = name.getElementsByTagName('a')[0];

			// Link exists
			if (link) return;

			// Create item link
			let wrapper = name.getElementsByTagName('span')[0];
			let item_name = wrapper.textContent.trim();
			link = document.createElement('a');
			link.setAttribute('target', '_blank');
			link.setAttribute('rel', 'noopener noreferrer');
			link.textContent = item_name;
			link.title = 'Gladiatus Tools > ' + item_name;
			wrapper.textContent = '';
			wrapper.appendChild(link);
			link.href = this.url + 'equipment?item=' + data.item.prefix + ',' + data.item.base + ',' + data.item.suffix;
		},

		attribution : function() {
			// Create info box
			let info = document.createElement('div');
			info.id = 'gca_forge_links';

			// Add links
			let link = document.createElement('a');
			link.setAttribute('target', '_blank');
			link.setAttribute('rel', 'noopener noreferrer');
			link.textContent = this.url;
			link.href = this.url;
			info.appendChild(link);

			let forgeInfo = document.getElementById('forge_infobox');
			forgeInfo.parentNode.insertBefore(info, forgeInfo.nextSibling);
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
/* global gca_data, gca_getPage, gca_global, gca_links, gca_locale, gca_notifications, gca_options, gca_section, gca_tools */
/* global jQuery */
