/*
 * Addon Notifications Script
 * Author: DarkThanos, GreatApo
 */

// Audio
var gca_audio = {
	// General
	volume : 1,
	muted : false,

	// Default audio
	defaults : {
		"auction_notification" : {vol : 1, mute : false}
	},

	// Audio Objects
	audioIdObjs : {},
	makeAudioIdObj : function(id, obj = false){
		// Make obj
		this.audioIdObjs[id] = {
			id : id,
			url : gca_resources.audio + "alert-sound-water.ogg",
			volume : 1,
			muted : false,
			obj : false
		}

		// Insert prefereces
		if(obj){
			// Change url
			if(obj.url)
				if(obj.extUrl)
					this.audioIdObjs[id].url = obj.url;
				else
					this.audioIdObjs[id].url = gca_resources.audio + obj.url;
			// Change volume
			if(obj.vol)
				this.audioIdObjs[id].volume = obj.vol;
			// Change muted
			if(obj.mute)
				this.audioIdObjs[id].muted = obj.mute;
		}

		return this.audioIdObjs[id];
	},

	// Get audio by id
	getById : function(id){
		// Get objects
		var obj = this.audioIdObjs[id];
		// If no current object exist
		if(typeof obj == "undefined"){
			// Get user data options
			var data = gca_data.get('sounds', {});
			// If user data defined
			if(data[id]){
				obj = this.makeAudioIdObj(id, data[id]);
			}
			else if(this.defaults[id]){
				obj = this.makeAudioIdObj(id, this.defaults[id]);
			}
			else{
				obj = this.makeAudioIdObj(id);
			}
		}
		// Return object
		return obj;
	},

	// New audio
	new : function(id, singleObj = false){
		// Get object
		var soundObj = this.getById(id);

		// Sound
		var audio;
		
		if(singleObj){
			// Single audio object sound
			if(!soundObj.obj)
				soundObj.obj = new Audio(soundObj.url);
			audio = soundObj.obj;
		}
		else{
			audio = new Audio(soundObj.url);
		}
		audio.volume = this.volume * soundObj.volume;
		audio.muted = (this.muted || soundObj.muted);

		return audio;
	},

	// Play a sound
	play : function(id, singleObj = false){
		// Get audio
		var audio = this.new(id, singleObj);
		// Play sound
		audio.play();

		return audio;
	}
};
