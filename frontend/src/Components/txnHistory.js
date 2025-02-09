import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const TxnHistoryContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.containerBackground};
  color: ${({ theme }) => theme.color};
`;

const FilterOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.textColor};
  margin-right: 10px;
`;

const FilterSelect = styled.select`
  background-color: ${({ theme }) => theme.componentBackground};
  color: ${({ theme }) => theme.textColor};
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
  color: ${({ theme }) => theme.subTextColor};
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const ComponenHeader = styled.div`
  font-weight: bold;
  font-size: 24px;
`;

const TimeRangeContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color:${({ theme }) => theme.subTextColor};
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color:${({ theme }) => theme.subTextColor};
`;

const TxnHistory = ({ theme }) => {
  const [timeFilter, setTimeFilter] = useState('Recent');
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const [incomeRes, expenseRes] = await Promise.all([
          axios.get('http://localhost:4000/api/get-income', { withCredentials: true }),
          axios.get('http://localhost:4000/api/get-expense', { withCredentials: true })
        ]);

        const incomeTransactions = incomeRes.data.map(income => ({
          description: income.description,
          type: income.typeOf,
          date: new Date(income.date).toLocaleDateString(),
          amount: `$${income.amount.toFixed(2)}`,
          transactionType: 'income'
        }));

        const expenseTransactions = expenseRes.data.map(expense => ({
          description: expense.description,
          type: expense.typeOf,
          date: new Date(expense.date).toLocaleDateString(),
          amount: `-$${expense.amount.toFixed(2)}`,
          transactionType: 'expense'
        }));

        setTransactions([...incomeTransactions, ...expenseTransactions]);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setTransactions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return timeFilter === 'Recent' ? dateB - dateA : dateA - dateB;
  });

  const handleFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  return (
    <TxnHistoryContainer theme={theme}>
      <FilterOptions>
        <ComponenHeader>Transaction History</ComponenHeader>
        
        {!isLoading && transactions.length > 0 && (
          <TimeRangeContainer>
            <FilterLabel htmlFor="timeFilter">Filtered by:</FilterLabel>
            <FilterSelect
              id="timeFilter"
              value={timeFilter}
              onChange={handleFilterChange}
            >
              <option value="Recent">Recent</option>
              <option value="Oldest">Oldest</option>
            </FilterSelect>
          </TimeRangeContainer>
        )}
      </FilterOptions>

      {isLoading && (
        <LoadingMessage>Loading transactions...</LoadingMessage>
      )}

      {!isLoading && transactions.length === 0 && (
        <EmptyMessage>
          No transactions to display yet. Add your first transaction to see it here.
        </EmptyMessage>
      )}

      {!isLoading && transactions.length > 0 && (
        <Table>
          <thead>
            <tr>
              <TableHeader>Description</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Amount</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index}>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell style={{ 
                  color: transaction.transactionType === 'income' ? '#2ecc71' : '#e74c3c'
                }}>
                  {transaction.amount}
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </TxnHistoryContainer>
  );
};

export default TxnHistory;