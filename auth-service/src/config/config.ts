import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3001,
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/auth-service',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
};