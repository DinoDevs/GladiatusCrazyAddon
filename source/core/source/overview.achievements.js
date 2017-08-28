/*
 * Addon OverviewAchievements Script
 * Author: DarkThanos, GreatApo
 */

// OverviewAchievements
var gca_overview_achievements = {
	// Pre Inject code
	preinject : function(){
		// if Achievements
		if(gca_section.submod == 'achievements'){
			// Check if style is active
			if(gca_options.bool("overview","achivements_layout"))
				// Add class tag
				document.documentElement.className += " gca_achivements_styling";
		}
	},

	// Inject Code
	inject : function(){
		// Improve Layout
		(gca_options.bool("overview","achivements_layout") && 
			this.layout.improve());
	},

	// Layout Improvements
	layout : {
		improve : function(){

			var total = 0;
			var competed = 0;
			var data;

			data = this.showCategoryPercent(0);
			competed += data[0];
			total += data[1];
			this.showCategoryPercent(1);
			competed += data[0];
			total += data[1];
			this.showCategoryPercent(2);
			competed += data[0];
			total += data[1];
			this.showCategoryPercent(10);
			competed += data[0];
			total += data[1];
			this.showCategoryPercent(3);
			competed += data[0];
			total += data[1];
			this.showCategoryPercent(8);
			competed += data[0];
			total += data[1];
			this.showCategoryPercent(9);
			competed += data[0];
			total += data[1];
			this.showCategoryPercent(12);
			competed += data[0];
			total += data[1];
			this.showCategoryPercent(16);
			competed += data[0];
			total += data[1];
			this.showCategoryPercent(21);
			competed += data[0];
			total += data[1];

			// Total Progress Percent
			var percent = 0;
			if(total>0) percent = Math.round((competed*100)/total);

			// Get title
			var totalPoints = document.getElementsByClassName('achievement_header_points')[0];

			// Create persent text
			var text = document.createElement('small');
			text.className = "gca_achievement_percent_text";
			text.textContent = "(" + Math.floor(percent) + "%)";
			totalPoints.parentNode.insertBefore(text, totalPoints);

			// Create bar
			var bar = this.createProgressBar(percent);
			totalPoints.parentNode.insertBefore(bar, totalPoints);
		},

		showCategoryPercent : function(category){
			// Check if category exist
			if(!document.getElementById('cat' + category) || !document.getElementById('CAT_' + category)){
				// Warn for the problem
				console.warn("Show category "+ category +" failed.");
				// Prevent Crash
				return [0,0];
			}

			// Total category achivements
			var total = 0;
			for (var i = 1; i <= 6; i++) {
				total += document.getElementById('cat' + category).getElementsByClassName('achievement_detail_medal' + i).length;
			}

			// Completed category achivements
			var competed = document.getElementById('cat' + category).getElementsByClassName('active').length;

			// Completed percent
			var percent = 0;
			if(total>0) percent = Math.round((competed * 100) / total);

			// Create bar
			var bar = this.createProgressBar(percent);
			document.getElementById('CAT_' + category).parentNode.insertBefore(bar, document.getElementById('CAT_' + category).nextSibling);

			// Create persent text
			var text = document.createElement('small');
			text.className = "gca_achievement_percent_text";
			text.textContent = "(" + Math.floor(percent) + "%)";
			document.getElementById('CAT_' + category).appendChild(text);

			return [competed, total];
		},

		createProgressBar : function(percent){
			// Create bar
			var bar = document.createElement('div');
			bar.className = "achievement_progress_bar";
			var percentBar = document.createElement('div');
			percentBar.className = "achievement_progress_bar_percent";
			percentBar.style.width = percent + "%";
			bar.appendChild(percentBar);

			// Return bar
			return bar;
		}
	}
};

(function(){
	// Pre Inject
	gca_overview_achievements.preinject();
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_overview_achievements.inject();
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
