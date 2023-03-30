import bs4
import base64
from collections import UserString

class RequestResponse(UserString):
    def __init__(self, text):
        self.headers, _, self.body = text.partition("\r\n\r\n")
        super().__init__(text)
    

class Request(RequestResponse):
    pass

class Response(RequestResponse):
    pass


class Item:
    def __init__(self, item):
        self._item = item

    def get_req_resp(self, reqresp):
        try:
            return base64.b64decode(reqresp.string).decode()
        except UnicodeDecodeError:
            print(self._item.host)
            print(self._item.path)
            return "<html></html>"

    @property
    def request(self):
        return Request(self.get_req_resp(self._item.request))

    @property
    def response(self):
        return Response(self.get_req_resp(self._item.response))

    @property
    def html(self):
        index = self.response.find('<html')
        html = str(self.response[index:])
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
            x = item.request
        if args.resp:
            x = item.response
        if args.body_only:
            x = x.body
        print(x)
