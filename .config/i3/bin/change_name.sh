#!/bin/bash
mark='change-title'
i3-msg mark $mark
title=$(zenity --entry --title 'Window' --text 'Rename Container:' --width 300)
if [ ! -z "$title" ]; then
    i3-msg [con_mark=$mark] title_format $title &&
    i3-msg unmark $mark
fi
