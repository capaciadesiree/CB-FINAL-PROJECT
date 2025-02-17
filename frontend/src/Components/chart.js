import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled, { useTheme } from 'styled-components';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import axios from 'axios';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale);

const Container = styled.div`
  padding: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
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
  height: 90%;
  max-width:800px;
  margin: 0 auto;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  min-height: 200px;

  h3 {
    margin-bottom: 1rem;
    color: ${props => props.theme.textColor};
  }

  p {
    color: ${props => props.theme.textColor};
  }
`;

const LineChart = () => {
  const theme = useTheme();
  const chartRef = useRef(null);
  
  // State
  const [dataType, setDataType] = useState('Income');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('6');  // Store as number of months
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState({
    Income: { 
      labels: [], 
      data: [] 
    },
    Expenses: { 
      labels: [], 
      data: [] 
    },
    Savings: { 
      labels: [], 
      data: [] 
    }
  });

  // Colors
  const colorMapping = {
    Income: '#52A6D8',
    Expenses: '#FD7543',
    Savings: '#3DBBBF'
  };

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get both income and expense data
        const [incomeRes, expenseRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/api/get-income`, { withCredentials: true }),
          axios.get(`${process.env.REACT_APP_API_URL}/api/get-expense`, { withCredentials: true })
          
          // dev
          // axios.get('http://localhost:4000/api/get-income', { withCredentials: true }),
          // axios.get('http://localhost:4000/api/get-expense', { withCredentials: true })
        ]);

        // Process the data
        const processedData = processTransactionData(incomeRes.data, expenseRes.data);
        setChartData(processedData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        // Set empty data on error
        setChartData({
          Income: { 
            labels: [], 
            data: [] 
          },
          Expenses: { 
            labels: [], 
            data: [] 
          },
          Savings: { 
            labels: [], 
            data: [] 
          }
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timeRange]); // Refetch when timeRange changes

  // Process transaction data into chart format
  const processTransactionData = (incomeData, expenseData) => {
    // Get date range
    const monthsToShow = parseInt(timeRange);
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setMonth(endDate.getMonth() - monthsToShow);

    // Generate labels (by months)
    const labels = Array.from({ length: monthsToShow }, (_, i) => {
      const date = new Date(endDate);
      date.setMonth(date.getMonth() - (monthsToShow - 1 - i));
      return date.toLocaleString('default', { month: 'short' });
    });

    // Initialize monthly totals
    const monthlyIncome = new Array(monthsToShow).fill(0);
    const monthlyExpense = new Array(monthsToShow).fill(0);

    // Process income
    incomeData.forEach(income => {
      const date = new Date(income.date);
      const monthIndex = Math.floor((date - startDate) / (1000 * 60 * 60 * 24 * 30));
      if (monthIndex >= 0 && monthIndex < monthsToShow) {
        monthlyIncome[monthIndex] += income.amount;
      }
    });

    // Process expenses
    expenseData.forEach(expense => {
      const date = new Date(expense.date);
      const monthIndex = Math.floor((date - startDate) / (1000 * 60 * 60 * 24 * 30));
      if (monthIndex >= 0 && monthIndex < monthsToShow) {
        monthlyExpense[monthIndex] += expense.amount;
      }
    });

    // Calculate savings
    const monthlySavings = monthlyIncome.map((income, index) => 
      income - monthlyExpense[index]
    );

    return {
      Income: { labels, data: monthlyIncome },
      Expenses: { labels, data: monthlyExpense },
      Savings: { labels, data: monthlySavings }
    };
  };

  // Chart configuration
  const data = {
    labels: chartData[dataType].labels,
    datasets: [{
      label: dataType,
      data: chartData[dataType].data,
      fill: true,
      backgroundColor: colorMapping[dataType],
      borderColor: colorMapping[dataType],
      pointBorderColor: colorMapping[dataType],
      pointBackgroundColor: colorMapping[dataType],
      tension: 0.3,
      pointRadius: 2,
      pointHoverRadius: 4,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: theme.componentBackground,
        titleColor: theme.textColor,
        borderColor: theme.borderColor,
        borderWidth: 0.2,
        bodyColor: theme.textColor,
        font: { size: 14 },
        callbacks: {
          label: function(context) {
            return `$${context.raw.toFixed(2)}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: theme.textColor }
      },
      y: {
        beginAtZero: true,
        grid: { color: theme.textColor },
        ticks: {
          color: theme.textColor,
          font: { size: 14 },
          callback: function(value) {
            return '$' + value;
          }
        }
      }
    }
  };

  // Event handlers
  const handleDataTypeChange = (value) => {
    setDataType(value);
    setIsDropdownOpen(false);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  return (
    <Container theme={theme}>
      {isLoading && (
        <div>Loading chart data...</div>
      )}

      {!isLoading && chartData[dataType].data.length === 0 && (
        <EmptyState>
          <h3>No {dataType.toLowerCase()} data available</h3>
          <p>Add some transactions to see your {dataType.toLowerCase()} chart</p>
        </EmptyState>
      )}

      {!isLoading && chartData[dataType].data.length > 0 && (
        <>
          <TitleContainer>
            <TitleDropdown onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {dataType} <ArrowDownIcon />
            </TitleDropdown>
            {isDropdownOpen && (
              <DropdownMenu>
                <option onClick={() => handleDataTypeChange('Income')}>Income</option>
                <option onClick={() => handleDataTypeChange('Expenses')}>Expenses</option>
                <option onClick={() => handleDataTypeChange('Savings')}>Savings</option>
              </DropdownMenu>
            )}
            <TimeRangeContainer>
              <TimeRangeLabel>Filtered by:</TimeRangeLabel>
              <TimeRangeSelect
                value={timeRange}
                onChange={handleTimeRangeChange}
              >
                <option value="6">Last 6 Months</option>
                <option value="3">Last 3 Months</option>
              </TimeRangeSelect>
            </TimeRangeContainer>
          </TitleContainer>
          <ChartContainer>
            <Line ref={chartRef} data={data} options={options} />
          </ChartContainer>
        </>
      )}
    </Container>
  );
};

export default LineChart;