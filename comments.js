// create a web server

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var comments = [
    {
        name: '张三',
        message: '今天天气不错',
        dateTime: '2020-07-10'
    },
    {
        name: '李四',
        message: '今天天气不错',
        dateTime: '2020-07-10'
    },
    {
        name: '王五',
        message: '今天天气不错',
        dateTime: '2020-07-10'
    }
];

// 1. 创建一个http服务
http.createServer(function(req, res) {
    var parseObj = url.parse(req.url, true);
    var pathname = parseObj.pathname;
    if (pathname === '/') {
        fs.readFile('./views/index.html', function(err, data) {
            if (err) {
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    } else if (pathname === '/post') {
        fs.readFile('./views/post.html', function(err, data) {
            if (err) {
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    } else if (pathname.indexOf('/public/') === 0) {
        fs.readFile('.' + pathname, function(err, data) {
            if (err) {
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    } else if (pathname === '/pinglun') {
        var comment = parseObj.query;
        comment.dateTime = '2020-07-10';
        comments.unshift(comment);
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    } else {
        fs.readFile('./views/404.html', function(err, data) {
            if (err) {
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    }
}).listen(3000, function() {
    console.log('running...');
});

// 2. 读取文件
// 3. 处理请求
// 4. 发送响应
// 5. 绑定端口号，启动服务