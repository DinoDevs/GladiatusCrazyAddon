window.forge_data = {};

var updatePreviewExtended = function(data){
	//console.log(data);
	
	var extened_preview = document.getElementById('extended_preview');
	if(!extened_preview){
		extened_preview = document.createElement('div');
		extened_preview.id = "extended_preview";
		extened_preview.innerHTML = "<div><fieldset><legend>Search</legend><div><table class='craft_item_list' style='width:100%'></table></div></fieldset></div>";
		
		var infobox = document.getElementById('forge_item_name').parentNode;
		infobox.parentNode.insertBefore(extened_preview, infobox.nextSibling);
	}
	
	var item_list = extened_preview.getElementsByClassName('craft_item_list')[0];
	
	if(data.formula && data.formula.needed && data.state=="opened"){
		item_list.innerHTML = "<tr><th></th><th>Name</th><th>Market</th><th>Packages</th></tr>";
		
		longestWord = function (string) {
			var str = string.split(" ");
			var longest = 0;
			var word = null;
			for (var i = 0; i < str.length; i++) {
				if (longest < str[i].length) {
					longest = str[i].length;
					word = str[i];
				}
			}
			return word;
		}
		var all_names = "";
		var tr, name, need, img;
		for(var i in data.formula.needed){
			name = data.formula.needed[i].name;
			img = "img/item/18_"+(i-18000)+".gif";
			need = data.formula.needed[i].amount - ((data.inStock && data.inStock[i])?data.inStock[i]:0);
			if(need>0){
				tr = document.createElement('tr');
				tr.innerHTML = "<td style='height: 35px;'><img src='"+img+"' style='margin-bottom:-10px;margin-top:-10px;'> &times;"+need+"</td><td>"+name+"</td><td style='text-align:center;'><a href='index.php?mod=market&f=18&fl=0&fq=-1&s=p&p=1&qry="+longestWord(name)+"&sh="+window.secureHash+"'>[link]</a></td><td style='text-align:center;'><a href='index.php?mod=packages&page=1&f=18&fq=-1&qry="+longestWord(name)+"&sh="+window.secureHash+"'>[link]</a></td>";
				item_list.appendChild(tr);
				all_names+=longestWord(name)+" ";
			}
			window.forge_data[img] = true;
		}
		
		tr = document.createElement('tr');
		tr.innerHTML = "<td style='height: 35px;'></td><td>All</td><td style='text-align:center;'><a href='index.php?mod=market&f=18&fl=0&fq=-1&s=p&p=1&qry="+all_names+"&sh="+window.secureHash+"'>[link]</a></td><td style='text-align:center;'><a href='index.php?mod=packages&page=1&f=18&fq=-1&qry="+all_names+"&sh="+window.secureHash+"'>[link]</a></td>";
		item_list.appendChild(tr);
	} else {
		item_list.innerHTML = "<tr><td>No data</td></tr>";
	}

}
var updatePreviewOriginal = updatePreview;
var updatePreview = function(data){
	updatePreviewOriginal(data);
	updatePreviewExtended(data);
}


setTimeout(function(){
	var slot;
	var tabs = document.getElementById('forge_nav').getElementsByTagName('div');
	for(slot = 0; slot<tabs.length; slot++){
		if((/tabActive/i).test(tabs[slot].className))
			break;
	}
	showForgeBox(slot);
}, 500);
