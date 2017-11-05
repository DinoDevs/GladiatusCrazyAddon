/*
 * Chrome Init Script
 * Gladiatus Crazy Add On
 */

var init = setInterval(function(){
	// Wait until all ready
	if(
		!document.head ||
		!document.body ||
		!window //||
		//!window.postMessage
	) return;
	clearInterval(init);
	
	// Get info
	var manifest = chrome.runtime.getManifest();
	var info = {
		name : manifest.name,
		description : manifest.description,
		version : manifest.version
	};
	
	// Start code
	inject(
		info,
		window,
		chrome.extension.getURL("core"),
		{}
	);
			
	/*
	// Set up a Background page connection with storage
	var conn = chrome.extension.connect({name : "storage"});

	// on Background page Message Handler
	conn.onMessage.addListener(function(message){
		if(message.action == "start"){
			// Get info
			var manifest = chrome.runtime.getManifest();
			var info = {
				name : manifest.name,
				description : manifest.description,
				version : manifest.version
			};
			// Start code
			inject(
				info,
				window.document,
				chrome.extension.getURL("core"),
				message.storage
			);
		}
	});

	// on Page Message Handler
	window.addEventListener("message", function(ev){

		// on Save data
		if(ev.data.action == "save")
			// Sent data to Background page
			conn.postMessage({"action" : "save", "object" : ev.data.data});

		// on Get data
		else if(ev.data.action == "get")
			// Sent data to Background page
			conn.postMessage({"action" : "get", "object" : ev.data.data});

	}, false);

	// Get Storage
	conn.postMessage({"action" : "initialize"});
	*/
}, 5);
