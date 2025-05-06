import { useEffect, useContext } from 'react';
import axios from 'axios';
import { LoanContext } from '../context/LoanContext';


const useExchangeRates = () => {
  const { setExchangeRates } = useContext(LoanContext);


  useEffect(() => {
    const fetchRates = async () => {
      try {
        const { data } = await axios.get(
          'https://v6.exchangerate-api.com/v6/fcf8fc31a9632007093107d7/latest/USD'
        );
        setExchangeRates(data.conversion_rates);
      } catch (err) {
        console.error('Failed to fetch exchange rates', err);
      }
    };

    fetchRates();
  }, [setExchangeRates]);
};

export default useExchangeRates;
