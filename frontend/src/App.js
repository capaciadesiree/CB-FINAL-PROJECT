import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider, useTheme } from './contexts/themeContext';
import { lightTheme, darkTheme } from './utils/themes';
import GlobalStyle from "./styles/GlobalStyle";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import AddTransaction from './pages/addTransaction';
import TransactionHistory from './pages/transactionHistory';

// pages using theme styling
const ThemedApp = () => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          {/* Catch all unknown routes and redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </StyledThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ThemedApp />
      </Router>
    </ThemeProvider>
  );
};

export default App;