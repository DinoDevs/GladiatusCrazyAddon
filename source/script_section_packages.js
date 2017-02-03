/*
 * Addon Packages Script
 * Author: DarkThanos, GreatApo
 * Copyright: all rights reserved
 */

var gca_section_packages = {
	// Default Table path
	packages_table_dom : '',

	inject : function(){
		/*
		//Set new packages to 0 (Expired packages notification feature)
		(gca_options.isOn("ENABLE_PACKAGES_EXPIRED_PACKAGES") && 
			gca_data.set('number_of_new_packages', 0 ));
		
		if( $dark('#content table[7] table[2] img[0]') ){
			// Save table DOM path
			this.packages_table_dom = '#content table[7] table[2]';

			// Load new layout
			if( gca_options.isOn("ENABLE_PACKAGES_NEW_LAYOUT") )
				eval( gca_data.get('packages_code','this.premium();') );
			
			// Load collect gold button
			if( gca_options.isOn("ENABLE_PACKAGES_COLLECT_GOLD_BUTTON") )
				this.goldManagment.inject();
		}

		// s201 - next update
		else if( $dark('fieldset[0]') && $dark('#content table[7] table[4] img[0]') ){
			// Fix UI a little
			$dark('#content form[1]').parent().parent().css("display:none;");
			$dark('#content form[1]').afterFrom('#content form[2]');
			// Save table DOM path
			this.packages_table_dom = '#content table[7] table[3]';

			// Load new layout
			if( gca_options.isOn("ENABLE_PACKAGES_NEW_LAYOUT") )
				eval( gca_data.get('packages_code','this.premium();') );
			
			// Load collect gold button
			if( gca_options.isOn("ENABLE_PACKAGES_COLLECT_GOLD_BUTTON") )
				this.goldManagment.inject();
		}
		*/
	},
	injectStorage : function(x){
		if(x==true){
			gca_section_merchants.onmoveInject=true;
			// Managment
			var gca_merchands_onmoveRun = function(){
				for(var i=0;i<this.functions.length;i++)
					this.functions[i]();
			}
			// Inject
			$dark('*script').html('if(typeof gca_merchands_onmove=="undefined")var gca_merchands_onmove={functions:[],run:'+gca_merchands_onmoveRun+'}').appendTo('body');
		}else{
			gca_section_merchants.define_gca_merchands_onmove();
		}
		
		/* Built div */
		$dark("#inv").parent().DOM().style.cssFloat = "right";
		$dark("#inv").parent().DOM().style.background = "none";
		$dark("#inv").parent().DOM().style.width = "305px";
		$dark("#inv").parent().DOM().style.padding = "0px 0px 10px 0px";
		$dark("#inv").parent().DOM().className = "";
		$dark("#inv").parent().parent().DOM().style.background = "none";
		$dark("#inv").parent().parent().parent().DOM().style.padding = "0";

		$dark("*div").class("contentItem").css('width: 183px;float:left;margin: 6px 0px 0px 0px;').addChild([
			$dark("*h3").css('width:159px;').html(gca_locale.get('storage_info')),
			$dark("*div").class("contentItem_content gca_packages_info_box").css('width: 177px;padding:2px;height: 123px;overflow:hidden;').addChild([
				$dark("*table").css('width:100%').addChild([
					$dark("*tr").addChild([
						$dark("*td").css('text-align:left;').html( '<table><tr><td>'+gca_locale.get('number_of_items')+' :</td><td><b><span id="gca_inv_items">0</span>/48</b></td></tr></table>')
					]),
					$dark("*tr").addChild([
						$dark("*td").css('text-align:left;').html( '<table><tr><td>'+gca_locale.get('value')+' :</td><td><b><span id="gca_inv_gold">0</span></b>&nbsp;<img src="img/res2.gif" align="absmiddle"/></td></tr></table>')
					]),
					$dark("*tr").addChild([
						$dark("*td").css('text-align:left;border-top: 1px solid #BBA86E;padding-top: 8px;').html( '<table><tr><td>'+gca_locale.get('number_of_items')+' :</td><td><b><span id="gca_packages_items">0</span></b></td></tr></table>')
					]),
					$dark("*tr").addChild([
						$dark("*td").css('text-align:left;').html( '<table><tr><td>'+gca_locale.get('value')+' :</td><td><b><span id="gca_packages_gold">0</span></b>&nbsp;<img src="img/res2.gif" align="absmiddle"/></td></tr></table>')
					]),
					$dark("*tr").addChild([
						$dark("*td").css('text-align:left;').html( '<table><tr><td>'+$dark('#icon_gold').attr('onmouseover').match(/>([^<]+)<\/td/i)[1]+' :</td><td><b><span id="gca_packages_goldonly">0</span></b>&nbsp;<img src="img/res2.gif" align="absmiddle"/></td></tr></table>')
					])
				])
			])
		]).beforeFrom( $dark("#inv").parent() );
		
		var gca_packages_infos = function(){
			var invItems = document.getElementById('inv').getElementsByTagName('img');
			document.getElementById('gca_inv_items').innerHTML = invItems.length;
			
			var gold=0;
			for(var i=0;i<invItems.length;i++){
				var id=invItems[i].parentNode.id;
				gold+=parseInt( dd.elements[id].tooltip.replace(/\./g,"").match(/(\d+) <img src=.\d*\/img\/res2/i)[1] );
			}
			document.getElementById('gca_inv_gold').innerHTML = formatZahl(gold);
			
			if(document.getElementById('packages_darkmod'))
				var packItems = document.getElementById('packages_darkmod').getElementsByTagName('img');
			else
				var packItems = document.getElementById('inv').parentNode.parentNode.parentNode.parentNode.getElementsByTagName('tr')[2].getElementsByTagName('img');
			
			var gold=0;
			var goldOnly=0;
			var goldLen=0;
			for(var i=0;i<packItems.length;i++){
				var id=packItems[i].parentNode.id.replace('window',"_");
				if(packItems[i].src.match("14_1.gif")){
					goldOnly+=parseInt( dd.elements[id].tooltip.replace(/\./g,"").match(/>(\d+)/i)[1] );
					goldLen++;
				}else
					gold+=parseInt( dd.elements[id].tooltip.replace(/\./g,"").match(/(\d+) <img src=.\d*\/img\/res2/i)[1] );
			}
			document.getElementById('gca_packages_gold').innerHTML = formatZahl(gold);
			document.getElementById('gca_packages_goldonly').innerHTML = formatZahl(goldOnly);
			document.getElementById('gca_packages_items').innerHTML = packItems.length-goldLen;
		}
		
		gca_section_merchants.onmoveEvent_inject_and_run(gca_packages_infos);
	},
	fixDD : function(){
		$dark('*script').html("if(tt_Init)tt_Init(true);\nif(dd && dd.recalc)dd.recalc();\nif(dd && dd.improve)dd.improve.injectAllItems();").appendTo('body');
	},
	collectData : function(){
		//Define variable
		var dark={
			packages:{}
		};

		//Packages' images collection
		var itemImages = $dark(this.packages_table_dom+' img');

		//For every package on this page
		for(var i=0;i<itemImages.length;i++){
			//Get packages id
			var id = itemImages[i].parentNode.id.match(/paket_(\d+)/i)[1]
			//Get packeges image
			var image = itemImages[i].src;
			//Store data
			dark.packages[id] = {'img':image}
		}

		//Pass data on document
		$dark('*script').html("var dark = "+JSON.stringify(dark)+";").appendTo('body');
		
		//Get pages data
		if( !$dark('#content .paging_numbers_current[0]') ){
			this.page = 1;
			this.pages = new Array();
			return;
		}
		//This page number
		this.page = $dark('#content .paging_numbers_current[0]').html().match(/\d+/i);
		//Other pages collection
		var otherPages = $dark('#content .paging_numbers[0] a');
		//pages array
		this.pages = new Array();
		//Fill array
		if(otherPages.length>0){
			var lastPage = otherPages[otherPages.length-1].textContent.match(/(\d+)/i)[1];
			while(lastPage>0){
				if(lastPage!=this.page)
					this.pages.push(lastPage);
				lastPage--;
			}
		}
		this.fixDD();
	},
	applyNewLayout : function(){
		//Current Page
		var tab = this.page;
		// Insert more data on Gameforge's page infos
		if( $dark('#content table[7] .title_inner[0] div[0]') ){
			var box = $dark('#content table[7] .title_inner[0] div[0]');
			box.html( box.html().replace(':', '('+tab+'):') );
		}

		//Set the table
		$dark('*div').id('packages_darkmod').appendTo( $dark(this.packages_table_dom).parent() );

		//this Page items DARK_MOD
			//Packages' images collection
			var itemImages = $dark(this.packages_table_dom+' img');
			var len = itemImages.length;

			$dark('*div').id('package_darkmod_page_'+tab).class('package_darkmod_page').attr('page', tab).addChild(
				$dark('*div').class('package_darkmod_page_info').text(tab)
			).appendTo('#packages_darkmod');
		
			//For every package on this page
			for(var i=0;i<len;i++){
				//Set parent
				var parent = itemImages[0].parentNode.parentNode.parentNode;
				//Get info
				var info = $dark().trim(parent.getElementsByTagName('span')[0].innerHTML).replace(/<a[^>]+>[^>]+>/g,"").replace(/(\s+<br>\s+|<br>\s+|\s+<br>)/g,"|").replace(/\|\|/g,"|").split('|');
				//Get packages id
				var id = itemImages[0].parentNode.id.match(/paket_(\d+)/i)[1];

				//Built layout
				$dark('*div').class('package_darkmod_pack').addChild([
					$dark('*div').class('info').tooltip([info[0],info[1],info[2],info[3]],["lime",false,"orange"]).html(info[0].replace(/\s+.+/,'...')),
					$dark('*div').class('item').addChild(itemImages[0].parentNode.parentNode),
					$dark('*div').class('delete').addChild(parent.getElementsByTagName('a')[0])
				]).appendTo('#package_darkmod_page_'+tab);
				
			}
			$dark('*div').css('clear:both;').afterFrom('#packages_darkmod');

		//Clear old
		$dark(this.packages_table_dom).remove();

		// Load option
		var packagePagesPerPage = parseInt(gca_options.load("PACKAGES_MAX_PAGES_TO_LOAD"));
		// Load All pages
		if(packagePagesPerPage==0){
			while(this.pages.length>0)
				this.loadNewPage();
			
			//Hide pagging
			if($dark('.paging[0]'))
				$dark('.paging[0]').parent().parent().hide();

		}else{
		// Load some pages
			var pagesLen = this.pages.length+1;
			var currentPage = parseInt(this.page[0]);

			// Remake pages to load
			/*
			this.pages = new Array();
			for(var i=currentPage+1; i<=currentPage+packagePagesPerPage-1 && i<=pagesLen; i++){
				this.pages.push(i);
			}
			this.pages.reverse();
			*/
			this.pages = new Array();
			var first_in_page = ((Math.ceil(currentPage/packagePagesPerPage)-1)*packagePagesPerPage)+1;
			for(var i=first_in_page; i<=first_in_page+packagePagesPerPage-1 && i<=pagesLen; i++){
				if(i!=currentPage)
					this.pages.push(i);
			}
			this.pages.reverse();

			// Now load pages
			for(var i=1; i<packagePagesPerPage && this.pages.length>0; i++)
				this.loadNewPage();

			// Fix paging
			if( pagesLen>packagePagesPerPage && packagePagesPerPage!=1 && $dark('.paging[0]')){
				var newPagesLen = Math.ceil(pagesLen/packagePagesPerPage);
				var invIndex = 0;
				while($dark('#inventory_nav a['+invIndex+']') && !(/(^|\s+)current(\s+|$)/).test($dark('#inventory_nav a['+invIndex+']').class())){
					invIndex++;
				}
				
				// Find Last page and packet url
				var packages_url = '';
				var last_packet_page = 0;
				if($dark('#content .paging_right_full[0]')){
					packages_url = $dark('#content .paging_right_full[0]').href().replace('&amp;','&');
					last_packet_page = parseInt(packages_url.match(/&page=(\d+)/i)[1]);
					packages_url = packages_url.replace('&page='+last_packet_page, '');
				}else{
					packages_url = $dark('#content .paging_left_full[0]').href().replace('&amp;','&');
					last_packet_page = parseInt($dark('#content .paging_numbers_current[0]').html());
					packages_url = packages_url.replace('&page=1', '');
				}

				// Clear old paging
				$dark('.paging_numbers[0]').html("");
/*
//old crap code
				// if too many pages
				if(newPagesLen>8){
					for(var i=0; i<6; i++){
						if( (i*packagePagesPerPage+1)<=currentPage && ((i+1)*packagePagesPerPage+1)>currentPage ){
							$dark('.paging_numbers[0]').addChild(
								$dark('*span').class("paging_numbers_current").html(i+1)
							);
						}else{
							$dark('.paging_numbers[0]').addChild(
								$dark('*a').href("index.php?mod=packages&inv="+invIndex+"&sh="+gca_section.sh+"&page="+(i*packagePagesPerPage+1)).html(i+1)
							);
						}
					}
					$dark('.paging_numbers[0]').addChild( $dark('*span').html("...") );
					$dark('.paging_numbers[0]').addChild(
						$dark('*a').href("index.php?mod=packages&inv="+invIndex+"&sh="+gca_section.sh+"&page="+((newPagesLen-1)*packagePagesPerPage+1)).html(newPagesLen)
					);

				// if not many pages
				}else{
					for(var i=0; i<newPagesLen; i++){
						if( (i*packagePagesPerPage+1)<=currentPage && ((i+1)*packagePagesPerPage+1)>currentPage ){
							$dark('.paging_numbers[0]').addChild(
								$dark('*span').class("paging_numbers_current").html(i+1)
							);
						}else{
							$dark('.paging_numbers[0]').addChild(
								$dark('*a').href("index.php?mod=packages&inv="+invIndex+"&sh="+gca_section.sh+"&page="+(i*packagePagesPerPage+1)).html(i+1)
							);
						}
					}
				}
				*/
				
				/* // GreatApo's meshed up code
				// Create Pages links
					var slots = 9;
					var currentPageConv = ((currentPage - currentPage % packagePagesPerPage) / packagePagesPerPage) + 1;
					var pagesLenConv = ((pagesLen - pagesLen % packagePagesPerPage) / packagePagesPerPage) + 1;
					if(currentPageConv > pagesLenConv - 1)
						currentPageConv = pagesLenConv - 1;
					_alert(currentPageConv);
					var lastPagesFix = ((pagesLenConv - currentPageConv) < 5)?5 - (pagesLenConv - currentPageConv):0;
					var page_number = (currentPageConv - 4 - lastPagesFix > 0)?currentPageConv - 4 - lastPagesFix:1;
					if(page_number > 1)
						$dark('.paging_numbers[0]').addChild( $dark('*span').html("...") );
					
					// Link
					if($dark(".paging_right_step[0]"))
						var link=$dark('.paging_right_step[0]').attr('href').replace(/page=\d+/,"");
					else
						var link=$dark('.paging_left_step[0]').attr('href').replace(/page=\d+/,"");
					
					// Create pages links
					while (slots>0 && page_number<pagesLenConv){
						if(page_number!=currentPageConv){
							$dark('.paging_numbers[0]').addChild(
								$dark('*a').href(link+"page="+((page_number-1)*packagePagesPerPage+1)).html(page_number)
							);
						}else{
							$dark('.paging_numbers[0]').addChild(
								$dark('*span').class("paging_numbers_current").html(page_number)
							);
						}
						page_number++;
						slots--;
					}
					
					if(page_number<pagesLenConv)
						$dark('.paging_numbers[0]').addChild( $dark('*span').html("...") );

				// Quick change buttons
				// <<-- go to start
				if( $dark(".paging_left_full[0]") && currentPage<=packagePagesPerPage ){
					$dark(".paging_left_full[0]").hide();
				}
				// <-- go one page back
				if( $dark(".paging_left_step[0]") ){
					if( currentPage<=packagePagesPerPage )
						$dark(".paging_left_step[0]").hide();
					else{
						$dark(".paging_left_step[0]").href($dark('.paging_left_step[0]').attr('href').replace(/page=\d+/,"page="+((Math.floor(currentPage/packagePagesPerPage)-1)*packagePagesPerPage+1)));
						//$dark(".paging_left_step[0]").href("index.php?mod=packages&inv="+invIndex+"&sh="+gca_section.sh+"&page="+((Math.floor(currentPage/packagePagesPerPage)-1)*packagePagesPerPage+1));
					}
				}
				// --> go one page forward
				if( $dark(".paging_right_step[0]") ){
					if( currentPage>pagesLen-packagePagesPerPage )
						$dark(".paging_right_step[0]").hide();
					else
						$dark(".paging_right_step[0]").href($dark('.paging_right_step[0]').attr('href').replace(/page=\d+/,"page="+((Math.floor(currentPage/packagePagesPerPage)+1)*packagePagesPerPage+1)));
						//$dark(".paging_right_step[0]").href("index.php?mod=packages&inv="+invIndex+"&sh="+gca_section.sh+"&page="+((Math.floor(currentPage/packagePagesPerPage)+1)*packagePagesPerPage+1));
				}
				// -->> go to end
				if( $dark(".paging_right_full[0]") ){
					if( currentPage>pagesLen-packagePagesPerPage )
						$dark(".paging_right_full[0]").hide();
					else
						$dark(".paging_right_full[0]").href($dark('.paging_right_full[0]').attr('href').replace(/page=\d+/,"page="+(pagesLen-packagePagesPerPage+1)));
						//$dark(".paging_right_full[0]").href("index.php?mod=packages&inv="+invIndex+"&sh="+gca_section.sh+"&page="+(pagesLen-(pagesLen%packagePagesPerPage)+1));
				}
				*/


				// Paginator Code
					var slots = 9;
					var current_virtual_page = Math.ceil(currentPage/packagePagesPerPage);
					var last_virtual_page = Math.ceil(last_packet_page/packagePagesPerPage);

					// Just make the array of int around courent page
					virtual_pages = [];
					for(var i=current_virtual_page-((slots-1)/2); i<=current_virtual_page+((slots-1)/2); i++){
						virtual_pages.push(i);
					}
					// Shift array to 0 if it begins with <=0
					if(virtual_pages[0] <= 0){
						var increase = Math.abs(virtual_pages[0]) + 1;
						for (var i=0; i<virtual_pages.length; i++){
							virtual_pages[i] += increase;
						};
					}
					// Remove out of length pages and insert infrond
					for(var i=virtual_pages.length-1; i>=0; i--){
						if(virtual_pages[i]>last_virtual_page){
							virtual_pages.pop();
							if(virtual_pages[0]>1){
								var insert = virtual_pages[0]-1;
								virtual_pages.unshift(insert);
								i++;
							}
						}
					};

				// Create page links
					// If more on the frond
					if(virtual_pages[0] != 1){
						$dark('.paging_numbers[0]').addChild( $dark('*span').html("...") );
					}
					// Create Links
					for(var i=0; i<virtual_pages.length; i++){
						if(virtual_pages[i] != current_virtual_page){
							$dark('.paging_numbers[0]').addChild(
								$dark('*a').href(packages_url + "&page="+((virtual_pages[i]-1)*packagePagesPerPage+1)).html(virtual_pages[i])
							);
						}else{
							$dark('.paging_numbers[0]').addChild(
								$dark('*span').class("paging_numbers_current").style('border: 1px solid #513F2C;margin: 0px;padding: 0 5px;border-radius: 5px;').html(virtual_pages[i])
							);
						}
					};
					// If more on the end
					if(virtual_pages[virtual_pages.length-1] < last_virtual_page){
						$dark('.paging_numbers[0]').addChild( $dark('*span').html("...") );
					}

				// Quick change buttons
					// <<-- go to start
					if( $dark(".paging_left_full[0]") && current_virtual_page == 1 ){
						$dark(".paging_left_full[0]").hide();
					}
					// <-- go one page back
					if( $dark(".paging_left_step[0]") ){
						if( current_virtual_page == 1 )
							$dark(".paging_left_step[0]").hide();
						else{
							$dark(".paging_left_step[0]").href( packages_url + "&page="+((current_virtual_page-2)*packagePagesPerPage+1) );
						}
					}
					// --> go one page forward
					if( $dark(".paging_right_step[0]") ){
						if( current_virtual_page == last_virtual_page )
							$dark(".paging_right_step[0]").hide();
						else
							$dark(".paging_right_step[0]").href( packages_url + "&page="+(current_virtual_page*packagePagesPerPage+1) );
					}
					// -->> go to end
					if( $dark(".paging_right_full[0]") ){
						if( current_virtual_page == last_virtual_page )
							$dark(".paging_right_full[0]").hide();
						else
							$dark(".paging_right_full[0]").href( packages_url + "&page="+((last_virtual_page-1)*packagePagesPerPage+1) );
					}

			}else{
				//Hide pagging
				if($dark('.paging[0]') && packagePagesPerPage!=1)
					$dark('.paging[0]').parent().parent().hide();
			}
		}
		
		this.fixDD();
	},
	loadNewPage : function(){
		if(!this.pages || this.pages.length==0)
			return;

		var newTab = this.pages.pop();
		var thisIsMe = this;

		var place = $dark('*div').id('package_darkmod_page_'+newTab).class('package_darkmod_page unload').attr('page', newTab).addChild(
			$dark('*div').class('package_darkmod_page_info').text(newTab)
		);

		// If it is to be inserted before
		if(newTab<this.page[0]){
			place.beforeFrom('#package_darkmod_page_'+this.page[0]);
		}else{
			place.appendTo('#packages_darkmod');
		}
		
		
		var next_url = '';
		if($dark('.paging_right_step[0]'))
			next_url = $dark('.paging_right_step[0]').attr('href').replace(/page=\d+/,"page="+newTab);
		else
			next_url = $dark('.paging_left_step[0]').attr('href').replace(/page=\d+/,"page="+newTab);
		
		xmlHttpRequest({
			url : next_url, //getPage.link({"mod":"packages","inv":"0","page":newTab}),
			method : "GET",
			onload : function(content){
				var doc = $dark('*div').html(content).element;
				var img = doc.getElementsByTagName("img");
				var len=img.length;

				var tooltips = new Array();
				var ids = new Array();

				//Packages' images collection
				var itemImages=new Array();
				for(var i=0;i<len;i++)
					if(img[i].parentNode.id.match(/paket_/i))
						itemImages.push(img[i]);

				var len = itemImages.length;

				//For every package on this page
				for(var i=0;i<len;i++){
					//Set parent
					var parent = itemImages[i].parentNode.parentNode.parentNode;
					//Get info
					var info = $dark().trim(parent.getElementsByTagName('span')[0].innerHTML).replace(/<a[^>]+>[^>]+>/g,"").replace(/(\s+<br>\s+|<br>\s+|\s+<br>)/g,"|").replace(/\|\|/g,"|").split('|');
					//Get packages id
					var id = itemImages[i].parentNode.id.match(/paket_(\d+)/i)[1];

					$dark('*script').html("dark.packages['"+id+"']={'img':'"+itemImages[i].src+"'}").appendTo('body');

					if(content.match(/AddCharDiv\("paket_[^\]]+\]\)/g)){
						tooltips.push( content.match(/AddCharDiv\("paket_[^\]]+\]\)/g)[i] );
					}else{
						tooltips.push("AddCharDiv(\"paket_"+id+"\", 0, 0, 0, 0, 0, 0, "+id+", 0, 0, 0, 0, 0, 0, 0, 0, \"<table cellspacing=2 cellpadding=2 valign=middle class=\'tooltipBox\'><tr><td style=\'color:white; font-weight: bold; font-size:9pt\' colspan=\'2\' nowrap=\'nowrap\'>Error</td></tr><tr><td style=\'color:white; font-weight: bold; font-size:9pt\' colspan=\'2\' nowrap=\'nowrap\'>On data load</td></tr><tr><td style=\'color:grey; font-size:9pt\' colspan=\'2\' nowrap=\'nowrap\'>Better don't move this item</td></tr></table>\", [ ]);");
					}
					ids.push(id);

					$dark('#package_darkmod_page_'+newTab).class('package_darkmod_page');
					//Built layout
					$dark('*div').class('package_darkmod_pack').addChild([
						$dark('*div').class('info').tooltip([info[0],info[1],info[2],info[3]],["lime",false,"orange"]).html(info[0].replace(/\s+.+/,'...')),
						$dark('*div').class('item').addChild(itemImages[i].parentNode.parentNode),
						$dark('*div').class('delete').addChild(parent.getElementsByTagName('a')[0])
					]).appendTo('#package_darkmod_page_'+newTab);	
				}
				if(len>0){
					for(var i=0;i<len;i++){
						$dark('*script').html(
							'ADD_DHTML("paket_'+ids[i]+'");\n'+
							'aElts.push(dd.elements.paket_'+ids[i]+');\n'+
							tooltips[i]+";\n"
						).appendTo('body');
					}
					$dark('*script').html("changeShow();\ntt_Init(true);\ndd.recalc();").appendTo('body');
					$dark('*script').html("if(typeof gca_merchands_onmove!='undefined')gca_merchands_onmove.run();").appendTo('body');
				}
				gca_section_packages.fixDD();
			}
		});
	},
	functionsOverride : {
		removeGold : function(id){
			if(id.match(/p51(2|3|4|5|6)_/g) && document.getElementById(id) && dd.elements[id] && document.getElementById(id).getElementsByTagName("img")[0]) {
				var b = dd.elements[id].tooltip.replace(/\.+/g, "").match(/>(\d+)/i)[1];
				try{
					var c = document.getElementById("sstat_gold_val").innerHTML.replace(/\./g, ""), d = parseInt(b) + parseInt(c);
					pling.currency(b, 0, dd.elements[id].x - dd.elements[id].cssx / 2, dd.elements[id].y);
					document.getElementById("sstat_gold_val").innerHTML = formatZahl(d)
				}catch(e){}
				document.getElementById(id).style.visibility = "hidden";
				document.getElementById(id).removeChild(document.getElementById(id).getElementsByTagName("img")[0]);
				dd.elements[id].contentsize = 0;
				dd.elements[id].contentsizebase = 0;
				dd.elements[id].contenttype = 0;
				dd.elements[id].cssx = 0;
				dd.elements[id].cssy = 0;
				dd.elements[id].iid = 0;
				dd.elements[id].level = 0;
				dd.elements[id].preis = 0;
				dd.elements[id].tooltip = "";
				dd.elements[id].visible = !1;
				changeShow();
				tt_Init(!0);
				changeDraggable(!0);
				dd.recalc()
			}
		},
		sendRequest : function(e, f, a, b, g, h, j){
			a = a + "&a=" + (new Date).getTime();
			a = a + "&sh=" + secureHash;
			if("undefined" != typeof b){
				if(null != $(b)) {
					var c = {}, d = {};
					"undefined" != typeof h && (c["class"] = h);
					"undefined" != typeof j && (d["class"] = j);
					var k = "undefined" != typeof g ? new Spinner(b, {"class":g, img:c, content:d}) : new Spinner(b, {img:c, content:d});
					(new Request({method:e, url:f, data:a, onRequest:k.show(), onComplete:function(a) {
						k.hide();
						eval(a);
						gca_merchands_onmove.run();
					}, onFailure:function() {
						"undefined" != typeof HostApp && HostApp.ShowNoConnectionScreen()
					}})).send()
				}
			}else{
				(new Request({method:e, url:f, data:a, onComplete:function(response){
					if(0 <= response.indexOf("document.location.href")){
						try{
							var id = a.match(/pid=(\d+)/)[1], paket = "paketWindow" + id, inv_slot = a.match(/new=(p\d+_\d_\d)/)[1];
							if(document.getElementById(paket) && document.getElementById(inv_slot) && dark.packages[id + ""]) {
								var itemImage = document.createElement("img");
								itemImage.src = dark.packages[id + ""].img;
								itemImage.setAttribute("style", "bottom:0px");
								document.getElementById(inv_slot).appendChild(itemImage);
								document.getElementById(paket).parentNode.parentNode.className += " moved";
								dark.packages[id + ""].img.match(/14_1\.gif/g) && dark.removeGold(inv_slot)
							}else{eval(response)}
						}catch(e){
							eval(response)
						}
					}
					gca_merchands_onmove.run();
				}, onFailure:function() {
					"undefined" != typeof HostApp && HostApp.ShowNoConnectionScreen()
				}})).send()
			}
		}
	},
	overridePackageFunction : function(){
		$dark('*script').html("dark.removeGold="+this.functionsOverride.removeGold).appendTo('body');
		$dark('*script').html("sendRequest="+this.functionsOverride.sendRequest).appendTo('body');
	},
	premium : function(){
		$dark('#content').addChild(
			$dark('*div').class('contentItem').css('margin-top:10px;').addChild([
				$dark('*h3').html('GCA Premium'),
				$dark('*div').class('contentItem_content').html('<center>Get Gladiatus Cracy Addon <a href="http://gladiatuscrazyaddon.tk/index.php?mode=donate" target="_blank">Premium</a> to enable the <i>Advanced Packages Interface</i> !<br/>Manage your packages faster and easier! Browser, move, delete and more!! This is now possible using GCA Premium!<br/><br/><a href="http://gladiatuscrazyaddon.tk/index.php?mode=donate" target="_blank"><img src="http://gladiatuscrazyaddon.tk/images/prem_packages.jpg"/></a><br/><br/>Browse as many items as you want in 1 page! <br/><br/>Grap your <b>FREE</b> Premium Key from <a href="http://gladiatuscrazyaddon.tk/index.php?mode=donate" target="_blank">here</a>.</center><br/>')
			])
		);
	},

	goldManagment : {
		inject : function(){
			// Build ui
			this.buildManagerUI();
		},
		buildManagerUI : function(){
			//Get this page No
			if(document.location.href.match(/&page=(\d+)/)){
				var this_page = document.location.href.match(/&page=(\d+)/)[1];
			}else{
				var this_page = 1;
			}
		
			// Build manager html ui
			var tableRow = $dark('*tr').addChild([
				$dark('*td').setAttr('colspan', '3').addChild([
					$dark('*div').class('title_box').css('margin-top: 30px;').addChild([
						$dark('*div').class('title_inner').css('padding:3px;font-weight: normal;').addChild([
							$dark('*div').css('width:479px;height: 22px;').addChild([
								$dark('*span').id('packages_gold_percent').css('float: left;width: 60px;').html('0%'),
								$dark('*span').id('packages_gold_ratio').css('float: left;').html('-/-'),
								$dark('*span').id('packages_gold_icon').css('float: right;').html('<img src="img/res2.gif" style="margin-left:2px;margin-top:4px;">'),
								$dark('*span').id('packages_gold_status').css('float: right;').html('0')
							]),
							$dark('*div').css('width:479px;height: 4px;border:1px solid #371000;background:#222;margin-bottom: 3px;').addChild([
								$dark('*div').id('packages_gold_bar').css('width:0%;height: 6px;margin-top:-1px;background-image:url(img/energie_gelb.gif);')
							]),
							$dark('*div').css('width:100%').addChild([
								$dark('*form').name('packages_gold_form').addChild([
									$dark('*div').css('width:33%;float:left;').addChild([
										$dark('*input').type('radio').name('gold_pages_group').value('all').id('all_pages_ratio').setAttr('checked','checked'),
										$dark('*label').setAttr('for','all_pages_ratio').html( gca_locale.get('all_pages') )
									]),
									$dark('*div').css('width:33%;float:left;').addChild([
										$dark('*input').type('radio').name('gold_pages_group').value('some').id('specific_pages_ratio'),
										$dark('*label').setAttr('for','specific_pages_ratio').html( gca_locale.get('specific_pages') )
									]),
									$dark('*div').css('width:33%;float:left;').addChild([
										$dark('*input').type('radio').name('gold_pages_group').value('this').id('this_page_ratio'),
										$dark('*label').setAttr('for','this_page_ratio').html( gca_locale.get('this_page')+' ('+this_page+')' )
									]),
									$dark('*div').css('width:50%;float:left;').addChild([
										$dark('*input').type('radio').name('collect_type_group').value('all').id('calculate_gold_ratio'),
										$dark('*label').setAttr('for','calculate_gold_ratio').html( gca_locale.get('calculate_gold') )
									]),
									$dark('*div').css('width:50%;float:left;').addChild([
										$dark('*input').type('radio').name('collect_type_group').value('some').id('calculate_values_ratio').setAttr('checked','checked'),
										$dark('*label').setAttr('for','calculate_values_ratio').html( gca_locale.get('calculate_item_values') )
									]),
									$dark('*div').css('clear:both;').addChild([
										$dark('*span').html( gca_locale.get('specific_pages')+': '),
										$dark('*input').type('text').value('1-3').id('specific_pages_input'),
										$dark('*span').html('(ex. 2-5)')
									])
								])
							]),
							$dark('*div').css('width:100%').addChild([
								$dark('*hr').setAttr('color','#bba86e').css('margin-bottom: 3px;'),
								$dark('*input').type('button').value( gca_locale.get('calculate') ).class('button1').click(function(){gca_section_packages.goldManagment.count_gold();}),
								$dark('*span').css('float:right;').html( '(<span id="packages_gold_found">0</span>)' ),
								$dark('*input').type('checkbox').name('collect_gold_checkbox').css('float:right;').id('collect_gold_checkbox'),
								$dark('*label').setAttr('for','collect_gold_checkbox').css('float:right;').html( gca_locale.get('collect_gold') )
							])
						])
					])
				])
			]);
			
			// Place it
			if($dark('#content table[7] tbody[0]')) tableRow.appendTo('#content table[7] tbody[0]');
			else tableRow.appendTo('#content table[7]');
			
		},
		count_gold : function(){
			//0 the previous results
			document.getElementById('packages_gold_status').innerHTML = 0;
			
			//All pages
			if($dark('#all_pages_ratio').element.checked){
				var first_page = 1;
				if($dark('#content .paging_right_full')){
					var last_page = $dark('#content .paging_right_full[0]').attr('href').match(/&page=(\d+)/)[1];
				}else{
					var last_page = 1;
				}
			//Specific pages
			}else if($dark('#specific_pages_ratio').element.checked){
				if($dark('#specific_pages_input').value().match(/\d+-\d+/)){
					var first_page = $dark('#specific_pages_input').value().match(/(\d+)-\d+/)[1];
					var last_page = $dark('#specific_pages_input').value().match(/\d+-(\d+)/)[1];
				}else{
					return;
				}
			//This page
			}else{
				if(document.location.href.match(/&page=(\d+)/)){
					var this_page = document.location.href.match(/&page=(\d+)/)[1];
				}else{
					var this_page = 1;
				}
				var first_page = this_page;
				var last_page = this_page;
			}
			
			//Show loaded pages
			var number_of_pages = last_page-first_page+1;
			$dark('#packages_gold_ratio').html('0/'+number_of_pages);
			
			var gold_found = 0;
			
			for(var i=first_page;i<=last_page;i++){
				//Get i page
				xmlHttpRequest({
					url : getPage.link({"mod":"packages","page":i}),
					method : "GET",
					onload : function(content){
						var doc = $dark('*div').html(content).element;
						
						for(var i = 0; i<doc.innerHTML.match(/AddCharDiv\("paket_\w+.*?\/table/g).length;i++) {
							try{
								var txt=doc.innerHTML.match(/AddCharDiv\("paket_\w+.*?\/table/g)[i];
								if(txt.match(/<img/g) && !$dark('#calculate_gold_ratio').element.checked){//Calculate item packages
									var value=doc.innerHTML.match(/AddCharDiv\("paket_\w+.*?\/table/g)[i].match(/>([^<]+)<img/i)[1].replace(/\./g,'').match(/(\d+)/i)[1];
								}else if(txt.match(/>\d+[^<]+</i)){//Calculate gold packages
									var value=txt.match(/>(\d+[^<]+)</i)[1].replace(/\./g,'').match(/(\d+)/i)[1];
									
									if($dark('#collect_gold_checkbox').element.checked){
										var data = 'pid='+ doc.innerHTML.match(/AddCharDiv\("paket_\d+/g)[i].replace("AddCharDiv(\"paket_","") +'&a='+ new Date().getTime() +'&sh='+ gca_section.sh;
										gold_found++;
										/*Make request*/
										xmlHttpRequest({
											url : 'ajax/paketswap.php?'+data,
											method : "GET",
											onload : function(content){
												document.getElementById('packages_gold_found').innerHTML = parseInt(document.getElementById('packages_gold_found').innerHTML)+1;
												if( parseInt(document.getElementById('packages_gold_found').innerHTML) == gold_found ){
													document.location.href=document.location.href;
												}
											}
										});
									}
									
								}else{var value=0;}
								//Show calculated gold
								document.getElementById('packages_gold_status').innerHTML = subFuncts.strings.insertDots( parseInt(document.getElementById('packages_gold_status').innerHTML.replace(/\./g,'')) + parseInt(value) );
							}catch(err){var value=0;}
						}
						
						var loaded_pages = parseInt($dark('#packages_gold_ratio').html().match(/(\d+)\/\d+/)[1])+1;
						var number_of_pages = parseInt($dark('#packages_gold_ratio').html().match(/\d+\/(\d+)/)[1]);
						$dark('#packages_gold_ratio').html(loaded_pages+'/'+number_of_pages);
						$dark('#packages_gold_percent').html( Math.round(loaded_pages/number_of_pages*100) +'%');
						$dark('#packages_gold_bar').css( 'width:'+$dark('#packages_gold_percent').html()+';height: 6px;margin-top:-1px;background-image:url(img/energie_gelb.gif);' );
					}
				});
			}
		}
	}
}