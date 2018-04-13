import { get } from 'lodash';

import { AuthStateInterface } from './';
import { AppActionInterface } from './../actions';

import {
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNOUT_SUCCESS
} from './../constants/actionTypes';

const initialAuthState = {
  isLoggingIn: false,
  isLoggedIn: false,
  hasError: false,
  error: '',
  accessToken: ''
} as AuthStateInterface;

export const auth = (state: AuthStateInterface = initialAuthState, action: AppActionInterface): AuthStateInterface => {
  switch (action.type) {
    case SIGNIN:
      return { ...state, isLoggingIn: true, isLoggedIn: false, hasError: false };

    case SIGNIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
        accessToken: get(action, 'payload.credential.accessToken'),
      };
    }

    case SIGNIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
        hasError: true,
        error: get(action, 'payload.data'),
      };

    case SIGNOUT_SUCCESS:
      return initialAuthState;

    default:
      return state;
  }
};

export default auth;