/*
 * Addon Guild Bank Script
 * Author: DarkThanos, GreatApo
 */

// Guild Library
var gca_guild_bank = {

	// Inject 
	inject : function(){

		// Donate page
		if(gca_section.submod == null || gca_section.submod == 'donate')
			this.inject_donatePage();

		// Book page
		else if(gca_section.submod == "showDonationLog")
			this.inject_bookPage();

		// Setting Link
		gca_tools.create.settingsLink("guild");
	},

	// Page - Donate
	inject_donatePage : function(){
		// Bank Book Layout improve
		(gca_options.bool("guild","bank_donate_layout") && 
			this.donateLayout.improve(this));
	},

	// Page - Book
	inject_bookPage : function(){
		// Bank Book Layout improve
		(gca_options.bool("guild","bank_book_layout") && 
			this.bookLayout.improve(this));

		// Changes since last visit
		(gca_options.bool("guild","bank_book_show_changes") && 
			this.book_show_donation_changes());
	},

	// Bank Improve
	donateLayout : {
		improve : function(self){
			// Get wrappers
			var wrapper = document.getElementById("content").getElementsByTagName("article");
			if(!wrapper) return;

			// Improve gold in bank
			this.goldInBank(self, wrapper[0].getElementsByTagName("table")[0]);
			// Improve donate all my gold
			this.insertAllPlayersGold(self, wrapper[0].getElementsByTagName("table")[1]);

			// Set gold input to number type
			var input = wrapper[0].getElementsByTagName("table")[1].getElementsByTagName("input")[0];
			input.style.width = "138px";
			input.type = "number";
		},

		// Improve gold in bank
		goldInBank : function(self, wrapper){
			// Get gold values
			var bankGold = gca_tools.strings.parseGold(wrapper.getElementsByTagName("th")[1].textContent);
			var bankSafeGold = gca_tools.strings.parseGold(wrapper.getElementsByTagName("th")[3].textContent);

			// Validate
			if(bankGold === null || bankSafeGold === null)
				return;

			// Add minus symbol
			var safeGoldCell = wrapper.getElementsByTagName("th")[3];
			safeGoldCell.insertBefore(document.createTextNode('- '), safeGoldCell.childNodes[0]);

			// Add unsafe gold row
			var unsafeGoldRow = document.createElement("tr");
			var emptyCell = document.createElement("th");
			unsafeGoldRow.appendChild(emptyCell);
			var unsafeGoldCell = document.createElement("th");
			unsafeGoldCell.setAttribute("align", "right");
			unsafeGoldCell.textContent = "= " + gca_tools.strings.insertDots(bankGold - bankSafeGold) + " ";
			unsafeGoldCell.style.borderTop = "1px solid #876e3e";
			unsafeGoldCell.appendChild(gca_tools.create.goldIcon());
			unsafeGoldRow.appendChild(unsafeGoldCell);
			wrapper.appendChild(unsafeGoldRow);
		},

		// Improve donate all my gold
		insertAllPlayersGold : function(self, wrapper){
			// Make space for the cell
			wrapper.getElementsByTagName("th")[4].removeAttribute("colspan");
			
			// Create cell
			var buttonCell = document.createElement("th");
			buttonCell.setAttribute("align", "right");
			wrapper.getElementsByTagName("tr")[2].appendChild(buttonCell);

			// Create button
			var button = document.createElement("input");
			button.setAttribute("type", "button");
			button.setAttribute("class", "button1");
			button.setAttribute("value", gca_locale.get("guild", "bank_all_gold"));
			buttonCell.appendChild(button);

			// Get input
			var input = wrapper.getElementsByTagName("th")[3].getElementsByTagName("input")[0];

			// Handle action
			button.addEventListener('click', function(){
				// Get player's gold
				var gold = document.getElementById("sstat_gold_val").textContent;
				gold = gca_tools.strings.parseGold(gold);
				// Add value
				input.value = gold;
			}, false);
		}
	},

	// Bank Book Improve
	bookLayout : {
		improve : function(self){
			// Get wrappers
			var wrapper = document.getElementById("content").getElementsByTagName("section");
			if(!wrapper) return;

			// Improve donations interface
			this.donators(self, wrapper[0].getElementsByTagName("table")[0]);
		},

		// Improve donations
		donators : function(self, wrapper){
			// Full width
			wrapper.style.width = "100%";

			// Get rows
			var row = wrapper.getElementsByTagName("tr");
			// For each row
			var gold;
			for (let i = row.length - 1; i >= 2; i--) {
				// If row and above don't have a link
				if(
					row[i].getElementsByTagName("a").length == 0 &&
					row[i - 1].getElementsByTagName("a").length == 0
				){
					// Add golds
					gold = gca_tools.strings.parseGold(row[i].getElementsByTagName("td")[2].textContent);
					gold += gca_tools.strings.parseGold(row[i - 1].getElementsByTagName("td")[2].textContent);
					row[i - 1].getElementsByTagName("td")[2].textContent = gca_tools.strings.insertDots(gold);
					// Number of data
					row[i - 1].dataset.number = (row[i].dataset.number) ? parseInt(row[i].dataset.number, 10) + 1 : 2;
					// Remove row
					row[i].parentNode.removeChild(row[i]);
				}

				// If this player
				else if (row[i].getElementsByTagName("a").length && row[i].getElementsByTagName("a")[0].href.match(new RegExp("&p=" + gca_section.playerId + "&", "i"))) {
					// Highlight player
					row[i].style.backgroundColor = "rgba(253, 199, 51, 0.6)";
				}
			}

			// Donated gold
			var guildGold = 0;
			for (let i = row.length - 1; i >= 1; i--) {
				guildGold += gca_tools.strings.parseGold(row[i].getElementsByTagName("td")[2].textContent);
			}

			// Show data
			for (let i = row.length - 1; i >= 1; i--) {
				// Show percent
				gold = gca_tools.strings.parseGold(row[i].getElementsByTagName("td")[2].textContent);
				row[i].getElementsByTagName("td")[2].textContent += " (" + (Math.round((gold * 1000) / guildGold) / 10) + "%)";
				// If more items in row
				if (row[i].dataset.number) {
					row[i].getElementsByTagName("td")[0].textContent += " \u00D7" + row[i].dataset.number;
				}
			}
		}
	},

	book_show_donation_changes : function() {
		// Get wrappers
		var wrapper = document.getElementById('content').getElementsByTagName('section');
		if(!wrapper) return;

		// Players
		var players = {};
		var memory = gca_data.section.get("cache", "guild_donations", {});

		// Get rows
		var row = wrapper[0].getElementsByTagName("table")[0].getElementsByTagName('tr');
		// For each row
		for (let i = 1; i < row.length; i++) {
			let a = row[i].getElementsByTagName('a');
			// If this is a player
			if (a.length && a[0].href.match(/(?:&amp;|&)p=\d+(?:&amp;|&)sh=/i)) {
				let id = parseInt(a[0].href.match(/(?:&amp;|&)p=(\d+)(?:&amp;|&)sh=/i)[1], 10);
				let gold = gca_tools.strings.parseGold(row[i].getElementsByTagName("td")[2].textContent);
				players[id] = gold;
				// If player info on memory
				if (memory.hasOwnProperty(id) && gold - memory[id] > 0) {
					let info = document.createElement('span');
					info.className = 'gca_donation_difference';
					info.textContent = '+' + gca_tools.strings.insertDots(gold - memory[id]);
					row[i].getElementsByTagName('td')[2].appendChild(info);
				}
			}
			else break;
		}

		// Save new data
		gca_data.section.set("cache", "guild_donations", players);
	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_guild_bank.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_data, gca_locale, gca_options, gca_section, gca_tools */
