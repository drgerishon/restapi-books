const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')

// Authentication middleware
exports.protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});
