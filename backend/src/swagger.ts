import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FitMiles API',
      version: '1.0.0',
      description: 'API documentation for FitMiles project',
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: express.Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // 新增路由返回 Swagger JSON
  app.get('/openapi.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
