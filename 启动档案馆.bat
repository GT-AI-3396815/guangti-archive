@echo off
chcp 65001 >nul 2>&1
title 光体·星际档案馆
color 0A
cd /d "%~dp0"
echo.
echo   ✦ 光体·星际档案馆 LUMINARY INTERSTELLAR ARCHIVE
echo.
echo   本地服务器启动中...
echo.
start "" "http://localhost:8765/index.html#/"
node server.js
pause
