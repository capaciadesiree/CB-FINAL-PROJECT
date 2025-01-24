import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import axios from 'axios';
import PaidIcon from '@mui/icons-material/PaidOutlined';
import AtmIcon from '@mui/icons-material/LocalAtmOutlined';
import SavingsIcon from '@mui/icons-material/SavingsOutlined';

const BoxContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ boxType }) => {
    switch (boxType) {
      case 'income':
        return '#52A6D8';
      case 'expenses':
        return '#FD7543';
      case 'savings':
        return '#3DBBBF';
      default:
        return '#FFFFFF'; //default color if none of the specified types match
    }
  }};
  color: #FFFFFF;
  display: flex;
  align-items: ${({ layout }) => layout === 'horizontal' ? 'center' : 'flex-start'};
  // flex: ${({ layout }) => layout === 'horizontal' ? '1' : 'initial'};
  margin-right: ${({ layout, boxType }) => layout === 'horizontal' && boxType !== 'expenses' ? '0px' : '0'};
  flex-direction: ${({ layout }) => layout === 'horizontal' ? 'row' : 'column'};
  text-align: ${({ layout }) => layout === 'horizontal' ? 'left' : 'center'};
  justify-content: ${({ layout }) => layout === 'horizontal' ? 'space-between' : 'center'};
  flex-grow: 1;
`;

const Title = styled.h3`
  margin: 0;
`;

const Amount = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: ${({ layout }) => layout === 'horizontal' ? '0' : '5px 0 0 0'};
`;

const SummaryContainer = styled.div`
  gap: 10px;
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: ${({ layout }) => layout === 'horizontal' ? 'row' : 'column'};
`;

const SummaryBox = ({ layout = 'vertical', visibleBoxes = ['income', 'expenses', 'savings'] }) => {
  // sample data for testing
  const sampleData = {
    income: 6450.00,
    expenses: 3190.00,
    savings: 3260.00
  };

  const [amount, setAmount] = useState(sampleData); // change value to '0'
  
  /* uncomment once db is connected
  useEffect(() => {
    // Fetch totals from the API
    axios.get('/api/summary') // Replace with API endpoint
      .then(response => {
        setAmount(response.data);
      })
      .catch(error => {
        console.error('Error fetching summary data:', error);
      });
  }, []);
*/
  return (
    <SummaryContainer layout={layout}>
      {visibleBoxes.includes('income') && (
        <BoxContainer layout={layout} boxType='income'>
          <PaidIcon />
          <Title>Total Income</Title>
          <Amount layout={layout}>${amount.income ? amount.income.toFixed(2) : '0.00'}</Amount>
        </BoxContainer>
      )}
      {visibleBoxes.includes('expenses') && (
        <BoxContainer layout={layout} boxType='expenses'>
          <AtmIcon />
          <Title>Total Expenses</Title>
          <Amount layout={layout}>${amount.expenses ? amount.expenses.toFixed(2) : '0.00'}</Amount>
        </BoxContainer>
      )}
      {visibleBoxes.includes('savings') && (
        <BoxContainer layout={layout} boxType='savings'>
          <SavingsIcon />
          <Title>Total Savings</Title>
          <Amount layout={layout}>${amount.savings ? amount.savings.toFixed(2) : '0.00'}</Amount>
        </BoxContainer>
      )}
    </SummaryContainer>
  );
};

export default SummaryBox;