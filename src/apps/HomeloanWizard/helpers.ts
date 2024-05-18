export interface LoanData {
  homeValue: number,
  downPayment: number,
  loanAmount: number,
  loanTerm: number,
  interestRate: number
}

export const DefaultValue: LoanData = {
  homeValue: 30,
  downPayment: 30 * 0.2,
  loanAmount: 30 * 0.8,
  loanTerm: 10,
  interestRate: 10,
}

export const fixInt = (num: number): number => {
  return parseFloat(num.toFixed(0))
}