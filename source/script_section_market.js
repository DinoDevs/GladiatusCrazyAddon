/*
 * Addon Market Script
 * Author: GreatApo
 * Copyright: all rights reserved
 */

var gca_section_market = {
	inject : function(){
		//Check if there is content
		if(!$dark('#content') || getPage.url().match('sub=2') || (gca_section.mod == "guildMarket" && gca_section.submod == "control"))
			return;
		if($dark('#market_item_table')){
			// Load More Pages
			//(gca_options.isOn("ENABLE_MARKET_LOAD_MORE_PAGES") && gca_data.get('market_load_more_pages_code', null ) &&
			//	this.load_other_pages());
			//(!gca_data.get('market_load_more_pages_code', null ) && this.premium());
			
			// Make style changes
			(gca_options.isOn("ENABLE_MARKET_STYLE_CHANGES") && 
				this.market_style());
			
			// Cancel Packets Button
			(gca_options.isOn("ENABLE_MARKET_CANCEL_PACKETS_BUTTON") && 
				this.cancel_my_packets());
		}

		// Search Improvements
		// Expand searchable items levels
		(gca_options.isOn("ENABLE_MARKET_EXPAND_ITEMS_LVL") && 
			this.expand_item_levels());
			
		// Default sell duration
		(gca_options.isOn("ENABLE_MARKET_DEFAULT_SELL_DURATION") && 
			this.market_default_duration());

		// Improve search menu
		(gca_options.isOn("ENABLE_MARKET_IMPROVE_SEARCH_MENU") && 
			this.search_menu.run());
	},
	premium : function(){
		return;
		$dark('#content').addChild(
			$dark('*div').class('contentItem').css('margin-top:10px;').addChild([
				$dark('*h3').html('GCA Premium'),
				$dark('*div').class('contentItem_content').html('<center>Get Gladiatus Cracy Addon <a href="http://gladiatuscrazyaddon.tk/index.php?mode=donate" target="_blank">Premium</a> to enable the <i>Advanced Market Interface</i> !<br/>Imagine searching in the market for an item you need and you do not have to change market pages! This is now possible using GCA Premium!<br/><br/><a href="http://gladiatuscrazyaddon.tk/index.php?mode=donate" target="_blank"><img src="http://gladiatuscrazyaddon.tk/images/prem_market.jpg"/></a><br/><br/>Cancel all items with one button! <br/><br/><a href="http://gladiatuscrazyaddon.tk/index.php?mode=donate" target="_blank"><img src="http://gladiatuscrazyaddon.tk/images/prem_cancel.jpg"/></a><br/><br/>Grap your <b>FREE</b> Premium Key from <a href="http://gladiatuscrazyaddon.tk/index.php?mode=donate" target="_blank">here</a>.</center><br/>')
			])
		);
	},
	// Default sell duration
	market_default_duration : function(){		
		var duration = gca_options.load("MARKET_DEFAULT_SELL_DURATION");
		if( $dark('#dauer option['+duration+']') )
			$dark('#dauer option['+duration+']').setAttr('selected','');
	},
	//Market Style (+fixes)
	market_style : function(){
		$dark('#market_item_table th[0]').html('<font style="position:absolute;margin-top:-9px;">'+$dark('#market_item_table th[0]').html()+'</font>');
	},
	//Load More Pages
	load_other_pages : function(){
		var pages=$dark('.title2_inner[3]').html().match(/ (\d+) \/ (\d+)/i);
		$dark('*div').class('market_darkmod_page_info').html(pages[1]).beforeFrom( '#market_item_table td[0] div[0]' );
		$dark( '.title2_inner[3]').parent().css('display:none;');
		
		var minus=parseInt(pages[1])-4;
		if(minus<1){minus=1;}
		var plus=parseInt(pages[1])+3;
		if(plus>pages[2]){plus=pages[2];}
		
		for(i=minus;i<=plus;i++){
			if(i!=parseInt(pages[1])){
				$dark('#market_item_table tbody[0]').addChild(
					$dark('*tr').class('market_page_rows_'+i).addChild(
						$dark('*td').setAttr('colspan','5').addChild([
							$dark('*div').class('market_darkmod_page_info fix_market_darkmod').html(i)
						])
					)
				);
			}
		}
		
		if($dark('.title2_inner[3]').html().match(/<a href="([^"]+)">/i)){
			var page_url=$dark('.title2_inner[3]').html().match(/<a href="([^"]+)">/i)[1];
			var formInputs={
				"action":document.forms[2].action,
				"qry":document.forms[2].qry.value,
				"f":document.forms[2].f.value,
				"fl":document.forms[2].fl.value,
				"fq":document.forms[2].fq.value,
				"s":document.forms[2].s.value,
				"p":document.forms[2].p.value,
				"inv":document.forms[2].inv.value
			};
			for(i=minus;i<=plus;i++){
				if(i!=parseInt(pages[1])){
					xmlHttpRequest({
						url : page_url.replace(/p=\d+/i,'p='+i).replace(/&amp;/g,'&'),
						method : "GET",
						onload : function(content){
							var doc = $dark('*div').html(content).element;
							if( doc.getElementsByTagName("table")[2] ){
								//Find the page
								var page=$dark( '.title2_inner[3]' , doc ).html().match(/ (\d+) \/ \d+/i)[1];
								//Add the page items in the table
								var items_number=$dark( '.title2_inner[2] table[0] form' , doc ).length;
								
								//Add total items to cansel all
								if( $dark('#totalitems') ){
									$dark('#totalitems').html( parseInt($dark('#totalitems').html())+items_number-1 );
								}
								
								var ids = new Array();
								for(i=items_number-1;i>0;i--){
									//Add my items to cansel all
									if( $dark('#myitems') && $dark( '.title2_inner[2] table[0] tr['+i+'] input[0]' , doc ).getAttr('name')=='cancel'){
										$dark('#myitems').html( parseInt($dark('#myitems').html())+1 );
									}
									//Insert the item
									//
									ids.push( $dark( '.title2_inner[2] table[0] tr['+i+'] div[0]' , doc ).id().replace("buy_","") );
									$dark( '.title2_inner[2] table[0] tr['+i+'] input[0]' , doc ).parent().addChild([
										$dark('*form').attr('action',formInputs.action).attr('method','post').attr('name','buyForm').addChild([
											$dark('*input').attr('name',"buyid").value(ids[ids.length-1]).type('hidden'),
											$dark('*input').attr('name',"qry").value(formInputs["qry"]).type('hidden'),
											$dark('*input').attr('name',"f").value(formInputs["f"]).type('hidden'),
											$dark('*input').attr('name',"fl").value(formInputs["fl"]).type('hidden'),
											$dark('*input').attr('name',"fq").value(formInputs["fq"]).type('hidden'),
											$dark('*input').attr('name',"s").value(formInputs["s"]).type('hidden'),
											$dark('*input').attr('name',"p").value(formInputs["p"]).type('hidden'),
											$dark('*input').attr('name',"inv").value(formInputs["inv"]).type('hidden'),
											$dark( '.title2_inner[2] table[0] tr['+i+'] input[0]' , doc )
										])
									]);
									$dark( '.title2_inner[2] table[0] tr['+i+']' , doc ).afterFrom( '.market_page_rows_'+page+'[0]' )
								}
								var tooltips = content.match(/AddCharDiv\('buy_[^"]+"[^"]+"\);/g);
								for(var i=0;i<ids.length;i++){
									$dark('*script').html(
										'ADD_DHTML("buy_'+ids[i]+'"+NO_DRAG);\n'+
										'aElts.push(dd.elements.buy_'+ids[i]+');\n'
									).appendTo('body');
								}
								for(var i=0;i<ids.length;i++)
									$dark('*script').html(tooltips[i]).appendTo('body');
								
								$dark('*script').html("changeShow();\ntt_Init(true);\ndd.recalc();").appendTo('body');
							}
						}
					});
				}
			}
		}
	},
	//Cancel all my packets at once
	cancel_my_packets: function(){
		document.getElementById("market_item_table").getElementsByTagName('form')[0].elements["buyid"]
		document.getElementById("market_item_table").getElementsByTagName('form')[0].elements["cancel"]

		var allitems = document.getElementById("market_item_table").getElementsByTagName('form');
		var myitems = [];

		for (var i = allitems.length - 1; i >= 0; i--) {
			if(allitems[i].elements["cancel"])
				myitems.push(allitems[i].elements["buyid"].value);
		}
	
		$dark('*div').id('CancelAll').class('title2_box').html('<div class="title2_inner"><table width="100%"><tr><td> '+gca_locale.get('number_of_my_items')+': <b id="myitems">'+myitems.length+'</b> / <span id="totalitems">'+allitems.length+'</span></td><td></td><td> </td></tr></table></div>').afterFrom($dark('#content form[1]').element.parentNode.parentNode);
		
		$dark('#CancelAll td[2]').addChild([
			$dark('*input').id('cancel_all_button').value( gca_locale.get('cancel_all') ).attr('type','button').class('button1')
		]);
		
		$dark('#cancel_all_button').element.addEventListener("click", this.cancelAllButton, true);
	},
	cancelAllButton : function(){

		var allitems = document.getElementById("market_item_table").getElementsByTagName('form');
		var myitems_data = [];
		var cancel = "";
		for (var i = allitems.length - 1; i >= 0; i--) {
			if(allitems[i].elements["cancel"]){
				myitems_data.push(allitems[i].elements["buyid"].value);
				cancel = allitems[i].elements["cancel"].value;
			}
		}

		var x = allitems.length;
		var mytottalitems = myitems_data.length;

		if(mytottalitems!=0){
			cansel = encodeURIComponent(cancel);
			document.getElementById('cancel_all_button').value = '0 / '+mytottalitems+' (0%)';
			
			for (var i = myitems_data.length - 1; i >= 0; i--) {
				xmlHttpRequest({
					method: 'POST',
					url: document.location.href,
					data : 'buyid='+myitems_data[i]+'&cancel='+cancel,
					onload: function(response){
						var myitems = document.getElementById('cancel_all_button').value.match(/(\d+)/gi)[0]*1;
						myitems++;
						document.getElementById('cancel_all_button').value = myitems+' / '+mytottalitems+' ('+(Math.round(myitems/mytottalitems)*100)+'%)';
						if(myitems==mytottalitems){
							document.location.href=document.location.href;
						}
					}
				});
			}
		}
	},
	//More level options at search
	expand_item_levels : function(){
		var minlevel=0;
		var lvl=parseInt($dark('#header_values_level').html());
		
		//Calculate MaxLevel
		if (lvl>36){var maxlevel = lvl+9;}
		else{var maxlevel = lvl+Math.floor(lvl * 0.25);}
		
		//Create the options
		var option='';
		for (i = 0; i <(maxlevel-minlevel+1); i=i+2){
			var fnumber = (minlevel+i);
			//Level+ you browse
			if(document.getElementsByName('fl')[1]){var selectedlevel = document.getElementsByName('fl')[1].value;}
			else{selectedlevel = minlevel}
			
			if(fnumber==selectedlevel){var OptSelect = 'selected="selected"'}
			else{var OptSelect = ""}
			option += '<option value="' + fnumber + '" ' + OptSelect + '>' + fnumber + '+</option>' ;
		}
		
		if(document.getElementsByName('fl')[0]){
			document.getElementsByName('fl')[0].innerHTML=option;
		}
		
		//Show the max level
		this.make_items_you_can_see(1,maxlevel);
	},
	//Show the levels you can see
	make_items_you_can_see : function(minlevel,maxlevel){
		$dark('*div').id('level_to_see_info').beforeFrom('.buildingDesc[1] img[0]');

		var tooltip = [[[gca_locale.get('levels_you_can_see')+': <font color="red">'+minlevel+' - '+maxlevel+'</font>',"white"]]];

		var script_code = "(function (){\n" + 
		"var data = JSON.stringify(" + JSON.stringify(tooltip) + ");\n" +
		"var img = jQuery('#level_to_see_info')[0];\n" + 
		"img.dataset.tooltip = data;\n" + 
		"if(typeof setTooltip != 'undefined'){setTooltip(img, data);}\n" +
		"})();";

		var script = document.createElement('script');
		script.innerHTML = script_code;
		document.body.appendChild(script);
	},
	search_menu : {
		run : function(){
			this.items_lists();
		},
		items_lists : function(){
			//START: Premium Feature Load
			var types_code='\
			var types=gca_data.get("item_types", [] );\
			var options=\'<option value="SS">- \'+ gca_locale.get("select") +\' \'+ gca_locale.get("type") +\' -</option>\';\
			for(var i=0;i<types.length;i++){options+=\'<option value="\'+types[i]+\'">\'+types[i]+\'</option>\';}\
			$dark(\'*tr\').id("suffix_search").html(\'<td style="width: 50%; text-align: center;">\'+ gca_locale.get("type") +\'</td><td style="width: 50%;"><select name="SelectSuffix" id="SelectSuffix">\'+options+\'</select></td>\').beforeFrom($dark(\'#content form[1] table[0] tr[2]\'));\
			';
			//var types_code='$dark(\'*tr\').html(\'<td style="width: 50%; text-align: center;">\'+ gca_locale.get("type") +\'</td><td style="width: 50%;"><div class="market_premium"></div></td>\').beforeFrom($dark(\'#content form[1] table[0] tr[2]\'));';
			//END: Premium Feature Load
			
			//Submit Button Id
			if($dark('#content form[1] .awesome-button[0]')){
				$dark('#content form[1] .awesome-button[0]').id('market_filter_submit_button');
			}else{
				$dark('#content form[1] .button3[0]').id('market_filter_submit_button');
			}
			$dark('#content form[1]').id('market_filter');
			
			//Clear Button
			$dark('#content form[1] table[0] tr[0] td[1]').addChild([
				$dark('*div').class('clear_button market_clear_button').attr('onclick',"document.getElementsByName(\'filterForm\')[0].getElementsByTagName(\'input\')[1].value=\'\'").attr('title', gca_locale.get('clear') )
			]);
			
			//Changes on each category
			var itemType = $dark('#content form[1] select[1]').value();
			if(itemType <= 6 || itemType == 8 || itemType == 9){ //all, weapons, shields, armors, helmets, gloves, boots, rings, amulets
				//Items list
				var items=gca_section_auction.search_menu.items_dataBase();
				var options='<option value="SP">- '+ gca_locale.get('select') +' '+ gca_locale.get('item') +' -</option>';
				for(var i=0;i<items.length;i++){options+='<option value="'+items[i]+'">'+items[i]+'</option>';}
				$dark('*tr').id('prefix_search').html('<td style="width:50%;text-align:center;">'+ gca_locale.get('item') +'</td><td style="width:50%;"><select name="SelectPrefix" id="SelectPrefix">'+options+'</select></td>').beforeFrom($dark('#content form[1] table[0] tr[1]'));
				//Items' types list
				eval(types_code);
				
				//Edit the submit button
				$dark('#market_filter_submit_button').attr('onclick',"if(document.getElementById('SelectPrefix').value!='SP'){document.getElementById('market_filter').getElementsByTagName('input')[1].value=document.getElementById('SelectPrefix').value;}if(document.getElementById('SelectSuffix')){if(document.getElementById('SelectSuffix').value!='SS'){document.getElementById('market_filter').getElementsByTagName('input')[1].value=document.getElementById('SelectSuffix').value;}}");
				
			}else if(itemType == 7 || itemType == 11 || itemType == 12 || itemType == 13 || itemType == 15){
				var title=$dark("#content form[1] select[1]").element.options[$dark("#content form[1] select[1]").element.selectedIndex].text;
				
				//START: Premium Feature Load
				var items_code='\
				if(itemType == 7){var items=gca_data.get("food_items", [] );}\
				else if(itemType==11){var items=gca_data.get("temp_improvements_items", [] );}\
				else if(itemType==12){var items=gca_data.get("improvements_items", [] );}\
				else if(itemType==15){var items=gca_data.get("mercenaries_items", [] );}\
				var options=\'<option value="SS">- \'+ gca_locale.get("select") +\' -</option>\';\
				for(var i=0;i<items.length;i++){options+=\'<option value="\'+items[i]+\'">\'+items[i]+\'</option>\';}\
				$dark(\'*tr\').id("Item_search").html(\'<td style="width: 50%; text-align: center;">\'+ title +\'</td><td style="width: 50%;"><select name="SelectItem" id="SelectItem">\'+options+\'</select></td>\').beforeFrom($dark(\'#content form[1] table[0] tr[2]\'));\
				';
				//var items_code='$dark(\'*tr\').html(\'<td style="width: 50%; text-align: center;">\'+ title +\'</td><td style="width: 50%;"><div class="market_premium"></div></td>\').beforeFrom($dark(\'#content form[1] table[0] tr[2]\'));';
				//END: Premium Feature Load
				
				//Items' list
				eval(items_code);
				
				//Edit the submit button
				$dark('#market_filter_submit_button').attr('onclick',"if(document.getElementById('SelectItem').value!='SS'){document.getElementById('market_filter').getElementsByTagName('input')[1].value=document.getElementById('SelectItem').value;}");
			}
		}
	}
}