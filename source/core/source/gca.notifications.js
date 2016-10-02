/*
 * Addon Notifications Script
 * Author: DarkThanos, GreatApo
 */

// Notifications
var gca_notifications = {
	notification : null,
	run : function(){
		this.notification = document.createElement('div');
		this.notification.className = "notification-area";
		document.body.appendChild(this.notification);
	},
	normal : function(message){
		if(!this.notification) this.run();
		return (new this.notificationMsg(message, "notification-normal", this.notification) );
	},
	success : function(message){
		if(!this.notification) this.run();
		return (new this.notificationMsg(message, "notification-success", this.notification) );
	},
	error : function(message){
		if(!this.notification) this.run();
		return (new this.notificationMsg(message, "notification-error", this.notification) );
	},
	info : function(message){
		if(!this.notification) this.run();
		return (new this.notificationMsg(message, "notification-info", this.notification) );
	},
	warning : function(message){
		if(!this.notification) this.run();
		return (new this.notificationMsg(message, "notification-warning", this.notification) );
	},
	notificationMsg : function(message, type, parent){
		var element = document.createElement('div');
		//element.appendChild(document.createElement('div'));
		element.appendChild(document.createTextNode(message));
		element.className = "notification-box "+type;
		jQuery.hide(element);
		parent.appendChild(element);

		var display = true;
		setTimeout( function(){
			if(!display) return;
			display = false;
			gca_notifications.fadeOut(element);
		}, 6000);

		element.addEventListener('click', function(){
			if(!display) return;
			display = false;
			gca_notifications.fadeOut(element);
		}, false);

		return;
	},
	fadeOut : function(element){
		if(!element || !element.parentNode) return;

		jQuery(element).fadeOut("fast", function(){
			element.parentNode.removeChild(element);
		});
	}
};
