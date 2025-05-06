import { useEffect, useContext } from 'react';
import axios from 'axios';
import { LoanContext } from '../context/LoanContext';


const useExchangeRates = () => {
  const {exchangeRates, setExchangeRates } = useContext(LoanContext);


  useEffect(() => {
    const fetchRates = async () => {
      try {
        const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API; 
        const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
        const { data } = await axios.get(url);

        //console.log(data);
        
        setExchangeRates(data.conversion_rates);
      } catch (err) {
        console.error('Failed to fetch exchange rates', err);
      }
    };

    fetchRates();
  }, [setExchangeRates]);
  return exchangeRates;
};

export default useExchangeRates;
