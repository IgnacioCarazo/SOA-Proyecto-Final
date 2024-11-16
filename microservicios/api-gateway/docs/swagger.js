const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gateway for Pets and Users Services',
      version: '1.0.0',
      description: 'API Gateway that aggregates Pets and Users services.'
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'JWT Authorization header using the Bearer scheme.'
      }
    }
  },
  apis: ['./routes/*.js'], // Ensure the path is correct
};

const swaggerDocument = swaggerJsdoc(options);

module.exports = swaggerDocument;
