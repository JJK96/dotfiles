import sys
import argparse
import xml.etree.ElementTree as ET

parser = argparse.ArgumentParser()
parser.add_argument("-f", "--input-file", help="Use given file instead of stdin")
parser.add_argument("-c", "--columns", help="Colums to output e.g. 1 or 1,2 or 1-4")
args = parser.parse_args()


def replace_children(element, new_children):
    children = [c for c in element]
    for child in children:
        element.remove(child)
    for child in new_children:
        element.append(child)


def expand_columns(columns):
    if ',' in columns:
        res = []
        for c in columns.split(','):
            res += expand_columns(c)
        return res
    if '-' in columns:
        start,_,end = columns.partition('-')
        return list(range(int(start),int(end)+1))
    return [int(columns)]

input_stream = sys.stdin
if args.input_file:
    input_stream = open(args.input_file)

if args.columns:
    columns = expand_columns(args.columns)

root = ET.fromstring(input_stream.read())
for tr in root.iter('tr'):
    children = [c for c in tr]
    new_children = []
    for i in columns:
        child = children[i-1]
        new_children.append(child)
    replace_children(tr, new_children)

ET.dump(root)
