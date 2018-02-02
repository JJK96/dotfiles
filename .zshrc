# Lines configured by zsh-newuser-install
HISTFILE=~/.histfile
HISTSIZE=1000
SAVEHIST=1000
export EDITOR=vim
export GPGKEY=35DA10798B42C1C8AEFEFEAC6487A893C19EA8BC
export PASSWORD_STORE_GENERATED_LENGTH=30
export PASSWORD_STORE_ENABLE_EXTENSIONS=true
setopt inc_append_history
setopt autocd extendedglob
setopt share_history
bindkey -v
# End of lines configured by zsh-newuser-install
# The following lines were added by compinstall
zstyle :compinstall filename '/home/jjk/.zshrc'
autoload -Uz compinit
compinit
# End of lines added by compinstall
eval neofetch --color_blocks off
bindkey -v
autoload -U promptinit
promptinit
prompt suse
LS_COLORS='di=1:fi=0:ln=31:pi=5:so=5:bd=5:cd=5:or=31:mi=0:ex=35:*.rpm=90'
export LS_COLORS
autoload -Uz history-beginning-search-menu
zle -N history-beginning-search-menu
bindkey '^X^X' history-beginning-search-menu

fgLast() {
    fg
}
zle -N fgLast
bindkey '^Z' fgLast
export PATH="${PATH}:$HOME/bin:$HOME/bin/perl"
function chpwd() {
    emulate -L zsh
    ls
}


PATH="/home/jjk/perl5/bin${PATH:+:${PATH}}"; export PATH;
PERL5LIB="/home/jjk/perl5/lib/perl5${PERL5LIB:+:${PERL5LIB}}"; export PERL5LIB;
PERL_LOCAL_LIB_ROOT="/home/jjk/perl5${PERL_LOCAL_LIB_ROOT:+:${PERL_LOCAL_LIB_ROOT}}"; export PERL_LOCAL_LIB_ROOT;
PERL_MB_OPT="--install_base \"/home/jjk/perl5\""; export PERL_MB_OPT;
PERL_MM_OPT="INSTALL_BASE=/home/jjk/perl5"; export PERL_MM_OPT;

# aliases
alias wine32='WINEPREFIX="$HOME/.wine32" wine'
alias l='ls --color'
alias please='sudo $(fc -ln -1)'
alias youtube-mp3='youtube-dl -i --yes-playlist -x --audio-format m4a --audio-quality 0 '
alias sprunge="curl -F 'sprunge=<-' http://sprunge.us"
alias leave="bg %+ && disown %+ && exit"
alias x="startx"
alias commit='git commit -m "`fortune`"'
alias giomount='cd /run/user/1000/gvfs/'
alias term='urxvt &'
alias custom='repose -vf custom -r /var/cache/pacman/custom'
alias iv="sxiv -b"
alias i3config="$EDITOR ~/.config/i3/config"
alias upd="aursync -u && sudo pacman -Syu"
alias cleargpg="echo RELOADAGENT | gpg-connect-agent"
alias xsel="xsel -b"
alias wd="cd ~/Documents/mod11/"
alias pkgs='function _pkgs(){ pacman -Ss "$1" || aursearch "$1";};_pkgs'
