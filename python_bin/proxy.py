#!/usr/bin/env python
import socketserver
import http.server
import urllib.request

PORT = 8082

class MyProxy(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args):
        self.allow_reuse_address = True
        super().__init__(*args)

    def do_CONNECT(self):
        self.wfile.write(b"HTTP/1.1 200 Connection established\nProxy-Agent: Python proxy\n\n")
        self.send_response(200)
        self.end_headers()

with socketserver.ForkingTCPServer(('127.0.0.1', PORT), MyProxy) as httpd:
    httpd.serve_forever()
