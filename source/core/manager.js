/*
 * Manager Page
 * Gladiatus Crazy Add On
 */

// Manager
var manager = {
	
	// Load manager
	load : function(){
		// Global
		tools.loadScript("source/global.js");
		
		// Switch mod
		switch(info.page.queries.mod){

			// General Pages

				// Overview
				case "overview":
					this.section.overview();
					break;

				// Costumes
				case "costumes":
					this.section.costumes();
					break;

				// Messages
				case "messages":
					this.section.messages();
					break;

				// Packages
				case "packages":
					this.section.packages();
					break;

				// Player
				case "player":
					this.section.player();
					break;

				// Training
				case "training":
					this.section.training();
					break;

				// Auction
				case "auction":
					this.section.auction();
					break;

				// Quests
				case "quests":
					this.section.quests();
					break;

				// Missions
				case "missions":
					this.section.missions();
					break;

				// Gods
				case "gods":
					this.section.gods();
					break;

				// Mysterybox
				case "mysterybox":
					this.section.mysterybox();
					break;

				// Reports
				case "reports":
					this.section.reports();
					break;

				// Location
				case "location":
					this.section.location();
					break;

			// Settings
				// Location
				case "settings":
					this.section.settings();
					break;

			// Guild

				// Jail
				case "guild_jail":
					this.section.guild_jail();
					break;
				
				// Library
				case "guildLibrary":
					this.section.guild_library();
					break;
				
				// Bank
				case "guildBankingHouse":
					this.section.guild_bank();
					break;

			
			// Events

				// Craps (Dices)
				case "craps":
					this.section.event.craps();
					break;
		}

	},

	// Section Actions
	section : {

		// Overview section
		overview : function() {
			// Player Stats
			if(info.page.queries.submod == 'stats'){
				tools.loadScript("source/overview.stats.js");
			}
			// Player Achivements
			else if(info.page.queries.submod == 'achievements'){
				tools.loadScript("source/overview.achievements.js");
			}
			// Overview
			else if(info.page.queries.submod == "fetchLoginBonus" || info.page.queries.submod == null){
				tools.loadScript("source/overview.js");
			}
		},

		// Costumes
		costumes : function() {
			tools.loadScript("source/overview.costumes.js");
		},

		// Messages section
		messages : function() {
			// Messages List
			if(info.page.queries.submod == 'messageShow' || info.page.queries.submod == 'messageMoveDelete'){
				tools.loadScript("source/messages.js");
			}
			// New Message
			else if(info.page.queries.submod == 'messageNew'){
				tools.loadScript("source/messages.new.js");
			}
		},
		
		// Packages
		packages : function() {
			tools.loadScript("source/packages.js");
		},

		// Other Player
		player : function() {
			// Player Stats
			if(info.page.queries.submod == 'stats'){
				tools.loadScript("source/overview.stats.js");
			}
			// Player Achivements
			else if(info.page.queries.submod == 'achievements'){
				tools.loadScript("source/overview.achievements.js");
			}
			// Other Player Overview
			else if(info.page.queries.submod == null){
				tools.loadScript("source/player.js");
			}
		},
		
		// Training section
		training : function() {
			tools.loadScript("source/training.js");
		},
		
		// Auction
		auction : function() {
			tools.loadScript("source/auction.js");
		},

		// Quests
		quests : function(){
			tools.loadScript("source/pantheon.quests.js");
		},

		// Missions
		missions : function(){
			tools.loadScript("source/pantheon.missions.js");
		},

		// Gods
		gods : function(){
			tools.loadScript("source/pantheon.gods.js");
		},

		// Mysterybox
		mysterybox : function(){
			tools.loadScript("source/pantheon.mysterybox.js");
		},

		// Reports
		reports : function(){
			tools.loadScript("source/reports.js");
		},
		
		// Location section
		location : function() {
			// Server quest
			if(
				info.page.queries.submod == 'serverQuest' || 
				info.page.queries.submod == 'serverQuestHighscore'
			){
				this.event.serverQuest();
			}

			// Expedition
			else{
				tools.loadScript("source/location.js");
			}
		},

		// Settings
		settings : function() {
			if(
				info.page.queries.submod == null || 
				info.page.queries.submod == 'savePassword' || 
				info.page.queries.submod == 'saveEmail' || 
				info.page.queries.submod == 'sendValidationLink' || 
				info.page.queries.submod == 'deleteAccSettings'
			){
				tools.loadScript("source/settings.js");
			}
		},

		// Guild Jail section
		guild_jail : function() {
			tools.loadScript("source/guild.jail.js");
		},

		// Guild Library section
		guild_library : function() {
			tools.loadScript("source/guild.library.js");
		},

		// Guild Bank section
		guild_bank : function() {
			tools.loadScript("source/guild.bank.js");
		},

		// Events
		event : {

			// Craps Events
			craps : function() {
				tools.loadScript("source/event.craps.js");
			},

			// Server Quest Event
			serverQuest : function() {
				tools.loadScript("source/event.serverQuest.js");
			}

		}


	}

}