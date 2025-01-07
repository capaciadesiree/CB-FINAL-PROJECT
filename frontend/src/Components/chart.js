import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled, { useTheme } from 'styled-components';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
// import axios from 'axios';

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
  max-width:800px;
  margin: 0 auto;
`;

const LineChart = () => {
  // state variables
  const theme = useTheme(); // access theme from styled-components
  const [dataType, setDataType] = useState('Income'); // stores current data type (income, expenses, savings)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // manages dropdown state (open/close)
  const [timeRange, setTimeRange] = useState('6 Months'); // stores current time range (by month)
  const [apiData, setApiData] = useState([{ labels: [], data: [] }]); // state to store API data
  // const [filteredData, setFilteredData] = useState({ labels: [], data: [] }); // state to store filtered data
  const chartRef = useRef(null);
  const useSampleData = true; // toggle this to switch between sample to API data

  // color map by dataType
  const colorMapping = {
    Income: '#52A6D8',
    Expenses: '#FD7543',
    Savings: '#3DBBBF'
  };

  /*
  //funtion to fetch chart data from API
  const fetchChartData = async () => {
    try {
      const response = await axios.get('replace_with_api_endpoint');
      setApiData(response.data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    if (!useSampleData) {
      fetchChartData();
    }
  }, [useSampleData]);
  */

  // sample data for testing
  const sampleData = {
    Income: { 
      labels: ['January', 'February', 'March', 'April', 'May', 'June'], 
      data: [3000, 4000, 3200, 4500, 4800, 5300]
    }, 
    Expenses: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'], 
      data: [500, 1000, 400, 1000, 1100, 1400] 
    },

    Savings: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'], 
      data: [1500, 3000, 2500, 3500, 4000, 3200]
    }
  };

  /*
  // function to filter data based on time range
  const filterDataByTimeRange = (data) => {
    let filteredLabels = []; 
    let filteredData = [];

    switch (timeRange) {
      case '1 Month':
        filteredLabels = data.labels.slice(-1);
        filteredData = data.data.slice(-1);
        break;
      case '3 Months':
        filteredLabels = data.labels.slice(-2);
        filteredData = data.data.slice(-2);
        break;
      case '6 Months':
      default:
        filteredLabels = data.labels;
        filteredData = data.data;
        break;
    }

    return { label: filteredLabels, data: filteredData };
  };
  */

  // determine which data to use (API or sample)
  const chartData = useSampleData ? sampleData[dataType] : apiData;
  
  /*
  useEffect(() => {
    setFilteredData(filterDataByTimeRange(chartData));
  }, [timeRange, chartData]);
  */

  // chart data & style
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: dataType,
        data: chartData.data,
        fill: true,
        backgroundColor: colorMapping[dataType],
        borderColor: colorMapping[dataType],
        pointBorderColor: colorMapping[dataType],
        pointBackgroundColor: colorMapping[dataType],
        tension: 0.3,
        pointRadius: 2,
        pointHoverRadius: 4,
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
      // appear when hovering over data points
      tooltip: {
        enabled: true,
        backgroundColor: theme.componentBackground,
        titleColor: theme.textColor,
        borderColor: theme.borderColor,
        borderWidth: 0.2,
        bodyColor: theme.textColor,
        font: {
          size: 14,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: theme.textColor,
        },
        // x-axis label
        ticks: {
          color: theme.textColor,
          stepSize: 400
        },
      },
      y : {
        beginAtZero: true,
        grid: {

          color: theme.textColor,
        },
        // y-axis label
        ticks: {
          color: theme.textColor,
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
    // setFilteredData(filterDataByTimeRange(sampleData[value])); // update filtered data on data type change
  };

  // handles dropdown open/close state of title
  const handleTitleClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // handles the changed in time range (filter by) dropdown
  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
    // setFilteredData(filterDataByTimeRange(chartData)); // update filtered data on time range change
    // Modify labels and data based on the selected time range
    // Example: adjust data to show last 3 months or last month
  };

  return (
    <Container theme={theme}>
      <TitleContainer>
        <TitleDropdown onClick={handleTitleClick}>
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
      </TitleContainer>

  
      <ChartContainer>
        <Line ref={chartRef} data={data} options={options} />
      </ChartContainer>
    </Container>
  );
};

export default LineChart;