# aliases
abbr wine32 'WINEPREFIX="$HOME/.wine32" wine'
alias pls 'sudo (fc -ln -1)'
alias youtube-mp3 'youtube-dl -i --yes-playlist -x --audio-format m4a --audio-quality 0 '
alias sprunge "curl -F 'sprunge=<-' http://sprunge.us"
alias leave "bg %+ ; and disown %+ && exit"
alias x "startx"
alias giomount 'cd /run/user/1000/gvfs/'
alias term '$TERMINAL & disown'
alias cleargpg "echo RELOADAGENT | gpg-connect-agent"
abbr xsel "xsel -b"
alias ll "ls -lh --color"
abbr zip "zip -r"
abbr r2 "r2 -A"
alias html2jade "html2jade -n 4 --noemptypipe --bodyless"
alias lt "languagetool -m nl -l en-GB --xmlfilter -d COMMA_PARENTHESIS_WHITESPACE,WHITESPACE_RULE,ACTUAL "
alias recomp "killall compton ; and compton & disown && wal -R && exit"
alias spell "aspell check --lang=en-GB "
function p
    ps aux | grep $argv | grep -v grep
end
alias net 'netstat -plnt'
alias o 'xdg-open'
function tgrep
    grep $argv *.tex
end
alias ide 'ide ; and exit'
alias cls 'printf "\033c"'
alias escape 'xcape -e "ISO_Level3_Shift=Escape"'
function notify-at
    echo "notify-send" $argv[2..-1] | at $argv[1]
end

# move workspace to other output.
function mvws
    i3-msg move workspace to output $argv
end

# pacman
alias repo-remove "repo-remove /var/cache/pacman/custom/custom.db.tar"
alias repo-add "repo-add /var/cache/pacman/custom/custom.db.tar"
alias upd "aur sync -u;sudo pacman -Syu"
alias custom 'repose -vf custom -r /var/cache/pacman/custom'

# kakoune
alias k 'editor -t'
alias e "editor"

# mutt
alias mutt neomutt

# ranger
alias r "ranger"

# directories
abbr wd "cd /home/jjk/Documents/master"
abbr swifter "cd /srv/http/swifter/stamboek/;sudo systemctl start httpd mariadb"
abbr dahomey "cd /opt/lampp/htdocs/dahomey/testing.dahomey.nl/"
abbr kaksrc "cd ~/git/kakoune-git/src/kakoune/"
abbr lspsrc "cd ~/git/kak-lsp-git/src/kak-lsp/"

# Programs
alias decktape "node /home/jjk/git/decktape/decktape.js --no-sandbox"
alias mysql 'mysql --auto-rehash -u root'

# Frequently edited files
alias i3config "$EDITOR ~/.config/i3/config"
alias kakrc "$EDITOR ~/.config/kak/kakrc"
alias fishrc "$EDITOR ~/.config/fish/config.fish"

# Conversions
alias frombinary "perl -lpe '\$_=pack\"B*\",\$_'"

alias chicken-csi "rlwrap chicken-csi"

function md
    mkdir -p $argv
end

function mdc
    mkdir -p $argv && cd $argv
end

# ls on cd
function cd
    if count $argv > /dev/null
        builtin cd "$argv"; and ls
    else
        builtin cd ~; and ls
    end
end

abbr lastpass "lpass show --password -c"
alias kakgrep "kak -e 'set window filetype grep'"

# Fuzzy cd
function fcd
    pushd (find . -type d | fzf)
end

abbr proxy "set -x HTTPS_PROXY http://localhost:8080
set -x HTTP_PROXY http://localhost:8080"

abbr theharverser_email "theHarvester -b baidu,bing,censys,duckduckgo,linkedin,linkedin_links,qwant,trello,twitter,yahoo"
