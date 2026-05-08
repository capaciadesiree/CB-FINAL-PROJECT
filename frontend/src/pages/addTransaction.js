import React from 'react';
import styled from 'styled-components';
import Sidebar from '../Components/sidebar';
import Header from '../Components/header';
import TxnForm from '../Components/txnForm';
import TxnList from '../Components/txnList';
import SummaryBox from '../Components/summaryBox';

const AddTxnContainer = styled.div`
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr); 
  grid-template-rows: auto auto minmax(0, 1fr) auto; 
  height: 100vh;
  gap: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.dashboardBackground};
  color: ${({ theme }) => theme.textColor};
  box-sizing: border-box;
`;

const SidebarWrapper = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
`;

const HeaderWrapper = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  height: 80px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
  padding: 0 20px;
  min-width: 0;
`;

const TxnFormWrapper = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: flex;
  gap: 20px;
  min-width: 0;
  // Make forms take 50% width each
  & > * {
    flex: 1;
    min-width: 0;
  }
`;

const TxnListWrapper = styled.div`
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  display: flex;
  gap: 20px;
  min-height: 0; // Allows scrolling inside lists
  min-width: 0;
  // Make lists take 50% width each
  & > * {
    flex: 1;
    height: 100%; // Force lists to fill height
    min-width: 0;
  }
`;

const SummaryWrapper = styled.div`
  grid-column: 2 / 3;
  grid-row: 4 / 5;
  display: flex;
  min-width: 0;
`;


const AddTransaction = () => {
  return (
    <AddTxnContainer>
      <SidebarWrapper>
        <Sidebar  />
      </SidebarWrapper>

      <HeaderWrapper>
        <Header showGreeting={false} />
      </HeaderWrapper>
      
      <TxnFormWrapper>
        <TxnForm
          title="Add new income" 
          buttonText="Add Income" 
          placeholder="Type of Income (e.g., Salary)" 
        />
        <TxnForm 
          title="Add new expense" 
          buttonText="Add Expense" 
          placeholder="Type of Expense (e.g., Rent)" 
        />
      </TxnFormWrapper>

      <TxnListWrapper>
        <TxnList type="income" />
        <TxnList type="expense" />
      </TxnListWrapper>

      <SummaryWrapper>
        <SummaryBox layout='horizontal' visibleBoxes={['income', 'expenses']} />
      </SummaryWrapper>

    </AddTxnContainer>
  );
};
 
export default AddTransaction;