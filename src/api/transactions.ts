import * as firebase from 'firebase';
import  { db } from './../firebase';
import { TransactionInterface, UserInterface } from '../reducers';

export const createTransaction = (transaction: TransactionInterface, currentUser: UserInterface): Promise<any> => {
  const key = db.ref().child('transactions').push().key;
  return firebase.database().ref('transactions').update({
    [`${currentUser.uid}/${key}`]: transaction,
  });
};

export const getTransactions = (currentUser: UserInterface) => {
  return firebase.database().ref(`transactions/${currentUser.uid}`);
};

export default createTransaction;