const express = require('express');
const router = express.Router();
//  const bcrypt = require('bcrypt');
//  const cookieSession = require('cookie-session');

// logout route
module.exports = () => {

  router.post('/', (req, res) => {
    req.session.userId = null;
    res.status(200).send({});
  });
  return router;
};
