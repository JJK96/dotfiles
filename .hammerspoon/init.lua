 -- init.lua  
    local log = hs.logger.new("", "info")

    local function ok2str(ok)
        if ok then return "ok" else return "fail" end
    end

    hs.caffeinate.watcher.new(function(event)
        local eventName = hs.caffeinate.watcher[event]
        log.f("got caffeinate event:%s (id:%d)", eventName, event)
    
        local script

        if event == hs.caffeinate.watcher.screensDidLock then       
            script = "${HOME}/.hammerspoon/onlock"
        else        
            log.f("ignored event:%s (id:%d)", eventName, event)
            return
        end
    
        local ok, st, n = os.execute(script)
        log.f("exec:%s -> %s, %s, %d", script, ok2str(ok), st, n)
    end
    ):start()

    local wifiWatcher = hs.wifi.watcher.new(function(message)
        script = "${HOME}/.hammerspoon/onwifichange"
        local ok, st, n = os.execute(script)
        log.f("exec:%s -> %s, %s, %d", script, ok2str(ok), st, n)
    end
    )

    wifiWatcher:watchingFor({ "linkChange" })
    wifiWatcher:start()

