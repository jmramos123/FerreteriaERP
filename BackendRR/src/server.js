const createApp = require('./app');
const env = require('./config/env');
const { connectDb } = require('./config/db');

async function bootstrap() {
  await connectDb();

  const app = createApp();
  app.listen(env.port, () => {
    console.log(`BackendRR running on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
