#!/usr/bin/env python
from crtsh import crtshAPI


def get_subdomains(domain):
    subdomains = set()
    try:
        field = 'common_name'
        result = crtshAPI().search(domain)
        result = filter(lambda x: '*' not in x[field], result)
        for r in result:
            subdomains.add(r[field])
    finally:
        return subdomains


def main():
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("domain")
    args = parser.parse_args()

    for subdomain in get_subdomains(args.domain):
        print(subdomain)


if __name__ == "__main__":
    main()
