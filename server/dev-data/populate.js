import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import Job from '../models/Job.js';

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('DB Connection Successful');
};

const jobs = JSON.parse(readFileSync(new URL('jobs.json', import.meta.url)));

const importData = async () => {
  try {
    await connect();
    await Job.create(jobs);
    console.log('Data successfully loaded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await connect();
    await Job.deleteMany();
    console.log('Data successfully deleted!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// node ./dev-data/populate.js --delete
