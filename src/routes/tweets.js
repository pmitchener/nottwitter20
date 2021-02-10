const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { resource } = require('..');

// tweet routes
module.exports = ({tweets, addTweet, updateTweet, deleteTweet }) => {
  // get all tweet for this user.
  router.get('/', (req, res) => {
    if(!req.session.userId) {
      // res.status(401).send({ error: "You are not logged on. Please log on or create an account." });
      res.redirect("/login");
      return;      
    }
    tweets(req.session.userId)
    .then((tweets) => res.json(tweets))
    .catch((err) => res.json({ error: err.message }));
  });

  router.post('/', (req, res) => {
    if(!req.session.userId) {
      res.redirect("/login");
      return;      
    }    
    const newTweet = {
      user_id: req.session.userId,
      message: req.body.message
    };
    addTweet(newTweet)
      .then(tweet => {
        res.status(201).json(tweet);
      })
      .catch((err) => res.json({ error: err.message }));
  });

  // Update tweet and send back updated tweet
  router.put('/:id', (req, res) => {
    if(!req.session.userId) {
      res.redirect("/login");
      return;      
    } 
    const oldTweet = {
      user_id: req.session.userId,
      id: req.body.id,
      message: req.body.message
    };    
    updateTweet(oldTweet)
      .then(tweet => {
        res.status(201).json(tweet);
      })
      .catch((err) => res.json({ error: err.message }));
  });

  // delete tweet with this id
  router.delete('/:id', (req, res) => {
    if(!req.session.userId) {
      res.redirect("/login");
      return;      
    } 
    const oldTweet = {
      user_id: req.session.userId,
      id: req.body.id,
    };    
    deleteTweet(oldTweet)
      .then(() => {
        res.status(200).json({});
      })
      .catch((err) => res.json({ error: err.message }));
  });  
  return router;
};
