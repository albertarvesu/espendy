import * as ACTION_TYPES from './../constants/actionTypes';
import * as firebase from 'firebase';
import { AppActionInterface } from './';

export interface SignInInterface {
  (provider: firebase.auth.AuthProvider, redirect: string, history: History): void;
}

export interface SignOutInterface {
  (redirect: string, history: History): void;
}

export const signIn = (provider: firebase.auth.AuthProvider, redirect: string, history: any) => ({
  type: ACTION_TYPES.SIGNIN,
  payload: {
    provider,
    redirect,
    history,
  }
} as AppActionInterface);

export const signOut = (redirect: string, history: any) => ({
  type: ACTION_TYPES.SIGNOUT,
  payload: {
    redirect,
    history,
  }
} as AppActionInterface);

export default signIn;
