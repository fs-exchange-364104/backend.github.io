import admin from 'firebase-admin';
require('dotenv').config();

export default !admin.apps.length ? admin.initializeApp({
  credential: admin.credential.cert('../service-accountt.json'),
  databaseURL: process.env.DATABASE_URL
}) : admin.app();
