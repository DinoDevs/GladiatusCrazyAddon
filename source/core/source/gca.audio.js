/*
 * Addon Notifications Script
 * Author: DarkThanos, GreatApo
 */

// Audio
var gca_audio = {
	// General
	_volume : 1,
	_muted : false,

	// Loaded
	loaded : false,
	load : function(){
		if (this.loaded)
			return;
		this.loaded = true;

		// Get volume
		this._volume = gca_data.section.get("sound", "volume", 1);
		// Get muted
		this._muted = gca_data.section.get("sound", "muted", false);
	},


	// Get / Set / Check
	isMuted : function(){
		// Return value
		return this._muted;
	},
	mute : function(value = true){
		// Set value
		if(value){
			this._muted = true;
		}
		else{
			this._muted = false;
		}
	},
	volume : function(value){
		// Return value
		if(value == null){
			return this._volume;
		}
		// Set value
		else if(value){
			this._volume = value;
		}
		else{
			this._volume = value;
		}
	},

	// Sounds list
	buildInSounds : {
		"water" : "alert-sound-water.ogg",
		"coin" : "coins.ogg",
		"channel" : "communication-channel.ogg",
		"voila" : "et-voila.ogg",
		"in-the-way" : "gets-in-the-way.ogg",
		"done" : "job-done.ogg",
		"pizzicato" : "pizzicato.ogg",
		"served" : "served.ogg",
		"wet" : "wet.ogg"
	},

	// Id channels settings
	channels : {},
	setupChannel : function(id, settings) {
		// Init channel
		var channel = {
			vol : 1,
			mute : false,
			sound : "water"
		};
		// Set settings
		if(typeof settings.vol != "undefined"){
			channel.vol = settings.vol;
		}
		if(typeof settings.mute != "undefined"){
			channel.mute = settings.mute;
		}
		if(typeof settings.sound != "undefined" && this.buildInSounds[settings.sound]){
			channel.sound = settings.sound;
		}
		// Save channel
		this.channels[id] = channel;
	},

	// Audio Object List
	audioIdObjs : {},

	// Create a new Audio Object
	makeAudioIdObj : function(id, obj = false){
		// Make obj if not exist
		this.audioIdObjs[id] = {
			id : id,
			url : gca_resources.audio + this.buildInSounds["water"],
			volume : 1,
			muted : false,
			obj : false
		}

		// Insert prefereces
		if(obj){

			// if change url
			if(obj.url){
				// If external url
				if(obj.url.match(/^https:\/\//) != null) {
					this.audioIdObjs[id].url = obj.url;
				}
				// If internal
				else {
					this.audioIdObjs[id].url = gca_resources.audio + obj.url;
				}
			}
			else if(obj.sound && typeof this.buildInSounds[obj.sound] != "undefined"){
				this.audioIdObjs[id].url = gca_resources.audio + this.buildInSounds[obj.sound];
			}

			// Change volume
			if(obj.vol){
				this.audioIdObjs[id].volume = obj.vol;
			}
			// Change muted
			if(obj.mute){
				this.audioIdObjs[id].muted = obj.mute;
			}
		}

		// Return object
		return this.audioIdObjs[id];
	},

	// Load audio by id
	loadById : function(id){
		// Get user data options
		var data = gca_data.section.get("sound", "objects", {});

		// If user data defined
		if(data[id]){
			this.audioIdObjs[id] = this.makeAudioIdObj(id, data[id]);
		}
		// Else if channel id
		else if(this.channels[id]){
			this.audioIdObjs[id] = this.makeAudioIdObj(id, this.channels[id]);
		}
		// Else default options
		else{
			this.audioIdObjs[id] = this.makeAudioIdObj(id);
		}

		// Return object
		return this.audioIdObjs[id];
	},

	// Get audio by id
	getById : function(id){
		// Get objects
		var obj = this.audioIdObjs[id];

		// If object don't exist
		if(typeof obj == "undefined"){
			// Load audio
			obj = this.loadById(id);
		}

		// Return object
		return obj;
	},

	// New audio
	new : function(id, synced = false){
		// Check if load needed
		this.load();

		// Get object
		var soundObj = this.getById(id);

		// Sound
		var audio;
		
		// If synced audio
		if(synced){
			// Single audio object for all

			// If object dont exist
			if(!soundObj.obj){
				// Create object
				soundObj.obj = new Audio(soundObj.url);
			}

			// Save audio object
			audio = soundObj.obj;
		}

		// Unique audio object
		else{
			// Create a new audio onject
			audio = new Audio(soundObj.url);
		}

		// Set volume
		audio.volume = this._volume * soundObj.volume;
		// Set muted
		audio.muted = (this._muted || soundObj.muted);

		// Return audio
		return audio;
	},

	// Play a sound
	play : function(id, synced = false){

		// Get audio
		var audio = this.new(id, synced);

		// Play sound
		audio.play();

		// Return
		return audio;
	}
};

// Setup sound channels
// gca_audio.setupChannel("<id string>", {vol : <0-1>, mute : <boolean>, sound : "<sound id string>"});
gca_audio.setupChannel("expedition_notification", {sound : "water"});
gca_audio.setupChannel("dungeon_notification",    {sound : "water"});
gca_audio.setupChannel("arena_notification",      {sound : "water"});
gca_audio.setupChannel("turma_notification",      {sound : "water"});
gca_audio.setupChannel("auction_notification",    {sound : "coin"});
gca_audio.setupChannel("sound_toggle",            {sound : "water"});
