import React, { createContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'; //CssBaseline resets the global styles (including body background) to match the current theme.

export const LoanContext = createContext();

export const LoanProvider = ({ children }) => {
  // Currency State
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({});

  // Theme State
  const [mode, setMode] = useState('light');

const theme = createTheme({
  palette: {
    mode: mode,
  },
});

const toggleTheme = () => {
  setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
};


  return (
    <LoanContext.Provider value={{
      currency, setCurrency,  
      exchangeRates, setExchangeRates,
      mode, setMode, toggleTheme
    }}>
       <MuiThemeProvider  theme={theme}>
       <CssBaseline />
        {children}
        </MuiThemeProvider >
    </LoanContext.Provider>
  );
};
