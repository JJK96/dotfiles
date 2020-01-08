#!/bin/sh
xrandr --output HDMI2 --off --output HDMI1 --mode 1920x1200 --pos 1920x0 --rotate normal --output DP1 --off --output eDP1 --primary --mode 1920x1080 --pos 0x120 --rotate normal --output DP2 --off
~/.screenlayout/refresh.sh
