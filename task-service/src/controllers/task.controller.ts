import { Response } from 'express';
import { TaskService } from '../services/task.service';
import { AuthRequest } from '../middleware/auth.middleware';
import logger from '../utils/logger';

export class TaskController {
    private readonly taskService: TaskService;

    constructor() {
        this.taskService = new TaskService();
    }

    public createTask = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const taskData = {
                ...req.body,
                userId: req.userId,
            };
            const task = await this.taskService.createTask(taskData);
            res.status(201).json(task);
        } catch (error) {
            logger.error('Error in create task controller:', error);
            res.status(400).json({ error: error.message });
        }
    };

    public getUserTasks = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const tasks = await this.taskService.getUserTasks(req.userId!);
            res.json(tasks);
        } catch (error) {
            logger.error('Error in get user tasks controller:', error);
            res.status(400).json({ error: error.message });
        }
    };

    public updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            const { taskId } = req.params;
            const task = await this.taskService.updateTask(taskId, req.userId!, req.body);
            if (!task) {
                res.status(404).json({ error: 'Task not found' });
                return;
            }
            res.json(task);
        } catch (error) {
            logger.error('Error in update task controller:', error);
            res.status(400).json({ error: error.message });
        }
    };

    public deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            logger.error("paramst", req.params);
            const { taskId } = req.params;
            logger.log("console", taskId);

            const deleted = await this.taskService.deleteTask(taskId, req.userId!);
            if (!deleted) {
                res.status(404).json({ error: 'Task not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            logger.error('Error in delete task controller:', error);
            res.status(400).json({ error: error.message });
        }
    };
}

