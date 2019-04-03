#!/bin/sh
killall compton && compton & disown && wal -Rs
