const express = require('express');
const app = express();
// Loading Express

// ======================== 1. Greetings ========================
app.get('/greetings/:userName', (req, res) => {
  const { userName } = req.params;
  res.send(`Hello there, ${userName}!`);
});