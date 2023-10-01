// Import the necessary CSS file and React hooks
import './App.css';
import { useState, useEffect } from 'react';
import Transaction from './components/transactions/Transaction'; // Import the Transaction component

const App = () => {

  // Define state variables using useState hook
  const [transactions, setTransactions] = useState([]);
  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [description, setDescription] = useState('');

  // Calculate the balance based on the transactions
  const getBalance = () => {
    let balance = 0;
    for(let transaction of transactions){
      balance = balance + transaction.price;
    }
    return balance;
  }

  // Validate user input and add a new transaction
  const validateInput = () => {
    if(name && dateTime && description){
      addNewTransaction();
    }
  }

  // Fetch the list of transactions from the server
  const getTransactions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/transactions`);
      const json = await response.json();
      setTransactions(json);
    } catch (error) {
      console.error(error);
    }
  }

  // Add a new transaction to the server
  const addNewTransaction = async () => {
    try {
      const price = name.split(' ')[0];
      await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/transaction`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          name: name.substr(price.length+1),
          price,
          dateTime,
          description
        })
      })
      getTransactions(); // Refresh the list of transactions after adding new transaction

      //clear values in inputs
      setName('');
      setDateTime('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  }

  // Fetch transactions from the server on component mount
  useEffect(() => {
    getTransactions();
  },[])

  return (
    <main>
      <div className="money-tracker__container">
        <div className="money-tracker__balance">
          {/* Display the balance with conditional styling */}
          <h1 className={ getBalance() > 0 ? 'green' : 'red'}>&#8377;{getBalance()}</h1>
        </div>
        <form className="money-tracker__input-section">
          <div className="money-tracker__input-section_top">
            {/* Input fields for name and date/time */}
            <input 
              type="text" 
              placeholder=' Eg: +50 Cleaning' 
              className='name'
              value={name} 
              onChange={ (e) => setName(e.target.value)}
            />
            <input 
              type="datetime-local" 
              className='dateTime'
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
          <div className="money-tracker__input-section_bottom">
            {/* Input field for description and a button to add the transaction */}
            <input 
              type="text" 
              placeholder='Description' 
              className='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button 
              type="button"
              onClick={validateInput}
            >Add Transaction</button>
          </div>
        </form>

        {/* Map through the transactions and render Transaction components */}
        {
          transactions?.map((transaction) => (
            <Transaction
              key={transaction._id}
              name={transaction.name} 
              price={transaction.price} 
              dateTime={transaction.dateTime} 
              description={transaction.description}
            />
          ))
        }

      </div>
    </main>
  );
}

export default App;

