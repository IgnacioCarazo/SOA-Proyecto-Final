const express = require('express');
const petRoutes = require('./routes/petRoutes');
const swaggerDocs = require('./docs/swagger');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3002;


app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));  // Swagger UI
app.use('/pets', petRoutes);  // Pet routes

app.listen(port, () => {
  console.log(`Pets service running on port ${port}`);
});
