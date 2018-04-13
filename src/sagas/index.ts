import { fork, all } from 'redux-saga/effects';

import { watchSignIn, watchSignOut } from './auth';

export function* rootSaga() {
  yield all(
    [
      fork(watchSignIn),
      fork(watchSignOut),
    ]
  );
}

export default rootSaga;
