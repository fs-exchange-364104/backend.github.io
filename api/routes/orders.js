const { Router } = require('express');
const admin = require('../../helpers/admin').default;
const { onSnap, orderByChild } = require('../../helpers/database').default;

const router = Router();

admin.initializeApp();

router.get('/orders', function (req, res, next) {
  const userId = req.session.uid;
  return orderByChild('orders', 'userId', userId).then((orders) => {
    res.status(200).json(orders);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/orders/:id', function (req, res, next) {
  const id = req.params.id;
  return onSnap('orders', id).then((order) => {
    res.status(200).json(order);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
