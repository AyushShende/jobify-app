import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  max: 10,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again after 15 minutes!',
});

export default limiter;
