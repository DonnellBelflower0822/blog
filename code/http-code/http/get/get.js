const path = require('path')
const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url)
  if (['/get.html'].includes(pathname)) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    const htmlContent = fs.readFileSync(path.join(__dirname, 'get.html'))
    res.write(htmlContent)
    res.end()
  } else if (pathname === '/get') {
    res.setHeader('Content-Type', 'text/plain')
    res.statusCode = 200
    res.end('hello')
  } else {
    res.end()
  }
})

server.listen(3000)