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
  grid-template-columns: 250px minmax(0, 1fr) 280px;
  grid-template-rows: auto 40% minmax(0, 1fr);
  height: 100vh;
  gap: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.dashboardBackground};
  color: ${({ theme }) => theme.textColor};
  box-sizing: border-box;
`;
  
  const SidebarWrapper = styled.div`
  grid-column: 1/2;
  grid-row: 1/4;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
  overflow: hidden;
`;
  
const HeaderWrapper = styled.div`
  grid-column: 2/4;
  grid-row: 1/2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
  padding: 0 20px; // Internal padding
  height: 80px;
  min-width: 0;
`;

const ChartWrapper = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
  padding: 20px;
  min-height: 0;
  min-width: 0;
`;

const SummaryWrapper = styled.div`
  grid-column: 3/4;
  grid-row: 2/3;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  min-width: 0;
`;

const TxnWrapper = styled.div`
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
  padding: 20px;
  overflow-y: auto;
  overflow-x: auto;
  min-width: 0;
`;

const NotesWrapper = styled.div`
  grid-column: 3 / 4;
  grid-row: 3 / 4;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.componentBackground};
  padding: 20px;
  overflow-y: auto;
  min-width: 0;
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