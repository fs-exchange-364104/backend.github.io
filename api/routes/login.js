const { Router } = require('express');
const request = require('request-promise');
const random = require('crypto');
const uuid = require('uuid').v5;
const admin = require('firebase-admin');
const serviceAccount = require('../../service-accountt.json');
const { URLSearchParams } = require('url');
require('dotenv').config();

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
  });
}

const clientId = process.env.LINE_LOGIN_CHANNEL_ID;
const clientSecret = process.env.LINE_LOGIN_CHANNEL_SECRET;
const callbackUrl = process.env.LINE_LOGIN_CALLBACK_URL;
const lineAccessApi = 'https://access.line.me/oauth2/v2.1/authorize';
const lineTokenApi = 'https://api.line.me/oauth2/v2.1/token';
const lineProfileApi = 'https://api.line.me/v2/profile';
const lineVerifyApi = 'https://api.line.me/oauth2/v2.1/verify';

function getLineToken (params) {
  const options = {
    method: 'POST',
    uri: lineTokenApi,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: params,
    json: true
  };
  return request(options).then((response) => {
    console.log(response.body);
    return JSON.parse(response.body);
  });
}

function getLineProfile (body) {
  const options = {
    method: 'GET',
    uri: lineProfileApi,
    headers: {
      Authorization: `Bearer ${body.access_token}`
    },
    json: true
  };
  return request(options).then((response) => {
    console.log(response.body);
    return JSON.parse(response.body);
  });
}

function verifyToken (body) {
  return request.get(
    `${lineVerifyApi}?access_token=${body.access_token}`
  ).then((response) => {
    console.log(response.body);
    if (response.body.client_id !== clientId) {
      return Promise.reject(new Error('LINE CHANNEL ID MISMATCHED'));
    }
    return getLineProfile(body);
  });
}

function getUser (body) {
  const firebaseUid = `line:${body.userId}`;
  return admin.auth().getUser(firebaseUid).then((userRecord) => {
    return userRecord;
  }).catch((err) => {
    if (err.code === 'auth/user-not-found') {
      return admin.auth().createUser({
        uid: firebaseUid
      }).then((userRecord) => {
        return userRecord;
      }).catch(err => {
        return Promise.reject(err);
      });
    }
    return Promise.reject(err);
  });
}

const router = Router();

router.get('/login', function (req, res, next) {
  req.session.state = random.randomBytes(16).toString('hex');
  req.session.nonce = uuid();
  const url = lineAccessApi +
    '?response_type=code' +
    '&client_id=' + clientId +
    '&redirect_uri=' + callbackUrl +
    '&scope=profile%20openid%20email' +
    '&state=' + req.session.state +
    '&nonce=' + req.session.nonce;

  res.redirect(url);
  next();
});

router.post('/login/callback', function (req, res, next) {
  if (req.body.state !== req.session.state) {
    res.send('state mismatched');
    next();
  } else {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', req.body.code);
    params.append('redirect_uri', callbackUrl);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    return getLineToken(params).then((body) => {
      return res.status(200).send(body);
    }).catch((err) => {
      console.log(err);
      return res.send(err);
    });
  }
});

router.post('/login/customtoken', function (req, res, next) {
  const body = req.body;
  return verifyToken(body).then((body) => {
    return getUser(body);
  }).then((userRecord) => {
    return admin.auth().createCustomToken(userRecord.uid);
  }).then((customToken) => {
    return res.status(200).send({ customToken });
  }).catch((err) => {
    console.log(err);
    return res.send(err);
  });
});

module.exports = router;
