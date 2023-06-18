const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthorizedError } = require('../errors/errors');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.username }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please enter your email and password');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { username: user.username }, token });
};

module.exports = {
  register,
  login,
};
