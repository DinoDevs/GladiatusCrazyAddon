/*
 * Addon CDN related methods Script
 * Author: GramThanos, GreatApo
 */

// Info
// 		Gladiatus moved the images under a CDN
//		The images were optimised, thus to find possible hashes we usd the following linux commands:
//			optipng *.png
//			jpegoptim *.jpg
//			jpegoptim *.jpeg
//			optipng -o5 *.png
//			jpegoptim --strip-all *.jpg
//			jpegoptim --strip-all *.jpeg
//			jpegoptim (example: jpegoptim ./image.jpg)
//		The old images are still in the servers pushed inside the /cdn/ directory
//		Example:
//			old image           : https://en.gladiatus.gameforge.com/img/ui/quest/icon_arena_inactive.jpg
//			old image           : https://en.gladiatus.gameforge.com/game/img/ui/quest/icon_arena_inactive.jpg
//			new image location  : https://en.gladiatus.gameforge.com/cdn/img/ui/quest/icon_arena_inactive.jpg
//			new image optimised : https://gf2.geo.gfsrv.net/cdn1b/00f1a594723515a77dcd6d66c918fb.jpg

// CDN methods
var gca_cdn = {

	hash2cdn : function(hash, ext) {
		if (!this.cdn_domain) {
			this.cdn_domain = '//gf' + Math.floor((Math.random() * 3) + 1) + '.geo.gfsrv.net';
		}
		return this.cdn_domain + '/cdn' + hash.substr(0,2) + '/' + hash.substr(2) + (ext ? '.' + ext : '');
	},

	// The CDN uses the file's md5 hash to generate the URL
	// Linux command to get md5: md5sum ./filename.png
	url2info : function(url) {
		let info = url.match(/^(?:https?:|)\/\/(gf\d+\.geo\.gfsrv\.net)\/cdn([0-9a-f]{2,2})\/([0-9a-f]{30,30})\.(\w+)$/i);
		
		if (!info) return null;
		
		return {
			ext : info[4],
			hash : info[2] + info[3],
			server : info[1]
		};
	},

	getSource : function(url, lookup=false) {
		let info = this.url2info(url);
		if (!info) return null;
		let lookup_by_location = null;
		if (!lookup && this.hasOwnProperty('lookup_' + info.ext)) {
			lookup = this['lookup_' + info.ext];
			lookup_by_location = this['lookup_' + info.ext + '_by_location'];
		}
		// The result
		let path;

		// Path specific reverse image match
		if (lookup_by_location && window.gca_section.mod == 'location') {
			let loc = gca_getPage.parameter('loc');
			if (lookup_by_location.hasOwnProperty(loc)) {
				let _lookup = lookup_by_location[loc];
				path = _lookup ? Object.keys(_lookup).find(key => _lookup[key] === info.hash) : false;
			}
		}

		// this will find the first instance, but more may exist (some images have the same hash)
		if (!path) {
			path = lookup ? Object.keys(lookup).find(key => lookup[key] === info.hash) : false;
		}
		if (!path) {
			console.error(`Image link "${url}" was not found on CDN lookup list.`);
		}
		//if (Object.keys(lookup).filter(key => lookup[key] === info.hash).length > 1)
		//	console.warn(`Image link "${url}" has duplicates.`, info.hash, Object.keys(lookup).filter(key => lookup[key] === info.hash))
		return path;
	},

	getLink : function(path, lookup=false) {
		let ext = path.split('.').pop();
		if (!lookup) {
			if (this.hasOwnProperty('lookup_' + ext)) {
				lookup = this['lookup_' + ext];
			}
		}
		let hash = lookup && lookup.hasOwnProperty(path) ? lookup[path] : false;

		if (hash) {
			return this.hash2cdn(hash, ext);
		}
		console.warn(`Image path "${path}" was not found on CDN lookup list. Using "${'/cdn/' + path}".`);
		return '/cdn/' + path;
	},

	lookup_jpg : {
		'img/npc/0/0_1.jpg' : '7c3d25bc04df401afab3897e6ee29d1d',
		'img/npc/0/0_2.jpg' : 'b8bda95f9cd934159f87c91c88846401',
		'img/npc/0/0_3.jpg' : '1660756c3103999414d17b4c4bea6c66',
		'img/npc/0/0_4.jpg' : 'a6205b44898fb836d9aa2a066d892894',
		'img/npc/0/0_5.jpg' : '1e7a5c2e00d3285b7a8860ec55abedb2',
		'img/npc/0/0_6.jpg' : '9c18ae74ddab70c975f0f99302560a96',
		'img/npc/0/0_7.jpg' : 'dc57f844ccf4ddd43a73512dd50cb664',
		'img/npc/0/0_8.jpg' : '7e2b37847da8cb3b4b056b43daefe881',
		'img/npc/0/0_9.jpg' : '51c97426564f83096bae6509fc2b301b',
		'img/npc/0/1_1.jpg' : 'c5187db1c5f7b02ad0aba1165a2ab65e',
		'img/npc/0/1_2.jpg' : '9e0550a4e5a48939030000ceb9760ff2',
		'img/npc/0/1_3.jpg' : 'cc54bea8c392de770ad52a7eca865473',
		'img/npc/0/1_4.jpg' : 'a184fc557e5f50794c904c7b139b266a',
		'img/npc/0/1_5.jpg' : 'd93584fd10b18283c202b1c472ecb04f',
		'img/npc/0/1_6.jpg' : 'beb79b22242ca01a49a1de4cce531a42',
		'img/npc/0/1_7.jpg' : '67cd2d7eed71992c311ff16d280daa9d',
		'img/npc/0/1_8.jpg' : '359601ed8377e2fa4d8a3c0c395a3ea5',
		'img/npc/0/1_9.jpg' : '89d5754ffadd87a19ede2c20b1bc9604',
		'img/npc/0/1_10.jpg' : '8cd722e66b1319f3f6cb6d503b3d824c',
		'img/npc/0/1_11.jpg' : 'a7e8d22b72011f53b3a72e30c7582a9f',
		'img/npc/0/1_12.jpg' : 'ea0b6866827dd5a5a5b06f044d4474bb',
		'img/npc/0/1_13.jpg' : '4ca7bcd9f43d8f36e52d883f9d3e55a1',
		'img/npc/0/1_14.jpg' : '561eb1c71b47acd3e3023585cfa783c7',
		'img/npc/0/1_15.jpg' : '8ebe89a6fe6f47a87f53cdf6edd8ac94',
		'img/npc/0/1_16.jpg' : '50d6b951917128124076726b828b4c25',
		'img/npc/0/1_17.jpg' : '0dbaf81253e8f0420279f0e14b72c2a5',
		'img/npc/0/1_18.jpg' : 'bf9e8bbe18d3d45f0e820d32cf730543',
		'img/npc/0/1_19.jpg' : '7e6e062106b25f33b28692a7c4aebcd4',
		'img/npc/0/1_20.jpg' : 'abe4fb2466866bddeea0c26a68a6b3ea',
		'img/npc/0/1_21.jpg' : '6c161b921bae1ff254f34e466875ec42',
		'img/npc/0/1_22.jpg' : 'f5234d2ba5754a96987be0babc627f9d',
		'img/npc/0/1_23.jpg' : 'f5234d2ba5754a96987be0babc627f9d',
		'img/npc/0/1_24.jpg' : '6c161b921bae1ff254f34e466875ec42',
		'img/npc/0/1_25.jpg' : 'f89ee2fc8b59b0973412864dfe749ccc',
		'img/npc/0/1_26.jpg' : '22b5ec9d386f70509a9a02740c21e826',
		'img/npc/0/1_27.jpg' : '9ff30549d00ff8e417e0d9f178b3bbbc',
		'img/npc/0/1_28.jpg' : '39d556b93d1dd46c37ec1a8632078886',
		'img/npc/0/1_29.jpg' : '04cdf8c84c5a96423c6a6c6ee9484ac1',
		'img/npc/0/1_30.jpg' : '0ac4cb0f5a6bcf237d0b21376ecd155c',
		'img/npc/0/1_31.jpg' : 'bddf2b1cb493880f91253822059ec813',
		'img/npc/0/1_32.jpg' : '88f139aa89d27dbacf7b91ee6bcea7d2',
		'img/npc/0/1_33.jpg' : '63f559ab2226acf7e5b5a5d6dccff28d',
		'img/npc/0/1_34.jpg' : '34d31b305686a94d897e695d52dd3261',
		'img/npc/0/1_35.jpg' : 'd0180737f4a441d1cb4059baa9ce43fa',
		'img/npc/0/1_36.jpg' : '93230fc8d3268e05c79944a17ca8b58b', // Lemures has duplicate
		'img/npc/0/1_37.jpg' : '11518d7631a8abd12222f4395bca4f2a',
		'img/npc/0/1_38.jpg' : '6cf7ba3620db78b6766940ac864075e9',
		'img/npc/0/1_39.jpg' : '486baa7a5462326c9b9c651ac868b6ed',
		'img/npc/0/1_40.jpg' : '92d99a50c7a1a59d5392de510e06c40c',
		'img/npc/0/1_41.jpg' : 'a2f97233433f992c073aec3d114a88f7',
		'img/npc/0/1_42.jpg' : '4aa7b2b42249c7a391e3d157eec43620',
		'img/npc/0/2_1.jpg' : '7cd4d5e444152aee4b6bd676beec6a3f',
		'img/npc/0/2_2.jpg' : '6303de0e8dbdfecbfc716985caf96318',
		'img/npc/0/2_3.jpg' : 'a111637175ff2a6b31f60b190a08a1d6',
		'img/npc/0/2_4.jpg' : 'd4abee5a7a9ae55db33d7c23149fb9b7',
		'img/npc/0/2_5.jpg' : 'c8fad777425795021b8a8a5a8555058c',
		'img/npc/0/2_6.jpg' : 'b52f058bc58f7ea66f601e21d7b133c8',
		'img/npc/0/2_7.jpg' : 'c345041d84700b2c824c92fe99338392',
		'img/npc/0/2_8.jpg' : '019260c98631e1faf6a2647ebaaaa1e8',
		'img/npc/0/2_9.jpg' : 'f63eec422be1fd658bae6d628a329e65',
		'img/npc/0/2_10.jpg' : 'e8f06d243e54e18f14b6e37c94d5bcbf',
		'img/npc/0/2_11.jpg' : '374499702bfc7634f5ca7b0da8eb10e4',
		'img/npc/0/2_12.jpg' : 'fdf48a06678c4c2ffbee67b7269b7135',
		'img/npc/0/2_13.jpg' : 'fb093287e60093b6f569d4292aaf2551',
		'img/npc/0/2_14.jpg' : '5ff879a9bb598c12d09489bf22e6c89d',
		'img/npc/0/2_15.jpg' : '77fef73440d37fb61405bb0532b4d3cd',
		
		'img/npc/1/0_1.jpg' : '1edbed7f18ab302ac7446a3b5b1592ed',
		'img/npc/1/0_2.jpg' : 'e1a00db35bd203ed49db6e276bbb62ea',
		'img/npc/1/0_3.jpg' : 'a45c7b73d8dc8d0781bb2225db2fa49c',
		'img/npc/1/0_4.jpg' : '4e3339f2e3aa07b81be81b6ff38aebfc',
		'img/npc/1/0_5.jpg' : '40dc384a8570e2e8a0545970f7b3327a',
		'img/npc/1/0_6.jpg' : '2e7d93d46978c9f71fba8f57e0e7863b',
		'img/npc/1/0_7.jpg' : '56d31dfb62b2f7bf25bff743c1641174',
		'img/npc/1/0_8.jpg' : 'd03511bf3d850f9a62f9a2a6b62d2873',
		'img/npc/1/0_9.jpg' : '51c97426564f83096bae6509fc2b301b',
		'img/npc/1/1_1.jpg' : 'e1b28ec72a53cbb684b838d25ed205ff',
		'img/npc/1/1_2.jpg' : '739a8088faade8c7ca9d77c16915cea3',
		'img/npc/1/1_3.jpg' : 'e06e195ef656d7e1c3614aa5bc98be7b',
		'img/npc/1/1_4.jpg' : '039f1050696c2acfc9502ba5864e3b32',
		'img/npc/1/1_5.jpg' : '1f3d1f8fc82d77d568db9db5aba2503f',
		'img/npc/1/1_6.jpg' : 'f28dcaae8700cb60cc32bd58843a915e',
		'img/npc/1/1_7.jpg' : '784c99043689a5eb4756d131f2e24d3c',
		'img/npc/1/1_8.jpg' : 'ae90148352efef3eb89ba72ab1272e2a',
		'img/npc/1/1_9.jpg' : '1ff5afc0d5900b9e68958dc6d4885a3b',
		'img/npc/1/1_10.jpg' : '766e750cdb955edd80ed7dc4a4178965',
		'img/npc/1/1_11.jpg' : '7182b1558c5f5eff9d9bfa43f8065822',
		'img/npc/1/1_12.jpg' : '0966f88708c7e3209764a65779228f82',
		'img/npc/1/1_13.jpg' : '0be5a6df9e00cdeffe0557b08281498a',
		'img/npc/1/1_14.jpg' : '25448d76cfa4777a8866ee858318ed29',
		'img/npc/1/1_15.jpg' : '84754306975170a6256d9e5e0b0572bd',
		'img/npc/1/1_16.jpg' : 'dfc51232d0d8c741c69108bf5857b2e0',
		'img/npc/1/1_17.jpg' : '3656a1b89cd8778a0f33884153c7e52e',
		'img/npc/1/1_18.jpg' : '5c570124818466e6b9e0c0825c2dd79d',
		'img/npc/1/1_19.jpg' : '887ff34bd4cf4d5c63eeaadae021cbb7',
		'img/npc/1/1_20.jpg' : '1bc846ecb527c274375b63e07aecfe9e',
		'img/npc/1/1_21.jpg' : 'fdfaaeb9f9bc808cea06d840bdf89a48',
		'img/npc/1/1_22.jpg' : '77e4258f347ed39653613e4927005536',
		'img/npc/1/1_23.jpg' : '46c07ad06be35b733c6e9696c84dcd19',
		'img/npc/1/1_24.jpg' : '0652eb1c3db4ac7d81ec490abd92f1b7',
		'img/npc/1/1_25.jpg' : 'cbad75c17dee0b576c33bdc7473aed63',
		'img/npc/1/1_26.jpg' : '8b14538bceeb81776556ad796fb9df99',
		'img/npc/1/1_27.jpg' : '8f7b509641e5ee8e74fb806ac5f650f5',
		'img/npc/1/1_28.jpg' : 'dde4d3cda3727ea55b11ddceb459e086',
		'img/npc/1/2_1.jpg' : '6d999cd42b9848a67654fcbe3116994d',
		'img/npc/1/2_2.jpg' : '8ebbdd16be875d5c6700a3d2e52714d9',
		'img/npc/1/2_3.jpg' : '7c8ec7992963b6df700d7aa0e9ddf8bb',
		'img/npc/1/2_4.jpg' : '8c0d2b999ba1a8e24b55cbf51d0ce0c5',
		'img/npc/1/2_5.jpg' : 'bd6b5901e386b8d651ac2868884f48ed',
		'img/npc/1/2_6.jpg' : '251182e3406e6b9455bc5663be7a510f',
		'img/npc/1/2_7.jpg' : '4583e0005ade5dabf5f0bd1b4c9f6634',
		'img/npc/1/2_8.jpg' : '202764e360e816fc529e2f18cbba6383',
		'img/npc/1/2_9.jpg' : '8f6bca43127ed998010f30e5b8e197a2',
		'img/npc/1/2_10.jpg' : 'bf22409cbe319a775c233b52dea34721',
		'img/npc/1/2_11.jpg' : '9007d7f6a11acb14887d4a9f3abc6f44',
		'img/npc/1/2_12.jpg' : '2324e8bdf0afedc86802d8415de72281',
		'img/npc/1/2_13.jpg' : 'f80216f63f60742e8947e939b9702c51',
		'img/npc/1/2_14.jpg' : 'd2f01d74069e313992adacbf4b09eaf5',
		'img/npc/1/2_15.jpg' : '8dfed90f6a7254b45e3094ba3d725954',
		'img/npc/1/2_16.jpg' : 'bbf552d769f9e567eab739e0934c2e58',
		
		'img/npc/2/0_1.jpg' : '5ad53b8015b3cdacbcd3ac5452fb0de1',
		'img/npc/2/0_2.jpg' : '2137a5d7e6388be4ddd7781de0ae6a4b',
		'img/npc/2/0_3.jpg' : '8a8090da7df5fdfcfe3fabca7c69df03',
		'img/npc/2/0_4.jpg' : '40b8580e09beb8cea9cb16b14c2cf015',
		'img/npc/2/0_5.jpg' : 'aa7b573ef6374ac99a05a34ba1a8088f',
		'img/npc/2/0_6.jpg' : '6ae94415e68616ae1d6c7668b4c27fad',
		'img/npc/2/0_7.jpg' : '53161d56d89537cbcc639e73fb0a1383',
		'img/npc/2/0_8.jpg' : '8d6f2a60de2428ed066fa4d892865a49',
		'img/npc/2/0_9.jpg' : '51c97426564f83096bae6509fc2b301b',
		'img/npc/2/1_1.jpg' : '51feea0e7f835a473849731f0cb50d07',
		'img/npc/2/1_2.jpg' : '330d305e7413c5ece236868dfc11a363',
		'img/npc/2/1_3.jpg' : 'a7e8d22b72011f53b3a72e30c7582a9f',
		'img/npc/2/1_4.jpg' : 'e9dc3c1437184dc782eef80852a72067',
		'img/npc/2/1_5.jpg' : '86ac32278e5d2d411e551c00a7e27365',
		'img/npc/2/1_6.jpg' : 'b44eb495e21a9b96e710fb183858a1ec',
		'img/npc/2/1_7.jpg' : 'edee5e8b73fa23851b7f333e5f23abe4',
		'img/npc/2/1_8.jpg' : '426c32ec62e4957d8017a441cd15fbb6',
		'img/npc/2/1_9.jpg' : 'e947509349370b0177718c69957b0809',
		'img/npc/2/1_10.jpg' : '8cd722e66b1319f3f6cb6d503b3d824c',
		'img/npc/2/1_11.jpg' : '9b2a2a3b9c020967488a1a63b55901b5',
		'img/npc/2/1_12.jpg' : '455306754cd00ead254e12e12af72df4',
		'img/npc/2/1_13.jpg' : '9d4e58e03b23464b30ccc761d5f83fcf',
		'img/npc/2/1_14.jpg' : 'ef3b00d40cfc3b0966e87912d3cf1d99',
		'img/npc/2/1_15.jpg' : '6745b92282b17682779039633d48b41d',
		'img/npc/2/1_16.jpg' : '466206ebe87ee36e0dd668e47ba03f05',
		'img/npc/2/1_17.jpg' : '6d10ccd94afff7fc9f4f7e75a413fc51',
		'img/npc/2/1_18.jpg' : 'e266f08dfe0a1ebe29a5378585d3f69f',
		'img/npc/2/1_19.jpg' : 'e09e3cabe4ce06b8be6c7e1eb1488734',
		'img/npc/2/1_20.jpg' : 'a3741500539bd4084e80bf0ca4ef3a03',
		'img/npc/2/1_21.jpg' : '8c229fb54f29c3563324291bb3049a3c',
		'img/npc/2/1_22.jpg' : 'ddd889188f31b4efa5cb2024432423ac',
		'img/npc/2/1_23.jpg' : '4148ea64d9621358d8e656664107595d',
		'img/npc/2/1_24.jpg' : '1044527d5dfb6c25f8ac64941d78bc10',
		'img/npc/2/1_25.jpg' : 'b34809de2d2ba9feeba8bbd43f8f41c6',
		'img/npc/2/1_26.jpg' : '26c65b4014c82e67bdbe95a49015f78f',
		'img/npc/2/1_27.jpg' : 'd1549710f046f8f9bc48a8d2746a3930',
		'img/npc/2/1_28.jpg' : 'b0bc57005ab3616095b15cc0607711fd',
		'img/npc/2/1_29.jpg' : 'bf1a2a56307f51d82dcf6581534a392d',
		'img/npc/2/1_30.jpg' : '93230fc8d3268e05c79944a17ca8b58b', // Lemures has duplicate, must be first on the list #439
		'img/npc/2/1_31.jpg' : '195223495ed346f0b37786f2c519246f',
		'img/npc/2/1_32.jpg' : '2aad144e0643fa82b36de31b4d9b7b1c',
		'img/npc/2/2_1.jpg' : '6aee6c6305b48b14824c1e7274d788e8',
		'img/npc/2/2_2.jpg' : '2a728d564d1a03ad9d01893b832dc303',
		'img/npc/2/2_3.jpg' : '02c4efbf6a6f2e1e85a8a9d4ea7b9e3f',
		'img/npc/2/2_4.jpg' : '6a22746855721339c2a39add070909c2',
		'img/npc/2/2_5.jpg' : 'e9442b583331d9deb800d9265dc32c23',
		'img/npc/2/2_6.jpg' : '6d999cd42b9848a67654fcbe3116994d',
		'img/npc/2/2_7.jpg' : 'a4708277bddbdc83008eb008de1aa086',
		'img/npc/2/2_8.jpg' : 'de0cd8db53c6786a7a5f50864a8a2e3d',
		'img/npc/2/2_9.jpg' : 'e84e901247e1413cdcbb48a3a9d5612e',
		'img/npc/2/2_10.jpg' : '6921998bd15a26af19e3ef4cdb7bc050',
		'img/npc/2/2_11.jpg' : '1680f050148cd8e0fb334cbd0cb7aa1e',
		
		'img/npc/3/0_2.jpg' : '673754533f396ef58b2a2e6e10ae2ce1',
		'img/npc/3/0_3.jpg' : '0e150f321a110eb56d29722525352ab8',
		'img/npc/3/0_4.jpg' : 'c245b98b77994de23b38c7d7a4c66cc6',
		'img/npc/3/1_1.jpg' : '5523d1b46fc425b94d47901cfa26b617',
		'img/npc/3/1_2.jpg' : '3a91992511c6e3d3a12395c809a2af6b',
		'img/npc/3/1_3.jpg' : 'eba0bee3578089807e4903068fb7bf78',
		'img/npc/3/1_4.jpg' : '2dbf68cbfb4a12f9876f83cd855ba703',
		'img/npc/3/2_1.jpg' : '1aabc607343a9b46c6b69173b19f434f',
		'img/npc/3/2_2.jpg' : '40229a35f7226acf2deb140a59394853',
		'img/npc/3/2_3.jpg' : '3646eebfc698733002bdb9d50168fa34',
		'img/npc/3/2_4.jpg' : '40ad32b6084a5cf5178b83d6a0ee3230',
		'img/npc/3/3_1.jpg' : 'd26703d930e67e77674d505a6c2c9d3a',
		'img/npc/3/3_2.jpg' : '2045bc06f6e42d5840b4cb077809bced',
		'img/npc/3/3_3.jpg' : '70739ca8bf810cde7cac6ab78c2da517',
		'img/npc/3/3_4.jpg' : 'f878e9dd30a5e0f07d5be66c9bae9dd4',
		
		'img/npc/4/0_1.jpg' : '89a1107a8b4e46fb76ef2e101e8b90b3',
		'img/npc/4/0_2.jpg' : 'b3c247005fca422a67fd8305b86e6c9c',
		'img/npc/4/0_3.jpg' : 'a46c7b3cff7dc0f9b75612c808bd03cd',
		'img/npc/4/0_4.jpg' : 'e9b7e76ebb438ccf5226ad8f0148e0da',
		'img/npc/4/0_5.jpg' : '5a10aa70c203f4b04f5057da150ca2ae',
		'img/npc/4/0_6.jpg' : 'd667cebaa46248126a6c912c7ae1db13',
		'img/npc/4/0_7.jpg' : 'b25f2af1ecb8cb9f95666f1ff394138f',
		'img/npc/4/0_8.jpg' : 'aeb63a1da34130398dc0178f26771c4e',
		'img/npc/4/0_9.jpg' : '51c97426564f83096bae6509fc2b301b',
		'img/npc/4/1_1.jpg' : 'd5d8f31cde7ace688220b2cba25bcf8c',
		'img/npc/4/1_2.jpg' : '8f0c426efa269027825980ea90db1df3',
		'img/npc/4/1_3.jpg' : 'c345a1e26918f9ce3e9ad00aeb01274b',
		'img/npc/4/1_4.jpg' : '767852341b86709930ce5a964928ca0b',
		'img/npc/4/2_1.jpg' : '3015fc7f911e5de59fa899a907e1d172',
		'img/npc/4/2_2.jpg' : 'c02eba3e1443a935c8c7c33c9c6898d2',
		'img/npc/4/2_3.jpg' : 'e9bb23f71f767176ca2444f8bc1c2865',
		'img/npc/4/2_4.jpg' : '89ac050c99b685658f5b65511ac83d45',
		'img/npc/4/3_1.jpg' : '9dd8e4b82f457b0803419ce2c50f5255',
		'img/npc/4/3_2.jpg' : 'e85d44a11052e740a8ec483e76f181a7',
		'img/npc/4/3_3.jpg' : '67a2611142886c9c6634cbb31e0cdb5e',
		'img/npc/4/3_4.jpg' : '9430c496661bc490a06b5c212124f4fe',
		'img/npc/4/4_1.jpg' : '9628735e13275819747922c16a516a5b',
		'img/npc/4/4_2.jpg' : '24d84f6adad4686ae45ff5b98fcbc692',
		'img/npc/4/4_3.jpg' : '13b173612baddf3d7dadbcdb823d3a19',
		'img/npc/4/4_4.jpg' : '29bac7e539d61a9de6caec21363c2694',
		'img/npc/4/5_1.jpg' : 'c58fc1dc28a272c41b475828a8107afe',
		'img/npc/4/5_2.jpg' : '8d0ead089e64b248786fb3e126ffcf7f',
		'img/npc/4/5_3.jpg' : '5899db5b8f77050f201cf67dc8e5bf9d',
		'img/npc/4/5_4.jpg' : '63cdbea7d87f34475e22555256f0f942',
		'img/npc/4/6_1.jpg' : '64b98041c012f259885ba823c53eeaca',
		'img/npc/4/6_2.jpg' : 'ab195c75c0ba9e8fadda41b58b107b84',
		'img/npc/4/6_3.jpg' : '323ae0563db2cd7241d349f766002b3b',
		'img/npc/4/6_4.jpg' : 'cd9dd0228c3a6c8dfe9e5b9bd20f50a5',
		'img/npc/4/7_1.jpg' : 'f3841d17a434e2018c8c84c1fa2271a5',
		'img/npc/4/7_2.jpg' : '63e3e4aa1f515a7c28ce7812c3ac63b7',
		'img/npc/4/7_3.jpg' : '04f4e1cd5cd2438f5a41c47814d0a710',
		'img/npc/4/7_4.jpg' : '1b18b0984d6a55da3e034e4760628b7f',
		'img/npc/4/8_1.jpg' : '198eb93cfa395c6afb22b113081d2745',
		'img/npc/4/8_2.jpg' : '411ab6cbd7c1a3dccb7867de60e43745',
		'img/npc/4/8_3.jpg' : '1a2e263942898dea859c018914a52243',
		'img/npc/4/8_4.jpg' : '6957a217a04d673e4b22d3f845b1a341',
		'img/npc/4/9_1.jpg' : '7609e951d2b51f6974291daab5279720',
		'img/npc/4/9_2.jpg' : '75faaefcb352006fb80fe6d9f7df7c1f',
		'img/npc/4/9_3.jpg' : 'fdc2e90e2e18d48202fc20e32bba7935',
		'img/npc/4/9_4.jpg' : '9114082c992a13b9b68fc9347ae60a14',

		// Event - On the Nile bank
		'img/npc/{on-the-nile-bank}_1.jpg' : '659f45b7fd7ac900004dcafc2feec57d',
		'img/npc/{on-the-nile-bank}_2.jpg' : '10f0a5434c803bde1ba0913aecd9751b',
		'img/npc/{on-the-nile-bank}_3.jpg' : 'ae23d6d58d2cf752711ec4a580848476',
		'img/npc/{on-the-nile-bank}_4.jpg' : '74531075909c1e2cb313eda2bc1e8c8e',
		
		// Event - Ice Tundra
	    'img/npc/{ice-tundra}_1.jpg' : 'c3d8230a947fede10230f925e77abcb8',        
		'img/npc/{ice-tundra}_2.jpg' : '29cc23cc60d2ee559db2bc4abaf5a271', 	  
		'img/npc/{ice-tundra}_3.jpg' : 'ea880725d22d0342f7de0287fe6225ac', 	   
		'img/npc/{ice-tundra}_4.jpg' : 'c9c569df5d416369e84df7e69b8ff24c', 	

		'img/premium/token/5.jpg' : '07c9ce614bbc67a9e85aa0ee87cf2bb7',
		'img/premium/token/6.jpg' : 'b91f4b5b4387108ff677cfaf301cfe18',
		'img/premium/token/7.jpg' : '645690ff3f6948e7a2d12e455ec6cf22',
		'img/premium/token/8.jpg' : 'ee14df1ba0972578bd932537df00b889',
		'img/premium/token/9.jpg' : '9462a8652defadc1ab67034b6fe9359d',
		'img/premium/token/10.jpg' : 'd9a9183bc5e1aec426c897371259c75a',
		'img/premium/token/11.jpg' : '403c500f468e6dbe503619254ceec70e',
		'img/premium/token/12.jpg' : '09935adb94fe4477b84880f81d94e792',
		'img/premium/token/13.jpg' : '0bca3e370b21c7637efee7eac47e769f',
		'img/premium/token/14.jpg' : '27010c10ed9a5c29032fe35bd44cb4a7',
		'img/premium/token/15.jpg' : 'bd815cdbbd1416dfdd75c85cd08ec06a',
		'img/premium/token/16.jpg' : 'ba29bbc9004cec00f187576786fa3b2a',
		'img/premium/token/17.jpg' : '89133ca9267ccb9d0d8e71b7256d8455',
		'img/premium/token/18.jpg' : 'b15fd403b4efa8ea7bc3ca5a852bfce9',
		'img/premium/box/hamper.jpg' : '01c8d1209a531ab99db83165010e86a3',

		//'img/costumes/sets/male/xxxx.jpg' : '',
		//'img/costumes/sets/female/xxxx.jpg' : '',

		'img/costumes/sets/male/1_complete_small.jpg' :   'b886e9550484e557ea7b3e0b4a825490', // Vulcanus
		'img/costumes/sets/female/1_complete_small.jpg' : '87a3e68346e83411f01932ea2d4cc1ae', // Vulcanus
		'img/costumes/sets/male/2_complete_small.jpg' :   '37c4364b8ac67369247214b8f71fd0b5', // Feronia
		'img/costumes/sets/female/2_complete_small.jpg' : '70d79faf45e9d43d4602d340feabdfa9', // Feronia
		'img/costumes/sets/male/3_complete_small.jpg' :   '141c581d299b3aeeae31f748732ce9c8', // Neptune
		'img/costumes/sets/female/3_complete_small.jpg' : '0d5d7788cfb1653ce71b217c441be72f', // Neptune
		'img/costumes/sets/male/4_complete_small.jpg' :   '2201d0f0d9f6620fad15836eb95cbaa3', // Aeolus
		'img/costumes/sets/female/4_complete_small.jpg' : '6fc26b2aa38e7819b09306cabea2d88a', // Aeolus
		'img/costumes/sets/male/5_complete_small.jpg' :   'bafb5aa808eb79bf95e982817b87ff72', // Pluto
		'img/costumes/sets/female/5_complete_small.jpg' : '10e141fa065333026f142acfe4af6f5b', // Pluto
		'img/costumes/sets/male/6_complete_small.jpg' :   '28c95c2f5dfa0751a4ed2ff2d8411fbf', // Juno
		'img/costumes/sets/female/6_complete_small.jpg' : '06d019cb6c64b817671057a73f0ac571', // Juno
		'img/costumes/sets/male/7_complete_small.jpg' :   '4a19e794899bda1deaf03b3339a2e6f3', // Wrath
		'img/costumes/sets/female/7_complete_small.jpg' : '6c650ef332647949d0adc7cb9cc83469', // Wrath
		'img/costumes/sets/male/8_complete_small.jpg' :   '83a8d3c30d98dd9544a49745e22c9cec',
		'img/costumes/sets/female/8_complete_small.jpg' : '24fec0f2518e3f036b7ab454194c1f70',
		'img/costumes/sets/male/9_complete_small.jpg' :   'eeaa685cc0dab905eed0d9565972bc4a',
		'img/costumes/sets/female/9_complete_small.jpg' : 'c794a662782adb9f2baa7940c54f43db',
		'img/costumes/sets/male/10_complete_small.jpg' :  'a606002acdb1a6d719d9063223337ba8',
		'img/costumes/sets/female/10_complete_small.jpg' : '61c5de1a63f11f7b677ef9ad68e1e74f',
		'img/costumes/sets/male/11_complete_small.jpg' :   '5d2473b18ef2e5eabd0f04771d992937',
		//'img/costumes/sets/female/11_complete_small.jpg' : '', // image was not found
		'img/costumes/sets/male/12_complete_small.jpg' :   '925aedbc34df23538eb911550c0ed0c6',
		'img/costumes/sets/female/12_complete_small.jpg' : '9ce038a87773fec12880e10bfe254c3a',
		'img/costumes/sets/male/13_complete_small.jpg' :   'b3e8f7ba37287a060ad1e19e4180a892',
		'img/costumes/sets/female/13_complete_small.jpg' : '6389d46cd8b60dad5e437ba90521920a',
		'img/costumes/sets/male/14_complete_small.jpg' :   'c3cb6448b413c034a68361e0890fcdb0',
		'img/costumes/sets/female/14_complete_small.jpg' : '17e726993cd9dd955506ec697b6f5af9',
		'img/costumes/sets/male/15_complete_small.jpg' :   '796085d4fc0488c75671ecca592623e0',
		'img/costumes/sets/female/15_complete_small.jpg' : '4a6b3cd82084260881cf3cc685af83f5',

		'img/costumes/sets/male/1_1.jpg' : '0d945d2ee27b1045b4a39f1f4a14bd94',
		'img/costumes/sets/male/2_1.jpg' : '84ef6ce7382fc95d6e97d3d8381d4abc',
		'img/costumes/sets/male/3_1.jpg' : 'ee995613c724aefdb45aefe165ebf377',
		'img/costumes/sets/male/4_1.jpg' : '997dc419dbc6fd394520c5a4d2790143',
		'img/costumes/sets/male/5_1.jpg' : 'ed87c092d3f8f7fd0691807ef86d1fbb',
		'img/costumes/sets/male/6_1.jpg' : '3af76794e517d6d1e9aae751bbc8e64d',
		'img/costumes/sets/male/7_1.jpg' : 'de194891ef18b30ea84ef7a519c85d51',
		'img/costumes/sets/male/8_1.jpg' : 'f065826653444f287ee34aacdea50a22',
		'img/costumes/sets/male/9_0.jpg' : 'd68050e012bcc254aa1def38c78905e4',
		'img/costumes/sets/male/10_0.jpg' : 'eae86e83fe05bb29a815559f34e3cc1d',
		'img/costumes/sets/male/11_0.jpg' : '99e6e28fa264d7e9159cbcbe994a22a0',
		'img/costumes/sets/male/12_0.jpg' : 'bf506b3a343fe80b4e1db1407f104acb',
		'img/costumes/sets/male/13_0.jpg' : 'b55f7f38e937c57da0b40423941f162c',
		'img/costumes/sets/male/14_0.jpg' : '81873c223682e2d7291513f8ba0fd2a6',
		'img/costumes/sets/male/15_0.jpg' : 'cbb463d1b918e656f1a3fff3c57df9a3',

		'img/costumes/sets/female/1_1.jpg' : 'a2668531d50e61312678928e55663880',
		'img/costumes/sets/female/2_1.jpg' : 'a66365a7734590be9eb326cb482cdc54',
		'img/costumes/sets/female/3_1.jpg' : '9008b5ff96020afbff3bf8a3f28e71af',
		'img/costumes/sets/female/4_1.jpg' : '0213a65b62bd02660e8b4d953eb5827c',
		'img/costumes/sets/female/5_1.jpg' : 'e6f50cf2d760a8c7572a67d7e2f8b933',
		'img/costumes/sets/female/6_1.jpg' : 'd718e0c0b8112b90aca27068ebaf7078',
		'img/costumes/sets/female/7_1.jpg' : 'd13b369f245da63d5634200f592a9dfa',
		'img/costumes/sets/female/8_1.jpg' : 'a40a6d9dcfc92dbca579908d83144e6d',
		'img/costumes/sets/female/9_0.jpg' : 'd68050e012bcc254aa1def38c78905e4',
		'img/costumes/sets/female/10_0.jpg' : 'eae86e83fe05bb29a815559f34e3cc1d',
		'img/costumes/sets/female/11_0.jpg' : 'ee4b05ccdb2611e1143cf9eacb9c391f',
		'img/costumes/sets/female/12_0.jpg' : '46ab906e9e28b3229048c79d6744f089',
		'img/costumes/sets/female/13_0.jpg' : 'f852b26c870e542d308ba8ae82b9974c',
		'img/costumes/sets/female/14_0.jpg' : '81873c223682e2d7291513f8ba0fd2a6',
		'img/costumes/sets/female/15_0.jpg' : 'cbb463d1b918e656f1a3fff3c57df9a3',

		'img/expedition/enemy_unknown.jpg' : 'ae904194973d21066c96cb414d04d676',
		'img/costumes/background.jpg' : '65d4f9e647d4a5e8b98bc7c95a8d161b',

		'img/ui/quest/icon_items_active.jpg' : 'ff92c80be0d47423719891d1c70c7200',
		'img/ui/quest/icon_items_inactive.jpg' : '2b5a358e0a030d8551a5a65d284c8730',
		'img/ui/quest/icon_work_active.jpg' : '3acc151571bd182e5b55fa75238f18f3',
		'img/ui/quest/icon_work_inactive.jpg' : 'b4a8b91ecab5813f97708e0e86f35e06',
		'img/ui/quest/icon_dungeon_active.jpg' : 'aac903cea2513b6a20e1e92500c2a279',
		'img/ui/quest/icon_dungeon_inactive.jpg' : 'b5dc366909fdfe69897d583583f6e446',
		'img/ui/quest/icon_expedition_active.jpg' : 'b0a3d2065a1dac3029b15d5e64ce7a90',
		'img/ui/quest/icon_expedition_inactive.jpg' : 'fb4e41ab43222200aa024ee177efef8f',
		'img/ui/quest/icon_combat_active.jpg' : 'e3cd7b70728e81ac4995e6a3e668a46e',
		'img/ui/quest/icon_combat_inactive.jpg' : '5b8aada67d4c5601e009b9d2a88f478c',
		'img/ui/quest/icon_grouparena_active.jpg' : '45c901c26d04e70cc3ecfb37b9632590',
		'img/ui/quest/icon_grouparena_inactive.jpg' : '24586768e942030301c484347698bc5e',
		'img/ui/quest/icon_arena_active.jpg' : '97234cdb450a257bf9c13e55ce0e7c74',
		'img/ui/quest/icon_arena_inactive.jpg' : '1b00f1a594723515a77dcd6d66c918fb',						
		// 'img/recruiting/godpoints_active.jpg' : '', // no specific hash
		// 'img/recruiting/godpoints_inactive.jpg' : '', // no specific hash
		// 'img/recruiting/expedition_active.jpg' : '', // no specific hash
		// 'img/recruiting/expedition_inactive.jpg' : '', // no specific hash
		// 'img/recruiting/dungeon_active.jpg' : '', // no specific hash
		// 'img/recruiting/dungeon_inactive.jpg' : '', // no specific hash
		// 'img/recruiting/level_active.jpg' : '', // no specific hash
		// 'img/recruiting/level_inactive.jpg' : '', // no specific hash
		// 'img/recruiting/rubies_active.jpg' : '', // no specific hash
		// 'img/recruiting/rubies_inactive.jpg' : '', // no specific hash		
		'img/ui/bar.jpg' : '3998d8ca22bc9f25ce9e6f2db8022106', 
		'img/ui/bar_fill.jpg' : '36ea431d408d42dfa86a5e19915f0a6f', 
		'img/ui/bar_fill_green.jpg' : 'aa2ae40891e6ff8b7d669103414a78cf', 
		'img/ui/layout/menu_bg.jpg' : '7ac0ba8c16c12928c173dec02948883d',
		'img/ui/layout/bg_body_game.jpg' : 'c3971e186e7cc48ef7dbc1612d30813a', 
		'img/ui/layout/bg_header_game.jpg' : 'd7bfa2d4db74a8c53376ab80280e8aee', 				
		// 'img/ui/blackoutDialog/icon_warning.jpg' : '', // no specific hash
		// 'img/ui/blackoutDialog/ ' : '1db8e0f24e86bde507dbadf4999ea9c9', // question mark icon
		// 'img/map_stadt.jpg' : '', // same as "map_stadt_0" but darker?
		'img/map_stadt_0.jpg' : 'f8c6f33aafa51d864967c571e7155995', 
		'img/map_stadt_1.jpg' : '7df47ce1ca602f8245d0591974ba45c8', 
		'img/map_stadt_2.jpg' : '61c6efcebb28177468191325b578caf8', 
		'img/map_stadt_4.jpg' : 'bf1eb0d63e3ec870cfa526f6bd1e3ac7', 						
		'img/map_land.jpg' : '879d136977067e1d3834d58898330c2c', 
		'img/map_land_0.jpg' : '879d136977067e1d3834d58898330c2c',
		'img/map_land_1.jpg' : '66afcc7b6916ffcf1d485bd4c0d4f1af', 
		'img/map_land_2.jpg' : '7591c75049718fd55f7014ca8b357ae0', 		
		'img/map_land_3.jpg' : '585c86e4366797877e9524e5a09e1a68', 			
		'img/map_land_4.jpg' : '5485f6d0eed8997fa21d65d93908d9c2',  
		// 'img/ ' : 'dca461c83660c2499d1e1118221ccd28', // UW end screen woman (Ceres)
		'img/costumes/background.jpg' : '65d4f9e647d4a5e8b98bc7c95a8d161b', 
		'img/ui/quest/button_cancel.jpg' : '380517bbe0c9992f2386d79e1e6b5126', 
		'img/ui/training/button.jpg' : '2683a62a94a9a3e02122bce235be935d', 
		'img/ui/training/button_disabled.jpg' : '139a6a568539b92289ff6ff80458f27f', 
		// '' : '',
		// '' : '',
		// '' : '',

		// Pacts (URLs are actually unknown)
		'img/powerups/*1_1.jpg' : '73eb21690aec1d96fba3aa215e96c90d',
		'img/powerups/*1_2.jpg' : '4ccf358c538e5803536977846125c979',
		'img/powerups/*1_3.jpg' : '841ed81ac9053fc5bf70d962f637db45',
		'img/powerups/*1_4.jpg' : 'e3acb4dd8d0a07f7ea274b840c1600b7',
		'img/powerups/*1_5.jpg' : '6cb495b3f244395094d4fe7df2b69ec2',
		
		'img/powerups/*2_1.jpg' : '5c8bfc623c715506494fd98740c7f32e',
		'img/powerups/*2_2.jpg' : '0e9346dfd28d29f24e6928590e41d49f',
		'img/powerups/*2_3.jpg' : '3234fed8f05bfad9069e22da7156cb77',
		'img/powerups/*2_4.jpg' : '42bad676b578c377b9251d9319b5a9e3',
		'img/powerups/*2_5.jpg' : 'b9438ecfd74b9464549f5b9e97a3d950',
		
		'img/powerups/*3_1.jpg' : 'd4fd582e194918709f858c6a702d77bb',
		'img/powerups/*3_2.jpg' : 'f2b419dd9d84737720b3911e0e16ab74',
		'img/powerups/*3_3.jpg' : '',
		'img/powerups/*3_3*_border.jpg' : 'b395d50462139ef5c113480e1ecf671b',
		'img/powerups/*3_4.jpg' : '39864cdef231f43ac06956a82f8abecf',
		'img/powerups/*3_5.jpg' : '8d9d06ce9ce47e15fe2b3deb72e0904d',
		
		'img/powerups/*4_1.jpg' : '8e76cf549a92ff7a43f80771659170f5',
		'img/powerups/*4_2.jpg' : '20894322e9d42ffe611e32facf9e38d3',
		'img/powerups/*4_3.jpg' : 'e1073b551a230f249a3a4fa083b4fcff',
		'img/powerups/*4_4.jpg' : '5e234e0c2663d8e28a45c5b9c3241006',
		'img/powerups/*4_5.jpg' : 'a37236fdf07b3079e56f909a67dec917',

		// Old version images
		// 'img/allianz/level16.jpg' : '',
	},

	lookup_png : {

		'img/costumes/sets/male/1_complete_small.png' : '27deb30cc7fab2b6f4914ca40f554b20',
		'img/costumes/sets/male/2_complete_small.png' : '8dd43977ff56da3b5189f1b5be5b6a27',
		'img/costumes/sets/male/3_complete_small.png' : 'c55d411ba06196a455c44bd5f1cdc65c',
		'img/costumes/sets/male/4_complete_small.png' : '127cbb05cd52171df5b2259798fcd770',
		'img/costumes/sets/male/5_complete_small.png' : '18b39d24c8285f56abbf898daf3f6de6',
		'img/costumes/sets/male/6_complete_small.png' : '23c3607140c4dc6187754644d7cde8e5',
		'img/costumes/sets/male/7_complete_small.png' : 'e3f0a87da1c64c221a12f637eb9a4247',
		'img/costumes/sets/male/8_complete_small.png' : '1e3d2a16bd0bad95b35fbdb49085222c',
		'img/costumes/sets/male/9_complete_small.png' : '4e4104e39ef5a3984fa26f99b174eafe',
		'img/costumes/sets/male/10_complete_small.png' : 'e4edb9d1bffa32e7ad40e5884c35459c',
		'img/costumes/sets/male/11_complete_small.png' : '64b0e41441ac2ed59e4a31b838cccffe',
		'img/costumes/sets/male/12_complete_small.png' : 'f730455a94d2ce5cd5abc62a11a71a43',
		'img/costumes/sets/male/13_complete_small.png' : 'ab4df56fd886e8137700ec775e671568',
		'img/costumes/sets/male/14_complete_small.png' : '54dcdca19b7e58d3ac7c655a3f9d7b06',
		'img/costumes/sets/male/15_complete_small.png' : '8c821f0c5ad7c206f760dd0ce2033931',
		'img/costumes/sets/female/1_complete_small.png' : '3ff62216bff542bcb553c4aea2590c7d',
		'img/costumes/sets/female/2_complete_small.png' : '6111798181df1e3fad8615d104c1f07e',
		'img/costumes/sets/female/3_complete_small.png' : '0a1ded0cb603e3406d9a9c2b10a78431',
		'img/costumes/sets/female/4_complete_small.png' : '7abddce44dcead44435671741a03a03a',
		'img/costumes/sets/female/5_complete_small.png' : 'aa0b82945ccc6ad9a5a014e03403bb53',
		'img/costumes/sets/female/6_complete_small.png' : '257bf36981f9abbca05dff095cb4a9fe',
		'img/costumes/sets/female/7_complete_small.png' : '56ab4fd4e68a80481f4dc9f9d0dca361',
		'img/costumes/sets/female/8_complete_small.png' : 'ae33ea8e890e88aa530a6f3d296aa815',
		'img/costumes/sets/female/9_complete_small.png' : '249af37de1955cb9665540d57285cc65',
		'img/costumes/sets/female/10_complete_small.png' : '641560143a06a7ae82d8e658e3615867',
		'img/costumes/sets/female/11_complete_small.png' : 'b05e0bd1f0f8496d8858f86ceca0b852',
		'img/costumes/sets/female/12_complete_small.png' : '8d9a4e6e7d0f7a6191e0569705a8dd9f',
		'img/costumes/sets/female/13_complete_small.png' : '3967b6c8d1d9a1e7ca29d0eb52b8c050',
		'img/costumes/sets/female/14_complete_small.png' : 'f55c3ca4be32af523da57f41bcb09345',
		'img/costumes/sets/female/15_complete_small.png' : 'bcbc078c0bf4afd5042a54bf44de8c06',

		'img/costumes/sets/male/1_2.png' : '376d0cd11b380e23de8351509fc8d386',
		'img/costumes/sets/male/1_3.png' : '70edcd90261aedb70d0886d72446c9fe',
		'img/costumes/sets/male/1_4.png' : '66c2964ad227f909d2e26332354d027d',
		'img/costumes/sets/male/1_5.png' : 'a0dc68d7d6df944bd3af5b17ce60b0d4',
		'img/costumes/sets/male/2_2.png' : '26e6e330ade9bad00f737b3185fca31e',
		'img/costumes/sets/male/2_3.png' : '3b1afdfbf58239a95d85ca57340bcd24',
		'img/costumes/sets/male/2_4.png' : '7309f87d26396ddbfe6e33b94d728e77',
		'img/costumes/sets/male/2_5.png' : 'ae6e15d39734e70083a239c50c2a31a3',
		'img/costumes/sets/male/3_2.png' : 'fcffc690310f4dd4f4a9b5e0ceab6cdb',
		'img/costumes/sets/male/3_3.png' : 'e65bad9b81973e34d32307a104ccce34',
		'img/costumes/sets/male/3_4.png' : '28aec7def35daa0ae177691d77a1d101',
		'img/costumes/sets/male/3_5.png' : '29856cbfb311e61c80bee2486066b00f',
		'img/costumes/sets/male/4_2.png' : 'ff4f98f18750b820d621d5251846e03d',
		'img/costumes/sets/male/4_3.png' : '02c827c50b24f415d9cb7845094a2df7',
		'img/costumes/sets/male/4_4.png' : 'da3c90f81bb38b6e7e00ae7efcc8967e',
		'img/costumes/sets/male/4_5.png' : 'e484a73e298eaa60ff8d0291d25b3253',
		'img/costumes/sets/male/5_2.png' : '5f5525f7066fd2e5f0a113516ef46a6b',
		'img/costumes/sets/male/5_3.png' : '1867e62c75d26b52fd444ac8e863cb4d',
		'img/costumes/sets/male/5_4.png' : 'f89666da407901d0dba2825323db4ed7',
		'img/costumes/sets/male/5_5.png' : 'a55beaecd5e35d8c3d8db33eb8fde539',
		'img/costumes/sets/male/6_2.png' : 'b8ce7c7af3a6e51e6dfc5691ad45d195',
		'img/costumes/sets/male/6_3.png' : '54c930b03666fe7b0b606846806777fe',
		'img/costumes/sets/male/6_4.png' : '7f19561484a5bb2cffbbc4dc46e968bb',
		'img/costumes/sets/male/6_5.png' : '5cae149a6136e49036ab3b4b07c5071a',
		'img/costumes/sets/male/7_2.png' : 'fca3eac7b46a2d42b51271af9ccf6f91',
		'img/costumes/sets/male/7_3.png' : '52f933325cd60ad614a4bb09c7cd5929',
		'img/costumes/sets/male/7_4.png' : '340525196dfffab7c58ba86211fdcb0a',
		'img/costumes/sets/male/7_5.png' : '822108a24cb7e2569f8a4c39059e182c',
		'img/costumes/sets/male/7_6.png' : '49517f8fb1a4b564581d905465832fd7',
		'img/costumes/sets/male/7_7.png' : '90070f2d19c4c58c4817b2f15ff60c19',
		'img/costumes/sets/male/8_2.png' : '551731cd5ead63088a1b8b054be6dca8',
		'img/costumes/sets/male/8_3.png' : 'cd88dddf861f9bf21b06f150cc5ac6af',
		'img/costumes/sets/male/8_4.png' : '62fca853180c70f3ed4b827f04832619',
		'img/costumes/sets/male/8_5.png' : '01c94973b7856451ae213288f09d412a',
		'img/costumes/sets/male/9_1.png' : '10dc0629377513cb6ea7fd4d36f2807e',
		'img/costumes/sets/male/9_2.png' : '94cbcb428ed7d5b941ea24f820da7fdb',
		'img/costumes/sets/male/9_3.png' : 'c9080e5e4459553d60bd01842f76f548',
		'img/costumes/sets/male/9_4.png' : '6059a76be4c630009b2a0474374afee5',
		'img/costumes/sets/male/10_1.png' : '60df879c2c757607745d88f012214f6e',
		'img/costumes/sets/male/10_2.png' : 'f774154b8747f65abb30e47579037f6b',
		'img/costumes/sets/male/10_3.png' : '52c4e30eeb86834ab5db9171e8901150',
		'img/costumes/sets/male/10_4.png' : '1a62e4b6bb4f3d862be6ba352a9d182d',
		'img/costumes/sets/male/14_1.png' : '85968287141285890f757cb0a8ae0d68',
		'img/costumes/sets/male/14_2.png' : 'cb88dd0a169e3fec5954e0171f0137e1',
		'img/costumes/sets/male/14_3.png' : '2e16cd5a941f90191742209809edd41f',
		'img/costumes/sets/male/14_4.png' : '597cc8cab1892c042c43fb63d9cf0cc0',
		'img/costumes/sets/male/15_1.png' : '10d1cdf01711ffa70fe95e68fe097996',
		'img/costumes/sets/male/15_2.png' : '71f10219dd4ee73329dce05f846f8a69',
		'img/costumes/sets/male/15_3.png' : 'a3e6c54962453470ff9d727e734bdbd4',
		'img/costumes/sets/male/15_4.png' : '9f8a9bc5bfacac0f20d98d360256d32f',

		'img/costumes/sets/female/1_2.png' : 'cc2360ac6a464bba520e1cced14a8d49',
		'img/costumes/sets/female/1_3.png' : '77c3dfdcfc9854ebefe4cdf2c73a524a',
		'img/costumes/sets/female/1_4.png' : '6709bab3092b931f973ba79310c10c55',
		'img/costumes/sets/female/1_5.png' : 'afaafd29cc9daeb4b96cd7dbc724d364',
		'img/costumes/sets/female/2_2.png' : 'e17726d851d2dce17462ef7a9d003cc7',
		'img/costumes/sets/female/2_3.png' : 'bfacc73c9be7ae0587bac9834ad1a231',
		'img/costumes/sets/female/2_4.png' : 'a30e096e76c7d0a46bca53eb5bc8c8a6',
		'img/costumes/sets/female/2_5.png' : 'd5da9cf32f2df5791dc40cff28b542ee',
		'img/costumes/sets/female/3_2.png' : 'fcffc690310f4dd4f4a9b5e0ceab6cdb',
		'img/costumes/sets/female/3_3.png' : 'e65bad9b81973e34d32307a104ccce34',
		'img/costumes/sets/female/3_4.png' : '28aec7def35daa0ae177691d77a1d101',
		'img/costumes/sets/female/3_5.png' : '29856cbfb311e61c80bee2486066b00f',
		'img/costumes/sets/female/4_2.png' : '427b0a8746edb272d12f27e569f3a46f',
		'img/costumes/sets/female/4_3.png' : '197d2cf1506e828e449174cc1040343f',
		'img/costumes/sets/female/4_4.png' : '531348febf8b18052ad316785de75e3d',
		'img/costumes/sets/female/4_5.png' : '271f89af95c0ba580e444097febf2e1e',
		'img/costumes/sets/female/5_2.png' : '4b74b8760472a463a38a5fa154002cfb',
		'img/costumes/sets/female/5_3.png' : '6aa82af38492d388798c8f5ab2896090',
		'img/costumes/sets/female/5_4.png' : 'ff355aeff4a0d6c9d64e94ce848dd622',
		'img/costumes/sets/female/5_5.png' : '527a99d929e4699d6d125ab5594d245e',
		'img/costumes/sets/female/6_2.png' : 'eb62438b0e0132653c822efb6df1dc15',
		'img/costumes/sets/female/6_3.png' : '231f0309f2e3dadbd4a4766a8e526173',
		'img/costumes/sets/female/6_4.png' : '66d10400f4d0773e1b747d20acb97a99',
		'img/costumes/sets/female/6_5.png' : '386937eca7b9eb11fd413dc094e359d3',
		'img/costumes/sets/female/7_2.png' : '40c9802cfb1429d9f1b1df8671417949',
		'img/costumes/sets/female/7_3.png' : '9c85bbfbaa407ae959fcc592e5944807',
		'img/costumes/sets/female/7_4.png' : '6805c9c8b371c6a2854874dc8f714faf',
		'img/costumes/sets/female/7_5.png' : '888dfd236cadc4911da8bf483772a66e',
		'img/costumes/sets/female/7_6.png' : '7fcf05925b6f3981313d18eab8248201',
		'img/costumes/sets/female/7_7.png' : '4c1d647411f950ddca5d2a5cc12dc8b1',
		'img/costumes/sets/female/8_2.png' : '53d4a34dfe2269c93282f9ffac86fb4d',
		'img/costumes/sets/female/8_3.png' : '452e1472c1cb110df4b97bff9216dc96',
		'img/costumes/sets/female/8_4.png' : '7278d650b8f159cc8947fd63ea44c753',
		'img/costumes/sets/female/8_5.png' : '1cf011b7dc2d911b1ca2b7fc91245b84',
		'img/costumes/sets/female/9_1.png' : '34c6a8ae3c3513b99fdf29ed700b0ef5',
		'img/costumes/sets/female/9_2.png' : 'c498e5034899a801c3e76bccd313482f',
		'img/costumes/sets/female/9_3.png' : 'adf5a5b9ac312eafd812a2ba708c7029',
		'img/costumes/sets/female/9_4.png' : '9adf972c6c9c67a2553a9e924f26c424',
		'img/costumes/sets/female/10_1.png' : '358ddf63106de606106cf3b787481eb9',
		'img/costumes/sets/female/10_2.png' : '16c49657878358057efaf5756aedef3a',
		'img/costumes/sets/female/10_3.png' : 'b9143704a529a10b4f88d8add8f4e3b1',
		'img/costumes/sets/female/10_4.png' : '1d3bc23fdee388bc3813e27512158813',
		'img/costumes/sets/female/14_1.png' : '2f7de3c7e0b91daac2ad550ac096cf9e',
		'img/costumes/sets/female/14_2.png' : 'f05813b24214bbdf40e8392fe65d4d1f',
		'img/costumes/sets/female/14_3.png' : 'db66642119a2f9dff1393fe13e96b5ee',
		'img/costumes/sets/female/14_4.png' : '652f5b0a83026d5327be6784b76a2770',
		'img/costumes/sets/female/15_1.png' : '93f1cfd8f5cd08a90dae1e914a8541bd',
		'img/costumes/sets/female/15_2.png' : '06ae4c05e7be9e9d88771132154c8580',
		'img/costumes/sets/female/15_3.png' : '0afe8246f37663a6aaed3308687c93ae',
		'img/costumes/sets/female/15_4.png' : 'b9e7daf51681591e1db40941efd51c5b',
		
		// Event - Desert of Nightmare
		'img/npc/{desert-of-nightmare}_1.png' : '3041aac04d5fce085c2767c2a8db5d66',
		'img/npc/{desert-of-nightmare}_2.png' : '7fdf904e7e5c4b784571284de85337a7',
		'img/npc/{desert-of-nightmare}_3.png' : 'd7bbc3f61e27192208bd831485c06e97',
		'img/npc/{desert-of-nightmare}_4.png' : 'cc560d5ee6518ec1802bf66f8f436046',

		// 'img/ui/gods/vulcanus_s16.png' : '', // no specific hash
		// 'img/ui/gods/minerva_s16.png' : '', // no specific hash
		// 'img/ui/gods/mars_s16.png' : '', // no specific hash
		// 'img/ui/gods/merkur_s16.png' : '', // no specific hash
		// 'img/ui/gods/diana_s16.png' : '', // no specific hash
		// 'img/ui/gods/apollo_s16.png' : '', // no specific hash
		// 'img/logo/0/tmp/2-7.png' : '', // no specific hash
		// 'img/ui/icon_recruiting_points.png' : '', // no specific hash
		// 'img/shop/forging.png' : '', // no specific hash
		// 'img/shop/smelting.png' : '', // no specific hash
		// 'img/shop/workbench.png' : '', // no specific hash
		// 'img/shop/shop_avatar_1_magus.png' : '', // no specific hash
		// 'img/shop/shop_avatar_2_magus.png' : '', // no specific hash
		// 'img/shop/shop_avatar_4_magus.png' : '', // no specific hash
		'img/item.png' : '8b84fd3f76ff45db7d2cdbf5680aa09b',
	        'img/menu.png' : 'd77850696ce9bc0251751e88456338a8', 
		'img/menu_rtl.png' : '3c4cc8b57835e9ac3dc9150efe125159', 
	        'img/interface.png' : '4aabffd21441d06c0b0268ddfc42fbab', 
		// 'img/buff/xp.png' : '',
		'img/buff/gold.png' : 'f579b1d11b94b3e1ae434a6eb319be51', 
		'img/buff/dungeon.png' : '20c1747770343a8657a6b5db2ac9b171', 
		// 'img/buff/ ' : '917e476babb7bcde470ae77c4816e1b0', // durability icon
		'img/buff/healing.png' : 'f0aab1305010907594934939cb2de129',
		'img/buff/cooldown.png' : '742bae611990945bca86e33d2e6fc9f8',
		'img/buff/rubin_left.png' : 'ad3f2a1dd8bcaf1a611a9ad79fae506c',
		// 'img/buff/rubin_right.png' : '',
		'img/buff/points_limit.png' : '6ca8ede9fe3ace74ade40cb7b786128d',
		'img/ui/layout/banner_top.png' : '8dd5692f8bbc9ea3740c11985a873798', 
		'img/premium/box/amount.png' : '548a77525fd06e0f52db0d1ba8964570', 
		'img/ui/expedition_points2.png' : 'e4add5f2cc36b27f4719bf2f2772b33d',
		// '' : '',
		// '' : '',
		// '' : '',
		// '' : '',
		// '' : '',
		// '' : '',
		// '' : '',
		// '' : '',
	},

	lookup_gif : {
		'img/res2.gif' : '6b71e68d38f81ee6f96a618f33c672e0',
		'img/res3.gif' : '9203d0e8e4718d33a582132485433bb7',
		'img/spacer.gif' : 'ef51e70e9023ed2ea9d2b2acea6e3e07',
		'img/ui/spinner.gif' : 'e4234472afb925ddb203ad99cb2ec0b0',
		'img/ui/icon_honor_small.gif' : 'c943438b7e5563870240831358dc6a1a',
		'img/ui/icon_level_small.gif' : 'c943438b7e5563870240831358dc6a1a',
		'img/energie_rot.gif' : 'e2d27eeec7274b65d407bb0cbc502bbb',
		'img/energie_gelb.gif' : 'cc009b6ab0537fae300ea58cce1e4eee',
		'img/energie_gruen.gif' : '7498f0b5f90e8fc485f8ddd251fb3cac',
		// 'img/faces/gladiator_40_f_11.gif' : '',
		// 'img/faces/gladiator_40_m_14.gif' : '',
		'img/shop/shop_zelle.gif' : '64dd2c8d49efdaeb1ea0ed4d01883d9b', 
		'img/interface_ar/messages.gif' : '010b70a488ee312aef4a42ff53c88c62', 
		'img/news/icon_4.gif' : '8bce2030c658c6e4ad851333bc608644',
		'img/news/icon_7.gif' : 'c551104639947a3b8744de40099b4497',
		'img/powerups/powerup_1.gif' : '62908aa633848089ce281dc81659b4bf', 
		'img/powerups/powerup_2.gif' : '1dfb4f2b64dcdaec0b6bf94ced8b091e',
		'img/powerups/powerup_3.gif' : '92fa7b458af4e2bfee9c3f1bcefa3b19',
		'img/powerups/powerup_4.gif' : '49c422ef306d0633183b7331b4ee6012', 
		'img/fordern.gif' : '13e48a51408f7676d184b6bd8f25e0542', //War Master Hall
		// '' : '',
		// '' : '',
		// '' : '',
	}
};

// Location specific
gca_cdn.lookup_jpg_by_location = {
	'9' : {
		'img/npc/2/1_30.jpg' : gca_cdn.lookup_jpg['img/npc/2/1_30.jpg']
	}
};

// Load Stuff
(() => {
	// Remove script
	document.currentScript.remove();
})();
