const express = require("express");
const dotenv = require('dotenv').config();
const app = express()

const port = process.env.PORT || 4000;

app.listen(port, () => { console.log(`book app is running on port ${port}`)});