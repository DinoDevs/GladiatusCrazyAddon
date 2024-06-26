/*
 * Addon Training Script
 * Author: DarkThanos, GreatApo
 */

// Training
var gca_training = {
	inject : function(){
		// Load data
		this.data.load();

		// Show discount
		((gca_options.bool("training","show_discount") || gca_options.bool("training","calculator_train")) &&
			this.showDiscount.show(this));
		
		// Show basics in bars
		(gca_options.bool("training","show_basics_in_bars") &&
			this.showBasicsInBars());

		// Enable multiple training
		((gca_options.bool("training","multiple_train") || gca_options.bool("training","calculator_train")) &&
			this.multipleTrain.show(this));
		
		// Add CTRL Hint
		(gca_options.bool("training","multiple_train") &&
			this.addCtrlHint.show());

		// Enable training calculator
		(gca_options.bool("training","calculator_train") &&
			this.calculatorTrain.show(this));

		// Show analyzed points on tooltips
		(gca_options.bool("training","show_analyze_items_data") &&
			this.analyzeStats.showInTooltips(this));

		// Show points after upgrade
		(gca_options.bool("training","show_points_after_upgrade") &&
			this.analyzeStats.showDataAfterUpgrade(this));

		// Setting Link
		gca_tools.create.settingsLink("training");
	},

	// Data
	data : {
		// Skills
		skills : {
			strength : {id : "char_f0", index: 1, coeff : 2.6},
			dexterity : {id : "char_f1", index: 2, coeff : 2.5},
			agility : {id : "char_f2", index: 3, coeff : 2.3},
			constitution : {id : "char_f3", index: 4, coeff : 2.3},
			charisma : {id : "char_f4", index: 5, coeff : 2.5},
			intelligence : {id : "char_f5", index: 6, coeff : 2.4}
		},
		
		// Base max
		base_max : 0,

		// Discount
		discount : 0,

		// Load Data
		load : function(){
			// Calculate base maximum
			this.base_max = Math.max( 5 * parseInt( document.getElementById("header_values_level").textContent, 10 ), 200);
			
			// For each attribute
			for(let id in this.skills){
				// Reference
				let skill = this.skills[id];
				// Save bar
				skill.bar = document.getElementById(skill.id + '_tt');
				// Get tooltip
				let tooltip = JSON.parse(skill.bar.dataset.tooltip);

				// Name
				skill.name = tooltip[0][0][0][0].replace(':','');
				// Points
				skill.points = parseInt(tooltip[0][0][0][1], 10);
				// Base Name
				skill.base = parseInt(tooltip[0][1][0][1], 10);
				// Max Value
				skill.max = parseInt(tooltip[0][2][0][1], 10);
				// Enhanced Points
				skill.enhanced = 0;
				if (typeof tooltip[0][4][1] == "object" && tooltip[0][4][1][1] == "#00B712") {
					skill.enhanced = parseInt(tooltip[0][4][0][1], 10);
				}

				// Points from items
				let fromItems = tooltip[0][3][0][1].match(/(\+|-)*\d+/g);
				skill.fromItems = {
					points : parseInt(fromItems[0], 10),
					max : parseInt(fromItems[1], 10)
				};

				// Cost
				skill.cost = parseInt(skill.bar.parentNode.getElementsByClassName("training_costs")[0].textContent.replace(/\./g,""), 10);
			}

			// Calculate discount
			this.discount = Math.round(100 - (this.skills.strength.cost * 100 / Math.pow(this.skills.strength.base - 4, this.skills.strength.coeff)));
			// Save default discount
			this.initial_discount = this.discount;
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
		show : function(self){
			// Save instance
			this.self = self;
			
			// Set multiple training style
			document.getElementById("training_box").className = "gca_multiple_training";

			// Setup loading element
			let loading = document.createElement('div');
			loading.className = "loading";
			loading.style.display = "none";
			document.getElementById("training_box").appendChild(loading);

			// Save skill data
			this.skills = {};

			// Save available free points (from underworld)
			let freepoints = parseInt( document.getElementsByClassName("training_link")[6].textContent.match(/\:*\s*(\d+)/)[1] );

			// For each skill
			for(let i in this.self.data.skills){
				// Reference skill
				let skill = this.self.data.skills[i];

				// Save skill
				let data = {};
				this.skills[i] = data;
				data.name = i;
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
				arrowUp.className = "gca-arrow gca-arrow-up";
				wrapper.appendChild(arrowUp);
				let arrowDown = document.createElement('div');
				data.arrowDown = arrowDown;
				arrowDown.className = "gca-arrow gca-arrow-down";
				wrapper.appendChild(arrowDown);

				// Inject on page
				skill.bar.parentNode.appendChild(wrapper);

				// Get images
				data.imgs = skill.bar.parentNode.getElementsByTagName("img");

				// Remake cost
				data.cost = document.createElement('span');
				data.imgs[0].parentNode.removeChild(data.imgs[0].previousSibling);
				data.imgs[0].parentNode.insertBefore(data.cost, data.imgs[0]);


				// Save available free points (from underworld)
				data.freepoints = freepoints;
				
				let buttonsParentNode = data.imgs[0].parentNode.parentNode;
				if(freepoints > 0) // on more element exists (<s>)
					buttonsParentNode = buttonsParentNode.parentNode;
				
				// Make train links
				data.trainButton = {};
				data.trainButton.disabed = document.createElement('a');
				data.trainButton.disabed.className = "training_button";
				data.trainButton.disabed.style.backgroundImage = "url(" + gca_tools.img.cdn('img/ui/training/button_disabled.jpg') + ")";
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
					let tmp = buttonsParentNode.getElementsByTagName('a');
				
					if(tmp.length){
						tmp[0].style.display = "none";
						data.trainButton.original = tmp[0];
					}
				}
				// Insert train links
				buttonsParentNode.appendChild(data.trainButton.disabed);
				buttonsParentNode.appendChild(data.trainButton.active);
				// Multiple training link
				data.trainButton.active.addEventListener('click', () => {
					this.prepareTraining(data);
				}, false);

				// Save cost for 1
				data.initCost = skill.cost;
				data.currentCost = skill.cost;
				

				// Save data
				data.count = 1;

				// Events
				this.addIncrementEvent(data.arrowUp, (e) => {
					this.add(e.ctrlKey ?  10 :  1, data);
				}, 200);
				this.addIncrementEvent(data.arrowDown, (e) => {
					this.add(e.ctrlKey ? -10 : -1, data);
				}, 200);

				// Update display data
				this.update(data);
			}
		},

		addIncrementEvent : function(element, callback, wait){
			var start = null;
			var fireIntervals = null;

			element.addEventListener("mousedown", function(e){
				start = new Date().getTime();
				fireIntervals = setInterval(function(){
					callback(e);
				}, wait);
			}, false);
			element.addEventListener("mouseup", function(e){
				clearInterval(fireIntervals);
				if(new Date().getTime() - start < wait){
					callback(e);
				}
			}, false);
			element.addEventListener("mouseout", function(e){
				clearInterval(fireIntervals);
			}, false);
		},

		add : function(increment, data){
			// Update counter
			data.count += increment;
			
			// Check if valid
			if(data.count < 0){
				data.count = 0;
			}
			// Limit train to maximum base
			else if(data.count > Math.max(this.self.data.base_max - data.skill.base + 5, 99)){
				data.count = Math.max(this.self.data.base_max - data.skill.base + 5, 99);
			}

			// Calculate cost
			if(data.count == 0){
				data.currentCost = 0;
			}
			else if( data.count == 1 && this.self.data.initial_discount == this.self.data.discount ){ // initial
				data.currentCost = data.initCost;
			}
			else{
				// Show save cost with free points or real cost after save points are used
				if( data.count <= data.freepoints )
					data.currentCost = this.self.costs.calculate(data.skill, data.count, this.self.data.discount);
				else
					data.currentCost = this.self.costs.calculate(data.skill, data.count-data.freepoints, this.self.data.discount);
			}

			// Update display
			this.update(data);
			this.self.analyzeStats.skillAfterUpgradeShow(data.name, data.count);
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
			jQuery.ajax({
				type: "GET",
				url: link,
				success: () => {
					count -= 1;
					this.doTrain(data, count);
				},
				error: () => {
					document.location.href = gca_getPage.link({"mod":"training"});
				}
			});
		},

		update : function(data){
			// Update number
			data.number.textContent = data.count;
			// Update cost
			data.cost.textContent = gca_tools.strings.insertDots(data.currentCost) + " ";
			// Show/Hide strike-through line (when having free points)
			if( data.freepoints>0 ){
				if( data.count == 0 || data.count > data.freepoints || (this.self.calculatorTrain.enabled && this.self.data.initial_discount !== this.self.data.discount)) // Hide
					data.imgs[0].parentNode.className = "disable-s";
				else // Show
					data.imgs[0].parentNode.className = "";
			}

			// Get player gold
			var gold = parseInt(document.getElementById("sstat_gold_val").textContent.replace(/\./g,""));

			// If discount is changed
			if (this.self.calculatorTrain.enabled && this.self.data.initial_discount !== this.self.data.discount || data.count > (this.self.data.base_max - data.skill.base)) {
				data.trainButton.original.style.display = "none";
				data.trainButton.disabed.style.display = "none";
				data.trainButton.active.style.display = "none";
			}

			else {
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
				// If you don't have the gold and the free points
				else if(data.currentCost > gold && data.count > data.freepoints){
					data.trainButton.original.style.display = "none";
					data.trainButton.disabed.style.display = "block";
					data.trainButton.active.style.display = "none";
				}
				// You have the gold or the free points
				else{
					data.trainButton.original.style.display = "none";
					data.trainButton.disabed.style.display = "none";
					data.trainButton.active.style.display = "block";
				}
			}

			if (this.self.calculatorTrain.enabled) {
				this.self.calculatorTrain.refresh();
			}
		}
		
	},
	
	// Show the CTRL Hint
	addCtrlHint: {
	        show: function(self) {
	                let ctrlText = document.createElement("p");
	                ctrlText.textContent = gca_locale.get("training", "ctrl_hint");
	                ctrlText.style.fontSize = "10px";
	                ctrlText.style.fontWeight = "bold";
	                ctrlText.style.textAlign = "center";
	                document.getElementById("training_box").appendChild(ctrlText);
	        }
	},

	// Training Calculator
	calculatorTrain : {
		enabled : false,

		// Show
		show : function(self){
			// Set as enabled feature
			this.enabled = true;

			// Save instance
			this.self = self;

			// Create row
			this.row = document.createElement("div");
			this.row.style = "width:500px;position:relative";
			var previousNode = document.getElementById("training_box").getElementsByClassName("training_inner")[5].parentNode;
			previousNode.parentNode.insertBefore(this.row, previousNode.nextSibling);

			// Create inner wrapper
			let inner = document.createElement("div");
			inner.className = "training_inner";
			this.row.appendChild(inner);

			// Create info
			let info = document.createElement("div");
			info.className = "gca-training-info";
			info.textContent = gca_locale.get("training", "total_cost");
			inner.appendChild(info);

			// Create total costs
			let link = document.createElement("div");
			link.className = "training_link";
			let costsWrapper = document.createElement("div");
			costsWrapper.className = "training_costs gca_training_total_costs";
			this.totalCostDifferenceElement = document.createElement("span");
			this.totalCostDifferenceElement.className = "gca_costs_difference";
			costsWrapper.appendChild(this.totalCostDifferenceElement);
			costsWrapper.appendChild(document.createTextNode(" "));
			this.totalCostElement = document.createElement("span");
			costsWrapper.appendChild(this.totalCostElement);
			costsWrapper.appendChild(document.createTextNode(" "));
			costsWrapper.appendChild(gca_tools.create.goldIcon());
			link.appendChild(costsWrapper);
			inner.appendChild(link);

			// Show discount arrows
			let arrowsWrapper = document.createElement("div");
			arrowsWrapper.className = "gca_multiple";
			let arrowUp = document.createElement("div");
			arrowUp.className = "gca-arrow gca-arrow-up";
			let arrowDown = document.createElement("div");
			arrowDown.className = "gca-arrow gca-arrow-down";
			arrowsWrapper.appendChild(arrowUp);
			arrowsWrapper.appendChild(arrowDown);
			this.self.showDiscount.info.parentNode.appendChild(arrowsWrapper);
			// Events
			this.self.multipleTrain.addIncrementEvent(arrowUp, () => {
				this.changeDiscount(+1);
			}, 100);
			this.self.multipleTrain.addIncrementEvent(arrowDown, () => {
				this.changeDiscount(-1);
			}, 100);

			// Refresh
			this.refresh();
		},

		changeDiscount : function(change) {
			this.self.data.discount += change;
			if (this.self.data.discount < 0) {
				this.self.data.discount = 0;
			}
			else if (this.self.data.discount > 100) {
				this.self.data.discount = 100;
			}
			this.self.showDiscount.refresh(true);
		},

		getCosts : function() {
			let costs = 0;

			// For each skill
			for(let i in this.self.multipleTrain.skills){
				// Reference skill
				let skill = this.self.multipleTrain.skills[i];
				costs += skill.currentCost;
			}

			return costs;
		},

		setTotalGold : function(gold){
			// Set total gold
			this.totalCostElement.textContent = gca_tools.strings.insertDots(gold);
			// Set difference gold
			let difference = gca_tools.strings.parseGold(document.getElementById("sstat_gold_val").textContent) - gold;
			this.totalCostDifferenceElement.textContent = "(" + ((difference >= 0)?"+":"-") + " " + gca_tools.strings.insertDots(Math.abs(difference)) + ")";
			this.totalCostDifferenceElement.style.color = (difference >= 0) ? "#006300" : "#840900";
		},

		refresh : function() {
			let costs = this.getCosts();
			this.setTotalGold(costs);
		}
	},

	// Show discount
	showDiscount : {
		show : function(self) {
			// Save instance
			this.self = self;

			// Get wrapper for our data
			var wrapper = document.getElementById("training_box").getElementsByClassName("training_inner")[6];

			// Create info element
			let infoWrapper = document.createElement("div");
			infoWrapper.className = "gca-training-info";
			this.info = document.createElement("span");
			infoWrapper.appendChild(this.info);
			wrapper.appendChild(infoWrapper);

			this.refresh();
		},

		refresh : function(refresh_skills = false) {
			this.info.textContent = gca_locale.get("training", "costs_discount", {number : this.self.data.discount});

			if(refresh_skills){
				// For each skill
				let disabe_training = (this.self.data.initial_discount !== this.self.data.discount);
				for(let i in this.self.multipleTrain.skills){
					this.self.multipleTrain.add(0, this.self.multipleTrain.skills[i]);
					// Hide training buttons
					if (disabe_training) {
						this.self.multipleTrain.skills[i].trainButton.original.style.display = "none";
						this.self.multipleTrain.skills[i].trainButton.disabed.style.display = "none";
						this.self.multipleTrain.skills[i].trainButton.active.style.display = "none";
					}
				}
			}
		}
	},

	// Show analyzed stats
	analyzeStats : {

		// Init stats
		init : function(self){
			// If not initialized
			if (!this.self) {
				// Save self
				this.self = self;

				// Get stats
				this.stats = gca_data.section.get("overview", "stats", false);
				this.specialStats = gca_data.section.get("overview", "special_stats", false);
				// Parse stats
				try{
					this.stats = JSON.parse(this.stats);
				} catch(e) {
					this.stats = false;
				}
				// Parse special stats (avoid_critical, block, critical_hit, critical_healing)
				try{
					this.specialStats = JSON.parse(this.specialStats);
				} catch(e) {
					this.specialStats = false;
				}
			}

			// Check if data exists
			if(!this.stats)
				return false;

			return true;
		},

		// Show tooltips
		showInTooltips : function(self) {
			// If init failed return
			if (!this.init(self))
				return;

			// Get skills data
			var skills = this.self.data.skills;

			// For each stat
			for (let name in this.stats) {
				if (this.stats.hasOwnProperty(name) && skills.hasOwnProperty(name)) {
					this.statInTooltipShow(this.stats[name], skills[name]);
				}
			}
		},

		// Show data for stat
		statInTooltipShow : function(stat, skill){
			// Get basics values
			var basics = skill.base;
			//var max = skill.max;

			// Get tooltip
			var tooltip = document.getElementById(skill.id + "_tt").dataset.tooltip;
			tooltip = JSON.parse(tooltip);

			// Calculate point from percents
			var percentsPoints = 0;
			for (var i = stat.percents.length - 1; i >= 0; i--) {
				percentsPoints += Math.round(basics * (stat.percents[i]/100));
			}
			var totalPoits = stat.sum.values + percentsPoints;

			// Create points string
			var points = "" +
				((stat.sum.values >= 0)?"+":"") + stat.sum.values + " " +
				((stat.sum.percents >= 0)?"+":"") + stat.sum.percents + "% " +
				"(" + ((percentsPoints >= 0)?"+":"") + percentsPoints + ")" + " " +
				"= " + ((totalPoits >= 0)?"+":"") + totalPoits;

			// Add data to the tooltip
			tooltip[0].splice(4, 0, [["","&#x27A4; " + points],["#DDDDDD","#DDDDDD"]]);

			// Set tooltip
			gca_tools.setTooltip(
				document.getElementById(skill.id + "_tt"),
				JSON.stringify(tooltip)
			);
		},

		// Show data after upgrade
		showDataAfterUpgrade : function(self) {
			// If init failed return
			if (!this.init(self))
				return;

			// Get wrapper
			let wrapper = document.getElementById("training_box").parentNode;
			
			// Create mode switch
			let modeSwitch = document.createElement("div");
			modeSwitch.className = "switch-field";
			modeSwitch.id = "mode-switch";

			let statPointsMode = document.createElement("input");
			statPointsMode.type = "radio";
			statPointsMode.id = "stat_points_mode";
			statPointsMode.name = "stats_view_mode";
			statPointsMode.value = 0;
			let statPointsLabel = document.createElement("label");
			statPointsLabel.setAttribute("for", "stat_points_mode");
			statPointsLabel.textContent = gca_locale.get("training", "stats_points");
			modeSwitch.appendChild(statPointsMode);
			modeSwitch.appendChild(statPointsLabel);

			let pointsBreakdownMode = document.createElement("input");
			pointsBreakdownMode.type = "radio";
			pointsBreakdownMode.id = "points_breakdown_mode";
			pointsBreakdownMode.name = "stats_view_mode";
			pointsBreakdownMode.value = 1;
			let pointsBreakdownLabel = document.createElement("label");
			pointsBreakdownLabel.setAttribute("for", "points_breakdown_mode");
			pointsBreakdownLabel.textContent = gca_locale.get("training", "points_breakdown");
			wrapper.parentNode.insertBefore(modeSwitch, wrapper);
			modeSwitch.appendChild(pointsBreakdownMode);
			modeSwitch.appendChild(pointsBreakdownLabel);

			// Show some info
			let info = document.createElement("span");
			info.style.fontSize = "10px";
			info.style.textAlign = "right";
			info.style.display = "none";
			info.appendChild(document.createTextNode(gca_locale.get("training", "stats_calculated_with_yourself_as_an_opponent")));
			info.appendChild(document.createElement('br'));
			info.appendChild(document.createTextNode(gca_locale.get("training", "values_in_parenthesis_explanation")));
			wrapper.appendChild(info);

			// Get bars
			let bars = document.getElementsByClassName('charstats_balken');
			
			// Add events
			statPointsMode.addEventListener("click", () => {
				// Display bars
				for (let i = 0; i < bars.length; i++) {
					bars[i].style = "display:block;top:4px;";
				}
				for (let name in this.stats) {
					document.getElementById(this.self.data.skills[name].id).style = "display:block";
					document.getElementById(name+"_breakdownBox").style = "display:none";
				}
				info.style.display = "none";
			}, false);
			pointsBreakdownMode.addEventListener("click", () => {
				// Hide bars
				for (let i = 0; i < bars.length; i++) {
					bars[i].style = "display:none";
				}
				for (let name in this.stats) {
					document.getElementById(this.self.data.skills[name].id).style = "display:none";
					document.getElementById(name+"_breakdownBox").style = "display:block";
				}
				info.style.display = "block";
			}, false);
			
			// Select mode
			statPointsMode.checked = true;
			
			// For each stat
			for (let name in this.stats) {
				if (this.stats.hasOwnProperty(name) && this.self.data.skills.hasOwnProperty(name)) {
					this.skillAfterUpgradeInit(name);
					this.skillAfterUpgradeShow(name, 1);
				}
			}
		},

		// Data to be saved
		afterUpgrade : {},

		// Init elements
		skillAfterUpgradeInit : function(name){
			// Get data
			var skill = this.self.data.skills[name];

			// Create data
			this.afterUpgrade[name] = {};

			// Get wrapper
			var wrapper = document.getElementById(skill.id);
			if(wrapper.className.length > 0) {
				wrapper.className += " gca-training-values";
			} else {
				wrapper.className = "gca-training-values";
			}

			// Create elements for after upgrade
			var basic = document.createElement("div");
			basic.className = "gca-training-after-upgrade";
			wrapper.getElementsByClassName("training_value")[0].appendChild(basic);
			this.afterUpgrade[name].basic = basic;

			var items = document.createElement("div");
			items.className = "gca-training-after-upgrade";
			wrapper.getElementsByClassName("training_value")[1].appendChild(items);
			this.afterUpgrade[name].items = items;

			var total = document.createElement("div");
			total.className = "gca-training-after-upgrade";
			wrapper.getElementsByClassName("training_value")[3].appendChild(total);
			this.afterUpgrade[name].total = total;
			
			// Stats breakdown
			// Create elements for after upgrade
			var breakdownBox = document.createElement("span");
			breakdownBox.id = name + "_breakdownBox";
			breakdownBox.className = "training_values gca-training-values breakdownBox"
			wrapper.parentNode.appendChild(breakdownBox);
			breakdownBox.appendChild(document.createElement("div"));
			breakdownBox.appendChild(document.createElement("div"));
			breakdownBox.appendChild(document.createElement("div"));
			
			// Display selected mode
			if(document.getElementById("stat_points_mode").checked == true){
				breakdownBox.style="display:none";
			}else{
				wrapper.style="display:none";
				var bars = document.getElementsByClassName('charstats_balken');
				for (var i = 0; i < bars.length; i++) {bars[i].style = "display:none";}
			}
		},

		// Show data
		skillAfterUpgradeShow : function(name, upgrades){
			// Not initialized
			if (!this.afterUpgrade.hasOwnProperty(name)) {
				// Exit
				return;
			}

			// Get data
			var stats = this.stats[name];
			var skill = this.self.data.skills[name];
			var elements = this.afterUpgrade[name];
			var level = parseInt(document.getElementById("header_values_level").textContent, 10);

			var basicNew = skill.base + upgrades;
			var basicChange = upgrades;
			
			var maxEnhance = skill.max - (skill.base + Math.floor(skill.base / 2) + level);
			var maxNew = basicNew + Math.floor(basicNew / 2) + level + maxEnhance;
			//var maxChange = maxNew - skill.max;

			var pointsNew = 0;
			var pointsOld = 0;
			for (let i = stats.values.length - 1; i >= 0; i--) {
				pointsNew += stats.values[i];
				pointsOld += stats.values[i];
			}
			for (let i = stats.percents.length - 1; i >= 0; i--) {
				pointsNew += Math.round(basicNew * (stats.percents[i] / 100));
				pointsOld += Math.round(skill.base * (stats.percents[i] / 100));
			}

			if (pointsNew > maxNew - basicNew) pointsNew = maxNew - basicNew;
			if (pointsOld > skill.max - skill.base) pointsOld = skill.max - skill.base;
			var pointsChange = pointsNew - pointsOld;

			var totalNew = basicNew + pointsNew;
			var totalOld = skill.base + pointsOld;
			var totalChange = totalNew - totalOld;

			// Show data
			elements.basic.textContent = ((basicChange >= 0) ? "+" : "") + basicChange;
			elements.items.textContent = ((pointsChange >= 0) ? "+" : "") + pointsChange;
			elements.total.textContent = ((totalChange >= 0) ? "+" : "") + totalChange;
			
			// Impact on various stats
			var write_breakdown_stat = function(td,txt){
				document.getElementById(name+"_breakdownBox").getElementsByTagName("div")[td].textContent = txt;
			}
			if(name=='strength'){
				// Damage gain
					let damageGain = Math.floor(totalNew/10) - Math.floor(totalOld/10);
					let fakePercentGain = Math.round( (totalNew/10 - totalOld/10)*100 )/100;
					write_breakdown_stat(0, gca_locale.get('training', 'points_breakdown_damage', {integer: damageGain, float: fakePercentGain}));
				// Block % Gain
					let player_level = parseInt(document.getElementById("header_values_level").textContent);
					if( Math.floor( (this.specialStats["block"].item_points+Math.floor(totalOld/10))*52/(player_level-8)/6 )>=50){
						write_breakdown_stat(1, gca_locale.get('training', 'points_breakdown_block_max'));
					}else{
						let blockPercentGain = Math.floor((this.specialStats["block"].item_points+Math.floor(totalNew/10))*52/(player_level-8)/6) - Math.floor((this.specialStats["block"].item_points+Math.floor(totalOld/10))*52/(player_level-8)/6) ;
						let fakePercentGain =  Math.round((totalChange/10)*52/(player_level-8)/6 *1000)/100;
						write_breakdown_stat(1, gca_locale.get('training', 'points_breakdown_block', {integer: blockPercentGain, float: fakePercentGain}));
					}
			}
			else if(name=='dexterity'){
				// Critical Hit % Gain
					let player_level = parseInt(document.getElementById("header_values_level").textContent);
					let criticalPercentGain = Math.round((this.specialStats["critical_hit"].item_points+Math.floor(totalNew/10))*52/(player_level-8)/5) - Math.round((this.specialStats["critical_hit"].item_points+Math.floor(totalOld/10))*52/(player_level-8)/5) ;
					let fakePercentGain =  Math.round((totalChange/10)*52/(player_level-8)/5 *1000)/100;
					write_breakdown_stat(2, gca_locale.get('training', 'points_breakdown_critical_hit', {integer: criticalPercentGain, float: fakePercentGain}));
				// Hit Chance
					let hitChanceGain = Math.floor(totalNew/(totalNew+this.self.data.skills["agility"].points)*100)-Math.floor(totalOld/(totalOld+this.self.data.skills["agility"].points)*100);
					fakePercentGain = Math.round((totalNew/(totalNew+this.self.data.skills["agility"].points)*100 - totalOld/(totalOld+this.self.data.skills["agility"].points)*100) *1000)/100;
					write_breakdown_stat(0, gca_locale.get('training', 'points_breakdown_normal_hit', {integer: hitChanceGain, float: fakePercentGain}));
				// Double hit chance
					let doubleHitGain = Math.floor(this.self.data.skills["charisma"].points*totalNew/this.self.data.skills["intelligence"].points /this.self.data.skills["agility"].points*10)-Math.floor(this.self.data.skills["charisma"].points*totalOld/this.self.data.skills["intelligence"].points /this.self.data.skills["agility"].points*10);
					fakePercentGain = Math.round(this.self.data.skills["charisma"].points*totalChange/this.self.data.skills["intelligence"].points /this.self.data.skills["agility"].points*10*1000)/100;
					write_breakdown_stat(1, gca_locale.get('training', 'points_breakdown_double_hit', {integer: doubleHitGain, float: fakePercentGain}));
			}
			else if(name=='agility'){
				// Avoid critical % Gain
					let player_level = parseInt(document.getElementById("header_values_level").textContent);
					if( Math.round( (this.specialStats["avoid_critical"].item_points+Math.floor(totalOld/10))*52/(player_level-8)/4 )>=25){
						write_breakdown_stat(2, gca_locale.get('training', 'points_breakdown_avoid_max'));
					}else{
						let avoidPercentGain = Math.round((this.specialStats["avoid_critical"].item_points+Math.floor(totalNew/10))*52/(player_level-8)/4) - Math.round((this.specialStats["avoid_critical"].item_points+Math.floor(totalOld/10))*52/(player_level-8)/4) ;
						let fakePercentGain =  Math.round((totalChange/10)*52/(player_level-8)/4 *1000)/100;
						write_breakdown_stat(2, gca_locale.get('training', 'points_breakdown_avoid', {integer: avoidPercentGain, float: fakePercentGain}));
					}
				// Hit Chance
					let hitChanceGain = Math.floor(this.self.data.skills["dexterity"].points/(this.self.data.skills["dexterity"].points+totalNew)*100)-Math.floor(this.self.data.skills["dexterity"].points/(this.self.data.skills["dexterity"].points+totalOld)*100);
					let fakePercentGain = Math.round((this.self.data.skills["dexterity"].points/(this.self.data.skills["dexterity"].points+totalNew)*100 - this.self.data.skills["dexterity"].points/(this.self.data.skills["dexterity"].points+totalOld)*100)*1000)/100;
					write_breakdown_stat(0, gca_locale.get('training', 'points_breakdown_enemy_normal_hit', {integer: hitChanceGain, float: fakePercentGain}));
				// Double hit chance
					let doubleHitGain = Math.floor(this.self.data.skills["charisma"].points*this.self.data.skills["dexterity"].points/this.self.data.skills["intelligence"].points /totalNew*10)-Math.floor(this.self.data.skills["charisma"].points*this.self.data.skills["dexterity"].points/this.self.data.skills["intelligence"].points /totalOld*10);
					fakePercentGain = Math.round(( this.self.data.skills["charisma"].points*this.self.data.skills["dexterity"].points/this.self.data.skills["intelligence"].points /totalNew*10 - this.self.data.skills["charisma"].points*this.self.data.skills["dexterity"].points/this.self.data.skills["intelligence"].points /totalOld*10)*1000)/100;
					write_breakdown_stat(1, gca_locale.get('training', 'points_breakdown_enemy_double_hit', {integer: doubleHitGain, float: fakePercentGain}));
			}
			else if(name=='constitution'){
				// Life gain
					let lifeGain = totalChange*25;
					write_breakdown_stat(0, gca_locale.get('training', 'points_breakdown_life', {number: lifeGain}));
				// Life regeneration gain
					let regenGain = totalChange*2;
					write_breakdown_stat(2, gca_locale.get('training', 'points_breakdown_regeneration', {number: regenGain}));
			}
			else if(name=='charisma'){
				// Double hit chance
					let doubleHitGain = Math.floor(totalNew*this.self.data.skills["dexterity"].points/this.self.data.skills["intelligence"].points /this.self.data.skills["agility"].points*10)-Math.floor(totalOld*this.self.data.skills["dexterity"].points/this.self.data.skills["intelligence"].points /this.self.data.skills["agility"].points*10);
					let fakePercentGain = Math.round(totalChange*this.self.data.skills["dexterity"].points/this.self.data.skills["intelligence"].points /this.self.data.skills["agility"].points*10*1000)/100;
					write_breakdown_stat(1, gca_locale.get('training', 'points_breakdown_double_hit', {integer: doubleHitGain, float: fakePercentGain}));
				// Threat per round gain
					//let threatGain = Math.floor(totalNew/10) - Math.floor(totalOld/10); per round
					let threatGain = Math.floor(totalNew*0.7) - Math.floor(totalOld*0.7);
					fakePercentGain = Math.round( (totalNew*0.7 - totalOld*0.7)*100 )/100;
					write_breakdown_stat(0, gca_locale.get('training', 'points_breakdown_threat', {integer: threatGain, float: fakePercentGain}));
			}
			else if(name=='intelligence'){
				// Heal gain
					let healGain = Math.round(totalChange*4/5*100)/100;
					write_breakdown_stat(0, gca_locale.get('training', 'points_breakdown_heal', {integer: Math.floor(healGain), float: healGain}));
				// Critical Healing Chance
					let player_level = parseInt(document.getElementById("header_values_level").textContent);
					if(Math.round((this.specialStats["critical_healing"].item_points+Math.floor(totalOld/5))*52/(player_level-8)/7)>=90){
						write_breakdown_stat(2, gca_locale.get('training', 'points_breakdown_critical_heal_max'));
					}else{
						let healingPercentGain = Math.round((this.specialStats["critical_healing"].item_points+Math.floor(totalNew/5))*52/(player_level-8)/7) - Math.round((this.specialStats["critical_healing"].item_points+Math.floor(totalOld/5))*52/(player_level-8)/7) ;
						let fakePercentGain =  Math.round((totalChange/5)*52/(player_level-8)/7 *1000)/100;
						write_breakdown_stat(2, gca_locale.get('training', 'points_breakdown_critical_heal', {integer: healingPercentGain, float: fakePercentGain}));
					}
				// Double hit chance
					let doubleHitGain = Math.floor(this.self.data.skills["charisma"].points*this.self.data.skills["dexterity"].points/totalNew/this.self.data.skills["agility"].points*10)-Math.floor(this.self.data.skills["charisma"].points*this.self.data.skills["dexterity"].points/totalOld/this.self.data.skills["agility"].points*10);
					let fakePercentGain = Math.round(( this.self.data.skills["charisma"].points*this.self.data.skills["dexterity"].points/totalNew/this.self.data.skills["agility"].points*10 - this.self.data.skills["charisma"].points*this.self.data.skills["dexterity"].points/totalOld/this.self.data.skills["agility"].points*10 )*1000)/100;
					write_breakdown_stat(1, gca_locale.get('training', 'points_breakdown_enemy_double_hit', {integer: doubleHitGain, float: fakePercentGain}));
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

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_training.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_data, gca_getPage, gca_locale, gca_options, gca_tools */
/* global jQuery */
