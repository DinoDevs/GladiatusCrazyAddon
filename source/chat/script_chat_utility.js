/*
 * Addon Chat Utility Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_chat_utility = {
	run : function(){
		// Start Timer
		gca_runtime.start();

		/* Load Addon Data */
		gca_data_manager.loadData();
		/* Load Settings */
		gca_options.run();
		
		// Url mod
		(gca_options.isOn("ENABLE_CHAT_URL_MOD") && gca_chat_url_mod.run() );
		// Style mod
		(gca_options.isOn("ENABLE_CHAT_STYLE_MOD") && gca_chat_style_mod.run() );
		// Smart Focus
		document.getElementsByTagName('iframe')[0].contentWindow.focus();

		// Stop Timer
		gca_runtime.stop();
	}
}

/*
	Addon main features Run-Time
	We need
*/
var gca_runtime = {
	start_time : null,
	stop_time : null,
	start : function(){
		this.start_time = new Date().getTime();
	},
	stop : function(){
		this.stop_time = new Date().getTime();
		_alert("Runtime: "+(this.stop_time - this.start_time)+"ms");
		delete gca_runtime;
	}
}