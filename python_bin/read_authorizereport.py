###########
# A script to read and process the saved state of the Burp Suite Autorize plugin
###########

import base64
import json
import pprint

def get_query_params(path):
    query_params = {}
    if '?' in path:
        for param in path.partition('?')[2].split('&'):
            key, value = param.split('=')
            query_params[key] = value
    return query_params

def prettyfy_response(resp):
    """Pretty print body if it is"""
    try:
        header, body = resp.split("\r\n\r\n")
        json_obj = json.loads(body)
        pretty_resp = header + "\r\n\r\n" + pprint.pformat(json_obj)
        return pretty_resp
    except:
        return resp

def unauthenticated(resp):
    if 'No access' in resp:
        return True
    return False


with open('allowed_paths.txt', 'r') as f:
    allowed_paths = f.read().split("\n")

with open('handled.txt', 'r') as f:
    handled_indexes = eval(f.read())

def add_to_allowed_paths(path):
    allowed_paths.append(path)
    with open('allowed_paths.txt', 'a') as f:
        f.write(path)
        f.write("\n")

def add_to_handled_indexes(index):
    handled_indexes.append(index)
    with open('handled.txt', 'w') as f:
        f.write(str(handled_indexes))

with open('Authorizereport') as f:
    # with open('output.txt', 'w') as output:
        for i, line in enumerate(f.readlines()):
            line = line.split('\t')
            if "Enforced" in line[-2] and "Enforced" in line[-1]:
                continue
            modified_request = base64.b64decode(line[3]).decode()
            modified_response = base64.b64decode(line[4]).decode()
            original_request = base64.b64decode(line[8]).decode()
            original_response = base64.b64decode(line[9]).decode()
            fullpath= modified_request.partition("\n")[0].split(" ")[1]
            query_params = get_query_params(fullpath)
            # Remove query from path
            path = fullpath.partition('?')[0]
            if path in allowed_paths:
                continue
            if unauthenticated(modified_response):
                continue
            if i in handled_indexes:
                continue
            # output.write('\t'.join(line))
            modified_response = prettyfy_response(modified_response)
            print(modified_request)
            done = False
            while not done:
                c = input("Char>")
                if c == "a":
                    add_to_allowed_paths(path)
                    done = True
                elif c == "p":
                    print(modified_response)
                elif c == 'n':
                    add_to_handled_indexes(i)
                    done = True
                elif c == "pp":
                    print(fullpath)


