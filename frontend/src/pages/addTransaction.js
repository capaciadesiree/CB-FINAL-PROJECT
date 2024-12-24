import React from 'react';
import styled from 'styled-components';
import Sidebar from '../Components/sidebar';
import Header from '../Components/header';
import TxnForm from '../Components/txnForm';
import TxnList from '../Components/txnList';
import SummaryComponent from '../Components/summaryBox';

const AddTxnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto 1fr 1fr;
  height: 100vh;
  gap: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.dashboardBackground};
  color: ${({ theme }) => theme.textColor};
`;

const SidebarWrapper = styled.div`
  grid-column: 1/2;
  grid-row: 1/4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
`;

const HeaderWrapper = styled.div`
  grid-column: 2/6;
  grid-row: 1/2;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
`;

const TxnFormWrapper = styled.div`
  grid-column: 2/6;
  grid-row: 2/3;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: flex-start;
`;

const TxnListWrapper = styled.div`
  grid-column: 2/6;
  grid-row: 3/4;
  display: flex;
  height: 130px;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

const SummaryWrapper = styled.div`
  grid-column: 2/6;
  grid-row: 4/5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
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
        <TxnForm title="Add new income" buttonText="Add Income" placeholder="Type of Income (e.g., Salary)" />
        <TxnForm title="Add new expense" buttonText="Add Expense" placeholder="Type of Expense (e.g., Rent)" />
      </TxnFormWrapper>

      <TxnListWrapper>
        <TxnList category="Income" />
        <TxnList category="Expense" />
      </TxnListWrapper>

      <SummaryWrapper>
        <SummaryComponent layout='horizontal' visibleBoxes={['income', 'expenses', 'savings']} />
      </SummaryWrapper>

    </AddTxnContainer>
  );
};
 
export default AddTransaction;