const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// User registration endpoint
const registerUser = asyncHandler(async (req, res) => {
  
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
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('user already exists');
    }
    //register and save user
    //hash the password
    const hashedPass = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPass });
  
    //generate token
    const token = generateToken(user._id);

     //send HTTP-ONLY cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: 'none',
    secure: true,
  });

  if(user) {
    const {username, email, password} = user;
    res.status(201).json({ username, email, password, token});

    user.save();

   } else {
    res.status(500)
    throw new Error('Internal server error');
  }
});

// User login endpoint
const loginUser = asyncHandler(async (req, res) => {
     const { email, password } = req.body;
    const user = await User.findOne({ email });

    //check if user exists in database
    if (!user) {
      res.status(401)
      throw new Error('User does not exist' );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401)
      throw new Error( 'Invalid credentials');
    }
      //generate token

  const token = generateToken(user._id);

  //send HTTP-ONLY cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: 'none',
    secure: true,
  });
  if(user && isPasswordValid) {
    const {_id, name, email } = user;
     res.status(200).json({_id,name, email, token})
  
  } else {
    res.status(400)
    throw new Error('Invalid email or password');
  }
});

module.exports = {
  registerUser,
  loginUser,
};
