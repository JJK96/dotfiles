from pynput import keyboard
import os
import time

def on_press(key):
    pass

def on_release(key):
    os.system('osascript -e \'tell application "System Events" to keystroke "q" using {control down, command down}\'')
    return False

time.sleep(5)
# Collect events until released
with keyboard.Listener(
        on_press=on_press,
        on_release=on_release) as listener:
    listener.join()

