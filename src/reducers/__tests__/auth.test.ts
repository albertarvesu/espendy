import * as ACTION_TYPES from './../../constants/actionTypes';

import { AuthStateInterface } from '../';
import { auth } from '../auth';

const initialAuthState: AuthStateInterface  = {
  isLoggingIn: false,
  isLoggedIn: false,
  hasError: false,
  error: '',
  accessToken: '',
};

describe('Testing Reducer Auth', () => {
  it('returns default state', () => {
    const expected = initialAuthState;
    const actual = auth(expected, { type: 'SIGN_IN' });
    expect(actual).toEqual(expected);
  });

  it('returns default state upon LOGOUT', () => {
    const expected = initialAuthState;
    const actual = auth(expected, { type: ACTION_TYPES.SIGNOUT_SUCCESS });
    expect(actual).toEqual(expected);
  });

  it('switch to isLoggingIn = true LOGIN', () => {
    const expected = {
      isLoggingIn: true,
      isLoggedIn: false,
      hasError: false,
      accessToken: '',
    };
    const actual = auth(expected, { type: ACTION_TYPES.SIGNIN });
    expect(actual).toEqual(expected);
  });

  it('switch to isLoggingIn = false, isLoggedIn = true upon SIGNIN_SUCCESS', () => {
    const payload = {
      credential: {
        accessToken: '1234',
      }
    };
    const expected = {
      isLoggingIn: false,
      isLoggedIn: true,
      hasError: false,
      accessToken: '1234',
    };
    const actual = auth(expected, {
      type: ACTION_TYPES.SIGNIN_SUCCESS,
      payload,
    });
    expect(actual).toEqual(expected);
  });

  it('switch to isLoggingIn = false, isLoggedIn = false, hasError = true upon SIGNIN_FAILURE', () => {
    const payload = 'Error';
    const expected = {
      isLoggingIn: false,
      isLoggedIn: false,
      hasError: true,
      error: 'Error',
      accessToken: '',
    };
    const actual = auth(expected, {
      type: ACTION_TYPES.SIGNIN_FAILURE,
      payload,
    });
    expect(actual).toEqual(expected);
  });

});