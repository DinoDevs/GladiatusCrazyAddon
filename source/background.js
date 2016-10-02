/*
 * Chrome Background Page Script
 * Gladiatus Crazy Add On
 */

 /*
// Initialize
if(!localStorage.getItem("gca_storage")){
	localStorage.setItem("gca_storage", JSON.stringify({}));
}

// New Connection handler
chrome.extension.onConnect.addListener(function(conn){

	// on Storage Connection
	if(conn.name == "storage"){

		// Handler
		conn.onMessage.addListener(function(message){

			// Get Storage
			if(message.action == "get"){
				var storage = localStorage.getItem("gca_storage");
				storage = JSON.parse(storage);
				conn.postMessage({"storage" : storage, "action" : "get"});
			}

			// Set Storage
			else if(message.action == "save"){
				localStorage.setItem("gca_storage", JSON.stringify(message.object));
			}

			// Initialize
			else if(message.action == "initialize"){
				var storage = localStorage.getItem("gca_storage");
				storage = JSON.parse(storage);
				conn.postMessage({"storage" : storage, "action" : "start"});
			}

		});

	}

});
*/