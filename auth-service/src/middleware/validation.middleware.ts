import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { LoginDto, RegisterDto } from '../dtos/auth.dto';

export class ValidationMiddleware {
    // Middleware para validar el registro de usuarios
    static validateRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userInput = plainToClass(RegisterDto, req.body);
            const errors = await validate(userInput);

            if (errors.length > 0) {
                const validationErrors = errors.map(error => ({
                    property: error.property,
                    constraints: error.constraints
                }));
                res.status(400).json({
                    error: 'Validation failed',
                    details: validationErrors
                });
                return;
            }

            next();
        } catch (error) {
            res.status(500).json({ error: 'Validation error occurred' });
        }
    };

    // Middleware para validar el login de usuarios
    static validateLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const loginInput = plainToClass(LoginDto, req.body);
            const errors = await validate(loginInput);

            if (errors.length > 0) {
                const validationErrors = errors.map(error => ({
                    property: error.property,
                    constraints: error.constraints
                }));
                res.status(400).json({
                    error: 'Validation failed',
                    details: validationErrors
                });
                return;
            }

            next();
        } catch (error) {
            res.status(500).json({ error: 'Validation error occurred' });
        }
    };

    // Middleware para validar email
    static validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Middleware para validar contraseña
    static validatePassword = (password: string): boolean => {
        // Mínimo 8 caracteres, al menos una letra mayúscula, una minúscula y un número
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    // Middleware para validar username
    static validateUsername = (username: string): boolean => {
        // Permite letras, números y guiones bajos, longitud entre 3 y 20 caracteres
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        return usernameRegex.test(username);
    };
}

