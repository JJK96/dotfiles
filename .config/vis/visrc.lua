require('vis')


vis.events.subscribe(vis.events.INIT, function()
	-- Your global configuration options
	vis:command('set theme solarized_bg')
	vis:command('set tabwidth 4')
	vis:command('map! normal L $')
	vis:command('map! normal H ^')
	vis:command('map! normal M :w<Enter>:<Escape>"cp<Enter>')
	vis:command('map! normal Y y$')
end)

vis.events.subscribe(vis.events.WIN_OPEN, function(win)
	-- Your per window configuration options e.g.
	-- vis:command('set number')
	vis:command('set rnu on')
end)
