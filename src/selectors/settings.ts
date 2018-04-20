import { get } from 'lodash';
import { AppStateInterface } from './../models';

export const selectSettings = (state: AppStateInterface) => get(state, 'settings');

export const selectUserSettings = (state: AppStateInterface): any =>
  get(selectSettings(state), 'data', undefined);