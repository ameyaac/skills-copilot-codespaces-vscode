// Create Web Server

const express = require('express');
const app = express();

// Create route
app.get('/comments', (req, res) => {
  res.send('This is the comment page');
});

// Create route
app.get('/comments/new', (req, res) => {
  res.send('This is the new comment page');
});

// Create route
app.get('/comments/:id', (req, res) => {
  res.send('This is the comment ' + req.params.id + ' page');
});

// Start server
app.listen(3000, () => {
  console.log('Server has started');
});