import query from './../db.js'
import jwt from 'jsonwebtoken';

const tokenSecret = 'c0xmm320t';
let refreshTokens = [];

function generateToken(user, expirationInSeconds) {
  const exp = Math.floor(Date.now() / 1000) + expirationInSeconds;
  const token = jwt.sign(
    {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      exp
    },
    tokenSecret,
    { algorithm: 'HS256' }
  );
  return token;
}

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(403);

  jwt.verify(token, tokenSecret, (err, user) => {
    if (err) return res.status(401).send('Unauthorized');
    req.user = user;
    next();
  });
}


// there

const jwtLogin = async (req, res) => {
  const { login, password } = req.body;
  const response = await query('SELECT * FROM users WHERE login = ? AND password = ?', [login, password]);
  const user = response[0];

  if (user) {
    const token = generateToken(user, 60 * 60);
    const refreshToken = generateToken(user, 24 * 60 * 60);
    refreshTokens.push(refreshToken);
    res.status(200).send({isOk: true, token, refreshToken });
  } else {
    res.status(200).send({isOk: false});
  }
}

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).send('Forbidden');
  }

  jwt.verify(refreshToken, tokenSecret, (err, user) => {
    if (err) {
      return res.status(403).send('Forbidden');
    }
    const newToken = generateToken(user, 60 * 60);
    res.status(200).send({ token: newToken });
  });
}



export { jwtLogin, refreshToken, verifyToken };
