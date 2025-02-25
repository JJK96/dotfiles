#!/usr/bin/env python
import socketserver
import http.server
import urllib.request

class MyProxy(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args):
        self.allow_reuse_address = True
        super().__init__(*args)

    def do_CONNECT(self):
        self.wfile.write(b"HTTP/1.1 200 Connection established\nProxy-Agent: Python proxy\n\n")
        self.send_response(200)
        self.end_headers()


import argparse
parser = argparse.ArgumentParser()
parser.add_argument("-b", "--bind", help="Bind address", default="127.0.0.1")
parser.add_argument("-p", "--port", help="port", default=8082)
args = parser.parse_args()

print(f"Running on {args.bind}:{args.port}")
with socketserver.ForkingTCPServer((args.bind, args.port), MyProxy) as httpd:
    httpd.serve_forever()
