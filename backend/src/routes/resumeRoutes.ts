import express from 'express';
import { 
  getUserResumes, 
  getResumeById, 
  createResume, 
  updateResume, 
  deleteResume 
} from '../controllers/resumeController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Todas las rutas de currículums requieren autenticación
router.use(authMiddleware as express.RequestHandler);

// Rutas para currículums
router.get('/', getUserResumes as express.RequestHandler);
router.get('/:id', getResumeById as express.RequestHandler);
router.post('/', createResume as express.RequestHandler);
router.put('/:id', updateResume as express.RequestHandler);
router.delete('/:id', deleteResume as express.RequestHandler);

export default router; 