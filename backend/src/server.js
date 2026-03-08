const app = require('./app');
const env = require('./config/env');
const { sequelize } = require('./models');

async function start() {
  await sequelize.sync();
  app.listen(env.PORT, () => {
    console.log(`API running on http://localhost:${env.PORT}`);
  });
}

start().catch((error) => {
  console.error('Server startup error:', error);
  process.exit(1);
});
