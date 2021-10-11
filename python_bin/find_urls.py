import argparse
import re

parser = argparse.ArgumentParser("Scan for urls in given file")
parser.add_argument("filename", help="File to scan for urls")
args = parser.parse_args()

regex = r"https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"


def find_urls(string):
    urls = re.finditer(regex, string)
    return [u.group() for u in urls]


with open(args.filename) as f:
    urls = find_urls(f.read())

for u in urls:
    print(u)
