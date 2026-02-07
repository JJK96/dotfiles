#!/usr/bin/env python
import os
from ipaddress import IPv4Network
IP_RANGE=IPv4Network("10.0.1.0/24")

def is_used(ip_range):
    return os.system(f"ip route | grep -q {ip_range.network_address}") == 0

def get_free_iprange():
    ip_range = IP_RANGE
    while is_used(ip_range):
        new_addr = bytearray(ip_range.network_address.packed)
        new_addr[2] += 1
        ip_range = IPv4Network((bytes(new_addr), ip_range.prefixlen))
    return ip_range

def main():
    free_range = get_free_iprange()
    print(free_range)

if __name__ == "__main__":
    main()
