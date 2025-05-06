const db = require('../config/db');

// Get all users
exports.getAllUsers = callback => {
  db.query('SELECT * FROM Users', callback);
};

// Get user by ID
exports.getUserById = (id, callback) => {
  db.query('SELECT * FROM Users WHERE Users_Id = ?', [id], callback);
};

// Create new user
exports.createUser = (username, hashedPassword, callback) => {
  const user = { UserName: username, Password: hashedPassword };
  db.query('INSERT INTO Users SET ?', user, callback);
};

// Find user by username for login
exports.findUserByUsername = (username, callback) => {
  db.query('SELECT * FROM Users WHERE UserName = ?', [username], callback);
};

// Update user
exports.updateUser = (id, user, callback) => {
  db.query('UPDATE Users SET ? WHERE Users_Id = ?', [user, id], callback);
};

// Delete user
exports.deleteUser = (id, callback) => {
  db.query('DELETE FROM Users WHERE Users_Id = ?', [id], callback);
};
