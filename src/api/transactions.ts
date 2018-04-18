import * as firebase from 'firebase';
import { TransactionInterface, UserInterface } from '../reducers';

export const createTransaction = (transaction: TransactionInterface, currentUser: UserInterface): Promise<any> => {
  return firebase.database().ref('transactions').update({
    [`${currentUser.uid}/${transaction.id}`]: transaction,
  });
};

export const getTransactions = (currentUser: UserInterface) => {
  return firebase.database().ref(`transactions/${currentUser.uid}`);
};

export default createTransaction;