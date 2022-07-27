import os

def get_cookies():
    if not 'cookie' in os.environ:
        return None
    cookies = {}
    for c in os.environ['cookie'].split(';'):
        key, _, value = c.partition('=')
        cookies[key.strip()]=value
    return cookies
