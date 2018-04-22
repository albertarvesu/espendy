import * as moment from 'moment';
import { AppStateInterface, TransactionStateInterface } from '../../models';
import {
  selectTransactions,
  selectExpensesTransactions,
  selectIncomeTransactions,
  selectTotalIncome,
  selectTotalExpenses,
  selectCurrentBalance,
  selectExpensesTransactionsByDate,
  selectIncomeTransactionsByDate,
  selectAllTransactions,
  calcuateByDate,
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
  it('returns filtered transaction by date', () => {
    const appState: AppStateInterface  = {
      transactions: {
        hasError: false,
        isFetching: false,
        isUpdating: false,
        error: '',
        data: {
          '-LAHwbDeLX5lUILEocrq': {
            id: '-LAHwbDeLX5lUILEocrq',
            amount: 5600,
            isFixed: false,
            category: 'sal',
            date: new Date('2018-04-18T04:40:08.013Z').getTime(),
            type: 'income'
          },
          '-LAHwbDeLX5lUILEocrqt': {
            id: '-LAHwbDeLX5lUILEocrqt',
            amount: 250,
            isFixed: false,
            category: 'sal',
            date: new Date('2018-04-15T04:40:08.013Z').getTime(),
            type: 'income'
          },
          '-LAHwmea40e1USxfCJZe': {
            id: '-LAHwmea40e1USxfCJZe',
            amount: 2000,
            isFixed: false,
            category: 'hrm',
            date: new Date('2018-04-10T04:40:08.013Z').getTime(),
            type: 'expenses'
          }
        },
      },
    };
    const expected = [{
      id: '-LAHwbDeLX5lUILEocrqt',
      amount: 250,
      isFixed: false,
      category: 'sal',
      date: new Date('2018-04-15T04:40:08.013Z').getTime(),
      type: 'income'
    }];
    const actual = selectAllTransactions(appState, moment('2018-04-11T04:40:08.013Z'), moment('2018-04-17T04:40:08.013Z'));
    expect(actual).toEqual(expected);
  });
  it('returns nothing if no transaction within the filtered date', () => {
    const appState: AppStateInterface  = {
      transactions: {
        hasError: false,
        isFetching: false,
        isUpdating: false,
        error: '',
        data: {
          '-LAHwbDeLX5lUILEocrq': {
            id: '-LAHwbDeLX5lUILEocrq',
            amount: 5600,
            isFixed: false,
            category: 'sal',
            date: new Date('2018-04-18T04:40:08.013Z').getTime(),
            type: 'income'
          },
          '-LAHwbDeLX5lUILEocrqt': {
            id: '-LAHwbDeLX5lUILEocrqt',
            amount: 250,
            isFixed: false,
            category: 'sal',
            date: new Date('2018-04-15T04:40:08.013Z').getTime(),
            type: 'income'
          },
          '-LAHwmea40e1USxfCJZe': {
            id: '-LAHwmea40e1USxfCJZe',
            amount: 2000,
            isFixed: false,
            category: 'hrm',
            date: new Date('2018-04-10T04:40:08.013Z').getTime(),
            type: 'expenses'
          }
        },
      },
    };
    const actual = selectAllTransactions(appState, moment('2018-04-11T04:40:08.013Z'), moment('2018-04-14T04:40:08.013Z'));
    expect(actual).toEqual([]);
  });
  it('retuns empty if passing empty', () => {
    const actual = calcuateByDate({}, 'DD MM', moment(), moment());
    expect(actual).toEqual(actual);
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
            id: '-LAHwbDeLX5lUILEocrq',
            amount: 5600,
            isFixed: false,
            category: 'sal',
            date: new Date('2018-04-18T04:40:08.013Z').getTime(),
            type: 'income'
          },
          '-LAHwbDeLX5lUILEocrqt': {
            id: '-LAHwbDeLX5lUILEocrqt',
            amount: 250,
            isFixed: false,
            category: 'sal',
            date: new Date('2018-04-15T04:40:08.013Z').getTime(),
            type: 'income'
          },
          '-LAHwmea40e1USxfCJZe': {
            id: '-LAHwmea40e1USxfCJZe',
            amount: 2000,
            isFixed: false,
            category: 'hrm',
            date: new Date('2018-04-10T04:40:08.013Z').getTime(),
            type: 'expenses'
          }
        },
      },
    };
    expect(selectExpensesTransactions(appState)).toEqual([{
      id: '-LAHwmea40e1USxfCJZe',
      amount: 2000,
      isFixed: false,
      category: 'hrm',
      date: new Date('2018-04-10T04:40:08.013Z').getTime(),
      type: 'expenses'
    }]);
    expect(selectIncomeTransactions(appState)).toEqual([{
      id: '-LAHwbDeLX5lUILEocrq',
      amount: 5600,
      isFixed: false,
      category: 'sal',
      date: new Date('2018-04-18T04:40:08.013Z').getTime(),
      type: 'income'
    }, {
      id: '-LAHwbDeLX5lUILEocrqt',
      amount: 250,
      isFixed: false,
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