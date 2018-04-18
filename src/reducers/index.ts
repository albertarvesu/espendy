import { combineReducers } from 'redux';

import { auth } from './auth';
import { user } from './user';
import { transactions } from './transactions';

export interface AuthStateInterface {
  isLoggingIn: boolean;
  isLoggedIn: boolean;
  hasError: boolean;
  error?: string;
  accessToken?: string;
}

export interface UserInterface {
  uid: string;
  email: string;
  photoURL?: string;
  providerId?: string;
  displayName?: string;
  creationTime?: string;
  lastSignInTime?: string;
}

export interface UserStateInterface {
  isUpdating: boolean;
  hasError: boolean;
  error?: string;
  data?: UserInterface;
}

export interface TransactionInterface {
  id?: string;
  type: string;
  category: string;
  amount: number;
  date?: Date;
  remarks?: string;
}

export interface TransactionsMetaInterface {
  [key: string]: TransactionInterface;
}

export interface TransactionStateInterface {
  isUpdating: boolean;
  isFetching: boolean;
  hasError: boolean;
  error?: string;
  data?: TransactionsMetaInterface;
}

export interface AppStateInterface {
  auth?: AuthStateInterface;
  user?: UserStateInterface;
  transactions?: TransactionStateInterface;
}

export const rootReducer = combineReducers({
  auth,
  user,
  transactions,
});

export default rootReducer;