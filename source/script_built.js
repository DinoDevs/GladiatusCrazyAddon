/*
 * Addon Built Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_built = {
	dialog : function(){
		this.make = function(){
			var thisIsMe = this;
			this.dialog = $dark('*div').hide().addChild([
				$dark('*div').class("modal").click(function(){thisIsMe.close();}),
				$dark('*div').class("gca_dialog").addChild([
					$dark('*div').class("out").addChild([
						this.title = $dark('*div').class("title"),
						this.body = $dark('*div').class("body"),
						$dark('*div').class("footer")
					])
				])
			]).appendTo('body');
		};
		this.open = function(){
			if(this.dialog)
				this.dialog.show();
		};
		this.close = function(){
			if(this.dialog)
				this.dialog.hide();
		};
		this.make();
	},

	Modal : (function(){
		var modal = function(title, body, confirm, cancel){
			var modal = this;

			// Wrapper
			this.wrapper = document.createElement("div");
			this.wrapper.className = "gca_modal_wrapper";
			this.wrapper.style.display = "none";

			// Modal window
			this.window = document.createElement("div");
			this.window.className = "gca_modal_window";
			this.wrapper.appendChild(this.window);

			// Title
			this.head = document.createElement("div");
			this.head.className = "blackoutDialog_header";
			this.window.appendChild(this.head);
			this.head_title = document.createElement("div");
			this.head_title.className = "title";
			if(typeof title !== "undefined"){
				this.title(title);
			}
			this.head.appendChild(this.head_title);

			// Body wrapper
			this.body_wrapper = document.createElement("div");
			this.body_wrapper.className = "blackoutDialog_body";
			this.window.appendChild(this.body_wrapper);

			// Modal Icon
			this.icon = document.createElement("div");
			this.icon.className = "blackoutDialog_icon";
			this.body_wrapper.appendChild(this.icon);
			this.img = document.createElement("img");
			this.img.src = "img/ui/blackoutDialog/icon_warning.jpg";
			this.icon.appendChild(this.img);

			// Content
			this.body_content = document.createElement("div");
			this.body_content.className = "blackoutDialog_text";
			if(body){
				this.body(body);
			}
			this.body_wrapper.appendChild(this.body_content);

			var br = document.createElement("br");
			br.className = "clearfloat";
			this.body_wrapper.appendChild(br);

			// Footer
			this.footer = document.createElement("div");
			this.footer.className = "blackoutDialog_footer pngfix";
			this.window.appendChild(this.footer);

			// Background
			this.background = document.createElement("div");
			this.background.className = "gca_modal_background";
			this.wrapper.appendChild(this.background);
			this.background.addEventListener('click', function(){
				modal.cancel();
			}, false);

			document.body.appendChild(this.wrapper);

			// Modal Callbacks
			if(typeof confirm === "function"){
				this.callback_confirm = confirm;
			}
			if(typeof cancel === "function"){
				this.callback_cancel = cancel;
			}
		};

		modal.prototype.show = function(){
			this.wrapper.style.display = "block";
			return this;
		};

		modal.prototype.hide = function(){
			this.wrapper.style.display = "none";
			return this;
		};

		modal.prototype.title = function(text){
			this.head_title.textContent = text;
			return this;
		};

		modal.prototype.body = function(content){
			if(typeof content === "string"){
				var p = document.createElement("p");
				p.style.textAlign = "center";
				p.textContent = content;
				this.body_content.appendChild(p);
			}
			else{
				this.body_content.appendChild(content);
			}
			return this;
		};

		modal.prototype.button = function(text, call){
			if(typeof this.buttons_wrapper === "undefined"){
				this.buttons_wrapper = document.createElement("div");
				this.buttons_wrapper.className = "blackoutDialog_buttons";
				this.body_content.appendChild(this.buttons_wrapper);
			}

			var button = document.createElement("input");
			button.setAttribute("type", "button");
			button.className = "awesome-button big";
			button.value = text;
			this.buttons_wrapper.appendChild(button);

			if(typeof call == "boolean"){
				var that = this;
				if(call){
					button.addEventListener('click', function(){that.confirm();}, false);
				}
				else{
					button.addEventListener('click', function(){that.cancel();}, false);
				}
			}

			return button;
		}

		modal.prototype.confirm = function(confirm){
			if(typeof confirm === "function"){
				this.callback_confirm = confirm;
			}
			else{
				this.hide();
				var modal = this;
				if(typeof this.callback_confirm === "function"){
					setTimeout(function(){
						modal.callback_confirm(modal);
					}, 0);
				}
			}
			return this;
		};

		modal.prototype.cancel = function(cancel){
			if(typeof cancel === "function"){
				this.callback_cancel = cancel;
			}
			else{
				this.hide();
				var modal = this;
				if(typeof this.callback_cancel === "function"){
					setTimeout(function(){
						modal.callback_cancel(modal);
					}, 0);
				}
			}
			return this;
		};

		modal.prototype.destroy = function(){
			this.wrapper.parentNode.removeChild(this.wrapper);
			return this;
		};

		return modal;
	})()
}