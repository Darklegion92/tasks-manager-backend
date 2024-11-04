import { Request, Response } from 'express';
import axios from 'axios';
import { Route } from '../interfaces/route.interface';
import { config } from '../config/config';
import logger from '../utils/logger';

export const createProxyMiddleware = (route: Route) => {
    return async (req: Request, res: Response) => {
        const serviceUrl = route.path.startsWith('/api/auth')
            ? config.services.auth
            : config.services.task;

        const targetUrl = `${serviceUrl}${route.target}${req.url}`;
        logger.info(req.url)
        try {
            const response = await axios({
                method: req.method,
                url: targetUrl,
                data: req.body,
                headers: {
                    ...(req.headers.authorization && {
                        Authorization: req.headers.authorization
                    })
                },
                params: req.query
            });

            res.status(response.status).json(response.data);
        } catch (error) {
            logger.error('Proxy error:', error);
            if (axios.isAxiosError(error)) {
                res.status(error.response?.status ?? 500).json(error.response?.data ?? { error: 'Internal Server Error' });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    };
};

