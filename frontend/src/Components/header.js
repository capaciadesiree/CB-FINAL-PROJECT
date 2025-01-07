import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { ReactComponent as DateIcon } from '../assets/calendar_month.svg';
import { ReactComponent as SunIcon } from '../assets/lightMode.svg';
import { ReactComponent as MoonIcon } from '../assets/darkMode.svg';
import { ReactComponent as UserIcon } from '../assets/account.svg';
import { useTheme } from '../contexts/themeContext';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 80px;
  padding: 20px;
  gap: 300px;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const ThemeToggle = styled.button`
  font-size: 18px;
  font-weight: normal;
  padding: 10px 20px;
  color: ${({ theme }) => theme.textColor};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0;

  svg {
    width: 20%;
    fill: var(--icon-fill);
  }
`;

const Greeting = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 5px;
`;

const Message = styled.div`
  font-size: 18px;
`;

const Placeholder = styled.div`
  width: 120px;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  color: ${({ theme }) => theme.textColor};
  padding: 10px 20px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100px;
  border: none;
  outline: none;
  background-color: transparent;
  margin-left: 5px;
  color: ${({ theme }) => theme.textColor};
  font-weight: normal;
  font-size: 18px;

  &::input {
    font-size: 18px;
  }

  .react-datepicker__input-container input {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
    padding-left: 5px;
  }

  .react-datepicker__input-container input:focus {
    outline: none;
  }
`;

const DateIconWrapper = styled.div`
  svg {
    fill: var(--icon-fill);
    width: 25px;
    height: 25px;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  background-size: cover;
  border: white;
  padding: 10px 20px; 
  gap: 5px;
`;

const UserIconWrapper = styled.div`
  svg {
    fill: var(--icon-fill);
    width: 30px;
    height: 30px;
  }
`;

const Name = styled.div`
  font-size: 18px;
`;

const Header = ({ showGreeting }) => { // added prop in header to show greeting depends on the page
  const { isDarkMode, toggleTheme } = useTheme();
  const [startDate, setStartDate] = useState(new Date());
  
  const handleDateChange = date => {
    setStartDate(date);
  };

  return (
    <HeaderContainer>
      {showGreeting ? (
        <Greeting>
          <UserName>Hi Sabrina,</UserName>
          <Message>Welcome back!</Message>
        </Greeting>
      ) : (
        <Placeholder />
      )}

      <SubContainer>
        <DateWrapper>
          <DateIconWrapper>
            <DateIcon />
          </DateIconWrapper>

          <StyledDatePicker 
            selected={startDate}
            onChange={handleDateChange}
            dateFormat='MM-dd-yyyy'
          />
        </DateWrapper>

        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </ThemeToggle>
        
        <UserProfile>
          <UserIconWrapper>
            <UserIcon />
          </UserIconWrapper>

          <Name>Sabrina</Name>
          {/* need to add api to get User's username */}
        </UserProfile>
      </SubContainer>
    </HeaderContainer>
  );
};
export default Header;