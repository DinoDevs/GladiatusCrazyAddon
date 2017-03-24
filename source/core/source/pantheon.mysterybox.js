/*
 * Addon Pantheon Mysterybox Script
 * Author: DarkThanos, GreatApo
 */

// Overview
var gca_pantheon_mysterybox = {
	inject : function(){
		// Show gods points percent
		(gca_options.bool("pantheon", "open_many_mysteryboxes") && 
			this.openManyMysteryboxes.inject());
	},

	// Open many mysteryboxes
	openManyMysteryboxes : {
		// Flags
		running : false,
		stop : false,

		// Inject
		inject : function(){
			// Check if ponts
			if(document.getElementsByClassName("mysterybox_count").length < 1)
				return;

			// Get boxes
			var boxes = parseInt(document.getElementsByClassName("mysterybox_count")[0].textContent, 10);
			var enabled = (boxes || boxes > 0);

			// Create button
			this.button = document.createElement("input");
			// TODO : translations needed
			this.button.value = "Open all";
			this.button.type = "button";
			this.button.className = "premium_activate_button" + (enabled ? "" : " disabled");
			document.getElementById("mysterybox_buttons").appendChild(this.button);

			// If disabled
			if(!enabled)
				// Exit
				return;

			// Attach onClick handler
			var that = this;
			this.button.addEventListener("click", function(){
				that.handler();
			}, false);
		},

		handler : function(){
			// If running
			if(this.running){
				// Stop
				this.stop = true;
				return;
			}

			// Disable buttons
			document.getElementById("startStop").className += " disabled";
			document.getElementById("startStop").setAttribute("disabled","disabled");
			// TODO : translations needed
			this.button.value = "Stop";

			// Rewards Wrapper
			this.rewards_wrapper = document.getElementsByClassName("mysterybox_reward_pool")[0];
			this.rewards_wrapper.textContent = "";
			this.rewards_wrapper.style.height = "auto";
			this.rewards_clearfix = document.createElement("div");
			this.rewards_clearfix.className = "clearfix";
			this.rewards_wrapper.appendChild(this.rewards_clearfix);
			// Title
			this.title = document.getElementsByClassName("mysterybox_header_content")[0];
			this.title.textContent = "(0)";
			// Count
			this.boxesOpened = 0;

			// Start running
			this.running = true;
			this.run();
		},

		handleStop : function(error){
			// Reset flags
			this.running = false;
			this.stop = false;

			// TODO : translations needed
			this.button.value = "Done!";

			if(error){
				alert(error);
			}
		},

		run : function(){
			// Check if stop event
			if(this.stop){
				this.handleStop();
				return;
			}

			// Save instance
			var that = this;
			// Get count element
			count_wrapper = document.getElementsByClassName("mysterybox_count")[0];

			// Get boxes info
			jQuery.ajax({
				type: "GET",
				url: gca_getPage.link({"mod":"mysterybox"}),
				success: function(content){
					// Check if stop event
					if(this.stop){
						this.handleStop();
						return;
					}

					// Get boxes
					var boxes = content.match(/<div class="mysterybox_count">(\d+)<\/div>/im);
					// If no boxes found stop
					if(boxes == null || boxes[1] == "0") {
						that.handleStop();
						return;
					}
					boxes = parseInt(boxes[1], 10);

					// Show number of boxes
					count_wrapper.textContent = boxes;

					// Get rewards
					var rewards_code = content.match(/<div id="reward_pool_\d+" class="mysterybox_reward mysterybox_reward_item_pool"\s+data-tooltip="[^"]*">[^<]*<img class="mysterybox_reward" alt="\d+" src="[^"]*"\s*\/>[^<]*<div class="mysterybox_reward_border [^"]*"><\/div>([^<]*<div class="mysterybox_reward_item_count mysterybox_reward_item_count_background"><\/div>[^<]*<div class="mysterybox_reward_item_count mysterybox_reward_item_count_value">\d+<\/div>|)[^<]*<input type="hidden"[^>]*>[^<]*<input type="hidden"[^>]*>[^<]*<\/div>/gi);

					// Parse rewards
					var info, reward;
					var rewards = {};
					for (var i = 0; i < rewards_code.length; i++) {
						reward = {};
						// Break code
						info = rewards_code[i].match(/<div id="reward_pool_\d+" class="mysterybox_reward mysterybox_reward_item_pool"\s+data-tooltip="([^"]*)">[^<]*<img class="mysterybox_reward" alt="(\d+)" src="([^"]*)"\s*\/>[^<]*<div class="mysterybox_reward_border ([^"]*)"><\/div>[^<]*(<div class="mysterybox_reward_item_count mysterybox_reward_item_count_background"><\/div>[^<]*<div class="mysterybox_reward_item_count mysterybox_reward_item_count_value">\d+<\/div>[^<]*|)<input type="hidden"[^>]*>[^<]*<input type="hidden"[^>]*>[^<]*<\/div>/i);
						// Get data
						reward.id = info[2];
						reward.tooltip = info[1];
						reward.src = info[3];
						reward.border = info[4];
						if(info[5].length > 0){
							info[5] = info[5].match(/<div class="mysterybox_reward_item_count mysterybox_reward_item_count_value">(\d+)<\/div>/i);
							reward.count = parseInt(info[5][1], 10);
						}
						else{
							reward.count = 1;
						}
						// Save reward
						rewards[reward.id] = reward;
					}

					// Open a box
					jQuery.ajax({
						type: "GET",
						url: gca_getPage.link({
							"mod" : "mysterybox",
							"submod" : "pick",
							"a" : new Date().getTime()
						}).replace("index.php","ajax.php"),
						success: function(content){

							// Get reward
							var won = content.match(/\d+/i);

							// Check results
							if(won == null){
								// TODO : translation needed
								that.handleStop("Failed to decode reward.");
								return;
							}

							// Show number of boxes
							count_wrapper.textContent = boxes--;

							// Show reward
							that.showReward(rewards[won]);

							// Next box
							that.run();
						},
						error: function(){
							// TODO : translation needed
							that.handleStop("Failed to load reward.");
							return;
						}
					});
				},
				error: function(){
					// TODO : translation needed
					that.handleStop("Failed to load data.");
					return;
				}
			});
		},

		showReward : function(reward){
			this.boxesOpened++;
			this.title.textContent = "(" + this.boxesOpened + ")";

			var wrapper = document.createElement("div");
			wrapper.className = "mysterybox_reward mysterybox_reward_item_pool";

			var img = document.createElement("img");
			img.className = "mysterybox_reward";
			img.src = reward.src;
			wrapper.appendChild(img);

			var border = document.createElement("div");
			border.className = "mysterybox_reward_border " + reward.border;
			wrapper.appendChild(border);

			if(reward.count > 1){
				let div;
				div = document.createElement("div");
				div.className = "mysterybox_reward_item_count mysterybox_reward_item_count_background";
				wrapper.appendChild(div);
				div = document.createElement("div");
				div.className = "mysterybox_reward_item_count mysterybox_reward_item_count_value";
				div.textContent = reward.count;
				wrapper.appendChild(div);
			}

			this.rewards_wrapper.insertBefore(wrapper, this.rewards_clearfix);
			gca_tools.setTooltip(wrapper, reward.tooltip.replace(/&quot;/g,'"'));
		}
	}
};

(function(){
	// On page load
	var loaded = false;
	var fireLoadEvent = function(){
		if(loaded) return;
		loaded = true;
		// Call handler
		gca_pantheon_mysterybox.inject();
	}
	if(document.readyState == "complete" || document.readyState == "loaded"){
		fireLoadEvent();
	}else{
		window.addEventListener('DOMContentLoaded', function(){
			fireLoadEvent();
		}, true);
		window.addEventListener('load', function(){
			fireLoadEvent();
		}, true);
	}
})();