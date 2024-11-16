const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Definición de la configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Versión de OpenAPI
    info: {
      title: 'User Service API', // Título de la API
      version: '1.0.0',
      description: 'Microservicio para la gestión de usuarios',
    },
    servers: [
      {
        url: 'http://localhost:3001', // URL del servidor de desarrollo
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Especificamos que esperamos un token JWT
        },
      },
    },
    security: [
      {
        BearerAuth: [], // Aplicamos la autenticación JWT a todos los endpoints
      },
    ],
  },
  apis: ['./routes/userRoutes.js'], // Rutas donde se encuentran los comentarios de Swagger
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
