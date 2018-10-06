/*
 * Browser Init Script
 * Gladiatus Crazy Add On
 */

var init = () => {
	// Wait until all ready
	// Usually this will be true only the first time
	if(
		!window ||
		!document.head ||
		!document.body
	) {
		setTimeout(init, 2);
		return;
	}

	// Get browser object
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
};
init();

// ESlint defs
/* global browser, chrome, inject */
