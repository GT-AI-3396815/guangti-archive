@echo off
chcp 65001 >nul 2>&1
title 光体·星际档案馆 - 本地服务器
color 0A

echo ═══════════════════════════════════════════════
echo   光体·星际档案馆 LUMINARY INTERSTELLAR ARCHIVE
echo   本地服务器启动中...
echo ═══════════════════════════════════════════════
echo.

cd /d "%~dp0"

:: 检查 Node.js 是否可用
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [提示] 未检测到 Node.js，正在以文件方式直接打开...
    echo.
    start "" "index.html"
    echo 已在浏览器中打开档案馆。
    echo 本方式支持全部功能，包括本地书库链接。
    echo.
    pause
    exit /b
)

:: 使用 Node.js 启动本地 HTTP 服务器
echo [OK] 本地服务器已启动
echo.
echo   请在浏览器中访问以下地址：
echo.
echo   ┌────────────────────────────────────────┐
echo   │                                        │
echo   │   http://localhost:8765               │
echo   │                                        │
echo   └────────────────────────────────────────┘
echo.
echo   按 Ctrl+C 停止服务器
echo.

start "" "http://localhost:8765/index.html#/"

node -e "
const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.mp4': 'video/mp4',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon'
};
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const fp = path.join(__dirname, p);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, {'Content-Type': mime[path.extname(fp).toLowerCase()] || 'application/octet-stream'});
    res.end(data);
  });
}).listen(8765, '127.0.0.1');
"
