#!/usr/bin/env python
import plistlib
import sys
with open(sys.argv[1], 'rb') as f:
    print(plistlib.dumps(plistlib.load(f)).decode())
