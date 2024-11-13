from http.server import SimpleHTTPRequestHandler, HTTPServer

# 서버 설정
PORT = 8000

# 핸들러를 이용해 요청 처리
handler = SimpleHTTPRequestHandler

# 서버 시작
with HTTPServer(("", PORT), handler) as httpd:
    print("Serving at port", PORT)
    httpd.serve_forever()
