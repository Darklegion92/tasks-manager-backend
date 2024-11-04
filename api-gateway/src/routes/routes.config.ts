import { Route } from '../interfaces/route.interface';

export const routes: Route[] = [
    // Auth Routes
    {
        method: 'POST',
        path: '/api/auth/register',
        target: '/api/auth/register',
        auth: false
    },
    {
        method: 'POST',
        path: '/api/auth/login',
        target: '/api/auth/login',
        auth: false
    },
    // Task Routes
    {
        method: 'GET',
        path: '/api/tasks',
        target: '/api/tasks',
        auth: true
    },
    {
        method: 'POST',
        path: '/api/tasks',
        target: '/api/tasks',
        auth: true
    },
    {
        method: 'PUT',
        path: '/api/tasks/:taskId',
        target: '/api/tasks/:taskId',
        auth: true
    },
    {
        method: 'DELETE',
        path: '/api/tasks/:taskId',
        target: '/api/tasks/:taskId',
        auth: true
    }
];

