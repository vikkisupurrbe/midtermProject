// User login, logout - Vikki
// Log in
// Log out
// Get current logged-in user info

const express = require('express');
const router  = express.Router();
const dbUsers = require('../db/queries/users');

// Log in an existing user
router.post('/login', (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  dbUsers.getUserWithEmail(email)
    .then(user => {
      if (!user) {
        req.session = null;
        return res.status(401).json({ error: "No user with that email" });
      }

      req.session.userId = user.id; // Store user id in session
      res.redirect('/');
    })
    .catch (err => {
      console.error("Login error:", err);
      res.status(500).json({ error: "Server error"});
    });
});

// Log out
router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

// Get current logged in user info
router.get('/me', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not logged in"});
  }

  dbUsers.getUserWithEmail(req.session.userId)
    .then(user => {
      if (!user) {
        req.session = null;
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ user });
    })
    .catch(err => {
      console.error("Error fetching current user:", err);
      res.status(500).json({ error: "Server error" });
    });
});

module.exports = router;