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
  grid-template-rows: auto 1fr auto;
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
  grid-column: 2/4;
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
  grid-column: 2/4;
  grid-row: 2/2;
  padding: 20px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

const TxnListWrapper = styled.div`
  grid-column: 2/4;
  grid-row: 3/3;
  padding: 20px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SummaryWrapper = styled.div`
  grid-column: 2/3;
  grid-row: 4/4;
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
        <TxnList />
      </TxnListWrapper>

      <SummaryWrapper>
        <SummaryComponent layout='vertical' visibleBoxes={['income', 'expenses', 'savings']} />
      </SummaryWrapper>

    </AddTxnContainer>
  );
};
 
export default AddTransaction;