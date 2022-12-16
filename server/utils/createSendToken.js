const createSendToken = (user, statusCode, res) => {
  const token = user.createJwt();

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_LIFETIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  // Remove password from output.
  user.password = undefined;

  res.cookie('access_token', token, cookieOptions).status(statusCode).json({
    status: 'success',
    user,
  });
};

export default createSendToken;
