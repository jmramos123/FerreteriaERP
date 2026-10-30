const express = require('express');
const authRoutes = require('./modules/auth/auth.routes');

function createApp() {
  const app = express();

  app.use(express.json());
  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });
  app.use('/auth', authRoutes);

  return app;
}

module.exports = createApp;
