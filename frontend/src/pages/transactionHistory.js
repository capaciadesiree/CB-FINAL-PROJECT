import React from 'react';
import styled from 'styled-components';
import Sidebar from '../Components/sidebar';
import Header from '../Components/header';
import TxnHistory from '../Components/txnHistory';
import Chart from '../Components/chart';


const TxnHistoryContainer = styled.div`
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  grid-template-rows: auto 40% minmax(0, 1fr);
  height: 100vh;
  gap: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.dashboardBackground};
  color: ${({ theme }) => theme.textColor};
  box-sizing: border-box;
`;

const SidebarWrapper = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 4;
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

const ChartWrapper = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
  min-height: 0;
  min-width: 0;
`;

const TxnWrapper = styled.div`
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  padding: 20px;
  border-radius: 10px;
  overflow-y: auto;
  overflow-x: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
  min-width: 0;
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