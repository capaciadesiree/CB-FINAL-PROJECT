import React from 'react';
import styled from 'styled-components';
import Sidebar from '../Components/sidebar';
import Header from '../Components/header';
import TxnForm from '../Components/txnForm';
import TxnList from '../Components/txnList';
import SummaryBox from '../Components/summaryBox';

const AddTxnContainer = styled.div`
  display: grid;
  // grid-template-columns: 1fr 3fr 1fr;
  // grid-template-rows: auto 1fr auto;
  grid-template-columns: 300px 530px 530px 0px;
  grid-template-rows: 80px 300px 340px 130px;
  height: 97vh;
  gap: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.dashboardBackground};
  color: ${({ theme }) => theme.textColor};
`;

const SidebarWrapper = styled.div`
  grid-column: 1/2;
  grid-row: 1/4;
  padding: 20px;
  height: 840px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
`;

const HeaderWrapper = styled.div`
  grid-column: 2/6;
  grid-row: 1/2;
  padding: 20px;
  height: 40px;
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
  height: 300px;
  gap: 10px;
  justify-content: space-between;
  align-items: flex-start;
`;

const TxnListWrapper = styled.div`
  grid-column: 2/6;
  grid-row: 3/4;
  display: flex;
  height: 340px;
  margin-top: 5px;
  // gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

const SummaryWrapper = styled.div`
  grid-column: 2/6;
  grid-row: 4/4;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
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