import { AppStateInterface, TransactionStateInterface } from '../../reducers';
import {
  selectTransactions,
  selectExpensesTransactions,
  selectIncomeTransactions,
  selectTotalIncome,
  selectTotalExpenses,
  selectCurrentBalance,
} from '../transactions';

const defaultState: AppStateInterface  = {
  transactions: {
    hasError: false,
    isFetching: false,
    isUpdating: false,
    error: '',
  } as TransactionStateInterface,
};

describe('Testing Selector Transaction', () => {
  it('returns default transaction', () => {
    const expected = defaultState.transactions;
    const actual = selectTransactions(defaultState);
    expect(actual).toEqual(expected);
  });
  it('returns correct transactions value', () => {
    const appState: AppStateInterface  = {
      transactions: {
        hasError: false,
        isFetching: false,
        isUpdating: false,
        error: '',
        data: {
          '-LAHwbDeLX5lUILEocrq': {
            amount: 5600,
            category: 'sal',
            type: 'income'
          },
          '-LAHwbDeLX5lUILEocrqt': {
            amount: 250,
            category: 'sal',
            type: 'income'
          },
          '-LAHwmea40e1USxfCJZe': {
            amount: 2000,
            category: 'hrm',
            type: 'expenses'
          }
        },
      },
    };
    expect(selectExpensesTransactions(appState)).toEqual([{
      amount: 2000,
      category: 'hrm',
      type: 'expenses'
    }]);
    expect(selectIncomeTransactions(appState)).toEqual([{
      amount: 5600,
      category: 'sal',
      type: 'income'
    }, {
      amount: 250,
      category: 'sal',
      type: 'income'
    }]);
    expect(selectTotalIncome(appState)).toEqual(5850);
    expect(selectTotalExpenses(appState)).toEqual(2000);
    expect(selectCurrentBalance(appState)).toEqual(3850);
  });
});