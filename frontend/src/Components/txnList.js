import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EditButton from './editButton';
import DeleteButton from './deleteButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const TxnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
`;

const TransactionColumn = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.componentBackground};
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};

  &:last-child {
    border-bottom: none;
  }
`;

const TransactionDetails = styled.div`
  color: ${({ theme }) => theme.textColor};
`;

const TransactionActions = styled.div`
  display: flex;
  gap: 10px;
`;

const TransactionList = () => {
  const [transactions, setTransactions] = useState([
    // Dummy data for Income and Expense
    { id: 1, description: 'Salary', amount: 850.0, type: 'Income', date: '2024-09-15', category: 'Designing' },
    { id: 2, description: 'Business', amount: 850.0, type: 'Income', date: '2024-09-15', category: 'Designing' },
    { id: 3, description: 'Rent', amount: 850.0, type: 'Expense', date: '2024-09-15', category: 'Designing' },
    { id: 4, description: 'Food', amount: 850.0, type: 'Expense', date: '2024-09-15', category: 'Designing' },
  ]);

  // Uncomment this block later to fetch from backend
  /*
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const [incomeRes, expenseRes] = await Promise.all([
          fetch('/api/incomes'),
          fetch('/api/expenses'),
        ]);

        const incomeData = await incomeRes.json();
        const expenseData = await expenseRes.json();

        setTransactions([...incomeData, ...expenseData]); // Combine both lists
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);
  */

  // handles data input editing
  const handleEdit = (id) => {
    const transactionToEdit = transactions.find((t) => t.id === id);
    const newDescription = prompt(`Edit transaction (
        Type: ${transactionToEdit.type}, 
        Amount: ${transactionToEdit.amount}, 
        Date: ${transactionToEdit.date}, 
        Description: ${transactionToEdit.description}
      )`,
      transactionToEdit.description
    );

    if (newDescription !== null) {
      const updatedTransactions = transactions.map((transaction) =>
        transaction.id === id ? { ...transaction, description: newDescription } : transaction
      );
      setTransactions(updatedTransactions);
    }
    // console.log(`Edit transaction with id: ${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this transaction?');
    if (confirmDelete) {
      setTransactions(transactions.filter((transaction) => transaction.id !== id));
    }
  };

  // Split transactions into Income and Expense
  const incomeTransactions = transactions.filter((t) => t.type === 'Income');
  const expenseTransactions = transactions.filter((t) => t.type === 'Expense');

  return (
    <TxnContainer>
      {/* Income Transactions */}
      <TransactionColumn>
        {incomeTransactions.map((transaction) => (
          <TransactionItem key={transaction.id}>
            <TransactionDetails>
              <p>{transaction.type}</p>
              <p>
                ${transaction.amount} &nbsp; 
                <CalendarMonthIcon /> {transaction.date} &nbsp; 
                <ChatBubbleOutlineIcon /> {transaction.description}
              </p>
            </TransactionDetails>
            <TransactionActions>
              <EditButton onClick={() => handleEdit(transaction.id)} />
              <DeleteButton onClick={() => handleDelete(transaction.id)} />
            </TransactionActions>
          </TransactionItem>
        ))}
      </TransactionColumn>

      {/* Expense Transactions */}
      <TransactionColumn>
        {expenseTransactions.map((transaction) => (
          <TransactionItem key={transaction.id}>
            <TransactionDetails>
              <p>{transaction.type}</p>
              <p>
                ${transaction.amount} &nbsp; 
                <CalendarMonthIcon /> {transaction.date} &nbsp; 
                <ChatBubbleOutlineIcon /> {transaction.description}
              </p>
            </TransactionDetails>
            <TransactionActions>
              <EditButton onClick={() => handleEdit(transaction.id)} />
              <DeleteButton onClick={() => handleDelete(transaction.id)} />
            </TransactionActions>
          </TransactionItem>
        ))}
      </TransactionColumn>
    </TxnContainer>
  );
};

export default TransactionList;