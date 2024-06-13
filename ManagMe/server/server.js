import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCCsNPVu4Zc9Eh5y4fjA-dq-YReYtRiJUA",
  authDomain: "managme-2f8a4.firebaseapp.com",
  projectId: "managme-2f8a4",
  storageBucket: "managme-2f8a4.appspot.com",
  messagingSenderId: "236012288722",
  appId: "1:236012288722:web:b1d582f5f4730d1f8d0b0b",
  measurementId: "G-NKNC0ZQHHX"
};


const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);

const app = express();
const port = 3000;

const tokenSecret = 'your-secret-key';
let refreshTokens = [];

app.use(cors());
app.use(bodyParser.json());


const getUserData = async (login, password) => {
      const querySnapshot = await getDocs(collection(db, `users/`));

      console.log(querySnapshot.docs.find(() => 1));
      return querySnapshot.docs.find(doc => {
        const d = doc.data();
        return d.login == login && d.password == password
      })?.data();
}

app.post('/auth/google', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (payload) {
      let user = users.find(u => u.email === payload.email);
      if (!user) {
        user = {
          id: payload.sub,
          firstName: payload.given_name || '',
          lastName: payload.family_name || '',
          role: 'developer', // Default role
          email: payload.email || '',
        };
        users.push(user);
      }
      const jwtToken = generateToken(user, 60 * 60);
      const refreshToken = generateToken(user, 24 * 60 * 60);
      res.status(200).send({ token: jwtToken, refreshToken });
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.post('/login', async (req, res) => {
  const { login, password } = req.body;
  const user = await getUserData(login, password);

  if (user) {
    const token = generateToken(user, 60 * 60);
    const refreshToken = generateToken(user, 24 * 60 * 60);
    refreshTokens.push(refreshToken);
    res.status(200).send({isOk: true, token, refreshToken });
  } else {
    res.status(200).send({isOk: false});
  }
});

app.post('/refreshToken', (req, res) => {
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
});

app.get('/protected', verifyToken, (req, res) => {
  res.status(200).send(req.user);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

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