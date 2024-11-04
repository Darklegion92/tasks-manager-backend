import mongoose from 'mongoose';
import { config } from './config';
import logger from '../utils/logger';

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(config.mongoUri);
        logger.info('MongoDB Connected');
    } catch (error) {
        logger.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};