# Arquitectura de Microservicios - Sistema de Gestión de Tareas

Este proyecto implementa una arquitectura de microservicios para un sistema de gestión de tareas, construido con Node.js, Express, TypeScript y MongoDB. La arquitectura está compuesta por tres servicios principales y utiliza un API Gateway como punto de entrada.

## Arquitectura General

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│             │     │              │     │              │
│ API Gateway │ ──► │ Auth Service │ ◄─► │   MongoDB    │
│             │     │              │     │              │
└─────────────┘     └──────────────┘     └──────────────┘
       │                                         ▲
       │            ┌──────────────┐            │
       └──────────► │ Task Service │ ───────────┘
                    │              │
                    └──────────────┘
```

## Servicios

### 1. API Gateway (Puerto 3000)

El API Gateway actúa como punto de entrada único para todas las peticiones del cliente.

**Características principales:**

- Enrutamiento de peticiones a microservicios
- Autenticación mediante JWT
- Manejo de CORS
- Documentación con Swagger
- Logging centralizado

**Endpoints principales:**

- `/api/auth/*` -> Auth Service
- `/api/tasks/*` -> Task Service
- `/api-docs` -> Documentación Swagger
- `/health` -> Health Check

### 2. Auth Service (Puerto 3001)

Servicio responsable de la autenticación y gestión de usuarios.

**Características principales:**

- Registro y login de usuarios
- Generación y validación de JWT
- Validación de datos con class-validator
- Encriptación de contraseñas con bcrypt
- Modelos MongoDB con Mongoose

**Endpoints:**

- POST `/api/auth/register` - Registro de usuarios
- POST `/api/auth/login` - Login de usuarios
- GET `/api/auth/me` - Información del usuario actual

### 3. Task Service (Puerto 3002)

Servicio para la gestión de tareas de usuarios.

**Características principales:**

- CRUD completo de tareas
- Autenticación mediante JWT
- Validación de propietario de tareas
- Modelos MongoDB con Mongoose

**Endpoints:**

- GET `/api/tasks` - Obtener tareas del usuario
- POST `/api/tasks` - Crear nueva tarea
- PUT `/api/tasks/:taskId` - Actualizar tarea
- DELETE `/api/tasks/:taskId` - Eliminar tarea

## Configuración y Despliegue

### Requisitos Previos

- Docker y Docker Compose
- Node.js (para desarrollo)
- MongoDB (instalado localmente o en Docker)

### Variables de Entorno

Cada servicio requiere su propio archivo `.env`:

**API Gateway (.env)**

```env
PORT=3000
AUTH_SERVICE_URL=http://auth-service:3001
TASK_SERVICE_URL=http://task-service:3002
JWT_SECRET=your-secret-key
```

**Auth Service (.env)**

```env
PORT=3001
MONGO_URI=mongodb://mongodb:27017/auth-service
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
```

**Task Service (.env)**

```env
PORT=3002
MONGO_URI=mongodb://mongodb:27017/task-service
JWT_SECRET=your-secret-key
```

### Despliegue con Docker

El proyecto incluye un `docker-compose.yml` que configura todos los servicios necesarios.

1. Construir y levantar los servicios:

```bash
docker-compose up -d --build
```

2. Verificar el estado de los servicios:

```bash
docker-compose ps
```

3. Ver logs de los servicios:

```bash
docker-compose logs -f [service-name]
```

4. Detener los servicios:

```bash
docker-compose down
```

### Configuración de Red Docker

El sistema utiliza dos redes Docker:

- `backend-network`: Para comunicación entre servicios
- `frontend-network`: Para futura integración con frontend

### Volúmenes Docker

- `mongodb_data`: Persiste los datos de MongoDB

## Desarrollo Local

1. Instalar dependencias en cada servicio:

```bash
cd api-gateway && npm install
cd auth-service && npm install
cd task-service && npm install
```

2. Ejecutar servicios en modo desarrollo:

```bash
# En cada directorio de servicio
npm run dev
```

## Estructura de Directorios

Cada servicio sigue una estructura similar:

```
src/
├── config/         # Configuraciones
├── controllers/    # Controladores
├── interfaces/     # Interfaces TypeScript
├── middleware/     # Middleware
├── models/         # Modelos MongoDB
├── routes/         # Rutas
├── services/       # Lógica de negocio
└── utils/         # Utilidades
```

## Seguridad

- Autenticación mediante JWT
- Validación de datos con class-validator
- Encriptación de contraseñas con bcrypt
- CORS configurado
- Middleware de autenticación en rutas protegidas

## Logging

Todos los servicios utilizan Winston para logging:

- Logs de consola para desarrollo
- Archivos de log separados para errores y logs combinados
- Formato JSON con timestamps

## Contribución

1. Fork del repositorio
2. Crear rama para nueva funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## Licencia

[MIT License](LICENSE)

# tasks-manager-backend
