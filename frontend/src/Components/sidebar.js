import React from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as LogoutIcon } from '../assets/logout.svg';
import Dashboard from '../pages/dashboard';
import AddTransaction from '../pages/addTransaction';
import TransactionHistory from '../pages/transactionHistory';


const SidebarContainer = styled.div`
  width: 250px;
  height: 90vh;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: bold;

`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;

  svg {
    width: 100%;
    fill: var(--logo-fill);
  }
`;

const NavbarContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const SidebarItem = styled(NavLink)`
  margin: 15px 30px;
  cursor: pointer;
  border-left: 5px solid transparent; // default border
  position: relative;
  text-decoration: none;
  color: ${({ theme }) => theme.textColor};

  &.active {
    &::before {
      content:'';
      position: absolute;
      left: -30px;
      top: 0;
      bottom: 0;
      width: 5px;
      border-left: 5px solid #4BBFBE;
    }
  }
`;

const LogoutContainer = styled.div`
  width: 100%;
`;

const LogoutLink = styled.a`
  text-decoration: none;
  margin: 15px 30px;
  display: flex;
  cursor: pointer;
  align-items: center;
  color: inherit;

  &:hover {
    color: #4BA0BF;
  
    svg {
      --icon-fill: #4BA0BF;
      margin-right: 10px;
      width: 20px;
      height: 20px;
    }
  }

  svg {
    fill: var(--icon-fill);
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }
  
  `;

const Sidebar = () => {
  const navigate = useNavigate();

  // prompt message
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      navigate('/login');
    };
  }

  return (
    <SidebarContainer>
      <LogoContainer>
        <Logo />
      </LogoContainer>

      <NavbarContainer>
        <SidebarItem to="/dashboard" activeClassName="active">Dashboard</SidebarItem>
        <SidebarItem to="/add-transaction" activeClassName="active">Add Transaction</SidebarItem>
        <SidebarItem to="/transaction-history" activeClassName="active">Transaction History</SidebarItem>
      </NavbarContainer>
      
      <LogoutContainer>
        <LogoutLink onClick={handleLogout}>
          <LogoutIcon /> Logout
        </LogoutLink>
      </LogoutContainer>

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
      </Routes>
    </SidebarContainer>
  );
};

export default Sidebar;