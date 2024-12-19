import React, { useState } from 'react';
import styled from 'styled-components';

const TxnHistoryContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.containerBackground};
  color: ${({ theme }) => theme.color};
`;

const FilterOptions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  background-color: ${({ active }) => (active ? '#3498db' : '#bdc3c7')};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? '#2980b9' : '#95a5a6')};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  color: ${({ theme }) => theme.subTextColor};
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const TxnHistory = ({ theme }) => {
  const [filter, setFilter] = useState('Recent');

  const transactions = [
    { description: 'Salary', type: 'Designing', date: '09/15/2024', amount: '$850.00' },
    { description: 'Freelance', type: 'Development', date: '09/14/2024', amount: '$500.00' },
    { description: 'Consulting', type: 'Consulting', date: '09/13/2024', amount: '$300.00' },
  ];

  const filteredTransactions = [...transactions].sort((a, b) => 
    filter === 'Recent' 
      ? new Date(b.date) - new Date(a.date) 
      : new Date(a.date) - new Date(b.date)
  );

  return (
    <TxnHistoryContainer theme={theme}>
      <h2>Transaction History</h2>
      <FilterOptions>
        <FilterButton 
          active={filter === 'Recent'}
          onClick={() => setFilter('Recent')}
        >
          Recent
        </FilterButton>
        <FilterButton 
          active={filter === 'Oldest'}
          onClick={() => setFilter('Oldest')}
        >
          Oldest
        </FilterButton>
      </FilterOptions>
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
              <TableCell>{transaction.amount}</TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </TxnHistoryContainer>
  );
};

export default TxnHistory;