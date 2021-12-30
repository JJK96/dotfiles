export PATH=$HOME/go/bin:$HOME/dotfiles/python_bin:$HOME/git/scripts/python_bin:$HOME/.cargo/bin:$HOME/nw_bin:$HOME/bin:$HOME/.config/kak/bin:$HOME/node_modules/.bin:/usr/local/opt/ruby/bin:/usr/local/lib/ruby/gems/3.0.0/bin:$PATH

if [ -z "$EDITOR" ]; then
    export EDITOR="editor -t"
fi
export PAGER=less

export GPGKEY=35DA10798B42C1C8AEFEFEAC6487A893C19EA8BC
export PASSWORD_STORE_GENERATED_LENGTH=30
export PASSWORD_STORE_ENABLE_EXTENSIONS=true
export PASSWORD_STORE_EXTENSIONS_DIR="$HOME/.config/pass/extensions"
export KAKOUNE_POSIX_SHELL=/bin/dash
source "$HOME/.cargo/env"
source "$HOME/.nw_profile"
