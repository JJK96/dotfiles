# colorscheme
source ~/.profile
(cat ~/.cache/wal/sequences &)
# Lines configured by zsh-newuser-install
setopt HIST_IGNORE_SPACE
export EDITOR=kak
HISTFILE=~/.histfile
HISTSIZE=1000
SAVEHIST=1000
export GPGKEY=35DA10798B42C1C8AEFEFEAC6487A893C19EA8BC
export PASSWORD_STORE_GENERATED_LENGTH=30
export PASSWORD_STORE_ENABLE_EXTENSIONS=true
export PASSWORD_STORE_EXTENSIONS_DIR="$HOME/.config/pass/extensions"
setopt inc_append_history
setopt autocd 
setopt extendedglob
#setopt share_history
bindkey -v
# End of lines configured by zsh-newuser-install
# The following lines were added by compinstall
zstyle :compinstall filename '/home/jjk/.zshrc'
autoload -Uz compinit
compinit
# End of lines added by compinstall
autoload -U promptinit
promptinit
prompt suse
setopt PROMPT_SP
PROMPT="%B%F{4}$PROMPT%f%b"
PROMPT_EOL_MARK=''
autoload -Uz history-beginning-search-menu
zle -N history-beginning-search-menu
bindkey '^X^X' history-beginning-search-menu
bindkey '^R' history-incremental-search-backward

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
bindkey '^Z' fgLast
bindkey '^k' nextJob
bindkey '^j' prevJob
function chpwd() {
    emulate -L zsh
    ls --color
}

#COLORFGBG="default;default"

#export PATH="${PATH}:$HOME/bin:$HOME/.local/bin:$HOME/bin/perl:$HOME/.config/composer/vendor/bin:$HOME/.yarn/bin:$HOME/.gem/ruby/2.5.0/bin"
#PATH="/home/jjk/perl5/bin${PATH:+:${PATH}}"; export PATH;

PERL5LIB="/home/jjk/perl5/lib/perl5${PERL5LIB:+:${PERL5LIB}}"; export PERL5LIB;
PERL_LOCAL_LIB_ROOT="/home/jjk/perl5${PERL_LOCAL_LIB_ROOT:+:${PERL_LOCAL_LIB_ROOT}}"; export PERL_LOCAL_LIB_ROOT;
PERL_MB_OPT="--install_base \"/home/jjk/perl5\""; export PERL_MB_OPT;
PERL_MM_OPT="INSTALL_BASE=/home/jjk/perl5"; export PERL_MM_OPT;

# aliases
alias wine32='WINEPREFIX="$HOME/.wine32" wine'
alias l='ls --color'
alias pls='sudo $(fc -ln -1)'
alias youtube-mp3='youtube-dl -i --yes-playlist -x --audio-format m4a --audio-quality 0 '
alias sprunge="curl -F 'sprunge=<-' http://sprunge.us"
alias leave="bg %+ && disown %+ && exit"
alias x="startx"
alias giomount='cd /run/user/1000/gvfs/'
alias term='termite & disown'
alias iv="sxiv -b"
alias i3config="$EDITOR ~/.config/i3/config"
alias kakrc="$EDITOR ~/.config/kak/kakrc"
alias cleargpg="echo RELOADAGENT | gpg-connect-agent"
alias xsel="xsel -b"
alias pkgs='function _pkgs(){ pacman -Ss "$@" || aur search "$@";};_pkgs'
#alias yay='yay --editmenu'
alias aurinst='function _aurinst(){ aur sync "$@" && sudo pacman -S "$@";};_aurinst'
alias ll="ls -lh --color"
alias zip="zip -r"
alias r2="r2 -A"
alias html2jade="html2jade -n 4 --noemptypipe --bodyless"
alias lt="languagetool -m nl -l en-GB --xmlfilter -d COMMA_PARENTHESIS_WHITESPACE,WHITESPACE_RULE "
alias recomp="killall compton && compton & disown && wal -R && exit"
alias spell="aspell check --lang=en-GB "
alias copyTijd="rclone copy /tmp/Tijd\ Jan-Jaap.xlsx dropbox:Jan-Jaap && rm /tmp/Tijd\ Jan-Jaap.xlsx"
alias p='function _ps(){ ps -aux | grep $@ };_ps'
alias n='netstat -plnt'
alias tgrep='function _tgrep(){grep "$@" *.tex};_tgrep'
alias ide='ide && exit'
alias cls='printf "\033c"'
alias escape='xcape -e "ISO_Level3_Shift=Escape"'
alias notify-at='function _at(){echo "notify-send" "${@:2}" | at $1 };_at'

# move workspace to other output.
alias mvws='function _mvws(){i3-msg move workspace to output "$1"};_mvws'

# git
alias gcf='git commit -m "`fortune`"'
alias gpf="git add -A && gcf && git pull && git push"
alias ga="git add -A"
alias gpl="git pull"
alias gps="git push"
alias gs="git status"
alias gc="git commit"
alias gpatch="git format-patch -o /tmp origin"

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

# directories
alias wd="cd /home/jjk/Documents/master"
alias swifter="cd /srv/http/swifter/stamboek/"
alias dahomey="cd /opt/lampp/htdocs/dahomey/testing.dahomey.nl/"
alias kaksrc="cd ~/git/kakoune-git/src/kakoune/"
alias lspsrc="cd ~/git/kak-lsp-git/src/kak-lsp/"

# Programs
alias decktape="node /home/jjk/git/decktape/decktape.js --no-sandbox"
alias mysql='mysql --auto-rehash -u root'

# web sessions
alias courses="firefox https://canvas.utwente.nl/courses/2479 https://learnintsec.org/courses/course-v1:UT+201700074B+2018Q1/courseware/d7394691d26f439082912a37c7f3bc62/ https://learnintsec.org/courses/course-v1:UT+201700074A+2018Q1/courseware/b95b477cab3d4668bdb46f57a1274261/ https://brightspace.tudelft.nl/d2l/home/140133 https://brightspace.tudelft.nl/d2l/home/126945 & disown %firefox && exit"

