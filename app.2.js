var PORT = 18080;
var app = require('http').createServer(handler)
var io = require( '.bae\\node_modules\\socket.io-2.1.0')(app);
var fs = require('fs');
app.listen(PORT)

function handler(req, res) {
  var myUrl = require('url').parse(req.url)
  if (myUrl.pathname == '/') {
    myUrl.pathname = '/index.html'
  }
  myPath = myUrl.pathname
  if (fs.existsSync(process.cwd() + myPath)) {
    res.writeHead(200, {
      'Set-Cookie': 'id=' + getHash()
    });

    var data = fs.readFileSync(process.cwd() + myPath, encoding = 'utf8')
    res.write(data);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    });
    res.write('<h1>[FAIL]NOT EXIST: ' + process.cwd() + myPath + '</h1>');
    // tree(res)
  }
  res.end()
}
io.on('connection', function (socket) {
  socket.emit('news', {
    hello: 'world'
  });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});