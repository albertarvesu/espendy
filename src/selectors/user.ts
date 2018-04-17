import { get } from 'lodash';
import { AppStateInterface, UserInterface } from './../reducers';

export const selectStateUser = (state: AppStateInterface) => get(state, 'user', undefined);

export const selectCurrentUser = (state: AppStateInterface): UserInterface => get(state, 'user.data', undefined);

export default selectCurrentUser;
