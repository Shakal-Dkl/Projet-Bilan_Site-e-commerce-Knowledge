const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const env = require('./config/env');
const routes = require('./routes');

const app = express();

// EN: Global security and parsing middlewares.
// FR: Middlewares globaux de sécurité et de parsing.
app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// EN: CSRF protection is enabled outside test mode.
// FR: La protection CSRF est activée hors mode test.
if (env.ENABLE_CSRF) {
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        sameSite: env.CSRF_COOKIE_SAMESITE,
        secure: env.CSRF_COOKIE_SECURE
      }
    })
  );
}

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// EN: Frontend requests this token before POST/PUT/DELETE.
// FR: Le frontend demande ce token avant les requêtes d'écriture.
app.get('/api/csrf-token', (req, res) => {
  if (!env.ENABLE_CSRF) {
    return res.status(200).json({ csrfToken: null });
  }
  return res.status(200).json({ csrfToken: req.csrfToken() });
});

app.use('/api', routes);

// EN: Centralized CSRF error handler.
// FR: Gestion centralisée des erreurs CSRF.
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }
  return next(err);
});

module.exports = app;
