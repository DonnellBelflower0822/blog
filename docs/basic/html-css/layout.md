# 布局篇

- https://juejin.cn/post/6844903491891118087
- https://juejin.cn/post/6905539198107942919

- BFC
- 各种布局


## BFC
### 是什么
- `Block Formatting Context`， 名为 "块级格式化上下文"
- BFC是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局
### 怎么触发
- html
- float: left,right
- position: absolute, fixed
- display: inline‑block
- display: table‑cell
- overflow: hidden, auto

### 规则
- BFC就是一个块级元素，块级元素会在垂直方向一个接一个的排列
- BFC就是页面中的一个隔离的独立容器，容器里的标签不会影响到外部标签
- 垂直方向的距离由margin决定， 属于同一个BFC的两个相邻的标签外边距会发生重叠
- 计算BFC的高度时，浮动元素也参与计算

```html
<style>
  #box1-1,
  #box1-2 {
    width: 100px;
    height: 100px;
    background: red;
    float: left;
  }

  #container1 {
    background: #000;
    border: 1px solid #000;

    /* 使用Float脱离文档流，高度塌陷 */
    /* 可以给父容器触发BFC */
    display: flex;
    /* overflow: hidden; */
    /* position: absolute; */
    /* display: table-cell; */
  }
</style>
<div id="container1">
  <div id="box1-1"></div>
  <div id="box1-2"></div>
</div>
```

