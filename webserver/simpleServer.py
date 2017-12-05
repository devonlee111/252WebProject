#!/usr/bin/env python3

from http.server import BaseHTTPRequestHandler, HTTPServer

# HTTPRequestHandler class
class testHTTPServer_RequestHandler(BaseHTTPRequestHandler):
    # GET
    def do_GET(self):
        # send response status code
        mypath = self.path
        self.send_response(200)

        # send headers
        self.send_header('Content-type', 'text/html')
        self.end_headers()

        # Open the certain page
        file = open("MainPage.html", 'rb')
        # write down the content
        self.wfile.write(bytes(file.read()))
        return

def run():
    print('starting server...')

    # server settings
    # choose port 8080
    server_address = ('0.0.0.0', 28756)
    httpd = HTTPServer(server_address, testHTTPServer_RequestHandler)
    print('running server...')
    httpd.serve_forever()

run()