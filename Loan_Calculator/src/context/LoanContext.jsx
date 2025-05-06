import React, { createContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const LoanContext = createContext();

export const LoanProvider = ({ children }) => {
  // Currency State
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({});

  // Theme State (read from localStorage)
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // MUI Theme object
  const muiTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  // Toggle theme and persist to localStorage
  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  return (
    <LoanContext.Provider value={{
      currency, setCurrency,
      exchangeRates, setExchangeRates,
      mode, setMode,
      toggleTheme
    }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </LoanContext.Provider>
  );
};
