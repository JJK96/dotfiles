import requests


def cpe_search(query):
    resp = requests.get(f"https://services.nvd.nist.gov/rest/json/cpes/2.0?cpeMatchString=cpe:2.3:a:{query}").json()
    products = [p for p in resp['products'] if not p['cpe']['deprecated']]
    return products


def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("query")
    args = parser.parse_args()
    for p in cpe_search(args.query):
        print(p['cpe']['cpeName'])

if __name__ == "__main__":
    main()
