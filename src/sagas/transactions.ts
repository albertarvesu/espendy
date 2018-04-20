import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import * as ACTION_TYPES from '../constants/actionTypes';
import * as API from './../api/transactions';
import { AppActionInterface } from '../actions';
import { selectCurrentUser } from '../selectors/user';
import { selectUserSettings } from '../selectors/settings';
import { UserInterface, SettingsInterface } from '../models';
import { eventChannel } from 'redux-saga';

export function* createTransaction(action: AppActionInterface) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const { transaction, redirect, history } = action.payload;

    yield call(API.createTransaction, transaction, currentUser);

    yield put({ type: ACTION_TYPES.CREATE_TRANSACTION_SUCCESS } as AppActionInterface);

    if (redirect && history) {
      history.push(redirect);
    }

  } catch (error) {
    yield put({ type: ACTION_TYPES.CREATE_TRANSACTION_FAILURE, payload: error.message } as AppActionInterface);
  }
}

export function* watchCreateTransaction() {
  yield takeLatest(ACTION_TYPES.CREATE_TRANSACTION, createTransaction);
}

function fetchTransactions(currentUser: UserInterface, settings: SettingsInterface) {
  const listener: any = eventChannel(emit => {
    API.getTransactions(currentUser, settings).on('value', (snap: any) => {
      return snap.val() && emit(snap.val());
    });
    return () => API.getTransactions(currentUser, settings).off(listener);
  });
  return listener;
}

export function* getTransactions(action: AppActionInterface) {
  try {
    const currentUser: UserInterface = action.payload;
    const settings: SettingsInterface = yield select(selectUserSettings);
    const listener = yield call(fetchTransactions, currentUser, settings);
    while (true) {
      const transactions = yield take(listener);
      if (transactions) {
        yield put({
          type: ACTION_TYPES.GET_TRANSACTIONS_SUCCESS,
          payload: transactions,
        });
      }
    }
  } catch (error) {
    yield put({ type: ACTION_TYPES.GET_TRANSACTIONS_FAILURE, payload: error.message } as AppActionInterface);
  }
}

export function* watchGetTransactions() {
  yield takeLatest(ACTION_TYPES.GET_TRANSACTIONS, getTransactions);
}

export function* deleteTransaction(action: AppActionInterface) {
  try {
    const currentUser = yield select(selectCurrentUser);

    yield call(API.deleteTransaction, action.payload, currentUser);

    yield put({ type: ACTION_TYPES.CREATE_TRANSACTION_SUCCESS } as AppActionInterface);

  } catch (error) {
    yield put({ type: ACTION_TYPES.DELETE_TRANSACTION_FAILURE, payload: error.message } as AppActionInterface);
  }
}

export function* watchDeleteTransactions() {
  yield takeLatest(ACTION_TYPES.DELETE_TRANSACTION, deleteTransaction);
}