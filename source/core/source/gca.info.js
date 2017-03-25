/*
 * Addon Info Script
 * Author: DarkThanos, GreatApo
 */

// Addon Info
var gca = {
	name : "Gladiatus Crazy Addon",
	shortName : "GCA",
	description: "Improve your gladiatus experience!",
	version: "4.0.0",
	developers : [
		"GreatApo",
		"DarkThanos"
	],
	homepage : "http://gladiatuscrazyaddon.tk/"
};

// Page info
var gca_section = {
	// Resolve Url
	resolve : function(){
		var url = document.location.href;
		this.country = (url.match(/s\d+-(\w*)\.gladiatus\.gameforge\.com/))?url.match(/s\d+-(\w*)\.gladiatus\.gameforge\.com/)[1]:null;
		this.server = (url.match(/s\d+-/i))?url.match(/s(\d+)-/i)[1]:null;
		this.mod = (url.match(/mod=\w+/i))?url.match(/mod=(\w+)/i)[1]:null;
		this.submod = (url.match(/submod=\w+/i))?url.match(/submod=(\w+)/i)[1]:null;
		this.gcamod = (url.match(/gcamod=\w+/i))?url.match(/gcamod=(\w+)/i)[1]:null;
		this.sh = (url.match(/sh=[0-9a-fA-F]+/i))?url.match(/sh=([0-9a-fA-F]+)/i)[1]:null;
		this.domain = document.domain;

		this.resolvePlayerId();
	},
	// Get Player's id
	resolvePlayerId : function(){
		// Resolve Player Id from cookies
		var cookiePlayerId = document.cookie.match(new RegExp("Gladiatus_" + this.country + "_" + this.server + "=(\\d+)","i"));
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
		for(i in x){
			link += front + i + "=" + x[i];
			if(front == "?") front = "&";
		}
		return link + front + "sh=" + gca_section.sh;
	},
	fullLink : function(x){
		return "http://"+gca_section.domain+"/game/"+this.link(x);
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
