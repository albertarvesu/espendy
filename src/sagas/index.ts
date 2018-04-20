import { fork, all } from 'redux-saga/effects';

import { watchSignIn, watchSignOut } from './auth';

import { watchUpdateSettings } from './settings';

import { watchCreateTransaction, watchGetTransactions, watchDeleteTransactions } from './transactions';

export function* rootSaga() {
  yield all(
    [
      fork(watchSignIn),
      fork(watchSignOut),

      fork(watchUpdateSettings),

      fork(watchCreateTransaction),
      fork(watchGetTransactions),
      fork(watchDeleteTransactions),
    ]
  );
}

export default rootSaga;
