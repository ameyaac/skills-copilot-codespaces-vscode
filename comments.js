const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const COMMENTS_FILE = './data/comments.json';
const VIEWS_PATH = './views';
const PUBLIC_PATH = './public';

const readFile = (filePath, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end('404 Not Found');
    } else {
      res.statusCode = 200; // Ensure we send a status code
      res.end(data);
    }
  });
};

const handleRoute = (pathname, req, res) => {
  console.log(`Handling route: ${pathname}`);
  switch (pathname) {
    case '/':
      readFile(path.join(VIEWS_PATH, 'index.html'), res);
      break;
    case '/post':
      readFile(path.join(VIEWS_PATH, 'post.html'), res);
      break;
    case '/pinglun':
      handleComment(req, res);
      break;
    default:
      if (pathname.startsWith('/public/')) {
        readFile(path.join(PUBLIC_PATH, pathname), res);
      } else {
        readFile(path.join(VIEWS_PATH, '404.html'), res);
      }
      break;
  }
};

const handleComment = (req, res) => {
  const comment = url.parse(req.url, true).query;
  comment.dateTime = new Date().toISOString();
  fs.readFile(COMMENTS_FILE, (err, data) => {
    let comments = [];
    if (!err) {
      comments = JSON.parse(data);
    }
    comments.unshift(comment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments), (err) => {
      if (err) throw err;
      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
    });
  });
};

http.createServer((req, res) => {
  const pathname = url.parse(req.url, true).pathname;
  handleRoute(pathname, req, res);
}).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
