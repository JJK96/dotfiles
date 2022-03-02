# Collect subdomains from theHarvester outputs in a directory
import os
import argparse


def collect(dir):
    for filename in os.listdir(dir):
        with open(os.path.join(dir, filename)) as f:
            separator = False
            for line in f.readlines():
                if "------" in line:
                    separator = True
                    continue
                if not separator:
                    continue
                print(line, end='')


parser = argparse.ArgumentParser()
parser.add_argument('dir', help="Directory containing theHarvester files")
args = parser.parse_args()
collect(args.dir)
