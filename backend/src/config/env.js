const path = require('path');
require('dotenv').config();

const isTest = process.env.NODE_ENV === 'test';
const configuredDbPath = process.env.DB_PATH;

function resolveDbPath() {
  if (isTest) {
    return ':memory:';
  }

  if (!configuredDbPath) {
    return path.join(__dirname, '../../data/knowledge.sqlite');
  }

  if (configuredDbPath === ':memory:') {
    return configuredDbPath;
  }

  if (path.isAbsolute(configuredDbPath)) {
    return configuredDbPath;
  }

  return path.resolve(__dirname, '../../', configuredDbPath);
}

module.exports = {
  PORT: Number(process.env.PORT || 3000),
  JWT_SECRET: process.env.JWT_SECRET || 'knowledge-learning-secret',
  DB_PATH: resolveDbPath(),
  ENABLE_CSRF: process.env.ENABLE_CSRF ? process.env.ENABLE_CSRF === 'true' : !isTest,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:4200',
  APP_BASE_URL: process.env.APP_BASE_URL || 'http://localhost:3000'
};
