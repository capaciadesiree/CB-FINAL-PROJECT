import React from 'react';
import styled from 'styled-components';
import Sidebar from '../Components/sidebar';
import Header from '../Components/header';
import TxnHistory from '../Components/txnHistory';
import Chart from '../Components/chart';
import SummaryBox from '../Components/summaryBox';
import Notepad from '../Components/notepad';

const DashboardContainer = styled.div`
  display: grid;
  // grid-template-columns: 1fr 3fr 1fr;
  // grid-template-rows: auto 1fr auto;
  grid-template-columns: 250px 730px 230px 0px;
  grid-template-rows: 120px 360px 210px;
  // height: 96vh;
  gap: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.dashboardBackground};
  color: ${({ theme }) => theme.textColor};
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
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
`;

const ChartWrapper = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
`;

const SummaryWrapper = styled.div`
  grid-column: 3/3;
  grid-row: 2/3;
  display: flex;
  flex-direction: column;
`;

const TxnWrapper = styled.div`
  grid-column: 2/3;
  grid-row: 3/4;
  padding: 20px;
  height: 85%;
  border-radius: 10px;
  overflow-y: auto; // Add vertical scroll if content overflows
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
`;

const NotesWrapper = styled.div`
  grid-column: 3/4;
  grid-row: 3/4;
  padding: 20px;
  height: 85%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
`;

const Dashboard = () => {
  return (
    <DashboardContainer >
      <SidebarWrapper>
        <Sidebar  />
      </SidebarWrapper>

      <HeaderWrapper>
        <Header showGreeting={true} />
      </HeaderWrapper>

      <ChartWrapper>
        <Chart  />
      </ChartWrapper>

      <SummaryWrapper>
        <SummaryBox layout='vertical' visibleBoxes={['income', 'expenses', 'savings']} />
      </SummaryWrapper>

      <TxnWrapper>
        <TxnHistory  />
      </TxnWrapper>

      <NotesWrapper>
        <Notepad  />
      </NotesWrapper>
    </DashboardContainer>
  );
};

export default Dashboard;