/*
 * Browser Init Script
 * Gladiatus Crazy Add On
 */

var init = setInterval(() => {
	// Wait until all ready
	if(
		!window ||
		!document.head ||
		!document.body
	) return;
	clearInterval(init);

	var Browser = typeof browser === 'undefined' ? chrome : browser;
	
	// Get info
	var manifest = Browser.runtime.getManifest();
	var info = {
		name : manifest.name,
		description : manifest.description,
		version : manifest.version
	};
	
	// Start code
	inject(
		info,
		window,
		Browser.extension.getURL('core')
	);
}, 5);

// ESlint defs
/* global browser, chrome, inject */
