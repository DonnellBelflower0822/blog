# 浏览器

- 垃圾回收
- 浏览器缓存
- 浏览器渲染过程

## 单线程

## 内存泄漏

> JavaScript 内存泄露指对象在不需要使用它时仍然存在，导致占用的内存不能使用或回收

### 可能情况

- 未使用 var 声明的全局变量
- 闭包函数(Closures)
- 循环引用(两个对象相互引用)
- 控制台日志(console.log)
- 移除存在绑定事件的DOM元素(IE)
- setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏
- 垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收

## 事件机制

<img src='./img/event.png'/>

### 阶段

- 事件捕获阶段
- 处于目标阶段
- 事件冒泡阶段

### demo

> app2 -> app1

```html
<div id="app1">
  <div id="app2">1111</div>
</div>
<script>
  app1.onclick = () => {
    alert('app1')
  }
  app2.onclick = () => {
    alert('app2')
  }
</script>
```

### 捕获/冒泡

**addEventListener第三个参数为true是捕获阶段，false为冒泡阶段(默认值为false)**

```html
<div id="app1">
  <div id="app2">1111</div>
</div>
<script>
  // app1 capture 捕获
  // app2 capture 捕获
  // app2 bubbling 冒泡
  // app1 bubbling 冒泡
  app1.addEventListener('click', () => {
    console.log('app1 capture 捕获')
  }, true)
  app2.addEventListener('click', () => {
    console.log('app2 capture 捕获')
  }, true)
  app1.addEventListener('click', () => {
    console.log('app1 bubbling 冒泡')
  }, false)
  app2.addEventListener('click', () => {
    console.log('app2 bubbling 冒泡')
  }, false)
</script>
```

## 事件流阻止

### preventDefault

> 取消事件对象的默认动作以及继续传播。

### 阻止冒泡

```html
<div id="app1">
  <div id="app2">1111</div>
</div>
<script>
  // app1 capture 捕获
  // app2 capture 捕获
  // app2 bubbling 冒泡
  app1.addEventListener('click', () => {
    console.log('app1 capture 捕获')
  }, true)
  app2.addEventListener('click', (e) => {
    console.log('app2 capture 捕获')
  }, true)
  app1.addEventListener('click', () => {
    console.log('app1 bubbling 冒泡')
  }, false)
  app2.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('app2 bubbling 冒泡')
  }, false)
</script>
```

**兼容写法**

```js
// app2 bubbling 冒泡
app1.addEventListener('click', () => {
  console.log('app1 bubbling 冒泡')
}, false)
app2.addEventListener('click', (e) => {
  if (e.stopPropagation) {
    e.stopPropagation()
  } else {
    e.preventDefault = true
  }
  console.log('app2 bubbling 冒泡')
}, false)
```


### stopImmediatePropagation

```js
// app2 bubbling 冒泡
// 我又监听了一次冒泡
app2.addEventListener('click', (e) => {
  e.stopPropagation()
  console.log('app2 bubbling 冒泡')
}, false)
app2.addEventListener('click', (e) => {
  console.log('我又监听了一次冒泡')
}, false)
```

> 这种先注册的调用stopImmediatePropagation后续不会执行

```js
// app2 bubbling 冒泡
app2.addEventListener('click', (e) => {
  e.stopImmediatePropagation()
  console.log('app2 bubbling 冒泡')
}, false)
app2.addEventListener('click', (e) => {
  console.log('我又监听了一次冒泡')
}, false)
```

> 但在后面注册函数调用stopImmediatePropagation前面的还是会执行

```js
// 我又监听了一次冒泡
// app2 bubbling 冒泡
app2.addEventListener('click', (e) => {
  console.log('我又监听了一次冒泡')
}, false)
app2.addEventListener('click', (e) => {
  e.stopImmediatePropagation()
  console.log('app2 bubbling 冒泡')
}, false)
```

## 事件委托

> 利用事件的冒泡原理，通过event找到触发事件的源dom

```html
<ul id="app2">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
<script>
  window.onload = () => {
    app2.addEventListener('click', (e) => {
      const { target } = e
      if (target.nodeName === 'LI') {
        console.log(target.innerHTML)
      }
    })
  }
</script>
```


## 浏览器的缓存机制
- 对于强缓存，浏览器在第一次请求的时候，会直接下载资源，然后缓存在本地，第二次请求的时候，直接使用缓存。
- 对于协商缓存，第一次请求缓存且保存缓存标识与时间，重复请求向服务器发送缓存标识和最后缓存时间，服务端进行校验，如果失效则使用缓存

### 协商缓存的设置

- Exprires：服务端的响应头，第一次请求的时候，告诉客户端，该资源什么时候会过期。Exprires的缺陷是必须保证服务端时间和客户端时间严格同步。
- Cache-control：max-age：表示该资源多少时间后过期，解决了客户端和服务端时间必须同步的问题，
- If-None-Match/ETag：缓存标识，对比缓存时使用它来标识一个缓存，第一次请求的时候，服务端会返回该标识给客户端，客户端在第二次请求的时候会带上该标识与服务端进行对比并返回If-None-Match标识是否表示匹配。
- Last-modified/If-Modified-Since：第一次请求的时候服务端返回Last-modified表明请求的资源上次的修改时间，第二次请求的时候客户端带上请求头If-Modified-Since，表示资源上次的修改时间，服务端拿到这两个字段进行对比