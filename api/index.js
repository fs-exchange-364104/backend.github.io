const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const random = require('crypto');
const admin = require('../helpers/admin').default;
require('dotenv').config();

//const clientSecret = process.env.LINE_LOGIN_CHANNEL_SECRET;

// Create express instance
const app = express();

console.log(admin);

app.use(session({
  secret: random.randomBytes(16).toString(),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000
  }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Require API routes
const login = require('./routes/login');
const users = require('./routes/users');
const orders = require('./routes/orders');
const test = require('./routes/test');

// Import API Routes
app.use(login);
app.use(users);
app.use(orders);
app.use(test);

// Export express app
module.exports = app;

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001 || 8080;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`);
  });
}
