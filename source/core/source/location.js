/*
 * Addon Location Script
 * Author: DarkThanos, GreatApo
 */

// Location
var gca_location = {
	inject : function(){
		
		// If underworld
		if (document.getElementById('underwold_enemies')) {
			// Improve Underworld Layout
			(gca_options.bool('expedition', 'underworld_layout') && 
				this.layout.improve_underworld());
		}
		
		// Normal World
		else {
			(gca_options.bool('expedition', 'show_enemy_drops') && 
				this.layout.show_drops.show());
		}

		// Setting Link
		gca_tools.create.settingsLink('expedition');
	},

	// Layout Improvements
	layout : {
		
		// Improve Underworld expedition layout
		improve_underworld : function(){
			document.getElementById('showPreviousEnemy').style = 'display:none;';
			document.getElementById('showNextEnemy').style = 'display:none;';
			document.getElementById('underwold_enemies').className = 'gca-underwold_enemies';
		},

		// Show drops on expedition enemies
		show_drops : {

			// The commented values are invalid
			cdn_npc_lookup : {
				'7c3d25bc04df401afab3897e6ee29d1d' : '/img/npc/0/0_1.jpg',
				'b8bda95f9cd934159f87c91c88846401' : '/img/npc/0/0_2.jpg',
				'1660756c3103999414d17b4c4bea6c66' : '/img/npc/0/0_3.jpg',
				'a6205b44898fb836d9aa2a066d892894' : '/img/npc/0/0_4.jpg',
				'1e7a5c2e00d3285b7a8860ec55abedb2' : '/img/npc/0/0_5.jpg',
				'9c18ae74ddab70c975f0f99302560a96' : '/img/npc/0/0_6.jpg',
				'dc57f844ccf4ddd43a73512dd50cb664' : '/img/npc/0/0_7.jpg',
				'7e2b37847da8cb3b4b056b43daefe881' : '/img/npc/0/0_8.jpg',
				'51c97426564f83096bae6509fc2b301b' : '/img/npc/0/0_9.jpg',
				'c5187db1c5f7b02ad0aba1165a2ab65e' : '/img/npc/0/1_1.jpg',
				'9e0550a4e5a48939030000ceb9760ff2' : '/img/npc/0/1_2.jpg',
				'cc54bea8c392de770ad52a7eca865473' : '/img/npc/0/1_3.jpg',
				'a184fc557e5f50794c904c7b139b266a' : '/img/npc/0/1_4.jpg',
				'd93584fd10b18283c202b1c472ecb04f' : '/img/npc/0/1_5.jpg',
				'beb79b22242ca01a49a1de4cce531a42' : '/img/npc/0/1_6.jpg',
				'67cd2d7eed71992c311ff16d280daa9d' : '/img/npc/0/1_7.jpg',
				'359601ed8377e2fa4d8a3c0c395a3ea5' : '/img/npc/0/1_8.jpg',
				'89d5754ffadd87a19ede2c20b1bc9604' : '/img/npc/0/1_9.jpg',
				'8cd722e66b1319f3f6cb6d503b3d824c' : '/img/npc/0/1_10.jpg',
				'a7e8d22b72011f53b3a72e30c7582a9f' : '/img/npc/0/1_11.jpg',
				'ea0b6866827dd5a5a5b06f044d4474bb' : '/img/npc/0/1_12.jpg',
				'4ca7bcd9f43d8f36e52d883f9d3e55a1' : '/img/npc/0/1_13.jpg',
				'561eb1c71b47acd3e3023585cfa783c7' : '/img/npc/0/1_14.jpg',
				'8ebe89a6fe6f47a87f53cdf6edd8ac94' : '/img/npc/0/1_15.jpg',
				'50d6b951917128124076726b828b4c25' : '/img/npc/0/1_16.jpg',
				'0dbaf81253e8f0420279f0e14b72c2a5' : '/img/npc/0/1_17.jpg',
				'bf9e8bbe18d3d45f0e820d32cf730543' : '/img/npc/0/1_18.jpg',
				'7e6e062106b25f33b28692a7c4aebcd4' : '/img/npc/0/1_19.jpg',
				'abe4fb2466866bddeea0c26a68a6b3ea' : '/img/npc/0/1_20.jpg',
				'6c161b921bae1ff254f34e466875ec42' : '/img/npc/0/1_21.jpg',
				'f5234d2ba5754a96987be0babc627f9d' : '/img/npc/0/1_22.jpg',
				'f5234d2ba5754a96987be0babc627f9d' : '/img/npc/0/1_23.jpg',
				'6c161b921bae1ff254f34e466875ec42' : '/img/npc/0/1_24.jpg',
				'f89ee2fc8b59b0973412864dfe749ccc' : '/img/npc/0/1_25.jpg',
				'22b5ec9d386f70509a9a02740c21e826' : '/img/npc/0/1_26.jpg',
				'9ff30549d00ff8e417e0d9f178b3bbbc' : '/img/npc/0/1_27.jpg',
				'39d556b93d1dd46c37ec1a8632078886' : '/img/npc/0/1_28.jpg',
				'04cdf8c84c5a96423c6a6c6ee9484ac1' : '/img/npc/0/1_29.jpg',
				'0ac4cb0f5a6bcf237d0b21376ecd155c' : '/img/npc/0/1_30.jpg',
				'bddf2b1cb493880f91253822059ec813' : '/img/npc/0/1_31.jpg',
				'88f139aa89d27dbacf7b91ee6bcea7d2' : '/img/npc/0/1_32.jpg',
				'63f559ab2226acf7e5b5a5d6dccff28d' : '/img/npc/0/1_33.jpg',
				'34d31b305686a94d897e695d52dd3261' : '/img/npc/0/1_34.jpg',
				//'f4b2321e2b3f19fcfe79b81f00ddabc1' : '/img/npc/0/1_35.jpg',
				//'6e22c2724c9cf93ef8d44fb7e2deb623' : '/img/npc/0/1_36.jpg',
				//'8840142760a38d0f413a585408192d12' : '/img/npc/0/1_37.jpg',
				//'8630bc28dd4dcde9cc5ee32fd7ca093b' : '/img/npc/0/1_38.jpg',
				//'772e3e3a1edac5a43b2faea9706d66f1' : '/img/npc/0/1_39.jpg',
				//'89503e03d8fc26f8be73b100cfe4d0d9' : '/img/npc/0/1_40.jpg',
				//'fec198bed086554783fde1597a3390ff' : '/img/npc/0/1_41.jpg',
				//'be365e4a9475feae21f9b65d214dfdde' : '/img/npc/0/1_42.jpg',
				'7cd4d5e444152aee4b6bd676beec6a3f' : '/img/npc/0/2_1.jpg',
				'6303de0e8dbdfecbfc716985caf96318' : '/img/npc/0/2_2.jpg',
				'a111637175ff2a6b31f60b190a08a1d6' : '/img/npc/0/2_3.jpg',
				'd4abee5a7a9ae55db33d7c23149fb9b7' : '/img/npc/0/2_4.jpg',
				'c8fad777425795021b8a8a5a8555058c' : '/img/npc/0/2_5.jpg',
				'b52f058bc58f7ea66f601e21d7b133c8' : '/img/npc/0/2_6.jpg',
				'c345041d84700b2c824c92fe99338392' : '/img/npc/0/2_7.jpg',
				'019260c98631e1faf6a2647ebaaaa1e8' : '/img/npc/0/2_8.jpg',
				'f63eec422be1fd658bae6d628a329e65' : '/img/npc/0/2_9.jpg',
				'e8f06d243e54e18f14b6e37c94d5bcbf' : '/img/npc/0/2_10.jpg',
				//'f1568a2b96e19c9a61ba64dfc8366e2f' : '/img/npc/0/2_11.jpg',
				//'20559c85adcda781f1c9c074f7aaca75' : '/img/npc/0/2_12.jpg',
				//'0a3c5a960a49c43c40e56896e9de2e24' : '/img/npc/0/2_13.jpg',
				//'11f93cf36db4b1d0c5b48f6df67bfd12' : '/img/npc/0/2_14.jpg',
				//'af1b10116bd527c57cef364fef5b097e' : '/img/npc/0/2_15.jpg',
				'1edbed7f18ab302ac7446a3b5b1592ed' : '/img/npc/1/0_1.jpg',
				'e1a00db35bd203ed49db6e276bbb62ea' : '/img/npc/1/0_2.jpg',
				'a45c7b73d8dc8d0781bb2225db2fa49c' : '/img/npc/1/0_3.jpg',
				'4e3339f2e3aa07b81be81b6ff38aebfc' : '/img/npc/1/0_4.jpg',
				'40dc384a8570e2e8a0545970f7b3327a' : '/img/npc/1/0_5.jpg',
				'2e7d93d46978c9f71fba8f57e0e7863b' : '/img/npc/1/0_6.jpg',
				'56d31dfb62b2f7bf25bff743c1641174' : '/img/npc/1/0_7.jpg',
				'd03511bf3d850f9a62f9a2a6b62d2873' : '/img/npc/1/0_8.jpg',
				'51c97426564f83096bae6509fc2b301b' : '/img/npc/1/0_9.jpg',
				'e1b28ec72a53cbb684b838d25ed205ff' : '/img/npc/1/1_1.jpg',
				'739a8088faade8c7ca9d77c16915cea3' : '/img/npc/1/1_2.jpg',
				'e06e195ef656d7e1c3614aa5bc98be7b' : '/img/npc/1/1_3.jpg',
				'039f1050696c2acfc9502ba5864e3b32' : '/img/npc/1/1_4.jpg',
				'1f3d1f8fc82d77d568db9db5aba2503f' : '/img/npc/1/1_5.jpg',
				'f28dcaae8700cb60cc32bd58843a915e' : '/img/npc/1/1_6.jpg',
				'784c99043689a5eb4756d131f2e24d3c' : '/img/npc/1/1_7.jpg',
				'ae90148352efef3eb89ba72ab1272e2a' : '/img/npc/1/1_8.jpg',
				'1ff5afc0d5900b9e68958dc6d4885a3b' : '/img/npc/1/1_9.jpg',
				'766e750cdb955edd80ed7dc4a4178965' : '/img/npc/1/1_10.jpg',
				'7182b1558c5f5eff9d9bfa43f8065822' : '/img/npc/1/1_11.jpg',
				'0966f88708c7e3209764a65779228f82' : '/img/npc/1/1_12.jpg',
				'0be5a6df9e00cdeffe0557b08281498a' : '/img/npc/1/1_13.jpg',
				'25448d76cfa4777a8866ee858318ed29' : '/img/npc/1/1_14.jpg',
				'84754306975170a6256d9e5e0b0572bd' : '/img/npc/1/1_15.jpg',
				'dfc51232d0d8c741c69108bf5857b2e0' : '/img/npc/1/1_16.jpg',
				'3656a1b89cd8778a0f33884153c7e52e' : '/img/npc/1/1_17.jpg',
				'5c570124818466e6b9e0c0825c2dd79d' : '/img/npc/1/1_18.jpg',
				'887ff34bd4cf4d5c63eeaadae021cbb7' : '/img/npc/1/1_19.jpg',
				'1bc846ecb527c274375b63e07aecfe9e' : '/img/npc/1/1_20.jpg',
				'fdfaaeb9f9bc808cea06d840bdf89a48' : '/img/npc/1/1_21.jpg',
				'77e4258f347ed39653613e4927005536' : '/img/npc/1/1_22.jpg',
				'46c07ad06be35b733c6e9696c84dcd19' : '/img/npc/1/1_23.jpg',
				'0652eb1c3db4ac7d81ec490abd92f1b7' : '/img/npc/1/1_24.jpg',
				//'a2e43fe445c4ccedd826b333bff8023f' : '/img/npc/1/1_25.jpg',
				//'e0eb7f95b1b16e176c4a41b321a18f8b' : '/img/npc/1/1_26.jpg',
				//'95c43250eca250b58b90a6c5a5d55339' : '/img/npc/1/1_27.jpg',
				//'3fe305eaca5dc5ee3f5dd592229b71a2' : '/img/npc/1/1_28.jpg',
				'6d999cd42b9848a67654fcbe3116994d' : '/img/npc/1/2_1.jpg',
				'8ebbdd16be875d5c6700a3d2e52714d9' : '/img/npc/1/2_2.jpg',
				'7c8ec7992963b6df700d7aa0e9ddf8bb' : '/img/npc/1/2_3.jpg',
				//'ccc2eec908ec26535f1ca00aec69f057' : '/img/npc/1/2_4.jpg',
				//'676c3fbf4c1680031b5d5c51e1d8f3e5' : '/img/npc/1/2_5.jpg',
				//'7422627722a76b2b0c1b83a428c36320' : '/img/npc/1/2_6.jpg',
				//'c8b1c57ea54c0af5d27dfe1d2a43d2a8' : '/img/npc/1/2_7.jpg',
				//'4151d3ab5b16c608ea5a393452d34132' : '/img/npc/1/2_8.jpg',
				//'52c152e278c0a709fb4e1b8b62a10816' : '/img/npc/1/2_9.jpg',
				//'d3c96b582170c2db541eb4e6885f9838' : '/img/npc/1/2_10.jpg',
				//'083b6c5702811191a41dd48f6ff89647' : '/img/npc/1/2_11.jpg',
				//'d0a9f8ea7fcb4a0c5c599769cbacc8a0' : '/img/npc/1/2_12.jpg',
				//'9503810bf5f6167050acbac0af435c27' : '/img/npc/1/2_13.jpg',
				//'db5d492fed616cf30cf66d53b5f76e3c' : '/img/npc/1/2_14.jpg',
				//'d5c3bfdb6b8f8b0b21fa10db1e4a8a38' : '/img/npc/1/2_15.jpg',
				//'003451d7ceaf34b2e265c5f3e7982c51' : '/img/npc/1/2_16.jpg',
				'5ad53b8015b3cdacbcd3ac5452fb0de1' : '/img/npc/2/0_1.jpg',
				'2137a5d7e6388be4ddd7781de0ae6a4b' : '/img/npc/2/0_2.jpg',
				'8a8090da7df5fdfcfe3fabca7c69df03' : '/img/npc/2/0_3.jpg',
				'40b8580e09beb8cea9cb16b14c2cf015' : '/img/npc/2/0_4.jpg',
				'aa7b573ef6374ac99a05a34ba1a8088f' : '/img/npc/2/0_5.jpg',
				'6ae94415e68616ae1d6c7668b4c27fad' : '/img/npc/2/0_6.jpg',
				'53161d56d89537cbcc639e73fb0a1383' : '/img/npc/2/0_7.jpg',
				'8d6f2a60de2428ed066fa4d892865a49' : '/img/npc/2/0_8.jpg',
				'51c97426564f83096bae6509fc2b301b' : '/img/npc/2/0_9.jpg',
				'51feea0e7f835a473849731f0cb50d07' : '/img/npc/2/1_1.jpg',
				'330d305e7413c5ece236868dfc11a363' : '/img/npc/2/1_2.jpg',
				'a7e8d22b72011f53b3a72e30c7582a9f' : '/img/npc/2/1_3.jpg',
				'e9dc3c1437184dc782eef80852a72067' : '/img/npc/2/1_4.jpg',
				'86ac32278e5d2d411e551c00a7e27365' : '/img/npc/2/1_5.jpg',
				'b44eb495e21a9b96e710fb183858a1ec' : '/img/npc/2/1_6.jpg',
				'edee5e8b73fa23851b7f333e5f23abe4' : '/img/npc/2/1_7.jpg',
				'426c32ec62e4957d8017a441cd15fbb6' : '/img/npc/2/1_8.jpg',
				'e947509349370b0177718c69957b0809' : '/img/npc/2/1_9.jpg',
				'8cd722e66b1319f3f6cb6d503b3d824c' : '/img/npc/2/1_10.jpg',
				'9b2a2a3b9c020967488a1a63b55901b5' : '/img/npc/2/1_11.jpg',
				'455306754cd00ead254e12e12af72df4' : '/img/npc/2/1_12.jpg',
				'9d4e58e03b23464b30ccc761d5f83fcf' : '/img/npc/2/1_13.jpg',
				'ef3b00d40cfc3b0966e87912d3cf1d99' : '/img/npc/2/1_14.jpg',
				'6745b92282b17682779039633d48b41d' : '/img/npc/2/1_15.jpg',
				'466206ebe87ee36e0dd668e47ba03f05' : '/img/npc/2/1_16.jpg',
				'6d10ccd94afff7fc9f4f7e75a413fc51' : '/img/npc/2/1_17.jpg',
				'e266f08dfe0a1ebe29a5378585d3f69f' : '/img/npc/2/1_18.jpg',
				'e09e3cabe4ce06b8be6c7e1eb1488734' : '/img/npc/2/1_19.jpg',
				'a3741500539bd4084e80bf0ca4ef3a03' : '/img/npc/2/1_20.jpg',
				'8c229fb54f29c3563324291bb3049a3c' : '/img/npc/2/1_21.jpg',
				//'3e34c66de26971658d11f9a2caae4db1' : '/img/npc/2/1_22.jpg',
				//'475ad3e6fd076ec3cd12dd9f6fc47cb4' : '/img/npc/2/1_23.jpg',
				//'ebf840d429f94fd0b0a0cf9114182615' : '/img/npc/2/1_24.jpg',
				//'a3ce9bf2fabc6c2bc947a000e9f02a82' : '/img/npc/2/1_25.jpg',
				//'8881b610a31a9b78d457372c84a1ce23' : '/img/npc/2/1_26.jpg',
				//'5b5484e0f3b14aad8f8b48baa124a55d' : '/img/npc/2/1_27.jpg',
				//'75fddc5a714acae226320e1f3985915c' : '/img/npc/2/1_28.jpg',
				'bf1a2a56307f51d82dcf6581534a392d' : '/img/npc/2/1_29.jpg',
				'93230fc8d3268e05c79944a17ca8b58b' : '/img/npc/2/1_30.jpg',
				'195223495ed346f0b37786f2c519246f' : '/img/npc/2/1_31.jpg',
				'2aad144e0643fa82b36de31b4d9b7b1c' : '/img/npc/2/1_32.jpg',
				'6aee6c6305b48b14824c1e7274d788e8' : '/img/npc/2/2_1.jpg',
				'2a728d564d1a03ad9d01893b832dc303' : '/img/npc/2/2_2.jpg',
				'02c4efbf6a6f2e1e85a8a9d4ea7b9e3f' : '/img/npc/2/2_3.jpg',
				//'92f669e63df5aec1c63b7c82c7cfda5f' : '/img/npc/2/2_4.jpg',
				//'217fac9c6cda767232bc09b49ae02c06' : '/img/npc/2/2_5.jpg',
				//'6d999cd42b9848a67654fcbe3116994d' : '/img/npc/2/2_6.jpg',
				//'3c62c0dd61d991f3c5b3d7a82cd685ef' : '/img/npc/2/2_7.jpg',
				//'4d36f3cc65d138294bc7c41509ef6909' : '/img/npc/2/2_8.jpg',
				'e84e901247e1413cdcbb48a3a9d5612e' : '/img/npc/2/2_9.jpg',
				//'d25c139b77c0201d7b3b064f53518ab4' : '/img/npc/2/2_10.jpg',
				//'bfa3aef9e00833740776161cf2ae2f5f' : '/img/npc/2/2_11.jpg',
				//'90284de464cfbcc3a2e33883d3503b6b' : '/img/npc/3/0_2.jpg',
				//'5be29d72d8074dd4cc5321802a627479' : '/img/npc/3/0_3.jpg',
				//'41181e91d1d3236066a7c274db51c605' : '/img/npc/3/0_4.jpg',
				//'aa469834f12b2ee5a41a2ad20e57170d' : '/img/npc/3/1_1.jpg',
				//'75b696ee085cc1ba783947781d0aa24d' : '/img/npc/3/1_2.jpg',
				//'7f7b45150b70a6da4724717111db036f' : '/img/npc/3/1_3.jpg',
				//'703381ef3e2d7dee8277f0e165e312bb' : '/img/npc/3/1_4.jpg',
				//'47132c8dcd464cb9e2484987aface536' : '/img/npc/3/2_1.jpg',
				//'272b7d208012181747ec2e94e3426b46' : '/img/npc/3/2_2.jpg',
				//'36dce2c7f9b6c5fb021709f9161081b7' : '/img/npc/3/2_3.jpg',
				//'4c3a45f569ec337c6adb09ed059eabe5' : '/img/npc/3/2_4.jpg',
				//'ceac6ca1a45d1ec902072f3a14b27518' : '/img/npc/3/3_1.jpg',
				//'07bd9abf9ae466ed23aae565661e2029' : '/img/npc/3/3_2.jpg',
				//'fcc655505f49ccabe243a006b9b45e7e' : '/img/npc/3/3_3.jpg',
				//'61df961108d9f086a14062f161e199f3' : '/img/npc/3/3_4.jpg',
				//'9334f1028eacba2dd3cf6409167607df' : '/img/npc/4/0_1.jpg',
				//'cc2f7d4c407b4e4f777014084ad4412f' : '/img/npc/4/0_2.jpg',
				//'0e949e1a3e35a1a93410e4e98128079d' : '/img/npc/4/0_3.jpg',
				//'e961d41a7569f6441f272f1064dfb6f3' : '/img/npc/4/0_4.jpg',
				//'17f3cb9a00b5d8dfad63a8a3d3625dd6' : '/img/npc/4/0_5.jpg',
				//'4f90a19a0d1667303dc979629296ef71' : '/img/npc/4/0_6.jpg',
				//'5235b507d9525669a3ef098c9e8e85dc' : '/img/npc/4/0_7.jpg',
				//'8e54e1b448d34c01d0f1c5d5f7fa58aa' : '/img/npc/4/0_8.jpg',
				//'51c97426564f83096bae6509fc2b301b' : '/img/npc/4/0_9.jpg',
				'd5d8f31cde7ace688220b2cba25bcf8c' : '/img/npc/4/1_1.jpg',
				'8f0c426efa269027825980ea90db1df3' : '/img/npc/4/1_2.jpg',
				'c345a1e26918f9ce3e9ad00aeb01274b' : '/img/npc/4/1_3.jpg',
				'767852341b86709930ce5a964928ca0b' : '/img/npc/4/1_4.jpg',
				'3015fc7f911e5de59fa899a907e1d172' : '/img/npc/4/2_1.jpg',
				'c02eba3e1443a935c8c7c33c9c6898d2' : '/img/npc/4/2_2.jpg',
				'e9bb23f71f767176ca2444f8bc1c2865' : '/img/npc/4/2_3.jpg',
				'89ac050c99b685658f5b65511ac83d45' : '/img/npc/4/2_4.jpg',
				//'c2a474580a0e4fd19f7990532c064604' : '/img/npc/4/3_1.jpg',
				//'34cc0c80e527503c1b074407e746a0c3' : '/img/npc/4/3_2.jpg',
				//'e4417400de107ee48b811efd66dce15a' : '/img/npc/4/3_3.jpg',
				//'c5b3c8a465e288c9211b4d6272d692f1' : '/img/npc/4/3_4.jpg',
				//'fca1ff0fda2a8079c11f69fb0c8311ae' : '/img/npc/4/4_1.jpg',
				//'9579474af297df287385a087f828a3b9' : '/img/npc/4/4_2.jpg',
				//'62b23ca64c300005611da826fb07fd29' : '/img/npc/4/4_3.jpg',
				//'ef28313eb51b992c45f35e498036e7fe' : '/img/npc/4/4_4.jpg',
				//'0c0ec352be06b8cf1a24c144abd21199' : '/img/npc/4/5_1.jpg',
				//'9ce4a8baf2dbcbc6bf9576c14d392ca3' : '/img/npc/4/5_2.jpg',
				//'e4f822b3e9958abdecf4bb83c9cb906e' : '/img/npc/4/5_3.jpg',
				//'1febc10b7638b3801701e8e6c5c7adbc' : '/img/npc/4/5_4.jpg',

				'ae904194973d21066c96cb414d04d676' : '/img/expedition/enemy_unknown.jpg'
			},

			// Drops Data
			drops : {
				"2/2_3" : [33,51],
				"2/2_2" : [11,8],
				"2/2_1" : [48,49],
				"2/1_9" : [17,31],
				"2/1_8" : [37,11],
				"2/1_7" : [45,43],
				"2/1_6" : [42,23],
				"2/1_5" : [48,5],
				"2/1_4" : [9,17],
				"2/1_32" : [35,47],
				"2/1_31" : [27,26],
				"2/1_30" : [22,42],
				"2/1_3" : [48,32],
				"2/1_29" : [51,6],
				"2/1_21" : [36,10],
				"2/1_20" : [7],
				"2/1_2" : [18,9],
				"2/1_19" : [28,27],
				"2/1_18" : [38,39],
				"2/1_17" : [39,21],
				"2/1_16" : [50,46],
				"2/1_15" : [43,38],
				"2/1_14" : [45,22],
				"2/1_13" : [22,32],
				"2/1_12" : [50,36],
				"2/1_11" : [52,7],
				"2/1_10" : [23,51],
				"2/1_1" : [40,8],
				"1/2_3" : [22,19],
				"1/2_2" : [35,49],
				"1/2_1" : [49,35],
				"1/1_9" : [34,40],
				"1/1_8" : [37,39],
				"1/1_7" : [12,38],
				"1/1_6" : [12,7],
				"1/1_5" : [29,32],
				"1/1_4" : [7,20],
				"1/1_3" : [41,42],
				"1/1_24" : [21,14],
				"1/1_23" : [11,10],
				"1/1_22" : [8,41],
				"1/1_21" : [24,29],
				"1/1_20" : [23,24],
				"1/1_2" : [35,16],
				"1/1_19" : [45,44],
				"1/1_18" : [13,34],
				"1/1_17" : [46,30],
				"1/1_16" : [27,50],
				"1/1_15" : [33,23],
				"1/1_14" : [50,52],
				"1/1_13" : [16,33],
				"1/1_12" : [41,12],
				"1/1_11" : [44,19],
				"1/1_10" : [47,45],
				"1/1_1" : [19,6],
				"0/2_9" : [46,38],
				"0/2_8" : [36,6],
				"0/2_7" : [30,33],
				"0/2_6" : [26,48],
				"0/2_4" : [29,12],
				"0/2_3" : [49,47],
				"0/2_2" : [10,28],
				"0/2_10" : [42,5],
				"0/1_9" : [52,14],
				"0/1_7" : [44,8],
				"0/1_6" : [5,18],
				"0/1_4" : [31,11],
				"0/1_34" : [6,5],
				"0/1_32" : [32,40],
				"0/1_30" : [21,9],
				"0/1_3" : [5,9],
				"0/1_29" : [6,16],
				"0/1_28" : [46,15],
				"0/1_27" : [52,24],
				"0/1_26" : [43,51],
				"0/1_25" : [41,30],
				"0/1_23" : [6,31],
				"0/1_22" : [39,28],
				"0/1_21" : [25,5],
				"0/1_20" : [14,25],
				"0/1_2" : [18,13],
				"0/1_19" : [28,44],
				"0/1_18" : [15,26],
				"0/1_17" : [15,25],
				"0/1_16" : [43,37],
				"0/1_15" : [16,14],
				"0/1_14" : [47,27],
				"0/1_13" : [20,10],
				"0/1_12" : [34,40],
				"0/1_11" : [30,21],
				"0/1_10" : [26,13],
				"0/1_1" : [20,17]
			},

			// Show
			show : function () {
				// Get resources locale
				this.locale = gca_data.section.get('cache', 'resource_locale', false);
				// Get enemies
				let pictures = document.getElementsByClassName('expedition_picture');
				
				// Get local data
				let localData = gca_data.section.get("data", "enemy_drops", []);
				let cleanLocalData = [] // save here drops without the known enemies resources drops 
				let dataCleanNeeded = false
				let groupedLocalData = {}
				// Loop through local data and group the material drops by enemy
				for (let i = 0; i < localData.length; i++) {
					let item = localData[i];
					
					// Check if drop is a material
					if (item[1].substring(0,3) == "18-"){
						let enemy = item[0].replace(/\..+$/g, "");
						
						// If we have data for this enemy
						if (this.drops[enemy]) {
							dataCleanNeeded = true;
							continue;
						}

						let material = parseInt(item[1].substring(3), 10); // Remove '18-' and parse as integer
						//console.log(enemy +" - "+ material)
						
						//if (!groupedLocalData.includes(enemy))
						if (!(enemy in groupedLocalData))
							groupedLocalData[enemy] = {};
						
						//if (groupedLocalData[enemy].includes(material))
						if (material in groupedLocalData[enemy]) {
							groupedLocalData[enemy][material] += 1;
						}
						else {
							groupedLocalData[enemy][material] = 1;
						}
						
						// Increase total
						if ("total" in groupedLocalData[enemy]) {
							groupedLocalData[enemy]["total"] += 1;
						}
						else {
							groupedLocalData[enemy]["total"] = 1;
						}
					}

					// Save to clean data
					cleanLocalData.push(item);
				}
				// Save clean data
				if (dataCleanNeeded){
					console.log("Saving cleared enemy drops");
					gca_data.section.set("data", "enemy_drops", cleanLocalData);
				}
				//console.log(groupedLocalData)

				// For each enemy
				i = 0;
				while (pictures[i] && pictures[i].getElementsByTagName('img')[0]) {
					// Get enemy id
					let cdnurl = pictures[i].getElementsByTagName('img')[0].getAttribute('src');
					let url = gca_tools.cdn.revLookUp(cdnurl, this.cdn_npc_lookup);
					if (!url) {
						console.error('Failed to reverse lookup url', cdnurl);
					}
					else {
						let enemy = url.match(/img\/(npc|expedition)\/([^.]+)\.(jpg|png)/i)[2];

						// If we have data for this enemy
						if (this.drops[enemy]) {

							// Two drops
							if (this.drops[enemy].length > 1) {
								this.createDropIcon(pictures[i], this.drops[enemy][0], '1', 45);
								this.createDropIcon(pictures[i], this.drops[enemy][1], '2', 25);
							}

							// Only one drop
							else {
								this.createDropIcon(pictures[i], this.drops[enemy][0], 'Only1', 70);
							}

						}

						// Look in local data
						else if (enemy in groupedLocalData) {
							// If enough data have been collected
							if (groupedLocalData[enemy]["total"] > 50){
								// Make a copy
								let obj = {...groupedLocalData[enemy]}

								// Remove total
								let total = obj["total"]
								delete obj["total"]
								
								// Show first drop
								let key = Object.keys(obj).reduce(function(a, b){ return obj[a] > obj[b] ? a : b });
								let chance = Math.round(obj[key] / total * 100);
								let chanceDetails = "(" + obj[key] + "/" + total + ") ";

								// Show only if drop chance is above X% (avoid showing low change drops)
								if (chance > 0){ // leave it on for now
									this.createDropIcon(pictures[i], key, '1', chanceDetails + chance);
									delete obj[key] // remove key before getting next highest

									// Show second drop
									if (Object.keys(obj).length > 0){
										key = Object.keys(obj).reduce(function(a, b){ return obj[a] > obj[b] ? a : b });
										chance = Math.round(obj[key] / total * 100);
										chanceDetails = "(" + obj[key] + "/" + total + ") ";
										this.createDropIcon(pictures[i], key, '2', chanceDetails + chance);
									}
								}
							}
						}
					}
					i++;
				}
			},

			createDropIcon : function(enemy, material, type, percent) {
				// Create tooltip
				let tooltip = [[[gca_locale.get('expedition', 'material_drop_chance', {number : percent}), 'white']]];
				if (this.locale) {
					tooltip[0].unshift([this.locale[material], 'white']);
				}

				// Create drop icon
				let drop = document.createElement("div");
				drop.className = 'item-i-18-' + material + ' enemyDrop enemyDrop' + type;
				gca_tools.setTooltip(drop, JSON.stringify(tooltip));
				enemy.appendChild(drop);
			}
		}

	}
};

// Onload Handler
(function(){
	var loaded = false;
	var fireLoad = function() {
		if(loaded) return;
		loaded = true;
		gca_location.inject();
	};
	if (document.readyState == 'interactive' || document.readyState == 'complete') {
		fireLoad();
	} else {
		window.addEventListener('DOMContentLoaded', fireLoad, true);
		window.addEventListener('load', fireLoad, true);
	}
})();

// ESlint defs
/* global gca_data, gca_locale, gca_options, gca_tools */
