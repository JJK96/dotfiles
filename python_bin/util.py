import os
import re
import functools
import itertools

# Adapted from https://stackoverflow.com/questions/32774910/clean-way-to-read-a-null-terminated-c-style-string-from-a-file
def readcstr(f, offset=None):
    if offset is not None:
        f.seek(offset)
    toeof = iter(functools.partial(f.read, 1), b'')
    return b''.join(itertools.takewhile(b'\0'.__ne__, toeof)).decode()


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

def choose_options(header, options, prompt="Choose a number", print_func=lambda i, option: print(f"{i}: {option}"), other=False, other_text="Other", other_input_func=lambda: input("Other input: ")):
    print(header)
    for i, option in enumerate(options):
        print_func(i, option)
    last_num = i
    if other:
        last_num = len(options)
        print(f"{last_num}: {other_text}")
    choice = int(input(f"{prompt}: [0-{last_num}]: "))
    if other and choice == last_num:
        other_input = other_input_func()
        return other_input
    else:
        return options[choice]

def import_module(path, name=None):
    if not name:
        name = "module.name"
    import importlib.util
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod
