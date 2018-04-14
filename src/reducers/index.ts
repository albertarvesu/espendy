import { combineReducers } from 'redux';

import { auth } from './auth';
import { user } from './user';

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

export interface AppStateInterface {
  auth: AuthStateInterface;
  user?: UserStateInterface;
}

export const rootReducer = combineReducers({
  auth,
  user,
});

export default rootReducer;