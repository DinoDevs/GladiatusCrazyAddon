/*
 * Addon Info Script
 * Author: DarkThanos, GreatApo
 */

// Addon Info
var gca = {
	name : "Gladiatus Crazy Addon",
	shortName : "GCA",
	description: "Improve your gladiatus experience!",
	version: "4.3.2",
	developers : [
		"GreatApo",
		"DarkThanos"
	],
	homepage : "https://gladiatus.dinodevs.com"
};

// Page info
var gca_section = {
	// Resolve Document Url
	resolve : function(){
		this.resolveUrl(document.location.href, this);
		this.resolvePlayerId();
	},
	// Resolve a url
	resolveUrl : function(url, data = {}){
		data.protocol = document.location.protocol;
		data.country = (url.match(/s\d+-(\w*)\.gladiatus\.gameforge\.com/))?url.match(/s\d+-(\w*)\.gladiatus\.gameforge\.com/)[1]:null;
		data.server = (url.match(/s\d+-/i))?url.match(/s(\d+)-/i)[1]:null;
		data.mod = (url.match(/mod=\w+/i))?url.match(/mod=(\w+)/i)[1]:null;
		data.submod = (url.match(/submod=\w+/i))?url.match(/submod=(\w+)/i)[1]:null;
		data.gcamod = (url.match(/gcamod=\w+/i))?url.match(/gcamod=(\w+)/i)[1]:null;
		data.sh = (url.match(/sh=[0-9a-fA-F]+/i))?url.match(/sh=([0-9a-fA-F]+)/i)[1]:null;
		data.domain = 's' + data.server + '-' + data.country + '.gladiatus.gameforge.com';
		return data;
	},
	// Get Player's id
	// WARNING: Whenever this change, also change the gca_data_manager.getPlayerId
	resolvePlayerId : function(){
		// Resolve Player Id from cookies
		var cookiePlayerId = (this.sh) ? document.cookie.match(new RegExp("Gca_" + this.country + "_" + this.server + "=(\\d+)_" + this.sh.substring(0, this.sh.length/4),"i")) : false;
		// If cookie exist
		if(cookiePlayerId && cookiePlayerId[1]){
			this.playerId = cookiePlayerId[1];
		}
		// Else
		else{
			this.playerId = 0;
		}
	},
	// Check if logged in
	isLoggedIn : function(){
		if(document.getElementById("icon_rubies") != null)
			return true;
		return false;
	}
};
// Resolve url
gca_section.resolve();

// Page Url's tools
var gca_getPage = {
	url : function(){
		return document.location.href;
	},
	link : function(x, path){
		if(!path) path = "index.php";
		var link = path;
		var front = "?";
		for(let i in x){
			link += front + i + "=" + x[i];
			if(front == "?") front = "&";
		}
		return link + front + "sh=" + gca_section.sh;
	},
	crossLink : function(s, x, path){
		if(!path) path = "index.php";
		var link = path;
		var front = "?";
		for(let i in x){
			link += front + i + "=" + x[i];
			if(front == "?") front = "&";
		}
		return s.protocol + "//" + s.domain + "/game/" + link;
	},
	crossServerLink : function(s, x, path){
		return this.crossLink({
			protocol : gca_section.protocol,
			domain : 's' + s.server + '-' + s.country + '.gladiatus.gameforge.com'
		}, x, path);
	},
	fullLink : function(x){
		return gca_section.protocol + "//" + gca_section.domain + "/game/" + this.link(x);
	},
	parameter : function(x){
		for(var array=this.url().match(/\?(.*)$/i)[1].split("&"),par={},i=0;i<array.length;i++)
			array[i]=array[i].split("="),par[array[i][0]]=(array[i].length>1)?array[i][1]:null;
		return (typeof par[x] !== "undefined")?par[x]:undefined;
	},
	parameters : function(url){
		if(!url) url = this.url();
		for(var array=url.match(/\?(.*)$/i)[1].split("&"),par={},i=0;i<array.length;i++)
			array[i]=array[i].split("="),par[array[i][0]]=array[i][1];
		return par;
	}
};

// Links
var gca_links = {
	raw : {
		// Our links
		'addon-page' : gca.homepage,
		'addon-mozilla' : 'https://addons.mozilla.org/firefox/addon/gladiatus-crazy-add-on',
		'addon-chrome' : 'https://chrome.google.com/webstore/detail/gladiatus-crazy-add-on/dfbmiedjenagoegiiabjfjpkhfocifkp',
		'gladiatus-simulator' : 'https://simulator.dinodevs.com',
		'addon-forum-thread' : 'https://forum.gladiatus.gameforge.com/forum/thread/263',
		'addon-github' : 'https://github.com/DinoDevs/GladiatusCrazyAddon',
		'addon-facebook' : 'https://www.facebook.com/GladiatusCrazyAddOn',
		'addon-donation' : 'https://paypal.me/gcadonation/5',

		// Other links
		
		'gladiatus-tools' : 'https://gladiatus-tools.com',
		'gladiatus-tools-server' : 'https://' + gca_section.country + '.gladiatus-tools.com',
		'skarsburning@forum' : 'https://forum.gladiatus.gameforge.com/user/369-skarsburning',

		'gladiatus-fansite' : 'https://gladiatus.gamerz-bg.com',
		'michalus@forum' : 'https://forum.gladiatus.gameforge.com/user/69-michalus',

		'unofficial-reddit' : 'https://www.reddit.com/r/Gladiatus',
		'reddit-discord' : 'https://discord.gg/uXEGq9Q',
		'williaf@reddit' : 'https://www.reddit.com/user/Williaf',
		
		'official-discord' : 'https://discord.gg/uacMu7'
	},

	get : function(id) {
		if (this.raw.hasOwnProperty(id))
			return this.raw[id];
		return null;
	}
};
