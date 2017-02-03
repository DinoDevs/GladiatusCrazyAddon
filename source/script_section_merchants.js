/*
 * Addon Merchants Script
 * Author: GreatApo
 * Copyright: all rights reserved
 */

var gca_section_merchants = {
	inject : function(){
		//Check if there is content
		if(!$dark('#content .background_trader[0]'))
			return;
		// Merchants Item Search
		(gca_options.isOn("ENABLE_MERCHANTS_ITEM_SEARCH") &&
			this.extendedSearchSmall());
		
		// Merchants Highlight The Items You Can Buy
		(gca_options.isOn("ENABLE_MERCHANTS_HIGHLIGHT_ITEMS") &&
			this.highlight_items_you_can_buy());
		
		// Merchants Info Box
		(gca_options.isOn("ENABLE_MERCHANTS_INFOS") &&
			this.merchandsInfos());
	},
	//Save the time for new goods
	save_merchants_time : function(){
		//Get merchants time (format h:m:s)
		var time = $dark('.new_inventory_timer_text[0] span[0]').html().match(/(\d+):(\d+):(\d+)/i);
		//Now date
		var date = new Date();
		//Renew time in miliseconds
		time = date.getTime() + ( parseInt(time[1])*60*60 + parseInt(time[2])*60 + parseInt(time[3]) )*1000;
		gca_data.set('merchants_time', time );
	},
	extendedSearchSmall : function(){
		$dark('#mainnav').addChild([
			$dark('*div').id('ItemSearchSmall').class('searchContainer').html('\
				<input id="searchInput" class="inputText searchOptions" type="text" value="'+gca_locale.get("item_search")+'" onclick="document.getElementById(\'searchInput\').setAttribute(\'value\',\'\');">\
				<input id="searchSubmit" class="searchSubmit inputImage" type="image" alt="Submit" src="http://board.gladiatus.de/icon/gladiatus31/submitS.png" tabindex="2" onclick="self.scrollTo(0,10000);">\
			')
		]);
		
		$dark('#searchSubmit').element.addEventListener('click', this.searchItems, false);
	},
	searchItems : function(){
		if(!$dark('#Results')){
			$dark('#content').addChild([
				$dark('*div').class('contentItem').style('margin-top: 20px;').html('<h3>'+gca_locale.get("search_results")+'</h3>'),
				$dark('*div').class('ms_results_box searchContainer').html('\
					<b>'+gca_locale.get("items_found")+' :</b>\
					<center id="ms_loading"><progress max="10" value="0"></progress></center>\
					<table id="Results"></table>\
				')
			]);
		}else{
			$dark('#Results').html('');
			$dark('#ms_loading progress[0]').value( 0 );
			$dark('#ms_loading').style('display:block;');
		}
		
		var itemName=$dark('#searchInput').element.value.toLowerCase();
		if(itemName!='' && itemName!=' ' && !itemName.match(/[<>=+-]/i)){
			for(y=1;y<=5;y++){
				for(c=0;c<=1;c++){
					xmlHttpRequest({
						url : getPage.link({"mod":"inventory","subsub":c,"sub":y}),
						method: "GET",
						onload: function(content){
							if(content.match(/aktShopPage\s*=\s*(\d+)/i)){
								var dealerName = content.match(/class="awesome-tabs current">([^<]+)<\/a>/i)[1];
								var tab = "Unk";
								if(content.match(/img\/shop\/shop_reiter1_a\.gif"/i)){
									tab = "I";
								}else if(content.match(/img\/shop\/shop_reiter2_a\.gif"/i)){
									tab = "II";
								}else if(content.match(/shop_nav_dyn_repeat_inactive">[^<]*<\/div>/i)){
									tab = content.match(/shop_nav_dyn_repeat_inactive">([^<]*)<\/div>/i)[1];
								}
								
								var data = content;
								
								var dealerNum = data.match(/aktShopPage\s*=\s*(\d+)/i)[1];
								var items = data.match(/data-container-number="[^"]*" data-content-type="[^"]*" data-content-size="[^"]*" data-enchant-type="[^"]*" data-item-id="[^"]*" data-price-gold="[^"]*" data-tooltip="\[\[\[&quot;([^&]*)[^"]*"/gim);
								if(!items){
									items = [];
								}


								var item_number=0;
								var temp_tooltip='';
								var temp_img=null;
								var temp_id = 0;

								var x = 0;
								while(items[x]){
									if(items[x].toLowerCase().match(/data-tooltip="\[\[\[&quot;([^&]*)/i)[1].match(itemName) && parseInt(items[x].match(/data-container-number="(\d+)"/)[1]) > 20){
										//Create the row (if items are 0)
										if(item_number == 0){
											$dark('#Results').addChild([
												$dark('*tr').html('<td>'+dealerName+' ('+tab+'):</td><td id="result_'+dealerName.replace(/ /g,'_')+'_'+tab+'"></td><td id="result_num_'+dealerName.replace(/ /g,'_')+'_'+tab+'"></td>')
											]);
										};
										
										temp_tooltip = items[x].match(/data-tooltip="([^"]*)"/i)[1];
										temp_id = items[x].match(/data-item-id="([^"]+)"/i)[1];

										temp_img = $dark('*img').id("search_item_img__" + temp_id).class('ms_item').src('img/interface/package.gif').attr("data-tooltip", temp_tooltip.replace(/&quot;/g,'"').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&(amp;|)nbsp;/g,' '));
										$dark('#result_'+dealerName.replace(/ /g,'_')+'_'+tab).addChild([temp_img]);
										$dark('*script').html("window.setTooltip(document.getElementById('" + "search_item_img__" + temp_id + "'), document.getElementById('" + "search_item_img__" + temp_id + "').getAttribute('data-tooltip'));").afterFrom(temp_img);
										
										item_number++;
									}
									x++;
								}
								
								if($dark('#result_num_'+dealerName.replace(/ /g,'_')+'_'+tab+'')){
									$dark('#result_num_'+dealerName.replace(/ /g,'_')+'_'+tab+'').html('['+item_number+']');
								}
								
								applyTooltips();
							
							}else{
								$dark('#Results').addChild([
									$dark('*tr').html('<td colspan="3">'+gca_locale.get("error")+'</td>')
								]);
							}
							
							if($dark('#ms_loading progress[0]').value()<9){
								$dark('#ms_loading progress[0]').value( $dark('#ms_loading progress[0]').value()+1 );
							}else{
								$dark('#ms_loading').style('display:none;');
							}
						}
					});
				}
			}
		}
	},
	
	//Highlight items you can buy
	highlight_items_you_can_buy : function(){
		if(!$dark('#shop'))
			return;
		
		var gca_items_availiable = function(){
			var my_gold = parseInt( document.getElementById('sstat_gold_val').innerHTML.replace(/\./g,"") );
			var my_rubies = parseInt( document.getElementById('sstat_ruby_val').innerHTML.replace(/\./g,"") );


			var tmp;
			
			var items = document.getElementById('shop').getElementsByTagName('div');
			for(var i=0;i<items.length;i++){
				tmp = items[i].getAttribute('data-tooltip');

				if(tmp && tmp.replace(/\./g,'').match(/ (\d+) (<img|<div class=\\"icon_gold\\")/gi)[1]){
					if(tmp.replace(/\./g,'').match(/ (\d+) (<img|<div class=\\"icon_gold\\")/gi)[0].match(/(\d+)/i)[0]>my_gold || tmp.replace(/\./g,'').match(/ (\d+) <img/gi)[1].match(/(\d+)/i)[0] > my_rubies){
						if(items[i].style.opacity!=0.4)
							items[i].style.opacity = 0.4;
					}
				}

				else if(tmp && tmp.replace(/\./g,'').match(/ (\d+) (<img|<div class=\\"icon_gold\\")/i)[1] > my_gold){
					if(items[i].style.opacity!=0.4)
						items[i].style.opacity = 0.4;
				}

				else{
					items[i].style.opacity = 1;
				}
			}

			items = document.getElementById('inv').getElementsByTagName('div');
			for(var i=0;i<items.length;i++){
				if(items[i].style.opacity==0.4)
					items[i].style.opacity=1;
			}
		}
		
		gca_items_availiable();

		this.itemEventListener.add(function(){
			gca_items_availiable();
		});
	},
	
	// Display Merchands info
	merchandsInfos : function(){
		$dark("*div").class("contentItem info_box").css('width:215px;margin-top:10px;margin-bottom:20px;').addChild([
			$dark("*h3").css('width:191px;').html(gca_locale.get('storage_info')),
			$dark("*div").class("contentItem_content").css('width:205px;padding:4px;').addChild([
				$dark("*table").css('width:100%').addChild([
					$dark("*tr").addChild([
						$dark("*td").css('text-align:left;').html( '<table><tr><td>'+gca_locale.get('number_of_items')+' :</td><td><b><span id="gca_merchands_items">0</span>/48</b></td></tr></table>')
					]),
					$dark("*tr").addChild([
						$dark("*td").css('text-align:left;').html( '<table><tr><td>'+gca_locale.get('value')+' :</td><td><b><span id="gca_merchands_value_gold">0</span></b>&nbsp;<img src="img/res2.gif" align="absmiddle"/>&nbsp;&nbsp;<b><span id="gca_merchands_value_rubies">0</span></b>&nbsp;<img src="img/res3.gif" align="absmiddle"/></td></tr></table>')
					]),
					$dark("*tr").addChild([
						$dark("*td").css('text-align:left;').html( '<table><tr><td>'+gca_locale.get('value')+' ('+gca_locale.get('no_rubies')+') :</td><td><b><span id="gca_merchands_value">0</span></b>&nbsp;<img src="img/res2.gif" align="absmiddle"/></td></tr></table>')
					])
				])
			])
		]).afterFrom('#content .background_trader[0]');
		
		$dark("*div").class("contentItem").css('width:300px;margin-top:18px;').addChild([
			$dark("*h3").css('width:276px;').html(gca_locale.get('storage_info')),
			$dark("*div").class("contentItem_content").css('width:290px;padding:4px;').addChild([
				$dark("*table").css('width:100%').addChild([
					$dark("*tr").addChild([
						$dark("*td").css('text-align:left;').html( '<table><tr><td>'+gca_locale.get('number_of_items')+' :</td><td><b><span id="gca_inv_items">0</span>/40</b></td></tr></table>')
					]),
					$dark("*tr").addChild([
						$dark("*td").css('text-align:left;').html( '<table><tr><td>'+gca_locale.get('value')+' :</td><td><b><span id="gca_inv_value">0</span></b>&nbsp;<img src="img/res2.gif" align="absmiddle"/></td></tr></table>')
					])
				])
			])
		]).afterFrom( $dark('#inventory_nav').parent().parent() );
	
		var gca_inv_infos = function(){
			if(document.getElementById('inv').className.match(/unavailable/)){
				setTimeout(function(){
					gca_inv_infos();
				}, 30);
			}

			var invItems = document.getElementById('inv').getElementsByTagName('div');
			var items = {};
			
			var gold = 0;
			var length = 0;
			var temp_gold = 0;

			var temp_tooltip, temp_id;
			for(var i=0;i<invItems.length;i++){
				temp_gold = document.getElementById('inv').getElementsByTagName('div')[i].getAttribute('data-price-gold');
				temp_tooltip = document.getElementById('inv').getElementsByTagName('div')[i].getAttribute('data-tooltip');
				temp_id = document.getElementById('inv').getElementsByTagName('div')[i].getAttribute('data-item-id');
				if(temp_tooltip && temp_gold && !isNaN(parseInt(temp_gold))){

					// Avoid double count
					if(temp_id){
						if(items[temp_id]){
							continue;
						}
						items[temp_id] = true;
					}

					gold += parseInt(temp_gold);
					length ++;
				}
			}

			document.getElementById('gca_inv_items').innerHTML = length;
			document.getElementById('gca_inv_value').innerHTML = gold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}

		var gca_merchands_infos = function(){
			var merchandsItems = document.getElementById('shop').getElementsByTagName('div');
			
			var gold = 0;
			var rubies = 0;
			var goldOnly = 0;
			var length = 0;

			var items = {};

			var tmp, tmp_id;
			for(var i=0;i<merchandsItems.length;i++){
				tmp = document.getElementById('shop').getElementsByTagName('div')[i].getAttribute('data-tooltip');
				tmp_id = document.getElementById('shop').getElementsByTagName('div')[i].getAttribute('data-item-id');
				if(tmp){

					// Avoid double count
					if(tmp_id){
						if(items[tmp_id]){
							continue;
						}
						items[tmp_id] = true;
					}
					
					length++;
					tmp = tmp.replace(/\./g,'');
					if(tmp.match(/ (\d+) (<img|<div class=\\"icon_gold\\")/gi)[1]){
						rubies+=parseInt( tmp.match(/ (\d+) (<img|<div class=\\"icon_gold\\")/gi)[1].match(/(\d+)/i)[0] );
					}else{
						goldOnly+=parseInt( tmp.match(/ (\d+) (<img|<div class=\\"icon_gold\\")/i)[1] );
					}
					gold+=parseInt( tmp.match(/ (\d+) (<img|<div class=\\"icon_gold\\")/i)[1] );
				}
			}

			document.getElementById('gca_merchands_items').innerHTML = length;
			document.getElementById('gca_merchands_value_gold').innerHTML = gold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
			document.getElementById('gca_merchands_value_rubies').innerHTML = rubies.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
			document.getElementById('gca_merchands_value').innerHTML = goldOnly.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
		}
		
		gca_merchands_infos();
		gca_inv_infos();

		var tabs = document.getElementById('inventory_nav').getElementsByTagName('a');
		for (var i = 0; i < tabs.length; i++) {
			tabs[i].addEventListener('click', function(){
				setTimeout(function(){
					gca_inv_infos();
				}, 30);
			}, false);
		}

		this.itemEventListener.add(function(){
			gca_merchands_infos();
			gca_inv_infos();
		});
		
	},

	itemEventListener : {
		callbacks : [],
		injected : false,

		add : function(callback){
			this.callbacks.push(callback);

			if(!this.injected){
				this.injected = true;
				this.inject();
			}
		},

		inject : function(){
			var that = this;

			// Event wait
			$dark("*input").id('gca_item_event_listener').type('button').value("refresh").css("display:none;").click(function(){
				that.fireEvents();
			}).afterFrom("body");

			$dark("*script").html("\n\
				(function(){\n\
					var normalize = null;\n\
					var fireStorageEvent = function () {\n\
						clearTimeout(normalize);\n\
						normalize = setTimeout(function(){\n\
							jQuery('#gca_item_event_listener').trigger('click');\n\
						}, 20);\n\
					};\n\
					document.getElementById('shop').addEventListener('DOMSubtreeModified', fireStorageEvent, false);\n\
					document.getElementById('inv').addEventListener('DOMSubtreeModified', fireStorageEvent, false);\n\
					\n\
					headerObject.updateGold_original = headerObject.updateGold;\n\
					window.headerObject.updateGold = function(gold){\n\
						this.updateGold_original(gold);\n\
						// Wait fadeout\n\
						setTimeout(function(){\n\
							fireStorageEvent();\n\
						}, 450);\n\
						return;\n\
					}\n\
					\n\
					headerObject.updateRubies_original = headerObject.updateRubies;\n\
					window.headerObject.updateRubies = function(rubies){\n\
						this.updateRubies_original(rubies);\n\
						// Wait fadeout\n\
						setTimeout(function(){\n\
							fireStorageEvent();\n\
						}, 450);\n\
						return;\n\
					}\n\
				})();\n\
			").afterFrom("body");

			/*
			$dark("*script").html("\n\
				jQuery(document.getElementById('shop')).data('dropFunction',function(drag, amount){\n\
					console.log(\"Fire\");\n\
					this.defaultDropFunction(drag, amount, null);\n\
					jQuery('#gca_item_event_listener').trigger(\"click\");\n\
				});\n\
			").afterFrom("#content");
			*/
		},

		fireEvents : function(){
			for (var i = 0; i < this.callbacks.length; i++) {
				setTimeout(this.callbacks[i], 1);
			}
		}

	}
}