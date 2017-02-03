/*
 * Addon Utility Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_utility = {
	run : function(){

		/* Check if you are logged in Gladiatus */
		if(!$dark('#icon_rubies')){
			this.logedOUT();
			return;
		}
		this.logedIN();
	},
	/* Logged in */
	logedIN : function(){
		/* Run Time Start */
		gca_runtime.start();

		/* Load Addon Data */
		gca_data_manager.loadData();
		/* Load Settings */
		gca_options.run();
		/* Load Languages */
		gca_locale.load();
		/* Analize section */
		gca_section.firstRun();
		/* Load Day intervals */
		gca_date.run();
		gca_dataUpdater.update();
		/* Load resourses */
		gca_resources.load();
		/* Check if first run or update */
		gca_welcome.check();
		
		/* Load Features */
		gca_utility_sections.run();
		
		/* Run Time Stop */
		gca_runtime.stop();
		
		/* Just to know the number of users */
		if(gca_google)gca_google.run();
	},
	/* Not loged in */
	logedOUT : function(){
		
		/* Run Time Start */
		gca_runtime.start();
	
		/* Load resourses */
		gca_resources.load();
		/* Analize section */
		gca_section.firstRun();
		/* Load Features */
		gca_utility_logout_sections.run();
		
		/* Run Time Stop */
		gca_runtime.stop();
	}
}

var gca_utility_sections = {
	run : function(){
		this.global();
		if(gca_utility_sections[gca_section.mod])
			gca_utility_sections[gca_section.mod]();
	},
	//Global Script
		global : function(){
			$Dbug(function(){gca_section_global.inject();});
		},
	//Front Pages
		//Overview
			overview : function(){
				$Dbug(function(){gca_section_overview.inject();});
			},
		//Training
			training : function(){
				$Dbug(function(){gca_section_training.inject();});
			},
		//Auction
			auction : function(){
				$Dbug(function(){gca_section_auction.inject();});
			},
		//Market
			market : function(){
				$Dbug(function(){gca_section_market.inject();});
			},
		//Merchants
			inventory : function(){
				$Dbug(function(){gca_section_merchants.inject();});
			},
		//Pantheon
			quests : function(){
				$Dbug(function(){gca_section_pantheon.inject();});
			},
		//Gods
			gods : function(){
				$Dbug(function(){gca_section_gods.inject();});
			},
		//Mysterybox
			mysterybox : function(){
				$Dbug(function(){gca_section_mysterybox.inject();});
			},
		//Arena
			arena : function(){
				$Dbug(function(){gca_section_arena.inject();});
			},
		//Map
			map : function(){
				$Dbug(function(){gca_section_map.inject();});
			},
		//Work (in the map file)
			work : function(){
				$Dbug(function(){gca_section_work.inject();});
			},
		//Forge (in the map file)
			forge : function(){
				$Dbug(function(){gca_section_forge.inject();});
			},
		//Enemies
			location : function(){
				$Dbug(function(){gca_section_location.inject();});
			},
			
	//Back Pages
		//Messages
			messages : function(){
				$Dbug(function(){gca_section_messages.inject();});
			},
		//Packages
			packages : function(){
				$Dbug(function(){gca_section_packages.inject();});
			},
		//Reports
			reports : function(){
				$Dbug(function(){gca_section_reports.inject();});
			},
		//Player
			player : function(){
				$Dbug(function(){gca_section_player.inject();});
			},
		//Costumes
			costumes : function(){
				$Dbug(function(){gca_section_costumes.inject();});
			},
		//News
			news : function(){
				$Dbug(function(){gca_section_news_surveys.inject();});
			},
		//Surveys
			surveys : function(){
				$Dbug(function(){gca_section_news_surveys.inject();});
			},
	//Guild
		//Global
			guild : function(){
				$Dbug(function(){gca_section_guild.guild.inject();});
			},
		//Jail
			guild_jail : function(){
				$Dbug(function(){gca_section_guild.jail.inject();});
			},
		 //Library
			guildLibrary : function(){
				$Dbug(function(){gca_section_guild.library.inject();});
			},
		 //Bank
			guildBankingHouse : function(){
				$Dbug(function(){gca_section_guild.bank.inject();});
			},
		//Medic
			guild_medic : function(){
				$Dbug(function(){gca_section_guild.guildMedic.inject();});
			},
		//Guild Storage
			guildStorage : function(){
				$Dbug(function(){gca_section_guild.guildStorage.inject();});
			},
		//Guild Market
			guildMarket : function(){
				$Dbug(function(){gca_section_guild.guildMarket.inject();});
			},
		//Guild War Camp
			guild_warcamp : function(){
				$Dbug(function(){gca_section_guild.guildWarCamp.inject();});
			},
		//Guild Temple
			guildTemple : function(){
				$Dbug(function(){gca_section_guild.guildTemple.inject();});
			},
			
	//Settings
		settings : function(){
			$Dbug(function(){gca_options.interface.inject()});
		}
}

var gca_utility_logout_sections = {
	run : function(){
		if(gca_utility_logout_sections[gca_section.mod])
			gca_utility_logout_sections[gca_section.mod]();
	},
	//Player
		player : function(){
			$Dbug(function(){gca_section_player.logout_inject();});
		},
	//Guild
		guild : function(){
			if(gca_section.submod=="forumGladiatorius"){
				$Dbug(function(){gca_section_guild.guild.changeGuildImage();});
			}
		}
}

/*
	Addon main features Run-Time
	We need
*/
var gca_runtime = {
	start_time : null,
	stop_time : null,
	start : function(){
		this.start_time = new Date().getTime();
	},
	stop : function(){
		this.stop_time = new Date().getTime();
		_alert("Runtime: "+(this.stop_time - this.start_time)+"ms");
		delete gca_runtime;
	}
}