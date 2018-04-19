import { get, groupBy, Dictionary, isEmpty } from 'lodash';
import * as moment from 'moment';
import { AppStateInterface, TransactionInterface } from './../reducers';

export const selectTransactions = (state: AppStateInterface) =>
  get(state, 'transactions', {});

export const selectAllTransactions = (state: AppStateInterface): Array<TransactionInterface> => {
  const transactions = get(selectTransactions(state), 'data', []);
  return Object.keys(transactions).map(key => transactions[key])
        .concat()
        .sort((a, b) => b.date - a.date);
};

export const selectExpensesTransactions = (state: AppStateInterface): Array<TransactionInterface> => {
  const transactions = selectAllTransactions(state);
  return transactions.filter(transaction => transaction.type === 'expenses');
};

const calcuateByDate = (
  grouped: Dictionary<TransactionInterface[]>,
  format: string,
  from: moment.Moment = moment().startOf('month'),
  to: moment.Moment = moment(),
): object => {
  if (isEmpty(grouped)) {
    return grouped;
  }
  const withAmt = Object.keys(grouped).reduce(
    (curr, dateStr) => {
      const byDate: Array<TransactionInterface> = grouped[dateStr];
      return {
        ...curr,
        [moment(dateStr).format(format)]:
          byDate.reduce((total, current) => total + current.amount, 0)
      };
    },
    {}
  );

  let dates = {};
  let day = from;
  while (day <= to) {
    const formatted = day.format(format);
    dates = { ...dates, [formatted]: withAmt[formatted] ? withAmt[formatted] : 0 };
    day = day.clone().add(1, 'd');
  }
  return dates;
};

export const selectExpensesTransactionsByDate = (
  state: AppStateInterface,
  format: string = 'MMM DD',
  from: moment.Moment = moment().startOf('month'),
  to: moment.Moment = moment(),
): object => {
  const expenses = selectExpensesTransactions(state).reverse();
  const grouped = groupBy(expenses, expense => moment(expense.date).startOf('day').format());
  return calcuateByDate(grouped, format, from, to);
};

export const selectIncomeTransactions = (state: AppStateInterface): Array<TransactionInterface> => {
  const transactions = selectAllTransactions(state);
  return transactions.filter(transaction => transaction.type === 'income');
};

export const selectIncomeTransactionsByDate = (
  state: AppStateInterface,
  format: string = 'MMM DD',
  from: moment.Moment = moment().startOf('month'),
  to: moment.Moment = moment(),
): object => {
  const incomes = selectIncomeTransactions(state).reverse();
  const grouped = groupBy(incomes, income => moment(income.date).startOf('day').format());
  return calcuateByDate(grouped, format, from, to);
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