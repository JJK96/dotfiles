#!/bin/bash
dir=$(mktemp -d)
cat packages | perl -ne 'print unless (/^$/ || /^#/)' | awk '{print $1}' > $dir/a
cat ignored_packages/* >> $dir/a
sort $dir/a > $dir/aa
pacman -Qe | awk '{print $1}' | sort > $dir/b
comm -23 $dir/b groups > $dir/c
comm -23 $dir/c $dir/aa
rm $dir/{a,b,c,aa}
