# 事件环Event Loop

- MutationObserver

> Event Loop即事件循环，是指浏览器或Node的一种解决javaScript单线程运行时不会阻塞的一种机制

## chrome浏览器进程

- 浏览器是多进程
- 每个tab就是一个进程
- 浏览器主进程
  - 控制其他子进程的创建和销毁
  - 浏览器界面显示，比如用户交互，前进，后退
  - 将渲染内容绘制到用户界面
- 渲染进程：浏览器内核
  - 负责页面的渲染，脚本执行，事件处理
    - 页面渲染和脚本执行互斥
  - 每个tab都是一个渲染进程
    - 同源算一个
- 网络进程
  - 处理网络请求，文件访问
- GPU进程
  - 3D绘制
- 第三方插件进程

## 浏览器渲染进程

### GUI 渲染线程

- 绘制页面，解析 HTML、CSS，构建 DOM 树，布局和绘制等
- 页面重绘和回流
- 与 JS 引擎线程互斥，也就是所谓的 JS 执行阻塞页面更新

### JS 引擎线程

- 负责 JS 脚本代码的执行
- 负责准执行准备好待执行的事件，即定时器计数结束，或异步请求成功并正确返回的事件
- 与 GUI 渲染线程互斥，执行时间过长将阻塞页面的渲染

### 事件触发线程

- 负责将准备好的事件交给 JS 引擎线程执行
- 多个事件加入任务队列的时候需要排队等待(JS 的单线程)

### 定时器触发线程

- 负责执行异步的定时器类的事件，如 setTimeout、setInterval
- 定时器到时间之后把注册的回调加到任务队列的队尾

### HTTP 请求线程

- 负责执行异步请求
- 主线程执行代码遇到异步请求的时候会把函数交给该线程处理，当监听到状态变更事件，如果有回调函数，该线程会把回调函数加入到任务队列的队尾等待执行

## 任务分类

### 宏任务（MacroTask）

- script脚本
- setTimeout
- setInterval
- setImmediate
- requestAnimationFrame
- UI事件
- UI rendering
- 网络请求

### 微任务（MicroTask）

- Process.nextTick
- Promise.then/catch/finally
- MutationObserver

## 任务执行队列

```js
setTimeout // 会注册一个宏任务

new Promise(()=>{
  resolve() // 会注册一个微任务
  reject()  // 会注册一个微任务
})
Promise.resolve() // 会注册一个微任务
Promise.reject() // 会注册一个微任务
```

## 第一个例子

```js
console.log(1);

setTimeout(() => {  // setTimeout1
  console.log(2);
  Promise.resolve().then(() => {  // promise2
    console.log(3)
  });
});

new Promise((resolve, reject) => {  // promise1
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
})

setTimeout(() => {  // setTimeout2
  console.log(6);
})

console.log(7);
```

### 步骤1: 执行script全部代码，同步任务

```js
console.log(1);
// 注册setTimeout1的宏任务
console.log(4)
// 注册promise1的微任务
// 注册setTimeout2的宏任务
console.log(7);
```

**执行完毕后的调用队列**

```js
task = {
    MacroTask: [
      setTimeout1,
      setTimeout2
    ],
    MicroTask: [
      promise1
    ]
  }
```

### 第二步: 取出第一个微任务, promise1

```js
console.log(data);
```

**执行完毕后的调用队列**

```js
task = {
    MacroTask: [
      setTimeout1,
      setTimeout2
    ],
    MicroTask: [
    ]
  }
```

### 第三步: 取出第一个宏任务setTimeout1

> 此处的代码setTimeout都没设置事件，所以拿第一个。其他情况按那个宏任务先执行完成，调用回调

```js
console.log(2);
// 注册promise2的微任务
```

**执行完毕后的调用队列**

```js
task = {
    MacroTask: [
      setTimeout2
    ],
    MicroTask: [
      promise2
    ]
  }
```

### 第四步: 取出当前第一个微任务, promise2

```js
console.log(3)
```

**执行完毕后的调用队列**

```js
task = {
    MacroTask: [
      setTimeout2
    ],
    MicroTask: [
    ]
  }
```

### 第五步: 取出当前第一个宏任务, setTimeout2

```js
console.log(6);
```

**执行完毕后的调用队列**

```js
task = {
    MacroTask: [
    ],
    MicroTask: [
    ]
  }
```

## 理解async/await

```js
function A() {
  return Promise.resolve(Date.now());
}

async function B() {
  console.log(Math.random());
  let now = await A();
  console.log(now);
}

console.log(1);
B();
console.log(2);
```

**等价写法**

```js
function B() {
  console.log(Math.random());
  A().then(now=>{
    console.log(now);
  });
}

console.log(1);
B();
console.log(2);
```

## 第二个例子

```js
console.log('script start');

setTimeout(() => {    // settimeout1
  console.log('settimout1');
}, 2000);

Promise.resolve()
  .then(function () {   // promise1
    console.log('promise1');
  })
  .then(function () {   // promise5
    console.log('promise2');
  });

async function foo() {
  await bar()
  console.log('async1 end')   // promise2
}
foo()

function bar() {
  console.log('async2 end')
}

async function errorFunc() {
  // 等价于

  /***
   Promise.reject('error!!!').then(()=>{
      console.log(e)
      console.log('async1');
      return Promise.resolve('async1 success')
   })
   */
  try {
    await Promise.reject('error!!!')
  } catch (e) {
    // promise3
    console.log(e)
  }
  console.log('async1');
  // 执行到这里采取注册下面的.then微任务
  return Promise.resolve('async1 success')
}
errorFunc().then(res => console.log(res)) // promise4

console.log('script end');
```

### 第一步：script代码

```js
console.log('script start');
// 注册宏任务settimeout1
// 注册微任务promise1

// foo() => await bar() => bar().then(()=>{console.log('async1 end')})
console.log('async2 end')
// 注册微任务promise2

// errorFunc()  => Prmosise.reject().catch(()=>{  })  
// 注册微任务promise3

console.log('script end');
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    // 2秒后执行
    settimeout1
  ],
  MicroTask: [
    promise1,
    promise2,
    promise3
  ]
}
```

### 第二步: 取出第一个微任务promise1

**执行**

```js
console.log('promise1');
// 注册微任务： promise5
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    // 2秒后执行
    settimeout1
  ],
  MicroTask: [
    promise2,
    promise3,
    promise5
  ]
}
```

### 第三步: 取出第一个微任务promise2

```js
console.log('async1 end')
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    // 2秒后执行
    settimeout1
  ],
  MicroTask: [
    promise3,
    promise5
  ]
}
```

### 第四步: 取出第一个微任务promise3

```js
console.log(e)
console.log('async1');

// Promise.resolve('async1 success')
// 然后注册 promise4
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    // 2秒后执行
    settimeout1
  ],
  MicroTask: [
    promise5,
    promise4
  ]
}
```

### 第五步: 取出第一个微任务promise5

```js
console.log('promise2');
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    // 2秒后执行
    settimeout1
  ],
  MicroTask: [
    promise4
  ]
}
```

### 第五步: 取出第一个微任务promise4

```js
console.log(res)
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    // 2秒后执行
    settimeout1
  ],
  MicroTask: [
  ]
}
```

### 第六步：取出第一个宏任务settimeout1

```js
console.log('settimout1');
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
  ],
  MicroTask: [
  ]
}
```

## 第三个例子

```js
console.log('1');

setTimeout(() => {      // setTimeout1
  console.log('2');
  Promise.resolve()     // promise2-1
    .then(() => {
      console.log('3');
    })
  new Promise((resolve) => {
    console.log('4');
    resolve();
  })   // promise2-2
    .then(() => {
      console.log('5')
    })
})

Promise.reject()  // promise1
  .then(() => {
    console.log('13');
  }, () => {
    console.log('12');
  })

new Promise((resolve) => {
  console.log('7');
  resolve();  // promise2
}).then(() => {
  console.log('8')
})

setTimeout(() => {    // settimeout2
  console.log('9');
  Promise.resolve()   // promise3-1
    .then(() => {
      console.log('10');
    })
  new Promise((resolve) => {
    console.log('11');
    resolve();
  })  // promise3-2
    .then(() => {
      console.log('12')
    })
})
```

### 第一步: 宏任务：script代码
```
console.log('1');
// 注册宏任务: setTimeout1
// 注册微任务：promise1
console.log('7');
// 注册微任务: promise2
// 注册宏任务：settimeout2
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    setTimeout1,
    settimeout2
  ],
  MicroTask: [
    promise1,
    promise2
  ]
}
```

### 第二步：取出第一个微任务:promise1

```
// 由于是reject
console.log('12');
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    setTimeout1,
    settimeout2
  ],
  MicroTask: [
    promise2
  ]
}
```

### 第三步：取出第一个微任务:promise2

```
console.log('8')
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    setTimeout1,
    settimeout2
  ],
  MicroTask: [
  ]
}
```

### 第四步：取出第一个宏任务:setTimeout1

```
console.log('2');
// 注册微任务: promise2-1
console.log('4');
// 注册微任务：promise2-2
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    settimeout2
  ],
  MicroTask: [
    promise2-1，
    promise2-2
  ]
}
```

### 第五步：取出第一个微任务:promise2-1

```js
console.log('3');
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    settimeout2
  ],
  MicroTask: [
    promise2-2
  ]
}
```

### 第六步：取出第一个微任务:promise2-2

```js
console.log('5')
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    settimeout2
  ],
  MicroTask: [
  ]
}
```

### 第七步：取出第一个宏任务:settimeout2

```js
console.log('9');
// 注册微任务： promise3-1
console.log('11');
// 注册微任务：promise3-2
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
  ],
  MicroTask: [
     promise3-1,
     promise3-2
  ]
}
```

### 第八步：取出第一个微任务: promise3-1

```js
console.log('10');
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
  ],
  MicroTask: [
     promise3-2
  ]
}
```

### 第九步：取出第一个微任务: promise3-2

```js
console.log('12')
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
  ],
  MicroTask: [
  ]
}
```

## 第四个例子

### 第一步: 宏任务 scirpt代码

```js
// 注册微任务: promise1-1
// 注册宏任务：settimeout1-1
console.log('start');
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    settimeout1-1
  ],
  MicroTask: [
    promise1-1
  ]
}
```

### 第二步: 取出第一个微任务: promise1-1

```js
console.log('promise1');
// 注册宏任务：settimeout2-1
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    // 0秒
    settimeout1-1,
    // 0秒
    settimeout2-1
  ],
  MicroTask: [
  ]
}
```

### 第三步: 取出第一个宏任务: settimeout1-1,

```js
console.log('timer1')
// 注册微任务：promise5-1
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    // 0秒
    settimeout2-1
  ],
  MicroTask: [
    promise5-1
  ]
}
```

### 第四步: 取出第一个微任务: promise5-1

```js
console.log('promise3')
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    // 0秒
    settimeout2-1
  ],
  MicroTask: [
  ]
}
```

### 第五步: 取出第一个宏任务: settimeout2-1

```js
console.log('timer2')
// 注册微任务：promise2-1
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
  ],
  MicroTask: [
    promise2-1
  ]
}
```

### 第六步: 取出第一个微任务: promise2-1

```js
// 注册宏任务：settimeout5-1
// 注册微任务: promise4-1
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    settimeout5-1
  ],
  MicroTask: [
    promise4-1
  ]
}
```

### 第七步: 取出第一个微任务：promise4-1

```js
// 注册宏任务：settimeout6-1
// 注册微任务：promise6-1
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    settimeout5-1,
    settimeout6-1
  ],
  MicroTask: [
    promise6-1
  ]
}
```

### 第七步: 取出第一个微任务：promise6-1

```js
// undefined
console.log(res);
// 注册微任务：promise5-1
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    settimeout5-1,
    settimeout6-1
  ],
  MicroTask: [
    promise5-1
  ]
}
```

### 第七步: 取出第一个微任务：promise5-1

```js
// new Error('error2')
console.log(err);
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    settimeout5-1,
    settimeout6-1
  ],
  MicroTask: [
  ]
}
```

### 第八步: 取出第一个宏任务：settimeout5-1

```js
console.log('async1');
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
    settimeout6-1
  ],
  MicroTask: [
  ]
}
```

### 第八步: 取出第一个宏任务：settimeout6-1

```js
// new Error('error1')
console.log(ret);
// 注册微任务：promise8-1
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
  ],
  MicroTask: [
    promise8-1
  ]
}
```

### 第八步: 取出第一个微任务：promise8-1

```js
// 注册微任务：promise9-1
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
  ],
  MicroTask: [
    promise9-1
  ]
}
```

### 第八步: 取出第一个微任务：promise9-1

```js
// catch: new Error('error!!!')
console.log("catch: ", err)
```

**执行完毕后的调用队列**

```
stack = {
  MacroTask:[
  ],
  MicroTask: [
  ]
}
```