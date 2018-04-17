import { get } from 'lodash';

import {
  CREATE_TRANSACTION,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAILURE,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAILURE,
  SIGNOUT_SUCCESS
} from './../constants/actionTypes';

import { TransactionStateInterface } from './';
import { AppActionInterface } from '../actions';

const initialState: TransactionStateInterface = {
  hasError: false,
  isFetching: false,
  isUpdating: false,
  error: '',
};

export const transactions = (state = initialState, action: AppActionInterface): TransactionStateInterface => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return { ...state, isFetching: true, hasError: false, error: '' };

    case CREATE_TRANSACTION:
      return { ...state, isUpdating: true, hasError: false, error: '' };

    case CREATE_TRANSACTION_SUCCESS:
      return { ...state, isUpdating: false, hasError: false, error: '' };

    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        hasError: false,
        error: '',
      };

    case GET_TRANSACTIONS_FAILURE:
    case CREATE_TRANSACTION_FAILURE:
      return {
        ...state,
        isUpdating: false,
        hasError: true,
        data: undefined,
        error: get(action, 'payload', '')
      };

    case SIGNOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};

export default transactions;
