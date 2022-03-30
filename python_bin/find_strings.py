#!/usr/bin/env python
#
# Search for strings in source code files in order to find security issues
# The strings are sorted in descending order based on the length of the matched string
# Duplicate strings are not shown
# The output is shown in grep-format for use in other tools
#
# Dependencies:
#   - ripgrep for grepping and outputing in JSON format
import subprocess
from json import JSONDecoder, JSONDecodeError
import re


NOT_WHITESPACE = re.compile(r'[^\s]')


# https://flutterq.com/how-to-extract-multiple-json-objects-from-one-file/
def decode_stacked(document, pos=0, decoder=JSONDecoder()):
    while True:
        match = NOT_WHITESPACE.search(document, pos)
        if not match:
            return
        pos = match.start()
        try:
            obj, pos = decoder.raw_decode(document, pos)
        except JSONDecodeError:
            # do something sensible if there's some error
            raise
        yield obj


def grep(language="dotnet", extra_args=None, **kwargs):
    regex = ["'.*?'", '".*?"']
    glob = []
    if language == "dotnet":
        regex += ['@"(.|\\n)*?"', "@'(.|\\n)*?'"]
        glob += ["-g", "*.cs"]
    if language == "java":
        regex += ['"""(.|\\n)*?"""',"'''(.|\\n)*?'''"]
        glob += ["-g", "*.java", "-g", "*.scala"]
    command = ["rg", "--multiline", "--json"] + glob + ['|'.join(regex)]
    if extra_args:
        command += extra_args
    result = subprocess.check_output(command).decode()
    return result


def process_matches(matches, ignore_regex=None, filter_regex=None, **kwargs):
    processed = {}
    for match in matches:
        if match['type'] != 'match':
            continue
        if ignore_regex:
            ignore_regex = re.compile(ignore_regex)
            if ignore_regex.search(match['data']['lines']['text']):
                continue
        if filter_regex:
            filter_regex = re.compile(filter_regex)
            if not filter_regex.search(match['data']['lines']['text']):
                continue
        for submatch in match['data']['submatches']:
            text = submatch['match']['text']
            path = match['data']['path']['text']
            line_number = match['data']['line_number']
            processed[text] = {
                "path": path,
                "line_number": line_number,
                "length": len(text),
            }
    return processed


def print_matches(processed_matches):
    for text, data in sorted(
            processed_matches.items(),
            key=lambda x: x[1]['length'],
            reverse=True):
        print(f"{data['path']}:{data['line_number']}: {text}")


def search_strings(*args, **kwargs):
    result = decode_stacked(grep(*args, **kwargs))
    processed = process_matches(result, **kwargs)
    return processed


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("-l", "--language", default="dotnet")
    parser.add_argument("--ignore-regex")
    parser.add_argument("--filter-regex")
    args, extra_args = parser.parse_known_args()
    results = search_strings(args.language, extra_args=extra_args, ignore_regex=args.ignore_regex, filter_regex=args.filter_regex)
    print_matches(results)
