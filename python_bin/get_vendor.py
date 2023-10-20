from cpe_search import cpe_search


def get_vendor(product):
    products = cpe_search(f"*:{product}")
    return products[0]['cpe']['cpeName'].split(':')[3]


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("product")
    args = parser.parse_args()
    print(get_vendor(args.product))
