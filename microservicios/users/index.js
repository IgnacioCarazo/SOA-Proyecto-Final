require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const { swaggerUi, swaggerDocs } = require('./docs/swagger');

const app = express();
const PORT = process.env.PORT || 3001;

// Habilita CORS
app.use(cors());

// Parseo del cuerpo de las solicitudes (JSON)
app.use(bodyParser.json());

// Ruta para acceder a la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas de usuarios
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
