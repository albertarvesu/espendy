
import * as ACTION_TYPES from './../constants/actionTypes';
import { AppActionInterface } from './';
import {  SettingsInterface } from './../models';

export interface UpdateSettingsInterface {
  (settings: SettingsInterface, redirect: string, history: any): void;
}

export const updateSettings = (settings: SettingsInterface, redirect: string, history: any) => ({
  type: ACTION_TYPES.UPDATE_SETTINGS,
  payload: {
    settings,
    redirect,
    history,
  }
} as AppActionInterface);
