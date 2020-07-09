## Progress on Version 4.3.0 [Beta]

![version type](https://img.shields.io/badge/version-beta-yellow.svg?style=flat-square)
![improvements](https://img.shields.io/badge/improvements-30-green.svg?style=flat-square)
![bug fixes](https://img.shields.io/badge/bug%20fixes-21-red.svg?style=flat-square)
![translations](https://img.shields.io/badge/translations-4-blue.svg?style=flat-square)

### IMPROVEMENTS
- **General**
	- [x] After gold donation show gold left (in case the page was outdated)
	- [x] Full recipes info were added, new options added for materials on tooltips (data load on the background)
	- [x] Backup redirect back to game, not to lobby (Gladiatus bug)
	- [x] Added notification when guild war attack cooldown is over (default disabled)
	- [x] Clicking some notification will redirect you to the relevant page (auction, smeltery, workbench, guild etc) (thanks mehmetkaradeniz)
	- [x] Reserving position when auto-moving items
	- [x] Display mercenaries real names (type) on tooltips
	- [x] Added Global Arena timer
- **Overview**
	- [x] Double click to consume item (disabled by default)
- **Forge & Smeltery**
	- [x] Smeltery: Added button to gather all completed smelts
	- [x] Added item shadow on forge and smeltery
	- [x] Added horreum materials info under forge (before forge start)
	- [x] Forge: Added tooltips on materials with owned amounts per quality
- **Guild**
	- [x] Applications: Added player rank on application accept (no Admin rank for now)
	- [x] Donation Book: Highlight donations changes since last visit
	- [x] Storage: Added move by double-click
	- [x] War Camp: Added link to Gladiatorius and direct attack button for each enemy guild 
- **Packages**
	- [x] Show icon 📜 on items that consist of unknown scrolls
	- [x] UI improvements: Remove level on gold item and durability when 100%
	- [x] More settings for special category features
- **Search**
	- [x] Added guild mates and target list highlighting
- **Settings**
	- [x] Added option to clear cached data
- **Messages**
	- [x] Added shortcut links to messages folders when in messages
- **Reports**
	- [x] Turma reports analyzer improvements
		- Identify same name mercenaries of different owner
		- Calculate threat on each round
		- Show more fight stats (average damage/heal, misses/hits, points %)
- **Training**
	- [x] Multi-train is now limited to maximum training possible at the current level
	- [x] Cost estimate in not limited to 99 trainings anymore, if such trainings are possible at the current or next level
- **Merchants**
	- [x] Added search-box to find items in merchants
- **Arena**
	- [x] Added Global Arena fight reports
- **Market**
	- [x] Items placed in the sell box can now be sold by pressing [ENTER]
- **Auction**
	- [x] New button (coin icon) that hides/shows items that have a lower value than bid price


### BUG FIXES
- **General**
	- [x] GCA homepage and Simulator links changed
	- [x] Edge browser compatibility fixes
	- [x] Fixed many right-to-left UI bugs (reports, global arena, horreum, market)
	- [x] Fixed failed to match guild tag when checking online players
	- [x] Fixed active bonuses bug #163
	- [x] Fixed 0 user id (this may clear your data)
	- [x] Avoid the use of innerHTML in a number of scripts
	- [x] Fixed Gold & Exp data tracker bug #40
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
	- [x] Updated English and Greek
	- [x] Updated Estonian by [R3alSt4r](https://github.com/R3alSt4r)
	- [x] Updated Croatian by [Tharacius](https://github.com/Tharacius)
