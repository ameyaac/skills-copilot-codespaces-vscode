// Create Web Server

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Could not read comments file.');
    } else {
      res.send(data);
    }
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Could not read comments file.');
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile('./comments.json', JSON.stringify(comments), err => {
        if (err) {
          res.status(500).send('Could not write comments file.');
        } else {
          res.send('Comment added.');
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});