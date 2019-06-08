#!/usr/bin/env python3

"""
focus_next_visible.py - toggles focus between visible windows on workspace

 - requires https://github.com/acrisci/i3ipc-python

"""
from sys import argv
from itertools import cycle
from subprocess import check_output

import i3ipc


def get_windows_on_ws(conn):
    return filter(lambda x: x.window,
                  conn.get_tree().find_focused().workspace().descendents())


def find_visible_windows(windows_on_workspace):
    visible_windows = []
    for w in windows_on_workspace:
        xprop = check_output(['xprop', '-id', str(w.window)]).decode()

        if '_NET_WM_STATE_HIDDEN' in xprop:
            print(w.name, 'is not visible')
        else:
            print(w.name, 'is visible')
            visible_windows.append(w)

    return visible_windows


if __name__ == '__main__':

    conn = i3ipc.Connection()

    visible = find_visible_windows(get_windows_on_ws(conn))

    if len(argv) > 1 and argv[1] == "reverse":
        cv = cycle(reversed(visible))
    else:
        cv = cycle(visible)

    for w in cv:
        if w.focused:
            focus_to = next(cv)
            conn.command('[id="%d"] focus' % focus_to.window)
            print("Moving focus to", focus_to.name)
            break
