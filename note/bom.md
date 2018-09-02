# BOM
## setTimeout/setInterval

## location
```javascript
console.log(location.host)
console.log(location.hostname)
console.log(location.hash)
console.log(location.pathname)
console.log(location.port)
console.log(location.search)
location.href=""
```

### 获取url上的参数
```javascript
function getQuery (paramName) {
    let search = location.search
    if (!search || search.indexOf('?') === -1) {
      return false
    }
    search = search.substring(1)
    search = search.split('&')
    let obj = {}
    search.forEach((item, index) => {
      if (item && item.indexOf('=') !== -1) {
        item = item.split('=')
        obj[item[0]] = item[1]
      }
    })
    return obj[paramName] || false
}
```

## navigator
```javascript
let ua = navigator.userAgent
```

## history
```javascript
history.go()
history.back()
history.forward()
```