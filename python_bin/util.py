import os
import re

def get_cookies():
    if not 'cookie' in os.environ:
        return None
    cookies = {}
    for c in os.environ['cookie'].split(';'):
        key, _, value = c.partition('=')
        cookies[key.strip()]=value
    return cookies


def print_dict(d):
    for k,v in d.items():
        print(f"{k}: {v}")


def grep(filename, regex, negative=False):
    with open(filename) as f:
        for line in f.readlines():
            matches = re.search(regex, line)
            if negative and not matches:
                yield line
            if not negative and matches:
                yield line


def index(mylist, key):
    d = {}
    for x in mylist:
        d[key(x)] = x
    return d
