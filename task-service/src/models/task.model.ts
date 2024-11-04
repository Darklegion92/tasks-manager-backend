import mongoose, { Schema, Document } from 'mongoose';
import { ITask, TaskStatus } from '../interfaces/task.interface';

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: TaskStatus.TODO
    },
    dueDate: {
        type: Date,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export default mongoose.model<ITask & Document>('Task', taskSchema);