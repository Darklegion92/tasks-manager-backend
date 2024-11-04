import { ITask } from '../interfaces/task.interface';
import Task from '../models/task.model';
import logger from '../utils/logger';

export class TaskService {
    public async createTask(taskData: ITask): Promise<ITask> {
        try {
            const task = await Task.create(taskData);
            return task;
        } catch (error) {
            logger.error('Error in create task service:', error);
            throw error;
        }
    }

    public async getUserTasks(userId: string): Promise<ITask[]> {
        try {
            return await Task.find({ userId });
        } catch (error) {
            logger.error('Error in get user tasks service:', error);
            throw error;
        }
    }

    public async updateTask(taskId: string, userId: string, updateData: Partial<ITask>): Promise<ITask | null> {
        try {
            const task = await Task.findOneAndUpdate(
                { _id: taskId, userId },
                updateData,
                { new: true }
            );
            return task;
        } catch (error) {
            logger.error('Error in update task service:', error);
            throw error;
        }
    }

    public async deleteTask(taskId: string, userId: string): Promise<boolean> {
        try {
            const result = await Task.deleteOne({ _id: taskId, userId });
            return result.deletedCount > 0;
        } catch (error) {
            logger.error('Error in delete task service:', error);
            throw error;
        }
    }
}