function source_dotenv {
    # Based on https://stackoverflow.com/questions/19331497/set-environment-variables-from-file-of-key-value-pairs
    if [ -f "$1" ]; then
        contents="$(grep -v '^#' "$1" | xargs -d '\n')"
        if [ ! -z "$contents" ]; then
            eval export "$contents"
        fi
    fi
}
export PATH="$HOME/.local/bin:$HOME/go/bin:$HOME/dotfiles/python_bin:$HOME/git/scripts/python_bin:$HOME/.cargo/bin:$HOME/nw_bin:$HOME/bin:$HOME/node_modules/.bin:/usr/local/opt/ruby/bin:/usr/local/lib/ruby/gems/3.0.0/bin:$HOME/.config/i3/bin:$HOME/.config/kak/bin:$PATH:"
export PYTHONPATH=$HOME/git/scripts/python_bin:$HOME/dotfiles/python_bin

if [ -z "$EDITOR" ]; then
    export EDITOR="editor -t"
fi
export PAGER=less

export GPGKEY=35DA10798B42C1C8AEFEFEAC6487A893C19EA8BC
export PASSWORD_STORE_GENERATED_LENGTH=30
export PASSWORD_STORE_ENABLE_EXTENSIONS=true
export PASSWORD_STORE_EXTENSIONS_DIR="$HOME/.config/pass/extensions"
export KAKOUNE_POSIX_SHELL=/bin/dash
export PERL5LIB="/home/jjk/perl5/lib/perl5:$PERL5LIB"
export PERL_LOCAL_LIB_ROOT="/home/jjk/perl5:$PERL_LOCAL_LIB_ROOT"
export PERL_MB_OPT="--install_base \"/home/jjk/perl5\""
export PERL_MM_OPT="INSTALL_BASE=/home/jjk/perl5"
export WINIT_X11_SCALE_FACTOR=1
# Some servers don't support TERM=alacritty and will behave oddly
export TERM=xterm

export USER_AGENT="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.3124.95"

# Clipmenu
export CM_LAUNCHER=rofi
export CM_DIR=/tmp

#source ~/.proxy_conf
export ip_regex="\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"
export url_regex="https?://(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
export email_regex=$(cat << "EOF"
(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
EOF
)
export AUTOSSH_PORT=0

source "$HOME/.nw_profile"
