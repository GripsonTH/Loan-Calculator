import React, { useState, useContext  } from 'react';
import { LoanContext } from '../context/LoanContext';
import useExchangeRates from '../hooks/useExchangeRates';
import {
  Container,
  TextField,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  MenuItem,
  Select,
  Box 
} from '@mui/material';

const Home = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const resetTable = () => {
    setEmi(null);
    setSchedule([]);
  };

  useExchangeRates();
  const { currency, setCurrency, exchangeRates } = useContext(LoanContext);
  const convertedEMI = emi && exchangeRates[currency] ? (emi * exchangeRates[currency]).toFixed(2) : null;

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const R = parseFloat(interestRate) / (12 * 100);
    const N = parseInt(loanTerm) * 12;

    if (!P || !R || !N) return;

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(emiValue.toFixed(2));


    // Amortization schedule
    let balance = P;
    const scheduleArray = [];

    for (let i = 1; i <= N; i++) {
      const interest = balance * R;
      const principal = emiValue - interest;
      balance -= principal;

      scheduleArray.push({
        month: i,
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : '0.00',
      });
    }

    setSchedule(scheduleArray);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 2}}>Loan EMI Calculator</Typography>
      <Box display="flex" gap={2} flexWrap="wrap">
      <TextField
        label="Loan Amount"
        type="number"
        //fullWidth
        margin="normal"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
        required
      />

      <TextField
        label="Annual Interest Rate (%)"
        type="number"
        //fullWidth
        margin="normal"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
        required
      />

      <TextField
        label="Loan Term (Years)"
        type="number"
        //fullWidth
        margin="normal"
        value={loanTerm}
        onChange={(e) => setLoanTerm(e.target.value)}
        required
      />
      </Box>

      <Button variant="contained" onClick={calculateEMI} sx={{ mt: 2, mr:3 }}>
        Calculate EMI
      </Button>


      <Select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        sx={{ mt: 2 }}
        >
        {Object.keys(exchangeRates).map((cur) => (
            <MenuItem key={cur} value={cur}>
            {cur}
            </MenuItem>
        ))}
      </Select>

      {convertedEMI && (
        <Typography variant="body1" sx={{ mt: 1 }}>
        EMI in {currency}: {convertedEMI}
         </Typography>
    )}  


      {emi && (
        <>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Monthly EMI: {emi} {currency}
          </Typography>

          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button variant="outlined" color="secondary" onClick={resetTable}>
            Reset Table
            </Button>
          </Box>

          <Typography variant="h6" sx={{ mt: 4 }}>Amortization Schedule</Typography>
          <TableContainer component={Paper} sx={{ mt: 2, maxHeight: 300, overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Month</strong></TableCell>
                  <TableCell><strong>Principal</strong></TableCell>
                  <TableCell><strong>Interest</strong></TableCell>
                  <TableCell><strong>Remaining Balance</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {schedule.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>{row.principal} {currency}</TableCell>
                    <TableCell>{row.interest} {currency}</TableCell>
                    <TableCell>{row.balance} {currency}</TableCell>
                  </TableRow>
                ))} */}
                {schedule.map((row) => {
                const rate = exchangeRates[currency] || 1;
                return (
                  <TableRow key={row.month}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>{(row.principal * rate).toFixed(2)} {currency}</TableCell>
                    <TableCell>{(row.interest * rate).toFixed(2)} {currency}</TableCell>
                    <TableCell>{(row.balance * rate).toFixed(2)} {currency}</TableCell>
                  </TableRow>
                );
              })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default Home;
