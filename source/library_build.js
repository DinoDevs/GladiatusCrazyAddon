/*
 * Addon Build Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 * Version : 0.0.3.1
 */

var dark_build_library = {
	//Redirect action
	redirect : function(x){
		//if no parameters return this
		if(x==undefined){
			return this;

		//If it is string
		}else if( (typeof x)=="string" ){
			//Trim code
			x=x.replace( /\s+/g ," ").replace( /\*\s+/g ,"*").replace( /#\s+/g ,"#").replace( /\.\s+/g ,".").replace( /(\s+\[|\[\s+)/g ,"[").replace( /\s+\]/g ,"]").replace(/^\s+|\s+$/g,"");

			//If body
			if( x=="body" )
				return this.createDarkElement(document.body);
			//Built a new Element
			else if( x.match(/./)=="*" ){
				return this.createDarkElement( x.replace('*','') );

			//Get an element from the string path given
			}else{
				if(arguments.length>1){
					var y = this.redirect(arguments[1]);
					if(y.darkElement || y.darkDocument)
						return this.resolveStringPath(x,y);
				}
				return this.resolveStringPath(x);
			}

		//If it is dark element
		}else if(x && (x.darkElement || x.darkDocument)){
			return x;

		//If it is HTML element
		}else if(x && x.tagName && x.nodeName && x.ownerDocument && x.removeAttribute){	
			return this.createDarkElement(x);
		}
		
		//Given parameter can not be handled
		throw new Error("javascript library error\nDARK_BUILT_LIBRARY: unknown parameters");
	},

	//Resolve string path
	resolveStringPath : function(x,y){

		//Split string path into string doms
		var doms = x.split(' ');

		//Set the head of the dom tree
		if(y && y.darkElement){
				var path = y.element;
			var stringPath = "...";
		}else{
			var path = document;
			var stringPath = "document";
		}

		var collection = false;
		//Start moving into the dom
		for(var i in doms){

			//If empty dom got to next
			if(doms[i]=="" || doms[i]==null) continue;

			//Check if path
			if(path==null){
				return null;
				//console.log("\nDARK_BUILT_LIBRARY: from \""+stringPath+"\" error while trying to enter \""+doms[i]+"\" (\""+stringPath+"\" is null)");
				//throw new Error("\nDARK_BUILT_LIBRARY: from \""+stringPath+"\" error while trying to enter \""+doms[i]+"\" (\""+stringPath+"\" is null)");
			}

			//If dom is based on its id
			if(doms[i].match(/./i)=="#"){
				//Try to enter path
				if(path.getElementById( doms[i].replace("#",'') )){
					path=path.getElementById( doms[i].replace("#",'') );
				//Path dont exist
				}else{path=null;}
				
				//Upadate stringPath
				stringPath +=" "+doms[i];

			//If dom is based on its className
			}else if(doms[i].match(/./i)=="."){

				//If an element number is given
				if(doms[i].match(/\[\d+\]/i)){

					//Try to enter path
					if(path.getElementsByClassName( doms[i].replace(".",'').replace(/\[\d+\]/i,"") ) && path.getElementsByClassName( doms[i].replace(".",'').replace(/\[\d+\]/i,"") )[doms[i].match(/\[(\d+)\]/i)[1]]){
						path=path.getElementsByClassName( doms[i].replace(".",'').replace(/\[\d+\]/i,"") )[doms[i].match(/\[(\d+)\]/i)[1]];
					//Path dont exist
					}else{path=null;}

				//If we deal with a collection
				}else{

					//Try to enter path
					if(path.getElementsByClassName( doms[i].replace(".",'') ) ){
						path=path.getElementsByClassName( doms[i].replace(".",'') );
						collection=true;
					//Path dont exist
					}else{path=null;}

				}

				//Upadate stringPath
				stringPath +=" "+doms[i];
			
			//If dom is based on a tagName
			}else{

				//If an element number is given
				if(doms[i].match(/\[\d+\]/i)){

					//Try to enter path
					if(path.getElementsByTagName( doms[i].replace(/\[\d+\]/i,"") ) && path.getElementsByTagName( doms[i].replace(/\[\d+\]/i,"") )[doms[i].match(/\[(\d+)\]/i)[1]]){
						path=path.getElementsByTagName( doms[i].replace(/\[\d+\]/i,"") )[doms[i].match(/\[(\d+)\]/i)[1]];
					//Path dont exist
					}else{path=null;}

				//If we deal with a collection
				}else{

					//Try to enter path
					if(path.getElementsByTagName( doms[i] ) ){
						path=path.getElementsByTagName( doms[i] );
						collection=true;
					//Path dont exist
					}else{path=null;}

				}

				//Upadate stringPath
				stringPath +=" "+doms[i];

			}
		}

		//If element exist convert it to dark element
		if(path!=null && !collection){
			return this.createDarkElement(path);

		//Return null or colection of elements
		}else{
			return path;
		}

	},

	//Create a new darkElement
	createDarkElement : function(x){
		//Create dark element
		var newDarkElement = new this.darkElement();

		//If parameter is a type
		if( (typeof x)=="string" )
			newDarkElement.element = document.createElement(x);

		//If parameter is an element
		else if(x && x.tagName && x.nodeName && x.ownerDocument && x.removeAttribute)
			newDarkElement.element = x;
		
		return newDarkElement;
	},

	//The darkElement object
	darkElement : function(){

		//The HTML element varible
		this.element = null;
		//Fast return the HTML element
		this.DOM = function(){
			return this.element;
		}

		//DarkElement identify varible
		this.darkElement = true;
		
		//Main HTML element attributes

			//The id attribute
			this.id = function(id){
				//return element's id
				if(id==undefined)
					return this.element.id;
				//set element's id
				this.element.id=id;
				return this;
			};

			//The class attribute
			this.class = function(className){
				//return element's class
				if(className==undefined)
					return this.element.className;
				//set element's class
				this.element.className=className;
				return this;
			};
			this.addClass = function(className){
				if(className && (typeof className)=="string" && className.replace(/^\s+|\s+$/g,"").length>0){
					className=className.replace(/^\s+|\s+$/g,"").replace(/\s+/g," ");
					if(this.element.className.match(className))
						return;
					//If there isnt any other class
					if(this.element.className=="")
					this.element.className=className;
					//If there is
					else{
						this.element.className+=" "+className;
					}
				}
				return this;
			};
			this.delClass = function(className){
				if(className && (typeof className)=="string" && className.replace(/^\s+|\s+$/g,"").length>0){
					className=className.replace(/^\s+|\s+$/g,"").replace(/\s+/g," ");
					if(className.match(/\s/g)){
						className = className.split(" ");
						for(var i in className){
							this.delClass( className[i] );	
						}
					}else{
						this.element.className=this.element.className.replace(className,"").replace(/^\s+|\s+$/g,"").replace(/\s+/g," ");
					}
				}
				return this;
			};
		
			//The name attribute
			this.name = function(name){
				//return element's name
				if(name==undefined)
					return this.element.name;
				//set element's name
				this.element.name=name;
				return this;
			};

			//The src attribute
			this.src = function(src){
				//return element's src
				if(src==undefined)
					return this.element.src;
				//set element's src
				this.element.src=src;
				return this;
			};

			//The href attribute
			this.href = function(href){
				//return element's href
				if(href==undefined)
					return this.element.href;
				//set element's href
				this.element.href=href;
				return this;
			};

			//The title attribute
			this.title = function(title){
				//return element's title
				if(title==undefined)
					return this.element.title;
				//set element's title
				this.element.title=title;
				return this;
			};

			//The alt attribute
			this.alt = function(alt){
				//return element's alt
				if(alt==undefined)
					return this.element.alt;
				//set element's alt
				this.element.alt=alt;
				return this;
			};

			//The style attribute
			this.style = function(style){
				//return element's style
				if(style==undefined)
					return this.element.style;
				//set element's style
				this.element.setAttribute('style',style);
				return this;
			};
			this.addStyle = function(style){
				if(style && (typeof style)=="string" && style.replace(/^\s+|\s+$/g,"").length>0){
					style=style.replace(/^\s+|\s+$/g,"").replace(/\s+/g," ");
					//If there isnt any other style
					if(this.element.getAttribute('style')==null)
						this.element.setAttribute('style',style);
					//If there is
					else{
						var style = this.element.getAttribute('style')+style;
						this.element.setAttribute('style',style);
					}
				}
				return this;
			};

			//The type attribute
			this.type = function(type){
				//return element's type
				if(type==undefined)
					return this.element.type;
				//set element's type
				this.element.type=type;
				return this;
			};

			//The value attribute
			this.value = function(value){
				//return element's value
				if(value==undefined)
					return this.element.value;
				//set element's value
				this.element.value=value;
				return this;
			};

		//Main HTML element methods

			//CSS - Style return
			this.css = function(css){
				if(css==undefined)
					return this.style(css);
				return this.addStyle(css);
			};

			//The innerHTML
			this.html = function(innerHTML){
				//return element's innerHTML
				if(innerHTML==undefined)
					return this.element.innerHTML;
				//set element's innerHTML
				this.element.innerHTML=innerHTML;
				return this;
			};

			this.addHtml = function(innerHTML){
				//set element's innerHTML
				this.element.innerHTML+=innerHTML;
				return this;
			};

			//The textContent
			this.text = function(textContent){
				//return element's textContent
				if(textContent==undefined)
					return this.element.textContent;
				//set element's textContent
				this.element.textContent=textContent;
				return this;
			};
		
			//The setAttribute - getAttribute - removeAttribute
			this.attr = this.setAttr = function(name, value){
				//return element's attribute
				if(value==undefined)
					return this.element.getAttribute(name);
				//set element's attribute
				this.element.setAttribute(name, value);
				return this;
			}
			this.getAttr = function(name){
				//return element's attribute
				return this.element.getAttribute(name);
			}
			this.delAttr = function(name){
				//remove element's attribute
				this.element.removeAttribute(name);
				return this;
			}

		//Main element events
			
			//Event to be added
			this.addEvent = function(theEvent, toTrigger, phase){
				if(toTrigger!=undefined){
					if(phase==undefined || (phase!=false && phase!=true))phase=false;
					this.element.addEventListener(theEvent, toTrigger, phase);
				}
				return this;
			}

			//The onClick event
			this.click = function(toTrigger){
				return this.addEvent('click', toTrigger, false);;
			};
			
			//The onMouseOver event
			this.mouseover = function(toTrigger){
				return this.addEvent('mouseover', toTrigger, false);
			};

			this.mouseout = function(toTrigger){
				return this.addEvent('mouseout', toTrigger, false);
			};

		//Main element DOM positioning methods
			
			//Position the element as an appendChild of an element
			this.appendTo = function(element){
				//if element is given
				if(element){
					//Position the element
					dark_build_library.redirect(element).element.appendChild(this.element);
				}
				return this;
			};
			
			//Return parentNode
			this.parent = function(){
				return dark_build_library.redirect(this.element.parentNode);
			};

			//Position the element before an element
			this.beforeFrom = function(element){
				//if element is given
				if(element){
					//Find element
					var element = dark_build_library.redirect(element).element;
					//Position the element
					element.parentNode.insertBefore(this.element, element); 
				}
				return this;
			};
		
			//Position the element after an element
			this.afterFrom = function(element){
				//if element is given
				if(element){
					//Find element
					var element = dark_build_library.redirect(element).element;
					//Position the element
					element.parentNode.insertBefore(this.element, element.nextSibling); 
				}
				return this;
			};
			
			this.next = function(){
				var element = this.element;
				do{
					element = element.nextSibling;
				}while(element!=null && element.nodeType!=1);
				return (element!=null)?dark_build_library.redirect(element):null;
			};
			
			//Remove element
			this.remove = function(){
				if(this.element && this.element.parentNode)
					this.element.parentNode.removeChild(this.element);
			}
		
			//Add a child element
			this.addChild = function(elements){
				//if element is given
				if(elements){
					//If many childs to be added
					if(elements instanceof Array){
						//For each child
						for(var i in elements){
							//Add child
							this.element.appendChild(dark_build_library.redirect(elements[i]).element);
						}
					}else{
						//Add child
						this.element.appendChild(dark_build_library.redirect(elements).element);
					}
				}
				return this;
			}

		//Element display methods
			
			//Hide element
			this.hide = function(){
				this.element.style.display="none";
				return this;
			}

			//Show element
			this.show = function(){
				this.element.style.display="inline";
				return this;
			}
			this.showBlocked = function(){
				this.element.style.display="block";
				return this;
			}

			//Fade in-out Functions
				//Cross functions
				this.fade = {
					speed : function(speed){
						if(speed=="slow") return speed=750;
						else if(speed=="mid") return speed=500;
						else if(speed=="fast") return speed=250;
						else if(isNaN(speed)) return speed=500;
					},
					status : {
						timeout : null,
						check : function(){
							if(this.timeout!=null)
								clearTimeout(this.timeout);
						},
						time : 100
					}

				}

				//FadeIn
				this.fadeIn = function(speed, callback){
					this.fade.status.check();
					var obj=this;
					this.fade.status.timeout = setTimeout(function(){
						obj.fadeInStart(speed, callback);
					}, this.fade.status.time);
				}

				this.fadeInStart = function(speed, callback){
					this.fade.status.check();
					if(this.fade.anim && this.fade.anim.interval)
						clearInterval(this.fade.anim.interval);

					this.element.style.display="inline";
					if(this.element.style.opacity==1)
						return;
					this.element.style.opacity=0;

					speed = this.fade.speed(speed);
					if(callback==undefined)
						callback=function(){};

					var obj=this;
					this.fade.anim = dark_build_library.animate(
						function(x){ obj.element.style.opacity=x; }
					, 0, 1, speed,
						function(){ callback(); }
					);
					return this;
				}
				
				//FadeOut
				this.fadeOut = function(speed, callback){
					this.fade.status.check();
					var obj=this;
					this.fade.status.timeout = setTimeout(function(){
						obj.fadeOutStart(speed, callback);
					}, this.fade.status.time);
				}
				this.fadeOutStart = function(speed, callback){
					this.fade.status.check()
					if(this.fade.anim && this.fade.anim.interval)
						clearInterval(this.fade.anim.interval);

					if(this.element.style.opacity==0)
						return;
					this.element.style.opacity=1;

					speed = this.fade.speed(speed);
					if(callback==undefined)
						callback=function(){};

					var obj=this;
					this.fade.anim = dark_build_library.animate(
						function(x){ obj.element.style.opacity=x; }
					, 1, 0, speed,
						function(){ obj.element.style.display="none"; callback(); }
					);
					return this;
				}
		return this;
	},

	//Animation Functions
		//Main Class
			animate : function(object, from, to , time, callback){
				if(object==undefined) return;
				if(callback==undefined)callback=function(){};
				return new this.animate_Class( object, from, to , time, callback);
			},
		//animate Class
			animate_Class : function(object, from, to , time, callback){
				this.interval = null;
				this.object = object;
				this.frames = 60;
				this.step = (to-from)/time*this.frames;
				this.value = from;
				this.from = from;
				this.to = to;
				this.callback = callback;
				var anim=this;
				this.interval = setInterval( 
					function(){
						if( (anim.value>=anim.to && anim.from<anim.to) || (anim.value<=anim.to && anim.from>anim.to)){
							clearInterval(anim.interval);
							anim.object(anim.to);
							anim.callback();
							delete anim;
							return;
						}
						anim.object(anim.value);
						anim.value += anim.step;
					}
				, this.frames);
			},

	//Other functions
		//Generate random number
		rand : function(from,to,step){
			//Given parameter can not be handled
			if(from==undefined || isNaN(from) || (to!=undefined && isNaN(to) || (step!=undefined && isNaN(step))) )
				throw new Error("javascript library error\nDARK_BUILT_LIBRARY: rand() unknown parameters");

			//if some parameters are missing use default
			if(!to){
				to=from;
				from=0;
			}
			//if no step is given use default
			if(!step)step=1;

			//Random from one number
			if(step>to-from)
				return from;

			//Sent the random
			return ( Math.floor( Math.random()*( (to/step)+1 ) )*step )+from;
		},

		//Trim a string
		trim : function(str){
			return str.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"");
		},

		//Page document functions
		page : {
			//Return page width
			width : function(){
				if(document && document.body && document.body.clientWidth)
					return document.body.clientWidth;
				else if(document && document.documentElement && document.documentElement.clientWidth)
					return document.documentElement.clientWidth;
				else if(window && window.innerWidth)
					return window.innerWidth;
				else
					return 0;
			},
			//Return page height
			height : function(){
				if(document && document.body && document.body.clientHeight)
					return document.body.clientHeight;
				else if(document && document.documentElement && document.documentElement.clientHeight)
					return document.documentElement.clientHeight;
				else if(window && window.innerHeight)
					return window.innerWidth;
				else
					return 0;
			}
		}
	//END
};


var $dark = function(){
	//If js support it
	if(dark_build_library.redirect.apply){
		return dark_build_library.redirect.apply( dark_build_library, arguments);
	
	//Old js...
	}else{
		switch(arguments.lenght){
			case 0:
				return dark_build_library.redirect();
			case 2:
				return dark_build_library.redirect(arguments[0], arguments[0]);
			default:
				return dark_build_library.redirect(arguments[0]);
		}
	}
};