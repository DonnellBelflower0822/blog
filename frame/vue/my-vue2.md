# 手写vue2

## 响应式

### 对象的响应式

- 通过Object.defineProperty去实现响应式
- 初始化的object对象进行全量劫持
  - 对value为对象递归劫持
  - 新设置的value为对象递归劫持（A）
- 新增属性没有劫持
  - 可以通过this.$set
  - 可以赋值父级对象(走A的路)

### 数组的响应式

- 内部不是用Object.defineProperty去代理
- 数组的push,pop,shift,unshift,reverse,sort,splice进行变异
  - 主要考虑性能问题
- 数组中的子项为对象也会递归劫持
  - 数组中的对象修改也会触发响应式
- 该数组索引和长度不会触发更新

### vue2的data建议
- 数据嵌套不要太深
  - 嵌套太深会有大量递归

## 编译过程

### 1. 从template的字符串转换为ast数据结构

```html
<div id="app">
  {{name}}
</div>
```

**转成ast**

> 转换原理，通过正则匹配到后删除，继续正则配置

```js
{
    attrs: [
      {name: "id", value: "app"}
    ],
    children: [
      {type: 3, text: "{{name}}"}
    ],
    parent: undefined
    tag: "div"
    type: 1
}
```

**ast数据结构**

```ts
export interface Ast {
  tag: string,
  type: 1 | 3;
  children: Ast[],
  parent: Ast | null,
  attrs: Attr[];
  text?: string;
}
```

### 2. 将ast树转成 生成代码 字符串

```
_c('div',{id:"app",style:{"color":"red","backgroundColor":" blue"}},_c('div',undefined,_v("hello-"+arr1)),_c('div',undefined,_v(name)))
```

### 3. 将代码封装到render函数

> 使用with执行this

```js
return new Function(`with(this){return ${code}}`)
```

## vue的更新是异步的

```ts
let queue: Watcher[] = [];
let has = {};

let pending = false;

export function queueWatcher(wathcer: Watcher) {
  const { id } = wathcer;
  if (!has[id]) {
    queue.push(wathcer);
    has[id] = true;

    if (!pending) {
      pending = true;
      // 异步执行
      nextTick(flushSchedulerQueue);
    }
  }
}
```

## nextTick

> 以防抖的形式开启更新

```ts
export function nextTick(cb) {
  callbacks.push(cb);

  if (!waiting) {
    waiting = true;
    timerFn(flushCallbacks);
  }
}

function timerFn(cb) {
  if (Promise) {
    Promise.resolve().then(cb);
  } else if (MutationObserver) {
    const textnode = document.createTextNode('1');
    const observer = new MutationObserver(cb);
    observer.observe(textnode, { characterData: true });
    textnode.textContent = '2';
  } else if (setImmediate) {
    setImmediate(cb);
  } else {
    setTimeout(cb);
  }
}
```

## Dep和Watcher

- Dep：
  - 针对对象的每个属性，对象本身，数组本身
  - 一个dep存放多个watcher
- Watcher：
  - 一个组件有一个渲染watcher
  - 一个watcher可以存放多个dep

## watcher
- 渲染watcher
- 用户watcher
  - 计算
  - watch


## computed

- 计算属性默认不执行，
- 多次取值且依赖的值不变则不重新执行
- 依赖值改变，重新执行

