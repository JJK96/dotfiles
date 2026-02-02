#!/usr/bin/env python
from dataclasses import dataclass
import re
from pathlib import Path
import argparse

@dataclass
class Entry:
    line: str
    inputs: str
    output: str

def parse_cmdline(line):
    find_output = re.compile(r"> (.*)$")
    res = find_output.search(line)

    if res:
        output = res.groups(1)[0]
    else:
        output = input("Please provide the output filename: ")

    if line.startswith("cat "):
        catcmd,_,_ = line.partition('|')
        inputs = [x for x in catcmd.split(' ')[1:] if x]
    else:
        inputs = []
    return Entry(line, inputs, output)

def generate_make_entry(entry: Entry):
    inputs_string = " ".join(entry.inputs)
    line = entry.line.replace(entry.output, "$@")
    if entry.inputs:
        line = line\
            .replace(inputs_string, "$^")\
            .replace(entry.inputs[0], "$<")
    return f"""\
{entry.output}: {inputs_string}
	{line}"""

def write_entry(path):
    existed = path.exists()
    with open(path, 'a+') as f:
        if existed:
            f.write("\n\n")
        f.write(entry)

parser = argparse.ArgumentParser()
parser.add_argument("cmdline")
parser.add_argument("--dry-run", action="store_true")
parser.add_argument("--path", "-p", default="Makefile")
args = parser.parse_args()

entry = generate_make_entry(parse_cmdline(args.cmdline))
print(entry)
if not args.dry_run:
    write_entry(Path(args.path))
