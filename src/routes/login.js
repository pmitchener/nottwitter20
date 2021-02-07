const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
//  const cookieSession = require('cookie-session');

// login routes
module.exports = ({ loginUser }) => {

  router.get('/', (req, res) => {
    res.send('Login route');
  });

  router.post('/', (req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    loginUser(user)
      .then(result => {
        if (bcrypt.compareSync(user.password, result.password)) {
          req.session.userId = result.id;
          const logonUser = {
            email: result.email,
            name: result.name,
            avatar: result.avatar,
          };
          res.status(200).json({ logonUser });
          
        } else {
          res.status(400).send('Wrong password');
        }
      })
      .catch(() => res.status(404).send('User and/or password error'));
  });

  return router;
};
