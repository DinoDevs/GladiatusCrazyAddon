/*
 * Inject Page
 * Gladiatus Crazy Add On
 */

var inject = function(_info, _window, _folder){

	// Save addon info
	info.addon = _info;
	// Window
	info.data.window = _window;
	// Document
	info.data.document = _window.document;
	// Folder
	info.data.folder = _folder;

	// Resolve Page
	if(!info.page.resolveUrl()){
		// Return on failed
		return;
	}
	
	// Not logged in
	if(info.page.playerId == 0)
		return;
	
	// Resolve Player Id
	info.page.resolvePlayerId();

	// Load Style
	tools.loadStyle('resources/style_gca.css');

	// Locale Load
	locale.preload();

	// Resources Load
	tools.loadCode(
		'\n' +
		'var gca_resources = ' + JSON.stringify({
			folder : _folder + '/resources/',
			audio : _folder + '/resources/audio/'
		}, '', '\t') + ';\n' +
		'var gca_extension = ' + JSON.stringify({
			id : _info.extension
		}, '', '\t') + ';\n'
	);

	// Info
	tools.preloadScript('source/gca.info.js');
	// Data - Options
	tools.preloadScript('source/gca.data.js');
	tools.preloadScript('source/gca.data.recipes.js');
	// Functions
	let toolsScript = tools.preloadScript('source/gca.tools.js');
	// Audio
	tools.preloadScript('source/gca.audio.js');
	// Notifications
	tools.preloadScript('source/gca.notifications.js');
	// Build
	tools.preloadScript('source/gca.build.js');

	// Manager Load
	manager.load();
	manager.tools(toolsScript);

	return;
};

var tools = {
	
	// Load javascript code
	loadCode : function(code) {
		// Create script
		var script = info.data.document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.text = code;
		info.data.document.head.appendChild(script);
	},

	// PreLoad Script
	preloadingScripts : 0,
	preloadScript : function(path) {
		// Create script
		var script = info.data.document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src',  info.data.folder + '/' + path + '?' + info.addon.version + '&built=' + (new Date()).getTime());
		this.preloadingScripts++;
		script.addEventListener('load', () => {
			this.preloadingScripts--;
			this.postloadScripts();
		}, false);
		info.data.document.head.appendChild(script);
		return script;
	},


	// Load Script
	loadingScripts : [],
	loadScript : function(path) {
		this.loadingScripts.push(info.data.folder + '/' + path + '?' + info.addon.version + '&built=' + (new Date()).getTime());
		this.postloadScripts();
	},
	postloadScripts : function() {
		if(this.preloadingScripts > 0)
			return;
		// Load Post Scripts
		while (this.loadingScripts.length > 0) {
			// Create script
			var script = info.data.document.createElement('script');
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('src',  this.loadingScripts.shift());
			info.data.document.head.appendChild(script);
		}
	},

	// Load css
	loadStyle : function(path) {
		// Create css link
		var link = document.createElement('link');
		link.setAttribute('href', info.data.folder + '/' + path + '?' + info.addon.version + '&built=' + (new Date()).getTime());
		link.setAttribute('type', 'text/css');
		link.setAttribute('rel', 'stylesheet');
		info.data.document.head.appendChild(link);
	}

};

// ESlint defs
/* global info, locale, manager, tools */
