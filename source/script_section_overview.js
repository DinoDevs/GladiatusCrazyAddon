/*
 * Addon Overview Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_section_overview = {
	inject : function(){
		if(gca_section.submod==null || gca_section.submod=="fetchLoginBonus" || gca_section.submod=="changeMercName"){
			/* Find Doll */
			var doll = document.location.href.match(/&doll=([1-6])/i);
			if( !doll ){
				doll = $dark("#char .charmercsel_aktive[0]");
				if(doll){// From Group Selection
					doll = (parseInt(doll.attr("style").match(/top\:(\d+)px/i)[1])-5)/45+1;
				}else{
					doll = 1;
				}
			}else{// From URL
				doll = doll[1];
			}
			
			
			/* Save Player's Stats */
			this.overview.playerStatsSave();
			/* Share player link */
			(gca_options.isOn("ENABLE_OVERVIEW_DISPLAY_SHARE_LINK") &&
			this.overview.shareYourPlayerLink.inject());
			
			/* Save main player info */
			if(doll<=2){
				//Player Image
				(gca_options.isOn("ENABLE_PLAYER_IMAGE") && gca_section_player.player_image( gca_data.get('player_image',null),null ));
				this.overview.saveMainPlayerInfo();
			}
			
			//ONLY ON DUNGEON PLAYERS
			if(doll>=2){
				/* Show heal stat */
				(gca_options.isOn("ENABLE_OVERVIEW_SHOW_HEAL") &&
					this.overview.show_heal_stat());
				this.overview.save_heal_string();
				/* Save mercenaries fight type strings */
				this.overview.mercenaries_fight_type_strings();
			}else{
				/* Save weapon down */
				this.overview.save_weapon_down();
			}
			
		}else if(gca_section.submod=="stats"){
			(gca_options.isOn("ENABLE_OVERVIEW_PLAYER_STATS_MOD") &&
			this.stats.inject());
		}
	},
	overview : {
		/* Save main player info */
		saveMainPlayerInfo : function(){
			gca_data.set('playerName', $dark('#content .player_name_bg[0] div[0]').html());
			gca_data.set('playerId', $dark("#content").html().match(/index.php\?mod=player(&amp;|&)p=(\d+)/i)[2] );
		},
		/* Save weapon down */
		save_weapon_down : function(){
			window.onbeforeunload = function(){
				gca_section_overview.overview.save_weapon_down_check();
			}
		},
		save_weapon_down_check : function(){
			if( !$dark('#p3_1_1 img[0]') ){
				gca_data.set('weapon_down',true);
			}else{
				gca_data.set('weapon_down',false);
			}
		},
		/* Save mercenaries fight type strings */
		mercenaries_fight_type_strings : function(){
			if($dark('#task1')){
				gca_data.set('mercenaries_fight_type_strings', [
					JSON.parse($dark('#task1').attr('data-tooltip'))[0][0][0],
					JSON.parse($dark('#task2').attr('data-tooltip'))[0][0][0],
					JSON.parse($dark('#task3').attr('data-tooltip'))[0][0][0]
				]);
			}
		},
		/* Show heal stat */
		show_heal_stat : function(){
			if($dark('#char_healing_tt')){
				$dark('#char_healing_tt').delAttr('style');
			}
		},
		save_heal_string : function(){
			if($dark('#char_healing_tt')){
				var heal_string = $dark('#char_healing_tt span[0]').html();
				gca_data.set('heal_string',heal_string);
			}
		},

		/* Save Player Stats */
		playerStatsSave : function(){
			var playerStats = {
				strength : {
					locale: $dark('#char_f0_tt span[0]').html(),
					points: parseInt($dark('#char_f0').html())
				},
				skill : {
					locale: $dark('#char_f1_tt span[0]').html(),
					points: parseInt($dark('#char_f1').html())
				},
				agility : {
					locale: $dark('#char_f2_tt span[0]').html(),
					points: parseInt($dark('#char_f2').html())
				},
				constitution : {
					locale: $dark('#char_f3_tt span[0]').html(),
					points: parseInt($dark('#char_f3').html())
				},
				charisma : {
					locale: $dark('#char_f4_tt span[0]').html(),
					points: parseInt($dark('#char_f4').html())
				},
				intelligence : {
					locale: $dark('#char_f5_tt span[0]').html(),
					points: parseInt($dark('#char_f5').html())
				},
				armor : {
					locale: $dark('span[0]', $dark('#char_panzer').parent() ).html(),
					points: parseInt($dark('#char_panzer').html())
				},
				damage : {
					locale: $dark('#char_schaden_tt span[0]').html(),
					min: parseInt($dark('#char_schaden').html().match(/(\d+)\s+-\s+\d+/i)[1]),
					max: parseInt($dark('#char_schaden').html().match(/\d+\s+-\s+(\d+)/i)[1])
				}
			}
			gca_data.set('playerStats', playerStats);
		},
		shareYourPlayerLink : {
			inject : function(){
				var myShelf=this;
				var playerLink = $dark("#content .contentItem[0] b[0]");
				var name=$dark('#content .player_name_bg[0] div[0]').html();
				$dark('*center').addChild(
					$dark('*input').type('button').class('button1').value('Share on Facebook').css('margin-top:10px;').click(function(){
						myShelf.shareFacebookLink(playerLink.html(), "Gladiatus - "+name);
					})
				).afterFrom(playerLink);
				$dark('*br').afterFrom(playerLink);
			},
			shareFacebookLink : function(URL, TITLE){
				var u=encodeURIComponent(URL);
				var t=encodeURIComponent(TITLE);
				window.open(
					'http://www.facebook.com/sharer.php?u='+u+'&t='+t,
					'sharer','toolbar=0,status=0,width=626,height=436,top=20,left=20'
				);return false;
			}
		}
	},
	
	stats : {
		inject : function(){
			this.setElements();
			this.applyChanges();
		},
		setElements : function(){
			//Arena
			this.battles = { el : $dark('#content table[0] tr[0]') };
			this.battles.value = parseInt( subFuncts.strings.removeDots( $dark('td[0]',this.battles.el).html() ) );
			this.win = { el : $dark('#content table[0] tr[1]') };
			this.win.value = parseInt( subFuncts.strings.removeDots( $dark('td[0]',this.win.el).html() ) );
			this.lost = { el : $dark('#content table[0] tr[2]') };
			this.lost.value = parseInt( subFuncts.strings.removeDots( $dark('td[0]',this.lost.el).html() ) );
			this.draw = { el : $dark('#content table[0] tr[3]') };
			this.draw.value = parseInt( subFuncts.strings.removeDots( $dark('td[0]',this.draw.el).html() ) );
			
			this.hits_done = { el : $dark('#content table[0] tr[4]') };
			this.hits_done.value = parseInt( subFuncts.strings.removeDots( $dark('td[0]',this.hits_done.el).html() ) );
			this.hits_take = { el : $dark('#content table[0] tr[5]') };
			this.hits_take.value = parseInt( subFuncts.strings.removeDots( $dark('td[0]',this.hits_take.el).html() ) );
			
			this.gold_take = { el : $dark('#content table[0] tr[6]') };
			this.gold_take.value = parseInt( subFuncts.strings.removeDots( $dark('td[0]',this.gold_take.el).html().replace(/<img[^>]+>/g,'') ) );
			this.gold_lost = { el : $dark('#content table[0] tr[7]') };
			this.gold_lost.value = parseInt( subFuncts.strings.removeDots( $dark('td[0]',this.gold_lost.el).html().replace(/<img[^>]+>/g,'') ) );

			//Turma
			this.battles_turma = { el : $dark('#content table[1] tr[0]') };
			this.battles_turma.value = parseInt( subFuncts.strings.removeDots( $dark('td[0]',this.battles_turma.el).html() ) );
			this.win_turma = { el : $dark('#content table[1] tr[1]') };
			this.win_turma.value = parseInt( subFuncts.strings.removeDots( $dark('td[0]',this.win_turma.el).html() ) );
			this.lost_turma = { el : $dark('#content table[1] tr[2]') };
			this.lost_turma.value = parseInt( subFuncts.strings.removeDots( $dark('td[0]',this.lost_turma.el).html() ) );
			this.draw_turma = { el : $dark('#content table[1] tr[3]') };
			this.draw_turma.value = parseInt( subFuncts.strings.removeDots( $dark('td[0]',this.draw_turma.el).html() ) );

			this.gold_take_turma = { el : $dark('#content table[1] tr[4]') };
			this.gold_take_turma.value = parseInt( subFuncts.strings.removeDots( $dark('td[0]',this.gold_take_turma.el).html().replace(/<img[^>]+>/g,'') ) );
			this.gold_lost_turma = { el : $dark('#content table[1] tr[5]') };
			this.gold_lost_turma.value = parseInt( subFuncts.strings.removeDots( $dark('td[0]',this.gold_lost_turma.el).html().replace(/<img[^>]+>/g,'') ) );

			//Add dots on a number
			var links = parseInt( $dark('#content table[4] tr[3] td[0]').html() );
			$dark('#content table[4] tr[3] td[0]').html( subFuncts.strings.insertDots(links) );
		},
		applyChanges : function(){
			//Horizontal Rules
				$dark('*tr').class('overviewStatsHr').afterFrom(this.draw.el);
				$dark('*tr').class('overviewStatsHr').afterFrom(this.hits_take.el);
				$dark('*tr').class('overviewStatsHr').afterFrom(this.gold_lost.el);

			//Percents
				//Won%
				var win_percent = (this.battles.value!=0)?Math.floor( (this.win.value/this.battles.value)*100 ):0;
				$dark('td[0]',this.win.el).addHtml(' ('+win_percent+'%)');
				//Lost%
				var lost_percent = (this.battles.value!=0)?Math.floor( (this.lost.value/this.battles.value)*100 ):0;
				$dark('td[0]',this.lost.el).addHtml(' ('+lost_percent+'%)');
				//Draw%
				var draw_percent = (this.battles.value!=0)?Math.floor( (this.draw.value/this.battles.value)*100 ):0;
				$dark('td[0]',this.draw.el).addHtml(' ('+draw_percent+'%)');

			//Win/Lost Ration
				var win_lost_ratio = (this.lost.value!=0)?Math.floor( (this.win.value/this.lost.value)*1000 )/1000:1;
				var win_lost_ratio_locale = $dark('th[0]',this.win.el).html().replace(':','')+'/'+$dark('th[0]',this.lost.el).html().replace(':','')+' Ratio:';
				$dark('*tr').addChild([
					$dark('*th').html( win_lost_ratio_locale ),
					$dark('*td').html( win_lost_ratio ).css("color:"+( (win_lost_ratio>=1)?"green;":"red;" ) )
				]).afterFrom(this.draw.el);

			//Hits difference
				var hits_difference = this.hits_done.value-this.hits_take.value;
				$dark('*tr').addChild([
					$dark('*th').html( gca_locale.get("difference")+":" ),
					$dark('*td').html( subFuncts.strings.insertDots(hits_difference) ).css("color:"+( (hits_difference>=0)?"green;":"red;" ) )
				]).afterFrom(this.hits_take.el);

			//Gold difference
				var gold_difference = this.gold_take.value-this.gold_lost.value;
				$dark('*tr').addChild([
					$dark('*th').html( gca_locale.get("difference")+":" ),
					$dark('*td').html( subFuncts.strings.insertDots(gold_difference)+' <img src="img/res2.gif">' ).css("color:"+( (gold_difference>=0)?"green;":"red;" ) )
				]).afterFrom(this.gold_lost.el);

			// -= TURMA =-
			//Horizontal Rules
				$dark('*tr').class('overviewStatsHr').afterFrom(this.draw_turma.el);
				$dark('*tr').class('overviewStatsHr').afterFrom(this.gold_lost_turma.el);

			//Percents
				//Won%
				var win_percent_turma = (this.battles_turma.value!=0)?Math.floor( (this.win_turma.value/this.battles_turma.value)*100 ):0;
				$dark('td[0]',this.win_turma.el).addHtml(' ('+win_percent_turma+'%)');
				//Lost%
				var lost_percent_turma = (this.battles_turma.value!=0)?Math.floor( (this.lost_turma.value/this.battles_turma.value)*100 ):0;
				$dark('td[0]',this.lost_turma.el).addHtml(' ('+lost_percent_turma+'%)');
				//Draw%
				var draw_percent_turma = (this.battles_turma.value!=0)?Math.floor( (this.draw_turma.value/this.battles_turma.value)*100 ):0;
				$dark('td[0]',this.draw_turma.el).addHtml(' ('+draw_percent_turma+'%)');

			//Win/Lost Ration
				var win_lost_ratio_turma = (this.lost_turma.value!=0)?Math.floor( (this.win_turma.value/this.lost_turma.value)*1000 )/1000:1;
				var win_lost_ratio_locale_turma = $dark('th[0]',this.win_turma.el).html().replace(':','')+'/'+$dark('th[0]',this.lost_turma.el).html().replace(':','')+' Ratio:';
				$dark('*tr').addChild([
					$dark('*th').html( win_lost_ratio_locale_turma ),
					$dark('*td').html( win_lost_ratio_turma ).css("color:"+( (win_lost_ratio_turma>=1)?"green;":"red;" ) )
				]).afterFrom(this.draw_turma.el);

			//Gold difference
				var gold_difference_turma = this.gold_take_turma.value-this.gold_lost_turma.value;
				$dark('*tr').addChild([
					$dark('*th').html( gca_locale.get("difference")+":" ),
					$dark('*td').html( subFuncts.strings.insertDots(gold_difference_turma)+' <img src="img/res2.gif">' ).css("color:"+( (gold_difference_turma>=0)?"green;":"red;" ) )
				]).afterFrom(this.gold_lost_turma.el);
		}
	}
}
