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
		this._enable = gca_options.bool('sound', 'cooldown_sound_notifications');
		// Dont run if sounds are disabled
		if (!this._enable) return;

		// Load volume values
		this._volume = gca_data.section.get('sound', 'volume', 1);
		this._muted = gca_data.section.get('sound', 'muted', false);

		// Set up syncing interval
		this._sync_interval = setInterval(() => {
			this.sync();
		}, 10 * 1000);

		// Set up changes listener
		//gca_tools.event.addListener('volume-change', () => {});
	},

	// Sync audio across tabs
	sync : function() {
		// Sync data from local storage
		gca_data.section.sync('sound');

		// Get data
		let volume = gca_data.section.get('sound', 'volume', 1);
		let muted = gca_data.section.get('sound', 'muted', false);

		// If value was changed
		if (
			volume != this._volume ||
			muted != this._muted
		) {
			// Update local values
			this._volume = volume;
			this._muted = muted;

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
		// Get value
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

	soundUsage : {
		'audio-mute-toggle' : 'water',
		'expedition-notification' : 'water',
		'dungeon-notification' : 'water',
		'arena-notification' : 'water',
		'turma-notification' : 'water',
		'auction-status-change-notification' : 'water'
	},

	// Create a new Audio Object
	makeAudioIdObj : function(id) {
		// Make obj based on sound
		if (this.buildInSounds.hasOwnProperty(id)) {
			return {
				id : id,
				url : gca_resources.audio + this.buildInSounds[id],
				volume : 1,
				muted : false
			};
		}
		// Make obj based on
		else if (this.soundUsage.hasOwnProperty(id) && this.buildInSounds.hasOwnProperty(this.soundUsage[id])) {
			return {
				id : id,
				url : gca_resources.audio + this.buildInSounds[this.soundUsage[id]],
				volume : 1,
				muted : false
			};
		}
		// Default sound
		return this.makeAudioIdObj('water');
	},

	// New audio
	new : function(id, synced = false) {
		// Get object
		var soundObj = this.makeAudioIdObj(id);

		// Create new audio
		let audio = new Audio(soundObj.url);
		audio.volume = this._volume * soundObj.volume;
		audio.muted = (this._muted || soundObj.muted);

		return audio;
	},

	// Play a sound
	play : function(id) {
		if (!this._enable) return;
		var audio = this.new(id);
		// In many cases this fires when the user has not yet interacted with the document
		try {audio.play().catch(e => {});}
		catch(e){};
		return audio;
	},
};

// Audio UI
var gca_audio_ui = {
	load : function() {
		// If logged Out
		if (document.getElementById('container_infobox') || document.getElementById('login')) return;
		if (!gca_options.bool('sound', 'cooldown_sound_notifications')) return;
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
		this.elements.toggleIcon = document.createElement('a');
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
			gca_audio.play('audio-mute-toggle');
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

// Audio loader
window.gca_audio_loader = function() {
	if (typeof gca_tools === 'undefined' || typeof gca_data === 'undefined') return;
	gca_audio.load();
	window.gca_audio_loader = false;
};

// Try to load sound
window.gca_audio_loader();

// Onload Handler
(() => {
	let loaded = false;
	let fireLoad = () => {
		if (loaded) return;
		loaded = true;
		gca_audio_ui.load();
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