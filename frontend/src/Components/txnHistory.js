import React, { useState } from 'react';
import styled from 'styled-components';

const TxnHistoryContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.containerBackground};
  color: ${({ theme }) => theme.color};
`;

const FilterOptions = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  // display: flex;
  // align-content: flex-start;
  text-align: left;
  padding: 10px;
  color: ${({ theme }) => theme.subTextColor};
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const TxnHistory = ({ theme }) => {
  const [filter, timeFilter, setTimeFilter] = useState('Recent'); // stores current time range (by recent or oldest)

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

  // handles the changed in time range (filter by) dropdown
  const handleFilterChange = (event) => {
    setTimeFilter(event.target.value);
    // Modify labels and data based on the selected time range
    // Example: adjust data to show last 3 months or last month
  };

  return (
    <TxnHistoryContainer theme={theme}>
      <h2>Transaction History</h2>
      <FilterOptions>
        <FilterLabel htmlFor="timeFilter">Filtered by:</FilterLabel>

        <FilterSelect
          id="FilterSelect"
          value={timeFilter}
          onChange={handleFilterChange} // call handleTimeFileChange on dropdown change
        >
          <option value="Recent">Recent</option>
          <option value="Oldest">Oldest</option>
        </FilterSelect>
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