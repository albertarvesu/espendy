import { call, select, put, takeLatest } from 'redux-saga/effects';
import * as ACTION_TYPES from '../constants/actionTypes';
import { selectCurrentUser } from '../selectors/user';
import * as API from '../api/settings';

import { AppActionInterface } from './../actions';

export function* updateSettings(action: AppActionInterface) {
  try {
    const { settings, history, redirect } = action.payload;
    const currentUser = yield select(selectCurrentUser);

    yield call(API.updateSettings, settings, currentUser);

    yield put({ type: ACTION_TYPES.UPDATE_SETTINGS_SUCCESS, payload: settings } as AppActionInterface);
    
    if (history && redirect) {
      history.push(redirect);
    }
  } catch (error) {
    yield put({ type: ACTION_TYPES.UPDATE_SETTINGS_FAILURE, payload: error.message } as AppActionInterface);
  }
}

export function* watchUpdateSettings() {
  yield takeLatest(ACTION_TYPES.UPDATE_SETTINGS, updateSettings);
}