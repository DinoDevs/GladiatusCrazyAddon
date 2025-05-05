﻿/*
 * Browser Init Script
 * Copyright (C) Gladiatus Crazy Addon
 * Licensed under GNU GPLv3
 * https://github.com/DinoDevs/GladiatusCrazyAddon
 */

// Get browser object
var Browser = typeof browser === 'undefined' ? chrome : browser;

var init = (function () {
	// Get info
	var manifest = Browser.runtime.getManifest();
	var info = {
		name : manifest.name,
		description : manifest.description,
		version : manifest.version,
		extension : Browser.runtime.id
	};

	// Initializer
	return (() => {
		// Start code
		inject(
			info,
			window,
			(Browser?.runtime?.getURL || Browser?.extension?.getURL)('core')
		);
	});
})();

(function(){
	// Wait until head is ready
	let o = new MutationObserver(() => {
		if (document.head) {
			o.disconnect();
			init();
		}
	});
	o.observe(document, {childList: true, subtree : true});
})();

// ESlint defs
/* global browser, chrome, inject */
