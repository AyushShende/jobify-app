import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minLength: 6,
    select: false,
  },
  lastName: {
    type: String,
    maxLength: 20,
    trim: true,
    default: 'lastName',
  },
  location: {
    type: String,
    trim: true,
    maxLength: 20,
    default: 'myCity',
  },
});

// Hashing the entered password
userSchema.pre('save', async function (next) {
  //check if password was modified
  if (!this.isModified('password')) return next();
  //hash with bcrypt and salting
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.createJwt = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
