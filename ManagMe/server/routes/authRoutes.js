import express from 'express';
import { jwtLogin, refreshToken } from '../controllers/authController.js';

const authRoutes = express.Router();

// Trasa logowania
authRoutes.post('/login', jwtLogin);

// Trasa wylogowania
authRoutes.post('/refreshToken', refreshToken);


export default authRoutes;
