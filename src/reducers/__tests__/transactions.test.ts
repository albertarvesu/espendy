import { TransactionStateInterface } from './../../reducers';
import { transactions } from '../transactions';

describe('Testing Reducer Transactions', () => {
  it('returns default state', () => {
    const state: TransactionStateInterface = {
      hasError: false,
      isFetching: false,
      isUpdating: false,
      error: '',
    };
    const expected = state;
    const actual = transactions(expected, { type: 'DUMMY_ACTION' });
    expect(actual).toEqual(expected);
  });
  it('returns isFetching=true on GET_TRANSACTIONS', () => {
    const state: TransactionStateInterface = {
      hasError: false,
      isFetching: true,
      isUpdating: false,
      error: '',
    };
    const expected = state;
    const actual = transactions(expected, { type: 'GET_TRANSACTIONS' });
    expect(actual).toEqual(expected);
  });
  it('returns isUpdating=true on CREATE_TRANSACTION', () => {
    const state: TransactionStateInterface = {
      hasError: false,
      isFetching: false,
      isUpdating: true,
      error: '',
    };
    const expected = state;
    const actual = transactions(expected, { type: 'CREATE_TRANSACTION' });
    expect(actual).toEqual(expected);
  });
  it('returns isUpdating=false on CREATE_TRANSACTION_SUCCESS', () => {
    const state: TransactionStateInterface = {
      hasError: false,
      isFetching: false,
      isUpdating: false,
      error: '',
    };
    const expected = state;
    const actual = transactions(expected, { type: 'CREATE_TRANSACTION_SUCCESS' });
    expect(actual).toEqual(expected);
  });
  it('set proper transaction data on GET_TRANSACTIONS_SUCCESS', () => {
    const payload = {
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
    };
    const state: TransactionStateInterface = {
      hasError: false,
      isFetching: false,
      isUpdating: false,
      error: '',
      data: payload
    };
    const expected = state;
    const actual = transactions(expected, { type: 'CREATE_TRANSACTION_SUCCESS', payload });
    expect(actual).toEqual(expected);
  });
  it('set errors on failure', () => {
    const payload = 'Error';
    const state: TransactionStateInterface = {
      hasError: true,
      isFetching: false,
      isUpdating: false,
      error: 'Error',
    };
    const expected = state;
    const actual = transactions(expected, { type: 'CREATE_TRANSACTION_FAILURE', payload });
    expect(actual).toEqual(expected);
    expect(actual.error).toEqual('Error');
    expect(actual.hasError).toEqual(true);
  });
  it('resets the state on success signout', () => {
    const state: TransactionStateInterface = {
      hasError: false,
      isFetching: false,
      isUpdating: false,
      error: '',
    };
    const expected = state;
    const actual = transactions(expected, { type: 'SIGNOUT_SUCCESS' });
    expect(actual).toEqual(expected);
  });
});