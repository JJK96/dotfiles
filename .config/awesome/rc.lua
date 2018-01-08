--[[
                               
     Awesome wm config by JJK

     largely based on:
     	Holo Awesome WM config 2.0 
     	github.com/copycat-killer  
                                
--]]
-- {{{ Required libraries
local alttab = require("alttab")
local gears     = require("gears")
local awful     = require("awful")
awful.rules     = require("awful.rules")
                  require("awful.autofocus")
local wibox     = require("wibox")
local beautiful = require("beautiful")
local naughty   = require("naughty")
local drop      = require("scratchdrop")
local lain      = require("lain")
-- }}}

-- {{{ Error handling
if awesome.startup_errors then
    naughty.notify({ preset = naughty.config.presets.critical,
                     title = "Oops, there were errors during startup!",
                     text = awesome.startup_errors })
end

do
    local in_error = false
    awesome.connect_signal("debug::error", function (err)
        if in_error then return end
        in_error = true

        naughty.notify({ preset = naughty.config.presets.critical,
                         title = "Oops, an error happened!",
                         text = err })
        in_error = false
    end)
end
-- }}}

-- {{{ Autostart applications
function run_once(cmd)
  findme = cmd
  firstspace = cmd:find(" ")
  if firstspace then
     findme = cmd:sub(0, firstspace-1)
  end
  awful.util.spawn_with_shell("pgrep -u $USER -x " .. findme .. " > /dev/null || (" .. cmd .. ")")
end

-- run_once("urxvt")
--run_once("unclutter -root")
-- }}}

-- {{{ Variable definitions

-- beautiful init
beautiful.init(os.getenv("HOME") .. "/.config/awesome/themes/jjk-grey/theme.lua")

--global vars
HEIGHT = 25

-- common
modkey     = "Mod1"
altkey     = "Mod4"
terminal   = "urxvt"
editor = "nvim"
editor_cmd = terminal .. " -e " .. editor

-- user defined
browser    = "firefox"
gui_editor = editor_cmd
filemanager = "thunar"

local layouts = {
    awful.layout.suit.floating,
    awful.layout.suit.fair,
    awful.layout.suit.tile,
}
-- }}}

-- {{{ Tags
tags = {
   -- names = { " Web ", " Terminal ", " Files ","Work", " Other " },
   names = { " One ", " Two ", " Three ", " Four ", " Five " , " Six " , " Seven " , " Eight " , " Nine "},
   layout = { layouts[2], layouts[2], layouts[2], layouts[2], layouts[2], layouts[2], layouts[2], layouts[2], layouts[2] }
}
for s = 1, screen.count() do
   tags[s] = awful.tag(tags.names, s, tags.layout)
end
tagnum = 9
-- }}}

-- {{{ Wallpaper
if beautiful.wallpaper then
    for s = 1, screen.count() do
        gears.wallpaper.maximized(beautiful.wallpaper, s, true)
    end
end
-- }}}

-- {{{ Menu
mymainmenu = awful.menu.new({ items = require("menugen").build_menu(),
                              theme = { height = 16, width = 130 }})
mylauncher = awful.widget.launcher({ image = beautiful.awesome_icon,
                                     menu = mymainmenu })
-- }}}

-- {{{ Wibox
markup = lain.util.markup
blue   = "#80CCE6"
space3 = markup.font("Tamsyn 3", " ")
space2 = markup.font("Tamsyn 2", " ")
bgcolor = "#000000BB"
widgetbg = "#00000000"

-- Clock

mytextclock = awful.widget.textclock(markup(blue, " %a %b %d, %H:%M "))
clock_icon = wibox.widget.imagebox()
clock_icon:set_image(beautiful.clock)
clockwidget = wibox.widget.background()
clockwidget:set_widget(mytextclock)
--clockwidget:set_bgimage(beautiful.widget_bg)
clockwidget:set_bg(widgetbg)


-- Battery
batwidget = lain.widgets.bat({
    settings = function()
        bat_header = " Battery: "
        bat_p      = bat_now.perc .. "%"

        if bat_now.status == "Not present" then
            bat_header = ""
            bat_p      = ""
        end

        widget:set_markup(markup(blue, bat_header) .. markup(blue, bat_p))
    end
})
--volume widget
volume_widget = wibox.widget.textbox()
volume_widget:set_align("right")

function update_volume(widget)
   local fd = io.popen("amixer sget Master")
   local status = fd:read("*all")
   fd:close()
 
   -- local volume = tonumber(string.match(status, "(%d?%d?%d)%%")) / 100
   local volume = string.match(status, "(%d?%d?%d)%%")
   volume = string.format("% 3d", volume)
 
   status = string.match(status, "%[(o[^%]]*)%]")

   if string.find(status, "on", 1, true) then
       -- For the volume numbers
       volume = volume .. "%"
   else
       -- For the mute button
       volume = volume .. "M"
       
   end
   widget:set_markup("volume: " .. volume)
end
update_volume(volume_widget)
-- ALSA volume bar
myvolumebar = lain.widgets.alsabar({
    card   = "0",
    ticks  = true,
    width  = 80,
    height = 10,
    colors = {
        background = widgetbg,
        unmute     = "#80CCE6",
        mute       = "#FF9F9F"
    },
    notifications = {
        font      = "Tamsyn",
        font_size = "12",
        bar_size  = HEIGHT
    }
})
--alsamargin = wibox.layout.margin(myvolumebar.bar, 5, 8, 80)
--wibox.layout.margin.set_top(alsamargin, 5)
--wibox.layout.margin.set_bottom(alsamargin, 5)
volumewidget = wibox.widget.background()
volumewidget:set_widget(alsamargin)
--volumewidget:set_bgimage(beautiful.widget_bg)
volumewidget:set_bg(widgetbg)

-- Separators
first = wibox.widget.textbox('<span font="Tamsyn 4"> </span>')
sprwidget = wibox.widget.textbox(markup(blue, " | "))

-- Create a wibox for each screen and add it
mywibox = {}
mypromptbox = {}
mylayoutbox = {}
mytaglist = {}
mytaglist.buttons = awful.util.table.join(
                    awful.button({ }, 1, awful.tag.viewonly),
                    awful.button({ modkey }, 1, awful.client.movetotag),
                    awful.button({ }, 3, awful.tag.viewtoggle),
                    awful.button({ modkey }, 3, awful.client.toggletag),
                    awful.button({ }, 4, function(t) awful.tag.viewnext(awful.tag.getscreen(t)) end),
                    awful.button({ }, 5, function(t) awful.tag.viewprev(awful.tag.getscreen(t)) end)
                    )
mytasklist = {}
mytasklist.buttons = awful.util.table.join(
                     awful.button({ }, 1, function (c)
                                              if c == client.focus then
                                                  c.minimized = true
                                              else
                                                  -- Without this, the following
                                                  -- :isvisible() makes no sense
                                                  c.minimized = false
                                                  if not c:isvisible() then
                                                      awful.tag.viewonly(c:tags()[1])
                                                  end
                                                  -- This will also un-minimize
                                                  -- the client, if needed
                                                  client.focus = c
                                                  c:raise()
                                              end
                                          end),
                     awful.button({ }, 3, function ()
                                              if instance then
                                                  instance:hide()
                                                  instance = nil
                                              else
                                                  instance = awful.menu.clients({ width=250 })
                                              end
                                          end),
                     awful.button({ }, 4, function ()
                                              awful.client.focus.byidx(1)
                                              if client.focus then client.focus:raise() end
                                          end),
                     awful.button({ }, 5, function ()
                                              awful.client.focus.byidx(-1)
                                              if client.focus then client.focus:raise() end
                                          end))

for s = 1, screen.count() do
    -- Create a promptbox for each screen
    mypromptbox[s] = awful.widget.prompt()
    -- Create an imagebox widget which will contains an icon indicating which layout we're using.
    -- We need one layoutbox per screen.
    mylayoutbox[s] = awful.widget.layoutbox(s)
    mylayoutbox[s]:buttons(awful.util.table.join(
                           awful.button({ }, 1, function () awful.layout.inc(layouts, 1) end),
                           awful.button({ }, 3, function () awful.layout.inc(layouts, -1) end),
                           awful.button({ }, 4, function () awful.layout.inc(layouts, 1) end),
                           awful.button({ }, 5, function () awful.layout.inc(layouts, -1) end)))
    -- Create a taglist widget
    mytaglist[s] = awful.widget.taglist(s, awful.widget.taglist.filter.all, mytaglist.buttons)

    -- Create a tasklist widget
    mytasklist[s] = awful.widget.tasklist(s, awful.widget.tasklist.filter.currenttags, mytasklist.buttons)

    -- Create the wibox
    mywibox[s] = awful.wibox({ position = "top", screen = s, height = HEIGHT })

    -- Widgets that are aligned to the upper left
    local left_layout = wibox.layout.fixed.horizontal()
    left_layout:add(first)
    left_layout:add(mytaglist[s])

    -- Widgets that are aligned to the upper right
    local right_layout = wibox.layout.fixed.horizontal()
    if s == 1 then right_layout:add(wibox.widget.systray()) end
    right_layout:add(batwidget)
    right_layout:add(sprwidget)
    right_layout:add(clockwidget)
    right_layout:add(sprwidget)
    right_layout:add(volume_widget)

    -- Now bring it all together (with the tasklist in the middle)
    local layout = wibox.layout.align.horizontal()
    layout:set_left(left_layout)
    layout:set_right(right_layout)

    mywibox[s]:set_widget(layout)

    -- Set proper backgrounds, instead of beautiful.bg_normal
	mywibox[s]:set_bg(bgcolor)
end
-- }}}

-- {{{ Mouse bindings
root.buttons(awful.util.table.join(
    awful.button({ }, 3, function () mymainmenu:toggle() end),
    awful.button({ }, 4, awful.tag.viewnext),
    awful.button({ }, 5, awful.tag.viewprev)
))
-- }}}

-- {{{ Key bindings
globalkeys = awful.util.table.join(
-- Brightness

    awful.key({ }, "XF86MonBrightnessDown", function ()
        awful.util.spawn("xbacklight -dec 10") end),
    awful.key({ }, "XF86MonBrightnessUp", function ()
        awful.util.spawn("xbacklight -inc 10") end),

    -- Take a screenshot
    -- https://github.com/copycat-killer/dots/blob/master/bin/screenshot
    awful.key({ altkey }, "p", function() os.execute("gnome-screenshot") end),

    -- altkey + k
    -- altkey + j
    awful.key({ altkey, "Shift"   }, "l", function () awful.client.swap.byidx(  1)    end),
    awful.key({ "Control", "Shift"  }, "l", function () awful.util.spawn("light-locker-command -l") 	end),
    -- awful.key({ altkey, "Shift"   }, "j",      function () awful.tag.incmwfact( 0.05)     end),
    -- awful.key({ altkey, "Shift"   }, "k",      function () awful.tag.incmwfact(-0.05)     end),
    awful.key({ modkey }, "h",   awful.tag.viewprev       ),
    awful.key({ modkey }, "l",  awful.tag.viewnext       ), 
    awful.key({ modkey }, "j", function () lain.util.tag_view_nonempty(-1) end),
    awful.key({ modkey }, "k", function () lain.util.tag_view_nonempty(1) end),
 awful.key({ modkey, "Shift"   }, "h",
   function (c)
       local curidx = awful.tag.getidx()
       if curidx == 1 then
           awful.client.movetotag(tags[client.focus.screen][9])
       else
           awful.client.movetotag(tags[client.focus.screen][curidx - 1])
       end
       awful.tag.viewprev()
   end),
 awful.key({ modkey, "Shift"   }, "l",
   function (c)
       local curidx = awful.tag.getidx()
       if curidx == 9 then
           awful.client.movetotag(tags[client.focus.screen][1])
       else
           awful.client.movetotag(tags[client.focus.screen][curidx + 1])
       end
       awful.tag.viewnext()
   end),

    -- Default client focus
    awful.key({ altkey }, "l",
        function ()
            awful.client.focus.byidx( 1)
            if client.focus then client.focus:raise() end
        end),
    awful.key({ altkey }, "h",
        function ()
            awful.client.focus.byidx(-1)
            if client.focus then client.focus:raise() end
        end),

    -- Show/Hide Wibox
    awful.key({ modkey }, "b", function ()
        mywibox[mouse.screen].visible = not mywibox[mouse.screen].visible
    end),

    -- Layout manipulation
    -- awful.key({ modkey,           }, "u", awful.client.urgent.jumpto),
    awful.key({ modkey,           }, "Tab",
	function ()
		alttab.switch(1, "Alt_L", "Tab", "ISO_Left_Tab")
	end),
    awful.key({ modkey , "Shift"   }, "Tab",
       function ()
	  alttab.switch(-1, "Alt_L", "Tab", "ISO_Left_Tab")
       end),

    awful.key({ modkey,           }, "space",  function () awful.layout.inc(layouts,  1)  end),
    awful.key({ modkey, "Shift"   }, "space",  function () awful.layout.inc(layouts, -1)  end),

    -- Standard program
    awful.key({ modkey,           }, "Return", function () awful.util.spawn(terminal) end),
    awful.key({ modkey, "Control" }, "r",      awesome.restart),
    awful.key({ modkey, "Shift"   }, "q",      awesome.quit),

    -- ALSA volume rol
    awful.key({ }, "XF86AudioRaiseVolume",
        function ()
            os.execute(string.format("amixer set %s %s+", myvolumebar.channel, myvolumebar.step))
	    update_volume(volume_widget)
        end),
    awful.key({ }, "XF86AudioLowerVolume",
        function ()
            os.execute(string.format("amixer set %s %s-", myvolumebar.channel, myvolumebar.step))
	    update_volume(volume_widget)
        end),
    awful.key({ }, "XF86AudioMute",
        function ()
            os.execute(string.format("amixer set %s toggle", myvolumebar.channel))
	    update_volume(volume_widget)
        end),

    -- User programs
    awful.key({ modkey }, "r", function () awful.util.spawn_with_shell(terminal.." -e ranger") end),
    awful.key({ modkey }, "i", function () run_or_raise(browser, {class= browser}) end), 
    awful.key({ modkey }, "t", function () awful.util.spawn(filemanager) end),

    -- Prompt
    awful.key({ modkey }, "a", function () awful.util.spawn("j4-dmenu-desktop") end),
    awful.key({ modkey }, "x",
              function ()
                  awful.prompt.run({ prompt = "Run Lua code: " },
                  mypromptbox[mouse.screen].widget,
                  awful.util.eval, nil,
                  awful.util.getdir("cache") .. "/history_eval")
              end)
)

clientkeys = awful.util.table.join(
    awful.key({ altkey,           }, "f",      function (c) c.fullscreen = not c.fullscreen end),
    awful.key({ modkey,           }, "q",      function (c) c:kill()                         end),
    --awful.key({ modkey, "Control" }, "q",      function () awful.tag.delete(awful.tag.selected()) end), 
    awful.key({ modkey, "Control" }, "space",  awful.client.floating.toggle                     ),
    awful.key({ modkey,           }, "o",      awful.client.movetoscreen                        ),
    awful.key({ modkey,           }, "n",
        function (c)
            -- The client currently has the input focus, so it cannot be
            -- minimized, since minimized clients can't have the focus.
            c.minimized = true
        end),
--	awful.key({ modkey, "Shift" }, "n", function (t) tags[1][tagnum] = awful.tag.add(tagnum+1,{layout = layouts[2]}) tagnum=tagnum+1 end),
    awful.key({ altkey,           }, "m",
        function (c)
            c.maximized_horizontal = not c.maximized_horizontal
            c.maximized_vertical   = not c.maximized_vertical
        end)
)

-- Bind all key numbers to tags.
-- be careful: we use keycodes to make it works on any keyboard layout.
-- This should map on the top row of your keyboard, usually 1 to 9.
for i = 1, 9 do
    globalkeys = awful.util.table.join(globalkeys,
        -- View tag only.
        awful.key({ modkey }, "#" .. i + 9,
                  function ()
                        local screen = mouse.screen
                        local tag = awful.tag.gettags(screen)[i]
                        if tag then
                           awful.tag.viewonly(tag)
                        end
                  end),
        -- Toggle tag.
        awful.key({ modkey, "Control" }, "#" .. i + 9,
                  function ()
                      local screen = mouse.screen
                      local tag = awful.tag.gettags(screen)[i]
                      if tag then
                         awful.tag.viewtoggle(tag)
                      end
                  end),
        -- Move client to tag.
        awful.key({ modkey, "Shift" }, "#" .. i + 9,
                  function ()
                      if client.focus then
                          local tag = awful.tag.gettags(client.focus.screen)[i]
                          if tag then
                              awful.client.movetotag(tag)
                          end
                     end
                  end),
        -- Toggle tag.
        awful.key({ modkey, "Control", "Shift" }, "#" .. i + 9,
                  function ()
                      if client.focus then
                          local tag = awful.tag.gettags(client.focus.screen)[i]
                          if tag then
                              awful.client.toggletag(tag)
                          end
                      end
                  end))
end

clientbuttons = awful.util.table.join(
    awful.button({ }, 1, function (c) client.focus = c; c:raise() end),
    awful.button({ modkey }, 1, awful.mouse.client.move),
    awful.button({ modkey }, 3, awful.mouse.client.resize))

-- Set keys
root.keys(globalkeys)
-- }}}

-- {{{ Rules
awful.rules.rules = {
    -- All clients will match this rule.
    { rule = { },
      properties = { border_width = beautiful.border_width,
                     border_color = beautiful.border_normal,
                     focus = awful.client.focus.filter,
                     keys = clientkeys,
                     buttons = clientbuttons,
		     --opacity = 0.92,
	                   size_hints_honor = false } },
    { rule = { class = "Spotify" },
          properties = { opacity = 0.95} },

    { rule = { instance = "plugin-container" },
          properties = { tag = tags[1][1] } },

    { rule = { class = "intellij" },
    	  properties = { tag = tags[1][4] } },
}
-- }}}

-- {{{ Signals
-- Signal function to execute when a new client appears.
local sloppyfocus_last = {c=nil}
client.connect_signal("manage", function (c, startup)
    -- Enable sloppy focus
    client.connect_signal("mouse::enter", function(c)
         if awful.layout.get(c.screen) ~= awful.layout.suit.magnifier
            and awful.client.focus.filter(c) then
             -- Skip focusing the client if the mouse wasn't moved.
             if c ~= sloppyfocus_last.c then
                 client.focus = c
                 sloppyfocus_last.c = c
             end
         end
     end)
	if not startup then
           -- Put windows in a smart way, only if they does not set an initial position.
           if not c.size_hints.user_position and not c.size_hints.program_position then
               awful.placement.under_mouse(c)
	       awful.placement.no_overlap(c)
               awful.placement.no_offscreen(c)
           end
       end
    local titlebars_enabled = false
    if titlebars_enabled and (c.type == "normal" or c.type == "dialog") then
        -- buttons for the titlebar
        local buttons = awful.util.table.join(
                awful.button({ }, 1, function()
                    client.focus = c
                    c:raise()
                    awful.mouse.client.move(c)
                end),
                awful.button({ }, 3, function()
                    client.focus = c
                    c:raise()
                    awful.mouse.client.resize(c)
                end)
                )

        -- Widgets that are aligned to the right
        local right_layout = wibox.layout.fixed.horizontal()
        right_layout:add(awful.titlebar.widget.floatingbutton(c))
        right_layout:add(awful.titlebar.widget.maximizedbutton(c))
        right_layout:add(awful.titlebar.widget.stickybutton(c))
        right_layout:add(awful.titlebar.widget.ontopbutton(c))
        right_layout:add(awful.titlebar.widget.closebutton(c))

        -- The title goes in the middle
        local middle_layout = wibox.layout.flex.horizontal()
        local title = awful.titlebar.widget.titlewidget(c)
        title:set_align("center")
        middle_layout:add(title)
        middle_layout:buttons(buttons)

        -- Now bring it all together
        local layout = wibox.layout.align.horizontal()
        layout:set_right(right_layout)
        layout:set_middle(middle_layout)

        awful.titlebar(c,{size=16}):set_widget(layout)
    end
end)

-- No border for maximized clients
client.connect_signal("focus",
    function(c)
        if c.maximized_horizontal == true and c.maximized_vertical == true then
            c.border_color = beautiful.border_normal
        else
            c.border_color = beautiful.border_focus
        end
    end)
client.connect_signal("unfocus", function(c) c.border_color = beautiful.border_normal end)
-- }}}

-- {{{ Arrange signal handler
for s = 1, screen.count() do screen[s]:connect_signal("arrange", function ()
        local clients = awful.client.visible(s)
        local layout  = awful.layout.getname(awful.layout.get(s))

        if #clients > 0 then -- Fine grained borders and floaters control
            for _, c in pairs(clients) do -- Floaters always have borders
                if awful.client.floating.get(c) or layout == "floating" then
                    c.border_width = beautiful.border_width

                -- No borders with only one visible client
                elseif #clients == 1 or layout == "max" then
                    c.border_width = 0
                else
                    c.border_width = beautiful.border_width
                end
            end
        end
      end)
end
-- }}}
--- Spawns cmd if no client can be found matching properties
-- If such a client can be found, pop to first tag where it is visible, and give it focus
-- @param cmd the command to execute
-- @param properties a table of properties to match against clients.  Possible entries: any properties of the client object
function run_or_raise(cmd, properties)
   local clients = client.get()
   local focused = awful.client.next(0)
   local findex = 0
   local matched_clients = {}
   local n = 0
   for i, c in pairs(clients) do
      --make an array of matched clients
      if match(properties, c) then
         n = n + 1
         matched_clients[n] = c
         if c == focused then
            findex = n
         end
      end
   end
   if n > 0 then
      local c = matched_clients[1]
      -- if the focused window matched switch focus to next in list
      if 0 < findex and findex < n then
         c = matched_clients[findex+1]
      end
      local ctags = c:tags()
      if #ctags == 0 then
         -- ctags is empty, show client on current tag
         local curtag = awful.tag.selected()
         awful.client.movetotag(curtag, c)
      else
         -- Otherwise, pop to first tag client is visible on
         awful.tag.viewonly(ctags[1])
      end
      -- And then focus the client
      client.focus = c
      c:raise()
      return
   end
   awful.util.spawn(cmd)
end

-- Returns true if all pairs in table1 are present in table2
function match (table1, table2)
   for k, v in pairs(table1) do
      if table2[k] ~= v and not table2[k]:find(v) then
         return false
      end
   end
   return true
end
run_once("nm-applet")
-- run_once("guake --hide")	
run_once("lxpolkit")
run_once(browser)
