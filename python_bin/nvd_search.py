#!/usr/bin/env python
import requests
import sys
from get_vendor import get_vendor


def get_score(x):
    metric_options = ['cvssMetricV31', 'cvssMetricV2']
    metrics = x['cve']['metrics']
    metric = None
    for option in metric_options:
        if option in metrics:
            metric = metrics[option]
    return metric[0]['cvssData']['baseScore']


def search(cpeName):
    url = f"https://services.nvd.nist.gov/rest/json/cves/2.0?virtualMatchString=cpe:2.3:a:{cpeName}"
    resp = requests.get(url)
    try:
        resp = resp.json()
    except requests.exceptions.JSONDecodeError:
        for k,v in resp.headers.items():
            print(f"{k}: {v}")
        print(resp.content)
        raise

    resp['vulnerabilities'] = sorted(resp['vulnerabilities'],
                                     key=get_score,
                                     reverse=True)
    return resp


def get_description(vuln, lang):
    for desc in vuln['cve']['descriptions']:
        if desc['lang'] == lang:
            return desc['value']
    return None


def display_results(results):
    for vuln in results['vulnerabilities']:
        id = vuln['cve']['id']
        print(get_score(vuln), id)
        print(get_description(vuln, 'en'))
        print(f"https://nvd.nist.gov/vuln/detail/{id}")
        print()


def print_url(cpe):
    if cpe.startswith('*'):
        split = cpe.split(":")
        vendor = get_vendor(split[1])
        cpe = ':'.join([vendor]+split[1:])
    print(
        f"https://nvd.nist.gov/vuln/search/results?form_type=Advanced&results_type=overview&search_type=all&isCpeNameSearch=false&cpe_version=cpe:/a:{cpe}\n"
    )


def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("cpe")
    args = parser.parse_args()

    results = search(args.cpe)
    display_results(results)
    sys.stdout.flush()
    print_url(args.cpe)


if __name__ == "__main__":
    main()
