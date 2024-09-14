import session from 'express-session';

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'Sda5FFsc3dC',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
});

export default sessionMiddleware;