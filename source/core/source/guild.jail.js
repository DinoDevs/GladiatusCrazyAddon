/*
 * Addon Guild Jail Script
 * Author: DarkThanos, GreatApo
 */

// Guild Jail
var gca_guild_jail = {
	inject : function(){
		// If main jail page
		if (gca_section.submod == null) {
			// Improve Layout
			(gca_options.bool("guild","jail_layout") && 
				this.layout.improve());
		}

		// Setting Link
		gca_tools.create.settingsLink("guild");
	},

	// Layout Improvements
	layout : {
		// Jail Boss Database
		jail_dataBase : {
			"10" : { name : "King Gustavo", image : gca_tools.img.cdn("img/npc/0/2_1.jpg")},
			"15" : { name : "Flavio Gnaeus Aurelius", image : gca_tools.img.cdn("img/npc/0/2_13.jpg")},
			"20" : { name : "Oribas", image : gca_tools.img.cdn("img/npc/2/1_21.jpg")},
			"25" : { name : "Helldog", image : gca_tools.img.cdn("img/npc/0/2_7.jpg")},
			"30" : { name : "Themba", image : gca_tools.img.cdn("img/npc/1/2_3.jpg")},
			"35" : { name : "Shetu",  image : gca_tools.img.cdn("img/npc/1/2_14.jpg")},
			"40" : { name : "Pyro", image : gca_tools.img.cdn("img/npc/1/2_1.jpg")},
			"45" : { name : "Nithotep", image : gca_tools.img.cdn("img/npc/1/2_6.jpg")},
			"50" : { name : "Lord Aesteron", image : gca_tools.img.cdn("img/npc/0/2_8.jpg")},
			"55" : { name : "Oak Lord", image : gca_tools.img.cdn("img/npc/2/2_4.jpg")},
			"60" : { name : "Homo Nautilus", image : gca_tools.img.cdn("img/npc/0/2_4.jpg")},
			"70" : { name : "Nekromar", image : gca_tools.img.cdn("img/npc/0/2_5.jpg")},
			"73" : { name : "Trakovar", image : gca_tools.img.cdn("img/npc/0/2_14.jpg")},
			"78" : { name : "Captian Kratos", image : gca_tools.img.cdn("img/npc/0/2_12.jpg")},
			"80" : { name : "Gernasch", image : gca_tools.img.cdn("img/npc/0/2_2.jpg")},
			"83" : { name : "Fenrirson", image : gca_tools.img.cdn("img/npc/0/2_15.jpg")},
			"88" : { name : "Zagrash", image : gca_tools.img.cdn("img/npc/0/2_6.jpg")},
			"90" : {
				"Papa" : {name : "Papa Sasama", image : gca_tools.img.cdn("img/npc/1/2_2.jpg")},
				"Sasama" : {name : "Papa Sasama", image : gca_tools.img.cdn("img/npc/1/2_2.jpg")},
				"Frank" : {name : "Frank N. Stein", image : gca_tools.img.cdn("img/npc/2/2_3.jpg")},
				"Stein" : {name : "Frank N. Stein", image : gca_tools.img.cdn("img/npc/2/2_3.jpg")}
			},
			"96" : { name : "Shetu bin Seth", image : gca_tools.img.cdn("img/npc/1/2_16.jpg")},
			"100" : { name : "Corruption", image : gca_tools.img.cdn("img/npc/1/2_8.jpg")},
			"102" : { name : "Akhekhu", image : gca_tools.img.cdn("img/npc/1/2_9.jpg")},
			"112" : { name : "Wrath Mountain", image : gca_tools.img.cdn("img/npc/2/2_5.jpg")},
			"122" : { name : "Valerius Filius Gustavo", image : gca_tools.img.cdn("img/npc/2/2_8.jpg")},
			"130" : { name : "Dracolich", image : gca_tools.img.cdn("img/npc/2/1_32.jpg")}
		},
		
		improve : function(){
			if(!document.getElementById('content').getElementsByTagName('p')[1]) return;
			
			// Get Jail's cells number
			var jailCells = document.getElementById('content').getElementsByTagName('p')[1].textContent.match(/\d+/i);

			// Set an array for the prisoners
			var prisoners = new Array();

			// Count prisoners' rows
			var jailTableRows = document.getElementById('content').getElementsByTagName('table')[0].getElementsByTagName('tr').length;
			
			// If you have the rights to free monsters
			let contentElement = document.getElementById('content');
			let admin = false;

			if (contentElement) {
    				let table = contentElement.getElementsByTagName('table')[0];
    				if (table) {
       			 		let tr = table.getElementsByTagName('tr')[1];
        				if (tr) {
            					let td = tr.getElementsByTagName('td')[3];
           					 if (td) {
                					let a = td.getElementsByTagName('a')[1];
                					admin = !!a; // Set admin to true if the anchor element exists
            					}
        				}
    				}
			}

			// If not an admin, add the 'noJailRights' class
			if (!admin) {
    				contentElement?.classList.add('noJailRights');
			}
			
			// For every prisoner row
			for(var i=1;i<jailTableRows;i++){
				// Get prisoner's info
				var name = document.getElementById('content').getElementsByTagName('table')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[0].textContent;
				var lvl = parseInt(document.getElementById('content').getElementsByTagName('table')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[1].textContent.match(/\d+/i));
				var number = document.getElementById('content').getElementsByTagName('table')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[2].textContent.match(/\d+/i);

				//Store info on a json object
				var info = {
					"name" : name,
					"lvl" : lvl,
					"img" : gca_tools.img.cdn("img/expedition/enemy_unknown.jpg"),
					"attack_code" :  document.getElementById('content').getElementsByTagName('table')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[3].getElementsByTagName('a')[0].getAttribute('onclick'),
					"attack" :  document.getElementById('content').getElementsByTagName('table')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[3].getElementsByTagName('a')[0].textContent,
					"free_link" : "#",
					"free" : "-"
				};

				// If you can free monsters
				if(admin){
					info["free_link"] = document.getElementById('content').getElementsByTagName('table')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[3].getElementsByTagName('a')[1].href;
					info["free"] = document.getElementById('content').getElementsByTagName('table')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[3].getElementsByTagName('a')[1].textContent;
				}

				// Update info using the database
				// If matching data, update
				if(this.jail_dataBase[lvl] && this.jail_dataBase[lvl].name){
					// Update prisoner image
					info['img'] = this.jail_dataBase[lvl].image;
				// If data have many prisoners
				}else if(this.jail_dataBase[lvl]){
					// Try to find the prisoner based on his name
					for(var label in this.jail_dataBase[lvl]){
						// if name match
						if( name.indexOf(label)>=0 ){
							// Update prisoner image
							info['img'] = this.jail_dataBase[lvl][label].image;
						}
					}
				}
				//Insert prisoners of the row in the array
				for(var j=0;j<number;j++){
					prisoners.push(info);
				}
			}
			
			var swapped;
			do{
				swapped = false;
				for (var i=0; i < prisoners.length-1; i++) {
					if (prisoners[i].lvl > prisoners[i+1].lvl) {
						var temp = prisoners[i];
						prisoners[i] = prisoners[i+1];
						prisoners[i+1] = temp;
						swapped = true;
					}
				}
			}while(swapped);
			
			//Built prisoners' cells
			for(var i=0;i<prisoners.length;i++){
				let div = document.createElement('div');
				div.className = 'expedition_box';
				document.getElementById('content').appendChild(div);
				
				let div2 = document.createElement('div');
				div.appendChild(div2);
				
				let div3 = document.createElement('div');
				div3.className = 'expedition_name';
				div3.textContent = prisoners[i].name;
				div2.appendChild(div3);
				
				div3 = document.createElement('div');
				div3.className = 'expedition_picture';
				div3.setAttribute('data-tooltip','[[["'+prisoners[i].name+'","#fdfdfd"]]]');
				div2.appendChild(div3);
				
				let img = document.createElement('img');
				img.src = prisoners[i].img;
				img.style = 'background-color:black;width:123px;height:142px;';
				div3.appendChild(img);
				
				let div4 = document.createElement('div');
				div4.className = 'jail_picture_cell pngfic';
				div3.appendChild(div4);
				
				div3 = document.createElement('div');
				div3.className = 'jail_level_number'; // menue_new_count
				div3.setAttribute('data-tooltip','[[["'+prisoners[i].lvl+'","#fdfdfd"]]]');
				div3.textContent = prisoners[i].lvl;
				div2.appendChild(div3);
				
				div2 = document.createElement('div');
				div.appendChild(div2);
				
				let button = document.createElement('button');
				button.type = 'button';
				button.className = 'expedition_button';
				button.textContent = prisoners[i].attack;
				button.setAttribute('onclick', prisoners[i].attack_code);
				button.style = 'margin-top:5px;';
				div2.appendChild(button);
				
				let a = document.createElement('a');
				a.href = prisoners[i].free_link;
				a.style = ((admin)?"":"display:none;");
				div2.appendChild(a);
				
				button = document.createElement('button');
				button.type = 'button';
				button.className = 'expedition_button';
				button.textContent = prisoners[i].free;
				button.style = 'margin-top:5px;';
				a.appendChild(button);
			}

			// Hide old prisoners layout
			let content = document.getElementById('content');
			// Check if the content and article exist
			if (content) {
				let article = content.getElementsByTagName('article')[0];
			if (article) {
				article.style.display = 'none';
			}
    			// Set class name for content
    			content.className = 'gca-jail-content';
			}
			// Calculate empty cells
			jailCells-=prisoners.length;

			// Built empty cells
			for(var i=0;i<jailCells;i++){
				let div = document.createElement('div');
				div.className = 'expedition_box';
				document.getElementById('content').appendChild(div);
				
				let div2 = document.createElement('div');
				div.appendChild(div2);
				
				let div3 = document.createElement('div');
				div3.className = 'expedition_name';
				div3.textContent = '#'+(prisoners.length+i+1);
				div2.appendChild(div3);
				
				div3 = document.createElement('div');
				div3.className = 'expedition_picture';
				div2.appendChild(div3);
				
				let img = document.createElement('img');
				img.src = gca_tools.img.cdn('img/costumes/background.jpg');
				img.style = 'background-color:black;width:123px;height:142px;';
				div3.appendChild(img);
				
				let div4 = document.createElement('div');
				div4.className = 'jail_picture_cell pngfic';
				div3.appendChild(div4);
				
				div2 = document.createElement('div');
				div.appendChild(div2);
				
				let button = document.createElement('button');
				button.type = 'button';
				button.className = 'expedition_button_disabled';
				button.textContent = '-';
				button.setAttribute('disabled', 'disabled');
				button.style = 'margin-top:5px;';
				div2.appendChild(button);
				
				button = document.createElement('button');
				button.type = 'button';
				button.className = 'expedition_button_disabled';
				button.textContent = '-';
				button.setAttribute('disabled', 'disabled');
				button.style = 'margin-top:5px;'+((admin)?'':'display:none;');
				div2.appendChild(button);
			}
			//End of jail improvement
			
		}
	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_guild_jail.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_options, gca_section, gca_tools */
