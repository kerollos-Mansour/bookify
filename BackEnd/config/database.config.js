const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

async function connectToMongoDB() {
    try {
        await mongoose.connect(uri, {
            dbName: 'Bookify', // Specifies the database name (equivalent to client.db('Bookify'))
        });

        console.log('Connected to MongoDB with Mongoose');

        // Optional: Access the database connection if needed
        // const db = mongoose.connection; // or mongoose.connection.db
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = {
    connectToMongoDB,
};