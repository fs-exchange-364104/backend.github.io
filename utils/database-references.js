import { ref, child } from 'firebase/database';
import { database } from '~/plugins/firebase-client-init';

export const dbRef = (path) => {
  return ref(database, path);
};
