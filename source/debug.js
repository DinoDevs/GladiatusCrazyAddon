/*
 * Addon Debug Script
 * Author: DarkThanos, GreatApo, Silviu
 * Copyright: all rights reserved
 */

var gca_debug = {
	debug : false,
	run : function(callback){
		if(this.debug){
			try{
				callback();
			}catch(e){
				this.onerror(e);
			}
		}else{
			callback();
		}
	},
	onerror : function(e){
		var name=(e.name)?e.name+" : ":"Unknown error : ";
		var description=(e.description)?e.description+".":"Unexpected error.";
		var line=(e.line)?" <"+e.line+">":"";
		var stack=(e.stack)?e.stack:"none";
		var error=name+description+line+"\n"+stack+"\n"+navigator.userAgent;
		this.action(error);
	},
	action : function(error){
		console.log(error);
	}
}

$Dbug = function(x){
	gca_debug.run(x);
}