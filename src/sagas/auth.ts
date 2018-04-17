import { call, put, takeLatest } from 'redux-saga/effects';
import * as ACTION_TYPES from '../constants/actionTypes';
import * as API from '../api/user';
import { get } from 'lodash';

import { AppActionInterface } from './../actions';
import { auth } from '../firebase';
import { UserInterface } from '../reducers';

const firebaseAuth = auth();

export function* signIn(action: AppActionInterface) {
  try {
    const authData = yield call([firebaseAuth, firebaseAuth.signInWithPopup], get(action, 'payload.provider'));

    if (authData.additionalUserInfo && authData.user) {
      const userData: UserInterface = {
        uid: get(authData, 'user.uid'),
        email: get(authData, 'user.email'),
        displayName: get(authData, 'user.displayName'),
        photoURL: get(authData, 'user.photoURL'),
        providerId: get(authData, 'additionalUserInfo.providerId'),
        creationTime: get(authData, 'user.metadata.creationTime'),
        lastSignInTime: get(authData, 'user.metadata.lastSignInTime'),
      };

      yield call(API.setUser, userData);

      yield put({ type: ACTION_TYPES.AUTH_SUCCESS, payload: get(authData, 'credential.accessToken') });

      yield put({ type: ACTION_TYPES.SIGNIN_SUCCESS, payload: userData } as AppActionInterface);

      const { history, redirect } = action.payload;
      if (history && redirect) {
        history.push(redirect);
      }
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
  } catch (error) {
    yield put({ type: ACTION_TYPES.SIGNOUT_FAILURE } as AppActionInterface);
  }
}

export function* watchSignOut() {
  yield takeLatest(ACTION_TYPES.SIGNOUT, signOut);
}
