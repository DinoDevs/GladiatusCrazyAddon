## Progress on Version 4.2.1 [Beta]

![version type](https://img.shields.io/badge/version-beta-yellow.svg?style=flat-square)
![improvements](https://img.shields.io/badge/improvements-23-green.svg?style=flat-square)
![bug fixes](https://img.shields.io/badge/bug%20fixes-19-red.svg?style=flat-square)
![translations](https://img.shields.io/badge/translations-3-blue.svg?style=flat-square)

### IMPROVEMENTS
- **General**
	- [x] After gold donation show gold left (in case the page was outdated)
	- [x] Full recipes info were added, new options added for materials on tooltips (data load on the background)
	- [x] Backup redirect back to game, not to lobby (Gladiatus bug)
	- [x] Added notification when guild war attack cooldown is over (default disabled)
	- [x] Clicking some notification will redirect you to the relevant page (auction, smeltery, workbench, guild etc) (thanks mehmetkaradeniz)
	- [x] Reserving position when auto-moving items
- **Overview**
	- [x] Double click to consume item (disabled by default)
- **Forge & Smeltery**
	- [x] Added button to send all completed smelts as packages
	- [x] Added item shadow on forge and smeltery
	- [x] Added horreum materials info under forge (before forge start)
	- [x] Forge: Added tooltips on materials with owned amounts per quality
- **Guild**
	- [x] Added player rank on application accept (no Admin rank for now)
	- [x] Added show changes since last visit on guild donations book
	- [x] Added double-click to guild storage
- **Packages**
	- [x] Show icon 📜 on items that consist of unknown scrolls (doesn't when in category "all")
	- [x] UI improvements: Remove level on gold item and durability when 100%
- **Search**
	- [x] Added guild mates and target list highlighting
- **Settings**
	- [x] Added option to clear cached data
- **Messages**
	- [x] Added shortcut links to messages folders when in messages
- **Reports**
	- [x] Threat calculation on each round added in turma reports analyzer
	- [x] Turma reports analyzer improvements (identify same name mercenaries of different owner)
- **Training**
	- [x] Multi-train is now limited to maximum training possible at the current level
	- [x] Cost estimate in not limited to 99 trainings anymore, if such trainings are possible at the current or next level
- **Merchants**
	- [x] Added search-box to find items in merchants


### BUG FIXES
- **General**
	- [x] GCA homepage and Simulator links changed
	- [x] Edge browser compatibility fixes
	- [x] Fixed many right-to-left UI bugs (reports, global arena, horreum, market)
	- [x] Fixed failed to match guild tag when checking online players
	- [x] Fixed active bonuses bug #163
	- [x] Fixed 0 user id (this may clear your data)
- **Packages**
	- [x] Fixed souldbound icons bug (caused the script to crash)
	- [x] Soul-bound icon code was running twice
- **Arena**
	- [x] Ignore attack confirmations was rescripted
	- [x] Fixed crash when less than 5 players on the list (thanks laku)
- **Training**
	- [x] Multi-train and cost prediction fixes when free training points are available
	- [x] Small style tweaks
- **Achievements**
	- [x] Fixed rtl servers visual bug
- **Forge**
	- [x] Guild message success notification now is green
	- [x] Disallow items drop directly from the char doll
	- [x] Code running bug fix when submod is "index"
- **Highscore**
	- [x] Fixed error on highscore script
- **Guild**
	- [x] Jail: Fixed Pope Sasama's image issue on some servers
- **Settings**
	- [x] Firefox small visual bug on player description preview fix


### TRANSLATIONS
-  **Updates**
	- [x] Fixed pl translation mistake
	- [x] Updated Estonian by [R3alSt4r](https://github.com/R3alSt4r)
	- [x] Updated Croatian by [Tharacius](https://github.com/Tharacius)


#### Know issues
- Gold/Exp data charts N/A bug #40
