/*
 * Addon Options Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_options = {
	dataMod : true,
	run : function(){
		/* Load Data */
		this.loadData();
	},
	loadData : function(){
		var loadDataFromStorage = gca_data.get('options', false);
		if(!loadDataFromStorage)
			return;
		for(label in this.data){
			if(loadDataFromStorage[label]!=undefined || loadDataFromStorage[label]!=null){
				this.data[label] = loadDataFromStorage[label];
			}
		}
	},

	/* Get Options Values */
	isOn : function(label){
		if(this.data[label])
			return true;
		return false;
	},
	load : function(label){
		return this.data[label];
	},
	save : function(label, value){
		this.data[label] = value;
		gca_data.set('options', this.data);
	}
}