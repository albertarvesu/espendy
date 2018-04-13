import * as ACTION_TYPES from './../../constants/actionTypes';

import { signIn, signOut } from '../auth';

import { auth } from './../../firebase';

it('signIn with Facebook', () => {
  const data = { provider: new auth.FacebookAuthProvider(), redirect: '/' };
  const expected = { type: ACTION_TYPES.SIGNIN, payload: data };
  const actual = signIn(data.provider, data.redirect);
  expect(actual).toEqual(expected);
});

it('signIn with Google', () => {
  const data = { provider: new auth.GoogleAuthProvider(), redirect: '/hello' };
  const expected = { type: ACTION_TYPES.SIGNIN, payload: data };
  const actual = signIn(data.provider, data.redirect);
  expect(actual).toEqual(expected);
});

it('signOut', () => {
  const data = { redirect: '/' };
  const expected = { type: ACTION_TYPES.SIGNOUT, payload: data };
  const actual = signOut(data.redirect);
  expect(actual).toEqual(expected);
});