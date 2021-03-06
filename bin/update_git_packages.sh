#!/bin/bash
# not included:
# - neomutt
git_packages=( kakoune kak-lsp alacritty nnn)
for pkgname in ${git_packages[*]}; do
    cd $HOME/git/$pkgname-git/src/$pkgname
    git pull upstream master || exit
    read -p "Make package? [Y/n]: " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Nn]$ ]]; then
        cd ../../ && makepkg -i
    fi
done
