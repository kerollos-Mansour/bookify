const express = require('express');
require('dotenv').config();
const { connectToMongoDB } = require('./config/database.config');

const PORT = process.env.PORT || 3000;

// middleware
const app = express();

// routes 


connectToMongoDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});