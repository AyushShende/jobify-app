import dotenv from 'dotenv';
dotenv.config();

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting Down...');
  console.log(err.name, err.message);
  process.exit(1);
});

import app from './app.js';
import mongoose from 'mongoose';

const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('DB Connection Successful');
};

const server = app.listen(process.env.PORT || 5500, () => {
  connectDb();
  console.log(`Server started on ${process.env.PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting Down...');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
