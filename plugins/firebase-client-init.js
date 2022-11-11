import { getApps, getApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const config = {
  apiKey: 'AIzaSyD_Q4SEux2JXbQgvkLtyhhm7ze-eMjaXuk',
  authDomain: 'fs-exchange-364104.firebaseapp.com',
  databaseURL: 'https://fs-exchange-364104-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'fs-exchange-364104',
  storageBucket: 'fs-exchange-364104.appspot.com',
  messagingSenderId: '161750353077',
  appId: '1:161750353077:web:a804ca626aaa0a9f356afc',
  measurementId: 'G-FDHE2GSQL5'
};

const app = !getApps().length ? initializeApp(config) : getApp();

export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const functions = getFunctions(app, 'asia-southeast1');
