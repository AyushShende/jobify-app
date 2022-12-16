import AppError from '../utils/appError.js';

const testUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new AppError('Test user. Read Only');
  }

  next();
};

export default testUser;
