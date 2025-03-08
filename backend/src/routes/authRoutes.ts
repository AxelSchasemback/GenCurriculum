import express, { Request, Response } from 'express';
import { register, login, logout, getCurrentUser, resetPassword } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Rutas públicas
router.post('/register', register as express.RequestHandler);
router.post('/login', login as express.RequestHandler);
router.post('/logout', logout as express.RequestHandler);
router.post('/reset-password', resetPassword as express.RequestHandler);

// Rutas protegidas
router.get('/me', authMiddleware as express.RequestHandler, getCurrentUser as express.RequestHandler);

export default router; 