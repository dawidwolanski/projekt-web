import express from 'express';
import cors from "cors";
import authRoutes from './routes/authRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import notificationsRouter from './routes/notificationRoutes.js';
import dotenv from 'dotenv';
import tasksRouter from './routes/tasksRoutes.js';
import { verifyToken } from './controllers/authController.js'

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Ustaw trasy API
app.use('/notifications', notificationsRouter);
app.use('/projects', projectRouter);
app.use('/tasks', tasksRouter);
app.use('/auth', authRoutes);


app.get('/protected', verifyToken, (req, res) => {
  res.status(200).send(req.user);
});

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
          role: 'developer',
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


// Start serwera
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});