import { AppStateInterface, AuthStateInterface } from '../../reducers';
import { selectAuth, selectAuthToken, selectIsLoggingIn, selectIsLoggedIn, selectHasError, selectError } from '../auth';

const defaultState: AppStateInterface  = {
  auth: {
    isLoggedIn: false,
    isLoggingIn: false,
    accessToken: 'token1234'
  } as AuthStateInterface,
};

describe('Testing Selector Auth', () => {
  it('returns default auth', () => {
    const expected = defaultState.auth;
    const actual = selectAuth(defaultState);
    expect(actual).toEqual(expected);
  });
  it('returns correct token if not empty', () => {
    const actual = selectAuthToken(defaultState);
    expect(actual).toEqual('token1234');
  });
  it('returns correct token if empty', () => {
    const appState: AppStateInterface  = {
      auth: {
        isLoggedIn: false,
        isLoggingIn: false,
      } as AuthStateInterface,
    };
    const actual = selectAuthToken(appState);
    expect(actual).toEqual('');
  });
  it('returns correct isLogging', () => {
    const actual = selectIsLoggingIn(defaultState);
    expect(actual).toEqual(false);
  });
  it('returns correct isLoggedIn', () => {
    const actual = selectIsLoggedIn(defaultState);
    expect(actual).toEqual(false);
  });
  it('returns correct hasError', () => {
    const appState: AppStateInterface  = {
      auth: {
        isLoggedIn: false,
        isLoggingIn: false,
        hasError: true,
      } as AuthStateInterface,
    };
    const actual = selectHasError(appState);
    expect(actual).toEqual(true);
  });
  it('returns correct hasError if empty', () => {
    const actual = selectHasError(defaultState);
    expect(actual).toEqual(false);
  });
  it('returns correct error', () => {
    const appState: AppStateInterface  = {
      auth: {
        isLoggedIn: false,
        isLoggingIn: false,
        error: 'im an error',
      } as AuthStateInterface,
    };
    const actual = selectError(appState);
    expect(actual).toEqual('im an error');
  });
  it('returns correct hasError if empty', () => {
    const actual = selectError(defaultState);
    expect(actual).toEqual('');
  });
});