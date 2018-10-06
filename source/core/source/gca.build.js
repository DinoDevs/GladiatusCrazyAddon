/*
 * Addon Build Script
 * Author: DarkThanos, GreatApo
 */

// Fast Build Stuf
var gca_build = {
	dialog : class {
		constructor(){
			this.make();
		}
		make(){
			// Save this on scope
			var dialog = this;

			// Create dialog-wrapper
			this.dialogWrapper = document.createElement('div');
			this.dialogWrapper.style.display = "none";

			// Create modal bg
			var modalBg = document.createElement('div');
			modalBg.className = "modal";
			modalBg.addEventListener('click', function(){
				dialog.close();
			}, false);
			this.dialogWrapper.appendChild(modalBg);

			// Create Dialog Window
			var dialogWindow = document.createElement('div');
			dialogWindow.className = "gca_dialog";
			this.dialogWrapper.appendChild(dialogWindow);

			// Dialog Content
			var dialogContent = document.createElement('div');
			dialogContent.className = "out";
			dialogWindow.appendChild(dialogContent);

			// Dialog Title
			this.title = document.createElement('div');
			this.title.className = "title";
			dialogContent.appendChild(this.title);

			// Dialog Body
			this.body = document.createElement('div');
			this.body.className = "body";
			dialogContent.appendChild(this.body);

			// Dialog Footer
			this.footer = document.createElement('div');
			this.footer.className = "footer";
			dialogContent.appendChild(this.footer);

			document.body.appendChild(this.dialogWrapper);
		}
		smallHead(small){
			if(small){
				this.title.style.height = "28px";
				return;
			}
			this.title.style.height = "64px";
		}
		open(){
			if(this.dialogWrapper)
				this.dialogWrapper.style.display = "block";
		}
		close(){
			if(this.dialogWrapper)
				this.dialogWrapper.style.display = "none";
		}
	}
};
