/*
 * Addon Notifications Script
 * Author: DarkThanos, GreatApo
 */

// Notifications
var gca_notifications = {
	notification : null,
	run : function(){
		this.notification = document.createElement('div');
		this.notification.className = 'notification-area';
		document.body.appendChild(this.notification);
	},
	normal : function(message, url){
		if(!this.notification) this.run();
		return (new this.notificationMsg(message, url, 'notification-normal', this.notification));
	},
	success : function(message, url){
		if(!this.notification) this.run();
		return (new this.notificationMsg(message, url, 'notification-success', this.notification));
	},
	error : function(message, url){
		if(!this.notification) this.run();
		return (new this.notificationMsg(message, url, 'notification-error', this.notification));
	},
	info : function(message, url){
		if(!this.notification) this.run();
		return (new this.notificationMsg(message, url, 'notification-info', this.notification));
	},
	warning : function(message, url){
		if(!this.notification) this.run();
		return (new this.notificationMsg(message, url, 'notification-warning', this.notification));
	},
	notificationMsg : function(message, url, type, parent){
		var element = document.createElement('div');
		var icon = document.createElement('div');
		icon.className = 'icon';
		element.appendChild(icon);
		if (message.tagName) {
			element.appendChild(message);
		}
		else {
			element.appendChild(document.createTextNode(message));
		}
		element.className = 'notification-box ' + type;
		jQuery.hide(element);
		parent.appendChild(element);

		var display = true;
		setTimeout(function() {
			if (!display) return;
			display = false;
			gca_notifications.fadeOut(element);
		}, 6000);

		element.addEventListener('click', function(){
			if (!display) return;
			if (url) {
				window.location.href = url;
				return;
			}

			display = false;
			gca_notifications.fadeOut(element);
		}, false);

		return;
	},
	fadeOut : function(element){
		if(!element || !element.parentNode) return;

		jQuery(element).fadeOut('fast', function(){
			element.parentNode.removeChild(element);
		});
	},


	browser : function(title = false, message = false, icon = false, callback = false){
		// Check if ready
		if (!this._browser.permissions) {
			return;
		}

		// Object
		var obj = {};
		// Title
		if (!title) title =  '(s' + gca_section.server + '-' + gca_section.country + ') ' + gca.name;
		// Body
		if (message) obj.body = message;
		else obj.body = '';
		// Icon
		if (icon) obj.icon = gca_resources.folder + icon;
		else obj.icon = gca_resources.folder + 'icons/icon.png';

		// Show notification
		var notification = new Notification(title, obj);

		// Check if callback
		if (!callback) {
			callback = function(){
				window.focus();
				this.close();
			};
		}
		notification.addEventListener('click', callback, false);
	},
	_browser : {
		permissions : false,

		init : function(){
			var that = this;
			that.check();
		},
		check : function(){
			// Not supported?
			if (!Notification) return;
			// We need permission
			if (Notification.permission !== 'granted'){
				Notification.requestPermission();
			} else {
				this.permissions = true;
			}
		}
	}
};

// ESlint defs
/* global gca, gca_resources, gca_section */
/* global jQuery */
