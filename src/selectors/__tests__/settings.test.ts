import { AppStateInterface, SettingsInterface, SettingsStateInteface } from '../../reducers';
import { selectUserSettings, selectSettings } from '../settings';

const settings: SettingsInterface = {
  from: new Date(),
  to: new Date(),
  roundingValue: 0,
  currency: 'USD',
};

const appState: AppStateInterface  = {
  settings: {
    hasError: false,
    isUpdating: false,
    error: '',
    data: settings,
  } as SettingsStateInteface,
};

describe('Testing Selector settings', () => {
  it('returns default state', () => {
    const actual = selectSettings(appState);
    expect(actual).toEqual(appState.settings);
  });
  it('returns the default settings', () => {
    const actual = selectUserSettings(appState);
    expect(actual).toEqual(settings);
  });
});