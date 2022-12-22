import express from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/not-found.js';
import authRouter from './routes/authRoutes.js';
import jobRouter from './routes/jobRoutes.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobRouter);
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.use('*', notFound);

app.use(errorHandler);
export default app;
