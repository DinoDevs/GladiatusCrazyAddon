## Progress on Version 4.3.6 [Beta]

![version type](https://img.shields.io/badge/version-beta-yellow.svg?style=flat-square)
![improvements](https://img.shields.io/badge/improvements-24-green.svg?style=flat-square)
![bug fixes](https://img.shields.io/badge/bug%20fixes-16-red.svg?style=flat-square)
![translations](https://img.shields.io/badge/translations-6-blue.svg?style=flat-square)
[![images](https://img.shields.io/badge/🖼️-Preview-blueviolet.svg?style=flat-square)](/documentation/PROGRESS_W_IMG.md)

### IMPROVEMENTS
- **Global**
	- [x] Preparations for Manifest v3
	- [x] Item names in forge/smelt timers tooltip are now colored based on item quality (by @MiguelSOliveira)	
	- [x] Show mercenary real name: Names are now translated automatically if previously seen in auction
	- [x] Menu shortcuts: added new auction menu entry [+] with various shortcuts	
	- [x] Shortcuts bar: added button to guild baths Vox I (#372)	
	- [x] Display buff values on reinforcements & upgrades
	- [x] Settings: option to disable/enable overall Gladiatus site (style) fixes & improvements (#403)
	- [x] Lock sections: The current state of all sections that can be hidden can now be locked or unlocked in the settings (#160)
	- [x] Hide flags: Language flags under player names can now be hidden if enabled in the settings (#377)
	- [x] Added a scroll to bottom button to the top bar
	- [x] The settings/book icon was moved from footer to header for better visibility and to be always more "at hand"
	
- **Auction**
	- [x] Show item names (disabled by default, by @MiguelSOliveira)
        	
- **Accessibility**
	- [x] Added loot per side in reports lists (#337)

- **Guild**
	- [x] Added a button to the guild message page to select all important ranks (Master + Admin)
		
- **Guild Bath**
	- [x] Pin message that will be displayed at the top of messages (#348)            
	
- **Merchants**
	- [x] Items that costs rubies can now have an icon (#355)
	- [x] Item color quality search now remembers last picked color (#360)	
	
- **Forge**
	- [x] Forging time is now displayed under the required resources in the tooltip (#350)	
	- [x] Added a button to Horreum materials table to close all categories if opened
	
- **Market**
	- [x] Added button to include fees in the market price (#308)

- **Underworld**
	- [x] Expedition shortcut will always redirect to the last open location (#223)

- **Packages**
	- [x] Packages can be displayed as a list view (#323, #309)
	- [x] Packages page can now have shortcuts to item categories

- **Items**
	- [x] Added a max stats comparison for mercenaries in tooltips (#371)

### BUG FIXES
- **Global**
	- [x] Fixes for gladiatus' new version
	- [x] Style fix for double line tab names when shortcuts bar is active along with an event
	- [x] Show online family members fixes (#314)
	- [x] Style fix for stats box (shortcuts bar) rendering behind event timers (#367)
	- [x] Fixed script not detecting the page direction
	- [x] Some missing translations were added
	- [x] Player detection improvements (#213, #351) 

- **Accessibility**
	- [x] Improve experience on mobile phones

- **Forge**
	- [x] Fixed a loop when getting items from workbench (Firefox) (#335)
	- [x] Style adjustments on book of scrolls (lists with known prefixes & suffixes)

- **Settings**
	- [x] Export settings to notes: messing up `&"'<>` chars bug fixed

- **Messages**
	- [x] Fixed styling of the success/failure notice in new message layout (#357)

- **Achievements**
	- [x] Fixed Category 16 (event titles) not being recognized and failing (#370)
        
- **Reports**
	- [x] Fixed Turma/Dungeon analyzer style problems (#375)
	- [x] Fixed an enemy detection error in Underworld when fighting yourself and getting a secondary drop (material) (#368)

- **Items**
	- [x] Fixed a console error when moving an item from guild storage directly to an item (#369)


### TRANSLATIONS
-  **Updates**
	- [x] Czech update by @FrutyX
	- [x] German update by @Sleeping*Shadow
	- [x] Greek update by @GreatApo
	- [x] Portuguese update by @MiguelSOliveira
	- [x] Turkish update by @mattemre
	- [x] Croatian update by @0eXer
