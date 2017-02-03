/*
 * Addon Player Script
 * Author: GreatApo
 * Copyright: all rights reserved
 */

var gca_section_player = {
	inject : function(){
		if(!$dark('#content'))
			return;
		if(gca_section.submod==null){
					
			//this.show_buffs();
			
			if(!getPage.url().match(/&doll=[3-6]/i)){
				if(!getPage.url().match(/&doll=2/i)){
					(gca_options.isOn("ENABLE_PLAYER_SIMULATOR_BUTTON") &&
					this.simulator_button());
				}
				(gca_options.isOn("ENABLE_PLAYER_IMAGE") &&
				this.player_image());
				
				if(getPage.url().match(/&doll=2/i) && gca_options.isOn("ENABLE_PLAYER_MERCENARIES_FIGHT_TYPE")){
					this.mercenaries_fight_type();
				}
			}else{
				if(getPage.url().match(/&doll=[3-6]/i)){
					this.mercenaries_show_tooltips();
				}
				(gca_options.isOn("ENABLE_PLAYER_MERCENARIES_FIGHT_TYPE") &&
				this.mercenaries_fight_type());
			}			
		}
	},
	// Show player buffs
	show_buffs : function(){
		if(!$dark('#content'))
			return;
		
		var stats_translations = [];
		var j=2;
		while( $dark('#charstats .charstats_text['+j+']') ){
			stats_translations.push( $dark('#charstats .charstats_text['+j+']').html() );
			j++;
		}
		var j=1;
		while( $dark('#charstats .charstats_value21['+j+']') ){
			stats_translations.push( $dark('#charstats .charstats_value21['+j+']').html() );
			j++;
		}
		//console.log(stats_translations);
		
		//Buffs array
		var buffs = [];//category (1:oils, 2:max, 3:enisxiseis, 4:critical), stat(number), value 
		
		//Find Oil buffs
		for(var i=2;i<=11;i++){
			if( $dark('#tOoLtIp_p'+i+'_1_1') && $dark('#tOoLtIp_p'+i+'_1_1').html().match(/\+(\d+) ([^\s]+)   /i) ){
				var buff = $dark('#tOoLtIp_p'+i+'_1_1').html().match(/\+(\d+) ([^\s]+)   /i);
				//Find the stat
				var j=0; var found=false;
				while( stats_translations[j] && !found){
					if( stats_translations[j]==buff[2] ){
						buff[2]=j;
						found=true;
					}
					j++;
				}
				//Add to buffs
				buffs.push([1,buff[2],buff[1]]);
				//console.log(buff[2]+': +'+buff[1]);
			}
		}
		//Find Max/Enisxiseis buffs
		for(var i=3;i<=10;i++){
			//Max
			if( $dark('#charstats .charstats_bg['+i+']').getAttr('data-tooltip').match(/(\d+)","#00B712/i) ){
				var buff = $dark('#charstats .charstats_bg['+i+']').getAttr('data-tooltip').match(/(\d+)","#00B712/i)[1] - Math.round($dark('#charstats .charstats_bg['+i+']').getAttr('data-tooltip').match(/(\d+)","#DDDDDD/i)[1]*1.5 + parseInt($dark('#char_level').html()));
				buffs.push([2,i-3,buff+' max']);
				//console.log(i+': +'+buff);
			}
			//Enisxiseis
			if( $dark('#charstats .charstats_bg['+i+']').getAttr('data-tooltip').match(/\+(\d+)","#00B712/i) ){
				var buff = $dark('#charstats .charstats_bg['+i+']').getAttr('data-tooltip').match(/\+(\d+)","#00B712/i)[1];
				buffs.push([3,i-3,buff]);
				//console.log(i+': +'+buff);
			}
		}
		//Find Critical buff
		if( $dark('#char_schaden_tt').getAttr('data-tooltip').match(/(\d+) %/i) && !getPage.url().match(/&doll=[3-6]/i)){
			var buff = $dark('#char_schaden_tt').getAttr('data-tooltip').match(/(\d+) %/i)[1] - Math.round($dark('#char_schaden_tt').getAttr('data-tooltip').match(/(\d+)","#BA9700/i)[1]*52/(parseInt($dark('#char_level').html())-8)/5);
			if( buff>0 ){
				buffs.push([4,9,buff+'%']);
				stats_translations.push( $dark('#char_schaden_tt').getAttr('data-tooltip').match(/"([^:]+):"/gi)[8].match(/"([^:]+):"/)[1].trim() );
			}
		}
		//Find Damage buff
		if( $dark('#char_schaden_tt').getAttr('data-tooltip').match(/(\d+)"/i) ){
			var buff = $dark('#char_schaden_tt').getAttr('data-tooltip').match(/(\d+)"/gi)[4].match(/(\d+)/)[1];
			if( buff>0 ){
				buffs.push([3,7,buff]);
			}
		}
		//Find Life buff
		if( $dark('#char_leben_tt').getAttr('data-tooltip').match(/(\d+)"/i) ){
			var buff = $dark('#char_leben_tt').getAttr('data-tooltip').match(/(\d+)"/gi)[3].match(/(\d+)/)[1];
			if( buff>0 ){
				buffs.push([3,8,buff]);
				stats_translations[8] = $dark('#char_leben_tt .charstats_text[0]').html();
			}
		}
		
		// Buff images
		var images = [
			[// oils
				['buff/11_4.gif'],
				['item/11_8.gif'],
				['item/11_12.gif'],
				['item/11_16.gif'],
				['item/11_20.gif'],
				['item/11_27.gif'],
				['item/12_3.gif'],
				['item/12_1.gif']
			],
			[// max
				['powerups/powerup_3.gif'],
				['powerups/powerup_3.gif'],
				['powerups/powerup_4.gif'],
				['powerups/powerup_4.gif'],
				['powerups/powerup_1.gif'],
				[''],
				[''],
				['']
			],
			[// enisxiseis
				['buff/13_1.gif'],
				['buff/13_2.gif'],
				['buff/13_3.gif'],
				['buff/13_4.gif'],
				['buff/13_5.gif'],
				['buff/13_8.gif'],
				['buff/13_6.gif'],
				['buff/13_7.gif'],
				['buff/13_6.gif']
			],
			[// Critical
				[''],
				[''],
				[''],
				[''],
				[''],
				[''],
				[''],
				[''],
				[''],
				['powerups/powerup_3.gif']
			]
		]
		
		if( buffs.length>0 ){
			$dark('*div').id('buffbar_old').beforeFrom('#blackoutDialogbod');
            var i=0;
			while( buffs[i] ){
				$dark('#buffbar_old').addChild([
					$dark('*div').class('buff_old').addChild([
						$dark('*div').class('buff_inner').addChild(
							//$dark('*img').src('img/buff/13_'+(buffs[i][1]+1)+'.gif').css('width:32px;height:32px;')
							$dark('*img').src('img/'+images[buffs[i][0]-1][buffs[i][1]]).css('width:32px;height:32px;')
						),
						$dark('*div').css('text-align:center;width:35px').html('<span class="z" style="text-align:left"> +'+ ((buffs[i][2].match('%'))?buffs[i][2]:buffs[i][2].match(/(\d+)/i)[1]) +'</span>')
					]).attr('data-tooltip','[[["'+stats_translations[buffs[i][1]]+'","#FFD800"], ["'+buffs[i][2]+' '+stats_translations[buffs[i][1]].toLowerCase()+'","#DDDDDD"]]]')
				]);
				i++;
			}
			$dark('#buffbar_old .buff_old['+(i-1)+']').setAttr('class','buff_old buffende');
		}
		
	},
	logout_inject : function(){
		if(!$dark('#content'))
			return;
		
		if(gca_section.submod==null){
			gca_section_overview.overview.equipedItemsAnalize.run(false);
			this.show_buffs();
			if(!document.location.href.match(/&doll=[3-6]/i)){
				this.player_image();
			}
			if(document.location.href.match(/&doll=[2-6]/i)){
				// Show ToolTips
				if(getPage.url().match(/&doll=[3-6]/i))
					gca_section_player.mercenaries_show_tooltips();
				//Show the fight type of opponents mercenaries
				this.mercenaries_fight_type();
			}
		}else if(gca_section.submod=="stats"){
			gca_section_overview.stats.inject();
		}
	},
	//Player image
	player_image : function(player,type){
		//"player" is the image
		//type= 1 for Attacker, 2 for Defender, null for nothing		
		if(!player){
			//Take the image from the description
			if($dark('#content').html().match(/##GTI=([^#]+)##/)){
				var player=$dark('#content').html().match(/##GTI=([^#]+)##/)[1];
			}else{
				var player=null;
			}
		}
		
		if(player!=null && player!=''){
			if(!type){//Overview/Player Image
				$dark('.player_picture[0]').addChild([
					$dark('*img').class('avatar_costume_part').src(player).style('width:168px;height:194px;z-index:39;'),
					$dark('*div').class('avatar_costume_part avatar_border').style('z-index:40;')
				])
			}else if(type==1){//Attackers Image
				$dark('#attackerAvatar1 .player_picture[0]').addChild([
					$dark('*img').class('avatar_costume_part').src(player).style('width:168px;height:194px;z-index:39;'),
					$dark('*div').class('avatar_costume_part avatar_border').style('z-index:40;')
				])
			}else if(type==2){//Attackers Image
				if($dark('#defenderAvatar11 .player_picture[0]')){
					$dark('#defenderAvatar11 .player_picture[0]').addChild([
						$dark('*img').class('avatar_costume_part').src(player).style('width:168px;height:194px;z-index:39;'),
						$dark('*div').class('avatar_costume_part avatar_border').style('z-index:40;')
					])
				}
			}
		}
	},
	//Simulator Button
	simulator_button : function(){
		if($dark('#ujn')){
			// Check if user is premium
			var premium = ((gca_data.get('premium_days',0)-(new Date().getTime()/1000))/60/60/24>0)?true:false;
			// Variable definitions
			var class_name, simulator_url;

			// Premium User
			if(premium && gca_data.get('playerId', null)!=null){
				class_name = 'prem_simulator_button';
				simulator_url = 'http://gladiatussimulator.tk/?hash='+
					// Attacker ID
					(parseInt(gca_data.get('playerId', null)).toString(16))+'-'+
					// Defender ID
					(parseInt(getPage.url().match(/p=(\d+)/)[1]).toString(16))+'-'+
					// Country
					gca_section.country+'-'+
					// Server
					parseInt(gca_section.server).toString(2);
			}
			// Normal User
			else{
				class_name = 'simulator_button';
				simulator_url = 'http://gladiatussimulator.tk/';
			}
			
			// Add simulator button
			$dark('*a').href(simulator_url).setAttr('target','_blank').addChild(
				$dark('*input').type('button').class(class_name)
			).afterFrom( $dark('#ujn').parent() );
		}
	},
	//Show the fight type of opponents mercenaries
	mercenaries_fight_type : function(){
		if($dark('#charstats')){
			var mission = $dark('.charmercsel_aktive[0] div[0]').getAttr('onmouseover').match(/>([^<]+)<\/font>/i)[1];
			if($dark('#char_healing_tt').element.style.display==""){//Healer
				$dark('#content .player_picture[0]').addChild(
					$dark('*img').class('mercenaries_fight_type').src(getPage.url().replace(/index.php.+/,'')+'img/interface/task_3_active.gif').tooltip([mission])
				);
			}else{//Attacker or Defender
				var fight_type_strings=gca_data.get('mercenaries_fight_type_strings',[null,null,null]);
				if(fight_type_strings[0]){
					if(mission.match(fight_type_strings[0])){
						$dark('#content .player_picture[0]').addChild(
							$dark('*img').class('mercenaries_fight_type').src(getPage.url().replace(/index.php.+/,'')+'img/interface/task_1_active.gif').tooltip([mission])
						);
					}else{
						$dark('#content .player_picture[0]').addChild(
							$dark('*img').class('mercenaries_fight_type').src(getPage.url().replace(/index.php.+/,'')+'img/interface/task_2_active.gif').tooltip([mission])
						);
					}
				}
			}
			
			$dark('#content .player_name_bg[0]').addChild([
				$dark('*div').class('achievementtitle').html(
					$dark('#content .charmercsel_aktive[0] div[0]').attr('onmouseover').match(/DDDDDD>([^<]+)<\/font/i)[1]
				)
			]);
		}
	},
	//Show mercenaries tooltips
	mercenaries_show_tooltips : function(){
		var avatar_num=parseInt($dark('.avatar[0]').getAttr('style').match(/merc\/(\d+)\.jpg/)[1]);
		if(avatar_num==1 || avatar_num==6 || avatar_num==11){//defence
			var img='img/item/15_6.gif';
		}else if(avatar_num==2 || avatar_num==7 || avatar_num==12){//Medic
			var img='img/item/15_7.gif';
		}else{//Attack
			var img='img/item/15_8.gif';
		}
		
		var stats=[
			$dark('.playername[0]').html(),//Name
			'<span class="gca_tooltip_category_title">'+$dark('#char_leben_tt span[0]').html()+': '+$dark('#char_leben_tt').getAttr('onmouseover').match(/\d+ \/ (\d+)/)[1]+'</span>',//Life
			'<span class="gca_tooltip_category_title">'+$dark('#char_f0_tt span[0]').html()+': '+$dark('#char_f0_tt').getAttr('onmouseover').match(/(\d+)</g)[1].replace('<','')+'</span>',//Strength
			'<span class="gca_tooltip_category_title">'+$dark('#char_f1_tt span[0]').html()+': '+$dark('#char_f1_tt').getAttr('onmouseover').match(/(\d+)</g)[1].replace('<','')+'</span>',//Skill
			'<span class="gca_tooltip_category_title">'+$dark('#char_f2_tt span[0]').html()+': '+$dark('#char_f2_tt').getAttr('onmouseover').match(/(\d+)</g)[1].replace('<','')+'</span>',//Agility
			'<span class="gca_tooltip_category_title">'+$dark('#char_f3_tt span[0]').html()+': '+$dark('#char_f3_tt').getAttr('onmouseover').match(/(\d+)</g)[1].replace('<','')+'</span>',//Constitution
			'<span class="gca_tooltip_category_title">'+$dark('#char_f4_tt span[0]').html()+': '+$dark('#char_f4_tt').getAttr('onmouseover').match(/(\d+)</g)[1].replace('<','')+'</span>',//Charisma
			'<span class="gca_tooltip_category_title">'+$dark('#char_f5_tt span[0]').html()+': '+$dark('#char_f5_tt').getAttr('onmouseover').match(/(\d+)</g)[1].replace('<','')+'</span>',//Intelect
			'<span class="gca_tooltip_grey_text">'+$dark('#char_panzer_tt span[0]').html()+': '+$dark('#char_level').html()+'</span>'//Level
		];		
		
		$dark('#content .player_picture[0]').addChild(
			$dark('*div').class('merc_back').addChild(
				$dark('*img').src(img).css( (gca_section.mod=='overview')?'-webkit-filter: grayscale(100%);-moz-filter: grayscale(100%);filter: grayscale(100%);':'' ).tooltip(stats)
			)
		);
	}
}