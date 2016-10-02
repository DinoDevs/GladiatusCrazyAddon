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
			
			/*
			
			// Total money
			$dark('#content div[2]').addHtml(' <font style="float:right;padding-right:10px;">('+gca_locale.get("total")+': '+subFuncts.strings.insertDots(sum)+' <img src="img/res2.gif" align="absmiddle" border="0">)</font>');
			
			// Donated percent amount
			var hisMoney = 0;
			var percent = 0;
			var othersPerCent = 100;
			var name='';
			for(i=1;i<num;i++){
				hisMoney=$dark('#content table[0] tr['+i+'] td[2]').html().replace(/\./gi,'')*1;
				percent=Math.round((hisMoney/sum)*1000)/10;
				$dark('#content table[0] tr['+i+'] td[2]').addHtml(' <b>('+percent+'%)</b>');
			}
			
			// Donatations Log Changes
			var gold;var time;var x;var day=null;
			var i=1;
			while($dark('#content table[1] tr['+(i)+']')){
				//Merge same next donators
				time=$dark('#content table[1] tr['+(i)+'] td[3]').html().match(/(\w\w\w, \d+\.\d+\.\d+)/)[0];
				if(day!=time){
					day=time;
					$dark('*tr').class('reports_day_row').html('<td colspan="4">'+day+'</td>').beforeFrom($dark('#content table[1] tr['+(i)+']'));
					//alert(day);
				}else{
					gold="<tr style=\\'color:white; font-weight: bold; font-size:9pt\\' colspan=\\'2\\' nowrap=\\'nowrap\\'><td>"+$dark('#content table[1] tr['+(i)+'] td[2]').html()+' <img src="img/res2.gif" align="absmiddle" border="0"></td></tr>';
					time="<tr style=\\'color:white; font-weight: bold; font-size:9pt\\' colspan=\\'2\\' nowrap=\\'nowrap\\'><td>"+$dark('#content table[1] tr['+(i)+'] td[3]').html().match(/(\d+:\d+:\d+)/)[0]+"</td></tr>";
					x=0;
					if($dark('#content table[1] tr['+(i+1)+']')){
						while($dark('#content table[1] tr['+i+'] td[0]') && $dark('#content table[1] tr['+(i+1)+'] td[0]') && x<=50){
							if($dark('#content table[1] tr['+i+'] td[0]').html()==$dark('#content table[1] tr['+(i+1)+'] td[0]').html()){
								gold+="<tr style=\\'color:white; font-weight: bold; font-size:9pt\\' colspan=\\'2\\' nowrap=\\'nowrap\\'><td>"+$dark('#content table[1] tr['+(i+1)+'] td[2]').html()+' <img src="img/res2.gif" align="absmiddle" border="0"></td></tr>';
								time+="<tr style=\\'color:white; font-weight: bold; font-size:9pt\\' colspan=\\'2\\' nowrap=\\'nowrap\\'><td>"+$dark('#content table[1] tr['+(i+1)+'] td[3]').html().match(/(\d+:\d+:\d+)/)[0]+"</td></tr>";
								$dark('#content table[1] tr['+(i)+'] td[2]').html(subFuncts.strings.insertDots( parseInt($dark('#content table[1] tr['+(i)+'] td[2]').html().replace(/\./g,''))+parseInt($dark('#content table[1] tr['+(i+1)+'] td[2]').html().replace(/\./g,'')) ));
								$dark('#content table[1] tr['+(i+1)+']').remove();
							}else{break;}
							x++;
						}
					}
					
					if(x>0){
						$dark('#content table[1] tr['+(i)+'] td[2]').addHtml(' <b>(+)</b>').attr('onmouseover',"return escape('<table cellspacing=2 cellpadding=2 valign=middle style=\\'width:100px;text-align:right;\\' class=\\'tooltipBox\\'>"+gold+"</table>')");
						$dark('#content table[1] tr['+(i)+'] td[3]').addHtml(' <b>(+)</b>').attr('onmouseover',"return escape('<table cellspacing=2 cellpadding=2 valign=middle style=\\'width:190px;\\' class=\\'tooltipBox\\'>"+time+"</table>')");
					}
					//Remove day, display only time
					$dark('#content table[1] tr['+(i)+'] td[3]').html($dark('#content table[1] tr['+(i)+'] td[3]').html().replace(/\w\w\w, \d+\.\d+\.\d+ - /,''));
				}
				i++
			}
			*/

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