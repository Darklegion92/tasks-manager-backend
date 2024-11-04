import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { IUser } from '../interfaces/user.interface';
import { ITokenData, ITokenPayload, IDecodedToken } from '../interfaces/token.interface';
import logger from './logger';

export class JWTUtil {
    private static readonly secretKey: string = config.jwtSecret;
    private static readonly expiresIn: string = config.jwtExpiresIn;

    /**
     * Genera un token JWT para un usuario
     * @param user - Usuario para el que se genera el token
     * @returns Token data que incluye el token y su tiempo de expiración
     */
    public static generateToken(user: IUser): ITokenData {
        try {
            const payload: ITokenPayload = {
                userId: user._id!,
                email: user.email
            };

            const token = jwt.sign(payload, this.secretKey, {
                expiresIn: this.expiresIn
            });

            return {
                token,
                expiresIn: parseInt(this.expiresIn) || 86400 // 24 horas por defecto
            };
        } catch (error) {
            logger.error('Error generating JWT token:', error);
            throw new Error('Error generating authentication token');
        }
    }

    /**
     * Verifica y decodifica un token JWT
     * @param token - Token JWT a verificar
     * @returns Token decodificado si es válido
     * @throws Error si el token es inválido
     */
    public static verifyToken(token: string): IDecodedToken {
        try {
            const decoded = jwt.verify(token, this.secretKey) as IDecodedToken;
            return decoded;
        } catch (error) {
            logger.error('Error verifying JWT token:', error);
            throw new Error('Invalid authentication token');
        }
    }

    /**
     * Extrae el token del header de autorización
     * @param authHeader - Header de autorización
     * @returns Token extraído o null si no es válido
     */
    public static extractTokenFromHeader(authHeader?: string): string | null {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }
        return authHeader.split(' ')[1];
    }

    /**
     * Refresca un token JWT existente
     * @param oldToken - Token antiguo a refrescar
     * @returns Nuevo token data
     * @throws Error si el token antiguo es inválido
     */
    public static refreshToken(oldToken: string): ITokenData {
        try {
            const decoded = this.verifyToken(oldToken);
            const payload: ITokenPayload = {
                userId: decoded.userId,
                email: decoded.email
            };

            const token = jwt.sign(payload, this.secretKey, {
                expiresIn: this.expiresIn
            });

            return {
                token,
                expiresIn: parseInt(this.expiresIn) || 86400
            };
        } catch (error) {
            logger.error('Error refreshing JWT token:', error);
            throw new Error('Error refreshing authentication token');
        }
    }

    /**
     * Verifica si un token está expirado
     * @param token - Token a verificar
     * @returns true si el token está expirado, false si no
     */
    public static isTokenExpired(token: string): boolean {
        try {
            const decoded = this.verifyToken(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp < currentTime;
        } catch (error) {
            return true;
        }
    }

    /**
     * Obtiene el tiempo restante de validez de un token en segundos
     * @param token - Token a verificar
     * @returns Tiempo restante en segundos, 0 si está expirado
     */
    public static getTokenRemainingTime(token: string): number {
        try {
            const decoded = this.verifyToken(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return Math.max(0, decoded.exp - currentTime);
        } catch (error) {
            return 0;
        }
    }

    /**
     * Genera un token temporal para recuperación de contraseña
     * @param email - Email del usuario
     * @returns Token temporal
     */
    public static generatePasswordResetToken(email: string): string {
        return jwt.sign(
            { email },
            this.secretKey,
            { expiresIn: '1h' } // Token válido por 1 hora
        );
    }
}
