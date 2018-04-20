import { get } from 'lodash';
import { AppStateInterface, UserStateInterface } from '../../models';
import { selectCurrentUser, selectStateUser } from '../user';

const defaultState: AppStateInterface  = {
  user: {
    hasError: false,
    isUpdating: false,
    error: '',
    data: {
      uid: '',
      email: '',
      displayName: '',
    }
  } as UserStateInterface,
};

describe('Testing Selector User', () => {
  it('returns default user', () => {
    const expected = defaultState.user;
    const actual = selectStateUser(defaultState);
    expect(actual).toEqual(expected);
  });
  it('returns current user', () => {
    const actual = selectCurrentUser(defaultState);
    expect(actual).toEqual(get(defaultState, 'user.data'));
  });
  it('returns correct current user data', () => {
    const state: AppStateInterface  = {
      user: {
        hasError: false,
        isUpdating: false,
        error: '',
        data: {
          uid: '123',
          email: 'a@a.com',
          displayName: 'aaa',
        }
      } as UserStateInterface,
    };
    const actual = selectCurrentUser(state);
    expect(actual).toEqual(get(state, 'user.data'));
    expect(actual.uid).toEqual('123');
    expect(actual.email).toEqual('a@a.com');
    expect(actual.displayName).toEqual('aaa');
  });
});