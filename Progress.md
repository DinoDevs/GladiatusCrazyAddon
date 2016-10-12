
Progess on Version 4.0.0


• Global (Changes on every game page)
-	Preloading
✔		Cache event bar's position (moving it before page loads) [if needed]
✔		Disable submenu change on page load (prevent menu change if mouseover) ["global","submenu_click_to_change"]
✔		Enable page x-Scroll ["global","x-scroll"]
✔		Preload item shadow ["global","item_shadow"]
-	Onload
✔✎		Resolve game mode (travel / underworld / dice event / server quest) - Add more modes?
✔		Resolve page's direction Left-to-Right or Right-to-Left
✔		Show addon's version on the bottom (also add link to homepage)
❗		Show premium days on top (may be removed / translation need)
✔		Extend hp/xp info
✔			Show more info ["global","extended_hp_xp_info"]
✔				Life potion shortcut ["global","extended_hp_xp_info_potion"]
✔			Time for full life ["global","hp_timer_for_full_life"]
✔		Button bar ["global","shortcuts_bar"]
✔			Create (added option to select which buttons)
✔			Online friends
✔			Guild donate
✔✎			Player stats (no data / ugly) ["stats", "player"]
✔		Auction status
✔			Auction bar ["global","auction_status_bar"]
✔			Status notification ["global","auction_status_notification"]
✔		Move event bar (if button bar / auction status / hp-xp info)
✔		Top bar ["global","top_fixed_bar"]
✔		Advance menu ["global","advance_main_menu"]
✔			Remember toggle tabs
✔		Menu click to change ["global","submenu_click_to_change"]
✔		Attacked timers ["global","attacked_timers"]
✔		Quest timer ["global","quest_timer"]
✖		Merchants Timer (not recoded yet) ["global","merchants_timer"]
✔✎		Add Item shadow - Is it working ok? ["global","item_shadow"]
✔		Dice event timer ["global","craps_timer"]
✔		Remember merchants tabs ["global","remember_tabs"]
✔		Guild application alert ["global","notify_new_guild_application"]
✔			Check Interval ["timers", "notify_new_guild_application"]
✔✎❗		{Underworld} Pray buf shortCut - Will we keep this? / No setting
✖		Display Centurio days left
✖		Notification on weapon down
✖		Sound notifications for Missions, Dungeons and Arenas
✖		Gold / Experience stats monitor
✖		Player update in the GCA Highscore (if we keep the highscore) OR make a Global Arena
✖		"New version" installed message
✖		Improved Traveling Inteface (disabled buttons and menus that you can not visit)
✖		Packages Expire Warning (Set the number of hours for the warning +  Tooltip with the next expire hours on packages button)
✖		Share an item's stats to guild message
✖		Bag Interface:
✖			Storage Info (Under every bag! Guild, Overview, Merchants...)
✖			On SHIFT keydown, change the "move amount" status
✖			right-click menu on items (eat, move to inventory) 
✖			Move chackbox on the side
✖		Work / Pray / Traveling, The exact finish time (date-time) is shown next to remaining time 


• Overview
✔		Resolve overview (get dol etc)
✖		Eat/food features
✖			Food life gain
✖			Items that will give you more Life Point than you need will be transparent
✖			Food show best food
✖		Daily bonus log
✖		Show the cap values of Resilience and Block
✖		Display for each mercenary its tooltip (base stats)
✖		Mercenaries management Interface
✖		Items' shadow
✖		Save costume's properties


• Overview Stats
✔		Show more stats
✔		Show graphs of stats from reports


• Overview Achievements
-	Preloading and Onload
✔		Improve Layout


• Overview Family
✖		List with other players you are interested in


• Pantheon Quests
✔✎		Quests order by category (missing category icons)
✔		Finished and Failed quests on top
✔		Quests detailed rewards
✖		Last location indicator
✔		Save timer


• Pantheon Missions
✎		Show completed missions


• Pantheon Gods
✎		Layout Inprove - needed ?
✖		Recolored buttons based of each god's favor 
✖		Percent(%) of points, red color on 100%


• Pantheon Mystery Box
✖		Open all
✖		Reload reward untill to find selected
✖		Calculate rewards quality


• Guild Jail Interface
✔		Cells are now visible with the creatures inside
✔		Creatures are now sorted by level


• Guild Library Interface: 
✔		Level of each buff and what the buff do are now directly visible 
✖		Red bg and transparency for item that you can't store in library 
✖		Gold in guild bank after the use of buff is displayed in a tooltip over the buff cost 
✖		Cost per stat point of each buff is displayed in a tooltip over the buff time 
✔		Some style changes (ex. enable/delete buttons) 


• Guild Bank Interface: 
✖		Better style (Counting)
✖		Correcting the donate field code to number type 
✖		Button to add all the gold in the donate field
✖		Advanced Guild Bank Book Interface
✔			The sum of donations (total) is displayed 
✔			Percent of donated amount of each player 
✔			Ex-guild members are hidden (click to show them) 
✖			Merge continued donations of the same player 
✖			Day separators
✖			Highlight  me


• Guild Medic Interface 
✖		More information over your life changes 
✖		Guild's life preview page


• Guild War Camp:
✖		More stats & better win-lost-draw icons features were implemented 
✖		Member reports features were implemented
✖		Button that shows the raided gold next to each attack 


• Guild Buildings:
✖		 Upgrade Calculator was implemented and highly improved


• Guild Mail Interface 
✖		Improved style
✖		Check / Uncheck options for each guild members group 


• Guild Memebers List Interface
✖		Opponent Guild: Attack buttons next to each member of a guild (member list), usefull for guild wars (old type)
✖		See which members have been attacked within 75 min 


• Guild Admin Interface
✖		Search for players with no guild, from the guild admin page 


• Work
✖		Interface improve


• Arena
✖		Order players by level on Cross Server Arenas
✖		Enemy datails (win / losses)
✖		Link to the simulator


• Training
✔		Show basic points bars
✖		Show stats changes on upgrade
✖		Training Cost calculator 
✖		Propose points to upgrade
✖		Show caps and cap points changes (crit, block, avoid)
✖		Double hit calculator
	

• Merchants
✖		Mouse click events (double click sell buy)
✖		Cross merchants item search
✖		Remember merchants tabs
✖		Items you can buy are highlighted 


• Auction
✖		Theme(s) support
✖		Colored items based on quality
✖			Background color
✖			Shadow item
✖		Items you can afford
✖		Hide your gold system / More info about prices (value compared to price) 
✖		Advance search options (Gold limit, Damage for weapons, etc) 
✖		Item Preffix search list 
✖		Item Suffix search list 
✖		More levels in the search options 
✖		Level of each item is visible (up-right corner) 
✖		Item levels you can see in auction are shown when you mouse over the (!) icon
✖		Number of Price/Value % on auction Auction (ex. "(153%)")
✖		Button announcing to guild, with a mail, the auction status
✖		Multiple bids (no refresh)
✖		Hide the last row (guide line) of mercenaries' tooltips (better compare view)
✖		Display for each mercenary its tooltip when on mercenaries


• Merchants
✖		Item Preffix search list
✖		Item Suffix search list
✖		More levels in the search options 
✖		Cancel all items with one button (if "load all pages" is open this will also work) 
✖		Style fixes 
✖		Load all the pages 
✖		Item levels you can see in market are shown when you mouse over the (!) icon
✖		Select the default sell duration (2h, 8h etc) in the GCA options (default 24h)
✖		Red on items that are souldbound
✖		Price per unit


• Locations
✖		Hide the building's labels in city/country, guild, underworld maps
✖		Show buildings level in guild's map
✔✎		Show enemies' materials most dropped (drops changed? new drops?)
✖		Underword enemies interface converted to old style


• Messages
✔		Style changes
✔			Guild message
✔			Private message
✔			Announcement
✖		Day separators 
✖		Automatic code identification
✖			Convert all URL to links
✖			Youtube videos to videos
✔		Load guild battles report
✖		Icon next to Guild Master's message (or color, sth for admins too?)
✖		Auto-remove last lines of each message, if they are empty (trim messages)
✖		Warning icon and item links on auction bid messages
✖		Tab link on incomming folder


• New Message
✔		Auto focus message
✔		List of friends and guild mates to choose a player
✔		Bigger textarea


• Reports
✔		Improved style / Day separators 
✔		Rewarded items stats on mouse over (tooltips)
✖		Gather drop information
✖		Gather stats
✖		Show battle stances next to theoretical
✖		Post new drops OR post them on every report


• Packages
✔		Filters on the side
✔		Compact layout
✔		Item shadow
✔✎		Better item add/remove wrapper - catch no item etc.
✔✎		Load more pages - paging fix


• Server Backup
✖	redirect


• Player Description:
✖		Preview when you edit your description 


• Player Interface (Logged in or not)
✖		Simulator Button (direct to results link for premium users) 
✖		Show which item stats points are coming from clear points and which from percent bonus 
✖		Mercenaries 
✖			visible mercenary's tooltip (base stats, same as in overview)
✖			Visible mission type (icon: Medic, Damage, Protect yourself - with tooltip) 
✔		Player Stats page ratios and totals
✖		Buff bar over players


• Forge Interface
✖		Links to your bag and the market of the remaining required smelt items


• GCA News
✖		Display gca news


• Translations
✖		New system


• Black Market
✖		Set up system


