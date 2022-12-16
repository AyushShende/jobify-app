import express from 'express';
const router = express.Router();

import {
  getCurrentUser,
  login,
  logout,
  register,
  updateUser,
} from '../controllers/authController.js';
import authenticateUser from '../middlewares/authenticateUser.js';
import limiter from '../middlewares/limiter.js';
import testUser from '../middlewares/testUser.js';

router.route('/register').post(limiter, register);
router.route('/login').post(limiter, login);
router.route('/updateUser').patch(authenticateUser, testUser, updateUser);
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);
router.route('/logout').get(logout);

export default router;
