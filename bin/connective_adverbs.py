#!/usr/bin/env python
#
# Convert bullets to firstly, secondly, ..., finally

import sys
import re

adverbs = ['firstly', 'secondly', 'thirdly', 'fourthly', 'fifthly']

content = sys.stdin.read()

matches = list(re.finditer(r"(\d+\.)", content, re.MULTILINE))
offset = 0
if len(matches) > len(adverbs)+1:
    raise Exception("Too many elements in enumeration")
for i, match in enumerate(matches):
    if i == len(matches)-1:
        word = 'finally'
    else:
        word = adverbs[i]
    length = match.end() - match.start()
    start = match.start() + offset
    end = match.end() + offset
    new_text = word.capitalize() + ','
    content = content[:start] + new_text + content[end:]
    offset += len(new_text) - length

print(content)
