/*
 * HTML5 Save Local Library
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var saveLib = {
	debug : false,
	locData : {},
	saveDataLoc : function(name,value){
		try{
			this.locData[name] = value;
			localStorage["gladiatusCrazyAddon"] = JSON.stringify(this.locData);
			return true;
		}catch(e){
			if(this.debug) this.log("[SAVE_DATA]"+e);
			return false;
		}
	},
	loadDataLoc : function(name,defValue){
		try{
			this.locData = JSON.parse(localStorage["gladiatusCrazyAddon"]);
			if(!this.locData[name] || this.locData[name]==null)
				return defValue;
			return this.locData[name];
		}catch(e){
			if(this.debug) this.log("[LOAD_DATA]"+e);
			return defValue;
		}
	},
	deleteDataLoc : function(name){
		try{
			this.locData[name] = null;
			localStorage["gladiatusCrazyAddon"] = JSON.stringify(this.locData);
			return true;
		}catch(e){
			if(this.debug) this.log("[DEL_DATA]"+e);
			return false;
		}
	},
	log : function(e){
		console.log(e);
	},
	debugMode : {
		on : function(){
			saveLib.debug = true;
		},
		off : function(){
			saveLib.debug = false;
		},
		toggle : function(){
			saveLib.debug = !saveLib.debug;
		}
	}
}