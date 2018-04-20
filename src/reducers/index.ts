import { combineReducers } from 'redux';

import { auth } from './auth';
import { settings } from './settings';
import { transactions } from './transactions';
import { user } from './user';

export const rootReducer = combineReducers({
  auth,
  settings,
  transactions,
  user,
});

export default rootReducer;