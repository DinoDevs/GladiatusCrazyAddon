/*
 * Addon Pantheon Mysterybox Script
 * Author: DarkThanos, GreatApo
 */

// Overview
var gca_pantheon_mysterybox = {
	inject : function(){
		// Show open all boxes
		(gca_options.bool("pantheon", "open_many_mysteryboxes") && 
			this.openManyMysteryboxes.inject());
		// Show rewards value in rubies
		(gca_options.bool("pantheon", "show_mysterybox_rewards_rubies") && 
			this.rewardsValue.show());
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
			this.button.value = gca_locale.get("pantheon", "mysterybox_open_all");
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
			this.button.value = gca_locale.get("pantheon", "mysterybox_open_stop");;

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

			// Set button text
			this.button.value = gca_locale.get("pantheon", "mysterybox_open_done");

			if(error){
				this.title = error;
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
								that.handleStop(gca_locale.get("general", "error") + " (decode_error)");
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
							that.handleStop(gca_locale.get("general", "error") + " (load_error)");
							return;
						}
					});
				},
				error: function(){
					that.handleStop(gca_locale.get("general", "error") + " (data_error)");
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
	},

	// Show items value in rubies
	rewardsValue : {
		// Rewards value
		valueTable : {
			token : {

				// Mobilisation
				// game/assets/img/premium/token/5.jpg
				"5" : {rubies : 3},

				// Gate Key
				// game/assets/img/premium/token/6.jpg
				"6" : {rubies : 3},

				// Holy Hourglass
				// game/assets/img/premium/token/7.jpg
				"7" : {rubies : 1},

				// Work Clothing
				// game/assets/img/premium/token/8.jpg
				"8" : {rubies : 1},

				// Blessing Symbol
				// game/assets/img/premium/token/9.jpg
				"9" : {rubies : 15},

				// Seal Coins
				// game/assets/img/premium/token/10.jpg
				"10" : {rubies : 15},

				// Commendation
				// game/assets/img/premium/token/11.jpg
				"11" : {rubies : 15},

				// Secret Formula
				// game/assets/img/premium/token/12.jpg
				"12" : {rubies : 15},

				// Arena Parchment
				// game/assets/img/premium/token/13.jpg
				"13" : {rubies : 50},

				// Symbol of Duality
				// game/assets/img/premium/token/14.jpg
				"14" : {rubies : 20},

				// Magical Bag
				// game/assets/img/premium/token/15.jpg
				"15" : {rubies : -1},

				// Chest of Divine Fate
				// game/assets/img/premium/token/16.jpg
				"16" : {rubies : 7},

				// Fortuna's Die of Destiny
				// game/assets/img/premium/token/17.jpg
				"17" : {rubies : 2},

				// 100% Healing Potion
				// game/assets/img/premium/token/18.jpg
				"18" : {rubies : 1},
			},

			box : {
				// Leandronimus Cervisia of Favour
				// game/assets/img/premium/box/hamper.jpg
				"hamper" : {rubies : 1.07},
			},

			// game/assets/img/costumes/sets/male/7_complete_small.jpg
			costumes : {rubies : 50}
		},

		show : function() {
			// Check if valid page
			if (!document.getElementById('content'))
				return;

			// Get rewards
			var div;
			var rubies;
			var icon;
			var rewards = document.getElementById('content').getElementsByClassName('mysterybox_reward_item_pool');
			for (var i = rewards.length - 1; i >= 0; i--) {
				rubies = this.resolveReward(rewards[i]);
				icon = document.createElement('div');
				icon.className = 'icon_rubies';
				icon.setAttribute('style', 'transform: scale(0.8);');
				div = document.createElement('div');
				div.setAttribute('style', 'position: absolute;top: 5px;left: 4px;font-size: 11px;color: #c7b68a;font-weight: bold;text-shadow: 0px 0px 3px black;');
				div.appendChild(icon);
				div.appendChild(document.createTextNode(((rubies > 0)? rubies : '?')));
				rewards[i].appendChild(div);
			}
		},

		resolveReward : function(reward){
			// Get image
			var image = reward.getElementsByTagName('img')[0].src;
			// Get amount
			var amount = reward.getElementsByClassName('mysterybox_reward_item_count_value');
			if (amount.length > 0) amount = parseInt(amount[0].textContent, 10);
			else amount = 1;

			// Resolve image
			var r;

			// If token
			r = image.match(/img\/premium\/token\/(\d+)\.jpg/i);
			if (r && this.valueTable.token[r[1]]) {
				return (this.valueTable.token[r[1]].rubies * amount);
			}

			// If box
			r = image.match(/img\/premium\/box\/([^.]+)\.jpg/i);
			if (r && this.valueTable.box[r[1]]) {
				return (this.valueTable.box[r[1]].rubies * amount);
			}

			// If costume
			r = image.match(/img\/costumes\/sets\/(?:male|female)\/([^.]+])\.jpg/i);
			if (r) {
				return -1;
			}

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