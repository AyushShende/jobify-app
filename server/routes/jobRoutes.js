import express from 'express';
const router = express.Router();

import {
  createJob,
  deleteJob,
  getAllJobs,
  showStats,
  updateJob,
} from '../controllers/jobsController.js';
import authenticateUser from '../middlewares/authenticateUser.js';
import testUser from '../middlewares/testUser.js';

router.use(authenticateUser);

router.route('/').get(getAllJobs).post(testUser, createJob);
router.route('/stats').get(showStats);
router.route('/:id').patch(testUser, updateJob).delete(testUser, deleteJob);

export default router;
