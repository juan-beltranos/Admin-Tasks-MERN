import express from 'express';
import dotenv from 'dotenv';
import conexionDB from './config/db.js';

import userRouter from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

// Call express
const app = express();
app.use(express.json())

// Config variables de entorno
dotenv.config();

// Connection to BD
conexionDB();

// Routing
app.use('/api/users', userRouter);
app.use('/api/projects', projectRoutes);

// Run server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Server Runinig :', PORT));
