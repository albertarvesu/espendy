import  { db } from './../firebase';

import { UserInterface } from '../reducers';

export const setUser = (userData: UserInterface) => {
  return db.ref(`users/${userData.uid}`).set(userData);
};

export default setUser;