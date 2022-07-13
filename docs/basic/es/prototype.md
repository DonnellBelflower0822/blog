# 原型/原型链

## 资料
- https://muyiy.cn/blog/5/5.1.html#%E5%BC%95%E8%A8%80

## 任务
- 原型
- 原型链
- 继承
- new
- instanceof

## instanceof

### 手写instanceof

```js
instance.__proto__ === constructor.prototype
```

```js
function myInstanceof(instance, constructor) {
  // 处理null和undefined的情况
  if (instance === undefined || instance === null) {
    throw new Error('error')
  }

  // 处理普通类型
  if (typeof instance !== 'object' && typeof instance !== 'function') {
    return false
  }

  let instanceProto = instance.__proto__;
  const { prototype } = constructor

  while (true) {
    if (instanceProto === null) {
      return false
    }

    if (prototype === instanceProto) {
      return true
    }

    instanceProto = instanceProto.__proto__
  }
}
```