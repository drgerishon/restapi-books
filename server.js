const express = require('express');
const dotenv = require('dotenv').config();

const bookRoutes = require('./src/routes/bookroutes');

//initialize app
const app = express();


//middleware
app.use(express.json());

app.use('/books', bookRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Book app is running on port ${port}`);
});
