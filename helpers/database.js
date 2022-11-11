import admin from './admin';

const onSnaps = (path) => {
  return new Promise(function (resolve, reject) {
    admin
      .database()
      .ref(path)
      .get()
      .then(function (snapshot) {
        console.log(snapshot.val());
        resolve(snapshot.val());
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

const onSnap = (path, childPath) => {
  return new Promise(function (resolve, reject) {
    admin
      .database()
      .ref(path)
      .child(childPath)
      .get()
      .then(function (snapshot) {
        console.log(snapshot.val());
        resolve(snapshot.val());
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

const onChildSnap = (path, childPath, child) => {
  return new Promise(function (resolve, reject) {
    admin
      .database()
      .ref(path)
      .child(childPath)
      .child(child)
      .get()
      .then(function (snapshot) {
        console.log(snapshot.val());
        resolve(snapshot.val());
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

const orderByChild = (path, childPath, value) => {
  return new Promise(function (resolve, reject) {
    admin
      .database()
      .ref(path)
      .orderByChild(childPath)
      .equalTo(value)
      .get()
      .then(function (snapshot) {
        console.log(snapshot.val());
        resolve(snapshot.val());
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

export default {
  onSnaps,
  onSnap,
  onChildSnap,
  orderByChild
};
