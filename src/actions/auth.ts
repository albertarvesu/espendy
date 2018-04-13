import * as ACTION_TYPES from './../constants/actionTypes';
import * as firebase from 'firebase';
import { AppActionInterface } from './';

export interface SignInInterface {
  (provider: firebase.auth.AuthProvider, redirect: string): void;
}

export interface SignOutInterface {
  (redirect: string): void;
}

export const signIn = (provider: firebase.auth.AuthProvider, redirect: string) => ({
  type: ACTION_TYPES.SIGNIN,
  payload: {
    provider,
    redirect,
  }
} as AppActionInterface);

export const signOut = (redirect: string) => ({
  type: ACTION_TYPES.SIGNOUT,
  payload: {
    redirect,
  }
} as AppActionInterface);

export default signIn;
