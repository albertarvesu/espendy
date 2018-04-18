import * as firebase from 'firebase';
import { TransactionInterface, UserInterface } from '../reducers';

export const createTransaction = (transaction: TransactionInterface, currentUser: UserInterface): Promise<any> =>
  firebase.database().ref('transactions').update({
    [`${currentUser.uid}/${transaction.id}`]: transaction,
  });

export const getTransactions = (currentUser: UserInterface) =>
 firebase.database().ref(`transactions/${currentUser.uid}`).orderByChild('date');

export default createTransaction;