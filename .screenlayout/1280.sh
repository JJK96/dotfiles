#!/bin/sh
xrandr --output HDMI2 --off --output HDMI1 --mode 1280x1024 --pos 0x0 --rotate normal --output DP1 --off --output eDP1 --primary --mode 1920x1080 --pos 0x1024 --rotate normal --output DP2 --off
~/.screenlayout/refresh.sh
