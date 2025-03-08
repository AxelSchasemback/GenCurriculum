import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import resumeRoutes from './routes/resumeRoutes';
import templateRoutes from './routes/templateRoutes';
import { errorHandler } from './middleware/errorHandler';

// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/templates', templateRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de CV Builder funcionando correctamente' });
});

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
}); 