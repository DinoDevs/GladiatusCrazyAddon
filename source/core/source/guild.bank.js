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
	},

	// Tools
	tools : {
		parseGold : function(text){
			// Prepare
			text = gca_tools.strings.trim(text);
			text = gca_tools.strings.removeDots(text);
			// Parse gold
			var gold = parseInt(text, 10);
			if(isNaN(gold)) return null;
			return gold;
		}
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
		},

		// Improve gold in bank
		goldInBank : function(self, wrapper){
			// Get gold values
			var bankGold = self.tools.parseGold(wrapper.getElementsByTagName("th")[1].textContent);
			var bankSafeGold = self.tools.parseGold(wrapper.getElementsByTagName("th")[3].textContent);

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
				gold = self.tools.parseGold(gold);
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

			// Improve donators interface
			this.donators(self, wrapper[0].getElementsByTagName("table")[0]);
		},

		// Improve donators
		donators : function(self, wrapper){
			// Full width
			wrapper.style.width = "100%";

			// Get rows
			var row = wrapper.getElementsByTagName("tr");
			// For each row
			var gold;
			for (var i = row.length - 1; i >= 2; i--) {
				// If row and above don't have a link
				if(
					row[i].getElementsByTagName("a").length == 0 &&
					row[i - 1].getElementsByTagName("a").length == 0
				){
					// Add golds
					gold = self.tools.parseGold(row[i].getElementsByTagName("td")[2].textContent);
					gold += self.tools.parseGold(row[i - 1].getElementsByTagName("td")[2].textContent);
					row[i - 1].getElementsByTagName("td")[2].textContent = gca_tools.strings.insertDots(gold);
					// Number of data
					row[i - 1].dataset.number = (row[i].dataset.number) ? parseInt(row[i].dataset.number, 10) + 1 : 2;
					// Remove row
					row[i].parentNode.removeChild(row[i]);
				}
			}

			// Donated gold
			var guildGold = 0;
			for (var i = row.length - 1; i >= 1; i--) {
				guildGold += self.tools.parseGold(row[i].getElementsByTagName("td")[2].textContent);
			}

			// Show data
			for (var i = row.length - 1; i >= 1; i--) {
				// Show percent
				gold = self.tools.parseGold(row[i].getElementsByTagName("td")[2].textContent);
				row[i].getElementsByTagName("td")[2].textContent += " (" + (Math.round((gold * 1000) / guildGold) / 10) + "%)";
				// If more items in row
				if (row[i].dataset.number) {
					row[i].getElementsByTagName("td")[0].textContent += " (" + row[i].dataset.number + ")";
				}
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
		gca_guild_bank.inject();
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