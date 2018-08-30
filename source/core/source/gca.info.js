/*
 * Addon Info Script
 * Author: DarkThanos, GreatApo
 */

// Addon Info
var gca = {
	name : "Gladiatus Crazy Addon",
	shortName : "GCA",
	description: "Improve your gladiatus experience!",
	version: "4.0.6",
	developers : [
		"GreatApo",
		"DarkThanos"
	],
	homepage : "http://gladiatuscrazyaddon.tk/"
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
