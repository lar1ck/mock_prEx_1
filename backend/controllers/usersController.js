const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    User.createUser(username, hashedPassword, (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.status(201).json({
        id: result.insertId,
        username
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error hashing password' });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  User.findUserByUsername(username, async (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.Users_Id, username: user.UserName },
      process.env.JWT_SECRET, { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token
    });
  });
};

exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getUserById = (req, res) => {
  User.getUserById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = result[0];
    const { Password, ...userWithoutPassword } = user;  
    res.json(userWithoutPassword);
  });
};

exports.updateUser = (req, res) => {
  const { username, password } = req.body;
  const updatedData = {};

  if (username) updatedData.username = username;
  if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: 'Error hashing password' });
      updatedData.Password = hashedPassword;
      User.updateUser(req.params.id, updatedData, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id: req.params.id, ...updatedData });
      });
    });
  } else {
    User.updateUser(req.params.id, updatedData, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: req.params.id, ...updatedData });
    });
  }
};

exports.deleteUser = (req, res) => {
  User.deleteUser(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(204).send();
  });
};
