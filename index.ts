import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import itemRoutes from './itemRouter';
import swaggerDocument from './swagger.json';


const app = express();

// Connect to MongoDB

mongoose.connect(`mongodb://localhost:27017/myapp`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected');
});

// Middleware
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use(itemRoutes);

// Start the server
const port = process.env.PORT;
export default app;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});