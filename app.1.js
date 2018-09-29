var http = require('http');
var port = 18080;
var fs = require('fs');
console.log("The server is listening on port 18080.");
http.createServer(function(req, res) {
  var myUrl = require('url').parse(req.url)
  if (myUrl.pathname == '/') {
    myUrl.pathname = '/index.html'
  }
  // myPath = myUrl.pathname.replace('/', '\\')
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
}).listen(port);

// function tree(res, root = '/', level = 0) {
//   root = root.replace('/', '\\')
//   root = root.replace('\\\\', '\\')
//   fs.readdirSync(process.cwd() + root).forEach(file => {
//     res.write('<p style="text-indent:' + level * 20 + 'px">' + file + '</p>')
//     console.log(process.cwd() + root + '/' + file);
//     myStat = fs.statSync(process.cwd() + root + '/' + file)
//     if (myStat.isDirectory()) {
//       res.write('<div>')
//       tree(res, root + '/' + file, level + 1)
//       res.write('</div>')
//     }
//   });
// }

function getHash() {
  return String(Number(String(Math.random()).split('.')[1]))
}
