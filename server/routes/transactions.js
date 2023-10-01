// Import the Express.js framework
const express = require('express');

// Create an Express.js router
const router = express.Router();

// Import the controller functions for transactions
const { getTransactions, postTransaction } = require('../controllers/transactions');

// Define route handlers for specific HTTP requests

// Handle GET requests to "/transactions"
router.get('/transactions', getTransactions);

// Handle POST requests to "/transaction"
router.post('/transaction', postTransaction);

// Export the router to be used in other parts of your Express.js application
module.exports = router;
