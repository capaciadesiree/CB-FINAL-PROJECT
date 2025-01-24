import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import EditIcon from './editButton';
import DeleteIcon from './deleteButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

// txnList styles
const TxnContainer = styled.div`
  display: flex;
  width: 510px;
  height: 300px;
  max-width: 600px;
  padding: 20px;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto; // Add vertical scroll if content overflows (but border-radius not visible on this side, check other ways)
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
  z-index: 10;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.componentBackground};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 11;
`;

const Input = styled.input`
  width: 97%;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  background-color: #E8EDEE;
  color: #111111;
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.borderColor};
    border-color: ${({ theme }) => theme.borderColor};
  }
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

const EmptyMessage = styled.p`
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
  line-height: 1.5;
  color:${({ theme }) => theme.subTextColor};
`;

const TransactionList = ({ type }) => {
  const [transactions, setTransactions] = useState([]); // state for all transactions
  console.log(`Fetching transactions for type: ${type}`); // debug log

  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // form modal for editing existing transactions
  const [currentTransaction, setCurrentTransaction] = useState(null); // State for editing a current transaction
  
  const baseUrl = 'http://localhost:4000/api';

  // Map of endpoints for income and expense
  const endpoint = {
    get: type === 'income' ? '/get-income' : '/get-expense',
    put: type === 'income' ? '/edit-income/_id' : '/edit-expense/_id',
    delete: type === 'income' ? '/delete-income/_id' : '/delete-expense/_id',
  };

  // Fetch transactions on component load
  useEffect(() => {
    axios
      .get(`${baseUrl}${endpoint.get}`)
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error('Error fetching transactions:', error));
  }, [type, endpoint.get]); // Refetch whenever the `type` prop or endpoint.get changes

  // Edit a transaction
  const editTransaction = (updatedTransaction) => {
    // debug log
    console.log("Current Transaction to Edit:", updatedTransaction);

    axios
      .put(`${baseUrl}${endpoint.put}/${currentTransaction._id}`, updatedTransaction, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        setTransactions(
          transactions.map((transaction) =>
            transaction._id === response.data._id ? response.data : transactions
          )
        );
        setIsEditModalOpen(false);
      })
      .catch((error) => console.error('Error updating transaction:', error));
  };

  // delete transaction
  const deleteTransaction = (id) => {
    console.log("Deleting Transaction ID:", id); // debug log
    
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      axios
        .delete(`${baseUrl}${endpoint.delete}/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        .then(() =>
          setTransactions(transactions.filter((transaction) => transaction._id !== id))
        )
        .catch((error) => console.error('Error deleting transaction:', error));
    }
  };

  return (
    <TxnContainer>
      {/* Conditional rendering: Show message if no transactions */}
      {transactions.length === 0 ? (
        <EmptyMessage>No transactions to display yet. Add your first transaction to see it here.</EmptyMessage>
      ) : (
        transactions.map((transaction) => (
          <TransactionItem key={transaction._id}>

            <TransactionDetails>
              <TransactionHeader>
                <StatusCircle isNew={Date.parse(transaction.date) > Date.now()} />
                <p>{transaction.typeOf}</p>
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
                  <IconButton 
                    onClick={() => {
                      console.log("Editing Transaction:", transaction); // debug log
                      setCurrentTransaction(transaction); 
                      setIsEditModalOpen(true); // Open the modal
                    }} 
                    hoverColor="#3498db"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteTransaction(transaction._id)} hoverColor="#e74c3c">
                    <DeleteIcon />
                  </IconButton>
                </TransactionActions>
              </TransactionContent>
            </TransactionDetails>
          </TransactionItem>
        ))
      )}
      {/* modal structure */}
      {isEditModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Edit Transaction</h3>
            <Input
              type="text"
              placeholder="Type"
              value={currentTransaction.typeOf}
              onChange={(e) => setCurrentTransaction({ ...currentTransaction, typeOf: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Description"
              value={currentTransaction.description}
              onChange={(e) => setCurrentTransaction({ ...currentTransaction, description: e.target.value })}
            />
            <Input
              type="date"
              value={currentTransaction.date}
              onChange={(e) => setCurrentTransaction({ ...currentTransaction, date: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Amount"
              value={currentTransaction.amount}
              onChange={(e) => setCurrentTransaction({ ...currentTransaction, amount: e.target.value })}
            />
            <Button onClick={() => editTransaction(currentTransaction)}>Save</Button>
            <Button onClick={() => setIsEditModalOpen(false)} style={{ backgroundColor: '#e74c3c', marginLeft: '10px' }}>Cancel</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </TxnContainer>
  );
};

export default TransactionList;