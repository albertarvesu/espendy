import * as ACTION_TYPES from './../../constants/actionTypes';
import { SettingsInterface } from '../../models';
import { updateSettings } from '../settings';

// tslint:disable-next-line:no-empty
const history = { push: () => {} };

describe('Testing settings actions', () => {
  it('should dispatch proper action upon createTransaction', () => {
    const settings: SettingsInterface = {
      from: new Date().getTime(),
      to: new Date().getTime(),
      currency: 'USD',
      roundingValue: 0,
    };
    const data = {
      settings,
      redirect: '/home',
      history,
    };
    const expected = { type: ACTION_TYPES.UPDATE_SETTINGS, payload: data };
    const actual = updateSettings(settings, '/home', history);
    expect(actual).toEqual(expected);
  });
});