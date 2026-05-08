import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { eventBus } from '../utils/eventBus';

import PaidIcon from '@mui/icons-material/PaidOutlined';
import AtmIcon from '@mui/icons-material/LocalAtmOutlined';
import SavingsIcon from '@mui/icons-material/SavingsOutlined';

const SummaryContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${({ layout }) => layout === 'horizontal' ? 'row' : 'column'};
  gap: 10px;
  min-width: 0;
`;

const BoxContainer = styled.div`
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  background-color: ${({ boxType }) => {
    switch (boxType) {
      case 'income':
        return '#52A6D8';
      case 'expenses':
        return '#FD7543';
      case 'savings':
        return '#3DBBBF';
      default:
        return '#FFFFFF';
    }
  }};
  color: #FFFFFF;
  display: flex;
  flex: 1;
  min-width: 0; /* Allows the box to shrink */
  min-height: 0;

  /* Always row so icon is on the left */
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${({ layout }) => layout === 'horizontal' ? '16px' : '14px'};
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Amount = styled.p`
  font-size: ${({ layout }) => layout === 'horizontal' ? '20px' : '24px'};
  font-weight: bold;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; /* Prevents icon from squishing */
  svg {
    font-size: ${({ layout }) => layout === 'horizontal' ? '28px' : '32px'};
    opacity: 0.8;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  /* Dashboard = stacked text. Add Txn = side-by-side text */
  flex-direction: ${({ layout }) => layout === 'horizontal' ? 'row' : 'column'};
  align-items: ${({ layout }) => layout === 'horizontal' ? 'center' : 'flex-start'};
  justify-content: ${({ layout }) => layout === 'horizontal' ? 'space-between' : 'center'};
  gap: ${({ layout }) => layout === 'horizontal' ? '15px' : '4px'};
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  text-align: center;
  padding: 10px;
  background-color: #ffe6e6;
  border-radius: 5px;
  width: 100%;
`;

const LoadingOverlay = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  color: #666;
`;

const SummaryBox = ({ layout = 'vertical', visibleBoxes = ['income', 'expenses', 'savings'] }) => {
  const [summaryData, setSummaryData] = useState({
    income: 0,
    expenses: 0,
    savings: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTransaction, setNewTransaction] = useState(false); // State for listening to new transaction

  const baseUrl = `${process.env.REACT_APP_API_URL}`;
  // const baseUrl = 'http://localhost:4000'; // dev

  // function to listen on new transactions from txnForm
  const listener = useCallback((isNew) => {
    console.log('Is new:', isNew);
    setNewTransaction(isNew);
  }, []);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch both income and expenses in parallel
      const [incomeResponse, expensesResponse] = await Promise.all([
        axios.get(`${baseUrl}/api/get-income`, { withCredentials: true }),
        axios.get(`${baseUrl}/api/get-expense`, { withCredentials: true })
      ]);

      const incomeData = incomeResponse.data;
      const expenseData = expensesResponse.data

      // Extract amounts and calculate total income and expenses
      const totalIncome = incomeData.reduce((sum, txn) => sum + parseFloat(txn.amount || 0), 0);
      const totalExpenses = expenseData.reduce((sum, txn) => sum + parseFloat(txn.amount || 0), 0);

      // Calculate savings
      const savings = totalIncome - totalExpenses;

      setSummaryData({
        income: totalIncome,
        expenses: totalExpenses,
        savings
      });
    } catch (error) {
      console.error('Error fetching summary data:', error);
      setError('Failed to fetch financial data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // useEffect for listener
  useEffect(() => {
    eventBus.on('newEvent', listener);
    fetchData(); // initial fetch when component mounts or newTransaction changes

    return () => {
      eventBus.off('newEvent', listener); // cleanup properly
    };
  }, [newTransaction]);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (loading) return <LoadingOverlay>Loading financial data...</LoadingOverlay>;

  return (
    <SummaryContainer layout={layout}>
      {visibleBoxes.includes('income') && (
        <BoxContainer layout={layout} boxType="income">
          <IconWrapper layout={layout}><PaidIcon /></IconWrapper>
          <TextWrapper layout={layout}>
            <Title layout={layout}>Total Income</Title>
            <Amount layout={layout}>{formatAmount(summaryData.income)}</Amount>
          </TextWrapper>
        </BoxContainer>
      )}
      {visibleBoxes.includes('expenses') && (
        <BoxContainer layout={layout} boxType="expenses">
          <IconWrapper layout={layout}><AtmIcon /></IconWrapper>
          <TextWrapper layout={layout}>
            <Title layout={layout}>Total Expenses</Title>
            <Amount layout={layout}>{formatAmount(summaryData.expenses)}</Amount>
          </TextWrapper>
        </BoxContainer>
      )}
      {visibleBoxes.includes('savings') && (
        <BoxContainer layout={layout} boxType="savings">
          <IconWrapper layout={layout}><SavingsIcon /></IconWrapper>
          <TextWrapper layout={layout}>
            <Title layout={layout}>Total Savings</Title>
            <Amount layout={layout}>{formatAmount(summaryData.savings)}</Amount>
          </TextWrapper>
        </BoxContainer>
      )}
    </SummaryContainer>
  );
};

export default SummaryBox;