# 手写vuex(vue2)

### 主入口

```js
import { install } from './install'
import Store from './store'

export default {
  install,
  Store
}
```

### install: 为每个组件在beforeCreate注入$store

```js
export let Vue

export function install(_Vue) {
  Vue = _Vue

  // 为每个组件都注入beforeCreate
  Vue.mixin({
    beforeCreate() {
      const { $options: options } = this
      if (options.store) {
        // 根
        this.$store = options.store
      } else {
        // 子
        if (this.$parent && this.$parent.$store) {
          this.$store = this.$parent.$store
        }
      }
    },
  })
}
```

### Store: 使用new Vue将数据变成响应式

- 将数据变成响应式
  - 使用地方会被收集watcher
  - 更改响应式数据会执行watcher
- getters的功能其实就是computed
  - 具有缓存功能
- commit/mutations：同步更改数据
- dispatch/actions: 异步更改数据

```js
import { Vue } from './install'
/**
 * 此处用Vue去创建响应式数据，
 * 当响应式数据使用时会watcher
 * 当响应式数据更改是会触发watcher更新
 */
const forEach = (obj, fn) => {
  Object.keys(obj).forEach(key => {
    fn(obj[key], key)
  })
}

export default class Store {
  constructor(options) {
    const { state, getters, mutations, actions } = options

    // getters其实就是computed, 具有缓存功能
    this.getters = {}
    const computed = {}
    forEach(getters, (fn, key) => {
      computed[key] = () => fn(this.state)

      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key]
      })
    })

    // 同步更改
    this.mutations = {}
    forEach(mutations, (fn, key) => {
      this.mutations[key] = (payload) => fn.call(this, this.state, payload)
    })

    // 异步更改
    this.actions = {}
    forEach(actions, (fn, key) => {
      this.actions[key] = (payload) => fn.call(this, this, payload)
    })

    // 把数据变成响应式, 用了会收集watcherr，改了通知watcher执行
    this._vm = new Vue({
      data: {
        // 私有变量, 少一层代理
        $$state: state
      },
      computed
    })
  }

  get state() {
    // 依赖与vue响应式原理
    return this._vm._data.$$state
  }

  // 同步更改
  commit = (type, payload) => {
    this.mutations[type](payload)
  }

  // 异步更改
  dispatch(type, payload) {
    this.actions[type](payload)
  }
}
```