@echo off
cd "C:\Users\user\Desktop\rs2wsBlob\application.windows64\"
start rs2wsBlob.exe
cd "C:\Users\user\Desktop\iFrameSwitcher"
TIMEOUT /t 30
start chrome --start-fullscreen http://localhost:8080
py -m http.server 8080


