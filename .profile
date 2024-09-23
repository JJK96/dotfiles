export PATH=$HOME/nw_bin:$HOME/bin:$HOME/.local/bin:$HOME/git/nmap-parse-output:$HOME/go/bin:$HOME/dotfiles/python_bin:$HOME/git/scripts/python_bin:/usr/local/opt/python@3.10/Frameworks/Python.framework/Versions/3.10/bin:$HOME/.cargo/bin:$HOME/.config/kak/bin:$HOME/node_modules/.bin:/usr/local/opt/ruby/bin:/usr/local/lib/ruby/gems/3.2.0/bin:/Users/nw/.dotnet/tools:$PATH
export PYTHONPATH=$HOME/git/scripts/python_bin:$HOME/dotfiles/python_bin:$HOME/git/azure

if [ -z "$EDITOR" ]; then
    export EDITOR="editor -t"
fi
export PAGER=less

export GPGKEY=35DA10798B42C1C8AEFEFEAC6487A893C19EA8BC
export PASSWORD_STORE_GENERATED_LENGTH=30
export PASSWORD_STORE_ENABLE_EXTENSIONS=true
export PASSWORD_STORE_EXTENSIONS_DIR="$HOME/.config/pass/extensions"
export KAKOUNE_POSIX_SHELL=/bin/dash
export ip_regex="\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"
export url_regex="https?://(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
export email_regex=$(cat << "EOF"
(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
EOF
)
export ANDROID_HOME="$HOME/Library/Android/sdk"
source "$HOME/.cargo/env"
source "$HOME/.nw_profile"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

export DOTNET_ROOT=/usr/local/Cellar/dotnet/8.0.1/libexec
