/*
 * Addon Auction Script
 * Author: GreatApo
 * Copyright: all rights reserved
 */

var gca_section_auction = {
	inject : function(){
		//Check if there is content
		if(!$dark('#content'))
			return;
		
		if($dark('#auction_table')){
			// Display Number of Items
			(gca_options.isOn("ENABLE_AUCTION_DISPLAY_ITEMS_NUM") && 
			this.item_numbers());
			
			// Display Items Color on background
			(gca_options.isOn("ENABLE_AUCTION_DISPLAY_ITEMS_BGCOLOR") && 
			this.item_background_colors());

			// Auto fill items gold
			//(gca_options.isOn("ENABLE_AUCTION_AUTO_FILL_GOLD") && 
			//this.auto_fill_gold_inputs());
			
			// Multiple bids
			(gca_options.isOn("ENABLE_AUCTION_MULTIPLE_BIDS") && 
			this.multiple_bids());
			
			// Display items' lvl
			(gca_options.isOn("ENABLE_AUCTION_DISPLAY_ITEMS_LVL") && 
			this.display_items_level());

			// Display 3 items per row
			(gca_options.isOn("ENABLE_AUCTION_DISPLAY_3_ITEMS_PER_ROW") && 
			this.make_3_columns());
		}
		// Expand searchable items lvl
		(gca_options.isOn("ENABLE_AUCTION_EXPAND_ITEMS_LVL") && 
			this.expand_item_levels());
		// Improve sarch menu
		(gca_options.isOn("ENABLE_AUCTION_IMPROVE_SEARCH_MENU") && 
			this.search_menu.run());
		// Announce to guild
		(gca_options.isOn("ENABLE_AUCTION_WARN_GUILD") && 
			gca_data.get('guild', {inGuild:true} ).inGuild && this.warn_guild_mates());
		// Attach mercenaries tooltips
		this.mercenariesTooltips();
	},
	// Attach mercenaries tooltips
	mercenariesTooltips : function(){
		var e = document.getElementsByName("itemType")[0];
		var value = e.options[e.selectedIndex].value;
		if( value == 15 ){
			(gca_options.isOn("ENABLE_AUCTION_HIDE_MERCENARIES_GUIDE_ROW") && 
				$dark('*style').html('#tooltips .tooltipBox tr:nth-child(11){display:none;}').beforeFrom( $dark('#tooltips') ));
			
			var mercenary = parseInt( $dark('.charmercsel_aktive[0]').getAttr('onclick').match(/\((\d)\)/i)[1] )-2;
			if ( mercenary>0 && gca_options.isOn("ENABLE_AUCTION_MERCENARIES_TOOLTIPS") ){
				var stats = gca_data.get('player_mercenary_'+mercenary, 'null');
				if (stats!='null'){
					var i = 0;
					while( $dark('#tooltips div['+i+']') ){
						if( $dark('#tooltips .tooltipBox['+i+'] tr[9]') ){
							var item_tooltip = $dark('#tooltips .tooltipBox['+i+']').html();
							$dark('#tooltips div['+i+']').html( '<table><tbody><tr><td valign="top"><table class="tooltipBox">'+item_tooltip+'</table></td><td valign="top"><table class="tooltipBox">'+stats+'</table></td><tr/></tbody><table>' );
						}
						i++;
						i++;
					}
				}else{
					document.location.href = getPage.link({"mod":"overview","doll":"2"});
				}
			}
		}
	},
	//Items numbers
	item_numbers : function(){
		var items = document.forms.length-1;
		var bids=$dark('#auction_table span').length;
		$dark('*div').class('title2_box').style('width:535px;').html('<div class=\"title_inner\"><center>'+ gca_locale.get('number_of_items') +': ' + items + '<br>'+ gca_locale.get('number_of_bided_items') +': ' + bids + '</div></center></div>').beforeFrom($dark('#auction_table'));
		//.id('mystylecolor')
	},
	//Item background colors
	item_background_colors : function(){
		var items=document.forms.length-1;
		var i=1;var color;
		while(i<=items && i<501){
			if($dark('#auction_table td['+(i-1)+']')){
				if($dark('#auction_table td['+(i-1)+'] div[3]')){
					color=$dark('#auction_table td['+(i-1)+'] div[3]').attr('data-tooltip').match(/","(....)/i)[1];
					if (color=='lime'){color = '0, 255, 0, 0.1'}
					else if (color=='#515'){color = '0, 70, 255, 0.2'}
					else if (color=='#E30'){color = '227, 3, 224, 0.2'}
					else if (color=='#FF6'){color = '255, 106, 0, 0.2'}
					else if (color=='whit'){color = '255, 255, 255, 0.2'}
					else{color = '90, 156, 255, 0.2'}
					$dark('#auction_table td['+(i-1)+'] div[3]').style('background-color: rgba(' + color + ');width:64px;height:96px;');
				}
				i++
			}
		}
	},
	//More level options at search
	expand_item_levels : function(){
		var minlevel=parseInt($dark('#content option[0]').value());
		var lvl=parseInt($dark('#header_values_level').html());
		
		//Calculate MaxLevel
		if (lvl>36){
			var maxlevel = lvl+14;
		}else{
			var maxlevel = lvl+Math.floor(lvl * 0.25)+5;
			if((lvl*0.25)>(Math.floor(lvl * 0.25)+0.24)){maxlevel++;}
		}
		
		//Create the options
		var option;
		for (i = 0; i <(maxlevel-minlevel+1); i=i+2){
			var fnumber = (minlevel+i);
			//Level+ you browse
			if(document.getElementsByName('itemLevel')[1]){var selectedlevel = document.getElementsByName('itemLevel')[1].value;}
			else{selectedlevel = minlevel}
			
			if(fnumber==selectedlevel){var OptSelect = 'selected="selected"'}
			else{var OptSelect = ""}
			option += '<option value="' + fnumber + '" ' + OptSelect + '>' + fnumber + '+</option>' ;
		}
		
		if(document.getElementsByName('itemLevel')[0]){
			document.getElementsByName('itemLevel')[0].innerHTML=option;
		}
		
		//Show the levels you can see
		gca_section_market.make_items_you_can_see(minlevel,maxlevel);
	},
	auto_fill_gold_inputs : function(){
		var price; var value; var i=0;var percent;
		while($dark('#auction_table .auction_bid_div['+i+']')){
			price = parseInt( $dark('#auction_table .auction_bid_div['+i+'] div[1]').html().replace(/\./gi,'').match(/(\d+)/i)[1] );
			//Autofill prices
			document.getElementsByName('bid_amount')[i].value=price;
			
			//Items where you can hide gold
			value = parseInt(  $dark('#auction_table td['+i+'] div[3]').attr('data-tooltip').replace(/\./gi,'').match(/(\d+) (<img|<div class=\\"icon_gold\\")/i)[1] );
			
			//More info about prices
			percent = Math.round(price/value*100);
			
			if(value >= price){// old standar condition (value==price || value==price+1)
				$dark('#auction_table td['+i+'] div[5] input[0]').style('background-color:#FFCC66;');
				$dark('#auction_table td['+i+'] div[6]').addHtml('<br><span id="hideGoldWithPercentTranslation">'+ gca_locale.get('hide_your_gold_here') +'</span><font style="position:absolute;">('+percent+'%)</font>');
			}else{
				$dark('#auction_table td['+i+'] div[6]').addHtml('<br><font color="#555555">'+ gca_locale.get('price_eq_value') +' + '+subFuncts.strings.insertDots(price-value)+' <img align="absmiddle" src="img/res2.gif"></font> ('+percent+'%)');
			}
			
			//Check items you can affored
			var money=$dark('#sstat_gold_val').html().replace(/\./gi,'')*1;
			if(money>=price){
				$dark(document.getElementsByName('bid')[i]).addClass('auction_enable_button');
			}else{
				$dark(document.getElementsByName('bid')[i]).addClass('auction_disable_button');
			}
			i++;
		}
	},
	display_items_level : function(){
		var i=0;
		while($dark('#auction_table .auction_bid_div['+i+']')){
			//Level of each item
			$dark('*div').class('auction_level_number').style('background-image: url(img/premium/box/amount.png);background-size: contain;').attr('title','Level').text(
				$dark('#auction_table td['+i+'] div[3]').attr('data-tooltip').match(/(\d+)","#808080/i)[1]
			).beforeFrom($dark('#auction_table td['+i+'] div[0]'));
			
			i++;
		}
	},
	multiple_bids : function(){
		var i=0;
		while($dark('#auction_table form['+i+']')){
			//Each item
			id = parseInt( $dark('#auction_table form['+i+']').getAttr('id').match(/\d+/) );
			$dark('#auction_table form['+i+'] input[7]').setAttr('type','button').setAttr('id',id).click(function(){
				gca_section_auction.bid_item(this.getAttribute('id'));
			})
			i++;
		}
	},
	bid_item : function(id){
		price = parseInt( $dark('#auctionForm'+id+' input[6]').value() );
		gold = parseInt( $dark('#sstat_gold_val').html().replace(/ /g,'').replace(/\./g,'') );
		
		post_data = "auctionid="+$dark('#auctionForm'+id+' input[0]').getAttr('value')+"&qry="+$dark('#auctionForm'+id+' input[1]').getAttr('value')+"&itemType="+$dark('#auctionForm'+id+' input[2]').getAttr('value')+"&itemLevel="+$dark('#auctionForm'+id+' input[3]').getAttr('value')+"&itemQuality="+$dark('#auctionForm'+id+' input[4]').getAttr('value')+"&buyouthd="+$dark('#auctionForm'+id+' input[5]').getAttr('value')+"&bid_amount="+price+"&bid="+$dark('#auctionForm'+id+' input[7]').getAttr('value');
		xmlHttpRequest({
			url : $dark('#auctionForm'+id).getAttr('action'),//index.php?mod=auction&submod=placeBid&ttype=2&rubyAmount=62&sh=7112c01ef07d96455a35d977977c4ac9
			method : "POST",
			data : post_data,
			onload : function(content){
				if( content.match(/title2_inner messageFail">([^<]+)<\/div/i) ){
					gca_notifications.error( content.match(/title2_inner messageFail">([^<]+)<\/div/i)[1] );
				}else if( content.match(/title2_inner messageSuccess">([^<]+)<\/div/i) ){
					gca_notifications.success( content.match(/title2_inner messageSuccess">([^<]+)<\/div/i)[1] );
					$dark('#sstat_gold_val').html( subFuncts.strings.insertDots(gold-price) );
					$dark('#'+id).setAttr('style','cursor:not-allowed;').setAttr('disabled','');
					$dark('#auctionForm'+id).parent().parent().setAttr('style','background-color: rgba(150,150,150,0.6);');
				}else{
					gca_notifications.error(gca_locale.get("error"));
				}
			}
		});
	},
	make_3_columns : function(){
		var itemNum=document.forms.length - 1;
		if($dark('#auction_table') && itemNum>5){
			//Style
			$dark('#auction_table').class('x3columns');
			//Bottom image
			$dark('#auction_table').addChild([$dark('*div').class('auction_bottom_image')]);
			//Top image
			$dark('*div').class('auction_top_image').beforeFrom($dark('#auction_table table[0]'));
			
			for(i=5;i<=itemNum;i=i+6){
				$dark('#auction_table td['+(i-1)+']').id('td1');
				$dark('#auction_table td['+(i)+']').id('td2');
			}
		}
	},
	search_menu : {
		run : function(){
			this.items_lists();
		},
		//Items Database
		items_dataBase : function(){
			var items = [
				"Adendathiels","Amelias","Amoviels","Anchorons","Antonius","Appius","Asayseths","Asendacs","Ashitills","Aurelius","Avalonius",
				"Bacias","Barbekuus","Beasthammers","Belesarius","Berrys","Bilgs",
				"Calódiens","Chabdyns","Chalinis","Chealoths","Cheggovs","Chucks","Ciallans","Cisiens","Constantius",
				"Dairus","Decimus","Denovs","Dexterus","Doitrems","Doomeniks",
				"Elrarangs","Elvilmandels","Elywens","Evotavs",
				"Fernabasts","Fitschis","Frabos","Frickoys","Frientas","Fustriels",
				"Gadriewens","Gaius","Galarands","Gidras","Giganticus","Gonaks","Granks","Grasscrawlers",
				"Heudois","Heuhois",
				"Ibiwans","Ichorus","Ismaels","Isundels",
				"Jennifers",
				"Kedyssis","Kerrannas","Korks","Kosmonas",
				"Leandronimus","Lepidus","Liloels","Lothays","Lucius","Lulus","Lurtscharas",
				"Mandalus","Manius","Marcellus","Marcus","Mateus","Medonis","Melanchaetas","Melaneos","Mermereus","Mimas","Monychustas","Mooncruchers",
				"Nariths",
				"Opiehnzas","Orlelds",
				"Peragos","Phalangens","Poirins","Pontius","Purmanns",
				"Quitus",
				"Rakrests","Rayols","Redos","Reinkes","Ronaldas","Rynightes",
				"Sentarions","Servius","Sextus","Shivas","Silvanus","Skiterus","Solitanis","Sphingens","Spurius","Stoybaers","Sugos",
				"Táliths","Tanias","Tantus","Tellus","Thorstens","Tinothiels","Titanius","Titus","Trafans","Tûnêsés",
				"Umbros","Umfetas","Umilawens","Uridos","Uróthiens",
				"Valerius","Vergilius","Vuthiels",
				"Watzmanns",
				"Xenphlames","Xus",
				"Yas",
				"Zeindras","Zickezackes","Zimbris","Zombers",
				"Αβαλόνιους","Αντόνιους",
				"Βελεσάριους","Βεργκίλιους",
				"Δαιμονοφονιάδες",
				"Κουίντους",
				"Μαρσέλλους",
				"Πόντιους",
				"Τέλλους"
			];
			return items;
		},
		items_lists : function(){
			var types_code=gca_data.get('auction_types_code','$dark(\'*tr\').html(\'<td style="width: 50%; text-align: center;">\'+ gca_locale.get("type") +\'</td><td style="width: 50%;"><div class="auction_premium"></div></td>\').beforeFrom($dark(\'#content form[0] table[0] tr[2]\'));');
			var items_code=gca_data.get('auction_items_code','$dark(\'*tr\').html(\'<td style="width: 50%; text-align: center;">\'+ title +\'</td><td style="width: 50%;"><div class="auction_premium"></div></td>\').beforeFrom($dark(\'#content form[0] table[0] tr[2]\'));');

			//Submit Button Id
			$dark('#content form[0] .awesome-button[0]').id('auction_filter_submit_button');
			$dark('#content form[0]').id('auction_filter');
			
			//Clear Button
			$dark('#content form[0] table[0] tr[0] td[1]').addChild([
				$dark('*div').class('clear_button auction_clear_button').attr('onclick',"document.getElementsByName(\'filterForm\')[0].getElementsByTagName(\'input\')[1].value=\'\'").attr('title', gca_locale.get('clear') )
			]);
			
			//Gold Limit Filter
			$dark('*script').html('\
			function filterItemsByGold(requiredGold){\n\
				var itemNum=document.forms.length-1;\n\
				var i=1;\n\
				var itemsCount=0;\n\
				var Gold="";\n\
				while(i<=itemNum && i<501){\n\
					if(document.getElementById("GoldFilterResult").style.display = "block"){\n\
						document.getElementById("auction_table").getElementsByTagName("td")[i-1].setAttribute("style","opacity:1;");\n\
					}\n\
					Gold=document.getElementById("auction_table").getElementsByTagName("td")[i-1].getElementsByTagName("div")[8].innerHTML.replace(/\\./gi,"");\n\
					if(Gold.match(/: (\\d+)&nbsp;/i)){\n\
						Gold=Gold.match(/: (\\d+)&nbsp;/i)[1]*1;\n\
					}else{\n\
						Gold=0;\n\
					}\n\
					\n\
					if(Gold>requiredGold){\n\
						document.getElementById("auction_table").getElementsByTagName("td")[i-1].setAttribute("style","opacity:0.5;");\n\
						itemsCount++;\n\
					}\n\
					i++;\n\
				}\n\
				itemsCount=i-itemsCount-1;\n\
				document.getElementById("GoldFilterResult").innerHTML = "'+ gca_locale.get('items_found') +': <b>"+itemsCount+"</b>";\n\
				document.getElementById("GoldFilterResult").style.display = "block";\n\
			}\n\
			').appendTo('body');
			
			//Gold limit
			var L_filter=$dark('#content form[0] .awesome-button[0]').attr('value');
			$dark('*tr').id('Item_Gold_Search').html('<td style="width:50%;text-align:center;">'+ gca_locale.get('gold_limit') +'</td><td style="width: 50%;"><input type="int" name="SelectGold" id="SelectGold" value="∞" maxlength="8" size="7"><input style="margin-left:5px;margin-right:5px;" onclick="filterItemsByGold(document.getElementById(\'SelectGold\').value)" value="'+L_filter+'" class="button3" type="button"><div id="GoldFilterResult" class="title_box" style="display:none"></div></td>').afterFrom($dark('#content form[0] table[0] tr[3]'));
			
			// Changes on each category
			var itemType = $dark('#content form[0] select[1]').value();
			if(itemType <= 6 || itemType == 8 || itemType == 9){ //all, weapons, shields, armors, helmets, gloves, boots, rings, amulets
				//Items list
				var items=this.items_dataBase();
				var options='<option value="SP">- '+ gca_locale.get('select') +' '+ gca_locale.get('item') +' -</option>';
				for(var i=0;i<items.length;i++){options+='<option value="'+items[i]+'">'+items[i]+'</option>';}
				$dark('*tr').id('prefix_search').html('<td style="width:50%;text-align:center;">'+ gca_locale.get('item') +'</td><td style="width:50%;"><select name="SelectPrefix" id="SelectPrefix">'+options+'</select></td>').beforeFrom($dark('#content form[0] table[0] tr[1]'));
				// Items' types list
				//eval(types_code);
				
				//Edit the submit button
				$dark('#auction_filter_submit_button').attr('onclick',"if(document.getElementById('SelectPrefix').value!='SP'){document.getElementById('auction_filter').getElementsByTagName('input')[1].value=document.getElementById('SelectPrefix').value;}if(document.getElementById('SelectSuffix')){if(document.getElementById('SelectSuffix').value!='SS'){document.getElementById('auction_filter').getElementsByTagName('input')[1].value=document.getElementById('SelectSuffix').value;}}");
				
				if(itemType == 1){//weapons
					// minimal damage filter script
					$dark('*script').html('\n\
					function filterItemsByDamage(requiredDamage){\n\
						var itemNum=document.forms.length-1;\n\
						var i=1;\n\
						var itemsCount=0;\n\
						var damage="";\n\
						while(i<=itemNum && i<501){\n\
							if(document.getElementById("damageFilterResult").style.display = "block"){\n\
								document.getElementById("auction_table").getElementsByTagName("td")[i-1].setAttribute("style","opacity:1;");\n\
							}\n\
							damage=document.getElementById("auction_table").getElementsByTagName("td")[i-1].getElementsByTagName("div")[4].getAttribute("data-tooltip");\n\
							damage=damage.match(/ (\\d+) - (\\d+)"/i)[2]*1;\n\
							if(damage<requiredDamage){\n\
								document.getElementById("auction_table").getElementsByTagName("td")[i-1].setAttribute("style","opacity:0.5;");\n\
								itemsCount++;\n\
							}\n\
							i++;\n\
						}\n\
						itemsCount=i-itemsCount-1;\n\
						document.getElementById("damageFilterResult").innerHTML = "'+ gca_locale.get('items_found') +': <b>"+itemsCount+"</b>";\n\
						document.getElementById("damageFilterResult").style.display = "block";\n\
					}\n\
					').appendTo('body');
					
					//Minimal Damage Filter
					$dark('*tr').id('Item_Damage_Search').html('<td style="width:50%;text-align:center;">'+ gca_locale.get('min_damage') +'</td><td style="width: 50%;"><input type="int" name="SelectDamage" id="SelectDamage" value="0" maxlength="5" size="3"><input style="margin-left:5px;margin-right:5px;" onclick="filterItemsByDamage(document.getElementById(\'SelectDamage\').value)" value="'+L_filter+'" class="button3" type="button"><div id="damageFilterResult" class="title_box" style="display:none"></div></td>').afterFrom($dark('#content form[0] table[0] tr[6]'));
				}
				
				// heal filter script
				var heal_string = gca_data.get('heal_string',false);
				if( heal_string && document.location.href.match('ttype=3') ){
					$dark('*script').html('\n\
					function filterItemsByHeal(requiredHeal){\n\
						var itemNum=document.forms.length-1;\n\
						var i=1;\n\
						var itemsCount=0;\n\
						var heal="";\n\
						while(i<=itemNum && i<501){\n\
							if(document.getElementById("healFilterResult").style.display = "block"){\n\
								document.getElementById("auction_table").getElementsByTagName("td")[i-1].setAttribute("style","opacity:1;");\n\
							}\n\
							heal=document.getElementById("auction_table").getElementsByTagName("td")[i-1].getElementsByTagName("div")[4].getAttribute("onmouseover").split("</table")[0];\n\
							heal=(heal.match(/'+heal_string+' \\+/i))?heal.match(/'+heal_string+' \\+(\\d+)<\\/td>/i)[1]*1:false;\n\
							if(!heal || heal<requiredHeal){\n\
								document.getElementById("auction_table").getElementsByTagName("td")[i-1].setAttribute("style","opacity:0.5;");\n\
								itemsCount++;\n\
							}\n\
							i++;\n\
						}\n\
						itemsCount=i-itemsCount-1;\n\
						document.getElementById("healFilterResult").innerHTML = "'+ gca_locale.get('items_found') +': <b>"+itemsCount+"</b>";\n\
						document.getElementById("healFilterResult").style.display = "block";\n\
					}\n\
					').appendTo('body');
					
					//Heal Filter
					$dark('*tr').id('Item_Heal_Search').html('<td style="width:50%;text-align:center;">'+ heal_string +'</td><td style="width: 50%;"><input type="int" name="SelectHeal" id="SelectHeal" value="0" maxlength="5" size="3"><input style="margin-left:5px;margin-right:5px;" onclick="filterItemsByHeal(document.getElementById(\'SelectHeal\').value)" value="'+L_filter+'" class="button3" type="button"><div id="healFilterResult" class="title_box" style="display:none"></div></td>').afterFrom($dark('#content form[0] table[0] tr[6]'));
				}
			}else if(itemType == 7 || itemType == 11 || itemType == 12 || itemType == 13 || itemType == 15){
				var title=$dark("#content form[0] select[1]").element.options[$dark("#content form[0] select[1]").element.selectedIndex].text;
				
				//Items' list
				//eval(items_code);
				
				//Edit the submit button
				$dark('#auction_filter_submit_button').attr('onclick',"if(document.getElementById('SelectItem').value!='SS'){document.getElementById('auction_filter').getElementsByTagName('input')[1].value=document.getElementById('SelectItem').value;}");
				
				if(itemType == 11 || itemType == 12){
					//Improvements +?
					$dark('*script').html('\n\
						function filterItemsByPlus(requiredPlus){\n\
							var itemNum=document.forms.length-1;\n\
							var i=1;\n\
							var itemsCount=0;\n\
							var plus="";\n\
							while(i<=itemNum && i<501){\n\
								if(document.getElementById("plusFilterResult").style.display = "block"){\n\
									document.getElementById("auction_table").getElementsByTagName("td")[i-1].setAttribute("style","opacity:1;");\n\
								}\n\
								plus=document.getElementById("auction_table").getElementsByTagName("td")[i-1].getElementsByTagName("div")[4].getAttribute("onmouseover");\n\
								if(plus.match(/: \\+(\\d+)/i)){\n\
									plus=plus.match(/: \\+(\\d+)/i)[1]*1;\n\
								}else{\n\
									plus=0;\n\
								}\n\
								if(plus<requiredPlus){\n\
									document.getElementById("auction_table").getElementsByTagName("td")[i-1].setAttribute("style","opacity:0.5;");\n\
									itemsCount++;\n\
								}\n\
								i++;\n\
							}\n\
							itemsCount=i-itemsCount-1;\n\
							document.getElementById("plusFilterResult").innerHTML = "'+ gca_locale.get('items_found') +': <b>"+itemsCount+"</b>";\n\
							document.getElementById("plusFilterResult").style.display = "block";\n\
						}\n\
					').appendTo('body');
					
					//Improvements +? button
					$dark('*tr').id('Item_Improvement_Search').html('<td style="width: 50%; text-align: center;">+???</td><td style="width: 50%;"><input type="int" name="SelectPlus" id="SelectPlus" value="0" maxlength="5" size="3"><input style="margin-left:5px;margin-right:5px;" onclick="filterItemsByPlus(document.getElementById(\'SelectPlus\').value)" value="'+L_filter+'" class="button3" type="button"><div id="plusFilterResult" class="title_box" style="display:none"></div></td>').afterFrom($dark('#content form[0] table[0] tr[4]'));
					
					if(itemType == 11){
						//Improvements Duration
						$dark('*script').html('\n\
							function filterItemsByDuration(requiredDuration){\n\
								var itemNum=document.forms.length-1;\n\
								var i=1;\n\
								var itemsCount=0;\n\
								var Duration="";\n\
								while(i<=itemNum && i<501){\n\
									if(document.getElementById("DurationFilterResult").style.display = "block"){\n\
										document.getElementById("auction_table").getElementsByTagName("td")[i-1].setAttribute("style","opacity:1;");\n\
									}\n\
									if(requiredDuration!=-1){\n\
										Duration=document.getElementById("auction_table").getElementsByTagName("td")[i-1].getElementsByTagName("div")[4].getAttribute("onmouseover");\n\
										if(Duration.match(/: 0(\\d):00 h/i)){\n\
											Duration=Duration.match(/: 0(\\d):00 h/i)[1]*1;\n\
										}else{\n\
											Duration=0;\n\
										}\n\
									}else{Duration=-1;}\n\
									if(Duration!=requiredDuration){\n\
										document.getElementById("auction_table").getElementsByTagName("td")[i-1].setAttribute("style","opacity:0.5;");\n\
										itemsCount++;\n\
									}\n\
									i++;\n\
								}\n\
								itemsCount=i-itemsCount-1;\n\
								document.getElementById("DurationFilterResult").innerHTML = "'+ gca_locale.get('items_found') +': <b>"+itemsCount+"</b>";\n\
								document.getElementById("DurationFilterResult").style.display = "block";\n\
							}\n\
						').appendTo('body');
						
						//Improvements Duration button
						var options='\n\
						<option value="-1">- '+ gca_locale.get("select") +' -</option>\n\
						<option value="1"> 01:00 h</option>\n\
						<option value="2"> 02:00 h</option>\n\
						<option value="4"> 04:00 h</option>\n\
						<option value="8"> 08:00 h</option>\n\
						';
						$dark('*tr').id('Item_Duration_Search').html('<td style="width: 50%; text-align: center;">'+ gca_locale.get('duration') +'</td><td style="width: 50%;"><select name="SelectDuration" id="SelectDuration">'+options+'</select><input style="margin-left:5px;margin-right:5px;" onclick="filterItemsByDuration(document.getElementById(\'SelectDuration\').value)" value="'+L_filter+'" class="button3" type="button"><div id="DurationFilterResult" class="title_box" style="display:none"></div></td>').afterFrom($dark('#content form[0] table[0] tr[5]'));
					}
				}
			}
		}
	},
	warn_guild_mates : function(){
		var time_checked = $dark('#header_game span[6]').html().match(/(\d+:\d+)/i)[1];
		var auction_translation = document.getElementsByClassName('menuitem active')[0].textContent;
		var auction_type = ( $dark('#mainnav .current[0]') )? $dark('#mainnav .current[0]').html() : gca_locale.get('error');var auction_stats = $dark('#content .description_span_right[0] b[0]').html();
		var message='['+time_checked+'] '+auction_translation+' ('+auction_type+') : '+ auction_stats;
		
		$dark('#content p[2]').addChild(
			$dark('*div').id('warn_guild_div').addChild(
				$dark('*input').id('guild_announce_button').type('submit').class('button1').css('cursor:pointer;').value( gca_locale.get("announce_to_guild") ).click(
					function(){gca_section_guild.sent_guild_mail(message,false,'guild_announce_button');}
				)
			)		
		);
	}
}