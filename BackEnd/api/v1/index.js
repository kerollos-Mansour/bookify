const express = require('express');
const router = express.Router();

// Routes
const destinationRoutes = require('./routes/destinations.route');

// Mount route modules
router.use('/destinations', destinationRoutes);

module.exports = router;
