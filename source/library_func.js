/*
 * Global Functions Library
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

/* Save Load Functions */
function saveLoc(name,value){
	return saveLib.saveDataLoc(name,value);
}

function loadLoc(name,defvalue){
	return saveLib.loadDataLoc(name,defvalue);
}

function deleteLoc(name){
	return saveLib.deleteDataLoc(name);
}

/* Ajax Functions */
function xmlhttpRequest(x){
	x=ajaxLib.check_request(x);
	if(x) ajaxLib.xmlhttpRequest(x);
}

function cd_xmlhttpRequest(x){
	x=ajaxLib.check_request(x);
	if(x) ajaxLib.crossDomain_xmlhttpRequest(x);
}

/* Get Url */
var getPage = {
	url : function(){
		return document.location.href;
	},
	link : function(x){
		var link = "index.php";
		var front = "?";
		for(i in x){
			link+=front+i+"="+x[i];
			if(front=="?")front="&";
		}
		return link+front+"sh="+gca_section.sh;
	},
	fullLink : function(x){
		return gca_section.domain+"/game/"+this.link(x);
	},
	parameter : function(x){
		for(var array=this.url().match(/\?(.*)$/i)[1].split("&"),par={},i=0;i<array.length;i++)
			array[i]=array[i].split("="),par[array[i][0]]=array[i][1];
		return par[x]?par[x]:null;
	}
}
//subFuncts.strings.insertDots();
//subFuncts.strings.trim();
//subFuncts.milliseconds_to_date_format();
var subFuncts = {
	strings : {
		removeDots : function(x){
			return x.replace(/\./g,"");
		},
		insertDots : function(str){
			var x=(str + "").split(",");
			var x1 = x[0];
			var x2 = 1 < x.length ? "," + x[1] : "";
			for(str=/(\d+)(\d{3})/;str.test(x1);){
				x1 = x1.replace(str, "$1.$2");
			}
			return x1 + x2;
		},
		trim : function(str){
			return str.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"");;
		}
	},
	milliseconds_to_date_format : function(milliseconds){
		milliseconds=milliseconds-milliseconds%1000;
		var seconds=(milliseconds/1000)%60
		milliseconds=milliseconds-milliseconds%(1000*60);
		var minutes=(milliseconds/(1000*60))%60
		milliseconds=milliseconds-milliseconds%(1000*60*60);
		var hours=(milliseconds/(1000*60*60))%24
		
		if(minutes<10){minutes='0'+minutes;}
		if(seconds<10){seconds='0'+seconds;}
		if(hours<10){hours='0'+hours;}
		var x=hours+':'+minutes+':'+seconds;
		return x;
	}
}

/* Check if id exist *//*
function isID(x){
	if(document.getElementById(x))
		return true;
	return false;
}*/

/* Consol Log Function */
function _alert(x){
	var name="GCA";
	console.log("["+name+"] " + x);
	//console.log(arguments.callee.caller.toString());
}

/* Tooltip construct prototype */
dark_build_library.darkElement.prototype.tooltip = function(code,colors){
	var lines = code.length;
	if(lines==0)
		return this;
	if(!colors)
		colors = new Array();

	var tooltip="return escape('"+"<table cellspacing=2 cellpadding=2 valign=middle class=\\'tooltipBox\\'>";
	for(var i=0;i<lines;i++){
		tooltip+="<tr><td style=\\'color:"+( (colors[i])?colors[i]:"#DDD" )+"; font-weight: bold; font-size:9pt\\' colspan=\\'2\\' nowrap=\\'nowrap\\'>"+code[i].replace(/'/g,"\\'")+"</td></tr>";
	}
	tooltip+="</table>');";
	this.attr('onmouseover',tooltip);
	return this;
}

// Set Tooltips chages
var applyTooltips = function(){
	$dark('*script').html( 'if(typeof tt_Init != "undefined")tt_Init(true);' ).appendTo('body');
}