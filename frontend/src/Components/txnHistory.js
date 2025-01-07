import React, { useState } from 'react';
import styled from 'styled-components';
// import axios from 'axios';

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

const TxnHistory = ({ theme }) => {
  const [timeFilter, setTimeFilter] = useState('Recent'); // stores current time range (by recent or oldest)
  const [apiTransactions, setApiTransactions] = useState([]); //state to store API transactions

  // sample data for testing
  const sampleTransactions = [
    { description: 'Salary', type: 'Designing', date: '09/15/2024', amount: '$850.00' },
    { description: 'Freelance', type: 'Development', date: '09/14/2024', amount: '$500.00' },
    { description: 'Consulting', type: 'Consulting', date: '09/13/2024', amount: '$300.00' },
  ];
/*
  // function to fetch transaction history from API
  const fetchTransactions = async () => {
    try {
      const response = await axios.get('replace_with_api_endpoint'); // replace with your API endpoint
      setApiTransactions(response.data); // assuming the API response returns an array of transactions
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // useEffect to fetch transactions when the component mounts 
  useEffect(() => { 
    fetchTransactions(); 
  }, []);
*/

  // combined transactions (API transactions + sample transactions)
  const allTransactions = [...apiTransactions, ...sampleTransactions];

  // filters transactions based on timeFilter (recent or oldest)
  const filteredTransactions = [...sampleTransactions].sort((a, b) => 
    timeFilter === 'Recent' 
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  // handles the changed in time range (filter by) dropdown
  const handleFilterChange = (event) => {
    setTimeFilter(event.target.value);

  };

  return (
    <TxnHistoryContainer theme={theme}>
      <FilterOptions>
        <ComponenHeader>Transaction History</ComponenHeader>
        
        <TimeRangeContainer>
          <FilterLabel htmlFor="timeFilter">Filtered by:</FilterLabel>

          <FilterSelect
            id="timeFilter"
            value={timeFilter}
            onChange={handleFilterChange} // call handleTimeFileChange on dropdown change
          >
            <option value="Recent">Recent</option>
            <option value="Oldest">Oldest</option>
          </FilterSelect>
        </TimeRangeContainer>
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