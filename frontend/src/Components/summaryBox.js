import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { eventBus } from '../utils/eventBus';

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
        return '#FFFFFF';
    }
  }};
  color: #FFFFFF;
  display: flex;
  align-items: ${({ layout }) => layout === 'horizontal' ? 'center' : 'flex-start'};
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

const ErrorMessage = styled.div`
  color: #ff0000;
  text-align: center;
  padding: 10px;
  background-color: #ffe6e6;
  border-radius: 5px;
  margin: 10px 0;
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
  // const baseUrl = 'http://localhost:4000/api'; // dev

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
        axios.get(`${baseUrl}/get-income`, { withCredentials: true }),
        axios.get(`${baseUrl}/get-expense`, { withCredentials: true })
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

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <SummaryContainer layout={layout}>
      {loading ? (
        <LoadingOverlay>Loading financial data...</LoadingOverlay>
      ) : (
        <>
          {visibleBoxes.includes('income') && (
            <BoxContainer layout={layout} boxType="income">
              <PaidIcon />
              <Title>Total Income</Title>
              <Amount layout={layout}>{formatAmount(summaryData.income)}</Amount>
            </BoxContainer>
          )}
          {visibleBoxes.includes('expenses') && (
            <BoxContainer layout={layout} boxType="expenses">
              <AtmIcon />
              <Title>Total Expenses</Title>
              <Amount layout={layout}>{formatAmount(summaryData.expenses)}</Amount>
            </BoxContainer>
          )}
          {visibleBoxes.includes('savings') && (
            <BoxContainer layout={layout} boxType="savings">
              <SavingsIcon />
              <Title>Total Savings</Title>
              <Amount layout={layout}>{formatAmount(summaryData.savings)}</Amount>
            </BoxContainer>
          )}
        </>
      )}
    </SummaryContainer>
  );
};

export default SummaryBox;