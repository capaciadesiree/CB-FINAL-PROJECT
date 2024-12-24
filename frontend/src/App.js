import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider, useTheme } from './contexts/themeContext';
import { lightTheme, darkTheme } from './utils/themes';
import GlobalStyle from "./styles/GlobalStyle";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import AddTransaction from './pages/addTransaction';
import TransactionHistory from './pages/transactionHistory';

const ThemedApp = () => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
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