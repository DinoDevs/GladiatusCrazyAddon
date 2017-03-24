/*
 * Addon Pantheon Gods Script
 * Author: DarkThanos, GreatApo
 */

// Overview
var gca_pantheon_gods = {
	inject : function(){

		// New Gods Layout
		//(gca_options.bool("overview", "bag_manager") && 
		//	this.layout.inject());

		// Show gods points percent
		(gca_options.bool("pantheon", "gods_show_points_percent") && 
			this.showPointsPercent());
	},

	// Gods names
	names : ["vulcanus", "mars", "merkur", "diana", "apollo", "minerva"],

	// Show gods points percent
	showPointsPercent : function(){
		// If no gods elements
		if(!document.getElementById("gods"))
			return;
		
		// For each good
		var info, points;
		for (var i = 0; i < this.names.length; i++) {
			// Get god info
			info = document.getElementById(this.names[i]).getElementsByClassName("god_points")[0];
			// Get points
			points = info.textContent.match(/(\d+) \/ (\d+)/i);
			// If points found
			if(points){
				// If full points
				if(points[1] == points[2]){
					info.style.color = "#D00000";
				}
				// Show percent
				else{
					points = "(" + (Math.round(parseInt(points[1], 10) * 100 / Math.round(points[2], 10))) + "%)";
					info.appendChild(document.createTextNode(" " + points));
				}
			}
		}
	},

/* Gods *//*
	#gca_pantheon_gods{height:120px;}
	#gca_pantheon_gods .gca_god{width:90px;float:left;}
	#gca_pantheon_gods .gca_god .icon{width: 42px;height: 42px;margin: 0 auto;background:url('icons/gods_icons.png');-webkit-filter: drop-shadow(black 0px 0px 1px) drop-shadow(black 0px 0px 4px);}
	#gca_pantheon_gods .gca_god .title{text-align: center;font-weight: bold;font-size: 16px;margin: 0px 0px 5px 0px;}
	#gca_pantheon_gods .gca_god .points{text-align: center;}
	#gca_pantheon_gods .gca_god .rewards{text-align: center;position:relative;}
	#gca_pantheon_gods .gca_god .rewards .reward_bar{position:absolute;top:0px;left:3px;height:20px;}
	#gca_pantheon_gods .gca_god .rewards .reward_bar .reward{float:left;border: 1px solid black;}
	#gca_pantheon_gods .gca_god .rewards .reward_wrapper{position:absolute;top:0px;left:3px;}
	#gca_pantheon_gods .gca_god .rewards .reward_wrapper .reward{width: 26px;float:left;border: 1px solid black;}
	#gca_pantheon_gods .vulcanus .icon{background-position: 0px 0px;}
	#gca_pantheon_gods .mars .icon{background-position: -42px 0px;}
	#gca_pantheon_gods .merkur .icon{background-position: -84px 0px;}
	#gca_pantheon_gods .diana .icon{background-position: -126px 0px;}
	#gca_pantheon_gods .apollo .icon{background-position: -168px 0px;}
	#gca_pantheon_gods .minerva .icon{background-position: -210px 0px;}
*/

	layout : {

		// Gods names
		gods : ["vulcanus", "mars", "merkur", "diana", "apollo", "minerva"],

		inject : function(){
			var content = document.getElementById("content");

			// Gods Wrapper
			var wrapper = document.createElement("div");
			wrapper.id = "gca_pantheon_gods";
			content.insertBefore(wrapper, content.firstChild);

			// Create gods
			for (var i = 0; i < gca_pantheon_gods.names.length; i++) {
				var god = document.createElement("div");
				god.className = "gca_god " + gca_pantheon_gods.names[i];

				var title = document.createElement("div");
				title.className = "title";
				title.textContent = document.getElementById(gca_pantheon_gods.names[i]).getElementsByClassName('god_name')[0].innerText;
				god.appendChild(title);

				var icon = document.createElement("div");
				icon.className = "icon";
				god.appendChild(icon);

				var pointsValues = document.getElementById(gca_pantheon_gods.names[i]).getElementsByClassName('god_points')[0].innerText;

				var points = document.createElement("div");
				points.className = "points";
				points.textContent = pointsValues;
				god.appendChild(points);

				pointsValues = pointsValues.match(/(\d+)\s*\/\s*(\d+)/i);
				pointsValues = Math.floor((pointsValues[1] / pointsValues[2]) * 100);

				var rewards = document.createElement("div");
				rewards.className = "rewards";
				god.appendChild(rewards);

				var reward_bar = document.createElement("div");
				reward_bar.className = "reward_bar";
				reward_bar.style.width = pointsValues + "%";
				rewards.appendChild(reward_bar);

				var reward_bar_1 = document.createElement("div");
				reward_bar_1.className = "reward";
				reward_bar.appendChild(reward_bar_1);
				var reward_bar_2 = document.createElement("div");
				reward_bar_2.className = "reward";
				reward_bar.appendChild(reward_bar_2);
				var reward_bar_3 = document.createElement("div");
				reward_bar_3.className = "reward";
				reward_bar.appendChild(reward_bar_3);

				var reward_wrapper = document.createElement("div");
				reward_wrapper.className = "reward_wrapper";
				rewards.appendChild(reward_wrapper);

				var reward_1 = document.createElement("div");
				reward_1.className = "reward";
				reward_1.textContent = "I";
				reward_wrapper.appendChild(reward_1);
				var reward_2 = document.createElement("div");
				reward_2.className = "reward";
				reward_2.textContent = "II";
				reward_wrapper.appendChild(reward_2);
				var reward_3 = document.createElement("div");
				reward_3.className = "reward";
				reward_3.textContent = "III";
				reward_wrapper.appendChild(reward_3);

				wrapper.appendChild(god);
			}
		}
	}
};

(function(){
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_pantheon_gods.inject();
	}
	if(document.readyState == "complete" || document.readyState == "loaded"){
		fireLoadEvent();
	}else{
		window.addEventListener('DOMContentLoaded', function(){
			fireLoadEvent();
		}, true);
		window.addEventListener('load', function(){
			fireLoadEvent();
		}, true);
	}
})();