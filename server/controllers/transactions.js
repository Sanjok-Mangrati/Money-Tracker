// Import necessary packages and modules
require('dotenv').config(); // Load environment variables from a .env file
const mongoose = require('mongoose'); // MongoDB ODM library
const Transaction = require('../db/models/Transaction'); // Import the Transaction model

// Controller function to retrieve transactions from the database
const getTransactions = async (req, res) => {
    try {
        // Connect to the MongoDB database using the URL from environment variables
        await mongoose.connect(process.env.MONGO_URL);

        // Retrieve all transactions from the Transaction model
        const transactions = await Transaction.find();

        // Send the retrieved transactions as a JSON response
        res.json(transactions);

    } catch (error) {
        console.error(error);
    }
}

// Controller function to add a new transaction to the database
const postTransaction = async (req, res) => {
    try {
        // Connect to the MongoDB database using the URL from environment variables
        await mongoose.connect(process.env.MONGO_URL);

        // Extract transaction data from the request body
        const { name, price, dateTime, description } = req.body;

        // Create a new transaction record in the database using the Transaction model
        const transaction = await Transaction.create({ name, price, dateTime, description });

        // Send the newly created transaction as a JSON response
        res.json(transaction);

    } catch (error) {
        console.error(error);
    }
}

// Export the controller functions to be used in other parts of the application
module.exports = {
    getTransactions,
    postTransaction
}
