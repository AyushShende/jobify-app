import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { promisify } from 'util';

import AppError from '../utils/appError.js';
import User from '../models/User.js';

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    throw new AppError(
      'You are not logged in, please log in to get access',
      StatusCodes.UNAUTHORIZED
    );
  }

  const payload = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(payload.userId);
  if (!currentUser) {
    throw new AppError(
      'The user to whom this token belonged, no longer exists',
      StatusCodes.UNAUTHORIZED
    );
  }
  const testUser = payload.userId === '639c39d02a1174fe4de1cbec';

  req.user = { userId: payload.userId, testUser };
  next();
};

export default authenticateUser;
