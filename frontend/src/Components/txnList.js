import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EditIcon from './editButton';
import DeleteIcon from './deleteButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

// txnList styles
const TxnContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70%;
  max-width: 600px;
  padding: 20px;
  flex-direction: column;
  gap: 10px;
  overflow-x: auto; // Add vertical scroll if content overflows (but, check other ways for border-radius to still apply on this side)
  position: relative;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};

  &:last-child {
    border-bottom: none;
  }
`;

const TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  flex-grow: 1;
  color: ${({ theme }) => theme.textColor};
`;

const TransactionHeader = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const TransactionContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;
`;

const TransactionActions = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  border-radius: 50%;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  gap: 5px;

  &:hover {
    color: ${({ hoverColor }) => hoverColor};
    }
`;
  
const StatusCircle = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: ${({ isNew }) => (isNew ? 'green' : 'grey')};
`;

// modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.componentBackground};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #2980b9;
  }
`;

const TransactionList = ({ category }) => {
  const [transactions, setTransactions] = useState([
    // Dummy data for Income and Expense
    { id: 1, description: 'Full-time', amount: 850.0, type: 'Salary', date: '2024-09-15', category: 'Income' },
    { id: 2, description: 'Project based', amount: 850.0, type: 'Freelance', date: '2024-09-15', category: 'Income' },
    { id: 3, description: 'House rent', amount: 850.0, type: 'Rent', date: '2024-09-15', category: 'Expense' },
    { id: 4, description: 'Grocery', amount: 850.0, type: 'Food', date: '2024-09-15', category: 'Expense' },
  ]);
  // form modal for editing existing transactions
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [currentTransaction, setCurrentTransaction] = useState(null);
  
/*
  // Uncomment this block later to fetch from backend
  useEffect(() => {
    //  fetch transactions from backend based on category (income or expense)
    fetch(`/api/transactions?category=${category}`) //replace "/api/transactions" with actual path
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, [category]); // dependency array includes 'category'

  const addTransaction = (newTransaction) => {
    newTransaction.category = category; // set transaction list's category
    fetch('api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    })
    .then(response => response.json()) 
    .then(addedTransaction => setTransactions([...transactions, addedTransaction])) 
    .catch(error => console.error('Error adding transaction:', error));
  };
*/

  // data input editing function
  const editTransaction = (id) => {
    const transactionToEdit = transactions.find(transaction => transaction.id === id);
    setCurrentTransaction(transactionToEdit); 
    setIsEditModalOpen(true);
    // console.log(`Edit transaction with id: ${id}`);
  };

  // save edited transation
  const saveEditTransaction = (updatedTransaction) => {
    // sends back edited transaction to backend via PUT req and updates the state
    fetch(`/api/transactions/${currentTransaction.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTransaction),
    })
      .then(response => response.json())
      .then(savedTransaction => {
        setTransactions(transactions.map(transaction => transaction.id === savedTransaction.id ? savedTransaction : transaction));
        setIsEditModalOpen(false);
      })
      .catch(error => console.error('Error updating transaction:', error));
  };

  // delete function (prompt)
  const deleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) { 
      fetch(`/api/transactions/${id}`, { 
        method: 'DELETE', 
      }) 
        .then(() => { 
          setTransactions(transactions.filter(transaction => transaction.id !== id));
        }) 
        .catch(error => console.error('Error deleting transaction:', error)); 
    }
  };

  return (
    <TxnContainer>
      {/* structure for transaction list */}
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id}>

          <TransactionDetails>
            <TransactionHeader>
              <StatusCircle isNew={Date.parse(transaction.date) > Date.now()} />
              <p>{transaction.type}</p>
            </TransactionHeader>

            <TransactionContent>
              <p>${transaction.amount}</p>
              <p style={{ display: 'flex', alignItems: 'center' }}>
                <CalendarMonthIcon style={{ marginRight: '2px' }} /> 
                {new Date(transaction.date).toLocaleDateString('en-US', { 
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric'
                })}
              </p>
              <p style={{ display: 'flex', alignItems: 'center' }}>
                <ChatBubbleOutlineIcon style={{ marginRight: '2px' }} /> 
                {transaction.description}
              </p>

              <TransactionActions>
                <IconButton onClick={() => editTransaction(transaction.id)} hoverColor="#3498db">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteTransaction(transaction.id)} hoverColor="#e74c3c">
                  <DeleteIcon />
                </IconButton>
              </TransactionActions>
            </TransactionContent>
          </TransactionDetails>
        </TransactionItem>
      ))}

      {/* modal structure */}
      {isEditModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Edit Transaction</h3>
            <Input
              category={category}
              type="text"
              placeholder="Type"
              value={currentTransaction.type}
              onChange={(e) => setCurrentTransaction({ ...currentTransaction, type: e.target.value })}
            />
            <Input
              category={category}
              type="text"
              placeholder="Description"
              value={currentTransaction.description}
              onChange={(e) => setCurrentTransaction({ ...currentTransaction, description: e.target.value })}
            />
            <Input
              category={category}
              type="date"
              value={currentTransaction.date}
              onChange={(e) => setCurrentTransaction({ ...currentTransaction, date: e.target.value })}
            />
            <Input
              category={category}
              type="number"
              placeholder="Amount"
              value={currentTransaction.amount}
              onChange={(e) => setCurrentTransaction({ ...currentTransaction, amount: e.target.value })}
            />
            <Button onClick={() => saveEditTransaction(currentTransaction)}>Save</Button>
            <Button onClick={() => setIsEditModalOpen(false)} style={{ backgroundColor: '#e74c3c', marginLeft: '10px' }}>Cancel</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </TxnContainer>
  );
};

export default TransactionList;