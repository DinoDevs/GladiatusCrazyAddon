## Progress on Version 4.3.5 [Alpha]

![version type](https://img.shields.io/badge/version-alpha-yellow.svg?style=flat-square)
![improvements](https://img.shields.io/badge/improvements-14-green.svg?style=flat-square)
![bug fixes](https://img.shields.io/badge/bug%20fixes-18-red.svg?style=flat-square)
![translations](https://img.shields.io/badge/translations-5-blue.svg?style=flat-square)

### IMPROVEMENTS
- **Global**
	- [x] Improved addon's per page loading speed
	- [x] Gold & Exp stats: added button to reset data by FrutyX (#284)
- **Accessibility**
	- [x] Added option to turn item level indicator to white
	- [x] Added option to show item quality with symbols
	- [x] Added option to turn item tooltip titles to white 
	- [x] Added option to show item quality with symbols in tooltips
- **Buddy List**
	- [x] Attack by id not by name (issue #241)
- **Training**
	- [x] Added some clarification at the footnotes (#248)
- **Guild**
	- [x] Guild storage: merchant shop info is enabled (shows total gold of storage items) (#290)
- **Shortcuts bar**
	- [x] Added a new button - shortcut to food auctions (#291)
- **Settings**
	- [x] Reduce exported settings size
	- [x] Added settings export to player's notes functionality
	- [x] Range bars' values live update on change
	- [x] Updated on/off toggle buttons
	


### BUG FIXES
- **Global**
	- [x] Missing translations added (#248)
	- [x] Removed zero player's settings and blocked writes/reads to his storage (when the addon can not detect your user's id, it treats you as the zero player)
	- [x] Fixed missing resources on some items (#263)
	- [x] Gold & Exp stats: icon position fix (#257)
	- [x] Gold & Exp stats: added button to reset data (#248)
- **Packages**
	- [ ] Fix of double click bug (#238) [testing]
	- [ ] Improved double click spot locking mechanics [testing]
	- [x] Fixed bag pop over no background bug (#273)
	- [x] Fixed item price layout bug (#274)
- **Buddy List**
	- [x] Fixed scroll double error notifications (#242)
- **Guild**
	- [x] Medic site crash fix (#250)
	- [ ] Market kick to lobby fix (#240) [testing]
	- [x] Library feature "Add more data on library's tooltips" was working only when "Improve library's layout" was enable
	- [x] Guild upgrade gold difference small style fixes (#280)
- **Forge**
	- [x] Fixed scroll known retrieve crash (#243)
	- [x] Missing translation on horreum notification added (#246)
- **Workbench**
	- [x] Fixed failed to get item after workbench fix (#272)
- **Reports**
	- [x] Battle analyzer (Turma/Dungeon) style fix (#254)
	- [x] Battle analyzer (Turma/Dungeon) stats not showing fix (#256)
- **Settings**
	- [x] Fixed export that ignored some settings
	- [x] Removed unscripted feature from settings


### TRANSLATIONS
-  **Updates**
	- [x] Chinese update by @smoothGrace #215
	- [x] Czech update by @FrutyX
	- [x] German update by @Zitronenen
	- [x] Polish update by @Sorky96
	- [x] Greek update by @GramThanos
