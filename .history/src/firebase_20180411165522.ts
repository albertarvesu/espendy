import * as firebase from 'firebase';

require('dotenv').config();

console.warn(process.env.REACT_API_KEY);

const config = {
  apiKey: 'AIzaSyBdR7XcrHo5uYJcBU1KEsI1ogxaeEHWdOM',
  authDomain: 'spending-app1.firebaseapp.com',
  databaseURL: 'https://spending-app1.firebaseio.com',
  projectId: 'spending-app1',
  storageBucket: 'spending-app1.appspot.com',
  messagingSenderId: '879113306217'
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const auth = firebase.auth;
