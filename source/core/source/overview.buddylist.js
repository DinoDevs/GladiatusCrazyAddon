/*
 * Addon OverviewBuddylist Script
 * Author: DarkThanos, GreatApo
 */

// OverviewBuddylist
var gca_overview_buddylist = {
	// Inject Code
	inject : function() {
		// Arena target list
		if (gca_options.bool("arena","target_list")) {
			// Handle cross server addition
			(gca_section.gcamod == 'addtarget' &&
				this.target_list.addCrossServer());

			// Show target list
			this.target_list.create();
		}

		// Setting Link
		gca_tools.create.settingsLink("arena");
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
			this.wrapper.textContent = '';

			// Get target players
			let list = gca_data.section.get('arena', 'target-list', {});
			let players = [];
			for (let id in list) {
				if (list.hasOwnProperty(id)) {
					players.push({
						id : id,
						server : list[id][0],
						playerId : list[id][1],
						name : list[id][2],
						color : list[id][3]
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
				this.create_error_row();
				this.create_row(players[i].id, players[i].server, players[i].playerId, players[i].name, players[i].color);
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

		create_error_row: function () {
			let tr = document.createElement('tr');
			let td = document.createElement('td');

			let errorRow = document.createElement('div');
			errorRow.id = 'errorRow';
			errorRow.className = 'messages error-row';
			errorRow.style.margin = "5px auto";
			errorRow.style.display = "none";

			let errorText = document.createElement('div');
			errorText.id = 'errorText';
			errorText.className = 'fail error-text';

			errorRow.appendChild(errorText);
			td.appendChild(errorRow);
			tr.appendChild(td);
			this.wrapper.appendChild(tr);
		},

		create_row : function(id, server, playerId, name, color) {
			let td;

			// Create row
			let tr = document.createElement('tr');

			// Name Column
			td = document.createElement('td');
			let a = document.createElement('a');
			if (server == gca_section.server) {
				a.setAttribute("href", gca_getPage.link({'mod' : 'player', 'p' : playerId}));
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

			// Color
			td = document.createElement('td');
			let color_picker = document.createElement('input');
			color_picker.className = "gca_colorpicker";
			color_picker.type = "color";
			color_picker.value = color;
			color_picker.addEventListener('change', function() {
				let list = gca_data.section.get('arena', 'target-list', {});
				list[playerId + '@' + server] = [server, playerId, name, this.value];
				gca_data.section.set('arena', 'target-list', list);
			}, false);
			td.appendChild(color_picker);
			tr.appendChild(td);

			// Arena Attack Column
			td = document.createElement('td');
			td.style.textAlign = 'right';
			const currentServer = window.location.host.split('-')[0].replace('s','').trim();
			if (server == currentServer) {
				let div = document.createElement('div');
				div.className = 'attack';
				div.textContent = "A";
				div.style.textAlign = "center";
				div.style.fontSize = "18px";
				div.style.color = "red";
				td.appendChild(div);
				div.addEventListener('click', () => {
					this.setupBeforeAttack(tr);
					this.startArenaFightWithName(name);
				});
			}
			tr.appendChild(td);

			// Circus Attack Column
			td = document.createElement('td');
			td.style.textAlign = 'right';
			if (server == currentServer) {
				let div = document.createElement('div');
				div.className = 'attack';
				div.textContent = "C";
				div.style.textAlign = "center";
				div.style.fontSize = "18px";
				div.style.color = "red";
				td.appendChild(div);
				div.addEventListener('click', () => {
					this.setupBeforeAttack(tr);
					this.startCircusFightWithName(name);
				});
			}
			tr.appendChild(td);

			// Remove Column
			td = document.createElement('td');
			td.style.textAlign = 'right';
			let btn = document.createElement('button');
			btn.className = 'awesome-button';
			btn.textContent = '×';
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
			list[data.target_id + '@' + data.target_server] = [data.target_server, data.target_id, data.target_name, '#ffff00'];
			gca_data.section.set('arena', 'target-list', list);
		},

		startArenaFightWithName: function (playerName) {
			sendRequest("get", "ajax/doArenaFight.php", "dname=" + encodeURIComponent(playerName), undefined);
		},

		startCircusFightWithName: function (playerName) {
			sendRequest("get", "ajax/doGroupFight.php", "dname=" + encodeURIComponent(playerName), undefined);
		},

		// response of arena/circus fight requests contains javascript functions
		// that is implemented by gameforge to set error message to #errorRow > #errorText 
		// in case of error. In order to adapt to this, we keep single element with id #errorRow
		// and it's child with #errorText, so the response's error message is displayed on the
		// correct row's error message
		setupBeforeAttack: function (tr) {
			this.cleanUpErrorRows();
			this.setErrorRow(tr);
		},

		cleanUpErrorRows: function () {
			let errorRows = jQuery(".error-row");
			for (let i = 0; i < errorRows.length; i++) {
				jQuery(errorRows[i]).removeAttr('id');
				jQuery(errorRows[i]).css('display', 'none');
				jQuery(errorRows[i]).find('.error-text').removeAttr('id');
			}
		},

		setErrorRow: function (tr) {
			let errorRow = jQuery(tr).prev().find('.error-row');
			jQuery(errorRow).css('display', '');
			jQuery(errorRow).attr('id', 'errorRow');
			jQuery(errorRow).find('.error-text').attr('id', 'errorText');
		}
	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_overview_buddylist.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_data, gca_getPage, gca_locale, gca_options, gca_section, gca_tools */
