import bs4
import base64

previous_scripts = set()

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
        return self.get_req_resp(self._item.request)

    @property
    def response(self):
        return self.get_req_resp(self._item.response)

    @property
    def html(self):
        index = self.response.find('<html')
        html = self.response[index:]
        return bs4.BeautifulSoup(html, 'html.parser')

    @property
    def scripts(self):
        return self.html.find_all('script')

    def __getattr__(self, name):
        return getattr(self._item, name)


def scripts_item(item):
    scripts = item.scripts
    if not scripts:
        return None
    scripts_text = []
    for script in scripts:
        script_text = str(script)
        if script_text not in previous_scripts:
            previous_scripts.add(script_text)
            scripts_text.append(script_text)
    if not scripts_text:
        return None
    new_item = "<item>\n"
    for child in item.children:
        if child.name != "request" and child.name != "response":
            new_item += str(child)
    new_item += "<scripts>\n" + "\n".join(scripts_text) + "</scripts>\n</item>"
    return new_item


def extract_js(input, output):
    with open(input) as f:
        contents = f.read()

    soup = bs4.BeautifulSoup(contents, "xml")
    items = soup.items.find_all('item')
    new_items = []
    for item in items:
        new_item = scripts_item(Item(item))
        if new_item:
            new_items.append(new_item)
    with open(output, 'w') as f:
        string = "<items>\n" + "\n".join(new_items) + "</items>"
        f.write(string)

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser("Extract JavaScript from burp export")
    parser.add_argument("input_file", help="Export from burp items")
    parser.add_argument("output_file", help="Output file")
    args = parser.parse_args()
    extract_js(args.input_file, args.output_file)
