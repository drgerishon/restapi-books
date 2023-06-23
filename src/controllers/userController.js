const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// User registration
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //validation

    if (!username || !email || !password) {
      res.status(400);
      throw new Error('All  fields are required');
    }
    //password length

    if (password.length < 5) {
      res.status(400);
      throw new Error('Password must be more than 5 characters');
    }

    //if user exists
    const userExists = await User.findById({ email });
    if (userExists) {
      res.status(400);
      throw new Error('user already exists');
    }
    //register and save user
    //hash the password
    const hashedPass = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPass });
    await user.save();

    res.status(201).json({ message: 'user registered' });
  } catch (error) {
    res.status(500).json({ error: 'Intern server error' });
  }
});

// User login
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    //check if user exists in database
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = {
  registerUser,
  loginUser,
};
