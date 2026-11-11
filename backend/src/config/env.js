require('dotenv').config();

const isTest = process.env.NODE_ENV === 'test';
const isProduction = process.env.NODE_ENV === 'production';
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret && !isTest) {
  throw new Error('JWT_SECRET is required outside test environment');
}

module.exports = {
  PORT: Number(process.env.PORT || 3000),
  JWT_SECRET: jwtSecret || 'test-secret',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/knowledge_learning',
  ENABLE_CSRF: process.env.ENABLE_CSRF ? process.env.ENABLE_CSRF === 'true' : !isTest,
  CSRF_COOKIE_SAMESITE: process.env.CSRF_COOKIE_SAMESITE || (isProduction ? 'none' : 'lax'),
  CSRF_COOKIE_SECURE: process.env.CSRF_COOKIE_SECURE ? process.env.CSRF_COOKIE_SECURE === 'true' : isProduction,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:4200',
  APP_BASE_URL: process.env.APP_BASE_URL || 'http://localhost:3000'
};
