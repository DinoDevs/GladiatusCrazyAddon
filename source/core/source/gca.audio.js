/*
 * Addon Audio System
 * Author: DarkThanos, GreatApo
 */

// Main Audio System
var gca_audio = {
	_enable : false,
	_volume : 1,
	_muted : false,

	// Loaded
	loaded : false,
	load : function() {
		this._volume = gca_data.section.get('sound', 'volume', 1);
		this._muted = gca_data.section.get('sound', 'muted', false);

		this._enable = gca_options.bool('sound', 'enabled');
		if (!this._enable) return;

		// Set up syncing interval
		this._sync_interval = setInterval(() => {
			this.sync();
		}, 1000);
		// Set up changes listener
		gca_tools.event.addListener('volume-change', () => {
			this.updateAudioObjs();
		});
	},

	// Sync audio across tabs
	sync : function() {
		var changed = false;
		// Sync data
		gca_data.section.sync('sound');

		// Get data
		var volume = gca_data.section.get('sound', 'volume', 1);
		if (volume != this._volume) changed = true;
		var muted = gca_data.section.get('sound', 'muted', false);
		if (muted != this._muted) changed = true;

		if (changed) {
			// Update data
			this._volume = volume;
			this._muted = muted;
			this.updateAudioObjs();
			// Fire event
			gca_tools.event.fire('volume-change');
		}
	},

	// Get / Set / Check
	isMuted : function() {
		// Return value
		return this._muted;
	},
	mute : function(value = true) {
		this._muted = (value) ? true : false;
		gca_data.section.set('sound', 'muted', this._muted);
		gca_tools.event.fire('volume-change');
	},
	volume : function(value = null){
		if (value == null) {
			return this._volume;
		}
		
		// Set value
		if (!isNaN(value) && value > 0 && value <= 1) {
			this._volume = value;
			gca_data.section.set('sound', 'volume', value);
			gca_tools.event.fire('volume-change');
		}
	},

	// Sounds list
	buildInSounds : {
		'water'			: 'alert-sound-water.ogg',
		'coin'			: 'coins.ogg',
		'channel'		: 'communication-channel.ogg',
		'voila'			: 'et-voila.ogg',
		'in-the-way'	: 'gets-in-the-way.ogg',
		'done'			: 'job-done.ogg',
		'pizzicato'		: 'pizzicato.ogg',
		'served'		: 'served.ogg',
		'wet'			: 'wet.ogg'
	},

	// Id channels settings
	channels : {},
	setupChannel : function(id, settings) {
		// Init channel
		var channel = {vol : 1, mute : false, sound : 'water'};
		if (this.channels.hasOwnProperty(id)) channel = this.channels[id];

		// Set settings
		if (typeof settings.vol !== 'undefined') {
			channel.vol = settings.vol;
		}
		if (typeof settings.mute !== 'undefined') {
			channel.mute = settings.mute;
		}
		if (typeof settings.sound !== 'undefined' && this.buildInSounds.hasOwnProperty(settings.sound)) {
			channel.sound = settings.sound;
		}
		// Save channel
		this.channels[id] = channel;
	},

	// Audio Object List
	audioIdObjs : {},

	// Create a new Audio Object
	makeAudioIdObj : function(id, obj = false) {
		// Make obj if not exist
		this.audioIdObjs[id] = {
			id : id,
			url : gca_resources.audio + this.buildInSounds['water'],
			volume : 1,
			muted : false,
			obj : false
		};

		// Custom preferences
		if (obj) {
			// External or Internal url
			if (obj.url) {
				if (obj.url.match(/^https:\/\//) != null) {
					this.audioIdObjs[id].url = obj.url;
				}
				else {
					this.audioIdObjs[id].url = gca_resources.audio + obj.url;
				}
			}
			// Default sounds
			else if(obj.sound && this.buildInSounds.hasOwnProperty(obj.sound)){
				this.audioIdObjs[id].url = gca_resources.audio + this.buildInSounds[obj.sound];
			}

			// Set volume
			if (obj.vol) {
				this.audioIdObjs[id].volume = obj.vol;
			}
			// Set mute
			if (obj.mute) {
				this.audioIdObjs[id].muted = obj.mute;
			}
		}

		// Return object
		return this.audioIdObjs[id];
	},

	// Update audio prefs
	updateAudioObjs : function() {
		for (let id in this.audioIdObjs) {
			if (this.audioIdObjs.hasOwnProperty(id)) {
				if (this.audioIdObjs[id].obj) {
					let sound = this.audioIdObjs[id];
					sound.obj.volume = (this._volume * sound.obj.volume);
					sound.obj.muted = (this._muted || sound.obj.muted);
				}
			}
		}
	},

	// Load audio by id
	loadById : function(id) {
		// Get user data options
		var data = gca_data.section.get('sound', 'objects', {});

		// If user data defined
		if (data[id]) {
			this.audioIdObjs[id] = this.makeAudioIdObj(id, data[id]);
		}
		// Else if channel id
		else if (this.channels[id]) {
			this.audioIdObjs[id] = this.makeAudioIdObj(id, this.channels[id]);
		}
		// Else default options
		else {
			this.audioIdObjs[id] = this.makeAudioIdObj(id);
		}

		// Return object
		return this.audioIdObjs[id];
	},

	// Get audio by id
	getById : function(id) {
		// Get object
		if(this.audioIdObjs.hasOwnProperty(id)) {
			return this.audioIdObjs[id];
		}
		// If object don't exist
		else {
			return this.loadById(id);
		}
	},

	// New audio
	new : function(id, synced = false) {
		// Get object
		var soundObj = this.getById(id);

		// Sound
		var audio;

		// If synced audio (singleton) and audio exist
		if (synced && soundObj.obj) {
			audio = soundObj.obj;
		}
		// Create new audio
		else {
			audio = new Audio(soundObj.url);
			if (synced) soundObj.obj = audio;
			audio.volume = this._volume * soundObj.volume;
			audio.muted = (this._muted || soundObj.muted);
		}

		return audio;
	},

	// Play a sound
	play : function(id, synced = false) {
		if (!this._enable) return;
		var audio = this.new(id, synced);
		audio.play();
		return audio;
	},
};


// Audio channels
var gca_audio_channels = {
	// List of channels
	list : {
		'expedition_notification'	: {sound : 'water'},
		'dungeon_notification' 		: {sound : 'water'},
		'arena_notification'		: {sound : 'water'},
		'turma_notification'		: {sound : 'water'},
		'auction_notification'		: {sound : 'coin'},
		'sound_toggle'				: {sound : 'water'}
	},

	preload : function() {
		this.setup();
	},

	load : function() {
		// Settings load
		for (let channel in this.list) {
			if (this.list.hasOwnProperty(channel)) {
				this.list[channel] = gca_data.section.get('sound_objects', 'channels', this.list[channel]);
			}
		}

		this.setup();
	},

	setup : function() {
		// Setup sound channels
		for (let channel in this.list) {
			if (this.list.hasOwnProperty(channel)) {
				gca_audio.setupChannel(channel, this.list[channel]);
			}
		}
		// gca_audio.setupChannel("<id string>", {vol : <0-1>, mute : <boolean>, sound : "<sound id string>"});
	}
};


// Audio UI
var gca_audio_ui = {
	load : function() {
		// If logged Out
		if (document.getElementById('container_infobox') || document.getElementById('login')) return;
		if (!gca_options.bool('sound', 'enabled')) return;
		this.soundbar();
	},

	// Elements
	elements : {},

	// Create bar
	soundbar : function(){
		// Set up sound bar
		this.elements.bar = document.createElement('div');
		this.elements.bar.className = 'gca_sound_bar';

		// Toggle sound icon
		this.elements.toggleIcon = document.createElement('div');
		this.elements.toggleIcon.className = 'sound-toggle';
		this.elements.bar.appendChild(this.elements.toggleIcon);

		// Add on page
		document.body.appendChild(this.elements.bar);
		this.update();

		// On volume toggle
		this.elements.toggleIcon.addEventListener('click', () => {
			this.toggle();
		}, false);

		// On volume change
		gca_tools.event.addListener('volume-change', () => {
			this.update();
		});
	},

	// Turn on or off audio
	toggle : function(){
		if (gca_audio.isMuted()) {
			gca_audio.mute(false);
			gca_audio.play('sound_toggle');
		}
		else {
			gca_audio.mute(true);
		}
	},

	// Update audio visuals
	update : function() {
		if (gca_audio.isMuted()) {
			this.elements.toggleIcon.className = 'sound-toggle mute';
		}
		else {
			this.elements.toggleIcon.className = 'sound-toggle';
		}
	}
};

window.gca_audio_loader = function() {
	if (typeof gca_tools === 'undefined' || typeof gca_data === 'undefined') return;
	gca_audio_channels.load();
	gca_audio.load();
	gca_audio_ui.load();
	window.gca_audio_loader = false;
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		if (window.gca_audio_loader)
			window.gca_audio_loader();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_audio, gca_data, gca_options, gca_resources, gca_tools */
