import express, { Response } from 'express';
import cors from 'cors';
import { config } from './config/config';
import { connectDB } from './config/database';
import { AuthController } from './controllers/auth.controller';
import { authMiddleware, AuthRequest } from './middleware/auth.middleware';
import logger from './utils/logger';
import { ValidationMiddleware } from './middleware/validation.middleware';

const app = express();

app.use(cors());
app.use(express.json());

const authController = new AuthController();

app.post('/api/auth/register', ValidationMiddleware.validateRegister, authController.register);
app.post('/api/auth/login', ValidationMiddleware.validateLogin, authController.login);

app.get('/api/auth/me', authMiddleware, (req: AuthRequest, res: Response) => {
    res.json({ userId: req.userId });
});

connectDB().then(() => {
    app.listen(config.port, () => {
        logger.info(`Auth service running on port ${config.port}`);
    });
});