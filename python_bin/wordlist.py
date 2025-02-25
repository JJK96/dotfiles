#!/usr/bin/env python
def load_wordlist(filename):
    with open(filename) as f:
        for line in f.readlines():
            # Strip newline
            yield line[:-1]

def separator_attack(args):
    left = load_wordlist(args.wordlist_file)
    right = load_wordlist(args.wordlist_file)
    for l in left:
        for r in right:
            if l == r:
                continue
            for separator in args.separators:
                yield l + separator + r
                yield r + separator + l


def print_output(outputs):
    for output in outputs:
        print(output)


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(description="attack_type")

    separator_parser = subparsers.add_parser("separator")
    separator_parser.add_argument("--separators", nargs="+", default=[",", ";", "+", "|", ":", ".", "/", "-", "_", "=", "\\"])
    separator_parser.set_defaults(func=separator_attack)

    for p in subparsers.choices.values():
        p.add_argument("wordlist_file")

    args = parser.parse_args()

    print_output(args.func(args))
