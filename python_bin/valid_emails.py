from csv_processor import process_csv_streams
import sys
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("valid")
args = parser.parse_args()

valid = set()
with open(args.valid) as f:
    for line in f:
        valid.add(line[:-1])

def process(line):
    return line['email'] in valid

process_csv_streams(sys.stdin, sys.stdout, process)
