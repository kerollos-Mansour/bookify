const express = require('express');
require('dotenv').config();
const { connectToMongoDB } = require('./config/database.config');

const AppError = require('./utils/appError.utils');
const globalErrorHandler = require('./middlewares/ErrorHandeler.middleware');


const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json())

// Routes
const destinationRoutes = require('./routes/destinations.route');
app.use('/destinations', destinationRoutes);

// 404 handler
app.use((req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server`))
})

app.use(globalErrorHandler)


// DB Connection & Server Start
connectToMongoDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});