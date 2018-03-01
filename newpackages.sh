#!/bin/bash
cat packages | perl -ne 'print unless (/^$/ || /^#/)' | awk '{print $1}' | sort > /tmp/a
pacman -Qe | awk '{print $1}' | sort > /tmp/b
comm -23 /tmp/b groups > /tmp/c
comm -23 /tmp/c /tmp/a
rm /tmp/{a,b,c}
