#!/usr/bin/env python
offset = 11

import argparse
parser = argparse.ArgumentParser()
parser.add_argument("input")
parser.add_argument("-o", "--output", default="certipy.reg")
args = parser.parse_args()

def convert_data(data, type):
    if type == "REG_BINARY":
        new_data = [data[i:i+2] for i in range(0, len(data), 2)]
        return "hex:" + ','.join(new_data)
    elif type == "REG_DWORD":
        return "dword:" + data[2:]
    elif type == "REG_MULTI_SZ":
        new_data = []
        for d in data:
            new_data.append(hex(ord(d))[2:])
            new_data.append('00')
        return "hex(7):" + ','.join(new_data)
    return '"' + data + '"'

types = set()
with open(args.input) as f:
    with open(args.output, 'wb') as out:
        out.write('Windows Registry Editor Version\r\n'.encode('utf-16-le'))
        for i, line in enumerate(f):
            if line.startswith("Reg Key"):
                key = line[offset:-1]
                if i != 0:
                    out.write('\r\n'.encode('utf-16-le'))
                out.write(("[" + key + "]\r\n").encode('utf-16-le'))
            elif line.startswith("Reg Value"):
                value = line[offset:-1]
            elif line.startswith("Reg Type"):
                type = line[offset:-1]
                types.add(type)
            elif line.startswith("Reg Data"):
                data = line[offset:-1].strip()
                out.write(f'"{value}"={convert_data(data, type)}\r\n'.encode('utf-16-le'))
