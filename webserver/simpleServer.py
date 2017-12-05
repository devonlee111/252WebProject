#!/usr/bin/env python

from http.server import BaseHTTPRequestHandler, HTTPServer

# HTTPRequestHandler class
class testHTTPServer_RequestHandler(BaseHTTPRequestHandler):
    # GET
    def do_GET(self):
        # send response
        self.send_response(200)

        # send headers
        self.send_header('Content-type', 'text/html')
        self.end_headers()

        # send message back to client
        message = "Hello world!"
        # write content
        self.wfile.write(bytes(message, "utf8"))
        return

def run():
    print('starting server...')

    # server settings
    # choose port 8080
    server_address = ('127.0.0.1', 8081)
    httpd = HTTPServer(server_address, testHTTPServer_RequestHandler)
    print('running server...')
    httpd.serve_forever()

run()