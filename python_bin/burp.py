import bs4
import base64
from collections import UserString

class RequestResponse(UserString):
    def __init__(self, text):
        self.headers, _, self.body = text.partition(b"\r\n\r\n")
        if len(self.body) and self.body[0] == 0x1f and self.body[1] == 0x8b:
            # Gzip
            import zlib
            self.body = zlib.decompress(self.body, 16+zlib.MAX_WBITS)
        super().__init__(text)
    

class Request(RequestResponse):
    pass

class Response(RequestResponse):
    pass


class Item:
    def __init__(self, item):
        self._item = item

    def get_req_resp(self, reqresp):
        decoded = base64.b64decode(reqresp.string)
        return decoded

    @property
    def request(self):
        return Request(self.get_req_resp(self._item.request))

    @property
    def response(self):
        return Response(self.get_req_resp(self._item.response))

    @property
    def html(self):
        index = self.response.find(b'<html')
        html = str(self.response[index:].decode())
        return bs4.BeautifulSoup(html, 'html.parser')

    @property
    def scripts(self):
        return self.html.find_all('script')

    def __getattr__(self, name):
        return getattr(self._item, name)

def get_items(input):
    with open(input) as f:
        contents = f.read()

    soup = bs4.BeautifulSoup(contents, "xml")
    items = soup.items.find_all('item')
    for item in items:
        yield Item(item)


def print_item(x, body_only=False):
    if body_only:
        x = x.body
    print(x.decode(), end="")


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("input")
    parser.add_argument("--req", action="store_true")
    parser.add_argument("--resp", action="store_true")
    parser.add_argument("--body-only", action="store_true")    
    args = parser.parse_args()

    for item in get_items(args.input):
        if args.req:
            print_item(item.request, args.body_only)
        if args.resp:
            print_item(item.response, args.body_only)
        print()
