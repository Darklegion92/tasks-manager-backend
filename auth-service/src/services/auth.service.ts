import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import User from '../models/user.model';
import { IUser, IUserResponse } from '../interfaces/user.interface';
import logger from '../utils/logger';

export class AuthService {
    public async register(userData: IUser): Promise<IUserResponse> {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = await User.create({
                ...userData,
                password: hashedPassword,
            });

            return this.sanitizeUser(user);
        } catch (error) {
            logger.error('Error in register service:', error);
            throw error;
        }
    }

    public async login(email: string, password: string): Promise<{ token: string; user: IUserResponse }> {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new Error('Invalid password');
            }

            const token = this.generateToken(user._id);
            return {
                token,
                user: this.sanitizeUser(user),
            };
        } catch (error) {
            logger.error('Error in login service:', error);
            throw error;
        }
    }

    private generateToken(userId: string): string {
        return jwt.sign({ userId }, config.jwtSecret, {
            expiresIn: config.jwtExpiresIn,
        });
    }

    private sanitizeUser(user: IUser): IUserResponse {
        return {
            _id: user._id!,
            username: user.username,
            email: user.email,
        };
    }
}