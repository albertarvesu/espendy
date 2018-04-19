import * as firebase from 'firebase';
import { UserInterface, SettingsInterface } from '../reducers';

export const updateSettings = (settings: SettingsInterface, currentUser: UserInterface): Promise<any> =>
  firebase.database().ref('settings').update({
    [`${currentUser.uid}`]: settings,
  });

export default updateSettings;