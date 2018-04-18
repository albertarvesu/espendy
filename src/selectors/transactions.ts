import { get } from 'lodash';
import { AppStateInterface, TransactionInterface } from './../reducers';

export const selectTransactions = (state: AppStateInterface) =>
  get(state, 'transactions', {});

export const selectAllTransactions = (state: AppStateInterface): Array<TransactionInterface> => {
  const transactions = get(selectTransactions(state), 'data', []);
  return Object.keys(transactions).map(key => transactions[key])
        .concat()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const selectExpensesTransactions = (state: AppStateInterface): Array<TransactionInterface> => {
  const transactions = selectAllTransactions(state);
  return transactions.filter(transaction => transaction.type === 'expenses');
};

export const selectIncomeTransactions = (state: AppStateInterface): Array<TransactionInterface> => {
  const transactions = selectAllTransactions(state);
  return transactions.filter(transaction => transaction.type === 'income');
};

export const selectTotalIncome = (state: AppStateInterface): number => {
  const incomes: Array<TransactionInterface> = selectIncomeTransactions(state);
  return incomes.reduce((total, income) => total + income.amount , 0);
};

export const selectTotalExpenses = (state: AppStateInterface): number => {
  const expenses: Array<TransactionInterface> = selectExpensesTransactions(state);
  return expenses.reduce((total, expense) => total + expense.amount , 0);
};

export const selectCurrentBalance = (state: AppStateInterface): number => {
  const totalIncome: number = selectTotalIncome(state);
  const totalExpenses: number = selectTotalExpenses(state);
  return (totalIncome - totalExpenses);
};

export default selectTransactions;