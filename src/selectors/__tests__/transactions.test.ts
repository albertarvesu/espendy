import * as moment from 'moment';
import { AppStateInterface, TransactionStateInterface } from '../../reducers';
import {
  selectTransactions,
  selectExpensesTransactions,
  selectIncomeTransactions,
  selectTotalIncome,
  selectTotalExpenses,
  selectCurrentBalance,
  selectExpensesTransactionsByDate,
  selectIncomeTransactionsByDate,
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
            date: new Date('2018-04-18T04:40:08.013Z').getTime(),
            type: 'income'
          },
          '-LAHwbDeLX5lUILEocrqt': {
            amount: 250,
            category: 'sal',
            date: new Date('2018-04-15T04:40:08.013Z').getTime(),
            type: 'income'
          },
          '-LAHwmea40e1USxfCJZe': {
            amount: 2000,
            category: 'hrm',
            date: new Date('2018-04-10T04:40:08.013Z').getTime(),
            type: 'expenses'
          }
        },
      },
    };
    expect(selectExpensesTransactions(appState)).toEqual([{
      amount: 2000,
      category: 'hrm',
      date: new Date('2018-04-10T04:40:08.013Z').getTime(),
      type: 'expenses'
    }]);
    expect(selectIncomeTransactions(appState)).toEqual([{
      amount: 5600,
      category: 'sal',
      date: new Date('2018-04-18T04:40:08.013Z').getTime(),
      type: 'income'
    }, {
      amount: 250,
      category: 'sal',
      date: new Date('2018-04-15T04:40:08.013Z').getTime(),
      type: 'income'
    }]);
    expect(
      selectExpensesTransactionsByDate(appState, undefined, undefined, moment('2018-04-18T04:40:08.013Z'))
    ).toEqual({
      'Apr 01': 0,
      'Apr 02': 0,
      'Apr 03': 0,
      'Apr 04': 0,
      'Apr 05': 0,
      'Apr 06': 0,
      'Apr 07': 0,
      'Apr 08': 0,
      'Apr 09': 0,
      'Apr 10': 2000,
      'Apr 11': 0,
      'Apr 12': 0,
      'Apr 13': 0,
      'Apr 14': 0,
      'Apr 15': 0,
      'Apr 16': 0,
      'Apr 17': 0,
      'Apr 18': 0,
    });
    expect(
      selectIncomeTransactionsByDate(appState, undefined, undefined, moment('2018-04-18T04:40:08.013Z'))
    ).toEqual({
      'Apr 01': 0,
      'Apr 02': 0,
      'Apr 03': 0,
      'Apr 04': 0,
      'Apr 05': 0,
      'Apr 06': 0,
      'Apr 07': 0,
      'Apr 08': 0,
      'Apr 09': 0,
      'Apr 10': 0,
      'Apr 11': 0,
      'Apr 12': 0,
      'Apr 13': 0,
      'Apr 14': 0,
      'Apr 15': 250,
      'Apr 16': 0,
      'Apr 17': 0,
      'Apr 18': 5600,
    });
    expect(selectTotalIncome(appState)).toEqual(5850);
    expect(selectTotalExpenses(appState)).toEqual(2000);
    expect(selectCurrentBalance(appState)).toEqual(3850);
  });
});