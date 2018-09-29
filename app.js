'use strict'
// Node.js v8
// const {
//   URL,
//   URLSearchParams
// } = require('url');

var PORT = 80;
var app = require('http').createServer(handler)
var fs = require('fs');
app.listen(PORT)
// //
function handler(req, res) {
  // var myUrl = new URL(req.url, 'http://' + req.headers.host); // v8
  var myUrl = require('url').parse(req.url) // v4
  log(req.headers.host, 'Host')
  // log(req.url, 'Raw Url') // v8
  log(myUrl.pathname, 'Raw Url') // v4
  if (myUrl.search) {
    // var newSearchParams = new URLSearchParams(myUrl.searchParams); // v8
    var myData = {}
    // for (var pair of newSearchParams.entries()) { // v8
    //   myData[pair[0]] = pair[1]
    // }
    for (var pairs of myUrl.query.split('&')) { // v4
      var pair = pairs.split('=')
      myData[pair[0]] = pair[1] // v4
    }
    log(myData)
  }
  var myPath = require('path').posix.normalize(myUrl.pathname)
  log(myPath, 'Url');
  myPath = getRedirect(myPath)
  log(myPath, 'Real Url');
  if (fs.existsSync(process.cwd() + myPath)) {
    log(process.cwd() + myPath, 'File Path');
    res.writeHead(200, {
      'Content-Type': getContentTypeByExt(require('path').extname(myPath)),
      // 'Set-Cookie': 'id=' + getHash()
    })
    var data = fs.readFileSync(process.cwd() + myPath)
    res.write(data);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.write(log(process.cwd() + myPath, 'File Not Found', 'WARN'));
  }
  res.end()
}

function log(data, description, type) {
  if (!description) description = 'Data'
  if (!type) type = 'DEBG'
  var now = new Date()
  var t = '[' + type + ']['
  t += now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ':' + now.getMilliseconds() + ']'
  t += description + ':'
  console.log(t, data);
  return t + ' ' + data.toString()
}

function getRedirect(path) {
  if (path == '/') {
    return '/index.html'
  } else {
    return path
  }
}

function getContentTypeByExt(ext) {
  if (ext == '.css') {
    return 'text/css'
  } else if (ext == '.html') {
    return 'text/html'
  } else if (ext == '.js') {
    return 'application/x-javascript'
  } else if (ext == '.json') {
    return 'application/json'
  } else {
    return 'text/plain'
  }
}