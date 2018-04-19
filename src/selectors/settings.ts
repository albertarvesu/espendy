import { get } from 'lodash';
import { AppStateInterface } from './../reducers';

export const selectSettings = (state: AppStateInterface) => get(state, 'settings', null);

export const selectUserSettings = (state: AppStateInterface) => get(selectSettings(state), 'data');