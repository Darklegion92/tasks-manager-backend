export interface ITask {
    _id?: string;
    title: string;
    status: TaskStatus;
    description: string;
    dueDate: Date;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}