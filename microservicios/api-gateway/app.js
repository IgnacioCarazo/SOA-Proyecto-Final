const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.js'); 
const petRoutes = require('./routes/petRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/pets', petRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`ESB listening at http://localhost:${port}`);
});
