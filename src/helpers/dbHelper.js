module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
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
      values: [id],
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
      values: [newUser.email, newUser.password, newUser.name, newUser.avatar],
    };

    return db
      .query(query)
      .then((result) => result.rows[0]);
  };


  const updateUser = (user) => {
    const query = {
      text:
        `UPDATE users
        SET password = $1, 
        name = $2,
        avatar = $3
        WHERE id = $4`,
      values: [user.password, user.name, user.avatar, user.id],
    };

    return db
      .query(query)
      .then((result) => result.rows);
  };


  const loginUser = (user) => {
    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [user.email],
    };

    return db
      .query(query)
      .then((result) => result.rows[0]);
  };

  return {
    getUsers,
    getUserProfile,
    addUser,
    loginUser,
    updateUser,
  };
};
