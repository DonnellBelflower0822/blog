# 基础

- 常用组件的实现原理

## spa的理解,优缺点

> SPA（ single-page application ）仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。

### 优点：

- 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
- 基于上面一点，SPA 相对对服务器压力小；
- 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；

### 缺点：

- 初次加载耗时多：为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载；
- 前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
- SEO 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。

## computed 和 watch

- computed： 
  - 是计算属性，依赖其它属性值
  - 并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed  的值；
- watch： 
  - 更多的是「观察」的作用，
  - 类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；

### 场景

- 当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
- 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

## vue2的数组

- 通过push,pop,shift,unshift,splice,sort方法，vue才能监测到数组变化
- this.$set()

## 生命周期




## 指令
- 可以复用
- 核心是控制dom

### 注册
```ts
// 全局
Vue.directive('focus', {
})

// 组件内部
export default {
  directives: {
    focus: {}
  }
}
```

### 定义

```ts
export default {
  directives: {
    clickOutside: {
      bind(el, bindings, vnode) {
        const handler = (e) => {
          if (!el.contains(e.target)) {
            const fn = vnode.context[bindings.expression]
            fn()
          }
        }
        el.handler = handler
        document.addEventListener('click', handler)
        console.log('参数:', bindings.modifiers)
        console.log('vue实例:', vnode.context)
        console.log('当前dom:', el)
      },
      unbind(el) {
        if (el?.handler) {
          document.removeEventListener('click', el?.handler)
        }
      },
    }
  },
}
```

### 使用
```vue
<template>
  <div v-click-outside.a="hide">
    <input type="text" @focus="show" />
    <div v-show="isShow">内容</div>
  </div>
</template>
```

## 请求放在那个钩子函数

- created和mounted都可以的
- 在服务端渲染中只支持created

## 组件通信
- props,emits
- $attrs/$listener
- $parent/$children
- $refs
- provider/inject
- eventBus
- vuex

### 示例

```vue
<template>
  <el-form :model="user" :rules="rules" ref="form">
    <el-form-item prop="name">
      <el-input v-model="user.name" />
    </el-form-item>
    <el-form-item prop="age">
      <el-input v-model="user.age" />
    </el-form-item>
    <el-form-item>
      <button @click="submit">提交</button>
    </el-form-item>
  </el-form>
</template>
<script>
export default{
  methods: {
    submit() {
      this.$refs.form.validate((res) => {
        console.log(res)
      })
    },
  },
}
</script>
```

### props/emit - el-input

```vue
<template>
  <input type="text" :value="value" @input="handleChange" />
</template>
<script>
export default{
  methods: {
    handleChange(e) {
      this.$emit('input', e.target.value)
      // this.$emit('update:value', e.target.value)
      this.$dispatch('ElFormItem', 'changeValue')
    },
  },
}
</script>
```

### $parent/$childen

```js
Vue.prototype.$dispatch = function (componentName, name) {
  let parent = this.$parent
  while (parent) {
    if (parent.$options.name === componentName) {
      break
    } else {
      parent = parent.$parent
    }
  }

  if (parent && name) {
    // 触发实例的方法, 对应实例需要$on监听此事件
    parent.$emit(name)
  }

  return parent
}
```

### provider/inject

```vue
<script>
Vue.prototype.$broadcast = function (componentName, name) {
  let children = this.$children

  const arr = []

  function find(children) {
    children.forEach((child) => {
      if (child.$options.name === componentName) {
        arr.push(child)
        if (name) {
          child.$emit(name)
        }
      }

      if (child.$children) {
        find(child.$children)
      }
    })
  }

  find(children)
  return arr
}
export default {
  name: 'ElForm',
  // 为子提供
  provide() {
    return {
      elForm: this,
    }
  },
  mounted() {
    this.validate()
  },
  methods: {
    validate(cb) {
      const r = this.$broadcast('ElFormItem').every((item) => item.validate())
      cb?.(r)
    },
  },
}
</script>
```


## v-model

在组件上<Com :value='value' @change='val => value =val'>

## 问题

### MVVM

- 隐藏controller
- 映射关系简化
- model,view,viewModel
- Vue的核心库只关注视图层

### 响应式

- 对象
  - 对象内部通过defineReactive方法，使用Object.defineProperty对属性进行劫持（只劫持已经存在的属性）
  - 多层对象通过递归劫持
- 数组
  - 数组通过重写实例上__proto__的pop，push，unshift，shift，sort，splice，reverse方法实现数据劫持
  - 数组的索引和长度变化无法更改
  - 数组中子项也是对象，递归劫持
- 数组和对象本身维护一个dep

### 依赖收集

- 每个属性拥有自己的dep属性，存放他所依赖的watcher。
- 初始化时会调用render，就用触发属性的get，从而收集依赖`dep.depend()`
- 属性发生修改时，触发watcher更新操作`dep.notify()`

### 模板编译
> template转换成render函数

- 将template转换成ast
- 做静态语法做静态标记
- 生成render函数

```ts
export function compileToFunction(template: string) {
  // 1. 将template转换成ast
  // '<div id="app"><div>{{name}}</div><div>{{name}}</div></div>'(string) -> ast:Ast
  const root = parserHTML(template);

  // 2. 对静态语法做静态标记
  // ast -> "_c('div',id="app",style={"color":"red","backgroundColor":" blue"},_c('div',undefined,_v("hello-"+name+"world")))"
  const code = generate(root);

  // 3. 重新生成代码
  // string -> render
  const render = new Function(`with(this){return ${code}}`) as Render;
  return render;
}

_c(
  'div',
  {attrs:{"id":"app"}},
  [
    _c('div',
      {
        staticClass:"a",
        staticStyle:{"background-color":"red"}
      },
      [_v("hello")]
    ),
    _v(_s(a)+_s(b)+_s(c))
  ]
)

export interface Ast {
  tag: string,
  type: 1 | 3;
  children: Ast[],
  parent: Ast | null,
  attrs: Attr[];
  text?: string;
}
```

### 生命周期

- 生命周期钩子就是回调函数，在创建组件实例中调用对应的钩子方法
- 内部会对钩子函数进行处理，将钩子函数维护成数组的形式

```js
vm = {
  $options:{
    beforeCreate: [beforeCreate1,beforeCreate2]
  }
}
```

### 每个生命周期

```js
new Vue({
  beforeCreate() {
    // 初始化：组件父子关系
    console.log('parent beforeCreate')
  },
  created() {
    // 响应式数据
    console.log('parent created')
  },
  beforeMount() {
    // 挂载之前：
    console.log('parent beforeMount')
  },
  mounted() {
    // 新创建$el,并且挂载到实例上
    console.log('parent mounted')
  },
  beforeUpdate() {
    // 数据更新之前
    console.log('parent beforeUpdate')
  },
  updated() {
    // 数据更新完成
    console.log('parent updated')
  },
  beforeDestroy() {
    // 实例销毁之前，实例仍然完全可用
    console.log('parent beforeDestroy')
  },
  destroyed() {
    console.log('parent destroyed')
  },
})
```

## Vue.mixin

- 抽离公共的业务逻辑
- 缺点
  - 命名冲突
  - 依赖
  - 数据来源不明

## Vue组件data为什么是函数

- 如果是对象，在mixin的时候会合并，保存都是同一引用地址，数据会被污染

## nextTick

- 数据更改是异步更新,nextTick保存数据更新后才执行，能拿到最新的dom
- 封装`$nextTick`能保证先后顺序，内部的`渲染watcher`等会先于用户通过`this.$nextTick`

### 实现
> 换一种写法。vue2的方法有多种降级兼容。vue3就Promise.resolve().then

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
    // 支持Promise
    Promise.resolve().then(cb);
  } else if (MutationObserver) {
    // MutationObserver
    const textnode = document.createTextNode('1');
    const observer = new MutationObserver(cb);
    observer.observe(textnode, { characterData: true });
    textnode.textContent = '2';
  } else if (setImmediate) {
    // setImmediate
    setImmediate(cb);
  } else {
    // setTimeout
    setTimeout(cb);
  }
}
```

## computed和watch

- 同时基于watcher实现
- computed
  - 具备缓存，依赖的值不发生变化，不会重新执行计算方法
  - 获取computed值时才去执行计算方法
  - 依赖值发生变化也不会立即执行计算方法，只有下一次获取computed值时才会重新计算
- watch是监控值变化，当值发生改变是调用回调函数

## $set

- 对象和数组本身都有dep属性
- 数组：调用splice
- 对象：调用defineReactive

## 虚拟dom
- 用js来描述真实dom，是对真实DOM的抽象
- 跨平台
- 进行dom-diff，对比新旧虚拟DOM的差异进行更新。
- 保证更新的下限

## diff

## 数据劫持为什么还需要dom-diff来监测差异
- 如果给每个属性都添加watcher，会产生大量的watcher，从而降低性能
- 颗粒过细会导致更新不准确
- vue采用组件级更新，渲染watcher

## key
- 以key作为判断是否相同节点的依据。如果相同就可以复用

## 组件化
- 提高应用开发效率，测试性，复用性
- 组件话：属性，自定义事件，插槽
- 降低更新范围，只重新渲染变化组件
- 组件特点：
  - 高内聚
  - 低耦合
  - 单线数据流

## 组件渲染流程

## 异步组件
- 默认渲染异步组件会先放个占位符
- 等到组件加载完毕后调用自己的强制更新forceUpdate


## vue响应式
### Object.defineProperty

> 每个属性的测试

```js
// 基础使用
const obj1 = {}
Object.defineProperty(obj1, 'name', {
  value: 'hello'
})

// { name: 'hello' } []
console.log(obj1, Object.keys(obj1));


/**
 * 测试枚举:enumerable
 * 默认是false
 */
const obj1 = {}

Object.defineProperty(obj1, 'name', {
  enumerable: true,  // 是否可枚举
  value: 'hello'
})

// { name: 'hello' } [ 'name' ]
console.log(obj1, Object.keys(obj1));


/**
 * 是否可删除：configurable
 */
const obj2 = {}

Object.defineProperty(obj2, 'name', {
  enumerable: true,
  // 能不能删除
  configurable: false,
  value: 'hello'
})

delete obj2.name
console.log(obj2); // { name: 'hello' }

/**
 * 是否重写: writable
 */
const obj3 = {}

Object.defineProperty(obj3, 'name', {
  enumerable: true,
  configurable: true,
  value: 'hello',
  // 是否重写
  writable: false
})

obj3.name = 'tom';
console.log(obj3); // { name: 'hello' }

/**
 * get,set
 */
const obj4 = {};
let other = '';

Object.defineProperty(obj4, 'name', {
  enumerable: true,
  configurable: true,
  get() {
    console.log('get obj')
    return other
  },
  set(val) {
    console.log('set obj')
    other = val
  }
})

// set obj
obj4.name = 'tom';
// get obj
obj4.name

/**
 * 使用get和set操作符
 */
const obj5 = {
  other: '123',
  get name() {
    console.log('get obj1')
    return this.other
  },
  set name(val) {
    console.log('set obj1')
    this.other = val
  }
}
// set obj1
obj5.name = 'tom';
// get obj1
obj5.name
```

#### vue2响应式简陋实现

```js
const data = {
  name: 'allen',
  age: 12,
  address: {
    location: '深圳'
  }
}

const update = () => {
  console.log('触发修改')
}

// 劫持数组的一些方法，去触发更新
const methods = ['push', 'pop', 'splice']
methods.forEach(method => {
  const oldFn = Array.prototype[method]
  Array.prototype[method] = function (...args) {
    update()
    oldFn.call(this, ...args)
  }
})

function defineReactive(obj, key, value) {
  // 递归value，有可能是对象，需要递归
  observer(value)

  Object.defineProperty(obj, key, {
    get() {
      return value
    },
    set(val) {
      if (val !== value) {
        observer(val)
        update()
        value = val
      }
    }
  })
}

function observer(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  for (const key in obj) {
    defineReactive(obj, key, obj[key])
  }
}

observer(data)
```

### proxy

```js
function defineProxy(data) {
  return new Proxy(data, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver)
    },
    // set 返回设置结果
    set(target, key, value, receiver) {
      console.log('update', key, value)

      return Reflect.set(target, key, value, receiver)
    }
  })
}

// 对象
const obj = {
  name: 'allen',
  arr: 27
}

const objectProxy = defineProxy(obj)

objectProxy.name = '1'

// 数组
const arr = [1, 2, 3, 4, 5]

const arrProxy = defineProxy(arr)
// update 5 12
// update length 6
arrProxy.push(12)

// update length 10
arrProxy.length = 10
```