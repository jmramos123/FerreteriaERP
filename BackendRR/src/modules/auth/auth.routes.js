const { Router } = require('express');

const authRouter = Router();

authRouter.get('/health', (_req, res) => {
  res.json({ ok: true, module: 'auth' });
});

module.exports = authRouter;
