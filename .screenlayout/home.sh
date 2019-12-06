#!/bin/sh
xrandr --output eDP-1 --mode 1920x1080 --pos 0x1080 --rotate normal --output DP-1 --off --output HDMI-1 --primary --mode 2560x1080 --pos 0x0 --rotate normal --output DP-2 --off --output HDMI-2 --off
ln -sf ~/Pictures/bsol_1080pwide.png ~/Pictures/active_lockscreen
~/.screenlayout/refresh.sh
