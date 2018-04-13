import { call, put, takeLatest } from 'redux-saga/effects';
import * as ACTION_TYPES from '../constants/actionTypes';
import { get } from 'lodash';

import { AppActionInterface } from './../actions';
import { auth } from '../firebase';

const firebaseAuth = auth();

export function* signIn(action: AppActionInterface) {
  try {
    const authData = yield call([firebaseAuth, firebaseAuth.signInWithPopup], get(action, 'payload.provider'));

    if (get(authData, 'additionalUserInfo.profile')) {
      yield put(
        {
          type: ACTION_TYPES.SIGNIN_SUCCESS,
          payload: {
            profile: authData.additionalUserInfo.profile,
            credential: authData.credential
          }
        } as AppActionInterface
      );

      const { redirect, history } = action.payload;
      history.push(redirect);
    } else {
      yield put({ type: ACTION_TYPES.SIGNIN_FAILURE, payload: authData } as AppActionInterface);
    }
  } catch (error) {
    yield put({ type: ACTION_TYPES.SIGNIN_FAILURE, payload: error.message } as AppActionInterface);
  }
}

export function* watchSignIn() {
  yield takeLatest(ACTION_TYPES.SIGNIN, signIn);
}

export function* signOut(action: AppActionInterface) {
  try {
    yield call([firebaseAuth, firebaseAuth.signOut]);
    yield put({ type: ACTION_TYPES.SIGNOUT_SUCCESS } as AppActionInterface);
    const { redirect, history } = action.payload;
    history.push(redirect);
  } catch (error) {
    yield put({ type: ACTION_TYPES.SIGNOUT_FAILURE } as AppActionInterface);
  }
}

export function* watchSignOut() {
  yield takeLatest(ACTION_TYPES.SIGNOUT, signOut);
}
