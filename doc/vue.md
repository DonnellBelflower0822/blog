# vue
- mvvm
- 虚拟dom
- 测试
- vuex原理
- 数据双向绑定
- 生命周期
- computed，filters，watch的区别
- https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf

## mvvm

## 生命周期
> 创建 => 挂载 => 更新 => 销毁

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
