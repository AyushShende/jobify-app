import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/not-found.js';
import authRouter from './routes/authRoutes.js';
import jobRouter from './routes/jobRoutes.js';

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobRouter);

app.use('*', notFound);

app.use(errorHandler);
export default app;
