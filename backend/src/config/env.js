require('dotenv').config();

const isTest = process.env.NODE_ENV === 'test';

module.exports = {
  PORT: Number(process.env.PORT || 3000),
  JWT_SECRET: process.env.JWT_SECRET || 'knowledge-learning-secret',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/knowledge_learning',
  ENABLE_CSRF: process.env.ENABLE_CSRF ? process.env.ENABLE_CSRF === 'true' : !isTest,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:4200',
  APP_BASE_URL: process.env.APP_BASE_URL || 'http://localhost:3000'
};
