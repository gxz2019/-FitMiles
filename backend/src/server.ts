import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api', userRoutes);

setupSwagger(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
