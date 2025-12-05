const express = require('express');
const router = express.Router();
const { createDestination } = require('../controller/destunations.controller');

// post new destination
router.post('/', createDestination);

module.exports = router;