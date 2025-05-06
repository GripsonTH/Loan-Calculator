export default function useEmiCalculator({ loanAmount, annualRate, tenureMonths }) {
    if (!loanAmount || !annualRate || !tenureMonths) return { emi: 0, table: [] };
  
    const r = annualRate / (12 * 100); // Monthly interest rate
    const emi = loanAmount * r * Math.pow(1 + r, tenureMonths) / (Math.pow(1 + r, tenureMonths) - 1);
    const totalPayment = emi * tenureMonths;
  
    let balance = loanAmount;
    const table = [];
  
    for (let i = 1; i <= tenureMonths; i++) {
      const interest = balance * r;
      const principal = emi - interest;
      balance -= principal;
  
      table.push({
        month: i,
        emi: emi.toFixed(2),
        interest: interest.toFixed(2),
        principal: principal.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : '0.00',
      });
    }
  
    return {
      emi: emi.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: (totalPayment - loanAmount).toFixed(2),
      table,
    };
  }
  