const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// register routes
module.exports = ({ addUser }) => {
  
  router.get('/', (req, res) => {
    res.send('Signup route');
  });

  router.post('/', (req, res) => {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      avatar: req.body.avatar
    };
    addUser(newUser)
      .then(result => {
        console.log('User signup results:', result);
        /*const resUser = {};
        resUser.email = result.email;
        resUser.username = result.username;*/
        const resUser = {
          'email': result.email,
          'username': result.username,
          'firstname': result.firstname,
          'lastname': result.lastname
        };
        res.status(201).json(resUser);
      })
      .catch((err) => res.json({ err }));
  });

  return router;
};