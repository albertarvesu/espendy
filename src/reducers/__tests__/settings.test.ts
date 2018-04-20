import * as ACTION_TYPES from '../../constants/actionTypes';

import { SettingsStateInteface } from '../../models';
import { settings } from '../settings';

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

describe('Testing Reducer Settings', () => {
  it('returns default state', () => {
    const expected = initialState;
    const actual = settings(expected, { type: ACTION_TYPES.UPDATE_SETTINGS });
    expect(actual).toEqual(expected);
  });

  it('returns default user state upon SIGNOUT', () => {
    const expected = initialState;
    const actual = settings(expected, { type: ACTION_TYPES.SIGNOUT_SUCCESS });
    expect(actual).toEqual(expected);
  });

  it('store user values propery upon UPDATE_SETTINGS SUCCESS', () => {
    const payload = {
      from: new Date().getTime(),
      to: new Date().getTime(),
      currency: 'PHP',
      roundingValue: 100,
    };
    const expected = {
      hasError: false,
      isUpdating: false,
      error: '',
      data: payload
    };

    const actual = settings(expected, { type: ACTION_TYPES.UPDATE_SETTINGS_SUCCESS, payload });
    expect(actual).toEqual(expected);
  });

  it('should set data to undefined if type === UPDATE_SETTINGS_FAILURE', () => {
    const expected = {
      hasError: true,
      isUpdating: false,
      error: 'ErrorMessage',
      data: undefined,
    };
    const payload = 'ErrorMessage';
    const actual = settings(expected, { type: ACTION_TYPES.UPDATE_SETTINGS_FAILURE, payload });
    expect(actual).toEqual(expected);
  });

});