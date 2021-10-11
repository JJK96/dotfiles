#!/usr/bin/env python
import json


def get_passwords(entries):
    result_str = "email,password\n"
    for entry in entries:
        if not entry['password']:
            continue
        result = []
        result.append(entry['email'])
        result.append(entry['password'])
        result_str += ','.join(result) + "\n"
    return result_str


def get_hashed_passwords(entries):
    result_str = "email,hashed_password\n"
    for entry in entries:
        if entry['password'] or not entry['hashed_password']:
            continue
        result = []
        result.append(entry['email'])
        result.append(entry['hashed_password'])
        result_str += ','.join(result) + "\n"
    return result_str


def write_passwords(input, output=None, hashes=None):
    with open(input) as f:
        passwords = json.load(f)

    output_str = get_passwords(passwords['entries'])
    if not output:
        print(output_str)
    else:
        with open(output, 'w') as f:
            f.write(output_str)

    if hashes:
        with open(hashes, 'w') as f:
            f.write(get_hashed_passwords(passwords['entries']))


def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("input")
    parser.add_argument("-o", "--output")
    parser.add_argument("-x", "--hashes")
    args = parser.parse_args()
    write_passwords(args.input, args.output, args.hashes)


if __name__ == "__main__":
    main()

# print(get_passwords(sorted(passwords['entries'], key=lambda x:x['id'])))
