import http.server
import socketserver
import socket
import webbrowser
import os
import sys

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # doesn't even have to be reachable
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

PORT = 8080
local_ip = get_local_ip()
game_url = f"http://{local_ip}:{PORT}"

# Generate the QR & connect dashboard
launcher_html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Buka Cetta TK di HP / Tablet</title>
  <style>
    body {{
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #E8F5E9 0%, #E1F5FE 100%);
      color: #2E3A23;
      margin: 0; padding: 24px;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      min-height: 90vh;
    }}
    .card {{
      background: #FFF;
      border-radius: 28px;
      padding: 32px 24px;
      max-width: 540px;
      width: 100%;
      text-align: center;
      box-shadow: 0 16px 40px rgba(0,0,0,0.1);
      border: 3px solid #C8E6C9;
    }}
    h1 {{ color: #2E7D32; margin-top: 0; font-size: 26px; }}
    .qr-box {{
      background: #FAFAFA;
      padding: 16px;
      border-radius: 20px;
      display: inline-block;
      margin: 16px 0;
      border: 2px dashed #81C784;
    }}
    .qr-img {{
      width: 240px; height: 240px;
      border-radius: 12px;
    }}
    .url-badge {{
      background: #E8F5E9;
      color: #1B5E20;
      font-size: 20px;
      font-weight: 800;
      padding: 12px 20px;
      border-radius: 16px;
      display: inline-block;
      margin-bottom: 16px;
      border: 2px solid #A5D6A7;
      word-break: break-all;
    }}
    .steps {{
      text-align: left;
      background: #F9FBE7;
      border: 1.5px solid #E6EE9C;
      padding: 18px;
      border-radius: 18px;
      font-size: 15px;
      line-height: 1.6;
    }}
    .btn {{
      display: inline-block;
      margin-top: 18px;
      background: #4CAF50;
      color: #FFF;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 24px;
      font-weight: 800;
      font-size: 16px;
      box-shadow: 0 4px 12px rgba(76,175,80,0.3);
    }}
  </style>
</head>
<body>
  <div class="card">
    <div style="font-size: 54px;">📲 🐼</div>
    <h1>Pasang Cetta TK di HP / Tablet</h1>
    <p style="color:#5C6F4D; font-size:15px; margin-top:-8px;">
      Buka kamera HP atau scan QR Code di bawah untuk memasang game:
    </p>

    <div class="qr-box">
      <img class="qr-img" src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data={game_url}" alt="QR Code Game">
    </div>

    <div>
      <span class="url-badge">{game_url}</span>
    </div>

    <div class="steps">
      <b>Langkah Mudah:</b><br>
      1. Pastikan HP/Tablet terhubung ke <b>WiFi yang sama</b> (atau Hotspot HP) dengan laptop ini.<br>
      2. <b>Scan QR Code</b> di atas pakai kamera HP, atau ketik alamat <b>{game_url}</b> di browser Chrome/Safari.<br>
      3. Di layar game, tekan tombol <b>"📲 Pasang di HP/Tablet"</b>.<br>
      4. Ikon <b>Pandi Cetta TK</b> akan langsung terpasang di layar utama HP/tablet anak dan <b>bisa dimainkan 100% OFFLINE tanpa kuota</b>! 🎉
    </div>

    <a href="{game_url}" target="_blank" class="btn">Buka Game di Laptop Ini 🚀</a>
  </div>
</body>
</html>
"""

launcher_file = os.path.join(os.path.dirname(__file__), "launcher.html")
with open(launcher_file, 'w', encoding='utf-8') as f:
    f.write(launcher_html)

os.chdir(os.path.dirname(__file__))

Handler = http.server.SimpleHTTPRequestHandler

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("="*60)
        print("   TAMAN PETUALANGAN CERIA CETTA TK - SERVER HP/TABLET")
        print("="*60)
        print(f"Alamat Game: {game_url}")
        print("Buka launcher di browser Anda...")
        print("Tekan Ctrl+C untuk menghentikan server.")
        print("="*60)
        webbrowser.open(f"file:///{launcher_file.replace(os.sep, '/')}")
        httpd.serve_forever()
except OSError:
    # If 8080 busy, try 8081
    PORT = 8081
    game_url = f"http://{local_ip}:{PORT}"
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Alamat Game: {game_url}")
        webbrowser.open(f"file:///{launcher_file.replace(os.sep, '/')}")
        httpd.serve_forever()
