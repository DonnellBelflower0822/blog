const ajax = () => {
    const method = 'get'
    const url = ''
    const data = {}

    const xhr = new XMLHttpRequest()

    xhr.open(method, url, true)

    xhr.withCredentials = true
    
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    xhr.addEventListener('readystatechange', () => {

    })

    xhr.send(JSON.stringify(data))
}