const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;
const dbConnect = require('./utils/mongoDB');

const bookRoutes = require('././src/routes/bookroutes');
const userRoute = require('././src/routes/userRoute')


// Connect to MongoDB and start the server
dbConnect()
  .then(() => {
    // Middleware
    app.use(express.json());

    // Routes
    app.use('/books', bookRoutes);
    app.use('/users', userRoute)

    // Start the server
    app.listen(port, () => {
      console.log(`Book app is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });
