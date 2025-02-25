import os
import sys
import re
from pathlib import Path
import argparse
from itertools import islice, tee

parser = argparse.ArgumentParser()
parser.add_argument('--history-file', default="fish_history")
parser.add_argument('--output-file')
parser.add_argument('--to-remove', help="Regex to match which commands should be removed")
parser.add_argument('--dry-run', action="store_true", help="Only output removed entries")
args = parser.parse_args()

history_file = Path(os.environ['HOME']) / '.local' / 'share' / 'fish' / args.history_file

def get_commands(history_file):
    with open(history_file) as f:
        command = []
        for line in f:
            if line.startswith('- cmd'):
                if command:
                    yield ''.join(command)
                command = [line]
            else:
                command.append(line)

def _write_commands(f, commands):
    for command in commands:
        f.write(command)

def write_commands(output_file, commands):
    if output_file:
        with open(output_file, 'w+') as f:
            _write_commands(f, commands)
    else:
        _write_commands(sys.stdout, commands)


def filter_commands(commands, regex):
    regex = re.compile(regex)
    removed = []
    new_commands = []
    for command in commands:
        res = regex.search(command)
        if not res:
            new_commands.append(command)
        else:
            removed.append(command)
    return new_commands, removed


def print_commands(commands):
    for command in commands:
        print(command)

commands = get_commands(history_file)
if args.to_remove:
    commands, removed = filter_commands(commands, args.to_remove)
if args.dry_run:
    print_commands(removed)
else:
    write_commands(args.output_file, commands)
