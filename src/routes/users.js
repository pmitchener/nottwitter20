const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = ({ updateUser, getUsers, getUserProfile }) => {
  /* GET users listing. */
  /*router.get('/', (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) => res.json({ error: err.message }));
  });*/

  // Get user profile
  router.get('/:id', (req, res) => {
    if(!req.session.userId) {
      res.redirect("/login");
      return;      
    }     
    const id = parseInt(req.params.id);
    if(id !== req.session.userId) {
      console.log("returning empty");
      res.status(404).send([]);
      return;      
    }
    getUserProfile(req.session.userId)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.json({ error: err.message }));
  });
  
  // Update user profile and send updated profile
  router.put('/:id', (req, res) => {
    if(!req.session.userId) {
      res.redirect("/login");
      return;      
    }
    if(parseInt(req.params.id) !== req.session.userId) {
      res.status(404).send([]);
      return;      
    }     
    const user = {
      id: req.session.userId,
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, 10),
      avatar: req.body.avatar,
    };
    updateUser(user)
      .then(() => {
        getUserProfile(user.id)
          .then((user) => res.status(200).json(user))
          .catch((err) => res.json({ error: err.message }));
      })
      .catch((err) => res.json({ error: err.message }));
  });

  return router;
};

