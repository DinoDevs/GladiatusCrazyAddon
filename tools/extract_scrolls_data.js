

var forge_data = {
	"prefix":{/*...*/},
	"base":{/*...*/},
	"suffix":{/*...*/}
};

var base_start = function(callback) {
	var ids = [];
	for (let id in forge_data.base) {
		if (forge_data.base.hasOwnProperty(id)) {
			ids.push(id);
		}
	}
	base_step(ids, callback);
};
var base_step = function(ids, callback) {
	console.log('Base ' + ids.length);
	if (!ids.length) {
		callback();
		return;
	}
	var id = ids.shift();
	jQuery.ajax({
		type: "POST",
		url: 'ajax.php',
		data: {
			"mod":"forge",
			"submod":"getPreview",
			"slot":"1",
			"item":id,
			"prefix":"0",
			"suffix":"0",
			"a" : new Date().getTime(),
			"sh" : window.secureHash
		},
		success: function (data) {
			data = JSON.parse(data);
			var mats = {};
			for (let mat in data.formula.needed) {
				if (data.formula.needed.hasOwnProperty(mat)) {
					mats[parseInt(mat, 10) - 18000] = parseInt(data.formula.needed[mat].amount, 10);
				}
			}
			mats['l'] = data.formula.level;
			forge_data.base[id] = mats;
			base_step(ids, callback);
		},
		error: function(){
			if (!forge_data.base[id]) {
				forge_data.base[id] = null;
			}
			base_step(ids, callback);
		}
	});
}





var prefix_start = function(callback) {
	var ids = [];
	for (let id in forge_data.prefix) {
		//document.getElementById('prefix0').querySelector('[value="' + id + '"]');
		if (forge_data.prefix.hasOwnProperty(id)) {
			ids.push(id);
		}
	}
	prefix_step(ids, callback);
};
var prefix_step = function(ids, callback) {
	console.log('Prefix ' + ids.length);
	if (!ids.length) {
		callback();
		return;
	}
	var id = ids.shift();
	jQuery.ajax({
		type: "POST",
		url: 'ajax.php',
		data: {
			"mod":"forge",
			"submod":"getPreview",
			"slot":"1",
			"item":"1-1",
			"prefix":id,
			"suffix":"0",
			"a" : new Date().getTime(),
			"sh" : window.secureHash
		},
		success: function(data){
			data = JSON.parse(data);
			var mats = {};
			for (let mat in data.formula.needed) {
				if (data.formula.needed.hasOwnProperty(mat)) {
					mats[parseInt(mat, 10) - 18000] = parseInt(data.formula.needed[mat].amount, 10);
				}
			}
			delete mats[1];
			mats['l'] = data.formula.level;
			forge_data.prefix[id] = mats;
			prefix_step(ids, callback);
		},
		error: function(){
			if (!forge_data.prefix[id]) {
				forge_data.prefix[id] = null;
			}
			prefix_step(ids, callback);
		}
	});
}





var suffix_start = function(callback) {
	var ids = [];
	for (let id in forge_data.suffix) {
		if (forge_data.suffix.hasOwnProperty(id)) {
			ids.push(id);
		}
	}
	suffix_step(ids, callback);
};
var suffix_step = function(ids, callback) {
	console.log('Suffix ' + ids.length);
	if (!ids.length) {
		callback();
		return;
	}
	var id = ids.shift();
	jQuery.ajax({
		type: "POST",
		url: 'ajax.php',
		data: {
			"mod":"forge",
			"submod":"getPreview",
			"slot":"1",
			"item":"1-1",
			"prefix":"0",
			"suffix":id,
			"a" : new Date().getTime(),
			"sh" : window.secureHash
		},
		success: function(data){
			data = JSON.parse(data);
			var mats = {};
			for (let mat in data.formula.needed) {
				if (data.formula.needed.hasOwnProperty(mat)) {
					mats[parseInt(mat, 10) - 18000] = data.formula.needed[mat].amount
				}
			}
			delete mats[1];
			mats['l'] = data.formula.level;
			forge_data.suffix[id] = mats;
			suffix_step(ids, callback);
		},
		error: function(){
			if (!forge_data.suffix[id]) {
				forge_data.suffix[id] = null;
			}
			suffix_step(ids, callback);
		}
	});
}


/*
base_start(() => {
	prefix_start(() => {
		suffix_start(() => {
			console.log(JSON.stringify(forge_data));
		});
	});
});
*/


prefix_start(() => {
	suffix_start(() => {
		console.log(JSON.stringify(forge_data));
	});
});



