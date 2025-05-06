import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  CircularProgress,
} from '@mui/material';
import useExchangeRates from '../hooks/useExchangeRates';

const ExchangeRate = () => {
  const exchangeRates = useExchangeRates();

  const entries = Object.entries(exchangeRates);
  const rows = [];

  // Group the entries into chunks of 4
  for (let i = 0; i < entries.length; i += 4) {
    rows.push(entries.slice(i, i + 4));
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Live Exchange Rates (Base: USD)
      </Typography>

      {entries.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {row.map(([currency, rate]) => (
                    <TableCell key={currency}>
                      <strong>{currency}:</strong> {rate.toFixed(2)}
                    </TableCell>
                  ))}
                  {/* Fill empty cells if less than 4 items */}
                  {row.length < 4 &&
                    Array.from({ length: 4 - row.length }).map((_, idx) => (
                      <TableCell key={`empty-${idx}`} />
                    ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default ExchangeRate;
