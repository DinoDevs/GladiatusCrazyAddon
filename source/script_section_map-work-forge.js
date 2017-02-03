/*
 * Addon Map Script
 * Author: GreatApo
 * Copyright: all rights reserved
 */

var gca_section_map = {
	inject : function(){
		if(!$dark('#content'))
			return;
		
		if(gca_section.submod=='city'){
			//City building titles & levels
			( gca_options.isOn("ENABLE_GLOBAL_MAP_NAMES_LEVELS") &&
			gca_section_guild.guild.guild_building_titles_levels());
		}else if(gca_section.submod=='country'){
			//Country building titles & levels
			( gca_options.isOn("ENABLE_GLOBAL_MAP_NAMES_LEVELS") &&
			gca_section_guild.guild.guild_building_titles_levels());
		}
	}
}



/*
 * Addon Work Script
 * Author: GreatApo
 * Copyright: all rights reserved
 */
 
var gca_section_work = {
	inject : function(){
		if(!$dark('#content'))
			return;
		
		if( $dark('#ticker1') )
			this.work_finish_time();
	},
	work_finish_time : function(){
		var work_time = $dark('#ticker1').html().match(/(\d+).(\d+).(\d+)/i);
		var date = $dark('#header_game span[6]').html().match(/(\d+).(\d+).(\d+) (\d+).(\d+)/i);
		//console.log(date[2]+"/"+date[1]+"/"+date[3]+' '+date[4]+":"+date[5]);
		
		//fix seconds
		var now = new Date();
		var newDate=date[2]+"/"+date[1]+"/"+date[3]+' '+date[4]+":"+now.getMinutes()+":"+now.getSeconds();
		
		var time = new Date(newDate).getTime() + work_time[1]*3600000 + work_time[2]*60000 + work_time[3]*1000;
		var finish_time = new Date(time);
		//Sun Jan 18 2015 03:01:46
		
		if($dark('#content td[2]'))//Not on traveling timer
			$dark('#content td[2]').delAttr('width');
		$dark('#ticker1').css('font-size:20px;');
		$dark('*span').html(' (<i>'+finish_time.getDate()+'/'+finish_time.getMonth()+1+' '+ ( (finish_time.getHours()<10)?'0'+finish_time.getHours():finish_time.getHours() )+':'+ ( (finish_time.getMinutes()<10)?'0'+finish_time.getMinutes():finish_time.getMinutes() ) +':'+ ( (finish_time.getSeconds()<10)?'0'+finish_time.getSeconds():finish_time.getSeconds() ) +'</i>)').afterFrom($dark('#ticker1'));
	}
}



/*
 * Addon Forge Script
 * Author: GreatApo
 * Copyright: all rights reserved
 */

var gca_section_forge = {
	inject : function(){
		if(!$dark('#content'))
			return;
		
		if( $dark('#forge_infobox') ){
			if( gca_section.submod==null || gca_section.submod=="index" ){
				this.forgeAllItems_button();
				this.forgeExtendedPreview();
				//this.wantedItemsMarketLink();
			}
		}
	},
	wantedItemsMarketLink : function(){
		var i=0;
		while( $dark('#forge_infobox .crafting_requirements[0] img['+i+']') ){
			var itemName = $dark('#forge_infobox .crafting_requirements[0] img['+i+']').attr('title');
			$dark('#forge_infobox .crafting_requirements[0] img['+i+']').attr('style','cursor:pointer;');
			$dark('#forge_infobox .crafting_requirements[0] img['+i+']').attr('onclick','document.location.href=document.location.href.replace("mod=forge","mod=market")+"&s=p&f=18&qry='+itemName+'"');
			i++;
		}
		
		$dark('#forge_infobox .crafting_requirements[0] fieldset[0]').addHtml('(Click an item to browse it in market)');
	},
	forgeExtendedPreview : function(){
		$dark('body').addChild($dark('*script').src(chrome.extension.getURL('scripts/forge_extended_preview.js')));
	},
	forgeAllItems_button : function(){
		//Left to right problems
		if( $dark(".gca_rtl[0]") ){
			reqMaterials_Translation = $dark('#forge_infobox .crafting_requirements[0] legend[0]').html().replace(":","")+" &#8594;";
		}else{
			reqMaterials_Translation = "&#8592; "+$dark('#forge_infobox .crafting_requirements[0] legend[0]').html().replace(":","");
		}
		
		$dark('#content .inventoryBox[0]').addChild(
			$dark('*div').id("forgeAllItems_button").class('awesome-button').html( reqMaterials_Translation )
		);
		$dark('#forgeAllItems_button').click( gca_section_forge.forgeAllItems );
	},
	forgeAllItems : function(){
		//Find Forge-Items IDs (bases on sell price, 100 or 115 or 130)
		var regex = /AddCharDiv\("p\d+_\d_\d", \d+, \d+, \d+, \d+, \d+, \d+, (\d+), (100|115|130)/g;
		var forgeItemsIDs = [];
		var match;
		while (match = regex.exec(document.getElementById("content").innerHTML)) {
			forgeItemsIDs.push(match[1]);
		}
		
		if( forgeItemsIDs.length==0 )
			return;
		
		//Find slot
		var slot = parseInt($dark('#forge_nav').html().match(/(\d) tabActive/)[1]);
		
		//Forge all found items
		$dark('#forgeAllItems_button').html( $dark('#forge_infobox .crafting_requirements[0] legend[0]').html().replace(":","")+" ("+0+"/"+forgeItemsIDs.length+")" );
		var i=0;
		while (forgeItemsIDs[i]) {
			xmlHttpRequest({ 
				url : getPage.link({"mod":"forge","submod":"toWarehouse","slot":slot,"iid":forgeItemsIDs[i]}).replace('index.php','ajax.php'),
				method : "GET",
				onload : function(content){
					var noumbers = $dark('#forgeAllItems_button').html().match(/(\d+)\/(\d+)/);
					if( (parseInt(noumbers[1])+1)==noumbers[2] ){
						document.location.href=document.location.href;
					}else{
						$dark('#forgeAllItems_button').html( $dark('#forge_infobox .crafting_requirements[0] legend[0]').html().replace(":","")+" ("+(parseInt(noumbers[1])+1)+"/"+noumbers[2]+")" );
					}
				}
			});
			i++;
		}
	}
}

/*
 * Addon Locations Script
 * Author: GreatApo
 * Copyright: all rights reserved
 */

var gca_section_location = {
	inject : function(){
		if(!$dark('#content'))
			return;
		
		if( $dark('#expedition_info1') ){
			this.show_drops();
		}
	},
	show_drops : function(){
		var drops = {"2/2_3":[33,51],"2/2_2":[11,8],"2/2_1":[48,49],"2/1_9":[17,31],"2/1_8":[37,11],"2/1_7":[45,43],"2/1_6":[42,23],"2/1_5":[48,5],"2/1_4":[9,17],"2/1_32":[35,47],"2/1_31":[27,26],"2/1_30":[22,42],"2/1_3":[48,32],"2/1_29":[51,6],"2/1_21":[36,10],"2/1_20":[7],"2/1_2":[18,9],"2/1_19":[28,27],"2/1_18":[38,39],"2/1_17":[39,21],"2/1_16":[50,46],"2/1_15":[43,38],"2/1_14":[45,22],"2/1_13":[22,32],"2/1_12":[50,36],"2/1_11":[52,7],"2/1_10":[23,51],"2/1_1":[40,8],"1/2_3":[22,19],"1/2_2":[35,49],"1/2_1":[49,35],"1/1_9":[34,40],"1/1_8":[37,39],"1/1_7":[12,38],"1/1_6":[12,7],"1/1_5":[29,32],"1/1_4":[7,20],"1/1_3":[41,42],"1/1_24":[21,14],"1/1_23":[11,10],"1/1_22":[8,41],"1/1_21":[24,29],"1/1_20":[23,24],"1/1_2":[35,16],"1/1_19":[45,44],"1/1_18":[13,34],"1/1_17":[46,30],"1/1_16":[27,50],"1/1_15":[33,23],"1/1_14":[50,52],"1/1_13":[16,33],"1/1_12":[41,12],"1/1_11":[44,19],"1/1_10":[47,45],"1/1_1":[19,6],"0/2_9":[46,38],"0/2_8":[36,6],"0/2_7":[30,33],"0/2_6":[26,48],"0/2_4":[29,12],"0/2_3":[49,47],"0/2_2":[10,28],"0/2_10":[42,5],"0/1_9":[52,14],"0/1_7":[44,8],"0/1_6":[5,18],"0/1_4":[31,11],"0/1_34":[6,5],"0/1_32":[32,40],"0/1_30":[21,9],"0/1_3":[5,9],"0/1_29":[6,16],"0/1_28":[46,15],"0/1_27":[52,24],"0/1_26":[43,51],"0/1_25":[41,30],"0/1_23":[6,31],"0/1_22":[39,28],"0/1_21":[25,5],"0/1_20":[14,25],"0/1_2":[18,13],"0/1_19":[28,44],"0/1_18":[15,26],"0/1_17":[15,25],"0/1_16":[43,37],"0/1_15":[16,14],"0/1_14":[47,27],"0/1_13":[20,10],"0/1_12":[34,40],"0/1_11":[30,21],"0/1_10":[26,13],"0/1_1":[20,17]};
		
		var i=0;
		var enemy;
		while( document.getElementsByClassName('expedition_picture')[i] && document.getElementsByClassName('expedition_picture')[i].getElementsByTagName('img')[0] ){
			enemy = document.getElementsByClassName('expedition_picture')[i].getElementsByTagName('img')[0].getAttribute('src').match(/img\/npc\/([^.]+)\.jpg/i)[1];
			//console.log(enemy);
			if(drops[enemy] && drops[enemy][0] && drops[enemy][1]){
				document.getElementsByClassName('expedition_picture')[i].innerHTML += '<div class="enemyDrop item-i-18-'+drops[enemy][0]+'" style="position:absolute;" title="If material is droped, 45% chance"></div><div title="If material is droped, 25% chance" class="enemyDrop enemyDrop2 item-i-18-'+drops[enemy][1]+'" style="position:absolute;"></div>';
			}else if(drops[enemy] && drops[enemy][0]){
				document.getElementsByClassName('expedition_picture')[i].innerHTML += '<div class="enemyDrop enemyDropOnly1 item-i-18-'+drops[enemy][0]+'" style="position:absolute;" title="If material is droped, 70% chance"></div>';
			}
			i++;
		}
	}
}