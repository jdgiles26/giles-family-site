// Local preview with working /api routes (uses a folder store instead of Vercel Blob).
// FAMILY_PASSCODE=... node tools/dev-server.mjs  ->  http://localhost:3000
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(new URL('..', import.meta.url).pathname); const port = +process.env.PORT || 3000;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg', '.webp': 'image/webp' };
http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x');
  const m = u.pathname.match(/^\/api\/(tree|history|auth|photo|memories)$/);
  if (m) { const mod = await import(path.join(root, 'api', m[1] + '.js')); return mod.default(req, res); }
  let f = path.join(root, decodeURIComponent(u.pathname)); if (u.pathname.endsWith('/')) f = path.join(f, 'index.html');
  if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory() || /\/(api|\.git)\//.test(f) || f.includes('.family-passcode')) { res.statusCode = 404; return res.end('not found'); }
  res.setHeader('Content-Type', types[path.extname(f)] || 'application/octet-stream'); fs.createReadStream(f).pipe(res);
}).listen(port, () => console.log('http://localhost:' + port));
