/*
 * Addon Built Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_built = {
	dialog : function(){
		this.make = function(){
			var thisIsMe = this;
			this.dialog = $dark('*div').hide().addChild([
				$dark('*div').class("modal").click(function(){thisIsMe.close();}),
				$dark('*div').class("gca_dialog").addChild([
					$dark('*div').class("out").addChild([
						this.title = $dark('*div').class("title"),
						this.body = $dark('*div').class("body"),
						$dark('*div').class("footer")
					])
				])
			]).appendTo('body');
		};
		this.open = function(){
			if(this.dialog)
				this.dialog.show();
		};
		this.close = function(){
			if(this.dialog)
				this.dialog.hide();
		};
		this.make();
	}
}