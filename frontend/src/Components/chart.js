import React, { useState } from 'react';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale);

const Container = styled.div`
  padding: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const TitleDropdown = styled.h2`
  margin: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.textColor};
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: ${({ theme }) => theme.componentBackground};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;

  & > option {
    padding: 10px;
    cursor: pointer;
    color: ${({ theme }) => theme.textColor};
    border: none;
  }
`;

const TimeRangeContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TimeRangeLabel = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.textColor};
  margin-right: 10px;
`;

const TimeRangeSelect = styled.select`
  background-color: ${({ theme }) => theme.componentBackground};
  color: ${({ theme }) => theme.textColor};
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const ChartContainer = styled.div`
  width: 100%;
  max-width:800px;
  margin: 0 auto;
`;

const LineChart = ({ theme }) => {
  // state variables
  const [dataType, setDataType] = useState('Income'); // stores current data type (income, expenses, savings)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // manages dropdown state (open/close)
  const [timeRange, setTimeRange] = useState('6 Months'); // stores current time range (by month)

  // chart data & style
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: dataType,
        data: dataType === 'Income' ? [3000, 4000, 3200, 4500, 4800, 5300] :
              dataType === 'Expenses' ? [2500, 3000, 2800, 3500, 3700, 3900] :
              [500, 1000, 400, 1000, 1100, 1400],
        fill: false,
        backgroundColor: '#3498db',
        borderColor: '#3498db',
        pointBorderColor: '#3498db',
        pointBackgroundColor: '#3498db',
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#3498db',
        titleColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        bodyColor: "#ddd",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        // x-axis label
        ticks: {
          color: '#E1E0E6',
          stepSize: 400
        },
      },
      y : {
        beginAtZero: true,
        grid: {
          color: '#E1E0E6',
        },
        // y-axis label
        ticks: {
          color: '#E1E0E6',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  // handles the change in data type from title dropdown
  const handleDataTypeChange = (value) => {
    setDataType(value);
    setIsDropdownOpen(false); // auto close after selection
  };

  // handles dropdown open/close state of title
  const handleTitleClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // handles the changed in time range (filter by) dropdown
  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
    // Modify labels and data based on the selected time range
    // Example: adjust data to show last 3 months or last month
  };

  return (
    <Container theme={theme}>
      <TitleContainer>
        <TitleDropdown onClick={handleTitleClick}>
          {dataType} ▾
        </TitleDropdown>
        {isDropdownOpen && (
          <DropdownMenu>
            <option onClick={() => handleDataTypeChange('Income')}>Income</option>
            <option onClick={() => handleDataTypeChange('Expenses')}>Expenses</option>
            <option onClick={() => handleDataTypeChange('Savings')}>Savings</option>
          </DropdownMenu>
        )}
      </TitleContainer>

      <TimeRangeContainer>
        <TimeRangeLabel htmlFor="timeRangeSelect">Filtered by:</TimeRangeLabel>

        <TimeRangeSelect
          id="TimeRangeSelect"
          value={timeRange}
          onChange={handleTimeRangeChange} // call handleTimeRangeChange on dropdown change
        >
          <option value="6 Months">Last 6 Months</option>
          <option value="2 Months">Last 3 Months</option>
          <option value="1 Month">Last 1 Month</option>
        </TimeRangeSelect>
      </TimeRangeContainer>
  
      <ChartContainer>
        <Line data={data} options={options} />
      </ChartContainer>
    </Container>
  );
};

export default LineChart;