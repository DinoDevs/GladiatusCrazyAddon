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
		if(gca_section.submod == null || gca_section.submod == 'forge' || gca_section.submod == 'index'){
			this.saveForgeTimers();
			this.detectForgeEvents();
			
			(gca_options.bool("forge","show_levels") &&
			this.showPrefixSuffixBaseLevels());
			
			(gca_options.bool("forge","material_links") &&
			this.sourceLinks.inject());

			// Add Notepad
			(gca_options.bool("forge","forge_notepad") &&
			this.forgeNotepad.inject());

			// Add Gladiatus tools links
			this.gladiatusTools.inject();

			// Show available items on quality menu
			this.showAvailableItemsOnQuality.inject();

			// Show selected quality on dropdown
			this.showSelectedQuality.inject();

			// Add link to the scroll book
			this.scrollBook.inject();

			// Show item shadow
			this.showItemShadow();
			
			//this.recraft.inject();
		}

		// Smelt
		else if(gca_section.submod == 'smeltery') {
			this.saveSmeltTimers();
			this.detectForgeEvents();

			// Send all as package
			this.sendAllCompletedSmelts();

			// Don't allow items dropped from char
			this.disallowCharItemsDrop();

			// Show item shadow
			this.showItemShadow();

			// Add Gladiatus tools links
			this.gladiatusTools.inject();

			// Double click select
			(gca_options.bool("forge", "double_click_select") && 
				this.doubleClickToSelect.init());

			// Add link to the scroll book
			this.scrollBook.inject();
		}

		// Repair
		else if(gca_section.submod == 'workbench') {
			this.detectForgeEvents();

			(gca_options.bool("forge","material_links") &&
			this.sourceLinks.inject());

			// Add Gladiatus tools links
			this.gladiatusTools.inject();

			// Show available items on quality menu
			this.showAvailableItemsOnQuality.inject();

			// Show selected quality on dropdown
			this.showSelectedQuality.inject();

			// Get repaired item
			this.getRepairedItem.init();

			// Double click select
			(gca_options.bool("forge", "double_click_select") && 
				this.doubleClickToSelect.init());
				
			// Don't allow items dropped from char
			this.disallowCharItemsDrop();
		}

		// Horreum
		else if(gca_section.submod == 'storage') {
			(gca_options.bool("forge","horreum_materials_names") &&
			this.horreum.showResourcesNames());
			(gca_options.bool("forge","horreum_remember_options") &&
			this.horreum.rememberStoreOptions());
			(gca_options.bool("forge","horreum_select_meterials") &&
			this.horreum.clickToSelectMaterial());

			// Track material changes
			this.horreum.trackStorageMaterialsChanges.inject();

			// Add button to quickly expand all categories
			this.horreum.openAllCategoriesButton();

			// Add button to quickly close all expanded categories
			this.horreum.closeAllCategoriesButton();

			// Add link to the scroll book
			this.scrollBook.inject();

			// Gather Horreum info
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
			atomic = null;
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
		};
		// Setup element observer
		var observer = new MutationObserver((mutationsList) => {
			for (let mutation of mutationsList) {
				if (mutation.type == 'childList') {
					// Fire only 1 time
					if (window.requestIdleCallback) {
						cancelIdleCallback(atomic);
						requestIdleCallback(handler, {timeout : 250});
					}
					else {
						clearTimeout(atomic);
						atomic = setTimeout(handler, 50);
					}
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

	// Create the Notepad field
	forgeNotepad: {
		inject: function() {
			// Find the 'forge_infobox' div
			let infobox = document.getElementById('forge_infobox');

			// If the 'forge_infobox' doesn't exist, exit the script
			if (!infobox) {
				return; // Exit the script if the div is not found
			}

			// Create a title 
			const notesLink = document.querySelector('#header_game a[href*="mod=memo"]');
			if (notesLink) {
				const notesText = notesLink.innerText;

				const title = document.createElement('h2');
				title.classList.add('section-header');
				title.style.width = '310px';
				title.style.maxWidth = '310px';
				title.innerText = notesText;
				infobox.appendChild(title);

			}

			// Create the textarea element 
			const textArea = document.createElement('textarea');
			textArea.style.width = '316px';
			textArea.style.minWidth = '316px';
			textArea.style.maxWidth = '316px';
			textArea.style.minHeight = '80px';
			textArea.placeholder = '✏️';
			infobox.appendChild(textArea);

			// Create the Save button
			const saveBtn = document.createElement('button');
			saveBtn.id = 'saveBtn';
			saveBtn.classList.add('awesome-button');
			saveBtn.style.marginTop = "-6px"
			saveBtn.innerText = gca_locale.get('settings', 'save');
			infobox.appendChild(saveBtn);

			// Create the Delete button
			const resetBtn = document.createElement('button');
			resetBtn.id = 'resetBtn';
			resetBtn.classList.add('awesome-button');
			resetBtn.style.marginTop = "-6px"
			resetBtn.innerText = gca_locale.get('settings', 'reset');
			infobox.appendChild(resetBtn);

			// Load the saved notes from local storage (if any)
			const savedNotes = gca_data.section.get('notes', 'forge_notes');
			if (savedNotes) {
				textArea.value = savedNotes;
			}

			// Add event listener to the Save button
			saveBtn.addEventListener('click', function() {
				const notes = textArea.value;
				gca_data.section.set('notes', 'forge_notes', notes);
				gca_notifications.success(gca_locale.get('general', 'ok'));
			});

			// Add event listener to the Reset button
			resetBtn.addEventListener('click', function() {
				if (confirm(gca_locale.get('general', 'confirm'))) {  
					gca_data.section.del('notes', 'forge_notes');
					textArea.value = '';
					gca_notifications.success(gca_locale.get('general', 'ok'));
				} else {
					gca_notifications.info(gca_locale.get('general', 'ok'));
				}
			});
		}
	},
	
	// Show available items on each quality
	showAvailableItemsOnQuality : {
		inject : function(){
			// Get available materials
			this.getMaterialsAmounts();

			// Detect changes
			gca_tools.event.addListener('forge-infobox-update', (data) => {
				//console.log(data);
				this.showMaterialsAmounts();
			});
		},
		
		getMaterialsAmounts : function() {
			// If already have materials data
			if (this.materialAmounts) {
				return;
			}

			// Load materials data
			jQuery.get(gca_getPage.link({'mod':'forge','submod':'storage'}), (content) => {
				// Get materials info
				var info = content.match(/<input id="resource-amount" type="number" title="[^"]+" min="[^"]+" max="[^"]+" value="[^"]+"\s+data-max="([^"]+)"\s*\/>/i);
				if (!info || !info[1]) {
					this.materialAmounts = false;
					return;
				}

				// Parse amounts
				info = JSON.parse(info[1].replace(/&quot;/g, '"')); // This may be empty
				this.materialAmounts = {};
				for (let mat in info) {
					if (info.hasOwnProperty(mat)) {
						this.materialAmounts[mat] = [0, 0, 0, 0, 0, 0];
						for (let quality in info[mat]) {
							if (info[mat].hasOwnProperty(quality)) {
								this.materialAmounts[mat][parseInt(quality, 10) + 1] = info[mat][quality];
							}
						}
					}
				}

				// Get quality translations
				info = content.match(/<select id="resource-quality"[^>]*>[^<]*<option value="-1">([^<]*)<\/option>[^<]*<option value="0">([^<]*)<\/option>[^<]*<option value="1">([^<]*)<\/option>[^<]*<option value="2">([^<]*)<\/option>[^<]*<option value="3">([^<]*)<\/option>[^<]*<option value="4">([^<]*)<\/option>[^<]*<\/select>/i);
				let translations = {};
				if (!info) {
					for (let i = -1; i <= 4; i++) translations.push('');
				}
				else {
					for (let i = 0, j = 1; i <= 5; i++, j++) {
						translations[i] = gca_tools.strings.trim(info[j]);
					}
				}
				this.qualityTranslations = translations;

				this.showMaterialsAmounts();
			})
			// If Request Failed
			.fail(() => {
				this.materialAmounts = false;
			});
		},
		
		showMaterialsAmounts : function() {
			// If materials data were not found
			if (!this.materialAmounts) return;
			
			// Save selection the on first run
			if (!this.selectionsText){
				this.selectionsText = [];
				for (let i = 0; i <= 5; i++)
					this.selectionsText.push(document.getElementById("resource-quality").getElementsByTagName("option")[i].textContent);
			}
			
			if (!document.getElementsByClassName("crafting_requirements")[0]) return;
			let materials = document.getElementsByClassName("crafting_requirements")[0].getElementsByTagName("li");

			// Check if already loaded
			if (materials.length == 0 || materials[0].dataset.amountsLoaded || !materials[0].getElementsByClassName("forge_setpoint").length) return;
			materials[0].dataset.amountsLoaded = true;
			
			// Mark that the code has already run
			document.getElementById("resource-quality").dataset.amounts = true;

			// Check if status
			let isCrafting = !document.getElementById('slot-crafting').classList.contains('hidden');
			// Nothing to do in crafting mode
			if (isCrafting) return;
			
			// Amount on each quality = Standard, Green, Blue, Purple, Orange, Red
			let info = [];
			let qualities = [0, 0, 0, 0, 0, 0];
			
			let totalRequired = 0;

			// Quality colors
			let colors = ["white", "#009e00", "#5159F7", "#E303E0", "#FF6A00", "#FF0000"];
			
			// Get item's materials
			Array.prototype.slice.call(materials).forEach((mat) => {
				// Parse required amount for this material
				let required = parseInt(mat.getElementsByClassName("forge_setpoint")[0].textContent) - parseInt(mat.getElementsByClassName("forge_actual_value")[0].textContent);
				if (required > 0) {
					let icon = mat.getElementsByTagName("div")[0];
					// Parse material id
					let mat_id = parseInt(icon.className.match(/18-(\d+)/)[1], 10);
					// Count total materials needed
					totalRequired += required;
					// If material exists
					if (this.materialAmounts.hasOwnProperty(mat_id)) {
						// For each quality, add amount you have
						for (let i = 0; i <= 5; i++) {
							qualities[i] += Math.min(required, this.materialAmounts[mat_id][i]);
						}
						// Save material info
						info.push({
							id : mat_id,
							title : icon.title,
							required : required,
							amounts : this.materialAmounts[mat_id]
						});

						let tooltip = [];
						tooltip.push([icon.title, "#DDD"]);
						for (let i = 0; i <= 5; i++) {
							tooltip.push([this.materialAmounts[mat_id][i] + ' &times; ' + this.qualityTranslations[i], colors[i]]);
						}
						gca_tools.setTooltip(icon, [tooltip]);
						icon.removeAttribute('title');
					}
				}
			});
			
			// Item in slot
			if (document.getElementById("resource-quality").parentNode.style.display == "block") {
				let select = false;
				let resource = document.getElementById("resource-quality");
				let options = resource.getElementsByTagName("option");
				for (let i = 0; i <= 5; i++) {
					options[i].textContent = this.selectionsText[i] + "("+qualities[i]+"/"+totalRequired+")";
					
					if (qualities[i] > 0) {
						options[i].style.color = colors[i];
						
						// Auto select the first option
						if (!select) {
							options[i].selected = true;
							select = true;
						}
					} else {
						options[i].style.color = "grey";
					}
				}

				// Fire change event
				if ('createEvent' in document) {
					var evt = document.createEvent('HTMLEvents');
					evt.initEvent('change', false, true);
					resource.dispatchEvent(evt);
				} else {
					resource.fireEvent('onchange');
				}

				// Hide info table
				jQuery('#gca-crafting-horreum-amounts').hide();

			}
			// No item in slot
			else {
				let table = jQuery('<table></table>').css({width:'100%'});
				info.forEach((mat) => {
					let row = jQuery('<tr></tr>');
					row.append(jQuery('<td></td>').append(jQuery('<div></div>').attr('class','item-i-18-' + mat.id).css({transform:'scale(0.75)', margin:'-5px -6px'})));
					row.append(jQuery('<td></td>').text(mat.title));
					for (let i = 1; i <= 5; i++) {
						row.append(jQuery('<td></td>').css({color:colors[i],textAlign:'right',width:'23px'}).text(mat.amounts[i] >= mat.required ? '✓' : '-' + (mat.required - mat.amounts[i])).attr('title', mat.amounts[i]));
					}
					row.append(jQuery('<td></td>').css({textAlign:'right',width:'23px',fontSize:'10px'}).text('/' + mat.required));
					table.append(row);
				});

				// Create and populate
				let wrapper = jQuery('#gca-crafting-horreum-amounts');
				if (!wrapper.length) {
					wrapper = jQuery('<fieldset></fieldset>').attr('id','gca-crafting-horreum-amounts');
					jQuery('#forge_infobox .crafting_requirements').append(wrapper);
				}
				wrapper.show();
				wrapper.empty();
				wrapper.append(table);
			}
		}
		
	},

	showItemShadow : function() {
		// Item
		let itemBox = document.getElementById('forge_itembox');
		// Detect changes
		gca_tools.event.addListener('forge-infobox-update', () => {
			let items = itemBox.getElementsByTagName('div');
			if (items.length)
				gca_tools.item.shadow.add(items[0]);
		});
	},

	// Show selected quality on dropdown
	showSelectedQuality : {
		inject : function() {
			this.dropdown = document.getElementById('resource-quality');
			if (!this.dropdown) return;

			this.dropdown.addEventListener('change', () => {this.update();}, false);
			this.update();
		},

		update : function() {
			if (!this.dropdown) return;

			let color = false;
			switch(this.dropdown.value) {
				case '-1': color = 'rgb(255, 255, 255)';break;
				case  '0': color = 'rgb(0, 158, 0)';break;
				case  '1': color = 'rgb(81, 89, 247)';break;
				case  '2': color = 'rgb(227, 3, 224)';break;
				case  '3': color = 'rgb(255, 106, 0)';break;
				case  '4': color = 'rgb(255, 0, 0)';break;
			}

			if (!color) this.dropdown.removeAttribute('style');
			else this.dropdown.setAttribute('style', 'border-color:' + color + ';box-shadow:inset 0px 0px 4px ' + color + ';');
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
		btn.style.right = '95px';
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
			]};
			//Smeltery, Duration, Done!
			forgeTimes.data = [];// EndTime, Name
			let current = new Date().getTime();
			for (let i = 0; i < window.slotsData.length; i++) {
				if (typeof window.slotsData[i]['forge_slots.uend'] !== "undefined") {
					let itemQuality = window.slotsData[i].item.data.quality;
					if(window.slotsData[i]['forge_slots.uend'] * 1000 > current)
						forgeTimes.data.push([window.slotsData[i]['forge_slots.uend'], window.slotsData[i].item.name, itemQuality]);
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
			]};
			//Smeltery, Duration, Done!
			smeltTimes.data = [];// EndTime, Name
			for(var i = 0; i < window.slotsData.length; i++) {
				if (typeof window.slotsData[i]['forge_slots.uend'] !== "undefined") {
					let itemQuality = window.slotsData[i].item.data.quality;
					smeltTimes.data.push([window.slotsData[i]['forge_slots.uend'], window.slotsData[i].item.name, itemQuality]);
				}
			}
			gca_data.section.set("timers", "smelt_times", smeltTimes);
		}
	},
	
	// Show Fix/Suffix/Base names levels
	showPrefixSuffixBaseLevels : function(){
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

	getRepairedItem : {
		init : function() {

			// Create box
			this.wrapper = document.createElement('div');
			this.wrapper.style.position = 'relative';
			this.wrapper.style.border = '1px solid #6c6c6c';
			this.wrapper.style.margin = '10px 10px 10px 6px';
			this.wrapper.style.padding = '0px 20px 14px 0px';
			this.wrapper.style.textAlign = 'center';
			this.wrapper.style.backgroundColor = 'rgb(230 221 183)';
			this.wrapper.style.display = 'none';
			document.getElementById('forge_box').parentNode.parentNode.appendChild(this.wrapper);

			// Create fetch button
			this.button = document.createElement('a');
			this.button.className = "awesome-button";
			this.button.style = 'position: absolute; top: 38px; left: 50%; margin-left: -82px; width: 150px; z-index: 2;display: block;';
			this.button.textContent = document.getElementById('forge_lootbox').textContent;
			this.button.addEventListener('click', () => {
				this.getItem();
			}, false);
			this.wrapper.appendChild(this.button);

			// Loading
			this.loading = document.createElement('div');
			this.loading.className = 'loading';
			this.loading.style = 'position: absolute; top: 50%; left: 50%; margin-left: -20px; margin-top: -3px;z-index: 1;';
			this.wrapper.appendChild(this.loading);

			// Init slots
			this.slots = [];
			for (let i = 0; i < 6; i++) {
				let wrapper = document.createElement('div');
				wrapper.className = "magus_itembox";
				wrapper.style.display = 'none';
				wrapper.style.position = 'relative';
				wrapper.style.margin = '0 auto';
				this.wrapper.appendChild(wrapper);
				this.slots.push({
					triggered : false,
					active : false,
					slot : i,
					item : null,
					wrapper : wrapper
				});
			}

			// Detect changes
			gca_tools.event.addListener('forge-infobox-update', (data) => {
				this.uiUpdate(data);
			});
		},

		uiUpdate : function(data, force = false) {
			// If not finished item exit
			if (!force && data.info.state != "finished-succeeded") {
				this.wrapper.style.display = 'none';
				return;
			}
			// Show wrapper
			this.wrapper.style.display = 'block';
			// If slot already active
			let slot = this.slots[window.activeForgeBox];
			if (slot && slot.active && !force) {
				return;
			}
			// Update slots
			for (let i = 0; i < 6; i++) {
				this.slots[i].active = false;
				this.slots[i].wrapper.style.display = 'none';
			}
			this.button.style.display = 'none';
			this.loading.style.display = 'none';
			// Update slot
			slot.active = true;
			if (slot.item) {
				slot.wrapper.style.display = 'block';
				slot.wrapper.style.opacity = '1';
			}
			else if (slot.triggered) {
				this.loading.style.display = 'block';
				slot.wrapper.style.display = 'block';
				slot.wrapper.style.opacity = '0.5';
			}
			else {
				this.button.style.display = 'inline-block';
				slot.wrapper.style.display = 'block';
				slot.wrapper.style.opacity = '0.5';
			}
		},

		getItem : function() {
			let slot = this.slots[window.activeForgeBox];
			if (slot.triggered) return;
			slot.triggered = true;
			this.uiUpdate(null, true);
			// Get item info
			let el = jQuery('#forge_itembox div:eq(0)');
			let clone = el.clone(true);
			clone[0].dataset.amount = 1;
			// Clone
			let info = {
				el : clone,
				basis : el.data('basis'),
				priceGold : el.data('priceGold'),
				hash : el.data('hash'),
				quality : el.data('quality'),
				level : el.data('level'),
				name : jQuery('#forge_infobox .forge_item_name:eq(0)').text()
			};

			// Make request and handle it
			window.sendAjax(jQuery(slot.wrapper), "ajax.php", "mod=forge&submod=lootbox&mode=workbench&slot=" + window.activeForgeBox, (dataPlain) => {
				if (!dataPlain.match('document.location.href')) {
					return window.updateSlots(dataPlain);
				}
				setTimeout(() => {
					this.searchItem(slot, info, [9999, 1]);
				}, 1000);
			}, window.error, {spinnerVisible: false})
		},

		searchItem : function(slot, info, pages) {
			if (!pages.length) {
				gca_notifications.error(gca_locale.get('general', 'error'));
				return;
			}
			
			let page = pages.shift();
			let url_params = {
				mod : 'packages',
				f : info.basis.match(/(\d+)-(\d+)/)[1],
				//fq : parseInt(info.basis.match(/(\d+)-(\d+)/)[2], 10) - 2,
				fq : info.quality,
				page : page,
			};
			// Use biggest word from name as a search word
			if (info.name.length > 0) {
				let keyword = (() => {
					let words = info.name.split(' ');
					if (words.length < 1) return null;
					if (words.length > 1) words.sort((a,b) => b.length - a.length);
					return words[0];
				})();
				if (keyword.length > 3) {
					url_params.qry = keyword;
				}
			}

			jQuery.ajax({
				type: "GET",
				url: gca_getPage.link(url_params),
				success: (html) => {
					if (html.match('data-hash="' + info.hash + '"')) {
						let code = html.match(new RegExp('<div data-no-combine="true" data-no-destack="true" data-container-number="(-\\d+)"\\s*>\\s*<div style="[^"]*" class="[^"]*" data-content-type="[^"]*" data-content-size="[^"]*" data-enchant-type="[^"]*" data-price-gold="' + info.priceGold + '"( data-price-multiplier="[^"]*"|) data-tooltip="[^"]*" data-comparison-tooltip="[^"]*"( data-soulbound-to="[^"]*"|) data-level="' + info.level + '"( data-quality="[^"]*"|) data-hash="' + info.hash + '"[^>]*><\\/div>', 'i'));
						if (code) {
							slot.item = info;
							slot.item.id = code[1];
						}
						else {
							// Double warning
							//gca_notifications.error(gca_locale.get('general', 'error'));
							slot.item = null;
						}
						this.showItem(slot);
					} else {
						this.searchItem(slot, info, pages);
					}
				},
				error: function(){
					gca_notifications.error(gca_locale.get('general', 'error'));
				}
			});
		},

		showItem : function(slot) {
			// Check if Failed
			if (!slot || !slot.item || !slot.item.id) {
				gca_notifications.error(gca_locale.get('general', 'error'));
				return;
			}
			
			// Show success message
			gca_notifications.success(gca_locale.get('general', 'ok'));
			
			// Prepare item
			slot.item.el.addClass('ui-draggable').addClass('ui-droppable');
			slot.item.el[0].dataset.contentType = 'unknown';
			slot.item.el[0].dataset.gcaSource = 'packages';
			gca_tools.setTooltip(slot.item.el[0], JSON.stringify(slot.item.el.data('tooltip')));
			gca_tools.item.shadow.add(slot.item.el[0]);
			
			// Add item on page
			let wrapper = jQuery(slot.wrapper);
			wrapper.data('containerNumber', slot.item.id);
			wrapper[0].dataset.gcaSource = 'packages';
			wrapper.append(slot.item.el);
			window.DragDrop.makeDraggable(slot.item.el, false);
			window.DragDrop.makeDroppable(slot.item.el);
			this.uiUpdate(null, true);

			// Handle item on drop
			if (!this.dropHandler) {
				this.dropHandler = true;
				// On ajax request response
				gca_tools.event.request.onAjaxResponse((data) => {
					if (!data || !data.url) return;
					// Analyse action URL
					let link = gca_getPage.parameters(data.url);
					// If response is from retrieving item from packages
					if (
						link.mod == 'inventory' &&
						link.submod == 'move' &&
						link.from == slot.item.id
					) {
						document.location.reload();
					}
				});
			}
		}

		//jQuery('#forge_itembox div:eq(0)').clone()
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
			// Check if data are for the active tab
			if(data.tab!=window.activeForgeBox) return;

			// Check if materials are needed
			if(!data.info.formula.hasOwnProperty("needed")) return;
			
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
				if(!Object.keys(data.info.formula.needed)[i]) break;
				
				let name = data.info.formula.needed[Object.keys(data.info.formula.needed)[i]].name;
				if (amounts[i].style.backgroundColor != 'greenyellow'){
					all_names += name.split(" ")[name.split(" ").length-1]+" ";
					let required = parseInt(amounts[i].getElementsByClassName('forge_setpoint')[0].textContent, 10) - parseInt(amounts[i].getElementsByClassName('forge_actual_value')[0].textContent, 10)
					guild_msg += "\n - "+name+": "+required;
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
			// Create modal if not available
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
				btn_cancel.style.margin = '-5px 10px 0px';
				wrapper.appendChild(btn_cancel);

				let btn_send = document.createElement('input');
				btn_send.className = 'awesome-button';
				btn_send.type = 'button';
				btn_send.value = gca_locale.get('global', 'message_send');
				btn_send.style.width = '80px';
				btn_send.style.padding = '5px';
				btn_send.style.margin = '-5px 10px 0px';
				wrapper.appendChild(btn_send);

				// Construct modal
				this.info.modal = new gca_tools.Modal(gca_locale.get('global', 'message_guild_write'), wrapper, () => {
					// Get message
					let message = this.info.textarea.value;
					if(message.length == 0) return;
					// Send message
					let send = gca_global.background.guildMessage.send(message, false, (ok) => {
						if (ok) gca_notifications.success(gca_locale.get('global', 'message_sent_success'));
						else gca_notifications.error(gca_locale.get('global', 'message_sent_failed'));
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
	
	//recraft : {
	//	inject : function(){
	//		// Make button
	//		var recraft_button = document.createElement('div');
	//		recraft_button.className = "awesome-button";
	//		recraft_button.id = "recraft_button";
	//		recraft_button.style="margin-top: 15px;";
	//		recraft_button.textContent = gca_locale.get("forge","recraft_item");
	//		recraft_button.dataset.tab=-1;
	//		recraft_button.addEventListener('click',function() {
	//			rent();
	//		});
	//		document.getElementById('forge_button_box').appendChild(recraft_button);
	//		
	//		document.getElementById('forge_nav').addEventListener("click", function() {
	//			document.getElementById('recraft_button').dataset.tab = -1;
	//		});
	//		
	//		this.repeat();
	//	},
	//	repeat : function(){
	//		if(document.getElementById("slot-finished-failed").className!="hidden"){
	//			var tab = document.getElementById('forge_nav').getElementsByClassName('tabActive')[0].className.match(/forge_finished-failed (\d) tabActive/i)[1];
	//			document.getElementById('recraft_button').dataset.tab=tab;
	//			if (window.slotsData[tab]){
	//				document.getElementById('recraft_button').textContent = gca_locale.get("forge","recraft_item")+": "+gca_tools.strings.insertDots(window.slotsData[tab].formula.rent[2])+" ";
	//				var icon_gold = document.createElement('div');
	//				if(window.slotsData[tab].formula.rent[2]>document.getElementById('sstat_gold_val').textContent.replace(/\./g,"")){
	//					document.getElementById('recraft_button').className += " disabled";
	//				}
	//				icon_gold.className = "icon_gold";
	//				document.getElementById('recraft_button').appendChild(icon_gold);
	//			}
	//		}
	//		
	//		setTimeout(function(){
	//			gca_forge.recraft.repeat();
	//		}, 500);
	//	}
	//},

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
			}, false);

			// Handle load from packages
			let fromPackages = document.getElementById('from-packages');
			fromPackages.checked = gca_data.section.get('cache', 'horreum_from_packages', false);
			fromPackages.addEventListener('change', function() {
				gca_data.section.set('cache', 'horreum_from_packages', this.checked);
			}, false);

			// Handle overflow action
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
		
		closeAllCategoriesButton : function() {
			let btn = document.createElement('a');
			btn.className = 'horreum-click-to-close-categories';
			btn.textContent = '↑';
			btn.addEventListener('click', function() {
				jQuery('#resource-list tbody').css('display','none');
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

				// Construct notification
				let info = document.createElement('div');
				info.className = 'show-item-quality';
				info.appendChild(document.createTextNode(gca_locale.get('forge', 'horreum_material_change'))); // TODO - add locale
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

			// Show links to Gladiatus tools
			this.attribution();
		},

		updateItemLink : function(data) {
			let name = document.getElementById('forge_item_name');
			let link = name.getElementsByTagName('a')[0];
			let newLink = this.url + 'equipment?item=' + data.item.prefix + ',' + data.item.base + ',' + data.item.suffix
			

			// Get parent
			let wrapper = name.getElementsByTagName('span')[0];
			let item_name = wrapper.textContent.trim();

			// If same link exists
			if (link){
				if (link.href != newLink){
					link.textContent = item_name;
					link.title = 'Gladiatus Tools > ' + item_name;
					link.href = newLink;
				}
				return;
			}

			// Create item link
			link = document.createElement('a');
			link.setAttribute('target', '_blank');
			link.setAttribute('rel', 'noopener noreferrer');
			link.textContent = item_name;
			link.title = 'Gladiatus Tools > ' + item_name;
			link.href = newLink;
			wrapper.textContent = '';
			wrapper.appendChild(link);
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
	},

	// Don't allow items dropped from char
	disallowCharItemsDrop : function() {
		// Get itembox info
		let itembox = jQuery('#itembox');
		let defaultContentTypeAccept = itembox.data("contentTypeAccept") || 0;

		// Patch content type
		jQuery(document).on("dragstart", (e) => {
			itembox.data("contentTypeAccept", (e.target.parentNode.parentNode.id == 'char') ? 0 : defaultContentTypeAccept);
		});
		jQuery(document).on("dragend", (e) => {
			itembox.data("contentTypeAccept", defaultContentTypeAccept);
		});
	},

	// Smeltery
	sendAllCompletedSmelts : function() {
		// Get completed slots
		let completed = [];
		window.slotsData.forEach((slot, index) => {
			if (slot.state === 'finished-succeeded') {
				completed.push(index);
			}
		});

		// Exit if none or only one completed
		if (completed.length < 1) return;

		// Create get all button
		let box = document.getElementById('forge_box').parentNode;
		// Button to packages
		let packets = document.createElement('a');
		packets.className = 'awesome-button';
		packets.style.position = 'absolute';
		packets.style.bottom = '-28px';
		packets.style.left = '12px';
		packets.style.right = '10px';
		packets.style.display = 'block';
		packets.textContent = completed.length + '× ' + document.getElementById('forge_lootbox').textContent;
		box.appendChild(packets);
		// Button to horreum
		let horreum = document.createElement('a');
		horreum.className = 'awesome-button';
		horreum.style.position = 'absolute';
		horreum.style.bottom = '-60px';
		horreum.style.left = '12px';
		horreum.style.right = '10px';
		horreum.style.display = 'block';
		horreum.textContent = completed.length + '× ' + document.getElementById('forge_horreum').textContent;
		box.appendChild(horreum);

		// Make requests
		let makeGatherRequests = (type) => {
			// Disable button
			packets.disabled = 'disabled';
			horreum.disabled = 'disabled';

			// Make ajax requests
			let pending = completed.length;
			completed.forEach((slot) => {
				jQuery.post('ajax.php', {
					mod: 'forge',
					submod: type,
					mode: 'smelting',
					slot: slot,
					a: new Date().getTime(),
					sh: window.secureHash
				}).always(() => {
					pending--;
					if (pending === 0) {
						document.location.href = document.location.href;
					}
				});
			});
		};

		// Handle get all
		packets.addEventListener('click', () => {makeGatherRequests('lootbox');});
		horreum.addEventListener('click', () => {makeGatherRequests('storeSmelted');});
	},

	// Create Scroll Books
	scrollBook : {
		inject : function() {
			// Prepare Element references
			this.el = {
				contentOld: document.getElementById('content'),
				contentNew: document.createElement('div')
			}
			this.el.contentNew.style.display = 'none';
			this.el.contentNew.setAttribute('id', 'content_2nd');
			this.el.contentOld.parentNode.appendChild(this.el.contentNew);

			// Initialize status
			this.active = false;
			this.loaded = false;

			// Create UI
			this.create();
			//this.toggle();
			//gca_forge.scrollBook.toggle()
		},

		toggle : function() {
			if (this.active) {
				this.el.contentNew.style.display = 'none';
				this.el.contentOld.style.display = 'block';
			}
			else {
				this.el.contentOld.style.display = 'none';
				this.el.contentNew.style.display = 'block';
			}
			this.active = !this.active;

			if (this.active) {
				this.update();
			}
		},

		create : function() {
			this.wrapper = document.createElement('div');
			let aside, h2, section, table, tbody, tr, th;

			// First Table with prefixes
			aside = document.createElement('aside');
			aside.className = 'left';
			aside.style.width = 'calc(50% - 6px)';
			h2 = document.createElement('h2');
			h2.className = 'section-header';
			h2.textContent = 'Prefix';
			h2.appendChild(document.createTextNode(' '));
			this.prefixNote = document.createElement('small');
			h2.appendChild(this.prefixNote);
			aside.appendChild(h2);
			section = document.createElement('section');
			section.style.display = 'block';
			aside.appendChild(section);
			table = document.createElement('table');
			table.className = 'scroll-books-table';
			section.appendChild(table);
			tbody = document.createElement('tbody');
			table.appendChild(tbody);
			tr = document.createElement('tr');
			tbody.appendChild(tr);
			th = document.createElement('tr');
			th.textContent = '...';
			tr.appendChild(th);
			this.prefixWrapper = tbody;
			this.wrapper.appendChild(aside);

			// Unknown scrolls code under prefixes
			h2 = document.createElement('h2');
			h2.className = 'section-header';
			h2.textContent = gca_locale.get("forge", "unknown_scrolls_share_code");
			aside.appendChild(h2);
			section = document.createElement('section');
			section.style.display = 'block';
			this.shareCodeSection = section;
			aside.appendChild(section);

			// Unknown scrolls input code under prefixes
			h2 = document.createElement('h2');
			h2.className = 'section-header';
			h2.textContent =  gca_locale.get("forge", "use_share_code");
			aside.appendChild(h2);
			section = document.createElement('section');
			section.style.display = 'block';
			section.style.padding = '5px';
			section.textContent =  gca_locale.get("forge", "use_share_code_description");
			aside.appendChild(section);
			// Create shared code input
			let input = document.createElement('input'); 
			input.type = "text";
			input.id = "shared-code-input";
			section.appendChild(input);
			// Create button
			let btn = document.createElement('input'); 
			btn.type = "button";
			btn.className = "awesome-button";
			btn.value = gca_locale.get("settings", "highlight");
			btn.style.marginLeft = '4px';
			btn.style.marginRight = '4px';
			btn.addEventListener('click', this.decodeAndHighlight, false);
			section.appendChild(btn);

			// Second table with suffixes
			aside = document.createElement('aside');
			aside.className = 'right';
			aside.style.width = 'calc(50% - 6px)';
			h2 = document.createElement('h2');
			h2.className = 'section-header';
			h2.textContent = 'Suffix';
			h2.appendChild(document.createTextNode(' '));
			this.suffixNote = document.createElement('small');
			h2.appendChild(this.suffixNote);
			aside.appendChild(h2);
			section = document.createElement('section');
			section.style.display = 'block';
			aside.appendChild(section);
			table = document.createElement('table');
			table.className = 'scroll-books-table';
			section.appendChild(table);
			tbody = document.createElement('tbody');
			table.appendChild(tbody);
			tr = document.createElement('tr');
			tbody.appendChild(tr);
			th = document.createElement('tr');
			th.textContent = '...';
			tr.appendChild(th);
			this.suffixWrapper = tbody;
			this.wrapper.appendChild(aside);

			this.el.contentNew.appendChild(this.wrapper);

			// Toggle button
			gca_tools.create.headerButton('book').addEventListener('click', () => {
				this.toggle();
			}, false);
		},

		// Not shown
		excludedPre : [0, 12, 56, 57, 58, 59, 87, 88, 97, 100, 110, 111, 113, 117, 119, 121, 123, 125, 126, 127, 128, 129, 133, 136, 137],
		excludedSuf : [0, 7, 10, 14, 19, 22, 25, 27, 28, 41, 45, 54, 57, 60, 62, 64, 68, 95, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 112, 113, 125, 140, 166, 184, 194, 202, 204, 209, 211, 212, 213, 214, 216, 217, 219, 225, 226, 227, 228, 231, 233, 235, 238],

		update : function() {
			// If not scroll info not loaded
			if (!this.loaded) {
				gca_tools.ajax.cached.known_scrolls().then(
					(result) => {
						this.updateInfo(result);
						this.update();
					}
				);
				return;
			}

			// Update screen info
			let prefix_all = 0;
			let prefix_learned = 0;
			this.prefixWrapper.textContent = '';
			
			for (let i = 0; i < this.info.prefix.length; i++) {
				if (this.excludedPre.includes(i)) continue;
				prefix_all++;
				let info = this.info.prefix[i];
				let tr = document.createElement('tr');
				if (!info) {
					info = {id : i, name : '????', level : '??'};
					tr.style.color = '#656565';
				}
				else {
					prefix_learned++;
				}
				let td = document.createElement('td');
				td.textContent = '#' + info.id;
				tr.appendChild(td);
				td = document.createElement('td');
				td.textContent = info.name;
				tr.appendChild(td);
				td = document.createElement('td');
				td.textContent = info.level;
				tr.appendChild(td);
				td = document.createElement('td');
				let a = document.createElement('a');
				a.textContent = '🔗';
				a.setAttribute('href', gca_links.get('gladiatus-tools-server') + '/equipment?item=' + info.id + ',1-1,0');
				a.setAttribute('target', '_blank');
				a.setAttribute('rel', 'noopener noreferrer');
				td.appendChild(a);
				tr.appendChild(td);
				
				this.prefixWrapper.appendChild(tr);
			}
			this.prefixNote.textContent = '(' + prefix_learned + '/' + prefix_all + ')';

			let suffix_all = 0;
			let suffix_learned = 0;
			this.suffixWrapper.textContent = '';
			for (let i = 0; i < this.info.suffix.length; i++) {
				if (this.excludedSuf.includes(i)) continue;
				suffix_all++;
				let info = this.info.suffix[i];
				let tr = document.createElement('tr');
				if (!info) {
					info = {id : i, name : '????', level : '??'};
					tr.style.color = '#656565';
				}
				else {
					suffix_learned++;
				}
				let td = document.createElement('td');
				td.textContent = '#' + info.id;
				tr.appendChild(td);
				td = document.createElement('td');
				td.textContent = info.name;
				tr.appendChild(td);
				td = document.createElement('td');
				td.textContent = info.level;
				tr.appendChild(td);
				td = document.createElement('td');
				let a = document.createElement('a');
				a.textContent = '🔗';
				a.setAttribute('href', gca_links.get('gladiatus-tools-server') + '/equipment?item=0,1-1,' + info.id + '');
				a.setAttribute('target', '_blank');
				a.setAttribute('rel', 'noopener noreferrer');
				td.appendChild(a);
				tr.appendChild(td);
				this.suffixWrapper.appendChild(tr);
			}
			this.suffixNote.textContent = '(' + suffix_learned + '/' + suffix_all + ')';

			// Add share code
			this.shareCodeSection.textContent = this.getUnknownsCode();
		},

		updateInfo : function(result) {
			// Update info
			this.loaded = true;
			
			this.info = {
				prefix : new Array(187 +1).fill(null),
				suffix : new Array(293 +1).fill(null)
			};

			// Prefix
			for (let i = 0; i < result.id.prefix.length; i++) {
				let id = result.id.prefix[i];
				this.info.prefix[id] = {
					id : id,
					level : result.level.prefix[i],
					name : result.name.prefix[id]
				}
			}
			// Suffix
			for (let i = 0; i < result.id.suffix.length; i++) {
				let id = result.id.suffix[i];
				this.info.suffix[id] = {
					id : id,
					level : result.level.suffix[i],
					name : result.name.suffix[id]
				}
			}
		},

		getUnknownsCode : function(){
			// If not scroll info not loaded
			if (!this.loaded) {
				gca_tools.ajax.cached.known_scrolls().then(
					(result) => {
						this.updateInfo(result);
						this.getUnknownsCode();
					}
				);
				return;
			}

			// Convert {false, false, true ...} to 001011
			getBinaryStr = function(arr, exc = [], val=null) {
				return arr.map(function(x, i) {
					if(exc.includes(i)) return '';
					return (x === val) ? '1' : '0'
				}).join('');
			}
			// Remove not shown items from binary string
			remExcluded = function(str, indexes) {
				for (var i = indexes.length - 1; i > 0; i--) {
					let pos = indexes[i]
					str = str.substring(0, pos) + str.substring(pos + 1, str.length);
				}
				return str;
			}
			// Implementing: https://stackoverflow.com/a/38074583/10396046
			pack = function(bin) {
				return btoa(bin.match(/(.{8})/g).map(function(x) {return String.fromCharCode(parseInt(x, 2));}).join(''));
			}

			// Uncompressed code
			// the 1st item from prefixes is removed (not shown)
			let code = getBinaryStr(this.info.prefix, this.excludedPre) + getBinaryStr(this.info.suffix, this.excludedSuf);
			// Compress code
			code = pack(code);

			return code;

			/* Code testing other compression mechanisms
			// Get all indexes where values are equal to:
			getAllIndexes = function(arr, val=null) {
				var indexes = [], i;
				for(i = 0; i < arr.length; i++)
					if (arr[i] === val)
						indexes.push(i);
				return indexes;
			}
			// Abstract the previous term from each item
			// (converts list off indexes to distance from the previous)
			getAbstractCompress = function(arr) {
				var compArr = [], i;
				//compArr.push(arr[0]); //skip first because it is the 0 anyway
				for(i = 1; i < arr.length; i++)
					compArr.push(arr[i]-arr[i-1]);
				return compArr;
			}
			// Decode functions
			getAbstractDecompress = function(arr) {
				var decompArr = [], i;
				decompArr.push(arr[0]);
				for(i = 1; i < arr.length; i++)
					decompArr.push(arr[i]+decompArr[i-1]);
				return decompArr;
			}
			decode = function(code){
				let codes = code.split(' ');
				let arr = [[],[]];
				for(i=0; i<codes.length; i++){
					groups = codes[i].split('-');
					for(j=0; j<groups.length; j++){
						if(groups[j].charAt(0)=='~'){
							let decNum = convertBase(groups[j].substring(1, groups[j].length), 110, 10);
							arr[i].push(parseInt(decNum));
						}else{
							let decNum = convertBase(groups[j], 110, 10);
							if(decNum.length < 4){
								arr[i].push(parseInt(decNum));
							}else{
								decNum = decNum.toString(10).split("").map(function(t){return parseInt(t)})
								arr[i] = arr[i].concat(decNum);
							}
						}
					}
				}
				// Convert from distances to indexes
				for(i=0; i<arr.length; i++)
					arr[i] = getAbstractDecompress(arr[i]);
				return arr;
			}
			// Convert numbers to other base (10 -> 16, up to 110)
			convertBase = function convertBase(value, from_base, to_base) {
				// https://stackoverflow.com/a/32480941
				//var range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');//64
				var range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZαβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'.split('');//110
				var from_range = range.slice(0, from_base);
				var to_range = range.slice(0, to_base);
				
				var dec_value = (value+'').split('').reverse().reduce(function (carry, digit, index) {
					if (from_range.indexOf(digit) === -1) throw new Error('Invalid digit `'+digit+'` for base '+from_base+'.');
					return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));
				}, 0);
				
				var new_value = '';
				while (dec_value > 0) {
					new_value = to_range[dec_value % to_base] + new_value;
					dec_value = (dec_value - (dec_value % to_base)) / to_base;
				}
				return new_value || '0';
			}
			// Custom compress
			getCompress2 = function(arr) {
				var compArr = [], i;
				singleDigits = '';
				digitsLimit = 16;
				// loop unknown scroll indexes
				for(i = 0; i < arr.length; i++){
					l_index = arr[i];
					// If current index is single digit add to singleDigits number
					if (l_index.toString().length == 1){
						singleDigits += l_index;
						// If digit limit reached, last item in list or next index has many digits
						// then add number in the compressed array
						if(singleDigits.length>=digitsLimit || i == arr.length-1 || arr[i+1].toString().length > 1){
							if(singleDigits.length!=1 && singleDigits.length < 4) // add ~ to differenciate from 2 digit indexes
								compArr.push('~'+convertBase(parseInt(singleDigits), 10, 110));
							else
								compArr.push(convertBase(parseInt(singleDigits), 10, 110));
							singleDigits = ''// Empty singleDigits
						}
					}else{
						compArr.push(convertBase(l_index, 10, 110));
					}
				}
				return compArr.join('-');
			}

			let unknownPrefix = getCompress2(getAbstractCompress(getAllIndexes(this.info.prefix)));
			let unknownSuffix = getCompress2(getAbstractCompress(getAllIndexes(this.info.suffix)));
			
			code = `${unknownPrefix} ${unknownSuffix}`;
			//console.log('Unknown code: ', code);

			// Decode back:
			//console.log('Decode: ', decode(code));

			return code;
			*/
		},

		decodeAndHighlight : function(){
			// Implementing: https://stackoverflow.com/a/38074583/10396046
			unpack = function(packed) {
				return atob(packed).split('').map(function(x) {return ('0000000' + x.charCodeAt(0).toString(2)).substr(-8, 8);}).join('');
			}
			// Convert 001011 to {false, false, true ...}
			getArrayFromBin = function(bin) {
				return bin.split('').map(function(x) {return x === '1'});
			}

			let code = document.getElementById('shared-code-input').value;
			// Get boolean array with the visible unknown scrolls as True
			let array;
			try {
				array = getArrayFromBin(unpack(code));
			} catch (error) {
				gca_notifications.error(gca_locale.get('forge', 'invalid_share_code'));
				return;
			}
			// Check decompressed data
			if(array.length != 400){
				gca_notifications.error(gca_locale.get('forge', 'invalid_share_code'));
				return;
			}
			
			// Highligh missing
			var container = document.getElementById("content_2nd");
			for (var i = 0, row; row = container.getElementsByTagName("tr")[i]; i++) {
				row.style.color = (array[i])? 'red' : 'green';
			}
		}
	},

	// On double click item to move to smelt / repair
	doubleClickToSelect : {
		init : function(){
			// Add event
			gca_tools.event.bag.onBagOpen(() => {
				this.apply();
			});

			// If bag not already loaded
			if (document.getElementById('inv').className.match('unavailable')) {
				// Wait first bag
				gca_tools.event.bag.waitBag(() => {
					this.apply();
				});
			}
			else {
				this.apply();
			}
		},
		apply : function(){
			// For each
			jQuery("#inv .ui-draggable").each((i, item) => {
				// If already parsed
				if(item.dataset.gcaFlag_doubleClickEvent)
					return;
				// Flag as parsed
				item.dataset.gcaFlag_doubleClickEvent = true;
				// Add event
				item.addListener('dblclick', this.handler);
			});
		},
		handler : function() {
			gca_tools.item.move(this, 'forge');
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
