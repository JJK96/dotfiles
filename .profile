export EDITOR="editor -t"
export TERMINAL=termite
export BROWSER=firefox
export PAGER=kak
mkdir -p /tmp/Downloads

export PATH="${PATH}:$HOME/bin:$HOME/.local/bin:$HOME/bin/perl:$HOME/.config/composer/vendor/bin:$HOME/.yarn/bin:$HOME/.gem/ruby/2.5.0/bin:$HOME/go/bin:$HOME/.cargo/bin:$HOME/.config/kak/bin:$HOME/perl5/bin"

export GPGKEY=35DA10798B42C1C8AEFEFEAC6487A893C19EA8BC
export PASSWORD_STORE_GENERATED_LENGTH=30
export PASSWORD_STORE_ENABLE_EXTENSIONS=true
export PASSWORD_STORE_EXTENSIONS_DIR="$HOME/.config/pass/extensions"
export KAKOUNE_POSIX_SHELL=/bin/bash
export PERL5LIB="/home/jjk/perl5/lib/perl5${PERL5LIB:+:${PERL5LIB}}"
export PERL_LOCAL_LIB_ROOT="/home/jjk/perl5${PERL_LOCAL_LIB_ROOT:+:${PERL_LOCAL_LIB_ROOT}}"
export PERL_MB_OPT="--install_base \"/home/jjk/perl5\""
export PERL_MM_OPT="INSTALL_BASE=/home/jjk/perl5"

