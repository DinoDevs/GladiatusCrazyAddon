/*
 * Ajax Library
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 * Version : 0.0.3
 */

/*
	= Description =
		- General -
			You can use this library to make ajax requests on any browser
		- Commands -
			xmlHttpRequest({
				url : "http:/this.domain.com/sth.html",
				headers : {
					"referrer" : "http://www.google.com"
				},
				method : "post",
				onload : function(x){
					alert(x);
				},
				onerror : function(xml){
					alert('error');
				}
			});
*/

// Fix edge bug
if(window.navigator.userAgent.indexOf("Edge") > -1){
	var contentXHR = {
		index : 0,
		create : function(x){
			var i = this.index;
			var j = Math.floor(Math.random() * 10000);
			this.index ++;

			var eventHandler = document.createElement("input");
			eventHandler.id = "gca_xhr_event_handler_no" + i;
			eventHandler.setAttribute("type","button");
			eventHandler.setAttribute("style","display:none;");

			if(x.method==undefined || x.method==null || ( x.method!="POST" && x.method!="GET" ) ) x.method="GET";

			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.charset = 'utf-8';
			script.id = 'testing';
			script.defer = true;
			script.async = true;
			var data = "";
			if(x.data != undefined) data = "						data: " + JSON.stringify(x.data) + ",\n";
			script.text = "\n\
				(function(){\n\
					var eventHandler = document.getElementById(\"" + "gca_xhr_event_handler_no" + i + "\");\n\
					jQuery.ajax({\n\
						type: \"" + x.method + "\",\n\
						url: \"" + x.url + "\",\n" + data + "\
						success: function(content){\n\
							localStorage.setItem(\"" + "gca_xhr_responce_tab_" + j + "_no" + i + "\", content)\n\
							eventHandler.click();\n\
						},\n\
						error: function(){\n\
							localStorage.removeItem(\"" + "gca_xhr_responce_tab_" + j + "_no" + i + "\")\n\
							eventHandler.click();\n\
						}\n\
					});\n\
				})();\n\
			";

			//console.log("started " + j + " " + i);

			eventHandler.addEventListener('click', function(){
				//console.log("event " + j + " " + i);
				eventHandler.parentNode.removeChild(eventHandler);
				script.parentNode.removeChild(script);
				// Error
				if(localStorage.getItem("gca_xhr_responce_tab_" + j + "_no" + i) === null){
					x.onerror(null);
				}
				else{
					var content = localStorage.getItem("gca_xhr_responce_tab_" + j + "_no" + i);
					localStorage.removeItem("gca_xhr_responce_tab_" + j + "_no" + i);
					x.onload(content);
				}
			}, false);

			
			document.body.appendChild(eventHandler);
			document.body.appendChild(script);

		},
	};
}

var dark_ajax_library = {
	absoluteLink : function(relative, base){
		// http://stackoverflow.com/questions/14780350/convert-relative-path-to-absolute-using-javascript
		// Author Bergi@stackoverflow.com
		if(!base){
			base = document.location.href;
		}
		var stack = base.split("/"),
			parts = relative.split("/");
		stack.pop(); // remove current file name (or empty string)
		// (omit if "base" is the current folder without trailing slash)
		for (var i=0; i<parts.length; i++) {
			if (parts[i] == ".")
				continue;
			if (parts[i] == "..")
				stack.pop();
			else
				stack.push(parts[i]);
		}
		return stack.join("/");
	},

	xmlHttpRequest : function(x){
		if(x.url==undefined || x.url==null) return false;

		// If Edge
		if(window.navigator.userAgent.indexOf("Edge") > -1){
			contentXHR.create(x);
			return;
		}

		var xmlhttp=false;
		if (!xmlhttp && typeof XMLHttpRequest!='undefined'){
			try {xmlhttp = new XMLHttpRequest();}
			catch (e) {xmlhttp = false;}
		}
		var url=x.url;

		// If Firefox
		if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
			// If link is a relative path
			if(url.substring(0, 4) != "http"){
				// Convert it
				url = this.absoluteLink(url);
			}
		}

		if (xmlhttp){
			xmlhttp.open(x.method, url,true);
			if(x.headers){
				for(var i in x.headers){
					xmlhttp.setRequestHeader( i, x.headers[i]);
				}
			}
			if(x.method==undefined || x.method==null || ( x.method!="POST" && x.method!="GET" ) ) x.method="GET";
			if(x.method=="POST"){
				xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
				if(xmlhttp.overrideMimeType){xmlhttp.overrideMimeType('text/xml');}
			}
			if(x.onload==undefined || x.onload==null) x.onload=function(){};
			if(x.onerror==undefined || x.onerror==null) x.onerror=function(){};
			xmlhttp.onreadystatechange=function() {
				if (xmlhttp.readyState==4) {
					if (xmlhttp.status == 200)
						x.onload(xmlhttp.responseText);
					else
						x.onerror(xmlhttp);
				}
			}
			if(x.data==undefined) x.data=null;
			xmlhttp.send(x.data);
		}
	}
}

var xmlHttpRequest = function (x){
	return dark_ajax_library.xmlHttpRequest(x);
}