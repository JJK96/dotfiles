source ~/.profile
setopt HIST_IGNORE_SPACE
setopt EXTENDED_HISTORY
HISTFILE=~/.histfile
HISTSIZE=100000
SAVEHIST=100000
setopt inc_append_history
setopt autocd 
setopt extendedglob
#setopt share_history
# The following lines were added by compinstall
zstyle :compinstall filename '/home/jjk/.zshrc'
zstyle ':completion:*' file-sort date
autoload -Uz compinit
compinit
autoload -z edit-command-line
zle -N edit-command-line
# End of lines added by compinstall

#bindkey "^[[A" history-beginning-search-backward
#bindkey "^[[B" history-beginning-search-forward
#
## Search in history
#autoload -Uz history-beginning-search-menu
#zle -N history-beginning-search-menu
#
## Search through history based on currently typed text
autoload -U up-line-or-beginning-search
autoload -U down-line-or-beginning-search
zle -N up-line-or-beginning-search
zle -N down-line-or-beginning-search

source ~/.zsh/zsh-fzf-history-search.zsh

# easier job management
fgLast() {
    fg
}

nextJob() {
    myJobs="$(jobs)"
    current=$(echo "$myJobs" | grep + | awk '{print $1}' | perl -pe 's/[\[\]]//g')
    jobCount=$(echo "$myJobs" | wc -l)
    if [[ $1 ]]; then
        next=$(if [[ $current -eq 1 ]]; then echo $jobCount; else echo $(($current-1));fi)
    else 
        next=$(if [[ $current -eq $jobCount ]]; then echo "1"; else echo $(($current+1));fi)
    fi
    fg "%$next"
}
prevJob() {
    nextJob x
}

zle -N nextJob
zle -N prevJob
zle -N fgLast
function chpwd() {
    emulate -L zsh
    ls --color
}

# aliases
alias wine32='WINEPREFIX="$HOME/.wine32" wine'
alias l='ls --color'
alias pls='sudo $(fc -ln -1)'
alias youtube-mp3='youtube-dl -i --yes-playlist -x --audio-format m4a --audio-quality 0 '
alias sprunge="curl -F 'sprunge=<-' http://sprunge.us"
alias leave="bg %+ && disown %+ && exit"
alias x="startx"
alias giomount='cd /run/user/1000/gvfs/'
alias term='$TERMINAL & disown'
alias iv="sxiv -b"
alias cleargpg="echo RELOADAGENT | gpg-connect-agent"
alias xsel="xsel -b"
alias pkgs='function _pkgs(){ pacman -Ss "$@" || aur search "$@";};_pkgs'
alias aurinst='function _aurinst(){ aur sync "$@" && sudo pacman -S "$@";};_aurinst'
alias ll="ls -lh --color"
alias zip="zip -r"
alias r2="r2 -A"
alias html2jade="html2jade -n 4 --noemptypipe --bodyless"
alias lt="languagetool -m nl -l en-GB --xmlfilter -d COMMA_PARENTHESIS_WHITESPACE,WHITESPACE_RULE,ACTUAL "
alias recomp="killall compton && compton & disown && wal -R && exit"
alias spell="aspell check --lang=en-GB "
alias copyTijd="rclone copy /tmp/Tijd\ Jan-Jaap.xlsx dropbox:Jan-Jaap && rm /tmp/Tijd\ Jan-Jaap.xlsx"
alias p='function _ps(){ ps -aux | grep $@ | grep -v grep };_ps'
alias n='netstat -plnt'
alias o='xdg-open'
alias tgrep='function _tgrep(){grep "$@" *.tex};_tgrep'
alias ide='ide && exit'
alias cls='printf "\033c"'
alias notify-at='function _at(){echo "notify-send" "${@:2}" | at $1 };_at'

# move workspace to other output.
alias mvws='function _mvws(){i3-msg move workspace to output "$1"};_mvws'

# git
alias gcf='git commit -m "`fortune`"'
alias gpf="git add -A && gcf && git pull && git push"
alias gs="git status"
alias gpatch="git format-patch -o /tmp origin"
alias gco="git checkout"
alias gcm="git checkout master || git checkout main"
alias gcl="git clone"
alias gl="git pull"
alias gp="git push"
alias gc="git commit"
alias ga="git add"
alias gaa="git add --all"
alias grs="git restore"
alias gd="git diff"
alias gcam="git commit --amend"

# pacman
alias repo-remove="repo-remove /var/cache/pacman/custom/custom.db.tar"
alias repo-add="repo-add /var/cache/pacman/custom/custom.db.tar"
alias upd="aur sync -u;sudo pacman -Syu"
alias custom='repose -vf custom -r /var/cache/pacman/custom'

# kakoune
alias k='editor -t'
alias e="editor"

# mutt
alias mutt=neomutt

# ranger
alias r="ranger"

# directories
alias wd="cd /home/jjk/Documents/master"
alias md="mkdir -p"
alias kaksrc="cd ~/git/kakoune-git/src/kakoune/"
alias lspsrc="cd ~/git/kak-lsp-git/src/kak-lsp/"

# Programs
alias decktape="node /home/jjk/git/decktape/decktape.js --no-sandbox"
alias mysql='mysql --auto-rehash -u root'

# Frequently edited files
alias i3config="$EDITOR ~/.config/i3/config"
alias kakrc="$EDITOR ~/.config/kak/kakrc"
alias zshrc="$EDITOR ~/.zsh/.zshrc"

# Conversions
alias frombinary="perl -lpe '\$_=pack\"B*\",\$_'"

alias mdc='function _md(){mkdir -p "$1" && cd "$1"};_md'

# Smart cat/less/ls alternative that works on both files and directories
alias c='function _mycat(){([ $# -eq 0 ] || [ -d $@ ]) && ls $@ || less -F $@};_mycat'

function a() {
    sysctl dev.tty.legacy_tiocsti | grep -q '= 1$' || sudo sysctl -w dev.tty.legacy_tiocsti=1
    arsenal "$@"
}
alias jq="jq -r"

alias curl="curl -A '$USER_AGENT'"
alias cat="batcat"
alias rm="rm -I"

function to_makefile() {
    to_makefile.py "$(fc -ln -1)"
}
