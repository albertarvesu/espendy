import { get } from 'lodash';

import { AuthStateInterface } from './';
import { AppActionInterface } from './../actions';

import {
  SIGNIN,
  AUTH_SUCCESS,
  SIGNIN_FAILURE,
  SIGNOUT_SUCCESS
} from './../constants/actionTypes';

const initialAuthState: AuthStateInterface = {
  isLoggingIn: false,
  isLoggedIn: false,
  hasError: false,
  error: '',
  accessToken: ''
};

export const auth = (state: AuthStateInterface = initialAuthState, action: AppActionInterface): AuthStateInterface => {
  switch (action.type) {
    case SIGNIN:
      return { ...state, isLoggingIn: true, isLoggedIn: false, hasError: false };

    case AUTH_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        accessToken: get(action, 'payload'),
      };
    }

    case SIGNIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
        hasError: true,
        error: get(action, 'payload'),
      };

    case SIGNOUT_SUCCESS:
      return initialAuthState;

    default:
      return state;
  }
};

export default auth;