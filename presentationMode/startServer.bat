@echo off
cd "C:\Users\user\Desktop\rs2wsBlob\application.windows64\"
start rs2wsBlob.exe
cd "C:\Users\user\Desktop\presentationMode"
TIMEOUT /t 20
start chrome --start-fullscreen http://localhost:8080
py -m http.server 8080


