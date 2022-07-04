# 手写vue2-router

- 提供install
- 支持new
- 为组件注入$router/$route
- 提供router-view/router-link组件

## install方法

- 为每个组件在beforeCreate为实例注入_routerRoot
- _routerRoot指向根组件实例
- 根组件实例能获取_router（路由实例）
- 根组件将_route变成响应式
- 在原型上扩展`$router/$route`
- 提供`router-link`和`router-view`组件

```js
// install.js
import RouterView from './components/view'
import RouterLink from './components/link'

export let Vue

export function install(_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        // 根组件身上才有router属性
        this._router = this.$options.router
        // 将_routerRoot指向根实例
        this._routerRoot = this

        // 初始化路由
        this._router.init(this)

        // 将根实例的_route变成响应式, 后期使用会收集Watcher，数据更改能刷新
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        // 子：获取父组件身上的_routerRoot
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }, 
  })

  // 在原型上增加 $router/$route, vue组件能通过this.$router/this.$route获取
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router
    }
  })
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route
    }
  })

  // 提供router-view和router-link两个组件
  Vue.component('router-view', RouterView)
  Vue.component('router-link', RouterLink)
}
```

### VueRouter

```js
// index.js
class VueRouter {
  constructor(options = {}) {
    const { routes } = options
    this.mode = options.mode || 'hash'

    // 路由映射表
    this.matcher = createMatcher(routes)

    this.beforeHook = []
    this.afterHook = []

    // 根据mode是实现不同路由
    // 底层实现不一样，api不一样
    switch (this.mode) {
      case 'hash':
        this.history = new Hash(this)
        break
      case 'history':
        this.history = new H5(this)
        break
    }
  }

  // 添加路由
  addRoutes(routes) {
    return this.matcher.addRoutes(routes)
  }

  // 在路由映射表中匹配路由
  match(path) {
    return this.matcher.match(path)
  }

  // 跳转
  push(location) {
    this.history.transitionTo(location, () => {
      if (this.mode === 'hash') {
        window.location.hash = location
      } else {
        window.history.pushState({}, '', location)
      }
    })
  }

  // 初始化
  init(app) {
    const { history } = this

    // 初始化监听
    const setupLisetener = () => {
      history.setupLisetener()
    }

    // 跳转到当前路由
    history.transitionTo(history.getCurrentLocation(), setupLisetener)

    history.listen((route) => {
      // 跳转更新时，重新设置响应数据。则会重新刷新
      app._route = route
    })
  }

  // 钩子
  beforeEach(cb) {
    this.beforeHook.push(cb)
  }

  // 钩子
  afterEach(cb) {
    this.afterHook.push(cb)
  }
}

VueRouter.install = install

export default VueRouter
```

### createMatcher: 创建路由映射表

- 将嵌套的路由扁平化, 方便后续matcher操作
- 添加addRoutes或者match都是通过路由映射表

```js
// create-matcher.js
export function createMatcher(routes) {
  // 路径和记录匹配
  const { pathMap } = createRouteMap(routes)

  // 获取匹配到的理由
  function match(path) {
    return pathMap[path]
  }

  // 将新路由插入到老的路由映射表
  function addRoutes(needAddRoutes) {
    createRouteMap(needAddRoutes, pathMap)
  }

  return {
    match,
    addRoutes
  }
}
```

### createRouteMap

> 收集数据结构

```
{
  '/': {path:'',component:{},parent: undefined},
  '/about': { path:'',component:{}, parent: undefined},
  '/about/a': { path:'',component:{}, parent: componentAbout },
}
```

```js
// 创建路由映射表
export function createRouteMap(routes, oldPathMap) {
  const pathMap = oldPathMap || {}

  routes.forEach(route => {
    addRouteRecord(route, pathMap)
  });

  return {
    pathMap
  }
}

// 递归往pathMap添加路由
function addRouteRecord(route, pathMap, parentRecord) {
  let { path } = route
  path = parentRecord ? parentRecord.path + '/' + path : path

  // 记录和路径关联起来
  const record = {
    path,
    component: route.component,
    // 父级
    parent: parentRecord
  }

  pathMap[path] = record

  route.children && route.children.forEach(childRoute => {
    addRouteRecord(childRoute, pathMap, record)
  })
}
```


### router-link

```js
export default {
  // functional: true,
  props: {
    to: {
      type: String,
      required: true
    }
  },

  render() {
    const click = () => {
      // 此为每个组件都会在beforeCreate中注入$router
      this.$router.push(this.to)
    }

    return <a onClick={click}>{this.$slots.default}</a>
  }
}
```

### router-view

```js
export default {
  functional: true,
  render(h, { parent, data }) {
    const { $route: route } = parent
    let depth = 0

    // 渲染是从父到子
    // 渲染前会把data.routerView设置为true
    // 所以通过父级渲染了几个，接着渲染当前的router-view

    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth += 1
      }
      parent = parent.$parent
    }

    const record = route.matched[depth]

    if (!record) {
      return h()
    }

    data.routerView = true
    return h(record.component, data)
  }
}
```
