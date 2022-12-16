import { StatusCodes } from 'http-status-codes';

import AppError from './appError.js';

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new AppError(
    'Not authorized to access this route',
    StatusCodes.UNAUTHORIZED
  );
};

export default checkPermissions;
