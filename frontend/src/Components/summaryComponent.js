import React from 'react';
import styled from 'styled-components';
import SummaryBox from './summaryBox';

const SummaryContainer = styled.div`
  display: ${({ layout }) => layout === 'horizontal' ? 'flex' : 'block'};
  justify-content: space-around;
  padding: 20px;
`;

const SummaryComponent = ({ layout = 'vertical', visibleBoxes = ['income', 'expenses', 'savings']}) => {
  return (
    <SummaryContainer layout={layout}>
      {visibleBoxes.includes('income') && (
        <SummaryBox title='Total Income' dataKey='income' fullWidth={layout === 'vertical'} />
      )}
      {visibleBoxes.includes('expenses') && (
        <SummaryBox title='Total Expenses' dataKey='expenses' fullWidth={layout === 'vertical'} />
      )}
      {visibleBoxes.includes('savings') && (
        <SummaryBox title='Total Savings' dataKey='savings' fullWidth={layout === 'vertical'} />
      )}
    </SummaryContainer>
  );
};

export default SummaryComponent;