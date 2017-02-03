/*
 * Addon Pantheon Script
 * Author: GreatApo
 * Copyright: all rights reserved
 */

var gca_section_pantheon = {
	inject : function(){
		if(!$dark('#content'))
			return;
		(gca_options.isOn("ENABLE_PANTHEON_QUESTS_ORDER") &&
		this.quests_order());
		(gca_options.isOn("ENABLE_PANTHEON_QUESTS_DETAILED_REWARDS") &&
		this.quests_god_rewards());
		
		this.save_quest_time();
	},
	//Quests Order
	quests_order : function(){
		if(!$dark('.contentboard_start[0]'))
			return;
		var quest_divs=$dark('.contentboard_slot');
		var categories=['items','work','dungeon','expedition','combat','grouparena','arena','restart','finished'];
		var quest_categories={};
		
		for(var i=0;i<categories.length;i++){
			quest_categories[categories[i]]=$dark('*div').id(categories[i]).style('display:none;').afterFrom('.contentboard_header_long[0]').addChild([
				$dark('*div').class('contentboard_header_long quest_category_title')
			]);
		}
		for(var i=0;i<quest_divs.length;i++){
			if( $dark('a[0]', quest_divs[i] ) && $dark('a[0]', quest_divs[i] ).class().match('quest_slot_button_finish') ){
				var category='finished';
			}else if( $dark('a[0]', quest_divs[i] ) && $dark('a[0]', quest_divs[i] ).class().match('quest_slot_button_restart') ){
				var category='restart';
			}else{
				var category=$dark('div[0]', quest_divs[i]).getAttr('style').match(/quest\/([^\.]+)\.jpg/)[1].replace(/(_inactive|_active|icon_)/g,'');
			}
			$dark(quest_categories[category]).style('display:block;').addChild([quest_divs[i]]);
		}
	},
	//Quest God Rewards
	quests_god_rewards : function(){
		this.quests_god_rewards_function('god');
		this.quests_god_rewards_function('honor');
		this.quests_god_rewards_function('xp');
	},
	quests_god_rewards_function : function(type){
		var i=0;
		var reward;
		while($dark('.quest_slot_reward_'+type+'['+i+']')){
			if($dark('.quest_slot_reward_'+type+'['+i+'] span[0]')){
				$dark('.quest_slot_reward_'+type+'['+i+']').addClass('quest_slot_reward_'+type+'_changed');
				reward=$dark('.quest_slot_reward_'+type+'['+i+'] span[0]').getAttr('data-tooltip').replace(/\./g,'').match(/(\d+)/)[1]*1; //(\d+)
				$dark('.quest_slot_reward_'+type+'['+i+'] span[0]').html( subFuncts.strings.insertDots(reward) + ' ' + $dark('.quest_slot_reward_'+type+'['+i+'] span[0]').html() );
			}
			i++;
		}
		
	},
	//Save quest time
	save_quest_time : function(){
		if($dark('#quest_header_accepted')){
			//Save time
			var time=new Date().getTime();
			if($dark('#quest_header_cooldown')){
				var seconds = parseInt(document.getElementById("quest_header_cooldown").getElementsByTagName("span")[0].dataset.tickerTimeLeft);
				time=(time+seconds*1000).toString();
				gca_data.set('quest_timer_time',time);
			}
			if($dark('#quest_header_accepted')){
				//Save number of max quests
				var max_quests=parseInt( $dark('#quest_header_accepted').html().match(/\d+ \/ (\d+)/)[1] );
				//Save number of taken quests
				var taken_quests=parseInt( $dark('#quest_header_accepted').html().match(/(\d+) \/ \d+/)[1] );
				
				var quests_you_can_take=max_quests-taken_quests;
				gca_data.set('quest_timer_quests_you_can_take',quests_you_can_take);
			}
			gca_section_global.display.quests_timer();
		}
	}
}

var gca_section_gods = {
	inject : function(){
		if(!$dark('#content'))
			return;
			
		(gca_options.isOn("ENABLE_PANTHEON_GODS_RECOLOR") &&
		this.gods_colors());
		
		this.full_god_points();
	},
	//Change Gods Colors
	gods_colors : function(){
		if(!$dark('#minerva'))
			return;
		
		var index;
		var a = ["minerva", "mars", "apollo", "diana", "vulcanus", "merkur"];
		for (index = 0; index < a.length; ++index) {
			var no = ($dark('#'+a[index]+' img[0]').getAttr('src').match(/_(\d)\.png/i))?$dark('#'+a[index]+' img[0]').getAttr('src').match(/_(\d)\.png/i)[1]:0;
			if(no>1)
				$dark('#'+a[index]+' img[0]').setAttr('src', gca_resources.getURL("/img/gods/ring_"+a[index]+"_"+no+".png") );
		}
	},
	//Full God Points
	full_god_points : function(){
		if(!$dark('#minerva'))
			return;
		
		var index;
		var a = ["minerva", "mars", "apollo", "diana", "vulcanus", "merkur"];
		for (index = 0; index < a.length; ++index) {
			var numbers = $dark('#'+a[index]+' .god_points[0]').html().match(/(\d+) \/ (\d+)/i);
			if(numbers){
				if(numbers[1]==numbers[2])
					$dark('#'+a[index]+' .god_points[0]').css('color:#D00000;');
				else
					$dark('#'+a[index]+' .god_points[0]').addHtml(' ('+(Math.round(numbers[1]/numbers[2]*100))+'%)');
			}
		}
	}
}

// Mystery Box
var gca_section_mysterybox = {
	working : false,
	
	inject : function(){
		if(!$dark('#content'))
			return;
		
		//this.openAllBoxes_button();
	},
	//Open All Button
	openAllBoxes_button : function(){
		if( parseInt($dark('.mysterybox_count[0]').html())<2 )
			return;
		
		$dark('#mysterybox_buttons').addChild(
			$dark('*input').id("openAllBoxes_button").type('button').class('premium_activate_button').value( gca_locale.get("OPTIONS_OPEN_ALL") ).css("transform: scale(0.85);")
		);
		$dark('#openAllBoxes_button').click( gca_section_mysterybox.openAllBoxes );
	},
	//Open All Mystery Boxes
	openAllBoxes : function(){
		if(gca_section_mysterybox.working){
			return;
		}
		
		gca_section_mysterybox.working = true;
		
		var boxes = parseInt($dark('.mysterybox_count[0]').html());
		
		//Open all boxes
		$dark('#openAllBoxes_button').value( "0%" );
		var i=0;
		while (i<boxes) {
			xmlHttpRequest({
				url : getPage.link({"mod":"mysterybox","submod":"pick"}).replace('index.php','ajax.php'),
				method : "GET",
				onload : function(content){
					if( parseInt($dark('.mysterybox_count[0]').html())==1 ){
						document.location.href=getPage.link({"mod":"premium","submod":"inventory"});
					}else{
						$dark('.mysterybox_count[0]').html( parseInt($dark('.mysterybox_count[0]').html())-1 );
						$dark('#openAllBoxes_button').value( Math.round((boxes-parseInt($dark('.mysterybox_count[0]').html()))/boxes*100)+"%" );
					}
				}
			});
			i++;
		}
	}
}