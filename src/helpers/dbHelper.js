module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };
  const getUserProfile = (id) => {
    const query = {
      text: 
        `SELECT users.id, username, email, firstname, lastname, avatar FROM users
         WHERE users.id = $1`,
      values: [id]
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => console.error('query error', err.stack));
  };
    
  const addUser = (newUser) => {
    const query = {
      text: `INSERT INTO users (username, email, password, avatar)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
      values: [newUser.username, newUser.email, newUser.password, newUser.avatar]
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => console.error('query error', err.stack));
  };


  const updateUser = (user) => {
    const query = {
      text: 
        `UPDATE users
        SET password = $1, avatar = $2
        WHERE id = $3`,
      values: [user.password, user.avatar, user.id]
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => console.error('query error', err.stack));
  };


  const loginUser = (user) => {
    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [user.email]
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => console.error('query error', err.stack));
  };

  return {
    getUsers,
    getUserProfile,
    addUser,
    loginUser,
    updateUser
  };
};