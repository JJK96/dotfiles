#!/usr/bin/env python
from burp import get_items

previous_scripts = set()

def scripts_generator(item):
    scripts = item.scripts
    if not scripts:
        return None
    scripts_text = []
    for script in scripts:
        yield script


def scripts_item(item):
    for script in scripts_generator(item):
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


def get_script_items(input):
    for item in get_items(input):
        try:
            new_item = scripts_item(item)
            if new_item:
                yield new_item
        except Exception as e:
            print("Exception while processing {}: {}".format(item.url, e))
            continue

def get_scripts_text(input):
    for item in get_items(input):
        try:
            for script in scripts_generator(item):
                yield script.text
        except Exception as e:
            print("Exception while processing {}: {}".format(item.url, e))
            continue
                


def extract_js(input, output, text_only=False):
    if text_only:
        scripts = get_scripts_text(input)
        with open(output, 'w') as f:
            f.write("\n".join(scripts))
    else:
        script_items = get_script_items(input)
        with open(output, 'w') as f:
            string = "<items>\n" + "\n".join(script_items) + "</items>"
            f.write(string)

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser("Extract JavaScript from burp export")
    parser.add_argument("input_file", help="Export from burp items")
    parser.add_argument("output_file", help="Output file")
    parser.add_argument("--text-only", action="store_true", help="Output only the contents of each <script> tag")
    args = parser.parse_args()
    extract_js(args.input_file, args.output_file, args.text_only)
