#!/usr/bin/env python
# Scan for urls in stdin
import argparse
import re
import sys

regex = r"https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=\{\}]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"


def find_urls(string):
    urls = re.finditer(regex, string)
    return [u.group() for u in urls]


urls = find_urls(sys.stdin.read())
for u in urls:
    print(u)
