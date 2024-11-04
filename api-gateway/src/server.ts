import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { config } from './config/config';
import { routes } from './routes/routes.config';
import { authMiddleware } from './middleware/auth.middleware';
import { createProxyMiddleware } from './middleware/proxy.middleware';
import logger from './utils/logger';

const app = express();

app.use(cors());
app.use(express.json());

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes.forEach(route => {
  const handlers = [];

  if (route.auth) {
    handlers.push(authMiddleware);
  }

  handlers.push(createProxyMiddleware(route));

  app.use(route.path, ...handlers);
});

app.get('/health', (_, res) => {
  res.json({ status: 'OK' });
});

app.listen(config.port, () => {
  logger.info(`API Gateway running on port ${config.port}`);
});