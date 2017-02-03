/*
 * Addon Arena Script
 * Author: GreatApo, DarkThanos
 * Copyright: all rights reserved
 */

var gca_section_arena = {
	inject : function(){
		if(!$dark('#content'))
			return;
			
		if(!$dark('.buildingDesc[0]'))
			return;
		
		if(gca_section.submod=='serverArena' && getPage.parameter('aType')==2){			//Server Arena
			//Order players by Level
			(gca_options.isOn("ENABLE_ARENA_SERVER_ARENA_ORDER") &&
			this.order_by_level_serverArena());
		}else if(gca_section.submod=='serverArena' && getPage.parameter('aType')==3){	//Server Turma
			//Order players by Level
			(gca_options.isOn("ENABLE_ARENA_SERVER_ARENA_ORDER") &&
			this.order_by_level_serverTurma());
		}else if(gca_section.submod=='grouparena'){										//Turma
			//Clear Input Button
			this.clearButtons();
			//Save if you enabled in turma
			this.turma_status();
		}else{																			//Arena
			//Clear Input Button
			this.clearButtons();
		}
		
	},
	//Clear Buttons
	clearButtons : function(){
		if($dark('#ujn')){
			$dark('#ujn').parent().addChild(
				$dark('*div').class('clear_button arena_clear_button').attr('title', gca_locale.get('clear') ).attr('onclick', 'document.getElementById("ujn").value="";' )
			);
			$dark('input[1]',$dark('#ujn').parent()).addClass('arena_attack_button');
		}
	},
	//Level Order (Server Arena)
	order_by_level_serverArena : function(){
		return this.order_by_level("own2");
	},
	order_by_level_serverTurma : function(){
		return this.order_by_level("own3");
	},
	order_by_level : function(type){
		if(!$dark('#'+type+' tr')) return;
		var swapped;
		do {
			swapped = false;
			for(var i=1; i < $dark('#'+type+' tr').length-1; i++){
				if( parseInt($dark('#'+type+' tr['+i+'] td[1]').html()) > parseInt($dark('#'+type+' tr['+(i+1)+'] td[1]').html()) ){
					$dark('#'+type+' tr['+i+']').afterFrom( $dark('#'+type+' tr['+(i+1)+']') );
					swapped = true;
				}
			}
		}while(swapped);
	},
	//Save turma status (enabled/disabled)
	turma_status : function(){
		if($dark('#ct_state span[0]').getAttr('style')!='color:green;'){
			gca_data.set('arena_turma_closed',true);
		}else{
			gca_data.set('arena_turma_closed',false);
		}
	}
}