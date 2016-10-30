
## Progress on Version 4.0.0




### Global Script

- [ ] Global (Changes on every game page)
	- [ ] Preloading
		- [x] Cache event bar's position (moving it before page loads) [if needed]
		- [x] Disable submenu change on page load (prevent menu change if mouseover) \["global","submenu_click_to_change"\]
		- [x] Enable page x-Scroll \["global","x-scroll"\]
		- [x] Preload item shadow \["global","item_shadow"\]
	- [ ] Onload
		- [x] ✎	Resolve game mode (travel / underworld / dice event / server quest) - Add more modes?
		- [x] Resolve page's direction Left-to-Right or Right-to-Left
		- [x] Show addon's version on the bottom (also add link to homepage)
		- [ ] ❗	Show premium/centurio days on top (may be removed / translation need)
		- [x] Extend hp/xp info
			- [x] Show more info \["global","extended_hp_xp_info"\]
				- [x] ✎ Life potion shortcut \["global","extended_hp_xp_info_potion"\] (should not work in Underword)
			- [x] Time for full life \["global","hp_timer_for_full_life"\]
		- [x] Button bar \["global","shortcuts_bar"\]
			- [x] Create (added option to select which buttons)
			- [x] Online friends
			- [x] Guild donate
			- [x] ✎	Player stats (no data / ugly) \["stats", "player"\]
		- [x] Auction status
			- [x] Auction bar \["global","auction_status_bar"\]
			- [x] Status notification \["global","auction_status_notification"\]
		- [x] Move event bar (if button bar / auction status / hp-xp info)
		- [x] Top bar \["global","top_fixed_bar"\]
		- [x] Advance menu \["global","advance_main_menu"\]
			- [x] Remember toggle tabs
		- [x] Menu click to change \["global","submenu_click_to_change"\]
		- [x] Attacked timers \["global","attacked_timers"\]
		- [x] Quest timer \["global","quest_timer"\]
		- [ ] Merchants Timer (not recoded yet) \["global","merchants_timer"\]
		- [x] ✎	Add Item shadow - Is it working ok? \["global","item_shadow"\]
		- [x] Dice event timer \["global","craps_timer"\]
		- [x] Remember merchants tabs \["global","remember_tabs"\]
		- [x] Guild application alert \["global","notify_new_guild_application"\]
			- [x] Check Interval \["timers", "notify_new_guild_application"\]
		- [x] {Underworld} Pray buff shortCut
		- [ ] Notification on weapon down
		- [ ] Sound notifications for Missions, Dungeons and Arenas
		- [ ] Gold / Experience stats monitor
		- [ ] Player update in the GCA Highscore (if we keep the highscore) OR make a Global Arena
		- [ ] "New version" installed message
		- [ ] Improved Traveling Inteface (disabled buttons and menus that you can not visit)
		- [ ] Packages Expire Warning (Set the number of hours for the warning +  Tooltip with the next expire hours on packages button)
		- [ ] Share an item's stats to guild message
		- [ ] Bag Interface:
			- [ ] Storage Info (Under every bag! Guild, Overview, Merchants...)
			- [ ] On SHIFT keydown, change the "move amount" status
			- [ ] right-click menu on items (eat, move to inventory) 
			- [ ] Move chackbox on the side
		- [ ] Work / Pray / Traveling, The exact finish time (date-time) is shown next to remaining time 




### Overview Scripts

- [ ] Overview
	- [x] Resolve overview (get doll etc)
	- [x] Eat/food features
		- [x] Food life gain (onmouseover)
		- [x] Items that will give you more Life Point than you need will be transparent
		- [x] Food show best food (yellow shadow)
	- [x] ✎ Daily bonus log (Needs testing / Not in settings)
	- [ ] Show the cap values of Resilience and Block
	- [ ] Display for each mercenary its tooltip (base stats)
	- [ ] Mercenaries management Interface
	- [x] Items' shadow
	- [ ] Save costume's properties
	- [x] ✎ Drag&Drop item to see the material needed to repair it (Not in settings/No translatios)


- [ ] Overview Stats
	- [x] Show more stats
	- [ ] Show graphs of stats from reports


- [x] Overview Achievements
	- [x] Improve Layout


- [ ] Overview Family
	- [ ] List with other players you are interested in




### Pantheon Script

- [ ] Pantheon Quests
	- [x] Quests order by category
	- [x] Finished and Failed quests on top
	- [x] Quests detailed rewards
	- [ ] Last location indicator
	- [x] Save timer


- [ ] Pantheon Missions
	- [ ] ✎	Show completed missions


- [ ] Pantheon Gods
	- [ ] ✎	Layout Inprove - needed ?
	- [ ] Recolored buttons based of each god's favor 
	- [ ] Percent(%) of points, red color on 100%


- [ ] Pantheon Mystery Box
	- [ ] Open all
	- [ ] Reload reward untill to find selected
	- [ ] Calculate rewards quality




### Guild Script

- [ ] Guild Jail Interface
	- [x] Cells are now visible with the creatures inside
	- [x] Creatures are now sorted by level


- [ ] Guild Library Interface: 
	- [x] Level of each buff and what the buff do are now directly visible 
	- [ ] Red bg and transparency for item that you can't store in library 
	- [ ] Gold in guild bank after the use of buff is displayed in a tooltip over the buff cost 
	- [ ] Cost per stat point of each buff is displayed in a tooltip over the buff time 
	- [x] Some style changes (ex. enable/delete buttons) 


- [ ] Guild Bank Interface: 
	- [ ] Better style (Counting)
	- [ ] Correcting the donate field code to number type 
	- [ ] Button to add all the gold in the donate field
	- [ ] Advanced Guild Bank Book Interface
		- [x] The sum of donations (total) is displayed 
		- [x] Percent of donated amount of each player 
		- [x] Ex-guild members are hidden (click to show them) 
		- [ ] Merge continued donations of the same player 
		- [ ] Day separators
		- [ ] Highlight  me


- [ ] Guild Medic Interface 
	- [ ] More information over your life changes 
	- [ ] Guild's life preview page


- [ ] Guild War Camp:
	- [ ] More stats & better win-lost-draw icons features were implemented 
	- [ ] Member reports features were implemented
	- [ ] Button that shows the raided gold next to each attack 


- [ ] Guild Buildings:
	- [ ] Upgrade Calculator was implemented and highly improved


- [ ] Guild Mail Interface 
	- [ ] Improved style
	- [ ] Check / Uncheck options for each guild members group 


- [ ] Guild Memebers List Interface
	- [ ] Opponent Guild: Attack buttons next to each member of a guild (member list), usefull for guild wars (old type)
	- [ ] See which members have been attacked within 75 min 


- [ ] Guild Admin Interface
	- [ ] Search for players with no guild, from the guild admin page 




### Work Script

- [ ] Work
	- [ ] Interface improve




### Arena Script

- [ ] Arena
	- [ ] Order players by level on Cross Server Arenas
	- [ ] Enemy datails (win / losses)
	- [ ] Link to the simulator




### Training Script

- [ ] Training
	- [x] Show basic points bars
	- [ ] Show stats changes on upgrade
	- [ ] Training Cost calculator 
	- [ ] Propose points to upgrade
	- [ ] Show caps and cap points changes (crit, block, avoid)
	- [ ] Double hit calculator




### Merchants Script

- [ ] Merchants
	- [ ] Mouse click events (double click sell buy)
	- [ ] Cross merchants item search
	- [ ] Remember merchants tabs
	- [ ] Items you can buy are highlighted 




### Auction Script

- [ ] Auction
	- [ ] Theme(s) support
	- [ ] Colored items based on quality
		- [ ] Background color
		- [ ] Shadow item
	- [ ] Items you can afford
	- [ ] Hide your gold system / More info about prices (value compared to price) 
	- [ ] Advance search options (Gold limit, Damage for weapons, etc) 
	- [ ] Item Preffix search list 
	- [ ] Item Suffix search list 
	- [ ] More levels in the search options 
	- [ ] Level of each item is visible (up-right corner) 
	- [ ] Item levels you can see in auction are shown when you mouse over the (!) icon
	- [ ] Number of Price/Value % on auction Auction (ex. "(153%)")
	- [ ] Button announcing to guild, with a mail, the auction status
	- [ ] Multiple bids (no refresh)
	- [ ] Hide the last row (guide line) of mercenaries' tooltips (better compare view)
	- [ ] Display for each mercenary its tooltip when on mercenaries




### Market Script

- [ ] Market
	- [ ] Item Preffix search list
	- [ ] Item Suffix search list
	- [ ] More levels in the search options 
	- [ ] Cancel all items with one button (if "load all pages" is open this will also work) 
	- [ ] Style fixes 
	- [ ] Load all the pages 
	- [ ] Item levels you can see in market are shown when you mouse over the (!) icon
	- [ ] Select the default sell duration (2h, 8h etc) in the GCA options (default 24h)
	- [ ] Red on items that are souldbound
	- [ ] Price per unit




### Locations Script

- [ ] Locations
	- [ ] Hide the building's labels in city/country, guild, underworld maps
	- [ ] Show buildings level in guild's map
	- [x] ✎ Show enemies' materials most dropped (drops changed? new drops?)
	- [ ] Underword enemies interface converted to old style




### Messages Script

- [ ] Messages
	- [x] Style changes
		- [x] Guild message
		- [x] Private message
		- [x] Announcement
	- [ ] Day separators 
	- [ ] Automatic code identification
		- [ ] Convert all URL to links
		- [ ] Youtube videos to videos
	- [x] Load guild battles report
	- [ ] Icon next to Guild Master's message (or color, sth for admins too?)
	- [ ] Auto-remove last lines of each message, if they are empty (trim messages)
	- [ ] Warning icon and item links on auction bid messages
	- [ ] Tab link on incomming folder


- [ ] New Message
	- [x] Auto focus message
	- [x] List of friends and guild mates to choose a player
	- [x] Bigger textarea




### Reports Script

- [ ] Reports
	- [x] Improved style / Day separators 
	- [x] Rewarded items stats on mouse over (tooltips)
	- [ ] Gather drop information
	- [ ] Gather stats
	- [ ] Show battle stances next to theoretical
	- [ ] Post new drops OR post them on every report




### Packages Script

- [x] ✎	Packages
	- [x] Filters on the side
	- [x] Compact layout
	- [x] Item shadow
	- [x] ✎	Better item add/remove wrapper - catch no item etc.
	- [x] ✎	Load more pages - paging fix (has a bug when on last page)




### Server Backup Script

- [ ] Server Backup
	- [ ] redirect




### Player Script

- [ ] Player Interface (Logged in or not)
	- [ ] Simulator Button (direct to results link for premium users) 
	- [ ] Show which item stats points are coming from clear points and which from percent bonus 
	- [ ] Mercenaries 
		- [ ] visible mercenary's tooltip (base stats, same as in overview)
		- [ ] Visible mission type (icon: Medic, Damage, Protect yourself - with tooltip) 
	- [x] Player Stats page ratios and totals
	- [ ] Buff bar over players


- [ ] Player Description:
	- [ ] Preview when you edit your description 




### Forge Script

- [ ] Forge Interface
	- [ ] Links to your bag and the market of the remaining required smelt items




### GCA News Script

- [ ] GCA News
	- [ ] Display gca news




### Translations Script

- [ ] Translations
	- [ ] New system




### Audio Script

- [ ] Audio Manages
	- [ ] Setup system




### Black Market Script

- [ ] Black Market
	- [ ] Set up system


