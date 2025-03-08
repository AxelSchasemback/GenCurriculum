# Backend de CV Builder

Este es el backend para la aplicación CV Builder, desarrollado con Express.js y Supabase.

## Tecnologías utilizadas

- Node.js
- Express.js
- TypeScript
- Supabase (Autenticación y Base de datos)

## Estructura del proyecto

```
backend/
├── src/
│   ├── config/         # Configuración (Supabase, etc.)
│   ├── controllers/    # Controladores
│   ├── middleware/     # Middleware (autenticación, manejo de errores)
│   ├── models/         # Tipos y modelos de datos
│   ├── routes/         # Rutas de la API
│   └── index.ts        # Punto de entrada
├── .env                # Variables de entorno (no incluido en el repositorio)
├── .gitignore          # Archivos ignorados por Git
├── package.json        # Dependencias y scripts
└── tsconfig.json       # Configuración de TypeScript
```

## Configuración

1. Clona el repositorio
2. Instala las dependencias:
   ```
   npm install
   ```
3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```
   PORT=5000
   SUPABASE_URL=tu_url_de_supabase
   SUPABASE_KEY=tu_clave_de_supabase
   JWT_SECRET=tu_clave_secreta_jwt
   FRONTEND_URL=http://localhost:3000
   ```
4. Configura tu proyecto de Supabase con las siguientes tablas:
   - `resumes`: Para almacenar los currículums
   - `experiences`: Para almacenar las experiencias laborales
   - `education`: Para almacenar la educación
   - `skills`: Para almacenar las habilidades
   - `templates`: Para almacenar las plantillas

## Ejecución

Para desarrollo:
```
npm run dev
```

Para producción:
```
npm run build
npm start
```

## API Endpoints

### Autenticación

- `POST /api/auth/register`: Registrar un nuevo usuario
- `POST /api/auth/login`: Iniciar sesión
- `POST /api/auth/logout`: Cerrar sesión
- `POST /api/auth/reset-password`: Solicitar restablecimiento de contraseña
- `GET /api/auth/me`: Obtener información del usuario actual (requiere autenticación)

### Currículums

- `GET /api/resumes`: Obtener todos los currículums del usuario (requiere autenticación)
- `GET /api/resumes/:id`: Obtener un currículum específico (requiere autenticación)
- `POST /api/resumes`: Crear un nuevo currículum (requiere autenticación)
- `PUT /api/resumes/:id`: Actualizar un currículum existente (requiere autenticación)
- `DELETE /api/resumes/:id`: Eliminar un currículum (requiere autenticación)

### Plantillas

- `GET /api/templates`: Obtener todas las plantillas
- `GET /api/templates/:id`: Obtener una plantilla específica 