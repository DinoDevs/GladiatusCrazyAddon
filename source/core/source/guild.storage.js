/*
 * Addon Guild Storage Script
 * Author: DarkThanos, GreatApo
 */

// Guild Storage
var gca_guild_storage = {
	inject : function(){
		// If Item shadow
		(gca_options.bool("global","item_shadow") &&
			this.itemShadow.inject());

		// Double click to sell/buy items
		(gca_options.bool("merchants","double_click_actions") &&
			this.doubleClickActions.init());

		// Setting Link
		gca_tools.create.settingsLink("guild");
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

	// Double click sell/buy
	doubleClickActions : {
		init : function(){
			// Apply item events
			this.apply();

			// Add event
			gca_tools.event.bag.onBagOpen(() => {
				this.apply();
			});

			// If bag not already loaded
			if (document.getElementById("inv").className.match("unavailable")) {
				// Wait first bag
				gca_tools.event.bag.waitBag(() => {
					this.apply();
				});
			}

			// On item move
			gca_tools.event.request.onAjaxResponse((data) => {
				if (
					data.hasOwnProperty("data") && data.data &&
					data.data.hasOwnProperty("to") && data.data.to &&
					data.data.to.hasOwnProperty("data") && data.data.to.data &&
					data.elem.length === 1
				) {
					let item = jQuery('#content .ui-draggable[data-hash=' + data.elem[0].dataset.hash + ']');
					if (item) delete item[0].dataset.gcaFlag_doubleClickEvent;
					this.apply();
				}
			});
		},
		apply : function(){
			this.applyOn(jQuery('#inv .ui-draggable'));
			this.applyOn(jQuery('#shop .ui-draggable'));
		},
		applyOn : function(items){
			var that = this;
			// For each
			items.each(function(){
				if (!this.dataset) return;
				// If already parsed
				if(this.dataset.gcaFlag_doubleClickEvent) return;
				// Flag as parsed
				this.dataset.gcaFlag_doubleClickEvent = true;
				// Add event
				this.addListener('dblclick', that.handler);
			});
		},
		handler : function() {
			if (this.parentNode.id == 'inv') {
				gca_tools.item.move(this, 'shop');
			}
			else if (this.parentNode.id == 'shop') {
				gca_tools.item.move(this, 'inv');
			}
		}
	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_guild_storage.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_options, gca_tools */
/* global jQuery */
