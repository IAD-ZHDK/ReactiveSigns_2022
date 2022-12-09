@echo off
cd "C:\Users\user\Desktop\"
start rs2wsBlob.lnk
cd "C:\Users\user\Desktop\presentationMode"
TIMEOUT /t 20
start chrome --start-fullscreen http://localhost:8080
py -m http.server 8080


