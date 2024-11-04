import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import logger from '../utils/logger';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public register = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await this.authService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            logger.error('Error in register controller:', error);
            res.status(400).json({ error: error.message });
        }
    };

    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            res.json(result);
        } catch (error) {
            logger.error('Error in login controller:', error);
            res.status(401).json({ error: error.message });
        }
    };
}