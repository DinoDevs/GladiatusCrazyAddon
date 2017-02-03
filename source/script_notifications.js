/*
 * Addon Built Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_notifications = {
	notification : null,
	run : function(){
		this.notification = $dark('*div').class("notification-area").appendTo('body');
	},
	normal : function(message){
		if(!this.notification)
			this.run();
		return (new this.notificationMsg(message, "notification-normal", this.notification) );
	},
	success : function(message){
		if(!this.notification)
			this.run();
		return (new this.notificationMsg(message, "notification-success", this.notification) );
	},
	error : function(message){
		if(!this.notification)
			this.run();
		return (new this.notificationMsg(message, "notification-error", this.notification) );
	},
	info : function(message){
		if(!this.notification)
			this.run();
		return (new this.notificationMsg(message, "notification-info", this.notification) );
	},
	warning : function(message){
		if(!this.notification)
			this.run();
		return (new this.notificationMsg(message, "notification-warning", this.notification) );
	},
	notificationMsg : function(message, type, parent){
		var element = $dark('*div').addChild(
			$dark('*div')
		).addHtml(message).class("notification-box "+type);
		var display = true;
		element.DOM().style.opacity=0;
		element.appendTo(parent);

		var fadeOut = function(){
			display = false;
			$dark().animate(
				function(x){ element.DOM().style.opacity=x; }
			, 0.8, 0, 600,
				function(){ element.DOM().style.display="none"; element.remove(); }
			);
		};

		element.click(function(){fadeOut();});
		$dark().animate(
			function(x){ element.DOM().style.opacity=x; }
		, 0, 0.8, 600,
			function(){}
		);

		setTimeout( function(){if(display)fadeOut();}, 6000);
	}
}
