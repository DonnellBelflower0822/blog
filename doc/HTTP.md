# HTTP
- 协议
- 从浏览器地址栏输入url到显示页面的步骤
- 如何进行网站性能优化
- HTTP状态码及其含义
- https://github.com/poetries/FE-Interview-Questions/blob/master/HTTP.md
- 安全问题

## ajax
> 异步的javascript和xml

- `XMLHttpRequest` 创建ajax对象
- `request.open(method,url,async)` 连接服务器
  - `method`:发送请求的方法 `GET/POST`
  - `url`:请求地址
  - `async`:是否异步传输,true异步传输
- `request.send(string)` 发送请求
  - `GET`请求无需string
  - `POST`需要带上string，
- `request.onreadystatechange=fn` 接受服务器响应数据
- `request.readyState` 响应返回所处状态
  - 0 未调用open()
  - 1 已经调用send(),正在发送请求
  - 2 send()完成，已经收到全部响应内容
  - 3 正在解析响应内容
  - 4 响应内容解析完毕，可以给客户端使用

```javascript
// 创建ajax对象
var request = new XMLHttpRequest()
request.open('GET', url, true)
request.send()
// 判断请求状态request.onreadystatechange
request.onreadystatechange = function () {
  // request.readyState 响应返回所处状态
  // 0 未调用open()
  // 1 已调用send()，正在发送请求
  // 2 send()方法完成，已经收到全部响应内容
  // 3 正在解析响应内容
  // 4 响应内容解析完毕，可以给客户端使用
  if (request.readyState === 4) {
    if (request.status === 200) {
      // 获得字符串形式的响应数据
      console.log(request.responseText)
    }
  }
}
```

## 简单封装
```javascript
function ajax (url, options, callback) {
  // 创建ajax对象
  var request = new XMLHttpRequest()
  var method = options.method || 'GET'
  method = method.toUpperCase()
  var data = options.data
  let params = ''
  if (data) {
    // 把参数带在url上
    for (let key in data) {
      params += '&' + key + '=' + data[ key ]
    }
  }
  // 连接服务器
  // 发送请求
  if (method === 'POST') {
    console.log(method)
    request.open(method, url, true)
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params.substring(1))
  } else if (method === 'GET') {
    url += url.indexOf('?') > -1 ? params : ('?' + params.substring(1))
    request.open(method, url, true)
    request.send()
  }
  // 等待结果
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status === 200) {
        let data = JSON.parse(request.responseText)
        callback(data)
      }
    }
  }
}
```

## 几种ajax请求方式
- get 获取数据
- post 上传数据
- put 修改数据
- delete 删除数据
- head 获取报文首部

## get和post区别
| | get | post |
| ---- | ---- | ------ |
| 参数位置 | url | request body(请求体) |
| 大小限制 | 决定在浏览器的参数长度 | 理论上没有限制 |
| 功能 | 获取数据 | 上传数据 |
| 安全 | 比较不安全 | 比较安全 |
| 缓存  | 浏览器主动缓存 | 不会缓存 | 
| 浏览器回退  | get回退是无害的 | post会再次请求  |

## 跨域
> 因为浏览器出于安全考虑，有同源策略

> 如果协议、域名或者端口有一个不同就是跨域，Ajax 请求会失败。

### jsonp
> 解决get的跨域

#### 原理
- 利用script标签的src不受同源策略限制，可以请求第三方服务器数据
- link和img也有这特性，img可以用于埋点
- 需要后端配合

#### 简单实现
```javascript
var url = 'https://c.y.qq.com/tips/fcgi-bin/fcg_music_red_dota.fcg?g_tk=153730533&jsonpCallback=MusicJsonCallback7917118951592015&loginUin=759811542&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&ct=24&qq=759811542&cid=205360410&reqtype=1&from=2'

function jsonp (url, jsonpCallback, success) {
  let script = document.createElement('script')
  script.type = 'text/javascript'
  // 加载完毕立即执行
  script.async = true
  script.src = url
  window[ jsonpCallback ] = function (data) {
    success && success(data)
  }
  document.body.appendChild(script)
}
jsonp(url,'jsonpCallback',function(data){
  console.log(data)
})
```

### CORS：跨域资源共享
**做法**
- 服务器设置Access-Control-Allow-OriginHTTP响应头之后，浏览器将会允许跨域请求
- Access-Control-Allow-OriginHTTP:*
- Access-Control-Allow-OriginHTTP:http://a.com

### 代理
- 开发时设置代理
- 上线时配置nginx
```javascript
// vuecli3.0
// vue.config.js
// /api/getDiscList/musichall/fcgi-bin => https://c.y.qq.com/musichall/fcgi-bin
module.exports={
  devServer:{
     proxy: {
        '/api/getDiscList': {
          target: 'https://c.y.qq.com',
          changeOrigin: true,
          pathRewrite: {
            // 将/api/getDiscList 替换成空
            '^/api/getDiscList': ''
          }
        }
      }
  }
}
```

## Http协议类
- 无连接：连接一次，就会断掉
- 无状态：不能区分两次连接的是否同一个人
- 灵活：可以通过http请求头的数据类型可以实现各种类型数据传输
- 简单快速：

## HTTP报文
### 请求报文
- 请求行：方法，url，http协议
- 请求头：请求数据类型
- 空行：
- 请求体：数据

### 响应报文
- 响应行：http协议 状态码
- 响应头：
- 空行：
- 响应体：数据

## http状态码
### 总体介绍
- 1开头： 指示信息
- 2开头：成功处理请求的状态代码
- 3开头：重定向
- 4开头：客户端出错
- 5开头：服务器出错

### ?? 详细点
| 状态码 | 说明 |
| ----- | ----- |
| 200(成功) | 客户端请求成功 | 
| 301 | 永久重定向  |
| 302 | 临时重定向 | 
| 304  | 浏览器有缓存，不用从服务器中取文件 | 
| 400  | 客户端请求有语法错误，不能被服务器所理解 |
| 401  | 请求未经授权 |
| 403  | 资源被禁止访问 | 
| 404  | 请求资源不存在 |
| 500  |  服务端错误 | 
| 503  |  服务端错误 | 

## cookie,sessionStorage和localStorage

|  | cookie | localStorage | sessionStorage | indexDB |
| --- | :-----: | :-----: | :------: | :------: |
| 存储大小 | 4k | 5m | 5m | 无限 |
| 数据生命周期 | 后端设置过期时间内有效 | 不主动清除，一直都在 | 页面关闭就清除 | 不主动清除，一直都在 | 
| 通信 | 同源的http请求头中携带 | 不参与 | 不参与 | 不参与 |
| 是否有同源策略 | 有 | 有 | 有 |

### 简单使用
```javascript
localStorage.getItem('key')
localStorage.setItem('key','value')
localStorage.removeItem('key')
localStorage.clear()
sessionStorage.getItem('key')
sessionStorage.setItem('key','value')
sessionStorage.removeItem('key')
sessionStorage.clear()
```

##  从输入url到得到html的详细过程
- 浏览器根据dns服务器得到域名的ip地址
- 向这个ip服务器发送http请求
- 服务器收到，处理并返回http请求
- 浏览器接收到返回内容

## 浏览器渲染过程
- 拿到html经过解析成DOM树
- 拿到css经过解析成css树
- 把DOM树和CSS树合成渲染树
- 通过layout:依照盒子模型，计算出每个节点在屏幕中的位置及尺寸
- 把渲染树通过浏览器绘制出来

## 性能优化
- 减少 HTTP 请求数量：css精灵，采用lazyload
- 采用字体图标
- 采用cdn加速
- 小图片使用base64
- 静态资源开启gzip压缩
- 组件异步加载
- 按需引入第三方包

## 重排Reflow
> 当可见节点位置及尺寸发生变化时会发生重排

> 每个元素都有自己的盒子模型，这些都需要浏览器根据各种样式计算，并根据计算结果将元素放在它该出现的位置，这个过程称之为reflow

### 触发Reflow
- 新增，修改，删除DOM节点
- 移动DOM
- 滚动 
- 改变元素字体大小

## 重绘Repaint
> 改变某个元素的背景色、文字颜色、边框颜色等等不影响它周围或内部布局的属性时

> 改变页面呈现内容都需要重绘

### 触发Repaint
- DOM改动
- CSS动画

### 两者关系
- 重绘不一定导致重排
- 重排一定会导致重绘

## 重绘和回流（重排）的区别和关系？
- 重绘：当渲染树中的元素外观（如：颜色）发生改变，不影响布局时，产生重绘
- 回流：当渲染树中的元素的布局（如：尺寸、位置、隐藏/状态状态）发生改变时，产生重绘回流
- 注意：JS获取Layout属性值（如：offsetLeft、scrollTop、getComputedStyle等）也会引起回流。因为浏览器需要通过回流计算最新值
- 回流必将引起重绘，而重绘不一定会引起回流

## 如何最小化重绘(repaint)和回流(reflow)？
- 需要要对元素进行复杂的操作时，可以先隐藏(display:"none")，操作完成后再显示
- 需要创建多个DOM节点时，使用DocumentFragment创建完后一次性的加入document
- 缓存Layout属性值，如：var left = elem.offsetLeft; 这样，多次使用 left 只产生一次回流
- 尽量避免用table布局（table元素一旦触发回流就会导致table里所有的其它元素回流）
- 避免使用css表达式(expression)，因为每次调用都会重新计算值（包括加载页面）
- 尽量使用 css 属性简写，如：用 border 代替 border-width, border-style, border-color
- 批量修改元素样式：elem.className 和 elem.style.cssText 代替 elem.style.xxx

## 跨域携带cookie
```
// 前端
xhr.withCredentials=true
// 后端
Access-Control-Allow-Origin: a.com
Access-Control-Allow-Credentials: true
```

## 安全问题
### xss跨站脚本攻击
```vue
v-html
```