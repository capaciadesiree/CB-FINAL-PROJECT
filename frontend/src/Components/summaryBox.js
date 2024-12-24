import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import axios from 'axios';

const BoxContainer = styled.div`
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  padding: 20px;
  color: grey;
`;

const Title = styled.h3`
  margin: 0;
`;

const Amount = styled.p`
  margin: 5px 0 0 0;
  font-size: 24px;
  font-weight: bold;
`;

const SummaryBox = ({ theme, title, dataKey, fullWidth }) => {
  // must delete, only for testing
  const sampleData = {
    income: 6450.00,
    expenses: 3190.00,
    savings: 3260.00
  };

  // initialize state with sample data
  const [amount] = useState(sampleData[dataKey]);
  /*
  // uncomment once db is connected
  const [amount, setAmount] = useState(0); 
  useEffect(() => {
    // Fetch totals from the API
    axios.get('/api/summary') // Replace with API endpoint
      .then(response => {
        setAmount(response.data[dataKey]);
      })
      .catch(error => {
        console.error('Error fetching summary data:', error);
      });
  }, [dataKey]);
*/
  return (
    <BoxContainer theme={theme} fullWidth={fullWidth}>
      <Title>{title}</Title>
      <Amount>${amount ? amount.toFixed(2) : '0.00'}</Amount>
    </BoxContainer>
  );
};

export default SummaryBox;