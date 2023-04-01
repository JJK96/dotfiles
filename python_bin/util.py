import os

def get_cookies():
    if not 'cookie' in os.environ:
        return None
    cookies = {}
    for c in os.environ['cookie'].split(';'):
        key, _, value = c.partition('=')
        cookies[key.strip()]=value
    return cookies


def print_dict(d):
    for k,v in d.items():
        print(f"{k}: {v}")
