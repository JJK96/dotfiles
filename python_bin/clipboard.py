import os
import time
def macSetClipboard(text):
    outf = os.popen('pbcopy', 'w')
    outf.write(text)
    outf.close()

def macGetClipboard():
    outf = os.popen('pbpaste', 'r')
    content = outf.read()
    outf.close()
    return content

def hook_clipboard(f):
    current_clipboard = macGetClipboard()
    while True:
       clipboard = macGetClipboard()
       
       if clipboard is not None and clipboard != current_clipboard:
           current_clipboard = f(clipboard)
           macSetClipboard(current_clipboard)
       time.sleep(0.1)
