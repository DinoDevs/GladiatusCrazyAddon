/*
 * Background Script
 * Gladiatus Crazy Add On
 */


let Browser = typeof browser === 'undefined' ? chrome : browser;


/* Checker Functions */

var isInteger = function(variable) {
	return variable === parseInt(variable, 10);
};



/* Script Loader */

var need2load = {};
var needScript = function(file, callback) {
	if (need2load.hasOwnProperty(file)) {
		if (need2load[file] === false) {
			callback();
			return true;
		}
		else {
			need2load[file].push(callback);
			return false;
		}
	}
	else {
		need2load[file] = [callback];
		loadScript(file, () => {
			let callbacks = need2load[file];
			need2load[file] = false;
			callbacks.forEach((callback) => {
				callback();
			});
		});
		return false;
	}
}
var loadScript = function(file, callback) {
	// If this is a background page mode
	if (typeof window != 'undefined') {
		let script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', 'core/' + file);
		script.addEventListener('load', () => {callback();}, false);
		document.body.appendChild(script);
	}
	// If this is a service worker mode
	// but ... it does not work :P why Chrome?
	// Google... you enforced Manifest v3 but it hardly works... not even the documentation is not ready
	// Ideally this in the future should be using import( ... ) but ... crbug/1198822
	// More info:
	// 	https://bugs.chromium.org/p/chromium/issues/detail?id=1198822
	// 	https://stackoverflow.com/a/66408379/3709257
	else if (self.importScripts) {
		self.importScripts(file);
		setTimeout(() => {callback();}, 0);
	}
	else {
		console.error('This background script mode is not supported');
	}
}


/* Actions */

var actionGetRecipe = function(request, sender, response) {
	if (!self.gladiatus_recipes) return;
	if ((!request.prefix && request.prefix !== 0) || (!request.suffix && request.suffix !== 0) || (!request.base)) return;
	if (!isInteger(request.prefix) || !isInteger(request.suffix) || !(/^\d+-\d+$/).test(request.base)) return;
	response(self.gladiatus_recipes.getRecipe(request.prefix, request.base, request.suffix));
};

var actionManager = function(request, sender, response) {
	switch (request.action) {

		case 'get-recipe':
			return needScript('background.recipes.js', () => {
				actionGetRecipe(request, sender, response);
			});

	}
}



/* Handler */

Browser.runtime.onMessageExternal.addListener((request, sender, response) => {
	if (!request.action) return;
	actionManager(request, sender, response);
});
Browser.runtime.onMessage.addListener((request, sender, response) => {
	if (!request.action) return;
	actionManager(request, sender, response);
});
