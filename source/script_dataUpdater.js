/*
 * Addon DataUpdater Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_dataUpdater = {
	update : function(){
		if(gca_date.everyDay){
			this.dayCheck();
		}
		if(gca_date.everyHour){
			this.hourCheck();
		}
		if(gca_date.every12Hour){
			this.twelveHoursCheck();
		}
		if(gca_date.every6Hour){
			this.sixHoursCheck();
		}
	},
	dayCheck : function(){
		//this.newVersion();
		//this.gca_highscore_update();
		//this.gca_info_collector_post();
		return;
	},
	hourCheck : function(){
		this.guild.getGuildMatesIds();
		return;
	},
	twelveHoursCheck : function(){
		//this.premium.getPremiumCode();
	},
	sixHoursCheck : function(){
		return;
	},
	//Update Functions
	//Guild Updates
	guild : {
		//Up date guild mates ids
		getGuildMatesIds : function(){
			xmlHttpRequest({
				url : getPage.link({"mod":"guild","submod":"memberList"}),
				method : "get",
				onload : function(x){
					if( x.match(/xn=y/i) ){
						gca_dataUpdater.guild.setNoGuild();
					}else if( x.match(/index\.php\?mod=player(&|&amp;)p=\d+/i) ){
						gca_dataUpdater.guild.setTheGuild(x);
					}else{
						gca_dataUpdater.guild.getGuildMatesIds();
					}
				},
				onerror : function(){
					gca_dataUpdater.guild.getGuildMatesIds();
				}
			});
		},
		setNoGuild : function(){
			var guild = {
				inGuild : false,
				mates_id : new Array(),
				mates_name : new Array()
			}
			gca_data.set('guild', guild );
		},
		setTheGuild : function(x){
			var guildMates_ids = x.match(/index\.php\?mod=player(&|&amp;)p=\d+/g);
			var guildMates_names = x.match(/index\.php\?mod=player(&|&amp;)p=\d+[^>]+>[^<]+</g);
			for(var i=0;i<guildMates_ids.length;i++){
				guildMates_ids[i]=guildMates_ids[i].match(/p=(\d+)/i)[1];
				guildMates_names[i]=guildMates_names[i].match(/p=\d+[^>]+>([^<]+)</i)[1];
			}
			var guild = {
				inGuild : true,
				mates_id : guildMates_ids,
				mates_name : guildMates_names
			}
			gca_data.set('guild', guild );
		}
	},
	//Premium Update
	premium : {
		//Get the premium code
		getPremiumCode : function(){
			if(gca_options.load('PREMIUM_KEY') && gca_data.get('playerMail',null) && gca_data.get('playerId',null)){
				var key = gca_options.load('PREMIUM_KEY');
				var mail = gca_data.get('playerMail',null).toLowerCase();
				var id = gca_data.get('playerId',null);
				//_alert(key+" : "+mail);
				
				//Server Request
				xmlHttpRequest({
					url : "http://gladiatuscrazyaddon.tk/premium/get.php?key="+key+"&mail="+mail+"&player="+id,
					method : "get",
					onload : function(x){
						//_alert(x);
						eval(x);
						
						// Update the shown premium keys
						var prem_days=Math.ceil((gca_data.get('premium_days',0)-(new Date().getTime()/1000))/60/60/24);
						if(prem_days>0)
							var text='GCA Premium: '+prem_days+' '+gca_locale.get("days");
						else
							var text='<a href="http://q.gs/1940284/free-gca-key" target="_blank" style="color:yellow;font-weight:bold;" title="Get 1 day FREE Key">GET GCA PREMIUM FREE!</a>';
						document.getElementById('show_premium_days').getElementsByTagName('h4')[0].innerHTML = text;
						
					},
					onerror : function(){
						//_alert('Error');
					}
				});
			}
		}
	},
	//New version?
	newVersion : function(){
		//Server Request
		xmlHttpRequest({
			url : "http://gladiatuscrazyaddon.tk/info/version.php",
			method : "get",
			onload : function(x){
				//On something wrong, go back
				if(isNaN(parseInt(x))) return;
				
				//Check if version is uptodate
				if( parseInt(x) > parseInt( subFuncts.strings.removeDots(gca.version) ) ){
					var new_version = x.replace(/(\d)(\d)(\d)/gi, '$1.$2.$3');
					
					//Create interface
					this.dialog = new gca_built.dialog();
					this.dialog.title.html("A new "+gca.name+" version found");

					this.dialog.body.addChild([
						$dark('*div').html('\
							<div style="text-align: center;">\
								<img src="http://gladiatuscrazyaddon.tk/signatures/generate_signature.php?version='+new_version+'" style="border: 1px solid black;margin:0 auto;"/><br/>\
								<br/>\
								'+gca.name+' version <b>'+new_version+'</b> is out!<br/>\
								Download the new version for the latest features.<br/>\
								<br/>\
								<a href="http://gladiatuscrazyaddon.tk/index.php?mode=download" target="_blank" style="text-decoration:none;"><input type="button" class="button2" value="Downloads" style="margin-right:10px;"></a>\
								<a href="http://gladiatuscrazyaddon.tk/index.php?mode=changelog" target="_blank" style="text-decoration:none;"><input type="button" class="button2" value="Changelog"></a>\
							</div>\
							<br/>\
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
				}
			}
		});
	},
	//GCA Highscore, player update
	gca_highscore_update : function(){
		var name = gca_data.get('playerName', null);
		var country = gca_locale.findLang();
		if(country=='net'){country='tr';}
		else if(country=='co.il'){country='il';}
		var server = gca_section.server;
		
		if(!name || !country || !server) return;
		
		//Server Request
		xmlHttpRequest({
			url : "http://gladiatuscrazyaddon.tk/highscore/add_player.php?name="+name+"&country="+country+"&server="+server,
			method : "get",
			onload : function(x){
				if(x.match(name))
					gca_notifications.success("Your player's stats were updated in GCA Highscore.");
				else
					gca_notifications.success("Your player's stats were not updated in GCA Highscore due to an error.");
			},
			onerror : function(){
				gca_notifications.success("Your player's stats were not updated in GCA Highscore due to an error.");
			}
		});
	},
	// Info collector post
	gca_info_collector_post : function(){
		var data = gca_data.get('collectorData', "");
		//_alert(data.replace(",",""));
		if( data=="" )
			return;
		xmlHttpRequest({
			url: "http://www.gladiatuscrazyaddon.tk/infocollector/collector.php",
			method: "POST",
			data : 'data='+encodeURIComponent("{\"data\":["+data.replace(",","")+"]}"),
			onload: function(content){
				gca_data.set('collectorData', "");
				//_alert(content);
				gca_notifications.success( gca_locale.get("dropped_items_reported") );
			}
		});
	}
}