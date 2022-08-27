/*
 * Addon OverviewStats Script
 * Author: DarkThanos, GreatApo
 */

// OverviewStats
var gca_overview_stats = {
	inject : function(){
		// More Stats
		(gca_options.bool("overview","more_statistics") && 
			this.moreStatistics());
	},

	// Show More Statistics
	moreStatistics : function(){
		// Get Tables
		var infoTable = document.getElementById('content').getElementsByTagName('table');
		var temp;

		// Arena
		var arena = {
			battles : infoTable[0].getElementsByTagName('tr')[0],
			wins : infoTable[0].getElementsByTagName('tr')[1],
			loses : infoTable[0].getElementsByTagName('tr')[2],
			draws : infoTable[0].getElementsByTagName('tr')[3],
			hit_points_done : infoTable[0].getElementsByTagName('tr')[4],
			hit_points_taken : infoTable[0].getElementsByTagName('tr')[5],
			gold_taken : infoTable[0].getElementsByTagName('tr')[6],
			gold_lost : infoTable[0].getElementsByTagName('tr')[7],
			wins_in_row : infoTable[0].getElementsByTagName('tr')[8]
		};
		var arena_stats = {
			battles : parseInt(arena.battles.getElementsByTagName('td')[0].textContent.replace(/\./g,'')),
			wins : parseInt(arena.wins.getElementsByTagName('td')[0].textContent.replace(/\./g,'')),
			loses : parseInt(arena.loses.getElementsByTagName('td')[0].textContent.replace(/\./g,'')),
			draws : parseInt(arena.draws.getElementsByTagName('td')[0].textContent.replace(/\./g,'')),
			hit_points_done : parseInt(arena.hit_points_done.getElementsByTagName('td')[0].textContent.replace(/\./g,'')),
			hit_points_taken : parseInt(arena.hit_points_taken.getElementsByTagName('td')[0].textContent.replace(/\./g,'')),
			gold_taken : parseInt(arena.gold_taken.getElementsByTagName('td')[0].textContent.replace(/\s*<img[^>]*>/g,'').replace(/\./g,'')),
			gold_lost : parseInt(arena.gold_lost.getElementsByTagName('td')[0].textContent.replace(/\s*<img[^>]*>/g,'').replace(/\./g,''))
		};

		// Arena battles number improve
		arena.wins.getElementsByTagName('td')[0].textContent = gca_tools.strings.insertDots(arena_stats.wins) + " (" + Math.round(arena_stats.wins*100/arena_stats.battles) + "%)";
		arena.loses.getElementsByTagName('td')[0].textContent = gca_tools.strings.insertDots(arena_stats.loses) + " (" + Math.round(arena_stats.loses*100/arena_stats.battles) + "%)";
		arena.draws.getElementsByTagName('td')[0].textContent = gca_tools.strings.insertDots(arena_stats.draws) + " (" + Math.round(arena_stats.draws*100/arena_stats.battles) + "%)";
		
		// Calculate ratio
		arena_stats.ratio = Math.round((arena_stats.wins/arena_stats.loses)*100)/100;
		if (isNaN(arena_stats.ratio)) arena_stats.ratio = 1;
		arena.ratio = document.createElement('tr');
		temp = document.createElement('th');
		temp.textContent = arena.wins.getElementsByTagName('th')[0].textContent.slice(0, -1) + "/" + arena.loses.getElementsByTagName('th')[0].textContent.slice(0, -1) + " Ratio" + ":";
		arena.ratio.appendChild(temp);
		temp = document.createElement('td');
		temp.className = "stats_value";
		temp.textContent = arena_stats.ratio;
		if (arena_stats.ratio >= 1) temp.style.color = "green";
		else temp.style.color = "red";
		arena.ratio.appendChild(temp);
		arena.draws.parentNode.insertBefore(arena.ratio, arena.draws.nextSibling);

		temp = document.createElement('tr');
		temp.style.height = "10px";
		arena.ratio.parentNode.insertBefore(temp, arena.ratio.nextSibling);

		// Calculate hits difference
		arena_stats.hit_points_difference = arena_stats.hit_points_done - arena_stats.hit_points_taken;
		arena.hit_points_difference = document.createElement('tr');
		temp = document.createElement('th');
		temp.textContent = gca_locale.get("overview", "stats_difference") + ":";
		arena.hit_points_difference.appendChild(temp);
		temp = document.createElement('td');
		temp.className = "stats_value";
		temp.textContent = gca_tools.strings.insertDots(arena_stats.hit_points_difference);
		if (arena_stats.hit_points_difference >= 0) temp.style.color = "green";
		else temp.style.color = "red";
		arena.hit_points_difference.appendChild(temp);
		arena.hit_points_taken.parentNode.insertBefore(arena.hit_points_difference, arena.hit_points_taken.nextSibling);

		temp = document.createElement('tr');
		temp.style.height = "10px";
		arena.hit_points_difference.parentNode.insertBefore(temp, arena.hit_points_difference.nextSibling);

		// Calculate gold difference
		arena_stats.gold_difference = arena_stats.gold_taken - arena_stats.gold_lost;
		arena.gold_difference = document.createElement('tr');
		temp = document.createElement('th');
		temp.textContent = gca_locale.get("overview", "stats_difference") + ":";
		arena.gold_difference.appendChild(temp);
		temp = document.createElement('td');
		temp.className = "stats_value";
		temp.textContent = gca_tools.strings.insertDots(arena_stats.gold_difference) + " ";
		temp.appendChild(arena.gold_lost.getElementsByTagName('td')[0].getElementsByTagName('img')[0].cloneNode(true));
		if (arena_stats.gold_difference >= 0) temp.style.color = "green";
		else temp.style.color = "red";
		arena.gold_difference.appendChild(temp);
		arena.gold_lost.parentNode.insertBefore(arena.gold_difference, arena.gold_lost.nextSibling);

		temp = document.createElement('tr');
		temp.style.height = "10px";
		arena.gold_difference.parentNode.insertBefore(temp, arena.gold_difference.nextSibling);

		// Turma
		var turma = {
			battles : infoTable[1].getElementsByTagName('tr')[0],
			wins : infoTable[1].getElementsByTagName('tr')[1],
			loses : infoTable[1].getElementsByTagName('tr')[2],
			draws : infoTable[1].getElementsByTagName('tr')[3],
			gold_taken : infoTable[1].getElementsByTagName('tr')[4],
			gold_lost : infoTable[1].getElementsByTagName('tr')[5],
			wins_in_row : infoTable[1].getElementsByTagName('tr')[6]
		};
		var turma_stats = {
			battles : parseInt(turma.battles.getElementsByTagName('td')[0].textContent.replace(/\./g,'')),
			wins : parseInt(turma.wins.getElementsByTagName('td')[0].textContent.replace(/\./g,'')),
			loses : parseInt(turma.loses.getElementsByTagName('td')[0].textContent.replace(/\./g,'')),
			draws : parseInt(turma.draws.getElementsByTagName('td')[0].textContent.replace(/\./g,'')),
			gold_taken : parseInt(turma.gold_taken.getElementsByTagName('td')[0].textContent.replace(/\s*<img[^>]*>/g,'').replace(/\./g,'')),
			gold_lost : parseInt(turma.gold_lost.getElementsByTagName('td')[0].textContent.replace(/\s*<img[^>]*>/g,'').replace(/\./g,''))
		};

		// Arena battles number improve
		turma.wins.getElementsByTagName('td')[0].textContent = gca_tools.strings.insertDots(turma_stats.wins) + " (" + Math.round(turma_stats.wins*100/turma_stats.battles) + "%)";
		turma.loses.getElementsByTagName('td')[0].textContent = gca_tools.strings.insertDots(turma_stats.loses) + " (" + Math.round(turma_stats.loses*100/turma_stats.battles) + "%)";
		turma.draws.getElementsByTagName('td')[0].textContent = gca_tools.strings.insertDots(turma_stats.draws) + " (" + Math.round(turma_stats.draws*100/turma_stats.battles) + "%)";
		
		// Calculate ratio
		turma_stats.ratio = Math.round((turma_stats.wins/turma_stats.loses)*100)/100;
		if (isNaN(turma_stats.ratio)) turma_stats.ratio = 1;
		turma.ratio = document.createElement('tr');
		temp = document.createElement('th');
		temp.textContent = turma.wins.getElementsByTagName('th')[0].textContent.slice(0, -1) + "/" + turma.loses.getElementsByTagName('th')[0].textContent.slice(0, -1) + " Ratio" + ":";
		turma.ratio.appendChild(temp);
		temp = document.createElement('td');
		temp.className = "stats_value";
		temp.textContent = turma_stats.ratio;
		if (turma_stats.ratio >= 1) temp.style.color = "green";
		else temp.style.color = "red";
		turma.ratio.appendChild(temp);
		turma.draws.parentNode.insertBefore(turma.ratio, turma.draws.nextSibling);

		temp = document.createElement('tr');
		temp.style.height = "10px";
		turma.ratio.parentNode.insertBefore(temp, turma.ratio.nextSibling);

		// Calculate gold difference
		turma_stats.gold_difference = turma_stats.gold_taken - turma_stats.gold_lost;
		turma.gold_difference = document.createElement('tr');
		temp = document.createElement('th');
		temp.textContent = gca_locale.get("overview", "stats_difference") + ":";
		turma.gold_difference.appendChild(temp);
		temp = document.createElement('td');
		temp.className = "stats_value";
		temp.textContent = gca_tools.strings.insertDots(turma_stats.gold_difference) + " ";
		temp.appendChild(turma.gold_lost.getElementsByTagName('td')[0].getElementsByTagName('img')[0].cloneNode(true));
		if (turma_stats.gold_difference >= 0) temp.style.color = "green";
		else temp.style.color = "red";
		turma.gold_difference.appendChild(temp);
		turma.gold_lost.parentNode.insertBefore(turma.gold_difference, turma.gold_lost.nextSibling);

		temp = document.createElement('tr');
		temp.style.height = "10px";
		turma.gold_difference.parentNode.insertBefore(temp, turma.gold_difference.nextSibling);
	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_overview_stats.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_locale, gca_options, gca_tools */
