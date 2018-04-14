import * as ACTION_TYPES from '../../constants/actionTypes';

import { UserStateInterface } from '../';
import { user } from '../user';

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

describe('Testing Reducer User', () => {
  it('returns default state', () => {
    const expected = initialState;
    const actual = user(expected, { type: ACTION_TYPES.SIGNIN });
    expect(actual).toEqual(expected);
  });

  it('returns default user state upon SIGNOUT', () => {
    const expected = initialState;
    const actual = user(expected, { type: ACTION_TYPES.SIGNOUT_SUCCESS });
    expect(actual).toEqual(expected);
  });

  it('store user values propery upon SIGNIN SUCCESS', () => {
    const payload = {
      uid: '1',
      email: 'a@a.com',
      displayName: 'a',
      photoURL: 'http://',
      creationTime: 'creationTime',
      lastSignInTime: 'lastSignInTime',
      providerId: 'google.com',
    };

    const expected = {
      hasError: false,
      isUpdating: false,
      error: '',
      data: payload
    };

    const actual = user(expected, { type: ACTION_TYPES.SIGNIN_SUCCESS, payload });
    expect(actual).toEqual(expected);
  });

  it('should set data to undefined if type === SIGNIN_FAILURE', () => {
    const expected = {
      hasError: true,
      isUpdating: false,
      error: 'ErrorMessage',
      data: undefined,
    };
    const payload = 'ErrorMessage';
    const actual = user(expected, { type: ACTION_TYPES.SIGNIN_FAILURE, payload });
    expect(actual).toEqual(expected);
  });

});