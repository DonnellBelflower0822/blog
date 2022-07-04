// 传输层,实现应用层http
const net = require('net')

const ReadyState = {
  UNSENT: 0,
  OPENED: 1,
  HEADERS_RECEIVED: 2,
  LOADING: 3,
  DONE: 4,
}

class XMLHttpRequest {
  constructor() {
    this.readyState = ReadyState.UNSENT
    this.headers = {
      Connection: 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36'
    }
  }
  open(method = 'GET', url) {
    this.method = method
    this.url = url
    const { hostname, port, path } = require('url').parse(url)
    this.hostname = hostname
    this.port = port
    this.path = path
    this.headers['Host'] = `${hostname}:${port}`

    // 通过传输层的net发起请求
    const server = this.socket = net.createServer({
      hostname,
      port
    }, (socket) => {
      socket.on('data', (data) => {
        // 处理响应
        data = data.toString()
        const [response, bodyRows] = data.split('\r\n\r\n')
        const [statusLine, ...headerRows] = response.split('\r\n')
        const [, status, statusText] = statusLine.split(' ')
        this.status = status
        this.statusText = statusText
        this.responseHeaders = headerRows.reduce((memo, row) => {
          const [key, value] = row.split(': ')
          return {
            ...memo,
            [key]: value
          }
        }, {})

        const [, body,] = bodyRows.split('\r\n')
        this.response = this.responseText = body
        this.onload && this.onload()
      })
    })
  }

  setRequestHeader(header, value) {
    this.headers[header] = value
  }
  onreadystatechange() { }

  send() {
    const rows = []
    rows.push(`${this.method} ${this.path} HTTP/1.1`)
    Object.keys(this.headers).forEach(key => {
      rows.push(`${key}: ${this.headers[key]}`)
    })
    const text = rows.join('\r\n') + '\r\n\r\n'
    console.log(text)
    this.socket.write(text)
  }
}

const xhr = new XMLHttpRequest()
// xhr.onreadystatechange = () => {
//   console.log('onreadystatechange', xhr.readyState)
// }
xhr.open('GET', 'http://localhost:3000/get')
xhr.responseText = 'text'
xhr.setRequestHeader('name', 'allen')
// xhr.onload = () => {
//   console.log(xhr)
// }
xhr.send()