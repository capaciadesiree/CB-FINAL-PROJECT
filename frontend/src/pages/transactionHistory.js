import React from 'react';
import styled from 'styled-components';
import Sidebar from '../Components/sidebar';
import Header from '../Components/header';
import TxnHistory from '../Components/txnHistory';
import Chart from '../Components/chart';


const TxnHistoryContainer = styled.div`
  display: grid;
  // grid-template-columns: 1fr 3fr 1fr;
  // grid-template-rows: auto 1fr auto;
  grid-template-columns: 250px 760px;
  grid-template-rows: 80px 300px 305px;
  // height: 97vh;
  gap: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.dashboardBackground};
  color: ${({ theme }) => theme.textColor};
  overflow: hidden;
`;

const SidebarWrapper = styled.div`
  grid-column: 1/2;
  grid-row: 1/4;
  padding: 20px;
  height: 92vh;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
`;

const HeaderWrapper = styled.div`
  grid-column: 2/4;
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

const ChartWrapper = styled.div`
  grid-column: 2/2;
  grid-row: 2/3;
  width: 123%;
  // height: 36vh;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
`;

const TxnWrapper = styled.div`
  grid-column: 2/2;
  grid-row: 3/4;
  width: 123%;
  height: 42vh;
  padding: 20px;
  border-radius: 10px;
  overflow-y: auto; // Add vertical scroll if content overflows
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
`;

const TransactionHistory = () => {
  return (
    <TxnHistoryContainer>
      <SidebarWrapper>
        <Sidebar  />
      </SidebarWrapper>

      <HeaderWrapper>
        <Header showGreeting={false} />
      </HeaderWrapper>

      <ChartWrapper>
        <Chart  />
      </ChartWrapper>

      <TxnWrapper>
        <TxnHistory  />
      </TxnWrapper>
    </TxnHistoryContainer>
  );
};
 
export default TransactionHistory;