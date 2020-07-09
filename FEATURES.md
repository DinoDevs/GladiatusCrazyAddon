
## Progress on Version 4.0.0

(This list is outdated)


### Global Script

- **Global** (Changes on every game page)
	- **Preloading**
		- [x] Cache event bar's position (moving it before page loads)
		- [x] Submenu needs click to change (prevent menu change if mouseover)
		- [x] Enable page horizontal-scroll
		- [x] Item shadow based on their quality
	- **Onload**
		- [x] Resolve game mode (travel / underworld / dice event / server quest / location event / Service wait screen)
			- [x] Event timers (event / dice event / server quest / location event)
		- [x] Resolve page's direction Left-to-Right or Right-to-Left
		- [x] Show addon's version on the bottom (also add link to homepage)
		- [x] Extend hp/xp info
			- [x] Show more info
			- [x] Life potion shortcut next to hp bar
			- [x] Time for full life
		- [x] Button bar
			- [x] Option to enable/disable buttons
			- [x] Online friends
			- [x] Guild donate
			- [x] Player stats
		- [x] Auction status bar + notifications
		- [x] Move event bar (if button bar / auction status / hp-xp info)
		- [x] Top bar when scrolling down, showing various info
			- [x] Add life bar on scroll bar
		- [x] Advance menu
			- [x] Remember toggle tabs
		- [x] Attacked timers
		- [x] Quest timer
		- [x] Merchants Timer
		- [x] Forge Timers (forge/smelt)
		- [x] Dice event timer
		- [x] Remember merchants tabs
		- [x] Guild application alert + Check Interval
		- [x] {Underworld} Pray buff shortCut
		- [x] Sound / Browser notifications for Missions, Dungeons and Arenas
		- [x] Gold / Experience stats monitor
		- [x] Go-to-top button on fixed-top-bar
		- [x] Centurio + PowerUps timers
		- [x] Inventory gold info
		- [x] Durability+Conditioning is shown on items, bottom left (default disabled)
		- [x] Warning when durability+conditioning of your gear is under a % (default 25%)
		- [ ] "New version" installed message
		- [ ] Improved Traveling Interface (disabled buttons and menus that you can not visit)
		- [ ] Packages Expire Warning (Set the number of hours for the warning +  Tooltip with the next expire hours on packages button)
		- [ ] Share an item's stats to guild message
		- [ ] Bag Interface:
			- [x] Storage Info (Under every bag! Guild, Overview, Merchants...)
			- [x] Move checkbox on the side
		- [ ] Work / Pray / Traveling, The exact finish time (date-time) is shown next to remaining time
		- [x] Link to addon's relevant settings page (bottom right corner)
		- [x] Show durability on items (like level indicator)
		- [ ] Tooltips compare enable-disable on mouse press (or on some pages)




### Overview Scripts

- **Overview**
	- [x] Resolve overview (get doll etc)
	- [x] Eat/food features
		- [x] Food life gain (onmouseover)
		- [x] Items that will give you more Life Point than you need will be transparent
		- [x] Food show best food (yellow shadow)
		- [X] Show red when in underworld
	- [x] Daily bonus log
	- [x] Show the cap values of Resilience and Block
	- [x] Display for each mercenary its tooltip (base stats)
	- [x] Mercenaries management Interface
	- [x] Items' shadow
	- [x] Save costume's properties
	- [x] Drag&Drop item to see the material needed to repair it
	- [x] Show buff's detailed timer on tooltip
	- [ ] Show average item durability


- **Overview Stats**
	- [x] Show more stats
	- [ ] Show information of gathered data to be posted on the server


- **Overview Achievements**
	- [x] Improve Layout


- **Overview Family**
	- [ ] List of other players you are interested in


- **Overview Costumes**
	- [x] Show part number for each costume




### Pantheon Script

- **Pantheon Quests**
	- [x] Quests order by category
	- [x] Finished and Failed quests on top
	- [x] Quests detailed rewards
	- [ ] Last location indicator
	- [x] Save timer


- **Pantheon Missions**
	- [x] Show completed missions


- **Pantheon Gods**
	- [x] Percent(%) of points, red color on 100%


- **Pantheon Mystery Box**
	- [x] Open all
	- [ ] Reload reward until you find selected OR reload when "opening all" if no selected
	- [x] Show rewards' value in rubies 




### Guild Script

- **Guild Jail Interface**
	- [x] UI improvements: Visible cells with the creatures inside
	- [x] Creatures are sorted by level


- **Guild Library Interface** 
	- [x] Level of each buff and what the buff do are now directly visible 
	- [x] Transparency for item that you can't store in library 
	- [x] Gold in guild bank after the use of buff is displayed in a tooltip over the buff cost 
	- [x] Cost per stat point of each buff is displayed in a tooltip over the buff time 
	- [x] Some style changes (ex. enable/delete buttons) 


- **Guild Bank Interface**
	- [x] Better style (Counting)
	- [x] Correcting the donate field code to number type 
	- [x] Button to add all the gold in the donate field
	- [ ] Advanced Guild Bank Book Interface
		- [x] The sum of donations (total) is displayed 
		- [x] Percent of donated amount of each player 
		- [x] Ex-guild members are combine
		- [ ] Merge multiple donations of the same player 
		- [ ] Day separators
		- [x] Highlight me


- **Guild Medic Interface** 
	- [x] More information over your life changes 
	- [ ] Guild's life preview page


- **Guild War Camp**
	- [X] Link to Gladiatorius and direct attack button for each enemy guild
	- [ ] More stats & better win-lost-draw icons features
	- [ ] Member reports features
	- [ ] Button that shows the raided gold next to each attack 


- **Guild Buildings**
	- [ ] Upgrade Calculator


- **Guild Mail Interface**
	- [ ] Improved style (like what?)
	- [ ] Check all by default (like what?)


- **Guild Members List Interface**
	- [ ] See which members have been attacked within 75 min 


- **Guild Admin Interface**
	- [ ] Search for players with no guild, from the guild admin page




### Work Script

- **Work**
	- [ ] Interface improve (like what?)




### Arena Script

- **Arena**
	- [x] Global Arena
	- [x] Order players by level on Cross Server Arenas
	- [ ] Show "Nemesis list"
	- [ ] Simulator buttons
	- [x] Option to ignore attack confirmations (default: disabled)




### Training Script

- **Training**
	- [x] Show basic points bars
	- [x] Show stats changes on upgrade
	- [x] Training Cost calculator
	- [ ] Propose points to upgrade
	- [x] Stats breakdown calculator (Block, Critical hits, Avoid critical, Double hits, hits, heal etc...)
	- [ ] Advance calculation (load heal from dungeon player + choose target player to calculate hits etc)




### Merchants Script

- **Merchants**
	- [x] Mouse click events (double click sell buy)
	- [x] Remember merchants tabs
	- [x] Fade items you can not buy
	- [x] Colored items based on quality


### Magus Script

- **Magus**
	- [x] Fade items you can not improve
	- [x] Colored items based on quality


### Auction Script

- **Auction**
	- [x] Colored items based on quality
	- [x] Items you can afford
	- [x] Hide your gold system / More info about prices (value compared to price) 
	- [ ] Advance search options (Gold limit, Damage for weapons, etc) 
	- [ ] Item Preffix/Suffix search list
	- [x] More levels in the search options 
	- [x] Level of each item is visible (up-right corner) 
	- [x] Item levels you can see in auction are shown in building's description
	- [x] Number of Price/Value % on auction Auction (ex. "(153%)")
	- [ ] Button announcing to guild, with a mail, the auction status
	- [x] Multiple bids without page refresh
	- [ ] Hide the last row (guide line) of mercenaries' tooltips (better compare view)
	- [ ] Display for each mercenary its tooltip when on mercenaries
	- [x] ✎	Extra stats shown on item images (only on food for now) (what else?)
	- [x] More min-levels in search options (from min to max item levels you can see, with a step of 2)




### Market Script

- **Market**
	- [ ] Item Preffix/Suffix search list
	- [ ] More levels in the search options 
	- [x] Cancel all items with one button (if "load all pages" is open this will also work)
	- [x] Item levels you can see in market are shown in building's description
	- [ ] Select the default sell duration (2h, 8h etc) in the GCA options (default 24h)
	- [ ] Price per unit
	- [ ] Constant sell value (selling mode)
	- [x] Red bg on items that are souldbound & confirmation on buy
	- [ ] Orange bg on 1g items
	- [x] Remember last chosen sell duration (default disabled)
	- [x] Remember last items' sort order (default disabled)
	- [x] Improve item's sort order with proper icons on table's header
	- [x] Default sell duration can be changed from settings
	- [x] Toggle button changing sell price to 1 gold




### Locations Script

- **Locations**
	- [x] ✎ Show enemies' materials most dropped (drops changed? new drops? new area... - underworld/events)
	- [x] Underworld enemies interface converted to old style




### Messages Script

- **Messages**
	- [x] New Layout
		- [x] Guild message
		- [x] Private message
		- [x] Announcement
		- [x] Guild Mates informations (level - rank)
	- [x] Highlight unread messages
	- [x] Day separators
	- [x] Show message links below
	- [x] Load guild battles report
	- [x] Sidebar buttons
		- [x] Show number of messages (per type)
		- [x] Click to go on message
	- [x] Fixes
		- [x] Fix header link click bug
	- [ ] Auto-remove last lines of each message, if they are empty (trim messages)
	- [ ] Warning icon and item links on auction bid messages


- **New Message**
	- [x] Auto focus message
	- [x] List of friends and guild mates to choose a player
	- [x] Bigger textarea




### Reports Script

- **Reports**
	- [x] Improved style / Day separators 
	- [x] Rewarded items stats on mouse over (tooltips)
	- [x] Gather information (materials dropped)
	- [ ] Gather stats
	- [ ] Show battle chances next to theoretical
	- [ ] Post gathered drops to server every 24h




### Packages Script

- [x] ✎	Packages
	- [x] Filters on the side
	- [x] Compact layout
	- [x] Item shadow
	- [x] ✎	Better item add/remove wrapper - catch no item etc.
	- [x] ✎	Load more pages - paging fix (has a bug when on last page)
	- [x] New item category "Event items"




### Player Script

- **Player Interface** (Logged in or not)
	- [ ] Simulator Button (direct to results link for premium users) 
	- [ ] Show which item stats points are coming from clear points and which from percent bonus 
	- [ ] Mercenaries 
		- [ ] visible mercenary's tooltip (base stats, same as in overview)
		- [ ] Visible mission type (icon: Medic, Damage, Protect yourself - with tooltip) 
	- [x] Player Stats page ratios and totals
	- [x] Buff bar over players
	- [ ] Show battle chances (ex. Double-Hit %)


- **Player Description**
	- [x] Preview when you edit your description 




### Forge Script

- **Forge/Smelt/Workbench/Hurreum Interface**
	- [x] Links to your bag and the market of the remaining needed materials (Forge/Workbench)
	- [x] Guild message with the remaining needed materials + probable quality (Forge/Workbench)
	- [x] Forge/Smelt timer on main menu + Notifications when done
	- [ ] Button when forge fails, to re-craft the item (scripted - has problems)
	- [ ] New storage interface




### Translations Script

- **Translations**
	- [x] ✎ New system




### Audio Script

- **Audio Manages**
	- [x] Setup system


