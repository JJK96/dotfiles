#!/usr/bin/env python
# Filter stdin by allowing only lines that are in the given input files
# Uses a hashmap to speed up
import click
from pathlib import Path
import sys

def create_set(inputs):
    res = set()
    for i in inputs:
        with open(i) as f:
            for line in f:
                res.add(line)
    return res


def get_allowed_lines(input_files, inverse=False):
    lines = create_set(input_files)
    for line in sys.stdin:
        if line in lines or (inverse and (line not in lines)):
            yield line


@click.command()
@click.argument("input_files", nargs=-1)
@click.option("-v", "--inverse", is_flag=True, help="Return all lines that are not in the given files instead")
def main(input_files, inverse):
    for line in get_allowed_lines(input_files, inverse=inverse):
        print(line, end="")


main()
