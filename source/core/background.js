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
	let script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', file);
	script.addEventListener('load', () => {callback();}, false);
	document.body.appendChild(script);
}



/* Actions */

var actionGetRecipe = function(request, sender, response) {
	if (!window.gladiatus_recipes) return;
	if ((!request.prefix && request.prefix !== 0) || (!request.suffix && request.suffix !== 0) || (!request.base)) return;
	if (!isInteger(request.prefix) || !isInteger(request.suffix) || !(/^\d+-\d+$/).test(request.base)) return;
	response(window.gladiatus_recipes.getRecipe(request.prefix, request.base, request.suffix));
};

var actionManager = function(request, sender, response) {
	switch (request.action) {

		case 'get-recipe':
			return needScript('core/background.recipes.js', () => {
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
