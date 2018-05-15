#!/bin/sh
killall compton && compton & disown && wal -R
