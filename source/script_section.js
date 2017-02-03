/*
 * Addon Page Section Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_section = {
	firstRun : function(){
		try{
			this.resolve();
		}catch(e){
			this.failed = true;
			_alert('[SECTION] error: '+e);
		}
	},
	resolve : function(){
		var url = getPage.url();
		
		// Old Url
		if(url.match(/s\d+\.\w+\.gladiatus\.gameforge\.com/)){
			this.country = (url.match(/\.(\w*)\.gladiatus\.gameforge\.com/))?url.match(/\.(\w*)\.gladiatus\.gameforge\.com/)[1]:null;
			this.server = (url.match(/s\d+\./i))?url.match(/s(\d+)\./i)[1]:null;
			this.urlMode = "old";
		}
		
		// New Url
		else{
			this.country = (url.match(/s\d+-(\w*)\.gladiatus\.gameforge\.com/))?url.match(/s\d+-(\w*)\.gladiatus\.gameforge\.com/)[1]:null;
			this.server = (url.match(/s\d+-/i))?url.match(/s(\d+)-/i)[1]:null;
			this.urlMode = "new";
		}
		
		this.mod = (url.match(/mod=\w+/i))?url.match(/mod=(\w+)/i)[1]:null;
		this.submod = (url.match(/submod=\w+/i))?url.match(/submod=(\w+)/i)[1]:null;
		this.gcamod = (url.match(/gcamod=\w+/i))?url.match(/gcamod=(\w+)/i)[1]:null;
		this.sh = (url.match(/sh=[0-9a-fA-F]+/i))?url.match(/sh=([0-9a-fA-F]+)/i)[1]:null;
		this.domain = document.domain;
	}
}

