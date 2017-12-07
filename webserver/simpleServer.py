#!/usr/bin/env python3

from http.server import BaseHTTPRequestHandler, HTTPServer
import subprocess

# HTTPRequestHandler class
class testHTTPServer_RequestHandler(BaseHTTPRequestHandler):
    # GET
    def do_GET(self):
        # send response status code
        myPath = self.path
        # self.send_response(200)
        if ( myPath is '/' or myPath is '/MainPage.html' ):
            # send headers
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            # Open the certain page
            file = open("files/html/MainPage.html", 'rb')
            # write down the content
            self.wfile.write(bytes(file.read()))
            file.close()
            return
        elif ".html" in myPath:
            if "files/html" not in myPath:
                newPath = "files/html" + myPath
            else:
                newPath = myPath
            try:
                print(newPath)
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                file = open(newPath, 'rb')
                self.wfile.write(bytes(file.read()))
                file.close()
            except IOError:
                self.send_response(200)
                self.send_response(404)
                self.send_header('Content-type', 'text/html')
                self.end_headers()

                newPath = myPath 
            #self.send_header('Content-type', 'text/html')
            #self.end_headers()
            try:
                file = open(newPath, 'rb')
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers();
                self.wfile.write(bytes(file.read()))
                file.close()
            except IOError:
                self.send_response(404)
                self.send_header('Content-type', 'text/html')
                self.end_headers();
                file = open("files/html/404.html", 'rb')
                self.wfile.write(bytes(file.read()))
                file.close()
            return
        elif ".jpg" in myPath or ".jepg" in myPath or \
            ".gif" in myPath or ".png" in myPath:
            if ".jpg" in myPath or ".jepg" in myPath:
                tmp = "jepg"
            elif ".gif" in myPath:
                tmp = "gif"
            else:
                tmp = "png"
            self.send_response(200)
            content = "images/" + tmp

            print(content)
            self.send_response(200)

            self.send_header('Content-type', content)
            self.end_headers()
            if "files/html" not in myPath:
                newPath = "files/html" + myPath
            else:
                newPath = myPath
            file = open(newPath, 'rb')
            self.wfile.write(file.read())
            file.close()
            return
        elif ".php" in myPath:
            myPath = myPath[1:i]
            command = (myPath.replace('?', ' ')).replace('&', ' ')
            command = "php " + command
            proc = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE)
            result = proc.stdout.read()
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(result)
            return
        else:
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            if "files/html" not in myPath:
                newPath = "files/html" + myPath
            else:
                newPath = myPath
            file = open(newPath, 'rb')
            self.wfile.write(file.read())
            file.close()
            return

    def do_POST(self):
        return

def run():
    print('starting server...')

    # server settings
    # choose port 28756
    server_address = ('0.0.0.0', 28756)
    httpd = HTTPServer(server_address, testHTTPServer_RequestHandler)
    print('running server...')
    httpd.serve_forever()

run()
