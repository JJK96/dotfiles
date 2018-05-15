#!/bin/sh
xrandr --output HDMI-2 --off --output HDMI-1 --mode 1440x900 --pos 0x0 --rotate normal --output DP-1 --off --output eDP-1 --primary --mode 1920x1080 --pos 1440x144 --rotate normal --output DP-2 --off
refresh.sh
