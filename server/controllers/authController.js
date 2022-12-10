import User from '../models/User.js';
import AppError from '../utils/appError.js';
import { StatusCodes } from 'http-status-codes';

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError('Please provide all values', StatusCodes.BAD_REQUEST);
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new AppError('Email already in use', StatusCodes.BAD_REQUEST);
  }

  const newUser = await User.create({ name, email, password });
  const token = newUser.createJwt();
  newUser.password = undefined;
  res.status(StatusCodes.CREATED).json({
    status: 'sucess',
    data: {
      user: newUser,
      token,
      location: newUser.location,
    },
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Please provide all values', StatusCodes.BAD_REQUEST);
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Incorrect Email or Password', StatusCodes.UNAUTHORIZED);
  }

  const token = user.createJwt();
  user.password = undefined;

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: { user, token, location: user.location },
  });
};

export const updateUser = async (req, res, next) => {
  res.send('working');
};
