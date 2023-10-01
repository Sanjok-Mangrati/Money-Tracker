// Import the CSS file for styling
import './transaction.css';

// Define a functional component called Transaction
// It takes in props (name, price, dateTime, description)
const Transaction = ({ name, price, dateTime, description }) => {
    return (
        // The main container for a transaction
        <div className="money-tracker__transactions-container">
            {/* Left side of the transaction */}
            <div className="money-tracker__transactions-left">
                {/* Display the name */}
                <p className="name">{name}</p>
                {/* Display the description */}
                <p className="description">{description}</p>
            </div>
            {/* Right side of the transaction */}
            <div className="money-tracker__transactions-right">
                {/* Display the amount with conditional styling (green for positive, red for negative) */}
                <p className={`amount ${price > 0 ? 'green' : 'red'}`}>&#8377;{price}</p>
                {/* Display the date and time (with only the first 16 characters) */}
                <p className="dateTime">{dateTime.slice(0, 16)}</p>
            </div>
        </div>
    );
}

// Export the Transaction component as the default export
export default Transaction;
