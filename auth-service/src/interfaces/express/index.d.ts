import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { ITokenPayload } from '../interfaces/token.interface';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('Authentication failed: No token provided');
        }

        const decoded = jwt.verify(token, config.jwtSecret) as ITokenPayload;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
};
