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


def grep(language="dotnet", extra_args=None):
    regex = "'.*?'|\".*?\""
    glob = []
    if language == "dotnet":
        regex += "|@\"(.|\\n)*?\"|@'(.|\\n)*?'"
        glob += ["-g", "*.cs"]
    command = ["rg", "--multiline", "-o", "--json"] + glob + [regex]
    if extra_args:
        command += extra_args
    result = subprocess.check_output(command).decode()
    return result


def process_matches(matches):
    processed = {}
    for match in matches:
        if match['type'] != 'match':
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
    processed = process_matches(result)
    return processed


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("-l", "--language", default="dotnet")
    args, extra_args = parser.parse_known_args()
    results = search_strings(args.language, extra_args=extra_args)
    print_matches(results)
