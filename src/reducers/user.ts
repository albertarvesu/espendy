import { get } from 'lodash';

import {
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNOUT_SUCCESS
} from './../constants/actionTypes';

import { UserStateInterface } from './';
import { AppActionInterface } from '../actions';

const initialState: UserStateInterface = {
  hasError: false,
  isUpdating: false,
  error: '',
  data: {
    uid: '',
    email: '',
    displayName: '',
  }
};

export const user = (state = initialState, action: AppActionInterface): UserStateInterface => {
  switch (action.type) {
    case SIGNIN:
      return { ...state, hasError: false, error: '' };

    case SIGNIN_SUCCESS: {
      return {
        ...state,
        data: get(action, 'payload', {}),
        hasError: false,
        error: '',
      };
    }

    case SIGNIN_FAILURE:
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

export default user;
