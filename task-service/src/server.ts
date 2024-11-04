import express from 'express';
import cors from 'cors';
import { config } from './config/config';
import { connectDB } from './config/database';
import { TaskController } from './controllers/task.controller';
import { authMiddleware } from './middleware/auth.middleware';
import logger from './utils/logger';

const app = express();

app.use(cors());
app.use(express.json());

const taskController = new TaskController();

app.use('/api/tasks', authMiddleware);
app.post('/api/tasks', taskController.createTask);
app.get('/api/tasks', taskController.getUserTasks);
app.put('/api/tasks/:taskId', taskController.updateTask);
app.delete('/api/tasks/:taskId', taskController.deleteTask);

connectDB().then(() => {
    app.listen(config.port, () => {
        logger.info(`Task service running on port ${config.port}`);
    });
});