# 工作笔记

## Router.beforeEach
- 例如可以把登录信息存在vuex，在`router.beforeEach`判断是否获取登录信息，没有重新请求数据，存入vuex
- 可以进行pc端和移动端判断

## 导航守卫
### 全局守卫
- 全局前置守卫:`router.beforeEach((to,from,next))`
- 全局后置钩子 `router.afterEach((to, from))`
### 路由独享的守卫
- beforeEnter 全局前置守卫
```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```
### 组件守卫
- `beforeRouteEnter((to, from, next)=>{})`
```javascript
// 不能使用this
next(vm=>{
  // 此时vm代表就this
})
```
- `beforeRouteUpdate((to, from, next)=>{}) `可以使用this 
- `beforeRouteLeave((to, from, next)=>{})`

## keep-alive
> 缓存部分组件或者页面，使用router.meta这个属性通过判断的方法可以实现
```vue
<keep-alive v-if="$route.meta.keepAlive">
  <router-view></router-view>
</keep-alive>
<router-view v-if="! $route.meta.keepAlive"></router-view>
```
### activated

### 可以在router的组件守卫和router.js控制缓存与否
```
// 组件
beforeRouteLeave (to, from, next) {
  from.meta.keepAlive = true
  next()
}
// router.js
routers:[
  {  
    path: '/home',
    name: home,
    meta:{
      // 设置为true表示需要缓存，
      // 不设置或者false表示不需要缓存 
      keepAlive: true
    }
]
```

## 小技巧 
- 常用的函数或者遍历绑定到`Vue.prototype.$xxx`上
```javascript
import Vue from 'vue'
import ajax from 'assets/js/ajax'
Vue.prototype.$ajax=ajax
// 后面使用this.$ajax即可调用
```

- 批量注册全局filters
```javascript
import Vue from 'vue'
import * as filters from 'assets/filters'
Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key])
})
```

## 配置rem
**remjs**
```javascript
// assets/js/rem.js
// 基准大小
const baseSize = 32
// 设置 rem 函数
function setRem () {
  if (document.documentElement.clientWidth > 750) {
    document.documentElement.style.fontSize = '16px'
    return
  }
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 750
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
```

**配置px2rem插件**
```shell
npm install postcss-pxtorem --save-dev
```

**vuecli3**
```shell
// package.json
"postcss": {
    "plugins": {
      "postcss-pxtorem": {
        // 根大小
        "rootValue": 32,
        "propList": [
          "*"
        ],
        //  忽略的选择器
        "selectorBlackList": [
          "el-",
        ]
      }
    }
  },
```

**人口文件main.js**
> 后面的属性只要class名不是el-开头的都会从px转换成rem
```javascript
import 'assets/js/rem.js'
```

## axios跨域携带cookie
> withCredentials: true

## 获取url参数
```javascript
export function GET_URL_KEY(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || false
}
```

## vue-router
### meta
```
// 可以携带很多附加信息
meta: {
  title: '订单管理',
  keepAlive: true
}
```

### 在组件里面获取router定义路由
```javascript
this.$router.options.routes[2].children
```

### 组件中获取当前路由
```javascript
this.$route
```

## store
### 结构
```shell
/store/
  getters.js  
  index.js
  mutations.js
  mutations-type.js
  state.js
```

### 使用vuex辅助函数
```vue
import { mapGetters,mapMutations } from 'vuex'
export default {
  methods:{
    ...mapMutations({
      set_tickets: 'SET_TICKETS',
    })
  },
  computed:{
    ...mapGetters([
      'event'
    ])
  }
}
```

## 移动端穿透
```javascript
/**
// css
body.modal-open {
    position: fixed;
    width: 100%;
}
*/
import 'scrolling-element'
let model = (function(bodyCls){
  let scrollTop
  return {
    afterOpen () {
      scrollTop = document.scrollingElement.scrollTop
      document.body.classList.add(bodyCls)
      document.body.style.top = -scrollTop + 'px'
    },
    beforeClose () {
      document.body.classList.remove(bodyCls)
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop
    }
  }
})('modal-open')
```