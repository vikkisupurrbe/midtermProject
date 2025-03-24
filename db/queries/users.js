const db = require('../connection');

// Get a user by email
const getUserWithEmail = function (email) {

  const queryString = `
    SELECT *
    FROM users
    WHERE email = $1
    LIMIT 1;
  `;

  return db
    .query(queryString, [email])
    .then((result) => (result.rows.length ? result.rows[0] : null))
    .catch((err) => {
      console.error("Error fetching user by email:", err.message);
      return null;
    });
};

module.exports = { getUserWithEmail };
