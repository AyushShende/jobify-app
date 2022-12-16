import { StatusCodes } from 'http-status-codes';

import User from '../models/User.js';
import AppError from '../utils/appError.js';
import createSendToken from '../utils/createSendToken.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError('Please provide all values', StatusCodes.BAD_REQUEST);
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new AppError('Email already in use', StatusCodes.BAD_REQUEST);
  }

  const newUser = await User.create({ name, email, password });

  createSendToken(newUser, StatusCodes.CREATED, res);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Please provide all values', StatusCodes.BAD_REQUEST);
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Incorrect Email or Password', StatusCodes.UNAUTHORIZED);
  }

  createSendToken(user, StatusCodes.OK, res);
};

export const updateUser = async (req, res) => {
  const { name, lastName, email, location } = req.body;

  if (!name || !lastName || !email || !location) {
    throw new AppError('Please provide all values', StatusCodes.BAD_REQUEST);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.userId,
    { name, lastName, email, location },
    { new: true, runValidators: true }
  );

  createSendToken(updatedUser, StatusCodes.OK, res);
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.status(StatusCodes.OK).json({
    status: 'success',
    user,
  });
};

export const logout = async (req, res) => {
  res.cookie('access_token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};
