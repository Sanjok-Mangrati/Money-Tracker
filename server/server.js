// Import the Express.js framework
const express = require('express');

// Create an instance of the Express.js application
const app = express();

// Import the CORS middleware to enable cross-origin requests
const cors = require('cors');

// Import the routes for handling transactions
const transactionsRoute = require('./routes/transactions');

// Middleware: Parse incoming JSON data
app.use(express.json());

// Middleware: Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware: Mount the transactions route under "/api/v1"
app.use('/api/v1', transactionsRoute);

// Define the port to listen on (from environment variables)
const PORT = process.env.SERVER_PORT;

// Start the Express.js server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}...`);
});
