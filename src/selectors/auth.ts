import { get } from 'lodash';
import { AppStateInterface } from './../reducers';

export const selectAuth = (state: AppStateInterface) => get(state, 'auth', null);

export const selectAuthToken = (state: AppStateInterface) => get(selectAuth(state), 'accessToken', '');

export const selectIsLoggingIn = (state: AppStateInterface) => get(selectAuth(state), 'isLoggingIn', false);

export const selectIsLoggedIn = (state: AppStateInterface) => get(selectAuth(state), 'isLoggedIn', false);

export const selectHasError = (state: AppStateInterface) => get(selectAuth(state), 'hasError', false);

export const selectError = (state: AppStateInterface) => get(selectAuth(state), 'error', '');

export default selectAuth;
