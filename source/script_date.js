/*
 * Addon Date Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_date = {
	// Set instant the time variables
	gTime : new Date(),
	rTime : new Date(),
	dTime : new Date(),

	// Time page intervals
	everyDay : false,
	everyHour : false,
	every12Hour : false,
	every6Hour : false,

	// Start Code run
	run : function(){
		// Search time difference of the server and the pc
		this.resolveTime();
		// Check if daily-hourly intervals are ready
		this.timeUpdates();
	},
	// Find and save pc time difference
	resolveTime : function(){
		// Check server time
		if(!$dark('#header_game span[6]').html().match(/\d+\.\d+\.\d+\s\d+:\d+/i))
			return;
		// Find and save difference
		this.updateGTime( $dark('#header_game span[6]').html() );
	},
	//  Find and save time difference of the given time
	updateGTime : function(time){
		// Trim time
		this.time_label = time.replace(/\s+/," ").replace(/^\s+|\s+$/,"");
		// If code well formated
		if(this.time_label.match(/\d\d\.\d\d\.\d\d\d\d\s\d\d:\d\d/i)){
			// Decode string
			var fullDate = this.time_label.match(/(\d\d)\.(\d\d)\.(\d\d\d\d)\s(\d\d):(\d\d)/);
			// Save main values temporary
			var date = parseInt(fullDate[1].replace(/^0+/,""));
			var month = parseInt(fullDate[2].replace(/^0+/,""))-1;
			var fullYear = parseInt(fullDate[3].replace(/^0+/,""));
			var hours = parseInt(fullDate[4].replace(/^0+/,""));
			var minutes = parseInt(fullDate[5].replace(/^0+/,""));
			var seconds = 0;
		}
		// Save server time
		this.gTime.setDate(date||0);
		this.gTime.setMonth(month||0);
		this.gTime.setFullYear(fullYear||0);
		this.gTime.setHours(hours||0);
		this.gTime.setMinutes(minutes||0);
		// Find diffenrence
		this.dTime.setTime(this.rTime.getTime()-this.gTime.getTime());
	},
	// Check intervals
	timeUpdates : function(){
		// Get saved dates
		this.dates = gca_data.get('dates', null );
		// If there are saved dates
		if(this.dates!=null){
			// Check if ready
			this.everyDay = this.timeUpdatesCheck('everyDay',24);
			this.everyHour = this.timeUpdatesCheck('everyHour',1);
			this.every6Hour = this.timeUpdatesCheck('every6Hour',6);
			this.every12Hour = this.timeUpdatesCheck('every12Hour',12);
		}else{
			// Set dates
			this.dates={
				everyDay : this.rTime.getTime(),
				everyHour : this.rTime.getTime(),
				every12Hour : this.rTime.getTime(),
				every6Hour : this.rTime.getTime(),
				lastActivity : 0
			}
			// Set check variables
			this.everyDay=true;
			this.everyHour=true;
			this.every12Hour=true;
			this.every6Hour=true;
		}

		// Set last activity
		this.lastActivity = this.dates.lastActivity;
		this.dates.lastActivity = this.rTime.getTime();

		// Save dates
		gca_data.set('dates', this.dates );
	},
	timeUpdatesCheck : function(dateID, hours){
		// Check for any error
		if( !this.dates[dateID] || isNaN(parseInt(this.dates[dateID])) ) return true;
		// Get last activity
		var lastDay = parseInt(this.dates[dateID]);
		if(this.rTime.getTime()-lastDay>=(hours*60*60*1000)){
			this.dates[dateID]=this.rTime.getTime();
			return true;
		}
		return false;
	}
}