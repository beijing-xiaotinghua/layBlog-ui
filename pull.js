const http = require('http');
const exec = require('exec');
const PORT = 3389

var deployServer = http.createServer(function(request, response) {
  if (request.url.search(/pull\/?$/i) > 0) {
    var commands = ['git pull', 'npm run server'].join(' && ');
    exec(commands, function(err, out, code) {
      if (err instanceof Error) {
        response.writeHead(500)
        response.end('Server Internal Error.')
        throw err
      }
      process.stderr.write(err)
      process.stdout.write(out)
      response.writeHead(200)
    })
  } else {
    response.writeHead(404)
    response.end('Not Found.')
  }
})

deployServer.listen(PORT);
