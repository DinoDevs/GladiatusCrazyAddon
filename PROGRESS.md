## Progress on Version 4.1.1

![version type](https://img.shields.io/badge/version-beta-yellow.svg?style=flat-square)
![improvements](https://img.shields.io/badge/improvements-30-green.svg?style=flat-square)
![bug fixes](https://img.shields.io/badge/bug%20fixes-30-red.svg?style=flat-square)
![translations](https://img.shields.io/badge/translations-6-blue.svg?style=flat-square)

### IMPROVEMENTS
- **General**
	- [x] Show time until full expedition/dungeon points recovery
	- [x] Show dungeon points when in areas without dungeons
	- [x] Horreum numbers readability changes (white & green colors adjustments)
	- [x] Craft material for more items added
	- [x] Guild message text cache (what ever you type on the quick guild message is drafted)
	- [x] Image cache improvements
	- [x] Added 2 more shortcut buttons (disabled by default)
	- [x] Double click will stack same items instead of loading them on a new spot
- **Reports**
	- [x] Rewarded items have border based on their quality
	- [x] Attack back/again button next to each arena/turma report (↺)
- **Expedition**
	- [x] Added material's name on the material drop tooltip
- **Market**
	- [x] Added button that changes the price to item's value
	- [x] Red/Green shadow added on scrolls you know/don't know (when searching for scrolls)
	- [x] Warning icons when selling item (soulbound & can't buy back)
- **Arena**
	- [x] Global Arena: link to global highscore added
	- [x] Global Arena: your guild name is now visible
	- [x] Global Arena: guild-mates appear green
	- [x] Global Arena: more translations added
- **Player**
	- [x] Show the durability % of other players' items
	- [x] Buff bar: added life refresh rate buff (underworld + pray)
	- [x] Show additional player information under their description
- **Packages**
	- [x] New 🔗 icon indicating a soul-bound item
	- [x] Added placeholders for pages to be loaded
- **Forge**
	- [x] Added button to show/hide player dolls at forge/smelt/workbench
	- [x] Send guild message for needed materials now can be edited
	- [x] Item links to gladiatus-tools.com for more items information
	- [x] Total available in Horreum materials are shown in the quality drop-down
	- [x] Fist available quality material is auto selected in the drop-down
- **Pantheon**
	- [x] Show amounts of owned rewards
- **Settings**
	- [x] Data export includes arena target list data


### BUG FIXES
- **General**
	- [x] Stability improvements and tweaks
	- [x] Audio random dependency error fix
	- [x] Removed recipe materials' amounts from the tooltips (were invalid)
	- [x] Item tooltips materials are now correct (but no amounts, too big data to load on every refresh)
- **Reports**
	- [x] Improved battle analyzer (better name matching and conflicts handling)
- **Messages**
	- [x] Fixed new guild member detection bug
- **Packages**
	- [x] Learned/Unlearned scrolls detect fix
	- [x] Packages item gold fix for amounts
	- [x] Added lithuanian exception (threat, healing) on advance packages filters
- **Arena**
	- [x] Guild members were not highlighted in cross-server turma
	- [x] Fixed wrong error message when Global Arena request is blocked
	- [x] Add to target list now works when on multiple opened tabs
- **Merchants**
	- [x] Double click does not buy items that worth rubies anymore (to avoid mistakes)
- **Guild**
	- [x] Guild buildings script not loading on update
	- [x] Guild storage character items were not highlighted based on quality
- **Auction**
	- [x] Do not save player/mercenary (doll) on auction remember feature
	- [x] The bid button will be disabled after a successful bid
	- [x] "Levels you can see" were not shown at the top of the page
- **Market**
	- [x] Fixed bug when canceling all the packages in the last page of the market resulting in showing no packets after
	- [x] Fixed layout bug on the sell mode (bug on Firefox based browsers)
	- [x] Fixed wrong market links on advance menu
	- [x] Guild Market script now don't run on admin page
	- [x] Fixed no confirmation box bug (on soulbond or 1g items)
- **Dice Event**
	- [x] Fixed timer/info bugs
- **Server Quests**
	- [x] Fixed event cool-down timers to scale based on server's speed
	- [x] Fixed timer cool-down after server quest attack failed [testing, attack while working]
- **Mobile Accessibility**
	- [x] Messages actions are visible without mouseover
- **Settings**
	- [x] Empty language select option removed
- **Player**
	- [x] Show critical buff fix
- **Settings**
	- [x] Export data was not working on Firefox


### TRANSLATIONS
-  **Updates**
	- [x] Greek updated
	- [x] Romanian updated
	- [x] Turkish updated
	- [x] Polish updated
	- [x] German updated
	- [x] Chinese updated

----

### TODO
- [ ] Improve mobile accesibility

