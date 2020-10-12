set -g fish_key_bindings fish_vi_key_bindings

# insert mode
bind -M insert \en forward-char # accept suggestion

# vi mode
bind "n" down-or-search
bind "e" up-or-search
bind "i" forward-char
bind "j" repeat-jump
bind "k" forward-word
bind -m insert "l" 'repaint-mode'
bind -m insert "L" beginning-of-line
