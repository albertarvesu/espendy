import { combineReducers } from 'redux';

import { auth } from './auth';

export interface AuthStateInterface {
  isLoggingIn: boolean;
  isLoggedIn: boolean;
  hasError: boolean;
  error?: string;
  accessToken?: string;
}

export interface AppStateInterface {
  auth: AuthStateInterface;
}

export const rootReducer = combineReducers({
  auth
});

export default rootReducer;