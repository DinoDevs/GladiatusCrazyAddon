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

		// Run item categories actions
		// TODO: Add options in settings
		this.categories.check();

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
	},

	// Categories
	categories : {

		// Check if storage has the category item
		check : function() {
			// Calculate number of items for each category
			let items = [...document.querySelectorAll('#shop .ui-draggable')].reduce((info, item) => {
				let basis = item.dataset.basis.match(/^(\d+)-(\d+)$/);
				if (!basis) return info;
				if (!info.hasOwnProperty(basis[1])) info[basis[1]] = 0;
				info[basis[1]]++;
				return info;
			}, {});

			// If scrolls
			if (items[20] && items[20] > 0) {
				this.scroll.loadData();
			}
		},

		// Scrolls Category
		scroll : {
			loadData : function(){
				gca_tools.ajax.cached.known_scrolls().then(
					(result) => {
						// Save lists
						this.prefix = result.id.prefix;
						this.suffix = result.id.suffix;

						// Check scrolls
						this.showIsLearned();
					},
					() => {
						// On error
						//setTimeout(() => {
						//	this.loadData();
						//}, 10 * 1000);
					}
				);
			},
			// Apply
			showIsLearned : function(){
				// If no data return
				if(!this.prefix) return;

				// RegExp to check is item is scroll
				var isScroll = new RegExp(/^20-/);

				// For each item
				jQuery("#shop .ui-draggable").each((i, item) => {
					// If not a scroll, return
					if(!isScroll.test(item.dataset.basis)) return;

					// If already parsed
					if(item.dataset.gcaFlag_isLearned) return;
					// Flag as parsed
					item.dataset.gcaFlag_isLearned = true;

					// Get hash
					let hash = gca_tools.item.hash(item);
					if (!hash) return;
					// Check if own
					let known = (this.prefix.indexOf(hash.prefix) >= 0 || this.suffix.indexOf(hash.suffix) >= 0);
					if (known) {
						item.style.filter = "drop-shadow(2px 2px 1px rgba(255,0,0,0.4)) drop-shadow( 2px -2px 1px rgba(255,0,0,0.4)) drop-shadow(-2px -2px 1px rgba(255,0,0,0.4)) drop-shadow(-2px 2px 1px rgba(255,0,0,0.4))";
						jQuery(item).data("tooltip")[0].push([gca_locale.get("packages","known_scroll"), "red"]);
					}
					else {
						item.style.filter = "drop-shadow(2px 2px 1px rgba(0,255,0,0.4)) drop-shadow( 2px -2px 1px rgba(0,255,0,0.4)) drop-shadow(-2px -2px 1px rgba(0,255,0,0.4)) drop-shadow(-2px 2px 1px rgba(0,255,0,0.4))";
						jQuery(item).data("tooltip")[0].push([gca_locale.get("packages","unknown_scroll"), "green"]);
					}
				});
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
/* global gca_locale, gca_options, gca_tools */
/* global jQuery */
