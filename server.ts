import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Cloud Run health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

const distPath = path.resolve(__dirname, 'dist');
const indexHtmlPath = path.resolve(distPath, 'index.html');

async function startServer() {
  if (fs.existsSync(indexHtmlPath)) {
    // Production mode: serve built static assets from dist
    app.use(express.static(distPath));

    app.get('*', (_req, res) => {
      res.sendFile(indexHtmlPath);
    });
  } else {
    // Development fallback: mount Vite middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SuluhBrunei server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
