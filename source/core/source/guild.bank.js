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

	},

	// Page - Book
	inject_bookPage : function(){
		// Bank Book Layout improve
		(gca_options.bool("guild","bank_book_layout") && 
			this.bookLayout.improve());
	},


	// Bank Improve
	donateLayout : {
		improve : function(){

		}
	},

	// Bank Book Improve
	bookLayout : {
		improve : function(){
			// Donations
			var donations = 0;
			var exMembers_donations = 0;

			// Set hide ex-guild member class flag
			document.getElementById("content").className += " hide-not-in-guild-players bank-book-layout";

			// Table
			var table = document.getElementById("content").getElementsByTagName("table")[0];
			table.setAttribute("width", "100%");
			table.id = "guild-bank-book-table";

			// Get rows
			var row = table.getElementsByTagName("tr");
			// For each row
			for(var i=1; i<row.length; i++){
				// Get cell
				var cell = row[i].getElementsByTagName("td");
				// Get gold
				var gold = parseInt(cell[2].textContent.replace(/\./g,''));
				donations += gold;
				// If not in guild
				if(cell[1].textContent == "-"){
					exMembers_donations += gold;
					row[i].className = "not-in-guild";
				}
				// Save gold in dataset
				cell[2].dataset.donation = gold;
			}

			// Show total donations	
			var goldInfo = document.createElement("div");
			goldInfo.id = "guild-bank-book-gold-info";
			goldInfo.appendChild(document.createTextNode("(" + gca_locale.get("total") + ": " + gca_tools.strings.insertDots(donations)));
			var goldImg = document.createElement("img");
			goldImg.src = "img/res2.gif";
			goldImg.setAttribute("align", "absmiddle");
			goldImg.setAttribute("border", "0");
			goldInfo.appendChild(goldImg);
			goldInfo.appendChild(document.createTextNode(")"));
			document.getElementById("content").getElementsByTagName("div")[2].appendChild(goldInfo);

			// Show ex-members donations
			var exMember = table.getElementsByClassName("not-in-guild");
			if(exMember.length > 0){
				exMember = exMember[0];
				var tr = exMember.cloneNode(true);
				tr.getElementsByTagName("td")[2].textContent = gca_tools.strings.insertDots(exMembers_donations);
				tr.getElementsByTagName("td")[2].dataset.donation = exMembers_donations;
				tr.className = "not-in-guild-header";
				tr.dataset.closed = true;
				tr.addEventListener('click', function(){
					var value;
					if(this.dataset.state == "opened"){
						value = "none";
						this.dataset.state = "closed";
					}else{
						value = "table-row";
						this.dataset.state = "opened";
					}

					var exMembers = table.getElementsByClassName("not-in-guild");
					for (var i = exMembers.length - 1; i >= 0; i--) {
						exMembers[i].style.display = value;
					}
				}, false);

				exMember.parentNode.insertBefore(tr, exMember);
			}

			// Setup a column
			var cell = row[0].getElementsByTagName("td");
			var td = document.createElement("td");
			td.textContent = "%";
			td.style.color = "#612D04";
    		td.style.fontWeight = "bold";
			cell[3].parentNode.insertBefore(td, cell[3]);

			// For each row
			for(var i=1; i<row.length; i++){
				// Get cell
				cell = row[i].getElementsByTagName("td");
				td = document.createElement("td");
				td.textContent = "(" + (Math.round(cell[2].dataset.donation * 1000 / donations) / 10) + "%)"
				cell[3].parentNode.insertBefore(td, cell[3]);
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