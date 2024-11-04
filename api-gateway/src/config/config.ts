import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT ?? 3000,
    services: {
        auth: process.env.AUTH_SERVICE_URL ?? 'http://localhost:3001',
        task: process.env.TASK_SERVICE_URL ?? 'http://localhost:3002'
    },
    jwtSecret: process.env.JWT_SECRET ?? 'your-secret-key'
};