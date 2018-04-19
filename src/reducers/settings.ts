import { get } from 'lodash';

import {
  UPDATE_SETTINGS,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAILURE,
  SIGNOUT_SUCCESS
} from './../constants/actionTypes';

import { SettingsStateInteface } from './';
import { AppActionInterface } from '../actions';

const initialState: SettingsStateInteface = {
  hasError: false,
  isUpdating: false,
  error: '',
  data: {
    from: 0,
    to: 0,
    currency: 'USD',
    roundingValue: 0,
  }
};

export const settings = (state = initialState, action: AppActionInterface): SettingsStateInteface => {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return { ...state, hasError: false, error: '' };

    case UPDATE_SETTINGS_SUCCESS: {
      return {
        ...state,
        data: get(action, 'payload', {}),
        hasError: false,
        error: '',
      };
    }

    case UPDATE_SETTINGS_FAILURE:
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

export default settings;
