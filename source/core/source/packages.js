/*
 * Addon Packages Script
 * Author: DarkThanos, GreatApo
 */

// Packages
var gca_packages = {
	// Pre Inject code
	preinject : function(){
		// Check if style is active
		if(gca_options.bool("packages", "filters_layout"))
			// Add class tag
			document.documentElement.className += " gca_packages_filters_layout";
	},

	// Inject Code
	inject : function(){
		// Set filters styling if enabled
		(gca_options.bool("packages", "filters_layout") && 
			this.layout.groupSideFilters());
		// Set Compact layout
		(gca_options.bool("packages", "compact_info_layout") && 
			this.layout.compactInfo());
		// If Item shadow
		(gca_options.bool("global","item_shadow") && 
			this.layout.itemShadow());
		// Set Items layout
		(gca_options.bool("packages", "items_layout") && 
			this.layout.compactPackets());
		// Fix gameforge errors
		(gca_options.bool("packages", "fix_gameforge_errors") && 
			this.fixErrors());
		// Load more pages
		(gca_options.bool("packages", "load_more_pages") && 
			this.loadPackets.load());
	},

	// Layout Improvements
	layout : {

		// Improve Info dipslay
		compactInfo : function(){
			// Gold info spacing
			document.getElementById('content').getElementsByTagName('article')[0].getElementsByTagName('h2')[0].style.marginTop = "8px";
			// Paging
			if(document.getElementById('content').getElementsByClassName('paging').length)
				document.getElementById('content').getElementsByClassName('paging')[0].parentNode.style.marginTop = "-2px";
			// Options
			document.getElementById('content').getElementsByTagName('article')[0].getElementsByTagName('h2')[1].style.marginTop = "-2px";
			// Hide Content title
			document.getElementById('content').getElementsByTagName('article')[0].getElementsByTagName('h2')[2].style.display = "none";
		},

		// Improve packet layout
		compactPackets : function(){
			// Content
			document.getElementById("content").className += " gca_compact_packages_layout";
			// Wrapper Id
			document.getElementById("packages").parentNode.id = "packages_wrapper";
		},

		// Group filters on tabs
		groupSideFilters : function(){
			// Move bag to the right
			var bagBox = document.getElementById("inv").parentNode.parentNode;
			bagBox.style.float = "right";
			bagBox.parentNode.style.padding = "0px 0px";

			// Create Side filter box
			var sideBox = document.createElement("div");
			sideBox.className = "inventoryBox package_side_filters";
			bagBox.parentNode.insertBefore(sideBox, bagBox.nextSibling);

			// Remove Centered
			sideBox.parentNode.className = "";

			// Create tabs menu
			var menu = document.createElement("div");
			menu.className = "side_menu";
			// Tabs
			var filterTab = document.createElement("div");
			filterTab.style.float = "left";
			filterTab.className = "side_tab active";
			filterTab.textContent = document.getElementById("pf").getElementsByTagName("legend")[0].textContent;
			var sortTab = document.createElement("div");
			sortTab.style.float = "right";
			sortTab.className = "side_tab";
			sortTab.textContent = document.getElementById("pa").getElementsByTagName("legend")[0].textContent;
			menu.appendChild(filterTab);
			menu.appendChild(sortTab);
			sideBox.appendChild(menu);
			// Side box container
			var container = document.createElement("div");
			container.className = "side_container";

			var filterTabContainer = document.createElement("div");
			container.appendChild(filterTabContainer);
			var sortTabContainer = document.createElement("div");
			container.appendChild(sortTabContainer);
			sortTabContainer.style.display = "none";

			sideBox.appendChild(container);

			// Old Settings
			var settingDiv = document.getElementById("pf").parentNode;

			// Insert action forms
			var actionForms = settingDiv.getElementsByTagName("form");
			actionForms[0].style.width = "190px";
			sortTabContainer.appendChild(actionForms[2]);
			sortTabContainer.appendChild(actionForms[1]);
			filterTabContainer.appendChild(actionForms[0]);

			// Events
			filterTab.addEventListener("click", function(){
				filterTab.className = "side_tab active";
				sortTab.className = "side_tab";
				filterTabContainer.style.display = "block";
				sortTabContainer.style.display = "none";
			}, false);
			sortTab.addEventListener("click", function(){
				filterTab.className = "side_tab";
				sortTab.className = "side_tab active";
				filterTabContainer.style.display = "none";
				sortTabContainer.style.display = "block";
			}, false);

			// Hide old row
			settingDiv.previousSibling.previousSibling.style.display = "none";
			settingDiv.style.display = "none";
			settingDiv.parentNode.removeChild(settingDiv);
		},

		// Item Shadow
		itemShadow : function(){
			// For each
			jQuery("#packages .ui-draggable").each(function(){
				gca_tools.itemShadow.add(this);
			});
		}
	},

	// Load more packets
	loadPackets : {
		// Inject
		load : function(){
			// Get page
			var page = this.getPage();
			if(page <= 0) return;
			// Get url params
			var urlParams = this.getUrlParams();
			// Get packets pages to show
			var pages = gca_options.get("packages", "pages_to_load");
			// Patch ajax url
			this.patchAjaxUrl(pages);
			// Load pages
			this.loadPages(page, pages, urlParams)
		},

		// Get Page
		getPage : function(){
			// Get cerrent page from paginator
			var page = document.getElementsByClassName("paging_numbers_current");
			
			// Check if other page exist
			if(page.length == 0)
				return -1;

			// Get Page number
			page = parseInt(page[0].textContent);

			// Check if valid
			if(isNaN(page))
				return -1;

			// Return
			return page;
		},

		// Get page url
		getUrlParams : function(){
			// Analyze url
			var url = gca_getPage.parameters(window.ajaxUrl);
			// Delete page number
			delete url.page;
			// Remove submod
			delete url.submod;
			// Remove sh
			delete url.sh;
			// Return url
			return url;
		},

		// Patch ajax url
		patchAjaxUrl : function(pages){
			// Analyze url
			var url = gca_getPage.parameters(window.ajaxUrl);
			// Increase page number
			url.page = parseInt(url.page) + pages - 1;
			// Remove sh
			delete url.sh;
			// Patch ajax
			window.ajaxUrl = gca_getPage.link(url, 'ajax.php');
		},

		// Load more pages
		loadPages : function(page, pages, urlParams){
			// Pages to load
			this.pageLoadArray = [];
			for(var i=1; i<pages; i++){
				urlParams.page = page + i;
				this.pageLoadArray.push(urlParams);
			}

			// Load page auter page
			this.loadPage();
		},

		// Load a page
		loadPage : function(){
			// Check id end
			if(this.pageLoadArray.length == 0)
				return;

			// Get page
			var page = this.pageLoadArray.shift();

			// Save instance
			var that = this;

			// Get packets
			jQuery.get(gca_getPage.link(page), function(content){
				// Parse items form content
				var items = content.match(/<div\s+class="packageItem">[^<]*<div[^>]+>[^<]*<\/div>[^<]*<div[^>]*>[^<]*<div[^>]*>[^<]*<\/div>[^<]*<\/div>[^<]*<div>[^<]*<br\s*\/*>[^<]*<span[^>]*>[^<]*<\/span>[^<]*<\/div>[^<]*<\/div>/gim);
				if(items == null) return;
				// For each item
				for (var i=0; i<items.length; i++){
					// Insert item on page
					that.insertPacket({newPackage : items[i]});
				}
				that.loadPage();
			});
		},

		// Insert Packet
		// Just like the page do
		insertPacket : function(data){
			// Save instance
			var that = this;

			// Append new package
			if (data.newPackage) {
				var newPackage = jQuery(data.newPackage);
				jQuery('#packages').append(newPackage);
				var drag = newPackage.find('.ui-draggable');
				makeDraggable(drag);

				// Set Items layout
				if( gca_options.bool("packages", "items_layout") ){
					// Get color
					var color = gca_tools.itemShadow.getColor(drag.data("tooltip"));
					// Add color
					drag.addClass("item-i-" + color);
				}
				
				// Correct price
				this.changeValueSimulate(jQuery('#valuePage'), drag.data('priceGold') * drag.data('amount'));
				// Add drop event
				// Gameforge for some reason don't do that on new packets :P
				newPackage.find(' > [data-container-number]').data('removeFunction', function(elem, amount){
					that.packageDropHandler(this, elem, amount);
				});
			}
			// Update pagination links
			if(data.pagination)
				jQuery('.pagination').html(data.pagination);
		},

		// Change Value
		changeValueSimulate : function(el, inc) {
			var value = el.data('value') + inc;
			el.data('value', value);
			el.text(formatZahl(value));
		},

		// Package Drop 
		packageDropHandler : function(packet, elem, amount){
			var drag = packet.getDragContainer();
			var dragPrice = elem.data('priceGold') * amount;
			// Correct prices
			this.changeValueSimulate(jQuery('#valuePage'), -1*dragPrice);
			this.changeValueSimulate(jQuery('#valueTotal'), -1*dragPrice);
			// Replace container if empty
			if (!drag.children().length) {
				// Remove old container
				drag.parents('.packageItem').first().remove();
				
				// Save instance
				var that = this;
				// Send request
				sendAjax(elem, window.ajaxUrl, '', function(data){
					that.insertPacket(data);
				}, function(){
					that.oupsNetworkError(elem, 1);
				}, {dataType: 'json', spinnerVisible: false});
			}
		},

		// On fail try again
		oupsNetworkError : function(elem, times){
			// Lets hope it was network error :P
			// or potato servers crashed

			// If this happends a lot... abandon
			if(times > 10) return;

			// Lets wait a little... exponential
			var wait = (times*time) * 1000;

			// Lets give it a try
			setTimeout(function(){
				// Send request
				sendAjax(elem, window.ajaxUrl, '', function(data){
					that.insertPacket(data);
				}, function(){
					that.oupsNetworkError(elem, times + 1);
				}, {dataType: 'json', spinnerVisible: false});
			}, wait);
		}

	},

	// Fix gameforge errors on packages manager
	fixErrors : function(){
		// Check if gameforge's code has not yet run
		if(jQuery('.packageItem > [data-container-number]').data('removeFunction') == undefined){
			// Check back later
			setTimeout(function(){
				gca_packages.fixErrors();
			}, 10);
			return;
		}

		// Ok patch code
		var that = this;
		jQuery('.packageItem > [data-container-number]').data('removeFunction', function(elem, amount){
			that.loadPackets.packageDropHandler(this, elem, amount);
		});
	}
};

(function(){
	// Pre Inject
	gca_packages.preinject();
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_packages.inject();
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
