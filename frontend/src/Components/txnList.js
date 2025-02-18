import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import EditIcon from './editButton';
import DeleteIcon from './deleteButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ConfirmationDialog from './confirmationDialog';
import { eventBus } from '../utils/eventBus';

// txnList styles
const TxnContainer = styled.div`
  display: flex;
  width: 100%;
  height: 170px;
  max-width: 395px;
  padding: 20px;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto; // Add vertical scroll if content overflows
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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // form modal for editing existing transactions
  const [currentTransaction, setCurrentTransaction] = useState(null); // State for editing a current transaction
  const [newTransaction, setNewTransaction] = useState(false); // State for listening to new transaction
  
  // state for dialog box
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    transactionId: null
  });

  const baseUrl = `${process.env.REACT_APP_API_URL}`;
  // const baseUrl = 'http://localhost:4000'; // dev

  // Map of endpoints for income and expense
  const endpoint = {
    get: type === 'income' ? '/api/get-income' : '/api/get-expense',
    put: type === 'income' ? '/api/edit-income' : '/api/edit-expense',
    delete: type === 'income' ? '/api/delete-income' : '/api/delete-expense',
  };

  // function to listen on new transactions from txnForm
  const listener = useCallback((isNew) => {
    setNewTransaction(isNew);
  }, []);

  // API call to fetch transactions on component load
  useEffect(() => {
    eventBus.on('newEvent', listener);

    axios
      .get(`${baseUrl}${endpoint.get}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error('Error fetching transactions:', error));

      return () => {
       eventBus.off('newEvent', listener); // cleanup properly
       setNewTransaction(false); 
      };
  }, [type, newTransaction]);

  // Edit a transaction
  const editTransaction = (updatedTransaction) => {

    axios
      .put(`${baseUrl}${endpoint.put}/${currentTransaction._id}`, updatedTransaction, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        const response_data = response.data
        const response_transaction_data = response_data.data
        const response_transaction_id = response_transaction_data._id
        setTransactions(
          transactions => transactions.map((transaction) =>
            transaction._id === response_transaction_id ? response_transaction_data : transaction
          )
        );
        setIsEditModalOpen(false);
        eventBus.emit('newEvent', true)
      })
      .catch((error) => console.error('Error updating transaction:', error));
  };

  // Modified delete transaction function
  const handleDeleteClick = (id) => {
    setDeleteDialog({
      open: true,
      transactionId: id
    });
  };

  const handleDeleteConfirm = () => {
    const id = deleteDialog.transactionId; // Get the stored ID from state
    axios
      .delete(`${baseUrl}${endpoint.delete}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then(() => {
        // Remove deleted transaction from state
        setTransactions(transactions.filter((transaction) => 
          transaction._id !== id
      ));
        // reset and close dialog box
        setDeleteDialog({ open: false, transactionId: null });
        eventBus.emit('newEvent', true)
      })
      .catch((error) => console.error('Error deleting transaction:', error));
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, transactionId: null });
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
                      setCurrentTransaction(transaction); 
                      setIsEditModalOpen(true); // Open the modal
                    }} 
                    hoverColor="#3498db"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(transaction._id)} hoverColor="#e74c3c">
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
              maxLength={20}
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

      <ConfirmationDialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Confirm Delete"
        description="Are you sure you want to delete this item?"
        confirmText="Confirm Delete"
      />
    </TxnContainer>
  );
};

export default TransactionList;