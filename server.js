const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser')

const dbConnect = require('./src/utils/mongoDB');

const bookRoutes = require('././src/routes/bookroutes');
const userRoute = require('././src/routes/userRoute');
const errorMiddleware = require('./src/middleware/errorHandler');

const app = express();

const port = process.env.PORT || 4000;


// Connect to MongoDB and start the server
dbConnect()
  .then(() => {
    // Middlewares
    app.use(express.json());
    app.use(express.urlencoded({extended: false}))
    app.use(bodyParser.json())

    // Routes
    app.use('/books', bookRoutes);
    app.use('/api', userRoute)

    //Error middleware
    app.use(errorMiddleware);

    // Start the server
    app.listen(port, () => {
      console.log(`Book app is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });
