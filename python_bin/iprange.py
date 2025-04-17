#!/usr/bin/env python
import ipaddress
import sys

for ip in ipaddress.IPv4Network(sys.argv[1], strict=False):
    print(ip)
