# vue
- mvvm
- 虚拟dom
- 测试
- vuex原理
- vuerouter原理
- 数据双向绑定
- 生命周期
- computed，filters，watch的区别
- https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf

## mvvm

## 生命周期
> 创建 => 挂载 => 更新 => 销毁

### 详细点
#### beforeCreate/created
> 请求后端数据
- beforeCreate: 不能获取props/data/methods
- created:能返回data,props,methods

#### beforeMount/mounted
> dom操作
- beforeMount:能拿到dom，但真实数据没挂载上去
- mounted:挂载dom

#### beforeUpdate/updated
#### beforeDestroy & destroyed


```vue
// 对数据进行检测
beforeCreate () {
  console.log('el:' + this.$el) // undefined
  console.log('data:' + this.$data) // undefined
},
created () {
  console.log('el:' + this.$el)   // undefined
  console.log('data:' + this.$data) // 进行数据观测
},
// 挂载dom节点
beforeMount () {
  console.log('el:' + this.$el) // 构载dom节点
  /**
   <div id="app">
    <div class="">{{name}}</div>
   </div>
   */
  console.log(this.$el) // 未把数据渲染进如dom
  console.log('data:' + this.$data)
},
// dom渲染完毕
mounted () {
  console.log('el:' + this.$el)
  /**
   <div id="app">
      <div class="">allen</div>
   </div>
   */
  console.log(this.$el)
  console.log('data:' + this.$data)
},
// 数据data发生改变
beforeUpdate () {
  console.log(this.$el)
},
updated () {},
// 组件销毁
beforeDestroy () {},
destroy () {},
// 使用keep-alive
// 组件被激活
activated(){},
// 组件被停用
deactivated(){}
```

## 父子组件的生命周期
> 父组件beforeCreate => 父组件created => 子组件beforeCreate => 子组件created => 子组件beforeMount => 子组件mounted => 父组件beforeMount => 父组件mounted
```vue
<!-- 父组件 -->
<template>
<HelloWorld msg="Welcome to Your Vue.js App"
            v-if="bool"/>
</template>
<script>
export default {
  beforeCreate () {
    console.log('父组件beforeCreate')
  },
  created () {
    console.log('父组件created')
  },
  beforeMount () {
    console.log('父组件beforeMount')
  },
  mounted () {
    console.log('父组件mounted')
  },
}
</script>
```
```vue
<!-- 子组件 -->
<script>
export default {
  beforeCreate () {
    console.log('子组件beforeCreate')
  },
  created () {
    console.log('子组件created')
  },
  beforeMount () {
    console.log('子组件beforeMount')
  },
  mounted () {
    console.log('子组件mounted')
  },
}
</script>
```

## v-if和v-show
- v-show指令是通过修改元素的displayCSS属性让其显示或者隐藏
- v-show不会触发v-shou组件的生命周期钩子
- v-if指令是直接销毁和重建DOM达到让元素显示和隐藏的效果
- v-if会重新触发绑定v-if组件的生命周期钩子

## keep-alive
> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们

### 生命钩子
- activated：在组件被激活时调用 （包含第一次渲染）
- deactivated：在组件被停用时调用。

### 需求：有些页面缓存，有些页面不缓存
> 与vue-router配合
```vue
<!-- App.vue -->
<keep-alive>
  <router-view v-if="$router.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$router.meta.keepAlive"></router-view>
```
```javascript
// router.js
export default new Router({
  routes:[
    // 此路由会被缓存
    {
      path:'/',
      name:'home',
      component:Home,
      meta:{
        keepAlive:true
      }
    },
    // 此路由不会被缓存
    {
      path:'/user',
      name:'user',
      component:User,
      meta:{
        keepAlive:false
      }
    },
  ]
})
```

#### 有些页面后面根据条件/情况要清除缓存
> 需要配合vue-router的组件内守卫`beforeRouteLeave`和`beforeRouteLeave`

```javascript
export default {
  beforeRouteLeave (to,from,next) {
    from.meta.keepAlive = false
  }
}
```

## `this.$router/this.$route`
- `this.$router`为VueRouter实例，想要导航到不同URL，则使用$router.push方法
- `this.$route`为当前router跳转对象，里面可以获取name、path、query、params等

## scoped
> 在Vue文件中的style标签上有一个特殊的属性，scoped。当一个style标签拥有scoped属性时候，它的css样式只能用于当前的Vue组件，可以使组件的样式不相互污染。如果一个项目的所有style标签都加上了scoped属性，相当于实现了样式的模块化。

### 原理
> 给元素一个独一无二的动态属性，给css选择器增加一个对应的属性选择器
```vue
.example[data-v-5558831a] {
  color: red;
}
<template>
    <div class="example" data-v-5558831a>scoped测试案例</div>
</template>
```

### 问题：
> 修改第三方组件库的时候出先scoped修改不了，不带scoped修改的了
#### 方案一：使用样式穿透
```less
// 使用 /deep/ 实现样式穿透
.wrapper /deep/ .el-button{
    background:#fff;
}
```
#### 方案二：增加全局基础样式文件，在入口文件引入

## 组件设计思想
- 这个组件可否再分
- 这个组件是否可以复用于其他类似场景
- 设计符合规范和大众习惯
- 留一些钩子给父组件调用

## vue方法的比较
- watch 单一数据的监听，方法名于监听数据名相同，可以得到修改前和修改后的值
- computed和methods都是方法，方法内部都有数据依赖
- computed放置计算属性，js里面调用不需要加(),如果依赖值没发生变化，不管调用几次，都只执行一次
- methods放操作方法，js里面调用需要加()，执行几次，就计算值就会执行几次

## vue-router守卫
```
// main.js(全局守卫)
router.beforeEach((to,from,next)=>{

})
router.beforeResolve((to,from,next)=>{

})
router.afterEach((to,from,next)=>{

})
// router.js(路由独享守卫)
export default new VueRouter({
    routes:[
        {
            path:'/',
            component:foo,
            beforeEnter(to,from,next){

            }
        }
    ]
})
// index.vue (路由组件内的守卫)
export default{
    beforeRouteEnter(to,from,next){
        // 获取不到this
        // 变通的使用this
        next(vm=>{
            // vm代表this
            vm._fetch()
        })
    },
    beforeRouteUpdate(to,from,next){
        // 可以访问this
        // 主要用于/foo/:id在/foo/1和/foo/2之间跳转
    },
    beforeRouteLeave(to,from,next){

    }
}
```

## vue大概的原理
- https://segmentfault.com/a/1190000006599500