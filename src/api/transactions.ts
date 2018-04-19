import * as firebase from 'firebase';
import { TransactionInterface, UserInterface, SettingsInterface } from '../reducers';

export const createTransaction = (transaction: TransactionInterface, currentUser: UserInterface): Promise<any> =>
  firebase.database().ref('transactions').update({
    [`${currentUser.uid}/${transaction.id}`]: transaction,
  });

export const getTransactions = (currentUser: UserInterface, settings: SettingsInterface) => {
  const ref = firebase.database().ref(`transactions/${currentUser.uid}`).orderByChild('date');
  if (settings.from && settings.to) {
    return ref
      .startAt(settings.from, 'date')
      .endAt(settings.to, 'date');
  }
  return ref;
};

export default createTransaction;