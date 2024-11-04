export interface IUser {
    _id?: string;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserResponse {
    _id: string;
    username: string;
    email: string;
}