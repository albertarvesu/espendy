import  { db } from './../firebase';

import { UserInterface } from '../models';

export const setUser = (userData: UserInterface) => {
  return db.ref(`users/${userData.uid}`).set(userData);
};

export default setUser;