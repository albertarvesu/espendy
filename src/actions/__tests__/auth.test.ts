import * as ACTION_TYPES from './../../constants/actionTypes';

import { signIn, signOut } from '../auth';

import { auth } from './../../firebase';

// tslint:disable-next-line:no-empty
const history = { push: () => {} };

describe('Testing auth actions', () => {
  it('signIn with Facebook', () => {
    const data = { provider: new auth.FacebookAuthProvider(), redirect: '/', history};
    const expected = { type: ACTION_TYPES.SIGNIN, payload: data };
    const actual = signIn(data.provider, data.redirect, history);
    expect(actual).toEqual(expected);
  });
  
  it('signIn with Google', () => {
    const data = { provider: new auth.GoogleAuthProvider(), redirect: '/hello', history};
    const expected = { type: ACTION_TYPES.SIGNIN, payload: data };
    const actual = signIn(data.provider, data.redirect, history);
    expect(actual).toEqual(expected);
  });
  
  it('signOut', () => {
    const data = { redirect: '/', history };
    const expected = { type: ACTION_TYPES.SIGNOUT, payload: data };
    const actual = signOut(data.redirect, history);
    expect(actual).toEqual(expected);
  });
});