/*
 * Addon Options Interface Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

gca_options.interface = {
	view : false,
	gcaElements : {
		content : null
	},
	inject : function(){
		if(gca_section.submod || !$dark('#content')){
			if(gca_section.submod=='charSettings' || gca_section.submod=='saveCharacterDesc'){
				this.dectiptionLivePreview();
			}
			return;
		}
		this.saveMail();
		this.builtOptions();
		this.gotoSettings();
		if(gca_section.gcamod && gca_section.gcamod=="options")
			gca_options.interface.toggle();
	},
	dectiptionLivePreview : function(){
		$dark('#content').addChild(
			$dark('*div').css('clear:both; margin:20px; max-width: 490px;').addChild([
				$dark('*div').class('title_box').html('<div class="title_inner">Description Preview</div>'),
				$dark('*div').class('title2_box').html('\
					<div class="title2_box">\
						<div class="title2_inner">\
							<p class="bbcode_area" style="width:100%; overflow:hidden;" id="liveUpdateCode">\
							</p>\
						</div>\
					</div>\
				')
			])
		);
		$dark('*input').type('button').value("Preview").id("previewButton").class("button2").css('float:right;margin-top:2px;').afterFrom('#rpg');
		this.showDescription();
		
		document.getElementById('previewButton').addEventListener('click', this.showDescription,false);
	},
	showDescription : function(){
		descCode = $dark('#rpg').value()
			// Replace color
			.replace(/\[\/f\]/gi,'</span>').replace(/\[f c=#([^\]]+)\]/gi, '<span style="color:#$1;">')
			// Replace font size
			.replace(/\[f s=(\d+)\]/gi, '<span style="font-size:$1pt;">')
			// Replace font family
			.replace(/\[f f="([^"]+)"\]/gi,'<span style="font-family:$1;">')
			// Replace links
			.replace(/\[p n="([^"]+)"\s*i?d?=*\d*\]/gi,'<a href="#">$1</a>')
			.replace(/\[g n="([^"]+)"\s*i?d?=*\d*\]/gi,'<a href="#">$1</a>')
			.replace(/\[g t="([^"]+)"\s*i?d?=*\d*\]/gi,'<a href="#">$1</a>')
			// Replace other tags
			.replace(/\[(\w)\]/gi, '<$1>').replace(/\[\/(\w)\]/gi,'</$1>').replace(/(?:\r\n|\r|\n)/g, '<br />');
		// Display {review}
		$dark('#liveUpdateCode').html(descCode);
	},
	saveMail : function(){
		gca_data.set('playerMail',$dark('#content input[1]').value());
	},
	gotoSettings : function(){
		$dark('#content div[0]').addChild([
			$dark('*br'),
			$dark('*div').class("title_box").addChild(
				$dark('*div').class("title_inner").html(gca.name)
			),
			$dark('*div').class("title2_box").addChild(
				$dark('*div').class("title2_inner").addChild([
					$dark('*table').addChild([
						$dark('*tr').addChild([
							$dark('*td').addChild([
								$dark('*div').class('settings_image')
							]),
							$dark('*td').addChild([
								$dark('*p').html( gca_locale.get("OPTIONS_DESCRIPTION") +"<br/>"+ gca_locale.get("OPTIONS_BUTTON_BELOW") )
							])
						])
					]),
					$dark('*input').type("button").value( gca_locale.get("OPTIONS_SETTINGS") ).class("button2").click(function(){
						gca_options.interface.toggle();
					})
				])
			)
		]);
	},
	toggle : function(){
		window.scrollTo(0, 0);
		if(this.view){
			this.gcaElements.content.DOM().style.display="none";
			$dark('#content').DOM().style.display="inline";
			var i=0;
			while($dark('#mainnav li['+i+']')){
				$dark('#mainnav li['+i+']').DOM().style.display="inline";
				i++;
			}
			window.history.pushState(null, null, "/"+getPage.link({"mod":"settings"}) );
		}else{
			$dark('#content').DOM().style.display="none";
			var i=0;
			while($dark('#mainnav li['+i+']')){
				$dark('#mainnav li['+i+']').DOM().style.display="none";
				i++;
			}
			this.gcaElements.content.DOM().style.display="inline";
			window.history.pushState(null, null, "/game/"+getPage.link({"mod":"settings","gcamod":"options"}) );
		}
		this.view = (!this.view);
	},
	builtOptions: function(){
		this.gcaElements.content = $dark('*div').id("gca_setings_content").addChild([
			$dark('*div').class("logo").addChild([
				$dark('*div').html(gca_locale.get("OPTIONS_SETTINGS"))
			]),
			$dark('*div').css('height: 4px;')
		]);
		this.gcaElements.options = (
			new this.optionsClasses.options("Gladiatus Crazy Addon Options",[
				new this.optionsClasses.category("GLOBAL_OPTIONS",[
					new this.optionsClasses.subcategory(null,[
						new this.optionsClasses.checkBox("GLOBAL_EXTENDED_HP_XP_INFO"),
						new this.optionsClasses.checkBox("GLOBAL_BUTTON_BAR"),
						new this.optionsClasses.checkBox("GLOBAL_AUCTION_STATUS_BAR"),
						new this.optionsClasses.checkBox("GLOBAL_AUCTION_STATUS_NOTIFICATION"),
						new this.optionsClasses.checkBox("GLOBAL_TOP_FIXED_BAR"),
						new this.optionsClasses.checkBox("GLOBAL_ADVANCED_MAIN_MENU"),
						new this.optionsClasses.checkBox("GLOBAL_MERCHANTS_TIME"),
						new this.optionsClasses.checkBox("GLOBAL_MINITES_LEFT_FOR_FULL_LIFE"),
						new this.optionsClasses.checkBox("GLOBAL_REMEMBER_TABS"),
						new this.optionsClasses.checkBox("GLOBAL_QUESTS_TIMER"),
						new this.optionsClasses.checkBox("GLOBAL_ATTACKED_TIMERS"),
						new this.optionsClasses.checkBox("GLOBAL_WEAPON_DOWN_ALERT"),
						new this.optionsClasses.checkBox("GLOBAL_DISPLAY_CENTURIO_DAYS"),
						new this.optionsClasses.checkBox("GLOBAL_MAP_NAMES_LEVELS"),
						new this.optionsClasses.checkBox("GLOBAL_SOUND_NOTIFICATIONS"),
						new this.optionsClasses.dropdownlist("GLOBAL_LANGUAGE", gca_languages),
					])
				]),
				new this.optionsClasses.category("OVERVIEW_OPTIONS",[
					new this.optionsClasses.subcategory("MAIN_PLAYER_OPTIONS",[
						new this.optionsClasses.checkBox("OVERVIEW_ITEMS_ANALIZE"),
						new this.optionsClasses.checkBox("OVERVIEW_DISPLAY_SHARE_LINK")
					]),
					new this.optionsClasses.subcategory("STATS_OPTIONS",[
						new this.optionsClasses.checkBox("OVERVIEW_PLAYER_STATS_MOD"),
						new this.optionsClasses.checkBox("OVERVIEW_BLOCK_AVOID_CAPS")
					])
				]),
				new this.optionsClasses.category("TRANING_OPTIONS",[
					new this.optionsClasses.subcategory(null,[
						new this.optionsClasses.checkBox("TRANING_DISPLAY_MOD"),
						new this.optionsClasses.checkBox("TRANING_DISPLAY_COST_CALCULATOR")
					])
				]),
				new this.optionsClasses.category("AUCTION_OPTIONS",[
					new this.optionsClasses.subcategory("AUCTION_TABLE_MODIFICATIONS",[
						new this.optionsClasses.checkBox("AUCTION_DISPLAY_ITEMS_NUM"),
						new this.optionsClasses.checkBox("AUCTION_DISPLAY_ITEMS_BGCOLOR"),
						new this.optionsClasses.checkBox("AUCTION_AUTO_FILL_GOLD"),
						new this.optionsClasses.checkBox("AUCTION_DISPLAY_ITEMS_LVL"),
						new this.optionsClasses.checkBox("AUCTION_DISPLAY_3_ITEMS_PER_ROW"),
						new this.optionsClasses.checkBox("AUCTION_MULTIPLE_BIDS"),
						new this.optionsClasses.checkBox("AUCTION_WARN_GUILD")
					]),
					new this.optionsClasses.subcategory("AUCTION_SEARCH_MODIFICATIONS",[
						new this.optionsClasses.checkBox("AUCTION_EXPAND_ITEMS_LVL"),
						new this.optionsClasses.checkBox("AUCTION_IMPROVE_SEARCH_MENU")
					]),
					new this.optionsClasses.subcategory("AUCTION_TOOLTIP_MODIFICATIONS",[
						new this.optionsClasses.checkBox("AUCTION_MERCENARIES_TOOLTIPS"),
						new this.optionsClasses.checkBox("AUCTION_HIDE_MERCENARIES_GUIDE_ROW")
					])
				]),
				new this.optionsClasses.category("MARKET_OPTIONS",[
					new this.optionsClasses.subcategory("MARKET_TABLE_MODIFICATIONS",[
						//new this.optionsClasses.checkBox("MARKET_LOAD_MORE_PAGES",true),
						new this.optionsClasses.checkBox("MARKET_STYLE_CHANGES"),
						//new this.optionsClasses.checkBox("MARKET_CANCEL_PACKETS_BUTTON"),
						new this.optionsClasses.dropdownlist("MARKET_DEFAULT_SELL_DURATION", {"0":{name:"2 h"},"1":{name:"8 h"},"2":{name:"24 h"},"3":{name:"48 h"}}),
					]),
					new this.optionsClasses.subcategory("MARKET_SEARCH_MODIFICATIONS",[
						new this.optionsClasses.checkBox("MARKET_EXPAND_ITEMS_LVL"),
						new this.optionsClasses.checkBox("MARKET_IMPROVE_SEARCH_MENU")
					])
				]),
				new this.optionsClasses.category("MERCHANTS_OPTIONS",[
					new this.optionsClasses.subcategory(null,[
						new this.optionsClasses.checkBox("MERCHANTS_ITEM_SEARCH"),
						new this.optionsClasses.checkBox("MERCHANTS_HIGHLIGHT_ITEMS"),
						new this.optionsClasses.checkBox("MERCHANTS_INFOS")
					])
				]),
				new this.optionsClasses.category("MESSAGES_OPTIONS",[
					new this.optionsClasses.subcategory("MESSAGES_LIST_OPTIONS",[
						new this.optionsClasses.checkBox("MESSAGES_STYLING"),
						new this.optionsClasses.checkBox("MESSAGES_CONVERT_LINKS", false, true),
						new this.optionsClasses.checkBox("MESSAGES_FIX_SPACES", false, true)
					]),
					new this.optionsClasses.subcategory("NEW_MESSAGE_OPTIONS",[
						new this.optionsClasses.checkBox("NEWMESSAGE_FOCUS"),
						new this.optionsClasses.checkBox("NEWMESSAGE_FRIENDLIST")
					]),
					new this.optionsClasses.subcategory("MESSAGE_SPAM_BLOCK_OPTIONS",[
						new this.optionsClasses.checkBox("MESSAGE_SPAM_BLOCK"),
						new this.optionsClasses.textinput("SPAM_BLOCKED_PLAYERS",function(){}),
					])
				]),
				new this.optionsClasses.category("PACKAGES_OPTIONS",[
					new this.optionsClasses.subcategory(null,[
						new this.optionsClasses.checkBox("PACKAGES_NEW_LAYOUT",true),
						new this.optionsClasses.numberinput("PACKAGES_MAX_PAGES_TO_LOAD",function(){},true),
						new this.optionsClasses.checkBox("PACKAGES_COLLECT_GOLD_BUTTON"),
						new this.optionsClasses.checkBox("PACKAGES_EXPIRED_PACKAGES"),
						new this.optionsClasses.numberinput("PACKAGES_EXPIRED_HOURS")
					])
				]),
				new this.optionsClasses.category("REPORTS_OPTIONS",[
					new this.optionsClasses.subcategory("REPORT_LIST_OPTIONS",[
						new this.optionsClasses.checkBox("REPORT_LIST_STYLE")
					])
				]),
				new this.optionsClasses.category("CHAT_OPTIONS",[
					new this.optionsClasses.checkBox("CHAT_URL_MOD"),
					new this.optionsClasses.checkBox("CHAT_STYLE_MOD")
				]),
				new this.optionsClasses.category("PANTHEON_OPTIONS",[
					new this.optionsClasses.checkBox("PANTHEON_QUESTS_ORDER"),
					new this.optionsClasses.checkBox("PANTHEON_QUESTS_DETAILED_REWARDS"),
					new this.optionsClasses.checkBox("PANTHEON_GODS_RECOLOR")
				]),
				new this.optionsClasses.category("ARENA_OPTIONS",[
					new this.optionsClasses.checkBox("ARENA_SERVER_ARENA_ORDER")
				]),
				new this.optionsClasses.category("PLAYER_OPTIONS",[
					new this.optionsClasses.checkBox("PLAYER_SIMULATOR_BUTTON"),
					new this.optionsClasses.checkBox("PLAYER_MERCENARIES_FIGHT_TYPE")
				]),
				new this.optionsClasses.category("GUILD_OPTIONS",[
					new this.optionsClasses.subcategory(null,[
						new this.optionsClasses.checkBox("GUILD_MESSAGE_INTERFACE"),
						new this.optionsClasses.checkBox("GUILD_JAIL_INTERFACE"),
						new this.optionsClasses.checkBox("GUILD_LIBRARY_INTERFACE"),
						new this.optionsClasses.checkBox("GUILD_BANK_INTERFACE"),
						new this.optionsClasses.checkBox("GUILD_BANKBOOK_INTERFACE"),
						new this.optionsClasses.checkBox("GUILD_MEDIC_INTERFACE"),
						new this.optionsClasses.checkBox("GUILD_LIFE_TAB"),
						new this.optionsClasses.checkBox("GUILD_APPLICATION_ALERT"),
						new this.optionsClasses.checkBox("GUILD_NAMES_LEVELS")
					])
				]),
				new this.optionsClasses.category("PREMIUM_OPTIONS",[
					new this.optionsClasses.subcategory(null,[
						new this.optionsClasses.textinput("PREMIUM_KEY",function(){gca_dataUpdater.premium.getPremiumCode()}),
						new this.optionsClasses.text( 'Premium: '+( (Math.round((gca_data.get('premium_days',0)-(new Date().getTime()/1000))/60/60/24)<0)?0:Math.round((gca_data.get('premium_days',0)-(new Date().getTime()/1000))/60/60/24) )+' '+gca_locale.get("days")+' '+gca_locale.get("remaining")),
						new this.optionsClasses.button("GET_PREMIUM",function(){window.open('http://gladiatuscrazyaddon.tk/index.php?mode=donate','_blank');})
					])
				]),
				new this.optionsClasses.category("GAME_FIXES_OPTIONS",[
					new this.optionsClasses.subcategory(null,[
						new this.optionsClasses.checkBox("FIXES_RTL_TOOLTIP_FIX")
					])
				])
			])
		);
		this.gcaElements.content.addChild([
			this.gcaElements.options.getDOM(),
			$dark('*br'),
			$dark('*input').type('button').value(gca_locale.get("GENERAL_BACK")).class("button2 options_bottom_button_margin").click(function(){
				gca_options.interface.toggle();
			}),
			$dark('*input').type('button').value(gca_locale.get("OPTIONS_OPEN_ALL")).class("button2 options_bottom_button_margin").click(function(){
				gca_options.interface.gcaElements.options.toggle(false);
			}),
			$dark('*input').type('button').value(gca_locale.get("OPTIONS_CLOSE_ALL")).class("button2 options_bottom_button_margin").click(function(){
				gca_options.interface.gcaElements.options.toggle(true);
			}),
			$dark('*input').type('button').value(gca_locale.get("OPTIONS_SAVE_ALL")).class("button2").click(function(){
				gca_options.interface.gcaElements.options.save();
				gca_options.interface.saveComplete();
			})
		]);

		$dark('#main_inner').addChild(this.gcaElements.content);
	},
	saveComplete : function(){
		gca_notifications.success(gca_locale.get("OPTIONS_SAVED"));
		gca_notifications.info(gca_locale.get("OPTIONS_RELOAD"));
	},
	optionsClasses : {
		options : (function(name, categories){
			// Constructor
			function Options(name, categories) {
				this.name = name;
				this.categories = categories;
				this.div = $dark('*div');
				for(i in this.categories)
					this.div.addChild(categories[i].getDOM());
			}
			Options.prototype.save = function(){
				for(i in this.categories)
					this.categories[i].save();
			};
			Options.prototype.getDOM = function(){
				return this.div;
			};
			Options.prototype.toggle = function(value){
				for(i in this.categories)
					this.categories[i].toggle(value);
			};
			return Options;
		})(),

		// Categories
		category : (function(name, subcategories){
			// Constructor
			function Category(name, subcategories) {
				this.name = (name)?gca_locale.get("OPTIONS_"+name):name;
				this.subcategories = subcategories;
				this.open = false;
				this.div = $dark('*div');
				for(i in this.subcategories)
					this.div.addChild(subcategories[i].getDOM());
			}
			Category.prototype.save = function(){
				for(i in this.subcategories)
					this.subcategories[i].save();
			};
			Category.prototype.getDOM = function(){
				var that = this;
				return $dark('*div').addChild([
					$dark('*div').class('options_category').html(this.name).click(function(){that.toggle();}),
					this.div.class('options_category_box').css("display: none;").addChild([
						$dark('*input').type('button').value(gca_locale.get("OPTIONS_SAVE_CATEGORY")).class("button1").css('margin-top:5px;').click(function(){
							that.save();
							gca_options.interface.saveComplete();
						})
					])
				]);
				//return this.div;
			};
			Category.prototype.toggle = function(value){
				if(value!=undefined) this.open=value;
				if(this.open) this.div.DOM().style.display="none";
				else this.div.DOM().style.display="block";
				this.open = (!this.open);
			};
			return Category;
		})(),

		// SubCategories
		subcategory : (function(name, elements){
			// Constructor
			function Subcategory(name, elements) {
				this.name = (name)?gca_locale.get("OPTIONS_"+name):name;
				this.elements = elements;
				this.div = $dark('*div');
				if(this.name) this.div.css("margin-left: 10px;")
				for(i in this.elements)
					this.div.addChild(elements[i].getDOM());
			}
			Subcategory.prototype.save = function(){
				for(i in this.elements)
					this.elements[i].save();
			};
			Subcategory.prototype.getDOM = function(){
				if(this.name)
					return $dark('*div').addChild([
						$dark('*div').html(this.name),
						this.div
					]);
				return this.div;
			};
			return Subcategory;
		})(),

		// Elements Types "CheckBox"
		checkBox : (function(label){
			function CheckBox(label, premium, beta){
				premium = typeof premium !== 'undefined' ? premium : false;
				beta = typeof beta !== 'undefined' ? beta : false;
				this.label = (label)?gca_locale.get("OPTIONS_"+label):label;
				this.value = "ENABLE_"+label;
				this.input = $dark('*input').type("checkbox");
				if(gca_options.isOn(this.value)){
					//this.input.DOM().checked=true;
					this.input.setAttr("checked","checked");
				}
				var children = [
					this.input,
					$dark('*span').html(this.label)
				];
				if(beta){
					children.unshift($dark('*div').class('betaico').html(''));
				}
				if(premium){
					children.unshift($dark('*div').class('premico').html(''));
				}
				this.element = $dark('*label').addChild(children);
			}
			CheckBox.prototype.getValue = function(){
				if(this.input.DOM().checked)
					return true;
				return false;
			};
			CheckBox.prototype.save = function(){
				gca_options.save(this.value, this.getValue());
			};
			CheckBox.prototype.getDOM = function(){
				return $dark('*div').addChild(this.element);
			};
			return CheckBox;
		})(),

		// Elements Types "DropDown List"
		dropdownlist : (function(label){
			function DropDownList(label, options, texts){
				this.label = (label)?gca_locale.get("OPTIONS_"+label):label;
				this.value = label;
				this.select = $dark('*select');
				
				if(options instanceof Object){
					this.options = new Array();
					this.texts = new Array();
					for(i in options){
						this.options.push(i);
						this.texts.push(options[i].name);
					}
				}else{
					this.options = options;
					this.texts = texts;
				}
				
				for(var i=0; i<this.options.length; i++){
					var optElm = $dark('*option').value(i).html( this.texts[i] );
					this.select.addChild([optElm]);
					if(this.options[i]==gca_options.load(this.value))
						optElm.setAttr("selected","selected");
				}

				this.element = $dark('*span').html(this.label);
			};
			DropDownList.prototype.getValue = function(){
				if(isNaN(this.select.value()) || this.select.value()>=this.options.length)
					return null;
				return this.options[this.select.value()];
			};
			DropDownList.prototype.save = function(){
				if(this.getValue())
					gca_options.save(this.value, this.getValue());
			};
			DropDownList.prototype.getDOM = function(){
				return $dark('*div').addChild([
					this.select,
					this.element
				]);
			};
			return DropDownList;
		})(),
		
		// Elements Types "TextInput"
		textinput : (function(label,save_function){
			function TextInput(label,save_function){
				this.label = (label)?gca_locale.get("OPTIONS_"+label):label;
				this.value = label;
				this.input = $dark('*input').type("text");
				this.save_function=save_function;
				
				if(gca_options.load(this.value))
					this.input.value(gca_options.load(this.value)) ;
				
				this.element = $dark('*span').html(this.label);
			};
			TextInput.prototype.getValue = function(){
				if(this.input.value() && this.input.value()!="" && this.input.value()!=null)
					return this.input.value();
				return '-';
			};
			TextInput.prototype.save = function(){
				gca_options.save(this.value, this.getValue());
				if(this.save_function)
					this.save_function();
			};
			TextInput.prototype.getDOM = function(){
				return $dark('*div').addChild([
					this.input,
					this.element
				]);
			};
			return TextInput;
		})(),

		// Elements Types "NumberInput"
		numberinput : (function(label,save_function){
			function NumberInput(label,save_function, premium, beta){
				premium = typeof premium !== 'undefined' ? premium : false;
				beta = typeof beta !== 'undefined' ? beta : false;
				this.label = (label)?gca_locale.get("OPTIONS_"+label):label;
				this.value = label;
				this.input = $dark('*input').css("float:right;").type("number");
				this.save_function=save_function;
				
				if(gca_options.load(this.value))
					this.input.value(gca_options.load(this.value)) ;
				
				var children = [
					$dark('*span').html(this.label)
				];
				if(beta){
					children.unshift($dark('*div').class('betaico').html(''));
				}
				if(premium){
					children.unshift($dark('*div').class('premico').html(''));
				}
				this.element = $dark('*label').addChild(children);
			};
			NumberInput.prototype.getValue = function(){
				if(this.input.value() && this.input.value()!="" && this.input.value()!=null && this.input.value()>=0)
					return this.input.value();
				return gca_options.load(this.value);
			};
			NumberInput.prototype.save = function(){
				gca_options.save(this.value, this.getValue());
				if(this.save_function)
					this.save_function();
			};
			NumberInput.prototype.getDOM = function(){
				return $dark('*div').css("height: 26px;line-height: 26px;").addChild([
					this.input,
					this.element
				]);
			};
			return NumberInput;
		})(),
		
		// Elements Types "Button"
		button : (function(label, callback){
			function Button(label, callback){
				this.input = $dark('*input').type("button").value(gca_locale.get("OPTIONS_"+label)).class("button1").click(function(){callback();});
			};
			Button.prototype.save = function(){return;};
			Button.prototype.getDOM = function(){
				return $dark('*div').addChild([this.input]);
			};
			return Button;
		})(),
		
		// Text
		text : (function(label){
			function Text(label){
				this.span = $dark('*span').html(label);
			};
			Text.prototype.save = function(){return;};
			Text.prototype.getDOM = function(){
				return $dark('*div').addChild([this.span]);
			};
			return Text;
		})()
	}
}