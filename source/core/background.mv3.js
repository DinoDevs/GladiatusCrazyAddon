/*
 * Background Script
 * Gladiatus Crazy Add On
 */

// Walk around for manifest v3
// I hope you all have enough RAM ...
import './background.recipes.js';
let Browser = typeof browser === 'undefined' ? chrome : browser;


/* Checker Functions */

var isInteger = function(variable) {
	return variable === parseInt(variable, 10);
};



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
			actionGetRecipe(request, sender, response);

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
