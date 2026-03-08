const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const env = require('./config/env');
const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

if (env.ENABLE_CSRF) {
  app.use(csurf({ cookie: { httpOnly: true, sameSite: 'lax' } }));
}

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/csrf-token', (req, res) => {
  if (!env.ENABLE_CSRF) {
    return res.status(200).json({ csrfToken: null });
  }
  return res.status(200).json({ csrfToken: req.csrfToken() });
});

app.use('/api', routes);

app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }
  return next(err);
});

module.exports = app;
