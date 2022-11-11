const { Router } = require('express');
const admin = require('../../helpers/admin').default;
const { onSnaps, onSnap, onChildSnap } = require('../../helpers/database').default;

const router = Router();

admin.initializeApp();

// Mock Users
//const users = [
//  { name: 'Alexandre' },
//  { name: 'Pooya' },
//  { name: 'Sébastien' }
//];

/* GET users listing. */
router.get('/users', function (req, res, next) {
  return onSnaps('/users').then((users) => {
    res.status(200).json(users);
  }).catch((err) => {
    res.json(err);
  });
});

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  const id = req.params.id;
  return onSnap('users', id).then((user) => {
    res.json(user);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/users/:id/account', function (req, res, next) {
  const id = req.params.id;
  return onChildSnap('users', id, 'account').then((account) => {
    res.status(200).json(account);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/users/:id/bank', function (req, res, next) {
  const id = req.params.id;
  return onChildSnap('users', id, 'bank').then((bank) => {
    res.status(200).json(bank);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
