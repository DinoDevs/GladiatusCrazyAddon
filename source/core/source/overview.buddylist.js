/*
 * Addon OverviewBuddylist Script
 * Author: DarkThanos, GreatApo
 */

// OverviewBuddylist
var gca_overview_buddylist = {
	// Inject Code
	inject : function(){

		(gca_section.gcamod == 'addtarget' &&
			this.target_list.addCrossServer());

		// Show target list
		this.target_list.create();
	},

	// Show target list
	target_list : {
		create : function() {
			let article = document.createElement('article');
			article.style.marginTop = '20px';
			let title = document.createElement('h2');
			title.className = 'section-header';
			title.style.cursor = 'pointer';
			title.textContent = gca_locale.get('arena', 'target_list');
			article.appendChild(title);
			let section = document.createElement('section');
			section.style.display = 'block';
			this.wrapper = document.createElement('table');
			this.wrapper.setAttribute('border','0');
			this.wrapper.setAttribute('cellpadding','2');
			this.wrapper.setAttribute('cellspacing','2');
			this.wrapper.style.width = '100%';
			section.appendChild(this.wrapper);
			article.appendChild(section);
			document.getElementById('content').appendChild(article);
			this.update();
		},

		update : function() {
			this.wrapper.innerHTML = '';

			// Get target players
			let list = gca_data.section.get('arena', 'target-list', {});
			let players = [];
			for (let id in list) {
				if (list.hasOwnProperty(id)) {
					players.push({
						id : id,
						server : list[id][0],
						playerId : list[id][1],
						name : list[id][2]
					});
				}
			}

			players.sort(function(a, b) {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				if (a.server < b.server) return -1;
				if (a.server > b.server) return 1;
				return 0;
			});

			for (var i = 0; i < players.length; i++) {
				this.create_row(players[i].id, players[i].server, players[i].playerId, players[i].name);
			}

			if (players.length == 0) {
				let tr = document.createElement('tr');
				let td = document.createElement('td');
				td.style.textAlign = 'center';
				td.textContent = '-';
				tr.appendChild(td);
				this.wrapper.appendChild(tr);
			}
		},

		create_row : function(id, server, playerId, name) {
			let td;

			// Create row
			let tr = document.createElement('tr');

			// Name Column
			td = document.createElement('td');
			let a = document.createElement('a');
			if (server == gca_section.server) {
				a.setAttribute("href", gca_getPage.link({'mod' : 'player', 'p' : id}));
			}
			else {
				a.setAttribute("href", "https://s" + server + "-" + gca_section.country + ".gladiatus.gameforge.com/game/index.php?mod=player&p=" + playerId);
				a.setAttribute("target", "_blank");
			}
			a.textContent = name;
			td.appendChild(a);
			tr.appendChild(td);

			// Server
			td = document.createElement('td');
			td.textContent = 's' + server;
			tr.appendChild(td);

			// Id
			td = document.createElement('td');
			td.textContent = '#' + playerId;
			tr.appendChild(td);

			// Remove Column
			td = document.createElement('td');
			td.style.textAlign = 'right';
			let btn = document.createElement('button');
			btn.className = 'awesome-button';
			btn.innerHTML = '&times;';
			td.appendChild(btn);
			btn.addEventListener('click', () => {this.remove(id);});
			tr.appendChild(td);

			this.wrapper.appendChild(tr);
		},

		remove : function(id) {
			let list = gca_data.section.get('arena', 'target-list', {});
			delete list[id];
			gca_data.section.set('arena', 'target-list', list);
			this.update();
		},

		addCrossServer : function() {
			let data = gca_getPage.parameters();
			if (!data.target_server || !data.target_id || !data.target_name) return;
			if (!data.target_server.match(/^\d+$/) || !data.target_id.match(/^\d+$/)) return;

			let list = gca_data.section.get('arena', 'target-list', {});
			list[data.target_id + '@' + data.target_server] = [data.target_server, data.target_id, data.target_name];
			gca_data.section.set('arena', 'target-list', list);
		}
	}
};

(function(){
	// On page load
	var loaded = false;
	var fireLoadEvent = function() {
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_overview_buddylist.inject();
	};
	if (document.readyState == "complete" || document.readyState == "loaded") {
		fireLoadEvent();
	} else {
		window.addEventListener('DOMContentLoaded', function() {
			fireLoadEvent();
		}, true);
		window.addEventListener('load', function() {
			fireLoadEvent();
		}, true);
	}
})();
