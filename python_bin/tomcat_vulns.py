#!/usr/bin/env python
import requests
import re


def get_vulns(version):
    major = version.split('.')[0]
    resp = requests.get(f"https://tomcat.apache.org/security-{major}.html")
    relevant_part = resp.text.partition(f"<h3 id=\"Fixed_in_Apache_Tomcat_{version}")[0]
    cve_regex = "CVE-\d+-\d+"
    regex = re.compile(f"Important: .*?{cve_regex}", re.S)
    for m in regex.findall(relevant_part):
        text, _, rest = m.partition("<")
        cve = re.search(cve_regex, rest)
        yield text, cve.group(0)


def print_vulns(version):
    for text, cve in get_vulns(version):
        print(text, cve)


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("version")
    args = parser.parse_args()
    print_vulns(args.version)
