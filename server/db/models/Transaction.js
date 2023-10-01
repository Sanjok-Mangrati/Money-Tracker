// Import necessary packages from Mongoose
const { Schema, model } = require('mongoose');

// Define a Mongoose schema for the "Transaction" entity
const TransactionSchema = new Schema({
    name: { type: String, required: true }, // Name of the transaction
    price: { type: Number, required: true }, // Price of the transaction
    dateTime: { type: Date, required: true }, // Date and time of the transaction
    description: { type: String, required: true } // Description of the transaction
});

// Create a Mongoose model for the "Transaction" entity using the defined schema
const TransactionModel = model('Transaction', TransactionSchema);

// Export the Transaction model to be used in other parts of the application
module.exports = TransactionModel;
