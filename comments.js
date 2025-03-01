var http = require('http');
var url = require('url');

// Create the server
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var txt = q.year + " " + q.month;
  res.end(txt);
}).listen(8080, () => {
  console.log('Server running on port 8080');

  // Make an internal request to the server with the query string
  http.get('http://localhost:8080/?year=2017&month=July', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      console.log(data);
    });
  }).on('error', (err) => {
    console.log('Error: ' + err.message);
  });
});
