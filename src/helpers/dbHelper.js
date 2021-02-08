module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users'
    };

    return db
      .query(query)
      .then((result) => result.rows);
  };
  const getUserProfile = (id) => {
    const query = {
      text:
        `SELECT users.id, email, name, avatar FROM users
         WHERE users.id = $1`,
      values: [id]
    };

    return db
      .query(query)
      .then((result) => result.rows);
  };

  const addUser = (newUser) => {
    const query = {
      text: `INSERT INTO users (email, password, name, avatar)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
      values: [newUser.email, newUser.password, newUser.name, newUser.avatar]
    };

    return db
      .query(query)
      .then((result) => result.rows);
  };


  const updateUser = (user) => {
    const query = {
      text:
        `UPDATE users
        SET password = $1, 
        name = $2,
        avatar = $3
        WHERE id = $4`,
      values: [user.password, user.name, user.avatar, user.id]
    };

    return db
      .query(query)
      .then((result) => result.rows);
  };


  const loginUser = (user) => {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [user.email]
    };

    return db
      .query(query)
      .then((result) => result.rows[0]);
  };

  const tweets = (user_id) => {
    const query = {
      text: 'SELECT * FROM tweets WHERE user_id = $1',
      values: [user_id]
    };

    return db
      .query(query)
      .then((result) => result.rows);
  };

  const addTweet = (tweet) => {
    if(!tweet) {
      throw new Error('Invalid tweet');
    }
    if(!tweet.message) {
      throw new Error('Invalid tweet. No Message present.');
    }
    const query = {
      text: `INSERT INTO tweets (user_id, message)
             VALUES ($1, $2)
             RETURNING *`,
      values: [tweet.user_id, tweet.message]
    };

    return db
      .query(query)
      .then((result) => result.rows);
  };

  const deleteTweet = (tweet) => {
    if(!tweet) {
      throw new Error('Invalid tweet');
    }    
    const query = {
      text: `DELETE FROM tweets 
      WHERE id = $1
      AND user_id = $2`,
      values: [tweet.id, tweet.user_id]
    };

    return db
      .query(query)
      .then((result) => result.rows);
  };

  const updateTweet = (tweet) => {
    if(!tweet) {
      throw new Error('Invalid tweet');
    }    
    if(!tweet.message) {
      throw new Error('Invalid tweet. No Message present.');
    }    
    const query = {
      text:
        `UPDATE tweets
        SET message = $1 
        WHERE id = $2
        AND user_id = $3 RETURNING *`,
      values: [tweet.message, tweet.id, tweet.user_id]
    };

    return db
      .query(query)
      .then((result) => result.rows);
  };

  return {
    getUsers,
    getUserProfile,
    addUser,
    loginUser,
    updateUser,
    tweets,
    addTweet,
    updateTweet,
    deleteTweet
  };
};
