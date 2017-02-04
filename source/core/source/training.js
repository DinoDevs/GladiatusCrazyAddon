/*
 * Addon Training Script
 * Author: DarkThanos, GreatApo
 */

// Training
var gca_training = {
	inject : function(){
		// Load data
		this.data.load();
		
		// Show basics in bars
		(gca_options.bool("training","show_basics_in_bars") &&
			this.showBasicsInBars());

		// Enable multiple train
		(gca_options.bool("training","multiple_train") &&
			this.multipleTrain.show());
	},

	// Data
	data : {

		// Skills
		skills : {
			strength : {id : "char_f0", index: 1, coeff : 2.6},
			skill : {id : "char_f1", index: 2, coeff : 2.5},
			agility : {id : "char_f2", index: 3, coeff : 2.3},
			constitution : {id : "char_f3", index: 4, coeff : 2.3},
			charisma : {id : "char_f4", index: 5, coeff : 2.5},
			intelligence : {id : "char_f5", index: 6, coeff : 2.4}
		},

		// Discount
		discount : 0,

		// Load Data
		load : function(){
			// For each attribute
			for(let id in this.skills){
				// Reference
				let skill = this.skills[id];
				// Save bar
				skill.bar = document.getElementById(skill.id + '_tt');
				// Get tooltip
				let tooltip = JSON.parse(skill.bar.getAttribute('data-tooltip'));

				// Name
				skill.name = tooltip[0][0][0][0].replace(':','');
				// Points
				skill.points = parseInt(tooltip[0][0][0][1], 10);
				// Base Name
				skill.base = parseInt(tooltip[0][1][0][1], 10);
				// Max Value
				skill.max = parseInt(tooltip[0][2][0][1], 10);
				// Points from items
				let fromItems = tooltip[0][3][0][1].match(/(\+|-)\d+/g);
				skill.fromItems = {
					points : parseInt(fromItems[0], 10),
					max : parseInt(fromItems[1], 10)
				};

				// Cost
				skill.cost = parseInt(skill.bar.parentNode.getElementsByClassName("training_costs")[0].textContent.replace(/\./g,""));
			}

			// Calculate discound
			this.discount = Math.round(100 - (this.skills.strength.cost * 100 / Math.pow(this.skills.strength.base - 4, this.skills.strength.coeff)));
		}
	},

	// Show basics in bars
	showBasicsInBars : function(){
		// For each skill
		for(let i in gca_training.data.skills){
			// Reference skill
			let skill = gca_training.data.skills[i];

			// Calculate base percent
			var base = Math.round(skill.base / skill.max * 100);

			// Create overlay bar div
			let div = document.createElement('div');
			div.className = 'gca-bases-bar';
			div.style.width = base + "%";
			div.style.backgroundColor = "#ccc";
			skill.bar.getElementsByTagName('div')[0].appendChild(div);

			// Calculate points percent
			var points = Math.round(skill.points / skill.max * 100);

			// If basics are more than points
			if(base > points){
				// Create negative bar
				let div = document.createElement('div');
				div.className = 'gca-bases-bar';
				div.style.width = (base - points) + "%";
				div.style.marginLeft = points + "%";
				div.style.backgroundColor = "#A70000";
				skill.bar.getElementsByTagName('div')[0].appendChild(div);
			}
		}		
	},

	// Multi 
	multipleTrain : {

		// Show
		show : function(){
			// Save instance
			let that = this;
			
			// Set multiple training style
			document.getElementById("training_box").className = "gca_multiple_training";

			// Setup loading element
			let loading = document.createElement('div');
			loading.className = "loading";
			loading.style.display = "none";
			document.getElementById("training_box").appendChild(loading);

			// For each skill
			for(let i in gca_training.data.skills){
				// Reference skill
				let skill = gca_training.data.skills[i];

				// Save skill
				let data = {};
				data.skill = skill;
				data.loading = loading;
				
				// Wrapper
				let wrapper = document.createElement('div');
				wrapper.className = "gca_multiple";

				// Number wrapper
				let number_wrapper = document.createElement('div');
				number_wrapper.className = "number";
				number_wrapper.textContent = "×";
				wrapper.appendChild(number_wrapper);

				// Number
				let number = document.createElement('span');
				data.number = number;
				number_wrapper.appendChild(number);

				// Arrows
				let arrowUp = document.createElement('div');
				data.arrowUp = arrowUp;
				arrowUp.className = "arrow arrow-up";
				wrapper.appendChild(arrowUp);
				let arrowDown = document.createElement('div');
				data.arrowDown = arrowDown;
				arrowDown.className = "arrow arrow-down";
				wrapper.appendChild(arrowDown);

				// Inject on page
				skill.bar.parentNode.appendChild(wrapper);

				// Get images
				data.imgs = skill.bar.parentNode.getElementsByTagName("img");

				// Remake cost
				data.cost = document.createElement('span');
				data.imgs[0].parentNode.removeChild(data.imgs[0].previousSibling);
				data.imgs[0].parentNode.insertBefore(data.cost, data.imgs[0]);

				// Make train links
				data.trainButton = {};
				data.trainButton.disabed = document.createElement('a');
				data.trainButton.disabed.className = "training_button";
				data.trainButton.disabed.style.backgroundImage = "url(img/ui/training/button_disabled.jpg)";
				data.trainButton.disabed.style.display = "none";
				data.trainButton.active = document.createElement('a');
				data.trainButton.active.className = "training_button";
				data.trainButton.active.style.cursor = "pointer";
				data.trainButton.active.style.display = "none";
				// Hide old train links
				if(data.imgs.length > 1){
					data.imgs[1].style.display = "none";
					data.trainButton.original = data.imgs[1];
				}
				else{
					let tmp = data.imgs[0].parentNode.parentNode.getElementsByTagName('a');
					if(tmp.length){
						tmp[0].style.display = "none";
						data.trainButton.original = tmp[0];
					}
				}
				// Insert train links
				data.imgs[0].parentNode.parentNode.appendChild(data.trainButton.disabed);
				data.imgs[0].parentNode.parentNode.appendChild(data.trainButton.active);
				// Multiple training link
				data.trainButton.active.addEventListener('click', function(){
					that.prepareTraining(data);
				}, false);

				// Save cost for 1
				data.initCost = skill.cost;
				data.currentCost = skill.cost;

				// Save data
				data.count = 1;

				// Events
				data.arrowUp.addEventListener("click", function(){
					that.add( 1, data);
				}, false);
				data.arrowDown.addEventListener("click", function(){
					that.add(-1, data);
				}, false);

				// Update display data
				this.update(data);
			}
		},

		add : function(increment, data){
			// Update counter
			data.count += increment;
			
			// Check if valid
			if(data.count <= 0){
				data.count = 1;
			}
			else if(data.count > 99){
				data.count = 99;
			}

			// Calculate cost
			if(data.count == 1){
				data.currentCost = data.initCost;
			}
			else{
				data.currentCost = gca_training.costs.calculate(data.skill, data.count, gca_training.data.discount);
			}

			// Update display
			this.update(data);
		},

		isTraining : false,
		prepareTraining : function(data){
			// Atomicity
			if(this.isTraining || data.count <= 0) return;
			this.isTraining = true;

			// Show loading
			data.loading.style.display = "block";

			// Start training
			this.doTrain(data, data.count);
		},

		doTrain : function(data, count){
			// Create link
			let link = gca_getPage.link({"mod":"training", "submod":"train", "skillToTrain" : data.skill.index});

			// If last one redirect
			if(count == 1){
				document.location.href = link
				return;
			}

			// Do ajax train call
			let that = this;
			jQuery.ajax({
				type: "GET",
				url: link,
				success: function(){
					count -= 1;
					that.doTrain(data, count);
				},
				error: function(){
					document.location.href = gca_getPage.link({"mod":"training"});
				}
			});
		},

		update : function(data){
			// Update number
			data.number.textContent = data.count;
			// Update cost
			data.cost.textContent = gca_tools.strings.insertDots(data.currentCost) + " ";

			// Get player gold
			var gold = parseInt(document.getElementById("sstat_gold_val").textContent.replace(/\./g,""));

			// Don't train
			if(data.count <= 0){
				data.trainButton.original.style.display = "none";
				data.trainButton.disabed.style.display = "block";
				data.trainButton.active.style.display = "none";
			}
			// If normal link
			else if(data.count == 1){
				data.trainButton.original.style.display = "block";
				data.trainButton.disabed.style.display = "none";
				data.trainButton.active.style.display = "none";
			}
			// If you don't have the gold
			else if(data.currentCost > gold){
				data.trainButton.original.style.display = "none";
				data.trainButton.disabed.style.display = "block";
				data.trainButton.active.style.display = "none";
			}
			// You have the gold
			else{
				data.trainButton.original.style.display = "none";
				data.trainButton.disabed.style.display = "none";
				data.trainButton.active.style.display = "block";
			}
		}
		
	},

	// Costs
	costs : {

		// Calculate
		calculate : function(skill, upgrades, discount){
			// Cost
			let cost = 0;

			// Discount factor
			let factor = (100 - discount) / 100;

			// For each upgrade
			for(var i = upgrades - 1; i >= 0; i--){
				cost += Math.round(Math.pow(skill.base + i - 4, skill.coeff) * factor);
			}
			
			return cost;
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
		gca_training.inject();
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