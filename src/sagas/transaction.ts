import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import * as ACTION_TYPES from '../constants/actionTypes';
import * as API from './../api/transactions';
import { AppActionInterface } from '../actions';
import { selectCurrentUser } from '../selectors/user';
import { UserInterface } from '../reducers';
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

function fetchTransactions(currentUser: UserInterface) {
  const listener: any = eventChannel(emit => {
    API.getTransactions(currentUser).on('value', (snap: any) => emit(snap.val()));
    return () => API.getTransactions(currentUser).off(listener);
  });
  return listener;
}

export function* getTransactions(action: AppActionInterface) {
  try {
    const currentUser: UserInterface = action.payload;
    const listener = yield call(fetchTransactions, currentUser);
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