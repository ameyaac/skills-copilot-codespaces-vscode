// create a web server

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const VIEWS_PATH = 'views';

// Function to read file and serve content
const readFile = (filePath, res, contentType = 'text/html') => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
};

// Function to handle routes
const handleRoute = (pathname, res) => {
  switch (pathname) {
    case '/':
      readFile(path.join(VIEWS_PATH, 'index.html'), res);
      break;
    case '/about':
      readFile(path.join(VIEWS_PATH, 'about.html'), res);
      break;
    case '/contact':
      readFile(path.join(VIEWS_PATH, 'contact.html'), res);
      break;
    default:
      readFile(path.join(VIEWS_PATH, '404.html'), res);
      break;
  }
};

// Create the HTTP server
http.createServer((req, res) => {
  const pathname = url.parse(req.url, true).pathname;
  handleRoute(pathname, res);
}).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
