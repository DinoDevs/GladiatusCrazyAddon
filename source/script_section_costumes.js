/*
 * Addon Costumes Script
 * Author: GreatApo
 * Copyright: all rights reserved
 */

var gca_section_costumes = {
	inject : function(){
		this.save_player_image();
	},
	//Save player image
	save_player_image : function(){
		var saveFunction= function(){
			var description = $dark('#player_description').html();
			var playerImage = $dark('#image_link').value();
			var save = $dark('#image_button').value();
			$dark('#image_button').value( gca_locale.get('loading') );
			if(description!='ERROR'){
				description = description+'[f c=#DED2AD][f s=10]##GTI='+playerImage+'##[/f][/f]';
				xmlHttpRequest({
					url : getPage.link({"mod":"settings","submod":"saveCharacterDesc"}),
					method : "POST",
					data: 'fontsize=none&fontface=none&rpg='+encodeURIComponent(description)+'&save='+encodeURIComponent(save),
					onload : function(content){
						if(content.match('##GTI='+playerImage+'##')){
							gca_notifications.success( gca_locale.get("image_was_saved") );
							gca_data.set('player_image',playerImage);
							if(playerImage==''){
								$dark('#player_image').src('img/costumes/background.jpg');
							}else{
								$dark('#player_image').src(playerImage);
							}
						}else{
							gca_notifications.error( gca_locale.get("error") );
							gca_data.set('player_image','');
							$dark('#player_image').src('img/costumes/background.jpg');
						}
						$dark('#image_button').value( save );
					},
					onerror: function(xml){
						_alert('Error (During request)');
						$dark('#image_button').value( save );
					}
				});
			}else{
				_alert('Error (No description)');
			}
		};
			
		$dark('#content').addChild([
			$dark('*hr').style('clear: both;'),
			$dark('*h1').html( 'GCA - '+gca_locale.get("player_image") ),
			$dark('*div').class('costumes_box').addChild([
				$dark('*div').class('player_picture').addChild([
					$dark('*img').id('player_image').src('img/costumes/background.jpg').style('width:168px;height:194px;z-index:0;'),
					$dark('*div').class('avatar_costume_part avatar_border')
				]),
				$dark('*div').id('costumes_button_right').css('width: 167px;').addChild([
					$dark('*input').class('awesome-button disabled').type('button').value( gca_locale.get("player_image") )//,
					//$dark('*div').class('costumes_button_overlay').css('width: 160px;'),
					//$dark('*div').class('costumes_button_ticker').css('width: 160px;').html( gca_locale.get("player_image") )
				])
			]),
			$dark('*div').class('contentItem').addChild([
				$dark('*h3').html( gca_locale.get("change_player_image") ),
				$dark('*div').class('contentItem_content').addChild([
					//$dark('*textarea').id('player_description').type('text').css('display:none;').html('ERROR'),
					$dark('*textarea').id('player_description').css('display:none;').html('ERROR'),
					$dark('*input').id('image_link').type('text').css('width:70%;').value( gca_locale.get('loading')+'...' ),
					$dark('*input').id('image_button').type('button').class('button2').value('').css('margin-left: 10px;margin-right: 10px;position: absolute;').click( saveFunction )
				])
			]),
			$dark('*div').class('contentItem').addChild([
				$dark('*h3').html( gca_locale.get("more_player_images") ),
				$dark('*div').class('contentItem_content').addChild([
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/gigantas.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/forestelf.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/satiros.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/rusalka.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*br'),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/pigasos.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/minotauros.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/medousa.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/magicboy.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*br'),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/leonidas.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/kuklopas.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/kleopatra.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/kesaras.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*br'),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/kentauros.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/gorgona.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/aladin.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/farao.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*br'),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/dragoni.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/copgirl.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/basilias.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*img').attr('src','http://i617.photobucket.com/albums/tt260/goldisever/GCAO/amazona.jpg').class('more_profile_images_from_photobucket').attr('onclick',"document.getElementById(\'image_link\').value=this.getAttribute(\'src\');"),
					$dark('*span').html( gca_locale.get("made_by")+' <b>Miguel Coimbra</b> (<a href="http://www.miguelcoimbra.com/" target="_blank">Homepage</a>)</i>')
				])
			])
		]);
		
		//Take Player Description
		xmlHttpRequest({
			url : getPage.link({"mod":"settings","submod":"charSettings"}),
			method : "GET",
			onload : function(content){
				var doc = $dark('*div').html(content).element;
				var playerImage='';
				var description=$dark('textarea[0]',doc).html();
				if(description.match(/##GTI=([^#]+)##/)){
					playerImage=description.match(/##GTI=([^#]+)##/)[1];
					description=description.replace('[f c=#DED2AD][f s=10]##GTI='+playerImage+'##[/f][/f]','');
				}
				$dark('#image_link').value(playerImage);
				$dark('#image_button').value($dark('input[1]',doc).value());
				$dark('#player_description').html(description);
				if(playerImage!=''){
					$dark('#player_image').src(playerImage);
				}
			}
		});
	}
}