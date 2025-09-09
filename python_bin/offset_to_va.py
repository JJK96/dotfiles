#!/usr/bin/env python
import pefile

def autoint(x):
    return int(x,0)

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("pe_file")
    parser.add_argument("offset", type=autoint)
    parser.add_argument("--base", help="Base address", type=autoint, default=0)
    args = parser.parse_args()

    with open(args.pe_file, 'rb') as f:
        pe = pefile.PE(data=f.read())

    if args.base:
        pe.relocate_image(args.base)

    rva = pe.get_rva_from_offset(args.offset)
    print(hex(args.base + rva))
    
    
