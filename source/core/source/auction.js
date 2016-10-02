/*
 * Addon Auction Script
 * Author: DarkThanos, GreatApo
 */

// Auction
var gca_auction = {
	inject : function(){
		// Select theme
		this.themes.activeTheme = "compact";
		// Improve
		this.interface.createItemData();
		this.interface.sortOptions();
	},

	// Interface Improvements
	interface : {
		// Items Database
		items : [],
		// Other data-translations
		data : [],
		// Sort Column
		sortColumn : -9,
		// Generate Items List
		createItemData : function(){
			// If items exist
			if(Boolean(document.getElementsByName('bid')[0])){
				//Translations
				this.data = { bid:document.getElementsByName('bid')[0].value, buyout:document.getElementsByName('buyout')[0].value,
				formAction:document.getElementById('auction_table').getElementsByTagName('form')[0].getAttribute('action'),
				myRubies:parseInt(document.getElementById('sstat_ruby_val').innerHTML.replace(/\./g,'')),
				myGold:parseInt(document.getElementById('sstat_gold_val').innerHTML.replace(/\./g,''))};
				
				//var items=[];
				
				// Create Items List
				for (i=0;i<document.getElementsByName('auctionid').length;i++){
					let tooltip = document.getElementsByClassName('auction_item_div')[i].getElementsByTagName('div')[1].getAttribute('data-tooltip');
					let temp = tooltip.match(/\["([^"]+)","([^";]+)/);
					let name = JSON.parse('["'+temp[1]+'"]')[0];
					let color = temp[2];
					let level = parseInt(tooltip.match(/(\d+)","#808080/i)[1]);
					let value = parseInt(tooltip.match(/([0-9.,]+) </i)[1].replace(/[.,]/g,''));
					this.items.push([
						/*0 ID */document.getElementsByName('auctionid')[i].value,
						/*1 Tooltip */tooltip,
						/*2 Image */document.getElementsByClassName('auction_item_div')[i].getElementsByTagName('img')[0].getAttribute('src'),
						/*3 Image Style */document.getElementsByClassName('auction_item_div')[i].getElementsByTagName('div')[1].getAttribute('style'),
						/*4 Bid Amount */parseInt(document.getElementsByName('bid_amount')[i].value), //bid_amount
						[
							/*5-1 Buyout Gold */parseInt(document.getElementsByClassName('auction_bid_div')[i].innerHTML.replace(/\./g,'').match(/\d+[ |&]/gi)[1]),
							/*5-2 Buyout Rubies */parseInt(document.getElementsByClassName('auction_bid_div')[i].innerHTML.replace(/\./g,'').match(/\d+[ |&]/gi)[2])
						],
						/*6 Bidder-false */((document.getElementsByClassName('auction_bid_div')[i].getElementsByTagName('div')[0].getElementsByTagName('span')[0])?document.getElementsByClassName('auction_bid_div')[i].getElementsByTagName('div')[0].innerHTML:false),
						/*7 Name */name,
						/*8 Color */color,
						/*9 Level */level,
						/*10 Value */value
					]);
				}
					
				// Sort items
				this.items.sort(gca_auction.sort);
				// Load Theme
				gca_auction.themes.active();
			}
		},
		// Sort Options
		sortOptions : function(){
			// Sort
			//document.getElementsByName('filterForm')[0].parentNode.appendChild(document.createElement('br'));
			var span = document.createElement('span');
			span.className = 'auction_sort';
			span.appendChild(document.createTextNode('Sort : '));
			document.getElementsByClassName('charmercsel')[0].parentNode.parentNode.appendChild(span);
			
			var newSelect = document.createElement('select');
			newSelect.addEventListener("change", function(){
				gca_auction.interface.sortColumn = this.value;
				gca_auction.interface.items.sort(gca_auction.sort);
				gca_auction.themes.active();
			}, false);
			//newSelect.setAttribute('onchange','gca_auction.interface.sortColumn=this.value;gca_auction.interface.items.sort(gca_auction.sort);gca_auction.interface.themes.compact();');
			
			var options = [['Level',9],['Gold',4],['Quality',-8],['Item name',-7],['Item Value',10],['Bidder',6]];
			
			for(let i=0;i<options.length;i++){
				let newOption = document.createElement('option');
				newOption.value = -options[i][1];
				newOption.textContent = '▼ '+options[i][0];
				newSelect.appendChild(newOption);
				newOption = document.createElement('option');
				newOption.value = options[i][1];
				newOption.textContent = '▲ '+options[i][0];
				newSelect.appendChild(newOption);
			}
			
			document.getElementsByClassName('auction_sort')[0].appendChild(newSelect);
		}
	},
	sort : function(a, b){
		var i = Math.abs(gca_auction.interface.sortColumn);
		if (a[i] === b[i]) {
			return 0;
		}else {
			return (a[i] < b[i]) ? (-1*(i/gca_auction.interface.sortColumn)) : (i/gca_auction.interface.sortColumn);
		}
	},
	bid_item : function(id){
		var price = parseInt(document.getElementById('goldInput'+id).value.replace(/\./g,''));
		
		// Post to the server
		jQuery.ajax({
			type: "POST",
			url: gca_auction.interface.data.formAction,
			data: 'auctionid='+id+'&qry=&itemType=0&itemLevel=0&itemQuality=-1&buyouthd=0&bid_amount='+price+'&bid='+gca_auction.interface.data.bid,
			success: function(response){				
				if( response.match(/title2_inner messageFail">([^<]+)<\/div/i) ){
					gca_notifications.error( response.match(/title2_inner messageFail">([^<]+)<\/div/i)[1] );
					document.getElementById('goldInput'+id).style = 'background-color: rgba(244,54,54,0.85)';
					document.getElementById('goldInput'+id).value = '';
					document.getElementById('goldInput'+id).setAttribute('data-tooltip','[[["'+response.match(/title2_inner messageFail">([^<]+)<\/div/i)[1]+'","#fff"]]]');
				}else if( response.match(/title2_inner messageSuccess">([^<]+)<\/div/i) ){
					gca_notifications.success( response.match(/title2_inner messageSuccess">([^<]+)<\/div/i)[1] );
					document.getElementById('sstat_gold_val').textContent = gca_tools.strings.insertDots(parseInt(document.getElementById('sstat_gold_val').textContent.replace(/\./g,''))-price);
					document.getElementById('goldInput'+id).style = 'background-color: rgba(0,0,255,0.50)';
					document.getElementById('goldInput'+id).value = gca_tools.strings.insertDots(parseInt(price*1.05));
					document.getElementById('goldInput'+id).setAttribute('data-tooltip','[[["You","#fff"]]]');
				}else{
					gca_notifications.error(gca_locale.get("error"));
				}
			},
			error: function(){
				gca_notifications.error(gca_locale.get("error"));
			}
		});
	},
	buyout_item : function(id){
		//var price = parseInt(document.getElementById('goldInput'+id).value.replace(/\./g,''));
		
		// Post to the server
		jQuery.ajax({
			type: "POST",
			url: gca_auction.interface.data.formAction,
			data: 'auctionid='+id+'&qry=&itemType=0&itemLevel=0&itemQuality=-1&buyouthd=0&bid_amount=0&buyout='+gca_auction.interface.data.buyout,
			success: function(response){				
				if( response.match(/title2_inner messageFail">([^<]+)<\/div/i) ){
					gca_notifications.error( response.match(/title2_inner messageFail">([^<]+)<\/div/i)[1] );
				}else if( response.match(/title2_inner messageSuccess">([^<]+)<\/div/i) ){
					gca_notifications.success( response.match(/title2_inner messageSuccess">([^<]+)<\/div/i)[1] );
					//document.getElementById('sstat_gold_val').textContent = gca_tools.strings.insertDots(parseInt(document.getElementById('sstat_gold_val').textContent.replace(/\./g,''))-price);
					//document.getElementById('sstat_ruby_val').textContent = gca_tools.strings.insertDots(parseInt(document.getElementById('sstat_ruby_val').textContent.replace(/\./g,''))-price);
				}else{
					gca_notifications.error(gca_locale.get("error"));
				}
			},
			error: function(){
				gca_notifications.error(gca_locale.get("error"));
			}
		});
	},


	// Themes
	themes : {
		// Active theme
		activeTheme : null,
		active : function(){
			// If theme exist
			if(this[this.activeTheme]){
				// Call theme
				return this[this.activeTheme]();
			}
			// Else
			//return this.compact();
		},

		// Package Theme
		compact : function(){
			// Get items
			var items = gca_auction.interface.items;

			// Remove useless elements
			if(document.getElementById('auction_table').getElementsByTagName('table')[0])
				document.getElementById('auction_table').removeChild(document.getElementById('auction_table').getElementsByTagName('table')[0]);
			if(document.getElementById('auction_table').getElementsByTagName('div')[0])
				document.getElementById('auction_table').removeChild(document.getElementById('auction_table').getElementsByTagName('div')[0]);
			document.getElementById('auction_table').appendChild(document.createElement('div'));
			
			// Items
			var temp;
			for (i=0;i<items.length;i++){
				// Create item box
				temp = document.createElement('div');
				temp.id='item'+items[i][0];
				temp.className='auctionPackageItem';
				document.getElementById('auction_table').getElementsByTagName('div')[0].appendChild(temp);
				
				// Create item title
				temp = document.createElement('div');
				temp.className='auctionPacketTitle';
				temp.title=items[i][7];
				temp.appendChild(document.createTextNode(items[i][7]));
				document.getElementById('item'+items[i][0]).appendChild(temp);
				
				// Create Image Background
				temp = document.createElement('div');
				temp.className = 'auctionPacketBg';
				temp.style = 'background-image:url(img/shop/shop_zelle.gif);';
				document.getElementById('item'+items[i][0]).appendChild(temp);
				document.getElementById('item'+items[i][0]).getElementsByTagName('div')[1].setAttribute('data-tooltip',items[i][1]);
				
				// Create item Image
				temp = document.createElement('img');
				temp.src = items[i][2];
				temp.style = '-webkit-filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px '+items[i][8]+');filter: drop-shadow(0px 0px 1px black) drop-shadow(0px 0px 2px '+items[i][8]+');';
				document.getElementById('item'+items[i][0]).getElementsByTagName('div')[1].appendChild(temp);
				
				
				// Create Level circle
				temp = document.createElement('div');
				temp.className='auction_level_number';
				if(items[i][9]<100){
					temp.style='background-image: url(img/interface/new.gif)';
				}else{
					temp.style='background-image: url(img/interface/new.gif);font-size: 0.7em;line-height: 17px;';
				}
				temp.appendChild(document.createTextNode(items[i][9]));
				document.getElementById('item'+items[i][0]).appendChild(temp);
				
				// Gold input
				temp = document.createElement('input');
				temp.className='goldInput';
				temp.value=gca_tools.strings.insertDots(items[i][4]);
				if(items[i][6]){// items[i][4]>items[i][5][0]
					if(items[i][6].match('<a')){
						temp.style='background-color: '+((items[i][6].match(/color:([^;]+);/)[1]=='blue')?'rgba(0,0,255,0.50)':'#8BC34A')+';';
					}else{
						temp.style='background-color: rgba(244,54,54,0.85);';
					}
				}else if(items[i][4]<=items[i][10]){
					temp.style='background-color: #FFEB3B;';
				}
				temp.id='goldInput'+items[i][0];
				document.getElementById('item'+items[i][0]).appendChild(temp);
				if(items[i][6]){// items[i][4]>items[i][5][0]
					document.getElementById('item'+items[i][0]).getElementsByTagName('input')[0].setAttribute('data-tooltip','[[["'+items[i][6].match(/>([^<]+)</)[1]+' ('+Math.round(items[i][4]/items[i][10]*100)+'%)","#fff"]]]');
				}else if(items[i][4]<=items[i][10]){
					document.getElementById('item'+items[i][0]).getElementsByTagName('input')[0].setAttribute('data-tooltip','[[["'+gca_locale.get('hide_your_gold_here')+'","#fff"]]]');
				}
				
				// Gold icon
				temp = document.createElement('img');
				temp.src='img/res2.gif';
				temp.className='inputGoldImg';
				document.getElementById('item'+items[i][0]).appendChild(temp);
				
				temp = document.createElement('br');
				document.getElementById('item'+items[i][0]).appendChild(temp);
				
				temp = document.createElement('input');
				temp.value=gca_auction.interface.data.bid;
				temp.type='button';
				temp.style='width:64px;margin-top:2px;';
				if(gca_auction.interface.data.myGold<items[i][4]){
					temp.className='awesome-button disabled';
				}else{
					temp.onclick=(function(item){return function(){gca_auction.bid_item(item)};})(items[i][0]);
					temp.className='awesome-button';
				}
				document.getElementById('item'+items[i][0]).appendChild(temp);
				
				temp = document.createElement('br');
				document.getElementById('item'+items[i][0]).appendChild(temp);
				
				temp = document.createElement('input');
				temp.value=gca_auction.interface.data.buyout;
				temp.type='button';
				temp.style='width:64px;margin-top:4px;';
				if(gca_auction.interface.data.myRubies<items[i][5][1] || gca_auction.interface.data.myGold<items[i][5][0]){
					temp.className='awesome-button disabled';
				}else{
					temp.onclick=(function(item){return function(){gca_auction.buyout_item(item)};})(items[i][0]);
					temp.className='awesome-button';
				}
				document.getElementById('item'+items[i][0]).appendChild(temp);
				document.getElementById('item'+items[i][0]).getElementsByTagName('input')[2].setAttribute('data-tooltip','[[["'+gca_auction.interface.data.buyout+':","#fff"],["'+gca_tools.strings.insertDots(items[i][5][0])+' <img src=\\"img/res2d.gif\\" align=\\"absmiddle\\" border=\\"0\\"> '+gca_tools.strings.insertDots(items[i][5][1])+' <img src=\\"img/res3.gif\\" align=\\"absmiddle\\" border=\\"0\\">","#fff"]]]');
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
		gca_auction.inject();
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
