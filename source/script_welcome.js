/*
 * Addon Info Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_welcome = {
	check : function(){
		if(gca_data.get("firstRun",true)){
			gca_locale.findLang();
			this.firstRun.run();
			return;
		}

		var currentVersion = parseInt(subFuncts.strings.removeDots(gca.version));
		var savedVesion = parseInt(subFuncts.strings.removeDots(gca_data.get("version","0")));
		if(currentVersion>savedVesion)
			this.newVersion.run();
	},
	firstRun : {
		run : function(){
			this.setVariables();
			this.display.start();
		},
		setVariables : function(){
			gca_data.set("firstRun",false);
			gca_data.set("version",gca.version);
			gca_data.set("lang",gca_locale.findLang());
		},
		display : {
			start : function(){
				this.dialog = new gca_built.dialog();
				this.dialog.title.html(gca.name);

				this.dialog.body.addChild([
					$dark('*div').html(gca_locale.get("description")+'<br/>Thank you for installing Gladiatus Crazy Addon!')
				]);

				this.dialog.body.addChild([
					$dark('*div').class("space")
				]);

				var dialog = this.dialog;
				this.dialog.body.addChild([
					$dark('*input').class("button3").type("button").value("Close").click( function(){dialog.close();} )
				]);
				this.dialog.open();
			}
		}
	},
	newVersion : {
		run : function(){
			this.setVariables();
			this.display.start();
		},
		setVariables : function(){
			gca_data.set("version",gca.version);
			gca_data.set("lang",gca_locale.findLang());
		},
		display : {
			start : function(){
				this.dialog = new gca_built.dialog();
				this.dialog.title.html(gca.name+" v"+gca.version);

				this.dialog.body.addChild([
					$dark('*div').html('\
						<div style="text-align:center;">\
							'+gca.name+' version <b>'+gca.version+'</b> has been installed!\
							<br/>\
							Changelog <a href="http://gladiatuscrazyaddon.tk/index.php?mode=changelog" target="_blank" style="color: black;">here</a>\
						</div>\
					')
				]);

				this.dialog.body.addChild([
					$dark('*div').class("space")
				]);

				var dialog = this.dialog;
				this.dialog.body.addChild([
					$dark('*input').class("button3").type("button").value("Close").click( function(){dialog.close();} )
				]);
				this.dialog.open();
				
				//Load changelog
				/*
				xmlHttpRequest({
					url : "http://gladiatuscrazyaddon.tk/index.php?mode=changelog",
					method : "get",
					onload : function(x){
						var re = new RegExp('version'+subFuncts.strings.removeDots(gca.version)+'([^_]+)_close',"i");
						if(x.match(re)){
							var changelog = x.match(re)[1].match(/<i>[\s\S]*<\/i>/)[0];
						}else{
							var changelog = 'See version\'s '+gca.version+' changelog <a href="http://gladiatuscrazyaddon.tk/index.php?mode=changelog" target="_blank">here</a>.';
						}
						document.getElementById('changelog_info').innerHTML = changelog;
					}
				});
				*/
			}
		}
	}
}