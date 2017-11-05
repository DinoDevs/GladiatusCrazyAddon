/*
 * Inject Page
 * Gladiatus Crazy Add On
 */

var inject = function(_info, _window, _folder, _storage){

	// Save addon info
	info.addon = _info;
	// Window
	info.data.window = _window;
	// Document
	info.data.document = _window.document;
	// Folder
	info.data.folder = _folder;
	// Storage
	info.data.storage = _storage;

	// Resolve Page
	if(!info.page.resolveUrl()){
		// Return on failed
		return;
	}
	
	// Not logged in
	if(info.page.playerId == 0)
		return;

	// Load Style
	tools.loadStyle("resources/style_gca.css");

	// Locale Load
	locale.preload();

	// Resources Load
	tools.loadCode("\n\
		var gca_resources = {\n\
			folder : \"" + _folder + "/resources/\",\n\
			audio : \"" + _folder + "/resources/audio/\",\n\
		};\n\
	");

	// Info
	tools.preloadScript("source/gca.info.js");
	// Data - Options
	tools.preloadScript("source/gca.data.js");
	// Functions
	tools.preloadScript("source/gca.tools.js");
	// Audio
	tools.preloadScript("source/gca.audio.js");
	// Notifications
	tools.preloadScript("source/gca.notifications.js");
	// Buld
	tools.preloadScript("source/gca.build.js");

	// Manager Load
	manager.load();

	return;
};

var tools = {
	// PreLoad Script
	preloadingScripts : 0,
	preloadScript : function(path) {
		// Create script
		var script = info.data.document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src",  info.data.folder + "/" + path + "?" + info.addon.version + "&built=" + (new Date()).getTime());
		tools.preloadingScripts++;
		script.addEventListener('load', function(){
			tools.preloadingScripts--;
			tools.postloadScripts();
		}, false);
		info.data.document.head.appendChild(script);
		return script;
	},
	
	loadCode : function(code) {
		// Create script
		var script = info.data.document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.text = code;
		info.data.document.head.appendChild(script);
		return script;
	},


	// Load Script
	loadingScripts : [],
	loadScript : function(path) {
		this.loadingScripts.push( info.data.folder + "/" + path + "?" + info.addon.version + "&built=" + (new Date()).getTime() );
		this.postloadScripts();
	},
	postloadScripts : function() {
		if(tools.preloadingScripts > 0)
			return;
		// Load Post Scripts
		while(this.loadingScripts.length > 0){
			// Create script
			var script = info.data.document.createElement("script");
			script.setAttribute("type", "text/javascript");
			script.setAttribute("src",  this.loadingScripts.shift());
			info.data.document.head.appendChild(script);
		}
	},

	// Load css
	loadStyle : function(path) {
		// Create css link
		var link = document.createElement( "link" );
		link.setAttribute("href", info.data.folder + "/" + path + "?" + info.addon.version + "&built=" + (new Date()).getTime());
		link.setAttribute("type", "text/css");
		link.setAttribute("rel", "stylesheet");
		info.data.document.head.appendChild(link);
	}

};
