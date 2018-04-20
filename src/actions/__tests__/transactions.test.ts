import * as ACTION_TYPES from './../../constants/actionTypes';
import { TransactionInterface, UserInterface } from '../../models';
import { createTransaction, getTransactions } from '../transactions';

// tslint:disable-next-line:no-empty
const history = { push: () => {} };

describe('Testing transactions actions', () => {
  it('should dispatch proper action upon createTransaction', () => {
    const transaction: TransactionInterface = {
      id: '1',
      amount: 0,
      category: 'abc',
      type: 'income',
    };
    const data = {
      transaction,
      redirect: '/home',
      history,
    };
    const expected = { type: ACTION_TYPES.CREATE_TRANSACTION, payload: data };
    const actual = createTransaction(transaction, '/home', history);
    expect(actual).toEqual(expected);
  });

  it('should dispatch proper action upon getTransactions', () => {
    const currentUser: UserInterface = {
      uid: '123',
      email: 'a@a.com',
    };
    const expected = { type: ACTION_TYPES.GET_TRANSACTIONS, payload: currentUser };
    const actual = getTransactions(currentUser);
    expect(actual).toEqual(expected);
  });
});