# css

- https://juejin.cn/post/6844903491891118087
- https://juejin.cn/post/6905539198107942919

## 盒子模型
```css
#box1 {
  width: 100px;
  height: 100px;
  border: 10px solid red;
  padding: 20px;
  background: green;
  /* 
  盒子宽度: width+border-left-width + border-right-width + padding-left + padding-right,
  内容宽度: width
  */
  box-sizing: content-box;
}

#box2 {
  width: 100px;
  height: 100px;
  border: 10px solid red;
  padding: 20px;
  background: green;
  /* 
  盒子宽度: width, 
  真实内容宽度: width - padding-left - padding-right - border-left-width - border-right-width
    */
  box-sizing: border-box;
}
```

## html5
### 语义化标签

**好处**
- 提升可访问性 
- seo 
- 结构清晰，利于维护

**标签**
- header,footer,main
- nav,aside,article
- section

### 动画
```css
div {
  width: 100px;
  height: 100px;
  background-color: red;
  position: relative;
  animation-name: example;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  /* 
  动画方向: 
  noramal: (0% -> 25% -> 75% -> 100%) -> (0% -> 25% -> 75% -> 100%) -> ...
  reverse: (100% -> 75% -> 25% -> 0%) -> (100% -> 75% -> 25% -> 0%) -> ....
  alternate: (0% -> 25% -> 75% -> 100% -> 100% -> 75% -> 25% -> 0%) -> (0% -> 25% -> 75% -> 100% -> 100% -> 75% -> 25% -> 0%) -> 
  alternate-reverse: (100% -> 75% -> 25% -> 0% -> 0% -> 25% -> 75% -> 100%) -> (100% -> 75% -> 25% -> 0% -> 0% -> 25% -> 75% -> 100%)
  */
  animation-direction: alternate-reverse;
}

@keyframes example {
  0% {
    background-color: red;
    left: 0px;
    top: 0px;
  }

  25% {
    background-color: yellow;
    left: 200px;
    top: 0px;
  }

  50% {
    background-color: blue;
    left: 200px;
    top: 200px;
  }

  75% {
    background-color: green;
    left: 0px;
    top: 200px;
  }

  100% {
    background-color: red;
    left: 0px;
    top: 0px;
  }
}
```

## 清除浮动
- 高度塌陷: 当所有的子元素浮动的时候，且父元素没有设置高度，这时
候父元素就会产生高度塌陷

```css
.box {
  background: red;
  /* 1. 给父类设置height */
  /* height: 100px; */

  /* 2. 给父类设置overflow:hidden; */
  /* overflow: hidden; */

  /* 4. 给父类设置overflow:auto */
  /* overflow: auto; */
}

/* 5. 给父类增加伪类 */
.box::after {
  content: '';
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
}

/* 3. 增加空标签 */
.box .clearfix {
  clear: both;
  height: 0;
  overflow: hidden;
}
```

## 垂直居中

```css
.item1 {
  margin: 0 auto;
  width: 100px;
  height: 100px;
  background: red;
}

.box2 {
  text-align: center;
}

.box2 .item2 {
  width: 100px;
  height: 100px;
  background: red;
  display: inline-block;
}

.box3 {
  position: relative;
  height: 150px;
}

.box3 .item3 {
  width: 100px;
  height: 100px;
  display: block;
  background: red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.box4 {
  position: relative;
  height: 150px;
}

.box4 .item4 {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  width: 100px;
  height: 100px;
  background: red;
}

.box5 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
}
.box5 .item5 {
  width: 100px;
  height: 100px;
  background: red;
}
```

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

## 适配


