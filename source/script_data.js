/*
 * Addon Data Manager Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

/*
	= GCA SAVE SYSTEM =
		- General -
			Data are saved as an "gladiatusCrazyAddonData" object using HTML5 local storage
			Data are copied in a local variable and are sychronized with the "gladiatusCrazyAddonData" object on any change
		- Commands -
			Load variable   : gca_data.get('data_name',  'default_value');
			Save variable   : gca_data.set('data_name',  'value');
			Delete variable : gca_data.del('data_name');
		- More Info -
			Manual sychronize data ( local data - local storage data )
			Sychronize local with local storage : gca_data_manager.loadData();
			Sychronize local storage with local : gca_data_manager.loadData();
			Clear all data                      : gca_data_manager.resetAll(); //( all personal data will be lost )
*/

var gca_data = {
	data : {firstRun:true},
	get : function(name, defvalue){
		if(this.data[name]!=undefined)
			return this.data[name];
		return defvalue;
	},
	set : function(name, value){
		if(value!=undefined){
			this.data[name] = value;
			gca_data_manager.saveData();
			return true;
		}
		return false;
	},
	del : function(name){
		if(this.data[name]!=undefined){
			delete this.data[name];
			gca_data_manager.saveData();
			return true;
		}
		return false;
	}
}

var gca_data_manager = {
	name : "gladiatusCrazyAddonData",
	loadData : function(){
		gca_data.data = loadLoc(this.name, {firstRun:true});
	},
	saveData : function(){
		saveLoc(this.name, gca_data.data);
	},
	resetAll : function(){
		saveLoc(this.name, {firstRun:true});
		this.loadData();
	}
}