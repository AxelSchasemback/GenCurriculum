import express from 'express';
import { getAllTemplates, getTemplateById } from '../controllers/templateController';

const router = express.Router();

// Rutas para plantillas (públicas)
router.get('/', getAllTemplates as express.RequestHandler);
router.get('/:id', getTemplateById as express.RequestHandler);

export default router; 