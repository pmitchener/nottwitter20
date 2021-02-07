const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// signup routes
module.exports = ({ addUser }) => {
  
  router.get('/', (req, res) => {
    res.send('Signup route');
  });

  router.post('/', (req, res) => {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      avatar: req.body.avatar,
    };
    addUser(newUser)
      .then(result => {
        req.session.userId = result.id;
        const resUser = {
          email: result.email,
          name: result.name,
          avatar: result.avatar,
        };
        res.status(201).json(resUser);
      })
      .catch((err) => res.json({ error: err.message }));
  });

  return router;
};
